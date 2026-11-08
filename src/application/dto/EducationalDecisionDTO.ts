export interface EducationalDecisionDTO {
  studentId: string;
  suggestedDifficulty: string;
  exerciseCount: number;
  recommendedChallengeType: string;
  priorityTopics: string[];
  reinforcementTopics: string[];
  recommendedContentOrder: unknown[];
  activeObjective?: string;
  strategy?: string;
  source?: string;
  confidenceLevel: number;
  appliedKnowledgeRuleId?: string;
  isConsistent: boolean;
  consistencyIndex: number;
  conflictsDetected: string[];
  redundanciesRemoved: number;
  requiresReview: boolean;
}
