import { DigitalTwin } from './DigitalTwin';
import { digitalTwinSnapshot } from './DigitalTwinSnapshot';
import { digitalTwinRegistry } from './DigitalTwinRegistry';
import { digitalTwinHealth } from './DigitalTwinHealth';
import { digitalTwinPredictor } from './DigitalTwinPredictor';
import { digitalTwinSimulator } from './DigitalTwinSimulator';
import { digitalTwinAudit } from './DigitalTwinAudit';
import { eventBus } from '@/services/eventBus';
import { DependencyContainer } from '@/container';

export class DigitalTwinEngine {
  private static instance: DigitalTwinEngine;
  private isInitialized = false;

  private container?: DependencyContainer;

  private constructor(container?: DependencyContainer) {
    this.container = container;
  }

  static getInstance(container?: DependencyContainer): DigitalTwinEngine {
    if (!DigitalTwinEngine.instance) {
      DigitalTwinEngine.instance = new DigitalTwinEngine(container);
    } else if (container && !DigitalTwinEngine.instance.container) {
      DigitalTwinEngine.instance.container = container;
    }
    return DigitalTwinEngine.instance;
  }

  public initialize(): void {
    if (this.isInitialized) return;
    this.isInitialized = true;
    
    // Register base subsystem twins
    const subsystems = ['Platform', 'AI', 'Content', 'Repository', 'Workflow', 'EventBus', 'Runtime', 'Operations', 'Security'];
    subsystems.forEach(name => {
      digitalTwinRegistry.register(name, this.createEmptyTwin(name));
    });

    eventBus.emit('DIGITAL_TWIN_INITIALIZED', { timestamp: Date.now() });
    console.log('DigitalTwinEngine initialized.');
  }

  private createEmptyTwin(id: string): DigitalTwin {
    return {
      timestamp: Date.now(),
      id,
      state: {
        gameContext: {},
        repositories: {},
        cache: {},
        plugins: {},
        events: {},
        content: {},
        analytics: {},
        educationalEngines: {},
        ai: {},
        security: {},
        configuration: {},
        synchronization: {},
        performance: {},
        telemetry: {}
      }
    };
  }

  public captureSnapshot(id?: string): DigitalTwin {
    // Captures snapshot for a specific twin or creates a general one
    const twinId = id || `dt_${Date.now()}`;
    let twin = digitalTwinRegistry.get(twinId);
    
    if (!twin) {
      twin = this.createEmptyTwin(twinId);
    } else {
      twin.timestamp = Date.now();
    }
    
    // Auto-capture these properties
    twin.metrics = { capturedAt: twin.timestamp };
    twin.resources = { count: 0 }; // Placeholder for actual resource manager query
    twin.events = { lastEvent: 'SNAPSHOT_CAPTURED' };
    twin.health = { score: 100 }; // Placeholder for actual health query

    digitalTwinSnapshot.create(twin);
    return twin;
  }

  public restoreSnapshot(id: string): boolean {
    const twin = digitalTwinSnapshot.get(id);
    if (!twin) return false;
    eventBus.emit('SNAPSHOT_RESTORED', { id });
    return true;
  }

  public compareSnapshots(id1: string, id2: string): any {
    return digitalTwinSnapshot.compare(id1, id2);
  }

  public generateHealthReport(metrics: any): any {
    const report = digitalTwinHealth.generateHealthReport(metrics);
    eventBus.emit('HEALTH_REPORT_CREATED', report);
    return report;
  }

  public generatePrediction(): any {
    const twin = this.captureSnapshot();
    return digitalTwinPredictor.generatePrediction(twin);
  }

  public async simulate(target: 'game' | 'classroom' | 'plugin' | 'sync' | 'repository' | 'load' | 'users' | 'content'): Promise<any> {
    const twin = this.captureSnapshot();
    return await digitalTwinSimulator.simulate(target, twin);
  }

  public validate(): boolean {
    return true;
  }

  public healthCheck(): boolean {
    return this.isInitialized;
  }
}

export const digitalTwinEngine = DigitalTwinEngine.getInstance();
