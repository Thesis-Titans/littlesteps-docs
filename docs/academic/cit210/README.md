# CIT 210 — Web Systems and Technologies Deliverables

**Course:** CIT 210 Web Systems and Technologies  
**Institution:** West Visayas State University — College of Information and Communications Technology  
**Core Technologies:** React 19 + TypeScript Web Application (Vite), Express 5 Node.js API, Firebase Auth & Cloud Firestore  
**Evaluation:** Presentation & Local Demonstration (December 2, 2026; no individual code defense)  
**Governing Document:** [Official CIT 210 Final Project Evaluation Rubric](CIT210_Final_Project_Requirements.md) (100 Points Total)  
**Authority:** The course instructor's brief and rubric are the authoritative source for course grading. Supporting documentation and OpenAPI contracts serve as technical evidence for the evaluation.

---

## Evaluation Rubric Breakdown (100 Points Total)

The course evaluates the final project through two primary categories:

| Category | Criteria | Description | Points |
| :--- | :--- | :--- | :---: |
| **Application Development (65%)** | **API Integration (25%)** | Seamless integration of a third-party or custom API with fully functional and dynamic data flow between client and server. | **25** |
| | **Client-Side Interface & Usability (20%)** | Intuitive, responsive, and user-friendly interface developed in React; includes interactivity such as search, filter, or dynamic rendering of data. | **20** |
| | **Server-Side Logic & Data Processing (15%)** | Efficient handling of API requests, proper state management, and optimized data processing with minimal performance issues. | **15** |
| | **Error Handling & Data Validation (5%)** | Proper validation of user input and consistent error handling for failed API calls or invalid data inputs. | **5** |
| **Presentation (35%)** | **Clarity and Structure (10%)** | Presentation is organized, clear, and demonstrates logical project flow (introduction, system overview, demo, conclusion). | **10** |
| | **Explanation of API Integration (10%)** | Clearly explains API functionality, endpoints used, and how it enhances the system's purpose or efficiency. | **10** |
| | **Demo & Functionality (15%)** | Demonstrates complete and stable application; all main features work as intended during live demo. | **15** |
| **TOTAL** | | | **100** |

---

## Technical Mapping to LittleSteps Components

### 1. API Integration (25 pts)
- **Custom REST API:** Express 5 + TypeScript backend in `littlesteps-api` implementing the canonical [API Reference & Integration Guide](../../api-reference.md) and [OpenAPI 3.1 specification](https://github.com/Thesis-Titans/littlesteps-api/blob/main/openapi/openapi.yaml).
- **External Data API Integration (Open Library REST API & Closed-Loop Pipeline):**
  - Live query integration with the **Internet Archive's Open Library REST API** (`openlibrary.org/subjects/{subject}.json` and `openlibrary.org/search.json?q={query}`) to browse, search, paginate, and render children's picture books ([ADR-010](../../architecture-decisions.md), [ADR-013](../../architecture-decisions.md)).
  - **Family Bookshelf & Closed-Loop Planning:** Caregivers save physical books they own into child-scoped Cloud Firestore subcollections (`POST /api/v1/children/:childId/books`, [ADR-015](../../architecture-decisions.md)), generate screen-free play companions (`POST /api/v1/ai/story-activity`), and schedule them directly into Today's routine (`POST /api/v1/children/:childId/plans` with inline `customActivity` snapshots).
  - Server-side in-memory caching (60-minute TTL) optimizes network efficiency and protects against upstream rate limits, with deterministic local fallback on upstream outage.
- **Environmental Context API (Open-Meteo Forecast REST API):**
  - Live weather forecast querying (`GET /api/v1/catalog/weather`) providing real-time indoor/outdoor play hints using coordinates rounded to two decimal places (~1.1 km) with zero GPS tracking ([ADR-009](../../architecture-decisions.md)).
- **External AI Augmentation (Google Gemini REST API with Guardrailed Fallback):**
  - **Tier 1 (Cloud Primary):** Server-pinned `GEMINI_MODEL` (e.g., `gemini-3.5-flash-lite`) via Node 22 built-in `fetch` powering:
    1. *Structured Idea Helper (`POST /api/v1/ai/recommendations`):* Catalog-first matching plus opt-in 3-layer defense-in-depth custom material adaptation (`allowCustom: true`, `source: "ai_custom"`, [ADR-016](../../architecture-decisions.md)).
    2. *Storybook Play Companion (`POST /api/v1/ai/story-activity`):* Screen-free play ideas from Open Library book metadata.
    3. *Activity Adaptation (`POST /api/v1/ai/adapt`):* Shorter, easier, harder, or missing-material adjustments for catalog activities.
  - **Tier 2:** Rule-based adaptation used by `/api/v1/ai/adapt` when Tier 1 is unavailable (a local Ollama tier was considered in ADR-010 but is not built).
  - **Tier 3 (Deterministic Rule-Based Catalog):** Instant fallback to Firestore-backed Philippine early-learning activities (`catalog_activities`) if external AI times out (8 s), rate limits, fails, or produces invalid output ([ADR-006](../../architecture-decisions.md)).
- **Dynamic Data Flow:** Bidirectional client-server communication with JSON payloads and Firebase ID Bearer token authentication.

### 2. Client-Side Interface & Usability (20 pts)
- **React Frontend (`littlesteps-react`):** Built with React 19, TypeScript, React Router, Vite, and plain tokenized CSS matching [DESIGN.md](../../DESIGN.md) and [UI/UX Design Specification](../../ui-ux-design-specification.md).
- **Interactivity:**
  - Symmetric quick filters (`Under 10 mins`, `No materials needed`, `Indoor`, `Outdoor`), multi-factor catalog search, and 3-shelf Storybooks (`Books from Open Library`, `Our Bookshelf`, `Read & Sing Together`).
  - Dynamic child profile switching, 1-tap completion with 10-second Undo toast, and non-diagnostic milestone & journal workflows.
- **Accessibility & Responsiveness:** Desktop (`1280px` sidebar) and mobile (`375px–414px` 72px bottom tab bar) viewports, WCAG 2.2 AA contrast (`#5A6A64` secondary ink), skip links, keyboard focus restoration, and 5-state resilience.

### 3. Server-Side Logic & Data Processing (15 pts)
- **Modular Express Architecture:** Layered routers, Zod validators, and domain services on Firebase Cloud Functions (2nd Gen, `asia-southeast1`).
- **Cloud Firestore Persistence:** Caregiver-scoped multi-tenant subcollections (`children`, `plans`, `milestone_observations`, `journal_entries`, `books`, `weekly_summaries`), global seeded catalog collections (`catalog_activities`, `catalog_milestones`, `catalog_rhymes`) with 5-minute TTL caching, and atomic `rate_limits` counters ([Data Model](../../data-model.md)).
- **BOLA Authorization:** Server-side `child.caregiverId === uid` enforcement returning uniform `404 RESOURCE_NOT_FOUND` on missing or unowned resources ([ADR-003](../../architecture-decisions.md), [Security Safeguards](../../security-privacy-ai.md)).

### 4. Error Handling & Data Validation (5 pts)
- **Strict Input Validation:** Bounded Zod schemas rejecting unknown fields, control characters, out-of-range birth months (`422`), oversized payloads (`413`), and unverified origins (`403`).
- **Consistent Error Envelopes:** Standardized `{ error: { code, message, details } }` JSON responses across all error status codes without leaking stack traces.
- **Client Resilience:** Complete 5-state UI matrix (populated, empty, loading skeleton, inline error with Retry, offline/AI fallback).

---

## Presentation & Live Demo Structure (35 pts)

1. **Clarity & Structure (10 pts):**
   - **Introduction:** Caregiver early-learning problem context grounded in Iloilo/Western Visayas families and Philippine ECCD/DepEd frameworks (noting that CIT 246 separately simulates an IT Project Management Plan for CSWDO).
   - **System Overview:** Shared architecture uniting the React web client, Express Cloud Functions gateway, Cloud Firestore, and external REST integrations.
   - **Conclusion:** Key findings, current limitations, and future enhancements.
2. **Explanation of API Integration (10 pts):**
   - Walkthrough of core endpoints in [API Reference](../../api-reference.md) (`/api/v1/children`, `/api/v1/catalog/activities`, `/api/v1/catalog/books/search`, `/api/v1/catalog/weather`, `/api/v1/ai/recommendations`, `/api/v1/ai/story-activity`, `/api/v1/ai/adapt`).
   - External REST integration mechanics: Open Library query parameters, cover normalization, response caching, and fallback data.
   - AI safety pipeline: prompt minimization (zero child PII or journal text), 8-second timeout, 3-layer hazard screening, and deterministic catalog fallback.
   - Security walkthrough: Bearer token verification, BOLA `404` non-leakage, and standardized error envelopes.
3. **Demo & Functionality (15 pts):**
   - Live demonstration of `littlesteps-react` against orchestrated local Firebase Emulators using `scripts/demo-cli/run-demo.mjs` plus live cloud deployment proof (`littlesteps-app-cict`). See [Demonstration Environment & Rehearsal Plan](demo-environment-and-rehearsal.md).
   - End-to-end journeys: child profile switching, Today plan & Weather Hint, Open Library search & Family Bookshelf, AI Idea Helper & fallback, Milestones, Private Journal, and This Week summary.
   - Pre-recorded backup video prepared for classroom contingency.

---

## Status and Deliverables

| Workstream | Milestone | Status |
| :--- | :---: | :--- |
| **OpenAPI 3.1 Contract & Auth Middleware** | M1 | **Completed:** Contract enforced in `littlesteps-api/openapi/openapi.yaml`; Bearer token and BOLA regression suites passing in CI. |
| **Child Profiles, Export & Cascade Deletion** | M1 | **Completed:** Child CRUD, UTC age-band derivation, JSON export, and recursive cascade deletion implemented across API and React. |
| **Firestore Catalogs, Storybooks, Bookshelf & Daily Planning** | M2 | **Completed:** Firestore catalog collections (`catalog_activities`, `catalog_milestones`, `catalog_rhymes`), Open Library proxy/search, Family Bookshelf, and Today planning implemented across API and React. |
| **Private Observation Journal & Weekly Reflection** | M3 | **Completed:** Caregiver-isolated journal CRUD and deterministic non-diagnostic weekly summary (`This week`) implemented across API and React. |
| **Guardrailed Gemini AI, Weather Hint & Fallback** | M4 | **Completed:** `/ai/recommendations` (with 3-layer `ai_custom` guardrails), `/ai/story-activity`, `/ai/adapt`, hourly rate limiting, Open-Meteo weather hint, and deterministic fallback implemented across API and React. |
| **Live Demo Rehearsal & Backup Video** | M5 | **In Progress:** Demo CLI (`scripts/demo-cli/run-demo.mjs`) verified; rehearsal and backup video preparation underway for December 2 presentation. |
