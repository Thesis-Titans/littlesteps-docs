@echo off
setlocal
where node >nul 2>nul
if errorlevel 1 (
  echo Error: Node.js 22+ is required. Install it with:
  echo   winget install OpenJS.NodeJS.LTS
  pause
  exit /b 1
)
node "%~dp0run-demo.mjs" %*
endlocal
