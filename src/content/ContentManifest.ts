export interface ContentManifest {
  id: string;
  nombre: string;
  versión: string;
  autor: string;
  editor: string;
  idiomas: string[];
  perfilDoctrinal: string[];
  fecha: string;
  dependencias: string[];
  categorías: string[];
  cantidadDesafíos: number;
  cantidadPreguntas: number;
  cantidadCampañas: number;
  checksum: string;
  compatibilidadMínima: string;
  compatibilidadMáxima: string;
  estado: 'activo' | 'inactivo' | 'borrador' | 'obsoleto';
}
