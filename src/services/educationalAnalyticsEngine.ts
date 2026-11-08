import { progressStorageKey } from '@/lib/practice';
import { learningEngine } from './learningEngine';
import { EducationalAnalytics } from '@/types/education';

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
      
      const diffLabel = pedagogy.difficulty === 1 ? 'Principiante' : pedagogy.difficulty === 2 ? 'Discípulo' : 'Avanzado';
      analytics.distributionByDifficulty[diffLabel] = (analytics.distributionByDifficulty[diffLabel] || 0) + 1;

      if (pedagogy.testament === 'AT' || pedagogy.testament === 'Antiguo Testamento') analytics.atNtBalance.AT++;
      if (pedagogy.testament === 'NT' || pedagogy.testament === 'Nuevo Testamento') analytics.atNtBalance.NT++;

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
      const existingStr = localStorage.getItem(progressStorageKey('divina_palabra_analytics'));
      const existing = existingStr ? JSON.parse(existingStr) : [];
      existing.push({
        date: new Date().toISOString(),
        analytics
      });
      // Keep only the most recent 50 sessions
      const MAX_SESSIONS = 50;
      if (existing.length > MAX_SESSIONS) {
        // Remove oldest entries
        const excess = existing.length - MAX_SESSIONS;
        existing.splice(0, excess);
      }
      localStorage.setItem(progressStorageKey('divina_palabra_analytics'), JSON.stringify(existing));
    } catch (e) {
      console.error("Failed to save local analytics", e);
    }
  }
}

export const educationalAnalyticsEngine = EducationalAnalyticsEngine.getInstance();
