import { EXIT_ERROR, EXIT_OK, EXIT_USAGE } from '../lib/constants.mjs';
import {
  buildAndInstallApk,
  connectAndroidInteractive,
  detectAdbDevices,
  ensureAdbServer,
  findAdbBin,
  launchAndroidApp,
  launchScrcpy,
} from '../lib/adb.mjs';
import { installHint, isValidFps, isValidHostPort, runSync, sleep } from '../lib/process.mjs';
import { ensureRequiredRepos } from '../lib/workspace.mjs';
import { c, createSpinner, isInteractiveTty, ui } from '../lib/ui.mjs';

async function resolveTargetSerial({ adb, device, wireless, noInput }) {
  if (wireless) {
    if (!isValidHostPort(wireless)) {
      ui.error('--wireless requires <ip:port> (e.g. 192.168.10.1:44775).');
      return { serial: '', exitCode: EXIT_USAGE };
    }
    runSync(adb, ['connect', wireless], { stdio: 'inherit' });
  }
  const devices = await detectAdbDevices();
  const serial = wireless || device || (devices[0]?.serial ?? '');
  if (serial) return { serial, exitCode: EXIT_OK };

  if (isInteractiveTty(noInput)) {
    const conn = await connectAndroidInteractive();
    if (conn.serial) return { serial: conn.serial, exitCode: EXIT_OK };
  }
  ui.error('No Android device detected via ADB.');
  ui.info('Connect a USB device or run: node scripts/demo-cli/run-demo.mjs android connect');
  return { serial: '', exitCode: EXIT_ERROR };
}

export async function runAndroidConnectCommand({ noInput = false } = {}) {
  ui.intro('Android ADB Connection Wizard');
  if (!isInteractiveTty(noInput)) {
    ui.error('android connect requires an interactive terminal.');
    return EXIT_USAGE;
  }
  const res = await connectAndroidInteractive();
  ui.outro(res.serial ? c.green(`Ready on ${res.serial}`) : 'No device connected.');
  return EXIT_OK;
}

export async function runAndroidRestartAdbCommand({ noInput = false } = {}) {
  const adb = findAdbBin();
  if (!adb) {
    ui.error(`ADB is not installed. Install with: ${installHint('adb')}`);
    return EXIT_ERROR;
  }
  ui.intro('Restart ADB Daemon');
  const s = createSpinner(noInput);
  s.start('Restarting ADB daemon...');
  await ensureAdbServer(true);
  await sleep(1000);
  const found = await detectAdbDevices(false);
  s.stop('ADB server restarted.');
  if (found.length > 0) {
    ui.note(found.map((d) => `• ${d.model} (${c.cyan(d.serial)})`).join('\n'), `Discovered ${found.length} Device(s)`);
  } else {
    ui.info('No devices currently detected.');
  }
  ui.outro(c.green('Done.'));
  return EXIT_OK;
}

export async function runAndroidApkCommand(
  ws,
  { env = 'local', device = '', wireless = '', mirror = false, alwaysOnTop = false, fps = '60', noInput = false } = {}
) {
  if (!['local', 'prod'].includes(env)) {
    ui.error(`Invalid --env value '${env}'. Expected 'local' or 'prod'.`);
    return EXIT_USAGE;
  }
  if (!isValidFps(fps)) {
    ui.error(`Invalid --fps value '${fps}'. Expected an integer between 15 and 240.`);
    return EXIT_USAGE;
  }

  ui.intro(`Build & Install Android APK (${env === 'prod' ? 'Live Firebase' : 'Local Emulator'})`);
  await ensureRequiredRepos(ws, { needApi: false, needFlutter: true, noInput });

  const adb = findAdbBin();
  if (!adb) {
    ui.error(`ADB is not installed. Install with: ${installHint('adb')}`);
    return EXIT_ERROR;
  }

  const resolved = await resolveTargetSerial({ adb, device, wireless, noInput });
  if (!resolved.serial) return resolved.exitCode;

  const result = buildAndInstallApk({
    adb,
    serial: resolved.serial,
    flutterDir: ws.flutterDir,
    envMode: env,
  });
  if (!result.ok) {
    ui.error(result.error);
    return EXIT_ERROR;
  }

  if (mirror || alwaysOnTop) {
    launchScrcpy({ serial: resolved.serial, fps, alwaysOnTop });
    ui.info('Press Ctrl+C to close scrcpy.');
    await new Promise(() => {});
  }

  ui.outro(c.green('APK ready on device.'));
  return EXIT_OK;
}

export async function runAndroidMirrorCommand({
  device = '',
  wireless = '',
  alwaysOnTop = false,
  fps = '60',
  noInput = false,
} = {}) {
  if (!isValidFps(fps)) {
    ui.error(`Invalid --fps value '${fps}'. Expected an integer between 15 and 240.`);
    return EXIT_USAGE;
  }
  ui.intro('Android Screen Mirror (scrcpy)');
  const adb = findAdbBin();
  if (!adb) {
    ui.error(`ADB is not installed. Install with: ${installHint('adb')}`);
    return EXIT_ERROR;
  }
  const resolved = await resolveTargetSerial({ adb, device, wireless, noInput });
  if (!resolved.serial) return resolved.exitCode;

  launchAndroidApp(adb, resolved.serial);
  const launched = launchScrcpy({ serial: resolved.serial, fps, alwaysOnTop });
  if (!launched) return EXIT_ERROR;

  ui.info('Press Ctrl+C to close scrcpy.');
  await new Promise(() => {});
  return EXIT_OK;
}
