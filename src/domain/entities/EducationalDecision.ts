export interface DecisionIntelligenceReport {
  isConsistent: boolean;
  consistencyIndex: number;
  conflictsDetected: string[];
  redundanciesRemoved: number;
  needsReview: boolean;
  finalConfidenceScore: number;
}

export interface EducationalKnowledgeRule {
  id: string;
  type: string;
  condition: string;
  recommendedAction: any;
  confidenceScore: number;
  support: number;
  createdAt: number;
  lastApplied: number;
  
  successCount: number;
  failureCount: number;
  validityExpiry?: number;
  status: 'experimental' | 'estable' | 'obsoleta';
  qualityScore: number;
  priority: number;
  evidenceLevel: number;
}

export interface EducationalDecision {
  suggestedDifficulty: string;
  exerciseCount: number;
  recommendedChallengeType: string;
  priorityTopics: string[];
  reinforcementTopics: string[];
  recommendedContentOrder: any[];
  activeObjective?: string;
  strategy?: string;
  decisionSource?: string;
  confidenceScore?: number;
  
  intelligenceReport?: DecisionIntelligenceReport;
  appliedKnowledgeRuleId?: string;
}
