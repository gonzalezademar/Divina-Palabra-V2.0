export interface EducationalKnowledgeRule {
  id: string;
  type: string;
  condition: string;
  recommendedAction: any;
  confidenceScore: number;
  support: number;
  createdAt: number;
  lastApplied: number;
  
  successCount: number;
  failureCount: number;
  validityExpiry?: number;
  status: 'experimental' | 'estable' | 'obsoleta';
  qualityScore: number;
  priority: number;
  evidenceLevel: number;
}
