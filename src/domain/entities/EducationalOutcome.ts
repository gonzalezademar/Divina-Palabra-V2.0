export interface EducationalOutcome {
  id: string;
  strategyId: string;
  experienceId: string;
  baselineScore: number;
  observedScore: number;
  educationalImpact: number;
  improvementPercentage: number;
  successIndex: number;
  status: 'exitosa' | 'neutral' | 'descartada';
  evaluatedAt: number;
}
