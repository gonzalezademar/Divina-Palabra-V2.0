import { ServiceLifetime } from "./ServiceLifetime";
export class ServiceCollection {
  private services = new Map<string, { lifetime: ServiceLifetime, factory: () => any }>();
  
  registerSingleton<T>(key: string, factory: () => T) { this.services.set(key, { lifetime: ServiceLifetime.Singleton, factory }); }
  registerScoped<T>(key: string, factory: () => T) { this.services.set(key, { lifetime: ServiceLifetime.Scoped, factory }); }
  registerTransient<T>(key: string, factory: () => T) { this.services.set(key, { lifetime: ServiceLifetime.Transient, factory }); }
  replace<T>(key: string, factory: () => T) { this.services.set(key, { lifetime: ServiceLifetime.Singleton, factory }); }
  remove(key: string) { this.services.delete(key); }
  has(key: string) { return this.services.has(key); }
  get(key: string) { return this.services.get(key); }
  clear() { this.services.clear(); }
}