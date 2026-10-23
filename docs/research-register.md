# LittleSteps Research Register

**Status:** Canonical Research Reference  
**Reference Basis:** Official statutory, regulatory, and technical sources listed in this register; source-specific claims require verification.  
**Related Documents:** [Philippine Content Provenance](philippine-content-provenance.md), [Security, Privacy, and AI Safeguards](security-privacy-ai.md)

---

Reviewed for the initial architecture baseline on 2026-10-11. Recheck official documentation before deployment because service behavior, legal interpretation, and pricing can change. Entries identify sources and intended use; they do not by themselves establish implementation or legal compliance.

| Topic | Source | How it informs LittleSteps |
|---|---|---|
| Firebase ID-token verification | https://firebase.google.com/docs/auth/admin/verify-id-tokens | The API verifies client-issued ID tokens server-side and derives the trusted UID from the verified token. |
| Firebase HTTP functions and Express | https://firebase.google.com/docs/functions/http-events | An Express app can be hosted as an HTTP function; handlers should terminate correctly. |
| Firebase pricing plans | https://firebase.google.com/docs/projects/billing/firebase-pricing-plans | Review the actual plan and billing requirements before deployment; do not assume cloud deployment has the same billing profile as local emulator work. |
| OWASP REST Security Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html | Use explicit CORS origins, allowlisted methods, request limits, input validation, safe errors, and rate limits. |
| OWASP Input Validation Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html | Validate syntax and semantics on the server, including fields, lengths, ranges, and nested structures. Authorization is a separate check. |
| Philippine Data Privacy Act IRR (NPC) | https://privacy.gov.ph/implementing-rules-regulations-data-privacy-act-2012/ | Review transparency, declared purpose, data minimization, recipients, retention, rights, and automated-processing disclosures with the responsible privacy/legal authority or course instructor. |
| ECCD Council resources — NELF, NELC, ECCD Checklist | https://eccdcouncil.gov.ph/resources/ | Official landing page lists candidate Philippine early-childhood framework, curriculum, and checklist materials. The exact document version, usage permissions, and relevance to each content item still require item-level review. Official framework available for reference, but reproduction, adaptation, and commercial-use conditions have not been independently verified; note Council distribution advisories. |
| ECCD Council center-based standards | https://eccdcouncil.gov.ph/center-based-standards-guidelines/ | Candidate guidance for early-childhood programs serving ages 0–4; do not assume institutional standards validate caregiver-facing milestone claims. |
| DepEd Kindergarten curriculum overview | https://www.deped.gov.ph/k-to-12/about/k-to-12-basic-education-curriculum/kindergarten/ | Official access point for Kindergarten curriculum guidance relevant to educational activities; verify the exact current guide and version before adapting competencies. |
| DepEd MATATAG curriculum materials | https://www.deped.gov.ph/matatagcurriculumk147/ | DepEd's curriculum page links a Kindergarten guide; use the exact version and competency locator when grounding learning activities. |
| Republic Act No. 12199 — ECCD System Act of 2025 | https://lawphil.net/statutes/repacts/ra2025/ra_12199_2025.html | Primary statutory framework for the Philippine ECCD system, signed May 8, 2025, repealing RA 10410. Government sources (PIA, DepEd, ECCD Council) report the IRR was signed on August 5, 2026; full text, Official Gazette publication, and effectivity remain pending inspection. Allocates responsibilities: ECCD Council for ages below 5 (0–59 months) and DepEd for ages 5–8 (60–96 months, covering Kindergarten). Policy overview also on https://eccdcouncil.gov.ph/policy-documents/. |
| Gemini API pricing, billing and terms | https://ai.google.dev/gemini-api/docs/billing | Free tier is used for the course with synthetic data only; Google may use free-tier prompts to improve its products, so prompts carry only non-identifying constraints. Recheck before M4 and the demonstration ([ADR-008](architecture-decisions.md)). |
| Open-Meteo terms and licence | https://open-meteo.com/en/terms | Free, keyless, non-commercial use under 10,000 calls a day; data under CC BY 4.0 with attribution. Basis for the optional weather hint ([ADR-009](architecture-decisions.md)). |

## Evidence limits and follow-up
- These sources inform engineering and content sourcing; they do not establish legal compliance or validate a developmental screening tool.
- Candidate Philippine early-childhood sources are recorded in [the content provenance protocol](philippine-content-provenance.md). Their inclusion is not a claim that exact PDFs, versions, permissions, or every relevant passage have been fully reviewed.
- Before authoring catalog items, record each exact source title, issuing body, publication/version date if stated, access date, exact page/section/competency, adaptation notes, and reviewer.
- Have an appropriate subject-matter specialist or course faculty review content before it is described as reviewed or approved.
- Confirm current Firebase pricing/billing in the actual project before deployment.
- Review provider terms and data-processing practices before enabling external AI.
- Do not describe CDC milestone checklists as a validated local screening tool, and independently verify specific graphics, checklists, and third-party asset permissions before reuse.
