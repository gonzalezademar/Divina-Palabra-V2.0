import { AIProvider } from './AIProvider';
import { AIRequest } from './AIRequest';
import { AIResponse } from './AIResponse';
import { aiCache } from './AICache';
import { aiValidator } from './AIValidator';
import { aiQuotaManager } from './AIQuotaManager';
import { aiHistory } from './AIHistory';
import { eventBus } from '@/services/eventBus';
import { DependencyContainer } from '@/container';
import { pluginManager } from '@/plugins/PluginManager';

export class AIManager {
  private static instance: AIManager;
  private providers: Map<string, AIProvider> = new Map();
  private defaultProviderId: string | null = null;
  
  private stats = {
    requests: 0,
    responses: 0,
    errors: 0,
    lastUsed: 0
  };

  private container?: DependencyContainer;

  private constructor(container?: DependencyContainer) {
    this.container = container;
  }

  static getInstance(container?: DependencyContainer): AIManager {
    if (!AIManager.instance) {
      AIManager.instance = new AIManager(container);
    } else if (container && !AIManager.instance.container) {
      AIManager.instance.container = container;
    }
    return AIManager.instance;
  }

  public registerProvider(provider: AIProvider, isDefault = false): void {
    this.providers.set(provider.id, provider);
    if (isDefault || !this.defaultProviderId) {
      this.defaultProviderId = provider.id;
      eventBus.emit('AI_PROVIDER_CHANGED', { id: provider.id });
    }
  }

  public registerMockProviders(): void {
    const localDummy: AIProvider = {
      id: 'LocalDummyProvider',
      name: 'Local Dummy Provider',
      initialize: async () => {},
      isAvailable: async () => true,
      generate: async (req: AIRequest): Promise<AIResponse> => ({
        id: `resp_${Date.now()}`,
        requestId: req.id,
        provider: 'LocalDummyProvider',
        content: `Simulated LocalDummy response for: ${req.prompt}`,
        tokensUsed: 30,
        durationMs: 100,
        metadata: { provider: 'LocalDummyProvider', latency: 100 },
        timestamp: Date.now()
      }),
      stream: async (req: AIRequest, onChunk: (chunk: string) => void) => { onChunk('Simulated LocalDummy stream'); },
      embed: async (text: string) => [0.1, 0.2, 0.3],
      moderate: async (text: string) => true,
      healthCheck: async () => true,
      shutdown: async () => {}
    };

    this.registerProvider(localDummy, true);

    const mocks = ['OpenAI', 'Gemini', 'Claude'];
    mocks.forEach(name => {
      this.registerProvider({
        id: name,
        name,
        initialize: async () => {},
        isAvailable: async () => false,
        generate: async (req: AIRequest): Promise<AIResponse> => { throw new Error('Not connected in Local-First mode'); },
        stream: async (req: AIRequest, onChunk: (chunk: string) => void) => { throw new Error('Not connected in Local-First mode'); },
        embed: async (text: string) => { throw new Error('Not connected in Local-First mode'); },
        moderate: async (text: string) => { throw new Error('Not connected in Local-First mode'); },
        healthCheck: async () => false,
        shutdown: async () => {}
      } as unknown as AIProvider);
    });

    // Allow plugins to register AIProviders
    try {
      const pluginProviders = pluginManager.executeHook('onAIRegisterProviders' as any);
      pluginProviders.forEach(p => {
        if (p && p.id && p.generate) {
          this.registerProvider(p);
        }
      });
    } catch(e) {}
  }

  public removeProvider(id: string): void {
    this.providers.delete(id);
  }

  public getProvider(id: string): AIProvider | undefined {
    return this.providers.get(id);
  }

  public selectProvider(id: string): void {
    if (this.providers.has(id)) {
      this.defaultProviderId = id;
      eventBus.emit('AI_PROVIDER_CHANGED', { id });
    }
  }

  public getStatistics() {
    return {
      ...this.stats,
      activeProvider: this.defaultProviderId
    };
  }

  public async execute(request: AIRequest): Promise<AIResponse> {
    eventBus.emit('AI_REQUEST', { request });

    if (!aiValidator.validateRequest(request)) {
      throw new Error('AI Request Validation Failed');
    }

    if (!aiQuotaManager.canMakeRequest()) {
      throw new Error('AI Quota Exceeded');
    }

    const cached = await aiCache.get(request);
    if (cached) {
      eventBus.emit('PERFORMANCE_METRIC', { type: 'ai_cache_hit' });
      return cached;
    }

    const providerId = request.provider || this.defaultProviderId;
    if (!providerId) throw new Error('No AI Provider selected');

    const provider = this.providers.get(providerId);
    if (!provider) throw new Error('AI Provider not found');

    const startTime = Date.now();
    try {
      this.stats.requests++;
      this.stats.lastUsed = Date.now();
      aiQuotaManager.recordRequest();
      eventBus.emit('PERFORMANCE_METRIC', { type: 'ai_request_count' });
      
      const response = await provider.generate(request);
      
      if (!aiValidator.validateResponse(response)) {
        throw new Error('AI Response Validation Failed');
      }

      const duration = Date.now() - startTime;
      this.stats.responses++;
      eventBus.emit('PERFORMANCE_METRIC', { type: 'ai_latency', duration });
      eventBus.emit('AI_RESPONSE', { response });

      aiCache.set(request, response);
      aiHistory.record(request, response, duration, 'success');

      return response;
    } catch (e: any) {
      this.stats.errors++;
      aiHistory.record(request, null, Date.now() - startTime, 'failed', e.message);
      eventBus.emit('AI_ERROR', { error: e.message });
      eventBus.emit('PERFORMANCE_METRIC', { type: 'ai_failure_rate' });
      throw e;
    }
  }

  public async executeWithFallback(request: AIRequest): Promise<AIResponse> {
    try {
      return await this.execute(request);
    } catch (e) {
      // Fallback logic
      for (const [id, provider] of this.providers.entries()) {
        if (id !== (request.provider || this.defaultProviderId)) {
          request.provider = id;
          try {
            return await this.execute(request);
          } catch (fallbackError) {
            continue;
          }
        }
      }
      throw new Error('All AI providers failed');
    }
  }

  public async broadcast(request: AIRequest): Promise<AIResponse[]> {
    const promises = Array.from(this.providers.values()).map(provider => {
      const req = { ...request, provider: provider.id };
      return this.execute(req).catch(e => null);
    });
    
    const results = await Promise.all(promises);
    return results.filter(r => r !== null) as AIResponse[];
  }

  public async healthCheck(): Promise<boolean> {
    if (this.providers.size === 0) return false;
    for (const provider of this.providers.values()) {
      if (!(await provider.healthCheck())) return false;
    }
    return true;
  }
}

export const aiManager = AIManager.getInstance();
