import { DiscoveredService } from '../composition/CompositionRoot';
import { EnterpriseState, StateSnapshotPayload } from '../state/EnterpriseState';
import { RuntimeManager } from '../runtime/RuntimeManager';

export class EnterpriseKernel {
  private static instance: EnterpriseKernel;
  private services: Map<string, DiscoveredService> = new Map();

  private constructor() {}

  public static getInstance(): EnterpriseKernel {
    if (!EnterpriseKernel.instance) {
      EnterpriseKernel.instance = new EnterpriseKernel();
    }
    return EnterpriseKernel.instance;
  }

  public registerService(service: DiscoveredService): void {
    this.services.set(service.name, service);
  }

  public getServices(): DiscoveredService[] {
    return Array.from(this.services.values());
  }

  public getService(name: string): DiscoveredService | undefined {
    return this.services.get(name);
  }

  public getServicesByCategory(category: string): DiscoveredService[] {
    return this.getServices().filter(s => s.category === category);
  }

  public getLatestStateSnapshot(): StateSnapshotPayload | undefined {
    return EnterpriseState.getInstance().getLatestSnapshot();
  }

  public getRuntime(): RuntimeManager {
    return RuntimeManager.getInstance();
  }

  public initialize() {}
}