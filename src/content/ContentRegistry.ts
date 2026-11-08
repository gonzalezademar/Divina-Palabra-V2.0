import { ContentPackage } from './ContentPackage';
import { ContentManifest } from './ContentManifest';
import { contentLoader } from './ContentLoader';
import { contentValidator } from './ContentValidator';
import { contentMigration } from './ContentMigration';
import { eventBus } from '@/services/eventBus';
import { repositoryManager } from '@/repositories';
import { pluginManager } from '@/plugins/PluginManager';

export class ContentRegistry {
  private static instance: ContentRegistry;
  private packages: Map<string, ContentPackage> = new Map();
  private isInitialized = false;

  private constructor() {}

  static getInstance(): ContentRegistry {
    if (!ContentRegistry.instance) {
      ContentRegistry.instance = new ContentRegistry();
    }
    return ContentRegistry.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;
    this.isInitialized = true;
    
    // Auto-load base content to ensure backwards compatibility
    await this.load('es', 'rvr1960');

    // Allow plugins to register additional content
    try {
      const pluginContents = pluginManager.executeHook('onContentLoad' as any);
      pluginContents.forEach(c => {
        if (c && c.manifest) this.register(c);
      });
    } catch(e) {}
  }

  public async load(lang: 'es' | 'en' = 'es', version: string = 'rvr1960'): Promise<void> {
    const startTime = Date.now();
    try {
      // Obtener paquetes mediante RepositoryManager (transparente)
      try {
        const repo = repositoryManager.get<any>('BibleRepository');
        await repo.getById(`${lang}_${version}`);
      } catch (e) {}

      const pkg = await contentLoader.loadInternalContent(lang, version);
      const migrated = contentMigration.migrate(pkg);
      const errors = contentValidator.validate(migrated);

      if (errors.length > 0) {
        eventBus.emit('PACKAGE_FAILED', { id: migrated.manifest.id, errors });
        console.warn(`Package ${migrated.manifest.id} validation errors:`, errors);
      }

      this.register(migrated);
      eventBus.emit('PACKAGE_LOADED', { id: migrated.manifest.id, duration: Date.now() - startTime });
      eventBus.emit('PERFORMANCE_METRIC', { type: 'content_load_time', duration: Date.now() - startTime });
    } catch (e) {
      console.error('Failed to load content', e);
    }
  }

  public register(pkg: ContentPackage): void {
    this.packages.set(pkg.manifest.id, pkg);
    eventBus.emit('CONTENT_REGISTERED', { id: pkg.manifest.id });
    this.reportMetrics();
  }

  public unregister(id: string): void {
    this.packages.delete(id);
    eventBus.emit('CONTENT_REMOVED', { id });
    this.reportMetrics();
  }

  public async reload(id: string): Promise<void> {
    // Basic implementation for reloading
    this.unregister(id);
    await this.initialize();
  }

  public validate(id: string): string[] {
    const pkg = this.getPackage(id);
    if (!pkg) return ['Package not found'];
    const errors = contentValidator.validate(pkg);
    eventBus.emit('CONTENT_VALIDATED', { id, isValid: errors.length === 0 });
    return errors;
  }

  public getPackage(id: string): ContentPackage | undefined {
    return this.packages.get(id);
  }

  public getPackages(): ContentPackage[] {
    return Array.from(this.packages.values());
  }

  public getContent(id: string): any {
    return this.packages.get(id)?.data;
  }

  public search(query: string): ContentPackage[] {
    const q = query.toLowerCase();
    return this.getPackages().filter(p => p.manifest.nombre.toLowerCase().includes(q) || p.manifest.categorías.some(c => c.toLowerCase().includes(q)));
  }

  public searchByLanguage(lang: string): ContentPackage[] {
    return this.getPackages().filter(p => p.manifest.idiomas.includes(lang));
  }

  public searchByDoctrine(doctrine: string): ContentPackage[] {
    return this.getPackages().filter(p => p.manifest.perfilDoctrinal.includes(doctrine) || p.manifest.categorías?.includes(doctrine));
  }

  public searchByDifficulty(difficulty: string): ContentPackage[] {
    // Basic fallback if difficulty is not directly in manifest, filter by category or something else
    return this.getPackages().filter(p => p.manifest.categorías?.includes(difficulty));
  }

  public getActiveContent(): ContentPackage[] {
    return this.getPackages();
  }

  public getStatistics(): any {
    const pkgs = this.getPackages();
    return {
      totalPackages: pkgs.length,
      activeContent: pkgs.length,
      availableLanguages: Array.from(new Set(pkgs.flatMap(p => p.manifest.idiomas).filter(Boolean))),
      versions: Array.from(new Set(pkgs.map(p => p.manifest.versión).filter(Boolean)))
    };
  }

  public healthCheck(): boolean {
    return this.isInitialized && this.packages.size > 0;
  }

  private reportMetrics(): void {
    const count = this.packages.size;
    let totalContent = 0;
    this.packages.forEach(p => {
      totalContent += p.manifest.cantidadDesafíos + p.manifest.cantidadPreguntas;
    });

    eventBus.emit('PERFORMANCE_METRIC', { type: 'package_count', count });
    eventBus.emit('PERFORMANCE_METRIC', { type: 'content_count', count: totalContent });
    eventBus.emit('PERFORMANCE_METRIC', { type: 'catalog_version', version: '1.0.0' });
  }
}

export const contentRegistry = ContentRegistry.getInstance();
