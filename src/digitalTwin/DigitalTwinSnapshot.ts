import { DigitalTwin } from './DigitalTwin';
import { eventBus } from '@/services/eventBus';

export class DigitalTwinSnapshot {
  private snapshots: Map<string, DigitalTwin> = new Map();

  public create(twin: DigitalTwin): void {
    this.snapshots.set(twin.id, twin);
    eventBus.emit('SNAPSHOT_CREATED', { id: twin.id });
    eventBus.emit('PERFORMANCE_METRIC', { type: 'snapshots_count', count: this.snapshots.size });
  }

  public get(id: string): DigitalTwin | undefined {
    return this.snapshots.get(id);
  }

  public getAll(): DigitalTwin[] {
    return Array.from(this.snapshots.values());
  }

  public compare(id1: string, id2: string): any {
    const s1 = this.get(id1);
    const s2 = this.get(id2);
    if (!s1 || !s2) return null;

    // Deep compare logic here
    return {
      diff: true,
      timeDiffMs: s2.timestamp - s1.timestamp
    };
  }
}

export const digitalTwinSnapshot = new DigitalTwinSnapshot();
