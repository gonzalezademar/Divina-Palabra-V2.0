import { ContentManifest } from '../content/ContentManifest';

export const baseManifest: ContentManifest = {
  id: 'base_catalog_v1',
  nombre: 'Catálogo Base Divina Palabra',
  versión: '1.0.0',
  autor: 'Divina Palabra Core Team',
  editor: 'Divina Palabra',
  idiomas: ['es', 'en'],
  perfilDoctrinal: ['universal'],
  fecha: new Date().toISOString(),
  dependencias: [],
  categorías: ['Biblia', 'General'],
  cantidadDesafíos: 100, // Approximate
  cantidadPreguntas: 50, // Approximate
  cantidadCampañas: 0,
  checksum: '00000000', // Auto-generated in a real system
  compatibilidadMínima: '1.0.0',
  compatibilidadMáxima: '2.0.0',
  estado: 'activo'
};
