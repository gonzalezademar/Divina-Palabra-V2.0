import { EnterpriseEventBus } from '../../eventing/EnterpriseEventBus';
import { adaptiveContentDomainService } from './AdaptiveContentDomainService';
import { learningPlannerDomainService } from './LearningPlannerDomainService';
import { recommendationDomainService } from './RecommendationDomainService';
import { analyticsDomainService } from './AnalyticsDomainService';
import { aiHistory } from '../../ai/AIHistory';
import { assessmentEngine } from '../../services/assessmentEngine';

export class AdaptiveFeedbackDomainService {
  private static instance: AdaptiveFeedbackDomainService;
  
  private metrics = {
    adaptiveFeedbacks: 0,
    adaptiveSuccessRate: 0,
    adaptiveImprovements: 0,
    adaptiveEvaluations: 0,
    adaptiveOptimizationCycles: 0
  };

  private feedbackCache = new Map<string, any[]>();
  private currentAggregates = new Map<string, any>();

  private constructor() {}

  static getInstance(): AdaptiveFeedbackDomainService {
    if (!AdaptiveFeedbackDomainService.instance) {
      AdaptiveFeedbackDomainService.instance = new AdaptiveFeedbackDomainService();
    }
    return AdaptiveFeedbackDomainService.instance;
  }

  public registerAdaptiveSessionResult(studentId: string, results: any): void {
    this.metrics.adaptiveEvaluations++;
    
    // Simulate computing adaptive effectiveness
    const successRate = results.accuracy || 75;
    const improvement = results.scoreDelta || 5;
    const resolutionTime = results.timeTaken || 120;
    const acceptance = results.completed ? 1 : 0;

    const feedback = {
      timestamp: Date.now(),
      successRate,
      improvement,
      resolutionTime,
      acceptance,
      recommendationEffectiveness: successRate > 70 ? 'High' : 'Low',
      planEffectiveness: improvement > 0 ? 'High' : 'Needs Adjustment'
    };

    const studentFeedback = this.feedbackCache.get(studentId) || [];
    studentFeedback.push(feedback);
    this.feedbackCache.set(studentId, studentFeedback);

    this.metrics.adaptiveFeedbacks++;
    if (improvement > 0) {
      this.metrics.adaptiveImprovements++;
    }

    // Update aggregates
    const total = this.metrics.adaptiveFeedbacks;
    this.metrics.adaptiveSuccessRate = ((this.metrics.adaptiveSuccessRate * (total - 1)) + successRate) / total;
    this.metrics.adaptiveOptimizationCycles++;
    
    this.currentAggregates.set(studentId, {
      averageSuccessRate: studentFeedback.reduce((acc, f) => acc + f.successRate, 0) / studentFeedback.length,
      totalImprovement: studentFeedback.reduce((acc, f) => acc + f.improvement, 0)
    });

    EnterpriseEventBus.getInstance().publish({
      name: 'AdaptiveFeedbackRegistered',
      category: 'Education',
      source: 'AdaptiveFeedbackDomainService',
      payload: { studentId, feedback },
      metadata: {}
    });

    aiHistory.record(
      { provider: 'LocalFallback', type: 'feedback' },
      { studentId, feedback },
      5,
      'success'
    );
  }

  public getAdaptiveFeedback(studentId: string): any {
    return this.feedbackCache.get(studentId) || [];
  }

  public getAdaptiveSuccessMetrics(studentId: string): any {
    return this.currentAggregates.get(studentId) || { averageSuccessRate: 0, totalImprovement: 0 };
  }

  public getAdaptiveImprovementHistory(studentId: string): any[] {
    const feedback = this.getAdaptiveFeedback(studentId);
    return feedback.map((f: any) => ({
      timestamp: f.timestamp,
      improvement: f.improvement,
      planEffectiveness: f.planEffectiveness
    }));
  }

  public getMetrics(): any {
    return this.metrics;
  }
}

export const adaptiveFeedbackDomainService = AdaptiveFeedbackDomainService.getInstance();
