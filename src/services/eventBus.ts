export type EventCallback = (payload: any) => void;

export class EventBus {
  private static instance: EventBus;
  private listeners: Record<string, EventCallback[]> = {};

  private constructor() {}

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  public on(event: string, callback: EventCallback): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  public off(event: string, callback: EventCallback): void {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
  }

  public once(event: string, callback: EventCallback): void {
    const onceCallback = (payload: any) => {
      callback(payload);
      this.off(event, onceCallback);
    };
    this.on(event, onceCallback);
  }

  public emit(event: string, payload?: any): void {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(callback => {
      try {
        callback(payload);
      } catch (error) {
        console.error(`Error in event listener for ${event}:`, error);
      }
    });
  }
}

export const eventBus = EventBus.getInstance();
