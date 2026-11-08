import { Workflow } from './Workflow';
import { WorkflowContext } from './WorkflowContext';
import { workflowRegistry } from './WorkflowRegistry';
import { workflowExecutor } from './WorkflowExecutor';
import { workflowHistory } from './WorkflowHistory';
import { workflowValidator } from './WorkflowValidator';
import { workflowMetrics } from './WorkflowMetrics';
import { eventBus } from '@/services/eventBus';
import { DependencyContainer } from '@/container';
import { pluginManager } from '@/plugins/PluginManager';
import { aiManager } from '@/ai/AIManager';
import { workflowBootstrap } from './WorkflowBootstrap';

export class WorkflowEngine {
  private static instance: WorkflowEngine;
  private isInitialized = false;
  private activeExecutions: Set<string> = new Set();

  private container?: DependencyContainer;

  private constructor(container?: DependencyContainer) {
    this.container = container;
  }

  static getInstance(container?: DependencyContainer): WorkflowEngine {
    if (!WorkflowEngine.instance) {
      WorkflowEngine.instance = new WorkflowEngine(container);
    } else if (container && !WorkflowEngine.instance.container) {
      WorkflowEngine.instance.container = container;
    }
    return WorkflowEngine.instance;
  }

  public initialize(): void {
    if (this.isInitialized) return;
    workflowBootstrap.register(workflow => this.register(workflow));
    this.isInitialized = true;
    console.log('WorkflowEngine initialized');
  }

  public register(workflow: Workflow): void {
    const errors = workflowValidator.validate(workflow);
    if (errors.length > 0) {
      console.error(`Workflow ${workflow.id} invalid:`, errors);
      return;
    }
    workflowRegistry.register(workflow);
  }

  public unregister(id: string): void {
    workflowRegistry.unregister(id);
  }

  public async execute(id: string, initialData: any = {}): Promise<any> {
    this.initialize();
    const workflow = workflowRegistry.get(id);
    if (!workflow) throw new Error('Workflow not found');
    if (!workflow.condiciones(initialData)) throw new Error('Workflow conditions not met');

    const executionId = `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const context: WorkflowContext = {
      workflowId: workflow.id,
      executionId,
      state: {},
      data: initialData,
      timestamp: Date.now()
    };

    this.activeExecutions.add(executionId);
    eventBus.emit('WORKFLOW_STARTED', { id: workflow.id, executionId });
    workflowHistory.recordStart(workflow, executionId);
    workflow.estado = 'running';

    let completedSteps = [];

    try {
      for (const step of workflow.pasos) {
        if (!this.activeExecutions.has(executionId)) {
          throw new Error('CANCELLED');
        }
        
        // Let plugins intercept/execute the step
        const hookResults = pluginManager.executeHook('onWorkflowStep' as any, step, context);
        if (hookResults.length > 0) {
          context.state[step.id] = hookResults[0];
        } else if (step.type === 'ai') {
          // AI execution via AIManager
          try {
            const aiResult = await aiManager.execute({
              id: `workflow_ai_${step.id}_${Date.now()}`,
              prompt: `Workflow step: ${step.id}`,
              timestamp: Date.now(),
              parameters: { type: 'workflow' }
            });
            context.state[step.id] = aiResult.content;
          } catch(e: any) {
            context.state[step.id] = `AI Error: ${e.message}`;
          }
        } else {
          const result = await workflowExecutor.executeStep(step, context);
          context.state[step.id] = result;
        }
        
        completedSteps.push(step);
      }

      workflow.estado = 'completed';
      workflowMetrics.successes++;
      workflowMetrics.executionTimes.push(Date.now() - context.timestamp);
      eventBus.emit('WORKFLOW_COMPLETED', { id: workflow.id, executionId, result: context.state });
      workflowHistory.record(workflow, executionId, 'completed');
      
      this.activeExecutions.delete(executionId);
      return context.state;
    } catch (e: any) {
      workflow.estado = e.message === 'CANCELLED' ? 'cancelled' : 'failed';
      this.activeExecutions.delete(executionId);
      
      if (e.message === 'CANCELLED') {
        workflowMetrics.cancellations++;
        eventBus.emit('WORKFLOW_CANCELLED', { id: workflow.id, executionId });
        workflowHistory.record(workflow, executionId, 'cancelled');
      } else {
        workflowMetrics.errors++;
        eventBus.emit('WORKFLOW_FAILED', { id: workflow.id, executionId, error: e.message });
        workflowHistory.record(workflow, executionId, 'failed', e);

        if (workflow.rollback) {
          // Reverse order
          for (const step of completedSteps.reverse()) {
            await workflowExecutor.rollbackStep(step, context, e);
          }
        }
      }
      throw e;
    }
  }

  public executeAsync(id: string, initialData: any = {}): void {
    this.execute(id, initialData).catch(e => console.error(e));
  }

  public cancel(executionId: string): void {
    this.activeExecutions.delete(executionId);
  }

  public pause(): void { }
  public resume(): void { }
  public retry(): void { }
  public rollback(): void { }
  public validate(): boolean { return true; }
  
  public healthCheck(): boolean {
    return this.isInitialized;
  }
}

export const workflowEngine = WorkflowEngine.getInstance();
