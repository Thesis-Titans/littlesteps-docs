# Philippine Early-Childhood Content Provenance

Status: source candidates and statutory framework verified; item-level content catalog review in progress. This document is a sourcing, legal grounding, and review protocol. It is **not** an endorsement of any milestone as clinically or diagnostically validated.

---

## 1. Statutory & Policy Baseline

### Republic Act No. 12199 (ECCD System Act)
- **Statute Status:** Signed into law on May 8, 2025.
- **IRR Status:** Reported signed in August 2026, but the exact official gazette copy, publication date, and implementing text remain **unverified** and need confirmation before treating IRR details as final.
- **Repeal:** Explicitly repeals and replaces the earlier *Early Years Act of 2013* (Republic Act No. 10410).
- **Statutory Jurisdictional Split:**
  - **ECCD Council:** Mandated responsibility for Filipino children **below five (5) years of age** (0–59 months).
  - **Department of Education (DepEd):** Mandated responsibility for children in the formative basic education years from **five (5) to eight (8) years of age** (60–96 months, covering Kindergarten through Grade 2).

### Statutory Jurisdiction vs. Product Navigation Bands

Statutory age allocations and LittleSteps navigation categories are distinct:

- **Statutory jurisdiction** defines government agency mandate under RA 12199 (ECCD Council for <5 years; DepEd for 5–8 years).
- **LittleSteps navigation categories** are deliberate product-level groupings designed to help caregivers discover age-appropriate activities and record private observations. They are **not** official clinical developmental stages or legal categories.

| LittleSteps Product Category | Navigation Range | Statutory Authority | Primary Curriculum Reference |
| :--- | :---: | :--- | :--- |
| **Young Infants** | 0–5 months | ECCD Council | NELC — Learning Resource Package (LRP) 2 & 3 |
| **Older Infants** | 6–11 months | ECCD Council | NELC — Learning Resource Package (LRP) 2 & 3 |
| **Young Toddlers** | 12–23 months | ECCD Council | NELC — Learning Resource Package (LRP) 2 & 3 |
| **Older Toddlers** | 24–35 months | ECCD Council | NELC — Learning Resource Package (LRP) 2, 4, 8 |
| **Younger Preschoolers** | 36–47 months | ECCD Council | NELC — Learning Resource Package (LRP) 2, 4, 5 |
| **Older Preschoolers** | 48–59 months | ECCD Council | NELC — Learning Resource Package (LRP) 2, 4, 6, 7 |
| **Kindergarten Transition** | 60–71 months | DepEd | DepEd MATATAG Curriculum — Kindergarten Guide |

*(The 60–71 month band is a product UX bridge designed for children preparing for and entering Kindergarten; it draws from DepEd Kindergarten competencies rather than ECCD Council infant/toddler packages).*

---

## 2. Evidence-Backed Source Register

| Source Title | Issuing Organization | Target Age Band | Content Scope | Access & Permissions | Verification Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Republic Act No. 12199 & IRR** | Republic of the Philippines | 0–8 years | Policy context; interagency responsibilities; early childhood worker standards. | Public law / Official Gazette. Safe for policy reference. | **Statute verified** (May 8, 2025); **IRR unverified** (needs confirmation). |
| **National Early Learning Framework (NELF)** | ECCD Council | 0–4 years | Foundational principles, domains, and developmental expectations. | ECCD Council Policy Document. Free for conceptual reference. | **Verified** candidate framework. |
| **NELC — LRP 2 (Standards & Competencies)** | ECCD Council | 0–4 years | Standards, competencies, indicators, and domains for infant through pre-K. | Requires official copy request. **Unavailable for content authoring until full copy & reuse terms are confirmed.** | Titles confirmed from public overview; **complete package uninspected**. |
| **NELC — LRP 3 (Parent-Mentor Activity Calendar)** | ECCD Council | 0–23 months | Suggested home-based calendar of activities for infants and toddlers. | Requires official copy request. **Unavailable for content authoring until full copy & reuse terms are confirmed.** | Titles confirmed from public overview; **complete package uninspected**. |
| **NELC — LRP 5 & 6 (Pre-K1 & Pre-K2 Activities)** | ECCD Council | 36–59 months | Center and home routine activities for 3- and 4-year-olds. | Requires official copy request. **Unavailable for content authoring until full copy & reuse terms are confirmed.** | Titles confirmed from public overview; **complete package uninspected**. |
| **NELC — LRP 7 (Creative Resources, Songs & Rhymes)** | ECCD Council | 0–4 years | Action songs, poems, rhymes, and creative activities. | Requires individual copyright/public domain review. **Unavailable for content authoring until full copy & reuse terms are confirmed.** | Titles confirmed from public overview; **complete package uninspected**. |
| **DepEd MATATAG Kindergarten Curriculum Guide** | Department of Education (DepEd) | 5–6 years (60–71 mo) | Official kindergarten learning competencies and educational domains. | DepEd official portal. Exact edition, version date, and educational reuse terms must be documented before adapting content. | **Portal accessible**; specific guide edition & reuse terms **unverified (needs confirmation)**. |
| **Philippine Early Childhood Development (ECD) Checklist** | ECCD Council | 0–59 months | Professional assessment checklist used by Child Development Workers. | **Strictly non-diagnostic.** Do NOT reproduce scoring or convert to parent-facing screening tool. | **Restricted professional tool**; observation prompts only. |
| **CDC Milestone Checklists** | US CDC | 0–5 years | Educational references for milestone prompts. | Public domain educational material. Must NOT be presented as a validated Philippine instrument. | **Educational reference only**. |

---

## 3. Strict Non-Diagnostic Boundaries

1. **No Diagnostic Scoring:** LittleSteps is an educational planning, reflection, and observation tool. It must never calculate a developmental score, "pass/fail" rating, or risk assessment.
2. **Assessment Tool Isolation:** The Philippine ECD Checklist is designed for trained Child Development Teachers/Workers. It must not be adapted into an automated clinical diagnosis, developmental delay calculator, or screening engine in the application.
3. **Observation Language:** Prompts must use observational and descriptive phrasing (e.g., *"Noticed whether child reaches for objects"* rather than *"Passed / Failed"*).
4. **Advisory Disclaimer:** Every milestone and activity view must clearly display:
   > *"LittleSteps is an educational support tool for caregivers and is not a medical, clinical, screening, or diagnostic instrument. For developmental questions or concerns, consult a licensed pediatrician or healthcare professional."*

---

## 4. Per-Item Provenance Record Schema

Before any activity, milestone observation prompt, story, or rhyme is entered into the production database or content catalog, it must have a completed provenance record:

```yaml
item_id: "act-infant-001"
title: "Tummy Time Gentle Tracking"
item_type: "activity" # observation_prompt | activity | story_rhyme | caregiver_guidance
intended_age_band: "Young Infants (0–5 months)"
source:
  title: "National Early Learning Curriculum — Learning Resource Package No. 3"
  organization: "ECCD Council"
  url: "https://eccdcouncil.gov.ph/resources/"
  edition_date: "unverified / needs confirmation"
  exact_locator: "Section X, Activity Prompt Y, Page Z"
relationship_to_source: "adapted" # direct_link | adapted | original_informed_by_source
adaptation_notes: "Paraphrased caregiver guidance for home environment; removed center-based terminology."
language: "en-PH / fil"
safety_accessibility_notes: "Requires adult supervision at all times; avoid soft surfaces."
review:
  reviewer_name: "TBD — Early Childhood Specialist"
  reviewer_role: "Subject-Matter Adviser"
  review_date: "YYYY-MM-DD"
  review_status: "draft" # draft | source_checked | subject_matter_reviewed | approved
limitations: "Educational prompt only; not a clinical milestone."
```

---

## 5. Definition of Done & Gating for Catalog Authoring

This evidence gate ([Docs Issue #3](https://github.com/Thesis-Titans/littlesteps-docs/issues/3)) establishes that:

1. **Current Legal Baseline Established:** RA 12199 (repealing RA 10410) is verified as the governing statute (signed May 8, 2025); the IRR status remains unverified pending official gazette confirmation.
2. **Jurisdictional Boundaries Distinct:** ECCD Council covers <5 years; DepEd covers 5–8 years. LittleSteps product navigation categories are recognized as separate UX groupings.
3. **Curriculum Resource Packages Explicitly Gated:** All ECCD Council LRPs and DepEd MATATAG materials are marked **unavailable for content authoring** until complete document copies, exact editions, and reuse permissions are obtained and verified.
4. **No Premature Catalog Population:** No production catalog records will be authored without a corresponding verified per-item provenance record and subject-matter reviewer sign-off.