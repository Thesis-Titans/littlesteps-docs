# LittleSteps Verification & Traceability Matrix (RTM)

**Status:** Canonical Verification & Requirements Baseline  
**Governing Standard:** ISO/IEC/IEEE 29148:2018 (Traceability) & PMBOK (Scope & Quality Management)  
**Owner:** Mark Alvin C. Cadangin (Technical Lead)  
**Last Reviewed:** 2026-11-27  
**Related Documents:** [API Reference & Integration Guide](api-reference.md), [Product Scope](product-scope.md), [Execution Plan](execution-plan.md), [Security, Privacy, and AI Safeguards](security-privacy-ai.md)

---

## 1. Traceability Framework

This matrix links functional requirements (FR), cross-cutting prerequisites (PRQ), non-functional requirements (NFR), and CIT 210 evaluation criteria to implemented system components and automated verification suites across the coordinated academic scope:
- **CC 207B:** Flutter cross-platform client (`CC-207B_26-27_Final-Project`, `BSIT-3A/LittleSteps`) with six core features and individual code defense.
- **CIT 210:** React web client (`littlesteps-react`) and shared Express API / Cloud Firestore backend (`littlesteps-api`).
- **CIT 246:** Simulated IT Project Management Plan scope and quality baselines (maintained in `docs/academic/cit246/`).

---

## 2. Functional Requirements Traceability (FR)

| Req ID | Requirement Title | Component Scope | Verification Method | Tracking / WP | Implementation & Verification Status |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **FR-01** | **Child Profile & Milestone Tracking** | API, Web, Mobile | Unit validation, Auth/Firestore emulator BOLA tests, widget & component tests | WP-2 (`API #7/#8/#16/#17`, `Web #6/#17`) | **Verified:** Child profile CRUD, UTC age-band derivation, 20-child cap, caregiver JSON export, hard cascade deletion, and milestone observation CRUD (`observed`, `not_yet_observed`, `not_sure`) implemented across API, React, and Flutter (`ChildProfileScreen`, `AddChildScreen`, `MilestonesScreen`, `ObservationFormSheet`). Milestone prompts served dynamically from Firestore (`catalog_milestones`). |
| **FR-02** | **Daily Activity Planning & Tracking** | API, Web, Mobile | API route/index tests, client state & offline cache tests | WP-4 (`API #10/#42`, `Web #8`) | **Verified:** Daily activity plans (`/children/:childId/plans`) with inline `customActivity` snapshots, Firestore composite indexes, completion toggles with 10 s undo, symmetric quick filters (`Under 10 mins`, `No materials needed`, `Indoor`, `Outdoor`), streamlined Today header ([ADR-014](architecture-decisions.md)), and symmetric Open-Meteo Weather Hint routing ([ADR-009](architecture-decisions.md)) implemented across API, React, and Flutter (`TodayScreen`, `TodaySections`, `WeatherHintBanner`). |
| **FR-03** | **Private Observation Journal** | API, Web, Mobile | API BOLA ownership tests, AI-isolation assertions, widget tests | WP-5 (`API #11`, `Web #9`) | **Verified:** Caregiver-isolated journal CRUD (`/children/:childId/journal`) implemented across API, React (`JournalScreen`), and Flutter (`JournalScreen`, `JournalNoteScreen`). Strictly excluded from AI prompts, telemetry, and local offline caches. |
| **FR-04** | **Story, Rhyme & Activity Library** | API, Web, Mobile | Catalog query tests, Open Library proxy/fallback tests, provenance audit | WP-3 (`API #9`, `Web #7/#48`, `Docs #3`) | **Verified (Code) / Gated (Adviser Sign-Off):** Firestore-backed catalogs (`catalog_activities`, `catalog_rhymes`) with 5-min TTL cache, Open Library browsing and search (`/catalog/books`, `/catalog/books/search`), child-scoped Family Bookshelf (`/children/:childId/books`, [ADR-015](architecture-decisions.md)), and 3-shelf Storybooks UI implemented across API, React, and Flutter (`ExploreScreen`, `StorybooksSection`). Formal adviser review remains tracked in `Docs #3`. |
| **FR-05** | **Weekly Progress Summary** | API, Web, Mobile | Deterministic ISO-week aggregation unit & emulator tests | WP-6 (`API #12`, `Web #10`) | **Verified:** Deterministic non-diagnostic weekly summary endpoint (`/children/:childId/summary/weekly`) counting completed catalog and `customActivity` plans, observed milestones, and domain distribution implemented across API, React (`ThisWeekScreen`), and Flutter (`WeeklySummaryScreen`). |
| **FR-06** | **AI Activity Suggestion Helper & Companion** | API, Web, Mobile | Schema/hazard/denylist tests, 46-case safety benchmark, timeout fallback tests | WP-7 (`API #13/#46/#47`, `Web #11`) | **Verified:** Server-side Google Gemini integration across `/ai/recommendations` (catalog-first + opt-in 3-layer guardrailed `ai_custom`), `/ai/story-activity`, and `/ai/adapt` ([ADR-008](architecture-decisions.md), [ADR-010](architecture-decisions.md), [ADR-013](architecture-decisions.md), [ADR-016](architecture-decisions.md)), with 8 s timeout, circuit breaker, hourly rate limits, `"Suggested by AI"` / `"Material adaptation"` labels, `"Edit preferences"` / `"Another idea"` controls, and deterministic fallback across API, React (`IdeaHelper`), and Flutter (`AiSuggestionsScreen`, `IdeaHelperCard`). |

---

## 3. System Prerequisites Traceability (PRQ)

| Prereq ID | Description | Target | Verification Method | Status |
| :---: | :--- | :--- | :--- | :--- |
| **PRQ-01** | **Caregiver Authentication & Sessions** | API, Web, Mobile | Auth Emulator integration tests, session expiry & cache-clear tests | **Verified:** Firebase Auth sign-in/sign-up, Bearer token verification middleware (`require-firebase-user.ts`), session-expiry handling, and automatic cache clearing on sign-out implemented across API, React, and Flutter (`SignInScreen`, `RegisterScreen`, `AuthSessionState`). |
| **PRQ-02** | **Ergonomic Responsive Shell** | Web, Mobile | Viewport & adaptive layout tests, WCAG 2.2 AA contrast & 200% text-scale checks | **Verified:** 5-tab navigation shell (`BottomTabBar`/`SideNav` in React; `ShellScreen` with `NavigationBar` + `ShellNavigationSidebar` + `AppWindowSize`/`ResponsiveContentBox`/`AdaptiveTwoPane` in Flutter), conditional `ChildChip`, `NoChildrenView`, `#5A6A64` contrast compliance, and non-snapping `HorizontalScrollFade`. |
| **PRQ-03** | **App Settings & Informational Views** | Web, Mobile | Visual inspection, accessibility & external citation link checks | **Verified:** Settings (including coarse city weather selection), Privacy Notice, About with verified citation links, Help & Support, data export, and account deletion implemented across React (`AccountScreen`, `SettingsScreen`, `PrivacyScreen`, `AboutScreen`, `HelpScreen`) and Flutter (`AccountMenuSheet`, `SettingsScreen`, `AccountInfoScreen`). |

---

## 4. Non-Functional Requirements Traceability (NFR)

| NFR Tag | Domain & Title | Governing Standard | Verification Method | Evidence & Enforcement |
| :---: | :--- | :--- | :--- | :--- |
| **NFR-SEC-01** | Token-Based Identity Verification | OWASP REST / NIST | Automated API security & Auth Emulator tests | **Verified:** `test/security-regression.test.ts` and `test/auth-emulator.test.ts` enforce Bearer token signature validation and reject forged identity headers across all authenticated endpoints. |
| **NFR-SEC-02** | BOLA Ownership Defense | OWASP API1:2023 | Negative cross-caregiver authorization tests | **Verified:** Cross-caregiver reads, writes, and deletes return uniform `404 RESOURCE_NOT_FOUND` across all child-scoped routes (`children`, `plans`, `milestones`, `journal`, `books`, `summary/weekly`). |
| **NFR-SEC-03** | Secret Exposure Prevention | CC 207B §2b / Git | `Secret Scan/Gitleaks` CI & client bundle review | **Verified:** Automated Gitleaks scanning in API CI; zero server keys or Firebase Admin credentials in client bundles or tracked config files. |
| **NFR-SEC-04** | CORS Allowlist & Safe Errors | OWASP ASVS | Automated HTTP header & error-envelope tests | **Verified:** Unauthorized origins rejected with `403 ORIGIN_NOT_ALLOWED`; standardized JSON error envelopes with zero stack traces, `X-Content-Type-Options: nosniff`, `Cache-Control: no-store`, and `X-Powered-By` disabled. |
| **NFR-PRIV-01** | RA 10173 Data Minimization & Rights | RA 10173 (Sec. 11, 16, 18) | Schema inspection & emulator export/delete tests | **Verified:** Nickname + `YYYY-MM` birth month or age band only (strictly rejecting surnames, photos, exact birth dates); `GET /api/v1/me/export` and cascade `DELETE /api/v1/me` / `/children/:childId` verified on emulators. |
| **NFR-PRIV-02** | Journal Isolation from AI & Telemetry | RA 10173 | AI prompt-builder & log-hygiene tests | **Verified:** Automated tests assert zero journal content, child names, or caregiver UIDs enter AI prompts, operational logs, or Flutter offline caches. |
| **NFR-PRIV-03** | Synthetic Data Policy | Team Testing Policy | Seed fixture & demo audit | **Verified:** All automated tests and `scripts/demo-cli/seed/demo-family.json` use synthetic profiles on `demo-littlesteps`. |
| **NFR-AI-01** | Relevance & Problem Fit | CC 207B §2a | Usability & structured material matching tests | **Verified:** Hybrid catalog-first selection plus 3-layer guardrailed `ai_custom` handles informal household materials, typos, and Filipino/Hiligaynon terms. |
| **NFR-AI-02** | Server-Side Execution & Prompt Hygiene | CC 207B §2b | Architecture review & strict Zod input schema | **Verified:** All Gemini calls execute exclusively in Cloud Functions using `x-goog-api-key`; unknown or identifying request fields rejected with `400 INVALID_INPUT`. |
| **NFR-AI-03** | Graceful Degradation & Fallback | CC 207B §2c | Timeout, error & circuit-breaker tests | **Verified:** 8 s timeout, 64 KB cap, 60 s circuit breaker, and deterministic Tier 3 catalog fallback (Tier 2 rule fallback on `/ai/adapt`) keep both clients functional without crashes. |
| **NFR-AI-04** | AI Labeling & Non-Diagnostic Boundary | CC 207B §2d | 46-case safety benchmark & banned-word CI tests | **Verified:** Mandatory `"Suggested by AI"` / `"Material adaptation"` badges and observational disclaimers; 33-term English/Filipino denylist blocks diagnostic wording with 0% unsafe response rate. |
| **NFR-AI-05** | Team Authorship & Code Defense | CC 207B §3 | PR review history & `ai-usage-log.md` | **Active:** All five team members maintain feature commits, peer PR reviews, and logged AI usage in `BSIT-3A/LittleSteps/docs/ai-usage-log.md`. |
| **NFR-REL-01** | Operational Latency & Rate Limits | Cloud Architecture | Rate-limit & payload-bound tests | **Verified:** 100 KB payload limit (`413 PAYLOAD_TOO_LARGE`) and hourly AI rate limits (`10/hr` per user in Firestore `rate_limits`, `30/hr` per IP returning `429 RATE_LIMITED` with dynamic `Retry-After`) enforced across all three AI endpoints. |

---

## 5. CIT 210 Evaluation Rubric Traceability

Maps each criterion of the [Official CIT 210 Evaluation Rubric](academic/cit210/CIT210_Final_Project_Requirements.md) to implemented components and verification evidence:

| Category | Rubric Criteria | Weight | Mapped System Components | Verification Method |
| :--- | :--- | :---: | :--- | :--- |
| **Application Development** | **API Integration** | 25 pts | Custom Express REST API (`littlesteps-api`); Open Library browse & search proxy ([ADR-010](architecture-decisions.md), [ADR-013](architecture-decisions.md)); Open-Meteo weather hint ([ADR-009](architecture-decisions.md)); Google Gemini AI with fallback ([ADR-008](architecture-decisions.md), [ADR-016](architecture-decisions.md)) | OpenAPI contract, unit, security, and emulator integration suites; zero client API keys; server-side response caching |
| | **Client-Side Interface & Usability** | 20 pts | `littlesteps-react` React 19 + TypeScript web client; responsive shell (`1280px` / `375px`); multi-factor search & quick filters; 3-shelf Storybooks & Family Bookshelf; 5-state UI resilience | Vitest component/hook suites, WCAG 2.2 AA contrast audit, keyboard focus & responsive reflow verification |
| | **Server-Side Logic & Data Processing** | 15 pts | Modular Express routers/services; Cloud Firestore caregiver subcollections & seeded global catalogs; BOLA checks (NFR-SEC-02); deterministic weekly aggregation & AI fallback engine | Controller, BOLA, catalog TTL cache, and fallback unit/emulator tests |
| | **Error Handling & Data Validation** | 5 pts | Strict Zod schemas; standardized `{ error: { code, message, details } }` envelope (`400`, `401`, `403`, `404`, `413`, `422`, `429`, `500`, `503`) | Boundary input validation tests and graceful offline/timeout error banners |
| **Presentation** | **Clarity and Structure** | 10 pts | Structured deck covering caregiver problem context, architecture, live demo, limitations, and conclusion | Rehearsed team slide presentation |
| | **Explanation of API Integration** | 10 pts | Technical walkthrough aligned with [API Reference](api-reference.md) covering REST endpoints, Bearer token verification, Open Library/Open-Meteo proxying, and AI fallback | Rehearsed architecture explanation section |
| | **Demo & Functionality** | 15 pts | Live demonstration orchestrated via `scripts/demo-cli/run-demo.mjs` against local Firebase emulators plus live cloud proof (`littlesteps-app-cict`) and backup video | Verified end-to-end walkthrough in [Demo Environment & Rehearsal Plan](academic/cit210/demo-environment-and-rehearsal.md) |

---

## 6. Milestone Exit Verification Summary

| Milestone | Key Milestone Deliverable | Requirements Verified | Status |
| :---: | :--- | :--- | :---: |
| **M0** | Execution Readiness & Prototype Validation | Prototype walkthrough for FR-01..06; PRQ-01..03 (`Docs #15`) | **Complete** |
| **M1** | Secure End-to-End Foundation | FR-01, PRQ-01, NFR-SEC-01..02, NFR-PRIV-01 | **Complete** |
| **M2** | Learning Content & Activity Loop | FR-02, FR-04, NFR-PRIV-03 | **Complete** |
| **M3** | Private Journal & Weekly Reflection | FR-03, FR-05, NFR-PRIV-02 | **Complete** |
| **M4** | Constrained AI Suggestions & Fallback | FR-06, NFR-AI-01..05, NFR-REL-01 | **Complete** |
| **M5** | Release-Readiness Review & Defense Prep | Cross-repo CI, release APK, final docs & rehearsal (`Docs #16`, `CC 207B #11`) | **Active (Final Verification)** |
