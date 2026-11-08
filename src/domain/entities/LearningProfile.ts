export class LearningProfile {
  public strengths: string[] = [];
  public weaknesses: string[] = [];
  public averageTimePerResponse: number = 0;
  public accuracyPercentage: number = 0;
  public progressSpeed: number = 0;
  public masteredTopics: string[] = [];
  public weakTopics: string[] = [];
  public recommendedDifficulty: string = 'medium';

  constructor(public readonly id: string) {}
}