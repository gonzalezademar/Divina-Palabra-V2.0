export class MetricRegistry {
  private static instance = new MetricRegistry();
  private metrics: Map<string, any> = new Map();

  private constructor() {
    this.metrics.set('startupTime', 0);
    this.metrics.set('memoryUsage', 0);
    this.metrics.set('moduleCount', 0);
    this.metrics.set('serviceCount', 0);
    this.metrics.set('resourceCount', 0);
    this.metrics.set('capabilityCount', 0);
    this.metrics.set('publishedEvents', 0);
    this.metrics.set('generatedSnapshots', 0);
    this.metrics.set('activeAlerts', 0);
    this.metrics.set('errorCount', 0);
  }

  public static getInstance(): MetricRegistry {
    return this.instance;
  }

  public register(name: string, metric: any): void {
    this.metrics.set(name, metric);
  }

  public get(name: string): any {
    return this.metrics.get(name);
  }

  public getAll(): Record<string, any> {
    const obj: Record<string, any> = {};
    this.metrics.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }
}