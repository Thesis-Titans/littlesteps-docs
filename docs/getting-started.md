# LittleSteps Developer Onboarding Guide

**Status:** Canonical Developer Tutorial Baseline  
**Governing Standard:** Diátaxis Framework (Learning-Oriented Tutorial)  
**Owner:** Mark Alvin Cadangin (Technical Lead)  
**Last Reviewed:** 2026-10-26  
**Related Documents:** [API Reference & Integration Guide](api-reference.md), [Development Workflow](development-workflow.md), [Architecture Decisions](architecture-decisions.md)

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

# Clone the three active repositories:
git clone https://github.com/Thesis-Titans/littlesteps-docs.git
git clone https://github.com/Thesis-Titans/littlesteps-api.git
git clone https://github.com/Thesis-Titans/littlesteps-react.git
```

Resulting directory tree:
```text
littlesteps/
├── littlesteps-docs/       # Canonical architecture, scope, research, and provenance
├── littlesteps-api/        # TypeScript Express backend on Firebase Functions v2
├── littlesteps-react/      # React + TypeScript + Vite frontend
└── littlesteps-flutter/    # Flutter mobile client (Dart / Android; Sprint 3–4)
```

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

The file also lists optional settings: `GEMINI_API_KEY` and `GEMINI_MODEL` (both needed to turn the Gemini provider on; leave empty locally), `AI_IP_LIMIT_PER_HOUR` and `TRUST_PROXY_HOPS`. See `.env.example` for what each does. Never commit real values.

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

# 5. Run headless Firebase Auth Emulator integration tests
npm run test:emulator
```

> [!TIP]
> `npm run test:emulator` starts an isolated, offline Auth emulator under project ID `demo-littlesteps`, runs synthetic token verification tests, and automatically shuts down. No Google Cloud credentials or billing accounts are touched.

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
# The following client keys are reserved for future Firebase Auth integration:
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=demo-littlesteps
VITE_FIREBASE_APP_ID=
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
2. **Terminal 2**: Start web dev server:
   ```bash
   cd littlesteps-react
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.
4. In the **API connection** card on the landing page, click **"Check local API"**.
5. The status indicator will transition to **"Connected"** by querying the public liveness endpoint (`GET /health`), returning:
   > *"The API health endpoint responded successfully."*

---

## 6. Daily Development Rules & Boundaries

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

## 7. Canonical Documentation Index

- [API Reference & Integration Guide](api-reference.md) — Canonical OpenAPI endpoints, Open Library REST integration, 3-tier AI fallback, and error envelopes.
- [Product Scope](product-scope.md) — 6 core features, app navigation age bands (0–71 months), non-diagnostic boundaries.
- [Architecture Decisions](architecture-decisions.md) — ADRs covering shared backend, Express on Firebase Functions, Firebase Auth, and Firestore.
- [Data Model Specification](data-model.md) — Firestore collections, caregiver-scoped paths, and entity schemas.
- [Security, Privacy, and AI Safeguards](security-privacy-ai.md) — Philippine Data Privacy Act (RA 10173), BOLA defenses, and AI safety controls.
- [Traceability Matrix](traceability-matrix.md) — Requirements-to-tests and CIT 210 rubric mapping.
- [UI/UX Design Specification](ui-ux-design-specification.md) — Human-computer interaction principles and responsive layout frames.
- [Prototype Traceability & Storyboards](prototype-traceability-storyboards.md) — Provisional caregiver scenarios and walkthrough acceptance checklist.
- [Parent Walkthrough Guide](parent-walkthrough-guide.md) — Informal caregiver usability protocol and consent script.
- [Development Workflow](development-workflow.md) — Branch and review policies, testing gates, and verification standards.
- [Execution Plan](execution-plan.md) — Milestone delivery schedule, sprint allocations, and academic dates.
- [Documentation Standards](documentation-standards.md) — 3-tier hierarchy and Diátaxis governance framework.
- [Philippine Content Provenance](philippine-content-provenance.md) — ECCD Council and DepEd source candidates, per-item citation fields, and review protocol.
- [Research Register](research-register.md) — External technical, legal, and educational references.
