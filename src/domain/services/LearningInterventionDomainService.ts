import { EnterpriseEventBus } from '../../eventing/EnterpriseEventBus';
import { learningPredictionDomainService } from './LearningPredictionDomainService';
import { studentCognitiveModelDomainService } from './StudentCognitiveModelDomainService';
import { learningCompetencyDomainService } from './LearningCompetencyDomainService';
import { learningGoalsDomainService } from './LearningGoalsDomainService';
import { learningPathDomainService } from './LearningPathDomainService';
import { learningOptimizationDomainService } from './LearningOptimizationDomainService';
import { recommendationDomainService } from './RecommendationDomainService';
import { adaptiveFeedbackDomainService } from './AdaptiveFeedbackDomainService';
import { analyticsDomainService } from './AnalyticsDomainService';

export class LearningInterventionDomainService {
  private static instance: LearningInterventionDomainService;
  
  private metrics = {
    learningInterventions: 0,
    successfulInterventions: 0,
    preventedFailures: 0,
    adaptiveCorrections: 0,
    interventionEffectiveness: 0
  };

  private interventionCache = new Map<string, any[]>();

  private constructor() {}

  static getInstance(): LearningInterventionDomainService {
    if (!LearningInterventionDomainService.instance) {
      LearningInterventionDomainService.instance = new LearningInterventionDomainService();
    }
    return LearningInterventionDomainService.instance;
  }

  private evaluateInterventions(studentId: string): void {
    const riskAnalysis = learningPredictionDomainService.getRiskAnalysis(studentId);
    
    if (riskAnalysis && riskAnalysis.requiresIntervention) {
      const existing = this.interventionCache.get(studentId) || [];
      const newIntervention = {
        id: `int_${studentId}_${Date.now()}`,
        type: riskAnalysis.frustrationRiskLevel > 0.5 ? 'ReduceDifficulty' : 'ChangeTopic',
        reason: riskAnalysis.frustrationRiskLevel > 0.5 ? 'High Frustration Risk' : 'High Abandonment Risk',
        priority: riskAnalysis.frustrationRiskLevel > 0.8 ? 'High' : 'Medium',
        suggestedAction: 'adapt_session',
        recommendedTiming: 'immediate',
        confidence: 0.85,
        status: 'pending'
      };
      existing.push(newIntervention);
      this.interventionCache.set(studentId, existing);
      this.metrics.learningInterventions++;
    }
  }

  public getLearningInterventions(studentId: string): any[] {
    this.evaluateInterventions(studentId);
    return this.interventionCache.get(studentId) || [];
  }

  public getPendingInterventions(studentId: string): any[] {
    const all = this.getLearningInterventions(studentId);
    return all.filter(i => i.status === 'pending');
  }

  public registerInterventionEffectiveness(studentId: string, sessionResult: any): void {
    const all = this.getLearningInterventions(studentId);
    const pending = all.filter(i => i.status === 'pending');
    
    if (pending.length === 0) return;

    pending.forEach(intervention => {
      intervention.status = 'completed';
      
      if (sessionResult && sessionResult.successRate > 0.6) {
        this.metrics.successfulInterventions++;
        this.metrics.preventedFailures++;
      }
      this.metrics.adaptiveCorrections++;
    });

    this.metrics.interventionEffectiveness = this.metrics.successfulInterventions / (this.metrics.learningInterventions || 1);

    EnterpriseEventBus.getInstance().publish({
      name: 'InterventionEvaluated',
      category: 'Education',
      source: 'LearningInterventionDomainService',
      payload: { studentId, effectiveness: this.metrics.interventionEffectiveness },
      metadata: {}
    });
  }

  public getInterventionStatistics(): any {
    return {
      total: this.metrics.learningInterventions,
      successful: this.metrics.successfulInterventions,
      effectiveness: this.metrics.interventionEffectiveness
    };
  }

  public getMetrics(): any {
    return this.metrics;
  }
}

export const learningInterventionDomainService = LearningInterventionDomainService.getInstance();
