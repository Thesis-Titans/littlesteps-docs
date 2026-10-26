# LittleSteps — Project Documentation

## Project Overview

LittleSteps is an academic software development project focused on helping parents and caregivers support the early learning and development of children.

### Courses Involved

- **CC 207B — Applications Development and Emerging Technologies:** Flutter application development.
- **CIT 210 — Web Systems and Technologies:** React web application, API, and database integration.
- **CIT 246 — IT Project Management:** Project planning, documentation, scheduling, and management.

### What the System Does

The application has six core features:

1. **Child Profile and Milestone Tracking** — record child information and caregiver observations.
2. **Daily Activity Planning and Tracking** — plan and track everyday learning activities.
3. **Private Observation Journal** — keep personal notes about a child's experiences and progress.
4. **Story, Rhyme, and Learning Activity Library** — explore learning resources suitable for young children.
5. **Weekly Progress Summary** — review recorded activities and observations without making unsupported developmental claims.
6. **AI Activity Suggestion Helper** — recommend activities from a reviewed catalog, with a fallback when AI is unavailable.

### Technical Direction

- **Frontend:** React for the web (`littlesteps-react`) and Flutter for mobile (`littlesteps-flutter`).
- **Backend:** A shared API and data model (`littlesteps-api`).
- **Database and services:** Firebase Authentication, Cloud Functions (2nd Gen), and Cloud Firestore.
- **AI:** A constrained helper for activity suggestions, not a diagnostic tool.

### Project Context and Current Status

The project has initiated Sprint 1 foundation implementation on the API and React web client, with the prototype walkthrough running alongside the foundation build.

The work must remain evidence-based: the initial caregiver research is limited, so user needs and design assumptions still require further validation. The prototype is intended to demonstrate the planned screens and workflows; it should not be mistaken for a fully functioning application.

The project also needs to meet the separate academic requirements of the three courses, including implementation, documentation, presentation, demonstration, and code defense as applicable.

In short: LittleSteps is one coordinated academic project with mobile, web, and project-management deliverables, intended to make everyday early-learning support more organized and accessible for caregivers.

This repository is the canonical home for product scope, decisions, research provenance, privacy and safety requirements, and course deliverables.

## Getting started
- [Developer onboarding guide](docs/getting-started.md): step-by-step tutorial for Node.js 22, Java 21, Firebase Emulators, and local full-stack development. Verify the guide against the current code before relying on it.

## Canonical Documentation Suite (15 Specifications)

All system-wide specifications live centrally in `docs/` and adhere to ISO/IEC/IEEE, PMBOK, and Diátaxis standards:

### 1. Requirements & System Scope
- [Product scope](docs/product-scope.md) (ISO/IEC/IEEE 29148): six core functional requirements (FR-01..06), single-caregiver actor boundary, and IN/OUT scope definitions.
- [Verification and traceability matrix](docs/traceability-matrix.md) (ISO 29148 / PMBOK): end-to-end traceability linking requirements and CIT 210 rubric items to test suites, tracking issues, and evidence.

### 2. Architecture, API & Security
- [Architecture decisions](docs/architecture-decisions.md) (ISO/IEC/IEEE 42010): Architecture Decision Records (ADRs 001–010) detailing system topology, Firebase Cloud Functions, and Gemini AI integration.
- [API reference and integration guide](docs/api-reference.md) (OpenAPI 3.1 & ISO 42010): REST endpoints catalog, Open Library data integration, 3-tier AI fallback engine, error codes, and sequence diagrams.
- [Data model specification](docs/data-model.md) (IEEE 1016): Cloud Firestore collection hierarchies, entity schemas, and data lifecycle requirements.
- [Security, privacy, and AI safeguards](docs/security-privacy-ai.md) (RA 10173 / RA 12199): mandatory token verification, BOLA non-leakage defenses, and child privacy guardrails.

### 3. UI/UX Design & User Research
- [UI/UX design specification](docs/ui-ux-design-specification.md) (ISO 9241 / WCAG 2.2 AA): human-computer interaction principles, responsive design system, and prototype validation requirements.
- [Prototype traceability and storyboards](docs/prototype-traceability-storyboards.md) (ISO 9241): provisional caregiver scenarios, minimal prototype scope (P0/P1), and walkthrough acceptance criteria.
- [Parent walkthrough guide](docs/parent-walkthrough-guide.md) (ISO 9241-11:2018): practical field protocol, ethical consent script, task matrix, and findings template for caregiver usability evaluation.

### 4. Content Research & Philippine Provenance
- [Philippine content provenance](docs/philippine-content-provenance.md) (RA 12199 / ECCD): source candidates, item-level citation fields, and content-review gates.
- [Research register](docs/research-register.md): external statutory, regulatory, and public health sources informing product design.

### 5. Engineering, Governance & Delivery
- [Development workflow](docs/development-workflow.md) (ISO/IEC/IEEE 12207): branch, review, and verification expectations.
- [Execution plan](docs/execution-plan.md) (PMBOK / ISO 21500): delivery milestones (M0–M5), work breakdown structure, and synchronized academic deadlines.
- [Documentation standards](docs/documentation-standards.md) (Diátaxis Governance): canonical documentation hierarchy, academic deliverables mapping, and repository consistency.

## Academic Course Deliverables
- [Academic Deliverables Index](docs/academic/README.md): centralized directory for course-specific evaluation packages.
- [CIT 246 — IT Project Management Plan](docs/academic/cit246/README.md): project management plan packages (including [Checkpoint 1 Concept Proposal](docs/academic/cit246/checkpoint-1-concept.md)).
- [CC 207B — Applications Development](docs/academic/cc207b/README.md): Flutter mobile client deliverables and defense requirements.
- [CIT 210 — Web Systems & Technologies](docs/academic/cit210/README.md): React web application and API integration deliverables.

## Repositories
- [Documentation](https://github.com/Thesis-Titans/littlesteps-docs)
- [API](https://github.com/Thesis-Titans/littlesteps-api)
- [Web](https://github.com/Thesis-Titans/littlesteps-react)
- [Mobile](https://github.com/Thesis-Titans/littlesteps-flutter) (private)

## Community & Contribution
- [Contribution guidelines](CONTRIBUTING.md): branch conventions, verification expectations, synthetic data rules, and PR review workflow.
- [Security policy](SECURITY.md): vulnerability reporting, responsible disclosure, and academic response expectations.
- [Code of conduct](CODE_OF_CONDUCT.md): expectations for respectful academic collaboration.

## Status
This is an initial foundation proposal for review, not evidence of a deployed or production-ready system. Test locally before deployment. Review privacy obligations, Firebase billing, and GitHub repository settings before a public demo or production use.

The age bands are app navigation categories, not clinical developmental classifications. Milestone content is observational and educational, not diagnostic.

## Rights Notice — Wording Pending Review
**All Rights Reserved (Academic Evaluation Only)** is the project's intended rights policy. The repositories are public for academic course evaluation, faculty review, and demonstration; this notice does not technically restrict who can view or interact with public repositories. The wording and intended restrictions have not been represented as legally reviewed. Before relying on the notice as a formal legal instrument, seek review from the course instructor or an appropriate legal resource. No open-source license is intentionally granted by this project; do not interpret this notice as a reviewed license instrument.
