import { ServiceCollection } from "./ServiceCollection";
import { ServiceProvider } from "./ServiceProvider";
export class DependencyContainer {
  public services = new ServiceCollection();
  public provider = new ServiceProvider(this.services);
  private static instance: DependencyContainer;
  
  private constructor() { this.registerDefaults(); }
  
  static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) DependencyContainer.instance = new DependencyContainer();
    return DependencyContainer.instance;
  }
  
  private registerDefaults() {
    this.services.registerSingleton('Logger', () => console);
  }
}
export const dependencyContainer = DependencyContainer.getInstance();