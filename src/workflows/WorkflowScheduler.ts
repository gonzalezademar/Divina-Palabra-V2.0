import { Workflow } from './Workflow';
import { eventBus } from '@/services/eventBus';

export class WorkflowScheduler {
  public scheduleImmediate(workflow: Workflow): void {
    // Logic for immediate
  }

  public scheduleDeferred(workflow: Workflow, delayMs: number): void {
    // Logic for deferred
  }

  public schedulePeriodic(workflow: Workflow, intervalMs: number): void {
    // Logic for periodic
  }
}

export const workflowScheduler = new WorkflowScheduler();
