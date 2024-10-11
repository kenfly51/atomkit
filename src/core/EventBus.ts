import { IEventBus } from '@core/types/IEventBus';

export class EventBus implements IEventBus {
  private listeners: Record<string, Function[]> = {};

  subscribe(eventType: string, callback: Function) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(callback);
  }

  unsubscribe(eventType: string, callback: Function) {
    this.listeners[eventType] = this.listeners[eventType]?.filter(cb => cb !== callback) || [];
  }

  publish(eventType: string, data?: any) {
    if (this.listeners[eventType]) {
      this.listeners[eventType].forEach(callback => callback(data));
    }
  }
}