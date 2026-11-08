import { ContentManifest } from './ContentManifest';

export interface ContentPackage {
  manifest: ContentManifest;
  data: any; // Raw content (JSON, challenges, etc.)
  resources?: Record<string, any>; // Audio, images, etc.
}
