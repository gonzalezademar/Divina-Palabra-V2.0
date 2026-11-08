import { DigitalTwin } from './DigitalTwin';

export class DigitalTwinAudit {
  private logs: any[] = [];

  public log(type: 'change' | 'snapshot' | 'simulation' | 'error', data: any): void {
    this.logs.push({ timestamp: Date.now(), type, data });
  }

  public getLogs(): any[] {
    return this.logs;
  }

  public generateFullAudit(twin: DigitalTwin): any {
    return {
      timestamp: Date.now(),
      twinId: twin.id,
      issues: this.logs.filter(l => l.type === 'error'),
      warnings: [],
      recommendations: []
    };
  }
}

export const digitalTwinAudit = new DigitalTwinAudit();
