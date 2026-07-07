import { teacherInsightsEngine } from './teacherInsightsEngine';
import { curriculumEngine } from './curriculumEngine';
import { knowledgeGraphEngine } from './knowledgeGraphEngine';
import { BibleCatalog } from '@/data/bibleData';

export type SimulationStatus = 'Excelente' | 'Bueno' | 'Mejorable' | 'Crítico';

export interface SimulationReport {
  overallSimulation: SimulationStatus;
  pedagogicalCoverage: SimulationStatus;
  doctrinalCoverage: SimulationStatus;
  semanticCoverage: SimulationStatus;

  estimatedTimeMinutes: number;
  
  risksDetected: string[];
  prePublicationRecommendations: string[];

  scenarios: {
    kids: SimulationStatus;
    teens: SimulationStatus;
    youth: SimulationStatus;
    adults: SimulationStatus;
    seniors: SimulationStatus;
    sundaySchool: SimulationStatus;
    bibleStudy: SimulationStatus;
    youthMeeting: SimulationStatus;
    camp: SimulationStatus;
    virtualClassroom: SimulationStatus;
  };
}

export class SimulationEngine {
  private static instance: SimulationEngine;

  private constructor() {}

  static getInstance(): SimulationEngine {
    if (!SimulationEngine.instance) {
      SimulationEngine.instance = new SimulationEngine();
    }
    return SimulationEngine.instance;
  }

  public simulateLesson(catalog: BibleCatalog, challenges: any[]): SimulationReport {
    const teacherInsights = teacherInsightsEngine.analyzeLesson(challenges);
    const curriculum = curriculumEngine.analyzeLessonCurriculum(challenges);
    const semantic = knowledgeGraphEngine.getSemanticReport(catalog);

    const mapStatus = (status: string): SimulationStatus => {
      if (status === 'Excelente') return 'Excelente';
      if (status === 'Bueno' || status === 'Adecuado') return 'Bueno';
      if (status === 'Mejorable' || status === 'Requiere Ajuste') return 'Mejorable';
      return 'Crítico';
    };

    const pedagogicalCoverage = mapStatus(curriculum.curricularCoverage);
    const doctrinalCoverage = mapStatus(teacherInsights.doctrinalBalance);
    const semanticCoverage = mapStatus(semantic.semanticCoverage);
    
    // Overall depends on worst indicator to be safe
    let overallSimulation: SimulationStatus = 'Excelente';
    if (pedagogicalCoverage === 'Bueno' || doctrinalCoverage === 'Bueno') overallSimulation = 'Bueno';
    if (pedagogicalCoverage === 'Mejorable' || doctrinalCoverage === 'Mejorable') overallSimulation = 'Mejorable';
    if (pedagogicalCoverage === 'Crítico' || doctrinalCoverage === 'Crítico') overallSimulation = 'Crítico';

    // Basic time estimation: ~2 minutes per challenge
    const estimatedTimeMinutes = challenges.length * 2;

    const risksDetected: string[] = [];
    const prePublicationRecommendations: string[] = [];

    if (overallSimulation === 'Crítico') {
      risksDetected.push('Lección desequilibrada, alto riesgo de deserción.');
    }
    if (doctrinalCoverage === 'Crítico') {
      risksDetected.push('Desequilibrio AT/NT muy marcado.');
    }
    
    if (estimatedTimeMinutes < 5) {
      prePublicationRecommendations.push('Lección muy corta. Sugerimos agregar 2-3 desafíos más.');
    } else {
      prePublicationRecommendations.push('Excelente longitud de lección.');
    }

    if (pedagogicalCoverage === 'Mejorable') {
      prePublicationRecommendations.push('Intenta incorporar desafíos con niveles de dificultad más variados.');
    }

    const scenarios = {
      kids: pedagogicalCoverage === 'Crítico' ? 'Crítico' : 'Bueno' as SimulationStatus,
      teens: 'Bueno' as SimulationStatus,
      youth: overallSimulation,
      adults: 'Excelente' as SimulationStatus,
      seniors: 'Mejorable' as SimulationStatus,
      sundaySchool: overallSimulation,
      bibleStudy: doctrinalCoverage,
      youthMeeting: 'Bueno' as SimulationStatus,
      camp: 'Excelente' as SimulationStatus,
      virtualClassroom: semanticCoverage
    };

    return {
      overallSimulation,
      pedagogicalCoverage,
      doctrinalCoverage,
      semanticCoverage,
      estimatedTimeMinutes,
      risksDetected,
      prePublicationRecommendations,
      scenarios
    };
  }
}

export const simulationEngine = SimulationEngine.getInstance();
