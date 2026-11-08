import { EnterpriseEventBus } from '../../eventing/EnterpriseEventBus';
import { learningPlannerDomainService } from './LearningPlannerDomainService';
import { recommendationDomainService } from './RecommendationDomainService';
import { analyticsDomainService } from './AnalyticsDomainService';
import { aiManager } from '../../ai/AIManager';
import { contentRegistry } from '../../content/ContentRegistry';
import { studentCognitiveModelDomainService } from './StudentCognitiveModelDomainService';

export class AdaptiveContentDomainService {
  private static instance: AdaptiveContentDomainService;
  private metrics = {
    adaptiveContentsGenerated: 0,
    adaptiveQuestionsGenerated: 0,
    adaptiveChallengesGenerated: 0,
    adaptiveReviewsGenerated: 0,
    adaptiveGenerationExecutions: 0
  };
  private contentCache = new Map<string, any[]>();

  private constructor() {}

  static getInstance(): AdaptiveContentDomainService {
    if (!AdaptiveContentDomainService.instance) {
      AdaptiveContentDomainService.instance = new AdaptiveContentDomainService();
    }
    return AdaptiveContentDomainService.instance;
  }

  public async generateAdaptiveContent(studentId: string): Promise<any[]> {
    this.metrics.adaptiveGenerationExecutions++;
    const plan = learningPlannerDomainService.getLearningPlan(studentId);
    const cognitiveModel = studentCognitiveModelDomainService.getCognitiveModel(studentId);
    
    if (!plan) return [];

    // Simulate AI content generation based on plan
    const newContent = [];
    
    // Simulate generation logic (in memory)
    if (plan.recommendedActivityType === 'repaso') {
      newContent.push({
        id: `adaptive_rev_${Date.now()}_1`,
        type: 'review',
        topics: plan.priorityTopics,
        difficulty: plan.targetDifficulty,
        adaptive: true
      });
      this.metrics.adaptiveReviewsGenerated++;
      this.metrics.adaptiveContentsGenerated++;
    } else {
      newContent.push({
        id: `adaptive_chal_${Date.now()}_1`,
        type: 'challenge',
        topics: plan.priorityTopics,
        difficulty: plan.targetDifficulty,
        adaptive: true
      });
      this.metrics.adaptiveChallengesGenerated++;
      this.metrics.adaptiveContentsGenerated++;
      
      newContent.push({
        id: `adaptive_q_${Date.now()}_1`,
        type: 'question',
        topics: plan.reinforcementTopics,
        difficulty: plan.targetDifficulty,
        adaptive: true
      });
      this.metrics.adaptiveQuestionsGenerated++;
      this.metrics.adaptiveContentsGenerated++;
    }

    // Try AI Manager generation in background
    try {
      aiManager.execute({
        id: `ai_content_gen_${Date.now()}`,
        prompt: `Generate adaptive content for student ${studentId} with plan: ${JSON.stringify(plan)}`,
        timestamp: Date.now(),
        parameters: { type: 'content_generation' }
      }).catch(() => {});
    } catch (e) {}

    const existing = this.contentCache.get(studentId) || [];
    this.contentCache.set(studentId, [...existing, ...newContent]);

    EnterpriseEventBus.getInstance().publish({
      name: 'AdaptiveContentGenerated',
      category: 'Education',
      source: 'AdaptiveContentDomainService',
      payload: { studentId, newContent },
      metadata: {}
    });

    return newContent;
  }

  public getAdaptiveContent(studentId: string): any[] {
    return this.contentCache.get(studentId) || [];
  }

  public getGeneratedActivities(studentId: string): any[] {
    return this.getAdaptiveContent(studentId).filter(c => c.type === 'challenge' || c.type === 'review');
  }

  public getMetrics(): any {
    return this.metrics;
  }
}

export const adaptiveContentDomainService = AdaptiveContentDomainService.getInstance();
