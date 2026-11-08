import { ContinuousImprovement } from '../entities/ContinuousImprovement';
import { EducationalFeedback } from '../entities/EducationalFeedback';
import { enterpriseEducationalFeedbackEngine } from './EnterpriseEducationalFeedbackEngine';

export class EnterpriseContinuousImprovementEngine {
  private static instance: EnterpriseContinuousImprovementEngine;
  private cycles: ContinuousImprovement[] = [];

  private metrics = {
    cyclesEvaluated: 0,
    continuousImprovement: 0,
    regressionsDetected: 0,
    learningStability: 0,
    globalEvolutionIndex: 0
  };

  private constructor() {}

  static getInstance(): EnterpriseContinuousImprovementEngine {
    if (!EnterpriseContinuousImprovementEngine.instance) {
      EnterpriseContinuousImprovementEngine.instance = new EnterpriseContinuousImprovementEngine();
    }
    return EnterpriseContinuousImprovementEngine.instance;
  }

  public getMetrics() {
    return this.metrics;
  }

  public evaluateFeedbackCycle(feedback: EducationalFeedback[] = enterpriseEducationalFeedbackEngine.getFeedback()): ContinuousImprovement {
    const previousCycle = this.cycles[this.cycles.length - 1];
    const performanceIndex = this.calculatePerformanceIndex(feedback);
    const evolutionIndex = previousCycle ? performanceIndex - previousCycle.performanceIndex : 0;
    const trend = this.classifyTrend(evolutionIndex, previousCycle);
    const learningStability = this.calculateLearningStability(evolutionIndex, previousCycle);
    const cycle: ContinuousImprovement = {
      id: `improvement_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      cycleNumber: this.cycles.length + 1,
      feedbackIds: feedback.map(item => item.id),
      performanceIndex,
      evolutionIndex,
      learningStability,
      trend,
      recommendations: this.createRecommendations(trend),
      evaluatedAt: Date.now()
    };

    this.cycles.push(cycle);
    this.refreshMetrics();
    return this.cloneCycle(cycle);
  }

  public getCycles(): ContinuousImprovement[] {
    return this.cycles.map(cycle => this.cloneCycle(cycle));
  }

  public getLatestCycle(): ContinuousImprovement | null {
    const cycle = this.cycles[this.cycles.length - 1];
    return cycle ? this.cloneCycle(cycle) : null;
  }

  private calculatePerformanceIndex(feedback: EducationalFeedback[]): number {
    if (feedback.length === 0) return 0;
    const successfulFeedback = feedback.filter(item => item.cause === 'strategy_success').length;
    const opportunityRatio = feedback.filter(item => item.optimizationOpportunity).length / feedback.length;
    return Math.max(0, Math.min(1, ((successfulFeedback / feedback.length) * 0.6) + ((1 - opportunityRatio) * 0.4)));
  }

  private classifyTrend(
    evolutionIndex: number,
    previousCycle: ContinuousImprovement | undefined
  ): ContinuousImprovement['trend'] {
    if (evolutionIndex <= -0.05) return 'regresion';
    if (evolutionIndex >= 0.05 && previousCycle?.trend === 'mejora_sostenida') return 'mejora_sostenida';
    if (evolutionIndex >= 0.05) return 'estable';
    return 'estancamiento';
  }

  private calculateLearningStability(
    evolutionIndex: number,
    previousCycle: ContinuousImprovement | undefined
  ): number {
    if (!previousCycle) return 1;
    return Math.max(0, Math.min(1, 1 - Math.abs(evolutionIndex)));
  }

  private createRecommendations(trend: ContinuousImprovement['trend']): string[] {
    if (trend === 'mejora_sostenida') return ['Consolidar las condiciones que sostienen la mejora'];
    if (trend === 'regresion') return ['Priorizar oportunidades de optimización de alta prioridad'];
    if (trend === 'estancamiento') return ['Incrementar la evidencia antes de ajustar estrategias'];
    return ['Continuar el monitoreo del ciclo educativo'];
  }

  private refreshMetrics(): void {
    this.metrics.cyclesEvaluated = this.cycles.length;
    this.metrics.continuousImprovement = this.cycles.length > 0
      ? (this.cycles.filter(cycle => cycle.evolutionIndex > 0).length / this.cycles.length) * 100
      : 0;
    this.metrics.regressionsDetected = this.cycles.filter(cycle => cycle.trend === 'regresion').length;
    this.metrics.learningStability = this.cycles.length > 0
      ? this.cycles.reduce((total, cycle) => total + cycle.learningStability, 0) / this.cycles.length
      : 0;
    this.metrics.globalEvolutionIndex = this.cycles.length > 0
      ? this.cycles.reduce((total, cycle) => total + cycle.evolutionIndex, 0) / this.cycles.length
      : 0;
  }

  private cloneCycle(cycle: ContinuousImprovement): ContinuousImprovement {
    return {
      ...cycle,
      feedbackIds: [...cycle.feedbackIds],
      recommendations: [...cycle.recommendations]
    };
  }
}

export const enterpriseContinuousImprovementEngine = EnterpriseContinuousImprovementEngine.getInstance();
