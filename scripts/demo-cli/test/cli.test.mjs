import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { CLI_VERSION, EXIT_OK, EXIT_USAGE } from '../lib/constants.mjs';
import { isValidDeviceSerial, isValidFps, isValidHostPort } from '../lib/process.mjs';
import { DEFAULT_SEED_FILE, loadDemoSeedConfig, resolveSeedDate } from '../lib/seeder.mjs';
import { resolveWorkspace } from '../lib/workspace.mjs';
import { resolveFlutterRunPlan } from '../commands/start.mjs';
import { normalizeLegacyArgv } from '../run-demo.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cliPath = path.resolve(__dirname, '../run-demo.mjs');

function runCli(args) {
  return spawnSync(process.execPath, [cliPath, ...args], {
    encoding: 'utf8',
    env: { ...process.env, NO_COLOR: '1' },
  });
}

test('prints CLI version with --version', () => {
  const res = runCli(['--version']);
  assert.equal(res.status, EXIT_OK);
  assert.equal(res.stdout.trim(), CLI_VERSION);
});

test('prints root and subcommand help cleanly', () => {
  for (const args of [['--help'], ['start', '--help'], ['android', '--help'], ['seed', '--help']]) {
    const res = runCli(args);
    assert.equal(res.status, EXIT_OK);
    assert.match(res.stdout, /Usage:/);
  }
});

test('normalizeLegacyArgv maps legacy flags to canonical subcommands', () => {
  assert.deepEqual(normalizeLegacyArgv(['--doctor', '--json']), ['doctor', '--json']);
  assert.deepEqual(normalizeLegacyArgv(['--status', '--json']), ['status', '--json']);
  assert.deepEqual(normalizeLegacyArgv(['--stop']), ['stop']);
  assert.deepEqual(normalizeLegacyArgv(['--restart-adb']), ['android', 'restart-adb']);
  assert.deepEqual(normalizeLegacyArgv(['--all', '--empty', '--reset-db', '--no-input']), [
    'start',
    'all',
    '--data',
    'empty',
    '--db',
    'reset',
    '--no-input',
  ]);
  assert.deepEqual(normalizeLegacyArgv(['--install-prod-apk', '--scrcpy-fps', '120', '--no-input']), [
    'android',
    'apk',
    '--env',
    'prod',
    '--fps',
    '120',
    '--no-input',
  ]);
});

test('validates host:port, device serial, and FPS inputs strictly', () => {
  assert.equal(isValidHostPort('192.168.10.1:44775'), true);
  assert.equal(isValidHostPort('invalid-host'), false);
  assert.equal(isValidHostPort('192.168.1.1:80;rm -rf'), false);

  assert.equal(isValidDeviceSerial('web-server'), true);
  assert.equal(isValidDeviceSerial('adb-1234._tcp'), true);
  assert.equal(isValidDeviceSerial('bad serial;id'), false);

  assert.equal(isValidFps('60'), true);
  assert.equal(isValidFps('120'), true);
  assert.equal(isValidFps('5'), false);
  assert.equal(isValidFps('abc'), false);
});

test('rejects invalid start options with EXIT_USAGE (2)', () => {
  const badTarget = runCli(['start', 'invalid-target', '--no-input']);
  assert.equal(badTarget.status, EXIT_USAGE);

  const badWireless = runCli(['start', 'api', '--wireless', 'not-an-ip', '--no-input']);
  assert.equal(badWireless.status, EXIT_USAGE);

  const badFps = runCli(['start', 'api', '--scrcpy-fps', '999', '--no-input']);
  assert.equal(badFps.status, EXIT_USAGE);
});

test('doctor --json and status --json emit valid machine-readable JSON', () => {
  const docRes = runCli(['doctor', '--json', '--no-input']);
  assert.ok(docRes.status === 0 || docRes.status === 1);
  const docJson = JSON.parse(docRes.stdout);
  assert.equal(typeof docJson.ok, 'boolean');
  assert.equal(typeof docJson.catalogSeedReady, 'boolean');
  assert.ok(Array.isArray(docJson.checks));

  const statRes = runCli(['status', '--json']);
  assert.equal(statRes.status, EXIT_OK);
  const statJson = JSON.parse(statRes.stdout);
  assert.equal(statJson.ports.length, 6);
  assert.ok(Array.isArray(statJson.devices));
});

test('resolveWorkspace discovers sibling LittleSteps repositories', () => {
  const ws = resolveWorkspace();
  assert.ok(ws.rootDir);
  assert.ok(ws.apiDir && ws.apiDir.endsWith('littlesteps-api'));
  assert.ok(ws.reactDir && ws.reactDir.endsWith('littlesteps-react'));
  assert.ok(ws.flutterDir && ws.flutterDir.endsWith('LittleSteps'));
});

test('loadDemoSeedConfig loads and validates external JSON seed file', () => {
  const cfg = loadDemoSeedConfig(DEFAULT_SEED_FILE);
  assert.equal(cfg.seedFilePath, DEFAULT_SEED_FILE);
  assert.ok(cfg.caregiver.email.includes('@'));
  assert.ok(cfg.caregiver.password.length >= 6);
  assert.ok(cfg.children.length >= 1);
  assert.ok(Array.isArray(cfg.children[0].plans));

  const tmpFile = path.join(os.tmpdir(), `littlesteps-seed-test-${Date.now()}.json`);
  try {
    fs.writeFileSync(
      tmpFile,
      JSON.stringify({
        caregiver: { email: 'custom@example.com', password: 'Secret123!' },
        children: [{ nickname: 'Kai', ageBand: '36-47m' }],
      }),
      'utf8'
    );
    const custom = loadDemoSeedConfig(tmpFile);
    assert.equal(custom.caregiver.email, 'custom@example.com');
    assert.equal(custom.children.length, 1);
    assert.equal(custom.children[0].nickname, 'Kai');
    assert.deepEqual(custom.children[0].plans, []);

    fs.writeFileSync(
      tmpFile,
      JSON.stringify({
        caregiver: { email: 'bad@example.com', password: 'Secret123!' },
        children: [{ nickname: 'Bad', ageBand: '99-100m' }],
      }),
      'utf8'
    );
    assert.throws(() => loadDemoSeedConfig(tmpFile), /ageBand/);
  } finally {
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
  }
});

test('resolveSeedDate supports explicit ISO dates and relative dayOffset', () => {
  const base = new Date('2026-12-01T12:00:00.000Z');
  assert.equal(resolveSeedDate({ dayOffset: 0, baseDate: base }), '2026-12-01');
  assert.equal(resolveSeedDate({ dayOffset: -2, baseDate: base }), '2026-11-29');
  assert.equal(resolveSeedDate({ explicitDate: '2026-11-15', dayOffset: 0, baseDate: base }), '2026-11-15');
});

test('resolveFlutterRunPlan avoids debug flutter run collision after installing Android APK', () => {
  assert.deepEqual(
    resolveFlutterRunPlan({
      target: 'all',
      device: 'adb-1234._adb-tls-connect._tcp',
      androidSerial: 'adb-1234._adb-tls-connect._tcp',
      installApkMode: 'local',
    }),
    { shouldRunFlutter: true, flutterTargetDevice: 'web-server' }
  );

  assert.deepEqual(
    resolveFlutterRunPlan({
      target: 'flutter',
      device: 'adb-1234._adb-tls-connect._tcp',
      androidSerial: 'adb-1234._adb-tls-connect._tcp',
      installApkMode: 'local',
    }),
    { shouldRunFlutter: false, flutterTargetDevice: null }
  );

  assert.deepEqual(
    resolveFlutterRunPlan({
      target: 'flutter',
      device: 'adb-1234._adb-tls-connect._tcp',
      androidSerial: 'adb-1234._adb-tls-connect._tcp',
      installApkMode: 'none',
    }),
    { shouldRunFlutter: true, flutterTargetDevice: 'adb-1234._adb-tls-connect._tcp' }
  );

  for (const target of ['react', 'android', 'api']) {
    assert.deepEqual(
      resolveFlutterRunPlan({ target, device: '', androidSerial: '', installApkMode: 'none' }),
      { shouldRunFlutter: false, flutterTargetDevice: null }
    );
  }
});
