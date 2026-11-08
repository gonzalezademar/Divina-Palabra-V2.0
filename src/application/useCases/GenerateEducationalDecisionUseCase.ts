import { EducationalApplicationService, EducationalDecisionContextInput, educationalApplicationService } from '../services/EducationalApplicationService';
import { EducationalDecisionDTO } from '../dto/EducationalDecisionDTO';

export interface GenerateEducationalDecisionRequest extends EducationalDecisionContextInput {}

export type GenerateEducationalDecisionResult = EducationalDecisionDTO;

export class GenerateEducationalDecisionUseCase {
  public constructor(
    private readonly educationalApplication: EducationalApplicationService = educationalApplicationService
  ) {}

  public execute(request: GenerateEducationalDecisionRequest): GenerateEducationalDecisionResult {
    return this.educationalApplication.generateEducationalDecisionDTO(request);
  }
}
