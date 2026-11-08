import { EducationalKnowledgeRule } from '../entities/EducationalKnowledgeRule';
import { EducationalExperience } from '../entities/EducationalExperience';
import { enterpriseEducationalMemory } from './EnterpriseEducationalMemory';
import { enterpriseExperienceEvaluationEngine } from './EnterpriseExperienceEvaluationEngine';
import { EducationalContext } from '../entities/EducationalContext';
import { enterpriseKnowledgeGovernanceEngine } from './EnterpriseKnowledgeGovernanceEngine';

export class EnterpriseEducationalKnowledgeEngine {
  private static instance: EnterpriseEducationalKnowledgeEngine;
  private rules: Map<string, EducationalKnowledgeRule[]> = new Map();

  private metrics = {
    learnedRules: 0,
    knowledgeGenerated: 0,
    discoveredPatterns: 0,
    knowledgeReuse: 0,
    knowledgeConsistency: 1.0
  };

  private constructor() {}

  static getInstance(): EnterpriseEducationalKnowledgeEngine {
    if (!EnterpriseEducationalKnowledgeEngine.instance) {
      EnterpriseEducationalKnowledgeEngine.instance = new EnterpriseEducationalKnowledgeEngine();
    }
    return EnterpriseEducationalKnowledgeEngine.instance;
  }

  public getMetrics() {
    return this.metrics;
  }

  public extractKnowledge(studentId: string): void {
    const experiences = enterpriseEducationalMemory.getAllExperiences(studentId);
    if (experiences.length === 0) return;

    const topExperiences = enterpriseExperienceEvaluationEngine.getTopExperiences(experiences);
    if (topExperiences.length === 0) return;

    this.metrics.knowledgeGenerated++;

    const studentRules = this.rules.get(studentId) || [];

    const challengeTypes = topExperiences.map(e => e.decisionTaken.recommendedChallengeType);
    const mostCommonType = this.findMostFrequent(challengeTypes);

    if (mostCommonType && challengeTypes.filter(t => t === mostCommonType).length > 2) {
      const ruleExists = studentRules.some(r => r.type === 'challenge_type_preference' && r.recommendedAction.recommendedChallengeType === mostCommonType);
      if (!ruleExists) {
        studentRules.push({
          id: `rule_${Date.now()}_1`,
          type: 'challenge_type_preference',
          condition: 'consistent_success',
          recommendedAction: { recommendedChallengeType: mostCommonType },
          confidenceScore: 0.85,
          support: challengeTypes.filter(t => t === mostCommonType).length,
          createdAt: Date.now(),
          lastApplied: 0,
          successCount: 0,
          failureCount: 0,
          validityExpiry: undefined,
          status: 'experimental',
          qualityScore: 0.5,
          priority: 0,
          evidenceLevel: 1
        });
        this.metrics.learnedRules++;
        this.metrics.discoveredPatterns++;
      } else {
        const rule = studentRules.find(r => r.type === 'challenge_type_preference' && r.recommendedAction.recommendedChallengeType === mostCommonType);
        if (rule) rule.support++;
      }
    }

    const difficultyReductions = topExperiences.filter(e => 
      e.contextUsed.progress?.globalProgress && e.contextUsed.progress.globalProgress < 50 && 
      e.decisionTaken.suggestedDifficulty === 'Principiante'
    );
    if (difficultyReductions.length >= 2) {
      const ruleExists = studentRules.some(r => r.type === 'difficulty_reduction');
      if (!ruleExists) {
        studentRules.push({
          id: `rule_${Date.now()}_2`,
          type: 'difficulty_reduction',
          condition: 'low_progress',
          recommendedAction: { suggestedDifficulty: 'Principiante' },
          confidenceScore: 0.9,
          support: difficultyReductions.length,
          createdAt: Date.now(),
          lastApplied: 0,
          successCount: 0,
          failureCount: 0,
          validityExpiry: undefined,
          status: 'experimental',
          qualityScore: 0.5,
          priority: 0,
          evidenceLevel: 1
        });
        this.metrics.learnedRules++;
        this.metrics.discoveredPatterns++;
      }
    }

    this.rules.set(studentId, studentRules);
  }

  public getRules(studentId: string): EducationalKnowledgeRule[] {
    return this.rules.get(studentId) || [];
  }

  public applyKnowledge(studentId: string, context: EducationalContext): any {
    const studentRules = this.rules.get(studentId) || [];
    if (studentRules.length === 0) return null;

    const validRules = enterpriseKnowledgeGovernanceEngine.governRules(studentRules);

    let appliedAction: any = {};
    let ruleApplied = false;
    let appliedRuleId: string | undefined;

    for (const rule of validRules) {
      if (rule.type === 'difficulty_reduction' && context.progress && context.progress.globalProgress < 50) {
        Object.assign(appliedAction, rule.recommendedAction);
        rule.lastApplied = Date.now();
        ruleApplied = true;
        appliedRuleId = rule.id;
        break;
      }
      
      if (rule.type === 'challenge_type_preference') {
        Object.assign(appliedAction, rule.recommendedAction);
        rule.lastApplied = Date.now();
        ruleApplied = true;
        appliedRuleId = rule.id;
        break;
      }
    }

    if (ruleApplied) {
      this.metrics.knowledgeReuse++;
      this.metrics.knowledgeConsistency = Math.min(1.0, this.metrics.knowledgeConsistency + 0.01);
      return { action: appliedAction, ruleId: appliedRuleId };
    }

    return null;
  }

  private findMostFrequent(arr: string[]): string | null {
    if (arr.length === 0) return null;
    const counts = arr.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  }
}

export const enterpriseEducationalKnowledgeEngine = EnterpriseEducationalKnowledgeEngine.getInstance();
