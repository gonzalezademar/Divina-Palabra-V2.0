import { Bootstrapper } from './Bootstrapper';

export class ApplicationBootstrap {
  private static isInitialized = false;

  static initialize() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    new Bootstrapper().initialize();
  }
}