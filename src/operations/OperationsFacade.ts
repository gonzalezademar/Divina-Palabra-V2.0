import { PlatformHealth } from '../platform/PlatformHealth';
import { EnterpriseKernel } from '../core/EnterpriseKernel';
import { EnterpriseEventBus } from '../eventing/EnterpriseEventBus';
import { EnterpriseState } from '../state/EnterpriseState';
import { RuntimeManager } from '../runtime/RuntimeManager';
import { ResourceManager } from '../resources/ResourceManager';
import { CapabilityRegistry } from '../capabilities/CapabilityRegistry';
import { DiagnosticCollector } from './diagnostics/DiagnosticCollector';
import { AlertEngine } from './alerts/AlertEngine';
import { MetricRegistry } from './metrics/MetricRegistry';
import { aiManager } from '../ai/AIManager';
import { aiHistory } from '../ai/AIHistory';
import { aiQuotaManager } from '../ai/AIQuotaManager';

export class OperationsFacade {
  public static initialize(): void {}

  public static getPlatformStatus(): string {
    return PlatformHealth.getHealthReport().status;
  }

  public static getHealth(): any {
    return PlatformHealth.getHealthReport();
  }

  public static getMetrics(): any {
    return MetricRegistry.getInstance().getAll();
  }

  public static getDiagnostics(): any {
    return DiagnosticCollector.buildSnapshot();
  }

  public static getAlerts(): any[] {
    return AlertEngine.getInstance().getActiveAlerts();
  }

  public static getPerformance(): any {
    const health = PlatformHealth.getHealthReport();
    return {
      averagePublishTimeMs: health.averagePublishTimeMs,
      averageCaptureTimeMs: health.averageCaptureTimeMs,
      averageCapabilityDiscoveryTimeMs: health.averageCapabilityDiscoveryTimeMs,
      averageResourceAcquisitionTimeMs: health.averageResourceAcquisitionTimeMs,
      runtimeAverageLoadTimeMs: health.runtimeAverageLoadTimeMs
    };
  }

  public static getResources(): any[] {
    return ResourceManager.getInstance().getResources();
  }

  public static getCapabilities(): any[] {
    return CapabilityRegistry.getInstance().getCapabilities();
  }

  public static getAIStatus(): any {
    return {
      activeProvider: aiManager.getStatistics().activeProvider,
      quotaStatus: aiQuotaManager.getStatus()
    };
  }

  public static getAIStatistics(): any {
    return aiManager.getStatistics();
  }

  public static getAIHistory(): any[] {
    return aiHistory.getHistory();
  }

  public static generateOperationalReport(): any {
    return {
      status: this.getPlatformStatus(),
      health: this.getHealth(),
      metrics: this.getMetrics(),
      diagnostics: this.getDiagnostics(),
      alerts: this.getAlerts(),
      performance: this.getPerformance()
    };
  }
}