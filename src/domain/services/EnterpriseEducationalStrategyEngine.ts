import { EducationalPattern } from '../entities/EducationalPattern';
import { EducationalStrategy } from '../entities/EducationalStrategy';
import { enterpriseEducationalPatternEngine } from './EnterpriseEducationalPatternEngine';

export class EnterpriseEducationalStrategyEngine {
  private static instance: EnterpriseEducationalStrategyEngine;
  private strategies = new Map<string, EducationalStrategy>();

  private metrics = {
    knownStrategies: 0,
    reusableStrategies: 0,
    averageEffectiveness: 0,
    strategicConfidence: 0
  };

  private constructor() {}

  static getInstance(): EnterpriseEducationalStrategyEngine {
    if (!EnterpriseEducationalStrategyEngine.instance) {
      EnterpriseEducationalStrategyEngine.instance = new EnterpriseEducationalStrategyEngine();
    }
    return EnterpriseEducationalStrategyEngine.instance;
  }

  public getMetrics() {
    return this.metrics;
  }

  public analyzeInstitutionalPatterns(): EducationalStrategy[] {
    const patterns = enterpriseEducationalPatternEngine.getDetectedPatterns();
    const analyzedStrategies = new Map<string, EducationalStrategy>();

    for (const pattern of patterns) {
      const existingStrategy = this.strategies.get(pattern.id);
      const effectivenessScore = this.calculateEffectiveness(pattern);
      const confidenceScore = this.calculateConfidence(pattern, effectivenessScore);
      const classification = this.classifyStrategy(pattern, effectivenessScore, confidenceScore);
      const now = Date.now();

      analyzedStrategies.set(pattern.id, {
        id: existingStrategy?.id || `strategy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        patternId: pattern.id,
        condition: pattern.condition,
        recommendedAction: { ...pattern.recommendedAction },
        effectivenessScore,
        confidenceScore,
        classification,
        evidenceCount: pattern.evidence.length,
        preparedRecommendation: this.prepareRecommendation(pattern, classification),
        createdAt: existingStrategy?.createdAt || now,
        lastAnalyzedAt: now
      });
    }

    this.strategies = analyzedStrategies;
    this.refreshMetrics();
    return this.getStrategies();
  }

  public getStrategies(): EducationalStrategy[] {
    return Array.from(this.strategies.values())
      .sort((a, b) => b.effectivenessScore - a.effectivenessScore)
      .map(strategy => ({ ...strategy, recommendedAction: { ...strategy.recommendedAction } }));
  }

  public getReusableStrategies(): EducationalStrategy[] {
    return this.getStrategies().filter(strategy => strategy.classification === 'reutilizable');
  }

  private calculateEffectiveness(pattern: EducationalPattern): number {
    const totalSuccessfulDecisions = pattern.evidence
      .reduce((total, evidence) => total + evidence.successfulDecisions, 0);
    if (totalSuccessfulDecisions === 0) return 0;

    const weightedEffectiveness = pattern.evidence.reduce((total, evidence) => {
      const historicalResult = (evidence.qualityScore + evidence.reliabilityScore) / 2;
      return total + (historicalResult * evidence.successfulDecisions);
    }, 0);

    return Math.min(1, weightedEffectiveness / totalSuccessfulDecisions);
  }

  private calculateConfidence(pattern: EducationalPattern, effectivenessScore: number): number {
    const evidenceConfidence = Math.min(1, pattern.evidence.length / 3);
    return Math.min(1, (pattern.confidenceScore * 0.5) + (effectivenessScore * 0.3) + (evidenceConfidence * 0.2));
  }

  private classifyStrategy(
    pattern: EducationalPattern,
    effectivenessScore: number,
    confidenceScore: number
  ): 'experimental' | 'reutilizable' {
    return pattern.isStable && effectivenessScore >= 0.7 && confidenceScore >= 0.75
      ? 'reutilizable'
      : 'experimental';
  }

  private prepareRecommendation(pattern: EducationalPattern, classification: 'experimental' | 'reutilizable'): string {
    return classification === 'reutilizable'
      ? `Preparada para reutilización bajo ${pattern.condition}`
      : `Pendiente de evidencia adicional bajo ${pattern.condition}`;
  }

  private refreshMetrics(): void {
    const strategies = Array.from(this.strategies.values());
    this.metrics.knownStrategies = strategies.length;
    this.metrics.reusableStrategies = strategies.filter(strategy => strategy.classification === 'reutilizable').length;
    this.metrics.averageEffectiveness = strategies.length > 0
      ? strategies.reduce((total, strategy) => total + strategy.effectivenessScore, 0) / strategies.length
      : 0;
    this.metrics.strategicConfidence = strategies.length > 0
      ? strategies.reduce((total, strategy) => total + strategy.confidenceScore, 0) / strategies.length
      : 0;
  }
}

export const enterpriseEducationalStrategyEngine = EnterpriseEducationalStrategyEngine.getInstance();
