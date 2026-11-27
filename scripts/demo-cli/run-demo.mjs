#!/usr/bin/env node
/**
 * LittleSteps Cross-Platform Demo CLI
 *
 * Modular Node.js 20+/22 orchestrator powered by Commander + @clack/prompts + picocolors.
 * Supports modern subcommands (`start`, `doctor`, `status`, `stop`, `seed`, `android`)
 * while retaining full backward compatibility with legacy flags (`--all`, `--doctor`, etc.).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Guard missing dependencies cleanly before importing third-party packages.
if (!fs.existsSync(path.join(__dirname, 'node_modules', 'commander'))) {
  console.error('Demo CLI dependencies are not installed yet.');
  console.error(`Run once: cd "${__dirname}" && npm install`);
  process.exit(1);
}

const { Command } = await import('commander');
const { CLI_VERSION, EXIT_ERROR, EXIT_OK, EXIT_USAGE } = await import('./lib/constants.mjs');
const { registerSignalHandlers, shutdownManaged } = await import('./lib/process.mjs');
const { isInteractiveTty, ui } = await import('./lib/ui.mjs');
const { resolveWorkspace } = await import('./lib/workspace.mjs');
const {
  runAndroidApkCommand,
  runAndroidConnectCommand,
  runAndroidMirrorCommand,
  runAndroidRestartAdbCommand,
} = await import('./commands/android.mjs');
const { runDoctorCommand } = await import('./commands/doctor.mjs');
const { runSeedCommand } = await import('./commands/seed.mjs');
const { runStartCommand } = await import('./commands/start.mjs');
const { runStatusCommand } = await import('./commands/status.mjs');
const { runStopCommand } = await import('./commands/stop.mjs');
const { runWizardCommand } = await import('./commands/wizard.mjs');

registerSignalHandlers();

/**
 * Translates legacy top-level flags (e.g. `--doctor`, `--all`, `--install-prod-apk`)
 * into canonical subcommand argv so existing scripts and docs keep working.
 */
export function normalizeLegacyArgv(rawArgs) {
  if (rawArgs.length === 0) return [];
  const first = rawArgs[0];
  const subcommands = new Set(['start', 'doctor', 'status', 'stop', 'seed', 'android', 'help']);
  if (subcommands.has(first)) return rawArgs;
  if (first === '-h' || first === '--help' || first === '-V' || first === '--version') return rawArgs;

  const args = [...rawArgs];
  const take = (flag) => {
    const idx = args.indexOf(flag);
    if (idx === -1) return false;
    args.splice(idx, 1);
    return true;
  };

  if (take('--doctor')) return ['doctor', ...args];
  if (take('--status')) return ['status', ...args];
  if (take('--stop')) return ['stop', ...args];
  if (take('--restart-adb')) return ['android', 'restart-adb', ...args];

  let target = '';
  for (const t of ['all', 'react', 'flutter', 'android', 'api']) {
    if (take(`--${t}`) || (args[0] === t && args.shift())) {
      target = t;
      break;
    }
  }

  // Standalone --install-prod-apk without a local demo target installs the live APK directly.
  const hasProdApk = args.includes('--install-prod-apk');
  if (hasProdApk && !target) {
    take('--install-prod-apk');
    const mapped = ['android', 'apk', '--env', 'prod'];
    for (let i = 0; i < args.length; i++) {
      if (args[i] === '--scrcpy') mapped.push('--mirror');
      else if (args[i] === '--scrcpy-fps' && args[i + 1]) {
        mapped.push('--fps', args[++i]);
      } else {
        mapped.push(args[i]);
      }
    }
    return mapped;
  }

  if (take('-i') || take('--interactive')) return [];

  if (target || args.some((a) => a.startsWith('--'))) {
    const mapped = ['start', target || 'all'];
    for (let i = 0; i < args.length; i++) {
      const a = args[i];
      if (a === '--empty') mapped.push('--data', 'empty');
      else if (a === '--seeded') mapped.push('--data', 'seeded');
      else if (a === '--fresh') mapped.push('--db', 'fresh');
      else if (a === '--reset-db') mapped.push('--db', 'reset');
      else if (a === '--install-apk') mapped.push('--install-apk', 'local');
      else if (a === '--install-prod-apk') mapped.push('--install-apk', 'prod');
      else if (a === '--non-interactive') mapped.push('--no-input');
      else mapped.push(a);
    }
    return mapped;
  }

  return rawArgs;
}

export function buildProgram(ws) {
  const program = new Command();

  program
    .name('littlesteps-demo')
    .description('Cross-platform CLI for LittleSteps local emulators, Firestore seeding, web clients, and Android phones')
    .version(CLI_VERSION, '-V, --version', 'Print CLI version')
    .option('--no-color', 'Disable ANSI terminal colors (also respects NO_COLOR)')
    .option('--no-input', 'Disable interactive prompts (for scripts/CI)')
    .exitOverride((err) => {
      if (err.code === 'commander.helpDisplayed' || err.code === 'commander.version') {
        process.exit(EXIT_OK);
      }
      process.exit(EXIT_USAGE);
    });

  program
    .command('start [target]')
    .description('Start local Firebase Emulators, seed catalog/demo data, and launch clients (all|react|flutter|android|api)')
    .option('--data <mode>', 'Demo family data state: seeded | empty', 'seeded')
    .option('--seed-file <path>', 'Custom JSON seed file path (overrides seed/demo-family.json)')
    .option('--db <mode>', 'Emulator persistence: persist | fresh | reset', 'persist')
    .option('-d, --device <id>', 'Flutter target device (web-server, chrome, linux) or ADB serial')
    .option('--adb-reverse', 'Forward local emulator ports (5001, 9099) to Android phone')
    .option('--wireless <ip:port>', 'Connect to Android Wireless Debugging address')
    .option('--install-apk <env>', 'Build & install release APK before starting: local | prod')
    .option('--scrcpy', 'Mirror & control Android phone via scrcpy')
    .option('--always-on-top', 'Float scrcpy window above slides (implies --scrcpy)')
    .option('--scrcpy-fps <fps>', 'Set scrcpy max FPS (default: 60; 90 or 120 over USB)', '60')
    .option('--no-browser', 'Do not auto-open browser window for Flutter Web')
    .option('--no-input', 'Disable interactive prompts')
    .action(async (target, cmdOpts) => {
      const globalOpts = program.opts();
      const code = await runStartCommand(ws, {
        ...cmdOpts,
        target: target || 'all',
        installApkMode: cmdOpts.installApk || 'none',
        noInput: cmdOpts.input === false || globalOpts.input === false,
      });
      if (code !== EXIT_OK) process.exit(code);
    });

  program
    .command('doctor')
    .description('Check prerequisites, workspace repos, catalog seed readiness, and ADB devices')
    .option('--json', 'Output machine-readable JSON on stdout')
    .option('--no-input', 'Disable interactive prompts')
    .action(async (cmdOpts) => {
      const globalOpts = program.opts();
      const code = await runDoctorCommand(ws, {
        json: Boolean(cmdOpts.json),
        noInput: cmdOpts.input === false || globalOpts.input === false,
      });
      process.exit(code);
    });

  program
    .command('status')
    .description('Inspect active LittleSteps service ports and connected Android devices')
    .option('--json', 'Output machine-readable JSON on stdout')
    .action(async (cmdOpts) => {
      const code = await runStatusCommand({ json: Boolean(cmdOpts.json) });
      process.exit(code);
    });

  program
    .command('stop')
    .description('Stop all processes listening on LittleSteps demo ports')
    .action(async () => {
      const code = await runStopCommand();
      process.exit(code);
    });

  program
    .command('seed')
    .description('Seed Firestore emulator catalogs and demo caregiver family from JSON')
    .option('--mode <mode>', 'Family data mode: seeded | empty', 'seeded')
    .option('--seed-file <path>', 'Custom JSON seed file path (overrides seed/demo-family.json)')
    .option('--catalog-only', 'Only seed Firestore catalog collections (skip demo family)')
    .option('--no-input', 'Disable interactive prompts')
    .action(async (cmdOpts) => {
      const globalOpts = program.opts();
      const code = await runSeedCommand(ws, {
        mode: cmdOpts.mode,
        seedFile: cmdOpts.seedFile || '',
        catalogOnly: Boolean(cmdOpts.catalogOnly),
        noInput: cmdOpts.input === false || globalOpts.input === false,
      });
      process.exit(code);
    });

  const android = program.command('android').description('Android phone connection, APK build/install, and scrcpy tools');

  android
    .command('connect')
    .description('Interactive USB / Wireless Debugging pair & connect wizard')
    .action(async () => {
      const code = await runAndroidConnectCommand({ noInput: program.opts().input === false });
      process.exit(code);
    });

  android
    .command('apk')
    .description('Build & install arm64 release APK (prod skips local emulators)')
    .option('--env <mode>', 'Target backend config: local | prod', 'local')
    .option('-d, --device <serial>', 'Target ADB device serial')
    .option('--wireless <ip:port>', 'Connect to Android Wireless Debugging address first')
    .option('--mirror', 'Launch scrcpy after installing APK')
    .option('--always-on-top', 'Float scrcpy window above slides (implies --mirror)')
    .option('--fps <fps>', 'Set scrcpy max FPS (60, 90, 120)', '60')
    .option('--no-input', 'Disable interactive prompts')
    .action(async (cmdOpts) => {
      const globalOpts = program.opts();
      const code = await runAndroidApkCommand(ws, {
        ...cmdOpts,
        noInput: cmdOpts.input === false || globalOpts.input === false,
      });
      process.exit(code);
    });

  android
    .command('mirror')
    .description('Launch scrcpy to mirror & control connected Android phone')
    .option('-d, --device <serial>', 'Target ADB device serial')
    .option('--wireless <ip:port>', 'Connect to Android Wireless Debugging address first')
    .option('--always-on-top', 'Float scrcpy window above slides')
    .option('--fps <fps>', 'Set scrcpy max FPS (60, 90, 120)', '60')
    .option('--no-input', 'Disable interactive prompts')
    .action(async (cmdOpts) => {
      const globalOpts = program.opts();
      const code = await runAndroidMirrorCommand({
        ...cmdOpts,
        noInput: cmdOpts.input === false || globalOpts.input === false,
      });
      process.exit(code);
    });

  android
    .command('restart-adb')
    .description('Restart ADB daemon cleanly to unfreeze USB/Wireless sockets')
    .action(async () => {
      const code = await runAndroidRestartAdbCommand({ noInput: program.opts().input === false });
      process.exit(code);
    });

  return program;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);

if (isMain) {
  (async () => {
    const ws = resolveWorkspace();
    const rawArgs = process.argv.slice(2);
    const normalized = normalizeLegacyArgv(rawArgs);

    if (normalized.length === 0) {
      if (isInteractiveTty(rawArgs.includes('--no-input'))) {
        const code = await runWizardCommand(ws, __filename);
        process.exit(code);
      }
      const program = buildProgram(ws);
      program.outputHelp();
      process.exit(EXIT_OK);
    }

    const program = buildProgram(ws);
    await program.parseAsync([process.argv[0], process.argv[1], ...normalized]);
  })().catch((err) => {
    ui.error(`Fatal error: ${err instanceof Error ? err.message : String(err)}`);
    shutdownManaged(EXIT_ERROR);
  });
}
