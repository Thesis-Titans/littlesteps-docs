import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import * as clack from '@clack/prompts';
import { EXIT_ERROR, EXIT_OK, IS_WSL, REPO_URLS } from '../lib/constants.mjs';
import { connectAndroidInteractive, detectAdbDevices, findAdbBin, isAdbServerHealthy } from '../lib/adb.mjs';
import { commandExists, installHint, runProbe } from '../lib/process.mjs';
import { c, isInteractiveTty, promptOrCancel, ui } from '../lib/ui.mjs';

export async function buildDoctorReport(ws) {
  const nodeMajor = Number(process.versions.node.split('.')[0]);
  const adbPath = findAdbBin();
  const checks = [
    {
      name: 'Node.js (>= 20)',
      ok: nodeMajor >= 20,
      detail: `v${process.versions.node}`,
      hint: installHint('node'),
      required: true,
    },
    {
      name: 'npm',
      ok: commandExists('npm'),
      detail: commandExists('npm') ? (runProbe('npm', ['-v']).stdout || '').trim() : 'not found',
      hint: installHint('node'),
      required: true,
    },
    {
      name: 'Java JDK (11+ for Firestore Emulator)',
      ok: commandExists('java'),
      detail: commandExists('java')
        ? (runProbe('java', ['-version']).stderr || runProbe('java', ['-version']).stdout || '').split(/\r?\n/)[0] ||
          'installed'
        : 'not found',
      hint: installHint('java'),
      required: true,
    },
    {
      name: 'Git',
      ok: commandExists('git'),
      detail: commandExists('git') ? (runProbe('git', ['--version']).stdout || '').trim() : 'not found',
      hint: installHint('git'),
      required: true,
    },
    {
      name: 'Flutter SDK (for Flutter / Android)',
      ok: commandExists('flutter'),
      detail: commandExists('flutter') ? 'installed' : 'not found',
      hint: installHint('flutter'),
      required: false,
    },
    {
      name: 'ADB (Android Debug Bridge)',
      ok: Boolean(adbPath),
      detail: adbPath || 'not found',
      hint: installHint('adb'),
      required: false,
    },
    {
      name: 'ADB Daemon Server',
      ok: Boolean(adbPath) && isAdbServerHealthy(),
      detail: isAdbServerHealthy() ? 'active on port 5037' : 'inactive (starts on demand)',
      hint: 'adb start-server',
      required: false,
    },
    {
      name: 'scrcpy (optional phone screen mirror)',
      ok: commandExists('scrcpy'),
      detail: commandExists('scrcpy') ? 'installed' : 'not installed',
      hint: installHint('scrcpy'),
      required: false,
    },
  ];

  const envPath = ws.apiDir ? path.join(ws.apiDir, '.env') : null;
  const geminiConfigured = Boolean(
    envPath && fs.existsSync(envPath) && /^GEMINI_API_KEY=\S+/m.test(fs.readFileSync(envPath, 'utf8'))
  );
  const catalogSeedReady = Boolean(
    ws.apiDir &&
      fs.existsSync(path.join(ws.apiDir, 'scripts', 'seed-catalog.mjs')) &&
      fs.existsSync(path.join(ws.apiDir, 'seed', 'catalog-activities.json'))
  );
  const devices = await detectAdbDevices();
  const ok = checks.every((check) => !check.required || check.ok);

  return {
    ok,
    platform: process.platform,
    arch: os.arch(),
    wsl: IS_WSL,
    workspaceRoot: ws.rootDir,
    checks,
    repositories: {
      api: ws.apiDir,
      react: ws.reactDir,
      flutter: ws.flutterDir,
    },
    catalogSeedReady,
    geminiConfigured,
    devices,
  };
}

export async function runDoctorCommand(ws, { json = false, noInput = false } = {}) {
  const report = await buildDoctorReport(ws);
  if (json) {
    console.log(JSON.stringify(report, null, 2));
    return report.ok ? EXIT_OK : EXIT_ERROR;
  }

  ui.intro('LittleSteps Setup Doctor');

  const envLines = [
    `Platform:       ${report.platform} (${report.arch})${report.wsl ? ' [WSL]' : ''}`,
    `Workspace Root: ${report.workspaceRoot}`,
  ];
  ui.note(envLines.join('\n'), 'Environment');

  const toolLines = report.checks.map((item) => {
    const tag = item.ok ? c.green('OK') : item.required ? c.red('MISSING') : c.yellow('OPTIONAL');
    const base = `[${tag}] ${item.name} — ${item.detail}`;
    return item.ok ? base : `${base}\n       Install: ${c.cyan(item.hint)}`;
  });
  ui.note(toolLines.join('\n'), 'Tool Prerequisites');

  const repoLines = [
    ['littlesteps-api', report.repositories.api, REPO_URLS.api],
    ['littlesteps-react', report.repositories.react, REPO_URLS.react],
    ['littlesteps-flutter', report.repositories.flutter, REPO_URLS.flutter],
  ].map(([label, dir, url]) =>
    dir ? `[${c.green('FOUND')}]   ${label} -> ${dir}` : `[${c.yellow('MISSING')}] ${label} -> git clone ${url}`
  );
  if (report.repositories.api) {
    repoLines.push(
      `[${report.catalogSeedReady ? c.green('READY') : c.yellow('MISSING')}] Firestore catalog_activities seed (scripts/seed-catalog.mjs)`
    );
    repoLines.push(
      `[${report.geminiConfigured ? c.green('LIVE AI') : c.yellow('FALLBACK')}] ${
        report.geminiConfigured
          ? 'GEMINI_API_KEY configured (Tier 1 Gemini enabled)'
          : 'No GEMINI_API_KEY in littlesteps-api/.env (Tier 3 deterministic fallback)'
      }`
    );
  }
  ui.note(repoLines.join('\n'), 'Repositories & Backend Readiness');

  const deviceLines =
    report.devices.length === 0
      ? [
          `[${c.yellow('NONE')}] No USB or Wireless ADB device detected`,
          ...(report.wsl
            ? [c.cyan("Tip: In WSL, use 'usbipd wsl attach' in Windows or 'adb connect <ip:port>'.")]
            : []),
        ]
      : report.devices.map((d) => `[${c.green('DEVICE')}] ${d.model} (${c.cyan(d.serial)})`);
  ui.note(deviceLines.join('\n'), 'Connected Android Devices');

  if (isInteractiveTty(noInput) && report.devices.length === 0 && findAdbBin()) {
    const wantConnect = await promptOrCancel(
      clack.confirm({
        message: 'No Android device detected. Connect or pair a phone via ADB now?',
        initialValue: false,
      })
    );
    if (wantConnect) {
      await connectAndroidInteractive();
    }
  }

  ui.outro(report.ok ? c.green('All required prerequisites are ready.') : c.red('Missing required prerequisites.'));
  return report.ok ? EXIT_OK : EXIT_ERROR;
}
