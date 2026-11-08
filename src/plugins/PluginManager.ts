import { EducationalPlugin } from './EducationalPlugin';
import { eventBus } from '@/services/eventBus';
import { featureFlagEngine } from '@/services/featureFlagEngine';
import { DependencyContainer } from '@/container';

export class PluginManager {
  private static instance: PluginManager;
  private plugins: Map<string, EducationalPlugin> = new Map();
  private stats = {
    executed: 0,
    errors: 0
  };

  private container?: DependencyContainer;

  private constructor(container?: DependencyContainer) {
    this.container = container;
  }

  static getInstance(container?: DependencyContainer): PluginManager {
    if (!PluginManager.instance) {
      PluginManager.instance = new PluginManager(container);
    } else if (container && !PluginManager.instance.container) {
      PluginManager.instance.container = container;
    }
    return PluginManager.instance;
  }

  public register(plugin: EducationalPlugin): void {
    if (this.plugins.has(plugin.id)) {
      console.warn(`Plugin ${plugin.id} is already registered.`);
      return;
    }
    this.plugins.set(plugin.id, plugin);
  }

  public unregister(pluginId: string): void {
    this.plugins.delete(pluginId);
  }

  public getPlugins(): EducationalPlugin[] {
    return Array.from(this.plugins.values());
  }
  
  public getPlugin(id: string): EducationalPlugin | undefined {
    return this.plugins.get(id);
  }

  public activate(id: string): void {
    const p = this.plugins.get(id);
    if (p) p.estado = 'active';
  }

  public deactivate(id: string): void {
    const p = this.plugins.get(id);
    if (p) p.estado = 'inactive';
  }

  public getStatistics(): any {
    const all = Array.from(this.plugins.values());
    return {
      registered: all.length,
      active: all.filter(p => p.estado === 'active').length,
      disabled: all.filter(p => p.estado === 'inactive').length,
      executed: this.stats.executed,
      errors: this.stats.errors
    };
  }

  public getParticipatingPluginIds(): string[] {
    return Array.from(this.plugins.keys());
  }

  public executeHook<K extends keyof EducationalPlugin>(
    hook: K,
    ...args: any[]
  ): any[] {
    const results: any[] = [];
    if (!featureFlagEngine.isEnabled('ENABLE_PLUGINS')) return results;

    for (const plugin of this.plugins.values()) {
      try {
        const method = plugin[hook];
        if (typeof method === 'function' && plugin.estado === 'active') {
          const result = (method as Function).apply(plugin, args);
          if (result !== undefined) {
            results.push(result);
          }
          this.stats.executed++;
          eventBus.emit('PLUGIN_EXECUTED', { pluginId: plugin.id, hook });
        }
      } catch (e) {
        this.stats.errors++;
        console.error(`Error executing hook ${hook} on plugin ${plugin.id}:`, e);
        eventBus.emit('PLUGIN_FAILED', { pluginId: plugin.id, hook, error: e });
      }
    }
    return results;
  }

  public async executeAsyncHook<K extends keyof EducationalPlugin>(
    hook: K,
    ...args: any[]
  ): Promise<any[]> {
    const results: any[] = [];
    if (!featureFlagEngine.isEnabled('ENABLE_PLUGINS')) return results;

    for (const plugin of this.plugins.values()) {
      try {
        const method = plugin[hook];
        if (typeof method === 'function' && plugin.estado === 'active') {
          const result = await (method as Function).apply(plugin, args);
          if (result !== undefined) {
            results.push(result);
          }
          this.stats.executed++;
          eventBus.emit('PLUGIN_EXECUTED', { pluginId: plugin.id, hook });
        }
      } catch (e) {
        this.stats.errors++;
        console.error(`Error executing async hook ${hook} on plugin ${plugin.id}:`, e);
        eventBus.emit('PLUGIN_FAILED', { pluginId: plugin.id, hook, error: e });
      }
    }
    return results;
  }
}

export const pluginManager = PluginManager.getInstance();
