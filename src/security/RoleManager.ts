import { eventBus } from '@/services/eventBus';

export interface Role {
  id: string;
  name: string;
  parentRoleId?: string;
  temporaryUntil?: number;
}

export class RoleManager {
  private roles: Map<string, Role> = new Map();
  private userRoles: Map<string, Set<string>> = new Map(); // userId -> roleIds

  public registerRole(role: Role): void {
    this.roles.set(role.id, role);
    eventBus.emit('PERFORMANCE_METRIC', { type: 'role_count', count: this.roles.size });
  }

  public assignRole(userId: string, roleId: string): void {
    if (!this.userRoles.has(userId)) {
      this.userRoles.set(userId, new Set());
    }
    this.userRoles.get(userId)?.add(roleId);
    eventBus.emit('ROLE_CHANGED', { userId, roleId, action: 'assigned' });
  }

  public removeRole(userId: string, roleId: string): void {
    this.userRoles.get(userId)?.delete(roleId);
    eventBus.emit('ROLE_CHANGED', { userId, roleId, action: 'removed' });
  }

  public getRoles(userId: string): Role[] {
    const roleIds = this.userRoles.get(userId) || new Set();
    return Array.from(roleIds).map(id => this.roles.get(id)!).filter(Boolean);
  }
}

export const roleManager = new RoleManager();
