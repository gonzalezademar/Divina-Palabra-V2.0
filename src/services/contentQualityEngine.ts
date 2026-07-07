import { BibleCatalog, Challenge } from '@/data/bibleData';
import { learningEngine } from './learningEngine';
import { DoctrinalMetadata } from '@/utils/doctrinalFilter';

export type QualityStatus = 'Validado' | 'Incompleto' | 'Requiere revisión' | 'Universal';

export interface QualityReport {
  totalChallenges: number;
  validatedCount: number;
  incompleteCount: number;
  reviewRequiredCount: number;
  universalCount: number;
  issues: string[];
}

export class ContentQualityEngine {
  private static instance: ContentQualityEngine;
  private auditedCatalogs: Set<string> = new Set();
  public globalReport: QualityReport = {
    totalChallenges: 0,
    validatedCount: 0,
    incompleteCount: 0,
    reviewRequiredCount: 0,
    universalCount: 0,
    issues: []
  };

  private constructor() {}

  static getInstance(): ContentQualityEngine {
    if (!ContentQualityEngine.instance) {
      ContentQualityEngine.instance = new ContentQualityEngine();
    }
    return ContentQualityEngine.instance;
  }

  public auditCatalog(catalogId: string, catalog: BibleCatalog): void {
    if (this.auditedCatalogs.has(catalogId)) return; // Audit only once
    
    this.auditChallengesList(catalog.findWordLevel1, 'findWordLevel1');
    this.auditChallengesList(catalog.findWordLevel2, 'findWordLevel2');
    this.auditChallengesList(catalog.completePhraseChallenges, 'completePhraseChallenges');
    this.auditChallengesList(catalog.guessPhraseChallenges, 'guessPhraseChallenges');
    
    this.auditedCatalogs.add(catalogId);
  }

  private auditChallengesList(challenges: any[], mode: string): void {
    if (!challenges) return;

    const seenReferences = new Set<string>();

    challenges.forEach((challenge, index) => {
      this.globalReport.totalChallenges++;
      
      const issues: string[] = [];
      let status: QualityStatus = 'Validado';

      // Verify structure & mandatory fields
      if (!challenge.reference) issues.push(`Desafío ${index} en ${mode} carece de referencia.`);
      
      const content = challenge.fullPhrase || challenge.phrase || challenge.question || challenge.word || challenge.answer;
      if (!content) issues.push(`Desafío ${index} en ${mode} carece de contenido principal.`);

      // Duplicates
      if (challenge.reference) {
        const dupKey = `${mode}-${challenge.reference}`;
        if (seenReferences.has(dupKey)) {
          issues.push(`Referencia duplicada detectada: ${challenge.reference} en ${mode}.`);
          status = 'Requiere revisión';
        }
        seenReferences.add(dupKey);
      }

      // Pedagogical Integration & Inference
      const analysis = learningEngine.analyzeChallenge(challenge);
      
      if (!challenge.metadata) {
        // Infer metadata deterministically if missing
        challenge.metadata = {
          doctrinalProfile: ['universal'],
          bloomLevel: analysis.bloomLevel,
          topic: analysis.theme,
          biblicalBook: analysis.book,
          testament: analysis.testament as 'AT' | 'NT',
          difficultyWeight: analysis.difficulty,
          competencies: [analysis.competency]
        };
        issues.push(`Desafío ${index} en ${mode} fue auto-completado con metadata inferida.`);
        if (status === 'Validado') status = 'Universal';
      }

      // Check consistency (e.g. beginner level but content is very long)
      if (mode === 'findWordLevel1' && (content?.length || 0) > 60) {
        issues.push(`Desafío ${index} en ${mode} es demasiado largo para nivel principiante.`);
        status = 'Requiere revisión';
      }

      if (issues.length > 0 && status === 'Validado') {
        status = 'Incompleto';
      }

      // Update counters
      if (status === 'Validado') this.globalReport.validatedCount++;
      else if (status === 'Incompleto') this.globalReport.incompleteCount++;
      else if (status === 'Requiere revisión') this.globalReport.reviewRequiredCount++;
      else if (status === 'Universal') this.globalReport.universalCount++;

      // Attach internal quality flag without breaking existing data
      challenge._qualityStatus = status;
      this.globalReport.issues.push(...issues);
    });
  }

  public getReport(): QualityReport {
    return this.globalReport;
  }
}

export const contentQualityEngine = ContentQualityEngine.getInstance();
