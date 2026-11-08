export type IdentityType = 
  | 'Usuario'
  | 'Alumno'
  | 'Docente'
  | 'Padre'
  | 'Tutor'
  | 'Pastor'
  | 'Administrador Iglesia'
  | 'Administrador Plataforma'
  | 'Invitado'
  | 'Servicio';

export interface Identity {
  id: string;
  type: IdentityType;
  name: string;
  organizationId?: string;
  familyId?: string;
}

export class IdentityManager {
  private currentIdentity: Identity = { id: 'guest', type: 'Invitado', name: 'Guest User' };

  public getCurrentIdentity(): Identity {
    return this.currentIdentity;
  }

  public setIdentity(identity: Identity): void {
    this.currentIdentity = identity;
  }
}

export const identityManager = new IdentityManager();
