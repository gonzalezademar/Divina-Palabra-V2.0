export interface EnterpriseResource {
  id: string;
  nombre: string;
  tipo: string;
  estado: 'ACTIVE' | 'INACTIVE' | 'IN_USE' | 'RELEASED' | 'ERROR';
  proveedor: string;
  usoActual: number;
  fechaCreacion: number;
  fechaUltimoAcceso: number;
  dependencias: string[];
  metadata: Record<string, any>;
}