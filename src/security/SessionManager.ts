import { eventBus } from '@/services/eventBus';

export interface Session {
  id: string;
  userId: string;
  type: 'local' | 'online' | 'offline';
  expiresAt: number;
}

export class SessionManager {
  private activeSessions: Map<string, Session> = new Map();

  public createSession(userId: string, type: 'local' | 'online' | 'offline' = 'local', ttl: number = 1000 * 60 * 60): Session {
    const session: Session = {
      id: `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      type,
      expiresAt: Date.now() + ttl
    };
    this.activeSessions.set(session.id, session);
    eventBus.emit('SESSION_CREATED', { sessionId: session.id, type });
    this.reportMetrics();
    return session;
  }

  public getSession(id: string): Session | null {
    const session = this.activeSessions.get(id);
    if (!session) return null;
    if (Date.now() > session.expiresAt) {
      this.activeSessions.delete(id);
      eventBus.emit('SESSION_EXPIRED', { sessionId: id });
      this.reportMetrics();
      return null;
    }
    return session;
  }

  public renew(id: string, ttl: number = 1000 * 60 * 60): void {
    const session = this.getSession(id);
    if (session) {
      session.expiresAt = Date.now() + ttl;
    }
  }

  public syncFuture(): void {
    // Logic for future sync
  }

  private reportMetrics(): void {
    eventBus.emit('PERFORMANCE_METRIC', { type: 'active_sessions', count: this.activeSessions.size });
  }
}

export const sessionManager = new SessionManager();
