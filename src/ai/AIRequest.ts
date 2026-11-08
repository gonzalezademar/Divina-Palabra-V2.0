export interface AIRequest {
  id: string;
  provider?: string;
  prompt: string;
  context?: any;
  parameters?: {
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    [key: string]: any;
  };
  timestamp: number;
}
