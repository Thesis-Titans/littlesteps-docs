# LittleSteps Documentation Standards & Repository Consistency

Status: Stage 1 baseline proposal. This document defines the canonical documentation standards, repository information architecture, file baselines, and audit checklist across the LittleSteps multi-repository project.

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
| **Tutorial** | *"Help me get started from scratch."* | Learning-oriented step-by-step guidance | [`docs/getting-started.md`](getting-started.md) |
| **How-To Guide** | *"How do I complete a specific operational task?"* | Task-oriented problem solving | Branching and verification guides in [`docs/development-workflow.md`](development-workflow.md) |
| **Reference** | *"What is the exact technical contract or specification?"* | Information-oriented technical facts | OpenAPI contract (`openapi/openapi.yaml`), environment variables, provenance schemas |
| **Explanation** | *"Why is the system designed this way?"* | Understanding-oriented rationale and context | [`docs/product-scope.md`](product-scope.md), [`docs/architecture-decisions.md`](architecture-decisions.md), [`docs/security-privacy-ai.md`](security-privacy-ai.md), [`docs/philippine-content-provenance.md`](philippine-content-provenance.md) |

---

## 4. Policy Baselines

### 4.1 Licensing Standard: All Rights Reserved (Academic Evaluation Only)
- **Status:** Public visibility on GitHub is maintained to enable native branch protection and transparency for thesis/capstone evaluation.
- **Terms:** **All Rights Reserved**. No general open-source redistribution, commercial reuse, or public derivative licensing is granted.
- **Scope:** Public code and documentation are visible strictly for academic examination, faculty review, and demonstration purposes. Real child and caregiver personal data, production credentials, and restricted curriculum packages are strictly excluded.

### 4.2 Multi-Repository Community Health File Placement
- **Location:** Maintained as **explicit files within each active repository** (`littlesteps-docs`, `littlesteps-api`, and `littlesteps-web`).
- **Rationale:** An organization-level `Thesis-Titans/.github` repository is intentionally **not used** to ensure that default templates and policies do not inadvertently apply to `littlesteps-mobile`.

---

## 5. Standard File Baseline Specification

Each active repository must maintain a consistent set of root and `.github` files:

| File / Resource | Priority | Purpose & Required Content |
| :--- | :---: | :--- |
| **`README.md`** | **Required** | Project/repository front door: what it does, current implementation status vs. planned features, prerequisites, fast local commands, link to canonical docs in `littlesteps-docs`, and license notice. |
| **`CONTRIBUTING.md`** | **Required** | Contributor manual: branch naming, PR workflow, required local/CI verification, secret-handling rules, and Mark's review/approval boundary. |
| **`SECURITY.md`** | **Required** | Vulnerability reporting: realistic reporting channels, academic project context, and responsible disclosure instructions. |
| **`CODE_OF_CONDUCT.md`** | **Recommended** | Contributor expectations and academic community standards. |
| **`.github/PULL_REQUEST_TEMPLATE.md`** | **Required** | Structured PR submission template: change summary, linked issue, tests run, documentation updates, security/privacy impact, and checklist. |
| **`.github/ISSUE_TEMPLATE/`** | **Required** | Structured templates for bug reports and feature proposals. |
| **`docs/`** | **As needed** | Detailed technical guides, architecture specifications, and reference records (centralized in `littlesteps-docs`). |

---

## 6. Repository-by-Repository Audit Checklist

| Repository | Component | Target State | Current Baseline Status |
| :--- | :--- | :--- | :--- |
| **`littlesteps-docs`** | `README.md` | Front door indexing all canonical documentation | Present; needs index link to this standard |
| | `CONTRIBUTING.md` | Canonical contributor guidelines | Pending (Stage 2) |
| | `SECURITY.md` | Public vulnerability reporting guide | Pending (Stage 2) |
| | `CODE_OF_CONDUCT.md`| Standard academic contributor conduct | Pending (Stage 2) |
| | PR / Issue Templates| Structured review & issue templates | Pending (Stage 3) |
| | Docs CI | Automated Markdown and link validation | Pending (Stage 4) |
| **`littlesteps-api`** | `README.md` | API overview linking to canonical docs | Present; needs canonical doc links & license |
| | `CONTRIBUTING.md` | API-specific test/lint commands & PR rules | Pending (Stage 3) |
| | `SECURITY.md` | API security reporting pointer | Pending (Stage 3) |
| | PR / Issue Templates| API change & test evidence templates | Pending (Stage 3) |
| **`littlesteps-web`** | `README.md` | Web overview linking to canonical docs | Present; needs canonical doc links & license |
| | `CONTRIBUTING.md` | Web-specific test/lint commands & PR rules | Pending (Stage 3) |
| | `SECURITY.md` | Web security reporting pointer | Pending (Stage 3) |
| | PR / Issue Templates| Web UI change & test evidence templates | Pending (Stage 3) |
| **`littlesteps-mobile`** | *All Files* | **Untouched** pending CC 207B fork | Preserved (No modifications) |

---

## 7. Phased Implementation Roadmap

Work is tracked on [Thesis-Titans LittleSteps Project #2](https://github.com/orgs/Thesis-Titans/projects/2) under [Docs Issue #8](https://github.com/Thesis-Titans/littlesteps-docs/issues/8):

1. **Stage 1 — Standards Baseline (Current):** Establish and review this canonical documentation standard (`docs/documentation-standards.md`).
2. **Stage 2 — Contributor & Security Policies:** Draft canonical `CONTRIBUTING.md`, `SECURITY.md`, and `CODE_OF_CONDUCT.md` in `littlesteps-docs`.
3. **Stage 3 — Repository Alignment & Templates:** Align READMEs in `littlesteps-api` and `littlesteps-web` with canonical links and academic license notices; add PR and issue templates across active repositories.
4. **Stage 4 — Docs Quality CI:** Add automated Markdown formatting and link verification workflow in `littlesteps-docs`.
5. **Stage 5 — System-Wide Verification:** Verify all cross-repository links, setup commands, and consistency before closing Issue #8.
