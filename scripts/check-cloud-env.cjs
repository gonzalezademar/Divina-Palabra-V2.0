// Un despliegue real no debe sustituir el sitio por una API sin almacenamiento.
// VERCEL=1 sin VERCEL_ENV se usa en CI para comprobar la compilación, sin publicar.
if (process.env.VERCEL === '1' && process.env.VERCEL_ENV) {
  const missing = ['SUPABASE_URL', 'SUPABASE_SECRET_KEY', 'DP_STATE_ID'].filter(key => !process.env[key]);
  if (missing.length) throw new Error(`Falta configurar el servidor antes de publicar: ${missing.join(', ')}`);
  const expected = process.env.VERCEL_ENV === 'production' ? 'production' : 'preview';
  if (process.env.DP_STATE_ID !== expected) throw new Error(`DP_STATE_ID debe ser ${expected} para este despliegue.`);
  if (!process.env.SUPABASE_URL.startsWith('https://')) throw new Error('SUPABASE_URL debe utilizar HTTPS.');
  if (expected === 'production' && !process.env.APP_ORIGIN?.startsWith('https://')) throw new Error('Configura APP_ORIGIN con la dirección HTTPS de producción.');
}
