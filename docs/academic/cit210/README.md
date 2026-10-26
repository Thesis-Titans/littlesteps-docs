# CIT 210 — Web Systems and Technologies Deliverables

**Course:** CIT 210 Web Systems and Technologies  
**Institution:** West Visayas State University — College of Information and Communications Technology  
**Core Technologies:** React + TypeScript Web Application (Vite), Express Node.js API, Firebase Auth & Firestore  
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
- **Custom REST API:** Express + TypeScript backend in `littlesteps-api` implementing the [OpenAPI 3.1 specification](https://github.com/Thesis-Titans/littlesteps-api/blob/main/openapi/openapi.yaml).
- **Third-Party API Integration:**
  - **Primary:** Gemini API free tier for the activity recommendation helper ([ADR-008](../../architecture-decisions.md); server-side Cloud Function, synthetic prompts only).
  - **Optional Stretch:** Open-Meteo forecast API for weather-aware outdoor suggestions ([ADR-009](../../architecture-decisions.md); optional enhancement, first item dropped if schedule slips).
- **Dynamic Data Flow:** Bidirectional client-server communication with JSON payloads and bearer-token authentication.

### 2. Client-Side Interface & Usability (20 pts)
- **React Frontend (`littlesteps-react`):** Built with React 19, TypeScript, and Vite.
- **Interactivity:**
  - 1-tap quick filters (*"Under 10 mins"*, *"No materials needed"*, *"Indoor"*).
  - Search across curated activity and story libraries.
  - Dynamic profile switching and routine schedule updates.
- **Viewport Responsiveness:** Optimized layouts for desktop/tablet and responsive mobile viewports (375px–414px) adhering to the [UI/UX Design Specification](../../ui-ux-design-specification.md).

### 3. Server-Side Logic & Data Processing (15 pts)
- **Modular Controllers:** Express route handlers with controller abstraction and service layers.
- **Data Persistence:** Cloud Firestore document storage with caregiver-scoped subcollections ([Data Model](../../data-model.md)).
- **Authorization & Multi-Tenancy:** Application-level Broken Object Level Authorization (BOLA) verification for child-scoped resources ([ADR-003](../../architecture-decisions.md)).
- **Deterministic Fallbacks:** Immediate rule-based catalog fallback when external AI services fail, time out, or rate limit ([ADR-006](../../architecture-decisions.md), [ADR-008](../../architecture-decisions.md)).

### 4. Error Handling & Data Validation (5 pts)
- **Input Validation:** Bounded validation schemas for child profiles (0–71 months age bands), dates, and journal lengths.
- **Consistent Error Envelopes:** Standardized `{ error: { code, message } }` JSON responses.
- **Client Resilience:** 5-state interaction matrix (empty, loading skeleton, error banner, permission-denied, offline/fallback).

---

## Presentation & Live Demo Structure (35 pts)

The class presentation accounts for **35 points (35%)** of the total grade and will be organized as follows:

1. **Clarity & Structure (10 pts):**
   - **Introduction:** Client context (CSWDO La Paz–Lapuz District office; researched as realistic client without formal live contact) and problem statement.
   - **System Overview:** Architecture of the coordinated system (React web client + shared API + Cloud Firestore).
   - **Conclusion:** Summary of findings, current constraints, and future work.
2. **Explanation of API Integration (10 pts):**
   - Walkthrough of core endpoints (`/children`, `/activities`, `/recommendations`).
   - Demonstration of request/response headers, token decoding (using local emulator tokens during development and demo), and third-party API integration.
3. **Demo & Functionality (15 pts):**
   - Live demonstration of the working React web application against local Firebase emulators.
   - Verification of live child profile creation, routine planning, private journal recording, and catalog search.
   - Rehearsed backup video prepared to safeguard against unexpected hardware/network issues during live presentation.

---

## Status and Planned Deliverables

| Item | Planned Schedule | Status |
|---|---|---|
| **API Contract & Schemas** | Sprint 1 (Oct 26 – Nov 1) | Canonical OpenAPI 3.1 contract active in `littlesteps-api`; auth emulator integration tests verified |
| **Authentication & Profile CRUD** | Sprint 1 (Oct 26 – Nov 1) | In progress: Express route controllers and React client foundation (M1) |
| **Activity Catalog & Routine Planning** | Sprint 2 (Nov 2 – Nov 8) | Planned: reviewed catalog querying, schedule state, quick filters (M2) |
| **Observation Journal & Weekly Summary** | Sprint 2 (Nov 2 – Nov 8) | Planned: caregiver-scoped private notes and deterministic weekly recaps (M3) |
| **Gemini AI Recommender & Fallback** | Sprint 2 (Nov 2 – Nov 8) | Planned: server-side Cloud Function with 8s timeout and catalog fallback (M4) |
| **Live Demo Rehearsal & Backup Video** | Wrap-up (Nov 26 – Dec 1) | Planned for M5 release gate prior to Dec 2 presentation |

