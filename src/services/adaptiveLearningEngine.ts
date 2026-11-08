import { EducationalAnalytics, AdaptiveRecommendations } from '@/types/education';
import { APP_CONSTANTS } from '@/constants/appConstants';
import { featureFlagEngine } from './featureFlagEngine';

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
    if (!featureFlagEngine.isEnabled('ENABLE_ADAPTIVE_LEARNING')) {
      return {
        strengths: [],
        weaknesses: [],
        recommendedTheme: APP_CONSTANTS.THEMES.ADVANCED,
        recommendedBloom: APP_CONSTANTS.BLOOM_LEVELS.REMEMBER,
        recommendedDifficulty: 'Principiante',
        recommendedVerseReference: 'Salmos 119:105'
      };
    }

    const strengths: string[] = [];
    const weaknesses: string[] = [];
    
    let bestTheme = '';
    let bestScore = -1;
    let worstTheme = '';
    let worstScore = 101;

    for (const [theme, score] of Object.entries(analytics.correctPercentageByTheme)) {
      if (score >= APP_CONSTANTS.THRESHOLDS.MASTERY) {
        strengths.push(`Dominio en ${theme}`);
      } else if (score < APP_CONSTANTS.THRESHOLDS.WEAKNESS) {
        weaknesses.push(`Reforzar ${theme}`);
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
      strengths.push(`Buen avance en ${bestTheme}`);
    }
    if (weaknesses.length === 0) {
      if (worstTheme && worstScore < 100) {
        weaknesses.push(`Oportunidad en ${worstTheme}`);
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
