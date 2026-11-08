import { EnterpriseEventBus } from '../../eventing/EnterpriseEventBus';
import { studentCognitiveModelDomainService } from './StudentCognitiveModelDomainService';
import { learningGoalsDomainService } from './LearningGoalsDomainService';
import { learningCompetencyDomainService } from './LearningCompetencyDomainService';
import { learningOptimizationDomainService } from './LearningOptimizationDomainService';
import { learningSimulationDomainService } from './LearningSimulationDomainService';
import { recommendationDomainService } from './RecommendationDomainService';
import { learningPlannerDomainService } from './LearningPlannerDomainService';
import { adaptiveContentDomainService } from './AdaptiveContentDomainService';

export class LearningPathDomainService {
  private static instance: LearningPathDomainService;
  
  private metrics = {
    learningPaths: 0,
    activePaths: 0,
    pathOptimizations: 0,
    pathExecutions: 0,
    pathSuccessRate: 0
  };

  private pathCache = new Map<string, any[]>();

  private constructor() {}

  static getInstance(): LearningPathDomainService {
    if (!LearningPathDomainService.instance) {
      LearningPathDomainService.instance = new LearningPathDomainService();
    }
    return LearningPathDomainService.instance;
  }

  private initializeDefaultPaths(studentId: string): any[] {
    const paths = [
      {
        id: `path_${studentId}_1`,
        activities: ['activity_1', 'activity_2', 'activity_3'],
        targetCompetencies: ['comp_1', 'comp_2'],
        estimatedDifficulty: 'Intermedio',
        estimatedDuration: 30, // minutes
        progress: 0,
        state: 'active',
        priority: 1
      }
    ];
    this.pathCache.set(studentId, paths);
    this.metrics.learningPaths += paths.length;
    this.metrics.activePaths += paths.length;
    return paths;
  }

  public getLearningPaths(studentId: string): any[] {
    if (!this.pathCache.has(studentId)) {
      this.initializeDefaultPaths(studentId);
    }
    return this.pathCache.get(studentId) || [];
  }

  public getCurrentLearningPath(studentId: string): any {
    const all = this.getLearningPaths(studentId);
    const active = all.find(p => p.state === 'active');
    return active || null;
  }

  public getLearningPathProgress(studentId: string, pathId: string): number {
    const all = this.getLearningPaths(studentId);
    const path = all.find(p => p.id === pathId);
    return path ? path.progress : 0;
  }

  public reorganizePaths(studentId: string, sessionResult: any): void {
    const active = this.getCurrentLearningPath(studentId);
    if (!active) return;

    // Simulate progress and reorganization
    const progressGain = sessionResult?.successRate ? (sessionResult.successRate * 20) : 10;
    active.progress = Math.min(active.progress + progressGain, 100);
    this.metrics.pathExecutions++;
    this.metrics.pathOptimizations++;

    // Rolling average for success rate simulation
    const currentRate = sessionResult?.successRate ? sessionResult.successRate * 100 : 75;
    this.metrics.pathSuccessRate = this.metrics.pathSuccessRate === 0 
      ? currentRate 
      : (this.metrics.pathSuccessRate + currentRate) / 2;

    if (active.progress >= 100) {
      active.state = 'completed';
      this.metrics.activePaths = Math.max(0, this.metrics.activePaths - 1);
    }

    EnterpriseEventBus.getInstance().publish({
      name: 'LearningPathReorganized',
      category: 'Education',
      source: 'LearningPathDomainService',
      payload: { studentId, path: active },
      metadata: {}
    });
  }

  public getMetrics(): any {
    return this.metrics;
  }
}

export const learningPathDomainService = LearningPathDomainService.getInstance();
