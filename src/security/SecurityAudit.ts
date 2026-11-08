import { eventBus } from '@/services/eventBus';

export class SecurityAudit {
  public logError(message: string, context?: any): void {
    this.record('error', message, context);
  }

  public logWarning(message: string, context?: any): void {
    this.record('warning', message, context);
  }

  public logRisk(message: string, context?: any): void {
    this.record('risk', message, context);
  }

  public logIncident(message: string, context?: any): void {
    this.record('incident', message, context);
  }

  public logViolation(message: string, context?: any): void {
    this.record('violation', message, context);
  }

  private record(level: string, message: string, context?: any): void {
    // In a real scenario, this writes to a secure append-only log
    eventBus.emit('SECURITY_EVENTS', { level, message, context, timestamp: Date.now() });
  }
}

export const securityAudit = new SecurityAudit();
