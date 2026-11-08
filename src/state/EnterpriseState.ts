export interface StateSnapshotPayload {
  id: string;
  timestamp: number;
  source: string;
  version: string;
  type: string;
  summary: string;
  state: string; // Serialized state
  metadata: Record<string, any>;
}

export class EnterpriseState {
  private static instance: EnterpriseState;
  private history: StateSnapshotPayload[] = [];
  private maxHistory: number = 500;
  
  private snapshotsCreated: number = 0;
  private comparisonsMade: number = 0;
  private errorCount: number = 0;
  private totalCaptureTime: number = 0;

  private constructor() {}

  public static getInstance(): EnterpriseState {
    if (!EnterpriseState.instance) {
      EnterpriseState.instance = new EnterpriseState();
    }
    return EnterpriseState.instance;
  }

  public async captureSnapshot(source: string, type: string, summary: string, rawState: any, metadata: Record<string, any> = {}): Promise<void> {
    const start = Date.now();
    try {
      // Non-blocking approach using Promise
      Promise.resolve().then(() => {
        const snapshot: StateSnapshotPayload = {
          id: Math.random().toString(36).substring(2, 9),
          timestamp: Date.now(),
          source,
          version: '1.0',
          type,
          summary,
          state: JSON.stringify(rawState),
          metadata
        };
        
        this.history.push(snapshot);
        if (this.history.length > this.maxHistory) this.history.shift();
        
        this.snapshotsCreated++;
        this.totalCaptureTime += (Date.now() - start);
      });
    } catch (e) {
      this.errorCount++;
    }
  }

  public getCurrentState(): StateSnapshotPayload | undefined {
    return this.getLatestSnapshot();
  }

  public getStateHistory(): StateSnapshotPayload[] {
    return [...this.history].reverse();
  }

  public getSnapshot(id: string): StateSnapshotPayload | undefined {
    return this.history.find(s => s.id === id);
  }

  public getLatestSnapshot(): StateSnapshotPayload | undefined {
    return this.history.length > 0 ? this.history[this.history.length - 1] : undefined;
  }

  public compareSnapshots(aId: string, bId: string): any {
    this.comparisonsMade++;
    const a = this.getSnapshot(aId);
    const b = this.getSnapshot(bId);
    if (!a || !b) return { error: 'Snapshot not found' };
    return {
      differences: a.state === b.state ? 'None' : 'States differ',
      metadataA: a.metadata,
      metadataB: b.metadata
    };
  }

  public getMetrics() {
    return {
      snapshotsCreated: this.snapshotsCreated,
      snapshotsStored: this.history.length,
      comparisonsMade: this.comparisonsMade,
      errors: this.errorCount,
      averageCaptureTimeMs: this.snapshotsCreated > 0 ? this.totalCaptureTime / this.snapshotsCreated : 0
    };
  }
}