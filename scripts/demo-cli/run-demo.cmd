@echo off
setlocal
where node >nul 2>nul
if errorlevel 1 (
  echo Error: Node.js 20+ ^(22 LTS^) is required. Install it with:
  echo   winget install OpenJS.NodeJS.LTS
  pause
  exit /b 1
)
if not exist "%~dp0node_modules\commander" (
  echo Installing LittleSteps Demo CLI dependencies...
  pushd "%~dp0"
  call npm install --no-audit --no-fund
  popd
)
node "%~dp0run-demo.mjs" %*
endlocal
