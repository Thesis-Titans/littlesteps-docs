# Security, Privacy, and AI Safeguards

This is an engineering baseline, not legal advice or a declaration of compliance.

## Child and caregiver data
- Collect only data necessary for an explicit feature purpose.
- Publish a plain-language privacy notice before collecting personal data. Identify purposes, data categories, recipients/processors, retention, user rights, contact point, and automated processing as applicable.
- Have the responsible school/team authority review lawful basis, caregiver authority/consent flow, data-subject rights, retention schedule, deletion/export process, and vendor/data-transfer implications under Philippine law.
- Keep private journal content out of analytics, error logs, and AI prompts.
- Avoid collecting exact birth dates if a coarser age band is sufficient.
- Never commit credentials, Firebase service-account keys, AI keys, access tokens, or secrets; do not place secrets in frontend environment variables.
- Use synthetic child data in development and demos unless a reviewed, documented basis permits otherwise.

## Authentication and access control
- Accept Firebase ID tokens only over HTTPS outside local development.
- Verify tokens with Firebase Admin SDK and derive the trusted identity from the verified UID.
- Never trust a client-supplied UID as the authenticated identity.
- For every child, journal, activity history, or summary resource, confirm the verified user is authorized for that child before reading or writing.
- Apply a consistent non-revealing 403/404 policy for unauthorized resources.
- Admin SDK calls bypass Firestore Security Rules; enforce access checks in API code and write restrictive rules for any client-direct access.
- Apply least privilege to service accounts and limit callable endpoints and HTTP methods.

## HTTP/API controls
- Configure an explicit CORS origin allowlist; do not use wildcard origins for authenticated data.
- Limit JSON request size and validate shape, types, allowed fields, ranges, and semantic constraints server-side.
- Use a consistent error envelope and avoid exposing stack traces or sensitive values.
- Add rate and abuse/cost limits before enabling AI calls or other expensive operations.
- Do not log request bodies by default. Log request IDs and minimal operational metadata.
- Configure security headers and appropriate cache policy for private responses.
- Add dependency updates and automated tests; only require CI checks after they exist and their check names are verified.

## AI Activity Suggestion Helper (CC 207B Compliance: Items 12–17)

To satisfy the **CC 207B AI-Powered Feature Requirement**, the helper is designed as a user-facing recommendation capability with strict ethical, architectural, and statutory boundaries:

1. **Relevance & Problem Fit (Item 13):**
   - **Real Need:** Caregivers struggle to find structured offline activities that fit their immediate time constraints, child age, language preference, and specific household items on hand.
   - **Why AI Beats Ordinary Logic:** Combinatorial rule engines require rigid tag matches that fail when caregivers have unusual household materials (e.g., "cardboard box, yarn, plastic spoons"). The AI helper semantically matches caregiver constraints to eligible items from the reviewed catalog without rigid query brittleness.
2. **Security & Credential Isolation (Item 14):**
   - AI model credentials (e.g., Gemini API keys / Firebase Vertex AI) are strictly kept server-side in Firebase Cloud Functions.
   - Zero API keys, secrets, or cloud tokens are ever committed to Git or exposed in client bundles (`.env` files are git-ignored; emulator workflows use synthetic mocks).
3. **Graceful Failure & Deterministic Fallback (Item 15):**
   - Frontends display explicit loading skeletons and timers during AI inference.
   - Strict 8-second timeouts and provider error handlers prevent hanging requests.
   - **Deterministic Fallback:** If the external AI service times out, errors, or is unreachable offline, the system automatically falls back to deterministic age-band catalog filtering, ensuring caregivers are never stranded without activities.
4. **Responsible Use & RA 10173 Compliance (Item 16):**
   - **Clear Labeling:** All suggested activities are visually labeled with an AI badge and disclaimer: *"AI Suggestion — Always adapt to your child and ensure adult supervision."*
   - **Caregiver Override:** Caregivers can freely reject, re-generate, edit, or override any recommendation.
   - **Data Minimization:** Under the Data Privacy Act of 2012 (RA 10173), no child names, exact birth dates, locations, or private journal entries are ever sent to an external AI provider. Prompts include only coarse age bands, duration, and material keywords.
   - **Non-Diagnostic Constraint:** The AI is strictly prohibited from diagnosing developmental delays, providing medical advice, or generating pass/fail scores.
5. **AI Use Policy for Project Development (Item 17):**
   - Using AI to write the whole application wholesale is strictly prohibited.
   - Any AI-assisted code snippets, debugging suggestions, or synthetic test fixtures must be logged in the project's **AI Usage Log**.
   - Every team member must personally understand and be able to defend their code during the **Individual Code Defense**.
6. **Synthetic Data Team Policy:**
   - While RA 10173 governs real personal data, the LittleSteps team enforces a proactive **team policy** to use exclusively synthetic child/caregiver profiles in all demos, test fixtures, and presentations to completely eliminate accidental data disclosure risks.

## Pre-deployment gate
Do not deploy until the team has reviewed the Firebase project and billing plan, budget alerts, required APIs, environment configuration, CORS origins, authentication, ownership tests, Firestore rules/indexes, privacy notice and retention/deletion policy, AI provider data terms, and rollback steps.
