import { Repository } from './Repository';
import { policyEngine } from '@/services/policyEngine';
import { featureFlagEngine } from '@/services/featureFlagEngine';
import { Policy } from '@/config/defaultPolicies';
import { FeatureFlag } from '@/config/defaultFeatureFlags';

export type ConfigurationItem = { id: string; type: 'policy' | 'flag'; data: Policy | FeatureFlag };

export class ConfigurationRepository implements Repository<ConfigurationItem> {
  private currentVersion = '1.0.0';
  private updateTime = Date.now();

  private getAllConfigs(): ConfigurationItem[] {
    const policies = policyEngine.getAllPolicies().map(p => ({ id: p.id, type: 'policy' as const, data: p }));
    const flags = featureFlagEngine.getAllFlags().map(f => ({ id: f.id, type: 'flag' as const, data: f }));
    return [...policies, ...flags];
  }

  async getAll(): Promise<ConfigurationItem[]> {
    return this.getAllConfigs();
  }

  async getById(id: string): Promise<ConfigurationItem | null> {
    return this.getAllConfigs().find(c => c.id === id) || null;
  }

  async find(predicate: (item: ConfigurationItem) => boolean): Promise<ConfigurationItem | null> {
    return this.getAllConfigs().find(predicate) || null;
  }

  async filter(predicate: (item: ConfigurationItem) => boolean): Promise<ConfigurationItem[]> {
    return this.getAllConfigs().filter(predicate);
  }

  async search(query: string): Promise<ConfigurationItem[]> {
    const q = query.toLowerCase();
    return this.getAllConfigs().filter(c => c.id.toLowerCase().includes(q));
  }

  async count(): Promise<number> {
    return this.getAllConfigs().length;
  }

  async exists(id: string): Promise<boolean> {
    const item = await this.getById(id);
    return !!item;
  }

  version(): string {
    return this.currentVersion;
  }

  lastUpdate(): number {
    return this.updateTime;
  }
}
