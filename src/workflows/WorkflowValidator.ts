import { Workflow } from './Workflow';

export class WorkflowValidator {
  public validate(workflow: Workflow): string[] {
    const errors: string[] = [];
    if (!workflow.id) errors.push('ID missing');
    if (!workflow.pasos || workflow.pasos.length === 0) errors.push('No steps defined');
    
    // Check for duplicate steps or cycles would go here
    return errors;
  }
}

export const workflowValidator = new WorkflowValidator();
