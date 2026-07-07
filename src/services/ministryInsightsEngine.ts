import { contentGovernanceEngine } from './contentGovernanceEngine';
import { curriculumEngine } from './curriculumEngine';
import { teacherInsightsEngine } from './teacherInsightsEngine';
import { BibleCatalog } from '@/data/bibleData';

export type MinistryStatus = 'Excelente' | 'Saludable' | 'En Observación' | 'Requiere Intervención';

export interface MinistryReport {
  overallHealth: MinistryStatus;
  biblicalCoverage: MinistryStatus;
  pedagogicalCoverage: MinistryStatus;
  contentDiversity: MinistryStatus;
  curricularBalance: MinistryStatus;

  risksDetected: string[];
  priorityRecommendations: string[];

  roleRecommendations: {
    pastor: string;
    teacher: string;
    sundaySchoolDirector: string;
    youthLeader: string;
    childrenCoordinator: string;
  };
}

export class MinistryInsightsEngine {
  private static instance: MinistryInsightsEngine;

  private constructor() {}

  static getInstance(): MinistryInsightsEngine {
    if (!MinistryInsightsEngine.instance) {
      MinistryInsightsEngine.instance = new MinistryInsightsEngine();
    }
    return MinistryInsightsEngine.instance;
  }

  public evaluateMinistryHealth(catalog: BibleCatalog, challenges: any[]): MinistryReport {
    // Rely on other engines
    const govAudit = contentGovernanceEngine.auditFullCatalog(catalog);
    const curriculum = curriculumEngine.analyzeLessonCurriculum(challenges);
    const teacherInsights = teacherInsightsEngine.analyzeLesson(challenges);

    const mapGovStatus = (status: string): MinistryStatus => {
      if (status === 'Excelente') return 'Excelente';
      if (status === 'Bueno') return 'Saludable';
      if (status === 'Mejorable') return 'En Observación';
      return 'Requiere Intervención';
    };

    const overallHealth: MinistryStatus = mapGovStatus(govAudit.pedagogicalCoverage);
    const biblicalCoverage: MinistryStatus = mapGovStatus(govAudit.bookCoverage);
    const pedagogicalCoverage: MinistryStatus = mapGovStatus(curriculum.pedagogicalProgression);
    const contentDiversity: MinistryStatus = mapGovStatus(govAudit.themeCoverage);
    const curricularBalance: MinistryStatus = mapGovStatus(teacherInsights.doctrinalBalance);

    const risksDetected: string[] = [];
    const priorityRecommendations: string[] = [];

    if (biblicalCoverage === 'En Observación' || biblicalCoverage === 'Requiere Intervención') {
      risksDetected.push('Baja diversidad bíblica: Se están enseñando los mismos libros repetidamente.');
      priorityRecommendations.push('Planificar una serie de lecciones abarcando libros menos comunes.');
    }

    if (pedagogicalCoverage === 'Requiere Intervención') {
      risksDetected.push('Progresión pedagógica inconsistente: Los conceptos no aumentan en profundidad adecuadamente.');
      priorityRecommendations.push('Revisar la dificultad y los niveles de Bloom de los desafíos.');
    }
    
    if (contentDiversity === 'Requiere Intervención') {
      risksDetected.push('Exceso de repetición temática detectada.');
      priorityRecommendations.push('Diversificar las dinámicas y temáticas para mantener el interés.');
    }

    if (risksDetected.length === 0) {
      priorityRecommendations.push('El currículo actual muestra un excelente equilibrio. Continúe con el plan actual.');
    }

    const roleRecommendations = {
      pastor: 'El ministerio está alineado doctrinalmente, se recomienda supervisar temas trimestrales.',
      teacher: 'Continuar implementando dinámicas prácticas tras las lecciones teóricas.',
      sundaySchoolDirector: 'Coordinar las lecciones para garantizar que todas las edades cubran el panorama completo de la Biblia.',
      youthLeader: 'Introducir debates sobre aplicación contemporánea en base a estos desafíos.',
      childrenCoordinator: 'Mantener tiempos cortos de juego y combinar con memorización interactiva.'
    };

    return {
      overallHealth,
      biblicalCoverage,
      pedagogicalCoverage,
      contentDiversity,
      curricularBalance,
      risksDetected,
      priorityRecommendations,
      roleRecommendations
    };
  }
}

export const ministryInsightsEngine = MinistryInsightsEngine.getInstance();
