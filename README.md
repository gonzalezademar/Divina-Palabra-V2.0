# Divina Palabra — Edición Bíblica

Herramienta de aprendizaje bíblico en español. Incluye seis actividades, tres niveles de conocimiento, tareas de Educador y encuentros entre dos participantes. Las vinculaciones se confirman por ambas personas; no hay chat ni mensajes privados.

## Ejecutar en la PC

Requiere Node.js 24.14 o posterior dentro de la versión 24.

```bash
npm ci
npm run build
npm run serve:local
```

Abrir http://127.0.0.1:3011. El servicio guarda cuentas, tareas y encuentros en `var/divina.sqlite`. Conservar una copia de ese archivo antes de cambiar de instalación. Los avances individuales guardados en el navegador pertenecen a ese navegador y dirección; cambiar de localhost a una dirección de Internet no los traslada automáticamente.

`npm run dev` inicia únicamente la interfaz para desarrollo. Para probar cuentas y Educador usar el servicio completo anterior.

## Preparación de Vercel y Supabase

El modo local conserva SQLite. En Vercel se compilan las páginas y la ruta de servidor `/api/*`; el estado se guarda en Supabase. Nunca se utiliza un SQLite temporal de Vercel para cuentas.

Proyecto de Supabase: `divina-palabra`, referencia `kavmowzllsqpzqsnhkme`, organización AG CREATIONS. El esquema del piloto está documentado en `server/cloud-schema.sql`. Su aplicación inicial crea espacios vacíos `production` y `preview`, sin reemplazar registros existentes.

Variables del servidor en el proyecto Vercel `divina-palabra`:

| Variable | Producción | Vista previa |
| --- | --- | --- |
| `SUPABASE_URL` | `https://kavmowzllsqpzqsnhkme.supabase.co` | Igual |
| `SUPABASE_SECRET_KEY` | Clave privada de servidor del proyecto | Clave privada de servidor del proyecto |
| `DP_STATE_ID` | `production` | `preview` |
| `APP_ORIGIN` | `https://divina-palabra.vercel.app` | No fijar: se usa `VERCEL_URL` |

Guardar `SUPABASE_SECRET_KEY` como secreto de Vercel, sin prefijo `NEXT_PUBLIC_`. Puede ser una clave `sb_secret_...` o la clave heredada `service_role`. No sirve una clave pública/anon. Nunca copiar claves al repositorio, al chat ni a archivos enviados al navegador.

Estado al 8 de noviembre de 2026: base y esquema creados; conexión privada pendiente por decisión del propietario. No se ha validado todavía la comunicación real de una función Vercel con Supabase. La compilación local en modo Vercel y las pruebas con almacenamiento simulado no reemplazan esa comprobación.

La conexión Git del proyecto Vercel debe comprobarse antes de publicar: apuntaba al repositorio anterior `gonzalezademarsr-lab/Divina-Palabra`. El código actual se mantiene en `gonzalezademar/Divina-Palabra-V2.0`. No asumir que un envío a este último actualiza el sitio anterior automáticamente.

Antes de promover la nueva versión:

1. Configurar la clave privada y comprobar la conexión del repositorio correcto.
2. Crear una vista previa protegida. Comprobar `/api/health` y cuentas, tareas, recuperación y encuentros con datos de prueba en `preview`.
3. Verificar guardado tras reiniciar una función y acceso desde dos dispositivos. Medir la demora real de Internet.
4. Publicar en producción manteniendo la protección de acceso existente. No promover si falta configuración o fallan las pruebas.

## Guardado y límites del piloto

Las tablas tienen RLS habilitado y no conceden lectura ni escritura a los roles públicos. Solo el servidor usa la clave privada. El aviso informativo de Supabase [RLS sin políticas](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy) es intencional: los usuarios del navegador no acceden directamente a estas tablas.

Se conserva el formato de estado de la instalación local, con revisión atómica para impedir que dos servidores sobrescriban cuentas o tareas. Los reintentos son limitados; un fallo no confirma un guardado ni entrega una cookie de sesión que no se haya persistido. Los límites de intentos se comparten entre servidores.

Este almacenamiento de estado completo es una transición para el piloto, no una arquitectura dimensionada para una publicación masiva. Antes de crecer: medir carga real, separar entidades en tablas, definir copias de seguridad y retención, y revisar capacidad y costos. `preview` es un espacio de pruebas compartido; no usar datos personales reales allí ni ejecutar pruebas destructivas simultáneas. La separación de espacios es funcional: una clave privada de servidor puede acceder a ambos.

La preparación técnica no certifica derechos de reproducción ni aprobación de todas las comunidades evangélicas. Mantener la revisión de contenido y permisos pendiente antes de abrir el acceso público.

## Verificación

```bash
npm run lint
npm run typecheck
npm run build
node --test tests/service.test.mjs tests/catalog-regression.mjs tests/continuity-service.mjs tests/reliability-service.mjs tests/cloud-service.test.mjs
npm run test:browser
```

La auditoría de navegador usa Edge y cuentas ficticias en una base temporal. Los informes se guardan en `reports/`, excluido de Git. Las pruebas de nube simulan instancias independientes y conflictos de revisión; deben complementarse con las comprobaciones reales de Vercel antes de publicar.
