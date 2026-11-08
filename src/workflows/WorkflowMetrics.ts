export class WorkflowMetrics {
  public executionTimes: number[] = [];
  public errors = 0;
  public successes = 0;
  public cancellations = 0;
  public retries = 0;
  public rollbacks = 0;

  public getStats() {
    const executed = this.successes + this.errors + this.cancellations;
    const avgTime = this.executionTimes.length > 0 
      ? this.executionTimes.reduce((a,b) => a+b, 0) / this.executionTimes.length 
      : 0;
      
    return {
      executed,
      successes: this.successes,
      errors: this.errors,
      cancellations: this.cancellations,
      avgTime
    };
  }
}

export const workflowMetrics = new WorkflowMetrics();
