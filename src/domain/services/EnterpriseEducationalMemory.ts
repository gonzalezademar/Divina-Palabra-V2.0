import { EducationalExperience } from '../entities/EducationalExperience';
import { EducationalDecision } from '../entities/EducationalDecision';
import { EducationalContext } from '../entities/EducationalContext';

export class EnterpriseEducationalMemory {
  private static instance: EnterpriseEducationalMemory;
  private memory: Map<string, EducationalExperience[]> = new Map();
  
  private metrics = {
    storedExperiences: 0,
    queriesPerformed: 0,
    reuses: 0,
    successfulExperiences: 0,
    historicalSuccessRate: 0,
  };

  private constructor() {}

  static getInstance(): EnterpriseEducationalMemory {
    if (!EnterpriseEducationalMemory.instance) {
      EnterpriseEducationalMemory.instance = new EnterpriseEducationalMemory();
    }
    return EnterpriseEducationalMemory.instance;
  }

  public getMetrics() {
    return this.metrics;
  }

  public recordExperience(
    studentId: string,
    context: EducationalContext,
    decision: EducationalDecision,
    consultedServices: string[]
  ): string {
    const id = `exp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const experience: EducationalExperience = {
      id,
      timestamp: Date.now(),
      studentId,
      contextUsed: context,
      decisionTaken: decision,
      confidenceLevel: decision.confidenceScore || 0,
      expectedResult: 'Mejorar el dominio de competencias e involucramiento',
      consultedServices,
      decisionVersion: '1.0'
    };

    if (!this.memory.has(studentId)) {
      this.memory.set(studentId, []);
    }
    
    this.memory.get(studentId)!.push(experience);
    this.metrics.storedExperiences++;

    return id;
  }

  public findSimilarExperiences(studentId: string, difficulty: string, challengeType: string): EducationalExperience[] {
    this.metrics.queriesPerformed++;
    const studentExperiences = this.memory.get(studentId) || [];
    return studentExperiences.filter(exp => 
      exp.decisionTaken.suggestedDifficulty === difficulty &&
      exp.decisionTaken.recommendedChallengeType === challengeType
    );
  }

  public getAllExperiences(studentId: string): EducationalExperience[] {
    return this.memory.get(studentId) || [];
  }

  public recordObservedResult(studentId: string, experienceId: string, result: string, success: boolean): void {
    const studentExperiences = this.memory.get(studentId) || [];
    const exp = studentExperiences.find(e => e.id === experienceId);
    if (exp) {
      exp.observedResult = result;
      if (success) {
        this.metrics.successfulExperiences++;
      }
      this.updateHistoricalSuccessRate();
    }
  }
  
  public getStudentStatistics(studentId: string): any {
    const experiences = this.memory.get(studentId) || [];
    return {
      totalExperiences: experiences.length,
      averageConfidence: experiences.length > 0 
        ? experiences.reduce((acc, curr) => acc + curr.confidenceLevel, 0) / experiences.length 
        : 0,
      lastInteraction: experiences.length > 0 ? experiences[experiences.length - 1].timestamp : null
    };
  }

  public recordReuse(): void {
    this.metrics.reuses++;
  }

  private updateHistoricalSuccessRate(): void {
    const totalWithObserved = Array.from(this.memory.values())
      .flat()
      .filter(exp => exp.observedResult !== undefined).length;
      
    if (totalWithObserved > 0) {
      this.metrics.historicalSuccessRate = (this.metrics.successfulExperiences / totalWithObserved) * 100;
    }
  }
}

export const enterpriseEducationalMemory = EnterpriseEducationalMemory.getInstance();
