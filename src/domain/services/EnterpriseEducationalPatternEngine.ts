import { EducationalPattern, EducationalPatternEvidence } from '../entities/EducationalPattern';
import { InstitutionalEducationalLearning } from '../entities/InstitutionalEducationalLearning';
import { enterpriseInstitutionalLearningEngine } from './EnterpriseInstitutionalLearningEngine';

export class EnterpriseEducationalPatternEngine {
  private static instance: EnterpriseEducationalPatternEngine;
  private patterns = new Map<string, EducationalPattern>();

  private metrics = {
    institutionalLearningsAnalyzed: 0,
    detectedPatterns: 0,
    stablePatterns: 0,
    averagePatternConfidence: 0
  };

  private constructor() {}

  static getInstance(): EnterpriseEducationalPatternEngine {
    if (!EnterpriseEducationalPatternEngine.instance) {
      EnterpriseEducationalPatternEngine.instance = new EnterpriseEducationalPatternEngine();
    }
    return EnterpriseEducationalPatternEngine.instance;
  }

  public getMetrics() {
    return this.metrics;
  }

  public analyzeInstitutionalLearnings(): EducationalPattern[] {
    const learnings = enterpriseInstitutionalLearningEngine.getInstitutionalLearnings();
    this.metrics.institutionalLearningsAnalyzed += learnings.length;

    const learningsByChallengeType = this.groupByChallengeType(learnings);
    const detectedPatterns = new Map<string, EducationalPattern>();

    for (const [challengeType, groupedLearnings] of learningsByChallengeType) {
      const totalSuccessfulDecisions = groupedLearnings
        .reduce((total, learning) => total + learning.successfulDecisions, 0);

      if (groupedLearnings.length < 2 || totalSuccessfulDecisions < 3) {
        continue;
      }

      const evidence = groupedLearnings.map(learning => this.toEvidence(learning));
      const confidenceScore = this.calculateConfidence(groupedLearnings, totalSuccessfulDecisions);
      const isStable = totalSuccessfulDecisions >= 5 && confidenceScore >= 0.75;
      const patternKey = `challenge_type_recurrence:${challengeType}`;
      const existingPattern = this.patterns.get(patternKey);
      const now = Date.now();

      detectedPatterns.set(patternKey, {
        id: existingPattern?.id || `pattern_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'challenge_type_recurrence',
        condition: `recurring_success:${challengeType}`,
        recommendedAction: { recommendedChallengeType: challengeType },
        confidenceScore,
        importance: this.classifyImportance(totalSuccessfulDecisions, confidenceScore),
        isStable,
        evidence,
        detectedAt: existingPattern?.detectedAt || now,
        lastObservedAt: now
      });
    }

    this.patterns = detectedPatterns;
    this.refreshMetrics();
    return this.getDetectedPatterns();
  }

  public getDetectedPatterns(): EducationalPattern[] {
    return Array.from(this.patterns.values())
      .sort((a, b) => b.confidenceScore - a.confidenceScore)
      .map(pattern => ({
        ...pattern,
        recommendedAction: { ...pattern.recommendedAction },
        evidence: pattern.evidence.map(item => ({ ...item }))
      }));
  }

  private groupByChallengeType(learnings: InstitutionalEducationalLearning[]): Map<string, InstitutionalEducationalLearning[]> {
    return learnings.reduce((groups, learning) => {
      const challengeType = learning.recommendedAction.recommendedChallengeType;
      const group = groups.get(challengeType) || [];
      group.push(learning);
      groups.set(challengeType, group);
      return groups;
    }, new Map<string, InstitutionalEducationalLearning[]>());
  }

  private toEvidence(learning: InstitutionalEducationalLearning): EducationalPatternEvidence {
    return {
      learningId: learning.id,
      successfulDecisions: learning.successfulDecisions,
      qualityScore: learning.averageQualityScore,
      reliabilityScore: learning.averageReliabilityScore
    };
  }

  private calculateConfidence(learnings: InstitutionalEducationalLearning[], totalSuccessfulDecisions: number): number {
    const weightedScore = learnings.reduce((total, learning) => {
      const score = (learning.averageQualityScore + learning.averageReliabilityScore) / 2;
      return total + (score * learning.successfulDecisions);
    }, 0);
    const recurrenceConfidence = Math.min(1, totalSuccessfulDecisions / 10);
    const qualityConfidence = weightedScore / totalSuccessfulDecisions;
    return Math.min(1, (qualityConfidence * 0.7) + (recurrenceConfidence * 0.3));
  }

  private classifyImportance(totalSuccessfulDecisions: number, confidenceScore: number): 'baja' | 'media' | 'alta' {
    if (totalSuccessfulDecisions >= 5 && confidenceScore >= 0.75) return 'alta';
    if (totalSuccessfulDecisions >= 3 && confidenceScore >= 0.6) return 'media';
    return 'baja';
  }

  private refreshMetrics(): void {
    const patterns = Array.from(this.patterns.values());
    this.metrics.detectedPatterns = patterns.length;
    this.metrics.stablePatterns = patterns.filter(pattern => pattern.isStable).length;
    this.metrics.averagePatternConfidence = patterns.length > 0
      ? patterns.reduce((total, pattern) => total + pattern.confidenceScore, 0) / patterns.length
      : 0;
  }
}

export const enterpriseEducationalPatternEngine = EnterpriseEducationalPatternEngine.getInstance();
