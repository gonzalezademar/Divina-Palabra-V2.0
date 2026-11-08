import { EnterpriseEventBus } from '../../eventing/EnterpriseEventBus';
import { learningPersonalizationDomainService } from './LearningPersonalizationDomainService';
import { learningPredictionDomainService } from './LearningPredictionDomainService';
import { learningGoalsDomainService } from './LearningGoalsDomainService';
import { learningCompetencyDomainService } from './LearningCompetencyDomainService';
import { adaptiveFeedbackDomainService } from './AdaptiveFeedbackDomainService';
import { adaptiveContentDomainService } from './AdaptiveContentDomainService';
import { recommendationDomainService } from './RecommendationDomainService';
import { analyticsDomainService } from './AnalyticsDomainService';

export class LearningStrategyDomainService {
  private static instance: LearningStrategyDomainService;
  
  private metrics = {
    activeStrategies: 0,
    strategyChanges: 0,
    strategySuccessRate: 0,
    strategyConfidence: 0,
    strategyEvaluations: 0,
    successfulEvaluations: 0
  };

  private strategyCache = new Map<string, any>();
  private allStrategiesCache = new Map<string, any[]>();

  private constructor() {}

  static getInstance(): LearningStrategyDomainService {
    if (!LearningStrategyDomainService.instance) {
      LearningStrategyDomainService.instance = new LearningStrategyDomainService();
    }
    return LearningStrategyDomainService.instance;
  }

  private generateStrategy(studentId: string): any {
    const profile = learningPersonalizationDomainService.getAdaptiveProfile(studentId);
    
    let strategyName = 'aprendizaje guiado';
    if (profile) {
      if (profile.learningPace === 'Rápido') strategyName = 'aprendizaje basado en retos';
      if (profile.weaknesses.length > 0) strategyName = 'revisión intensiva';
    }

    const strategy = {
      name: strategyName,
      description: `Estrategia enfocada en ${strategyName}`,
      priority: 1,
      confidenceLevel: profile ? profile.modelConfidenceLevel : 0.6,
      applicationConditions: ['Inicio de sesión', 'Rendimiento estable'],
      exitCriteria: ['80% de éxito en la sesión actual'],
      recommendations: ['Usar contenido mixto', 'Retroalimentación inmediata']
    };

    this.strategyCache.set(studentId, strategy);
    this.metrics.activeStrategies++;
    this.metrics.strategyChanges++;
    this.metrics.strategyConfidence = (this.metrics.strategyConfidence + strategy.confidenceLevel) / 2;

    const all = this.allStrategiesCache.get(studentId) || [];
    all.push(strategy);
    this.allStrategiesCache.set(studentId, all);

    return strategy;
  }

  public getLearningStrategy(studentId: string): any {
    if (!this.strategyCache.has(studentId)) {
      this.generateStrategy(studentId);
    }
    return this.strategyCache.get(studentId) || null;
  }

  public getCurrentStrategy(studentId: string): any {
    return this.getLearningStrategy(studentId);
  }

  public getLearningStrategies(studentId: string): any[] {
    if (!this.allStrategiesCache.has(studentId)) {
      this.getLearningStrategy(studentId);
    }
    return this.allStrategiesCache.get(studentId) || [];
  }

  public evaluateStrategyResult(studentId: string, sessionResult: any): void {
    this.metrics.strategyEvaluations++;
    const current = this.strategyCache.get(studentId);
    if (current && sessionResult) {
      if (sessionResult.successRate > 0.6) {
        this.metrics.successfulEvaluations++;
      }
    }
    this.metrics.strategySuccessRate = this.metrics.successfulEvaluations / (this.metrics.strategyEvaluations || 1);

    EnterpriseEventBus.getInstance().publish({
      name: 'StrategyEvaluated',
      category: 'Education',
      source: 'LearningStrategyDomainService',
      payload: { studentId, strategyName: current ? current.name : 'Unknown', successRate: this.metrics.strategySuccessRate },
      metadata: {}
    });
  }

  public getMetrics(): any {
    return this.metrics;
  }
}

export const learningStrategyDomainService = LearningStrategyDomainService.getInstance();
