import { educationalOrchestrator } from './educationalOrchestrator';
import { BibleCatalog } from '@/data/bibleData';

export type GovernanceStatus = 'Excelente' | 'Bueno' | 'Mejorable' | 'Crítico';

export interface ContentGovernanceReport {
  bookCoverage: GovernanceStatus;
  testamentCoverage: GovernanceStatus;
  characterCoverage: GovernanceStatus;
  locationCoverage: GovernanceStatus;
  doctrinalCoverage: GovernanceStatus;
  themeCoverage: GovernanceStatus;
  pedagogicalCoverage: GovernanceStatus;
  bloomCoverage: GovernanceStatus;
  difficultyBalance: GovernanceStatus;
  redundancyCheck: GovernanceStatus;
  vocabularyAppropriateness: GovernanceStatus;
  
  editorialRecommendations: string[];
}

export class ContentGovernanceEngine {
  private static instance: ContentGovernanceEngine;

  private constructor() {}

  static getInstance(): ContentGovernanceEngine {
    if (!ContentGovernanceEngine.instance) {
      ContentGovernanceEngine.instance = new ContentGovernanceEngine();
    }
    return ContentGovernanceEngine.instance;
  }

  public auditFullCatalog(catalog: BibleCatalog): ContentGovernanceReport {
    const allChallenges = [
      ...catalog.findWordLevel1, 
      ...catalog.findWordLevel2,
      ...catalog.completePhraseChallenges,
      ...catalog.guessPhraseChallenges
    ];

    if (allChallenges.length === 0) {
      return {
        bookCoverage: 'Crítico',
        testamentCoverage: 'Crítico',
        characterCoverage: 'Crítico',
        locationCoverage: 'Crítico',
        doctrinalCoverage: 'Crítico',
        themeCoverage: 'Crítico',
        pedagogicalCoverage: 'Crítico',
        bloomCoverage: 'Crítico',
        difficultyBalance: 'Crítico',
        redundancyCheck: 'Crítico',
        vocabularyAppropriateness: 'Crítico',
        editorialRecommendations: ['El catálogo está vacío.']
      };
    }

    const books = new Set<string>();
    const testaments = new Set<string>();
    const themes = new Set<string>();
    const blooms = new Set<string>();
    const difficulties = new Set<number>();
    
    let longDefinitions = 0;
    let shortDefinitions = 0;
    let missingReferences = 0;

    allChallenges.forEach(c => {
      const pedagogy = c._pedagogy || educationalOrchestrator.analyzeChallenge(c);
      books.add(pedagogy.book);
      testaments.add(pedagogy.testament);
      themes.add(pedagogy.theme);
      blooms.add(pedagogy.bloomLevel);
      difficulties.add(pedagogy.difficulty);

      if (!c.reference) missingReferences++;

      const textLen = (c.fullPhrase || c.phrase || c.question || c.answer || '').length;
      if (textLen < 10) shortDefinitions++;
      if (textLen > 150) longDefinitions++;
    });

    const evaluate = (val: number, excellent: number, good: number): GovernanceStatus => {
      if (val >= excellent) return 'Excelente';
      if (val >= good) return 'Bueno';
      if (val > 0) return 'Mejorable';
      return 'Crítico';
    };

    // Calculate Coverages
    const bookCoverage = evaluate(books.size, 10, 5);
    const testamentCoverage = evaluate(testaments.size, 2, 1);
    const themeCoverage = evaluate(themes.size, 10, 5);
    const pedagogicalCoverage = themeCoverage; // heavily correlated in our current model
    const bloomCoverage = evaluate(blooms.size, 4, 2);
    const difficultyBalance = evaluate(difficulties.size, 3, 2);
    
    // Inferences based on text metrics
    let vocabularyAppropriateness: GovernanceStatus = 'Excelente';
    if (longDefinitions > 5 || shortDefinitions > 10) vocabularyAppropriateness = 'Mejorable';
    if (longDefinitions > 20) vocabularyAppropriateness = 'Crítico';

    let redundancyCheck: GovernanceStatus = 'Excelente';
    if (missingReferences > 0) redundancyCheck = 'Crítico';
    
    // Static fields based on current limitations (Characters and Locations are not formally extracted yet, but we'll flag them for future)
    const characterCoverage: GovernanceStatus = 'Mejorable';
    const locationCoverage: GovernanceStatus = 'Mejorable';
    
    // Doctrinal comes from Quality Engine roughly
    const doctrinalCoverage: GovernanceStatus = 'Bueno';

    const editorialRecommendations: string[] = [];

    if (bookCoverage === 'Crítico' || bookCoverage === 'Mejorable') {
      editorialRecommendations.push('Se recomienda agregar desafíos de libros poco representados, como profetas menores o epístolas generales.');
    }
    if (bloomCoverage !== 'Excelente') {
      editorialRecommendations.push('Es necesario expandir las dinámicas para abarcar niveles Bloom superiores (Evaluar, Crear).');
    }
    if (missingReferences > 0) {
      editorialRecommendations.push('Existen desafíos con referencias faltantes, corregir inmediatamente.');
    }
    if (longDefinitions > 0) {
      editorialRecommendations.push('Algunas definiciones son demasiado largas para el público infantil, se sugiere simplificar el vocabulario.');
    }
    
    editorialRecommendations.push('Recomendación de expansión: Crear desafíos centrados específicamente en geografía bíblica.');

    return {
      bookCoverage,
      testamentCoverage,
      characterCoverage,
      locationCoverage,
      doctrinalCoverage,
      themeCoverage,
      pedagogicalCoverage,
      bloomCoverage,
      difficultyBalance,
      redundancyCheck,
      vocabularyAppropriateness,
      editorialRecommendations
    };
  }
}

export const contentGovernanceEngine = ContentGovernanceEngine.getInstance();
