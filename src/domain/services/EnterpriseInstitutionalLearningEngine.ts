import { EducationalExperience, ExperienceEvaluation } from '../entities/EducationalExperience';
import { InstitutionalEducationalLearning } from '../entities/InstitutionalEducationalLearning';

/**
 * Consolidates successful evaluated decisions into local, anonymized
 * institutional learning patterns. It never participates in decision making.
 */
export class EnterpriseInstitutionalLearningEngine {
  private static instance: EnterpriseInstitutionalLearningEngine;
  private learnings = new Map<string, InstitutionalEducationalLearning>();
  private consolidatedExperienceIds = new Set<string>();

  private metrics = {
    successfulDecisionsConsolidated: 0,
    institutionalPatterns: 0,
    averageInstitutionalQuality: 0,
    averageInstitutionalReliability: 0
  };

  private constructor() {}

  static getInstance(): EnterpriseInstitutionalLearningEngine {
    if (!EnterpriseInstitutionalLearningEngine.instance) {
      EnterpriseInstitutionalLearningEngine.instance = new EnterpriseInstitutionalLearningEngine();
    }
    return EnterpriseInstitutionalLearningEngine.instance;
  }

  public getMetrics() {
    return this.metrics;
  }

  public consolidateSuccessfulDecision(experience: EducationalExperience, evaluation: ExperienceEvaluation): void {
    if (evaluation.qualityScore <= 0.5 || this.consolidatedExperienceIds.has(experience.id)) {
      return;
    }

    const decisionSignature = this.createDecisionSignature(experience);
    const existing = this.learnings.get(decisionSignature);
    const now = Date.now();

    if (existing) {
      const previousCount = existing.successfulDecisions;
      const currentCount = previousCount + 1;
      existing.successfulDecisions = currentCount;
      existing.averageQualityScore = this.calculateAverage(
        existing.averageQualityScore,
        previousCount,
        evaluation.qualityScore
      );
      existing.averageReliabilityScore = this.calculateAverage(
        existing.averageReliabilityScore,
        previousCount,
        evaluation.reliabilityScore
      );
      existing.lastLearnedAt = now;
    } else {
      this.learnings.set(decisionSignature, {
        id: `institutional_learning_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        decisionSignature,
        recommendedAction: {
          suggestedDifficulty: experience.decisionTaken.suggestedDifficulty,
          recommendedChallengeType: experience.decisionTaken.recommendedChallengeType
        },
        successfulDecisions: 1,
        averageQualityScore: evaluation.qualityScore,
        averageReliabilityScore: evaluation.reliabilityScore,
        firstLearnedAt: now,
        lastLearnedAt: now
      });
    }

    this.consolidatedExperienceIds.add(experience.id);
    this.metrics.successfulDecisionsConsolidated++;
    this.refreshMetrics();
  }

  public getInstitutionalLearnings(): InstitutionalEducationalLearning[] {
    return Array.from(this.learnings.values())
      .sort((a, b) => b.successfulDecisions - a.successfulDecisions)
      .map(learning => ({ ...learning, recommendedAction: { ...learning.recommendedAction } }));
  }

  private createDecisionSignature(experience: EducationalExperience): string {
    const decision = experience.decisionTaken;
    return `${decision.suggestedDifficulty}:${decision.recommendedChallengeType}`;
  }

  private calculateAverage(currentAverage: number, count: number, nextValue: number): number {
    return ((currentAverage * count) + nextValue) / (count + 1);
  }

  private refreshMetrics(): void {
    const learnings = Array.from(this.learnings.values());
    this.metrics.institutionalPatterns = learnings.length;
    this.metrics.averageInstitutionalQuality = learnings.length > 0
      ? learnings.reduce((total, learning) => total + learning.averageQualityScore, 0) / learnings.length
      : 0;
    this.metrics.averageInstitutionalReliability = learnings.length > 0
      ? learnings.reduce((total, learning) => total + learning.averageReliabilityScore, 0) / learnings.length
      : 0;
  }
}

export const enterpriseInstitutionalLearningEngine = EnterpriseInstitutionalLearningEngine.getInstance();
