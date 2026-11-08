export interface RuntimeConfiguration {
  defaults: Record<string, any>;
  overrides: Record<string, any>;
  fallbacks: Record<string, any>;
  temporal: Record<string, any>;
  session: Record<string, any>;
  immutable: Record<string, any>;
}