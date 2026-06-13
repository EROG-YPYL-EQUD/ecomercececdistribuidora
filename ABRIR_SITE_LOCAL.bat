@echo off
title C ^& C Distribuidora - Site local
cd /d "%~dp0"
echo.
echo Iniciando o site local da C ^& C Distribuidora...
echo.
echo IMPORTANTE:
echo Use os enderecos localhost que vao abrir no navegador.
echo Assim o Admin alimenta a Loja no mesmo PC.
echo.
python servidor_local.py
if errorlevel 1 (
  echo.
  echo Python nao encontrado. Tentando com py...
  py servidor_local.py
)
pause
