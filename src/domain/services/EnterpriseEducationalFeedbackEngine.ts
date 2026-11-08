import { EducationalFeedback } from '../entities/EducationalFeedback';
import { EducationalOutcome } from '../entities/EducationalOutcome';
import { enterpriseEducationalOutcomeEngine } from './EnterpriseEducationalOutcomeEngine';

export class EnterpriseEducationalFeedbackEngine {
  private static instance: EnterpriseEducationalFeedbackEngine;
  private feedback = new Map<string, EducationalFeedback>();

  private metrics = {
    feedbackGenerated: 0,
    recommendationsCreated: 0,
    optimizationOpportunitiesDetected: 0,
    suggestedActions: 0,
    potentialImprovementPercentage: 0
  };

  private constructor() {}

  static getInstance(): EnterpriseEducationalFeedbackEngine {
    if (!EnterpriseEducationalFeedbackEngine.instance) {
      EnterpriseEducationalFeedbackEngine.instance = new EnterpriseEducationalFeedbackEngine();
    }
    return EnterpriseEducationalFeedbackEngine.instance;
  }

  public getMetrics() {
    return this.metrics;
  }

  public analyzeEducationalOutcomes(outcomes: EducationalOutcome[] = enterpriseEducationalOutcomeEngine.getOutcomes()): EducationalFeedback[] {
    const feedbackByCause = new Map<string, EducationalFeedback>();

    for (const [cause, groupedOutcomes] of this.groupOutcomesByCause(outcomes)) {
      const existingFeedback = this.feedback.get(cause);
      const recommendation = this.createRecommendation(cause);
      const suggestedActions = this.createSuggestedActions(cause);
      const potentialImprovementPercentage = this.calculatePotentialImprovement(groupedOutcomes, cause);
      const now = Date.now();

      feedbackByCause.set(cause, {
        id: existingFeedback?.id || `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        cause,
        outcomeIds: groupedOutcomes.map(outcome => outcome.id),
        recurrenceCount: groupedOutcomes.length,
        recommendation,
        suggestedActions,
        priority: this.classifyPriority(cause, groupedOutcomes.length, potentialImprovementPercentage),
        optimizationOpportunity: cause !== 'strategy_success',
        potentialImprovementPercentage,
        generatedAt: existingFeedback?.generatedAt || now,
        lastUpdatedAt: now
      });
    }

    this.feedback = feedbackByCause;
    this.refreshMetrics();
    return this.getFeedback();
  }

  public getFeedback(): EducationalFeedback[] {
    const priorityOrder = { alta: 3, media: 2, baja: 1 };
    return Array.from(this.feedback.values())
      .sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
      .map(item => ({ ...item, outcomeIds: [...item.outcomeIds], suggestedActions: [...item.suggestedActions] }));
  }

  public getPrioritizedFeedback(): EducationalFeedback[] {
    return this.getFeedback().filter(item => item.optimizationOpportunity);
  }

  private groupOutcomesByCause(outcomes: EducationalOutcome[]): Map<EducationalFeedback['cause'], EducationalOutcome[]> {
    return outcomes.reduce((groups, outcome) => {
      const cause = this.resolveCause(outcome);
      const group = groups.get(cause) || [];
      group.push(outcome);
      groups.set(cause, group);
      return groups;
    }, new Map<EducationalFeedback['cause'], EducationalOutcome[]>());
  }

  private resolveCause(outcome: EducationalOutcome): EducationalFeedback['cause'] {
    if (outcome.status === 'exitosa') return 'strategy_success';
    if (outcome.status === 'descartada') return 'strategy_failure';
    return 'strategy_neutral';
  }

  private createRecommendation(cause: EducationalFeedback['cause']): string {
    if (cause === 'strategy_success') return 'Conservar la estrategia como referencia interna para casos equivalentes';
    if (cause === 'strategy_failure') return 'Reducir la prioridad de la estrategia y revisar sus condiciones de uso';
    return 'Reunir evidencia adicional antes de promover la estrategia';
  }

  private createSuggestedActions(cause: EducationalFeedback['cause']): string[] {
    if (cause === 'strategy_success') return ['Preservar evidencia de efectividad', 'Mantener seguimiento de resultados'];
    if (cause === 'strategy_failure') return ['Marcar condición para revisión', 'Priorizar alternativas con mejor impacto'];
    return ['Incrementar evidencia observada'];
  }

  private calculatePotentialImprovement(outcomes: EducationalOutcome[], cause: EducationalFeedback['cause']): number {
    if (cause === 'strategy_success' || outcomes.length === 0) return 0;
    return outcomes.reduce((total, outcome) => total + Math.max(0, -outcome.improvementPercentage), 0) / outcomes.length;
  }

  private classifyPriority(
    cause: EducationalFeedback['cause'],
    recurrenceCount: number,
    potentialImprovementPercentage: number
  ): EducationalFeedback['priority'] {
    if (cause === 'strategy_failure' && (recurrenceCount >= 2 || potentialImprovementPercentage >= 10)) return 'alta';
    if (cause !== 'strategy_success') return 'media';
    return 'baja';
  }

  private refreshMetrics(): void {
    const feedback = Array.from(this.feedback.values());
    this.metrics.feedbackGenerated = feedback.length;
    this.metrics.recommendationsCreated = feedback.length;
    this.metrics.optimizationOpportunitiesDetected = feedback.filter(item => item.optimizationOpportunity).length;
    this.metrics.suggestedActions = feedback.reduce((total, item) => total + item.suggestedActions.length, 0);
    this.metrics.potentialImprovementPercentage = feedback.length > 0
      ? feedback.reduce((total, item) => total + item.potentialImprovementPercentage, 0) / feedback.length
      : 0;
  }
}

export const enterpriseEducationalFeedbackEngine = EnterpriseEducationalFeedbackEngine.getInstance();
