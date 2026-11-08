const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'container');
const dirs = ['registrations', 'providers', 'factories', 'resolvers', 'lifecycle'];

dirs.forEach(d => fs.mkdirSync(path.join(srcDir, d), { recursive: true }));

const files = {
  'ServiceLifetime.ts': 'export enum ServiceLifetime { Singleton, Scoped, Transient }',
  
  'ServiceCollection.ts': `import { ServiceLifetime } from "./ServiceLifetime";
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
}`,

  'ServiceProvider.ts': `import { ServiceCollection } from "./ServiceCollection";
import { ServiceLifetime } from "./ServiceLifetime";
export class ServiceProvider {
  private singletons = new Map<string, any>();
  constructor(private collection: ServiceCollection) {}
  
  resolve<T>(key: string): T {
    const registration = this.collection.get(key);
    if (!registration) throw new Error(\`Service \${key} not found\`);
    
    if (registration.lifetime === ServiceLifetime.Singleton) {
      if (!this.singletons.has(key)) {
        this.singletons.set(key, registration.factory());
      }
      return this.singletons.get(key);
    }
    return registration.factory();
  }
}`,

  'DependencyContainer.ts': `import { ServiceCollection } from "./ServiceCollection";
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
  
  private registerDefaults() {}
}
export const dependencyContainer = DependencyContainer.getInstance();`,

  'DependencyResolver.ts': `import { dependencyContainer } from "./DependencyContainer";
export class DependencyResolver {
  static resolve<T>(key: string): T { return dependencyContainer.provider.resolve<T>(key); }
}`,

  'FactoryResolver.ts': `import { dependencyContainer } from "./DependencyContainer";
export class FactoryResolver {
  static resolveFactory<T>(key: string): () => T {
    return () => dependencyContainer.provider.resolve<T>(key);
  }
}`,

  'Bootstrapper.ts': `export class Bootstrapper {
  public initialize() {}
}`,

  'ApplicationBootstrap.ts': `import { Bootstrapper } from "./Bootstrapper";
export class ApplicationBootstrap {
  static initialize() {
    new Bootstrapper().initialize();
  }
}`
};

let indexContent = '';

for (const [file, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(srcDir, file), content);
  const name = path.basename(file, '.ts');
  indexContent += 'export * from "./' + name + '";\n';
}

fs.writeFileSync(path.join(srcDir, 'index.ts'), indexContent);
