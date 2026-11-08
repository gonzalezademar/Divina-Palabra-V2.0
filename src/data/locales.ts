import es from './locales/es.json';


export type TranslationType = typeof es;

export const localesMap: Record<string, TranslationType> = {
  es,

};

export const getTranslation = (lang: string): TranslationType => {
  return localesMap[lang] || localesMap['es'];
};
