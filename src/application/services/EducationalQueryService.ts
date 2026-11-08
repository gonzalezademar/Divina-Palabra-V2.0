import { EducationalDecisionAuditDTO, EducationalDecisionAuditMetricsDTO } from '../dto/EducationalDecisionAuditDTO';
import { EducationalApplicationService, educationalApplicationService } from './EducationalApplicationService';

export class EducationalQueryService {
  public constructor(
    private readonly educationalApplication: EducationalApplicationService = educationalApplicationService
  ) {}

  public getDecisionAudits(studentId?: string): EducationalDecisionAuditDTO[] {
    return this.educationalApplication.getDecisionAuditDTOs(studentId);
  }

  public getDecisionAudit(auditId: string): EducationalDecisionAuditDTO | undefined {
    return this.educationalApplication.getDecisionAuditDTO(auditId);
  }

  public getDecisionAuditMetrics(): EducationalDecisionAuditMetricsDTO {
    return this.educationalApplication.getDecisionAuditMetrics();
  }
}

export const educationalQueryService = new EducationalQueryService();
