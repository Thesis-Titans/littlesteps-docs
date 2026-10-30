# LittleSteps Philippine Content Provenance

**Status:** Canonical Content Sourcing Baseline  
**Governing Standard:** Republic Act No. 12199 (ECCD System Act) & RA 10173  
**Owner:** Vincent (Backend & Content Lead)  
**Last Reviewed:** 2026-10-29  
**Related Documents:** [Research Register](research-register.md), [Product Scope](product-scope.md), [API Reference & Integration Guide](api-reference.md)

---

The sourcing framework and review protocol are defined. Under Docs Issue #3 the author has source-checked NELF (2010), NELC LRP 3 and the MATATAG Curriculum – Kindergarten; the other LRPs are only identified, not inspected. **Every record in this document is author-checked only (`source_checked`) and awaits subject-matter adviser review; no record is `subject_matter_reviewed` or `reviewed_approved`, so Docs Issue #3 stays open.** Evidence held only in a private Drive cannot be verified by others; records carry `url`, `accessed` and `locator` fields; page locators are now filled from the local source files, while `url` and `accessed` stay `TODO` for the ECCD Council sources until an official page can be opened. This document does not establish that a source is cleared for unrestricted commercial reproduction, that milestone prompts are clinical instruments, or that LittleSteps replaces healthcare professionals.

---

## 1. Statutory & Policy Baseline

### Republic Act No. 12199 (ECCD System Act)
- **Full Title:** *An Act Further Strengthening the Early Childhood Care and Development System, Repealing for the Purpose Republic Act No. 10410, Otherwise Known as the "Early Years Act (EYA) of 2013", and Appropriating Funds Therefor*
- **Short Title:** *Early Childhood Care and Development System Act* (Section 1)
- **Approval Date:** Approved and signed into law on **May 8, 2025** by President Ferdinand R. Marcos Jr.
- **Official Legal Text:** [Republic Act No. 12199 (Lawphil)](https://lawphil.net/statutes/repacts/ra2025/ra_12199_2025.html); [ECCD Council Policy Documents](https://eccdcouncil.gov.ph/policy-documents/)
- **Repeal Clause:** Explicitly repeals Republic Act No. 10410 (*Early Years Act of 2013*).
- **Statutory Jurisdictional Allocation (Section 2, Declaration of Policy):**
  - The State recognizes the age from **zero (0) to eight (8) years** as the first crucial stage of educational development.
  - **Early Childhood Care and Development (ECCD) Council:** Assigned mandated responsibility for Filipino children **below five (5) years of age** (0–59 months).
  - **Department of Education (DepEd):** Assigned mandated responsibility for children in the formative basic education years from **five (5) to eight (8) years of age** (60–96 months, covering Kindergarten through Grade 2), consistent with the *Enhanced Basic Education Act of 2013* (Republic Act No. 10533).
- **IRR Status (Implementing Rules and Regulations):**
  - Government announcements (Philippine Information Agency, DepEd, and ECCD Council) report that the Implementing Rules and Regulations (IRR) were signed on **August 5, 2026** by the ECCD Council, DepEd, and DILG.
  - **Status & Open Checks:** While the signing has been reported by official sources, the **actual full text, Official Gazette publication, and effectivity date remain pending inspection**. Until an official signed copy or gazette publication is inspected, specific operational provisions must not be cited as definitive.

### Statutory Jurisdiction vs. LittleSteps Product Navigation Bands

Statutory age allocations and LittleSteps product navigation categories are strictly distinct:

1. **Statutory jurisdiction** establishes government agency legal authority under RA 12199 (ECCD Council for <5 years; DepEd for 5–8 years).
2. **LittleSteps navigation categories** are internal UX categories created to help parents discover age-appropriate activities and record private observations. They are **not** statutory jurisdictions, legal definitions, or medical or developmental milestones.
3. Specifically, the **60–71 month band ("Kindergarten Transition") is solely a LittleSteps product UX category** designed as a bridge for children entering Kindergarten, referencing DepEd Kindergarten competencies. It is **not** a separate statutory category under Philippine law.
4. **Only NELF (2010), NELC LRP 3 and MATATAG Curriculum – Kindergarten have been author-checked.** Mappings that cite LRP 1, 2, 4, 5, 6, 7 or 8 are **provisional**: the official package is identified but not inspected. All mappings remain candidates pending adviser review.

| LittleSteps Product Category | UX Navigation Range | Statutory Authority (RA 12199) | Candidate Curriculum Reference (author-checked; page locators under re-check) |
| :--- | :---: | :--- | :--- |
| **Young Infants** | 0–5 months | ECCD Council (<5 years) | NELF (2010) Annex 4 *(0–12 months section from printed p. 72)*; NELC LRP 3 *(infant calendars, 0 to 1 year, PDF pp. 70–136)* |
| **Older Infants** | 6–11 months | ECCD Council (<5 years) | NELF (2010) Annex 4 *(0–12 months section from printed p. 72; 7–12 month indicators)*; NELC LRP 3 *(infant calendars, 0 to 1 year, PDF pp. 70–136)* |
| **Young Toddlers** | 12–23 months | ECCD Council (<5 years) | NELF (2010) Annex 4 *(13–24 months section from printed p. 78)*; NELC LRP 3 *(toddler calendars, 1 to 2 years, PDF pp. 140–207)*; LRP 2 *(provisional)* |
| **Older Toddlers** | 24–35 months | ECCD Council (<5 years) | NELF (2010) Annex 4 *(25–36 months section from printed p. 87)*; no NELC package in the compiled file is titled for 24–35 months (LRP 3 stops at 2 years; LRP 4–6 are Pre-K, 3–4 years) |
| **Younger Preschoolers** | 36–47 months | ECCD Council (<5 years) | NELF (2010) Annex 4 *(37–71 months section from printed p. 95)*; NELC LRP 5 *(Pre-K1, 3 to 3.11 years; title confirmed, content not inspected)* |
| **Older Preschoolers** | 48–59 months | ECCD Council (<5 years) | NELF (2010) Annex 4 *(37–71 months section from printed p. 95)*; NELC LRP 6 *(Pre-K2, 4 to 4.11 years)*, LRP 7 *(songs, rhymes, creative activities)*; titles confirmed, content not inspected |
| **Kindergarten Transition** | 60–71 months *(Product UX Band)* | DepEd (5–8 years) | DepEd MATATAG Curriculum – Kindergarten; NELF Annex 4 *(37–71 months section from printed p. 95; 61–71 month indicators)* |

*Note: LRP 1, 2, 4, 5, 6 and 7 mappings are provisional candidates (package titles confirmed in the compiled file; content not inspected) and must not be treated as source evidence. NELF page numbers are printed pages (PDF page = printed page + 10); LRP page numbers are PDF pages of the compiled file, not printed pages. The NELF Annex 4 section starts above were read from the page images. The NELF Annex 4 printed title reads "0-5.11 months", probably a typo for years; noted as printed, flagged for @vincenttamano.*

---

## 2. Intellectual Property, Access & Reuse Conditions (RA 8293)

Philippine government publications are subject to specific legal conditions under **Section 176 of Republic Act No. 8293** (*Intellectual Property Code of the Philippines*):

1. **Government Works & Exploitation:** Section 176 provides that no copyright shall subsist in any work of the Government of the Philippines. However, prior approval of the government agency or office wherein the work is created is necessary for exploitation of such work for profit, and conditions such as payment of royalties may be imposed. LittleSteps is strictly a non-profit academic research prototype.
2. **Borrowed Third-Party Materials:** Under DepEd and ECCD Council publication guidelines, "borrowed materials" (including songs, stories, poems, photographs, illustrations, and trademarks) included within government guides remain the property of their respective copyright holders. Neither DepEd nor the ECCD Council claims ownership over these works.
3. **ECCD Council Distribution Advisories:** The ECCD Council maintains public notices concerning the unauthorized distribution, reproduction, and commercial sale of its learning packages. Access to a portal or document does not establish unrestricted adaptation or distribution rights.
4. **Implications for LittleSteps Content:**
   - Traditional nursery rhymes, folk songs, and traditional games (*Pen-pen de Sarapen*, *Bahay-Bahayan*, *Piko*, *Si Pilimon*) are cultural heritage, but published arrangements and translations may be protected; permission is unconfirmed.
   - Any modern poems, authored children's stories, or proprietary illustrations in LRP 7 require individual copyright verification and must not be reproduced verbatim without rights clearance.
   - All official curriculum packages remain **unavailable for content authoring until permissions are confirmed** (complete editions, applicable terms and RA 8293 reuse permission); production catalog items must include exact academic citations and non-endorsement disclaimers.

---

### Findings from the source files (checked 2026-10-30, for @vincenttamano)

**Confirmed from the files**
- All 14 records in §5.1 were checked against the local source files: source, age band and activity idea are present at the recorded page. Each record's `source_check` notes the author's own additions (for example the firm mat in record 2, "Magandang umaga" in record 10, the letters A, B, S, M, T in record 13).
- LRP compiled file: cover reads "Early Childhood Care and Development Council 2015" (PDF p. 1); LRP 1 cover reads "April 2015" (PDF p. 8); ECCD Governing Board Resolution No. 15-02, adopted 10 September 2015, approves the LRPs (PDF pp. 5–6). The preface (PDF p. 3) states the NELF was approved on 24 September 2010 through Board Resolution No. 10-01.
- LRP numbering in the file: LRP 4 is Suggested Routine Activities for Pre-K1 and Pre-K2, LRP 5 is Pre-K1 (3–3.11 years), LRP 6 is Pre-K2 (4–4.11 years) and LRP 8 is the Family Support Program. The ECD Checklist is not LRP 8 and is not in the compiled file. LRP 3 printed page numbers drift against PDF pages (PDF p. 106 prints "Page 35", PDF p. 162 prints "Page 89"), so cite the PDF page.
- NELF PDF page = printed page + 10. Annex 4 age sections start at printed p. 72 (0–12 months), p. 78 (13–24), p. 87 (25–36) and p. 95 (37–71); the Acknowledgment is on printed p. 110.
- MATATAG: the file states no DepEd Order number or edition year. The DepEd portal page lists it as the Kindergarten download and cites only DM 54, s. 2023 (pilot implementation of the MATATAG Curriculum), which is not recorded as this guide's issuance.

**Reuse statements found (none grants permission)**
- LRP compiled file, pages 1–8 (cover, title, Resolution No. 15-02, LRP 1 cover) and the preface: no copyright, licence or reproduction statement. The only copyright line in the file is a third-party poem credit, "Copyright © 1972 by Dorothy Law Nolte", in the Family Support Program section (PDF p. 960).
- NELF front matter (cover, contents, foreword, messages, Resolution No. 10-01 first page) and the Acknowledgment (printed pp. 110–112) and back cover: no copyright, licence or reproduction statement.
- MATATAG file (33 pages): no copyright, licence or reproduction statement; DepEd's portal page shows no copyright notice for the guide (its Project Bukas terms cover datasets and ask for DepEd attribution and permission before modification, and it is not stated that they apply to this PDF).

**Still open**
- Official ECCD Council publication pages: eccdcouncil.gov.ph returned HTTP 403 to the checker, so no URL or access date is recorded for NELF or the LRPs.
- Reuse permission for quoting, adapting and linking stays "unconfirmed" for every source; Section 176 of RA 8293 still requires agency approval for exploitation for profit.
- Subject-matter adviser review; competency codes beyond the numbered MATATAG competencies; the NELF Annex 4 title "0-5.11 months" (printed; probably a typo for years).
- Ownership and rights of third-party songs, poems and illustrations in LRP 7.

---

## 3. Evidence-Backed Source Register

| Source Title | Issuing Organization | Target Age Band | Content Scope & Relevant Sections | Access & Reuse Terms (RA 8293) | Verification Status | Permission (quote / adapt / link) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Republic Act No. 12199** | Republic of the Philippines | 0–8 years | Policy context; interagency responsibilities (Section 2); early childhood workforce standards. | Public statute. Free for policy and architectural grounding. | **Statute verified** (May 8, 2025; [Lawphil text](https://lawphil.net/statutes/repacts/ra2025/ra_12199_2025.html)). | quote: unconfirmed; adapt: unconfirmed; link: unconfirmed |
| **RA 12199 IRR** | ECCD Council, DepEd, DILG | 0–8 years | Implementing rules, operational guidelines for LGUs and Child Development Centers. | Pending official gazette publication and inspection of text. | **Signing reported August 5, 2026**; official text, gazette publication, and effectivity date pending verification. | quote: unconfirmed; adapt: unconfirmed; link: unconfirmed |
| **National Early Learning Framework (NELF)** | ECCD Council | 0–6 years | Foundational standards; Annex 4 contains age-validated developmental indicators across the early learning domains listed in Annex 4 (five, per its Background). | Official Council publication (approved 24 September 2010, ECCD Council Board Resolution No. 10-01). Text used for non-commercial educational alignment; borrowed third-party creative items protected. | **Author-checked (2010)**; Annex 4 indicators extracted (Annex 4, printed pp. 67–109; age sections start at printed p. 72 for 0–12 months, p. 78 for 13–24, p. 87 for 25–36 and p. 95 for 37–71 months). | quote: unconfirmed; adapt: unconfirmed; link: unconfirmed |
| **NELC — LRP 1 (Implementation Guidelines)** | ECCD Council | 0–4 years | Center and home implementation guidelines. | Educational reference copy. Unavailable for content authoring until permissions confirmed. | Official package identified; not inspected; provisional. | quote: unconfirmed; adapt: unconfirmed; link: unconfirmed |
| **NELC — LRP 2 (Standards & Competencies)** | ECCD Council | 0–4 years | Developmental domains, behavioral indicators, and milestone progression for infants and toddlers. | Educational reference copy. Subject to RA 8293 Sec. 176. Unavailable for content authoring until permissions confirmed. | Official package identified; not inspected; provisional. | quote: unconfirmed; adapt: unconfirmed; link: unconfirmed |
| **NELC — LRP 3 (Parent-Mentor Activity Calendar)** | ECCD Council | 0–23 months | Suggested home-based calendar of caregiver activities for infants and toddlers (feeding, bathing, movement, sensory play). | Educational home-mentoring package (compiled LRP file, cover 2015; Governing Board Resolution No. 15-02, 10 September 2015). Unavailable for content authoring until permissions confirmed. | **Author-checked (compiled LRP file, cover 2015; Governing Board Resolution No. 15-02, 10 September 2015)**; activity prompts extracted (LRP 3, PDF pp. 69–207 of the compiled LRP file; page locators are given per record in §5.1). | quote: unconfirmed; adapt: unconfirmed; link: unconfirmed |
| **NELC — LRP 4 (Suggested Routine Activities for Pre-K1 and Pre-K2)** | ECCD Council | 36–59 months | Routine activities for 3- and 4-year-olds (title confirmed in the compiled file). | Educational reference copy. Unavailable for content authoring until permissions confirmed. | Official package identified; not inspected; provisional. | quote: unconfirmed; adapt: unconfirmed; link: unconfirmed |
| **NELC — LRP 5 & 6 (Suggested Activities for Pre-K1: 3–3.11 years; Pre-K2: 4–4.11 years)** | ECCD Council | 36–59 months | Preschool activity plans for 3- and 4-year-olds. | Educational reference copy. Unavailable for content authoring until permissions confirmed. | Official packages identified; not inspected; provisional. | quote: unconfirmed; adapt: unconfirmed; link: unconfirmed |
| **NELC — LRP 7 (Creative Resources, Songs & Rhymes)** | ECCD Council | 0–4 years | Traditional action songs, poems, rhymes, and creative movement. | Third-party borrowed works protected under RA 8293. Traditional folklore is separated from modern works, but published arrangements and translations may be protected. Unavailable for content authoring until permissions confirmed. | Official package identified; not inspected; provisional. Creative assets not audited. | quote: unconfirmed; adapt: unconfirmed; link: unconfirmed |
| **DepEd MATATAG Kindergarten Curriculum Guide** | Department of Education (DepEd) | 5–6 years (60–71 mo UX) | Foundational learning domains: Literacy, Numeracy, Socio-Emotional, Motor Development. | Official DepEd curriculum file (33-page file titled "MATATAG Curriculum Kindergarten", file created 30 August 2023 per its PDF metadata; the file states no DepEd Order number or edition year. The portal page, opened 2026-10-30, lists it as the Kindergarten download and cites only DM 54, s. 2023 for the pilot implementation of the MATATAG Curriculum, not as this guide's issuance; [MATATAG Portal](https://www.deped.gov.ph/matatagcurriculumk147/)). | **Author-checked**; competencies 8 and 23 confirmed (PDF pp. 18–19). | quote: unconfirmed; adapt: unconfirmed; link: unconfirmed |
| **Philippine Early Childhood Development (ECD) Checklist** *(not LRP 8: in the compiled file LRP 8 is the Family Support Program)* | ECCD Council | 0–59 months | Professional assessment checklist used by trained Child Development Teachers (CDTs) and Child Development Workers (CDWs) for early identification of delays. | **Strictly non-diagnostic in LittleSteps.** Do NOT reproduce scoring, calculate developmental quotients, or convert to parent-facing screening tool. | **Restricted professional tool**; not in the compiled LRP file; not inspected; provisional. Non-diagnostic observation prompts only. | quote: unconfirmed; adapt: unconfirmed; link: unconfirmed |
| **CDC Milestone Checklists** | US CDC | 0–5 years | Educational references for milestone prompts. | US CDC educational resource. While general government text may be public domain, specific checklists require independent verification. Must NOT be presented as a validated Philippine instrument. | **Educational reference only**; secondary cross-reference. | quote: unconfirmed; adapt: unconfirmed; link: unconfirmed |

---

## 4. Strict Non-Diagnostic Scope & Boundaries

1. **Strictly Non-Diagnostic Purpose:** LittleSteps is strictly an educational planning, reflection, and observational support application for parents and caregivers. It must **never** present milestone prompts or activity suggestions as medical advice, clinical evaluations, validated developmental screenings, or formal diagnostic determinations.
2. **Assessment Tool Isolation:** The ECCD Council describes the Philippine Early Childhood Development (ECD) Checklist as an instrument administered by trained service providers (CDTs and CDWs) for center-based monitoring, early identification of developmental delays, and intervention planning. In LittleSteps, this checklist must **never** be adapted into an automated clinical diagnosis, developmental delay calculator, pass/fail grading system, or self-service screening engine.
3. **No Scoring or Pass/Fail Language:** Observational prompts must only use descriptive and reflective phrasing (e.g., *"Noticed whether child reaches for objects"* rather than *"Passed / Failed"* or numerical developmental quotients).
4. **Mandatory Advisory Disclaimer:** Every milestone and activity view must prominently display:
   > *"LittleSteps is an educational support tool for caregivers and is not a medical, clinical, screening, or diagnostic instrument. For developmental questions or concerns, consult a licensed pediatrician or healthcare professional."*

---

## 5. Per-Item Provenance Record Schema & Source-Checked Candidates

Before any activity, milestone observation prompt, story, or rhyme is entered into the production database or content catalog, it must have a completed provenance record:

```yaml
item_id: "act-infant-001"
title: "Tummy Time Gentle Tracking"
item_type: "activity" # catalog `type` enum, docs/data-model.md §2.7: activity | story | rhyme | game
intended_age_band: "0-5m"
domain: "motor"
source:
  title: "National Early Learning Curriculum — Learning Resource Package No. 3"
  organization: "ECCD Council"
  url: TODO
  accessed: TODO
  edition_date: "compiled LRP file (PDF p. 1 cover reads 'Early Childhood Care and Development Council 2015'); ECCD Governing Board Resolution No. 15-02 adopted 10 September 2015 (PDF pp. 5-6)"
  exact_locator: "LRP 3, infants 0 to 1 year, Week 2, activities 10-12 (\"tummy session\", rolled blanket, mirrors); the compiled LRP file prints \"LRP 3 | Page 35\" on PDF p. 106"
  locator: "PDF p. 106 of the compiled LRP file (LRP 3 printed p. 35)"
  source_check: "Template example. Tummy session with toys, lights and mirrors, and the rolled blanket, confirmed on that page; \"Section 1, Activity 4\" in the earlier draft was not found."
relationship_to_source: "adapted" # direct_link | adapted | original_informed_by_source
adaptation_notes: "Paraphrased caregiver guidance for home environment using rolled blanket; removed center-based terminology."
language: "fil" # en | fil | hil (one value, catalog `language`)
safety_accessibility_notes: "Requires adult supervision at all times; use firm, flat floor surface (never soft beds)."
review:
  reviewer_name: "Vincent Tamano (Backend & Content Lead)"
  reviewer_role: "Student Author / Course Researcher"
  review_date: "2026-10-29"
  review_status: "source_checked" # draft | source_checked | subject_matter_reviewed | reviewed_approved
limitations: "Provisional Academic Reference — Pending Review. Educational prompt only; not a clinical milestone."
```

### 5.1 Source-Checked Candidate Provenance Records (Multi-Domain Across 7 UX Bands)

The following candidates were source-checked by the author against NELF (2010), NELC LRP 3, and the MATATAG Curriculum – Kindergarten. **Every record is author-checked only (`source_checked`) and awaits subject-matter adviser review; none is approved for the production catalog.** Fields align with the catalog in [Data Model §2.7](data-model.md): `materials`, `domain`, and an `item_type` that maps to the catalog `type`. Each record's `exact_locator`/`locator` was checked against the local source file on 2026-10-30: NELF locators are printed page numbers with the PDF page in brackets (PDF = printed + 10), LRP locators are PDF pages of the compiled file, and the MATATAG file prints "Page N of 33" matching its PDF pages. `source_check` states what was found; all 14 records were confirmed for source, age band and activity idea, with the author's own additions noted. `url` and `accessed` stay `TODO` for the ECCD Council sources because eccdcouncil.gov.ph returned HTTP 403 to the checker on 2026-10-30, so no official page was opened; the MATATAG record carries the DepEd portal URL opened that day.

#### 1. Young Infants (0–5 months) — Gross Motor
```yaml
item_id: "act-ph-nelf-001"
title: "Dangling Toy Reach"
item_type: "activity"
intended_age_band: "0-5m"
domain: "motor"
source:
  title: "The National Early Learning Framework of the Philippines (NELF)"
  organization: "ECCD Council"
  url: TODO
  accessed: TODO
  edition_date: "2010 Edition"
  exact_locator: "Annex 4, Form I (0-12 months), Gross Motor Skills, Indicators for 0-6 months: \"Moves arms and legs equally to reach at dangling object\"; the Annex 4 title reads 0-5.11 months (probably a typo for years; flagged)"
  locator: "NELF printed p. 73 (PDF p. 83)"
  source_check: "Confirmed: source, age band and the dangling-object indicator. The caregiver-held cloth toy and safety notes are the author's adaptation."
relationship_to_source: "adapted"
adaptation_notes: "Adapted infant indicator into interactive caregiver floor play using a soft cloth toy held by the caregiver within the baby's view and reach, above the chest."
materials: ["Soft cloth toy"]
safety_accessibility_notes: "Caregiver holds the toy at all times; no string, ribbon or cord near an infant (strangulation risk); toy has no small detachable parts; awake, supervised play only."
review:
  reviewer_name: "Vincent Tamano (Backend & Content Lead)"
  reviewer_role: "Student Author / Course Researcher"
  review_date: "2026-10-29"
  review_status: "source_checked"
limitations: "Provisional Academic Reference — Pending Review. Educational prompt only; not a clinical milestone."
```

#### 2. Young Infants (0–5 months) — Gross Motor / Tummy Time
```yaml
item_id: "act-ph-lrp3-002"
title: "Tummy Time Discovery"
item_type: "activity"
intended_age_band: "0-5m"
domain: "motor"
source:
  title: "NELC — Learning Resource Package No. 3 (Parent-Mentor Activity Calendar)"
  organization: "ECCD Council"
  url: TODO
  accessed: TODO
  edition_date: "compiled LRP file (PDF p. 1 cover reads 'Early Childhood Care and Development Council 2015'); ECCD Governing Board Resolution No. 15-02 adopted 10 September 2015 (PDF pp. 5-6)"
  exact_locator: "LRP 3, infants 0 to 1 year, Week 2, activities 10-12 (tummy session, rolled blanket, mirrors); printed \"LRP 3 | Page 35\""
  locator: "PDF p. 106 of the compiled LRP file (LRP 3 printed p. 35)"
  source_check: "Confirmed: tummy session with mirrors and rolled blanket. \"Firm mat\" is not in the source; it is the author's addition. The source calendar covers 0 to 1 year, not the 0-5 month band specifically."
relationship_to_source: "adapted"
adaptation_notes: "Safe floor play on a firm mat with rolled blanket support and mirror tracking to build upper-body strength."
materials: ["Firm mat", "Rolled blanket", "Unbreakable mirror"]
review:
  reviewer_name: "Vincent Tamano (Backend & Content Lead)"
  reviewer_role: "Student Author / Course Researcher"
  review_date: "2026-10-29"
  review_status: "source_checked"
limitations: "Provisional Academic Reference — Pending Review. Educational prompt only; not a clinical milestone."
```

#### 3. Older Infants (6–11 months) — Cognitive Cause & Effect
```yaml
item_id: "act-ph-nelf-003"
title: "Spoon Fetch Challenge"
item_type: "game"
intended_age_band: "6-11m"
domain: "cognitive"
source:
  title: "The National Early Learning Framework of the Philippines (NELF)"
  organization: "ECCD Council"
  url: TODO
  accessed: TODO
  edition_date: "2010 Edition"
  exact_locator: "Annex 4, 7-12 months, Cognitive Development, Cause-Effect Relationships: \"Uses an object to get something he/she wants (e.g., spoon to reach an object)\""
  locator: "NELF printed p. 76 (PDF p. 86)"
  source_check: "Confirmed: source, age band and the spoon-to-reach indicator."
relationship_to_source: "adapted"
adaptation_notes: "Encourages tool-use problem solving by showing child how to use a wooden spoon to reach a nearby toy."
materials: ["Wooden spoon", "Small toy"]
review:
  reviewer_name: "Vincent Tamano (Backend & Content Lead)"
  reviewer_role: "Student Author / Course Researcher"
  review_date: "2026-10-29"
  review_status: "source_checked"
limitations: "Provisional Academic Reference — Pending Review. Educational prompt only; not a clinical milestone."
```

#### 4. Older Infants (6–11 months) — Socio-Emotional Mimicry
```yaml
item_id: "act-ph-nelf-004"
title: "Mirror Facial Mimicry"
item_type: "game"
intended_age_band: "6-11m"
domain: "socioEmotional"
source:
  title: "The National Early Learning Framework of the Philippines (NELF)"
  organization: "ECCD Council"
  url: TODO
  accessed: TODO
  edition_date: "2010 Edition"
  exact_locator: "Annex 4, 7-12 months, Social and Emotional Development, Receptivity to Others' Emotions: \"Can mimic people's facial expressions\""
  locator: "NELF printed p. 78 (PDF p. 88)"
  source_check: "Confirmed: source, age band and the mimicry indicator. The mirror setup is the author's adaptation."
relationship_to_source: "adapted"
adaptation_notes: "Exaggerated facial expressions and warm vocal interactions facing a mirror to build emotional recognition."
materials: ["Unbreakable mirror"]
review:
  reviewer_name: "Vincent Tamano (Backend & Content Lead)"
  reviewer_role: "Student Author / Course Researcher"
  review_date: "2026-10-29"
  review_status: "source_checked"
limitations: "Provisional Academic Reference — Pending Review. Educational prompt only; not a clinical milestone."
```

#### 5. Young Toddlers (12–23 months) — Receptive Language
```yaml
item_id: "act-ph-nelf-005"
title: "Body Part Pointing Rhyme"
item_type: "rhyme"
intended_age_band: "12-23m"
domain: "language"
source:
  title: "The National Early Learning Framework of the Philippines (NELF)"
  organization: "ECCD Council"
  url: TODO
  accessed: TODO
  edition_date: "2010 Edition"
  exact_locator: "Annex 4, 13-18 months, Language, Receptive Language: \"Points to 5 body parts on him/herself when asked to do so\""
  locator: "NELF printed p. 81 (PDF p. 91)"
  source_check: "Confirmed: source, age band and the body-parts indicator. The rhyme format is the author's adaptation, and the source states a target of 5 body parts that this record deliberately does not use."
relationship_to_source: "adapted"
adaptation_notes: "Face-to-face naming and rhyme play; the toddler explores body parts on themselves and the caregiver follows the child's lead, with no target number or pass/fail."
materials: ["None required"]
review:
  reviewer_name: "Vincent Tamano (Backend & Content Lead)"
  reviewer_role: "Student Author / Course Researcher"
  review_date: "2026-10-29"
  review_status: "source_checked"
limitations: "Provisional Academic Reference — Pending Review. Educational prompt only; not a clinical milestone."
```

#### 6. Young Toddlers (12–23 months) — Cognitive Sorting (Practical Life)
```yaml
item_id: "act-ph-lrp3-006"
title: "Sorting Cups and Plates"
item_type: "activity"
intended_age_band: "12-23m"
domain: "cognitive"
source:
  title: "NELC — Learning Resource Package No. 3 (Parent-Mentor Activity Calendar)"
  organization: "ECCD Council"
  url: TODO
  accessed: TODO
  edition_date: "compiled LRP file (PDF p. 1 cover reads 'Early Childhood Care and Development Council 2015'); ECCD Governing Board Resolution No. 15-02 adopted 10 September 2015 (PDF pp. 5-6)"
  exact_locator: "LRP 3, toddlers 1.1 to 2 years, Week 2, activity 20: engage the toddler in sorting kitchen cutlery, cups, saucers, plates; printed \"LRP 3 | Page 89\""
  locator: "PDF p. 162 of the compiled LRP file (LRP 3 printed p. 89)"
  source_check: "Confirmed: source, age band (1.1 to 2 years) and the sorting idea."
relationship_to_source: "adapted"
adaptation_notes: "Sorting clean plastic cups, plates, and saucers during meal preparation to support categorization."
materials: ["Clean plastic cups", "Plastic plates", "Saucers"]
review:
  reviewer_name: "Vincent Tamano (Backend & Content Lead)"
  reviewer_role: "Student Author / Course Researcher"
  review_date: "2026-10-29"
  review_status: "source_checked"
limitations: "Provisional Academic Reference — Pending Review. Educational prompt only; not a clinical milestone."
```

#### 7. Older Toddlers (24–35 months) — Language Prepositions
```yaml
item_id: "act-ph-nelf-007"
title: "Preposition Treasure Hunt"
item_type: "game"
intended_age_band: "24-35m"
domain: "language"
source:
  title: "The National Early Learning Framework of the Philippines (NELF)"
  organization: "ECCD Council"
  url: TODO
  accessed: TODO
  edition_date: "2010 Edition"
  exact_locator: "Annex 4, 25-30 months, Language, Receptive Language: \"Follows 1-step instructions that include simple propositions [sic] (e.g., in, on, under)\""
  locator: "NELF printed p. 89 (PDF p. 99)"
  source_check: "Confirmed: source, age band and the preposition indicator. Bowl and ball are the author's adaptation."
relationship_to_source: "adapted"
adaptation_notes: "Positional preposition understanding ('inside', 'under', 'on top of') using a clean plastic bowl and ball."
materials: ["Small ball", "Plastic bowl"]
review:
  reviewer_name: "Vincent Tamano (Backend & Content Lead)"
  reviewer_role: "Student Author / Course Researcher"
  review_date: "2026-10-29"
  review_status: "source_checked"
limitations: "Provisional Academic Reference — Pending Review. Educational prompt only; not a clinical milestone."
```

#### 8. Older Toddlers (24–35 months) — Concept Sorting
```yaml
item_id: "act-ph-nelf-008"
title: "Household Object Sorting"
item_type: "activity"
intended_age_band: "24-35m"
domain: "cognitive"
source:
  title: "The National Early Learning Framework of the Philippines (NELF)"
  organization: "ECCD Council"
  url: TODO
  accessed: TODO
  edition_date: "2010 Edition"
  exact_locator: "Annex 4, 25-30 months, Cognitive Development, Concept Formation: \"Groups objects by color\""
  locator: "NELF printed p. 90 (PDF p. 100)"
  source_check: "Confirmed: source, age band and the colour-grouping indicator."
relationship_to_source: "adapted"
adaptation_notes: "Color sorting using everyday household items (colored cups and clean cloth scraps)."
materials: ["Red cups", "Blue cups", "Colored cloth scraps"]
review:
  reviewer_name: "Vincent Tamano (Backend & Content Lead)"
  reviewer_role: "Student Author / Course Researcher"
  review_date: "2026-10-29"
  review_status: "source_checked"
limitations: "Provisional Academic Reference — Pending Review. Educational prompt only; not a clinical milestone."
```

#### 9. Younger Preschoolers (36–47 months) — Gross Motor Balance
```yaml
item_id: "act-ph-nelf-009"
title: "Single-Foot Balance Hop"
item_type: "game"
intended_age_band: "36-47m"
domain: "motor"
source:
  title: "The National Early Learning Framework of the Philippines (NELF)"
  organization: "ECCD Council"
  url: TODO
  accessed: TODO
  edition_date: "2010 Edition"
  exact_locator: "Annex 4, 37-71 months section, Gross Motor Skills, Indicators for 37-48 months: \"Hops 1 to 3 steps on preferred foot\"; \"Stands on one leg without falling for at least 5 seconds\""
  locator: "NELF printed p. 95 (PDF p. 105)"
  source_check: "Confirmed: source, age band and the hop and one-leg indicators. The source gives the 37-71 month section; the sub-range 37-48 months is used here. No timing target is kept in the activity."
relationship_to_source: "adapted"
adaptation_notes: "Open-ended balance and hopping play along a floor line marked with chalk or masking tape; the child tries at their own pace and the caregiver describes what they see."
materials: ["Masking tape or sidewalk chalk"]
review:
  reviewer_name: "Vincent Tamano (Backend & Content Lead)"
  reviewer_role: "Student Author / Course Researcher"
  review_date: "2026-10-29"
  review_status: "source_checked"
limitations: "Provisional Academic Reference — Pending Review. Educational prompt only; not a clinical milestone."
```

#### 10. Younger Preschoolers (36–47 months) — Filipino Values / Pakikipagkapwa
```yaml
item_id: "act-ph-nelf-010"
title: "Respectful Morning Greetings"
item_type: "activity"
intended_age_band: "36-47m"
domain: "socioEmotional"
source:
  title: "The National Early Learning Framework of the Philippines (NELF)"
  organization: "ECCD Council"
  url: TODO
  accessed: TODO
  edition_date: "2010 Edition"
  exact_locator: "Annex 4, 37-48 months, Social and Emotional Development, Interactions with Adults: \"Speaks respectfully with adults using 'po' and/or 'opo' and/or appropriate titles\""
  locator: "NELF printed p. 104 (PDF p. 114)"
  source_check: "Confirmed: source, age band and the po/opo indicator. The source does not use the label Pakikipagkapwa for this indicator, and \"Magandang umaga\" is not in the source; both are the author's wording."
relationship_to_source: "adapted"
adaptation_notes: "Modeling polite Filipino honorifics and respectful greetings ('Magandang umaga', 'Po', 'Opo') with family members."
materials: ["None required"]
review:
  reviewer_name: "Vincent Tamano (Backend & Content Lead)"
  reviewer_role: "Student Author / Course Researcher"
  review_date: "2026-10-29"
  review_status: "source_checked"
limitations: "Provisional Academic Reference — Pending Review. Educational prompt only; not a clinical milestone."
```

#### 11. Older Preschoolers (48–59 months) — Fine Motor Drawing
```yaml
item_id: "act-ph-nelf-011"
title: "Crayon Figure Drawing"
item_type: "activity"
intended_age_band: "48-59m"
domain: "motor"
source:
  title: "The National Early Learning Framework of the Philippines (NELF)"
  organization: "ECCD Council"
  url: TODO
  accessed: TODO
  edition_date: "2010 Edition"
  exact_locator: "Annex 4, 49-60 months, Fine Motor Skills: \"Draws a human figure (head, eyes, mouth, trunk, arms, legs, etc.) without prompts\""
  locator: "NELF printed p. 96 (PDF p. 106)"
  source_check: "Confirmed: source, age band and the figure-drawing indicator. The open-ended wording is the author's adaptation; the source lists body parts as an indicator and this record sets no such target."
relationship_to_source: "adapted"
adaptation_notes: "Open-ended drawing play: the child draws a person or anything they like, and the caregiver follows the child's lead and invites them to tell about it."
materials: ["Thick crayon", "Plain paper"]
review:
  reviewer_name: "Vincent Tamano (Backend & Content Lead)"
  reviewer_role: "Student Author / Course Researcher"
  review_date: "2026-10-29"
  review_status: "source_checked"
limitations: "Provisional Academic Reference — Pending Review. Educational prompt only; not a clinical milestone."
```

#### 12. Older Preschoolers (48–59 months) — Expressive Narrative
```yaml
item_id: "act-ph-nelf-012"
title: "Story Drawing and Retelling"
item_type: "activity"
intended_age_band: "48-59m"
domain: "language"
source:
  title: "The National Early Learning Framework of the Philippines (NELF)"
  organization: "ECCD Council"
  url: TODO
  accessed: TODO
  edition_date: "2010 Edition"
  exact_locator: "Annex 4, 49-60 months, Language, Expressive Language: \"Draws and tells a story about his/her drawing\""
  locator: "NELF printed p. 97 (PDF p. 107)"
  source_check: "Confirmed: source, age band and the draw-and-tell indicator."
relationship_to_source: "adapted"
adaptation_notes: "Inviting child to draw a favorite family experience and tell in their own words about their drawing, at whatever length they choose."
materials: ["Paper", "Crayons"]
review:
  reviewer_name: "Vincent Tamano (Backend & Content Lead)"
  reviewer_role: "Student Author / Course Researcher"
  review_date: "2026-10-29"
  review_status: "source_checked"
limitations: "Provisional Academic Reference — Pending Review. Educational prompt only; not a clinical milestone."
```

#### 13. Kindergarten Transition (60–71 months) — Pre-Reading Phonics
```yaml
item_id: "act-ph-matatag-013"
title: "Letter-Sound Match Game"
item_type: "game"
intended_age_band: "60-71m"
domain: "language"
source:
  title: "DepEd MATATAG Kindergarten Curriculum Guide"
  organization: "Department of Education (DepEd)"
  url: "https://www.deped.gov.ph/matatagcurriculumk147/"
  accessed: "2026-10-30"
  edition_date: "33-page file created 30 August 2023 (PDF metadata); DepEd Order number and edition year not stated in the file or on the portal page (the portal cites DM 54, s. 2023 for the pilot only), so TODO"
  exact_locator: "Theme I, Learning Competency 8: \"produce the sound of the letter it stands for\"; also Theme II, Learning Competency 23: \"recognize that sounding off letters form words\"; the file numbers pages \"Page N of 33\", so printed and PDF pages are the same"
  locator: "PDF p. 18 (competency 8) and PDF p. 19 (competency 23) of the 33-page file"
  source_check: "Confirmed: competencies 8 and 23 are in the file. The earlier label \"Foundational Literacy Domain, Letter-Sound Association\" is not the file's wording. The letters A, B, S, M, T and the household-object matching are the author's adaptation."
relationship_to_source: "adapted"
adaptation_notes: "Identifying phonetic sounds of common Filipino alphabet letters (A, B, S, M, T) and matching with household objects."
materials: ["Paper letter cards", "Common household objects"]
review:
  reviewer_name: "Vincent Tamano (Backend & Content Lead)"
  reviewer_role: "Student Author / Course Researcher"
  review_date: "2026-10-29"
  review_status: "source_checked"
limitations: "Provisional Academic Reference — Pending Review. Educational prompt only; not a clinical milestone."
```

#### 14. Kindergarten Transition (60–71 months) — Creative Thought
```yaml
item_id: "act-ph-nelf-014"
title: "Imaginary World Painting"
item_type: "activity"
intended_age_band: "60-71m"
domain: "cognitive"
source:
  title: "The National Early Learning Framework of the Philippines (NELF)"
  organization: "ECCD Council"
  url: TODO
  accessed: TODO
  edition_date: "2010 Edition"
  exact_locator: "Annex 4, 61-71 months, Cognitive Development, Creative Thought: \"Can draw or paint things that do not exist in real life (i.e., from fantasy or imagination)\""
  locator: "NELF printed p. 101 (PDF p. 111)"
  source_check: "Confirmed: source, age band and the draw-from-imagination indicator."
relationship_to_source: "adapted"
adaptation_notes: "Imagining and painting non-real inventions or fantasy creatures, explaining their purpose and features."
materials: ["Paper", "Washable paint or crayons"]
review:
  reviewer_name: "Vincent Tamano (Backend & Content Lead)"
  reviewer_role: "Student Author / Course Researcher"
  review_date: "2026-10-29"
  review_status: "source_checked"
limitations: "Provisional Academic Reference — Pending Review. Educational prompt only; not a clinical milestone."
```

---

## 6. Definition of Done & Gating for Catalog Authoring

This evidence gate ([Docs Issue #3, still open](https://github.com/Thesis-Titans/littlesteps-docs/issues/3)) establishes that:

1. **Current Legal Baseline Established:** RA 12199 (repealing RA 10410) is verified as the governing statute (signed May 8, 2025; [Lawphil text](https://lawphil.net/statutes/repacts/ra2025/ra_12199_2025.html)); government sources (PIA, DepEd, ECCD Council) report the IRR was signed on August 5, 2026, while official text, Official Gazette publication, and effectivity date remain pending inspection.
2. **Jurisdictional Boundaries Distinct:** ECCD Council covers <5 years; DepEd covers 5–8 years. LittleSteps product navigation categories (including the 60–71 month Kindergarten transition band) are recognized as separate product UX groupings and not statutory categories.
3. **Primary Source Documents Author-Checked:** NELF (2010), NELC LRP 3, and the DepEd MATATAG Kindergarten Curriculum – Kindergarten were checked by the author. Page locators are recorded per record as printed (NELF) or PDF (LRP) pages and were confirmed against the files on 2026-10-30; public URLs and access dates are `TODO` except for MATATAG. Other LRPs are identified but not inspected.
4. **Item-Level Source-Checked Candidates (`source_checked`):** Candidate activities across all 7 LittleSteps UX bands are drafted into the provenance YAML schema. They are author-checked only and await subject-matter adviser review; Docs Issue #3 stays open until that review happens.
5. **Operational Gating to Production (`reviewed_approved`):** While engineering tracks (API, React, Flutter) operate safely using clearly labeled `synthetic_fixture` records with *"Provisional Academic Reference — Pending Review"*, no production catalog item will be marked `reviewed_approved` without formal faculty / early childhood subject-matter reviewer sign-off.
6. **Automated Documentation CI Active:** The documentation repository (`littlesteps-docs`) runs automated verification on pull requests and pushes via GitHub Actions (`Docs CI/verify`), validating relative internal link integrity, image references, and issue template structure.
