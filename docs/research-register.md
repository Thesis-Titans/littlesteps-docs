# Research Register

Reviewed for the initial architecture baseline on 2026-10-11. Recheck official documentation before deployment because service behavior and pricing can change.

| Topic | Source | How it informs LittleSteps |
|---|---|---|
| Firebase ID-token verification | https://firebase.google.com/docs/auth/admin/verify-id-tokens | The API verifies client-issued ID tokens server-side and derives the trusted UID from the verified token. |
| Firebase HTTP functions and Express | https://firebase.google.com/docs/functions/http-events | An Express app can be hosted as an HTTP function; handlers should terminate correctly. |
| Firebase pricing plans | https://firebase.google.com/docs/projects/billing/firebase-pricing-plans | Review the actual plan and billing requirements before deployment; do not assume cloud deployment has the same billing profile as local emulator work. |
| OWASP REST Security Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html | Use explicit CORS origins, allowlisted methods, request limits, input validation, safe errors, and rate limits. |
| OWASP Input Validation Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html | Validate syntax and semantics on the server, including fields, lengths, ranges, and nested structures. Authorization is a separate check. |
| Philippine Data Privacy Act IRR (NPC) | https://privacy.gov.ph/implementing-rules-regulations-data-privacy-act-2012/ | Review transparency, declared purpose, data minimization, recipients, retention, rights, and automated-processing disclosures with the responsible privacy/legal adviser. |

## Evidence limits and follow-up
- These sources inform engineering design; they do not establish legal compliance.
- Confirm applicable ECCD Council and DepEd source documents for each content item and maintain item-level citations.
- Confirm current Firebase pricing/billing in the actual project before deployment.
- Review provider terms and data-processing practices before enabling external AI.
- Do not describe CDC milestone checklists as a validated local screening tool.
