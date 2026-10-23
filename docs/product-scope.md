# LittleSteps Product Scope

**Status:** Canonical System Scope Baseline  
**Governing Standard:** ISO/IEC/IEEE 29148:2018 (Software Requirements Specification)  
**Related Documents:** [Data Model Specification](data-model.md), [Security, Privacy, and AI Safeguards](security-privacy-ai.md), [Traceability Matrix](traceability-matrix.md)

---

## 1. System Purpose & Concept

LittleSteps is a proposed early-childhood learning and development platform for parents and caregivers supporting children aged 0–5 years (0–71 months). The planned system covers age-aware activity discovery, routine planning, milestone observation prompts, a private observation journal, factual summaries of recorded activity, and an AI-assisted activity recommendation helper.

> [!IMPORTANT]
> **Clinical Non-Diagnostic Boundary:** LittleSteps is explicitly an educational, reflective, and routine-support tool. It is **not** a clinical diagnostic, pediatric screening, medical treatment, or emergency-care system. All milestone and developmental information serves as prompts for caregiver observation, not diagnostic criteria.

---

## 2. System Scope Boundaries

The table below defines the planned system scope. Inclusion does not mean a capability has been implemented or verified.

| System Domain | In Scope (Planned or Required) | Out of Scope |
| :--- | :--- | :--- |
| **User Roles** | Single authenticated caregiver role (parent/guardian managing one or more child profiles). | Multi-tenant school/daycare administration, teacher-student rosters, public social profiles. |
| **Developmental Guidance** | Educational milestone observation prompts sourced from DepEd ECCD / CDC milestones with clear attributions. | Automated clinical diagnoses, developmental quotient (DQ) scores, developmental delay categorizations. |
| **Activity Catalog** | Curated Philippine rhymes, stories, motor, cognitive, and sensory activities spanning 7 age bands. | E-commerce purchasing of toys/materials, paid content paywalls, external ad networks. |
| **Messaging & Social** | Private caregiver observation journal strictly isolated per user account. | In-app direct messaging, public forums, community comment threads, photo sharing with other users. |
| **AI Integration** | Server-side semantic activity recommender constrained strictly to the reviewed catalog with deterministic fallback. | Unconstrained generative text models diagnosing symptoms, conversational AI roleplaying as a pediatrician. |
| **Hardware & Sensors** | Standard responsive web browsers and mobile application touch interfaces. | Wearable biometric monitors, IoT camera streaming, automated video behavioral tracking. |

---

## 3. User Characteristics & Operating Context

The intended users are parents, legal guardians, and home caregivers of children aged 0–5 years. The characteristics below are design considerations to validate, not established claims about all caregivers:

- **Physical Multitasking:** Caregivers frequently operate devices one-handed while holding a child or managing household chores. The interface requires natural thumb-zone placement and large touch targets ($\ge$ 48px for frequent controls, never below 44px).
- **Divided Attention & Cognitive Load:** Use short, scannable instructions and avoid clinical jargon or guilt-inducing streaks. The assumed time available for an activity has not been validated with intended users.
- **Connectivity:** Intermittent connectivity and data costs are design considerations. The system should favor lightweight content and define offline behavior; the prevalence of these constraints among intended users remains to be validated.
- **Shared Devices:** Shared-device use is a risk to consider. Authentication, session handling, and protection against accidental edits require usability and security validation.

---

## 4. Intended Age Bands

The application organizes activities and milestone prompts across seven navigation categories spanning 0–71 months:

| App Category | Age Range | Target Focus | Sourcing Guidance |
| :--- | :---: | :--- | :--- |
| **Young Infants** | 0–5 months | Sensory bonding, tummy time, visual tracking | ECCD / Early pediatric guidelines |
| **Older Infants** | 6–11 months | Sitting, grasping, babbling, object permanence | ECCD Council Milestones |
| **Young Toddlers** | 12–23 months | First steps, vocabulary explosion, exploratory play | ECCD / DepEd Early Learning Guidelines |
| **Older Toddlers** | 24–35 months | Gross motor control, parallel play, two-word phrases | ECCD Council Milestones |
| **Younger Preschoolers** | 36–47 months | Interactive play, fine motor skills, simple counting | DepEd Kindergarten Curriculum / ECCD |
| **Older Preschoolers** | 48–59 months | Social cooperation, storytelling, pre-writing | DepEd Kindergarten Curriculum Framework |
| **Kindergarten Transition** | 60–71 months | School readiness, structured routines, early literacy | DepEd Kindergarten Curriculum & RA 12199 |

*Note: These categories are organizational navigation bands, not clinical developmental stages.*

---

## 5. General Assumptions & System Constraints

- **Non-Diagnostic Assumption:** Caregivers use the platform for home routine support and observational prompts; the system assumes caregivers understand it does not replace pediatric consultations.
- **Emulator-First Constraint:** Engineering and test execution utilize the local Firebase Emulator Suite (`demo-littlesteps`); production deployment remains gated on billing, security, and institutional privacy reviews.
- **Shared Architecture Constraint:** A single unified Node.js Express API and Firestore schema must serve both React web (CIT 210) and Flutter mobile (CC 207B) frontends without divergent security rules.
- **Prototype Validation Constraint:** Figma frames of the responsive web layout (1280px desktop, 375px mobile browser) are used for prototype validation (Docs Issue #15); `littlesteps-react` implements them after approval.
- **Content Provenance Constraint:** Production deployment of real Philippine rhymes, traditional games, and milestone prompts remains gated on verified source locators and permissions review (Docs Issue #3). Synthetic fixtures are used for development.

---

## 6. Cross-Cutting System Prerequisites

The following capabilities are mandatory architectural prerequisites supporting the entire application, but under CC 207B course rules they are cross-cutting infrastructure rather than standalone core features:

- **PRQ-01: Caregiver Authentication & Account Management** — Secure sign-up, sign-in, and session management via Firebase Authentication (email/password).
- **PRQ-02: Responsive Shell & Navigation** — Five-tab bottom navigation (Mobile) and persistent sidebar/header (Web) adhering to ergonomic standards and touch targets ($\ge$ 48px for frequent controls, never below 44px).
- **PRQ-03: System Configuration & Informational Views** — Application settings, privacy policy notices, offline cache controls, and about views.

---

## 7. Functional Requirements Specification (Core Features)

Per CC 207B requirements, a 5-member team must deliver at least 6 core features ($5 \rightarrow 6$). Each core feature is an interactive workflow that accepts input, modifies state, and produces an observable output across both Web (React) and Mobile (Flutter) clients using the shared API:

### FR-01: Child Profile and Milestone Tracking
- **Primary Actor:** Caregiver
- **Preconditions:** Caregiver is securely authenticated.
- **Inputs:** Child name, nickname, birth month/year (or age band), caregiver observations against milestone checklist items (observed / not yet observed, date observed, notes).
- **Processing:** Server validates child ownership and payload; persists profile and milestone observation records in Cloud Firestore scoped to caregiver UID.
- **Outputs:** Structured child profile view, categorized milestone checklist by developmental domain (Cognitive, Motor, Language, Socio-Emotional), and longitudinal observation timeline.
- **Verification Method:** Unit tests for schema validation; API integration tests verifying caregiver isolation (BOLA defense); E2E test of profile creation and milestone check-off.

### FR-02: Daily Activity Planning and Tracking
- **Primary Actor:** Caregiver
- **Preconditions:** Caregiver has at least one active child profile.
- **Inputs:** Target activity identifier, scheduled date/time slot, completion status toggle, engagement notes, duration spent.
- **Processing:** Updates child-scoped daily routine schedule state; marks activities complete; records completion timestamps and caregiver feedback.
- **Outputs:** Interactive daily schedule view, progress checklist, visual completion badges, and active daily routine feed. When the optional weather hint is on, Today suggests indoor ideas if rain or strong heat is likely ([ADR-009](architecture-decisions.md)).
- **Verification Method:** API route tests for CRUD on schedule items; Web/Mobile state management tests for schedule toggle and local optimistic updates.

### FR-03: Private Observation Journal
- **Primary Actor:** Caregiver
- **Preconditions:** Caregiver is securely authenticated.
- **Inputs:** Narrative text notes, date/time, optional associated milestone tag or activity link, privacy confirmation.
- **Processing:** The server validates ownership and stores journal entries with access controls. The implementation must prevent journal text from entering analytics, error logs, or external AI requests; verify this with tests and payload/log inspection.
- **Outputs:** Chronological reverse-ordered personal journal feed with search and date filters; full text view; edit/delete controls. Search covers only the caregiver's own entries and does not use a search index (see [Data Model](data-model.md) §2.5).
- **Verification Method:** Automated API tests confirming non-leakage to AI endpoints; authorization tests verifying cross-user access denial (403/404).

### FR-04: Story, Rhyme, and Learning Activity Library
- **Primary Actor:** Caregiver
- **Preconditions:** None for viewing public reviewed catalog; authenticated to save/schedule.
- **Inputs:** Age-band filter (0–71 mos), domain filter (Cognitive, Motor, Language, Socio-Emotional), language filter (English, Filipino, Regional), required materials keyword search.
- **Processing:** Query engine executes multi-factor filtering against reviewed catalog dataset; sorts by developmental relevance and material availability.
- **Outputs:** Rich learning resource cards displaying activity title, source provenance attribution, age band, duration, instructions, materials list, and "Add to Daily Routine" action.
- **Verification Method:** Integration tests verifying catalog search and filter criteria; validation that all returned items contain required provenance metadata.

### FR-05: Weekly Progress Summary
- **Primary Actor:** Caregiver
- **Preconditions:** At least 1 recorded activity or milestone observation within the selected 7-day calendar window.
- **Inputs:** Child profile selector, target calendar week selector.
- **Processing:** Deterministic aggregation engine calculates completed activities, domain coverage distribution, and recorded milestone observations over the 7-day period. Strictly prohibits clinical scoring, percentile generation, or diagnostic labeling.
- **Outputs:** Formatted weekly reflection dashboard showing activity counts by domain, celebrated milestones, reflection prompts, and empty/low-data guidance cards.
- **Verification Method:** Deterministic unit tests comparing known activity logs against calculated summary statistics; tests ensuring absence of diagnostic phraseology.

### FR-06: AI Activity Suggestion Helper
- **Primary Actor:** Caregiver
- **Preconditions:** Caregiver authenticated; selected child profile with age band; network connectivity (or fallback triggered).
- **Inputs:** Available materials on hand (e.g., "paper, spoons, cardboard box"), available time (e.g., "15 minutes"), environment (indoor/outdoor, preselected from the optional weather hint when it is on), language preference.
- **Processing:** Server-side Firebase Cloud Function invokes the AI recommender (Gemini API, [ADR-008](architecture-decisions.md)) with strict data minimization (no child PII or journal text); model matches constraints to valid reviewed catalog IDs; server validates response against catalog schema; if AI fails or times out (8s), server executes deterministic rule-based catalog fallback.
- **Outputs:** Tailored activity suggestion card clearly stamped with AI badge and disclaimer: *"AI Suggestion — Always adapt to your child and ensure adult supervision,"* with one-click "Add to Routine" and "Generate Another" actions.
- **Verification Method:** Unit tests for schema validation of AI outputs; timeout tests verifying deterministic fallback triggers reliably on provider error.

---

## 8. Milestone-Content & Provenance Rules

1. **Source Attribution:** Every milestone item and library activity must display clear source attribution (e.g., ECCD Council Philippine Early Learning Standards, CDC Milestone Checklists).
2. **Prompts Not Tests:** Milestones must be presented as prompts for parent-child engagement and caregiver observation, never as pass/fail tests.
3. **Non-Diagnostic Language:** UI copy and system summaries must avoid diagnostic assertions (e.g., avoiding "delayed," "abnormal," or "behind schedule"; using "not yet observed" or "continue exploring").
4. **Cultural Relevance:** Philippine rhymes, traditional games (e.g., *Bahay-Bahayan*, *Bulong-Pari*, fine-motor songs), and localized materials must be prioritized in catalog curation.

---

## 9. Quality & Acceptance Criteria

- **Security & Identity:** All child-scoped data access requires valid Firebase ID token verification; identity is derived exclusively from the server-verified UID.
- **Ownership Enforcement (BOLA Defense):** Every database mutation and read verifies that the target child profile belongs to the authenticated caregiver UID.
- **Server-Side Validation:** All inputs (strings, dates, enum values, array bounds) are validated server-side via declarative schema validators.
- **Information Protection:** Error responses return standardized error envelopes without stack traces, database schemas, or raw tokens.
- **CORS Allowlist:** API endpoints restrict CORS headers to explicitly authorized web frontend origins.
- **Automated Verification:** All core API paths and business logic must have passing automated test suites prior to release tagging.
