export interface DiscoveredService {
  name: string;
  category: string;
  version: string;
  status: 'ACTIVE' | 'DISABLED' | 'ERROR';
  dependencies: string[];
  origin: string;
  loadDate: number;
  initializationTime: number;
}

export class CompositionRoot {
  public static discoverServices(): DiscoveredService[] {
    // In-memory mock discovery
    const categories = [
      'Container', 'Application', 'Infrastructure', 'Services', 'Plugins',
      'Repositories', 'Domain', 'Operations', 'Runtime', 'Core',
      'Capabilities', 'Resources', 'State', 'Eventing', 'AI', 'Security',
      'Meta', 'Evolution', 'Documentation', 'DigitalTwin', 'Integration',
      'Content', 'Workflow'
    ];
    
    return categories.map(cat => ({
      name: `${cat}Facade`,
      category: cat,
      version: '1.0.0',
      status: 'ACTIVE',
      dependencies: [],
      origin: `src/${cat.toLowerCase()}`,
      loadDate: Date.now(),
      initializationTime: Math.random() * 50
    }));
  }
}