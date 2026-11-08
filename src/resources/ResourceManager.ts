import { EnterpriseResource } from './EnterpriseResource';
import { ResourceRegistry } from './ResourceRegistry';

export class ResourceManager {
  private static instance: ResourceManager;
  private registry: ResourceRegistry;

  private constructor() {
    this.registry = ResourceRegistry.getInstance();
  }

  public static getInstance(): ResourceManager {
    if (!ResourceManager.instance) {
      ResourceManager.instance = new ResourceManager();
    }
    return ResourceManager.instance;
  }

  public register(resource: EnterpriseResource): void {
    this.registry.add(resource);
  }

  public unregister(id: string): void {
    this.registry.remove(id);
  }

  public exists(id: string): boolean {
    return this.registry.has(id);
  }

  public acquire(id: string): EnterpriseResource | undefined {
    const resource = this.registry.get(id);
    if (resource && (resource.estado === 'ACTIVE' || resource.estado === 'RELEASED')) {
      resource.estado = 'IN_USE';
      resource.usoActual += 1;
      resource.fechaUltimoAcceso = Date.now();
      return resource;
    }
    return undefined;
  }

  public release(id: string): void {
    const resource = this.registry.get(id);
    if (resource) {
      resource.estado = 'RELEASED';
      resource.usoActual = Math.max(0, resource.usoActual - 1);
      resource.fechaUltimoAcceso = Date.now();
    }
  }

  public getResource(id: string): EnterpriseResource | undefined {
    return this.registry.get(id);
  }

  public getResources(): EnterpriseResource[] {
    return this.registry.getAll();
  }

  public getResourcesByType(tipo: string): EnterpriseResource[] {
    return this.registry.getAll().filter(r => r.tipo === tipo);
  }
}