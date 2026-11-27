import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as clack from '@clack/prompts';
import { EXIT_ERROR, REPO_URLS } from './constants.mjs';
import { runSync } from './process.mjs';
import { isInteractiveTty, promptOrCancel, ui } from './ui.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Resolves LittleSteps sibling repositories dynamically with zero hardcoded paths.
 * Precedence: LITTLESTEPS_* env vars > cwd > parent of cwd > repo sibling root.
 */
export function resolveWorkspace(env = process.env, cwd = process.cwd()) {
  const scriptWorkspaceGuess = path.resolve(__dirname, '..', '..', '..', '..');
  const candidates = [env.LITTLESTEPS_ROOT, cwd, path.dirname(cwd), scriptWorkspaceGuess].filter(Boolean);

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
    env.LITTLESTEPS_API_DIR ||
    (fs.existsSync(path.join(rootDir, 'littlesteps-api', 'package.json'))
      ? path.join(rootDir, 'littlesteps-api')
      : null);

  const reactDir =
    env.LITTLESTEPS_REACT_DIR ||
    (fs.existsSync(path.join(rootDir, 'littlesteps-react', 'package.json'))
      ? path.join(rootDir, 'littlesteps-react')
      : null);

  const flutterCandidates = [
    env.LITTLESTEPS_FLUTTER_DIR,
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

/**
 * Ensures required repositories exist, offering an interactive clone in TTY mode.
 */
export async function ensureRequiredRepos(ws, { needApi = true, needReact = false, needFlutter = false, noInput = false }) {
  const needs = [
    { key: 'api', dir: ws.apiDir, folder: 'littlesteps-api', url: REPO_URLS.api, required: needApi },
    { key: 'react', dir: ws.reactDir, folder: 'littlesteps-react', url: REPO_URLS.react, required: needReact },
    { key: 'flutter', dir: ws.flutterDir, folder: 'littlesteps-flutter', url: REPO_URLS.flutter, required: needFlutter },
  ];

  for (const item of needs) {
    if (!item.required || item.dir) continue;
    const dest = path.join(ws.rootDir, item.folder);
    if (isInteractiveTty(noInput)) {
      const shouldClone = await promptOrCancel(
        clack.confirm({
          message: `Missing ${item.folder}. Clone from GitHub into ${dest}?`,
          initialValue: true,
        })
      );
      if (shouldClone) {
        const cloned = runSync('git', ['clone', item.url, dest], { stdio: 'inherit' });
        if (cloned.status === 0) {
          if (item.key === 'api') ws.apiDir = dest;
          if (item.key === 'react') ws.reactDir = dest;
          if (item.key === 'flutter') ws.flutterDir = path.join(dest, 'BSIT-3A', 'LittleSteps');
          continue;
        }
      }
    }
    ui.error(`Required repository '${item.folder}' not found in ${ws.rootDir}.`);
    ui.info(`Clone it with: git clone ${item.url} ${dest}`);
    process.exit(EXIT_ERROR);
  }
}
