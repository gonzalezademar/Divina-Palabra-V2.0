import { EducationalExperience, ExperienceEvaluation } from '../entities/EducationalExperience';
import { enterpriseEducationalMemory } from './EnterpriseEducationalMemory';

export class EnterpriseExperienceEvaluationEngine {
  private static instance: EnterpriseExperienceEvaluationEngine;

  private metrics = {
    experiencesEvaluated: 0,
    averageQualityScore: 0,
    averageReliability: 0,
    topExperiencesCount: 0,
    discardableExperiences: 0
  };

  private constructor() {}

  static getInstance(): EnterpriseExperienceEvaluationEngine {
    if (!EnterpriseExperienceEvaluationEngine.instance) {
      EnterpriseExperienceEvaluationEngine.instance = new EnterpriseExperienceEvaluationEngine();
    }
    return EnterpriseExperienceEvaluationEngine.instance;
  }

  public getMetrics() {
    return this.metrics;
  }

  public evaluateExperience(experience: EducationalExperience): ExperienceEvaluation {
    this.metrics.experiencesEvaluated++;

    const successDegree = experience.observedResult === experience.expectedResult ? 1.0 : (experience.observedResult ? 0.5 : 0);
    const confidence = experience.confidenceLevel;
    
    let consistencyScore = 1.0;
    if (experience.decisionTaken.intelligenceReport) {
      consistencyScore = experience.decisionTaken.intelligenceReport.consistencyIndex;
    }

    const reuseCount = experience.evaluation ? experience.evaluation.reuseCount : 0;
    
    const stabilityScore = 0.8 + (reuseCount * 0.05);
    const clampedStability = Math.min(1.0, stabilityScore);

    const qualityScore = (successDegree * 0.4) + (confidence * 0.2) + (consistencyScore * 0.4);
    const reliabilityScore = (qualityScore * 0.6) + (clampedStability * 0.4);

    const evaluation: ExperienceEvaluation = {
      isEvaluated: true,
      qualityScore,
      reliabilityScore,
      successDegree,
      consistencyScore,
      stabilityScore: clampedStability,
      reuseCount
    };

    experience.evaluation = evaluation;

    this.metrics.averageQualityScore = (this.metrics.averageQualityScore + qualityScore) / 2;
    this.metrics.averageReliability = (this.metrics.averageReliability + reliabilityScore) / 2;
    
    if (qualityScore > 0.8) {
      this.metrics.topExperiencesCount++;
    }
    if (qualityScore < 0.4) {
      this.metrics.discardableExperiences++;
    }

    return evaluation;
  }

  public reEvaluateAll(studentId: string): void {
    const experiences = enterpriseEducationalMemory.getAllExperiences(studentId);
    for (const exp of experiences) {
      this.evaluateExperience(exp);
    }
  }

  public getTopExperiences(experiences: EducationalExperience[]): EducationalExperience[] {
    return experiences
      .filter(e => e.evaluation && e.evaluation.qualityScore > 0.8)
      .sort((a, b) => b.evaluation!.qualityScore - a.evaluation!.qualityScore);
  }

  public getExperiencesByQuality(experiences: EducationalExperience[], minScore: number): EducationalExperience[] {
    return experiences
      .filter(e => e.evaluation && e.evaluation.qualityScore >= minScore)
      .sort((a, b) => b.evaluation!.qualityScore - a.evaluation!.qualityScore);
  }

  public getTopExperiencesForStudent(studentId: string): EducationalExperience[] {
    const experiences = enterpriseEducationalMemory.getAllExperiences(studentId);
    return this.getTopExperiences(experiences);
  }

  public getExperiencesByQualityForStudent(studentId: string, minScore: number): EducationalExperience[] {
    const experiences = enterpriseEducationalMemory.getAllExperiences(studentId);
    return this.getExperiencesByQuality(experiences, minScore);
  }
}

export const enterpriseExperienceEvaluationEngine = EnterpriseExperienceEvaluationEngine.getInstance();
