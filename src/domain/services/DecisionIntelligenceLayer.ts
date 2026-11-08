import { EducationalContext } from '../entities/EducationalContext';
import { EducationalDecision, DecisionIntelligenceReport } from '../entities/EducationalDecision';
import { studentCognitiveModelDomainService } from './StudentCognitiveModelDomainService';
import { learningProgressDomainService } from './LearningProgressDomainService';
import { learningPredictionDomainService } from './LearningPredictionDomainService';
import { enterpriseEducationalMemory } from './EnterpriseEducationalMemory';
import { enterpriseExperienceEvaluationEngine } from './EnterpriseExperienceEvaluationEngine';
import { enterpriseEducationalKnowledgeEngine } from './EnterpriseEducationalKnowledgeEngine';
import { enterpriseKnowledgeGovernanceEngine } from './EnterpriseKnowledgeGovernanceEngine';
import { enterpriseInstitutionalLearningEngine } from './EnterpriseInstitutionalLearningEngine';
import { enterpriseEducationalPatternEngine } from './EnterpriseEducationalPatternEngine';
import { enterpriseEducationalStrategyEngine } from './EnterpriseEducationalStrategyEngine';
import { enterpriseEducationalOutcomeEngine } from './EnterpriseEducationalOutcomeEngine';
import { enterpriseEducationalFeedbackEngine } from './EnterpriseEducationalFeedbackEngine';
import { enterpriseContinuousImprovementEngine } from './EnterpriseContinuousImprovementEngine';
import { enterpriseDecisionAuditEngine } from './EnterpriseDecisionAuditEngine';

export class DecisionIntelligenceLayer {
  private static instance: DecisionIntelligenceLayer;
  private metrics = {
    decisionsEvaluated: 0,
    decisionsCorrected: 0,
    conflictsDetected: 0,
    averageConfidence: 0,
    averageConsistency: 0
  };

  private constructor() {}

  static getInstance(): DecisionIntelligenceLayer {
    if (!DecisionIntelligenceLayer.instance) {
      DecisionIntelligenceLayer.instance = new DecisionIntelligenceLayer();
    }
    return DecisionIntelligenceLayer.instance;
  }

  public getMetrics() {
    return this.metrics;
  }

  public enrichDecision(decision: EducationalDecision, context: EducationalContext): EducationalDecision {
    this.metrics.decisionsEvaluated++;
    const studentId = context.studentId;

    let isConsistent = true;
    let conflicts: string[] = [];
    let redundancies = 0;
    let consistencyIndex = 1.0;
    let confidence = decision.confidenceScore || 0.5;

    const progress = context.progress || learningProgressDomainService.getLearningProgress(studentId);
    if (progress && decision.suggestedDifficulty === 'Avanzado' && progress.globalProgress < 40) {
      isConsistent = false;
      conflicts.push('DifficultyTooHighForProgress');
      consistencyIndex -= 0.3;
      decision.suggestedDifficulty = 'Intermedio'; 
      this.metrics.decisionsCorrected++;
    }

    const uniqueTopics = new Set(decision.priorityTopics || []);
    if (decision.priorityTopics && uniqueTopics.size < decision.priorityTopics.length) {
      redundancies += decision.priorityTopics.length - uniqueTopics.size;
      decision.priorityTopics = Array.from(uniqueTopics);
    }

    const cognitiveModel = studentCognitiveModelDomainService.getCognitiveModel(studentId);
    if (cognitiveModel && cognitiveModel.learningPace === 'Lento' && decision.exerciseCount > 10) {
      conflicts.push('ExerciseCountTooHighForPace');
      consistencyIndex -= 0.2;
      decision.exerciseCount = 8;
      this.metrics.decisionsCorrected++;
    }

    const prediction = context.predictions || learningPredictionDomainService.getRiskAnalysis(studentId);
    if (prediction && prediction.requiresIntervention && decision.recommendedChallengeType !== 'repaso' && decision.recommendedChallengeType !== 'refuerzo') {
      conflicts.push('RiskIgnoredInChallengeType');
      consistencyIndex -= 0.4;
      decision.recommendedChallengeType = 'repaso';
      this.metrics.decisionsCorrected++;
    }

    this.metrics.conflictsDetected += conflicts.length;

    const finalConfidenceScore = Math.max(0.1, Math.min(1.0, confidence * consistencyIndex));

    this.metrics.averageConfidence = (this.metrics.averageConfidence + finalConfidenceScore) / 2;
    this.metrics.averageConsistency = (this.metrics.averageConsistency + Math.max(0, consistencyIndex)) / 2;

    const needsReview = finalConfidenceScore < 0.5 || conflicts.length > 1;

    const report: DecisionIntelligenceReport = {
      isConsistent: conflicts.length === 0,
      consistencyIndex: Math.max(0, consistencyIndex),
      conflictsDetected: conflicts,
      redundanciesRemoved: redundancies,
      needsReview,
      finalConfidenceScore
    };

    decision.intelligenceReport = report;
    decision.confidenceScore = finalConfidenceScore;

    const experienceId = enterpriseEducationalMemory.recordExperience(
      studentId,
      context,
      decision,
      ['DecisionIntelligenceLayer', 'EducationalDecisionEngine', 'LearningProgressDomainService', 'StudentCognitiveModelDomainService', 'LearningPredictionDomainService']
    );

    const experiences = enterpriseEducationalMemory.getAllExperiences(studentId);
    const exp = experiences.find(e => e.id === experienceId);
    if (exp) {
      const evaluation = enterpriseExperienceEvaluationEngine.evaluateExperience(exp);
      enterpriseInstitutionalLearningEngine.consolidateSuccessfulDecision(exp, evaluation);
      enterpriseEducationalPatternEngine.analyzeInstitutionalLearnings();
      enterpriseEducationalStrategyEngine.analyzeInstitutionalPatterns();
      const outcomes = enterpriseEducationalOutcomeEngine.evaluateAppliedStrategies(exp, evaluation);
      const feedback = enterpriseEducationalFeedbackEngine.analyzeEducationalOutcomes();
      enterpriseEducationalFeedbackEngine.getPrioritizedFeedback();
      const improvementCycle = enterpriseContinuousImprovementEngine.evaluateFeedbackCycle(feedback);

      enterpriseDecisionAuditEngine.registerDecision({
        context,
        decision,
        rules: enterpriseEducationalKnowledgeEngine.getRules(studentId),
        patterns: enterpriseEducationalPatternEngine.getDetectedPatterns(),
        strategies: enterpriseEducationalStrategyEngine.getStrategies(),
        outcomes,
        feedback,
        improvementCycle
      });

      enterpriseEducationalKnowledgeEngine.extractKnowledge(studentId);
      
      if (exp.decisionTaken.appliedKnowledgeRuleId) {
        const studentRules = enterpriseEducationalKnowledgeEngine.getRules(studentId);
        const rule = studentRules.find(r => r.id === exp.decisionTaken.appliedKnowledgeRuleId);
        if (rule) {
           const success = evaluation.qualityScore > 0.5;
           enterpriseKnowledgeGovernanceEngine.recordRuleApplicationResult(rule, success);
        }
      }
    }

    return decision;
  }
}

export const decisionIntelligenceLayer = DecisionIntelligenceLayer.getInstance();
