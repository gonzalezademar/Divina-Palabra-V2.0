import { useEffect, useRef, useCallback } from 'react';
import { useGame } from '@/contexts/GameContext';
import { syncService } from '@/services/syncService';

export function useCloudSync() {
  const { teams, gameMode, userSettings, setSyncStatus } = useGame();
  const lastSyncedData = useRef<any>(null);
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Checks network status and updates global context
  const checkNetwork = useCallback(() => {
    if (typeof navigator !== 'undefined') {
      if (!navigator.onLine) {
        setSyncStatus('offline');
      } else {
        setSyncStatus('idle');
      }
    }
  }, [setSyncStatus]);

  // Setup network listeners
  useEffect(() => {
    checkNetwork();
    if (typeof window !== 'undefined') {
      window.addEventListener('online', checkNetwork);
      window.addEventListener('offline', checkNetwork);
      
      return () => {
        window.removeEventListener('online', checkNetwork);
        window.removeEventListener('offline', checkNetwork);
      };
    }
  }, [checkNetwork]);

  // Debounced synchronization payload
  useEffect(() => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return; // Stop if offline
    }

    const payload = {
      teams,
      gameMode,
      userSettings
    };

    if (syncService.hasChanges(payload, lastSyncedData.current)) {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
      
      syncTimeoutRef.current = setTimeout(async () => {
        setSyncStatus('syncing');
        
        const success = await syncService.sync(payload);
        
        if (success) {
          lastSyncedData.current = payload;
          setSyncStatus('idle');
        } else {
          setSyncStatus('error');
        }
      }, 2000); // 2s debounce
    }

    return () => {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    };
  }, [teams, gameMode, userSettings, setSyncStatus]);
}
