import { RuntimeConfiguration } from './RuntimeConfiguration';
import { EnterpriseEventBus } from '../eventing/EnterpriseEventBus';

export class RuntimeManager {
  private static instance: RuntimeManager;
  private config: RuntimeConfiguration;
  private snapshots: RuntimeConfiguration[] = [];
  public totalLoads: number = 0;
  public totalErrors: number = 0;
  public averageLoadTime: number = 0;
  public lastUpdate: number = Date.now();

  private constructor() {
    this.config = {
      defaults: {},
      overrides: {},
      fallbacks: {},
      temporal: {},
      session: {},
      immutable: {}
    };
  }

  public static getInstance(): RuntimeManager {
    if (!RuntimeManager.instance) {
      RuntimeManager.instance = new RuntimeManager();
    }
    return RuntimeManager.instance;
  }

  private emitEvent(action: string, details?: any) {
    EnterpriseEventBus.getInstance().publish({
      name: action,
      category: 'RUNTIME_EVENT',
      source: 'RuntimeManager',
      payload: { action, details },
      metadata: {}
    });
  }

  public load(newConfig: Partial<RuntimeConfiguration>): void {
    const start = Date.now();
    try {
      this.config = { ...this.config, ...newConfig };
      this.totalLoads++;
      this.lastUpdate = Date.now();
      this.emitEvent('LOAD', newConfig);
    } catch (error) {
      this.totalErrors++;
    } finally {
      const loadTime = Date.now() - start;
      this.averageLoadTime = this.totalLoads === 1 ? loadTime : (this.averageLoadTime + loadTime) / 2;
    }
  }

  public reload(): void {
    this.lastUpdate = Date.now();
    this.emitEvent('RELOAD');
  }

  public applyOverride(key: string, value: any): void {
    this.config.overrides[key] = value;
    this.lastUpdate = Date.now();
    this.emitEvent('APPLY_OVERRIDE', { key, value });
  }

  public reset(): void {
    this.config.overrides = {};
    this.config.temporal = {};
    this.config.session = {};
    this.lastUpdate = Date.now();
    this.emitEvent('RESET');
  }

  public snapshot(): void {
    this.snapshots.push(JSON.parse(JSON.stringify(this.config)));
    this.emitEvent('SNAPSHOT_CREATED');
  }

  public restore(index: number = this.snapshots.length - 1): void {
    if (index >= 0 && index < this.snapshots.length) {
      this.config = JSON.parse(JSON.stringify(this.snapshots[index]));
      this.lastUpdate = Date.now();
      this.emitEvent('RESTORE', { index });
    }
  }

  public getConfiguration(): RuntimeConfiguration {
    return this.config;
  }

  public setConfiguration(key: string, value: any, section: keyof RuntimeConfiguration = 'session'): void {
    if (section !== 'immutable') {
      this.config[section][key] = value;
      this.lastUpdate = Date.now();
      this.emitEvent('SET_CONFIGURATION', { key, section, value });
    }
  }
}