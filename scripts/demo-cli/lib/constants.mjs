import fs from 'node:fs';

export const CLI_VERSION = '2.0.0';

export const EXIT_OK = 0;
export const EXIT_ERROR = 1;
export const EXIT_USAGE = 2;
export const EXIT_SIGINT = 130;

export const IS_WIN = process.platform === 'win32';
export const IS_MAC = process.platform === 'darwin';
export const IS_WSL =
  !IS_WIN &&
  fs.existsSync('/proc/version') &&
  fs.readFileSync('/proc/version', 'utf8').toLowerCase().includes('microsoft');

export const DEMO_PORTS = [
  { port: 5174, label: 'Flutter Web Client' },
  { port: 5173, label: 'React Web Client' },
  { port: 4000, label: 'Firebase Emulator UI' },
  { port: 5001, label: 'API Functions' },
  { port: 8080, label: 'Firestore Emulator' },
  { port: 9099, label: 'Auth Emulator' },
];

export const EMULATOR_PORTS = [4000, 5001, 8080, 9099];

export const EMULATOR_PROJECT_ID = 'demo-littlesteps';
export const EMULATOR_API_BASE = `http://127.0.0.1:5001/${EMULATOR_PROJECT_ID}/asia-southeast1/api`;
export const EMULATOR_HEALTH_URL = `${EMULATOR_API_BASE}/health`;
export const EMULATOR_AUTH_BASE = 'http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1';

export const VALID_AGE_BANDS = ['0-5m', '6-11m', '12-23m', '24-35m', '36-47m', '48-59m', '60-71m'];

export const ANDROID_APP_ID = 'edu.wvsu.cict.titans.littlesteps';

export const REPO_URLS = {
  api: 'https://github.com/Thesis-Titans/littlesteps-api.git',
  react: 'https://github.com/Thesis-Titans/littlesteps-react.git',
  flutter: 'https://github.com/Thesis-Titans/CC-207B_26-27_Final-Project.git',
};

export const VALID_TARGETS = ['all', 'react', 'flutter', 'android', 'api'];
export const VALID_FPS = ['60', '90', '120'];
