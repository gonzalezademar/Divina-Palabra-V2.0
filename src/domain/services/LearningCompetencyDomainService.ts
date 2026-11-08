import { EnterpriseEventBus } from '../../eventing/EnterpriseEventBus';
import { studentCognitiveModelDomainService } from './StudentCognitiveModelDomainService';
import { learningGoalsDomainService } from './LearningGoalsDomainService';
import { learningOptimizationDomainService } from './LearningOptimizationDomainService';
import { analyticsDomainService } from './AnalyticsDomainService';
import { adaptiveFeedbackDomainService } from './AdaptiveFeedbackDomainService';
import { recommendationDomainService } from './RecommendationDomainService';
import { learningPlannerDomainService } from './LearningPlannerDomainService';

export class LearningCompetencyDomainService {
  private static instance: LearningCompetencyDomainService;
  
  private metrics = {
    competencies: 0,
    competencyUpdates: 0,
    masteredCompetencies: 0,
    learningMastery: 0,
    knowledgeCoverage: 0
  };

  private competencyCache = new Map<string, any[]>();

  private constructor() {}

  static getInstance(): LearningCompetencyDomainService {
    if (!LearningCompetencyDomainService.instance) {
      LearningCompetencyDomainService.instance = new LearningCompetencyDomainService();
    }
    return LearningCompetencyDomainService.instance;
  }

  private initializeDefaultCompetencies(studentId: string): any[] {
    const competencies = [
      {
        id: `comp_${studentId}_1`,
        name: 'Reconocimiento de Personajes',
        description: 'Capacidad de identificar personajes bíblicos.',
        currentLevel: 1,
        objectiveLevel: 5,
        masteryPercentage: 20,
        masteryConfidence: 0.5,
        lastUpdateDate: Date.now()
      },
      {
        id: `comp_${studentId}_2`,
        name: 'Eventos Cronológicos',
        description: 'Orden de eventos bíblicos.',
        currentLevel: 1,
        objectiveLevel: 5,
        masteryPercentage: 10,
        masteryConfidence: 0.3,
        lastUpdateDate: Date.now()
      }
    ];
    this.competencyCache.set(studentId, competencies);
    this.metrics.competencies += competencies.length;
    this.metrics.knowledgeCoverage = 30; // Simulated
    return competencies;
  }

  public getCompetencies(studentId: string): any[] {
    if (!this.competencyCache.has(studentId)) {
      this.initializeDefaultCompetencies(studentId);
    }
    return this.competencyCache.get(studentId) || [];
  }

  public getCompetencyMap(studentId: string): any {
    const all = this.getCompetencies(studentId);
    const map: Record<string, any> = {};
    all.forEach(c => map[c.id] = c);
    return map;
  }

  public getLearningMastery(studentId: string): number {
    const all = this.getCompetencies(studentId);
    if (all.length === 0) return 0;
    const total = all.reduce((sum, c) => sum + c.masteryPercentage, 0);
    return total / all.length;
  }

  public updateCompetencies(studentId: string, sessionResult: any): void {
    const all = this.getCompetencies(studentId);
    if (all.length === 0) return;

    all.forEach(comp => {
      // Basic simulation of progress based on session result
      const increase = sessionResult?.successRate ? (sessionResult.successRate * 5) : 2;
      const prevMastery = comp.masteryPercentage;
      comp.masteryPercentage = Math.min(comp.masteryPercentage + increase, 100);
      comp.masteryConfidence = Math.min(comp.masteryConfidence + 0.05, 1.0);
      comp.lastUpdateDate = Date.now();
      
      this.metrics.competencyUpdates++;

      if (prevMastery < 100 && comp.masteryPercentage >= 100) {
        this.metrics.masteredCompetencies++;
      }
    });

    this.metrics.learningMastery = this.getLearningMastery(studentId);

    EnterpriseEventBus.getInstance().publish({
      name: 'CompetenciesUpdated',
      category: 'Education',
      source: 'LearningCompetencyDomainService',
      payload: { studentId, competencies: all },
      metadata: {}
    });
  }

  public getMetrics(): any {
    return this.metrics;
  }
}

export const learningCompetencyDomainService = LearningCompetencyDomainService.getInstance();
