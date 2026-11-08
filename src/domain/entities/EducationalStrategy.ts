export interface EducationalStrategy {
  id: string;
  patternId: string;
  condition: string;
  recommendedAction: {
    recommendedChallengeType: string;
  };
  effectivenessScore: number;
  confidenceScore: number;
  classification: 'experimental' | 'reutilizable';
  evidenceCount: number;
  preparedRecommendation: string;
  createdAt: number;
  lastAnalyzedAt: number;
}
