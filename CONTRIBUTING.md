# Contributing to LittleSteps

Thank you for contributing to **LittleSteps**, an early-learning and caregiver support system developed by Thesis Titans (BSIT-3A, West Visayas State University — CICT). This document is the canonical Level 1/Level 2 contributor manual covering repository hierarchy, branching and PR governance, client coding standards, local verification, and privacy/security boundaries.

---

## 1. Project Hierarchy & Scope

LittleSteps is organized across four repositories under the [`Thesis-Titans`](https://github.com/Thesis-Titans) organization using a three-tier documentation hierarchy:

1. **Level 1 — Organization Principles:** Shared contributor expectations, ethical standards, and academic review conventions defined here and in [SECURITY.md](SECURITY.md) / [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
2. **Level 2 — Canonical Project Documentation (`littlesteps-docs`):** Single source of truth for product scope, architecture decisions, API and data contracts, UI/UX standards, content provenance, and developer onboarding.
3. **Level 3 — Repository-Specific Documentation:** Codebase-specific quickstarts, environment variable templates, test scripts, and technical contracts in:
   - [`littlesteps-api`](https://github.com/Thesis-Titans/littlesteps-api) (including `openapi/openapi.yaml`)
   - [`littlesteps-react`](https://github.com/Thesis-Titans/littlesteps-react)
   - [`CC-207B_26-27_Final-Project`](https://github.com/Thesis-Titans/CC-207B_26-27_Final-Project/tree/main/BSIT-3A/LittleSteps) (Flutter mobile app under `BSIT-3A/LittleSteps`)

### Rights & Licensing Notice
LittleSteps is a coordinated academic course project across CC 207B, CIT 210, and CIT 246. The project's intended policy is **All Rights Reserved (Academic Evaluation Only)**. Public visibility for academic review does not grant an open-source license. Do not introduce open-source licenses (MIT, Apache, GPL) without explicit approval from the project lead and course instructor.

---

## 2. Getting Started

Before making code changes:
1. Follow the [Developer Onboarding Guide](docs/getting-started.md) to configure your local workspace.
2. Verify prerequisites: **Node.js 22 LTS**, **npm 10+**, **Java JDK 21** (Firebase Emulator Suite), **Flutter stable SDK** (for mobile work), and **Git**.
3. Review [Product Scope](docs/product-scope.md) and [Architecture Decisions](docs/architecture-decisions.md).

---

## 3. Branching, Pull Requests & Review Governance

### Branching Rules
- **Never push directly to `main`.** Branch protection is active on `main` across all four repositories (`allow_force_pushes: false`, `allow_deletions: false`, pull requests required).
- Create a focused branch off an up-to-date `main`:
  - `feat/<feature-name>`: New functionality or user-facing changes.
  - `fix/<bug-description>`: Bug fixes or defect remediation.
  - `refactor/<scope>`: Structural cleanup without changing external behavior.
  - `docs/<topic>`: Documentation updates and architecture records.
  - `chore/<task>`: Tooling, dependency, or configuration updates.
- Keep pull requests narrow, focused, and scoped to a single logical change.

### Pull Request Expectations
1. **Open Draft PRs Early** to share direction and invite early review.
2. **Provide Clear Context:**
   - Link the relevant issue (e.g., `Fixes #12` or `Addresses Thesis-Titans/littlesteps-docs#8`).
   - Summarize the rationale and behavior changes concisely.
   - Record the **exact local verification commands** executed and confirm their pass status.
   - Note any OpenAPI, documentation, security, privacy, or synthetic-data implications.
3. **Peer Review Boundary:** Every pull request requires at least **one approving teammate review** and passing CI checks before merging. Pull requests modifying API contracts, authentication, BOLA authorization, Firestore security rules, or AI prompts/fallbacks require an additional review from the technical lead.
4. **Administrator Bypass Policy:** Repository administrators retain the GitHub bypass setting (`enforce_admins: false`) strictly to prevent emergency deadlocks; under team policy, all standard changes follow the PR and peer-review workflow.

### Academic Collaboration & Code Defense Governance (CC 207B)
- **Continuous Contribution:** All five team members contribute commits and peer reviews across feature branches throughout the project lifecycle.
- **Individual Code Defense:** Every member must personally understand, explain, and perform live edits on their committed Flutter code during the 2–3 minute individual defense.
- **AI Usage Log:** Any AI-assisted code snippets, fixtures, or text assets in the Flutter repository must be logged in `BSIT-3A/LittleSteps/docs/ai-usage-log.md`. Wholesale generation of screens or unexplainable code is prohibited.

---

## 4. Local Verification & Required CI Checks

Always run local verification using committed lockfiles before requesting review. Never mark checks as passed unless they were executed after the latest edit.

### Local Verification Commands

- **Backend API (`littlesteps-api`):**
  ```bash
  npm ci
  npm run typecheck
  npm run lint
  npm run build
  npm test
  npm run test:emulator          # Headless Auth + Firestore Emulator integration suite
  npm run seed:catalog:emulator  # Seed Firestore catalog collections when running local emulators
  ```

- **Web Client (`littlesteps-react`):**
  ```bash
  npm ci
  npm run typecheck
  npm run lint
  npm run build
  npm test
  ```

- **Flutter Client (`CC-207B_26-27_Final-Project`, folder `BSIT-3A/LittleSteps`):**
  ```bash
  flutter pub get
  dart format --output=none --set-exit-if-changed lib test
  flutter analyze --fatal-infos
  flutter test
  ```

- **Documentation (`littlesteps-docs`):**
  ```bash
  npm test                                  # verify-docs unit tests + link/frontmatter checks
  node --test scripts/demo-cli/test/cli.test.mjs  # Demo CLI unit tests
  ```

### Required GitHub Actions CI Checks

| Repository | Required Status Check(s) | Scope |
| :--- | :--- | :--- |
| **`littlesteps-api`** | `API CI/verify`, `Secret Scan/Gitleaks` | Lint, typecheck, build, unit/security/contract tests, emulator integration tests, secret scanning |
| **`littlesteps-react`** | `Web CI/verify` | Lint, typecheck, Vite build, component and hook unit tests |
| **`CC-207B_26-27_Final-Project`** (`BSIT-3A/LittleSteps`) | `Flutter CI/Analyze and Test` | `dart format`, `flutter analyze --fatal-infos`, `flutter test` |
| **`littlesteps-docs`** | `Docs CI/verify` | Relative internal links, image paths, issue-template frontmatter validation |

---

## 5. Client Coding Standards & Architecture Baseline

### 5.1 Web Client (`littlesteps-react` — CIT 210)
- **Responsive Breakpoints:** Desktop (`1280px` container with `240px` left sidebar) and Mobile Web (`375px–414px` with `72px` bottom tab bar).
- **Feature-Modular Layout:**
  - `src/services/`: Firebase SDK setup (`firebase.ts`) and typed API client (`api.ts`).
  - `src/features/<feature>/`: Co-located screens, feature components, hooks, types, and tests exposed through each feature's `index.ts` barrel.
  - `src/components/`: Shared design-system primitives (`common/`) and app shell (`layout/`).
  - `src/assets/` and `src/styles/`: SVG brand/UI assets and central CSS custom property tokens (`tokens.css`, `main.css`).
- **Styling:** Plain Vanilla CSS using design tokens from [DESIGN.md](docs/DESIGN.md) (TailwindCSS is not used). Contrast must meet WCAG 2.2 AA (4.5:1 normal text, 3:1 UI boundaries).
- **UX Copy:** Strictly follow [UI/UX Design Specification](docs/ui-ux-design-specification.md) §2.6 (sentence case, everyday caregiver wording, zero clinical or technical jargon on screen).

### 5.2 Flutter Client (`CC-207B_26-27_Final-Project`, `BSIT-3A/LittleSteps` — CC 207B)
- **Layered Architecture:**
  - `lib/config/`: Environment URLs (`AppConfig` with HTTPS release guard) and verified external citation links (`AppLinks`).
  - `lib/theme/`: Material 3 `AppTheme` and central tokens (`AppColors`, `AppSpacing`, `AppRadius`, `AppSizes`, `AppTypography`, `AppMotion`) — zero hardcoded colors, font sizes, radii, or durations in feature code.
  - `lib/models/`: `@immutable` entities and validators with consistent `fromJson`/`toJson`.
  - `lib/services/`: Typed `ApiClient`, `AuthService`, `AuthSessionState`, feature REST services, and whitelisted in-memory `LocalDataCache`.
  - `lib/utils/`: Shared formatting, domain/setting label mappings, accessibility helpers, error formatters, and URL launchers.
  - `lib/routing/`: Centralized `AppRoutes` constants and `AppRouter.onGenerateRoute`.
  - `lib/widgets/`: Reusable design-system primitives, adaptive Material 3 layout wrappers (`AppWindowSize`, `ResponsiveContentBox`, `AdaptiveTwoPane`), and shared state views.
  - `lib/screens/`: Feature directories (`today/`, `explore/`, `milestones/`, `journal/`, `reflection/`, `ai/`, `children/`, `auth/`, `account/`, `splash/`) extracting presentation widgets into dedicated `widgets/` subfolders.
- **Effective Dart & Documentation Standards:** Strict `public_member_api_docs` enforced via `flutter analyze --fatal-infos`. Every public declaration carries a concise `///` doc comment without Javadoc tags (`@param`/`@return`), Figma/ticket references, or filler.
- **Touch Ergonomics & Accessibility:** Minimum `48 × 48 dp` touch targets for primary controls, `Semantics` live regions for status announcements, reduced-motion support (`MediaQuery.disableAnimations`), and 200% text-scale resilience.

---

## 6. Security, Privacy & Synthetic Data Safeguards

- **Zero Real Personal Data:** Never commit, log, or test with real child or caregiver information. All local development, tests, and demonstrations use synthetic profiles under `demo-littlesteps`.
- **Zero Secrets in Code:** Never commit `.env`, `.env.local`, `config/production.json`, Firebase service-account keys, private API keys, or Android signing keys.
- **Synthetic Emulator Values:** Throwaway local test inputs (`fake-api-key`, `LocalTestPassword123!`) are strictly for ephemeral in-memory emulators and must never be reused in real cloud projects.
- **Local-First Firebase Discipline:** Verify changes against local Firebase Emulators first; cloud deployments require explicit project targeting, billing/budget review, and security rule verification.
- **Reporting Vulnerabilities:** Never open public issues for security vulnerabilities. Follow [SECURITY.md](SECURITY.md).

---

## 7. Documentation & Contract Synchronization

- **Code & Docs in Lockstep:** Update affected specifications in the same PR (or linked docs PR) whenever endpoints, schemas, environment variables, or user-facing workflows change.
- **OpenAPI Contract:** Route or payload changes in `littlesteps-api` must update [`openapi/openapi.yaml`](https://github.com/Thesis-Titans/littlesteps-api/blob/main/openapi/openapi.yaml) and [API Reference](docs/api-reference.md).
- **Content Provenance Gate:** Early-learning catalog additions follow [Philippine Content Provenance](docs/philippine-content-provenance.md) and [Docs Issue #3](https://github.com/Thesis-Titans/littlesteps-docs/issues/3).
- **Non-Diagnostic Scope:** Milestone prompts and weekly summaries are strictly observational and educational — never diagnostic or clinical.
- **Avoid Volatile Metrics:** Do not hardcode mutable repository test counts in READMEs or canonical specifications; rely on automated CI status checks instead.

---

## 8. Reporting Issues & Proposing Features

- **Bug Reports:** Open an issue in the relevant repository with reproduction steps, expected vs. actual behavior, and environment details (scrubbing any tokens or private data).
- **Feature Proposals:** Outline the caregiver or engineering problem, acceptance criteria, and privacy/scope considerations.
- **Security Vulnerabilities:** Use the private channels in [SECURITY.md](SECURITY.md).
