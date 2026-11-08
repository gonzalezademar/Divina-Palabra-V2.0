import { EducationalDecision } from '../../domain/entities/EducationalDecision';
import { DecisionAudit } from '../../domain/entities/DecisionAudit';
import { EducationalDecisionAuditDTO } from '../dto/EducationalDecisionAuditDTO';
import { EducationalDecisionDTO } from '../dto/EducationalDecisionDTO';

export class EducationalDecisionMapper {
  public toDTO(decision: EducationalDecision, studentId: string): EducationalDecisionDTO {
    const report = decision.intelligenceReport;
    return {
      studentId,
      suggestedDifficulty: decision.suggestedDifficulty,
      exerciseCount: decision.exerciseCount,
      recommendedChallengeType: decision.recommendedChallengeType,
      priorityTopics: [...decision.priorityTopics],
      reinforcementTopics: [...decision.reinforcementTopics],
      recommendedContentOrder: [...decision.recommendedContentOrder],
      activeObjective: decision.activeObjective,
      strategy: decision.strategy,
      source: decision.decisionSource,
      confidenceLevel: decision.confidenceScore || 0,
      appliedKnowledgeRuleId: decision.appliedKnowledgeRuleId,
      isConsistent: report?.isConsistent || false,
      consistencyIndex: report?.consistencyIndex || 0,
      conflictsDetected: report ? [...report.conflictsDetected] : [],
      redundanciesRemoved: report?.redundanciesRemoved || 0,
      requiresReview: report?.needsReview || false
    };
  }

  public toAuditDTO(audit: DecisionAudit): EducationalDecisionAuditDTO {
    return {
      id: audit.id,
      createdAt: audit.createdAt,
      studentId: audit.educationalContext.studentId,
      appliedRuleIds: audit.appliedRules.map(rule => rule.id),
      consideredPatternIds: audit.consideredPatterns.map(pattern => pattern.id),
      selectedStrategyId: audit.selectedStrategy?.id,
      confidenceLevel: audit.confidenceLevel,
      expectedResultStatus: audit.expectedResult.status,
      obtainedResultStatus: audit.obtainedResult?.status,
      associatedFeedbackIds: audit.associatedFeedback.map(feedback => feedback.id),
      improvementCycleId: audit.improvementCycle?.id,
      consistencyIndex: audit.consistencyIndex,
      isFullyExplainable: audit.isFullyExplainable
    };
  }
}
