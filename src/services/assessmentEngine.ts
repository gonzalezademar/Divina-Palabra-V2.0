import { educationalOrchestrator } from './educationalOrchestrator';

export type AssessmentStatus = 'Excelente' | 'Bueno' | 'En desarrollo' | 'Requiere refuerzo';

export interface AssessmentReport {
  learningAchieved: AssessmentStatus;
  retention: AssessmentStatus;
  comprehension: AssessmentStatus;
  application: AssessmentStatus;
  
  progressByTheme: AssessmentStatus;
  progressByDifficulty: AssessmentStatus;
  progressByBloom: AssessmentStatus;
  progressByDoctrine: AssessmentStatus;
  progressByDynamics: AssessmentStatus;
  
  strengths: string[];
  weaknesses: string[];
  improvementTrends: string[];

  recommendationsForStudent: string[];
  recommendationsForTeacher: string[];
  
  nextActivity: string;
  nextTheme: string;
  nextDifficulty: string;
  nextBloom: string;
}

export class AssessmentEngine {
  private static instance: AssessmentEngine;

  private constructor() {}

  static getInstance(): AssessmentEngine {
    if (!AssessmentEngine.instance) {
      AssessmentEngine.instance = new AssessmentEngine();
    }
    return AssessmentEngine.instance;
  }

  public generateAssessmentReport(playedChallenges: any[], totalCatalogSize: number): AssessmentReport {
    if (!playedChallenges || playedChallenges.length === 0) {
      return {
        learningAchieved: 'Requiere refuerzo',
        retention: 'Requiere refuerzo',
        comprehension: 'Requiere refuerzo',
        application: 'Requiere refuerzo',
        progressByTheme: 'Requiere refuerzo',
        progressByDifficulty: 'Requiere refuerzo',
        progressByBloom: 'Requiere refuerzo',
        progressByDoctrine: 'Requiere refuerzo',
        progressByDynamics: 'Requiere refuerzo',
        strengths: [],
        weaknesses: ['No hay suficientes datos para evaluar.'],
        improvementTrends: [],
        recommendationsForStudent: ['Comienza a jugar para generar un perfil de evaluación.'],
        recommendationsForTeacher: ['Invita a los alumnos a completar una lección.'],
        nextActivity: 'Cualquiera',
        nextTheme: 'Cualquiera',
        nextDifficulty: 'Principiante',
        nextBloom: 'Recordar'
      };
    }

    const analytics = educationalOrchestrator.processGameSession(playedChallenges, totalCatalogSize);
    const adaptiveRecs = educationalOrchestrator.generateStudentRecommendations(analytics);

    const evaluate = (score: number): AssessmentStatus => {
      if (score >= 85) return 'Excelente';
      if (score >= 70) return 'Bueno';
      if (score >= 50) return 'En desarrollo';
      return 'Requiere refuerzo';
    };

    // Calculate a global score based on correctness percentages roughly
    let totalScore = 0;
    let scoreCount = 0;
    for (const val of Object.values(analytics.correctPercentageByTheme)) {
      totalScore += val;
      scoreCount++;
    }
    const globalAverage = scoreCount > 0 ? totalScore / scoreCount : 100;

    const learningAchieved = evaluate(globalAverage);
    
    // Simple proxies based on available data
    const retention = evaluate(globalAverage - 5);
    const comprehension = evaluate(globalAverage);
    const application = evaluate(globalAverage - 10);

    const progressByTheme = evaluate(globalAverage);
    const progressByDifficulty = evaluate(globalAverage);
    const progressByBloom = evaluate(globalAverage);
    const progressByDoctrine = evaluate(globalAverage);
    const progressByDynamics = evaluate(globalAverage);

    const improvementTrends = ['Progreso constante en reconocimiento de textos'];
    if (globalAverage >= 70) {
      improvementTrends.push('Alta retención a corto plazo');
    }

    const recommendationsForStudent = [
      `Continúa practicando ${adaptiveRecs.recommendedTheme}`,
      'Intenta no usar pistas en tus próximos desafíos'
    ];

    const recommendationsForTeacher = [
      `Refuerza ${adaptiveRecs.recommendedTheme} en la próxima clase.`,
      `El nivel sugerido para el grupo es ${adaptiveRecs.recommendedDifficulty}.`
    ];

    return {
      learningAchieved,
      retention,
      comprehension,
      application,
      progressByTheme,
      progressByDifficulty,
      progressByBloom,
      progressByDoctrine,
      progressByDynamics,
      strengths: adaptiveRecs.strengths,
      weaknesses: adaptiveRecs.weaknesses,
      improvementTrends,
      recommendationsForStudent,
      recommendationsForTeacher,
      nextActivity: 'Completar Versículo',
      nextTheme: adaptiveRecs.recommendedTheme,
      nextDifficulty: adaptiveRecs.recommendedDifficulty,
      nextBloom: adaptiveRecs.recommendedBloom
    };
  }
}

export const assessmentEngine = AssessmentEngine.getInstance();
