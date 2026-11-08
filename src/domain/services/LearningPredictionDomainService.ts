import { EnterpriseEventBus } from '../../eventing/EnterpriseEventBus';
import { studentCognitiveModelDomainService } from './StudentCognitiveModelDomainService';
import { learningCompetencyDomainService } from './LearningCompetencyDomainService';
import { learningGoalsDomainService } from './LearningGoalsDomainService';
import { learningPathDomainService } from './LearningPathDomainService';
import { learningSimulationDomainService } from './LearningSimulationDomainService';
import { learningOptimizationDomainService } from './LearningOptimizationDomainService';
import { analyticsDomainService } from './AnalyticsDomainService';
import { recommendationDomainService } from './RecommendationDomainService';

export class LearningPredictionDomainService {
  private static instance: LearningPredictionDomainService;
  
  private metrics = {
    learningPredictions: 0,
    predictionAccuracy: 0,
    predictionUpdates: 0,
    riskAlerts: 0,
    adaptiveInterventions: 0
  };

  private predictionCache = new Map<string, any[]>();

  private constructor() {}

  static getInstance(): LearningPredictionDomainService {
    if (!LearningPredictionDomainService.instance) {
      LearningPredictionDomainService.instance = new LearningPredictionDomainService();
    }
    return LearningPredictionDomainService.instance;
  }

  private generateDefaultPredictions(studentId: string): any[] {
    const predictions = [
      {
        id: `pred_${studentId}_${Date.now()}`,
        student: studentId,
        evaluatedCompetency: 'comp_1',
        successProbability: 0.8,
        abandonmentRisk: 0.1,
        frustrationRisk: 0.2,
        estimatedDifficulty: 'Principiante',
        predictionConfidence: 0.85,
        generationDate: Date.now()
      }
    ];
    this.predictionCache.set(studentId, predictions);
    this.metrics.learningPredictions += predictions.length;
    return predictions;
  }

  public getLearningPredictions(studentId: string): any[] {
    if (!this.predictionCache.has(studentId)) {
      this.generateDefaultPredictions(studentId);
    }
    return this.predictionCache.get(studentId) || [];
  }

  public getPredictionSummary(studentId: string): any {
    const predictions = this.getLearningPredictions(studentId);
    if (predictions.length === 0) return null;
    
    // Simplistic summary logic
    const highRisk = predictions.some(p => p.abandonmentRisk > 0.5 || p.frustrationRisk > 0.5);
    if (highRisk) this.metrics.riskAlerts++;
    
    return {
      totalPredictions: predictions.length,
      overallRisk: highRisk ? 'High' : 'Low',
      latestPrediction: predictions[predictions.length - 1]
    };
  }

  public getRiskAnalysis(studentId: string): any {
    const predictions = this.getLearningPredictions(studentId);
    const avgFrustration = predictions.reduce((sum, p) => sum + p.frustrationRisk, 0) / (predictions.length || 1);
    const avgAbandonment = predictions.reduce((sum, p) => sum + p.abandonmentRisk, 0) / (predictions.length || 1);
    
    return {
      frustrationRiskLevel: avgFrustration,
      abandonmentRiskLevel: avgAbandonment,
      requiresIntervention: avgFrustration > 0.5 || avgAbandonment > 0.5
    };
  }

  public recalculatePredictions(studentId: string, sessionResult: any): void {
    const predictions = this.getLearningPredictions(studentId);
    if (predictions.length === 0) return;

    // Recalibrate last prediction
    const lastPred = predictions[predictions.length - 1];
    
    if (sessionResult) {
      const accuracy = sessionResult.successRate || 0.5;
      this.metrics.predictionAccuracy = (this.metrics.predictionAccuracy + accuracy) / 2;
      lastPred.successProbability = Math.min(lastPred.successProbability + 0.05, 1.0);
      lastPred.frustrationRisk = Math.max(lastPred.frustrationRisk - 0.05, 0);
      lastPred.abandonmentRisk = Math.max(lastPred.abandonmentRisk - 0.05, 0);
    }
    
    lastPred.generationDate = Date.now();
    this.metrics.predictionUpdates++;

    EnterpriseEventBus.getInstance().publish({
      name: 'PredictionsRecalculated',
      category: 'Education',
      source: 'LearningPredictionDomainService',
      payload: { studentId, latestPrediction: lastPred },
      metadata: {}
    });
  }

  public recordIntervention(): void {
    this.metrics.adaptiveInterventions++;
  }

  public getMetrics(): any {
    return this.metrics;
  }
}

export const learningPredictionDomainService = LearningPredictionDomainService.getInstance();
