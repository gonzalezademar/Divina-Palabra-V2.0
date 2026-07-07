/**
 * SyncService
 * 
 * Handles local-first architecture synchronization without tightly coupling to any backend.
 * Provides abstract layer for data diffing and merging.
 */

// We mock a future API endpoint. For now, it stays strictly local-first.
const CLOUD_SYNC_ENDPOINT = process.env.NEXT_PUBLIC_SYNC_ENDPOINT || null;

export class SyncService {
  private static instance: SyncService;
  
  private constructor() {}

  static getInstance(): SyncService {
    if (!SyncService.instance) {
      SyncService.instance = new SyncService();
    }
    return SyncService.instance;
  }

  /**
   * Compares local state against a hypothetical remote state.
   * Currently, it hashes or does a simple deep compare to avoid unnecessary syncs.
   */
  hasChanges(localData: any, lastSyncedData: any): boolean {
    if (!lastSyncedData) return true;
    return JSON.stringify(localData) !== JSON.stringify(lastSyncedData);
  }

  /**
   * Performs the synchronization silently.
   * If there's no endpoint configured, it safely returns success (Local First).
   */
  async sync(data: any): Promise<boolean> {
    if (!CLOUD_SYNC_ENDPOINT) {
      // Local First mode: simulate a quick success so the UI stays robust
      return new Promise((resolve) => setTimeout(() => resolve(true), 300));
    }

    try {
      const response = await fetch(CLOUD_SYNC_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          timestamp: Date.now(),
          payload: data
        })
      });
      return response.ok;
    } catch (error) {
      console.warn("SyncService: Sync failed", error);
      return false;
    }
  }
}

export const syncService = SyncService.getInstance();
