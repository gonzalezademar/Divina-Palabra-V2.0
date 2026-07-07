import { DoctrinalMetadata } from '@/utils/doctrinalFilter';

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

/**
 * Learning Engine (Capa Pedagógica Inteligente)
 * 
 * Infiere y calcula dinámicamente metadatos pedagógicos para cualquier
 * desafío, usando la metadata existente (DoctrinalMetadata) o aplicando
 * reglas simples sin IA si no está disponible.
 */
export class LearningEngine {
  private static instance: LearningEngine;
  
  private constructor() {}

  static getInstance(): LearningEngine {
    if (!LearningEngine.instance) {
      LearningEngine.instance = new LearningEngine();
    }
    return LearningEngine.instance;
  }

  /**
   * Analiza un desafío para extraer o inferir su valor educativo.
   */
  public analyzeChallenge(challenge: any): PedagogicalAnalysis {
    const meta: DoctrinalMetadata | undefined = challenge.metadata;
    const text: string = (challenge.fullPhrase || challenge.phrase || challenge.question || challenge.word || challenge.definition || '').toLowerCase();
    const reference: string = challenge.reference || '';

    // Infer book and testament from reference
    let inferredBook = 'General';
    let inferredTestament = 'Antiguo Testamento';
    if (reference) {
      const match = reference.match(/^(\d?\s*[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)/);
      if (match) {
        inferredBook = match[1].trim();
        const ntBooks = ['Mateo', 'Marcos', 'Lucas', 'Juan', 'Hechos', 'Romanos', 'Corintios', 'Gálatas', 'Efesios', 'Filipenses', 'Colosenses', 'Tesalonicenses', 'Timoteo', 'Tito', 'Filemón', 'Hebreos', 'Santiago', 'Pedro', 'Juan', 'Judas', 'Apocalipsis'];
        const isNT = ntBooks.some(b => inferredBook.includes(b));
        inferredTestament = isNT ? 'Nuevo Testamento' : 'Antiguo Testamento';
      }
    }

    // Infer theme from content
    let inferredTheme = 'Doctrina Básica';
    if (text.includes('amor') || text.includes('paz') || text.includes('fruto')) inferredTheme = 'Fruto del Espíritu';
    else if (text.includes('pecado') || text.includes('salvación') || text.includes('cruz')) inferredTheme = 'Salvación';
    else if (text.includes('orar') || text.includes('oración') || text.includes('ayuno')) inferredTheme = 'Disciplinas Espirituales';
    else if (text.includes('fe') || text.includes('creer') || text.includes('esperanza')) inferredTheme = 'Fe y Esperanza';
    else if (text.includes('dinero') || text.includes('riqueza') || text.includes('pobre')) inferredTheme = 'Mayordomía';

    return {
      bloomLevel: meta?.bloomLevel || 'Recordar',
      competency: meta?.competencies?.[0] || 'Conocimiento Bíblico',
      objective: meta?.topic || inferredTheme,
      difficulty: meta?.difficultyWeight || (text.length > 50 ? 3 : text.length > 20 ? 2 : 1),
      theme: inferredTheme,
      book: inferredBook,
      testament: inferredTestament
    };
  }

  /**
   * Genera recomendaciones a partir del perfil de aprendizaje.
   */
  public generateRecommendations(profile: LearningProfile): string[] {
    const recommendations: string[] = [];
    if (profile.totalChallenges === 0) return recommendations;

    // Detect weak competencies (0 challenges)
    const knownCompetencies = ['Conocimiento Bíblico', 'Aplicación Práctica', 'Razonamiento Teológico'];
    knownCompetencies.forEach(comp => {
      if (!profile.competencies[comp]) {
        recommendations.push(`Falta trabajar la competencia: ${comp}`);
      }
    });

    // Detect low bloom levels
    if (!profile.bloomLevels['Aplicar'] && !profile.bloomLevels['Analizar']) {
      recommendations.push('Sugerencia: Incrementar preguntas de nivel de Aplicación y Análisis.');
    }

    // Book diversity
    const bookCount = Object.keys(profile.books).length;
    if (bookCount < 2 && profile.totalChallenges > 3) {
      recommendations.push('Sugerencia: Diversificar el uso de libros bíblicos.');
    }

    return recommendations;
  }
}

export const learningEngine = LearningEngine.getInstance();
