import { Workflow } from './Workflow';
import { eventBus } from '@/services/eventBus';

export class WorkflowRegistry {
  private workflows: Map<string, Workflow> = new Map();

  public register(workflow: Workflow): void {
    this.workflows.set(workflow.id, workflow);
    eventBus.emit('WORKFLOW_REGISTERED', { id: workflow.id });
    this.reportMetrics();
  }

  public unregister(id: string): void {
    this.workflows.delete(id);
    this.reportMetrics();
  }

  public get(id: string): Workflow | undefined {
    return this.workflows.get(id);
  }

  public getAll(): Workflow[] {
    return Array.from(this.workflows.values());
  }

  public list(): string[] {
    return Array.from(this.workflows.keys());
  }

  public activate(id: string): void {
    const wf = this.workflows.get(id);
    if (wf) wf.estado = 'pending';
  }

  public deactivate(id: string): void {
    const wf = this.workflows.get(id);
    if (wf) wf.estado = 'paused';
  }

  public getStatistics(): any {
    return {
      registered: this.workflows.size,
      active: Array.from(this.workflows.values()).filter(w => w.estado !== 'paused').length
    };
  }

  private reportMetrics(): void {
    eventBus.emit('PERFORMANCE_METRIC', { type: 'workflow_count', count: this.workflows.size });
  }
}

export const workflowRegistry = new WorkflowRegistry();
