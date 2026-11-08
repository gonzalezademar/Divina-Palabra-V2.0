import { defaultPolicies, Policy } from '../config/defaultPolicies';
import { eventBus } from './eventBus';

export class PolicyEngine {
  private static instance: PolicyEngine;
  private policies: Map<string, Policy> = new Map();

  private constructor() {
    this.load();
    this.registerDefaults();
  }

  static getInstance(): PolicyEngine {
    if (!PolicyEngine.instance) {
      PolicyEngine.instance = new PolicyEngine();
    }
    return PolicyEngine.instance;
  }

  private registerDefaults() {
    defaultPolicies.forEach(policy => {
      if (!this.policies.has(policy.id)) {
        this.policies.set(policy.id, { ...policy });
      }
    });
    this.persist();
  }

  public getPolicy(id: string): Policy | undefined {
    return this.policies.get(id);
  }

  public getPolicyValue<T>(id: string, defaultValue: T): T {
    const policy = this.policies.get(id);
    return policy ? policy.valor as T : defaultValue;
  }

  public updatePolicy(id: string, valor: any): void {
    const policy = this.policies.get(id);
    if (policy && policy.editable) {
      policy.valor = valor;
      this.persist();
      eventBus.emit('POLICY_CHANGED', { policyId: id, newValue: valor });
    }
  }

  public getAllPolicies(): Policy[] {
    return Array.from(this.policies.values());
  }

  public reset(): void {
    this.policies.clear();
    this.registerDefaults();
    eventBus.emit('CONFIG_LOADED', { type: 'Policies' });
  }

  public persist(): void {
    if (typeof window !== 'undefined') {
      try {
        const data = Array.from(this.policies.entries());
        localStorage.setItem('divina_palabra_policies', JSON.stringify(data));
        eventBus.emit('CONFIG_SAVED', { type: 'Policies' });
      } catch (e) {
        console.error('Failed to persist policies', e);
      }
    }
  }

  public load(): void {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('divina_palabra_policies');
        if (stored) {
          const data = JSON.parse(stored) as [string, Policy][];
          this.policies = new Map(data);
          eventBus.emit('CONFIG_LOADED', { type: 'Policies' });
        }
      } catch (e) {
        console.error('Failed to load policies', e);
      }
    }
  }
}

export const policyEngine = PolicyEngine.getInstance();
