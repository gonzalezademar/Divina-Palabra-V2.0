export interface FeatureFlag {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
}

export const defaultFeatureFlags: FeatureFlag[] = [
  { id: 'ENABLE_TELEMETRY', name: 'Enable Telemetry', enabled: true, description: 'Allows internal telemetry recording' },
  { id: 'ENABLE_PERFORMANCE_MONITOR', name: 'Enable Performance Monitor', enabled: true, description: 'Records performance metrics' },
  { id: 'ENABLE_DIAGNOSTICS', name: 'Enable Diagnostics', enabled: true, description: 'Allows generation of diagnostic dashboard' },
  { id: 'ENABLE_SYNC', name: 'Enable Sync', enabled: true, description: 'Allows cloud synchronization' },
  { id: 'ENABLE_PLUGINS', name: 'Enable Plugins', enabled: true, description: 'Enables Plugin Manager execution' },
  { id: 'ENABLE_EVENT_AUTOMATION', name: 'Enable Event Automation', enabled: true, description: 'Executes automated event rules' },
  { id: 'ENABLE_ADAPTIVE_LEARNING', name: 'Enable Adaptive Learning', enabled: true, description: 'Generates adaptive recommendations' },
  { id: 'ENABLE_ASSESSMENT', name: 'Enable Assessment', enabled: true, description: 'Evaluates player performance' },
  { id: 'ENABLE_TEACHER_INSIGHTS', name: 'Enable Teacher Insights', enabled: true, description: 'Provides insights to teachers' },
  { id: 'ENABLE_CONTENT_QUALITY', name: 'Enable Content Quality Audits', enabled: true, description: 'Audits content automatically' }
];
