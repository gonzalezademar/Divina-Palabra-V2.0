import { EnterpriseEventBus } from '../../eventing/EnterpriseEventBus';
import { learningObjectivesDomainService } from './LearningObjectivesDomainService';
import { learningCompetencyDomainService } from './LearningCompetencyDomainService';
import { learningPredictionDomainService } from './LearningPredictionDomainService';
import { learningStrategyDomainService } from './LearningStrategyDomainService';
import { learningPersonalizationDomainService } from './LearningPersonalizationDomainService';
import { learningOptimizationDomainService } from './LearningOptimizationDomainService';
import { analyticsDomainService } from './AnalyticsDomainService';

export class LearningProgressDomainService {
  private static instance: LearningProgressDomainService;
  
  private progressHistory = new Map<string, any[]>();
  
  private metrics = {
    learningProgress: 0,
    completedCompetencies: 0,
    averageProgress: 0,
    learningVelocity: 0,
    historicalUpdates: 0
  };

  private constructor() {}

  static getInstance(): LearningProgressDomainService {
    if (!LearningProgressDomainService.instance) {
      LearningProgressDomainService.instance = new LearningProgressDomainService();
    }
    return LearningProgressDomainService.instance;
  }

  public updateProgress(studentId: string, sessionResult: any): void {
    this.metrics.historicalUpdates++;

    const objectives = learningObjectivesDomainService.getActiveObjectives(studentId);
    const competencies = learningCompetencyDomainService.getCompetencies(studentId);
    const predictions = learningPredictionDomainService.getPredictionSummary(studentId);
    const strategy = learningStrategyDomainService.getCurrentStrategy(studentId);
    const personalization = learningPersonalizationDomainService.getPersonalizationSummary(studentId);
    const optimization = learningOptimizationDomainService.getCurrentOptimizationState(studentId);
    const analytics = analyticsDomainService.getLearningForecast(studentId);

    const timeSpent = sessionResult?.timeTaken || 0;

    const newEntry = {
      timestamp: Date.now(),
      globalProgress: this.calculateGlobalProgress(competencies),
      competencyProgress: competencies,
      objectiveProgress: objectives,
      difficultyProgress: personalization?.recommendedDifficulty || 'Principiante',
      activityTypeProgress: strategy?.name || 'mixto',
      timeInvested: timeSpent,
      temporalEvolution: analytics?.forecast || [],
      improvementTrends: predictions?.improvementAreas || [],
      regressionTrends: predictions?.riskAreas || []
    };

    const history = this.progressHistory.get(studentId) || [];
    history.push(newEntry);
    this.progressHistory.set(studentId, history);

    this.metrics.learningProgress = newEntry.globalProgress;
    this.metrics.completedCompetencies = competencies.filter((c: any) => c.masteryPercentage >= 100).length;
    this.metrics.averageProgress = this.calculateAverageProgress(studentId);
    this.metrics.learningVelocity = history.length > 1 ? this.calculateVelocity(history) : 0;

    EnterpriseEventBus.getInstance().publish({
      name: 'LearningProgressUpdated',
      category: 'Education',
      source: 'LearningProgressDomainService',
      payload: { studentId, progressEntry: newEntry },
      metadata: {}
    });
  }

  private calculateGlobalProgress(competencies: any[]): number {
    if (!competencies || competencies.length === 0) return 0;
    const total = competencies.reduce((acc, c) => acc + (c.masteryPercentage || 0), 0);
    return total / competencies.length;
  }

  private calculateAverageProgress(studentId: string): number {
    const history = this.progressHistory.get(studentId) || [];
    if (history.length === 0) return 0;
    const total = history.reduce((acc, entry) => acc + entry.globalProgress, 0);
    return total / history.length;
  }

  private calculateVelocity(history: any[]): number {
    if (history.length < 2) return 0;
    const first = history[0].globalProgress;
    const last = history[history.length - 1].globalProgress;
    return last - first;
  }

  public getProgressHistory(studentId: string): any[] {
    return this.progressHistory.get(studentId) || [];
  }

  public getLearningProgress(studentId: string): any {
    const history = this.progressHistory.get(studentId) || [];
    return history.length > 0 ? history[history.length - 1] : null;
  }

  public getProgressSummary(studentId: string): any {
    const progress = this.getLearningProgress(studentId);
    if (!progress) return null;
    return {
      globalProgress: progress.globalProgress,
      timeInvested: progress.timeInvested,
      improvementTrends: progress.improvementTrends,
      regressionTrends: progress.regressionTrends
    };
  }

  public getProgressMetrics(): any {
    return this.metrics;
  }
}

export const learningProgressDomainService = LearningProgressDomainService.getInstance();
