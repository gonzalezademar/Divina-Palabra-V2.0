import { learningEngine } from './learningEngine';
import { educationalAnalyticsEngine, EducationalAnalytics } from './educationalAnalyticsEngine';
import { adaptiveLearningEngine, AdaptiveRecommendations } from './adaptiveLearningEngine';
import { teacherInsightsEngine, TeacherInsights } from './teacherInsightsEngine';
import { contentQualityEngine, QualityReport } from './contentQualityEngine';
import { filterByDoctrinalProfile } from '@/utils/doctrinalFilter';
import { Challenge, BibleCatalog } from '@/data/bibleData';

export class EducationalOrchestrator {
  private static instance: EducationalOrchestrator;

  private constructor() {}

  static getInstance(): EducationalOrchestrator {
    if (!EducationalOrchestrator.instance) {
      EducationalOrchestrator.instance = new EducationalOrchestrator();
    }
    return EducationalOrchestrator.instance;
  }

  // --- Learning Engine ---
  public analyzeChallenge(challenge: any) {
    return learningEngine.analyzeChallenge(challenge);
  }

  // --- Educational Analytics Engine ---
  public processGameSession(playedChallenges: any[], totalCatalogSize: number): EducationalAnalytics {
    return educationalAnalyticsEngine.processGameSession(playedChallenges, totalCatalogSize);
  }

  public saveLocalAnalytics(analytics: EducationalAnalytics): void {
    educationalAnalyticsEngine.saveLocalAnalytics(analytics);
  }

  // --- Adaptive Learning Engine ---
  public generateStudentRecommendations(analytics: EducationalAnalytics): AdaptiveRecommendations {
    return adaptiveLearningEngine.generateRecommendations(analytics);
  }

  // --- Teacher Insights Engine ---
  public analyzeLessonForTeacher(challenges: any[]): TeacherInsights {
    return teacherInsightsEngine.analyzeLesson(challenges);
  }

  // --- Content Quality Engine ---
  public auditCatalog(catalogId: string, catalog: BibleCatalog): void {
    contentQualityEngine.auditCatalog(catalogId, catalog);
  }
  
  public getCatalogQualityReport(): QualityReport {
    return contentQualityEngine.getReport();
  }

  // --- Doctrinal Filter ---
  public filterChallengesByDoctrine(challenges: any[], profile?: string, maxItems?: number) {
    return filterByDoctrinalProfile(challenges, profile, maxItems);
  }
}

export const educationalOrchestrator = EducationalOrchestrator.getInstance();
