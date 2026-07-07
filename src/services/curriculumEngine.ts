import { educationalOrchestrator } from './educationalOrchestrator';

export type CurriculumStatus = 'Excelente' | 'Adecuado' | 'Requiere Ajuste' | 'Incompleto';

export interface CurriculumPlan {
  curricularCoverage: CurriculumStatus;
  pedagogicalProgression: CurriculumStatus;
  difficultyBalance: CurriculumStatus;
  bloomBalance: CurriculumStatus;
  
  recommendedSequence: string[];
  learningObjectives: string[];
  
  teacherRecommendations: string[];
}

export class CurriculumEngine {
  private static instance: CurriculumEngine;

  private constructor() {}

  static getInstance(): CurriculumEngine {
    if (!CurriculumEngine.instance) {
      CurriculumEngine.instance = new CurriculumEngine();
    }
    return CurriculumEngine.instance;
  }

  public analyzeLessonCurriculum(challenges: any[]): CurriculumPlan {
    if (!challenges || challenges.length === 0) {
      return {
        curricularCoverage: 'Incompleto',
        pedagogicalProgression: 'Incompleto',
        difficultyBalance: 'Incompleto',
        bloomBalance: 'Incompleto',
        recommendedSequence: [],
        learningObjectives: ['Añade contenido para definir los objetivos de aprendizaje.'],
        teacherRecommendations: ['El plan curricular está vacío. Añade desafíos para generar una secuencia.']
      };
    }

    const teacherInsights = educationalOrchestrator.analyzeLessonForTeacher(challenges);
    
    // Map TeacherInsights Status to CurriculumStatus
    const mapStatus = (status: string): CurriculumStatus => {
      if (status === 'Excelente') return 'Excelente';
      if (status === 'Bueno') return 'Adecuado';
      if (status === 'Mejorable') return 'Requiere Ajuste';
      return 'Incompleto';
    };

    const curricularCoverage = mapStatus(teacherInsights.themeBalance);
    const pedagogicalProgression = mapStatus(teacherInsights.bloomBalance);
    const difficultyBalance = mapStatus(teacherInsights.difficultyBalance);
    const bloomBalance = pedagogicalProgression;

    const recommendedSequence: string[] = [];
    const learningObjectives = new Set<string>();
    const teacherRecommendations: string[] = [];

    // Simulate ordering: group by difficulty then by bloom to suggest a progression
    const categorized = challenges.map(c => {
      const p = c._pedagogy || educationalOrchestrator.analyzeChallenge(c);
      return { challenge: c, pedagogy: p };
    });

    // Simple sort for progression: lowest difficulty first
    categorized.sort((a, b) => a.pedagogy.difficulty - b.pedagogy.difficulty);

    categorized.forEach((item, index) => {
      const title = item.challenge.reference || item.challenge.fullPhrase || item.challenge.answer || `Desafío ${index + 1}`;
      recommendedSequence.push(`${index + 1}. ${title} (${item.pedagogy.bloomLevel})`);
      
      learningObjectives.add(`El alumno será capaz de ${item.pedagogy.bloomLevel.toLowerCase()} conceptos sobre ${item.pedagogy.theme}.`);
    });

    if (difficultyBalance === 'Requiere Ajuste' || difficultyBalance === 'Incompleto') {
      teacherRecommendations.push('Progresión de dificultad inconsistente. Sugerimos ordenar desde nivel Principiante hasta Avanzado.');
    } else {
      teacherRecommendations.push('Excelente progresión de dificultad detectada.');
    }

    if (curricularCoverage === 'Requiere Ajuste') {
      teacherRecommendations.push('Para una cobertura curricular completa, incluye una evaluación final o un desafío integrador.');
    }

    teacherRecommendations.push('Se sugiere iniciar con dinámicas de reconocimiento (Buscar Palabra) antes de las de completamiento.');

    return {
      curricularCoverage,
      pedagogicalProgression,
      difficultyBalance,
      bloomBalance,
      recommendedSequence,
      learningObjectives: Array.from(learningObjectives).slice(0, 3), // max 3 objectives
      teacherRecommendations
    };
  }
}

export const curriculumEngine = CurriculumEngine.getInstance();
