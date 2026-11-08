import { eventBus } from './eventBus';
import { featureFlagEngine } from './featureFlagEngine';

export interface TelemetryData {
  errors: any[];
  performance: any[];
  loadTimes: number[];
  matchDurations: number[];
  sessionDurations: number[];
  engineUsage: Record<string, number>;
}

import { MetricRegistry } from '@/operations/metrics/MetricRegistry';

export class TelemetryEngine {
  private static instance: TelemetryEngine;
  private data: TelemetryData = {
    errors: [],
    performance: [],
    loadTimes: [],
    matchDurations: [],
    sessionDurations: [],
    engineUsage: {}
  };
  private sessionStartTime: number;

  private constructor() {
    this.sessionStartTime = Date.now();
    this.loadFromStorage();
    this.setupListeners();
    
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => this.onSessionEnd());
    }
  }

  static getInstance(): TelemetryEngine {
    if (!TelemetryEngine.instance) {
      TelemetryEngine.instance = new TelemetryEngine();
    }
    return TelemetryEngine.instance;
  }

  private loadFromStorage() {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem('divina_palabra_telemetry');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.data = { ...this.data, ...parsed };
      }
    } catch (e) {
      console.error('Failed to load telemetry', e);
    }
  }

  private saveToStorage() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('divina_palabra_telemetry', JSON.stringify(this.data));
    } catch (e) {
      console.error('Failed to save telemetry', e);
    }
  }

  private setupListeners() {
    eventBus.on('ERROR_OCCURRED', (payload) => this.logError(payload));
    eventBus.on('PERFORMANCE_METRIC', (payload) => this.logPerformance(payload));
    eventBus.on('GAME_FINISHED', (payload) => this.logMatchDuration(payload?.duration || 0));
    eventBus.on('ENGINE_USED', (payload) => this.logEngineUsage(payload?.engineName));
    
    // Config events
    eventBus.on('FEATURE_ENABLED', (payload) => this.logConfigEvent('FEATURE_ENABLED', payload));
    eventBus.on('FEATURE_DISABLED', (payload) => this.logConfigEvent('FEATURE_DISABLED', payload));
    eventBus.on('POLICY_CHANGED', (payload) => this.logConfigEvent('POLICY_CHANGED', payload));
    eventBus.on('CONFIG_LOADED', (payload) => this.logConfigEvent('CONFIG_LOADED', payload));
    eventBus.on('CONFIG_SAVED', (payload) => this.logConfigEvent('CONFIG_SAVED', payload));

    // Data layer events
    eventBus.on('CACHE_HIT', (payload) => this.logPerformance({ type: 'cache_hit', ...payload }));
    eventBus.on('CACHE_MISS', (payload) => this.logPerformance({ type: 'cache_miss', ...payload }));
    eventBus.on('CACHE_INVALIDATED', (payload) => this.logPerformance({ type: 'cache_invalidated', ...payload }));
    eventBus.on('REPOSITORY_RELOAD', (payload) => this.logPerformance({ type: 'repository_reload', ...payload }));
    eventBus.on('DATA_VERSION_CHANGED', (payload) => this.logPerformance({ type: 'data_version_changed', ...payload }));

    // Content events
    eventBus.on('CONTENT_REGISTERED', (payload) => this.logPerformance({ type: 'content_registered', ...payload }));
    eventBus.on('CONTENT_UPDATED', (payload) => this.logPerformance({ type: 'content_updated', ...payload }));
    eventBus.on('CONTENT_REMOVED', (payload) => this.logPerformance({ type: 'content_removed', ...payload }));
    eventBus.on('CONTENT_VALIDATED', (payload) => this.logPerformance({ type: 'content_validated', ...payload }));
    eventBus.on('CONTENT_MIGRATED', (payload) => this.logPerformance({ type: 'content_migrated', ...payload }));
    eventBus.on('PACKAGE_LOADED', (payload) => this.logPerformance({ type: 'package_loaded', ...payload }));
    eventBus.on('PACKAGE_FAILED', (payload) => this.logPerformance({ type: 'package_failed', ...payload }));

    // AI events
    eventBus.on('AI_REQUEST', (payload) => this.logPerformance({ type: 'ai_request', ...payload }));
    eventBus.on('AI_RESPONSE', (payload) => this.logPerformance({ type: 'ai_response', ...payload }));
    eventBus.on('AI_ERROR', (payload) => this.logError(payload));
    eventBus.on('AI_PROVIDER_CHANGED', (payload) => this.logPerformance({ type: 'ai_provider_changed', ...payload }));
    eventBus.on('AI_CACHE_HIT', (payload) => this.logPerformance({ type: 'ai_cache_hit', ...payload }));
    eventBus.on('AI_CACHE_MISS', (payload) => this.logPerformance({ type: 'ai_cache_miss', ...payload }));
    eventBus.on('AI_VALIDATION_FAILED', (payload) => this.logError(payload));

    // Security events
    eventBus.on('SECURITY_CHECK', (payload) => this.logPerformance({ type: 'security_check', ...payload }));
    eventBus.on('SECURITY_WARNING', (payload) => this.logError({ type: 'security_warning', ...payload }));
    eventBus.on('SECURITY_ERROR', (payload) => this.logError({ type: 'security_error', ...payload }));
    eventBus.on('ROLE_CHANGED', (payload) => this.logPerformance({ type: 'role_changed', ...payload }));
    eventBus.on('PERMISSION_GRANTED', (payload) => this.logPerformance({ type: 'permission_granted', ...payload }));
    eventBus.on('PERMISSION_REVOKED', (payload) => this.logPerformance({ type: 'permission_revoked', ...payload }));
    eventBus.on('SESSION_CREATED', (payload) => this.logPerformance({ type: 'session_created', ...payload }));
    eventBus.on('SESSION_EXPIRED', (payload) => this.logPerformance({ type: 'session_expired', ...payload }));
    eventBus.on('INTEGRITY_FAILED', (payload) => this.logError({ type: 'integrity_failed', ...payload }));
    eventBus.on('SECURITY_EVENTS', (payload) => this.logPerformance({ type: 'security_events', ...payload }));

    // Digital Twin events
    eventBus.on('DIGITAL_TWIN_INITIALIZED', (payload) => this.logPerformance({ type: 'digital_twin_initialized', ...payload }));
    eventBus.on('SNAPSHOT_CREATED', (payload) => this.logPerformance({ type: 'snapshot_created', ...payload }));
    eventBus.on('SNAPSHOT_RESTORED', (payload) => this.logPerformance({ type: 'snapshot_restored', ...payload }));
    eventBus.on('SIMULATION_STARTED', (payload) => this.logPerformance({ type: 'simulation_started', ...payload }));
    eventBus.on('SIMULATION_FINISHED', (payload) => this.logPerformance({ type: 'simulation_finished', ...payload }));
    eventBus.on('HEALTH_REPORT_CREATED', (payload) => this.logPerformance({ type: 'health_report_created', ...payload }));
    eventBus.on('PREDICTION_GENERATED', (payload) => this.logPerformance({ type: 'prediction_generated', ...payload }));
    eventBus.on('DIGITAL_TWIN_WARNING', (payload) => this.logError({ type: 'digital_twin_warning', ...payload }));

    // Workflow events
    eventBus.on('WORKFLOW_REGISTERED', (payload) => this.logPerformance({ type: 'workflow_registered', ...payload }));
    eventBus.on('WORKFLOW_STARTED', (payload) => this.logPerformance({ type: 'workflow_started', ...payload }));
    eventBus.on('WORKFLOW_COMPLETED', (payload) => this.logPerformance({ type: 'workflow_completed', ...payload }));
    eventBus.on('WORKFLOW_FAILED', (payload) => this.logError({ type: 'workflow_failed', ...payload }));
    eventBus.on('WORKFLOW_CANCELLED', (payload) => this.logPerformance({ type: 'workflow_cancelled', ...payload }));
    eventBus.on('WORKFLOW_RETRY', (payload) => this.logPerformance({ type: 'workflow_retry', ...payload }));
    eventBus.on('WORKFLOW_ROLLBACK', (payload) => this.logPerformance({ type: 'workflow_rollback', ...payload }));
    eventBus.on('WORKFLOW_TIMEOUT', (payload) => this.logError({ type: 'workflow_timeout', ...payload }));
  }

  private logConfigEvent(type: string, payload: any) {
    if (!featureFlagEngine.isEnabled('ENABLE_TELEMETRY')) return;
    // For now we just push config events into performance or create a new array.
    // Let's reuse performance array for simplicity or add to engineUsage.
    this.data.performance.push({ time: Date.now(), metric: { type: 'config', eventType: type, ...payload } });
    this.saveToStorage();
  }

  private logError(error: any) {
    if (!featureFlagEngine.isEnabled('ENABLE_TELEMETRY')) return;
    this.data.errors.push({ time: Date.now(), error });
    this.saveToStorage();
  }

  public logPerformance(metric: any): void {
    if (!featureFlagEngine.isEnabled('ENABLE_TELEMETRY')) return;
    
    // Publish metric if it's a known metric type
    if (metric.type) {
      const metrics = MetricRegistry.getInstance();
      let counter = metrics.get(metric.type);
      if (!counter) {
        metrics.register(metric.type, { inc: () => {} });
      }
    }

    this.data.performance.push({ time: Date.now(), metric });
    if (metric.type === 'loadTime') {
      this.data.loadTimes.push(metric.duration);
    }
    this.saveToStorage();
  }

  private logMatchDuration(duration: number) {
    if (!featureFlagEngine.isEnabled('ENABLE_TELEMETRY')) return;
    if (duration > 0) {
      this.data.matchDurations.push(duration);
      this.saveToStorage();
    }
  }

  private logEngineUsage(engineName: string) {
    if (!featureFlagEngine.isEnabled('ENABLE_TELEMETRY')) return;
    if (engineName) {
      this.data.engineUsage[engineName] = (this.data.engineUsage[engineName] || 0) + 1;
      this.saveToStorage();
    }
  }

  private onSessionEnd() {
    if (!featureFlagEngine.isEnabled('ENABLE_TELEMETRY')) return;
    const duration = Date.now() - this.sessionStartTime;
    this.data.sessionDurations.push(duration);
    this.saveToStorage();
  }

  public getReport(): TelemetryData {
    return this.data;
  }
}

export const telemetryEngine = TelemetryEngine.getInstance();
