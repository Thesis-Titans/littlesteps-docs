# LittleSteps Security, Privacy, and AI Safeguards

**Status:** Canonical Security & Non-Functional Requirements Baseline  
**Governing Standard:** ISO/IEC/IEEE 29148:2018 (Non-Functional Requirements) & RA 10173  
**Related Documents:** [Product Scope](product-scope.md), [Data Model Specification](data-model.md), [Traceability Matrix](traceability-matrix.md)

---

This document establishes the non-functional requirements (NFRs) and statutory security baselines for LittleSteps. It is an engineering specification, not legal advice or a formal declaration of regulatory compliance.

---

## 1. Statutory Context & Ethical Foundation

LittleSteps processes sensitive family and early-learning observations. System architecture and data management are designed to adhere to:
- **Republic Act No. 10173 (Data Privacy Act of 2012 / DPA):** Principles of transparency, legitimate purpose, proportionality, and strict data minimization.
- **Republic Act No. 12199 (Basic Education Mental Health and Well-Being Promotion Act):** Ensuring developmental and emotional well-being activities are non-stigmatizing, age-appropriate, and non-clinical.
- **CC 207B AI & Security Criteria (Items 12–17):** Strict academic constraints governing server-side AI execution, zero client credential exposure, deterministic fallbacks, and ethical code authorship.

---

## 2. Security Non-Functional Requirements (NFR-SEC)

### NFR-SEC-01: Token-Based Identity & Verification
- **Requirement:** All authenticated API requests must supply a valid Firebase ID token via the standard `Authorization: Bearer <token>` HTTP header over HTTPS.
- **Verification Rule:** The backend Node.js API verifies tokens using the Firebase Admin SDK. The trusted caller identity is derived strictly from the decoded cryptographic token `uid`. The system must never trust or accept a client-supplied user identifier in URL parameters or request bodies as the authenticated identity.

### NFR-SEC-02: Broken Object Level Authorization (BOLA) Defense
- **Requirement:** Every child-scoped operation (child profiles, activity history, milestone observations, journal entries, progress summaries) must execute server-side authorization checks prior to performing any database read, mutation, or deletion.
- **Verification Rule:** The API checks that `child.caregiverId === authenticatedUid`. Any attempt to access, modify, or delete a resource belonging to another caregiver must result in a safe `403 Forbidden` or `404 Not Found` response without leaking resource existence or metadata.
- **Firestore Direct Access Boundary:** Firebase Admin SDK calls within Cloud Functions bypass Firestore Security Rules. Authorization checks must be implemented in API application code, while restrictive Firestore Security Rules must be deployed to block unauthorized direct client-SDK database access.

### NFR-SEC-03: Zero Secret Exposure & Credential Isolation
- **Requirement:** No API keys, Firebase service-account private keys, database credentials, AI provider keys, or signing secrets may be committed to Git repositories or exposed in frontend client bundles.
- **Verification Rule:** Frontend web and mobile builds must contain zero service secrets. Server secrets must be injected exclusively via Cloud Functions environment variables / Secret Manager. Local development must use the Firebase Emulator Suite and synthetic mock providers.

### NFR-SEC-04: HTTP Security, CORS Allowlist & Information Protection
- **Requirement:** The API must implement a restrictive Cross-Origin Resource Sharing (CORS) allowlist matching only explicitly registered frontend origins (e.g., local development ports and verified staging domains). Wildcard origins (`*`) are strictly prohibited for authenticated endpoints.
- **Information Protection:** The API must strip stack traces, database schema details, and internal file paths from error responses. Standardized JSON error envelopes must return client-safe diagnostic codes and messages.

---

## 3. Privacy & Data Minimization Requirements (NFR-PRIV)

### NFR-PRIV-01: Proportionality & Data Minimization (RA 10173)
- **Requirement:** The system collects only the minimal data points necessary to deliver age-aware activity planning and milestone observation.
- **Specification:**
  - Avoid collecting exact birth dates; birth month and year (or coarse age band) are sufficient for milestone and activity navigation.
  - No biometric data, national ID numbers, or precise GPS coordinates are ever collected or stored.
  - A plain-language Privacy Notice must be presented to caregivers upon account registration, detailing data categories, processing purposes, retention periods, and deletion procedures.

### NFR-PRIV-02: Observation Journal Confidentiality & Isolation
- **Requirement:** Qualitative entries in the Private Observation Journal (FR-03) constitute private caregiver reflections and must be treated with maximum confidentiality.
- **Specification:**
  - Journal contents are strictly excluded from product analytics, telemetry, and error logging payloads.
  - Journal text is strictly prohibited from being passed into external AI prompts or shared across users.
  - Caregivers retain full data rights: edit, export, and hard deletion of journal entries must be supported.

### NFR-PRIV-03: Synthetic Data Policy for Evaluation & Testing
- **Requirement:** To completely eliminate accidental exposure of real children's data during academic evaluation, testing, and demonstrations, LittleSteps enforces an explicit synthetic data policy.
- **Specification:**
  - All test fixtures, automated integration tests, emulator seed data, and live demonstration accounts must use fictitious child profiles and synthetic caregiver names.
  - Live testing with real children's personal data is prohibited without documented institutional review and explicit parental consent.

---

## 4. Artificial Intelligence Safeguards & Governance (NFR-AI)

To satisfy the **CC 207B AI-Powered Feature Requirement (Items 12–17)**, the AI Activity Suggestion Helper (FR-06) operates under strict architectural and ethical constraints:

### NFR-AI-01: Relevance & Problem Fit (Item 13)
- **Caregiver Need:** Caregivers often have limited time, diverse home settings, and arbitrary materials on hand (e.g., "recycled boxes, plastic cups, spoons").
- **Technical Rationale:** Keyword matching fails when processing unstructured natural-language descriptions of household materials. The semantic helper matches caregiver constraints to eligible activity IDs from the reviewed catalog without rigid query rules.

### NFR-AI-02: Server-Side Execution & Credential Isolation (Item 14)
- **Execution Boundary:** All AI model invocations (Gemini API / Firebase Vertex AI) execute exclusively server-side inside Cloud Functions.
- **Data Minimization in Prompts:** Prompts contain only sanitized constraint keywords: coarse age band, duration, environment, and materials list. Zero child names, caregiver IDs, locations, or journal texts are ever included in prompts.

### NFR-AI-03: Graceful Degradation & Deterministic Fallback (Item 15)
- **Latency & Timeout:** AI calls are constrained to an 8-second execution timeout. Frontends render loading skeletons and progress indicators during inference.
- **Deterministic Fallback:** If the external AI service times out, experiences rate limiting, returns an invalid schema, or the client is operating offline, the backend immediately executes a deterministic rule-based catalog filter. The caregiver receives valid activities from the catalog without service interruption or application errors.

### NFR-AI-04: Ethical Transparency, Labeling & Non-Diagnostic Boundary (Item 16)
- **Visual Labeling:** Every AI-generated suggestion must display an explicit AI badge and disclaimer: *"AI Suggestion — Always adapt to your child and ensure adult supervision."*
- **Caregiver Autonomy:** Caregivers can reject, regenerate, customize, or manually replace any suggestion.
- **Non-Diagnostic Rule:** The AI prompt system instructions strictly prohibit medical diagnosis, clinical developmental delay scoring, or pediatric treatment recommendations.

### NFR-AI-05: Team Authorship & Code Defense Governance (Item 17)
- Using generative AI to write the application wholesale without comprehension is prohibited.
- AI-assisted development tools (e.g., IDE copilots for boilerplate or testing) must be recorded in the team's internal **AI Usage Log**.
- Every team member must personally understand and be prepared to explain and modify their codebase contributions during the **CC 207B Individual Code Defense**.

---

## 5. Reliability, Performance & Rate Limiting (NFR-REL)

### NFR-REL-01: Performance & Operational Limits
- **API Response Latency:** Standard CRUD operations (profiles, activities, journal, summaries) must respond within 500ms under local emulator conditions.
- **Rate & Cost Limiting:** AI suggestion endpoints must enforce per-caregiver rate limits (e.g., maximum 10 requests per hour) to prevent API quota exhaustion and denial-of-wallet attacks.
- **Payload Constraints:** Request body parsers enforce a 100KB payload limit to prevent memory exhaustion attacks.

---

## 6. Pre-Deployment Release Gate

Prior to cloud production deployment, the team must complete and sign off on the following verification checklist:
1. Firebase project billing account active with budget alerts configured ($\le \$5.00$ threshold).
2. Production Firestore Security Rules deployed and verified against unauthorized client SDK read/writes.
3. CORS origin allowlist restricted to verified production web domain.
4. Privacy notice and data retention/deletion flows verified.
5. AI provider terms confirmed to ensure zero data retention for training on submitted prompt tokens.
6. Local emulator test suite passes 100% of integration and security unit tests.
