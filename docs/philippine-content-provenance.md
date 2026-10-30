# LittleSteps Philippine Content Provenance

**Status:** Canonical Content Sourcing Baseline  
**Governing Standard:** Republic Act No. 12199 (ECCD System Act) & RA 10173  
**Owner:** Vincent (Backend & Content Lead)  
**Last Reviewed:** 2026-10-29  
**Related Documents:** [Research Register](research-register.md), [Product Scope](product-scope.md), [API Reference & Integration Guide](api-reference.md)

---

The sourcing framework and review protocol are defined. Under Docs Issue #3 the author has source-checked NELF (2010), NELC LRP 3 (2015) and the MATATAG Kindergarten Guide (2024); the other LRPs are only identified, not inspected. **Every record in this document is author-checked only (`source_checked`) and awaits subject-matter adviser review; no record is `subject_matter_reviewed` or `approved`, so Docs Issue #3 stays open.** Evidence held only in a private Drive cannot be verified by others; records carry `url`, `accessed` and `locator` fields that remain `TODO` until a public link and access date are added. This document does not establish that a source is cleared for unrestricted commercial reproduction, that milestone prompts are clinical instruments, or that LittleSteps replaces healthcare professionals.

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
4. **Only NELF (2010), NELC LRP 3 (2015) and MATATAG Kindergarten (2024) have been author-checked.** Mappings that cite LRP 1, 2, 4, 5, 6, 7 or 8 are **provisional**: the official package is identified but not inspected. All mappings remain candidates pending adviser review.

| LittleSteps Product Category | UX Navigation Range | Statutory Authority (RA 12199) | Candidate Curriculum Reference (author-checked; page locators under re-check) |
| :--- | :---: | :--- | :--- |
| **Young Infants** | 0–5 months | ECCD Council (<5 years) | NELF (2010) Annex 4; NELC LRP 3 (2015) pp. 21–44 *(locator to be re-checked against the PDF (@vincenttamano))* |
| **Older Infants** | 6–11 months | ECCD Council (<5 years) | NELF (2010) Annex 4; NELC LRP 3 (2015) pp. 40–64 *(locator to be re-checked against the PDF (@vincenttamano))* |
| **Young Toddlers** | 12–23 months | ECCD Council (<5 years) | NELF (2010) Annex 4; NELC LRP 3 (2015) pp. 88–99 *(locator to be re-checked against the PDF (@vincenttamano))*; LRP 2 *(provisional)* |
| **Older Toddlers** | 24–35 months | ECCD Council (<5 years) | NELF (2010) Annex 4 pp. 89–94 *(locator to be re-checked against the PDF (@vincenttamano))*; NELC LRP 4, LRP 8 *(official package identified; not inspected; provisional)* |
| **Younger Preschoolers** | 36–47 months | ECCD Council (<5 years) | NELF (2010) Annex 4 pp. 95–106 *(locator to be re-checked against the PDF (@vincenttamano))*; NELC LRP 5 *(provisional)* |
| **Older Preschoolers** | 48–59 months | ECCD Council (<5 years) | NELF (2010) Annex 4 pp. 96–107 *(locator to be re-checked against the PDF (@vincenttamano))*; NELC LRP 6, LRP 7 *(provisional)* |
| **Kindergarten Transition** | 60–71 months *(Product UX Band)* | DepEd (5–8 years) | DepEd MATATAG Curriculum — Kindergarten Guide (2024); NELF Annex 4 |

*Note: LRP 1, 2, 4, 5, 6, 7 and 8 mappings are provisional candidates (official package identified; not inspected) and must not be treated as source evidence. The overlapping NELF/LRP 3 page ranges above are inconsistent and need re-checking by Vincent.*

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

## 3. Evidence-Backed Source Register

| Source Title | Issuing Organization | Target Age Band | Content Scope & Relevant Sections | Access & Reuse Terms (RA 8293) | Verification Status | Permission (quote / adapt / link) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Republic Act No. 12199** | Republic of the Philippines | 0–8 years | Policy context; interagency responsibilities (Section 2); early childhood workforce standards. | Public statute. Free for policy and architectural grounding. | **Statute verified** (May 8, 2025; [Lawphil text](https://lawphil.net/statutes/repacts/ra2025/ra_12199_2025.html)). | quote: unconfirmed; adapt: unconfirmed; link: unconfirmed |
| **RA 12199 IRR** | ECCD Council, DepEd, DILG | 0–8 years | Implementing rules, operational guidelines for LGUs and Child Development Centers. | Pending official gazette publication and inspection of text. | **Signing reported August 5, 2026**; official text, gazette publication, and effectivity date pending verification. | quote: unconfirmed; adapt: unconfirmed; link: unconfirmed |
| **National Early Learning Framework (NELF)** | ECCD Council | 0–6 years | Foundational standards; Annex 4 contains age-validated developmental indicators across 7 early learning domains. | Official Council publication (2010). Text used for non-commercial educational alignment; borrowed third-party creative items protected. | **Author-checked (2010 edition)**; Annex 4 indicators extracted (pp. 73–106, locator to be re-checked against the PDF (@vincenttamano)). | quote: unconfirmed; adapt: unconfirmed; link: unconfirmed |
| **NELC — LRP 1 (Implementation Guidelines)** | ECCD Council | 0–4 years | Center and home implementation guidelines. | Educational reference copy. Unavailable for content authoring until permissions confirmed. | Official package identified; not inspected; provisional. | quote: unconfirmed; adapt: unconfirmed; link: unconfirmed |
| **NELC — LRP 2 (Standards & Competencies)** | ECCD Council | 0–4 years | Developmental domains, behavioral indicators, and milestone progression for infants and toddlers. | Educational reference copy. Subject to RA 8293 Sec. 176. Unavailable for content authoring until permissions confirmed. | Official package identified; not inspected; provisional. | quote: unconfirmed; adapt: unconfirmed; link: unconfirmed |
| **NELC — LRP 3 (Parent-Mentor Activity Calendar)** | ECCD Council | 0–23 months | Suggested home-based calendar of caregiver activities for infants and toddlers (feeding, bathing, movement, sensory play). | Educational home-mentoring package (2015 edition). Unavailable for content authoring until permissions confirmed. | **Author-checked (2015 edition)**; activity prompts extracted (pp. 21–99, locator to be re-checked against the PDF (@vincenttamano)). | quote: unconfirmed; adapt: unconfirmed; link: unconfirmed |
| **NELC — LRP 4 (Activities for 2–3 Years Old)** | ECCD Council | 24–35 months | Daily routine and exploration play ideas for older toddlers. | Educational reference copy. Unavailable for content authoring until permissions confirmed. | Official package identified; not inspected; provisional. | quote: unconfirmed; adapt: unconfirmed; link: unconfirmed |
| **NELC — LRP 5 & 6 (Pre-K1 & Pre-K2 Activities)** | ECCD Council | 36–59 months | Preschool activity plans for 3- and 4-year-olds. | Educational reference copy. Unavailable for content authoring until permissions confirmed. | Official packages identified; not inspected; provisional. | quote: unconfirmed; adapt: unconfirmed; link: unconfirmed |
| **NELC — LRP 7 (Creative Resources, Songs & Rhymes)** | ECCD Council | 0–4 years | Traditional action songs, poems, rhymes, and creative movement. | Third-party borrowed works protected under RA 8293. Traditional folklore is separated from modern works, but published arrangements and translations may be protected. Unavailable for content authoring until permissions confirmed. | Official package identified; not inspected; provisional. Creative assets not audited. | quote: unconfirmed; adapt: unconfirmed; link: unconfirmed |
| **DepEd MATATAG Kindergarten Curriculum Guide** | Department of Education (DepEd) | 5–6 years (60–71 mo UX) | Foundational learning domains: Literacy, Numeracy, Socio-Emotional, Motor Development. | Official DepEd issuance (DepEd Order No. 010, s. 2024; [MATATAG Portal](https://www.deped.gov.ph/matatagcurriculumk147/)). | **Author-checked (2024 edition)**; competencies cross-referenced for 60–71m transition band. | quote: unconfirmed; adapt: unconfirmed; link: unconfirmed |
| **Philippine Early Childhood Development (ECD) Checklist (LRP 8)** | ECCD Council | 0–59 months | Professional assessment checklist used by trained Child Development Teachers (CDTs) and Child Development Workers (CDWs) for early identification of delays. | **Strictly non-diagnostic in LittleSteps.** Do NOT reproduce scoring, calculate developmental quotients, or convert to parent-facing screening tool. | **Restricted professional tool**; official package identified; not inspected; provisional. Non-diagnostic observation prompts only. | quote: unconfirmed; adapt: unconfirmed; link: unconfirmed |
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
item_type: "activity" # observation_prompt | activity | game | story_rhyme | caregiver_guidance (catalog `type`: activity | story | rhyme | game, docs/data-model.md §2.7)
intended_age_band: "0-5m"
domain: "motor"
source:
  title: "National Early Learning Curriculum — Learning Resource Package No. 3"
  organization: "ECCD Council"
  url: "https://eccdcouncil.gov.ph/resources/"
  accessed: "YYYY-MM-DD"
  edition_date: "2015 Revised Edition"
  exact_locator: "Section 1, Activity 4, Page 35"
  locator: TODO
relationship_to_source: "adapted" # direct_link | adapted | original_informed_by_source
adaptation_notes: "Paraphrased caregiver guidance for home environment using rolled blanket; removed center-based terminology."
language: "fil / en"
safety_accessibility_notes: "Requires adult supervision at all times; use firm, flat floor surface (never soft beds)."
review:
  reviewer_name: "Vincent Tamano (Backend & Content Lead)"
  reviewer_role: "Student Author / Course Researcher"
  review_date: "2026-10-29"
  review_status: "source_checked" # draft | source_checked | subject_matter_reviewed | approved
limitations: "Provisional Academic Reference — Pending Review. Educational prompt only; not a clinical milestone."
```

### 5.1 Source-Checked Candidate Provenance Records (Multi-Domain Across 7 UX Bands)

The following candidates were source-checked by the author against NELF (2010), NELC LRP 3 (2015), and the MATATAG Kindergarten Guide (2024). **Every record is author-checked only (`source_checked`) and awaits subject-matter adviser review; none is approved for the production catalog.** Fields align with the catalog in [Data Model §2.7](data-model.md): `materials`, `domain`, and an `item_type` that maps to the catalog `type`. Drive-only evidence is not verifiable by others, so each record's `url`, `accessed` and `locator` stay `TODO` until Vincent adds a public link, access date and exact locator.

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
  exact_locator: "Annex 4 (Age-Validated Indicators for Children Aged 0-12 months; spans more than the 0-5m band), Page 73, Gross Motor Skills [locator to be re-checked against the PDF (@vincenttamano)]"
  locator: TODO
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
  edition_date: "2015 Edition"
  exact_locator: "LRP 3, Page 35, Gross Motor Routine"
  locator: TODO
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
  exact_locator: "Annex 4, Page 76, Cause-Effect Relationships"
  locator: TODO
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
  exact_locator: "Annex 4, Page 78, Receptivity to Others' Emotions"
  locator: TODO
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
item_type: "story_rhyme"
intended_age_band: "12-23m"
domain: "language"
source:
  title: "The National Early Learning Framework of the Philippines (NELF)"
  organization: "ECCD Council"
  url: TODO
  accessed: TODO
  edition_date: "2010 Edition"
  exact_locator: "Annex 4, Page 81, Receptive Language Indicators (13-24 months)"
  locator: TODO
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
  edition_date: "2015 Edition"
  exact_locator: "LRP 3, Page 89, Kitchen Household Play"
  locator: TODO
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
  exact_locator: "Annex 4, Page 89, Receptive Language Indicators (25-36 months)"
  locator: TODO
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
  exact_locator: "Annex 4, Page 90, Concept Formation"
  locator: TODO
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
  exact_locator: "Annex 4, Page 95, Gross Motor Skills (37-71 months) [locator to be re-checked against the PDF (@vincenttamano)]"
  locator: TODO
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
  exact_locator: "Annex 4, Page 106, Interpersonal Values / Pakikipagkapwa [locator to be re-checked against the PDF (@vincenttamano)]"
  locator: TODO
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
  exact_locator: "Annex 4, Page 96, Fine Motor Skills [locator to be re-checked against the PDF (@vincenttamano)]"
  locator: TODO
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
item_type: "story_rhyme"
intended_age_band: "48-59m"
domain: "language"
source:
  title: "The National Early Learning Framework of the Philippines (NELF)"
  organization: "ECCD Council"
  url: TODO
  accessed: TODO
  edition_date: "2010 Edition"
  exact_locator: "Annex 4, Page 97, Expressive Language"
  locator: TODO
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
  url: TODO
  accessed: TODO
  edition_date: "2024 Edition (DepEd Order No. 010, s. 2024)"
  exact_locator: "Foundational Literacy Domain, Competency: Letter-Sound Association; cross-referenced with NELF Annex 4, p. 98"
  # competency code not recorded; locator TODO for Vincent
  locator: TODO
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
  exact_locator: "Annex 4, Page 101, Creative Thought & Problem Solving"
  locator: TODO
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
3. **Primary Source Documents Author-Checked:** NELF (2010), NELC LRP 3 (2015), and the DepEd MATATAG Kindergarten Curriculum Guide (2024) were checked by the author. Page and Annex locators are recorded but several are flagged for re-check, and public URLs and access dates are `TODO`. Other LRPs are identified but not inspected.
4. **Item-Level Source-Checked Candidates (`source_checked`):** Candidate activities across all 7 LittleSteps UX bands are drafted into the provenance YAML schema. They are author-checked only and await subject-matter adviser review; Docs Issue #3 stays open until that review happens.
5. **Operational Gating to Production (`approved`):** While engineering tracks (API, React, Flutter) operate safely using clearly labeled `synthetic_fixture` records with *"Provisional Academic Reference — Pending Review"*, no production catalog item will be marked `approved` without formal faculty / early childhood subject-matter reviewer sign-off.
6. **Automated Documentation CI Active:** The documentation repository (`littlesteps-docs`) runs automated verification on pull requests and pushes via GitHub Actions (`Docs CI/verify`), validating relative internal link integrity, image references, and issue template structure.
