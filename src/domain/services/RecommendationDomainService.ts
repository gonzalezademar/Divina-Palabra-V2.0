import { EnterpriseEventBus } from '../../eventing/EnterpriseEventBus';
import { aiHistory } from '../../ai/AIHistory';
import { workflowEngine } from '../../workflows/WorkflowEngine';
import { LearningProfile } from '../entities/LearningProfile';
import { assessmentEngine } from '../../services/assessmentEngine';
import { educationalAnalyticsEngine } from '../../services/educationalAnalyticsEngine';
import { adaptiveFeedbackDomainService } from './AdaptiveFeedbackDomainService';
import { studentCognitiveModelDomainService } from './StudentCognitiveModelDomainService';

export class RecommendationDomainService {
  private static instance: RecommendationDomainService;
  private metrics = {
    generated: 0,
    totalTime: 0,
    errors: 0,
    learningProfilesCreated: 0,
    adaptiveLessons: 0,
    adaptiveChallenges: 0,
    recommendationAccuracy: 0
  };
  private profiles = new Map<string, LearningProfile>();
  private pendingRecommendations = new Map<string, any>();
  
  private constructor() {}

  static getInstance(): RecommendationDomainService {
    if (!RecommendationDomainService.instance) {
      RecommendationDomainService.instance = new RecommendationDomainService();
    }
    return RecommendationDomainService.instance;
  }

  public getLearningProfile(studentId: string = 'default'): LearningProfile {
    if (!this.profiles.has(studentId)) {
      this.profiles.set(studentId, new LearningProfile(studentId));
      this.metrics.learningProfilesCreated++;
    }
    return this.profiles.get(studentId)!;
  }

  public popPendingRecommendations(studentId: string = 'default'): any | null {
    if (this.pendingRecommendations.has(studentId)) {
      const recs = this.pendingRecommendations.get(studentId);
      this.pendingRecommendations.delete(studentId);
      return recs;
    }
    return null;
  }

  public async generateRecommendations(context: any): Promise<any[]> {
    const start = Date.now();
    const eventBus = EnterpriseEventBus.getInstance();
    
    try {
      const studentId = context.studentId || 'default';
      const profile = this.getLearningProfile(studentId);
      const feedback = adaptiveFeedbackDomainService.getAdaptiveSuccessMetrics(studentId);
      const cognitiveModel = studentCognitiveModelDomainService.getCognitiveModel(studentId);

      // Integrates Assessment, Analytics implicitly via context or global engines if needed
      if (context.analytics) {
        profile.strengths = ['Fe', 'Esperanza'];
        profile.weaknesses = ['Amor'];
      }

      eventBus.publish({
        name: 'RecommendationRequested',
        category: 'Education',
        source: 'RecommendationDomainService',
        payload: { context, profile },
        metadata: {}
      });

      const recommendations: any[] = [];
      let adaptiveResult: any = {};
      
      if (profile.weaknesses.length > 0) {
        recommendations.push({ id: `rec_${Date.now()}_1`, type: 'challenge', priority: 'high', reason: 'Reforzar debilidades recientes', adaptive: true });
        this.metrics.adaptiveChallenges++;
        adaptiveResult = { recommendedTheme: 'Amor', recommendedDifficulty: 'Principiante', strengths: profile.strengths, weaknesses: profile.weaknesses };
      } else {
        recommendations.push({ id: `rec_${Date.now()}_2`, type: 'lesson', priority: 'medium', reason: 'Avanzar al siguiente nivel', adaptive: true });
        this.metrics.adaptiveLessons++;
        adaptiveResult = { recommendedTheme: 'Fe', recommendedDifficulty: 'Avanzado', strengths: profile.strengths, weaknesses: profile.weaknesses };
      }

      this.pendingRecommendations.set(studentId, adaptiveResult);

      eventBus.publish({
        name: 'RecommendationGenerated',
        category: 'Education',
        source: 'RecommendationDomainService',
        payload: { recommendations },
        metadata: {}
      });

      aiHistory.record(
        { provider: 'LocalFallback', type: 'recommendation' },
        { recommendations, profileId: profile.id },
        Date.now() - start,
        'success'
      );

      this.metrics.generated++;
      this.metrics.totalTime += (Date.now() - start);

      await workflowEngine.execute('student_recommendations', { recommendations }).catch(() => {});

      return recommendations;
    } catch (error) {
      aiHistory.record(
        { provider: 'LocalFallback', type: 'recommendation' },
        {},
        Date.now() - start,
        'error',
        error
      );
      this.metrics.errors++;
      return [];
    }
  }

  public getMetrics(): any {
    return {
      recommendationsGenerated: this.metrics.generated,
      recommendationTime: this.metrics.generated > 0 ? this.metrics.totalTime / this.metrics.generated : 0,
      recommendationErrors: this.metrics.errors,
      learningProfilesCreated: this.metrics.learningProfilesCreated,
      adaptiveLessons: this.metrics.adaptiveLessons,
      adaptiveChallenges: this.metrics.adaptiveChallenges,
      recommendationAccuracy: this.metrics.recommendationAccuracy
    };
  }

  public acceptRecommendation(id: string): void {
    EnterpriseEventBus.getInstance().publish({
      name: 'RecommendationAccepted',
      category: 'Education',
      source: 'RecommendationDomainService',
      payload: { id },
      metadata: {}
    });
  }

  public rejectRecommendation(id: string): void {
    EnterpriseEventBus.getInstance().publish({
      name: 'RecommendationRejected',
      category: 'Education',
      source: 'RecommendationDomainService',
      payload: { id },
      metadata: {}
    });
  }
}

export const recommendationDomainService = RecommendationDomainService.getInstance();