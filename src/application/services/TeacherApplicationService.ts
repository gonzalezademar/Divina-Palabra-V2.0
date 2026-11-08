import { ApplicationFacade, applicationFacade } from '../ApplicationFacade';
import { EducationalDecisionAuditDTO, EducationalDecisionAuditMetricsDTO } from '../dto/EducationalDecisionAuditDTO';
import { EducationalDecisionDTO } from '../dto/EducationalDecisionDTO';
import { EducationalDecisionContextInput } from './EducationalApplicationService';

export class TeacherApplicationService {
  public constructor(
    private readonly application: ApplicationFacade = applicationFacade
  ) {}

  public resolveEducationalDecision(context: EducationalDecisionContextInput): EducationalDecisionDTO {
    return this.application.generateEducationalDecision(context);
  }

  public getEducationalDecisionAudit(auditId: string): EducationalDecisionAuditDTO | undefined {
    return this.application.getEducationalDecisionAudit(auditId);
  }

  public getEducationalDecisionAudits(studentId?: string): EducationalDecisionAuditDTO[] {
    return this.application.getEducationalDecisionAudits(studentId);
  }

  public getEducationalDecisionAuditMetrics(): EducationalDecisionAuditMetricsDTO {
    return this.application.getEducationalDecisionAuditMetrics();
  }

  public getIntegrationStatus() {
    return { applicationFacadeAvailable: true };
  }
}

export const teacherApplicationService = new TeacherApplicationService();
