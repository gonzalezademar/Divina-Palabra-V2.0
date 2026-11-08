import { ServiceCollection } from "./ServiceCollection";
import { ServiceLifetime } from "./ServiceLifetime";
export class ServiceProvider {
  private singletons = new Map<string, any>();
  constructor(private collection: ServiceCollection) {}
  
  resolve<T>(key: string): T {
    const registration = this.collection.get(key);
    if (!registration) throw new Error(`Service ${key} not found`);
    
    if (registration.lifetime === ServiceLifetime.Singleton) {
      if (!this.singletons.has(key)) {
        this.singletons.set(key, registration.factory());
      }
      return this.singletons.get(key);
    }
    return registration.factory();
  }
}