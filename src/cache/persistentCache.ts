export class PersistentCache {
  public set(key: string, value: any, ttlMs: number): void {
    if (typeof window === 'undefined') return;
    try {
      const expiresAt = Date.now() + ttlMs;
      localStorage.setItem(`cache_${key}`, JSON.stringify({ value, expiresAt }));
    } catch (e) {
      console.warn('Failed to save to persistent cache', e);
    }
  }

  public get(key: string): any | null {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(`cache_${key}`);
      if (!stored) return null;
      const { value, expiresAt } = JSON.parse(stored);
      if (Date.now() > expiresAt) {
        this.delete(key);
        return null;
      }
      return value;
    } catch (e) {
      console.warn('Failed to read from persistent cache', e);
      return null;
    }
  }

  public delete(key: string): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`cache_${key}`);
    }
  }

  public clear(): void {
    if (typeof window !== 'undefined') {
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith('cache_')) {
          localStorage.removeItem(k);
        }
      });
    }
  }
}

export const persistentCache = new PersistentCache();
