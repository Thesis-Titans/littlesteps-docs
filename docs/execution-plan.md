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
- **Execution order:** API first. Each milestone (M1–M4) delivers its feature through the shared API, then through the React web client (CIT 210) and the Flutter mobile client (CC 207B) together. Keep the API contract client-neutral so both clients use the same endpoints and error shapes. See §1.3 for the Flutter track.
- **Iteration length:** Propose one-week sprints after backlog refinement and capacity confirmation. Do not assign dates or people yet.
- **Planning unit:** Small, independently reviewable issues with a clear outcome, acceptance criteria, dependencies, and verification steps. Split issues further only when implementation details are known.
- **Review:** Every change goes through a pull request. At least one teammate must review each PR (graded in CC 207B collaboration criteria). API, Web and Flutter checks must pass; security and privacy acceptance criteria apply to child-scoped features.
- **No speculative implementation:** Resolve product/data-contract questions before coding dependent features. Use synthetic fixtures for engineering work when reviewed catalog content is unavailable.

### 1.3 Flutter track (CC 207B)

CC 207B grades a Flutter application built on the same API and data as the web client. Its rules shape how the whole team works:

- **Everyone writes Flutter.** CC 207B requires meaningful commits from all five members and a 2–3 minute individual code defense with a live edit. Every member therefore owns at least one Flutter feature slice end to end (screen, state, API calls, validation and tests) in addition to API or React work.
- **Repository:** Flutter work happens in `Thesis-Titans/littlesteps-flutter` for now. If the course instructor provides a repository to fork, move the work there by pushing the full Git history (all branches and tags), never by copying files, so each member's commits survive. Pull-request reviews do not move with Git history, so ask the instructor early whether reviews in `littlesteps-flutter` count, or start using the course repository as soon as it exists.
- **Platform:** Android phones (the [architecture](architecture-decisions.md) targets Dart on Android, and the personas use Android). Flutter stable channel with Material 3.
- **Design source:** the reviewed 375px mobile-web frames, adapted to Material 3 widgets as listed in the [UI/UX Design Specification](ui-ux-design-specification.md) §9. Flutter screens are not prototyped separately.
- **Course requirements mapped to the plan:**

| CC 207B requirement | Where it is met |
|---|---|
| Six core user-facing features (sign-in, splash, About and Settings do not count) | FR-01 to FR-06, delivered in M1–M4 |
| Async operations with visible loading, empty and error states | UI/UX spec §7 state matrix, built in every Flutter screen |
| At least one validated form with clear error feedback | Child profile form (J1), plus the observation and journal forms |
| Data persistence (local storage or Firebase) | The shared API and Firestore |
| User-facing AI feature with graceful failure and data minimization | FR-06 AI helper, M4 |
| Documentation package (stack versions, prototypes and screenshots, topic coverage matrix, AI feature specification, AI usage log, individual reflections) | Prepared during M5 |
| Forked repository, feature branches, teammate-reviewed pull requests | This section and §5 |

- **Repository setup still needed:** `littlesteps-flutter` has only a README. It needs a contributor guide, PR and issue templates, a CI check (`flutter analyze` and `flutter test`), and native milestones M1–M5. It is private, and branch protection on a private repository needs a paid GitHub plan, so either make it public like the other repositories or enforce teammate review by team agreement until it moves.

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

**Outcome:** A signed-in caregiver can use the Web and Flutter clients to work with a child profile through the shared API and local Firebase emulators.

Planned work:
- Agree on the minimum caregiver/child data model, ownership relationship, validation rules, and deletion/retention questions.
- Extend the OpenAPI contract before implementing new endpoints.
- Implement and test child-scoped API operations with server-side ownership checks (**NFR-SEC-02**).
- Integrate Web sign-in, token handling, API error/loading states, and protected routes.
- Set up the Flutter project (Android target, Material 3 theme from the design tokens, lint, tests and CI), then integrate Firebase sign-in, token handling and the shared API client with the same loading and error states.
- Build the child profile form in both clients with birth month and year pickers and field-level validation (CC 207B validated form).
- Verify the end-to-end path with synthetic users/data using the emulator-first workflow.

Exit criteria:
- Requests without valid authentication are rejected (**NFR-SEC-01**).
- A caregiver cannot read or mutate another caregiver's child data, including by changing an identifier (**NFR-SEC-02**).
- Input validation and safe error responses are tested (**NFR-SEC-04**).
- API contract, implementation, and the Web and Flutter clients agree.
- Relevant API, Web and Flutter CI checks pass.

### M2 — Reviewed learning content and core activity loop
**Scope Traceability:** Implements **FR-02** (Activity Planning), **FR-04** (Learning Library), and observation prompts for **FR-01**; enforces **NFR-PRIV-03** (Synthetic fixtures).

**Outcome:** A caregiver can discover eligible content and plan/record activities.

Planned work:
- Define catalog item fields, age-band filtering, content lifecycle/status, and source metadata.
- Implement catalog read/list behavior and Web and Flutter browsing/filtering (**FR-04**).
- Implement activity planning, scheduling/recording, and completion history in the API and both clients (**FR-02**).
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
- Build the journal and the "This week" summary in both clients.

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
- Build the AI helper in both clients with all of its states: form, loading, suggestion, rate-limited and fallback.

Exit criteria:
- Suggestions only reference approved catalog IDs.
- No direct child identifiers or private journal entries are sent to the provider (**NFR-PRIV-01**, **NFR-PRIV-02**).
- Failure paths fall back safely to deterministic catalog matching and are observable without logging sensitive content.
- Provider terms, billing, and data processing are reviewed before activation.

### M5 — Release-readiness review
**Scope Traceability:** Full cross-cutting verification of **FR-01** through **FR-06**, all **NFRs**, and coordinated deliverables for CC 207B, CIT 210, and CIT 246.

**Outcome:** The team can demonstrate a coherent, tested API, Web and Flutter release without claiming production readiness prematurely.

Exit criteria:
- Cross-feature authorization and regression tests pass across all six core features.
- Keyboard access, responsive behavior, and common error states are checked.
- Privacy notice, retention/deletion approach, and appropriate faculty/course instructor review are addressed.
- Firebase billing, budget alerts, environment configuration, provider settings, and rollback are reviewed before any deployment.
- Known limitations are documented and accepted by the team and course instructor.
- The Flutter app runs on an Android phone for the CC 207B live demo, with a recorded backup video, and each member can explain and modify their own Flutter code.
- If the instructor provided a course repository, the Flutter work has been moved there with its full commit history.

## 4. Backlog structure

Use epics/work packages to group work. Create implementation issues only after the relevant acceptance criteria and dependencies are clear.

| Work package | Main deliverables | Traceability (Standards & Scope) | Depends on |
|---|---|---|---|
| **WP-0: Execution readiness** | Reconciled governance work, agreed backlog and board conventions | PMBOK Scope Baseline, M0 | Existing documentation PRs/issues |
| **WP-0.5: Prototype and journey validation** | Navigable Figma prototype, reviewed caregiver journeys, documented findings | ISO 9241, FR-01–FR-06 validation | Product scope, architecture, privacy; M0 |
| **WP-1: Shared contract and data model** | API schema, ownership model, validation/error conventions | IEEE 1016 Interface View, NFR-SEC-02 | M0 and prototype review |
| **WP-F: Flutter foundation** | Flutter project and repository setup, Material 3 theme from the design tokens, shared API client, sign-in | CC 207B, PRQ-01–PRQ-03 | WP-1 |
| **WP-2: Authenticated child-profile slice** | API endpoints, ownership tests, Web and Flutter auth/profile flows, emulator | FR-01, PRQ-01, NFR-SEC-01, NFR-PRIV-01 | WP-1 |
| **WP-3: Learning catalog** | Catalog schema/API and Web and Flutter discovery | FR-04, Philippine content provenance | Content metadata decision; Issue #3 |
| **WP-4: Activity planning and observations** | Planning, completion history, safe observation records | FR-02, FR-01 milestones | WP-2, WP-3 |
| **WP-5: Private journal** | Private notes and retention/deletion behavior | FR-03, NFR-PRIV-02 | WP-2, privacy decisions |
| **WP-6: Weekly summary** | Defined summary rules, API output, Web and Flutter presentation | FR-05 (deterministic aggregation) | WP-4; journal data only if approved |
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
- **Mobile:** Flutter work follows the API milestone by milestone, alongside the Web client (§1.3). Open: whether the course instructor will provide a repository to fork, and whether reviews in `littlesteps-flutter` count toward CC 207B.
- **Schedule and assignments:** No dates, sprint commitments, or assignees are set by this plan. Confirm team availability and review the refined backlog first.

## 8. Project setup cleanup and execution handoff

### Completed repository-governance work

- [Docs Issue #8](https://github.com/Thesis-Titans/littlesteps-docs/issues/8) is closed after the five governance stages and cross-repository audit were recorded as complete.
- [Docs PR #12](https://github.com/Thesis-Titans/littlesteps-docs/pull/12) added the scoped documentation CI verifier and is merged.
- [Docs PR #6](https://github.com/Thesis-Titans/littlesteps-docs/pull/6) established the content-provenance protocol and is merged.
- [Web Issue #12](https://github.com/Thesis-Titans/littlesteps-react/issues/12) is closed after correcting the emulator region in the Web README.
- [Docs Issue #3](https://github.com/Thesis-Titans/littlesteps-docs/issues/3) remains open intentionally as the evidence, reuse-rights, and subject-matter review gate for real content. It is not a general repository-setup issue.

### M0 status — do not start feature implementation yet

Checked against GitHub on 23 October 2026.

**Done**

- **Execution plan:** reviewed and merged in [Docs PR #13](https://github.com/Thesis-Titans/littlesteps-docs/pull/13), then revised in Docs PRs #29–#32 (repository renames, the Flutter restriction lifted, the Figma prototype gate and the design system review).
- **Project board:** [Thesis-Titans LittleSteps Project #2](https://github.com/orgs/Thesis-Titans/projects/2) holds 30 items from `littlesteps-docs`, `littlesteps-api` and `littlesteps-react`, with a Status field of Backlog, Ready, In Progress, Blocked, In Review and Done.
- **Native milestones:** `littlesteps-docs` has M0–M5; `littlesteps-api` and `littlesteps-react` each have M1–M5, and their execution issues are assigned to them.

**In progress**

- **Figma prototype ([Docs Issue #15](https://github.com/Thesis-Titans/littlesteps-docs/issues/15)):** every screen and state frame is built. Still to do: update the Figma file to match the reviewed UI/UX specification, wire the prototype links, and run the walkthrough with recorded findings. Do not start API or Web feature implementation until those findings are recorded.

**Still open**

- **Flutter track:** planned in §1.3 and in each milestone. Next: create `littlesteps-flutter` milestones (M1–M5) and issues, set up the repository (contributor guide, templates, CI), and ask the course instructor about the fork and review rules.
- **Backlog readiness:** review all API and Web backlog issues against the Definition of Ready after the walkthrough, add blocking links where supported, and make sure each has testable acceptance criteria and verification steps. The Web issues predate the reviewed UI/UX specification and need updating to match it.
- **Board hygiene:** verify that project-management setup work is kept separate from product-delivery work on the board.
- **Team capacity:** confirm availability before creating sprint dates or assigning people.

The coordination tracker is [Docs Issue #14](https://github.com/Thesis-Titans/littlesteps-docs/issues/14). Keep it open until the open items above are verified, then close it with evidence and begin product execution through normal backlog refinement and sprint planning.

## 9. Change control

This plan is a proposed delivery baseline. Changes to product scope, acceptance criteria, or milestone order should be discussed in backlog refinement and recorded through an issue/PR. Do not add features, external services, or architectural complexity without a stated user need and acceptance criterion.
