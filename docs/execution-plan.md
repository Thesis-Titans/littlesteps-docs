# LittleSteps Execution Plan

**Status:** Canonical Delivery Baseline & Work Breakdown Structure  
**Governing Standard:** PMBOK 7th Edition / ISO 21500 & Agile Scrum Baseline  
**Related Documents:** [Product Scope](product-scope.md), [Traceability Matrix](traceability-matrix.md), [Academic Deliverables](academic/README.md)

---

This plan defines the proposed delivery sequence for LittleSteps across three coordinated courses. Milestones describe intended outcomes; they do not indicate completion unless linked evidence confirms the exit criteria.
- **CC 207B — Applications Development and Emerging Technologies:** Flutter mobile application with 6 core features, user-facing AI, live demo, and individual code defense.
- **CIT 210 — Web Systems and Technologies:** React web client using shared API & database, local demo, and documentation.
- **CIT 246 — IT Project Management Plan:** 25–40 page Project Management Plan governing the entire system, with Checkpoint 1 due October 14, 2026 and final defense on December 2, 2026.

Canonical product requirements remain in [Product Scope](product-scope.md), architecture decisions in [Architecture Decisions](architecture-decisions.md), security requirements in [Security, Privacy, and AI Safeguards](security-privacy-ai.md), and the client/server contract in the API repository's [OpenAPI specification](https://github.com/Thesis-Titans/littlesteps-api/blob/main/openapi/openapi.yaml).

## 1. Academic Calendar & Delivery Approach

### 1.1 Hard Academic Deadlines
- **October 14, 2026:** **CIT 246 Checkpoint 1** (One-page project concept covering Organization, Problem, Proposed System, and Possible Sponsor; A4, Arial 11). Documented in [CIT 246 Checkpoint 1 Concept](academic/cit246/checkpoint-1-concept.md).
- **December 2, 2026:** **Final Submission & Demonstrations for All Three Courses:**
  - **CC 207B:** LMS submission, 5–10 min presentation, live demo + backup video, and **Individual Code Defense** (2–3 min/member with live code modification).
  - **CIT 210:** Presentation, local live demo of React app reading/writing shared data, and shared documentation.
  - **CIT 246:** Final 25–40 page IT Project Management Plan (PDF + printed copy), 15 min presentation + 5 min Q&A.

### 1.2 Delivery Approach
Use **lightweight Scrum with a visible GitHub issue backlog**. Avoid fixed sprint dates until the group confirms availability and capacity.

- **Product scope:** The six features in Product Scope remain the target scope. This plan orders delivery; it does not silently remove features.
- **Initial execution focus:** API and Web. Keep the API contract client-neutral so the Mobile client can integrate later. `littlesteps-flutter` is no longer restricted.
- **Iteration length:** Propose one-week sprints after backlog refinement and capacity confirmation. Do not assign dates or people yet.
- **Planning unit:** Small, independently reviewable issues with a clear outcome, acceptance criteria, dependencies, and verification steps. Split issues further only when implementation details are known.
- **Review:** Every change goes through a pull request. At least one teammate must review each PR (graded in CC 207B collaboration criteria). API/Web checks must pass; security and privacy acceptance criteria apply to child-scoped features.
- **No speculative implementation:** Resolve product/data-contract questions before coding dependent features. Use synthetic fixtures for engineering work when reviewed catalog content is unavailable.

## 2. Product Target & Team Sizing Derivation

Under CC 207B requirements, the minimum number of core features scales with team size: **5 members require at least 6 core features** ($5 \rightarrow 6$), where the AI-powered feature counts as one core feature. A core feature must be a user-facing flow taking input, performing processing/state change, and producing a meaningful result (auth, splash, About, and Settings do not count).

The six core capabilities (formally specified in [Product Scope](product-scope.md)) are:

1. **FR-01: Child Profile and Milestone Tracking** (Caregiver input $\rightarrow$ profile persistence $\rightarrow$ observation display).
2. **FR-02: Daily Activity Planning and Tracking** (Activity selection $\rightarrow$ scheduling/completion state $\rightarrow$ calendar/timeline update).
3. **FR-03: Private Observation Journal** (Encrypted note input $\rightarrow$ secure storage $\rightarrow$ chronological journal display).
4. **FR-04: Story, Rhyme, and Learning Activity Library** (Search/filter criteria $\rightarrow$ catalog query $\rightarrow$ filtered learning resource view).
5. **FR-05: Weekly Progress Summary** (Activity/milestone records $\rightarrow$ non-diagnostic aggregation $\rightarrow$ weekly reflection report).
6. **FR-06: AI Activity Suggestion Helper** (Caregiver constraints $\rightarrow$ constrained catalog match $\rightarrow$ recommended activities with fallback).

Deliver these in dependency order, not as six parallel projects.

## 3. Milestones and exit criteria

### M0 — Project execution readiness
**Scope Traceability:** Governs preparation and validation for all six features (**FR-01** to **FR-06**) and baseline security/privacy policies.

**Outcome:** One agreed scope, an ordered backlog, a usable board, and clear acceptance rules.

Exit criteria:
- The documentation-standardization work is reconciled; stale governance tasks are closed only after their actual acceptance criteria are met.
- The product backlog is separated from repository-maintenance work.
- Each execution issue has acceptance criteria, dependencies, and a verification approach.
- No tasks are assigned until the team has reviewed the backlog and confirmed capacity.
- The OpenAPI contract and product-scope documents are identified as the requirements sources of truth.
- A navigable Figma prototype covering all six product capabilities (**FR-01** to **FR-06**) has been reviewed; findings and scope decisions are recorded.
- API/Web feature implementation remains gated until prototype review, contract dependencies, and M0 exit criteria are complete.

**Prototype-first gate:** Before feature implementation, create and review a navigable **Figma** prototype covering desktop (1280px) and mobile-browser (375px) views. Because the prototype is built in Figma rather than code, React development starts only after the prototype is approved. Follow the [UI/UX design specification](ui-ux-design-specification.md) and use synthetic data and simulated services. AI-assisted tooling is optional and does not replace design review or usability validation. Include key empty, loading, error, permission-denied, and deterministic AI fallback states, making privacy and non-diagnostic boundaries visible. Track this work in [Docs Issue #15](https://github.com/Thesis-Titans/littlesteps-docs/issues/15). The prototype is a validation artifact, not a substitute for API contract design or implementation tests.

### M1 — Secure end-to-end foundation
**Scope Traceability:** Implements foundation for **FR-01** (Child Profile); enforces **NFR-SEC-01** (Token auth), **NFR-SEC-02** (BOLA defense), and **NFR-PRIV-01** (Data minimization).

**Outcome:** A signed-in caregiver can use the Web client to work with a child profile through the shared API and local Firebase emulators.

Planned work:
- Agree on the minimum caregiver/child data model, ownership relationship, validation rules, and deletion/retention questions.
- Extend the OpenAPI contract before implementing new endpoints.
- Implement and test child-scoped API operations with server-side ownership checks (**NFR-SEC-02**).
- Integrate Web sign-in, token handling, API error/loading states, and protected routes.
- Verify the end-to-end path with synthetic users/data using the emulator-first workflow.

Exit criteria:
- Requests without valid authentication are rejected (**NFR-SEC-01**).
- A caregiver cannot read or mutate another caregiver's child data, including by changing an identifier (**NFR-SEC-02**).
- Input validation and safe error responses are tested (**NFR-SEC-04**).
- API contract, implementation, and Web client agree.
- Relevant API and Web CI checks pass.

### M2 — Reviewed learning content and core activity loop
**Scope Traceability:** Implements **FR-02** (Activity Planning), **FR-04** (Learning Library), and observation prompts for **FR-01**; enforces **NFR-PRIV-03** (Synthetic fixtures).

**Outcome:** A caregiver can discover eligible content and plan/record activities.

Planned work:
- Define catalog item fields, age-band filtering, content lifecycle/status, and source metadata.
- Implement catalog read/list behavior and Web browsing/filtering (**FR-04**).
- Implement activity planning, scheduling/recording, and completion history (**FR-02**).
- Add milestone observation prompts (**FR-01**) only when the source and review gate permits their use.
- Cover empty, loading, error, invalid-input, and authorization states.

Exit criteria:
- API responses follow the OpenAPI contract.
- Content is age-filtered and shows source/limitations where applicable.
- No unreviewed or invented catalog items are presented as approved.
- Child-scoped activity records enforce ownership (**NFR-SEC-02**).
- Unit and emulator integration tests cover the principal success and failure paths.

**Content gate:** [Docs Issue #3](https://github.com/Thesis-Titans/littlesteps-docs/issues/3) remains a separate dependency for real Philippine milestone/activity content. Engineering can use clearly labelled synthetic fixtures, but must not treat those fixtures as reviewed production content.

### M3 — Private journal and weekly reflection
**Scope Traceability:** Implements **FR-03** (Private Journal) and **FR-05** (Weekly Progress Summary); enforces **NFR-PRIV-02** (Journal confidentiality & AI isolation).

**Outcome:** Caregivers can keep private observations and review a factual summary of recorded activity.

Planned work:
- Define journal privacy and retention/deletion behavior before exposing the feature (**NFR-PRIV-02**).
- Implement private journal create/read/update/delete behavior with ownership tests (**FR-03**).
- Define the summary calculation from recorded events before designing summary UI (**FR-05**).
- Implement weekly summaries that describe recorded activity without diagnostic scores or unsupported developmental conclusions.

Exit criteria:
- Unauthorized journal access is tested and denied (**NFR-SEC-02**).
- Private notes are excluded from logs and external AI prompts (**NFR-PRIV-02**).
- Summary calculations are deterministic and covered by tests.
- UI handles no-data and partial-data periods clearly.

### M4 — Constrained AI activity suggestions
**Scope Traceability:** Implements **FR-06** (AI Activity Suggestion Helper); enforces **NFR-AI-01** (Relevance), **NFR-AI-02** (Server credential isolation), **NFR-AI-03** (Deterministic fallback), **NFR-AI-04** (Visual labeling & non-diagnostic rule), and **NFR-REL-01** (Rate limits).

**Outcome:** Optional suggestions can be generated from approved catalog entries without sending unnecessary child data.

Planned work:
- Agree on the suggestion input/output schema and allowed catalog identifiers.
- Define provider selection, data handling, timeout (8s), rate/cost limits, and configuration.
- Validate every result against the schema and approved catalog.
- Provide a deterministic fallback for provider errors or invalid responses.
- Add tests for prompt-data minimization, invalid outputs, provider failures, and rate limits.

Exit criteria:
- Suggestions only reference approved catalog IDs.
- No direct child identifiers or private journal entries are sent to the provider (**NFR-PRIV-01**, **NFR-PRIV-02**).
- Failure paths fall back safely to deterministic catalog matching and are observable without logging sensitive content.
- Provider terms, billing, and data processing are reviewed before activation.

### M5 — Release-readiness review
**Scope Traceability:** Full cross-cutting verification of **FR-01** through **FR-06**, all **NFRs**, and coordinated deliverables for CC 207B, CIT 210, and CIT 246.

**Outcome:** The team can demonstrate a coherent, tested API/Web release without claiming production readiness prematurely.

Exit criteria:
- Cross-feature authorization and regression tests pass across all six core features.
- Keyboard access, responsive behavior, and common error states are checked.
- Privacy notice, retention/deletion approach, and appropriate faculty/course instructor review are addressed.
- Firebase billing, budget alerts, environment configuration, provider settings, and rollback are reviewed before any deployment.
- Known limitations are documented and accepted by the team and course instructor.

## 4. Backlog structure

Use epics/work packages to group work. Create implementation issues only after the relevant acceptance criteria and dependencies are clear.

| Work package | Main deliverables | Traceability (Standards & Scope) | Depends on |
|---|---|---|---|
| **WP-0: Execution readiness** | Reconciled governance work, agreed backlog and board conventions | PMBOK Scope Baseline, M0 | Existing documentation PRs/issues |
| **WP-0.5: Prototype and journey validation** | Navigable Figma prototype, reviewed caregiver journeys, documented findings | ISO 9241, FR-01–FR-06 validation | Product scope, architecture, privacy; M0 |
| **WP-1: Shared contract and data model** | API schema, ownership model, validation/error conventions | IEEE 1016 Interface View, NFR-SEC-02 | M0 and prototype review |
| **WP-2: Authenticated child-profile slice** | API endpoints, ownership tests, Web auth/profile flow, emulator | FR-01, PRQ-01, NFR-SEC-01, NFR-PRIV-01 | WP-1 |
| **WP-3: Learning catalog** | Catalog schema/API and Web discovery | FR-04, Philippine content provenance | Content metadata decision; Issue #3 |
| **WP-4: Activity planning and observations** | Planning, completion history, safe observation records | FR-02, FR-01 milestones | WP-2, WP-3 |
| **WP-5: Private journal** | Private notes and retention/deletion behavior | FR-03, NFR-PRIV-02 | WP-2, privacy decisions |
| **WP-6: Weekly summary** | Defined summary rules, API output, Web presentation | FR-05 (deterministic aggregation) | WP-4; journal data only if approved |
| **WP-7: AI helper** | Catalog-grounded suggestions, validation, fallback, cost controls | FR-06, NFR-AI-01..05, NFR-REL-01 | WP-3, WP-4, privacy/provider review |
| **WP-8: Release readiness** | Cross-feature regression, accessibility, security/deployment gates | All FR-01–FR-06, all NFRs, Course Deliverables | Relevant feature work |

The work packages are a planning hierarchy, not a commitment to implement all work in a single sprint. Keep the first implementation slice small: WP-1 and WP-2 establish a secure vertical path before broad feature work.

## 5. Issue quality and team workflow

Every implementation issue should contain:
- **User or engineering outcome:** what becomes possible or safer.
- **Scope:** what is included and explicitly excluded.
- **Acceptance criteria:** observable, testable outcomes.
- **Dependencies:** linked blocking issues or decisions.
- **Verification:** exact tests or manual checks expected.
- **Security/privacy notes:** especially for child-scoped or private data.
- **Definition of done:** implementation, tests, contract/docs updates, and review.

### Definition of Ready

An issue is ready for sprint planning only when its goal is clear, dependencies are identified, acceptance criteria are testable, and the team can estimate it without guessing about unresolved product decisions.

### Definition of Done

An issue is done only when the acceptance criteria are met, relevant automated checks pass, the API contract and documentation are updated when behavior changes, security/privacy paths are tested where applicable, and the reviewed PR is merged. A green build alone does not mean the feature is complete.

## 6. Board and monitoring

Use one cross-repository board for Docs, API, and Web execution work. Keep governance/documentation maintenance separate from the product backlog after the related work is accepted.

Recommended columns:
- **Backlog** — captured but not ready for a sprint.
- **Ready** — refined, dependencies known, acceptance criteria agreed.
- **In progress** — actively being worked on.
- **Blocked** — cannot progress; blocker and next action must be recorded.
- **In review** — pull request opened and verification underway.
- **Done** — merged and acceptance criteria verified.

Monitor these at each weekly review:
- work completed against the sprint goal;
- work carried over and why;
- blocked issues and age of blockers;
- failed checks/reopened issues;
- scope changes and their impact on the next milestone.

Keep work in progress small. Do not start dependent feature work while a key contract or security decision is unresolved. Do not treat issue count or lines of code as progress; use working, tested vertical outcomes.

## 7. Current constraints and open decisions

- **Content provenance:** Issue #3 remains open until source editions, exact locators, reuse terms, and appropriate review are confirmed. This blocks approval of real catalog content, not unrelated scaffold work.
- **Data model and privacy lifecycle:** Agree on caregiver-child ownership, required profile fields, deletion behavior, and retention before implementing persistent child/journal records.
- **Authentication:** Firebase token verification exists in the API scaffold, but Web sign-in and child-level authorization are not complete.
- **Deployment:** Local emulator work comes first. Deployment is gated on billing, privacy, security, and configuration review.
- **Mobile:** The restriction on `littlesteps-flutter` has been lifted, but when Flutter work starts is not yet decided. Preserve a shared, client-neutral API contract for its integration.
- **Schedule and assignments:** No dates, sprint commitments, or assignees are set by this plan. Confirm team availability and review the refined backlog first.

## 8. Project setup cleanup and execution handoff

### Completed repository-governance work

- [Docs Issue #8](https://github.com/Thesis-Titans/littlesteps-docs/issues/8) is closed after the five governance stages and cross-repository audit were recorded as complete.
- [Docs PR #12](https://github.com/Thesis-Titans/littlesteps-docs/pull/12) added the scoped documentation CI verifier and is merged.
- [Docs PR #6](https://github.com/Thesis-Titans/littlesteps-docs/pull/6) established the content-provenance protocol and is merged.
- [Web Issue #12](https://github.com/Thesis-Titans/littlesteps-react/issues/12) is closed after correcting the emulator region in the Web README.
- [Docs Issue #3](https://github.com/Thesis-Titans/littlesteps-docs/issues/3) remains open intentionally as the evidence, reuse-rights, and subject-matter review gate for real content. It is not a general repository-setup issue.

### Remaining M0 work — do not start feature implementation yet

- Review and approve or revise this execution plan before treating it as the delivery baseline.
- Configure and verify the shared GitHub Project board, including cross-repository issue visibility and the agreed workflow fields/statuses.
- Plan, create, and review the navigable Figma prototype tracked in [Docs Issue #15](https://github.com/Thesis-Titans/littlesteps-docs/issues/15); do not start API/Web feature implementation until prototype review findings are recorded.
- Create native GitHub milestones aligned with the agreed milestone outcomes and associate execution issues with them.
- Review all API/Web backlog issues against the Definition of Ready, add explicit blocking links where supported, and ensure each issue has testable acceptance criteria and verification steps.
- Verify that project-management setup work is separated from product-delivery work on the board.
- Confirm team availability and capacity before creating sprint dates or assigning people.

The coordination tracker is [Docs Issue #14](https://github.com/Thesis-Titans/littlesteps-docs/issues/14). Keep it open until the remaining M0 work above is verified. The issue should then be closed with evidence and product execution can begin through normal backlog refinement and sprint planning.

Do not claim the board or native milestones are configured until they are visible and verified in GitHub. If the connected tooling cannot create or edit these Project features, record that as a tooling blocker and complete the setup through an authorized Projects-capable interface rather than treating the proposed workflow as already operational.

## 9. Change control

This plan is a proposed delivery baseline. Changes to product scope, acceptance criteria, or milestone order should be discussed in backlog refinement and recorded through an issue/PR. Do not add features, external services, or architectural complexity without a stated user need and acceptance criterion.
