import { Alert } from './Alert';

export class AlertEngine {
  private static instance = new AlertEngine();
  private alerts: Alert[] = [];

  private constructor() {}

  public static getInstance(): AlertEngine {
    return this.instance;
  }

  public evaluate(condition: boolean, type: string, message: string): void {
    if (condition) {
      this.alerts.push({
        id: `alert-${Date.now()}-${Math.random()}`,
        type,
        message,
        timestamp: Date.now()
      });
    }
  }

  public getActiveAlerts(): Alert[] {
    return this.alerts;
  }

  public clearAlerts(): void {
    this.alerts = [];
  }
}