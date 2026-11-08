const fs = require('fs');
const path = require('path');
const src = path.join(process.cwd(), 'src');

const lePath = path.join(src, 'services', 'learningEngine.ts');
fs.writeFileSync(lePath, \import { PedagogicalAnalysis, LearningProfile, DoctrinalMetadata } from '@/types/education';
import { inferPedagogy } from '@/utils/educationHelpers';
import { APP_CONSTANTS } from '@/constants/appConstants';

export class LearningEngine {
  private static instance: LearningEngine;
  
  private constructor() {}

  static getInstance(): LearningEngine {
    if (!LearningEngine.instance) {
      LearningEngine.instance = new LearningEngine();
    }
    return LearningEngine.instance;
  }

  public analyzeChallenge(challenge: any): PedagogicalAnalysis {
    return inferPedagogy(challenge);
  }

  public generateRecommendations(profile: LearningProfile): string[] {
    const recommendations: string[] = [];
    if (profile.totalChallenges === 0) return recommendations;

    const knownCompetencies = [APP_CONSTANTS.COMPETENCIES.KNOWLEDGE, APP_CONSTANTS.COMPETENCIES.APPLICATION, APP_CONSTANTS.COMPETENCIES.REASONING];
    knownCompetencies.forEach(comp => {
      if (!profile.competencies[comp]) {
        recommendations.push(\\\Falta trabajar la competencia: \\\\\\);
      }
    });

    if (!profile.bloomLevels[APP_CONSTANTS.BLOOM_LEVELS.APPLY] && !profile.bloomLevels[APP_CONSTANTS.BLOOM_LEVELS.ANALYZE]) {
      recommendations.push('Sugerencia: Incrementar preguntas de nivel de Aplicación y Análisis.');
    }

    const bookCount = Object.keys(profile.books).length;
    if (bookCount < 2 && profile.totalChallenges > 3) {
      recommendations.push('Sugerencia: Diversificar el uso de libros bíblicos.');
    }

    return recommendations;
  }
}

export const learningEngine = LearningEngine.getInstance();
\);

const aePath = path.join(src, 'services', 'adaptiveLearningEngine.ts');
fs.writeFileSync(aePath, \import { EducationalAnalytics, AdaptiveRecommendations } from '@/types/education';
import { APP_CONSTANTS } from '@/constants/appConstants';

export class AdaptiveLearningEngine {
  private static instance: AdaptiveLearningEngine;

  private constructor() {}

  static getInstance(): AdaptiveLearningEngine {
    if (!AdaptiveLearningEngine.instance) {
      AdaptiveLearningEngine.instance = new AdaptiveLearningEngine();
    }
    return AdaptiveLearningEngine.instance;
  }

  public generateRecommendations(analytics: EducationalAnalytics): AdaptiveRecommendations {
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    
    let bestTheme = '';
    let bestScore = -1;
    let worstTheme = '';
    let worstScore = 101;

    for (const [theme, score] of Object.entries(analytics.correctPercentageByTheme)) {
      if (score >= APP_CONSTANTS.THRESHOLDS.MASTERY) {
        strengths.push(\\\Dominio en \\\\\\);
      } else if (score < APP_CONSTANTS.THRESHOLDS.WEAKNESS) {
        weaknesses.push(\\\Reforzar \\\\\\);
      }

      if (score > bestScore) {
        bestScore = score;
        bestTheme = theme;
      }
      if (score < worstScore) {
        worstScore = score;
        worstTheme = theme;
      }
    }

    if (strengths.length === 0 && bestTheme) {
      strengths.push(\\\Buen avance en \\\\\\);
    }
    if (weaknesses.length === 0) {
      if (worstTheme && worstScore < 100) {
        weaknesses.push(\\\Oportunidad en \\\\\\);
      } else {
        weaknesses.push('¡Excelente rendimiento general!');
      }
    }

    const recommendedTheme = worstTheme || APP_CONSTANTS.THEMES.ADVANCED;

    let recommendedDifficulty: 'Principiante' | 'Discípulo' | 'Avanzado' = 'Principiante';
    if (bestScore > 80) {
      recommendedDifficulty = 'Discípulo';
      if (analytics.distributionByDifficulty['Discípulo'] > 3) {
        recommendedDifficulty = 'Avanzado';
      }
    }

    let recommendedBloom = APP_CONSTANTS.BLOOM_LEVELS.APPLY;
    if (analytics.distributionByBloom[APP_CONSTANTS.BLOOM_LEVELS.REMEMBER] > 5 && bestScore > 70) {
      recommendedBloom = APP_CONSTANTS.BLOOM_LEVELS.ANALYZE;
    }

    const recommendedVerseReference = worstTheme === APP_CONSTANTS.THEMES.SALVATION ? 'Juan 3:16' : 
                                      worstTheme === APP_CONSTANTS.THEMES.FAITH ? 'Hebreos 11:1' :
                                      'Salmos 119:105';

    return {
      strengths,
      weaknesses,
      recommendedTheme,
      recommendedBloom,
      recommendedDifficulty,
      recommendedVerseReference
    };
  }
}

export const adaptiveLearningEngine = AdaptiveLearningEngine.getInstance();
\);

const eaePath = path.join(src, 'services', 'educationalAnalyticsEngine.ts');
fs.writeFileSync(eaePath, \import { learningEngine } from './learningEngine';
import { EducationalAnalytics } from '@/types/education';
import { APP_CONSTANTS } from '@/constants/appConstants';

export class EducationalAnalyticsEngine {
  private static instance: EducationalAnalyticsEngine;

  private constructor() {}

  static getInstance(): EducationalAnalyticsEngine {
    if (!EducationalAnalyticsEngine.instance) {
      EducationalAnalyticsEngine.instance = new EducationalAnalyticsEngine();
    }
    return EducationalAnalyticsEngine.instance;
  }

  public processGameSession(playedChallenges: any[], totalCatalogSize: number): EducationalAnalytics {
    const analytics: EducationalAnalytics = {
      distributionByBook: {},
      distributionByTheme: {},
      distributionByCompetency: {},
      distributionByBloom: {},
      distributionByDifficulty: {},
      correctPercentageByCompetency: {},
      correctPercentageByTheme: {},
      correctPercentageByBook: {},
      atNtBalance: { AT: 0, NT: 0 },
      catalogCoverage: 0,
    };

    if (!playedChallenges || playedChallenges.length === 0) {
      return analytics;
    }

    const correctCounts = {
      competency: {} as Record<string, { total: number; correct: number }>,
      theme: {} as Record<string, { total: number; correct: number }>,
      book: {} as Record<string, { total: number; correct: number }>,
    };

    playedChallenges.forEach((challenge) => {
      const pedagogy = challenge._pedagogy || learningEngine.analyzeChallenge(challenge);
      const isCorrect = challenge._isCorrect === true;

      analytics.distributionByBook[pedagogy.book] = (analytics.distributionByBook[pedagogy.book] || 0) + 1;
      analytics.distributionByTheme[pedagogy.theme] = (analytics.distributionByTheme[pedagogy.theme] || 0) + 1;
      analytics.distributionByCompetency[pedagogy.competency] = (analytics.distributionByCompetency[pedagogy.competency] || 0) + 1;
      analytics.distributionByBloom[pedagogy.bloomLevel] = (analytics.distributionByBloom[pedagogy.bloomLevel] || 0) + 1;
      
      const diffLabel = pedagogy.difficulty === 1 ? APP_CONSTANTS.DIFFICULTY_LEVELS.BEGINNER : pedagogy.difficulty === 2 ? APP_CONSTANTS.DIFFICULTY_LEVELS.DISCIPLE : APP_CONSTANTS.DIFFICULTY_LEVELS.ADVANCED;
      analytics.distributionByDifficulty[diffLabel] = (analytics.distributionByDifficulty[diffLabel] || 0) + 1;

      if (pedagogy.testament === APP_CONSTANTS.TESTAMENTS.AT || pedagogy.testament === 'AT') analytics.atNtBalance.AT++;
      if (pedagogy.testament === APP_CONSTANTS.TESTAMENTS.NT || pedagogy.testament === 'NT') analytics.atNtBalance.NT++;

      if (challenge._isCorrect !== undefined) {
        if (!correctCounts.competency[pedagogy.competency]) correctCounts.competency[pedagogy.competency] = { total: 0, correct: 0 };
        correctCounts.competency[pedagogy.competency].total++;
        if (isCorrect) correctCounts.competency[pedagogy.competency].correct++;

        if (!correctCounts.theme[pedagogy.theme]) correctCounts.theme[pedagogy.theme] = { total: 0, correct: 0 };
        correctCounts.theme[pedagogy.theme].total++;
        if (isCorrect) correctCounts.theme[pedagogy.theme].correct++;

        if (!correctCounts.book[pedagogy.book]) correctCounts.book[pedagogy.book] = { total: 0, correct: 0 };
        correctCounts.book[pedagogy.book].total++;
        if (isCorrect) correctCounts.book[pedagogy.book].correct++;
      }
    });

    Object.keys(correctCounts.competency).forEach(k => {
      const c = correctCounts.competency[k];
      analytics.correctPercentageByCompetency[k] = Math.round((c.correct / c.total) * 100);
    });
    Object.keys(correctCounts.theme).forEach(k => {
      const c = correctCounts.theme[k];
      analytics.correctPercentageByTheme[k] = Math.round((c.correct / c.total) * 100);
    });
    Object.keys(correctCounts.book).forEach(k => {
      const c = correctCounts.book[k];
      analytics.correctPercentageByBook[k] = Math.round((c.correct / c.total) * 100);
    });

    if (totalCatalogSize > 0) {
      analytics.catalogCoverage = Math.round((playedChallenges.length / totalCatalogSize) * 100);
    }

    return analytics;
  }

  public saveLocalAnalytics(analytics: EducationalAnalytics): void {
    if (typeof window === 'undefined') return;
    try {
      const existingStr = localStorage.getItem('divina_palabra_analytics');
      const existing = existingStr ? JSON.parse(existingStr) : [];
      existing.push({
        date: new Date().toISOString(),
        analytics
      });
      localStorage.setItem('divina_palabra_analytics', JSON.stringify(existing));
    } catch (e) {
      console.error("Failed to save local analytics", e);
    }
  }
}

export const educationalAnalyticsEngine = EducationalAnalyticsEngine.getInstance();
\);

const eoPath = path.join(src, 'services', 'educationalOrchestrator.ts');
fs.writeFileSync(eoPath, \import { learningEngine } from './learningEngine';
import { educationalAnalyticsEngine } from './educationalAnalyticsEngine';
import { adaptiveLearningEngine } from './adaptiveLearningEngine';
import { teacherInsightsEngine } from './teacherInsightsEngine';
import { contentQualityEngine } from './contentQualityEngine';
import { filterByDoctrinalProfile } from '@/utils/educationHelpers';
import { Challenge, BibleCatalog } from '@/data/bibleData';
import { EducationalAnalytics, AdaptiveRecommendations, TeacherInsights, QualityReport } from '@/types/education';

export class EducationalOrchestrator {
  private static instance: EducationalOrchestrator;

  private constructor() {}

  static getInstance(): EducationalOrchestrator {
    if (!EducationalOrchestrator.instance) {
      EducationalOrchestrator.instance = new EducationalOrchestrator();
    }
    return EducationalOrchestrator.instance;
  }

  public analyzeChallenge(challenge: any) {
    return learningEngine.analyzeChallenge(challenge);
  }

  public processGameSession(playedChallenges: any[], totalCatalogSize: number): EducationalAnalytics {
    return educationalAnalyticsEngine.processGameSession(playedChallenges, totalCatalogSize);
  }

  public saveLocalAnalytics(analytics: EducationalAnalytics): void {
    educationalAnalyticsEngine.saveLocalAnalytics(analytics);
  }

  public generateStudentRecommendations(analytics: EducationalAnalytics): AdaptiveRecommendations {
    return adaptiveLearningEngine.generateRecommendations(analytics);
  }

  public analyzeLessonForTeacher(challenges: any[]): TeacherInsights {
    return teacherInsightsEngine.analyzeLesson(challenges);
  }

  public auditCatalog(catalogId: string, catalog: BibleCatalog): void {
    contentQualityEngine.auditCatalog(catalogId, catalog);
  }
  
  public getCatalogQualityReport(): QualityReport {
    return contentQualityEngine.getReport();
  }

  public filterChallengesByDoctrine(challenges: any[], profile?: string, maxItems?: number) {
    return filterByDoctrinalProfile(challenges, profile, maxItems);
  }
}

export const educationalOrchestrator = EducationalOrchestrator.getInstance();
\);

const dfPath = path.join(src, 'utils', 'doctrinalFilter.ts');
fs.writeFileSync(dfPath, \export * from '@/types/education';
export { filterByDoctrinalProfile } from './educationHelpers';
\);

console.log("Updated files");
