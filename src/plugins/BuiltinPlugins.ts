import { pluginManager } from './PluginManager';
import { EducationalPlugin } from './EducationalPlugin';
import { learningEngine } from '@/services/learningEngine';
import { adaptiveLearningEngine } from '@/services/adaptiveLearningEngine';
import { educationalAnalyticsEngine } from '@/services/educationalAnalyticsEngine';
import { assessmentEngine } from '@/services/assessmentEngine';
import { teacherInsightsEngine } from '@/services/teacherInsightsEngine';
import { contentQualityEngine } from '@/services/contentQualityEngine';
import { curriculumEngine } from '@/services/curriculumEngine';
import { accessibilityEngine } from '@/services/accessibilityEngine';
import { knowledgeGraphEngine } from '@/services/knowledgeGraphEngine';
import { simulationEngine } from '@/services/simulationEngine';
import { platformHealthEngine } from '@/services/platformHealthEngine';
import { telemetryEngine } from '@/services/telemetryEngine';
import { performanceMonitor } from '@/services/performanceMonitor';
import { diagnosticDashboard } from '@/services/diagnosticDashboard';

const createBasePlugin = (id: string, name: string): Partial<EducationalPlugin> => ({
  id,
  name,
  version: '1.0.0',
  description: `Builtin plugin for ${name}`,
  capabilities: ['core', id],
  estado: 'active',
  origin: 'builtin',
  compatibility: '1.0.0'
});

const corePlugins: EducationalPlugin[] = [
  {
    ...createBasePlugin('learningEngine', 'Learning Engine'),
    onLoadChallenges: (challenges) => {
      // Logic handled via orchestrator currently. This is an integration point.
      return challenges;
    },
    onCorrectAnswer: (payload) => {
       if (payload.challenge) {
           learningEngine.analyzeChallenge(payload.challenge);
       }
    }
  } as EducationalPlugin,
  {
    ...createBasePlugin('adaptiveLearningEngine', 'Adaptive Learning Engine'),
    onRecommendations: (analytics) => {
       return adaptiveLearningEngine.generateRecommendations(analytics);
    }
  } as EducationalPlugin,
  {
    ...createBasePlugin('educationalAnalyticsEngine', 'Educational Analytics Engine'),
    onGameEnd: (payload) => {
       if (payload.playedChallenges && payload.totalCatalogSize) {
           const analytics = educationalAnalyticsEngine.processGameSession(payload.playedChallenges, payload.totalCatalogSize);
           educationalAnalyticsEngine.saveLocalAnalytics(analytics);
       }
    },
    onGenerateReports: (payload) => {
       if (payload.playedChallenges && payload.totalCatalogSize) {
           return educationalAnalyticsEngine.processGameSession(payload.playedChallenges, payload.totalCatalogSize);
       }
    }
  } as EducationalPlugin,
  {
    ...createBasePlugin('assessmentEngine', 'Assessment Engine'),
    onGenerateReports: (payload) => {
       if (payload.playedChallenges && payload.totalCatalogSize) {
           return assessmentEngine.generateAssessmentReport(payload.playedChallenges, payload.totalCatalogSize);
       }
    }
  } as EducationalPlugin,
  {
    ...createBasePlugin('teacherInsightsEngine', 'Teacher Insights Engine'),
    onTeacherDashboard: (data) => {
       if (data.activeChallenges) {
           return teacherInsightsEngine.analyzeLesson(data.activeChallenges);
       }
    }
  } as EducationalPlugin,
  {
    ...createBasePlugin('contentQualityEngine', 'Content Quality Engine'),
    onLoadChallenges: (challenges, metadata) => {
       if (metadata?.catalogId && metadata?.catalog) {
           contentQualityEngine.auditCatalog(metadata.catalogId, metadata.catalog);
       }
       return challenges;
    }
  } as EducationalPlugin,
  createBasePlugin('curriculumEngine', 'Curriculum Engine') as EducationalPlugin,
  createBasePlugin('accessibilityEngine', 'Accessibility Engine') as EducationalPlugin,
  createBasePlugin('knowledgeGraphEngine', 'Knowledge Graph Engine') as EducationalPlugin,
  createBasePlugin('simulationEngine', 'Simulation Engine') as EducationalPlugin,
  createBasePlugin('platformHealthEngine', 'Platform Health Engine') as EducationalPlugin,
  createBasePlugin('telemetryEngine', 'Telemetry Engine') as EducationalPlugin,
  createBasePlugin('performanceMonitor', 'Performance Monitor') as EducationalPlugin,
  createBasePlugin('diagnosticDashboard', 'Diagnostic Dashboard') as EducationalPlugin
];

export function registerBuiltinPlugins() {
  corePlugins.forEach(plugin => pluginManager.register(plugin));
}
