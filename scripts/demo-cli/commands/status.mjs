import { DEMO_PORTS, EXIT_OK } from '../lib/constants.mjs';
import { detectAdbDevices } from '../lib/adb.mjs';
import { getPortPids } from '../lib/process.mjs';
import { c, ui } from '../lib/ui.mjs';

export async function runStatusCommand({ json = false } = {}) {
  const ports = DEMO_PORTS.map(({ port, label }) => {
    const pids = getPortPids(port);
    return { port, label, active: pids.length > 0, pids };
  });
  const devices = await detectAdbDevices();

  if (json) {
    console.log(JSON.stringify({ ports, devices }, null, 2));
    return EXIT_OK;
  }

  ui.intro('LittleSteps Service Status');

  const portLines = ports.map((p) =>
    p.active
      ? `[${c.green('ACTIVE')}]   Port ${p.port} — ${p.label} (PID: ${p.pids.join(', ')})`
      : `[${c.dim('INACTIVE')}] Port ${p.port} — ${p.label}`
  );
  ui.note(portLines.join('\n'), 'Service Ports');

  const deviceLines =
    devices.length === 0
      ? [`[${c.yellow('NONE')}] No USB or Wireless ADB device detected`]
      : devices.map((d) => `[${c.green('DEVICE')}] ${d.model} (${c.cyan(d.serial)})`);
  ui.note(deviceLines.join('\n'), 'Connected Android Devices');

  ui.outro('Status check complete.');
  return EXIT_OK;
}
