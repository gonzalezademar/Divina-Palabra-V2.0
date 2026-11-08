import { MetricRegistry } from '../metrics/MetricRegistry';
import { AlertEngine } from '../alerts/AlertEngine';

export class DiagnosticCollector {
  public static buildSnapshot(): any {
    return {
      timestamp: Date.now(),
      metrics: MetricRegistry.getInstance().getAll(),
      alerts: AlertEngine.getInstance().getActiveAlerts(),
      memory: typeof process !== 'undefined' && process.memoryUsage ? process.memoryUsage() : { heapUsed: 0, heapTotal: 0 }
    };
  }
}