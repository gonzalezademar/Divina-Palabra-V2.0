import es from './locales/es.json';
import en from './locales/en.json';

export type TranslationType = typeof es;

export const localesMap: Record<string, TranslationType> = {
  es,
  en: en as unknown as TranslationType,
};

export const getTranslation = (lang: string): TranslationType => {
  return localesMap[lang] || localesMap['es'];
};
