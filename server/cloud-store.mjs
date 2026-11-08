// Exclusivo del servidor. Nunca importar desde componentes del navegador.
import { createHash } from 'node:crypto';

const unavailable = () => Object.assign(new Error('El servicio de guardado no está disponible. Tu trabajo anterior se conserva. Intenta de nuevo.'), { status: 503 });

export function createCloudStore({ url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SECRET_KEY, namespace = process.env.DP_STATE_ID, fetcher = fetch } = {}) {
  if (!url || !key || !namespace) throw unavailable();
  const base = new URL(url);
  if (base.protocol !== 'https:' || !/^[a-z0-9-]{1,80}$/.test(namespace)) throw unavailable();
  async function request(resource, body) {
    let response;
    try {
      response = await fetcher(`${base.origin}/rest/v1/${resource}`, {
        method: body === undefined ? 'GET' : 'POST',
        headers: { apikey: key, ...(key.startsWith('eyJ') ? { Authorization: `Bearer ${key}` } : {}), 'Content-Type': 'application/json' },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: AbortSignal.timeout(5000), cache: 'no-store'
      });
    } catch { throw unavailable(); }
    if (!response.ok) throw unavailable();
    try { return await response.json(); } catch { throw unavailable(); }
  }
  return {
    async load() {
      const rows = await request(`dp_state?id=eq.${encodeURIComponent(namespace)}&select=revision,value`);
      const row = rows?.[0];
      // No crear automáticamente un estado vacío cuando falta una configuración.
      if (!row || !Number.isSafeInteger(row.revision) || !['users','sessions','links','invites','pending','tasks','rooms','issues'].every(k => Array.isArray(row.value?.[k]))) throw unavailable();
      return row;
    },
    async commit(revision, value) {
      const result = await request('rpc/dp_commit_state', { p_id: namespace, p_revision: revision, p_value: value });
      if (typeof result !== 'boolean') throw unavailable();
      return result;
    },
    async rate(keyToLimit, maximum, duration) {
      const keyHash = createHash('sha256').update(`${namespace}:${keyToLimit}`).digest('hex');
      const allowed = await request('rpc/dp_take_rate', { p_key: keyHash, p_max: maximum, p_duration_ms: duration });
      if (typeof allowed !== 'boolean') throw unavailable();
      if (!allowed) throw Object.assign(new Error('Demasiados intentos. Espera un minuto y vuelve a intentarlo.'), { status: 429 });
    }
  };
}
