import { EnterpriseEventBus } from '../../eventing/EnterpriseEventBus';
import { recommendationDomainService } from './RecommendationDomainService';
import { analyticsDomainService } from './AnalyticsDomainService';
import { learningPlannerDomainService } from './LearningPlannerDomainService';
import { adaptiveContentDomainService } from './AdaptiveContentDomainService';
import { adaptiveFeedbackDomainService } from './AdaptiveFeedbackDomainService';
import { assessmentEngine } from '../../services/assessmentEngine';
import { aiHistory } from '../../ai/AIHistory';

export class StudentCognitiveModelDomainService {
  private static instance: StudentCognitiveModelDomainService;
  
  private metrics = {
    cognitiveModels: 0,
    cognitiveUpdates: 0,
    cognitiveQueries: 0,
    studentModels: 0,
    knowledgeMaps: 0
  };

  private cognitiveModelsCache = new Map<string, any>();

  private constructor() {}

  static getInstance(): StudentCognitiveModelDomainService {
    if (!StudentCognitiveModelDomainService.instance) {
      StudentCognitiveModelDomainService.instance = new StudentCognitiveModelDomainService();
    }
    return StudentCognitiveModelDomainService.instance;
  }

  public updateCognitiveModel(studentId: string): void {
    const profile = recommendationDomainService.getLearningProfile(studentId);
    const analytics = analyticsDomainService.getPredictiveAnalytics(studentId) || {};
    const feedback = adaptiveFeedbackDomainService.getAdaptiveSuccessMetrics(studentId) || {};

    const model = {
      studentId,
      masteryLevelPerTopic: profile.masteredTopics.reduce((acc: any, topic: string) => { acc[topic] = 1.0; return acc; }, {}),
      learningSpeed: (profile as any).progressSpeed || 1.0,
      estimatedConfidence: analytics.studentConfidence || 0.5,
      inferredLearningStyle: (profile as any).preferredLearningStyle || 'mixto',
      knowledgeStability: (feedback.averageSuccessRate || 50) > 75 ? 'Alta' : 'Media',
      successProbability: (feedback.averageSuccessRate || 50) / 100,
      reinforcementNeeds: (profile as any).weakTopics || [],
      consolidatedHistoricalProgress: {
        totalSessions: analytics.adaptiveSessions || 0,
        averageImprovement: feedback.totalImprovement || 0
      },
      lastUpdated: Date.now()
    };

    if (!this.cognitiveModelsCache.has(studentId)) {
      this.metrics.cognitiveModels++;
      this.metrics.studentModels++;
    }
    this.cognitiveModelsCache.set(studentId, model);
    this.metrics.cognitiveUpdates++;

    EnterpriseEventBus.getInstance().publish({
      name: 'CognitiveModelUpdated',
      category: 'Education',
      source: 'StudentCognitiveModelDomainService',
      payload: { studentId, model },
      metadata: {}
    });
  }

  public getCognitiveModel(studentId: string): any {
    this.metrics.cognitiveQueries++;
    if (!this.cognitiveModelsCache.has(studentId)) {
      this.updateCognitiveModel(studentId);
    }
    return this.cognitiveModelsCache.get(studentId) || null;
  }

  public getKnowledgeMap(studentId: string): any {
    this.metrics.knowledgeMaps++;
    const model = this.getCognitiveModel(studentId);
    if (!model) return {};
    return {
      mastery: model.masteryLevelPerTopic,
      stability: model.knowledgeStability,
      needs: model.reinforcementNeeds
    };
  }

  public getLearningState(studentId: string): any {
    const model = this.getCognitiveModel(studentId);
    if (!model) return {};
    return {
      speed: model.learningSpeed,
      confidence: model.estimatedConfidence,
      style: model.inferredLearningStyle,
      probability: model.successProbability
    };
  }

  public getMetrics(): any {
    return this.metrics;
  }
}

export const studentCognitiveModelDomainService = StudentCognitiveModelDomainService.getInstance();
