import path from 'node:path';
import * as clack from '@clack/prompts';
import { EXIT_OK } from '../lib/constants.mjs';
import { connectAndroidInteractive, detectAdbDevices } from '../lib/adb.mjs';
import { commandExists } from '../lib/process.mjs';
import { c, promptOrCancel, ui } from '../lib/ui.mjs';
import { runAndroidApkCommand, runAndroidConnectCommand } from './android.mjs';
import { runDoctorCommand } from './doctor.mjs';
import { runStartCommand } from './start.mjs';

function buildOneLiner(scriptPath, opts) {
  const rel = path.relative(process.cwd(), scriptPath) || 'run-demo.mjs';
  if (opts.onlyProdApk) {
    const parts = [`node ${rel}`, 'android', 'apk', '--env', 'prod'];
    if (opts.device) parts.push('-d', opts.device);
    if (opts.alwaysOnTop) parts.push('--always-on-top');
    else if (opts.scrcpy) parts.push('--mirror');
    if ((opts.scrcpy || opts.alwaysOnTop) && opts.scrcpyFps !== '60') parts.push('--fps', opts.scrcpyFps);
    return parts.join(' ');
  }

  const parts = [`node ${rel}`, 'start', opts.target];
  if (opts.data === 'empty') parts.push('--data', 'empty');
  if (opts.db !== 'persist') parts.push('--db', opts.db);
  if (opts.adbReverse && opts.target !== 'android') parts.push('--adb-reverse');
  if (opts.wireless) parts.push('--wireless', opts.wireless);
  if (opts.installApkMode === 'local') parts.push('--install-apk', 'local');
  if (opts.installApkMode === 'prod') parts.push('--install-apk', 'prod');
  if (opts.alwaysOnTop) parts.push('--always-on-top');
  else if (opts.scrcpy) parts.push('--scrcpy');
  if ((opts.scrcpy || opts.alwaysOnTop) && opts.scrcpyFps !== '60') parts.push('--scrcpy-fps', opts.scrcpyFps);
  parts.push('--no-input');
  return parts.join(' ');
}

export async function runWizardCommand(ws, scriptPath) {
  ui.intro('LittleSteps Interactive Demo CLI');
  ui.info(`Workspace: ${c.dim(ws.rootDir)}`);

  const action = await promptOrCancel(
    clack.select({
      message: 'What would you like to do?',
      options: [
        { value: 'all', label: 'Start All', hint: 'Firebase Emulators + React Web + Flutter Web + Android' },
        { value: 'android', label: 'Start Android Demo', hint: 'Firebase Emulators + ADB reverse for physical phone' },
        { value: 'flutter', label: 'Start Flutter Web', hint: 'Firebase Emulators + Flutter Web (:5174)' },
        { value: 'react', label: 'Start React Web', hint: 'Firebase Emulators + React Web (:5173)' },
        { value: 'api', label: 'Start Backend Emulators Only', hint: 'Auth + Firestore + Functions + Catalog Seed' },
        { value: 'prod-apk', label: 'Build & Install Live-Firebase APK', hint: 'config/production.json (no local emulators)' },
        { value: 'doctor', label: 'Run Setup Doctor', hint: 'Check Node, Java, Flutter, ADB, repos & devices' },
        { value: 'connect', label: 'Connect / Pair Android Phone', hint: 'USB or Wireless Debugging' },
      ],
      initialValue: 'all',
    })
  );

  if (action === 'doctor') return runDoctorCommand(ws, { json: false, noInput: false });
  if (action === 'connect') return runAndroidConnectCommand({ noInput: false });

  if (action === 'prod-apk') {
    const mirror = commandExists('scrcpy')
      ? await promptOrCancel(
          clack.select({
            message: 'Mirror & control phone with scrcpy after installing?',
            options: [
              { value: 'no', label: 'No' },
              { value: 'standard', label: 'Yes — standard window' },
              { value: 'ontop', label: 'Yes — always-on-top (alongside slides)' },
            ],
            initialValue: 'no',
          })
        )
      : 'no';

    const fps =
      mirror !== 'no'
        ? await promptOrCancel(
            clack.select({
              message: 'Select scrcpy refresh rate:',
              options: [
                { value: '60', label: '60 fps', hint: 'balanced for USB & Wireless' },
                { value: '90', label: '90 fps', hint: 'smoother motion' },
                { value: '120', label: '120 fps', hint: 'best over USB' },
              ],
              initialValue: '60',
            })
          )
        : '60';

    const oneLiner = buildOneLiner(scriptPath, {
      onlyProdApk: true,
      scrcpy: mirror !== 'no',
      alwaysOnTop: mirror === 'ontop',
      scrcpyFps: fps,
    });
    ui.note(c.bold(oneLiner), 'Re-run Non-Interactively Next Time');

    return runAndroidApkCommand(ws, {
      env: 'prod',
      mirror: mirror !== 'no',
      alwaysOnTop: mirror === 'ontop',
      fps,
    });
  }

  const data = await promptOrCancel(
    clack.select({
      message: 'Demo data state?',
      options: [
        { value: 'seeded', label: 'Seeded demo family', hint: 'Firestore catalogs + seed/demo-family.json profiles' },
        { value: 'empty', label: 'Empty onboarding state', hint: 'Firestore catalogs + 0 children' },
      ],
      initialValue: 'seeded',
    })
  );

  const db = await promptOrCancel(
    clack.select({
      message: 'Emulator database persistence?',
      options: [
        { value: 'persist', label: 'Persistent', hint: 'keep changes between runs' },
        { value: 'fresh', label: 'Fresh in-memory', hint: 'resets on exit' },
        { value: 'reset', label: 'Reset saved database first', hint: 'wipe emulator-data, then persist' },
      ],
      initialValue: 'persist',
    })
  );

  const opts = {
    target: action,
    data,
    db,
    adbReverse: action === 'android',
    wireless: '',
    device: '',
    installApkMode: 'none',
    scrcpy: false,
    alwaysOnTop: false,
    scrcpyFps: '60',
  };

  const devices = await detectAdbDevices();
  if (action === 'all' || action === 'android' || devices.length > 0) {
    let selectedSerial = '';
    if (devices.length === 1) {
      selectedSerial = devices[0].serial;
      ui.success(`Detected Android device: ${devices[0].model} (${c.cyan(selectedSerial)})`);
    } else if (devices.length > 1) {
      selectedSerial = await promptOrCancel(
        clack.select({
          message: 'Select Android device:',
          options: devices.map((d) => ({ value: d.serial, label: d.model, hint: d.serial })),
        })
      );
    } else {
      ui.warn('No Android device detected via ADB.');
      const conn = await connectAndroidInteractive();
      selectedSerial = conn.serial;
      opts.wireless = conn.wirelessAddr;
    }

    if (selectedSerial) {
      opts.device = selectedSerial;
      opts.adbReverse = await promptOrCancel(
        clack.confirm({
          message: 'Forward local emulator ports (adb reverse 5001/9099) to phone?',
          initialValue: true,
        })
      );

      const apk = await promptOrCancel(
        clack.select({
          message: 'Build & install release APK onto phone?',
          options: [
            { value: 'none', label: 'No — keep installed APK' },
            { value: 'local', label: 'Yes — local-emulator APK', hint: 'config/local.device.json' },
            { value: 'prod', label: 'Yes — live-Firebase APK', hint: 'config/production.json' },
          ],
          initialValue: 'none',
        })
      );
      opts.installApkMode = apk;
      if (apk === 'local') opts.adbReverse = true;
      if (apk === 'prod') opts.adbReverse = false;

      if (commandExists('scrcpy')) {
        const sc = await promptOrCancel(
          clack.select({
            message: 'Mirror & control phone with scrcpy?',
            options: [
              { value: 'no', label: 'No' },
              { value: 'standard', label: 'Yes — standard window' },
              { value: 'ontop', label: 'Yes — always-on-top', hint: 'float alongside slides' },
            ],
            initialValue: 'no',
          })
        );
        if (sc !== 'no') {
          opts.scrcpy = true;
          opts.alwaysOnTop = sc === 'ontop';
          opts.scrcpyFps = await promptOrCancel(
            clack.select({
              message: 'Select scrcpy refresh rate:',
              options: [
                { value: '60', label: '60 fps', hint: 'balanced for USB & Wireless' },
                { value: '90', label: '90 fps', hint: 'smoother motion' },
                { value: '120', label: '120 fps', hint: 'best over USB' },
              ],
              initialValue: '60',
            })
          );
        }
      }
    }
  }

  ui.note(c.bold(buildOneLiner(scriptPath, opts)), 'Re-run Non-Interactively Next Time');
  await runStartCommand(ws, opts);
  return EXIT_OK;
}
