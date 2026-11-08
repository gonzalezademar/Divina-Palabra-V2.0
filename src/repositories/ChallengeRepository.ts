import { Repository } from './Repository';
import { getBibleData } from '@/data/bibleData';
import { cacheManager } from '@/cache/cacheManager';

export class ChallengeRepository implements Repository<any> {
  private currentVersion = '1.0.0';
  private updateTime = Date.now();

  private async fetchAllChallenges(): Promise<any[]> {
    return cacheManager.getOrSet('all_challenges', () => {
      const data = getBibleData('es', 'rvr1960');
      return [
        ...data.findWordLevel1,
        ...data.findWordLevel2,
        ...data.completePhraseChallenges,
        ...data.guessPhraseChallenges
      ];
    }, 1000 * 60 * 60 * 24, true);
  }

  async getAll(): Promise<any[]> {
    return this.fetchAllChallenges();
  }

  async getById(id: string): Promise<any | null> {
    const challenges = await this.fetchAllChallenges();
    return challenges.find((c: any) => c.id === id || c.reference === id) || null;
  }

  async find(predicate: (item: any) => boolean): Promise<any | null> {
    const challenges = await this.fetchAllChallenges();
    return challenges.find(predicate) || null;
  }

  async filter(predicate: (item: any) => boolean): Promise<any[]> {
    const challenges = await this.fetchAllChallenges();
    return challenges.filter(predicate);
  }

  async search(query: string): Promise<any[]> {
    const q = query.toLowerCase();
    const challenges = await this.fetchAllChallenges();
    return challenges.filter((c: any) => 
      (c.phrase && c.phrase.toLowerCase().includes(q)) || 
      (c.reference && c.reference.toLowerCase().includes(q))
    );
  }

  async count(): Promise<number> {
    const challenges = await this.fetchAllChallenges();
    return challenges.length;
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
