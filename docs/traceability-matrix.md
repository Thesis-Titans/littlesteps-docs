# LittleSteps Verification & Traceability Matrix (RTM)

**Status:** Canonical Verification & Requirements Baseline  
**Governing Standard:** ISO/IEC/IEEE 29148:2018 (Traceability) & PMBOK (Scope & Quality Management)  
**Owner:** Mark Alvin Cadangin (Technical Lead)  
**Last Reviewed:** 2026-10-30  
**Related Documents:** [API Reference & Integration Guide](api-reference.md), [Product Scope](product-scope.md), [Execution Plan](execution-plan.md), [Security, Privacy, and AI Safeguards](security-privacy-ai.md)

---

## 1. Traceability Framework

This matrix links requirements to intended components, verification methods, work packages, and tracking issues. A listed test or evidence item is planned verification unless the status explicitly records a completed check and links its results. It covers the coordinated course scope:
- **CC 207B:** Flutter mobile application with 6 core features and code defense.
- **CIT 210:** React web client and shared API/database integration.
- **CIT 246:** IT Project Management Plan scope and quality baselines.

---

## 2. Functional Requirements Traceability (FR)

| Req ID | Requirement Title | Component Scope | Verification Method | Tracking Issue / WP | Verification Evidence | Status |
| :---: | :--- | :--- | :--- | :---: | :--- | :---: |
| **FR-01** | **Child Profile & Milestone Tracking** | API, Web, Mobile | Unit (Validation) + Emulator (BOLA) + UI E2E | WP-2<br/>[API #7](https://github.com/Thesis-Titans/littlesteps-api/issues/7), [#8](https://github.com/Thesis-Titans/littlesteps-api/issues/8)<br/>[Web #6](https://github.com/Thesis-Titans/littlesteps-react/issues/6) | Test suites for child CRUD; BOLA cross-user access denial tests (API #8) | Partial. Contract merged in [API PR #21](https://github.com/Thesis-Titans/littlesteps-api/pull/21) (plus PRs #22, #24). Child profile routes implemented and merged (API PRs [#26](https://github.com/Thesis-Titans/littlesteps-api/pull/26), [#29](https://github.com/Thesis-Titans/littlesteps-api/pull/29)) with unit and emulator tests; web screens pending (React PR #32 open); milestone tracking and delete not implemented |
| **FR-02** | **Daily Activity Planning & Tracking** | API, Web, Mobile | API Integration Tests + Frontend State Tests | WP-4<br/>[API #10](https://github.com/Thesis-Titans/littlesteps-api/issues/10)<br/>[Web #8](https://github.com/Thesis-Titans/littlesteps-react/issues/8) | Schedule toggle unit tests; optimistic UI state update tests | Sprint 1–2 (M1–M4), not yet verified |
| **FR-03** | **Private Observation Journal** | API, Web, Mobile | API Ownership Tests + AI Isolation Inspection | WP-5<br/>[API #11](https://github.com/Thesis-Titans/littlesteps-api/issues/11)<br/>[Web #9](https://github.com/Thesis-Titans/littlesteps-react/issues/9) | Automated tests proving zero journal leakage to AI endpoints | Sprint 1–2 (M1–M4), not yet verified |
| **FR-04** | **Story, Rhyme & Activity Library** | API, Web, Mobile | Catalog Query Tests + Provenance Schema Checks | WP-3<br/>[API #9](https://github.com/Thesis-Titans/littlesteps-api/issues/9)<br/>[Web #7](https://github.com/Thesis-Titans/littlesteps-react/issues/7) | Multi-factor filter test; item-level provenance citation audit | Catalog API implemented with synthetic fixtures ([API PR #20](https://github.com/Thesis-Titans/littlesteps-api/pull/20), fixes in #23 and #25); Web catalog UI not started; real content gated ([Docs #3](https://github.com/Thesis-Titans/littlesteps-docs/issues/3)) |
| **FR-05** | **Weekly Progress Summary** | API, Web, Mobile | Deterministic Calculation Unit Tests | WP-6<br/>[API #12](https://github.com/Thesis-Titans/littlesteps-api/issues/12)<br/>[Web #10](https://github.com/Thesis-Titans/littlesteps-react/issues/10) | Automated math verification against known test activity logs | Sprint 1–2 (M1–M4), not yet verified |
| **FR-06** | **AI Activity Suggestion Helper** | API, Web, Mobile | Schema Validation + Timeout Fallback Tests | WP-7<br/>[API #13](https://github.com/Thesis-Titans/littlesteps-api/issues/13)<br/>[Web #11](https://github.com/Thesis-Titans/littlesteps-react/issues/11) | 8-second timeout test; provider-failure deterministic fallback trigger | Sprint 1–2 (M1–M4). Recommendations endpoint with deterministic fallback merged (API PR #28); per-user and per-address rate limiting merged (API PR #33, 10 per user per hour, `429` with `Retry-After`); Gemini provider merged behind configuration, off by default (API PR #34). Live Gemini smoke test pending; story-activity and Tier 2 still planned |

---

## 3. System Prerequisites Traceability (PRQ)

| Prereq ID | Description | Target | Verification Method | Tracking Issue | Status |
| :---: | :--- | :--- | :--- | :---: | :---: |
| **PRQ-01** | **Caregiver Authentication & Sessions** | API, Web, Mobile | Auth Emulator Integration Tests | [Web #5](https://github.com/Thesis-Titans/littlesteps-react/issues/5)<br/>API `require-firebase-user.ts` | Web sign-in implemented ([Web #5](https://github.com/Thesis-Titans/littlesteps-react/issues/5), React PR #21, 14 tests at merge; the sign-up page and jsdom test library were added later, PRs #33 and #34); API token middleware is in `littlesteps-api`, and `test/auth-emulator.test.ts` runs in its CI through the Auth Emulator step; mobile not started |
| **PRQ-02** | **Ergonomic Responsive Shell** | Web, Mobile | Viewport Tests (375px–1440px) + Fitts's Law ($\ge$ 48px frequent, $\ge$ 44px floor) | [Docs #15](https://github.com/Thesis-Titans/littlesteps-docs/issues/15) (Prototype) | Implemented in [React PR #27](https://github.com/Thesis-Titans/littlesteps-react/pull/27) (32 passing tests at merge; 167 React tests and 200 API tests on `main` on 31 October); browser viewport verification still pending ([React #28](https://github.com/Thesis-Titans/littlesteps-react/issues/28)); mobile not started |
| **PRQ-03** | **App Settings & Informational Views** | Web, Mobile | Visual Inspection & Policy Link Audit | WP-0.5 | Prototype Stage |

---

## 4. Non-Functional Requirements Traceability (NFR)

| NFR Tag | Domain & Title | Governing Standard | Verification Method | Evidence & Enforcement |
| :---: | :--- | :--- | :--- | :--- |
| **NFR-SEC-01** | Token-Based Identity Verification | OWASP REST / NIST | Automated API Emulator Test | Required: verify token UID extraction and rejection of forged identity headers. |
| **NFR-SEC-02** | BOLA Ownership Defense | OWASP API1:2023 | Negative Security Integration Tests | Required: demonstrate cross-caregiver reads and writes are rejected with safe `403`/`404` responses. Contract defines the same `404` for missing and cross-owner children ([API PR #21](https://github.com/Thesis-Titans/littlesteps-api/pull/21)); implemented and tested for the child routes (API PRs #26, #29). Emulator tests in littlesteps-api `test/children-emulator.test.ts`: "isolates two real caregivers" and "runs create, list, get and patch for one caregiver and stores under the caller's path only". |
| **NFR-SEC-03** | Secret Exposure Prevention | CC 207B §2b / Git | Secret scanning and bundle inspection | Required: no secrets in repository history or client bundles; server secrets remain server-side. |
| **NFR-SEC-04** | CORS Allowlist & Safe Errors | OWASP ASVS | Automated HTTP Header Tests | Required: reject unauthorized origins and ensure error responses contain no stack traces or internal details. |
| **NFR-PRIV-01** | RA 10173 Data Minimization | RA 10173 (Sec. 11, 16, 18); see NFR-PRIV-04 in [security, privacy and AI safeguards](security-privacy-ai.md) | Schema Inspection & Privacy Notice | Exact birth dates avoided; no biometric or GPS data collected. Child profile contract uses `YYYY-MM` birth month only and rejects surnames, photos and exact birth dates ([API PR #21](https://github.com/Thesis-Titans/littlesteps-api/pull/21)); privacy text aligned in [Docs PR #71](https://github.com/Thesis-Titans/littlesteps-docs/pull/71). Implemented for the child routes (API PRs #26, #29); privacy notice page in React PR #31 open. |
| **NFR-PRIV-02** | Journal Isolation from AI & Telemetry | RA 10173 / Statutory | Unit Tests on AI Prompt Payloads | Prompt-builder tests must assert that journal strings are absent from AI request payloads. |
| **NFR-PRIV-03** | Synthetic Data Policy | Team Testing Policy | Test Fixture Audit | Fixture audit checks that demo and test profiles use synthetic names in the `demo-littlesteps` environment. |
| **NFR-AI-01** | Relevance & Real Caregiver Problem Fit | CC 207B §2a Relevance | Usability Pilot Testing | Usability testing must assess whether suggestions match the caregiver's stated time, materials, and setting constraints. |
| **NFR-AI-02** | Server-Side Execution & Prompt Hygiene | CC 207B §2b Security | Architecture Review & Code Audit | Model calls execute exclusively in Cloud Functions; zero PII in prompts. |
| **NFR-AI-03** | Graceful Degradation & Fallback | CC 207B §2c Graceful failure | Negative Chaos / Timeout Test | Provider failure or 8s timeout triggers deterministic catalog fallback. |
| **NFR-AI-04** | AI Badge & Non-Diagnostic Boundary | CC 207B §2d Responsible use | UI Inspection & Content Review | Visual AI badge on suggestions; prompt instructions strictly forbid diagnoses. |
| **NFR-AI-05** | Team Authorship & Code Defense | CC 207B §3 AI Use Policy | Code Defense Audits & AI Usage Log | All AI-assisted code logged in `AI Usage Log`; team defends code individually. |
| **NFR-REL-01** | Operational Latency & Rate Limits | Cloud Architecture | Load Test & Rate Limit Tests | Implemented on `POST /api/v1/ai/recommendations` (API PR #33): 10 requests per user per UTC hour, plus a per-address cap; other endpoints have no rate limit yet. CRUD responds $\le$ 500ms locally (not yet measured). |

---

## 5. CIT 210 Evaluation Rubric Traceability

Maps each criterion of the [Official CIT 210 Evaluation Rubric](academic/cit210/CIT210_Final_Project_Requirements.md) to technical components, requirements, and verification evidence:

| Category | Rubric Criteria | Weight | Mapped System Components | Verification Method |
| :--- | :--- | :---: | :--- | :--- |
| **Application Development** | **API Integration** | 25 pts | `littlesteps-api` endpoints ([API Reference](api-reference.md)); Open Library REST integration for storybooks ([ADR-010](architecture-decisions.md)); Google Gemini AI helper with 3-tier fallback ([ADR-008](architecture-decisions.md), [ADR-010](architecture-decisions.md)); optional Open-Meteo ([ADR-009](architecture-decisions.md)) | Async JSON integration tests; token verification middleware; zero API keys in client bundles; Open Library proxy caching |
| | **Client-Side Interface & Usability** | 20 pts | `littlesteps-react` web client; PRQ-02 responsive shell; quick filters; storybook/catalog search; 5-state UI resilience | Viewport tests (375px–1440px); interactive filtering/search tests; loading skeleton and error alert checks |
| | **Server-Side Logic & Data Processing** | 15 pts | Express controllers; Cloud Firestore subcollections; BOLA ownership checks (NFR-SEC-02); 3-tier fallback engine ([ADR-010](architecture-decisions.md)) | Route controller unit tests; BOLA negative authorization tests; fallback execution tests |
| | **Error Handling & Data Validation** | 5 pts | Bounded schema validators (Zod); standard `{ error: { code, message } }` envelope | Form boundary validation tests; network failure/timeout error handling without client crashes |
| **Presentation** | **Clarity and Structure** | 10 pts | Presentation slides covering introduction, client context (CSWDO), system architecture, and conclusion | Rehearsed slide presentation adhering to rubric structure |
| | **Explanation of API Integration** | 10 pts | Detailed API design walkthrough documented in [API Reference](api-reference.md) (`/children`, `/catalog/books`, `/ai/story-activity`), request/response headers, token decoding | Technical presentation section explaining API design, Open Library integration, and 3-tier fallback |
| | **Demo & Functionality** | 15 pts | Live local demonstration of `littlesteps-react` on Firebase emulators; recorded backup video | Verification of stable live user journeys (profile CRUD, routine plan, journal, catalog, fallback) |

---

## 6. Milestone Exit Verification Summary

| Milestone | Key Milestone Deliverable | Requirements Verified | Release Gate Link |
| :---: | :--- | :--- | :---: |
| **M0** | Execution Readiness & Prototype Validation | Prototype-only walkthroughs for FR-01..06; PRQ-01..03 | [Docs Issue #15](https://github.com/Thesis-Titans/littlesteps-docs/issues/15) |
| **M1** | Secure End-to-End Foundation | FR-01, PRQ-01, NFR-SEC-01..02, NFR-PRIV-01 | [API #7](https://github.com/Thesis-Titans/littlesteps-api/issues/7), [Web #5](https://github.com/Thesis-Titans/littlesteps-react/issues/5) |
| **M2** | Learning Content & Activity Loop | FR-02, FR-04, NFR-PRIV-03 | [API #9](https://github.com/Thesis-Titans/littlesteps-api/issues/9), [Web #7](https://github.com/Thesis-Titans/littlesteps-react/issues/7) |
| **M3** | Private Journal & Weekly Reflection | FR-03, FR-05, NFR-PRIV-02 | [API #11](https://github.com/Thesis-Titans/littlesteps-api/issues/11), [Web #9](https://github.com/Thesis-Titans/littlesteps-react/issues/9) |
| **M4** | Constrained AI Suggestions & Fallback | FR-06, NFR-AI-01..05, NFR-REL-01 | [API #13](https://github.com/Thesis-Titans/littlesteps-api/issues/13), [Web #11](https://github.com/Thesis-Titans/littlesteps-react/issues/11) |
| **M5** | Release-Readiness Review & Defense Prep | All FRs, All NFRs, Course Deliverables | [Docs Issue #16](https://github.com/Thesis-Titans/littlesteps-docs/issues/16) |
