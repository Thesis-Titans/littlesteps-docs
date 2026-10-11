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

## AI Activity Suggestion Helper
- Ground recommendations in reviewed catalog entries and return catalog IDs, not invented activity records.
- Use age band, interests, time, materials, and language only as needed.
- Do not include names, birth dates, private journal text, or direct identifiers in provider prompts.
- Do not diagnose, screen, rank children, or provide medical advice.
- Validate output against a strict schema and allowlisted catalog IDs.
- Provide a deterministic catalog-based fallback for provider failures or invalid output.
- Set timeouts, request limits, rate limits, usage monitoring, and budget alerts.
- Keep provider keys server-side. Review provider terms, data processing, and retention before activation.
- Make clear suggestions are optional and must be adapted and supervised by an adult.

## Pre-deployment gate
Do not deploy until the team has reviewed the Firebase project and billing plan, budget alerts, required APIs, environment configuration, CORS origins, authentication, ownership tests, Firestore rules/indexes, privacy notice and retention/deletion policy, AI provider data terms, and rollback steps.
