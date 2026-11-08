import { ContentPackage } from './ContentPackage';
import { getBibleData } from '@/data/bibleData';
import { baseManifest } from '@/manifests/base.manifest';
import { workflowEngine } from '@/workflows/WorkflowEngine';

export class ContentLoader {
  // Can support offline load, cache load, remote DLC download
  public async loadInternalContent(lang: 'es' | 'en' = 'es', version: string = 'rvr1960'): Promise<ContentPackage> {
    try {
      workflowEngine.executeAsync('content_load_process', { lang, version });
    } catch(e) {}

    const data = getBibleData(lang, version);
    return {
      manifest: { ...baseManifest, id: `base_catalog_${lang}_${version}` },
      data
    };
  }

  // Future hook for DLC
  public async loadRemoteContent(url: string): Promise<ContentPackage> {
    throw new Error('Not implemented');
  }
}

export const contentLoader = new ContentLoader();
