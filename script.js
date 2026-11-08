const fs = require('fs');
const path = require('path');

const src = path.join(process.cwd(), 'src');
if (!fs.existsSync(path.join(src, 'constants'))) fs.mkdirSync(path.join(src, 'constants'));
if (!fs.existsSync(path.join(src, 'types'))) fs.mkdirSync(path.join(src, 'types'));

const appConstantsPath = path.join(src, 'constants', 'appConstants.ts');
fs.writeFileSync(appConstantsPath, \export const APP_CONSTANTS = {
  DIFFICULTY_LEVELS: {
    BEGINNER: 'Principiante',
    DISCIPLE: 'Discípulo',
    ADVANCED: 'Avanzado',
  },
  BLOOM_LEVELS: {
    REMEMBER: 'Recordar',
    UNDERSTAND: 'Comprender',
    APPLY: 'Aplicar',
    ANALYZE: 'Analizar',
    EVALUATE: 'Evaluar',
    CREATE: 'Crear',
  },
  COMPETENCIES: {
    KNOWLEDGE: 'Conocimiento Bíblico',
    APPLICATION: 'Aplicación Práctica',
    REASONING: 'Razonamiento Teológico',
  },
  TESTAMENTS: {
    AT: 'Antiguo Testamento',
    NT: 'Nuevo Testamento',
  },
  THEMES: {
    BASIC: 'Doctrina Básica',
    FRUIT: 'Fruto del Espíritu',
    SALVATION: 'Salvación',
    DISCIPLINES: 'Disciplinas Espirituales',
    FAITH: 'Fe y Esperanza',
    STEWARDSHIP: 'Mayordomía',
    ADVANCED: 'Temas Avanzados',
  },
  THRESHOLDS: {
    MASTERY: 80,
    WEAKNESS: 50,
  }
};
\);

const typesEducationPath = path.join(src, 'types', 'education.ts');
fs.writeFileSync(typesEducationPath, \export interface DoctrinalMetadata {
  doctrinalProfile?: string[];
  bloomLevel?: string;
  topic?: string;
  biblicalBook?: string;
  testament?: 'AT' | 'NT' | 'Antiguo Testamento' | 'Nuevo Testamento';
  difficultyWeight?: number;
  educationalObjectives?: string[];
  competencies?: string[];
}

export interface PedagogicalAnalysis {
  bloomLevel: string;
  competency: string;
  objective: string;
  difficulty: number;
  theme: string;
  book: string;
  testament: string;
}

export interface LearningProfile {
  bloomLevels: Record<string, number>;
  competencies: Record<string, number>;
  themes: Record<string, number>;
  books: Record<string, number>;
  totalChallenges: number;
}

export interface EducationalAnalytics {
  distributionByBook: Record<string, number>;
  distributionByTheme: Record<string, number>;
  distributionByCompetency: Record<string, number>;
  distributionByBloom: Record<string, number>;
  distributionByDifficulty: Record<string, number>;
  correctPercentageByCompetency: Record<string, number>;
  correctPercentageByTheme: Record<string, number>;
  correctPercentageByBook: Record<string, number>;
  atNtBalance: { AT: number; NT: number };
  catalogCoverage: number;
}

export interface AdaptiveRecommendations {
  strengths: string[];
  weaknesses: string[];
  recommendedTheme: string;
  recommendedBloom: string;
  recommendedDifficulty: 'Principiante' | 'Discípulo' | 'Avanzado';
  recommendedVerseReference: string;
}

export interface TeacherInsights {
  classLevel: string;
  strugglingStudents: number;
  masteredTopics: string[];
  recommendedAction: string;
  overallScore: number;
}

export interface QualityReport {
  score: number;
  issues: string[];
  suggestions: string[];
}
\);

const educationHelpersPath = path.join(src, 'utils', 'educationHelpers.ts');
fs.writeFileSync(educationHelpersPath, \import { PedagogicalAnalysis, DoctrinalMetadata } from '@/types/education';
import { APP_CONSTANTS } from '@/constants/appConstants';

export function inferPedagogy(challenge: any): PedagogicalAnalysis {
  const meta: DoctrinalMetadata | undefined = challenge.metadata;
  const text: string = (challenge.fullPhrase || challenge.phrase || challenge.question || challenge.word || challenge.definition || '').toLowerCase();
  const reference: string = challenge.reference || '';

  let inferredBook = 'General';
  let inferredTestament = APP_CONSTANTS.TESTAMENTS.AT;
  if (reference) {
    const match = reference.match(/^(\\d?\\s*[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)/);
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
\);

fs.writeFileSync(path.join(src, 'services', 'index.ts'), \export * from './accessibilityEngine';
export * from './adaptiveLearningEngine';
export * from './assessmentEngine';
export * from './contentGovernanceEngine';
export * from './contentQualityEngine';
export * from './curriculumEngine';
export * from './educationalAnalyticsEngine';
export * from './educationalOrchestrator';
export * from './knowledgeGraphEngine';
export * from './learningEngine';
export * from './ministryInsightsEngine';
export * from './platformHealthEngine';
export * from './simulationEngine';
export * from './syncService';
export * from './systemAuditEngine';
export * from './teacherInsightsEngine';
\);

fs.writeFileSync(path.join(src, 'utils', 'index.ts'), \export * from './cn';
export * from './doctrinalFilter';
export * from './educationHelpers';
\);

fs.writeFileSync(path.join(src, 'types', 'index.ts'), \export * from './education';
\);

fs.writeFileSync(path.join(src, 'hooks', 'index.ts'), \export * from './use-toast';
export * from './useCloudSync';
export * from './useTranslation';
\);

console.log("Generated initial files");
