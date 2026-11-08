import { PedagogicalAnalysis, LearningProfile } from '@/types/education';
import { inferPedagogy } from '@/utils/educationHelpers';
import { APP_CONSTANTS } from '@/constants/appConstants';
import { eventBus } from './eventBus';

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
    const analysis = inferPedagogy(challenge);
    eventBus.emit('CONTENT_ANALYZED', analysis);
    return analysis;
  }

  public generateRecommendations(profile: LearningProfile): string[] {
    const recommendations: string[] = [];
    if (profile.totalChallenges === 0) return recommendations;

    const knownCompetencies = [APP_CONSTANTS.COMPETENCIES.KNOWLEDGE, APP_CONSTANTS.COMPETENCIES.APPLICATION, APP_CONSTANTS.COMPETENCIES.REASONING];
    knownCompetencies.forEach(comp => {
      if (!profile.competencies[comp]) {
        recommendations.push(`Falta trabajar la competencia: ${comp}`);
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
