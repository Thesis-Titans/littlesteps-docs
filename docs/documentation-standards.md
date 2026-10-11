# LittleSteps Documentation Standards & Repository Consistency

Status: Stage 1 standards baseline established and merged in PR #9. This document defines the canonical documentation standards, repository information architecture, file baselines, and audit checklist across the LittleSteps multi-repository project. Stages 2–5 remain in progress or pending as tracked in the roadmap below.

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

## 3. Information Architecture (Diátaxis Framework)

Documentation in `littlesteps-docs` aligns with the Diátaxis documentation framework, organizing information into four distinct reader needs:

| Type | Reader's Question | Focus | LittleSteps Document |
| :--- | :--- | :--- | :--- |
| **Tutorial** | *"Help me get started from scratch."* | Learning-oriented step-by-step guidance | [Developer onboarding guide](getting-started.md) |
| **How-To Guide** | *"How do I complete a specific operational task?"* | Task-oriented problem solving | [Development workflow](development-workflow.md) |
| **Reference** | *"What is the exact technical contract or specification?"* | Information-oriented technical facts | [OpenAPI contract in the API repository](https://github.com/Thesis-Titans/littlesteps-api/blob/main/openapi/openapi.yaml), environment variables, and provenance schemas |
| **Explanation** | *"Why is the system designed this way?"* | Understanding-oriented rationale and context | [Product scope](product-scope.md), [architecture decisions](architecture-decisions.md), [security, privacy, and AI guardrails](security-privacy-ai.md), [Philippine content provenance](philippine-content-provenance.md) |

These are intended destinations in the documentation architecture, not a claim that every listed document or contract is complete or production-ready. Each linked resource's current status must be checked before relying on it.

---

## 4. Policy Baselines

### 4.1 Intended Rights Policy: All Rights Reserved (Academic Evaluation Only)

- **Project intent:** The project owner intends to reserve copyright and not grant a general open-source license for reuse, modification, redistribution, or commercial use.
- **Public visibility:** Repositories are public for thesis/capstone evaluation, faculty review, and demonstration. Public visibility is not an access restriction: people may be able to view, fork, or otherwise interact with public repositories under GitHub's platform features and terms.
- **Notice limitations:** The phrase **“All Rights Reserved (Academic Evaluation Only)”** communicates project intent, but this document and a README notice are not a substitute for a reviewed license instrument or legal advice. Do not describe the academic-only purpose as a technical restriction on who can view the public repositories.
- **Before finalizing:** Have the exact copyright/license notice and intended restrictions reviewed by the faculty adviser or an appropriate legal resource. Until that review, do not add an open-source license such as MIT, Apache-2.0, or GPL, and do not claim the notice has been legally reviewed.
- **Data boundary:** Real child and caregiver personal data, production credentials, and restricted curriculum packages must not be committed to public repositories.

### 4.2 Multi-Repository Community Health File Placement

- **Location:** Maintain community health files as **explicit files within each active repository** (`littlesteps-docs`, `littlesteps-api`, and `littlesteps-web`).
- **Rationale:** An organization-level `Thesis-Titans/.github` repository is intentionally **not used** so that default templates and policies do not inadvertently apply to `littlesteps-mobile`.

---

## 5. Standard File Baseline Specification

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

## 6. Repository-by-Repository Audit Checklist

The table records the observed baseline at the time of this Stage 1 draft and the target state. Items marked pending are not yet implemented as part of this workstream; re-check each repository during the relevant stage before marking anything complete.

| Repository | Component | Target State | Current Baseline Status |
| :--- | :--- | :--- | :--- |
| **`littlesteps-docs`** | `README.md` | Front door indexing canonical documentation, community policies, and rights notice | Present on main; includes index and community links |
| | `CONTRIBUTING.md` | Canonical contributor guidelines | Present on this PR branch (Stage 2) |
| | `SECURITY.md` | Public vulnerability reporting guide | Present on this PR branch (Stage 2) |
| | `CODE_OF_CONDUCT.md` | Standard academic contributor conduct | Present on this PR branch (Stage 2) |
| | PR / Issue Templates | Structured review and issue templates | Pending (Stage 3) |
| | Docs CI | Automated Markdown and link validation | Pending (Stage 4) |
| **`littlesteps-api`** | `README.md` | API overview linking to canonical docs and rights notice | Present on the current default branch; alignment pending |
| | `CONTRIBUTING.md` | API-specific test/lint commands and PR rules | Pending (Stage 3) |
| | `SECURITY.md` | API security reporting pointer | Pending (Stage 3) |
| | PR / Issue Templates | API change and test evidence templates | Pending (Stage 3) |
| **`littlesteps-web`** | `README.md` | Web overview linking to canonical docs and rights notice | Present on the current default branch; alignment pending |
| | `CONTRIBUTING.md` | Web-specific test/lint commands and PR rules | Pending (Stage 3) |
| | `SECURITY.md` | Web security reporting pointer | Pending (Stage 3) |
| | PR / Issue Templates | Web UI change and test evidence templates | Pending (Stage 3) |
| **`littlesteps-mobile`** | All files | **Untouched** pending CC 207B fork | Preserved by scope; do not modify or audit for implementation changes in this workstream |

---

## 7. Phased Implementation Roadmap

Work is tracked on [Thesis-Titans LittleSteps Project #2](https://github.com/orgs/Thesis-Titans/projects/2) under [Docs Issue #8](https://github.com/Thesis-Titans/littlesteps-docs/issues/8):

1. **Stage 1 — Standards Baseline (Complete):** Established and merged canonical documentation standard (`docs/documentation-standards.md`, PR #9).
2. **Stage 2 — Contributor & Security Policies (Current):** Draft canonical `CONTRIBUTING.md`, `SECURITY.md`, and `CODE_OF_CONDUCT.md` in `littlesteps-docs`.
3. **Stage 3 — Repository Alignment & Templates:** Align READMEs in `littlesteps-api` and `littlesteps-web` with canonical links and the rights notice after its wording has been reviewed; add PR and issue templates across active repositories.
4. **Stage 4 — Docs Quality CI:** Add automated Markdown formatting and link verification workflow in `littlesteps-docs`.
5. **Stage 5 — System-Wide Verification:** Verify cross-repository links, setup commands, and consistency before closing Issue #8.
