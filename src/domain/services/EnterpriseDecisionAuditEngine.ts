import { DecisionAudit, DecisionAuditContext, DecisionAuditFeedback, DecisionAuditImprovementCycle, DecisionAuditPattern, DecisionAuditResult, DecisionAuditRule, DecisionAuditStrategy } from '../entities/DecisionAudit';
import { EducationalContext } from '../entities/EducationalContext';
import { EducationalDecision } from '../entities/EducationalDecision';
import { EducationalFeedback } from '../entities/EducationalFeedback';
import { EducationalOutcome } from '../entities/EducationalOutcome';
import { ContinuousImprovement } from '../entities/ContinuousImprovement';
import { EducationalKnowledgeRule } from '../entities/EducationalKnowledgeRule';
import { EducationalPattern } from '../entities/EducationalPattern';
import { EducationalStrategy } from '../entities/EducationalStrategy';

export interface DecisionAuditRegistration {
  context: EducationalContext;
  decision: EducationalDecision;
  rules: EducationalKnowledgeRule[];
  patterns: EducationalPattern[];
  strategies: EducationalStrategy[];
  outcomes?: EducationalOutcome[];
  feedback?: EducationalFeedback[];
  improvementCycle?: ContinuousImprovement;
}

export class EnterpriseDecisionAuditEngine {
  private static instance: EnterpriseDecisionAuditEngine;
  private audits: DecisionAudit[] = [];
  private nextAuditSequence = 1;

  private constructor() {}

  public static getInstance(): EnterpriseDecisionAuditEngine {
    if (!EnterpriseDecisionAuditEngine.instance) {
      EnterpriseDecisionAuditEngine.instance = new EnterpriseDecisionAuditEngine();
    }
    return EnterpriseDecisionAuditEngine.instance;
  }

  public registerDecision(registration: DecisionAuditRegistration): DecisionAudit {
    const selectedStrategy = this.selectStrategy(registration.decision, registration.strategies);
    const outcomes = registration.outcomes || [];
    const audit: DecisionAudit = {
      id: `decision-audit-${this.nextAuditSequence++}`,
      createdAt: Date.now(),
      educationalContext: this.snapshotContext(registration.context),
      appliedRules: registration.rules.map(rule => this.toRule(rule, registration.decision.appliedKnowledgeRuleId === rule.id)),
      consideredPatterns: registration.patterns.map(pattern => this.toPattern(pattern)),
      selectedStrategy: selectedStrategy ? this.toStrategy(selectedStrategy) : undefined,
      confidenceLevel: registration.decision.confidenceScore || 0,
      expectedResult: this.createExpectedResult(registration.decision, selectedStrategy),
      obtainedResult: outcomes.length > 0 ? this.createObtainedResult(outcomes) : undefined,
      associatedFeedback: (registration.feedback || []).map(feedback => this.toFeedback(feedback)),
      improvementCycle: registration.improvementCycle ? this.toImprovementCycle(registration.improvementCycle) : undefined,
      consistencyIndex: registration.decision.intelligenceReport?.consistencyIndex || 0,
      isFullyExplainable: this.isFullyExplainable(registration, selectedStrategy, outcomes)
    };

    this.audits.push(audit);
    return this.cloneAudit(audit);
  }

  public getAudits(studentId?: string): DecisionAudit[] {
    return this.audits
      .filter(audit => !studentId || audit.educationalContext.studentId === studentId)
      .map(audit => this.cloneAudit(audit));
  }

  public getAudit(auditId: string): DecisionAudit | undefined {
    const audit = this.audits.find(item => item.id === auditId);
    return audit ? this.cloneAudit(audit) : undefined;
  }

  public getMetrics() {
    const auditedDecisions = this.audits.length;
    const traceabilityAvailable = this.audits.filter(audit => audit.appliedRules.length > 0 || audit.consideredPatterns.length > 0 || audit.selectedStrategy).length;
    const explainableDecisions = this.audits.filter(audit => audit.isFullyExplainable).length;
    return {
      auditedDecisions,
      traceabilityAvailable,
      generatedAudits: auditedDecisions,
      decisionConsistency: auditedDecisions > 0
        ? this.audits.reduce((total, audit) => total + audit.consistencyIndex, 0) / auditedDecisions
        : 0,
      fullyExplainableDecisionsPercentage: auditedDecisions > 0
        ? (explainableDecisions / auditedDecisions) * 100
        : 0
    };
  }

  private selectStrategy(decision: EducationalDecision, strategies: EducationalStrategy[]): EducationalStrategy | undefined {
    return strategies.find(strategy => strategy.recommendedAction.recommendedChallengeType === decision.recommendedChallengeType);
  }

  private createExpectedResult(decision: EducationalDecision, strategy?: EducationalStrategy): DecisionAuditResult {
    return {
      status: 'expected',
      summary: strategy
        ? `Aplicar ${strategy.id} para ${decision.recommendedChallengeType}`
        : `Aplicar decisión educativa para ${decision.recommendedChallengeType}`,
      score: strategy ? strategy.effectivenessScore : decision.confidenceScore
    };
  }

  private createObtainedResult(outcomes: EducationalOutcome[]): DecisionAuditResult {
    const score = outcomes.reduce((total, outcome) => total + outcome.successIndex, 0) / outcomes.length;
    const status = outcomes.every(outcome => outcome.status === 'exitosa')
      ? 'exitosa'
      : outcomes.some(outcome => outcome.status === 'descartada') ? 'descartada' : 'neutral';
    return {
      status,
      summary: `Se evaluaron ${outcomes.length} resultado(s) de estrategia`,
      score,
      evaluatedAt: Math.max(...outcomes.map(outcome => outcome.evaluatedAt))
    };
  }

  private isFullyExplainable(registration: DecisionAuditRegistration, strategy: EducationalStrategy | undefined, outcomes: EducationalOutcome[]): boolean {
    return Boolean(
      registration.context.studentId &&
      registration.decision.intelligenceReport &&
      (registration.rules.length > 0 || registration.patterns.length > 0 || strategy) &&
      outcomes.length > 0 &&
      registration.feedback &&
      registration.improvementCycle
    );
  }

  private snapshotContext(context: EducationalContext): DecisionAuditContext {
    return {
      studentId: context.studentId,
      studentProfile: context.studentProfile,
      progress: context.progress,
      competencies: context.competencies ? [...context.competencies] : undefined,
      objectives: context.objectives ? [...context.objectives] : undefined,
      strategies: context.strategies,
      personalization: context.personalization,
      predictions: context.predictions,
      recommendations: context.recommendations,
      planning: context.planning,
      metrics: context.metrics,
      optimization: context.optimization,
      historyUsed: context.historyUsed ? [...context.historyUsed] : undefined,
      modelConfidenceLevel: context.modelConfidenceLevel
    };
  }

  private toRule(rule: EducationalKnowledgeRule, wasApplied: boolean): DecisionAuditRule {
    return { id: rule.id, type: rule.type, condition: rule.condition, confidenceScore: rule.confidenceScore, status: rule.status, wasApplied };
  }

  private toPattern(pattern: EducationalPattern): DecisionAuditPattern {
    return { id: pattern.id, condition: pattern.condition, confidenceScore: pattern.confidenceScore, isStable: pattern.isStable };
  }

  private toStrategy(strategy: EducationalStrategy): DecisionAuditStrategy {
    return {
      id: strategy.id,
      patternId: strategy.patternId,
      recommendation: strategy.preparedRecommendation,
      effectivenessScore: strategy.effectivenessScore,
      confidenceScore: strategy.confidenceScore,
      classification: strategy.classification
    };
  }

  private toFeedback(feedback: EducationalFeedback): DecisionAuditFeedback {
    return { id: feedback.id, cause: feedback.cause, priority: feedback.priority, recommendation: feedback.recommendation };
  }

  private toImprovementCycle(cycle: ContinuousImprovement): DecisionAuditImprovementCycle {
    return { id: cycle.id, cycleNumber: cycle.cycleNumber, trend: cycle.trend, evolutionIndex: cycle.evolutionIndex };
  }

  private cloneAudit(audit: DecisionAudit): DecisionAudit {
    return {
      ...audit,
      educationalContext: { ...audit.educationalContext, competencies: audit.educationalContext.competencies ? [...audit.educationalContext.competencies] : undefined, objectives: audit.educationalContext.objectives ? [...audit.educationalContext.objectives] : undefined, historyUsed: audit.educationalContext.historyUsed ? [...audit.educationalContext.historyUsed] : undefined },
      appliedRules: audit.appliedRules.map(rule => ({ ...rule })),
      consideredPatterns: audit.consideredPatterns.map(pattern => ({ ...pattern })),
      selectedStrategy: audit.selectedStrategy ? { ...audit.selectedStrategy } : undefined,
      expectedResult: { ...audit.expectedResult },
      obtainedResult: audit.obtainedResult ? { ...audit.obtainedResult } : undefined,
      associatedFeedback: audit.associatedFeedback.map(feedback => ({ ...feedback })),
      improvementCycle: audit.improvementCycle ? { ...audit.improvementCycle } : undefined
    };
  }
}

export const enterpriseDecisionAuditEngine = EnterpriseDecisionAuditEngine.getInstance();
