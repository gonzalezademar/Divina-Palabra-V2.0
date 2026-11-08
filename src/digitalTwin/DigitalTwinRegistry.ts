import { eventBus } from '@/services/eventBus';

import { DigitalTwin } from './DigitalTwin';

export class DigitalTwinRegistry {
  private twins: Map<string, DigitalTwin> = new Map();
  private active: Set<string> = new Set();
  private stats = { registered: 0, removed: 0 };

  public register(name: string, twin: DigitalTwin): void {
    this.twins.set(name, twin);
    this.active.add(name);
    this.stats.registered++;
    this.reportMetrics();
  }

  public remove(name: string): void {
    if (this.twins.delete(name)) {
      this.active.delete(name);
      this.stats.removed++;
      this.reportMetrics();
    }
  }

  public get(name: string): DigitalTwin | undefined {
    return this.twins.get(name);
  }

  public list(): string[] {
    return Array.from(this.twins.keys());
  }

  public activate(name: string): void {
    if (this.twins.has(name)) this.active.add(name);
  }

  public deactivate(name: string): void {
    this.active.delete(name);
  }

  public getStatistics(): any {
    return {
      registered: this.twins.size,
      active: this.active.size,
      totalRegistered: this.stats.registered,
      totalRemoved: this.stats.removed
    };
  }

  private reportMetrics(): void {
    eventBus.emit('PERFORMANCE_METRIC', { type: 'digital_twin_count', count: this.twins.size });
  }
}

export const digitalTwinRegistry = new DigitalTwinRegistry();
