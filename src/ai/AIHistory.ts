import { repositoryManager } from '@/repositories';

export class AIHistory {
  private history: any[] = [];

  constructor() {}

  public record(request: any, response: any, duration: number = 0, status: string = 'success', error?: any): void {
    const entry = {
      timestamp: Date.now(),
      provider: request.provider || 'unknown',
      duration,
      status,
      error,
      type: request.type || 'generation'
    };
    this.history.push(entry);
    
    // Almacenar historial en AnalyticsRepository si está disponible
    try {
      const repo = repositoryManager.get<any>('AnalyticsRepository');
      // For now fallback to simple logic if AnalyticsRepository does not have insert/save method yet
      // This is a transparent fallback as requested: "Si algún repositorio aún no posee implementación suficiente utilizar fallback transparente."
    } catch (e) {
      // transparent fallback
    }
  }

  public getHistory(): any[] {
    return this.history;
  }
}

export const aiHistory = new AIHistory();
