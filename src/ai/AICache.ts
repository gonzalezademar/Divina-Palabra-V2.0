import { AIRequest } from './AIRequest';
import { AIResponse } from './AIResponse';
import { cacheManager } from '@/cache/cacheManager';
import { eventBus } from '@/services/eventBus';

export class AICache {
  private generateKey(request: AIRequest): string {
    return `ai_cache_${request.provider || 'default'}_${btoa(encodeURIComponent(request.prompt))}`;
  }

  public async get(request: AIRequest): Promise<AIResponse | null> {
    const key = this.generateKey(request);
    const cached = await cacheManager.getOrSet<AIResponse | null>(key, () => null, 1000 * 60 * 60, true);
    if (cached) {
      eventBus.emit('AI_CACHE_HIT', { requestId: request.id });
      return cached;
    }
    eventBus.emit('AI_CACHE_MISS', { requestId: request.id });
    return null;
  }

  public set(request: AIRequest, response: AIResponse): void {
    const key = this.generateKey(request);
    // Directly using persistentCache underneath through CacheManager isn't easily doable synchronously
    // We can rely on a dummy set operation or direct use of MemoryCache. 
    // Since CacheManager only exposes getOrSet, we can't 'set' directly without getOrSet workaround.
    // For now, this is a readiness platform, we simulate setting:
    cacheManager.getOrSet(key, () => response, 1000 * 60 * 60, true);
  }
}

export const aiCache = new AICache();
