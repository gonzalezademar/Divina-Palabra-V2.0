export type PolicyCategory = 
  | 'Educación' | 'Pedagogía' | 'Doctrina' | 'Seguridad' 
  | 'Privacidad' | 'Analytics' | 'Sincronización' | 'Aula Virtual' 
  | 'Gamificación' | 'Accesibilidad' | 'Plugins' | 'Diagnóstico' 
  | 'Performance' | 'Contenido' | 'Currículum' | 'IA futura';

export interface Policy {
  id: string;
  nombre: string;
  categoría: PolicyCategory;
  descripción: string;
  valor: any;
  tipo: 'boolean' | 'string' | 'number' | 'json';
  editable: boolean;
  prioridad: number;
  versión: string;
}

export const defaultPolicies: Policy[] = [
  {
    id: 'MAX_SYNC_RETRIES',
    nombre: 'Max Sync Retries',
    categoría: 'Sincronización',
    descripción: 'Maximum number of attempts to sync data to cloud',
    valor: 3,
    tipo: 'number',
    editable: true,
    prioridad: 10,
    versión: '1.0.0'
  },
  {
    id: 'TELEMETRY_RETENTION_DAYS',
    nombre: 'Telemetry Retention Days',
    categoría: 'Analytics',
    descripción: 'Number of days to keep telemetry locally',
    valor: 30,
    tipo: 'number',
    editable: true,
    prioridad: 5,
    versión: '1.0.0'
  },
  {
    id: 'REQUIRE_AGE_VERIFICATION',
    nombre: 'Require Age Verification',
    categoría: 'Seguridad',
    descripción: 'Forces users to verify age on first launch',
    valor: true,
    tipo: 'boolean',
    editable: false,
    prioridad: 100,
    versión: '1.0.0'
  },
  {
    id: 'STRICT_DOCTRINAL_FILTER',
    nombre: 'Strict Doctrinal Filter',
    categoría: 'Doctrina',
    descripción: 'Applies strict doctrinal filtering for content',
    valor: false,
    tipo: 'boolean',
    editable: true,
    prioridad: 50,
    versión: '1.0.0'
  }
];
