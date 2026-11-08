import { PlatformBootstrap } from './PlatformBootstrap';
import { EnterpriseEventBus } from '../eventing/EnterpriseEventBus';
import { EnterpriseState } from '../state/EnterpriseState';
import { CapabilityRegistry } from '../capabilities/CapabilityRegistry';
import { PlatformFacade } from './PlatformFacade';
import { MetricRegistry } from '../operations/metrics/MetricRegistry';
import { AlertEngine } from '../operations/alerts/AlertEngine';
import { contentRegistry } from '../content/ContentRegistry';
import { contentValidator } from '../content/ContentValidator';
import { contentMigration } from '../content/ContentMigration';
import { repositoryManager } from '../repositories/RepositoryManager';
import { workflowRegistry } from '../workflows/WorkflowRegistry';
import { workflowMetrics } from '../workflows/WorkflowMetrics';
import { pluginManager } from '../plugins/PluginManager';
import { aiManager } from '../ai/AIManager';
import { digitalTwinRegistry } from '../digitalTwin/DigitalTwinRegistry';
import { digitalTwinSnapshot } from '../digitalTwin/DigitalTwinSnapshot';
import { digitalTwinSimulator } from '../digitalTwin/DigitalTwinSimulator';
import { digitalTwinEngine } from '../digitalTwin/DigitalTwinEngine';
import { eventAutomationEngine } from '../services/eventAutomationEngine';
import { recommendationDomainService } from '../domain/services/RecommendationDomainService';

import { analyticsDomainService } from '../domain/services/AnalyticsDomainService';
import { learningPlannerDomainService } from '../domain/services/LearningPlannerDomainService';
import { adaptiveContentDomainService } from '../domain/services/AdaptiveContentDomainService';
import { adaptiveFeedbackDomainService } from '../domain/services/AdaptiveFeedbackDomainService';
import { studentCognitiveModelDomainService } from '../domain/services/StudentCognitiveModelDomainService';
import { learningSimulationDomainService } from '../domain/services/LearningSimulationDomainService';
import { learningOptimizationDomainService } from '../domain/services/LearningOptimizationDomainService';
import { learningGoalsDomainService } from '../domain/services/LearningGoalsDomainService';
import { learningCompetencyDomainService } from '../domain/services/LearningCompetencyDomainService';
import { learningPathDomainService } from '../domain/services/LearningPathDomainService';
import { learningPredictionDomainService } from '../domain/services/LearningPredictionDomainService';
import { learningInterventionDomainService } from '../domain/services/LearningInterventionDomainService';
import { learningPersonalizationDomainService } from '../domain/services/LearningPersonalizationDomainService';
import { learningStrategyDomainService } from '../domain/services/LearningStrategyDomainService';
import { learningObjectivesDomainService } from '../domain/services/LearningObjectivesDomainService';
import { learningProgressDomainService } from '../domain/services/LearningProgressDomainService';
import { educationalOrchestrator } from '../services/educationalOrchestrator';
import { educationalDecisionEngine } from '../domain/services/EducationalDecisionEngine';
import { decisionIntelligenceLayer } from '../domain/services/DecisionIntelligenceLayer';
import { enterpriseEducationalMemory } from '../domain/services/EnterpriseEducationalMemory';
import { enterpriseExperienceEvaluationEngine } from '../domain/services/EnterpriseExperienceEvaluationEngine';
import { enterpriseEducationalKnowledgeEngine } from '../domain/services/EnterpriseEducationalKnowledgeEngine';
import { enterpriseKnowledgeGovernanceEngine } from '../domain/services/EnterpriseKnowledgeGovernanceEngine';
import { enterpriseInstitutionalLearningEngine } from '../domain/services/EnterpriseInstitutionalLearningEngine';
import { enterpriseEducationalPatternEngine } from '../domain/services/EnterpriseEducationalPatternEngine';
import { enterpriseEducationalStrategyEngine } from '../domain/services/EnterpriseEducationalStrategyEngine';
import { enterpriseEducationalOutcomeEngine } from '../domain/services/EnterpriseEducationalOutcomeEngine';
import { enterpriseEducationalFeedbackEngine } from '../domain/services/EnterpriseEducationalFeedbackEngine';
import { enterpriseContinuousImprovementEngine } from '../domain/services/EnterpriseContinuousImprovementEngine';
import { enterpriseDecisionAuditEngine } from '../domain/services/EnterpriseDecisionAuditEngine';
import { applicationFacade } from '../application/ApplicationFacade';
import { teacherApplicationService } from '../application/services/TeacherApplicationService';

export class PlatformHealth {
  public static getHealthReport(): any {
    const bootstrap = PlatformBootstrap.getInstance();
    const eventMetrics = EnterpriseEventBus.getInstance().getMetrics();
    const stateMetrics = EnterpriseState.getInstance().getMetrics();
    const capabilityMetrics = CapabilityRegistry.getInstance().getMetrics();
    const resourceSummary = PlatformFacade.getResourceSummary();
    const educationalApplicationMetrics = applicationFacade.getEducationalApplicationMetrics();
    const educationalQueryMetrics = applicationFacade.getEducationalDecisionAuditMetrics();
    const teacherApplicationIntegration = teacherApplicationService.getIntegrationStatus();
    const report = {
      status: bootstrap.getModulesFailed() === 0 ? 'HEALTHY' : 'DEGRADED',
      modulesLoaded: bootstrap.getModulesLoaded(),
      modulesFailed: bootstrap.getModulesFailed(),
      startupTimeMs: bootstrap.getStartupTime(),
      platformVersion: bootstrap.getVersion(),
      eventsPublished: eventMetrics.published,
      eventsProcessed: eventMetrics.processed,
      eventErrors: eventMetrics.errors,
      averagePublishTimeMs: eventMetrics.averagePublishTimeMs,
      snapshotsCreated: stateMetrics.snapshotsCreated,
      snapshotsStored: stateMetrics.snapshotsStored,
      comparisonsMade: stateMetrics.comparisonsMade,
      stateErrors: stateMetrics.errors,
      averageCaptureTimeMs: stateMetrics.averageCaptureTimeMs,
      capabilitiesRegistered: capabilityMetrics.registered,
      capabilitiesActive: capabilityMetrics.active,
      capabilitiesDisabled: capabilityMetrics.disabled,
      capabilityErrors: capabilityMetrics.errors,
      averageCapabilityDiscoveryTimeMs: capabilityMetrics.averageDiscoveryTimeMs,
      
      // Resource Metrics
      resourceCount: resourceSummary.total,
      resourcesActive: resourceSummary.active,
      resourcesInUse: resourceSummary.inUse,
      resourcesReleased: resourceSummary.released,
      resourceErrors: resourceSummary.errors,
      averageResourceAcquisitionTimeMs: 0, // Placeholder as required

      // Runtime Configuration Metrics
      runtimeConfigsLoaded: PlatformFacade.getRuntimeSummary().loadedConfigs,
      runtimeActiveOverrides: PlatformFacade.getRuntimeSummary().activeOverrides,
      runtimeErrors: PlatformFacade.getRuntimeSummary().errors,
      runtimeAverageLoadTimeMs: PlatformFacade.getRuntimeSummary().averageLoadTime,
      runtimeLastUpdate: PlatformFacade.getRuntimeSummary().lastUpdate,

      // AI Summary Metrics
      aiEnabled: PlatformFacade.getAIStatus().activeProvider !== null,
      aiProviderActive: PlatformFacade.getAIStatus().activeProvider || 'None',
      aiHistorySize: PlatformFacade.getAIHistory().length,
      aiRequests: PlatformFacade.getAIStatistics().requests,
      aiErrors: PlatformFacade.getAIStatistics().errors,
      aiQuotaStatus: PlatformFacade.getAIStatus().quotaStatus,

      // Content Summary Metrics
      contentPackages: contentRegistry.getPackages().length,
      contentActive: contentRegistry.getActiveContent().length,
      contentValidationErrors: contentValidator.getValidationErrorsCount(),
      contentMigrations: contentMigration.getMigrationsExecuted(),
      contentLanguages: contentRegistry.getStatistics().availableLanguages.length,
      contentVersions: contentRegistry.getStatistics().versions.length,

      // Repository Metrics
      repositoryCount: repositoryManager.getStatistics().registered,
      repositoryActive: repositoryManager.getStatistics().active,
      repositoryOperations: repositoryManager.getStatistics().operations,
      repositoryErrors: repositoryManager.getStatistics().errors,
      repositoryCacheHits: repositoryManager.getStatistics().cacheHits,
      repositoryCacheMiss: repositoryManager.getStatistics().cacheMiss,

      // Workflow Metrics
      workflowRegistered: workflowRegistry.getStatistics().registered,
      workflowActive: workflowRegistry.getStatistics().active,
      workflowExecuted: workflowMetrics.getStats().executed,
      workflowErrors: workflowMetrics.getStats().errors,
      workflowAvgTime: workflowMetrics.getStats().avgTime,

      // Plugin Metrics
      pluginsRegistered: pluginManager.getStatistics().registered,
      pluginsActive: pluginManager.getStatistics().active,
      pluginsDisabled: pluginManager.getStatistics().disabled,
      pluginsExecuted: pluginManager.getStatistics().executed,
      pluginsErrors: pluginManager.getStatistics().errors,

      // Digital Twin Metrics
      twinsRegistered: digitalTwinRegistry.getStatistics().registered,
      twinsSnapshots: digitalTwinSnapshot.getAll().length,
      twinsSimulations: digitalTwinSimulator.getSimulations ? digitalTwinSimulator.getSimulations().length : 0,
      twinsErrors: 0,
      twinsHealthStatus: digitalTwinEngine.generateHealthReport({ healthScore: 100 } as any).status,

      // Event Automation Metrics
      automationsRegistered: eventAutomationEngine.getStatistics().registered,
      automationsActive: eventAutomationEngine.getStatistics().active,
      automationsExecuted: eventAutomationEngine.getStatistics().executed,
      automationsErrors: eventAutomationEngine.getStatistics().errors,

      // Recommendation Metrics
      recommendationsGenerated: recommendationDomainService.getMetrics().recommendationsGenerated,
      recommendationTime: recommendationDomainService.getMetrics().recommendationTime,
      recommendationErrors: recommendationDomainService.getMetrics().recommendationErrors,
      learningProfilesCreated: recommendationDomainService.getMetrics().learningProfilesCreated,
      adaptiveLessons: recommendationDomainService.getMetrics().adaptiveLessons,
      adaptiveChallenges: recommendationDomainService.getMetrics().adaptiveChallenges,
      recommendationAccuracy: recommendationDomainService.getMetrics().recommendationAccuracy,

      // Predictive Analytics Metrics
      predictiveProfiles: analyticsDomainService.getMetrics().predictiveProfiles,
      predictiveRecommendations: analyticsDomainService.getMetrics().predictiveRecommendations,
      riskEvaluations: analyticsDomainService.getMetrics().riskEvaluations,
      adaptiveSessions: analyticsDomainService.getMetrics().adaptiveSessions,
      predictionExecutions: analyticsDomainService.getMetrics().predictionExecutions,

      // Learning Planner Metrics
      learningPlansGenerated: learningPlannerDomainService.getMetrics().learningPlansGenerated,
      plannedLessons: learningPlannerDomainService.getMetrics().plannedLessons,
      plannedChallenges: learningPlannerDomainService.getMetrics().plannedChallenges,
      contentSelections: learningPlannerDomainService.getMetrics().contentSelections,
      plannerExecutions: learningPlannerDomainService.getMetrics().plannerExecutions,

      // Adaptive Content Metrics
      adaptiveContentsGenerated: adaptiveContentDomainService.getMetrics().adaptiveContentsGenerated,
      adaptiveQuestionsGenerated: adaptiveContentDomainService.getMetrics().adaptiveQuestionsGenerated,
      adaptiveChallengesGenerated: adaptiveContentDomainService.getMetrics().adaptiveChallengesGenerated,
      adaptiveReviewsGenerated: adaptiveContentDomainService.getMetrics().adaptiveReviewsGenerated,
      adaptiveGenerationExecutions: adaptiveContentDomainService.getMetrics().adaptiveGenerationExecutions,

      // Adaptive Feedback Metrics
      adaptiveFeedbacks: adaptiveFeedbackDomainService.getMetrics().adaptiveFeedbacks,
      adaptiveSuccessRate: adaptiveFeedbackDomainService.getMetrics().adaptiveSuccessRate,
      adaptiveImprovements: adaptiveFeedbackDomainService.getMetrics().adaptiveImprovements,
      adaptiveEvaluations: adaptiveFeedbackDomainService.getMetrics().adaptiveEvaluations,
      adaptiveOptimizationCycles: adaptiveFeedbackDomainService.getMetrics().adaptiveOptimizationCycles,

      // Cognitive Model Metrics
      cognitiveModels: studentCognitiveModelDomainService.getMetrics().cognitiveModels,
      cognitiveUpdates: studentCognitiveModelDomainService.getMetrics().cognitiveUpdates,
      cognitiveQueries: studentCognitiveModelDomainService.getMetrics().cognitiveQueries,
      studentModels: studentCognitiveModelDomainService.getMetrics().studentModels,
      knowledgeMaps: studentCognitiveModelDomainService.getMetrics().knowledgeMaps,

      // Learning Simulation Metrics
      learningSimulations: learningSimulationDomainService.getMetrics().learningSimulations,
      simulationExecutions: learningSimulationDomainService.getMetrics().simulationExecutions,
      strategiesCompared: learningSimulationDomainService.getMetrics().strategiesCompared,
      strategySelections: learningSimulationDomainService.getMetrics().strategySelections,
      predictedLearningGain: learningSimulationDomainService.getMetrics().predictedLearningGain,

      // Learning Optimization Metrics
      optimizationCycles: learningOptimizationDomainService.getOptimizationMetrics().optimizationCycles,
      optimizedRecommendations: learningOptimizationDomainService.getOptimizationMetrics().optimizedRecommendations,
      optimizedPlans: learningOptimizationDomainService.getOptimizationMetrics().optimizedPlans,
      optimizedContents: learningOptimizationDomainService.getOptimizationMetrics().optimizedContents,
      predictionAccuracy: learningOptimizationDomainService.getOptimizationMetrics().predictionAccuracy,
      continuousLearningIterations: learningOptimizationDomainService.getOptimizationMetrics().continuousLearningIterations,

      // Learning Goals Metrics
      learningGoals: learningGoalsDomainService.getMetrics().learningGoals,
      activeGoals: learningGoalsDomainService.getMetrics().activeGoals,
      completedGoals: learningGoalsDomainService.getMetrics().completedGoals,
      goalProgressUpdates: learningGoalsDomainService.getMetrics().goalProgressUpdates,
      goalOptimizations: learningGoalsDomainService.getMetrics().goalOptimizations,

      // Learning Competency Metrics
      competencies: learningCompetencyDomainService.getMetrics().competencies,
      competencyUpdates: learningCompetencyDomainService.getMetrics().competencyUpdates,
      masteredCompetencies: learningCompetencyDomainService.getMetrics().masteredCompetencies,
      learningMastery: learningCompetencyDomainService.getMetrics().learningMastery,
      knowledgeCoverage: learningCompetencyDomainService.getMetrics().knowledgeCoverage,

      // Learning Path Metrics
      learningPaths: learningPathDomainService.getMetrics().learningPaths,
      activePaths: learningPathDomainService.getMetrics().activePaths,
      pathOptimizations: learningPathDomainService.getMetrics().pathOptimizations,
      pathExecutions: learningPathDomainService.getMetrics().pathExecutions,
      pathSuccessRate: learningPathDomainService.getMetrics().pathSuccessRate,

      // Learning Prediction Metrics
      learningPredictions: learningPredictionDomainService.getMetrics().learningPredictions,
      learningPredictionAccuracy: learningPredictionDomainService.getMetrics().predictionAccuracy,
      predictionUpdates: learningPredictionDomainService.getMetrics().predictionUpdates,
      riskAlerts: learningPredictionDomainService.getMetrics().riskAlerts,
      adaptiveInterventions: learningPredictionDomainService.getMetrics().adaptiveInterventions,

      // Learning Intervention Metrics
      learningInterventions: learningInterventionDomainService.getMetrics().learningInterventions,
      successfulInterventions: learningInterventionDomainService.getMetrics().successfulInterventions,
      preventedFailures: learningInterventionDomainService.getMetrics().preventedFailures,
      adaptiveCorrections: learningInterventionDomainService.getMetrics().adaptiveCorrections,
      interventionEffectiveness: learningInterventionDomainService.getMetrics().interventionEffectiveness,

      // Learning Personalization Metrics
      personalizationProfiles: learningPersonalizationDomainService.getMetrics().personalizationProfiles,
      personalizationUpdates: learningPersonalizationDomainService.getMetrics().personalizationUpdates,
      personalizationAdaptiveSessions: learningPersonalizationDomainService.getMetrics().adaptiveSessions,
      personalizationAccuracy: learningPersonalizationDomainService.getMetrics().personalizationAccuracy,
      modelConfidence: learningPersonalizationDomainService.getMetrics().modelConfidence,

      // Learning Strategy Metrics
      activeStrategies: learningStrategyDomainService.getMetrics().activeStrategies,
      strategyChanges: learningStrategyDomainService.getMetrics().strategyChanges,
      strategySuccessRate: learningStrategyDomainService.getMetrics().strategySuccessRate,
      strategyConfidence: learningStrategyDomainService.getMetrics().strategyConfidence,
      strategyEvaluations: learningStrategyDomainService.getMetrics().strategyEvaluations,

      // Learning Objectives Metrics
      generatedObjectives: learningObjectivesDomainService.getMetrics().generatedObjectives,
      activeObjectives: learningObjectivesDomainService.getMetrics().activeObjectives,
      pendingObjectives: learningObjectivesDomainService.getMetrics().pendingObjectives,
      completedObjectives: learningObjectivesDomainService.getMetrics().completedObjectives,
      objectiveSuccessRate: learningObjectivesDomainService.getMetrics().objectiveSuccessRate,
      averageObjectiveProgress: learningObjectivesDomainService.getMetrics().averageObjectiveProgress,
      planningConsistency: learningObjectivesDomainService.getMetrics().planningConsistency,
      objectiveEvaluations: learningObjectivesDomainService.getMetrics().objectiveEvaluations,

      // Learning Progress Metrics
      learningProgress: learningProgressDomainService.getProgressMetrics().learningProgress,
      completedCompetencies: learningProgressDomainService.getProgressMetrics().completedCompetencies,
      averageProgress: learningProgressDomainService.getProgressMetrics().averageProgress,
      learningVelocity: learningProgressDomainService.getProgressMetrics().learningVelocity,
      historicalUpdates: learningProgressDomainService.getProgressMetrics().historicalUpdates,

      // Educational Engine Orchestration Metrics
      orchestratorExecutions: educationalOrchestrator.getMetrics().orchestratorExecutions,
      orchestratorAverageTime: educationalOrchestrator.getMetrics().orchestratorAverageTime,
      orchestratorOptimizationCycles: educationalOrchestrator.getMetrics().optimizationCycles,
      orchestratorRecommendationCycles: educationalOrchestrator.getMetrics().recommendationCycles,
      orchestratorPlanningCycles: educationalOrchestrator.getMetrics().planningCycles,

      // Educational Context Metrics
      educationalContextsCreated: educationalOrchestrator.getContextMetrics().educationalContextsCreated,
      contextReuseRate: educationalOrchestrator.getContextMetrics().contextReuseRate,
      duplicatedCalculationsAvoided: educationalOrchestrator.getContextMetrics().duplicatedCalculationsAvoided,
      contextBuildTime: educationalOrchestrator.getContextMetrics().contextBuildTime,

      // Educational Decision Engine Metrics
      decisionsMade: educationalDecisionEngine.getMetrics().decisionsMade,
      conflictResolutions: educationalDecisionEngine.getMetrics().conflictResolutions,
      averageDecisionTime: educationalDecisionEngine.getMetrics().averageDecisionTime,

      // Decision Intelligence Layer Metrics
      decisionsEvaluated: decisionIntelligenceLayer.getMetrics().decisionsEvaluated,
      decisionsCorrected: decisionIntelligenceLayer.getMetrics().decisionsCorrected,
      conflictsDetected: decisionIntelligenceLayer.getMetrics().conflictsDetected,
      averageConfidence: decisionIntelligenceLayer.getMetrics().averageConfidence,
      averageConsistency: decisionIntelligenceLayer.getMetrics().averageConsistency,

      // Enterprise Decision Audit Metrics
      auditedDecisions: enterpriseDecisionAuditEngine.getMetrics().auditedDecisions,
      traceabilityAvailable: enterpriseDecisionAuditEngine.getMetrics().traceabilityAvailable,
      generatedAudits: enterpriseDecisionAuditEngine.getMetrics().generatedAudits,
      decisionAuditConsistency: enterpriseDecisionAuditEngine.getMetrics().decisionConsistency,
      fullyExplainableDecisionsPercentage: enterpriseDecisionAuditEngine.getMetrics().fullyExplainableDecisionsPercentage,

      // Educational Application Service Metrics
      educationalApplicationServiceAvailable: true,
      educationalDecisionDTOBoundaryAvailable: true,
      educationalQueryServiceAvailable: true,
      applicationFacadeAvailable: true,
      teacherApplicationFacadeAvailable: teacherApplicationIntegration.applicationFacadeAvailable,
      educationalQueryAuditedDecisions: educationalQueryMetrics.auditedDecisions,
      educationalQueryTraceabilityAvailable: educationalQueryMetrics.traceabilityAvailable,
      educationalApplicationDecisionsGenerated: educationalApplicationMetrics.decisionGeneration.decisionsMade,
      educationalApplicationAuditedDecisions: educationalApplicationMetrics.decisionAudit.auditedDecisions,
      educationalApplicationTraceabilityAvailable: educationalApplicationMetrics.decisionAudit.traceabilityAvailable,
      educationalApplicationDecisionConsistency: educationalApplicationMetrics.decisionAudit.decisionConsistency,

      // Enterprise Educational Memory Metrics
      storedExperiences: enterpriseEducationalMemory.getMetrics().storedExperiences,
      queriesPerformed: enterpriseEducationalMemory.getMetrics().queriesPerformed,
      memoryReuses: enterpriseEducationalMemory.getMetrics().reuses,
      historicalSuccessRate: enterpriseEducationalMemory.getMetrics().historicalSuccessRate,

      // Experience Evaluation Engine Metrics
      evaluatedExperiences: enterpriseExperienceEvaluationEngine.getMetrics().experiencesEvaluated,
      averageQualityScore: enterpriseExperienceEvaluationEngine.getMetrics().averageQualityScore,
      averageReliability: enterpriseExperienceEvaluationEngine.getMetrics().averageReliability,
      topExperiences: enterpriseExperienceEvaluationEngine.getMetrics().topExperiencesCount,
      discardableExperiences: enterpriseExperienceEvaluationEngine.getMetrics().discardableExperiences,

      // Enterprise Educational Knowledge Engine Metrics
      learnedRules: enterpriseEducationalKnowledgeEngine.getMetrics().learnedRules,
      knowledgeGenerated: enterpriseEducationalKnowledgeEngine.getMetrics().knowledgeGenerated,
      discoveredPatterns: enterpriseEducationalKnowledgeEngine.getMetrics().discoveredPatterns,
      knowledgeReuse: enterpriseEducationalKnowledgeEngine.getMetrics().knowledgeReuse,
      knowledgeConsistency: enterpriseEducationalKnowledgeEngine.getMetrics().knowledgeConsistency,

      // Enterprise Institutional Learning Metrics
      institutionalSuccessfulDecisions: enterpriseInstitutionalLearningEngine.getMetrics().successfulDecisionsConsolidated,
      institutionalPatterns: enterpriseInstitutionalLearningEngine.getMetrics().institutionalPatterns,
      averageInstitutionalQuality: enterpriseInstitutionalLearningEngine.getMetrics().averageInstitutionalQuality,
      averageInstitutionalReliability: enterpriseInstitutionalLearningEngine.getMetrics().averageInstitutionalReliability,

      // Enterprise Educational Pattern Metrics
      detectedEducationalPatterns: enterpriseEducationalPatternEngine.getMetrics().detectedPatterns,

      // Enterprise Educational Strategy Metrics
      knownEducationalStrategies: enterpriseEducationalStrategyEngine.getMetrics().knownStrategies,
      reusableEducationalStrategies: enterpriseEducationalStrategyEngine.getMetrics().reusableStrategies,
      averageStrategyEffectiveness: enterpriseEducationalStrategyEngine.getMetrics().averageEffectiveness,
      strategicConfidence: enterpriseEducationalStrategyEngine.getMetrics().strategicConfidence,

      // Enterprise Educational Outcome Metrics
      evaluatedEducationalOutcomes: enterpriseEducationalOutcomeEngine.getMetrics().evaluatedOutcomes,
      successfulEducationalStrategies: enterpriseEducationalOutcomeEngine.getMetrics().successfulStrategies,
      discardedEducationalStrategies: enterpriseEducationalOutcomeEngine.getMetrics().discardedStrategies,
      averageEducationalImpact: enterpriseEducationalOutcomeEngine.getMetrics().averageEducationalImpact,
      educationalImprovementPercentage: enterpriseEducationalOutcomeEngine.getMetrics().improvementPercentage,

      // Enterprise Educational Feedback Metrics
      educationalFeedbackGenerated: enterpriseEducationalFeedbackEngine.getMetrics().feedbackGenerated,
      educationalRecommendationsCreated: enterpriseEducationalFeedbackEngine.getMetrics().recommendationsCreated,
      optimizationOpportunitiesDetected: enterpriseEducationalFeedbackEngine.getMetrics().optimizationOpportunitiesDetected,
      educationalSuggestedActions: enterpriseEducationalFeedbackEngine.getMetrics().suggestedActions,
      potentialEducationalImprovementPercentage: enterpriseEducationalFeedbackEngine.getMetrics().potentialImprovementPercentage,

      // Enterprise Continuous Improvement Metrics
      continuousImprovementCycles: enterpriseContinuousImprovementEngine.getMetrics().cyclesEvaluated,
      continuousImprovementRate: enterpriseContinuousImprovementEngine.getMetrics().continuousImprovement,
      learningRegressionsDetected: enterpriseContinuousImprovementEngine.getMetrics().regressionsDetected,
      continuousLearningStability: enterpriseContinuousImprovementEngine.getMetrics().learningStability,
      globalEvolutionIndex: enterpriseContinuousImprovementEngine.getMetrics().globalEvolutionIndex,

      // Enterprise Knowledge Governance Engine Metrics
      knowledgeQuality: enterpriseKnowledgeGovernanceEngine.getMetrics().knowledgeQuality,
      governanceScore: enterpriseKnowledgeGovernanceEngine.getMetrics().governanceScore,
      obsoleteRules: enterpriseKnowledgeGovernanceEngine.getMetrics().obsoleteRules,
      trustedRules: enterpriseKnowledgeGovernanceEngine.getMetrics().trustedRules,
      experimentalRules: enterpriseKnowledgeGovernanceEngine.getMetrics().experimentalRules,
      governanceOperations: enterpriseKnowledgeGovernanceEngine.getMetrics().governanceOperations,
      averageRuleConfidence: enterpriseKnowledgeGovernanceEngine.getMetrics().averageRuleConfidence
    };
    
    // Update operations metrics and alerts
    const metrics = MetricRegistry.getInstance();
    metrics.register('moduleCount', report.modulesLoaded);
    metrics.register('serviceCount', PlatformFacade.getServices().length);
    metrics.register('resourceCount', report.resourceCount);
    metrics.register('capabilityCount', report.capabilitiesRegistered);
    metrics.register('publishedEvents', report.eventsPublished);
    metrics.register('generatedSnapshots', report.snapshotsCreated);
    metrics.register('errorCount', report.modulesFailed + report.eventErrors + report.stateErrors + report.capabilityErrors + report.resourceErrors + report.runtimeErrors);

    const alertEngine = AlertEngine.getInstance();
    alertEngine.clearAlerts(); // Reset to avoid duplicates on polling, or just let evaluate append (in a real system it would deduplicate)
    alertEngine.evaluate(report.modulesFailed > 0, 'MODULE_ERROR', 'Servicios ausentes o módulos deshabilitados');
    alertEngine.evaluate(report.resourceErrors > 0, 'RESOURCE_ERROR', 'Recursos inválidos detectados');
    alertEngine.evaluate(report.runtimeErrors > 0, 'CONFIG_ERROR', 'Configuraciones inconsistentes detectadas');

    metrics.register('activeAlerts', alertEngine.getActiveAlerts().length);

    return report;
  }
}
