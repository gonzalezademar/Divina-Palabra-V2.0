import { defaultFeatureFlags, FeatureFlag } from '../config/defaultFeatureFlags';
import { eventBus } from './eventBus';

export class FeatureFlagEngine {
  private static instance: FeatureFlagEngine;
  private flags: Map<string, FeatureFlag> = new Map();

  private constructor() {
    this.load();
    this.registerDefaults();
  }

  static getInstance(): FeatureFlagEngine {
    if (!FeatureFlagEngine.instance) {
      FeatureFlagEngine.instance = new FeatureFlagEngine();
    }
    return FeatureFlagEngine.instance;
  }

  private registerDefaults() {
    defaultFeatureFlags.forEach(flag => {
      if (!this.flags.has(flag.id)) {
        this.flags.set(flag.id, { ...flag });
      }
    });
    this.persist();
  }

  public registerFlag(flag: FeatureFlag): void {
    this.flags.set(flag.id, flag);
    this.persist();
  }

  public enable(id: string): void {
    const flag = this.flags.get(id);
    if (flag && !flag.enabled) {
      flag.enabled = true;
      this.persist();
      eventBus.emit('FEATURE_ENABLED', { flagId: id });
    }
  }

  public disable(id: string): void {
    const flag = this.flags.get(id);
    if (flag && flag.enabled) {
      flag.enabled = false;
      this.persist();
      eventBus.emit('FEATURE_DISABLED', { flagId: id });
    }
  }

  public toggle(id: string): void {
    const flag = this.flags.get(id);
    if (flag) {
      if (flag.enabled) {
        this.disable(id);
      } else {
        this.enable(id);
      }
    }
  }

  public isEnabled(id: string): boolean {
    return this.flags.get(id)?.enabled ?? false;
  }

  public getAllFlags(): FeatureFlag[] {
    return Array.from(this.flags.values());
  }

  public reset(): void {
    this.flags.clear();
    this.registerDefaults();
    eventBus.emit('CONFIG_LOADED', { type: 'FeatureFlags' });
  }

  public persist(): void {
    if (typeof window !== 'undefined') {
      try {
        const data = Array.from(this.flags.entries());
        localStorage.setItem('divina_palabra_feature_flags', JSON.stringify(data));
        eventBus.emit('CONFIG_SAVED', { type: 'FeatureFlags' });
      } catch (e) {
        console.error('Failed to persist feature flags', e);
      }
    }
  }

  public load(): void {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('divina_palabra_feature_flags');
        if (stored) {
          const data = JSON.parse(stored) as [string, FeatureFlag][];
          this.flags = new Map(data);
          eventBus.emit('CONFIG_LOADED', { type: 'FeatureFlags' });
        }
      } catch (e) {
        console.error('Failed to load feature flags', e);
      }
    }
  }
}

export const featureFlagEngine = FeatureFlagEngine.getInstance();
