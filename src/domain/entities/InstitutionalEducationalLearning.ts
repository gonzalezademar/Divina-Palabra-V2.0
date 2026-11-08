export interface InstitutionalEducationalLearning {
  id: string;
  decisionSignature: string;
  recommendedAction: {
    suggestedDifficulty: string;
    recommendedChallengeType: string;
  };
  successfulDecisions: number;
  averageQualityScore: number;
  averageReliabilityScore: number;
  firstLearnedAt: number;
  lastLearnedAt: number;
}
