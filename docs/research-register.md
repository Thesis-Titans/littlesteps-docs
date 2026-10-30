# LittleSteps Research Register

**Status:** Canonical Research Reference Baseline  
**Governing Standard:** PMBOK (Benchmarking) & ISO/IEC/IEEE 29148:2018  
**Owner:** Vincent (Backend & Research Lead)  
**Last Reviewed:** 2026-10-30  
**Related Documents:** [Philippine Content Provenance](philippine-content-provenance.md), [Security, Privacy, and AI Safeguards](security-privacy-ai.md)

---

Reviewed for the initial architecture baseline on 2026-10-11, with additional research entries incorporated on 2026-10-23, 2026-10-26, and 2026-10-29 (Docs Issue #3). Recheck official documentation before deployment because service behavior, legal interpretation, and pricing can change. Entries identify sources and intended use; they do not by themselves establish implementation or legal compliance.

| Topic | Source | How it informs LittleSteps |
|---|---|---|
| Firebase ID-token verification | https://firebase.google.com/docs/auth/admin/verify-id-tokens | The API verifies client-issued ID tokens server-side and derives the trusted UID from the verified token. |
| Firebase HTTP functions and Express | https://firebase.google.com/docs/functions/http-events | An Express app can be hosted as an HTTP function; handlers should terminate correctly. |
| Firebase pricing plans | https://firebase.google.com/docs/projects/billing/firebase-pricing-plans | Review the actual plan and billing requirements before deployment; do not assume cloud deployment has the same billing profile as local emulator work. |
| OWASP REST Security Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html | Use explicit CORS origins, allowlisted methods, request limits, input validation, safe errors, and rate limits. |
| OWASP Input Validation Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html | Validate syntax and semantics on the server, including fields, lengths, ranges, and nested structures. Authorization is a separate check. |
| Philippine Data Privacy Act IRR (NPC) | https://privacy.gov.ph/implementing-rules-regulations-data-privacy-act-2012/ | Review transparency, declared purpose, data minimization, recipients, retention, rights, and automated-processing disclosures with the responsible privacy/legal authority or course instructor. |
| ECCD Council resources — NELF, NELC, ECCD Checklist | https://eccdcouncil.gov.ph/resources/ | Official publications identified: National Early Learning Framework (NELF, 2010; Annex 4 age sections start at printed pp. 72, 78, 87 and 95) and National Early Learning Curriculum Learning Resource Packages (NELC LRP 3, PDF pp. 69–207 of the compiled file, where p. 69 is blank apart from the header and content starts at p. 70; the file's cover reads 2015; Governing Board Resolution No. 15-02, 10 September 2015). Locators were checked against local copies of the files on 2026-10-30; the page itself returned HTTP 403 to the checker, so it was not opened and no access date is recorded. Author-checked only; awaiting subject-matter adviser review. See [Philippine Content Provenance §5.1](philippine-content-provenance.md). |
| ECCD Council center-based standards | https://eccdcouncil.gov.ph/center-based-standards-guidelines/ | Candidate guidance for early-childhood programs serving ages 0–4; do not assume institutional standards validate caregiver-facing milestone claims. |
| DepEd Kindergarten curriculum overview | https://www.deped.gov.ph/k-to-12/about/k-to-12-basic-education-curriculum/kindergarten/ | Official access point for Kindergarten curriculum guidance relevant to educational activities; verify the exact current guide and version before adapting competencies. |
| DepEd MATATAG curriculum materials | https://www.deped.gov.ph/matatagcurriculumk147/ | Page opened 2026-10-30; lists the MATATAG Kindergarten guide as a download and cites only DM 54, s. 2023 (pilot implementation); it shows no DepEd Order number or edition year for the guide and no copyright notice for it. The 33-page file (created 30 August 2023 per its metadata) was author-checked for competencies 8 and 23 (PDF pp. 18–19) mapping to the 60–71 month transition category. |
| Republic Act No. 12199 — ECCD System Act of 2025 | https://lawphil.net/statutes/repacts/ra2025/ra_12199_2025.html | Primary statutory framework for the Philippine ECCD system, signed May 8, 2025, repealing RA 10410. Government sources (PIA, DepEd, ECCD Council) report the IRR was signed on August 5, 2026; full text, Official Gazette publication, and effectivity remain pending inspection. Allocates responsibilities: ECCD Council for ages below 5 (0–59 months) and DepEd for ages 5–8 (60–96 months, covering Kindergarten). Policy overview also on https://eccdcouncil.gov.ph/policy-documents/. |
| Iloilo City ECCD centers | https://www.iloilotoday.com/iloilo-city-programs-projects-for-ilonggo-children/ | Local news report (1 January 2026) that the city has more than 200 operating ECCD centers and is building more. Used for the CIT 246 business case; confirm the current count with the client. |
| CSWDO La Paz–Lapuz District office | https://www.govserv.org/PH/Iloilo-City/649162218285374/CSWDO-Lapaz-Lapuz-District | Directory listing of the district office's public page, which describes itself as the official page and shows training for child development workers and day care teachers. The CIT 246 client; confirm its address, head and supervised centers directly. |
| Iloilo City districts and barangays | https://en.wikipedia.org/wiki/Districts_of_Iloilo_City | Seven districts and 180 barangays; La Paz has 25 barangays (58,098 people in 2024) and Lapuz 12 (31,603). Context for the CIT 246 plan's network size. |
| Iloilo City population | https://www.citypopulation.de/en/philippines/iloilo/ | Third-party table citing PSA figures (473,728 for 2024). Not yet confirmed on a PSA page; verify before relying on it. |
| RA 12199 implementing rules | https://tribune.net.ph/2026/08/10/dilg-deped-set-nationwide-standards-for-early-childhood-care | News report on the IRR signed 5 August 2026: every province, city and municipality sets up an ECCD office; funding from local funds, the Special Education Fund and the Gender and Development Fund; DILG monitoring through the Seal of Good Local Governance. Read the IRR text itself before citing provisions. |
| Child development workforce | https://pids.gov.ph/details/news/in-the-news/phl-faces-shortage-of-33k-daycare-centers-study | PIDS study as reported: about 89,000 child development workers against an estimated need of 240,000; pay varies by LGU. Context for the CIT 246 business case. |
| Gemini API pricing, billing and terms | https://ai.google.dev/gemini-api/docs/billing | Free tier is used for the course with synthetic data only; Google may use free-tier prompts to improve its products, so prompts carry only non-identifying constraints. Recheck before M4 and the demonstration ([ADR-008](architecture-decisions.md)). |
| Open-Meteo terms and licence | https://open-meteo.com/en/terms | Free, keyless, non-commercial use under 10,000 calls a day; data under CC BY 4.0 with attribution. Basis for the optional weather hint ([ADR-009](architecture-decisions.md)). |

## Evidence limits and follow-up
- These sources inform engineering and content sourcing; they do not establish legal compliance or validate a developmental screening tool.
- Primary Philippine early-childhood sources (NELF 2010, NELC LRP 3, DepEd MATATAG Curriculum – Kindergarten) have been author-checked (`source_checked`, awaiting subject-matter adviser review; Docs Issue #3 stays open) and candidate records recorded in [the content provenance protocol](philippine-content-provenance.md).
- Before authoring catalog items in production, record each exact source title, issuing body, publication/version date, access date, exact page/section/competency, adaptation notes, and reviewer.
- Have an appropriate subject-matter specialist or course faculty review content before it is described as reviewed or approved.
- Confirm current Firebase pricing/billing in the actual project before deployment.
- Review provider terms and data-processing practices before enabling external AI.
- Do not describe CDC milestone checklists as a validated local screening tool, and independently verify specific graphics, checklists, and third-party asset permissions before reuse.
