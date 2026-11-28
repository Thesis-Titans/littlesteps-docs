import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  EMULATOR_API_BASE,
  EMULATOR_HEALTH_URL,
  EMULATOR_PORTS,
  EMULATOR_PROJECT_ID,
  EXIT_ERROR,
  EXIT_OK,
  EXIT_USAGE,
  VALID_TARGETS,
} from '../lib/constants.mjs';
import {
  applyAdbReverse,
  buildAndInstallApk,
  detectAdbDevices,
  findAdbBin,
  launchAndroidApp,
  launchScrcpy,
} from '../lib/adb.mjs';
import {
  commandExists,
  getPortPids,
  httpOk,
  installHint,
  isValidDeviceSerial,
  isValidFps,
  isValidHostPort,
  killPort,
  openBrowser,
  runSync,
  shutdownManaged,
  sleep,
  spawnManaged,
  waitForHttp,
} from '../lib/process.mjs';
import { seedDemoData } from '../lib/seeder.mjs';
import { ensureRequiredRepos } from '../lib/workspace.mjs';
import { c, createSpinner, ui } from '../lib/ui.mjs';

const DESKTOP_OR_WEB_DEVICES = new Set(['web-server', 'chrome', 'linux', 'macos', 'windows']);

/**
 * Resolves whether to launch `flutter run` and which device target to use.
 * Prevents launching a debug `flutter run` onto an Android phone right after
 * installing and launching an arm64 APK onto that same device.
 */
export function resolveFlutterRunPlan({ target, device, androidSerial, installApkMode }) {
  if (target !== 'flutter' && target !== 'all') {
    return { shouldRunFlutter: false, flutterTargetDevice: null };
  }

  const requestedDevice = device || 'web-server';
  const installedApkOnRequestedDevice =
    installApkMode !== 'none' &&
    !DESKTOP_OR_WEB_DEVICES.has(requestedDevice) &&
    (!androidSerial || requestedDevice === androidSerial);

  if (installedApkOnRequestedDevice) {
    if (target === 'all') {
      return { shouldRunFlutter: true, flutterTargetDevice: 'web-server' };
    }
    return { shouldRunFlutter: false, flutterTargetDevice: null };
  }

  return { shouldRunFlutter: true, flutterTargetDevice: requestedDevice };
}

function scaffoldEnvFiles(ws) {
  const apiEnvPath = path.join(ws.apiDir, '.env');
  if (!fs.existsSync(apiEnvPath) && fs.existsSync(path.join(ws.apiDir, '.env.example'))) {
    fs.copyFileSync(path.join(ws.apiDir, '.env.example'), apiEnvPath);
  }
  if (ws.reactDir) {
    const reactEnvPath = path.join(ws.reactDir, '.env.local');
    if (!fs.existsSync(reactEnvPath)) {
      fs.writeFileSync(
        reactEnvPath,
        [
          `VITE_API_BASE_URL=${EMULATOR_API_BASE}`,
          'VITE_USE_FIREBASE_EMULATOR=true',
          `VITE_FIREBASE_PROJECT_ID=${EMULATOR_PROJECT_ID}`,
          'VITE_FIREBASE_API_KEY=demo-api-key',
          `VITE_FIREBASE_AUTH_DOMAIN=${EMULATOR_PROJECT_ID}.firebaseapp.com`,
          'VITE_FIREBASE_APP_ID=1:1234567890:web:demo',
          '',
        ].join('\n'),
        'utf8'
      );
    }
  }
  return apiEnvPath;
}

function loadApiEnv(apiEnvPath) {
  const extraEnv = { ...process.env };
  if (fs.existsSync(apiEnvPath)) {
    for (const line of fs.readFileSync(apiEnvPath, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
      if (m) extraEnv[m[1]] = m[2].trim().replace(/^['"]|['"]$/g, '');
    }
  }
  extraEnv.CORS_ORIGINS ||=
    'http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174,http://127.0.0.1:5174';
  return extraEnv;
}

export async function runStartCommand(ws, opts) {
  const target = opts.target || 'all';
  if (!VALID_TARGETS.includes(target)) {
    ui.error(`Invalid target '${target}'. Valid targets: ${VALID_TARGETS.join(', ')}`);
    return EXIT_USAGE;
  }
  if (opts.device && !isValidDeviceSerial(opts.device)) {
    ui.error('Invalid --device value. Provide a Flutter device (web-server, chrome, linux) or valid ADB serial.');
    return EXIT_USAGE;
  }
  if (opts.wireless && !isValidHostPort(opts.wireless)) {
    ui.error('Invalid --wireless address. Expected <ip:port> (e.g. 192.168.10.1:44775).');
    return EXIT_USAGE;
  }
  if (opts.scrcpyFps && !isValidFps(opts.scrcpyFps)) {
    ui.error('Invalid --scrcpy-fps value. Expected an integer between 15 and 240.');
    return EXIT_USAGE;
  }

  const installApkMode = opts.installApkMode || 'none';
  const adbReverse = Boolean(opts.adbReverse || target === 'android' || installApkMode === 'local');
  const startScrcpy = Boolean(opts.scrcpy || opts.alwaysOnTop);
  const scrcpyOnTop = Boolean(opts.alwaysOnTop);
  const scrcpyFps = String(opts.scrcpyFps || '60');
  const demoDataMode = opts.data || 'seeded';
  const dbMode = opts.db || 'persist';
  const persistMode = dbMode !== 'fresh';
  const resetDb = dbMode === 'reset' || Boolean(opts.resetDb);
  const openInBrowser = opts.browser !== false;
  const noInput = Boolean(opts.noInput);

  ui.intro(`LittleSteps Demo — ${target.toUpperCase()}`);

  if (!commandExists('java')) {
    ui.error('Java JDK (11+) is required by the Firebase Firestore Emulator.');
    ui.info(`Install with: ${installHint('java')}`);
    return EXIT_ERROR;
  }

  await ensureRequiredRepos(ws, {
    needApi: true,
    needReact: target === 'react' || target === 'all',
    needFlutter: target === 'flutter' || target === 'all' || installApkMode !== 'none',
    noInput,
  });

  // Install missing dependencies & compile TypeScript API
  if (!fs.existsSync(path.join(ws.apiDir, 'node_modules'))) {
    ui.step('Installing API dependencies...');
    if (runSync('npm', ['install'], { cwd: ws.apiDir, stdio: 'inherit' }).status !== 0) return EXIT_ERROR;
  }
  if ((target === 'react' || target === 'all') && !fs.existsSync(path.join(ws.reactDir, 'node_modules'))) {
    ui.step('Installing React dependencies...');
    if (runSync('npm', ['install'], { cwd: ws.reactDir, stdio: 'inherit' }).status !== 0) return EXIT_ERROR;
  }
  if ((target === 'flutter' || target === 'all') && !fs.existsSync(path.join(ws.flutterDir, '.dart_tool'))) {
    ui.step('Resolving Flutter packages...');
    if (runSync('flutter', ['pub', 'get'], { cwd: ws.flutterDir, stdio: 'inherit' }).status !== 0) return EXIT_ERROR;
  }

  ui.step('Building TypeScript API...');
  if (runSync('npm', ['run', 'build'], { cwd: ws.apiDir, stdio: 'inherit' }).status !== 0) {
    ui.error('API build failed.');
    return EXIT_ERROR;
  }

  const apiEnvPath = scaffoldEnvFiles(ws);

  const emuDataDir = path.join(ws.apiDir, 'emulator-data');
  if (resetDb && fs.existsSync(emuDataDir)) {
    fs.rmSync(emuDataDir, { recursive: true, force: true });
    ui.info('Cleared saved emulator-data directory.');
  }

  // Start Firebase Emulators
  const emulatorRunning = await httpOk(EMULATOR_HEALTH_URL);
  if (emulatorRunning) {
    ui.success('[Backend] Firebase Emulators already running.');
  } else {
    for (const p of EMULATOR_PORTS) killPort(p);
    const fbArgs = ['firebase', 'emulators:start', '--only', 'functions,auth,firestore', '--project', EMULATOR_PROJECT_ID];
    if (persistMode) {
      fs.mkdirSync(emuDataDir, { recursive: true });
      if (fs.existsSync(path.join(emuDataDir, 'firebase-export-metadata.json'))) {
        fbArgs.push('--import=./emulator-data');
      }
      fbArgs.push('--export-on-exit=./emulator-data');
    }

    const extraEnv = loadApiEnv(apiEnvPath);
    const logPath = path.join(os.tmpdir(), 'littlesteps-api-emulator.log');
    const logOut = fs.openSync(logPath, 'w');

    const spin = createSpinner(noInput);
    spin.start('Starting Firebase Emulators (Auth, Firestore, Functions)...');
    spawnManaged('npx', fbArgs, { cwd: ws.apiDir, env: extraEnv, stdio: ['ignore', logOut, logOut] });

    const ready = await waitForHttp(EMULATOR_HEALTH_URL, 45, 1000);
    if (!ready) {
      spin.stop('Firebase Emulators timed out.');
      ui.error(`Timed out waiting for Firebase Emulators. See ${logPath}`);
      shutdownManaged(EXIT_ERROR);
      return EXIT_ERROR;
    }
    spin.stop('Firebase Emulators ready.');
  }

  const seedConfig = await seedDemoData(ws, { mode: demoDataMode, seedFile: opts.seedFile || '' });

  let connectedAndroidSerial = '';

  // Android device setup
  if (adbReverse || installApkMode !== 'none' || startScrcpy) {
    const adb = findAdbBin();
    if (!adb) {
      ui.warn(`[Android] adb not found (${installHint('adb')}). Skipping Android setup.`);
    } else {
      if (opts.wireless) runSync(adb, ['connect', opts.wireless], { stdio: 'inherit' });
      const explicitSerial =
        opts.androidSerial ||
        (opts.device && !DESKTOP_OR_WEB_DEVICES.has(opts.device) ? opts.device : '');
      const devices = await detectAdbDevices();
      const serial = opts.wireless || explicitSerial || (devices[0]?.serial ?? '');

      if (!serial) {
        ui.warn('[Android] No Android device detected via ADB.');
        if (target === 'android') {
          ui.info('Connect a phone with: node scripts/demo-cli/run-demo.mjs android connect');
          shutdownManaged(EXIT_ERROR);
          return EXIT_ERROR;
        }
      } else {
        connectedAndroidSerial = serial;
        if (installApkMode !== 'none') {
          const apkRes = buildAndInstallApk({
            adb,
            serial,
            flutterDir: ws.flutterDir,
            envMode: installApkMode,
          });
          if (!apkRes.ok) {
            ui.error(apkRes.error);
            shutdownManaged(EXIT_ERROR);
            return EXIT_ERROR;
          }
        } else if (adbReverse) {
          applyAdbReverse(adb, serial);
        }

        if (startScrcpy) {
          if (installApkMode === 'none') launchAndroidApp(adb, serial);
          launchScrcpy({ serial, fps: scrcpyFps, alwaysOnTop: scrcpyOnTop });
        }
      }
    }
  }

  // Launch React Web Client
  if (target === 'react' || target === 'all') {
    if (await httpOk('http://127.0.0.1:5173')) {
      ui.success('[React] Already running on http://localhost:5173');
    } else {
      killPort(5173);
      const viteLogPath = path.join(os.tmpdir(), 'littlesteps-react-dev.log');
      const viteLog = fs.openSync(viteLogPath, 'w');
      const spin = createSpinner(noInput);
      spin.start('Starting React Web Client (Vite :5173)...');
      spawnManaged('npm', ['run', 'dev', '--', '--host', '127.0.0.1'], {
        cwd: ws.reactDir,
        stdio: ['ignore', viteLog, viteLog],
      });
      const viteReady = await waitForHttp('http://127.0.0.1:5173', 20, 1000);
      if (!viteReady) {
        spin.stop('Vite dev server failed.');
        ui.error(`[React] Failed to respond on :5173. See ${viteLogPath}`);
        shutdownManaged(EXIT_ERROR);
        return EXIT_ERROR;
      }
      spin.stop('React Web Client ready on http://localhost:5173');
    }
  }

  // Print clean summary note
  const { shouldRunFlutter, flutterTargetDevice } = resolveFlutterRunPlan({
    target,
    device: opts.device,
    androidSerial: connectedAndroidSerial,
    installApkMode,
  });
  const isFlutterWebServer = flutterTargetDevice === 'web-server';
  const androidStatusLine =
    connectedAndroidSerial && installApkMode !== 'none'
      ? `Android Device:       ${c.cyan(connectedAndroidSerial)} (APK launched)`
      : connectedAndroidSerial && adbReverse
        ? `Android Device:       ${c.cyan(connectedAndroidSerial)} (ADB reverse)`
        : '';
  const summaryLines = [
    ...(androidStatusLine ? [androidStatusLine] : []),
    ...(shouldRunFlutter
      ? [
          isFlutterWebServer
            ? `Flutter Web App:      ${c.cyan('http://localhost:5174')}`
            : `Flutter Target:       ${c.cyan(flutterTargetDevice)}`,
        ]
      : []),
    ...(target === 'react' || target === 'all' ? [`React Web Client:     ${c.cyan('http://localhost:5173')}`] : []),
    `Firebase Emulator UI: ${c.cyan('http://localhost:4000')}`,
    `Functions REST API:   ${c.cyan(EMULATOR_API_BASE)}`,
    ...(seedConfig?.caregiver
      ? [
          '',
          `Demo Login: ${c.bold(seedConfig.caregiver.email)} / ${c.bold(seedConfig.caregiver.password)}`,
          `Seed File:  ${c.dim(seedConfig.seedFilePath)}`,
        ]
      : []),
  ];
  ui.note(summaryLines.join('\n'), 'LittleSteps Services Running');

  // Launch Flutter in foreground when requested
  if (shouldRunFlutter) {
    const flutterArgs = isFlutterWebServer
      ? ['run', '-d', 'web-server', '--web-port=5174', '--web-hostname=0.0.0.0']
      : ['run', '-d', flutterTargetDevice];

    if (isFlutterWebServer) killPort(5174);
    const fl = spawnManaged('flutter', flutterArgs, {
      cwd: ws.flutterDir,
      stdio: 'inherit',
    });

    if (isFlutterWebServer && openInBrowser) {
      (async () => {
        for (let i = 0; i < 40; i++) {
          if (getPortPids(5174).length > 0) {
            openBrowser('http://localhost:5174');
            break;
          }
          await sleep(1000);
        }
      })();
    }

    fl.on('exit', () => shutdownManaged(EXIT_OK));
    await new Promise(() => {});
  } else {
    ui.info('Press Ctrl+C to stop all services cleanly.');
    await new Promise(() => {});
  }

  return EXIT_OK;
}
