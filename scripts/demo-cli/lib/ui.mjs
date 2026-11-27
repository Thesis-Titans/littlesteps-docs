import * as clack from '@clack/prompts';
import pc from 'picocolors';
import { EXIT_SIGINT } from './constants.mjs';

const hasNoColorFlag = process.argv.includes('--no-color');
const envNoColor = Boolean(process.env.NO_COLOR && process.env.NO_COLOR !== '');
export const USE_COLOR =
  !hasNoColorFlag && !envNoColor && process.env.TERM !== 'dumb' && Boolean(process.stdout.isTTY);

export const c = USE_COLOR
  ? pc
  : {
      bold: (s) => String(s),
      dim: (s) => String(s),
      cyan: (s) => String(s),
      green: (s) => String(s),
      yellow: (s) => String(s),
      red: (s) => String(s),
      blue: (s) => String(s),
      magenta: (s) => String(s),
      gray: (s) => String(s),
      inverse: (s) => String(s),
      underline: (s) => String(s),
    };

export const isInteractiveTty = (noInput = false) =>
  !noInput && Boolean(process.stdin.isTTY) && Boolean(process.stdout.isTTY);

/**
 * Unwraps a @clack/prompts response and exits cleanly (code 130) on Ctrl+C cancel.
 */
export async function promptOrCancel(promise) {
  const value = await promise;
  if (clack.isCancel(value)) {
    clack.cancel('Cancelled by user.');
    process.exit(EXIT_SIGINT);
  }
  return value;
}

/**
 * Creates a safe spinner that degrades cleanly in non-TTY / CI streams.
 */
export function createSpinner(noInput = false) {
  if (!isInteractiveTty(noInput) || !USE_COLOR) {
    return {
      start(msg) {
        if (msg) console.log(`... ${msg}`);
      },
      message(msg) {
        if (msg) console.log(`... ${msg}`);
      },
      stop(msg) {
        if (msg) console.log(msg);
      },
    };
  }
  return clack.spinner();
}

export const ui = {
  intro: (title) => (USE_COLOR ? clack.intro(c.bold(c.cyan(` ${title} `))) : console.log(`=== ${title} ===`)),
  outro: (msg) => (USE_COLOR ? clack.outro(msg) : console.log(msg)),
  note: (body, title) => (USE_COLOR ? clack.note(body, title) : console.log(`\n--- ${title} ---\n${body}\n`)),
  step: (msg) => (USE_COLOR ? clack.log.step(msg) : console.log(`> ${msg}`)),
  info: (msg) => (USE_COLOR ? clack.log.info(msg) : console.log(`[INFO] ${msg}`)),
  success: (msg) => (USE_COLOR ? clack.log.success(msg) : console.log(`[OK] ${msg}`)),
  warn: (msg) => (USE_COLOR ? clack.log.warn(msg) : console.log(`[WARN] ${msg}`)),
  error: (msg) => (USE_COLOR ? clack.log.error(msg) : console.error(`[ERROR] ${msg}`)),
};
