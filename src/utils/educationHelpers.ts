import { PedagogicalAnalysis, DoctrinalMetadata } from '@/types/education';
import { APP_CONSTANTS } from '@/constants/appConstants';

export function inferPedagogy(challenge: any): PedagogicalAnalysis {
  const meta: DoctrinalMetadata | undefined = challenge.metadata;
  const text: string = (challenge.fullPhrase || challenge.phrase || challenge.question || challenge.word || challenge.definition || '').toLowerCase();
  const reference: string = challenge.reference || '';

  let inferredBook = 'General';
  let inferredTestament = APP_CONSTANTS.TESTAMENTS.AT;
  if (reference) {
    const match = reference.match(/^(\d?\s*[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)/);
    if (match) {
      inferredBook = match[1].trim();
      const ntBooks = ['Mateo', 'Marcos', 'Lucas', 'Juan', 'Hechos', 'Romanos', 'Corintios', 'Gálatas', 'Efesios', 'Filipenses', 'Colosenses', 'Tesalonicenses', 'Timoteo', 'Tito', 'Filemón', 'Hebreos', 'Santiago', 'Pedro', 'Judas', 'Apocalipsis'];
      const isNT = ntBooks.some(b => inferredBook.includes(b));
      inferredTestament = isNT ? APP_CONSTANTS.TESTAMENTS.NT : APP_CONSTANTS.TESTAMENTS.AT;
    }
  }

  let inferredTheme = APP_CONSTANTS.THEMES.BASIC;
  if (text.includes('amor') || text.includes('paz') || text.includes('fruto')) inferredTheme = APP_CONSTANTS.THEMES.FRUIT;
  else if (text.includes('pecado') || text.includes('salvación') || text.includes('cruz')) inferredTheme = APP_CONSTANTS.THEMES.SALVATION;
  else if (text.includes('orar') || text.includes('oración') || text.includes('ayuno')) inferredTheme = APP_CONSTANTS.THEMES.DISCIPLINES;
  else if (text.includes('fe') || text.includes('creer') || text.includes('esperanza')) inferredTheme = APP_CONSTANTS.THEMES.FAITH;
  else if (text.includes('dinero') || text.includes('riqueza') || text.includes('pobre')) inferredTheme = APP_CONSTANTS.THEMES.STEWARDSHIP;

  return {
    bloomLevel: meta?.bloomLevel || APP_CONSTANTS.BLOOM_LEVELS.REMEMBER,
    competency: meta?.competencies?.[0] || APP_CONSTANTS.COMPETENCIES.KNOWLEDGE,
    objective: meta?.topic || inferredTheme,
    difficulty: meta?.difficultyWeight || (text.length > 50 ? 3 : text.length > 20 ? 2 : 1),
    theme: inferredTheme,
    book: inferredBook,
    testament: inferredTestament
  };
}

export function filterByDoctrinalProfile<T extends Record<string, any>>(
  items: T[],
  profile?: string,
  minRequired: number = 0
): T[] {
  if (!items || items.length === 0) return items;

  const filtered = items.filter(item => {
    if (!item.metadata || !item.metadata.doctrinalProfile || item.metadata.doctrinalProfile.length === 0) {
      return true;
    }
    if (!profile) return true;
    
    return item.metadata.doctrinalProfile.includes(profile) || item.metadata.doctrinalProfile.includes('universal');
  });

  if (filtered.length < minRequired) {
    const universalItems = items.filter(item => 
      !item.metadata || !item.metadata.doctrinalProfile || item.metadata.doctrinalProfile.length === 0 || item.metadata.doctrinalProfile.includes('universal')
    );
    
    const needed = minRequired - filtered.length;
    const additional = universalItems.filter(u => !filtered.includes(u)).slice(0, needed);
    return [...filtered, ...additional];
  }

  return filtered;
}
