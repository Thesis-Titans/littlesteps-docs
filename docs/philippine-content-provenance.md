# Philippine Early-Childhood Content Provenance

Status: source candidates and statutory framework verified; item-level content catalog review in progress. This document is a sourcing, legal grounding, and review protocol. It is **not** an endorsement of any milestone as clinically or diagnostically validated.

---

## 1. Statutory & Policy Baseline

### Republic Act No. 12199 (ECCD System Act)
- **Status:** Signed into law on May 8, 2025; Implementing Rules and Regulations (IRR) signed on August 5, 2026.
- **Repeal:** Explicitly repeals and replaces the earlier *Early Years Act of 2013* (Republic Act No. 10410).
- **Statutory Jurisdictional Split:**
  - **ECCD Council:** Mandated responsibility for Filipino children **below five (5) years of age** (0–59 months).
  - **Department of Education (DepEd):** Mandated responsibility for children in the formative basic education years from **five (5) to eight (8) years of age** (60–96 months, covering Kindergarten through Grade 2).

### Mapping to LittleSteps Navigation Bands

| LittleSteps Product Category | Age Band | Statutory Authority | Primary Curriculum Reference |
| :--- | :---: | :--- | :--- |
| **Young Infants** | 0–5 months | ECCD Council | NELC — Learning Resource Package (LRP) 2 & 3 |
| **Older Infants** | 6–11 months | ECCD Council | NELC — Learning Resource Package (LRP) 2 & 3 |
| **Young Toddlers** | 12–23 months | ECCD Council | NELC — Learning Resource Package (LRP) 2 & 3 |
| **Older Toddlers** | 24–35 months | ECCD Council | NELC — Learning Resource Package (LRP) 2, 4, 8 |
| **Younger Preschoolers** | 36–47 months | ECCD Council | NELC — Learning Resource Package (LRP) 2, 4, 5 |
| **Older Preschoolers** | 48–59 months | ECCD Council | NELC — Learning Resource Package (LRP) 2, 4, 6, 7 |
| **Kindergarten Transition** | 60–71 months | DepEd | DepEd MATATAG Curriculum — Kindergarten Guide |

*(Note: Product age bands are application navigation categories designed for age-appropriate activity discovery, not official clinical developmental stages).*

---

## 2. Evidence-Backed Source Register

| Source Title | Issuing Organization | Target Age Band | Content Scope | Access & Permissions | Verification Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Republic Act No. 12199 & IRR** | Republic of the Philippines | 0–8 years | Policy context; interagency responsibilities; early childhood worker standards. | Public law / Official Gazette. Safe for policy reference. | **Verified** (Signed May 2025; IRR Aug 2026). |
| **National Early Learning Framework (NELF)** | ECCD Council | 0–4 years | Foundational principles, domains, and developmental expectations. | ECCD Council Policy Document. Free for conceptual reference. | **Verified** candidate framework. |
| **National Early Learning Curriculum (NELC) — LRP 2** | ECCD Council | 0–4 years | Standards, competencies, indicators, and domains for infant through pre-K. | ECCD Council resource. Requires official copy request; cite/adapt only. | **Pending document copy** from ECCD Council. |
| **NELC — LRP 3 (Parent-Mentor Activity Calendar)** | ECCD Council | 0–23 months | Suggested home-based calendar of activities for infants and toddlers. | ECCD Council resource. Informs caregiver daily activity planning; cite/adapt with attribution. | **Pending document copy** from ECCD Council. |
| **NELC — LRP 5 & LRP 6 (Pre-K1 & Pre-K2 Activities)** | ECCD Council | 36–59 months | Center and home routine activities for 3- and 4-year-olds. | ECCD Council resource. Requires official copy request; cite/adapt only. | **Pending document copy** from ECCD Council. |
| **NELC — LRP 7 (Creative Resources, Songs & Rhymes)** | ECCD Council | 0–4 years | Filipino action songs, poems, rhymes, and creative learning activities. | Informs Feature 4 (Library). Sourced works require individual copyright/public domain review. | **Pending document copy** from ECCD Council. |
| **DepEd MATATAG Kindergarten Curriculum Guide** | Department of Education (DepEd) | 5–6 years (60–71 mo) | Official kindergarten learning competencies and educational domains. | DepEd official curriculum portal. Open for educational adaptation with attribution. | **Verified portal**; exact guide edition confirmed. |
| **Philippine Early Childhood Development (ECD) Checklist** | ECCD Council | 0–59 months | Professional assessment checklist used by Child Development Workers. | **Strictly non-diagnostic.** Do NOT reproduce scoring or convert to parent-facing screening tool. | **Restricted tool**; observation prompts only. |
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
  edition_date: "2024 / current verified"
  exact_locator: "Section 2, Activity Prompt 4, Page 18"
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

1. **Current Legal Baseline Established:** RA 12199 (repealing RA 10410) is verified as the governing statutory framework.
2. **Jurisdictional Allocations Grounded:** ECCD Council covers 0–59 months; DepEd covers 60–71 months.
3. **Curriculum Resource Packages Identified:** NELC LRPs 1–8 and DepEd MATATAG Kindergarten are cataloged.
4. **Content Permission Rules Enforced:** Official copy request procedures and attribution rules are documented.
5. **No Premature Catalog Population:** No production catalog records will be authored without a corresponding verified per-item provenance record and subject-matter reviewer sign-off.