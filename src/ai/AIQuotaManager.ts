export class AIQuotaManager {
  private requestsToday = 0;
  private requestsMonth = 0;
  private estimatedTokens = 0;
  private remainingBudget = 1000;

  public canMakeRequest(): boolean {
    return this.remainingBudget > 0;
  }

  public recordRequest(tokens: number = 100): void {
    this.requestsToday++;
    this.requestsMonth++;
    this.estimatedTokens += tokens;
    this.remainingBudget -= (tokens * 0.01);
  }

  public getStatus() {
    return {
      requestsToday: this.requestsToday,
      requestsMonth: this.requestsMonth,
      estimatedTokens: this.estimatedTokens,
      remainingBudget: this.remainingBudget
    };
  }
}

export const aiQuotaManager = new AIQuotaManager();
