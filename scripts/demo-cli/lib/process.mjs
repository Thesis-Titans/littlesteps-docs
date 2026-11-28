import { spawn, spawnSync } from 'node:child_process';
import path from 'node:path';
import { DEMO_PORTS, EXIT_OK, EXIT_SIGINT, IS_MAC, IS_WIN, IS_WSL } from './constants.mjs';
import { c } from './ui.mjs';

// Only .cmd/.bat shims require shell:true on Windows (Node 22+ CVE-2024-27980 compliant).
const WIN_SHELL_CMDS = new Set(['npm', 'npx', 'flutter', 'firebase', 'where']);

const managedChildren = [];
let shuttingDown = false;

export function needsShell(cmd) {
  if (!IS_WIN) return false;
  const base = path.basename(cmd, path.extname(cmd)).toLowerCase();
  return WIN_SHELL_CMDS.has(base) || /\.(cmd|bat)$/i.test(cmd);
}

export function isValidHostPort(value) {
  return /^[a-zA-Z0-9._-]+:\d{1,5}$/.test(value);
}

export function isValidDeviceSerial(value) {
  return /^[a-zA-Z0-9._:-]+$/.test(value);
}

export function isValidFps(value) {
  return /^\d+$/.test(String(value)) && Number(value) >= 15 && Number(value) <= 240;
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function runSync(cmd, args = [], opts = {}) {
  return spawnSync(cmd, args, {
    encoding: 'utf8',
    shell: needsShell(cmd),
    windowsHide: true,
    ...opts,
  });
}

export function runProbe(cmd, args = [], timeoutMs = 4000) {
  return spawnSync(cmd, args, {
    encoding: 'utf8',
    shell: needsShell(cmd),
    windowsHide: true,
    timeout: timeoutMs,
  });
}

export function spawnManaged(cmd, args = [], opts = {}) {
  const child = spawn(cmd, args, {
    shell: needsShell(cmd),
    windowsHide: false,
    ...opts,
  });
  managedChildren.push(child);
  return child;
}

export function commandExists(name) {
  const probe = IS_WIN ? runProbe('where', [name]) : runProbe('which', [name]);
  return probe.status === 0 && (probe.stdout || '').trim().length > 0;
}

export function installHint(tool) {
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

export function getPortPids(port) {
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

export function killPort(port) {
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

export async function httpOk(url, timeoutMs = 2000) {
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

export async function waitForHttp(url, maxAttempts = 40, intervalMs = 1000) {
  for (let i = 0; i < maxAttempts; i++) {
    if (await httpOk(url)) return true;
    await sleep(intervalMs);
  }
  return false;
}

export function openBrowser(url) {
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

export function shutdownManaged(exitCode = EXIT_OK) {
  if (shuttingDown) return;
  shuttingDown = true;
  if (managedChildren.length === 0) {
    process.exit(exitCode);
    return;
  }
  console.log(`\n${c.yellow('Shutting down LittleSteps demo services...')}`);
  for (const child of managedChildren) {
    if (!child || child.killed || !child.pid) continue;
    if (IS_WIN) {
      runSync('taskkill', ['/PID', String(child.pid), '/T', '/F']);
    } else {
      try {
        child.kill('SIGINT');
      } catch {
        // Ignore already-exited child
      }
    }
  }
  setTimeout(
    () => {
      for (const { port } of DEMO_PORTS) killPort(port);
      console.log(c.green('All services stopped cleanly.'));
      process.exit(exitCode);
    },
    IS_WIN ? 1500 : 2500
  );
}

export function registerSignalHandlers() {
  process.on('SIGINT', () => shutdownManaged(EXIT_SIGINT));
  process.on('SIGTERM', () => shutdownManaged(EXIT_OK));
}
