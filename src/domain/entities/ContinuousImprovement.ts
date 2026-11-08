export interface ContinuousImprovement {
  id: string;
  cycleNumber: number;
  feedbackIds: string[];
  performanceIndex: number;
  evolutionIndex: number;
  learningStability: number;
  trend: 'mejora_sostenida' | 'estable' | 'estancamiento' | 'regresion';
  recommendations: string[];
  evaluatedAt: number;
}
