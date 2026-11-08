# Divina Palabra: servicio local y pruebas

Esta versión incorpora cuentas, entregas y encuentros reales mediante un servicio Node.js con SQLite. El catálogo se prepara a partir de los archivos bíblicos existentes. No se generan textos mediante modelos de lenguaje.

## Iniciar

Requiere Node.js 24.14 o posterior. Con la compilación `out` ya preparada, ejecutar `INICIAR_APP.cmd` o `npm run serve:local`. Abrir `http://127.0.0.1:3011/`. Cerrar el proceso detiene el servicio, pero conserva los datos.

Para recompilar: `npm ci`, `npm run build`. La comprobación de TypeScript forma parte de la compilación. No ejecutar `typecheck` mientras `build` regenera `.next/types`.

Las cuentas no son datos de demostración: se guardan en `var/divina.sqlite`. No versionar ni compartir esa carpeta. Las pruebas automatizadas utilizan bases separadas en carpetas temporales y cuentas ficticias. No copiar las bases de pruebas a producción.

## Dos dispositivos

Ambos deben acceder al MISMO servicio y usar cuentas distintas. `127.0.0.1` solo funciona en el equipo que ejecuta la app. Para teléfonos físicos hace falta una dirección de red común y HTTPS, especialmente para la cámara. No se configura automáticamente un túnel, dominio, firewall ni alojamiento público.

El servicio escucha por defecto únicamente en `127.0.0.1`. Para alojarlo detrás de un proxy HTTPS, configurar `HOST`, `PORT`, `APP_ORIGIN` (origen exacto, sin barra final) y opcionalmente `DP_DATABASE`. El proxy debe preservar las cookies y el origen. Con APP_ORIGIN HTTPS se emiten cookies Secure. No publicar directamente por HTTP.

## Recorridos

- Individual: Inicio → Actividades. No exige cuenta.
- Cuenta: Perfil → Entrar a mi cuenta → Crear cuenta. Guardar la clave de recuperación fuera de la app. No hay correo ni recuperación mediante el educador.
- Educador: activar herramientas; mostrar QR. El alumno confirma su solicitud; el educador compara el número y confirma. Leer un QR desde la cámara interna reserva dos minutos para confirmar aunque el QR cambie.
- Preparar tarea: título del catálogo, nivel, desafíos, destinatarios y vista previa. Cada destinatario recibe una copia privada. Los desafíos y respuestas no se editan.
- Alumno: Mis tareas → Abrir → Guardar o entregar. La confirmación depende de la respuesta del servidor. Los errores producen ayuda para repasar, sin notas.
- Educador: entregas agrupadas por tarea y fecha; devoluciones precargadas. Los borradores y el texto libre rechazado no se muestran al educador.
- Encuentros: vinculación de participantes por QR; preparar actividad; aceptación de la otra persona. Se aplican los mismos desafíos, nivel y cantidad a ambos. Sin reloj; se pausa el avance si falta la presencia del otro. Las reflexiones no tienen ganador.
- Desvincular: conserva tareas previas, detiene nuevos envíos y no restaura permisos sobre tareas antiguas al volver a vincular.

## Reglas y límites

No se guardan edades. Principiante, Intermedio y Avanzado son categorías de conocimiento estimado. No se certifica formación docente ni aprobación universal de comunidades evangélicas.

La corrección objetiva se calcula en el servidor; nunca acepta puntos del navegador. Las reflexiones son orientativas y no calificadas. En encuentros, revelar la solución impide sumar ese desafío; no se resta puntuación. Las respuestas textuales toleran tildes, mayúsculas y puntuación sin alterar la cita mostrada.

No hay buscador público, chat ni devoluciones libres. Las respuestas no reconocidas quedan privadas; los PDF de consulta se exportan manualmente y deben revisarse antes de compartirlos.

El almacenamiento del piloto usa un documento de estado dentro de SQLite y serializa las mutaciones. Es adecuado para pruebas pequeñas; no se ha certificado capacidad para uso masivo. Antes de crecer, separar entidades en tablas, paginar consultas, medir concurrencia y diseñar operación y copias de seguridad.

No se activa borrado automático por un plazo arbitrario. Siguen pendientes el plazo de conservación, el procedimiento de eliminación/exportación integral de cuentas, los países de publicación, responsables editoriales y permisos de reproducción. No se debe presentar este piloto como listo para publicación general.

Los códigos QR facilitan el uso presencial, pero no prueban presencia física ni identidad. Las reglas de autorización legal para publicación se revisan por separado; no se considera que omitir edades vuelva anónimas las cuentas.

## Verificar

`npm run test:service` comprueba las API con bases temporales: acceso, QR, recuperación, aislamiento, 20 alumnos, tareas y encuentros en seis modalidades y tres niveles. `npm run test:browser` usa Microsoft Edge instalado, recorridos de cuenta y ventanas independientes, y guarda capturas e informe. `npm run test:pressure` comprueba pausas, vencimiento del reloj, errores repetidos, omisiones y respuestas tardías. Los informes se guardan en `reports`; se puede elegir otra carpeta con `DP_TEST_OUTPUT`. El navegador automatizado no reemplaza pruebas con personas ni teléfonos físicos.

`node scripts/verify-expansion.cjs` verifica la rotación del catálogo. En una práctica individual completa de rosco hay 12 recorridos sin repetir respuestas; la primera repetición aparece en el 13. En reflexión, 90 casos permiten 18 recorridos de cinco sin repetición; el 19 comienza a repetir. Esto presupone historial conservado y no elegir repaso; no mide cuándo una persona memoriza o se aburre.
