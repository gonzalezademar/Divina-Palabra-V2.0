import { CapabilityInfo, CapabilityRegistry } from './CapabilityRegistry';

export class CapabilityManager {
  public static getActiveCapabilities(): CapabilityInfo[] {
    return CapabilityRegistry.getInstance().getCapabilities().filter(c => c.status === 'ACTIVE');
  }

  public static getDisabledCapabilities(): CapabilityInfo[] {
    return CapabilityRegistry.getInstance().getCapabilities().filter(c => c.status === 'DISABLED');
  }

  public static getCapabilitiesWithDependencies(): CapabilityInfo[] {
    return CapabilityRegistry.getInstance().getCapabilities().filter(c => c.dependencies.length > 0);
  }
}