import { Repository } from './Repository';
import { getBibleData, BibleCatalog } from '@/data/bibleData';
import { cacheManager } from '@/cache/cacheManager';
import { eventBus } from '@/services/eventBus';

export class BibleRepository implements Repository<BibleCatalog> {
  private currentVersion = '1.0.0';
  private updateTime = Date.now();

  constructor(private lang: 'es' | 'en' = 'es', private bibleVersion: string = 'rvr1960') {}

  private async fetchCatalog(): Promise<BibleCatalog> {
    const key = `bible_catalog_${this.lang}_${this.bibleVersion}`;
    return cacheManager.getOrSet(key, () => getBibleData(this.lang, this.bibleVersion), 1000 * 60 * 60 * 24, true);
  }

  async getAll(): Promise<BibleCatalog[]> {
    const catalog = await this.fetchCatalog();
    return [catalog];
  }

  async getById(id: string): Promise<BibleCatalog | null> {
    const catalog = await this.fetchCatalog();
    return id === `${this.lang}_${this.bibleVersion}` ? catalog : null;
  }

  async find(predicate: (item: BibleCatalog) => boolean): Promise<BibleCatalog | null> {
    const catalog = await this.fetchCatalog();
    return predicate(catalog) ? catalog : null;
  }

  async filter(predicate: (item: BibleCatalog) => boolean): Promise<BibleCatalog[]> {
    const catalog = await this.fetchCatalog();
    return predicate(catalog) ? [catalog] : [];
  }

  async search(query: string): Promise<BibleCatalog[]> {
    return this.getAll();
  }

  async count(): Promise<number> {
    return 1;
  }

  async exists(id: string): Promise<boolean> {
    return id === `${this.lang}_${this.bibleVersion}`;
  }

  version(): string {
    return this.currentVersion;
  }

  lastUpdate(): number {
    return this.updateTime;
  }
}
