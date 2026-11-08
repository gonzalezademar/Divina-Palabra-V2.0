export interface EducationalPatternEvidence {
  learningId: string;
  successfulDecisions: number;
  qualityScore: number;
  reliabilityScore: number;
}

export interface EducationalPattern {
  id: string;
  type: 'challenge_type_recurrence';
  condition: string;
  recommendedAction: {
    recommendedChallengeType: string;
  };
  confidenceScore: number;
  importance: 'baja' | 'media' | 'alta';
  isStable: boolean;
  evidence: EducationalPatternEvidence[];
  detectedAt: number;
  lastObservedAt: number;
}
