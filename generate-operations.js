const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'operations');
const dirs = ['health', 'metrics', 'diagnostics', 'monitoring', 'alerts', 'reports', 'maintenance', 'profiling'];

dirs.forEach(d => fs.mkdirSync(path.join(srcDir, d), { recursive: true }));

const files = {
  // Health Checks
  'health/ApplicationHealth.ts': 'export type HealthStatus = "Healthy" | "Warning" | "Critical" | "Unknown"; export class ApplicationHealth { check(): HealthStatus { return "Healthy"; } }',
  'health/InfrastructureHealth.ts': 'import { HealthStatus } from "./ApplicationHealth"; export class InfrastructureHealth { check(): HealthStatus { return "Healthy"; } }',
  'health/RepositoryHealth.ts': 'import { HealthStatus } from "./ApplicationHealth"; export class RepositoryHealth { check(): HealthStatus { return "Healthy"; } }',
  'health/StorageHealth.ts': 'import { HealthStatus } from "./ApplicationHealth"; export class StorageHealth { check(): HealthStatus { return "Healthy"; } }',
  'health/CacheHealth.ts': 'import { HealthStatus } from "./ApplicationHealth"; export class CacheHealth { check(): HealthStatus { return "Healthy"; } }',
  'health/PluginHealth.ts': 'import { HealthStatus } from "./ApplicationHealth"; export class PluginHealth { check(): HealthStatus { return "Healthy"; } }',
  'health/WorkflowHealth.ts': 'import { HealthStatus } from "./ApplicationHealth"; export class WorkflowHealth { check(): HealthStatus { return "Healthy"; } }',
  'health/AIHealth.ts': 'import { HealthStatus } from "./ApplicationHealth"; export class AIHealth { check(): HealthStatus { return "Healthy"; } }',
  'health/ContentHealth.ts': 'import { HealthStatus } from "./ApplicationHealth"; export class ContentHealth { check(): HealthStatus { return "Healthy"; } }',
  'health/SecurityHealth.ts': 'import { HealthStatus } from "./ApplicationHealth"; export class SecurityHealth { check(): HealthStatus { return "Healthy"; } }',

  // Metrics
  'metrics/Metric.ts': 'export interface Metric { name: string; type: string; }',
  'metrics/Counter.ts': 'export class Counter { inc() {} dec() {} count = 0; }',
  'metrics/Gauge.ts': 'export class Gauge { set(val: number) {} value = 0; }',
  'metrics/Histogram.ts': 'export class Histogram { update(val: number) {} }',
  'metrics/Timer.ts': 'export class Timer { start() {} stop() {} }',
  'metrics/MetricRegistry.ts': 'export class MetricRegistry { private static instance = new MetricRegistry(); static getInstance() { return this.instance; } metrics = new Map(); register(name: string, metric: any) {} get(name: string) { return null; } }',

  // Monitoring
  'monitoring/ApplicationMonitor.ts': 'export class ApplicationMonitor {}',
  'monitoring/RepositoryMonitor.ts': 'export class RepositoryMonitor {}',
  'monitoring/PerformanceMonitorAdapter.ts': 'export class PerformanceMonitorAdapter {}',
  'monitoring/MemoryMonitor.ts': 'export class MemoryMonitor {}',
  'monitoring/CpuMonitor.ts': 'export class CpuMonitor {}',
  'monitoring/StorageMonitor.ts': 'export class StorageMonitor {}',
  'monitoring/WorkflowMonitor.ts': 'export class WorkflowMonitor {}',
  'monitoring/PluginMonitor.ts': 'export class PluginMonitor {}',

  // Diagnostics
  'diagnostics/DiagnosticCollector.ts': 'export class DiagnosticCollector {}',
  'diagnostics/DiagnosticSnapshot.ts': 'export class DiagnosticSnapshot {}',
  'diagnostics/DiagnosticExporter.ts': 'export class DiagnosticExporter {}',
  'diagnostics/DiagnosticAnalyzer.ts': 'export class DiagnosticAnalyzer {}',
  'diagnostics/DiagnosticHistory.ts': 'export class DiagnosticHistory {}',
  'diagnostics/DiagnosticScheduler.ts': 'export class DiagnosticScheduler {}',

  // Alerts
  'alerts/Alert.ts': 'export interface Alert { id: string; }',
  'alerts/AlertRule.ts': 'export class AlertRule {}',
  'alerts/AlertEngine.ts': 'export class AlertEngine {}',
  'alerts/AlertHistory.ts': 'export class AlertHistory {}',
  'alerts/AlertDispatcher.ts': 'export class AlertDispatcher {}',

  // Reports
  'reports/OperationalReport.ts': 'export class OperationalReport {}',
  'reports/HealthReport.ts': 'export class HealthReport {}',
  'reports/MetricsReport.ts': 'export class MetricsReport {}',
  'reports/DiagnosticReport.ts': 'export class DiagnosticReport {}',
  'reports/PerformanceSummary.ts': 'export class PerformanceSummary {}',

  // Maintenance
  'maintenance/MaintenanceTask.ts': 'export interface MaintenanceTask { run(): void; }',
  'maintenance/MaintenanceScheduler.ts': 'export class MaintenanceScheduler {}',
  'maintenance/MaintenanceRegistry.ts': 'export class MaintenanceRegistry {}',
  'maintenance/MaintenanceRunner.ts': 'export class MaintenanceRunner {}',

  // Profiling
  'profiling/ExecutionProfiler.ts': 'export class ExecutionProfiler {}',
  'profiling/MemoryProfilerAdapter.ts': 'export class MemoryProfilerAdapter {}',
  'profiling/RepositoryProfiler.ts': 'export class RepositoryProfiler {}',
  'profiling/WorkflowProfiler.ts': 'export class WorkflowProfiler {}',
  'profiling/AIProfiler.ts': 'export class AIProfiler {}',

  // Facade
  'OperationsFacade.ts': 'export class OperationsFacade { static initialize() {} }'
};

let indexContent = '';

for (const [file, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(srcDir, file), content);
  const name = path.basename(file, '.ts');
  if (file.includes('/')) {
    const dir = path.dirname(file);
    indexContent += 'export * from "./' + dir + '/' + name + '";\n';
  } else {
    indexContent += 'export * from "./' + name + '";\n';
  }
}

fs.writeFileSync(path.join(srcDir, 'index.ts'), indexContent);
