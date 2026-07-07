import { EducationalAnalytics } from './educationalAnalyticsEngine';
import { learningEngine } from './learningEngine';

export interface AdaptiveRecommendations {
  strengths: string[];
  weaknesses: string[];
  recommendedTheme: string;
  recommendedBloom: string;
  recommendedDifficulty: 'Principiante' | 'Discípulo' | 'Avanzado';
  recommendedVerseReference: string;
}

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
    
    // Determine strengths and weaknesses based on correct percentage by theme
    let bestTheme = '';
    let bestScore = -1;
    let worstTheme = '';
    let worstScore = 101;

    for (const [theme, score] of Object.entries(analytics.correctPercentageByTheme)) {
      if (score >= 80) {
        strengths.push(`Dominio en ${theme}`);
      } else if (score < 50) {
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

    // Recommend next theme
    const recommendedTheme = worstTheme || 'Temas Avanzados';

    // Recommend difficulty
    let recommendedDifficulty: 'Principiante' | 'Discípulo' | 'Avanzado' = 'Principiante';
    if (bestScore > 80) {
      recommendedDifficulty = 'Discípulo';
      if (analytics.distributionByDifficulty['Discípulo'] > 3) {
        recommendedDifficulty = 'Avanzado';
      }
    }

    // Recommend Bloom Level
    let recommendedBloom = 'Aplicar';
    if (analytics.distributionByBloom['Recordar'] > 5 && bestScore > 70) {
      recommendedBloom = 'Analizar';
    }

    // Generic verse recommendation fallback (could pull from catalog, but we keep it simple as requested)
    const recommendedVerseReference = worstTheme === 'Salvación' ? 'Juan 3:16' : 
                                      worstTheme === 'Fe y Esperanza' ? 'Hebreos 11:1' :
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
