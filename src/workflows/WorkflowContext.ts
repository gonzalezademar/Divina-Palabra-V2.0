export interface WorkflowContext {
  workflowId: string;
  executionId: string;
  state: Record<string, any>;
  data: any;
  timestamp: number;
}
