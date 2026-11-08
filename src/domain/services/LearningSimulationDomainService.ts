import { EnterpriseEventBus } from '../../eventing/EnterpriseEventBus';
import { studentCognitiveModelDomainService } from './StudentCognitiveModelDomainService';
import { learningPlannerDomainService } from './LearningPlannerDomainService';
import { recommendationDomainService } from './RecommendationDomainService';
import { adaptiveContentDomainService } from './AdaptiveContentDomainService';
import { adaptiveFeedbackDomainService } from './AdaptiveFeedbackDomainService';
import { analyticsDomainService } from './AnalyticsDomainService';

export class LearningSimulationDomainService {
  private static instance: LearningSimulationDomainService;
  
  private metrics = {
    learningSimulations: 0,
    simulationExecutions: 0,
    strategiesCompared: 0,
    strategySelections: 0,
    predictedLearningGain: 0
  };

  private simulationsCache = new Map<string, any[]>();
  private bestStrategyCache = new Map<string, any>();

  private constructor() {}

  static getInstance(): LearningSimulationDomainService {
    if (!LearningSimulationDomainService.instance) {
      LearningSimulationDomainService.instance = new LearningSimulationDomainService();
    }
    return LearningSimulationDomainService.instance;
  }

  public simulateStrategies(studentId: string): any[] {
    this.metrics.simulationExecutions++;

    const cognitiveModel = studentCognitiveModelDomainService.getCognitiveModel(studentId);
    if (!cognitiveModel) {
        return [];
    }

    const baseStrategies = [
      { id: 'strat_aggressive', type: 'Avanzado', count: 15, expectedLearning: 0.8 },
      { id: 'strat_balanced', type: 'Intermedio', count: 10, expectedLearning: 0.6 },
      { id: 'strat_conservative', type: 'Principiante', count: 5, expectedLearning: 0.3 }
    ];

    const simulations = baseStrategies.map(strat => {
      const successProb = cognitiveModel.successProbability * (strat.expectedLearning > 0.5 ? 0.8 : 1.2);
      return {
        strategyId: strat.id,
        suggestedDifficulty: strat.type,
        exerciseCount: strat.count,
        successProbability: Math.min(Math.max(successProb, 0), 1),
        estimatedTime: strat.count * 1.5, // roughly 1.5 mins per exercise
        expectedMotivation: strat.type === 'Intermedio' ? 0.9 : 0.7,
        expectedDifficulty: strat.type,
        expectedLearning: strat.expectedLearning,
        estimatedRisk: 1 - successProb,
        score: (successProb * 0.4) + (strat.expectedLearning * 0.4) + ((strat.type === 'Intermedio' ? 0.9 : 0.7) * 0.2)
      };
    });

    this.metrics.learningSimulations += simulations.length;
    this.metrics.strategiesCompared++;

    this.simulationsCache.set(studentId, simulations);

    // Automatically select the best strategy
    const best = simulations.reduce((prev, curr) => (prev.score > curr.score) ? prev : curr, simulations[0]);
    this.bestStrategyCache.set(studentId, best);
    this.metrics.strategySelections++;
    this.metrics.predictedLearningGain = best.expectedLearning;

    EnterpriseEventBus.getInstance().publish({
      name: 'LearningSimulationCompleted',
      category: 'Education',
      source: 'LearningSimulationDomainService',
      payload: { studentId, simulations, bestStrategy: best },
      metadata: {}
    });

    return simulations;
  }

  public getLearningSimulations(studentId: string): any[] {
    return this.simulationsCache.get(studentId) || [];
  }

  public getBestLearningStrategy(studentId: string): any {
    if (!this.bestStrategyCache.has(studentId)) {
        this.simulateStrategies(studentId);
    }
    return this.bestStrategyCache.get(studentId) || null;
  }

  public getMetrics(): any {
    return this.metrics;
  }
}

export const learningSimulationDomainService = LearningSimulationDomainService.getInstance();
