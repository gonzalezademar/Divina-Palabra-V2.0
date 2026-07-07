import { learningEngine } from './learningEngine';

export interface EducationalAnalytics {
  distributionByBook: Record<string, number>;
  distributionByTheme: Record<string, number>;
  distributionByCompetency: Record<string, number>;
  distributionByBloom: Record<string, number>;
  distributionByDifficulty: Record<string, number>;
  correctPercentageByCompetency: Record<string, number>;
  correctPercentageByTheme: Record<string, number>;
  correctPercentageByBook: Record<string, number>;
  atNtBalance: { AT: number; NT: number };
  catalogCoverage: number;
}

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
      // Reutilizar Learning Engine si la metadata no existe
      const pedagogy = challenge._pedagogy || learningEngine.analyzeChallenge(challenge);
      const isCorrect = challenge._isCorrect === true;

      // Distributions
      analytics.distributionByBook[pedagogy.book] = (analytics.distributionByBook[pedagogy.book] || 0) + 1;
      analytics.distributionByTheme[pedagogy.theme] = (analytics.distributionByTheme[pedagogy.theme] || 0) + 1;
      analytics.distributionByCompetency[pedagogy.competency] = (analytics.distributionByCompetency[pedagogy.competency] || 0) + 1;
      analytics.distributionByBloom[pedagogy.bloomLevel] = (analytics.distributionByBloom[pedagogy.bloomLevel] || 0) + 1;
      
      const diffLabel = pedagogy.difficulty === 1 ? 'Principiante' : pedagogy.difficulty === 2 ? 'Discípulo' : 'Avanzado';
      analytics.distributionByDifficulty[diffLabel] = (analytics.distributionByDifficulty[diffLabel] || 0) + 1;

      if (pedagogy.testament === 'AT') analytics.atNtBalance.AT++;
      if (pedagogy.testament === 'NT') analytics.atNtBalance.NT++;
      if (pedagogy.testament === 'Nuevo Testamento') analytics.atNtBalance.NT++;
      if (pedagogy.testament === 'Antiguo Testamento') analytics.atNtBalance.AT++;

      // Track correct answers for percentages
      if (challenge._isCorrect !== undefined) { // only track if we know it was answered
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

    // Calculate percentages
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

    // Calculate coverage
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
