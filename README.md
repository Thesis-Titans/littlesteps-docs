# LittleSteps — Project Documentation

## Project Overview

LittleSteps is an early-learning and caregiver support application helping parents and caregivers of children aged 0–5 years (0–71 months) plan screen-free home play, record private non-diagnostic observations, and review weekly participation summaries.

### Coordinated Academic Courses

- **CC 207B — Applications Development and Emerging Technologies:** Cross-platform Flutter application (`Thesis-Titans/CC-207B_26-27_Final-Project`, folder `BSIT-3A/LittleSteps`), live demonstration, software documentation, and individual code defense (**December 1, 2026 at 7:00 AM**; LMS upload window completes December 2, 2026).
- **CIT 210 — Web Systems and Technologies:** Responsive React web application (`littlesteps-react`), shared Express REST API (`littlesteps-api`), external API integrations (Open Library, Open-Meteo, Google Gemini), and Cloud Firestore persistence (**December 2, 2026**).
- **CIT 246 — IT Project Management:** Simulated 6–12 month IT Project Management Plan exercise for the CSWDO La Paz–Lapuz District office (**December 2, 2026**; maintained separately from the one-month software build).

### Core Capabilities

LittleSteps implements six core functional capabilities (FR-01 through FR-06):

1. **Child Profile and Milestone Tracking** — data-minimized child profiles (nickname + birth month or age band) and non-diagnostic observational milestone prompts.
2. **Daily Activity Planning and Tracking** — daily play scheduling, completion toggling with undo, quick filters, and optional coarse-location weather play hints.
3. **Private Observation Journal** — caregiver-isolated qualitative notes excluded from external AI prompts, telemetry, and local offline caches.
4. **Story, Rhyme, and Learning Activity Library** — searchable Firestore-backed Philippine early-learning catalog, Open Library picture-book discovery, saved Family Bookshelf, and in-app traditional rhymes (English, Filipino, Hiligaynon).
5. **Weekly Progress Summary** — deterministic, factual Monday–Sunday reflection recaps without diagnostic scores or developmental rankings.
6. **AI Activity Suggestion Helper and Storybook Companion** — server-side Google Gemini selection and guardrailed custom material adaptation with deterministic catalog fallback.

### Technical Architecture

- **Frontend Clients:** React 19 + TypeScript + Vite (`littlesteps-react`) and Flutter + Dart Material 3 (`CC-207B_26-27_Final-Project`, `BSIT-3A/LittleSteps`).
- **Shared Backend:** Node.js 22 + Express 5 + TypeScript + Zod REST API (`littlesteps-api`) hosted on Firebase Cloud Functions (2nd Gen, `asia-southeast1`).
- **Database & Auth:** Firebase Authentication and Cloud Firestore (caregiver-scoped subcollections plus global seeded catalog collections `catalog_activities`, `catalog_milestones`, `catalog_rhymes`).
- **External Services:** Open Library REST API (picture books), Open-Meteo Forecast API (coarse city-level weather hints), and Google Gemini REST API (`v1beta`, server-pinned `GEMINI_MODEL`).

### Project Status

All six core functional capabilities (FR-01–FR-06) and cross-cutting prerequisites (PRQ-01–PRQ-03) are implemented across the shared API, React web client, and Flutter mobile client. The project is in **Milestone 5 (Release-Readiness Review & Final Evaluation Prep)** with automated CI checks active across all four repositories.

This repository is the canonical Level 2 source of truth for system scope, architecture decisions, API and data specifications, security and privacy safeguards, content provenance, and academic course deliverables.

---

## Getting Started & Local Demo CLI

- [Developer Onboarding Guide](docs/getting-started.md): step-by-step setup for Node.js 22, Java 21, Flutter SDK, Firebase Local Emulator Suite, and Firestore catalog seeding.
- [Cross-Platform Demo CLI](scripts/demo-cli/README.md): interactive Node.js CLI (`node scripts/demo-cli/run-demo.mjs`) for checking prerequisites (`doctor`), starting local emulators and clients (`start`), seeding demo data (`seed`), and managing Android ADB / APK workflows (`android`).

---

## Canonical Documentation Suite

All system-wide specifications live in `docs/` and follow ISO/IEC/IEEE, PMBOK, OpenAPI 3.1, WCAG 2.2 AA, and Diátaxis standards:

### 1. Requirements & Traceability
- [Product Scope](docs/product-scope.md) (ISO/IEC/IEEE 29148): six core functional requirements (FR-01..06), single-caregiver actor boundary, age navigation bands, and explicit IN/OUT boundaries.
- [Verification & Traceability Matrix](docs/traceability-matrix.md) (ISO 29148 / PMBOK): end-to-end traceability linking FRs, PRQs, NFRs, and CIT 210 rubric criteria to implementation and verification evidence.

### 2. Architecture, API, Data & Security
- [Architecture Decisions](docs/architecture-decisions.md) (ISO/IEC/IEEE 42010): Architecture Decision Records (ADRs 001–016) covering shared backend topology, Firestore catalog migration, hybrid AI guardrails, and external integrations.
- [API Reference & Integration Guide](docs/api-reference.md) (OpenAPI 3.1 / ISO 42010): REST endpoint catalog, Open Library and Open-Meteo integrations, AI fallback hierarchy, caching rules, and standardized error envelopes.
- [Data Model Specification](docs/data-model.md) (IEEE 1016): Cloud Firestore multi-tenant collection hierarchy, entity schemas, global catalog collections, and data lifecycle rules.
- [Security, Privacy, and AI Safeguards](docs/security-privacy-ai.md) (RA 10173 / RA 12199): Bearer token verification, BOLA non-leakage defenses, data minimization, and 3-layer AI safety guardrails.

### 3. UI/UX Design & Usability Evaluation
- [Design System Brief (DESIGN.md)](docs/DESIGN.md) (ISO 9241 / WCAG 2.2 AA): machine-readable token brief, color/type/spacing rules, component inventory, and React/Flutter agent guidance.
- [UI/UX Design Specification](docs/ui-ux-design-specification.md) (ISO 9241 / WCAG 2.2 AA): HCI principles, ergonomic targets, voice and wording rules, 5-state interaction matrix, and Flutter Material 3 adaptation.
- [Usability & Design Evaluation](docs/usability-and-design-evaluation.md) (ISO 9241-11 / Nielsen Heuristics / WCAG 2.2 AA): M0 prototype storyboards, informal caregiver walkthrough protocol, heuristic audit, and React/Flutter/Figma design review rubric.

### 4. Content Provenance & Research
- [Philippine Content Provenance](docs/philippine-content-provenance.md) (RA 12199 / ECCD / DepEd): statutory baseline, item-level provenance schemas, Firestore catalog audit, review gates, and external technical/statutory research register.

### 5. Onboarding, Governance & Delivery
- [Developer Onboarding Guide](docs/getting-started.md) (Diátaxis Tutorial): reproducible local setup for API, Web, Mobile, and Firebase Emulators.
- [Execution Plan](docs/execution-plan.md) (PMBOK / ISO 21500): delivery milestones (M0–M5), work breakdown structure, and synchronized academic calendar.
- [Documentation Standards](docs/documentation-standards.md) (Diátaxis Governance): three-tier documentation hierarchy, standards mapping, and repository consistency baseline.

---

## Academic Course Deliverables

- [Academic Deliverables Index](docs/academic/README.md): centralized directory for course-specific evaluation packages.
- [CC 207B — Applications Development](docs/academic/cc207b/README.md): Flutter mobile client deliverables, software documentation, AI specification, and defense requirements.
- [CIT 210 — Web Systems & Technologies](docs/academic/cit210/README.md): React web application, shared API integration, and live demonstration plan.
- [CIT 246 — IT Project Management Plan](docs/academic/cit246/README.md): simulated 6–12 month IT Project Management Plan package and Checkpoint 1 concept.

---

## Repositories

- [Documentation (`littlesteps-docs`)](https://github.com/Thesis-Titans/littlesteps-docs)
- [Backend API (`littlesteps-api`)](https://github.com/Thesis-Titans/littlesteps-api)
- [Web Client (`littlesteps-react`)](https://github.com/Thesis-Titans/littlesteps-react)
- [Mobile Client (`CC-207B_26-27_Final-Project`, `BSIT-3A/LittleSteps`)](https://github.com/Thesis-Titans/CC-207B_26-27_Final-Project/tree/main/BSIT-3A/LittleSteps)

---

## Community & Governance

- [Contribution Guidelines](CONTRIBUTING.md): branching, PR reviews, coding standards, local verification commands, and synthetic data rules.
- [Security Policy](SECURITY.md): private vulnerability reporting, academic response expectations, and child privacy safeguards.
- [Code of Conduct](CODE_OF_CONDUCT.md): standards for respectful academic collaboration.

---

## Boundaries & Rights Notice

LittleSteps is an academic software evaluation system. Age bands are app navigation categories, not clinical developmental classifications, and milestone prompts are observational and educational, never diagnostic.

**All Rights Reserved (Academic Evaluation Only)** is the project's intended rights policy. Repositories are public for academic evaluation, faculty review, and course demonstration; public visibility does not grant an open-source license for general reuse, modification, or commercial redistribution. This notice is not a formally reviewed legal instrument; seek faculty or legal review before relying on it for commercial or public deployment.
