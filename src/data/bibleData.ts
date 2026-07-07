import es_rvr1960 from './bible/es_rvr1960.json';
import es_nvi from './bible/es_nvi.json';
import es_ntv from './bible/es_ntv.json';
import en_kjv from './bible/en_kjv.json';
import en_niv from './bible/en_niv.json';
import en_esv from './bible/en_esv.json';
import { educationalOrchestrator } from '@/services/educationalOrchestrator';

export type Challenge = {
  answer?: string;
  syllables?: string[];
  hint: string;
  reference: string;
  fullPhrase?: string;
  phrase?: string;
  question?: string;
  word?: string;
  metadata?: any;
  _qualityStatus?: string;
  _pedagogy?: any;
};

export type BibleCatalog = {
  findWordLevel1: Challenge[];
  findWordLevel2: Challenge[];
  completePhraseChallenges: Challenge[];
  guessPhraseChallenges: Challenge[];
};

export const bibleDataMap: Record<string, BibleCatalog> = {
  'es_rvr1960': es_rvr1960 as BibleCatalog,
  'es_nvi': es_nvi as BibleCatalog,
  'es_ntv': es_ntv as BibleCatalog,
  'en_kjv': en_kjv as BibleCatalog,
  'en_niv': en_niv as BibleCatalog,
  'en_esv': en_esv as BibleCatalog,
};

export const getBibleData = (lang: string, version: string): BibleCatalog => {
  const key = `${lang}_${version.toLowerCase()}`;
  const catalog = bibleDataMap[key] || bibleDataMap['es_rvr1960'];
  
  // Phase 7: Automatically audit catalog upon load (only runs once per catalog internally)
  educationalOrchestrator.auditCatalog(key, catalog);
  
  return catalog;
};
