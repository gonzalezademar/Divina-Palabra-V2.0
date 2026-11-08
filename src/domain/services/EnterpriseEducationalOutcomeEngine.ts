import { EducationalOutcome } from '../entities/EducationalOutcome';
import { EducationalExperience, ExperienceEvaluation } from '../entities/EducationalExperience';
import { EducationalStrategy } from '../entities/EducationalStrategy';
import { enterpriseEducationalStrategyEngine } from './EnterpriseEducationalStrategyEngine';

export class EnterpriseEducationalOutcomeEngine {
  private static instance: EnterpriseEducationalOutcomeEngine;
  private outcomes = new Map<string, EducationalOutcome>();

  private metrics = {
    evaluatedOutcomes: 0,
    successfulStrategies: 0,
    discardedStrategies: 0,
    averageEducationalImpact: 0,
    improvementPercentage: 0
  };

  private constructor() {}

  static getInstance(): EnterpriseEducationalOutcomeEngine {
    if (!EnterpriseEducationalOutcomeEngine.instance) {
      EnterpriseEducationalOutcomeEngine.instance = new EnterpriseEducationalOutcomeEngine();
    }
    return EnterpriseEducationalOutcomeEngine.instance;
  }

  public getMetrics() {
    return this.metrics;
  }

  public evaluateAppliedStrategies(
    experience: EducationalExperience,
    evaluation: ExperienceEvaluation
  ): EducationalOutcome[] {
    const appliedStrategies = enterpriseEducationalStrategyEngine.getStrategies()
      .filter(strategy => strategy.recommendedAction.recommendedChallengeType === experience.decisionTaken.recommendedChallengeType);

    for (const strategy of appliedStrategies) {
      this.evaluateStrategy(strategy, experience, evaluation);
    }

    this.refreshMetrics();
    return this.getOutcomesForExperience(experience.id);
  }

  public getOutcomes(): EducationalOutcome[] {
    return Array.from(this.outcomes.values())
      .sort((a, b) => b.evaluatedAt - a.evaluatedAt)
      .map(outcome => ({ ...outcome }));
  }

  public getOutcomesForStrategy(strategyId: string): EducationalOutcome[] {
    return this.getOutcomes().filter(outcome => outcome.strategyId === strategyId);
  }

  private getOutcomesForExperience(experienceId: string): EducationalOutcome[] {
    return this.getOutcomes().filter(outcome => outcome.experienceId === experienceId);
  }

  private evaluateStrategy(
    strategy: EducationalStrategy,
    experience: EducationalExperience,
    evaluation: ExperienceEvaluation
  ): void {
    const outcomeKey = `${strategy.id}:${experience.id}`;
    if (this.outcomes.has(outcomeKey)) return;

    const baselineScore = strategy.effectivenessScore;
    const observedScore = (evaluation.qualityScore + evaluation.reliabilityScore) / 2;
    const educationalImpact = observedScore - baselineScore;
    const improvementPercentage = baselineScore > 0
      ? (educationalImpact / baselineScore) * 100
      : observedScore * 100;
    const successIndex = Math.max(0, Math.min(1, (observedScore * 0.7) + (strategy.confidenceScore * 0.3)));
    const status = this.classifyOutcome(educationalImpact, successIndex);

    this.outcomes.set(outcomeKey, {
      id: `outcome_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      strategyId: strategy.id,
      experienceId: experience.id,
      baselineScore,
      observedScore,
      educationalImpact,
      improvementPercentage,
      successIndex,
      status,
      evaluatedAt: Date.now()
    });
  }

  private classifyOutcome(educationalImpact: number, successIndex: number): 'exitosa' | 'neutral' | 'descartada' {
    if (educationalImpact >= 0 && successIndex >= 0.7) return 'exitosa';
    if (educationalImpact <= -0.1 || successIndex < 0.5) return 'descartada';
    return 'neutral';
  }

  private refreshMetrics(): void {
    const outcomes = Array.from(this.outcomes.values());
    this.metrics.evaluatedOutcomes = outcomes.length;
    this.metrics.successfulStrategies = outcomes.filter(outcome => outcome.status === 'exitosa').length;
    this.metrics.discardedStrategies = outcomes.filter(outcome => outcome.status === 'descartada').length;
    this.metrics.averageEducationalImpact = outcomes.length > 0
      ? outcomes.reduce((total, outcome) => total + outcome.educationalImpact, 0) / outcomes.length
      : 0;
    this.metrics.improvementPercentage = outcomes.length > 0
      ? outcomes.reduce((total, outcome) => total + outcome.improvementPercentage, 0) / outcomes.length
      : 0;
  }
}

export const enterpriseEducationalOutcomeEngine = EnterpriseEducationalOutcomeEngine.getInstance();
