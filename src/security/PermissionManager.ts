import { eventBus } from '@/services/eventBus';

export class PermissionManager {
  private permissions: Map<string, Set<string>> = new Map(); // roleId -> permissions

  public registerPermission(roleId: string, permission: string): void {
    if (!this.permissions.has(roleId)) {
      this.permissions.set(roleId, new Set());
    }
    this.permissions.get(roleId)?.add(permission);
  }

  public grant(roleId: string, permission: string): void {
    this.registerPermission(roleId, permission);
    eventBus.emit('PERMISSION_GRANTED', { roleId, permission });
  }

  public revoke(roleId: string, permission: string): void {
    this.permissions.get(roleId)?.delete(permission);
    eventBus.emit('PERMISSION_REVOKED', { roleId, permission });
  }

  public check(roleId: string, permission: string): boolean {
    eventBus.emit('PERFORMANCE_METRIC', { type: 'permission_checks' });
    return this.permissions.get(roleId)?.has(permission) ?? false;
  }

  public list(roleId: string): string[] {
    return Array.from(this.permissions.get(roleId) || []);
  }

  public inherit(targetRoleId: string, sourceRoleId: string): void {
    const sourcePerms = this.list(sourceRoleId);
    sourcePerms.forEach(p => this.grant(targetRoleId, p));
  }
}

export const permissionManager = new PermissionManager();
