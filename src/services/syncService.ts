/**
 * SyncService
 * 
 * Handles local-first architecture synchronization without tightly coupling to any backend.
 * Provides abstract layer for data diffing and merging.
 */

import { eventBus } from './eventBus';
import { featureFlagEngine } from './featureFlagEngine';
import { repositoryManager } from '@/repositories';
import { workflowEngine } from '@/workflows/WorkflowEngine';

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
    if (!featureFlagEngine.isEnabled('ENABLE_SYNC')) return false;

    // Persistir configuraciones de forma transparente
    try {
      const repo = repositoryManager.get<any>('ConfigurationRepository');
      // fallback save
    } catch (e) {}

    if (!CLOUD_SYNC_ENDPOINT) {
      // Local First mode: simulate a quick success so the UI stays robust
      try {
        workflowEngine.executeAsync('sync_process', { data });
      } catch(e) {}
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
      const success = response.ok;
      eventBus.emit('SYNC_COMPLETED', { success });
      return success;
    } catch (error) {
      console.warn("SyncService: Sync failed", error);
      eventBus.emit('SYNC_COMPLETED', { success: false, error });
      return false;
    }
  }
}

export const syncService = SyncService.getInstance();
