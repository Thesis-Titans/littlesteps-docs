# LittleSteps Verification & Traceability Matrix (RTM)

**Status:** Canonical Verification & Requirements Baseline  
**Governing Standard:** ISO/IEC/IEEE 29148:2018 (Traceability) & PMBOK (Scope & Quality Management)  
**Owner:** Mark Alvin Cadangin (Technical Lead)  
**Last Reviewed:** 2026-10-26  
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
| **FR-01** | **Child Profile & Milestone Tracking** | API, Web, Mobile | Unit (Validation) + Emulator (BOLA) + UI E2E | WP-2<br/>[API #7](https://github.com/Thesis-Titans/littlesteps-api/issues/7), [#8](https://github.com/Thesis-Titans/littlesteps-api/issues/8)<br/>[Web #6](https://github.com/Thesis-Titans/littlesteps-react/issues/6) | Test suites for child CRUD; BOLA cross-user access denial tests | Sprint 1–2 (M1–M4), not yet verified |
| **FR-02** | **Daily Activity Planning & Tracking** | API, Web, Mobile | API Integration Tests + Frontend State Tests | WP-4<br/>[API #10](https://github.com/Thesis-Titans/littlesteps-api/issues/10)<br/>[Web #8](https://github.com/Thesis-Titans/littlesteps-react/issues/8) | Schedule toggle unit tests; optimistic UI state update tests | Sprint 1–2 (M1–M4), not yet verified |
| **FR-03** | **Private Observation Journal** | API, Web, Mobile | API Ownership Tests + AI Isolation Inspection | WP-5<br/>[API #11](https://github.com/Thesis-Titans/littlesteps-api/issues/11)<br/>[Web #9](https://github.com/Thesis-Titans/littlesteps-react/issues/9) | Automated tests proving zero journal leakage to AI endpoints | Sprint 1–2 (M1–M4), not yet verified |
| **FR-04** | **Story, Rhyme & Activity Library** | API, Web, Mobile | Catalog Query Tests + Provenance Schema Checks | WP-3<br/>[API #9](https://github.com/Thesis-Titans/littlesteps-api/issues/9)<br/>[Web #7](https://github.com/Thesis-Titans/littlesteps-react/issues/7) | Multi-factor filter test; item-level provenance citation audit | Content Gated ([Docs #3](https://github.com/Thesis-Titans/littlesteps-docs/issues/3)) |
| **FR-05** | **Weekly Progress Summary** | API, Web, Mobile | Deterministic Calculation Unit Tests | WP-6<br/>[API #12](https://github.com/Thesis-Titans/littlesteps-api/issues/12)<br/>[Web #10](https://github.com/Thesis-Titans/littlesteps-react/issues/10) | Automated math verification against known test activity logs | Sprint 1–2 (M1–M4), not yet verified |
| **FR-06** | **AI Activity Suggestion Helper** | API, Web, Mobile | Schema Validation + Timeout Fallback Tests | WP-7<br/>[API #13](https://github.com/Thesis-Titans/littlesteps-api/issues/13)<br/>[Web #11](https://github.com/Thesis-Titans/littlesteps-react/issues/11) | 8-second timeout test; provider-failure deterministic fallback trigger | Sprint 1–2 (M1–M4), not yet verified |

---

## 3. System Prerequisites Traceability (PRQ)

| Prereq ID | Description | Target | Verification Method | Tracking Issue | Status |
| :---: | :--- | :--- | :--- | :---: | :---: |
| **PRQ-01** | **Caregiver Authentication & Sessions** | API, Web, Mobile | Auth Emulator Integration Tests | [Web #5](https://github.com/Thesis-Titans/littlesteps-react/issues/5)<br/>API `require-firebase-user.ts` | API scaffold reported; emulator verification evidence pending |
| **PRQ-02** | **Ergonomic Responsive Shell** | Web, Mobile | Viewport Tests (375px–1440px) + Fitts's Law ($\ge$ 48px frequent, $\ge$ 44px floor) | [Docs #15](https://github.com/Thesis-Titans/littlesteps-docs/issues/15) (Prototype) | Implemented in [React PR #27](https://github.com/Thesis-Titans/littlesteps-react/pull/27); browser viewport verification pending ([React #28](https://github.com/Thesis-Titans/littlesteps-react/issues/28)) |
| **PRQ-03** | **App Settings & Informational Views** | Web, Mobile | Visual Inspection & Policy Link Audit | WP-0.5 | Prototype Stage |

---

## 4. Non-Functional Requirements Traceability (NFR)

| NFR Tag | Domain & Title | Governing Standard | Verification Method | Evidence & Enforcement |
| :---: | :--- | :--- | :--- | :--- |
| **NFR-SEC-01** | Token-Based Identity Verification | OWASP REST / NIST | Automated API Emulator Test | Required: verify token UID extraction and rejection of forged identity headers. |
| **NFR-SEC-02** | BOLA Ownership Defense | OWASP API1:2023 | Negative Security Integration Tests | Required: demonstrate cross-caregiver reads and writes are rejected with safe `403`/`404` responses. |
| **NFR-SEC-03** | Secret Exposure Prevention | CC 207B §2b / Git | Secret scanning and bundle inspection | Required: no secrets in repository history or client bundles; server secrets remain server-side. |
| **NFR-SEC-04** | CORS Allowlist & Safe Errors | OWASP ASVS | Automated HTTP Header Tests | Required: reject unauthorized origins and ensure error responses contain no stack traces or internal details. |
| **NFR-PRIV-01** | RA 10173 Data Minimization | RA 10173 / NPC IRR | Schema Inspection & Privacy Notice | Exact birth dates avoided; no biometric or GPS data collected. |
| **NFR-PRIV-02** | Journal Isolation from AI & Telemetry | RA 10173 / Statutory | Unit Tests on AI Prompt Payloads | Prompt-builder tests must assert that journal strings are absent from AI request payloads. |
| **NFR-PRIV-03** | Synthetic Data Policy | Team Testing Policy | Test Fixture Audit | Fixture audit checks that demo and test profiles use synthetic names in the `demo-littlesteps` environment. |
| **NFR-AI-01** | Relevance & Real Caregiver Problem Fit | CC 207B §2a Relevance | Usability Pilot Testing | Usability testing must assess whether suggestions match the caregiver's stated time, materials, and setting constraints. |
| **NFR-AI-02** | Server-Side Execution & Prompt Hygiene | CC 207B §2b Security | Architecture Review & Code Audit | Model calls execute exclusively in Cloud Functions; zero PII in prompts. |
| **NFR-AI-03** | Graceful Degradation & Fallback | CC 207B §2c Graceful failure | Negative Chaos / Timeout Test | Provider failure or 8s timeout triggers deterministic catalog fallback. |
| **NFR-AI-04** | AI Badge & Non-Diagnostic Boundary | CC 207B §2d Responsible use | UI Inspection & Content Review | Visual AI badge on suggestions; prompt instructions strictly forbid diagnoses. |
| **NFR-AI-05** | Team Authorship & Code Defense | CC 207B §3 AI Use Policy | Code Defense Audits & AI Usage Log | All AI-assisted code logged in `AI Usage Log`; team defends code individually. |
| **NFR-REL-01** | Operational Latency & Rate Limits | Cloud Architecture | Load Test & Rate Limit Tests | Endpoints enforce per-user rate limits; CRUD responds $\le$ 500ms locally. |

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
