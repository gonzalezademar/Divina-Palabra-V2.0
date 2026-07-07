import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Cloud, CloudOff, RefreshCw, AlertCircle } from 'lucide-react';

export function SyncIndicator() {
  const { syncStatus, language } = useGame();

  const getStatusConfig = () => {
    switch (syncStatus) {
      case 'idle':
        return {
          icon: <Cloud className="w-4 h-4 text-emerald-400" />,
          label: language === 'es' ? 'Local' : 'Local',
          tooltip: language === 'es' ? 'Datos guardados localmente' : 'Data saved locally',
          animate: false
        };
      case 'syncing':
        return {
          icon: <RefreshCw className="w-4 h-4 text-amber-400" />,
          label: language === 'es' ? 'Guardando' : 'Saving',
          tooltip: language === 'es' ? 'Sincronizando con la nube...' : 'Syncing with cloud...',
          animate: true
        };
      case 'offline':
        return {
          icon: <CloudOff className="w-4 h-4 text-slate-500" />,
          label: language === 'es' ? 'Desconectado' : 'Offline',
          tooltip: language === 'es' ? 'Modo sin conexión activo' : 'Offline mode active',
          animate: false
        };
      case 'error':
        return {
          icon: <AlertCircle className="w-4 h-4 text-red-400" />,
          label: 'Error',
          tooltip: language === 'es' ? 'Error al guardar' : 'Failed to save',
          animate: false
        };
      default:
        return null;
    }
  };

  const config = getStatusConfig();
  if (!config) return null;

  return (
    <div 
      className="flex items-center gap-1.5 bg-slate-900/60 border border-slate-800 rounded-full px-2.5 py-1 backdrop-blur-sm"
      title={config.tooltip}
    >
      <div className={`${config.animate ? 'animate-spin' : ''}`}>
        {config.icon}
      </div>
      <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-300 hidden md:inline-block">
        {config.label}
      </span>
    </div>
  );
}
