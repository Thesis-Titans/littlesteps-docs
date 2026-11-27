# LittleSteps Cross-Platform Demo CLI

Modular Node.js 20+/22 CLI (`run-demo.mjs`) powered by **Commander**, **`@clack/prompts`**, and **`picocolors`**. It verifies prerequisites, discovers sibling repositories dynamically, starts local Firebase Emulators, seeds the Firestore `catalog_activities` collection and demo family, launches React Web and/or Flutter Web, and manages Android ADB, release APK builds, and `scrcpy` screen mirroring.

Works identically on **Windows (PowerShell / CMD)**, **macOS**, **Linux**, and **WSL**.

---

## One-Time Setup

```bash
cd littlesteps-docs/scripts/demo-cli
npm install
```

*(Running `run-demo.cmd` on Windows or the local `./run-demo.sh` wrapper installs dependencies automatically on first launch.)*

---

## Prerequisites

| Tool | Required For | Windows (`winget`) | macOS (`brew`) | Ubuntu / WSL (`apt`) |
| :--- | :--- | :--- | :--- | :--- |
| **Node.js 20+ (22 LTS)** | All targets | `winget install OpenJS.NodeJS.LTS` | `brew install node@22` | `sudo apt install nodejs npm` |
| **Java JDK 11+ (21 LTS)** | Firebase Emulators | `winget install EclipseAdoptium.Temurin.21.JDK` | `brew install --cask temurin@21` | `sudo apt install openjdk-21-jdk` |
| **Git** | Cloning repos | `winget install Git.Git` | `brew install git` | `sudo apt install git` |
| **Flutter SDK** | Flutter / Android | [docs.flutter.dev](https://docs.flutter.dev/get-started/install/windows) | `brew install --cask flutter` | [docs.flutter.dev](https://docs.flutter.dev/get-started/install/linux) |
| **Android SDK (`adb`)** | Physical Android phone | Android Studio SDK Platform-Tools | `brew install --cask android-platform-tools` | `sudo apt install android-tools-adb` |
| **`scrcpy`** *(optional)* | Phone screen mirror & control | `winget install Genymobile.scrcpy` | `brew install scrcpy` | `sudo apt install scrcpy` |

---

## Command Reference

Run with **no arguments** in a terminal to launch the arrow-key interactive wizard:

```bash
node littlesteps-docs/scripts/demo-cli/run-demo.mjs
```

### Subcommands

| Command | Description |
| :--- | :--- |
| `start [target]` | Start Firebase Emulators + Firestore catalog seed + demo family + clients (`all`, `react`, `flutter`, `android`, `api`) |
| `doctor [--json]` | Verify prerequisites, workspace repos, `catalog_activities` seed script, Gemini config, and ADB devices |
| `status [--json]` | Inspect active demo ports (`4000, 5001, 8080, 9099, 5173, 5174`) and connected ADB devices |
| `stop` | Cleanly stop all processes listening on LittleSteps demo ports |
| `seed [--mode seeded\|empty] [--catalog-only]` | Seed Firestore `catalog_activities` (23 items) and demo family against running emulators |
| `android connect` | Interactive USB / Wireless Debugging pair & connect helper |
| `android apk --env <local\|prod>` | Validate config, build arm64 release APK, install via ADB, and launch (`prod` skips local emulators) |
| `android mirror [--always-on-top] [--fps 60\|90\|120]` | Launch `scrcpy` phone mirroring & laptop control |
| `android restart-adb` | Restart ADB daemon asynchronously to unfreeze USB/Wi-Fi sockets |

### Common One-Liners

```bash
# Check prerequisites & workspace discovery
node scripts/demo-cli/run-demo.mjs doctor

# Start everything (Emulators + 23 catalog activities + React :5173 + Flutter Web :5174)
node scripts/demo-cli/run-demo.mjs start all --no-input

# Start Flutter directly on Chrome instead of web-server
node scripts/demo-cli/run-demo.mjs start flutter -d chrome --no-input

# Build & install live-Firebase APK onto connected Android phone (no local emulators started)
node scripts/demo-cli/run-demo.mjs android apk --env prod

# Full local presentation mode with floating 120 fps scrcpy over USB
node scripts/demo-cli/run-demo.mjs start all --adb-reverse --always-on-top --scrcpy-fps 120 --no-input

# Empty onboarding state (0 children) with fresh database wipe
node scripts/demo-cli/run-demo.mjs start all --data empty --db reset --no-input

# Re-seed Firestore emulator catalog & family while emulators are already running
node scripts/demo-cli/run-demo.mjs seed

# Stop all running demo ports
node scripts/demo-cli/run-demo.mjs stop
```

> **Legacy flag compatibility:** Existing flags (`--doctor`, `--status`, `--stop`, `--restart-adb`, `--all`, `--react`, `--flutter`, `--android`, `--api`, `--install-apk`, `--install-prod-apk`, `--empty`, `--fresh`, `--reset-db`) are automatically mapped to the canonical subcommands above.

---

## Dynamic Workspace Discovery

Repositories are discovered automatically in this order:
1. Optional environment overrides: `LITTLESTEPS_ROOT`, `LITTLESTEPS_API_DIR`, `LITTLESTEPS_REACT_DIR`, `LITTLESTEPS_FLUTTER_DIR`
2. Current working directory or parent folder (supports both `littlesteps-flutter/BSIT-3A/LittleSteps` and `CC-207B_26-27_Final-Project/BSIT-3A/LittleSteps`)
3. Interactive prompt to `git clone` any missing repository from `Thesis-Titans`

---

## Demo Caregiver Credentials (Local Emulator Only)

- **Email:** `littlesteps@demo.com`
- **Password:** `Password123!`
- **Seeded profiles:** `Maya (12-23m)`, `Leo (6-11m)`, `Tala (24-35m)` + 23 curated `catalog_activities` documents in Firestore.

> **Secrets safety:** The CLI only writes local emulator defaults (`demo-littlesteps`) into `.env` / `.env.local` if those files do not exist. Never commit `.env`, `.env.local`, `config/production.json`, or Android signing keys.
