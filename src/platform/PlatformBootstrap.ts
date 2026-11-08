import { ResourceManager } from '../resources/ResourceManager';
import { OperationsFacade } from '../operations/OperationsFacade';
import { contentRegistry } from '../content/ContentRegistry';
import { repositoryManager } from '../repositories/RepositoryManager';
import { BibleRepository } from '../repositories/BibleRepository';
import { ChallengeRepository } from '../repositories/ChallengeRepository';
import { AnalyticsRepository } from '../repositories/AnalyticsRepository';
import { ConfigurationRepository } from '../repositories/ConfigurationRepository';
import { workflowEngine } from '../workflows/WorkflowEngine';
import { registerBuiltinPlugins } from '../plugins/BuiltinPlugins';
import { zeroTrustEngine } from '../security/ZeroTrustEngine';
import { digitalTwinEngine } from '../digitalTwin/DigitalTwinEngine';
import { eventAutomationEngine } from '../services/eventAutomationEngine';

export interface ModuleInfo {
  name: string;
  version: string;
  status: 'PENDING' | 'LOADED' | 'FAILED';
  startTime: number;
  loadTime: number;
  dependencies: string[];
}

export class PlatformBootstrap {
  private static instance: PlatformBootstrap;
  private modules: Map<string, ModuleInfo> = new Map();
  private startupStartTime: number = 0;
  private startupTime: number = 0;
  private version: string = '1.0.0';

  private constructor() {}

  public static getInstance(): PlatformBootstrap {
    if (!PlatformBootstrap.instance) {
      PlatformBootstrap.instance = new PlatformBootstrap();
    }
    return PlatformBootstrap.instance;
  }

  public getModulesLoaded(): number {
    return Array.from(this.modules.values()).filter(m => m.status === 'LOADED').length;
  }

  public getModulesFailed(): number {
    return Array.from(this.modules.values()).filter(m => m.status === 'FAILED').length;
  }

  public getStartupTime(): number {
    return this.startupTime;
  }

  public getVersion(): string {
    return this.version;
  }

  public async boot(): Promise<void> {
    this.startupStartTime = Date.now();
    
    // Discover services automatically via CompositionRoot
    const CompositionRoot = (await import('../composition/CompositionRoot')).CompositionRoot;
    const services = CompositionRoot.discoverServices();
    
    const EnterpriseKernel = (await import('../core/EnterpriseKernel')).EnterpriseKernel;
    const kernel = EnterpriseKernel.getInstance();

    const CapabilityRegistry = (await import('../capabilities/CapabilityRegistry')).CapabilityRegistry;
    const capabilityRegistry = CapabilityRegistry.getInstance();

    for (const service of services) {
      this.modules.set(service.name, {
        name: service.name,
        version: service.version,
        status: 'PENDING',
        startTime: Date.now(),
        loadTime: 0,
        dependencies: service.dependencies
      });

      try {
        const start = Date.now();
        kernel.registerService(service);
        
        capabilityRegistry.register({
          id: service.name + '-cap',
          name: service.name,
          category: service.category,
          description: `Auto-registered capability for ${service.name}`,
          version: service.version,
          status: service.status,
          provider: 'PlatformBootstrap',
          dependencies: service.dependencies,
          registrationDate: Date.now(),
          metadata: {}
        });

        const mod = this.modules.get(service.name)!;
        mod.status = service.status === 'ACTIVE' ? 'LOADED' : 'FAILED';
        mod.loadTime = Date.now() - start;
      } catch (error) {
        const mod = this.modules.get(service.name)!;
        mod.status = 'FAILED';
        mod.loadTime = Date.now() - mod.startTime;
      }
    }
    
    // Register Enterprise Resources (Phase 56)
    const resourcesToRegister = [
      'Repositories', 'Cache', 'LocalStorage', 'SessionStorage', 'Memory Storage',
      'AI Cache', 'Content Registry', 'Plugin Registry', 'Workflow Registry',
      'Runtime Configuration', 'Event Bus', 'Enterprise State', 'Digital Twin',
      'Telemetry', 'Diagnostic Dashboard'
    ];

    const resourceManager = ResourceManager.getInstance();

    for (const resName of resourcesToRegister) {
      resourceManager.register({
        id: resName.toLowerCase().replace(/\s+/g, '-'),
        nombre: resName,
        tipo: 'SYSTEM_RESOURCE',
        estado: 'ACTIVE',
        proveedor: 'PlatformBootstrap',
        usoActual: 0,
        fechaCreacion: Date.now(),
        fechaUltimoAcceso: Date.now(),
        dependencias: [],
        metadata: {}
      });
    }
    
    // Register OperationsFacade (Phase 58)
    OperationsFacade.initialize();

    // Register AIManager (Phase 59)
    const { aiManager } = await import('../ai/AIManager');
    aiManager.registerMockProviders();

    // Register Plugins (Phase 63)
    registerBuiltinPlugins();

    // Initialize Content Registry (Phase 60)
    await contentRegistry.initialize();

    // Initialize Workflow Engine (Phase 62)
    workflowEngine.initialize();

    // Initialize Digital Twin Engine (Phase 65)
    digitalTwinEngine.initialize();

    // Initialize Event Automation Engine (Phase 66)
    // Instantiating triggers registerDefaultRules
    eventAutomationEngine.getRules();
    
    this.startupTime = Date.now() - this.startupStartTime;
  }
}
