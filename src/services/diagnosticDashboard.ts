import { platformHealthEngine } from './platformHealthEngine';
import { systemAuditEngine } from './systemAuditEngine';
import { telemetryEngine } from './telemetryEngine';
import { performanceMonitor } from './performanceMonitor';
import { featureFlagEngine } from './featureFlagEngine';
import { getBibleData } from '@/data/bibleData';

export class DiagnosticDashboard {
  private static instance: DiagnosticDashboard;

  private constructor() {}

  static getInstance(): DiagnosticDashboard {
    if (!DiagnosticDashboard.instance) {
      DiagnosticDashboard.instance = new DiagnosticDashboard();
    }
    return DiagnosticDashboard.instance;
  }

  public generateConsolidatedReport(lang: 'es' | 'en' = 'es', version: string = 'rvr1960') {
    if (!featureFlagEngine.isEnabled('ENABLE_DIAGNOSTICS')) return null;
    const data = getBibleData(lang, version);
    const platformHealth = platformHealthEngine.auditPlatform(data, []);
    const systemAudit = systemAuditEngine.generateFullSystemAudit(data);
    const telemetry = telemetryEngine.getReport();
    const performance = performanceMonitor.getMetrics();

    return {
      timestamp: new Date().toISOString(),
      platformHealth,
      systemAudit,
      telemetry,
      performance
    };
  }
}

export const diagnosticDashboard = DiagnosticDashboard.getInstance();
