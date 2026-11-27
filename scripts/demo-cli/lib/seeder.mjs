import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { EMULATOR_API_BASE, EMULATOR_AUTH_BASE, VALID_AGE_BANDS } from './constants.mjs';
import { sleep } from './process.mjs';
import { ui } from './ui.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const SEED_DIR = path.resolve(__dirname, '..', 'seed');
export const DEFAULT_SEED_FILE = path.join(SEED_DIR, 'demo-family.json');
export const LOCAL_SEED_FILE = path.join(SEED_DIR, 'demo-family.local.json');

/**
 * Resolves the demo family JSON seed file in priority order:
 * 1. Explicit `--seed-file <path>` flag
 * 2. `LITTLESTEPS_DEMO_SEED_FILE` environment variable
 * 3. Local gitignored override `scripts/demo-cli/seed/demo-family.local.json`
 * 4. Default tracked fixture `scripts/demo-cli/seed/demo-family.json`
 */
export function resolveSeedFilePath(explicitPath = '') {
  const requested = (explicitPath || process.env.LITTLESTEPS_DEMO_SEED_FILE || '').trim();
  if (requested) return path.resolve(process.cwd(), requested);
  if (fs.existsSync(LOCAL_SEED_FILE)) return LOCAL_SEED_FILE;
  return DEFAULT_SEED_FILE;
}

/**
 * Resolves an ISO `YYYY-MM-DD` date from either an explicit string or a relative `dayOffset`.
 */
export function resolveSeedDate({ explicitDate, dayOffset = 0, baseDate = new Date() } = {}) {
  if (typeof explicitDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(explicitDate.trim())) {
    return explicitDate.trim();
  }
  const offset = Number.isInteger(dayOffset) ? dayOffset : 0;
  const d = new Date(baseDate.getTime());
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

/**
 * Loads and validates the external JSON demo family seed file.
 */
export function loadDemoSeedConfig(explicitPath = '') {
  const seedFilePath = resolveSeedFilePath(explicitPath);
  if (!fs.existsSync(seedFilePath)) {
    throw new Error(`Demo seed file not found: ${seedFilePath}`);
  }

  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(seedFilePath, 'utf8'));
  } catch (err) {
    throw new Error(`Invalid JSON in demo seed file (${seedFilePath}): ${err.message}`);
  }

  const email = parsed?.caregiver?.email;
  const password = parsed?.caregiver?.password;
  if (typeof email !== 'string' || !email.trim() || typeof password !== 'string' || !password.trim()) {
    throw new Error(`Demo seed file (${seedFilePath}) must define non-empty caregiver.email and caregiver.password.`);
  }

  if (!Array.isArray(parsed.children)) {
    throw new Error(`Demo seed file (${seedFilePath}) must define a "children" array.`);
  }

  const validBands = new Set(VALID_AGE_BANDS);
  const children = parsed.children.map((child, idx) => {
    if (!child || typeof child.nickname !== 'string' || !child.nickname.trim()) {
      throw new Error(`Demo seed file (${seedFilePath}): children[${idx}].nickname must be a non-empty string.`);
    }
    if (!validBands.has(child.ageBand)) {
      throw new Error(
        `Demo seed file (${seedFilePath}): children[${idx}].ageBand "${child.ageBand}" must be one of ${VALID_AGE_BANDS.join(', ')}.`
      );
    }
    return {
      nickname: child.nickname.trim(),
      ageBand: child.ageBand,
      plans: Array.isArray(child.plans) ? child.plans : [],
      milestones: Array.isArray(child.milestones) ? child.milestones : [],
      journal: Array.isArray(child.journal) ? child.journal : [],
      books: Array.isArray(child.books) ? child.books : [],
    };
  });

  return {
    seedFilePath,
    caregiver: { email: email.trim(), password },
    children,
  };
}

/**
 * Seeds the Firestore emulator catalog collections (`catalog_activities`, `catalog_milestones`,
 * `catalog_rhymes`) via littlesteps-api's canonical script.
 */
export function seedCatalogEmulator(ws) {
  if (!ws?.apiDir) {
    ui.warn('[Catalog] littlesteps-api directory not found; skipping Firestore catalog seed.');
    return false;
  }
  const seedScript = path.join(ws.apiDir, 'scripts', 'seed-catalog.mjs');
  if (!fs.existsSync(seedScript)) {
    ui.warn(`[Catalog] Seed script missing at ${seedScript}; skipping.`);
    return false;
  }
  const res = spawnSync(process.execPath, [seedScript, '--emulator'], {
    cwd: ws.apiDir,
    stdio: 'pipe',
    encoding: 'utf8',
  });
  if (res.status === 0 && res.stdout) {
    ui.success(`[Catalog] ${res.stdout.trim()}`);
    return true;
  }
  ui.warn(`[Catalog] Seed warning: ${(res.stderr || res.stdout || 'unknown error').trim()}`);
  return false;
}

/**
 * Idempotently seeds Firestore catalog collections and the local demo family defined in the
 * external JSON seed file, or clears children to 0 when `mode === 'empty'`.
 */
export async function seedDemoData(ws, { mode = 'seeded', catalogOnly = false, seedFile = '' } = {}) {
  seedCatalogEmulator(ws);
  if (catalogOnly) return null;

  const config = loadDemoSeedConfig(seedFile);
  const apiBase = `${EMULATOR_API_BASE}/api/v1`;
  const creds = { ...config.caregiver, returnSecureToken: true };

  let token = '';
  for (let attempt = 0; attempt < 5 && !token; attempt++) {
    for (const endpoint of ['accounts:signInWithPassword', 'accounts:signUp']) {
      try {
        const res = await fetch(`${EMULATOR_AUTH_BASE}/${endpoint}?key=fake-api-key`, {
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
        // Retry until Auth emulator responds
      }
    }
    if (!token) await sleep(1000);
  }

  if (!token) {
    ui.warn('[Demo Data] Could not authenticate demo account; register via the app.');
    return config;
  }

  const authHeaders = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  const listRes = await fetch(`${apiBase}/children`, { headers: authHeaders });
  const existingChildren = listRes.ok ? await listRes.json() : [];

  if (mode === 'empty') {
    for (const child of Array.isArray(existingChildren) ? existingChildren : []) {
      await fetch(`${apiBase}/children/${child.id}`, { method: 'DELETE', headers: authHeaders });
    }
    ui.success('[Demo Data] Empty onboarding state ready (0 children).');
    return config;
  }

  const now = new Date();
  const seededNames = [];

  async function ensureChild(nickname, ageBand) {
    const existing = Array.isArray(existingChildren) ? existingChildren.find((c) => c.nickname === nickname) : null;
    if (existing?.id) return existing.id;
    const res = await fetch(`${apiBase}/children`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ nickname, ageBand }),
    });
    const created = res.ok ? await res.json() : {};
    return created.id || null;
  }

  for (const child of config.children) {
    const childId = await ensureChild(child.nickname, child.ageBand);
    if (!childId) continue;
    seededNames.push(child.nickname);

    if (child.plans.length > 0) {
      const existingPlans = await (await fetch(`${apiBase}/children/${childId}/plans`, { headers: authHeaders })).json();
      if (Array.isArray(existingPlans) && existingPlans.length === 0) {
        for (const p of child.plans) {
          await fetch(`${apiBase}/children/${childId}/plans`, {
            method: 'POST',
            headers: authHeaders,
            body: JSON.stringify({
              activityId: p.activityId,
              scheduledDate: resolveSeedDate({ explicitDate: p.scheduledDate, dayOffset: p.dayOffset, baseDate: now }),
              status: p.status || 'planned',
            }),
          });
        }
      }
    }

    if (child.milestones.length > 0) {
      const existingMs = await (await fetch(`${apiBase}/children/${childId}/milestones`, { headers: authHeaders })).json();
      if (Array.isArray(existingMs) && existingMs.length === 0) {
        for (const m of child.milestones) {
          await fetch(`${apiBase}/children/${childId}/milestones`, {
            method: 'POST',
            headers: authHeaders,
            body: JSON.stringify({
              milestoneId: m.milestoneId,
              status: m.status || 'observed',
              observedDate: resolveSeedDate({ explicitDate: m.observedDate, dayOffset: m.dayOffset, baseDate: now }),
              notes: m.notes || '',
            }),
          });
        }
      }
    }

    if (child.journal.length > 0) {
      const existingJournal = await (await fetch(`${apiBase}/children/${childId}/journal`, { headers: authHeaders })).json();
      if (Array.isArray(existingJournal) && existingJournal.length === 0) {
        for (const entry of child.journal) {
          await fetch(`${apiBase}/children/${childId}/journal`, {
            method: 'POST',
            headers: authHeaders,
            body: JSON.stringify({
              entryDate: resolveSeedDate({ explicitDate: entry.entryDate, dayOffset: entry.dayOffset, baseDate: now }),
              content: entry.content,
            }),
          });
        }
      }
    }

    if (child.books.length > 0) {
      const existingBooks = await (await fetch(`${apiBase}/children/${childId}/books`, { headers: authHeaders })).json();
      if (Array.isArray(existingBooks?.books) && existingBooks.books.length === 0) {
        for (const b of child.books) {
          await fetch(`${apiBase}/children/${childId}/books`, {
            method: 'POST',
            headers: authHeaders,
            body: JSON.stringify(b),
          });
        }
      }
    }
  }

  const label = seededNames.length > 0 ? `${seededNames.length}-child family ready (${seededNames.join(', ')})` : '0 children seeded';
  ui.success(`[Demo Data] ${label} from ${path.basename(config.seedFilePath)}.`);
  return config;
}
