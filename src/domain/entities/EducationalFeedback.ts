export interface EducationalFeedback {
  id: string;
  cause: 'strategy_success' | 'strategy_neutral' | 'strategy_failure';
  outcomeIds: string[];
  recurrenceCount: number;
  recommendation: string;
  suggestedActions: string[];
  priority: 'baja' | 'media' | 'alta';
  optimizationOpportunity: boolean;
  potentialImprovementPercentage: number;
  generatedAt: number;
  lastUpdatedAt: number;
}
