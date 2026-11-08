export interface DigitalTwin {
  timestamp: number;
  id: string;
  state: {
    gameContext: any;
    repositories: any;
    cache: any;
    plugins: any;
    events: any;
    content: any;
    analytics: any;
    educationalEngines: any;
    ai: any;
    security: any;
    configuration: any;
    synchronization: any;
    performance: any;
    telemetry: any;
  };
  metrics?: any;
  resources?: any;
  events?: any;
  health?: any;
}
