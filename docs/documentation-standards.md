# LittleSteps Documentation Standards

**Status:** Canonical Governance Baseline  
**Diátaxis Category:** Governance & Information Architecture  
**Related Documents:** [Development Workflow](development-workflow.md), [Academic Deliverables](academic/README.md)

---

## 1. Purpose & Core Questions

LittleSteps maintains a clean, maintainable documentation system designed to answer four core questions without duplicating content or creating competing sources of truth:

1. **What is this project, and how do I run it?** Clear repository overviews, prerequisites, and reproducible local setups.
2. **How should contributors make changes safely and consistently?** Standardized branch, test, PR, and review workflows.
3. **Where is authoritative information stored across repositories?** A strict three-tier hierarchy that designates canonical sources of truth.
4. **How do we keep documentation accurate as the system evolves?** Updating docs alongside code changes and verifying them with automated checks.

---

## 2. Three-Tier Documentation Hierarchy

To prevent documentation drift across multiple codebases, documentation is organized into three distinct tiers:

```
Level 1: Organization Principles (Shared conventions, review boundaries, academic terms)
   │
   ▼
Level 2: Canonical Project Documentation (`littlesteps-docs`)
   │      ├── Product Scope & Boundaries
   │      ├── Architecture & ADRs
   │      ├── Security, Privacy & AI Guardrails
   │      ├── Research Register & Content Provenance
   │      └── Full-Stack Onboarding Tutorial
   ▼
Level 3: Repository-Specific Documentation (`littlesteps-api`, `littlesteps-web`)
          ├── Quickstart & Local Dev Commands
          ├── Local Environment Variables (.env.example)
          ├── Test & Verification Scripts
          └── Technical Contracts (e.g., OpenAPI in API repo)
```

### Hierarchy Rules:
- **Canonical Source of Truth:** `littlesteps-docs` is the sole canonical authority for overall system architecture, product scope, cross-repo development workflows, data privacy, and legal/curriculum provenance.
- **Repository READMEs:** Focused strictly on their specific codebase. They must link to the canonical documentation in `littlesteps-docs` rather than copying full workflow policies or system descriptions.
- **Strict Mobile Isolation:** `littlesteps-mobile` remains private and strictly untouched pending the required CC 207B external fork. Community health files, workflows, and templates must **not** be applied to the mobile repository.

---

## 3. Industry Standards & "Docs-as-Code" Traceability

LittleSteps uses a **docs-as-code** workflow: Markdown documents are version-controlled, reviewed through pull requests, and checked by automated CI. The table below identifies relevant reference standards and the intended coverage of each document. Mapping a document to a standard does not by itself establish conformity or certification.

| Industry Standard | Specification Domain | LittleSteps Canonical Document | Standard Description & Coverage |
| :--- | :--- | :--- | :--- |
| **ISO/IEC/IEEE 29148:2018** | Software Requirements Specification (**SRS**) — Functional Scope | [`docs/product-scope.md`](product-scope.md) | Functional Requirements (**FR-01** to **FR-06**), single caregiver actor, age-band classifications, and strict IN/OUT boundaries. |
| **ISO/IEC/IEEE 29148:2018** | Software Requirements Specification (**SRS**) — Non-Functional Scope | [`docs/security-privacy-ai.md`](security-privacy-ai.md) | Non-Functional Requirements: **NFR-SEC** (Token auth, BOLA defense), **NFR-PRIV** (RA 10173 data minimization), **NFR-AI** (Catalog constraints, fallbacks). |
| **IEEE 29148 / PMBOK** | Requirements Traceability Matrix (**RTM**) & Quality Control | [`docs/traceability-matrix.md`](traceability-matrix.md) | Mapping connecting FR-01..06, PRQs, and NFRs to planned verification, work packages, and GitHub tracking issues. Update evidence and status as tests are implemented and run. |
| **IEEE 29148 / ISO 9241** | Human-Centered Design & Ergonomics Specification | [`docs/ui-ux-design-specification.md`](ui-ux-design-specification.md) | Usability heuristics, cognitive load principles, touch ergonomics ($\ge$ 44px), WCAG 2.2 AA contrast, and 5-state interaction matrices. |
| **ISO 9241 / Usability** | Prototype Traceability & Storyboards | [`docs/prototype-traceability-storyboards.md`](prototype-traceability-storyboards.md) | Provisional caregiver storyboards, minimal prototype scope (P0/P1), and 10-point walkthrough acceptance checklist for Docs Issue #15. |
| **IEEE 29148 / Statutory** | Domain Sourcing & Legislative Foundations | [`docs/philippine-content-provenance.md`](philippine-content-provenance.md) & [`docs/research-register.md`](research-register.md) | Statutory frameworks (RA 12199, RA 10173), official curriculum references, item-level citation schemas, and external regulatory registers. |
| **ISO/IEC/IEEE 42010:2022** | Architecture Description | [`docs/architecture-decisions.md`](architecture-decisions.md) | Architecture Decision Records (ADRs 001–007), a component topology, and selected architecture views. This is a lightweight architecture description informed by ISO/IEC/IEEE 42010, not a claim of full conformity. |
| **IEEE 1016** | Software Design Description (**SDD**) — Data Model Detail | [`docs/data-model.md`](data-model.md) | Proposed Cloud Firestore collection hierarchies, entity schemas, caregiver ownership paths, and data lifecycle requirements. This is a project data specification, not a declaration of conformity with IEEE 1016 or legal compliance. |
| **OpenAPI 3.1** | Software Design Description (**SDD**) — Interface View | [`littlesteps-api/openapi/openapi.yaml`](https://github.com/Thesis-Titans/littlesteps-api/blob/main/openapi/openapi.yaml) | Machine-readable technical contract: request/response envelopes, HTTP statuses, and data schemas. |
| **PMBOK / ISO 21500** | Project Management Plan (**PMP**) — Scope & Schedule Baseline | [`docs/execution-plan.md`](execution-plan.md) | Delivery milestones (M0–M5), academic dates, work packages, dependencies, and the prototype validation gate. |
| **PMBOK / ISO 21500** | Project Management Plan (**PMP**) — Quality & Change Control | [`docs/development-workflow.md`](development-workflow.md) | Branch protection, PR peer reviews, GitHub status checks (`Docs CI`, `API CI`, `Web CI`), and code defense criteria. |
| **Diátaxis Framework** | Learning-Oriented Tutorial | [`docs/getting-started.md`](getting-started.md) | Reproducible full-stack local setup guide for Node.js 22, Java 21, and Firebase Emulator Suite. |
| **Diátaxis Framework** | Quality & Information Architecture | [`docs/documentation-standards.md`](documentation-standards.md) | Documentation governance, three-tier hierarchy, Diátaxis quadrant mapping, and repository consistency audits. |

---

## 4. Academic Course Deliverables Mapping

To satisfy the specific submission requirements of all three coordinated courses without duplicate authoring, project documentation is mapped to each course's evaluated artifacts:

### 4.1 CC 207B: Applications Development and Emerging Technologies
1. **Software Documentation Package:**
   - **Overview & Introduction:** App Name, Purpose/Target Clients, and Technology Stack with specific versions.
   - **Functional Requirements:** Package inventory with purpose, UI/UX Prototypes, Implemented core features with screenshots and descriptions.
   - **Topic Coverage Matrix:** Maps course topics (Layout widgets, Navigation/routing, Forms & validation, Async operations/API, Data persistence, AI feature) directly to committed code (`file` and `widget/class`).
   - **AI Feature Specification:** AI model/service used, prompt schemas, sample outputs, graceful failure/fallback handling, known limitations, relevance justification, and RA 10173 privacy minimization.
   - **Future Enhancements & Roadmap:** Known limitations and planned improvements.
2. **Appendices:**
   - **AI Usage Log:** Tabular log (Member, Date, Tool, Prompt, Generated, Member Modifications).
   - **Individual Reflections:** Half-page per member (what built, one bug fixed and how, future improvements).
3. **Repository & Defense Evidence:**
   - Setup and run README with versions.
   - PR history showing teammate reviews and continuous contributions.
   - Preparation for individual code defense (2–3 min/member).

### 4.2 CIT 210: Web Systems and Technologies
1. **Web System Documentation:** Shared documentation package covering React web client, API endpoints, and database integration.
2. **Technical Contract:** Canonical OpenAPI specification maintained in the API repository (`openapi/openapi.yaml`).
3. **Reproducible Local Setup:** Step-by-step developer onboarding tutorial in [`docs/getting-started.md`](getting-started.md) for local emulator and full-stack execution.

### 4.3 CIT 246: IT Project Management Plan
1. **Checkpoint 1 Proposal (Due October 14, 2026):** One-page project concept covering Organization, Problem, Proposed System, and Possible Sponsor (A4, Arial 11), documented in [`docs/academic/cit246/checkpoint-1-concept.md`](academic/cit246/checkpoint-1-concept.md).
2. **Full IT Project Management Plan (25–40 Pages, Due December 2, 2026):** 17-section PDF covering:
   - Sections 1–4: Title Page, Executive Summary, Business Case, and Project Charter.
   - Sections 5–6: Stakeholder Register (8+ entries with opponent) and Scope Statement (IN/OUT boundaries).
   - Sections 7–9: WBS (3+ levels with dictionary), Schedule (Network diagram & Gantt), and Cost Baseline (Peso amounts, WBS-linked).
   - Sections 10–13: Quality Plan, Resource Plan (Org chart & RAM), Communications Plan, and Risk Register (8+ risks, $\ge 3$ non-technical).
   - Sections 14–17: Procurement Plan, Change Control/Closing/Transition Plan, Conclusion, and Appendices (signed contribution statement).

## 5. Information Architecture (Diátaxis Framework)

Documentation in `littlesteps-docs` aligns with the Diátaxis documentation framework, organizing information into four distinct reader needs:

| Type | Reader's Question | Focus | LittleSteps Document |
| :--- | :--- | :--- | :--- |
| **Tutorial** | *"Help me get started from scratch."* | Learning-oriented step-by-step guidance | [Developer onboarding guide](getting-started.md) |
| **How-To Guide** | *"How do I complete a specific operational task?"* | Task-oriented problem solving | [Development workflow](development-workflow.md) |
| **Reference** | *"What is the exact technical contract or specification?"* | Information-oriented technical facts | [OpenAPI contract in the API repository](https://github.com/Thesis-Titans/littlesteps-api/blob/main/openapi/openapi.yaml), [Data model specification](data-model.md), [Verification & traceability matrix](traceability-matrix.md), [UI/UX design specification](ui-ux-design-specification.md), environment variables, and provenance schemas |
| **Explanation** | *"Why is the system designed this way?"* | Understanding-oriented rationale and context | [Product scope](product-scope.md), [architecture decisions](architecture-decisions.md), [security, privacy, and AI guardrails](security-privacy-ai.md), [Philippine content provenance](philippine-content-provenance.md) |

These are intended destinations in the documentation architecture, not a claim that every listed document or contract is complete or production-ready. Each linked resource's current status must be checked before relying on it.

---

## 6. Policy Baselines

### 6.1 Intended Rights Policy: All Rights Reserved (Academic Evaluation Only)

- **Project intent:** The project owner intends to reserve copyright and not grant a general open-source license for reuse, modification, redistribution, or commercial use.
- **Public visibility:** Repositories are public for academic course evaluation, faculty review, and demonstration. Public visibility is not an access restriction: people may be able to view, fork, or otherwise interact with public repositories under GitHub's platform features and terms.
- **Notice limitations:** The phrase **“All Rights Reserved (Academic Evaluation Only)”** communicates project intent, but this document and a README notice are not a substitute for a reviewed license instrument or legal advice. Do not describe the academic-only purpose as a technical restriction on who can view the public repositories.
- **Before finalizing:** Have the exact copyright/license notice and intended restrictions reviewed by the course instructor or an appropriate legal resource. Until that review, do not add an open-source license such as MIT, Apache-2.0, or GPL, and do not claim the notice has been legally reviewed.
- **Data boundary:** Real child and caregiver personal data, production credentials, and restricted curriculum packages must not be committed to public repositories.

### 6.2 Multi-Repository Community Health File Placement

- **Location:** Maintain community health files as **explicit files within each active repository** (`littlesteps-docs`, `littlesteps-api`, and `littlesteps-web`).
- **Rationale:** An organization-level `Thesis-Titans/.github` repository is intentionally **not used** so that default templates and policies do not inadvertently apply to `littlesteps-mobile`.

---

## 7. Standard File Baseline Specification

The following is the **target baseline** for each active repository; it does not mean every file already exists. Repository-specific requirements should be adapted to the codebase, without duplicating canonical project documentation.

| File / Resource | Priority | Purpose & Required Content |
| :--- | :---: | :--- |
| **`README.md`** | **Required** | Project/repository front door: what it does, current implementation status vs. planned features, prerequisites, fast local commands, link to canonical docs in `littlesteps-docs`, and the reviewed rights notice when finalized. |
| **`CONTRIBUTING.md`** | **Required** | Contributor manual: branch naming, PR workflow, required local/CI verification, secret-handling rules, and Mark's review/approval boundary. |
| **`SECURITY.md`** | **Required** | Vulnerability reporting: realistic reporting channels, academic project context, and responsible disclosure instructions. |
| **`CODE_OF_CONDUCT.md`** | **Recommended** | Contributor expectations and academic community standards. |
| **`.github/PULL_REQUEST_TEMPLATE.md`** | **Required** | Structured PR submission template: change summary, linked issue, tests run, documentation updates, security/privacy impact, and checklist. |
| **`.github/ISSUE_TEMPLATE/`** | **Required** | Structured templates for bug reports and feature proposals. |
| **`docs/`** | **As needed** | Detailed technical guides, architecture specifications, and reference records. Keep cross-repository canonical project documentation in `littlesteps-docs`; add repository-local docs only where they serve a distinct repository-specific need. |

---

## 8. Repository-by-Repository Audit Checklist

The table records the observed baseline at the time of this Stage 1 draft and the target state. Items marked pending are not yet implemented as part of this workstream; re-check each repository during the relevant stage before marking anything complete.

| Repository | Component | Target State | Current Baseline Status |
| :--- | :--- | :--- | :--- |
| **`littlesteps-docs`** | `README.md` | Front door indexing canonical documentation, community policies, and rights notice | Present on main; includes index and community links |
| | `CONTRIBUTING.md` | Canonical contributor guidelines | Present on main (Stage 2) |
| | `SECURITY.md` | Public vulnerability reporting guide | Present on main (Stage 2; Private Vulnerability Reporting enabled) |
| | `CODE_OF_CONDUCT.md` | Standard academic contributor conduct | Present on main (Stage 2) |
| | PR / Issue Templates | Structured review and issue templates | Present on main (Stage 3) |
| | Docs CI | Automated relative-link, image-path, and issue-template field validation (lightweight zero-dependency verifier; not a full YAML parser or general Markdown style linter) | Present on main (Stage 4; Docs PR #12 merged, branch protection required check verified) |
| **`littlesteps-api`** | `README.md` | API overview linking to canonical docs and rights notice | Aligned on main (Stage 3) |
| | `CONTRIBUTING.md` | API-specific test/lint commands and PR rules | Present on main (Stage 3) |
| | `SECURITY.md` | API security reporting pointer | Present on main (Stage 3; Private Vulnerability Reporting enabled) |
| | PR / Issue Templates | API change and test evidence templates | Present on main (Stage 3) |
| **`littlesteps-web`** | `README.md` | Web overview linking to canonical docs and rights notice | Aligned on main (Stage 3) |
| | `CONTRIBUTING.md` | Web-specific test/lint commands and PR rules | Present on main (Stage 3) |
| | `SECURITY.md` | Web security reporting pointer | Present on main (Stage 3; Private Vulnerability Reporting enabled) |
| | PR / Issue Templates | Web UI change and test evidence templates | Present on main (Stage 3) |
| **`littlesteps-mobile`** | All files | **Untouched** pending CC 207B fork | Preserved by scope; do not modify or audit for implementation changes in this workstream |

---

## 9. Phased Implementation Roadmap

Work is tracked on [Thesis-Titans LittleSteps Project #2](https://github.com/orgs/Thesis-Titans/projects/2) under [Docs Issue #8](https://github.com/Thesis-Titans/littlesteps-docs/issues/8):

1. **Stage 1 — Standards Baseline (Complete):** Established and merged canonical documentation standard (`docs/documentation-standards.md`, PR #9).
2. **Stage 2 — Contributor & Security Policies (Complete):** Drafted and merged canonical `CONTRIBUTING.md`, `SECURITY.md`, and `CODE_OF_CONDUCT.md` in `littlesteps-docs` (PR #10); enabled GitHub Private Vulnerability Reporting.
3. **Stage 3 — Repository Alignment & Templates (Complete):** Added PR and issue templates across active repositories; aligned READMEs and added repo-specific contributor/security guidance in `littlesteps-api` (PR #6) and `littlesteps-web` (PR #4).
4. **Stage 4 — Docs Quality CI (Complete):** Added automated relative-link, image-path, and issue-template frontmatter verification workflow in `littlesteps-docs` (PR #12); branch protection enabled with strict required status check (`verify`).
5. **Stage 5 — System-Wide Verification (Complete):** Verified cross-repository links, setup commands, branch protection, and consistency across Docs, API, and Web.
