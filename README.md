# LittleSteps — Project Documentation

## Project Overview

LittleSteps is an academic software development project focused on helping parents and caregivers support the early learning and development of children.

### Courses Involved

- **CC 207B — Application Development and Emerging Technologies:** Flutter application development.
- **CIT 210 — Web Systems and Technologies:** React web application, API, and database integration.
- **CIT 246 — IT Project Management Plan:** Project planning, documentation, scheduling, and management.

### What the System Does

The application has six core features:

1. **Child Profile and Milestone Tracking** — record child information and caregiver observations.
2. **Daily Activity Planning and Tracking** — plan and track everyday learning activities.
3. **Private Observation Journal** — keep personal notes about a child's experiences and progress.
4. **Story, Rhyme, and Learning Activity Library** — explore learning resources suitable for young children.
5. **Weekly Progress Summary** — review recorded activities and observations without making unsupported developmental claims.
6. **AI Activity Suggestion Helper** — recommend activities from a reviewed catalog, with a fallback when AI is unavailable.

### Technical Direction

- **Frontend:** React for the web and Flutter for mobile.
- **Backend:** A shared API and data model.
- **Database and services:** Firebase is included in the recorded initial technology scope.
- **AI:** A constrained helper for activity suggestions, not a diagnostic tool.

### Project Context and Current Status

The project is currently focused on requirements, project documentation, UI/UX design, and prototype preparation before full implementation.

The work must remain evidence-based: the initial caregiver research is limited, so user needs and design assumptions still require further validation. The prototype is intended to demonstrate the planned screens and workflows; it should not be mistaken for a fully functioning application.

The project also needs to meet the separate academic requirements of the three courses, including implementation, documentation, presentation, demonstration, and code defense as applicable.

In short: LittleSteps is one coordinated academic project with mobile, web, and project-management deliverables, intended to make everyday early-learning support more organized and accessible for caregivers.

This repository is the canonical home for product scope, decisions, research provenance, privacy and safety requirements, and course deliverables.

## Getting started
- [Developer onboarding guide](docs/getting-started.md): step-by-step tutorial for Node.js 22, Java 21, Firebase Emulators, and local full-stack development. Verify the guide against the current code before relying on it.

## Source of truth
- [Product scope](docs/product-scope.md): six core features and boundaries.
- [Architecture decisions](docs/architecture-decisions.md): current technical direction and ADRs.
- [Data model specification](docs/data-model.md): Firestore entities, relationships, ownership, and retention.
- [Security, privacy, and AI guardrails](docs/security-privacy-ai.md): required safeguards and statutory baselines.
- [Verification and traceability matrix](docs/traceability-matrix.md): requirements-to-tests and delivery traceability.
- [UI/UX design specification](docs/ui-ux-design-specification.md): human-computer interaction principles, responsive design system, and prototype validation requirements.
- [Prototype traceability and storyboards](docs/prototype-traceability-storyboards.md): provisional caregiver scenarios, minimal prototype scope, and walkthrough acceptance criteria.
- [Execution plan](docs/execution-plan.md): delivery approach, milestones, and academic calendar.
- [Development workflow](docs/development-workflow.md): branch, review, and verification expectations.
- [Documentation standards](docs/documentation-standards.md): canonical documentation hierarchy, academic deliverables mapping, and repository consistency.
- [Research register](docs/research-register.md): external sources and their design implications.
- [Philippine content provenance](docs/philippine-content-provenance.md): source candidates, item-level citation fields, and content-review gates.

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
