import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { DEMO_CREDENTIALS, EMULATOR_API_BASE, EMULATOR_AUTH_BASE } from './constants.mjs';
import { sleep } from './process.mjs';
import { ui } from './ui.mjs';

/**
 * Seeds the Firestore emulator `catalog_activities` collection via littlesteps-api's canonical script.
 */
export function seedCatalogEmulator(ws) {
  if (!ws?.apiDir) {
    ui.warn('[Catalog] littlesteps-api directory not found; skipping catalog_activities seed.');
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
 * Idempotently seeds Firestore `catalog_activities` and the local demo family (Maya, Leo, Tala)
 * or clears children to 0 when `mode === 'empty'`.
 */
export async function seedDemoData(ws, { mode = 'seeded', catalogOnly = false } = {}) {
  seedCatalogEmulator(ws);
  if (catalogOnly) return;

  const apiBase = `${EMULATOR_API_BASE}/api/v1`;
  const creds = { ...DEMO_CREDENTIALS, returnSecureToken: true };

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
    return;
  }

  const authHeaders = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  const listRes = await fetch(`${apiBase}/children`, { headers: authHeaders });
  const children = listRes.ok ? await listRes.json() : [];

  if (mode === 'empty') {
    for (const child of Array.isArray(children) ? children : []) {
      await fetch(`${apiBase}/children/${child.id}`, { method: 'DELETE', headers: authHeaders });
    }
    ui.success('[Demo Data] Empty onboarding state ready (0 children).');
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
        {
          milestoneId: 'lan-12-01',
          status: 'observed',
          observedDate: today,
          notes: 'Smiled, turned head when called, and pointed to her cup.',
        },
        {
          milestoneId: 'mot-12-01',
          status: 'observed',
          observedDate: d2,
          notes: 'Walked four steady steps across the mat toward a cushion.',
        },
        {
          milestoneId: 'cog-12-01',
          status: 'observed',
          observedDate: d5,
          notes: 'Nested two plastic cups together after watching once.',
        },
      ]) {
        await fetch(`${apiBase}/children/${mayaId}/milestones`, {
          method: 'POST',
          headers: authHeaders,
          body: JSON.stringify(m),
        });
      }
    }

    const journal = await (await fetch(`${apiBase}/children/${mayaId}/journal`, { headers: authHeaders })).json();
    if (Array.isArray(journal) && journal.length === 0) {
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
        {
          id: 'OL45804W',
          title: 'Goodnight Moon',
          authors: ['Margaret Wise Brown'],
          coverUrl: 'https://covers.openlibrary.org/b/id/8225266-M.jpg?default=false',
          subjects: ['Bedtime', 'Stories in rhyme'],
        },
        {
          id: 'OL1968368W',
          title: 'The Very Hungry Caterpillar',
          authors: ['Eric Carle'],
          coverUrl: 'https://covers.openlibrary.org/b/id/8231990-M.jpg?default=false',
          subjects: ['Picture books', 'Animals', 'Counting'],
        },
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
      await fetch(`${apiBase}/children/${leoId}/plans`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ activityId: 'act-002', scheduledDate: today, status: 'planned' }),
      });
      await fetch(`${apiBase}/children/${leoId}/plans`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ activityId: 'act-012', scheduledDate: d1, status: 'completed' }),
      });
    }
  }

  if (talaId) {
    const plans = await (await fetch(`${apiBase}/children/${talaId}/plans`, { headers: authHeaders })).json();
    if (Array.isArray(plans) && plans.length === 0) {
      await fetch(`${apiBase}/children/${talaId}/plans`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ activityId: 'act-004', scheduledDate: d7, status: 'completed' }),
      });
    }
  }

  ui.success('[Demo Data] Seeded 3-child family ready (Maya, Leo, Tala).');
}
