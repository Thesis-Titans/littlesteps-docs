import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import * as clack from '@clack/prompts';
import { ANDROID_APP_ID, IS_WIN, IS_WSL } from './constants.mjs';
import {
  commandExists,
  installHint,
  isValidHostPort,
  runProbe,
  runSync,
  sleep,
  spawnManaged,
} from './process.mjs';
import { c, createSpinner, promptOrCancel, ui } from './ui.mjs';

export function findAdbBin() {
  if (commandExists('adb')) return 'adb';
  const candidates = IS_WIN
    ? [
        path.join(process.env.LOCALAPPDATA || '', 'Android', 'Sdk', 'platform-tools', 'adb.exe'),
        path.join(process.env.ANDROID_HOME || '', 'platform-tools', 'adb.exe'),
        path.join(process.env.ANDROID_SDK_ROOT || '', 'platform-tools', 'adb.exe'),
      ]
    : [
        path.join(process.env.ANDROID_HOME || '', 'platform-tools', 'adb'),
        path.join(process.env.ANDROID_SDK_ROOT || '', 'platform-tools', 'adb'),
        path.join(os.homedir(), 'Android', 'Sdk', 'platform-tools', 'adb'),
        path.join(os.homedir(), 'android-sdk', 'platform-tools', 'adb'),
        path.join(os.homedir(), 'Library', 'Android', 'sdk', 'platform-tools', 'adb'),
      ];
  for (const candidate of candidates) {
    if (candidate && fs.existsSync(candidate)) return candidate;
  }
  return null;
}

export function isAdbServerHealthy() {
  const adb = findAdbBin();
  if (!adb) return false;
  const probe = runProbe(adb, ['get-state'], 1500);
  return (
    probe.status === 0 ||
    (probe.stderr || '').includes('no devices') ||
    (probe.stderr || '').includes('device offline')
  );
}

/**
 * Asynchronously restarts or starts the ADB daemon without busy-waiting.
 */
export async function ensureAdbServer(forceRestart = false) {
  const adb = findAdbBin();
  if (!adb) return false;
  if (!forceRestart && isAdbServerHealthy()) return true;

  runProbe(adb, ['kill-server'], 2000);
  if (!IS_WIN) {
    const child = spawn(adb, ['server', 'nodaemon'], {
      detached: true,
      stdio: 'ignore',
      windowsHide: true,
    });
    child.unref();
  } else {
    runProbe(adb, ['start-server'], 3000);
  }

  for (let i = 0; i < 8; i++) {
    if (isAdbServerHealthy()) return true;
    await sleep(250);
  }
  return isAdbServerHealthy();
}

/**
 * Detects connected ADB devices deduplicated by model (USB > IP:port > mDNS).
 */
export async function detectAdbDevices(autoStart = true) {
  const adb = findAdbBin();
  if (!adb) return [];
  let res = runProbe(adb, ['devices', '-l'], 2500);
  if ((res.status !== 0 || res.error) && autoStart) {
    await ensureAdbServer(true);
    res = runProbe(adb, ['devices', '-l'], 2500);
  }
  if (res.status !== 0) return [];

  const byModel = new Map();
  for (const line of (res.stdout || '').split(/\r?\n/).slice(1)) {
    const parts = line.trim().split(/\s+/);
    if (parts.length < 2 || parts[1] !== 'device') continue;
    const serial = parts[0];
    const modelToken = parts.find((p) => p.startsWith('model:'));
    const model = modelToken ? modelToken.slice(6) : 'Android';
    let rank = 1; // USB
    if (serial.includes('_adb-tls-connect._tcp')) rank = 3;
    else if (/^\d+\.\d+\.\d+\.\d+:\d+$/.test(serial)) rank = 2;

    const existing = byModel.get(model);
    if (!existing || rank < existing.rank) {
      byModel.set(model, { serial, model, rank });
    }
  }
  return [...byModel.values()].sort((a, b) => a.rank - b.rank || a.model.localeCompare(b.model));
}

export async function connectAndroidInteractive() {
  const adb = findAdbBin();
  if (!adb) {
    ui.error(`ADB is not installed. Install with: ${installHint('adb')}`);
    return { serial: '', wirelessAddr: '' };
  }

  while (true) {
    const mode = await promptOrCancel(
      clack.select({
        message: 'How would you like to connect your Android phone?',
        options: [
          { value: 'usb', label: 'USB Cable', hint: 'plug in & scan' },
          { value: 'wireless', label: 'Wireless Debugging (connect)', hint: 'already paired IP:port' },
          { value: 'pair', label: 'Wireless Debugging (pair + connect)', hint: 'Android 11+ 6-digit code' },
          { value: 'restart', label: 'Restart ADB Server', hint: 'unfreeze stale USB/Wi-Fi sockets' },
          { value: 'skip', label: 'Skip for now' },
        ],
        initialValue: 'skip',
      })
    );

    if (mode === 'skip') return { serial: '', wirelessAddr: '' };

    if (mode === 'usb') {
      const checklist = [
        '• Connect phone via a USB data cable',
        '• Enable Settings → Developer options → USB debugging',
        '• Tap "Allow USB debugging" on your phone screen',
        ...(IS_WSL
          ? ['• WSL Notice: Run "usbipd wsl attach" in Windows PowerShell, or use Wireless Debugging instead.']
          : []),
      ].join('\n');
      ui.note(checklist, 'USB Setup Checklist');
      await promptOrCancel(clack.confirm({ message: 'Ready to scan for USB device?', initialValue: true }));
      const found = await detectAdbDevices();
      if (found.length > 0) {
        ui.success(`Connected: ${found[0].model} (${c.cyan(found[0].serial)})`);
        return { serial: found[0].serial, wirelessAddr: '' };
      }
      ui.warn('No device detected yet. Check the cable/prompt or try Restart ADB Server.');
      continue;
    }

    if (mode === 'restart') {
      const s = createSpinner();
      s.start('Restarting ADB daemon...');
      await ensureAdbServer(true);
      await sleep(1000);
      const found = await detectAdbDevices(false);
      s.stop(found.length > 0 ? `Discovered ${found[0].model} (${found[0].serial})` : 'ADB daemon restarted.');
      if (found.length > 0) {
        return { serial: found[0].serial, wirelessAddr: '' };
      }
      continue;
    }

    if (mode === 'pair') {
      ui.info('On phone: Settings → Developer options → Wireless debugging → Pair device with pairing code');
      const pairAddr = await promptOrCancel(
        clack.text({
          message: 'Pairing IP:port:',
          placeholder: '192.168.10.1:37123',
          validate: (v) => (!isValidHostPort(v.trim()) ? 'Enter valid IP:port (e.g. 192.168.10.1:37123)' : undefined),
        })
      );
      const pairCode = await promptOrCancel(
        clack.text({
          message: '6-digit Wi-Fi pairing code:',
          placeholder: '123456',
          validate: (v) => (!/^\d{6}$/.test(v.trim()) ? 'Enter the 6-digit pairing code' : undefined),
        })
      );
      runSync(adb, ['pair', pairAddr.trim(), pairCode.trim()], { stdio: 'inherit' });
    }

    if (mode === 'wireless' || mode === 'pair') {
      ui.info('On phone: Settings → Developer options → Wireless debugging (main screen IP & port)');
      const addr = await promptOrCancel(
        clack.text({
          message: 'Connect IP:port:',
          placeholder: '192.168.10.1:44775',
          validate: (v) => (!isValidHostPort(v.trim()) ? 'Enter valid IP:port (e.g. 192.168.10.1:44775)' : undefined),
        })
      );
      const trimmed = addr.trim();
      runSync(adb, ['connect', trimmed], { stdio: 'inherit' });
      const found = await detectAdbDevices();
      const matched = found.find((d) => d.serial === trimmed) || found[0];
      if (matched) {
        ui.success(`Connected: ${matched.model} (${c.cyan(matched.serial)})`);
        return { serial: matched.serial, wirelessAddr: trimmed };
      }
      ui.warn(`Could not verify connection to ${trimmed}. Check IP/port and Wi-Fi network.`);
    }
  }
}

export function applyAdbReverse(adb, serial) {
  runSync(adb, ['-s', serial, 'reverse', 'tcp:5001', 'tcp:5001']);
  runSync(adb, ['-s', serial, 'reverse', 'tcp:9099', 'tcp:9099']);
  ui.success(`[Android] ADB reverse active on ${serial} (ports 5001 & 9099).`);
}

export function clearAdbReverse(adb, serial) {
  runSync(adb, ['-s', serial, 'reverse', '--remove-all']);
}

export function launchAndroidApp(adb, serial) {
  runSync(adb, [
    '-s',
    serial,
    'shell',
    'monkey',
    '-p',
    ANDROID_APP_ID,
    '-c',
    'android.intent.category.LAUNCHER',
    '1',
  ]);
}

/**
 * Validates the target dart-define config file, builds the arm64 release APK,
 * installs it on the given ADB serial, and launches the app.
 */
export function buildAndInstallApk({ adb, serial, flutterDir, envMode }) {
  const cfgRelPath = envMode === 'prod' ? 'config/production.json' : 'config/local.device.json';
  const cfgFullPath = path.join(flutterDir, cfgRelPath);
  if (!fs.existsSync(cfgFullPath)) {
    const exampleHint =
      envMode === 'prod'
        ? `Copy config/production.example.json to config/production.json and fill in your live API_BASE_URL & FIREBASE_API_KEY.`
        : `Ensure ${cfgRelPath} exists in ${flutterDir}.`;
    return { ok: false, error: `Missing Flutter build config: ${cfgFullPath}\n${exampleHint}` };
  }

  const buildMode = envMode === 'prod' ? 'release' : 'profile';
  ui.step(`[Android] Building arm64 ${buildMode} APK (${cfgRelPath})...`);
  const built = runSync(
    'flutter',
    ['build', 'apk', `--${buildMode}`, '--target-platform', 'android-arm64', `--dart-define-from-file=${cfgRelPath}`],
    { cwd: flutterDir, stdio: 'inherit' }
  );
  if (built.status !== 0) {
    return { ok: false, error: `Flutter ${buildMode} APK build failed.` };
  }

  const apkPath = path.join(flutterDir, 'build', 'app', 'outputs', 'flutter-apk', `app-${buildMode}.apk`);
  ui.step(`[Android] Installing APK onto ${serial}...`);
  const installed = runSync(adb, ['-s', serial, 'install', '-r', apkPath], { stdio: 'inherit' });
  if (installed.status !== 0) {
    return { ok: false, error: `Failed to install APK on ${serial}.` };
  }

  if (envMode === 'prod') {
    clearAdbReverse(adb, serial);
  } else {
    applyAdbReverse(adb, serial);
  }
  launchAndroidApp(adb, serial);
  ui.success(`[Android] Installed and launched (${envMode === 'prod' ? 'live Firebase' : 'local emulator'}).`);
  return { ok: true };
}

export function launchScrcpy({ serial, fps = '60', alwaysOnTop = false }) {
  if (!commandExists('scrcpy')) {
    ui.warn(`[Android] scrcpy is not installed. Install with: ${installHint('scrcpy')}`);
    return false;
  }
  const scArgs = [
    '-s',
    serial,
    '--window-title',
    'LittleSteps — Android',
    '--stay-awake',
    `--max-fps=${fps}`,
    '--max-size=1080',
    '--video-bit-rate=12M',
    '--video-codec=h264',
    '--no-audio',
  ];
  if (alwaysOnTop) scArgs.push('--always-on-top');
  const logPath = path.join(os.tmpdir(), 'littlesteps-scrcpy.log');
  const scLog = fs.openSync(logPath, 'w');
  spawnManaged('scrcpy', scArgs, { stdio: ['ignore', scLog, scLog] });
  ui.success(`[Android] scrcpy launched (${fps} fps, 1080p) for ${serial}.`);
  return true;
}
