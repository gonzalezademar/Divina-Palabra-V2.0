export interface CapabilityInfo {
  id: string;
  name: string;
  category: string;
  description: string;
  version: string;
  status: 'ACTIVE' | 'DISABLED' | 'ERROR';
  provider: string;
  dependencies: string[];
  registrationDate: number;
  metadata: Record<string, any>;
}

export class CapabilityRegistry {
  private static instance: CapabilityRegistry;
  private capabilities: Map<string, CapabilityInfo> = new Map();
  private errorCount: number = 0;
  private totalDiscoveryTime: number = 0;
  private discoveryCount: number = 0;

  private constructor() {}

  public static getInstance(): CapabilityRegistry {
    if (!CapabilityRegistry.instance) {
      CapabilityRegistry.instance = new CapabilityRegistry();
    }
    return CapabilityRegistry.instance;
  }

  public register(capability: CapabilityInfo): void {
    const start = Date.now();
    try {
      this.capabilities.set(capability.name, capability);
      this.discoveryCount++;
    } catch (e) {
      this.errorCount++;
    } finally {
      this.totalDiscoveryTime += (Date.now() - start);
    }
  }

  public unregister(name: string): void {
    this.capabilities.delete(name);
  }

  public exists(name: string): boolean {
    return this.capabilities.has(name);
  }

  public getCapability(name: string): CapabilityInfo | undefined {
    return this.capabilities.get(name);
  }

  public getCapabilities(): CapabilityInfo[] {
    return Array.from(this.capabilities.values());
  }

  public getCapabilitiesByCategory(category: string): CapabilityInfo[] {
    return this.getCapabilities().filter(c => c.category === category);
  }

  public getMetrics() {
    return {
      registered: this.capabilities.size,
      active: this.getCapabilities().filter(c => c.status === 'ACTIVE').length,
      disabled: this.getCapabilities().filter(c => c.status === 'DISABLED').length,
      errors: this.errorCount,
      averageDiscoveryTimeMs: this.discoveryCount > 0 ? this.totalDiscoveryTime / this.discoveryCount : 0
    };
  }
}