export interface AIResponse {
  id: string;
  requestId: string;
  provider: string;
  content: string;
  tokensUsed?: number;
  durationMs: number;
  metadata?: any;
  timestamp: number;
}
