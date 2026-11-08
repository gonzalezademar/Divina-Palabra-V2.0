import { AIRequest } from './AIRequest';
import { AIResponse } from './AIResponse';

export interface AIProvider {
  id: string;
  name: string;
  
  initialize(): Promise<void>;
  isAvailable(): Promise<boolean>;
  generate(request: AIRequest): Promise<AIResponse>;
  stream(request: AIRequest, onChunk: (chunk: string) => void): Promise<void>;
  embed(text: string): Promise<number[]>;
  moderate(text: string): Promise<boolean>;
  healthCheck(): Promise<boolean>;
  shutdown(): Promise<void>;
}
