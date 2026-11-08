import { EducationalContext } from '../entities/EducationalContext';
import { EducationalDecision } from '../entities/EducationalDecision';
import { learningInterventionDomainService } from './LearningInterventionDomainService';
import { learningPredictionDomainService } from './LearningPredictionDomainService';
import { learningPersonalizationDomainService } from './LearningPersonalizationDomainService';
import { learningGoalsDomainService } from './LearningGoalsDomainService';
import { studentCognitiveModelDomainService } from './StudentCognitiveModelDomainService';
import { learningPlannerDomainService } from './LearningPlannerDomainService';
import { enterpriseEducationalKnowledgeEngine } from './EnterpriseEducationalKnowledgeEngine';

export class EducationalDecisionEngine {
  private static instance: EducationalDecisionEngine;
  private metrics = {
    decisionsMade: 0,
    conflictResolutions: 0,
    averageDecisionTime: 0
  };

  private constructor() {}

  static getInstance(): EducationalDecisionEngine {
    if (!EducationalDecisionEngine.instance) {
      EducationalDecisionEngine.instance = new EducationalDecisionEngine();
    }
    return EducationalDecisionEngine.instance;
  }

  public getMetrics() {
    return this.metrics;
  }

  public makeDecision(context: EducationalContext): EducationalDecision {
    const startTime = Date.now();
    this.metrics.decisionsMade++;
    const studentId = context.studentId;

    let decision: EducationalDecision | null = null;
    let source = '';
    let confidence = 0;

    const history = context.historyUsed;
    if (history && history.length > 0) {
      const latestProgress = history[history.length - 1];
      if (latestProgress.globalProgress > 80) {
        decision = {
          suggestedDifficulty: 'Avanzado',
          exerciseCount: 15,
          recommendedChallengeType: 'mixto',
          priorityTopics: [],
          reinforcementTopics: [],
          recommendedContentOrder: []
        };
        source = 'History';
        confidence = 0.9;
      }
    }

    if (!decision) {
      const activeObjectives = context.objectives;
      let topObjective = null;
      if (activeObjectives && activeObjectives.length > 0) {
        topObjective = activeObjectives.sort((a, b) => a.priority === 'High' ? -1 : 1)[0];
      }
      
      const strategy = context.strategies;
      
      if (topObjective) {
        decision = {
          suggestedDifficulty: 'Intermedio', 
          exerciseCount: 10, 
          recommendedChallengeType: 'mixto',
          priorityTopics: [],
          reinforcementTopics: [],
          recommendedContentOrder: [],
          activeObjective: topObjective.name,
          strategy: strategy ? strategy.name : 'N/A'
        };
        source = 'Objectives';
        confidence = 0.8;
      } else if (strategy && strategy.confidenceLevel > 0.6) {
        decision = {
          suggestedDifficulty: strategy.name === 'menor dificultad' ? 'Principiante' : 'Intermedio', 
          exerciseCount: strategy.name === 'sesiones cortas' ? 3 : 10, 
          recommendedChallengeType: strategy.name.includes('revisión') ? 'repaso' : 'mixto',
          priorityTopics: [],
          reinforcementTopics: [],
          recommendedContentOrder: [],
          strategy: strategy.name
        };
        source = 'Strategy';
        confidence = strategy.confidenceLevel;
      }
    }

    if (!decision) {
      const personalizedProfile = context.personalization;
      if (personalizedProfile && personalizedProfile.modelConfidenceLevel > 0.5) {
        learningPersonalizationDomainService.recordAdaptiveSession();
        const isWeak = personalizedProfile.weaknesses.length > 0;
        decision = {
          suggestedDifficulty: personalizedProfile.recommendedDifficulty, 
          exerciseCount: personalizedProfile.learningPace === 'Rápido' ? 15 : 8, 
          recommendedChallengeType: isWeak ? 'refuerzo' : 'mixto',
          priorityTopics: isWeak ? personalizedProfile.weaknesses : personalizedProfile.pendingCompetencies,
          reinforcementTopics: [],
          recommendedContentOrder: []
        };
        source = 'Personalization';
        confidence = personalizedProfile.modelConfidenceLevel;
      }
    }

    if (!decision) {
      const pendingInterventions = learningInterventionDomainService.getPendingInterventions(studentId);
      if (pendingInterventions.length > 0) {
        const highestPriority = pendingInterventions.sort((a, b) => a.priority === 'High' ? -1 : 1)[0];
        decision = {
          suggestedDifficulty: highestPriority.type === 'ReduceDifficulty' ? 'Principiante' : 'Intermedio', 
          exerciseCount: 5, 
          recommendedChallengeType: highestPriority.type === 'ReduceDifficulty' ? 'repaso' : 'mixto',
          priorityTopics: [],
          reinforcementTopics: [],
          recommendedContentOrder: []
        };
        source = 'Interventions';
        confidence = 0.95;
      }
    }

    if (!decision) {
      const riskAnalysis = context.predictions;
      if (riskAnalysis && riskAnalysis.requiresIntervention) {
        learningPredictionDomainService.recordIntervention();
        decision = {
          suggestedDifficulty: 'Principiante', 
          exerciseCount: 5, 
          recommendedChallengeType: 'repaso',
          priorityTopics: [],
          reinforcementTopics: [],
          recommendedContentOrder: []
        };
        source = 'RiskAnalysis';
        confidence = 0.9;
      }
    }

    if (!decision) {
      const currentPath = context.planning;
      if (currentPath) {
        decision = {
          suggestedDifficulty: currentPath.estimatedDifficulty, 
          exerciseCount: 15, 
          recommendedChallengeType: 'mixto',
          priorityTopics: currentPath.targetCompetencies,
          reinforcementTopics: [],
          recommendedContentOrder: currentPath.activities
        };
        source = 'Path';
        confidence = 0.85;
      }
    }

    if (!decision) {
      const competencies = context.competencies || [];
      const lowCompetencies = competencies.filter(c => c.masteryPercentage < 50);
      if (lowCompetencies.length > 0) {
        decision = {
          suggestedDifficulty: 'Principiante', 
          exerciseCount: 12, 
          recommendedChallengeType: 'refuerzo',
          priorityTopics: lowCompetencies.map(c => c.name),
          reinforcementTopics: [],
          recommendedContentOrder: []
        };
        source = 'Competencies';
        confidence = 0.75;
      }
    }

    if (!decision) {
      const activeGoals = learningGoalsDomainService.getActiveGoals(studentId);
      if (activeGoals.length > 0) {
        decision = {
          suggestedDifficulty: 'Intermedio', 
          exerciseCount: 15, 
          recommendedChallengeType: 'mixto',
          priorityTopics: [activeGoals[0].description], 
          reinforcementTopics: [],
          recommendedContentOrder: []
        };
        source = 'Goals';
        confidence = 0.7;
      }
    }

    if (!decision) {
      const bestStrategy = context.optimization;
      if (bestStrategy) {
        decision = {
          suggestedDifficulty: bestStrategy.suggestedDifficulty,
          exerciseCount: bestStrategy.exerciseCount,
          recommendedChallengeType: 'mixto',
          priorityTopics: [],
          reinforcementTopics: [],
          recommendedContentOrder: []
        };
        source = 'Optimization';
        confidence = bestStrategy.successProbability || 0.6;
      }
    }

    if (!decision) {
      const cognitiveModel = studentCognitiveModelDomainService.getCognitiveModel(studentId);
      if (cognitiveModel) {
        decision = {
          suggestedDifficulty: cognitiveModel.estimatedConfidence > 0.8 ? 'Avanzado' : 'Principiante',
          exerciseCount: cognitiveModel.successProbability > 0.6 ? 12 : 6,
          recommendedChallengeType: cognitiveModel.inferredLearningStyle,
          priorityTopics: cognitiveModel.reinforcementNeeds || [],
          reinforcementTopics: [],
          recommendedContentOrder: []
        };
        source = 'CognitiveModel';
        confidence = cognitiveModel.estimatedConfidence;
      }
    }

    if (!decision) {
      const plan = learningPlannerDomainService.getLearningPlan(studentId);
      if (plan) {
        decision = {
          suggestedDifficulty: plan.targetDifficulty,
          exerciseCount: plan.suggestedExerciseCount,
          recommendedChallengeType: plan.recommendedActivityType,
          priorityTopics: plan.priorityTopics,
          reinforcementTopics: plan.reinforcementTopics,
          recommendedContentOrder: plan.recommendedContentOrder
        };
        source = 'Planner';
        confidence = 0.8;
      }
    }

    if (!decision) {
      decision = {
        suggestedDifficulty: 'Principiante',
        exerciseCount: 10,
        recommendedChallengeType: 'mixto',
        priorityTopics: [],
        reinforcementTopics: [],
        recommendedContentOrder: []
      };
      source = 'Fallback';
      confidence = 0.1;
    }
    
    const learnedKnowledge = enterpriseEducationalKnowledgeEngine.applyKnowledge(studentId, context);
    if (learnedKnowledge) {
      decision = { ...decision, ...learnedKnowledge.action } as EducationalDecision;
      decision.appliedKnowledgeRuleId = learnedKnowledge.ruleId;
      source = 'KnowledgeEngine';
      confidence = Math.max(confidence, 0.85); 
    }

    decision!.decisionSource = source;
    decision!.confidenceScore = confidence;

    this.metrics.conflictResolutions++;
    const timeSpent = Date.now() - startTime;
    this.metrics.averageDecisionTime = (this.metrics.averageDecisionTime + timeSpent) / 2;

    return decision as EducationalDecision;
  }
}

export const educationalDecisionEngine = EducationalDecisionEngine.getInstance();
