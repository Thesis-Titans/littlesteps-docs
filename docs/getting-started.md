# LittleSteps Developer Onboarding Guide

**Status:** Canonical Developer Tutorial Baseline  
**Governing Standard:** Diátaxis Framework (Learning-Oriented Tutorial)  
**Owner:** Mark Alvin Cadangin (Technical Lead)  
**Last Reviewed:** 2026-11-27  
**Related Documents:** [API Reference & Integration Guide](api-reference.md), [Contribution Guidelines](../CONTRIBUTING.md), [Architecture Decisions](architecture-decisions.md)

---

This guide describes the intended local setup for the active LittleSteps repositories. Verify commands and version requirements against the current repository state before relying on them.

---

## 1. System Prerequisites

Ensure the following tools are installed and available in your shell:

| Tool | Required Version | Verification Command | Notes |
| :--- | :--- | :--- | :--- |
| **Node.js** | 22.x LTS | `node -v` | Active engine target in all packages. |
| **npm** | 10.x+ | `npm -v` | Bundled with Node.js 22. |
| **Java JDK** | 21 LTS (Temurin/OpenJDK) | `java -version` | Required by the Firebase Emulator Suite runtime. |
| **Git** | 2.34+ | `git --version` | Version control. |

> [!NOTE]
> You do **not** need to install `firebase-tools` globally. The API repository manages `firebase-tools` as a locked local devDependency (`npx firebase` or `npm run ...`).

---

## 2. Workspace Layout & Cloning

LittleSteps uses a multi-repository structure where related repositories reside in a common parent workspace:

```bash
mkdir -p littlesteps
cd littlesteps

# Clone the active repositories:
git clone https://github.com/Thesis-Titans/littlesteps-docs.git
git clone https://github.com/Thesis-Titans/littlesteps-api.git
git clone https://github.com/Thesis-Titans/littlesteps-react.git
# Flutter app (CC 207B course fork; the app is in BSIT-3A/LittleSteps):
git clone https://github.com/Thesis-Titans/CC-207B_26-27_Final-Project.git littlesteps-flutter
```

Resulting directory tree:
```text
littlesteps/
├── littlesteps-docs/       # Canonical architecture, scope, research, and provenance
├── littlesteps-api/        # TypeScript Express backend on Firebase Functions v2
├── littlesteps-react/      # React + TypeScript + Vite frontend
└── littlesteps-flutter/    # Flutter app, course fork; code in BSIT-3A/LittleSteps
```

> [!TIP]
> **One-Command Cross-Platform Setup & Demo CLI (Windows / macOS / Linux / WSL):**
> Instead of starting each service manually, use the cross-platform Node.js Demo CLI documented in [scripts/demo-cli/README.md](../scripts/demo-cli/README.md):
> ```bash
> # One-time CLI dependency install:
> cd littlesteps-docs/scripts/demo-cli && npm install && cd ../..
>
> # Check prerequisites (Node, Java JDK, Git, Flutter, ADB, scrcpy) and workspace repos:
> node littlesteps-docs/scripts/demo-cli/run-demo.mjs doctor
>
> # Start Emulators + Firestore catalog seed + React Web (:5173) + Flutter Web (:5174):
> node littlesteps-docs/scripts/demo-cli/run-demo.mjs start all --no-input
>
> # Or launch the interactive wizard (double-click run-demo.cmd on Windows):
> node littlesteps-docs/scripts/demo-cli/run-demo.mjs
> ```
> The CLI auto-discovers both `littlesteps-flutter` and `CC-207B_26-27_Final-Project` folder names, offers to clone missing repos, scaffolds safe local emulator `.env` defaults, seeds Firestore catalogs (`catalog_activities`, `catalog_milestones`, `catalog_rhymes`) and `seed/demo-family.json`, and supports Android ADB reverse + `scrcpy` mirroring.

---

## 3. Backend Setup: `littlesteps-api`

The API backend runs on Firebase Cloud Functions with Express, Firebase Authentication, and Firestore.

### A. Environment Configuration
Navigate to the API folder and copy the environment template:
```bash
cd littlesteps-api
cp .env.example .env
```
Default `.env` contents:
```ini
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
OPEN_LIBRARY_CONTACT=
```
*(Allowlists local Vite frontend requests during development. Set `OPEN_LIBRARY_CONTACT` to a real contact address before calling the catalog books route.)*

The file also lists optional settings: `GEMINI_API_KEY` and an explicit pinned stable `GEMINI_MODEL` (e.g., `gemini-3.5-flash-lite`; both needed to turn the Gemini provider on; leave empty locally), `AI_IP_LIMIT_PER_HOUR`, and `TRUST_PROXY_HOPS`. See `.env.example` for what each does. Never commit real values. Activity catalog documents are loaded from Firestore `catalog_activities` (seed the local emulator with `npm run seed:catalog:emulator`).

> [!SECURITY]
> `.env` is ignored by Git. Never commit service account keys, private secrets, or production credentials to `.env`.

### B. Dependency Installation
Install dependencies cleanly from the locked manifest:
```bash
npm ci
```

### C. Verification Commands
Run the complete automated quality checks:
```bash
# 1. Lint TypeScript source and test files
npm run lint

# 2. Typecheck with TypeScript compiler
npm run typecheck

# 3. Compile TypeScript output to lib/
npm run build

# 4. Run unit tests (Vitest)
npm test

# 5. Run headless Firebase Auth and Firestore Emulator integration tests
npm run test:emulator
```

> [!TIP]
> `npm run test:emulator` starts isolated, offline Auth and Firestore emulators under project ID `demo-littlesteps`, runs the synthetic token, child profile, plan, and milestone emulator integration tests, and automatically shuts down. `npm test` skips these and runs the unit, integration, and security regression suites. No Google Cloud credentials or billing accounts are touched.

### D. Running Interactive Emulators
To start the emulators for active frontend development:
1. First ensure the API code is compiled:
   ```bash
   npm run build
   ```
2. Start the emulator suite bound to the demo project ID:
   ```bash
   npm run emulators -- --project demo-littlesteps
   ```
*(Note: Passing `--project demo-littlesteps` ensures the Functions emulator binds to the expected `demo-littlesteps` path).*

This boots:
- **Emulator UI**: `http://127.0.0.1:4000` (inspect auth records and database state)
- **Authentication Emulator**: `127.0.0.1:9099`
- **Firestore Emulator**: `127.0.0.1:8080`
- **Cloud Functions / API**: `http://127.0.0.1:5001/demo-littlesteps/asia-southeast1/api`

---

## 4. Frontend Setup: `littlesteps-react`

The frontend is a React 19 application bundled with Vite.

### A. Environment Configuration
Open a second terminal window, navigate to the web directory, and configure local variables:
```bash
cd ../littlesteps-react
cp .env.example .env.local
```
Configure `VITE_API_BASE_URL` to point to your local Functions emulator endpoint:
```ini
VITE_API_BASE_URL=http://127.0.0.1:5001/demo-littlesteps/asia-southeast1/api
VITE_USE_EMULATORS=true
VITE_FIREBASE_API_KEY=demo-api-key
VITE_FIREBASE_AUTH_DOMAIN=demo-littlesteps.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=demo-littlesteps
VITE_FIREBASE_APP_ID=1:000000000000:web:demo
```

> [!CAUTION]
> Never place server secrets (such as Firebase Admin SDK keys or AI provider API keys) in `.env.local` or any `VITE_*` variable. Vite exposes all `VITE_*` variables to client browser bundles.

### B. Dependency Installation
Install dependencies cleanly from the lockfile:
```bash
npm ci
```

### C. Verification Commands
Run the frontend quality checks:
```bash
# 1. Lint React/TypeScript source files (enforces React Hooks and Refresh rules)
npm run lint

# 2. Typecheck with TypeScript compiler
npm run typecheck

# 3. Build production bundle with Vite
npm run build

# 4. Run frontend unit tests (Vitest)
npm test
```

### D. Starting the Local Dev Server
```bash
npm run dev
```
Vite will start the local development server at `http://localhost:5173`.

---

## 5. End-to-End Local Verification

To verify that the frontend and backend communicate properly:

1. **Terminal 1**: Compile and start API emulators:
   ```bash
   cd littlesteps-api
   npm run build
   npm run emulators -- --project demo-littlesteps
   ```
2. **Terminal 2**: Seed the Firestore catalog collections (`catalog_activities`, `catalog_milestones`, `catalog_rhymes`) and optionally the demo family:
   ```bash
   cd littlesteps-api
   npm run seed:catalog:emulator
   # Or seed both catalog and demo caregiver/children in one command:
   node ../littlesteps-docs/scripts/demo-cli/run-demo.mjs seed
   ```
3. **Terminal 3**: Start the web dev server:
   ```bash
   cd littlesteps-react
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser, sign in with the seeded synthetic caregiver account from `scripts/demo-cli/seed/demo-family.json` (or create a synthetic account), and verify that the **Today**, **Explore**, **Milestones**, **Journal**, and **This week** tabs load cleanly against the local API (`http://127.0.0.1:5001/demo-littlesteps/asia-southeast1/api/health` returns `{"status":"ok"}`).

---

## 6. Mobile Setup: `littlesteps-flutter`

The Flutter app lives in the course fork under `BSIT-3A/LittleSteps` and talks to the same local API as the web client. Requirements: Flutter stable (`3.47.x`), Dart SDK (`^3.13.5`), and for Android an emulator or device on API 34+ with JDK 21.

1. **Terminal 1**: Build and start the API emulators, then seed the Firestore catalog collections (`catalog_activities`, `catalog_milestones`, `catalog_rhymes`):
   ```bash
   cd littlesteps-api
   npm run build
   npm run emulators -- --project demo-littlesteps
   ```
   Once the Firestore emulator is running on port `8080`:
   ```bash
   cd littlesteps-api
   npm run seed:catalog:emulator
   ```
   Run `npm run build` again after pulling API changes so the Functions emulator executes updated compiled code.
2. **Terminal 2**: Run the Flutter app:
   ```bash
   cd littlesteps-flutter/BSIT-3A/LittleSteps
   flutter pub get
   flutter run -d chrome
   ```
   For an Android emulator, use `flutter run -d <device id>` (see `flutter devices`). The app defaults to `http://10.0.2.2:5001/demo-littlesteps/asia-southeast1/api` on Android emulators and `localhost` on Web/Desktop. For physical Android devices over USB, run `adb reverse tcp:5001 tcp:5001` (automated by `run-demo.mjs start android`).
3. **Test user**: Sign in or register a synthetic account directly in-app (or seed the default demo family via `node littlesteps-docs/scripts/demo-cli/run-demo.mjs seed`). Inspect auth and Firestore documents at `http://127.0.0.1:4000`.
4. **AI limit**: The AI endpoints allow 10 requests per UTC clock hour per user (stored in the Firestore emulator's `rate_limits` collection). Switch test users or reset emulator data if you hit the cap while testing.
5. **Before a pull request**:
   ```bash
   dart format --output=none --set-exit-if-changed lib test
   flutter analyze --fatal-infos
   flutter test
   ```

---

## 7. Daily Development Rules & Boundaries

1. **Never Commit Directly to `main`**:
   - Always branch off `main` (e.g., `git checkout -b feat/<name>` or `chore/<name>`).
   - Submit changes via draft Pull Requests on GitHub with at least one teammate review.
2. **Emulator-First & Synthetic Data**:
   - All local development and tests must use `demo-littlesteps` and synthetic identities.
   - Never commit API keys, service account credentials, or real personal information.
3. **API Contract Single Source of Truth**:
   - The canonical REST contract is defined in [`docs/api-reference.md`](api-reference.md) and `littlesteps-api/openapi/openapi.yaml`.
   - The web client must consume endpoints defined in this contract rather than inventing ad-hoc response structures.
4. **Milestone Content Provenance**:
   - Before drafting or adapting milestone or activity catalog entries, consult [Philippine Content Provenance](philippine-content-provenance.md) for required ECCD Council / DepEd citations, metadata fields, and non-diagnostic review boundaries.

---

## 8. Canonical Documentation Index

- [Product Scope](product-scope.md) — 6 core features, app navigation age bands (0–71 months), non-diagnostic boundaries.
- [Verification & Traceability Matrix](traceability-matrix.md) — Requirements-to-verification and CIT 210 rubric mapping.
- [Architecture Decisions](architecture-decisions.md) — ADRs 001–016 covering shared backend, Firestore catalog migration, hybrid AI, and external integrations.
- [API Reference & Integration Guide](api-reference.md) — Canonical OpenAPI endpoints, Open Library & Open-Meteo REST integrations, AI fallback hierarchy, and error envelopes.
- [Data Model Specification](data-model.md) — Firestore collections, caregiver-scoped paths, and entity schemas.
- [Security, Privacy, and AI Safeguards](security-privacy-ai.md) — Philippine Data Privacy Act (RA 10173), BOLA defenses, and 3-layer AI safety controls.
- [Design System Brief (DESIGN.md)](DESIGN.md) — Machine-readable design tokens, voice rules, and client agent guidance.
- [UI/UX Design Specification](ui-ux-design-specification.md) — Human-computer interaction principles, responsive layouts, and Flutter Material 3 mapping.
- [Usability & Design Evaluation](usability-and-design-evaluation.md) — Provisional caregiver storyboards, informal walkthrough protocol, heuristic audit, and design review checklist.
- [Philippine Content Provenance](philippine-content-provenance.md) — ECCD Council and DepEd provenance records, Firestore catalog audit, review gate, and external research register.
- [Execution Plan](execution-plan.md) — Milestone delivery schedule (M0–M5), work packages, and academic calendar.
- [Documentation Standards](documentation-standards.md) — Three-tier hierarchy and Diátaxis governance framework.
- [Contribution Guidelines](../CONTRIBUTING.md) — Branching, peer reviews, client coding standards, and CI verification commands.
