import { EnterpriseEventBus } from '../../eventing/EnterpriseEventBus';
import { aiHistory } from '../../ai/AIHistory';
import { recommendationDomainService } from './RecommendationDomainService';
import { analyticsDomainService } from './AnalyticsDomainService';
import { contentRegistry } from '../../content/ContentRegistry';
import { adaptiveFeedbackDomainService } from './AdaptiveFeedbackDomainService';
import { studentCognitiveModelDomainService } from './StudentCognitiveModelDomainService';

export class LearningPlannerDomainService {
  private static instance: LearningPlannerDomainService;
  private metrics = {
    learningPlansGenerated: 0,
    plannedLessons: 0,
    plannedChallenges: 0,
    contentSelections: 0,
    plannerExecutions: 0
  };
  private plansCache = new Map<string, any>();

  private constructor() {}

  static getInstance(): LearningPlannerDomainService {
    if (!LearningPlannerDomainService.instance) {
      LearningPlannerDomainService.instance = new LearningPlannerDomainService();
    }
    return LearningPlannerDomainService.instance;
  }

  public generateLearningPlan(studentId: string): any {
    this.metrics.plannerExecutions++;

    const profile = recommendationDomainService.getLearningProfile(studentId);
    const predictions = analyticsDomainService.getPredictiveAnalytics(studentId) || analyticsDomainService.calculatePredictiveIndicators(studentId);
    const recommendations = recommendationDomainService.popPendingRecommendations(studentId) || { recommendedTheme: 'Fe' };
    const feedback = adaptiveFeedbackDomainService.getAdaptiveSuccessMetrics(studentId);
    const cognitiveModel = studentCognitiveModelDomainService.getCognitiveModel(studentId);

    // Placeholder content registry logic
    const packages = contentRegistry.getPackages();
    this.metrics.contentSelections++;

    const plan = {
      targetDifficulty: predictions.riskOfFrustration > 0.6 ? 'Principiante' : 'Avanzado',
      suggestedExerciseCount: predictions.riskOfAbandonment > 0.5 ? 5 : 12,
      recommendedActivityType: predictions.expectedMasteryLevel < 0.5 ? 'repaso' : 'mixto',
      priorityTopics: ['Salvación', recommendations.recommendedTheme].filter(Boolean),
      reinforcementTopics: profile.weaknesses,
      recommendedContentOrder: ['challenge_1', 'lesson_1', 'challenge_2']
    };

    this.plansCache.set(studentId, plan);
    this.metrics.learningPlansGenerated++;
    this.metrics.plannedLessons += 1;
    this.metrics.plannedChallenges += plan.suggestedExerciseCount;

    EnterpriseEventBus.getInstance().publish({
      name: 'LearningPlanGenerated',
      category: 'Education',
      source: 'LearningPlannerDomainService',
      payload: { studentId, plan },
      metadata: {}
    });

    aiHistory.record(
      { provider: 'LocalFallback', type: 'planning' },
      { plan, profileId: profile.id },
      10,
      'success'
    );

    return plan;
  }

  public getLearningPlan(studentId: string): any {
    if (!this.plansCache.has(studentId)) {
        this.generateLearningPlan(studentId);
    }
    return this.plansCache.get(studentId) || null;
  }

  public getNextRecommendedActivities(studentId: string): any[] {
    const plan = this.getLearningPlan(studentId);
    if (!plan) return [];
    return plan.recommendedContentOrder || [];
  }

  public getMetrics(): any {
    return this.metrics;
  }
}

export const learningPlannerDomainService = LearningPlannerDomainService.getInstance();
