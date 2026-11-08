import { EnterpriseEventBus } from '../../eventing/EnterpriseEventBus';
import { learningSimulationDomainService } from './LearningSimulationDomainService';
import { studentCognitiveModelDomainService } from './StudentCognitiveModelDomainService';
import { adaptiveFeedbackDomainService } from './AdaptiveFeedbackDomainService';
import { analyticsDomainService } from './AnalyticsDomainService';
import { recommendationDomainService } from './RecommendationDomainService';
import { learningPlannerDomainService } from './LearningPlannerDomainService';
import { adaptiveContentDomainService } from './AdaptiveContentDomainService';
import { learningGoalsDomainService } from './LearningGoalsDomainService';
import { learningCompetencyDomainService } from './LearningCompetencyDomainService';
import { learningPathDomainService } from './LearningPathDomainService';
import { learningPredictionDomainService } from './LearningPredictionDomainService';
import { learningInterventionDomainService } from './LearningInterventionDomainService';
import { learningPersonalizationDomainService } from './LearningPersonalizationDomainService';
import { learningStrategyDomainService } from './LearningStrategyDomainService';
import { learningObjectivesDomainService } from './LearningObjectivesDomainService';
import { learningProgressDomainService } from './LearningProgressDomainService';

export class LearningOptimizationDomainService {
  private static instance: LearningOptimizationDomainService;
  
  private metrics = {
    optimizationCycles: 0,
    optimizedRecommendations: 0,
    optimizedPlans: 0,
    optimizedContents: 0,
    predictionAccuracy: 0,
    continuousLearningIterations: 0
  };

  private optimizationHistory = new Map<string, any[]>();
  private currentState = new Map<string, any>();

  private constructor() {}

  static getInstance(): LearningOptimizationDomainService {
    if (!LearningOptimizationDomainService.instance) {
      LearningOptimizationDomainService.instance = new LearningOptimizationDomainService();
    }
    return LearningOptimizationDomainService.instance;
  }

  public async runOptimizationCycle(studentId: string, sessionResult: any, consolidatedData?: any): Promise<void> {
    try {
      this.metrics.optimizationCycles++;
      this.metrics.continuousLearningIterations++;

      const cognitiveModel = consolidatedData?.cognitiveModel || studentCognitiveModelDomainService.getCognitiveModel(studentId);
      const simulations = consolidatedData?.simulations || learningSimulationDomainService.getLearningSimulations(studentId);
      const bestStrategy = consolidatedData?.bestStrategy || learningSimulationDomainService.getBestLearningStrategy(studentId);
      const feedback = consolidatedData?.feedback || adaptiveFeedbackDomainService.getAdaptiveSuccessMetrics(studentId);

      // 1. Compare real results vs predictions
      let accuracy = 0.5;
      if (bestStrategy && sessionResult) {
        const expectedSuccess = bestStrategy.successProbability;
        const actualSuccess = sessionResult.successRate || 0.5;
        accuracy = 1.0 - Math.abs(expectedSuccess - actualSuccess);
      }
      this.metrics.predictionAccuracy = (this.metrics.predictionAccuracy + accuracy) / 2;

      // 2. Detect successful and ineffective strategies
      const successfulStrategies = [];
      const ineffectiveStrategies = [];
      if (accuracy > 0.8) {
        successfulStrategies.push(bestStrategy?.strategyId);
      } else {
        ineffectiveStrategies.push(bestStrategy?.strategyId);
      }

      // 3. Adjust future priorities
      const currentOptimization = {
        studentId,
        accuracy,
        successfulStrategies,
        ineffectiveStrategies,
        lastOptimizedAt: Date.now()
      };

      this.currentState.set(studentId, currentOptimization);
      
      const history = this.optimizationHistory.get(studentId) || [];
      history.push(currentOptimization);
      this.optimizationHistory.set(studentId, history);

      // Increment tracking counters (in-memory simulation of actual logic adjustments)
      this.metrics.optimizedRecommendations++;
      this.metrics.optimizedPlans++;
      this.metrics.optimizedContents++;

      // Update goal progress
      learningGoalsDomainService.updateGoalProgress(studentId, sessionResult);
      
      // Update competencies
      learningCompetencyDomainService.updateCompetencies(studentId, sessionResult);

      // Reorganize learning paths
      learningPathDomainService.reorganizePaths(studentId, sessionResult);
      
      // Recalculate predictions
      learningPredictionDomainService.recalculatePredictions(studentId, sessionResult);

      // Register intervention effectiveness
      learningInterventionDomainService.registerInterventionEffectiveness(studentId, sessionResult);

      // Update personalization profile
      learningPersonalizationDomainService.updatePersonalizationProfile(studentId, sessionResult);

      // Evaluate learning strategy
      learningStrategyDomainService.evaluateStrategyResult(studentId, sessionResult);

      // Update dynamic learning objectives
      learningObjectivesDomainService.updateObjectives(studentId, sessionResult);

      // Update integral learning progress
      learningProgressDomainService.updateProgress(studentId, sessionResult);

      EnterpriseEventBus.getInstance().publish({
        name: 'OptimizationCycleCompleted',
        category: 'Education',
        source: 'LearningOptimizationDomainService',
        payload: { studentId, optimization: currentOptimization },
        metadata: {}
      });
    } catch (e) {
      console.warn('LearningOptimizationDomainService: runOptimizationCycle failed', e);
    }
  }

  public getOptimizationMetrics(): any {
    return this.metrics;
  }

  public getOptimizationHistory(studentId: string): any[] {
    return this.optimizationHistory.get(studentId) || [];
  }

  public getCurrentOptimizationState(studentId: string): any {
    return this.currentState.get(studentId) || null;
  }
}

export const learningOptimizationDomainService = LearningOptimizationDomainService.getInstance();
