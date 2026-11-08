import { eventBus } from '@/services/eventBus';
import { DigitalTwin } from './DigitalTwin';

export class DigitalTwinSimulator {
  private simulations: any[] = [];

  public async simulate(target: 'game' | 'classroom' | 'plugin' | 'sync' | 'repository' | 'load' | 'users' | 'content', twin: DigitalTwin): Promise<any> {
    eventBus.emit('SIMULATION_STARTED', { target, timestamp: Date.now() });
    
    // Perform in-memory simulation logic without side effects
    const startTime = Date.now();
    await new Promise(resolve => setTimeout(resolve, 50)); // Mock wait
    
    const result = {
      target,
      success: true,
      timeMs: Date.now() - startTime
    };

    eventBus.emit('SIMULATION_FINISHED', result);
    eventBus.emit('PERFORMANCE_METRIC', { type: 'simulation_time', duration: result.timeMs });
    
    this.simulations.push(result);
    return result;
  }

  public getSimulations(): any[] {
    return this.simulations;
  }
}

export const digitalTwinSimulator = new DigitalTwinSimulator();
