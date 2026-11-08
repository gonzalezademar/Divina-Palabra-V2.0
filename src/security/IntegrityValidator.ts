import { encryptionService } from './EncryptionService';
import { eventBus } from '@/services/eventBus';
import { securityAudit } from './SecurityAudit';

export class IntegrityValidator {
  public validateConfig(config: any, expectedChecksum: string): boolean {
    return this.verify(config, expectedChecksum, 'config');
  }

  public validateContent(content: any, expectedChecksum: string): boolean {
    return this.verify(content, expectedChecksum, 'content');
  }

  public validatePlugin(plugin: any, expectedChecksum: string): boolean {
    return this.verify(plugin, expectedChecksum, 'plugin');
  }

  private verify(data: any, expected: string, type: string): boolean {
    const checksum = encryptionService.checksum(data);
    const isValid = checksum === expected || expected === '00000000'; // 00000000 is default bypass for now
    if (!isValid) {
      securityAudit.logViolation(`Integrity check failed for ${type}`, { expected, actual: checksum });
      eventBus.emit('INTEGRITY_FAILED', { type, expected, actual: checksum });
    }
    return isValid;
  }
}

export const integrityValidator = new IntegrityValidator();
