import { BibleCatalog } from '@/data/bibleData';
import { learningEngine } from './learningEngine';
import { TeacherInsights, InsightStatus } from '@/types/education';
import { repositoryManager } from '@/repositories';


export class TeacherInsightsEngine {
  private static instance: TeacherInsightsEngine;

  private constructor() {}

  static getInstance(): TeacherInsightsEngine {
    if (!TeacherInsightsEngine.instance) {
      TeacherInsightsEngine.instance = new TeacherInsightsEngine();
    }
    return TeacherInsightsEngine.instance;
  }

  public analyzeLesson(challenges: any[]): TeacherInsights {
    if (!challenges || challenges.length === 0) {
      return {
        themeBalance: 'Insuficiente',
        difficultyBalance: 'Insuficiente',
        bloomBalance: 'Insuficiente',
        doctrinalBalance: 'Insuficiente',
        gameModeBalance: 'Insuficiente',
        biblicalCoverage: 'Insuficiente',
        recommendations: ['Agrega desafíos a tu lección para ver el análisis pedagógico.']
      };
    }

    // Consultar AnalyticsRepository de forma transparente
    try {
      const repo = repositoryManager.get<any>('AnalyticsRepository');
      repo.getAll().catch(() => {});
    } catch (e) {}

    const themes = new Set<string>();
    const difficulties = new Set<number>();
    const blooms = new Set<string>();
    const testaments = new Set<string>();
    const books = new Set<string>();

    challenges.forEach(c => {
      const pedagogy = c._pedagogy || learningEngine.analyzeChallenge(c);
      themes.add(pedagogy.theme);
      difficulties.add(pedagogy.difficulty);
      blooms.add(pedagogy.bloomLevel);
      testaments.add(pedagogy.testament);
      books.add(pedagogy.book);
    });

    const evaluate = (count: number, excellentThreshold: number, goodThreshold: number): InsightStatus => {
      if (count >= excellentThreshold) return 'Excelente';
      if (count >= goodThreshold) return 'Bueno';
      if (count > 0) return 'Mejorable';
      return 'Insuficiente';
    };

    const themeBalance = evaluate(themes.size, 3, 2);
    const difficultyBalance = evaluate(difficulties.size, 2, 1);
    const bloomBalance = evaluate(blooms.size, 3, 2);
    const doctrinalBalance = evaluate(testaments.size, 2, 1); // Both testaments
    const biblicalCoverage = evaluate(books.size, 3, 2);
    
    // gameModeBalance depends on the UI, typically a lesson generated automatically mixes them.
    const gameModeBalance: InsightStatus = 'Bueno';

    const recommendations: string[] = [];

    if (themeBalance === 'Insuficiente' || themeBalance === 'Mejorable') {
      recommendations.push('Considera diversificar los temas bíblicos cubiertos.');
    }
    if (bloomBalance === 'Insuficiente' || bloomBalance === 'Mejorable') {
      recommendations.push('Añade desafíos que fomenten niveles superiores de pensamiento (Aplicar, Analizar).');
    }
    if (doctrinalBalance !== 'Excelente') {
      recommendations.push('Intenta equilibrar el contenido entre el Antiguo y Nuevo Testamento.');
    }
    if (difficultyBalance !== 'Excelente') {
      recommendations.push('Sugerimos variar la dificultad para mantener el interés de distintos perfiles de alumnos.');
    }

    if (recommendations.length === 0) {
      recommendations.push('¡Tu lección tiene un diseño pedagógico muy bien equilibrado!');
    }

    return {
      themeBalance,
      difficultyBalance,
      bloomBalance,
      doctrinalBalance,
      gameModeBalance,
      biblicalCoverage,
      recommendations
    };
  }
}

export const teacherInsightsEngine = TeacherInsightsEngine.getInstance();
