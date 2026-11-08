import { WorkflowContext } from './WorkflowContext';

export interface WorkflowStep {
  id: string;
  name: string;
  type?: string;
  action: (context: WorkflowContext) => Promise<any>;
  rollback?: (context: WorkflowContext, error: any) => Promise<void>;
  timeoutMs?: number;
  retries?: number;
}
