import { createService } from '../../../server/service.mjs';
import { createCloudStore } from '../../../server/cloud-store.mjs';

export const config = { api: { bodyParser: false, responseLimit: '8mb' } };
let service;

export default async function handler(req, res) {
  if (!service) {
    try {
      const origins = [process.env.APP_ORIGIN, process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`, process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`].filter(Boolean);
      if (!origins.length || origins.some(value => new URL(value).protocol !== 'https:')) throw new Error('Missing HTTPS origin');
      service = createService({ store: createCloudStore(), origin: origins[0], allowedOrigins: origins });
    } catch {
      res.setHeader('Cache-Control', 'no-store');
      res.status(503).json({ error: 'El servicio de cuentas todavía no está configurado. Intenta más tarde. Los datos existentes se conservan.' });
      return;
    }
  }
  await service.handleRequest(req, res);
}
