import { eventBus } from './eventBus';
import { featureFlagEngine } from './featureFlagEngine';

export interface PerformanceMetrics {
  renders: number;
  loadTime: number;
  memoryUsed: number;
  operationDurations: Record<string, number[]>;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics = {
    renders: 0,
    loadTime: 0,
    memoryUsed: 0,
    operationDurations: {}
  };
  private operationStarts: Record<string, number> = {};

  private constructor() {
    if (typeof window !== 'undefined' && window.performance) {
      window.addEventListener('load', () => {
        const timing = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (timing) {
          this.metrics.loadTime = timing.loadEventEnd - timing.startTime;
          eventBus.emit('PERFORMANCE_METRIC', { type: 'loadTime', duration: this.metrics.loadTime });
        }
      });
    }
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  public logRender() {
    this.metrics.renders++;
  }

  public startOperation(operationName: string) {
    if (!featureFlagEngine.isEnabled('ENABLE_PERFORMANCE_MONITOR')) return;
    this.operationStarts[operationName] = performance.now();
  }

  public endOperation(operationName: string) {
    if (!featureFlagEngine.isEnabled('ENABLE_PERFORMANCE_MONITOR')) return;
    const startTime = this.operationStarts[operationName];
    if (startTime) {
      const duration = performance.now() - startTime;
      if (!this.metrics.operationDurations[operationName]) {
        this.metrics.operationDurations[operationName] = [];
      }
      this.metrics.operationDurations[operationName].push(duration);
      delete this.operationStarts[operationName];
      eventBus.emit('PERFORMANCE_METRIC', { type: 'operation', name: operationName, duration });
    }
  }

  public getMetrics(): PerformanceMetrics {
    if (typeof window !== 'undefined' && (performance as any).memory) {
      this.metrics.memoryUsed = (performance as any).memory.usedJSHeapSize;
    }
    return this.metrics;
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();
