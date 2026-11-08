import { WorkflowContext } from './WorkflowContext';
import { Workflow } from './Workflow';

export class WorkflowHistory {
  private history: { workflowId: string, executionId: string, startTime: number, endTime?: number, duration?: number, status: string, error?: any }[] = [];

  public recordStart(workflow: Workflow, executionId: string): void {
    this.history.push({
      workflowId: workflow.id,
      executionId,
      startTime: Date.now(),
      status: 'running'
    });
    this.save();
  }

  public record(workflow: Workflow, executionId: string, status: string, error?: any): void {
    const entry = this.history.find(h => h.executionId === executionId);
    if (entry) {
      entry.endTime = Date.now();
      entry.duration = entry.endTime - entry.startTime;
      entry.status = status;
      entry.error = error;
    } else {
      // In case recordStart wasn't called
      this.history.push({
        workflowId: workflow.id,
        executionId,
        startTime: Date.now(),
        endTime: Date.now(),
        duration: 0,
        status,
        error
      });
    }
    this.save();
  }

  private save(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('divina_palabra_workflows_history', JSON.stringify(this.history));
      } catch(e) {}
    }
  }
}

export const workflowHistory = new WorkflowHistory();
