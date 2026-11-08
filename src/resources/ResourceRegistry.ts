import { EnterpriseResource } from './EnterpriseResource';

export class ResourceRegistry {
  private static instance: ResourceRegistry;
  private resources: Map<string, EnterpriseResource> = new Map();

  private constructor() {}

  public static getInstance(): ResourceRegistry {
    if (!ResourceRegistry.instance) {
      ResourceRegistry.instance = new ResourceRegistry();
    }
    return ResourceRegistry.instance;
  }

  public add(resource: EnterpriseResource): void {
    this.resources.set(resource.id, resource);
  }

  public remove(id: string): void {
    this.resources.delete(id);
  }

  public has(id: string): boolean {
    return this.resources.has(id);
  }

  public get(id: string): EnterpriseResource | undefined {
    return this.resources.get(id);
  }

  public getAll(): EnterpriseResource[] {
    return Array.from(this.resources.values());
  }
}