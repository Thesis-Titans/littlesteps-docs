# Contributing to LittleSteps

Thank you for your interest in contributing to **LittleSteps**, an early childhood learning and caregiver support system. This document outlines the contributor guidelines, repository hierarchy, workflow conventions, safety standards, and review processes across the project.

---

## 1. Project Hierarchy & Scope

LittleSteps is organized across multiple repositories under the [`Thesis-Titans`](https://github.com/Thesis-Titans) organization using a three-tier documentation hierarchy:

1. **Level 1 — Organization Principles:** Shared contributor expectations, ethical standards, and academic review conventions defined here.
2. **Level 2 — Canonical Project Documentation (`littlesteps-docs`):** The single source of truth for product scope, architecture decisions, privacy/security baselines, and developer onboarding.
3. **Level 3 — Repository-Specific Documentation (`littlesteps-api`, `littlesteps-web`):** Codebase-specific quickstarts, environment variables, test scripts, and technical contracts (e.g., OpenAPI in `littlesteps-api`).

> [!IMPORTANT]
> **Mobile Repository Boundary:** `littlesteps-mobile` remains private and strictly untouched pending the required CC 207B course fork. Do not create branches, PRs, or modify files in `littlesteps-mobile`.

### Rights & Licensing Notice
LittleSteps is an academic thesis project. The project's intended policy is **All Rights Reserved (Academic Evaluation Only)**. While active repositories are public for academic evaluation and faculty review, public visibility does not grant an open-source license for general reuse, modification, or redistribution. Do not introduce open-source licenses (MIT, Apache, GPL) without explicit review and approval from the project lead and faculty adviser.

---

## 2. Getting Started

Before making code changes:
1. Review the canonical [Developer Onboarding Guide](docs/getting-started.md) to set up your local development environment.
2. Verify required tools: **Node.js 22 LTS**, **npm 10+**, **Java 21** (for the Firebase Emulator Suite), and **git**.
3. Familiarize yourself with the [Product Scope](docs/product-scope.md) and [Architecture Decisions](docs/architecture-decisions.md).

---

## 3. Branching & Pull Request Workflow

All contributions follow a structured Git workflow:

### Branching Rules
- **Never push directly to `main`.** The `main` branch is protected across all active repositories.
- Create a focused branch off an up-to-date `main`:
  - `feat/<feature-name>`: New functionality or user-facing changes.
  - `fix/<bug-description>`: Bug fixes or defect remediation.
  - `docs/<topic>`: Documentation updates and architectural records.
  - `chore/<task>`: Tooling, dependency, or configuration updates.
- Keep pull requests narrow, focused, and scoped to a single logical change.

### Pull Request Expectations
1. **Open Draft PRs Early:** If work is in progress, open a Draft PR to share direction and invite early feedback.
2. **Provide Clear Context:**
   - Link the relevant issue (e.g., `Fixes #12` or `Addresses Thesis-Titans/littlesteps-docs#8`).
   - Provide a concise summary of the rationale and changes.
   - List the **exact tests and verification commands** executed locally, along with their outcomes.
   - Note any documentation or API contract updates included in the PR.
   - Highlight any security, privacy, or synthetic data implications.

---

## 4. Local Verification & Required CI Checks

Always run local checks using committed lockfiles before requesting review:

### Local Commands
- **API (`littlesteps-api`):**
  ```bash
  npm ci
  npm run lint
  npm run build
  npm test
  npm run test:emulator # runs the Auth Emulator integration tests
  ```
- **Web (`littlesteps-web`):**
  ```bash
  npm ci
  npm run lint
  npm run build
  npm test
  ```
- **Documentation (`littlesteps-docs`):**
  ```bash
  npm test # runs verify-docs unit tests and repository link/frontmatter verification
  ```

### Continuous Integration (CI)
- Pull requests in `littlesteps-api` must pass the required GitHub Actions check: **`API CI/verify`**.
- Pull requests in `littlesteps-web` must pass the required GitHub Actions check: **`Web CI/verify`**.
- Pull requests in `littlesteps-docs` run the automated GitHub Actions check: **`Docs CI/verify`** (validating relative internal links, image paths, and required issue-template frontmatter fields; not a full YAML parser or general Markdown style linter).

---

## 5. Security, Privacy & Synthetic Data Safeguards

Because LittleSteps serves caregivers and early childhood learners, contributors must strictly adhere to the following safety boundaries:

- **Zero Real Personal Data:** Never commit, log, or test with real child or caregiver data. All local development, tests, and demonstrations must use synthetic data only.
- **Zero Secrets in Code:** Never commit cloud credentials, Firebase service account keys, private API keys, or access tokens.
- **Synthetic Emulator Values:** Mock keys (`fake-api-key`) and local passwords (`LocalTestPassword123!`) in test suites are strictly synthetic throwaway inputs for local in-memory emulators. Never reuse them in real services.
- **Reporting Vulnerabilities:** Never file public GitHub issues for security vulnerabilities. Follow the responsible disclosure route in [SECURITY.md](SECURITY.md).

---

## 6. Documentation & Contract Synchronization

- **Code & Docs in Lockstep:** If a PR introduces or alters API endpoints, environment variables, or workflows, the corresponding documentation must be updated in the same PR.
- **OpenAPI Contract:** API route or schema changes in `littlesteps-api` must update [`openapi/openapi.yaml`](https://github.com/Thesis-Titans/littlesteps-api/blob/main/openapi/openapi.yaml).
- **Curriculum & Milestone Content Safeguard:** The early childhood content catalog is strictly gated by [Docs Issue #3](https://github.com/Thesis-Titans/littlesteps-docs/issues/3). Milestone, developmental, or curriculum content must not be populated without verified legal and curriculum source provenance and qualified review.
- **Non-Diagnostic Scope:** LittleSteps milestone tracking is observational and educational for caregivers, **never diagnostic or clinical**.

---

## 7. Review & Merge Governance

- **Setup & Foundation Stage:**
  - Branch protection on `main` requires pull requests. While GitHub's technical setting has `required_approving_review_count: 0` to prevent author deadlocks during solo setup, the team enforces a **procedural approval rule**.
  - **Mark Alvin Cadangin** serves as the reviewer and approval boundary. No pull request may be merged into `main` without Mark's explicit human review and approval.
- **Feature Execution Stage:**
  - As collaborative feature development begins, pull requests will transition to required peer reviews and formal approvals.

---

## 8. Reporting Issues & Proposing Features

- **Bug Reports:** Open an issue in the relevant repository describing the bug, reproduction steps, expected behavior, and environment. Ensure logs do not contain secrets or private data.
- **Feature Proposals:** Open an issue outlining the problem statement, intended users (caregivers, educators, or developers), acceptance criteria, and technical risks.
- **Security Vulnerabilities:** Follow [SECURITY.md](SECURITY.md). Do **not** use public issues.
