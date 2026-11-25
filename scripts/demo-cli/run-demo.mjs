#!/usr/bin/env node
/**
 * LittleSteps Cross-Platform Demo CLI
 *
 * Zero-dependency Node.js 20+/22 orchestrator for Windows, macOS, Linux, and WSL.
 * - Preflight setup doctor (--doctor) with OS-specific install hints
 * - Dynamic workspace discovery (supports custom paths & both Flutter repo names)
 * - Firebase Emulators (Auth, Firestore, Functions), React Web, Flutter Web
 * - Smart deduplicated ADB detection, release APK build/install, and scrcpy mirroring
 */

import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import readline from 'node:readline/promises';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IS_WIN = process.platform === 'win32';
const IS_MAC = process.platform === 'darwin';
const IS_WSL = !IS_WIN && fs.existsSync('/proc/version') &&
  fs.readFileSync('/proc/version', 'utf8').toLowerCase().includes('microsoft');

const C = {
  bold: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
};

const DEMO_PORTS = [
  { port: 5174, label: 'Flutter Web Client' },
  { port: 5173, label: 'React Web Client' },
  { port: 4000, label: 'Firebase Emulator UI' },
  { port: 5001, label: 'API Functions' },
  { port: 8080, label: 'Firestore Emulator' },
  { port: 9099, label: 'Auth Emulator' },
];

const REPO_URLS = {
  api: 'https://github.com/Thesis-Titans/littlesteps-api.git',
  react: 'https://github.com/Thesis-Titans/littlesteps-react.git',
  flutter: 'https://github.com/Thesis-Titans/CC-207B_26-27_Final-Project.git',
};

const managedChildren = [];
let shuttingDown = false;

// ---------------------------------------------------------------------------
// Cross-Platform Process Helpers (Node 22+ CVE-2024-27980 compliant)
// ---------------------------------------------------------------------------
function runSync(cmd, args = [], opts = {}) {
  return spawnSync(cmd, args, {
    encoding: 'utf8',
    shell: IS_WIN,
    windowsHide: true,
    ...opts,
  });
}

function runProbe(cmd, args = [], timeoutMs = 4000) {
  return spawnSync(cmd, args, {
    encoding: 'utf8',
    shell: IS_WIN,
    windowsHide: true,
    timeout: timeoutMs,
  });
}

function spawnManaged(cmd, args = [], opts = {}) {
  const child = spawn(cmd, args, {
    shell: IS_WIN,
    windowsHide: false,
    ...opts,
  });
  managedChildren.push(child);
  return child;
}

function commandExists(name) {
  const probe = IS_WIN ? runProbe('where', [name]) : runProbe('which', [name]);
  return probe.status === 0 && (probe.stdout || '').trim().length > 0;
}

function findAdbBin() {
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

function getPortPids(port) {
  try {
    if (IS_WIN) {
      const res = runProbe('netstat', ['-ano']);
      if (res.status !== 0) return [];
      const pids = new Set();
      for (const line of (res.stdout || '').split(/\r?\n/)) {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 5 && parts[1].endsWith(`:${port}`) && parts[3] === 'LISTENING') {
          if (parts[4] && parts[4] !== '0') pids.add(parts[4]);
        }
      }
      return [...pids];
    }
    if (commandExists('lsof')) {
      const res = runProbe('lsof', ['-n', '-P', '-i', `:${port}`, '-sTCP:LISTEN', '-t']);
      return (res.stdout || '').split(/\s+/).filter(Boolean);
    }
    if (commandExists('ss')) {
      const res = runProbe('ss', ['-tlpn', `sport = :${port}`]);
      const matches = [...(res.stdout || '').matchAll(/pid=(\d+)/g)];
      return [...new Set(matches.map((m) => m[1]))];
    }
  } catch {
    // Ignore port probe errors
  }
  return [];
}

function killPort(port) {
  const pids = getPortPids(port);
  for (const pid of pids) {
    if (IS_WIN) {
      runSync('taskkill', ['/PID', pid, '/T', '/F']);
    } else {
      try {
        process.kill(Number(pid), 'SIGTERM');
      } catch {
        // Ignore already-exited PID
      }
    }
  }
  if (!IS_WIN && pids.length > 0) {
    const remaining = getPortPids(port);
    for (const pid of remaining) {
      try {
        process.kill(Number(pid), 'SIGKILL');
      } catch {
        // Ignore
      }
    }
  }
}

async function httpOk(url, timeoutMs = 2000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

function openBrowser(url) {
  if (IS_WIN) {
    spawn('cmd', ['/c', 'start', '', url], { detached: true, stdio: 'ignore' }).unref();
  } else if (IS_WSL) {
    spawn('/mnt/c/Windows/System32/cmd.exe', ['/c', 'start', '', url], {
      detached: true,
      stdio: 'ignore',
    }).unref();
  } else if (IS_MAC) {
    spawn('open', [url], { detached: true, stdio: 'ignore' }).unref();
  } else if (commandExists('xdg-open')) {
    spawn('xdg-open', [url], { detached: true, stdio: 'ignore' }).unref();
  }
}

// ---------------------------------------------------------------------------
// Dynamic Workspace Discovery (Zero Hardcoded Paths)
// ---------------------------------------------------------------------------
function resolveWorkspace() {
  const scriptWorkspaceGuess = path.resolve(__dirname, '..', '..', '..');
  const cwd = process.cwd();
  const candidates = [
    process.env.LITTLESTEPS_ROOT,
    cwd,
    path.dirname(cwd),
    scriptWorkspaceGuess,
  ].filter(Boolean);

  let rootDir = scriptWorkspaceGuess;
  for (const dir of candidates) {
    if (
      fs.existsSync(path.join(dir, 'littlesteps-api')) ||
      fs.existsSync(path.join(dir, 'littlesteps-react')) ||
      fs.existsSync(path.join(dir, 'littlesteps-flutter')) ||
      fs.existsSync(path.join(dir, 'CC-207B_26-27_Final-Project'))
    ) {
      rootDir = dir;
      break;
    }
  }

  const apiDir =
    process.env.LITTLESTEPS_API_DIR ||
    (fs.existsSync(path.join(rootDir, 'littlesteps-api', 'package.json'))
      ? path.join(rootDir, 'littlesteps-api')
      : null);

  const reactDir =
    process.env.LITTLESTEPS_REACT_DIR ||
    (fs.existsSync(path.join(rootDir, 'littlesteps-react', 'package.json'))
      ? path.join(rootDir, 'littlesteps-react')
      : null);

  const flutterCandidates = [
    process.env.LITTLESTEPS_FLUTTER_DIR,
    path.join(rootDir, 'littlesteps-flutter', 'BSIT-3A', 'LittleSteps'),
    path.join(rootDir, 'CC-207B_26-27_Final-Project', 'BSIT-3A', 'LittleSteps'),
    path.join(rootDir, 'LittleSteps'),
  ].filter(Boolean);

  let flutterDir = null;
  for (const fc of flutterCandidates) {
    if (fs.existsSync(path.join(fc, 'pubspec.yaml'))) {
      flutterDir = fc;
      break;
    }
  }

  return { rootDir, apiDir, reactDir, flutterDir };
}

// ---------------------------------------------------------------------------
// Smart Deduplicated ADB Detection (prefers USB > IP:port > mDNS)
// ---------------------------------------------------------------------------
function detectAdbDevices() {
  const adb = findAdbBin();
  if (!adb) return [];
  const res = runProbe(adb, ['devices', '-l'], 3000);
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

// ---------------------------------------------------------------------------
// Preflight Setup Doctor (--doctor)
// ---------------------------------------------------------------------------
function installHint(tool) {
  const hints = {
    node: IS_WIN
      ? 'winget install OpenJS.NodeJS.LTS'
      : IS_MAC
      ? 'brew install node@22'
      : 'sudo apt install nodejs npm',
    java: IS_WIN
      ? 'winget install EclipseAdoptium.Temurin.21.JDK'
      : IS_MAC
      ? 'brew install --cask temurin@21'
      : 'sudo apt install openjdk-21-jdk',
    git: IS_WIN ? 'winget install Git.Git' : IS_MAC ? 'brew install git' : 'sudo apt install git',
    flutter: 'https://docs.flutter.dev/get-started/install',
    adb: IS_WIN
      ? 'Install Android Studio SDK Platform-Tools (auto-detected in %LOCALAPPDATA%\\Android\\Sdk\\platform-tools)'
      : IS_MAC
      ? 'brew install --cask android-platform-tools'
      : 'sudo apt install android-tools-adb',
    scrcpy: IS_WIN
      ? 'winget install Genymobile.scrcpy'
      : IS_MAC
      ? 'brew install scrcpy'
      : 'sudo apt install scrcpy',
  };
  return hints[tool] || '';
}

function runDoctor(ws) {
  console.log(`${C.bold}${C.cyan}LittleSteps Setup Doctor${C.reset}\n`);
  console.log(`${C.bold}Platform:${C.reset} ${process.platform} (${os.arch()})${IS_WSL ? ' [WSL]' : ''}`);
  console.log(`${C.bold}Workspace Root:${C.reset} ${ws.rootDir}\n`);

  const nodeMajor = Number(process.versions.node.split('.')[0]);
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
      detail: commandExists('npm') ? (runSync('npm', ['-v']).stdout || '').trim() : 'not found',
      hint: installHint('node'),
      required: true,
    },
    {
      name: 'Java JDK (11+ for Firestore Emulator)',
      ok: commandExists('java'),
      detail: commandExists('java')
        ? ((runSync('java', ['-version']).stderr || runSync('java', ['-version']).stdout || '').split(/\r?\n/)[0] || 'installed')
        : 'not found',
      hint: installHint('java'),
      required: true,
    },
    {
      name: 'Git',
      ok: commandExists('git'),
      detail: commandExists('git') ? (runSync('git', ['--version']).stdout || '').trim() : 'not found',
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
      ok: Boolean(findAdbBin()),
      detail: findAdbBin() || 'not found',
      hint: installHint('adb'),
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

  console.log(`${C.bold}Tool Prerequisites:${C.reset}`);
  let missingRequired = 0;
  for (const c of checks) {
    const tag = c.ok ? `${C.green}OK${C.reset}` : c.required ? `${C.red}MISSING${C.reset}` : `${C.yellow}OPTIONAL${C.reset}`;
    console.log(`  [${tag}] ${c.name} — ${c.detail}`);
    if (!c.ok) {
      if (c.required) missingRequired++;
      console.log(`         Install: ${C.cyan}${c.hint}${C.reset}`);
    }
  }

  console.log(`\n${C.bold}Repositories:${C.reset}`);
  for (const [label, dir, url] of [
    ['littlesteps-api', ws.apiDir, REPO_URLS.api],
    ['littlesteps-react', ws.reactDir, REPO_URLS.react],
    ['littlesteps-flutter', ws.flutterDir, REPO_URLS.flutter],
  ]) {
    if (dir) {
      console.log(`  [${C.green}FOUND${C.reset}] ${label} -> ${dir}`);
    } else {
      console.log(`  [${C.yellow}MISSING${C.reset}] ${label} -> git clone ${url}`);
    }
  }

  if (ws.apiDir) {
    const envPath = path.join(ws.apiDir, '.env');
    const hasGemini = fs.existsSync(envPath) && /^GEMINI_API_KEY=\S+/m.test(fs.readFileSync(envPath, 'utf8'));
    console.log(
      `\n${C.bold}AI Mode:${C.reset} ${
        hasGemini
          ? `${C.green}GEMINI_API_KEY configured (Tier 1 live AI enabled)${C.reset}`
          : `${C.yellow}No GEMINI_API_KEY in littlesteps-api/.env (Tier 3 deterministic catalog fallback will be used)${C.reset}`
      }`
    );
  }

  const devices = detectAdbDevices();
  console.log(`\n${C.bold}Connected Android Devices:${C.reset}`);
  if (devices.length === 0) {
    console.log(`  [${C.yellow}NONE${C.reset}] No USB or Wireless ADB device detected`);
  } else {
    for (const d of devices) {
      console.log(`  [${C.green}DEVICE${C.reset}] ${d.model} (${C.cyan}${d.serial}${C.reset})`);
    }
  }

  return missingRequired === 0;
}

// ---------------------------------------------------------------------------
// Usage & CLI Argument Parsing
// ---------------------------------------------------------------------------
function printUsage() {
  console.log(`${C.bold}Usage:${C.reset} node run-demo.mjs [target] [options]\n`);
  console.log('Run with no arguments in a terminal to launch the interactive setup wizard.\n');
  console.log(`${C.bold}Targets:${C.reset}`);
  console.log('  --all                Firebase Emulators + React Web + Flutter Web');
  console.log('  --android            Firebase Emulators + ADB reverse for physical Android phone');
  console.log('  --flutter            Firebase Emulators + Flutter Web');
  console.log('  --react              Firebase Emulators + React Web');
  console.log('  --api                Firebase Emulators only\n');
  console.log(`${C.bold}Options:${C.reset}`);
  console.log('  --doctor             Check prerequisites, workspace repos, and ADB devices');
  console.log('  -i, --interactive    Launch interactive setup wizard');
  console.log('  --no-input           Disable interactive prompts (for scripts/CI)');
  console.log('  --adb-reverse        Forward local emulator ports (5001, 9099) to Android phone');
  console.log('  --wireless <ip:port> Connect to Android Wireless Debugging target');
  console.log('  --install-apk        Build & install local-emulator release APK (config/local.device.json)');
  console.log('  --install-prod-apk   Build & install live-Firebase release APK (config/production.json)');
  console.log('  --scrcpy             Mirror & control Android phone from laptop');
  console.log('  --always-on-top      Float scrcpy above Canva/slides (implies --scrcpy)');
  console.log('  --scrcpy-fps <fps>   Set scrcpy max FPS (default: 60; 90 or 120 over USB)');
  console.log('  --seeded / --empty   Seed Maya/Leo/Tala family (default) or 0-child onboarding');
  console.log('  --fresh / --reset-db In-memory DB (no export) or wipe saved emulator-data first');
  console.log('  --status / --stop    Inspect active ports/devices or stop all demo ports');
  console.log('  -h, --help           Show this help message');
}

function parseArgs(argv) {
  const cfg = {
    origArgc: argv.length,
    target: '',
    doctor: false,
    status: false,
    stop: false,
    help: false,
    interactive: false,
    noInput: false,
    persistMode: true,
    demoDataMode: 'seeded',
    resetDb: false,
    adbReverse: false,
    wirelessAddr: '',
    installApkMode: 'none', // none | local | prod
    startScrcpy: false,
    scrcpyOnTop: false,
    scrcpyFps: '60',
    selectedSerial: '',
  };

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === 'all' || a === '--all') cfg.target = 'all';
    else if (a === 'react' || a === '--react') cfg.target = 'react';
    else if (a === 'flutter' || a === '--flutter') cfg.target = 'flutter';
    else if (a === 'android' || a === '--android') {
      cfg.target = 'android';
      cfg.adbReverse = true;
    } else if (a === 'api' || a === '--api') cfg.target = 'api';
    else if (a === '--doctor') cfg.doctor = true;
    else if (a === '--status') cfg.status = true;
    else if (a === '--stop') cfg.stop = true;
    else if (a === '-h' || a === '--help') cfg.help = true;
    else if (a === '-i' || a === '--interactive') cfg.interactive = true;
    else if (a === '--no-input' || a === '--non-interactive') cfg.noInput = true;
    else if (a === '--adb-reverse') cfg.adbReverse = true;
    else if (a === '--install-apk') {
      cfg.installApkMode = 'local';
      cfg.adbReverse = true;
    } else if (a === '--install-prod-apk') cfg.installApkMode = 'prod';
    else if (a === '--scrcpy') cfg.startScrcpy = true;
    else if (a === '--always-on-top') {
      cfg.startScrcpy = true;
      cfg.scrcpyOnTop = true;
    } else if (a === '--scrcpy-fps') {
      const next = argv[++i];
      if (!next || !/^\d+$/.test(next)) {
        console.error(`${C.red}Error: --scrcpy-fps requires a numeric value (e.g. 60, 90, 120).${C.reset}`);
        process.exit(1);
      }
      cfg.scrcpyFps = next;
      cfg.startScrcpy = true;
    } else if (a === '--wireless') {
      const next = argv[++i];
      if (!next || next.startsWith('-')) {
        console.error(`${C.red}Error: --wireless requires <ip:port>.${C.reset}`);
        process.exit(1);
      }
      cfg.wirelessAddr = next;
      cfg.adbReverse = true;
    } else if (a === '--empty') cfg.demoDataMode = 'empty';
    else if (a === '--seeded') cfg.demoDataMode = 'seeded';
    else if (a === '--fresh') cfg.persistMode = false;
    else if (a === '--reset-db') cfg.resetDb = true;
    else {
      console.error(`${C.red}Error: Unrecognized option: ${a}. Use --help for usage.${C.reset}`);
      process.exit(1);
    }
  }
  return cfg;
}

// ---------------------------------------------------------------------------
// Interactive Android Connection & Pairing Helper (USB & Wireless ADB)
// ---------------------------------------------------------------------------
async function connectAndroidInteractive(rl) {
  const adb = findAdbBin();
  if (!adb) {
    console.log(`   ${C.red}ADB is not installed.${C.reset} Install with: ${C.cyan}${installHint('adb')}${C.reset}`);
    return { serial: '', wirelessAddr: '' };
  }

  while (true) {
    console.log(`\n   ${C.bold}How would you like to connect your Android phone?${C.reset}`);
    console.log('     1) USB Cable (plug in & re-scan)');
    console.log('     2) Wireless Debugging — connect (already paired, IP:port)');
    console.log('     3) Wireless Debugging — first-time pair + connect (Android 11+ pairing code)');
    console.log(`     4) Skip for now ${C.cyan}[default]${C.reset}`);
    const mode = (await rl.question('   Select connection method [4]: ')).trim() || '4';

    if (mode === '4') {
      return { serial: '', wirelessAddr: '' };
    }

    if (mode === '1') {
      console.log(`\n   ${C.cyan}USB Setup Checklist:${C.reset}`);
      console.log('     • Connect phone via USB data cable');
      console.log('     • Enable Settings → Developer options → USB debugging');
      console.log('     • Tap "Allow USB debugging" if prompted on the phone screen');
      await rl.question('   Press Enter once connected to scan...');
      const found = detectAdbDevices();
      if (found.length > 0) {
        console.log(`   ${C.green}Connected:${C.reset} ${found[0].model} (${C.cyan}${found[0].serial}${C.reset})`);
        return { serial: found[0].serial, wirelessAddr: '' };
      }
      console.log(`   ${C.yellow}Still no device detected.${C.reset} Check cable/prompt and try again.`);
      continue;
    }

    if (mode === '3') {
      console.log(`\n   ${C.cyan}On phone: Settings → Developer options → Wireless debugging → Pair device with pairing code${C.reset}`);
      const pairAddr = (await rl.question('   Pairing IP:port (e.g. 192.168.10.1:37123): ')).trim();
      const pairCode = (await rl.question('   6-digit Wi-Fi pairing code: ')).trim();
      if (pairAddr && pairCode) {
        runSync(adb, ['pair', pairAddr, pairCode], { stdio: 'inherit' });
      }
    }

    if (mode === '2' || mode === '3') {
      console.log(`\n   ${C.cyan}On phone: Settings → Developer options → Wireless debugging (main screen IP & port)${C.reset}`);
      const addr = (await rl.question('   Connect IP:port (e.g. 192.168.10.1:44775): ')).trim();
      if (addr) {
        runSync(adb, ['connect', addr], { stdio: 'inherit' });
        const found = detectAdbDevices();
        const matched = found.find((d) => d.serial === addr) || found[0];
        if (matched) {
          console.log(`   ${C.green}Connected:${C.reset} ${matched.model} (${C.cyan}${matched.serial}${C.reset})`);
          return { serial: matched.serial, wirelessAddr: addr };
        }
        console.log(`   ${C.yellow}Could not verify connection to ${addr}.${C.reset} Check IP/port and Wi-Fi network.`);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Interactive Setup Wizard (clig.dev compliant)
// ---------------------------------------------------------------------------
async function runInteractiveWizard(cfg, ws) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    console.log(`${C.bold}${C.cyan}====================================================${C.reset}`);
    console.log(`${C.bold}${C.cyan}    LittleSteps Cross-Platform Interactive CLI      ${C.reset}`);
    console.log(`${C.bold}${C.cyan}====================================================${C.reset}`);
    console.log(`Workspace: ${ws.rootDir}`);
    console.log(`Press ${C.bold}Enter${C.reset} to accept the default in brackets.\n`);

    console.log(`${C.bold}1) What would you like to run?${C.reset}`);
    console.log(`   1) All (Firebase Emulators + React Web + Flutter Web + Android) ${C.cyan}[default]${C.reset}`);
    console.log('   2) Android only (Firebase Emulators + ADB reverse for physical phone)');
    console.log('   3) Flutter Web + Firebase Emulators');
    console.log('   4) React Web + Firebase Emulators');
    console.log('   5) Firebase Backend Emulators only');
    console.log('   6) Run Setup Doctor (--doctor)');
    console.log('   7) Connect / pair Android phone (USB or Wireless ADB)');
    const t = (await rl.question('Select target [1]: ')).trim() || '1';
    if (t === '6') {
      cfg.doctor = true;
      return;
    }
    if (t === '7') {
      await connectAndroidInteractive(rl);
      const cont = (await rl.question('\nContinue to start demo services now? [Y/n]: ')).trim() || 'Y';
      if (!/^y$/i.test(cont)) {
        cfg.exitOnly = true;
        return;
      }
      return await runInteractiveWizardAfterConnect(rl, cfg, ws);
    }
    cfg.target = { '1': 'all', '2': 'android', '3': 'flutter', '4': 'react', '5': 'api' }[t] || 'all';
    if (cfg.target === 'android') cfg.adbReverse = true;
    await runInteractiveWizardAfterTarget(rl, cfg);
  } finally {
    rl.close();
  }
}

async function runInteractiveWizardAfterConnect(rl, cfg) {
  console.log(`\n${C.bold}1) What would you like to run?${C.reset}`);
  console.log(`   1) All (Firebase Emulators + React Web + Flutter Web + Android) ${C.cyan}[default]${C.reset}`);
  console.log('   2) Android only (Firebase Emulators + ADB reverse for physical phone)');
  console.log('   3) Flutter Web + Firebase Emulators');
  console.log('   4) React Web + Firebase Emulators');
  console.log('   5) Firebase Backend Emulators only');
  const t = (await rl.question('Select target [1]: ')).trim() || '1';
  cfg.target = { '1': 'all', '2': 'android', '3': 'flutter', '4': 'react', '5': 'api' }[t] || 'all';
  if (cfg.target === 'android') cfg.adbReverse = true;
  await runInteractiveWizardAfterTarget(rl, cfg);
}

async function runInteractiveWizardAfterTarget(rl, cfg) {

    console.log(`\n${C.bold}2) Demo data state?${C.reset}`);
    console.log(`   1) Seeded 3-child family (Maya, Leo, Tala) ${C.cyan}[default]${C.reset}`);
    console.log('   2) Empty onboarding state (0 children)');
    const d = (await rl.question('Select data mode [1]: ')).trim() || '1';
    cfg.demoDataMode = d === '2' ? 'empty' : 'seeded';

    console.log(`\n${C.bold}3) Emulator database persistence?${C.reset}`);
    console.log(`   1) Persistent (keep changes between runs) ${C.cyan}[default]${C.reset}`);
    console.log('   2) Fresh in-memory (resets on exit)');
    console.log('   3) Reset saved database first, then persist');
    const db = (await rl.question('Select database mode [1]: ')).trim() || '1';
    if (db === '2') cfg.persistMode = false;
    else if (db === '3') {
      cfg.persistMode = true;
      cfg.resetDb = true;
    }

    const devices = detectAdbDevices();
    if (cfg.target === 'all' || cfg.target === 'android' || devices.length > 0) {
      console.log(`\n${C.bold}4) Physical Android phone options:${C.reset}`);
      if (devices.length === 1) {
        cfg.selectedSerial = devices[0].serial;
        console.log(`   Detected device: ${C.green}${devices[0].model}${C.reset} (${C.cyan}${devices[0].serial}${C.reset})`);
      } else if (devices.length > 1) {
        devices.forEach((dev, idx) => {
          console.log(`   ${idx + 1}) ${dev.model} (${C.cyan}${dev.serial}${C.reset})`);
        });
        const pick = Number((await rl.question('   Select device [1]: ')).trim() || '1') - 1;
        cfg.selectedSerial = (devices[pick] || devices[0]).serial;
      } else {
        console.log(`   ${C.yellow}No Android device detected via ADB.${C.reset}`);
        const conn = await connectAndroidInteractive(rl);
        cfg.selectedSerial = conn.serial;
        cfg.wirelessAddr = conn.wirelessAddr;
      }

      if (cfg.selectedSerial || cfg.wirelessAddr) {
        const rev = (await rl.question('   Forward local emulator ports (adb reverse 5001/9099)? [Y/n]: ')).trim() || 'Y';
        cfg.adbReverse = /^y$/i.test(rev);

        console.log('   Build & install release APK onto phone?');
        console.log(`     1) No — keep installed APK ${C.cyan}[default]${C.reset}`);
        console.log('     2) Yes — local-emulator release APK (config/local.device.json)');
        console.log('     3) Yes — live-Firebase release APK (config/production.json)');
        const apk = (await rl.question('   Select APK action [1]: ')).trim() || '1';
        if (apk === '2') {
          cfg.installApkMode = 'local';
          cfg.adbReverse = true;
        } else if (apk === '3') {
          cfg.installApkMode = 'prod';
          cfg.adbReverse = false;
        }

        if (commandExists('scrcpy')) {
          console.log('   Mirror & control phone with scrcpy?');
          console.log(`     1) No ${C.cyan}[default]${C.reset}`);
          console.log('     2) Yes — standard window');
          console.log('     3) Yes — always-on-top (alongside Canva slides)');
          const sc = (await rl.question('   Select scrcpy option [1]: ')).trim() || '1';
          if (sc === '2' || sc === '3') {
            cfg.startScrcpy = true;
            cfg.scrcpyOnTop = sc === '3';
            console.log('   Select scrcpy refresh rate:');
            console.log(`     1) 60 fps  (balanced for Wireless & USB) ${C.cyan}[default]${C.reset}`);
            console.log('     2) 90 fps  (smoother motion)');
            console.log('     3) 120 fps (maximum smoothness — best over USB)');
            const fps = (await rl.question('   Select refresh rate [1]: ')).trim() || '1';
            cfg.scrcpyFps = fps === '2' ? '90' : fps === '3' ? '120' : '60';
          }
        }
      }
    }

    // Print reusable one-liner (clig.dev "Show, Don't Just Tell")
    const relScript = path.relative(process.cwd(), __filename) || 'run-demo.mjs';
    const parts = [`node ${relScript}`, `--${cfg.target}`];
    if (cfg.demoDataMode === 'empty') parts.push('--empty');
    if (!cfg.persistMode) parts.push('--fresh');
    if (cfg.resetDb) parts.push('--reset-db');
    if (cfg.adbReverse && cfg.target !== 'android') parts.push('--adb-reverse');
    if (cfg.wirelessAddr) parts.push('--wireless', cfg.wirelessAddr);
    if (cfg.installApkMode === 'local') parts.push('--install-apk');
    if (cfg.installApkMode === 'prod') parts.push('--install-prod-apk');
    if (cfg.scrcpyOnTop) parts.push('--always-on-top');
    else if (cfg.startScrcpy) parts.push('--scrcpy');
    if (cfg.startScrcpy && cfg.scrcpyFps !== '60') parts.push('--scrcpy-fps', cfg.scrcpyFps);
    parts.push('--no-input');

    console.log(`\n${C.cyan}Tip: Re-run this exact setup non-interactively next time:${C.reset}`);
    console.log(`  ${C.bold}${parts.join(' ')}${C.reset}\n`);
}

// ---------------------------------------------------------------------------
// Missing Repo Clone Helper (Interactive)
// ---------------------------------------------------------------------------
async function ensureRequiredRepos(cfg, ws) {
  const needs = [
    { key: 'api', dir: ws.apiDir, folder: 'littlesteps-api', url: REPO_URLS.api, required: true },
    {
      key: 'react',
      dir: ws.reactDir,
      folder: 'littlesteps-react',
      url: REPO_URLS.react,
      required: cfg.target === 'react' || cfg.target === 'all',
    },
    {
      key: 'flutter',
      dir: ws.flutterDir,
      folder: 'littlesteps-flutter',
      url: REPO_URLS.flutter,
      required: cfg.target === 'flutter' || cfg.target === 'all' || cfg.installApkMode !== 'none',
    },
  ];

  for (const item of needs) {
    if (!item.required || item.dir) continue;
    const dest = path.join(ws.rootDir, item.folder);
    if (!cfg.noInput && process.stdin.isTTY) {
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      const ans = (await rl.question(`${C.yellow}Missing ${item.folder}. Clone from GitHub into ${dest}? [Y/n]: ${C.reset}`)).trim() || 'Y';
      rl.close();
      if (/^y$/i.test(ans)) {
        const cloned = runSync('git', ['clone', item.url, dest], { stdio: 'inherit' });
        if (cloned.status === 0) {
          if (item.key === 'api') ws.apiDir = dest;
          if (item.key === 'react') ws.reactDir = dest;
          if (item.key === 'flutter') ws.flutterDir = path.join(dest, 'BSIT-3A', 'LittleSteps');
          continue;
        }
      }
    }
    console.error(`${C.red}Error: Required repository '${item.folder}' not found in ${ws.rootDir}.${C.reset}`);
    console.error(`Clone it with: git clone ${item.url} ${dest}`);
    process.exit(1);
  }
}

// ---------------------------------------------------------------------------
// Demo Data Seeding (idempotent via local Auth & Functions Emulators)
// ---------------------------------------------------------------------------
async function seedDemoData(mode) {
  const authBase = 'http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1';
  const apiBase = 'http://127.0.0.1:5001/demo-littlesteps/asia-southeast1/api/api/v1';
  const creds = { email: 'littlesteps@demo.com', password: 'Password123!', returnSecureToken: true };

  let token = '';
  for (let attempt = 0; attempt < 5 && !token; attempt++) {
    for (const endpoint of ['accounts:signInWithPassword', 'accounts:signUp']) {
      try {
        const res = await fetch(`${authBase}/${endpoint}?key=fake-api-key`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(creds),
        });
        const data = await res.json();
        if (data?.idToken) {
          token = data.idToken;
          break;
        }
      } catch {
        // retry
      }
    }
    if (!token) await new Promise((r) => setTimeout(r, 1000));
  }

  if (!token) {
    console.log(`${C.yellow}Warning: Could not authenticate demo account; register via the app.${C.reset}`);
    return;
  }

  const authHeaders = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  const listRes = await fetch(`${apiBase}/children`, { headers: authHeaders });
  const children = listRes.ok ? await listRes.json() : [];

  if (mode === 'empty') {
    for (const c of Array.isArray(children) ? children : []) {
      await fetch(`${apiBase}/children/${c.id}`, { method: 'DELETE', headers: authHeaders });
    }
    console.log(`${C.green}[Demo Data] Empty onboarding state ready (0 children).${C.reset}`);
    return;
  }

  const fmtDate = (offsetDays) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().slice(0, 10);
  };
  const [today, d1, d2, d5, d7, d8] = [0, -1, -2, -5, -7, -8].map(fmtDate);

  async function ensureChild(nickname, ageBand) {
    const existing = Array.isArray(children) ? children.find((c) => c.nickname === nickname) : null;
    if (existing?.id) return existing.id;
    const res = await fetch(`${apiBase}/children`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ nickname, ageBand }),
    });
    const created = res.ok ? await res.json() : {};
    return created.id || null;
  }

  const mayaId = await ensureChild('Maya', '12-23m');
  const leoId = await ensureChild('Leo', '6-11m');
  const talaId = await ensureChild('Tala', '24-35m');

  if (mayaId) {
    const plans = await (await fetch(`${apiBase}/children/${mayaId}/plans`, { headers: authHeaders })).json();
    if (Array.isArray(plans) && plans.length === 0) {
      for (const p of [
        { activityId: 'act-008', scheduledDate: today, status: 'planned' },
        { activityId: 'act-003', scheduledDate: today, status: 'completed' },
        { activityId: 'act-009', scheduledDate: d1, status: 'completed' },
        { activityId: 'act-010', scheduledDate: d2, status: 'completed' },
        { activityId: 'act-008', scheduledDate: d7, status: 'completed' },
        { activityId: 'act-003', scheduledDate: d8, status: 'completed' },
      ]) {
        await fetch(`${apiBase}/children/${mayaId}/plans`, {
          method: 'POST',
          headers: authHeaders,
          body: JSON.stringify(p),
        });
      }
    }
    const ms = await (await fetch(`${apiBase}/children/${mayaId}/milestones`, { headers: authHeaders })).json();
    if (Array.isArray(ms) && ms.length === 0) {
      for (const m of [
        { milestoneId: 'lan-12-01', status: 'observed', observedDate: today, notes: 'Smiled, turned head when called, and pointed to her cup.' },
        { milestoneId: 'mot-12-01', status: 'observed', observedDate: d2, notes: 'Walked four steady steps across the mat toward a cushion.' },
        { milestoneId: 'cog-12-01', status: 'observed', observedDate: d5, notes: 'Nested two plastic cups together after watching once.' },
      ]) {
        await fetch(`${apiBase}/children/${mayaId}/milestones`, {
          method: 'POST',
          headers: authHeaders,
          body: JSON.stringify(m),
        });
      }
    }
    const j = await (await fetch(`${apiBase}/children/${mayaId}/journal`, { headers: authHeaders })).json();
    if (Array.isArray(j) && j.length === 0) {
      for (const entry of [
        { entryDate: today, content: 'Maya enjoyed stacking empty plastic cups after breakfast.' },
        { entryDate: d2, content: 'Sang Bahay Kubo before afternoon nap and waved both hands.' },
        { entryDate: d5, content: 'Rainy afternoon indoors—crawled over soft pillows laughing for ten minutes.' },
      ]) {
        await fetch(`${apiBase}/children/${mayaId}/journal`, {
          method: 'POST',
          headers: authHeaders,
          body: JSON.stringify(entry),
        });
      }
    }
    const booksRes = await (await fetch(`${apiBase}/children/${mayaId}/books`, { headers: authHeaders })).json();
    if (Array.isArray(booksRes?.books) && booksRes.books.length === 0) {
      for (const b of [
        { id: 'OL45804W', title: 'Goodnight Moon', authors: ['Margaret Wise Brown'], coverUrl: 'https://covers.openlibrary.org/b/id/8225266-M.jpg?default=false', subjects: ['Bedtime', 'Stories in rhyme'] },
        { id: 'OL1968368W', title: 'The Very Hungry Caterpillar', authors: ['Eric Carle'], coverUrl: 'https://covers.openlibrary.org/b/id/8231990-M.jpg?default=false', subjects: ['Picture books', 'Animals', 'Counting'] },
      ]) {
        await fetch(`${apiBase}/children/${mayaId}/books`, {
          method: 'POST',
          headers: authHeaders,
          body: JSON.stringify(b),
        });
      }
    }
  }

  if (leoId) {
    const plans = await (await fetch(`${apiBase}/children/${leoId}/plans`, { headers: authHeaders })).json();
    if (Array.isArray(plans) && plans.length === 0) {
      await fetch(`${apiBase}/children/${leoId}/plans`, { method: 'POST', headers: authHeaders, body: JSON.stringify({ activityId: 'act-002', scheduledDate: today, status: 'planned' }) });
      await fetch(`${apiBase}/children/${leoId}/plans`, { method: 'POST', headers: authHeaders, body: JSON.stringify({ activityId: 'act-012', scheduledDate: d1, status: 'completed' }) });
    }
  }
  if (talaId) {
    const plans = await (await fetch(`${apiBase}/children/${talaId}/plans`, { headers: authHeaders })).json();
    if (Array.isArray(plans) && plans.length === 0) {
      await fetch(`${apiBase}/children/${talaId}/plans`, { method: 'POST', headers: authHeaders, body: JSON.stringify({ activityId: 'act-004', scheduledDate: d7, status: 'completed' }) });
    }
  }
  console.log(`${C.green}[Demo Data] Seeded 3-child family ready (Maya, Leo, Tala).${C.reset}`);
}

// ---------------------------------------------------------------------------
// Clean Shutdown Handler (Windows taskkill /T + Unix SIGINT)
// ---------------------------------------------------------------------------
function shutdown() {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`\n${C.yellow}Shutting down LittleSteps demo services...${C.reset}`);
  for (const child of managedChildren) {
    if (!child || child.killed || !child.pid) continue;
    if (IS_WIN) {
      runSync('taskkill', ['/PID', String(child.pid), '/T', '/F']);
    } else {
      try {
        child.kill('SIGINT');
      } catch {
        // Ignore
      }
    }
  }
  setTimeout(() => {
    for (const { port } of DEMO_PORTS) killPort(port);
    console.log(`${C.green}All services stopped cleanly.${C.reset}`);
    process.exit(0);
  }, IS_WIN ? 1500 : 3000);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// ---------------------------------------------------------------------------
// Main Execution Flow
// ---------------------------------------------------------------------------
async function main() {
  const cfg = parseArgs(process.argv.slice(2));
  const ws = resolveWorkspace();

  if (cfg.help) {
    printUsage();
    return;
  }

  if (cfg.stop) {
    console.log(`${C.yellow}Stopping processes on LittleSteps demo ports...${C.reset}`);
    for (const { port } of DEMO_PORTS) killPort(port);
    console.log(`${C.green}Done. Ports ${DEMO_PORTS.map((d) => d.port).join(', ')} are free.${C.reset}`);
    return;
  }

  if (cfg.status) {
    console.log(`${C.bold}LittleSteps Service Ports:${C.reset}`);
    for (const { port, label } of DEMO_PORTS) {
      const pids = getPortPids(port);
      if (pids.length > 0) {
        console.log(`  [${C.green}ACTIVE${C.reset}]   Port ${port} — ${label} (PID: ${pids.join(', ')})`);
      } else {
        console.log(`  [${C.red}INACTIVE${C.reset}] Port ${port} — ${label}`);
      }
    }
    const devices = detectAdbDevices();
    console.log(`\n${C.bold}Connected Android Devices (deduplicated):${C.reset}`);
    if (devices.length === 0) {
      console.log(`  [${C.yellow}NONE${C.reset}] No USB or Wireless ADB device detected`);
    } else {
      for (const d of devices) {
        console.log(`  [${C.green}DEVICE${C.reset}] ${d.model} (${C.cyan}${d.serial}${C.reset})`);
      }
    }
    return;
  }

  if (!cfg.noInput && process.stdin.isTTY && (cfg.interactive || cfg.origArgc === 0)) {
    await runInteractiveWizard(cfg, ws);
    if (cfg.exitOnly) return;
  }

  if (cfg.doctor) {
    const ok = runDoctor(ws);
    if (!cfg.noInput && process.stdin.isTTY && detectAdbDevices().length === 0 && findAdbBin()) {
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      try {
        const ans = (await rl.question(`\n${C.bold}No Android device detected. Connect/pair a phone via USB or Wireless ADB now? [y/N]: ${C.reset}`)).trim() || 'N';
        if (/^y$/i.test(ans)) {
          await connectAndroidInteractive(rl);
        }
      } finally {
        rl.close();
      }
    }
    process.exit(ok ? 0 : 1);
  }

  if (!cfg.target) cfg.target = 'react';

  // Verify core prerequisites before starting
  if (!commandExists('java')) {
    console.error(`${C.red}Error: Java JDK (11+) is required by the Firebase Firestore Emulator.${C.reset}`);
    console.error(`Install it with: ${C.cyan}${installHint('java')}${C.reset}`);
    process.exit(1);
  }

  await ensureRequiredRepos(cfg, ws);

  // Install missing dependencies & compile TypeScript API
  if (!fs.existsSync(path.join(ws.apiDir, 'node_modules'))) {
    console.log(`${C.yellow}Installing API dependencies...${C.reset}`);
    if (runSync('npm', ['install'], { cwd: ws.apiDir, stdio: 'inherit' }).status !== 0) process.exit(1);
  }
  if ((cfg.target === 'react' || cfg.target === 'all') && !fs.existsSync(path.join(ws.reactDir, 'node_modules'))) {
    console.log(`${C.yellow}Installing React dependencies...${C.reset}`);
    if (runSync('npm', ['install'], { cwd: ws.reactDir, stdio: 'inherit' }).status !== 0) process.exit(1);
  }
  if ((cfg.target === 'flutter' || cfg.target === 'all') && !fs.existsSync(path.join(ws.flutterDir, '.dart_tool'))) {
    console.log(`${C.yellow}Resolving Flutter packages...${C.reset}`);
    if (runSync('flutter', ['pub', 'get'], { cwd: ws.flutterDir, stdio: 'inherit' }).status !== 0) process.exit(1);
  }

  console.log(`${C.yellow}Building TypeScript backend...${C.reset}`);
  if (runSync('npm', ['run', 'build'], { cwd: ws.apiDir, stdio: 'inherit' }).status !== 0) {
    console.error(`${C.red}API build failed.${C.reset}`);
    process.exit(1);
  }

  // Scaffold local emulator env files safely (never overwrites real keys)
  const apiEnvPath = path.join(ws.apiDir, '.env');
  if (!fs.existsSync(apiEnvPath) && fs.existsSync(path.join(ws.apiDir, '.env.example'))) {
    fs.copyFileSync(path.join(ws.apiDir, '.env.example'), apiEnvPath);
  }
  if (fs.existsSync(apiEnvPath)) {
    let envText = fs.readFileSync(apiEnvPath, 'utf8');
    for (const k of ['SERVE_SYNTHETIC_CATALOG', 'DEMO_ALLOW_SYNTHETIC_AI']) {
      const re = new RegExp(`^${k}=.*`, 'm');
      envText = re.test(envText) ? envText.replace(re, `${k}=true`) : `${envText}\n${k}=true\n`;
    }
    fs.writeFileSync(apiEnvPath, envText, 'utf8');
  }
  if (ws.reactDir) {
    const reactEnvPath = path.join(ws.reactDir, '.env.local');
    if (!fs.existsSync(reactEnvPath)) {
      fs.writeFileSync(
        reactEnvPath,
        [
          'VITE_API_BASE_URL=http://127.0.0.1:5001/demo-littlesteps/asia-southeast1/api',
          'VITE_USE_FIREBASE_EMULATOR=true',
          'VITE_FIREBASE_PROJECT_ID=demo-littlesteps',
          'VITE_FIREBASE_API_KEY=demo-api-key',
          'VITE_FIREBASE_AUTH_DOMAIN=demo-littlesteps.firebaseapp.com',
          'VITE_FIREBASE_APP_ID=1:1234567890:web:demo',
          '',
        ].join('\n'),
        'utf8'
      );
    }
  }

  // Reset emulator-data if requested
  const emuDataDir = path.join(ws.apiDir, 'emulator-data');
  if (cfg.resetDb && fs.existsSync(emuDataDir)) {
    fs.rmSync(emuDataDir, { recursive: true, force: true });
  }

  // Start Firebase Emulators if not already healthy
  const emulatorRunning = await httpOk('http://127.0.0.1:5001/demo-littlesteps/asia-southeast1/api/health');
  if (emulatorRunning) {
    console.log(`${C.green}[Backend] Firebase Emulators already running.${C.reset}`);
  } else {
    for (const p of [4000, 5001, 8080, 9099]) killPort(p);
    const fbArgs = ['firebase', 'emulators:start', '--only', 'functions,auth,firestore', '--project', 'demo-littlesteps'];
    if (cfg.persistMode) {
      fs.mkdirSync(emuDataDir, { recursive: true });
      const meta = path.join(emuDataDir, 'firebase-export-metadata.json');
      if (fs.existsSync(meta)) fbArgs.push('--import=./emulator-data');
      fbArgs.push('--export-on-exit=./emulator-data');
    }

    const extraEnv = { ...process.env };
    if (fs.existsSync(apiEnvPath)) {
      for (const line of fs.readFileSync(apiEnvPath, 'utf8').split(/\r?\n/)) {
        const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
        if (m) extraEnv[m[1]] = m[2].trim().replace(/^['"]|['"]$/g, '');
      }
    }
    extraEnv.CORS_ORIGINS ||= 'http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174,http://127.0.0.1:5174';

    console.log(`${C.bold}[Backend] Starting Firebase Emulators...${C.reset}`);
    const logOut = fs.openSync(path.join(os.tmpdir(), 'littlesteps-api-emulator.log'), 'w');
    spawnManaged('npx', fbArgs, { cwd: ws.apiDir, env: extraEnv, stdio: ['ignore', logOut, logOut] });

    process.stdout.write('Waiting for Firebase Emulators');
    let ready = false;
    for (let i = 0; i < 40; i++) {
      if (await httpOk('http://127.0.0.1:5001/demo-littlesteps/asia-southeast1/api/health')) {
        ready = true;
        break;
      }
      process.stdout.write('.');
      await new Promise((r) => setTimeout(r, 1000));
    }
    console.log('');
    if (!ready) {
      console.error(`${C.red}Timed out waiting for Firebase Emulators. See ${path.join(os.tmpdir(), 'littlesteps-api-emulator.log')}${C.reset}`);
      shutdown();
      return;
    }
    console.log(`${C.green}Firebase Emulators ready.${C.reset}`);
  }

  await seedDemoData(cfg.demoDataMode);

  // Android device setup (ADB reverse, optional APK install, optional scrcpy)
  if (cfg.adbReverse || cfg.installApkMode !== 'none' || cfg.startScrcpy) {
    const adb = findAdbBin();
    if (!adb) {
      console.log(`${C.yellow}[Android] adb not found (${installHint('adb')}). Skipping Android setup.${C.reset}`);
    } else {
      if (cfg.wirelessAddr) runSync(adb, ['connect', cfg.wirelessAddr], { stdio: 'inherit' });
      const serial = cfg.wirelessAddr || cfg.selectedSerial || (detectAdbDevices()[0]?.serial ?? '');
      if (!serial) {
        console.log(`${C.yellow}[Android] No Android device detected.${C.reset}`);
      } else {
        if (cfg.installApkMode !== 'none') {
          const cfgFile = cfg.installApkMode === 'prod' ? 'config/production.json' : 'config/local.device.json';
          console.log(`${C.blue}[Android] Building release APK (${cfgFile})...${C.reset}`);
          const built = runSync(
            'flutter',
            ['build', 'apk', '--release', '--target-platform', 'android-arm64', `--dart-define-from-file=${cfgFile}`],
            { cwd: ws.flutterDir, stdio: 'inherit' }
          );
          if (built.status === 0) {
            const apkPath = path.join(ws.flutterDir, 'build', 'app', 'outputs', 'flutter-apk', 'app-release.apk');
            runSync(adb, ['-s', serial, 'install', '-r', apkPath], { stdio: 'inherit' });
            if (cfg.installApkMode === 'prod') runSync(adb, ['-s', serial, 'reverse', '--remove-all']);
          }
        }
        if (cfg.adbReverse) {
          runSync(adb, ['-s', serial, 'reverse', 'tcp:5001', 'tcp:5001']);
          runSync(adb, ['-s', serial, 'reverse', 'tcp:9099', 'tcp:9099']);
          console.log(`${C.green}[Android] ADB reverse active on ${serial} (5001 & 9099).${C.reset}`);
        }
        if (cfg.installApkMode !== 'none' || cfg.startScrcpy) {
          runSync(adb, ['-s', serial, 'shell', 'monkey', '-p', 'edu.wvsu.cict.titans.littlesteps', '-c', 'android.intent.category.LAUNCHER', '1']);
        }
        if (cfg.startScrcpy) {
          if (commandExists('scrcpy')) {
            const scArgs = [
              '-s', serial,
              '--window-title', 'LittleSteps — Android',
              '--stay-awake',
              `--max-fps=${cfg.scrcpyFps}`,
              '--max-size=1080',
              '--video-bit-rate=12M',
              '--video-codec=h264',
              '--no-audio',
            ];
            if (cfg.scrcpyOnTop) scArgs.push('--always-on-top');
            console.log(`${C.green}[Android] Launching scrcpy (${cfg.scrcpyFps} fps, 1080p) for ${serial}...${C.reset}`);
            const scLog = fs.openSync(path.join(os.tmpdir(), 'littlesteps-scrcpy.log'), 'w');
            spawnManaged('scrcpy', scArgs, { stdio: ['ignore', scLog, scLog] });
          } else {
            console.log(`${C.yellow}[Android] scrcpy not installed. Install with: ${installHint('scrcpy')}${C.reset}`);
          }
        }
      }
    }
  }

  // Launch React Web Client
  if (cfg.target === 'react' || cfg.target === 'all') {
    if (await httpOk('http://127.0.0.1:5173')) {
      console.log(`${C.green}[React] Already running on http://localhost:5173${C.reset}`);
    } else {
      killPort(5173);
      const viteLog = fs.openSync(path.join(os.tmpdir(), 'littlesteps-react-dev.log'), 'w');
      spawnManaged('npm', ['run', 'dev', '--', '--host', '127.0.0.1'], {
        cwd: ws.reactDir,
        stdio: ['ignore', viteLog, viteLog],
      });
      for (let i = 0; i < 20; i++) {
        if (await httpOk('http://127.0.0.1:5173')) break;
        await new Promise((r) => setTimeout(r, 1000));
      }
      console.log(`${C.green}[React] Ready on http://localhost:5173${C.reset}`);
    }
  }

  // Print Dashboard
  console.log(`\n${C.bold}${C.green}================================================================${C.reset}`);
  console.log(`${C.bold}${C.green}              LittleSteps Services Running                      ${C.reset}`);
  console.log(`${C.bold}${C.green}================================================================${C.reset}`);
  if (cfg.target === 'flutter' || cfg.target === 'all') console.log(`  Flutter Web App:      ${C.cyan}http://localhost:5174${C.reset}`);
  if (cfg.target === 'react' || cfg.target === 'all') console.log(`  React Web Client:     ${C.cyan}http://localhost:5173${C.reset}`);
  console.log(`  Firebase Emulator UI: ${C.cyan}http://localhost:4000${C.reset}`);
  console.log(`  Functions REST API:   ${C.cyan}http://localhost:5001/demo-littlesteps/asia-southeast1/api${C.reset}`);
  console.log('----------------------------------------------------------------');
  console.log(`  Demo Login: ${C.bold}littlesteps@demo.com${C.reset} / ${C.bold}Password123!${C.reset}`);
  console.log('----------------------------------------------------------------\n');

  // Launch Flutter Web in foreground if requested
  if (cfg.target === 'flutter' || cfg.target === 'all') {
    killPort(5174);
    const fl = spawnManaged('flutter', ['run', '-d', 'web-server', '--web-port=5174', '--web-hostname=0.0.0.0'], {
      cwd: ws.flutterDir,
      stdio: 'inherit',
    });
    (async () => {
      for (let i = 0; i < 40; i++) {
        if (getPortPids(5174).length > 0) {
          openBrowser('http://localhost:5174');
          break;
        }
        await new Promise((r) => setTimeout(r, 1000));
      }
    })();
    fl.on('exit', () => shutdown());
  } else {
    console.log(`${C.yellow}Press Ctrl+C to stop all services cleanly.${C.reset}`);
    await new Promise(() => {});
  }
}

main().catch((err) => {
  console.error(`${C.red}Fatal error:${C.reset}`, err);
  shutdown();
});
