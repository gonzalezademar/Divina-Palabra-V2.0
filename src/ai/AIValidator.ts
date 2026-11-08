import { AIRequest } from './AIRequest';
import { AIResponse } from './AIResponse';
import { eventBus } from '@/services/eventBus';

export class AIValidator {
  public validateRequest(request: AIRequest): boolean {
    if (!request.prompt || request.prompt.trim() === '') {
      eventBus.emit('AI_VALIDATION_FAILED', { reason: 'Empty prompt' });
      return false;
    }
    // Implement token estimation, policy check, safety check here
    return true;
  }

  public validateResponse(response: AIResponse): boolean {
    if (!response.content || response.content.trim() === '') {
      eventBus.emit('AI_VALIDATION_FAILED', { reason: 'Empty response' });
      return false;
    }
    // Implement doctrinal profile, privacy, security checks here
    return true;
  }
}

export const aiValidator = new AIValidator();
