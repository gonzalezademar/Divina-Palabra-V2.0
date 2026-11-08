import { EnterpriseEventBus } from '../../eventing/EnterpriseEventBus';
import { studentCognitiveModelDomainService } from './StudentCognitiveModelDomainService';
import { learningPredictionDomainService } from './LearningPredictionDomainService';
import { learningInterventionDomainService } from './LearningInterventionDomainService';
import { learningCompetencyDomainService } from './LearningCompetencyDomainService';
import { learningGoalsDomainService } from './LearningGoalsDomainService';
import { learningPathDomainService } from './LearningPathDomainService';
import { learningOptimizationDomainService } from './LearningOptimizationDomainService';
import { adaptiveContentDomainService } from './AdaptiveContentDomainService';
import { adaptiveFeedbackDomainService } from './AdaptiveFeedbackDomainService';
import { recommendationDomainService } from './RecommendationDomainService';
import { analyticsDomainService } from './AnalyticsDomainService';

export class LearningPersonalizationDomainService {
  private static instance: LearningPersonalizationDomainService;
  
  private metrics = {
    personalizationProfiles: 0,
    personalizationUpdates: 0,
    adaptiveSessions: 0,
    personalizationAccuracy: 0,
    modelConfidence: 0
  };

  private profileCache = new Map<string, any>();

  private constructor() {}

  static getInstance(): LearningPersonalizationDomainService {
    if (!LearningPersonalizationDomainService.instance) {
      LearningPersonalizationDomainService.instance = new LearningPersonalizationDomainService();
    }
    return LearningPersonalizationDomainService.instance;
  }

  private generateDefaultProfile(studentId: string): any {
    const profile = {
      id: `pers_${studentId}`,
      studentId: studentId,
      currentLevel: 'Intermedio',
      learningPace: 'Normal',
      strengths: ['Identificación de personajes'],
      weaknesses: ['Cronología de eventos'],
      predominantLearningStyle: 'Visual',
      acquiredCompetencies: ['comp_1'],
      pendingCompetencies: ['comp_2'],
      recommendedDifficulty: 'Intermedio',
      recommendedActivityTypes: ['mixto', 'visual'],
      suggestedReviewFrequency: 'semanal',
      modelConfidenceLevel: 0.75
    };
    this.profileCache.set(studentId, profile);
    this.metrics.personalizationProfiles++;
    this.metrics.modelConfidence = profile.modelConfidenceLevel;
    return profile;
  }

  public getLearningPersonalization(studentId: string): any {
    if (!this.profileCache.has(studentId)) {
      this.generateDefaultProfile(studentId);
    }
    return this.profileCache.get(studentId) || null;
  }

  public getPersonalizationSummary(studentId: string): any {
    const profile = this.getLearningPersonalization(studentId);
    if (!profile) return null;
    return {
      level: profile.currentLevel,
      pace: profile.learningPace,
      confidence: profile.modelConfidenceLevel,
      topStrength: profile.strengths[0] || 'N/A',
      topWeakness: profile.weaknesses[0] || 'N/A'
    };
  }

  public getAdaptiveProfile(studentId: string): any {
    return this.getLearningPersonalization(studentId);
  }

  public updatePersonalizationProfile(studentId: string, sessionResult: any): void {
    const profile = this.getLearningPersonalization(studentId);
    if (!profile) return;

    if (sessionResult) {
      const accuracy = sessionResult.successRate || 0.5;
      this.metrics.personalizationAccuracy = (this.metrics.personalizationAccuracy + accuracy) / 2;
      profile.modelConfidenceLevel = Math.min(profile.modelConfidenceLevel + 0.05, 1.0);
      
      if (accuracy > 0.8) {
        profile.recommendedDifficulty = 'Avanzado';
        profile.learningPace = 'Rápido';
      } else if (accuracy < 0.4) {
        profile.recommendedDifficulty = 'Principiante';
        profile.learningPace = 'Lento';
      }
    }
    
    this.metrics.modelConfidence = profile.modelConfidenceLevel;
    this.metrics.personalizationUpdates++;

    EnterpriseEventBus.getInstance().publish({
      name: 'PersonalizationProfileUpdated',
      category: 'Education',
      source: 'LearningPersonalizationDomainService',
      payload: { studentId, profile },
      metadata: {}
    });
  }

  public recordAdaptiveSession(): void {
    this.metrics.adaptiveSessions++;
  }

  public getMetrics(): any {
    return this.metrics;
  }
}

export const learningPersonalizationDomainService = LearningPersonalizationDomainService.getInstance();
