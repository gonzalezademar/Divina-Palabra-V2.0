import { EducationalKnowledgeRule } from '../entities/EducationalKnowledgeRule';

export class EnterpriseKnowledgeGovernanceEngine {
  private static instance: EnterpriseKnowledgeGovernanceEngine;

  private metrics = {
    knowledgeQuality: 0,
    governanceScore: 0,
    obsoleteRules: 0,
    trustedRules: 0,
    experimentalRules: 0,
    governanceOperations: 0,
    averageRuleConfidence: 0
  };

  private constructor() {}

  static getInstance(): EnterpriseKnowledgeGovernanceEngine {
    if (!EnterpriseKnowledgeGovernanceEngine.instance) {
      EnterpriseKnowledgeGovernanceEngine.instance = new EnterpriseKnowledgeGovernanceEngine();
    }
    return EnterpriseKnowledgeGovernanceEngine.instance;
  }

  public getMetrics() {
    return this.metrics;
  }

  public recordRuleApplicationResult(rule: EducationalKnowledgeRule, success: boolean): void {
    if (success) {
      rule.successCount++;
      rule.confidenceScore = Math.min(1.0, rule.confidenceScore + 0.05);
      rule.evidenceLevel++;
    } else {
      rule.failureCount++;
      rule.confidenceScore = Math.max(0.1, rule.confidenceScore - 0.1);
    }
    
    this.metrics.governanceOperations++;
  }

  public governRules(rules: EducationalKnowledgeRule[]): EducationalKnowledgeRule[] {
    let totalConfidence = 0;
    let trustedCount = 0;
    let experimentalCount = 0;
    let obsoleteCount = 0;

    for (const rule of rules) {
      const totalUses = rule.successCount + rule.failureCount;
      if (totalUses > 0) {
        rule.qualityScore = (rule.successCount / totalUses) * rule.confidenceScore;
      } else {
        rule.qualityScore = rule.confidenceScore * 0.5;
      }

      if (rule.confidenceScore < 0.3 || (totalUses > 5 && rule.successCount / totalUses < 0.4)) {
        rule.status = 'obsoleta';
      } else if (totalUses >= 3 && rule.successCount / totalUses >= 0.7 && rule.evidenceLevel > 2) {
        rule.status = 'estable';
      } else {
        rule.status = 'experimental';
      }

      rule.priority = rule.qualityScore * 10 + rule.support;

      totalConfidence += rule.confidenceScore;
      if (rule.status === 'estable') trustedCount++;
      if (rule.status === 'experimental') experimentalCount++;
      if (rule.status === 'obsoleta') obsoleteCount++;
    }

    if (rules.length > 0) {
      this.metrics.averageRuleConfidence = totalConfidence / rules.length;
      this.metrics.knowledgeQuality = (trustedCount / rules.length) * 100;
    }

    this.metrics.trustedRules = trustedCount;
    this.metrics.experimentalRules = experimentalCount;
    this.metrics.obsoleteRules = obsoleteCount;
    this.metrics.governanceScore = this.metrics.knowledgeQuality * 0.8 + (this.metrics.averageRuleConfidence * 20);

    this.metrics.governanceOperations++;

    return rules
      .filter(r => r.status !== 'obsoleta')
      .sort((a, b) => b.priority - a.priority);
  }
}

export const enterpriseKnowledgeGovernanceEngine = EnterpriseKnowledgeGovernanceEngine.getInstance();
