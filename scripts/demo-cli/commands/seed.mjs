import { EMULATOR_HEALTH_URL, EXIT_ERROR, EXIT_OK } from '../lib/constants.mjs';
import { httpOk } from '../lib/process.mjs';
import { seedDemoData } from '../lib/seeder.mjs';
import { ensureRequiredRepos } from '../lib/workspace.mjs';
import { c, ui } from '../lib/ui.mjs';

export async function runSeedCommand(
  ws,
  { mode = 'seeded', catalogOnly = false, seedFile = '', noInput = false } = {}
) {
  ui.intro('LittleSteps Emulator Seeder');
  await ensureRequiredRepos(ws, { needApi: true, noInput });

  if (!catalogOnly) {
    const healthy = await httpOk(EMULATOR_HEALTH_URL);
    if (!healthy) {
      ui.error('Local Firebase Emulators are not running on port 5001.');
      ui.info('Start them first with: node scripts/demo-cli/run-demo.mjs start api');
      return EXIT_ERROR;
    }
  }

  await seedDemoData(ws, { mode, catalogOnly, seedFile });
  ui.outro(c.green('Seeding complete.'));
  return EXIT_OK;
}
