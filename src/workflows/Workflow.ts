import { WorkflowStep } from './WorkflowStep';

export type WorkflowStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled' | 'paused';

export interface Workflow {
  id: string;
  nombre: string;
  descripción: string;
  categoría: string;
  versión: string;
  estado: WorkflowStatus;
  prioridad: number;
  trigger: string;
  condiciones: (context: any) => boolean;
  pasos: WorkflowStep[];
  acciones: any[];
  rollback: boolean;
  timeout: number;
  reintentos: number;
  metadata: Record<string, any>;
}
