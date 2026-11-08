import { WorkflowContext } from './WorkflowContext';
import { Workflow } from './Workflow';
import { WorkflowStep } from './WorkflowStep';
import { eventBus } from '@/services/eventBus';
import { workflowMetrics } from './WorkflowMetrics';

export class WorkflowExecutor {
  public async executeStep(step: WorkflowStep, context: WorkflowContext): Promise<any> {
    const maxRetries = step.retries ?? 0;
    let attempts = 0;

    while (attempts <= maxRetries) {
      try {
        const timeoutPromise = step.timeoutMs 
          ? new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), step.timeoutMs)) 
          : null;
        
        const executionPromise = step.action(context);

        if (timeoutPromise) {
          return await Promise.race([executionPromise, timeoutPromise]);
        } else {
          return await executionPromise;
        }
      } catch (e: any) {
        attempts++;
        if (e.message === 'TIMEOUT') {
          eventBus.emit('WORKFLOW_TIMEOUT', { stepId: step.id, workflowId: context.workflowId });
        }
        if (attempts <= maxRetries) {
          workflowMetrics.retries++;
          eventBus.emit('WORKFLOW_RETRY', { stepId: step.id, workflowId: context.workflowId, attempt: attempts });
        } else {
          throw e;
        }
      }
    }
  }

  public async rollbackStep(step: WorkflowStep, context: WorkflowContext, error: any): Promise<void> {
    if (step.rollback) {
      try {
        await step.rollback(context, error);
        workflowMetrics.rollbacks++;
        eventBus.emit('WORKFLOW_ROLLBACK', { stepId: step.id, workflowId: context.workflowId });
      } catch (e) {
        console.error(`Rollback failed for step ${step.id}`, e);
      }
    }
  }
}

export const workflowExecutor = new WorkflowExecutor();
