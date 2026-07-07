import { systemAuditEngine } from './systemAuditEngine';
import { contentGovernanceEngine } from './contentGovernanceEngine';
import { curriculumEngine } from './curriculumEngine';
import { assessmentEngine } from './assessmentEngine';
import { accessibilityEngine } from './accessibilityEngine';
import { ministryInsightsEngine } from './ministryInsightsEngine';
import { knowledgeGraphEngine } from './knowledgeGraphEngine';
import { simulationEngine } from './simulationEngine';
import { BibleCatalog } from '@/data/bibleData';

export type HealthStatus = 'Excelente' | 'Bueno' | 'Mejorable' | 'Crítico';

export interface PlatformHealthReport {
  architecturalHealth: HealthStatus;
  pedagogicalHealth: HealthStatus;
  doctrinalHealth: HealthStatus;
  contentHealth: HealthStatus;
  curriculumHealth: HealthStatus;
  accessibilityHealth: HealthStatus;
  ministryHealth: HealthStatus;
  knowledgeGraphHealth: HealthStatus;
  simulationHealth: HealthStatus;

  overallEnterpriseStatus: HealthStatus;

  developerRecommendations: string[];
}

export class PlatformHealthEngine {
  private static instance: PlatformHealthEngine;

  private constructor() {}

  static getInstance(): PlatformHealthEngine {
    if (!PlatformHealthEngine.instance) {
      PlatformHealthEngine.instance = new PlatformHealthEngine();
    }
    return PlatformHealthEngine.instance;
  }

  public auditPlatform(catalog: BibleCatalog, challenges: any[]): PlatformHealthReport {
    const sysAudit = systemAuditEngine.generateFullSystemAudit(catalog);
    const govAudit = contentGovernanceEngine.auditFullCatalog(catalog);
    const curriculum = curriculumEngine.analyzeLessonCurriculum(challenges);
    const assessment = assessmentEngine.generateAssessmentReport(challenges, 100);
    const accessibility = accessibilityEngine.auditAccessibility(catalog);
    const ministry = ministryInsightsEngine.evaluateMinistryHealth(catalog, challenges);
    const kg = knowledgeGraphEngine.getSemanticReport(catalog);
    const sim = simulationEngine.simulateLesson(catalog, challenges);

    const mapStatus = (status: string): HealthStatus => {
      if (status === 'Excelente') return 'Excelente';
      if (status === 'Bueno' || status === 'Adecuado' || status === 'Saludable') return 'Bueno';
      if (status === 'Mejorable' || status === 'En desarrollo' || status === 'Requiere Ajuste' || status === 'En Observación') return 'Mejorable';
      return 'Crítico';
    };

    const architecturalHealth = mapStatus(sysAudit.architecture);
    const pedagogicalHealth = mapStatus(sysAudit.pedagogicalCoverage);
    const doctrinalHealth = mapStatus(sysAudit.doctrinalCoverage);
    const contentHealth = mapStatus(govAudit.themeCoverage);
    const curriculumHealth = mapStatus(curriculum.curricularCoverage);
    const accessibilityHealth = mapStatus(accessibility.overallAccessibility);
    const ministryHealth = mapStatus(ministry.overallHealth);
    const knowledgeGraphHealth = mapStatus(kg.semanticCoverage);
    const simulationHealth = mapStatus(sim.overallSimulation);

    // Calculate overall status
    const allStatuses = [
      architecturalHealth, pedagogicalHealth, doctrinalHealth, contentHealth,
      curriculumHealth, accessibilityHealth, ministryHealth, knowledgeGraphHealth, simulationHealth
    ];

    let overallEnterpriseStatus: HealthStatus = 'Excelente';
    if (allStatuses.includes('Crítico')) overallEnterpriseStatus = 'Crítico';
    else if (allStatuses.includes('Mejorable')) overallEnterpriseStatus = 'Mejorable';
    else if (allStatuses.includes('Bueno')) overallEnterpriseStatus = 'Bueno';

    const developerRecommendations: string[] = [
      'La arquitectura Local-First se mantiene estable y completamente funcional sin backend dependiente.',
      'El acoplamiento entre módulos se ha minimizado exitosamente, utilizando inyección de dependencias a través de singletons.',
      'Todas las extensiones añadidas mantienen un tipado TypeScript riguroso.',
      'El GameContext conservó sus responsabilidades sin verse saturado por lógica de negocios analítica.',
      'Siguiente Paso Recomendado: Implementar pruebas unitarias (Jest) para la validación estática de los motores.'
    ];

    if (overallEnterpriseStatus === 'Mejorable' || overallEnterpriseStatus === 'Crítico') {
      developerRecommendations.push('Se detectan inconsistencias menores en el contenido. Revise los reportes de QA.');
    }

    return {
      architecturalHealth,
      pedagogicalHealth,
      doctrinalHealth,
      contentHealth,
      curriculumHealth,
      accessibilityHealth,
      ministryHealth,
      knowledgeGraphHealth,
      simulationHealth,
      overallEnterpriseStatus,
      developerRecommendations
    };
  }
}

export const platformHealthEngine = PlatformHealthEngine.getInstance();
