import { eventAutomationEngine } from '../services/eventAutomationEngine';

export interface EnterpriseEventPayload {
  id: string;
  name: string;
  category: string;
  timestamp: number;
  source: string;
  payload: any;
  version: string;
  metadata: Record<string, any>;
}

export class EnterpriseEventBus {
  private static instance: EnterpriseEventBus;
  private history: EnterpriseEventPayload[] = [];
  private publishedCount: number = 0;
  private processedCount: number = 0;
  private errorCount: number = 0;
  private totalPublishTime: number = 0;

  private constructor() {}

  public static getInstance(): EnterpriseEventBus {
    if (!EnterpriseEventBus.instance) {
      EnterpriseEventBus.instance = new EnterpriseEventBus();
    }
    return EnterpriseEventBus.instance;
  }

  public publish(event: Omit<EnterpriseEventPayload, 'id' | 'timestamp' | 'version'>): void {
    const start = Date.now();
    try {
      const fullEvent: EnterpriseEventPayload = {
        ...event,
        id: Math.random().toString(36).substring(2, 9),
        timestamp: Date.now(),
        version: '1.0'
      };
      
      this.history.push(fullEvent);
      if (this.history.length > 1000) this.history.shift();
      
      this.publishedCount++;
      this.processedCount++;
      
      // Phase 66: Automations
      eventAutomationEngine.evaluateEvent(fullEvent.name, fullEvent.payload).catch(console.error);
    } catch (error) {
      this.errorCount++;
    } finally {
      this.totalPublishTime += (Date.now() - start);
    }
  }

  public getRecentEvents(): EnterpriseEventPayload[] {
    return [...this.history].reverse();
  }

  public getEventsByCategory(category: string): EnterpriseEventPayload[] {
    return this.history.filter(e => e.category === category);
  }

  public getEventsBySource(source: string): EnterpriseEventPayload[] {
    return this.history.filter(e => e.source === source);
  }

  public getLastEvent(): EnterpriseEventPayload | undefined {
    return this.history.length > 0 ? this.history[this.history.length - 1] : undefined;
  }

  public getMetrics() {
    return {
      published: this.publishedCount,
      processed: this.processedCount,
      errors: this.errorCount,
      averagePublishTimeMs: this.publishedCount > 0 ? this.totalPublishTime / this.publishedCount : 0
    };
  }
}