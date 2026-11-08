import { Repository } from './Repository';
import { cacheManager } from '@/cache/cacheManager';
import { eventBus } from '@/services/eventBus';
import { DependencyContainer } from '@/container';
import { pluginManager } from '@/plugins/PluginManager';

export class RepositoryManager {
  private static instance: RepositoryManager;
  private repositories: Map<string, Repository<any>> = new Map();
  private isInitialized = false;

  private container?: DependencyContainer;

  private constructor(container?: DependencyContainer) {
    this.container = container;
  }

  static getInstance(container?: DependencyContainer): RepositoryManager {
    if (!RepositoryManager.instance) {
      RepositoryManager.instance = new RepositoryManager(container);
    } else if (container && !RepositoryManager.instance.container) {
      RepositoryManager.instance.container = container;
    }
    return RepositoryManager.instance;
  }

  public initialize(): void {
    if (this.isInitialized) return;
    this.isInitialized = true;
    console.log('RepositoryManager initialized.');
  }

  public register(name: string, repository: Repository<any>): void {
    if (this.repositories.has(name)) {
      console.warn(`Repository ${name} already registered`);
      return;
    }
    this.repositories.set(name, repository);
    eventBus.emit('REPOSITORY_REGISTERED', { name });
    
    // Allow plugins to register their own repositories when a core one is registered
    try {
      const pluginRepos = pluginManager.executeHook('onRepositoryRegister' as any, name);
      pluginRepos.forEach(repoMap => {
        if (repoMap && typeof repoMap === 'object') {
          Object.entries(repoMap).forEach(([k, v]) => {
            if (!this.repositories.has(k)) {
              this.repositories.set(k, v as Repository<any>);
            }
          });
        }
      });
    } catch(e) {}
  }

  public get<T>(name: string): Repository<T> {
    const repo = this.repositories.get(name);
    if (!repo) {
      throw new Error(`Repository ${name} not found.`);
    }
    return repo as Repository<T>;
  }

  public reload(name: string): void {
    // In a real scenario, this might trigger a re-fetch or clear cache for that repo
    eventBus.emit('REPOSITORY_RELOAD', { repositoryName: name });
    cacheManager.invalidateAll(); // Simplification
  }

  public clearCache(): void {
    cacheManager.invalidateAll();
  }

  public getStatistics(): any {
    return {
      registered: this.repositories.size,
      active: this.repositories.size,
      operations: 150, // mock
      errors: 0,
      cacheHits: 85, // mock
      cacheMiss: 15 // mock
    };
  }

  public healthCheck(): boolean {
    return this.isInitialized && this.repositories.size > 0;
  }
}

export const repositoryManager = RepositoryManager.getInstance();
