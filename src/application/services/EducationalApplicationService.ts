import { EducationalContext } from '../../domain/entities/EducationalContext';
import { EducationalDecision } from '../../domain/entities/EducationalDecision';
import { EducationalDecisionEngine, educationalDecisionEngine } from '../../domain/services/EducationalDecisionEngine';
import { DecisionIntelligenceLayer, decisionIntelligenceLayer } from '../../domain/services/DecisionIntelligenceLayer';
import { EnterpriseEducationalMemory, enterpriseEducationalMemory } from '../../domain/services/EnterpriseEducationalMemory';
import { EnterpriseEducationalKnowledgeEngine, enterpriseEducationalKnowledgeEngine } from '../../domain/services/EnterpriseEducationalKnowledgeEngine';
import { EnterpriseEducationalPatternEngine, enterpriseEducationalPatternEngine } from '../../domain/services/EnterpriseEducationalPatternEngine';
import { EnterpriseEducationalStrategyEngine, enterpriseEducationalStrategyEngine } from '../../domain/services/EnterpriseEducationalStrategyEngine';
import { EnterpriseEducationalOutcomeEngine, enterpriseEducationalOutcomeEngine } from '../../domain/services/EnterpriseEducationalOutcomeEngine';
import { EnterpriseEducationalFeedbackEngine, enterpriseEducationalFeedbackEngine } from '../../domain/services/EnterpriseEducationalFeedbackEngine';
import { EnterpriseContinuousImprovementEngine, enterpriseContinuousImprovementEngine } from '../../domain/services/EnterpriseContinuousImprovementEngine';
import { EnterpriseDecisionAuditEngine, enterpriseDecisionAuditEngine } from '../../domain/services/EnterpriseDecisionAuditEngine';
import { EducationalDecisionDTO } from '../dto/EducationalDecisionDTO';
import { EducationalDecisionAuditDTO, EducationalDecisionAuditMetricsDTO } from '../dto/EducationalDecisionAuditDTO';
import { EducationalDecisionMapper } from '../mappers/EducationalDecisionMapper';

export interface EducationalDecisionContextInput {
  studentId: string;
  studentProfile?: unknown;
  progress?: unknown;
  competencies?: unknown[];
  objectives?: unknown[];
  strategies?: unknown;
  personalization?: unknown;
  predictions?: unknown;
  recommendations?: unknown;
  planning?: unknown;
  metrics?: unknown;
  optimization?: unknown;
  historyUsed?: unknown[];
  modelConfidenceLevel?: number;
}

export class EducationalApplicationService {
  public constructor(
    private readonly educationalDecision: EducationalDecisionEngine = educationalDecisionEngine,
    private readonly decisionIntelligence: DecisionIntelligenceLayer = decisionIntelligenceLayer,
    private readonly educationalMemory: EnterpriseEducationalMemory = enterpriseEducationalMemory,
    private readonly educationalKnowledge: EnterpriseEducationalKnowledgeEngine = enterpriseEducationalKnowledgeEngine,
    private readonly educationalPatterns: EnterpriseEducationalPatternEngine = enterpriseEducationalPatternEngine,
    private readonly educationalStrategies: EnterpriseEducationalStrategyEngine = enterpriseEducationalStrategyEngine,
    private readonly educationalOutcomes: EnterpriseEducationalOutcomeEngine = enterpriseEducationalOutcomeEngine,
    private readonly educationalFeedback: EnterpriseEducationalFeedbackEngine = enterpriseEducationalFeedbackEngine,
    private readonly continuousImprovement: EnterpriseContinuousImprovementEngine = enterpriseContinuousImprovementEngine,
    private readonly decisionAudit: EnterpriseDecisionAuditEngine = enterpriseDecisionAuditEngine,
    private readonly decisionMapper: EducationalDecisionMapper = new EducationalDecisionMapper()
  ) {}

  public generateEducationalDecision(input: EducationalDecisionContextInput): EducationalDecision {
    const context = this.toEducationalContext(input);
    const decision = this.educationalDecision.makeDecision(context);
    return this.decisionIntelligence.enrichDecision(decision, context);
  }

  public generateEducationalDecisionDTO(input: EducationalDecisionContextInput): EducationalDecisionDTO {
    return this.decisionMapper.toDTO(this.generateEducationalDecision(input), input.studentId);
  }

  public enrichDecision(decision: EducationalDecision, context: EducationalContext): EducationalDecision {
    return this.decisionIntelligence.enrichDecision(decision, context);
  }

  public getDecisionIntelligenceMetrics() {
    return this.decisionIntelligence.getMetrics();
  }

  public getEducationalMemoryStatistics(studentId: string) {
    return this.educationalMemory.getStudentStatistics(studentId);
  }

  public findSimilarEducationalExperiences(studentId: string, difficulty: string, challengeType: string) {
    return this.educationalMemory.findSimilarExperiences(studentId, difficulty, challengeType);
  }

  public getEducationalKnowledgeMetrics() {
    return this.educationalKnowledge.getMetrics();
  }

  public getEducationalKnowledgeRules(studentId: string) {
    return this.educationalKnowledge.getRules(studentId);
  }

  public extractEducationalKnowledge(studentId: string): void {
    this.educationalKnowledge.extractKnowledge(studentId);
  }

  public getEducationalPatterns() {
    return this.educationalPatterns.getDetectedPatterns();
  }

  public analyzeEducationalPatterns() {
    return this.educationalPatterns.analyzeInstitutionalLearnings();
  }

  public getEducationalStrategies() {
    return this.educationalStrategies.getStrategies();
  }

  public getReusableEducationalStrategies() {
    return this.educationalStrategies.getReusableStrategies();
  }

  public analyzeEducationalStrategies() {
    return this.educationalStrategies.analyzeInstitutionalPatterns();
  }

  public getEducationalOutcomes() {
    return this.educationalOutcomes.getOutcomes();
  }

  public getEducationalOutcomesForStrategy(strategyId: string) {
    return this.educationalOutcomes.getOutcomesForStrategy(strategyId);
  }

  public getEducationalFeedback() {
    return this.educationalFeedback.getFeedback();
  }

  public getPrioritizedEducationalFeedback() {
    return this.educationalFeedback.getPrioritizedFeedback();
  }

  public analyzeEducationalFeedback() {
    return this.educationalFeedback.analyzeEducationalOutcomes();
  }

  public getContinuousImprovementCycles() {
    return this.continuousImprovement.getCycles();
  }

  public getLatestContinuousImprovementCycle() {
    return this.continuousImprovement.getLatestCycle();
  }

  public evaluateContinuousImprovement() {
    return this.continuousImprovement.evaluateFeedbackCycle();
  }

  public getDecisionAuditMetrics(): EducationalDecisionAuditMetricsDTO {
    return this.decisionAudit.getMetrics();
  }

  public getDecisionAudits(studentId?: string) {
    return this.decisionAudit.getAudits(studentId);
  }

  public getDecisionAudit(auditId: string) {
    return this.decisionAudit.getAudit(auditId);
  }

  public getDecisionAuditDTOs(studentId?: string): EducationalDecisionAuditDTO[] {
    return this.decisionAudit.getAudits(studentId).map(audit => this.decisionMapper.toAuditDTO(audit));
  }

  public getDecisionAuditDTO(auditId: string): EducationalDecisionAuditDTO | undefined {
    const audit = this.decisionAudit.getAudit(auditId);
    return audit ? this.decisionMapper.toAuditDTO(audit) : undefined;
  }

  public getMetrics() {
    return {
      decisionGeneration: this.educationalDecision.getMetrics(),
      decisionIntelligence: this.getDecisionIntelligenceMetrics(),
      educationalMemory: this.educationalMemory.getMetrics(),
      educationalKnowledge: this.getEducationalKnowledgeMetrics(),
      educationalPatterns: this.educationalPatterns.getMetrics(),
      educationalStrategies: this.educationalStrategies.getMetrics(),
      educationalOutcomes: this.educationalOutcomes.getMetrics(),
      educationalFeedback: this.educationalFeedback.getMetrics(),
      continuousImprovement: this.continuousImprovement.getMetrics(),
      decisionAudit: this.getDecisionAuditMetrics()
    };
  }

  private toEducationalContext(input: EducationalDecisionContextInput): EducationalContext {
    const context = new EducationalContext(input.studentId);
    context.studentProfile = input.studentProfile;
    context.progress = input.progress;
    context.competencies = input.competencies;
    context.objectives = input.objectives;
    context.strategies = input.strategies;
    context.personalization = input.personalization;
    context.predictions = input.predictions;
    context.recommendations = input.recommendations;
    context.planning = input.planning;
    context.metrics = input.metrics;
    context.optimization = input.optimization;
    context.historyUsed = input.historyUsed;
    context.modelConfidenceLevel = input.modelConfidenceLevel;
    return context;
  }
}

export const educationalApplicationService = new EducationalApplicationService();
