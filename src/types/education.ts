export interface DoctrinalMetadata {
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
  participatingPlugins?: string[];
}

export interface AdaptiveRecommendations {
  strengths: string[];
  weaknesses: string[];
  recommendedTheme: string;
  recommendedBloom: string;
  recommendedDifficulty: 'Principiante' | 'Discípulo' | 'Avanzado';
  recommendedVerseReference: string;
}

export type InsightStatus = 'Excelente' | 'Bueno' | 'Mejorable' | 'Insuficiente';

export interface TeacherInsights {
  themeBalance: InsightStatus;
  difficultyBalance: InsightStatus;
  bloomBalance: InsightStatus;
  doctrinalBalance: InsightStatus;
  gameModeBalance: InsightStatus;
  biblicalCoverage: InsightStatus;
  recommendations: string[];
}

export interface QualityReport {
  totalChallenges: number;
  validatedCount: number;
  incompleteCount: number;
  reviewRequiredCount: number;
  universalCount: number;
  issues: string[];
}
