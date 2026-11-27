import { DEMO_PORTS, EXIT_OK } from '../lib/constants.mjs';
import { killPort } from '../lib/process.mjs';
import { c, ui } from '../lib/ui.mjs';

export async function runStopCommand() {
  ui.intro('Stopping LittleSteps Services');
  for (const { port } of DEMO_PORTS) {
    killPort(port);
  }
  ui.outro(c.green(`Ports ${DEMO_PORTS.map((d) => d.port).join(', ')} are free.`));
  return EXIT_OK;
}
