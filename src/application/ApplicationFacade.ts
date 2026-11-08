import { EducationalDecisionAuditDTO, EducationalDecisionAuditMetricsDTO } from './dto/EducationalDecisionAuditDTO';
import { EducationalDecisionDTO } from './dto/EducationalDecisionDTO';
import { EducationalApplicationService, EducationalDecisionContextInput, educationalApplicationService } from './services/EducationalApplicationService';
import { EducationalQueryService, educationalQueryService } from './services/EducationalQueryService';

export class ApplicationFacade {
  public constructor(
    private readonly educationalApplication: EducationalApplicationService = educationalApplicationService,
    private readonly educationalQueries: EducationalQueryService = educationalQueryService
  ) {}

  public generateEducationalDecision(context: EducationalDecisionContextInput): EducationalDecisionDTO {
    return this.educationalApplication.generateEducationalDecisionDTO(context);
  }

  public getEducationalDecisionAudit(auditId: string): EducationalDecisionAuditDTO | undefined {
    return this.educationalQueries.getDecisionAudit(auditId);
  }

  public getEducationalDecisionAudits(studentId?: string): EducationalDecisionAuditDTO[] {
    return this.educationalQueries.getDecisionAudits(studentId);
  }

  public getEducationalDecisionAuditMetrics(): EducationalDecisionAuditMetricsDTO {
    return this.educationalQueries.getDecisionAuditMetrics();
  }

  public getDecisionIntelligenceMetrics() {
    return this.educationalApplication.getDecisionIntelligenceMetrics();
  }

  public getEducationalApplicationMetrics() {
    return this.educationalApplication.getMetrics();
  }
}

export const applicationFacade = new ApplicationFacade();
