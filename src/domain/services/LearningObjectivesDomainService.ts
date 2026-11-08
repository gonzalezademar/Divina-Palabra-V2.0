import { EnterpriseEventBus } from '../../eventing/EnterpriseEventBus';
import { learningGoalsDomainService } from './LearningGoalsDomainService';
import { learningCompetencyDomainService } from './LearningCompetencyDomainService';
import { learningPredictionDomainService } from './LearningPredictionDomainService';
import { learningStrategyDomainService } from './LearningStrategyDomainService';
import { studentCognitiveModelDomainService } from './StudentCognitiveModelDomainService';
import { recommendationDomainService } from './RecommendationDomainService';
import { analyticsDomainService } from './AnalyticsDomainService';

export class LearningObjectivesDomainService {
  private static instance: LearningObjectivesDomainService;
  
  private metrics = {
    activeObjectives: 0,
    generatedObjectives: 0,
    pendingObjectives: 0,
    completedObjectives: 0,
    failedObjectives: 0,
    objectiveSuccessRate: 0,
    averageObjectiveProgress: 0,
    objectiveEvaluations: 0,
    planningConsistency: 1.0,
    totalCompletionTime: 0
  };

  private objectiveCache = new Map<string, any[]>();

  private constructor() {}

  static getInstance(): LearningObjectivesDomainService {
    if (!LearningObjectivesDomainService.instance) {
      LearningObjectivesDomainService.instance = new LearningObjectivesDomainService();
    }
    return LearningObjectivesDomainService.instance;
  }

  private generateDefaultObjectives(studentId: string): any[] {
    const defaultObjective = {
      id: `obj_${studentId}_${Date.now()}`,
      name: 'Objetivo Diario de Práctica',
      description: 'Completar las actividades recomendadas del día para mantener el ritmo.',
      priority: 1,
      status: 'active',
      progress: 0,
      createdAt: Date.now(),
      estimatedCompletionAt: Date.now() + 86400000, // +1 day
      successCriteria: ['Completar 1 sesión'],
      recommendations: ['Mantener la consistencia']
    };

    const objectives = [defaultObjective];
    this.objectiveCache.set(studentId, objectives);
    this.metrics.activeObjectives++;
    this.metrics.generatedObjectives++;
    this.metrics.pendingObjectives++;
    return objectives;
  }

  public getLearningObjectives(studentId: string): any[] {
    if (!this.objectiveCache.has(studentId)) {
      this.generateDefaultObjectives(studentId);
    }
    return this.objectiveCache.get(studentId) || [];
  }

  public getActiveObjectives(studentId: string): any[] {
    return this.getLearningObjectives(studentId).filter(obj => obj.status === 'active');
  }

  public getCompletedObjectives(studentId: string): any[] {
    return this.getLearningObjectives(studentId).filter(obj => obj.status === 'completed');
  }

  public updateObjectives(studentId: string, sessionResult: any): void {
    const objectives = this.getLearningObjectives(studentId);
    if (!objectives.length) return;

    this.metrics.objectiveEvaluations++;
    let progressSum = 0;

    objectives.forEach(obj => {
      if (obj.status === 'active' && sessionResult) {
        obj.progress = Math.min(obj.progress + (sessionResult.successRate || 0.5) * 100, 100);
        if (obj.progress >= 100) {
          obj.status = 'completed';
          this.metrics.completedObjectives++;
          this.metrics.activeObjectives--;
          this.metrics.pendingObjectives--;
          const completionTime = Date.now() - obj.createdAt;
          this.metrics.totalCompletionTime += completionTime;
        } else if (Date.now() > obj.estimatedCompletionAt) {
          obj.status = 'failed';
          this.metrics.failedObjectives++;
          this.metrics.activeObjectives--;
          this.metrics.pendingObjectives--;
        }
      }
      progressSum += obj.progress;
    });

    this.metrics.averageObjectiveProgress = progressSum / objectives.length;
    const totalFinished = this.metrics.completedObjectives + this.metrics.failedObjectives;
    this.metrics.objectiveSuccessRate = totalFinished > 0 ? this.metrics.completedObjectives / totalFinished : 0;
    
    // Update planning consistency based on success rate
    this.metrics.planningConsistency = Math.max(0, Math.min(1, this.metrics.objectiveSuccessRate + 0.1));

    EnterpriseEventBus.getInstance().publish({
      name: 'ObjectivesUpdated',
      category: 'Education',
      source: 'LearningObjectivesDomainService',
      payload: { studentId, progress: this.metrics.averageObjectiveProgress },
      metadata: {}
    });
  }

  public getMetrics(): any {
    return this.metrics;
  }
}

export const learningObjectivesDomainService = LearningObjectivesDomainService.getInstance();
