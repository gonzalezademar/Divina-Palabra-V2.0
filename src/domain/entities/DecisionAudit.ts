export interface DecisionAuditContext {
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

export interface DecisionAuditRule {
  id: string;
  type: string;
  condition: string;
  confidenceScore: number;
  status: string;
  wasApplied: boolean;
}

export interface DecisionAuditPattern {
  id: string;
  condition: string;
  confidenceScore: number;
  isStable: boolean;
}

export interface DecisionAuditStrategy {
  id: string;
  patternId: string;
  recommendation: string;
  effectivenessScore: number;
  confidenceScore: number;
  classification: string;
}

export interface DecisionAuditResult {
  status: string;
  summary: string;
  score?: number;
  evaluatedAt?: number;
}

export interface DecisionAuditFeedback {
  id: string;
  cause: string;
  priority: string;
  recommendation: string;
}

export interface DecisionAuditImprovementCycle {
  id: string;
  cycleNumber: number;
  trend: string;
  evolutionIndex: number;
}

export interface DecisionAudit {
  id: string;
  createdAt: number;
  educationalContext: DecisionAuditContext;
  appliedRules: DecisionAuditRule[];
  consideredPatterns: DecisionAuditPattern[];
  selectedStrategy?: DecisionAuditStrategy;
  confidenceLevel: number;
  expectedResult: DecisionAuditResult;
  obtainedResult?: DecisionAuditResult;
  associatedFeedback: DecisionAuditFeedback[];
  improvementCycle?: DecisionAuditImprovementCycle;
  consistencyIndex: number;
  isFullyExplainable: boolean;
}
