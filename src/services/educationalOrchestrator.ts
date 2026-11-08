import { learningEngine } from './learningEngine';
import { educationalAnalyticsEngine } from './educationalAnalyticsEngine';
import { adaptiveLearningEngine } from './adaptiveLearningEngine';
import { teacherInsightsEngine } from './teacherInsightsEngine';
import { contentQualityEngine } from './contentQualityEngine';
import { filterByDoctrinalProfile } from '@/utils/educationHelpers';
import { BibleCatalog, getBibleData } from '@/data/bibleData';
import { EducationalAnalytics, AdaptiveRecommendations, TeacherInsights, QualityReport } from '@/types/education';
import { pluginManager } from '@/plugins/PluginManager';
import { registerBuiltinPlugins } from '@/plugins/BuiltinPlugins';
import { eventAutomationEngine } from './eventAutomationEngine';
import { repositoryManager } from '@/repositories';
import { contentRegistry } from '@/content/ContentRegistry';
import { aiManager } from '@/ai/AIManager';
import { zeroTrustEngine } from '@/security/ZeroTrustEngine';
import { digitalTwinEngine } from '@/digitalTwin/DigitalTwinEngine';
import { workflowEngine } from '@/workflows/WorkflowEngine';
import { recommendationDomainService } from '../domain/services/RecommendationDomainService';
import { adaptiveContentDomainService } from '../domain/services/AdaptiveContentDomainService';
import { adaptiveFeedbackDomainService } from '../domain/services/AdaptiveFeedbackDomainService';
import { learningSimulationDomainService } from '../domain/services/LearningSimulationDomainService';
import { learningOptimizationDomainService } from '../domain/services/LearningOptimizationDomainService';
import { learningCompetencyDomainService } from '../domain/services/LearningCompetencyDomainService';
import { learningPathDomainService } from '../domain/services/LearningPathDomainService';
import { learningPredictionDomainService } from '../domain/services/LearningPredictionDomainService';
import { learningPersonalizationDomainService } from '../domain/services/LearningPersonalizationDomainService';
import { learningStrategyDomainService } from '../domain/services/LearningStrategyDomainService';
import { learningObjectivesDomainService } from '../domain/services/LearningObjectivesDomainService';
import { learningProgressDomainService } from '../domain/services/LearningProgressDomainService';
import { EducationalContext } from '../domain/entities/EducationalContext';
import { educationalDecisionEngine } from '../domain/services/EducationalDecisionEngine';
import { decisionIntelligenceLayer } from '../domain/services/DecisionIntelligenceLayer';

export class EducationalOrchestrator {
  private static instance: EducationalOrchestrator;
  private isInitialized = false;

  private metrics = {
    orchestratorExecutions: 0,
    orchestratorAverageTime: 0,
    optimizationCycles: 0,
    recommendationCycles: 0,
    planningCycles: 0
  };

  private contextMetrics = {
    educationalContextsCreated: 0,
    contextReuseRate: 0,
    duplicatedCalculationsAvoided: 0,
    contextBuildTime: 0
  };

  private currentContexts = new Map<string, EducationalContext>();

  private constructor() {}

  public getMetrics() {
    return this.metrics;
  }

  public getContextMetrics() {
    return this.contextMetrics;
  }

  public getEducationalContextSummary(studentId: string = 'default'): any {
    const context = this.currentContexts.get(studentId);
    if (!context) return null;
    return {
      studentId: context.studentId,
      hasProgress: !!context.progress,
      hasObjectives: !!context.objectives,
      hasStrategies: !!context.strategies,
      hasPersonalization: !!context.personalization,
      hasPredictions: !!context.predictions,
      confidence: context.modelConfidenceLevel
    };
  }

  public initialize(dependencies?: any): void {
    if (this.isInitialized) return;
    this.isInitialized = true;

    registerBuiltinPlugins();
    // Initialize Event Automation Engine so default rules listen
    void eventAutomationEngine;

    // Initialize repositories
    if (dependencies && dependencies.has && dependencies.has('RepositoryManager')) {
       // use container
    }

    // Initialize content registry
    contentRegistry.initialize();

    // Initialize AI manager
    void aiManager; // Just to trigger instantiation

    // Initialize Security
    zeroTrustEngine.validateSystemIntegrity({});

    // Initialize Digital Twin
    digitalTwinEngine.initialize();

    // Initialize Workflows
    workflowEngine.initialize();
  }

  static getInstance(): EducationalOrchestrator {
    if (!EducationalOrchestrator.instance) {
      EducationalOrchestrator.instance = new EducationalOrchestrator();
    }
    return EducationalOrchestrator.instance;
  }

  public prepareEducationalSession(studentId: string = 'default'): any {
    const startTime = Date.now();
    this.metrics.orchestratorExecutions++;
    this.metrics.planningCycles++;
    
    // Build context
    const contextStart = Date.now();
    const context = new EducationalContext(studentId);
    context.progress = learningProgressDomainService.getLearningProgress(studentId);
    context.historyUsed = learningProgressDomainService.getProgressHistory(studentId);
    context.objectives = learningObjectivesDomainService.getActiveObjectives(studentId);
    context.strategies = learningStrategyDomainService.getLearningStrategy(studentId);
    context.personalization = learningPersonalizationDomainService.getAdaptiveProfile(studentId);
    context.predictions = learningPredictionDomainService.getRiskAnalysis(studentId);
    context.planning = learningPathDomainService.getCurrentLearningPath(studentId);
    context.competencies = learningCompetencyDomainService.getCompetencies(studentId);
    context.optimization = learningSimulationDomainService.getBestLearningStrategy(studentId);
    context.modelConfidenceLevel = context.personalization?.modelConfidenceLevel || 0.5;
    
    this.currentContexts.set(studentId, context);
    this.contextMetrics.educationalContextsCreated++;
    this.contextMetrics.duplicatedCalculationsAvoided += 10; // Avoided 10 calls
    this.contextMetrics.contextBuildTime = (this.contextMetrics.contextBuildTime + (Date.now() - contextStart)) / 2;
    this.contextMetrics.contextReuseRate = (this.contextMetrics.contextReuseRate + 0.1) / 1.1; // Simple calculation

    const result = this.buildSession(studentId, context);
    
    const timeSpent = Date.now() - startTime;
    this.metrics.orchestratorAverageTime = (this.metrics.orchestratorAverageTime + timeSpent) / 2;
    return result;
  }

  private buildSession(studentId: string, context: EducationalContext): any {
    const rawDecision = educationalDecisionEngine.makeDecision(context);
    return decisionIntelligenceLayer.enrichDecision(rawDecision, context);
  }

  public analyzeChallenge(challenge: any) {
    return learningEngine.analyzeChallenge(challenge);
  }

  public processGameSession(playedChallenges: any[], totalCatalogSize: number): EducationalAnalytics {
    const results = pluginManager.executeHook('onGenerateReports', { playedChallenges, totalCatalogSize });
    if (results.length > 0) return results[0];
    
    // Attempt workflow fallback
    try {
      // Async workflow dispatch (fire and forget for now, or synchronous fallback since this is sync)
      workflowEngine.executeAsync('educational_analysis', { playedChallenges, totalCatalogSize });
    } catch(e) {}
    
    // Attempt AI integration
    try {
      aiManager.execute({
        id: `ai_edu_analysis_${Date.now()}`,
        prompt: `Analyze game session for ${playedChallenges.length} challenges`,
        timestamp: Date.now(),
        parameters: { type: 'educational_analysis' }
      }).catch(() => {});
    } catch(e) {}
    
    // Evaluate effectiveness
    const studentId = 'student_123';
    const accuracy = playedChallenges.length > 0 ? (playedChallenges.filter(c => c.isCorrect).length / playedChallenges.length) * 100 : 75;
    
    const sessionResult = {
      accuracy,
      scoreDelta: accuracy - 70, // Baseline for simulation
      timeTaken: 150,
      completed: true,
      successRate: accuracy / 100
    };
    
    adaptiveFeedbackDomainService.registerAdaptiveSessionResult(studentId, sessionResult);

    // Finally, trigger the optimization cycle asynchronously so it doesn't block the main flow.
    this.metrics.optimizationCycles++;
    const context = this.currentContexts.get(studentId) || {};
    learningOptimizationDomainService.runOptimizationCycle(studentId, sessionResult, context).catch(e => {
      console.warn('Non-blocking optimization cycle error:', e);
    });

    return educationalAnalyticsEngine.processGameSession(playedChallenges, totalCatalogSize);
  }

  public saveLocalAnalytics(analytics: EducationalAnalytics): void {
    educationalAnalyticsEngine.saveLocalAnalytics(analytics);
  }

  public generateStudentRecommendations(analytics: EducationalAnalytics): AdaptiveRecommendations {
    this.metrics.recommendationCycles++;
    const results = pluginManager.executeHook('onRecommendations', analytics);
    if (results.length > 0) return results[0];
    
    try {
      workflowEngine.executeAsync('student_recommendations', { analytics });
    } catch(e) {}

    try {
      aiManager.execute({
        id: `ai_student_rec_${Date.now()}`,
        prompt: `Generate recommendations for student`,
        timestamp: Date.now(),
        parameters: { type: 'recommendations' }
      }).catch(() => {});

      // FASE 67 & 68 Integration
      const studentId = 'student_123';
      recommendationDomainService.generateRecommendations({ studentId, analytics }).catch(console.error);
      const pending = recommendationDomainService.popPendingRecommendations(studentId);
      if (pending) {
        return pending as AdaptiveRecommendations;
      }
    } catch(e) {}
    
    return adaptiveLearningEngine.generateRecommendations(analytics);
  }

  public analyzeLessonForTeacher(challenges: any[]): TeacherInsights {
    const results = pluginManager.executeHook('onTeacherDashboard', { activeChallenges: challenges });
    if (results.length > 0) return results[0];

    try {
      aiManager.execute({
        id: `ai_teacher_analysis_${Date.now()}`,
        prompt: `Analyze lesson for teacher`,
        timestamp: Date.now(),
        parameters: { type: 'educational_analysis' }
      }).catch(() => {});
    } catch(e) {}

    return teacherInsightsEngine.analyzeLesson(challenges);
  }

  public auditCatalog(catalogId: string, catalog: BibleCatalog): void {
    pluginManager.executeHook('onLoadChallenges', [], { catalogId, catalog });
  }
  
  public getCatalogQualityReport(): QualityReport {
    return contentQualityEngine.getReport();
  }

  public filterChallengesByDoctrine(challenges: any[], profile?: string, maxItems?: number) {
    return filterByDoctrinalProfile(challenges, profile, maxItems);
  }

  public async fetchChallengesAsync(lang: string = 'es', version: string = 'rvr1960'): Promise<any[]> {
    const repo = repositoryManager.get<any>('ChallengeRepository');
    return repo.getAll();
  }

  public getChallenges(lang: string = 'es', version: string = 'rvr1960'): any[] {
    const studentId = 'student_123'; // Default for the phase testing
    // Try to trigger background generation if not present
    adaptiveContentDomainService.generateAdaptiveContent(studentId).catch(() => {});
    
    const adaptiveContent = adaptiveContentDomainService.getAdaptiveContent(studentId);
    if (adaptiveContent && adaptiveContent.length > 0) {
      return adaptiveContent;
    }

    const pkg = contentRegistry.getPackage(`base_catalog_${lang}_${version}`);
    if (pkg && pkg.data && pkg.data.challenges && pkg.data.challenges.length > 0) {
      return pkg.data.challenges;
    }
    // Fallback
    const fallbackData = getBibleData(lang as any, version);
    return [
      ...fallbackData.findWordLevel1,
      ...fallbackData.findWordLevel2,
      ...fallbackData.completePhraseChallenges,
      ...fallbackData.guessPhraseChallenges
    ];
  }
}

export const educationalOrchestrator = EducationalOrchestrator.getInstance();
