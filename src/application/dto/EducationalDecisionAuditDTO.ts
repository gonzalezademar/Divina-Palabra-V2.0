export interface EducationalDecisionAuditDTO {
  id: string;
  createdAt: number;
  studentId: string;
  appliedRuleIds: string[];
  consideredPatternIds: string[];
  selectedStrategyId?: string;
  confidenceLevel: number;
  expectedResultStatus: string;
  obtainedResultStatus?: string;
  associatedFeedbackIds: string[];
  improvementCycleId?: string;
  consistencyIndex: number;
  isFullyExplainable: boolean;
}

export interface EducationalDecisionAuditMetricsDTO {
  auditedDecisions: number;
  traceabilityAvailable: number;
  generatedAudits: number;
  decisionConsistency: number;
  fullyExplainableDecisionsPercentage: number;
}
