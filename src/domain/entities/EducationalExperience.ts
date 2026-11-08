import { EducationalContext } from './EducationalContext';
import { EducationalDecision } from './EducationalDecision';

export interface ExperienceEvaluation {
  isEvaluated: boolean;
  qualityScore: number;
  reliabilityScore: number;
  successDegree: number;
  consistencyScore: number;
  stabilityScore: number;
  reuseCount: number;
}

export interface EducationalExperience {
  id: string;
  timestamp: number;
  studentId: string;
  contextUsed: EducationalContext;
  decisionTaken: EducationalDecision;
  confidenceLevel: number;
  expectedResult: string;
  observedResult?: string;
  consultedServices: string[];
  decisionVersion: string;
  evaluation?: ExperienceEvaluation;
}
