# LittleSteps Cross-Platform Demo CLI

Zero-dependency Node.js CLI (`run-demo.mjs`) that checks prerequisites, auto-discovers your LittleSteps repositories, starts the local Firebase Emulators, seeds demo data, launches React Web and/or Flutter Web, and optionally installs the Android release APK and mirrors your phone via `scrcpy`.

Works identically on **Windows (PowerShell / CMD)**, **macOS**, **Linux**, and **WSL**.

---

## Prerequisites

| Tool | Required For | Windows (`winget`) | macOS (`brew`) | Ubuntu / WSL (`apt`) |
| :--- | :--- | :--- | :--- | :--- |
| **Node.js 20+ (22 LTS)** | All targets | `winget install OpenJS.NodeJS.LTS` | `brew install node@22` | `sudo apt install nodejs npm` |
| **Java JDK 11+ (21 LTS)** | Firebase Emulators | `winget install EclipseAdoptium.Temurin.21.JDK` | `brew install --cask temurin@21` | `sudo apt install openjdk-21-jdk` |
| **Git** | Cloning repos | `winget install Git.Git` | `brew install git` | `sudo apt install git` |
| **Flutter SDK** | Flutter / Android | [docs.flutter.dev](https://docs.flutter.dev/get-started/install/windows) | `brew install --cask flutter` | [docs.flutter.dev](https://docs.flutter.dev/get-started/install/linux) |
| **Android SDK (`adb`)** | Physical Android phone | Installed with Android Studio (`%LOCALAPPDATA%\Android\Sdk\platform-tools`) | `brew install --cask android-platform-tools` | `sudo apt install android-tools-adb` |
| **`scrcpy`** *(optional)* | Phone screen mirror & control | `winget install Genymobile.scrcpy` | `brew install scrcpy` | `sudo apt install scrcpy` |

Run the built-in setup doctor first to see what is installed or missing on your machine:

```bash
# Windows PowerShell / CMD, macOS, or Linux:
node scripts/demo-cli/run-demo.mjs --doctor

# Machine-readable JSON output (for scripts / CI):
node scripts/demo-cli/run-demo.mjs --doctor --json
```

---

## Quick Start

### Interactive Wizard (Recommended)

Run with no arguments in any terminal (or double-click `run-demo.cmd` on Windows):

```powershell
# Windows (PowerShell or CMD, from workspace parent or littlesteps-docs/)
node littlesteps-docs\scripts\demo-cli\run-demo.mjs

# macOS / Linux / WSL
node littlesteps-docs/scripts/demo-cli/run-demo.mjs
```

The wizard detects your sibling repos and connected Android phone automatically, prompts for your preferences, and prints the equivalent non-interactive one-liner for next time.

### Common One-Liners

```bash
# Check prerequisites and workspace repo discovery
node scripts/demo-cli/run-demo.mjs --doctor

# Start everything (Emulators + React :5173 + Flutter Web :5174)
node scripts/demo-cli/run-demo.mjs --all --no-input

# Full presentation mode: local-emulator APK install + ADB reverse + floating 60 fps scrcpy
node scripts/demo-cli/run-demo.mjs --all --install-apk --always-on-top --no-input

# High-refresh 120 fps scrcpy over USB alongside slides (APK already installed)
node scripts/demo-cli/run-demo.mjs --all --adb-reverse --always-on-top --scrcpy-fps 120 --no-input

# Start in empty onboarding state (0 children) to demo NoChildrenView
node scripts/demo-cli/run-demo.mjs --all --empty --reset-db --no-input

# Check active ports and connected Android devices
node scripts/demo-cli/run-demo.mjs --status

# Restart ADB daemon if phone connection is frozen or unattached
node scripts/demo-cli/run-demo.mjs --restart-adb

# Stop all running demo services cleanly
node scripts/demo-cli/run-demo.mjs --stop
```

---

## Dynamic Workspace Discovery (No Hardcoded Paths)

The CLI locates repositories automatically in this order:
1. Optional environment overrides: `LITTLESTEPS_ROOT`, `LITTLESTEPS_API_DIR`, `LITTLESTEPS_REACT_DIR`, `LITTLESTEPS_FLUTTER_DIR`
2. Current working directory or parent workspace folder (supports both `littlesteps-flutter/BSIT-3A/LittleSteps` and `CC-207B_26-27_Final-Project/BSIT-3A/LittleSteps`)
3. Interactive prompt to `git clone` any missing repository from `Thesis-Titans`

---

## Demo Caregiver Credentials (Local Emulator Only)

* **Email:** `littlesteps@demo.com`
* **Password:** `Password123!`
* **Seeded profiles:** `Maya (12-23m)`, `Leo (6-11m)`, `Tala (24-35m)`

> **Secrets safety:** The CLI only writes local emulator defaults (`demo-littlesteps`) into `.env` / `.env.local` if those files do not exist. Never commit `.env`, `.env.local`, `config/production.json`, or Android signing keys.
