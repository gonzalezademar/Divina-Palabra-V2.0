import { memoryCache } from './memoryCache';
import { persistentCache } from './persistentCache';
import { eventBus } from '@/services/eventBus';

export class CacheManager {
  private static instance: CacheManager;
  private readonly defaultTTL = 1000 * 60 * 60; // 1 hour

  private constructor() {}

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  public async getOrSet<T>(
    key: string,
    fetcher: () => Promise<T> | T,
    ttlMs: number = this.defaultTTL,
    usePersistent: boolean = false
  ): Promise<T> {
    // 1. Try memory
    let val = memoryCache.get(key);
    if (val !== null) {
      eventBus.emit('CACHE_HIT', { key, layer: 'memory' });
      return val as T;
    }

    // 2. Try persistent if enabled
    if (usePersistent) {
      val = persistentCache.get(key);
      if (val !== null) {
        eventBus.emit('CACHE_HIT', { key, layer: 'persistent' });
        // Warmup memory
        memoryCache.set(key, val, ttlMs);
        return val as T;
      }
    }

    eventBus.emit('CACHE_MISS', { key });

    // 3. Fetch
    val = await fetcher();

    // 4. Save
    memoryCache.set(key, val, ttlMs);
    if (usePersistent) {
      persistentCache.set(key, val, ttlMs);
    }

    return val as T;
  }

  public invalidate(key: string): void {
    memoryCache.delete(key);
    persistentCache.delete(key);
    eventBus.emit('CACHE_INVALIDATED', { key });
  }

  public invalidateAll(): void {
    memoryCache.clear();
    persistentCache.clear();
    eventBus.emit('CACHE_INVALIDATED', { key: 'ALL' });
  }
}

export const cacheManager = CacheManager.getInstance();
