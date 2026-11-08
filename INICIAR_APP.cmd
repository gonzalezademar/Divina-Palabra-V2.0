@echo off
title Divina Palabra - servicio local
cd /d "%~dp0"
echo Abre http://127.0.0.1:3011/ cuando aparezca el aviso de disponibilidad.
echo Mantener esta ventana abierta conserva el servicio en funcionamiento.
node server/service.mjs
pause
