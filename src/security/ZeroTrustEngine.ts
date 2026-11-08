import { identityManager } from './IdentityManager';
import { permissionManager } from './PermissionManager';
import { roleManager } from './RoleManager';
import { sessionManager } from './SessionManager';
import { integrityValidator } from './IntegrityValidator';
import { securityAudit } from './SecurityAudit';
import { eventBus } from '@/services/eventBus';

export class ZeroTrustEngine {
  private static instance: ZeroTrustEngine;

  private constructor() {}

  static getInstance(): ZeroTrustEngine {
    if (!ZeroTrustEngine.instance) {
      ZeroTrustEngine.instance = new ZeroTrustEngine();
    }
    return ZeroTrustEngine.instance;
  }

  public verifyAccess(action: string, context?: any): boolean {
    eventBus.emit('SECURITY_CHECK', { action });

    const identity = identityManager.getCurrentIdentity();
    if (!identity) {
      securityAudit.logWarning('Access denied: No identity', { action });
      return false;
    }

    // In a real zero trust environment, we verify session validity
    // For now we assume true if it's the default guest or has a valid session.
    
    // Check roles and permissions
    const roles = roleManager.getRoles(identity.id);
    let hasPerm = false;
    
    if (identity.type === 'Invitado') {
      hasPerm = true; // By default guest can play locally
    } else {
      for (const role of roles) {
        if (permissionManager.check(role.id, action)) {
          hasPerm = true;
          break;
        }
      }
    }

    if (!hasPerm) {
      securityAudit.logWarning('Access denied: Insufficient permissions', { identity: identity.id, action });
      eventBus.emit('SECURITY_WARNING', { reason: 'Insufficient permissions', action });
    }

    this.updateSecurityScore();
    return hasPerm;
  }

  public validateSystemIntegrity(payload: { config?: any, content?: any }): void {
    if (payload.config) {
      integrityValidator.validateConfig(payload.config, '00000000');
    }
    if (payload.content) {
      integrityValidator.validateContent(payload.content, '00000000');
    }
    eventBus.emit('PERFORMANCE_METRIC', { type: 'integrity_status', status: 'valid' });
  }

  private updateSecurityScore(): void {
    // Mock algorithm for security score
    eventBus.emit('PERFORMANCE_METRIC', { type: 'security_score', score: 100 });
  }
}

export const zeroTrustEngine = ZeroTrustEngine.getInstance();
