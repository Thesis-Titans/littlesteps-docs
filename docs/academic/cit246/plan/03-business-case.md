# 3. Project Background and Business Case

**Plan section:** 3 ◆ (Checkpoint 2)  
**Version:** 0.1 draft, 23 October 2026  
**Status:** Draft for team review. Figures marked *planning estimate* are assumptions until the client interview confirms them (see §3.6).  
**Related Documents:** [Project Charter](04-project-charter.md), [Stakeholder Register](05-stakeholder-register.md), [Scope Statement](06-scope-statement.md), [Checkpoint 1 Concept](../checkpoint-1-concept.md)

---

## 3.1 The Organization

The client is a **barangay Child Development Center (CDC)** in Iloilo City and the **Child Development Worker (CDW) network** that supervises it. CDCs run the community-based early childhood care and development (ECCD) program for children below five years old, under the oversight of the city's social welfare office and within the national ECCD system set by Republic Act No. 12199, the ECCD System Act of 2025.

What the center does:

- Runs daily early-learning sessions for enrolled children, led by one or more Child Development Workers.
- Tracks each child's development with the ECCD Checklist at set points in the school year.
- Gives parents and home caregivers ideas for learning at home, mostly through printed handouts, notebooks and group chats.

How it handles the problem today: home observations live in paper notebooks and loose sheets that families bring to the center when they remember. Home-learning ideas are shared one handout or chat message at a time. There is no record a caregiver can keep, look back on, or bring to a pediatrician or health worker.

## 3.2 The Problem

Caregivers of children aged 0–5 want to support their child's learning at home, but the tools they have are scattered, easy to lose and not made for their situation. Three problems follow:

1. **Observation records are fragmented and get lost.** Notebooks and loose sheets are misplaced, damaged or left at home, so neither the caregiver nor the CDW has a continuous picture of what the child has been doing.
2. **Caregivers run out of low-cost, screen-free ideas.** Without age-appropriate activities that use ordinary household materials, families fall back on passive phone or TV time.
3. **Available apps are unsafe or misleading.** Popular baby-tracking apps are built for other countries, are rarely in Filipino or Hiligaynon, may monetize children's data, and often show pseudo-clinical scores or pass/fail labels that cause anxiety without being valid screening tools.

### Quantifying the problem

These are the measures the business case rests on. The center's own numbers replace the planning estimates after the client interview.

| Measure | Planning estimate | How the team will confirm it |
|---|---|---|
| Children enrolled at the pilot CDC | 30 children across two sessions | Enrollment list from the CDW (count only, no names) |
| Families with an Android smartphone | 70% of enrolled families | Short show-of-hands survey at a parents' meeting |
| Home-learning notebooks lost or not brought back per school year | 1 in 4 families | CDW recollection, checked against the center's records |
| CDW time spent preparing and sharing home-activity handouts | 2 hours a week | CDW interview |
| Printing cost of home-activity handouts | ₱150 per family per school year | Center expense records or CDW estimate |
| Caregivers who say they lack activity ideas at least once a week | 1 in 2 caregivers | Five to eight caregiver interviews during the walkthrough |

At these estimates, one CDC loses the home record of about 8 children a year, a CDW spends about 80 hours a school year (40 weeks × 2 hours) on handouts, and printing costs about ₱4,500 a year per center. Across a network of 10 centers, that is roughly 80 lost records, 800 CDW hours and ₱45,000 in printing every school year.

## 3.3 Options Considered

| Option | What it means | One-time cost (rough order of magnitude) | Main drawback |
|---|---|---|---|
| **A. Do nothing** | Keep paper notebooks, handouts and group chats | ₱0 | Every problem in §3.2 continues; lost records and CDW handout time recur every year |
| **B. Improve the paper process** | A printed home-learning booklet with an activity bank and an observation log per family | About ₱60,000 to design and print for 10 centers | Still lost or damaged; no reminders or search; reprinting every year; no way to tailor ideas to the materials a family has |
| **C. Recommend an existing commercial app** | Point caregivers to a free international baby-tracking app | ₱0 to the center | Not Philippine content or languages; unclear data use under the Data Privacy Act of 2012 (RA 10173); many show diagnostic-style scores |
| **D. Build LittleSteps (recommended)** | A Flutter Android app for caregivers with a reviewed Philippine activity catalog, private observation journal and a constrained AI activity helper, on a small shared backend | About ₱1.17 million over 8 months (§3.5); refined bottom-up in Section 9 | Highest cost and needs a maintainer after handover |

### Weighted scoring

Each option is scored from 1 (poor) to 10 (strong) against criteria agreed with the sponsor. Weights add up to 100%.

| Criterion | Weight | A. Do nothing | B. Paper booklet | C. Commercial app | D. LittleSteps |
|---|---|---|---|---|---|
| Keeps a lasting, private record for each caregiver | 25% | 2 | 4 | 6 | 9 |
| Philippine, low-cost, age-banded activity content | 20% | 3 | 7 | 3 | 9 |
| Child data protection under RA 10173, no diagnostic labels | 20% | 6 | 8 | 3 | 9 |
| Cost to the organization | 20% | 10 | 7 | 9 | 3 |
| Fits caregivers' phones, time and languages | 15% | 4 | 6 | 5 | 8 |
| **Weighted score** | **100%** | **4.90** | **6.30** | **5.25** | **7.65** |

## 3.4 Recommendation

**Build LittleSteps (Option D).** It scores highest because it is the only option that gives caregivers a record they keep, Philippine activity content they can search by the materials they already have, and explicit protection against diagnostic labelling and misuse of children's data. Option B is the strongest fallback: if the sponsor cannot fund Option D, the reviewed activity catalog prepared in this project can be printed as a booklet.

The project is justified on cost-effectiveness rather than direct revenue, because the center earns nothing from home learning. The measures in §3.2 become the benefit baseline: the project succeeds if the pilot reduces lost records and CDW handout time, and caregivers use the app weekly (see the charter's success criteria).

## 3.5 Cost and Benefit Summary

**Rough order-of-magnitude estimate (−25% to +75%)**, refined bottom-up by WBS item in Section 9:

| Cost item | Basis | Amount |
|---|---|---|
| Project manager | 1 person × 8 months × ₱40,000 | ₱320,000 |
| Flutter and backend developers | 2 people × 7 months × ₱30,000 | ₱420,000 |
| UI/UX designer | Half time × 4 months × ₱30,000 | ₱60,000 |
| Quality assurance tester | Half time × 4 months × ₱25,000 | ₱50,000 |
| ECCD content reviewer | Honorarium for reviewing the activity catalog | ₱60,000 |
| Data privacy review | Privacy impact assessment support | ₱50,000 |
| Cloud and AI services for testing and pilot | Firebase pay-as-you-go plan and paid Gemini tier, about ₱5,000 a month for 6 months | ₱30,000 |
| Test devices | Three entry-level Android phones | ₱30,000 |
| Pilot and training logistics | Printing, venue and snacks for caregiver and CDW sessions | ₱40,000 |
| Google Play developer registration | One-time fee | ₱1,500 |
| **Subtotal** | | **₱1,061,500** |
| Contingency reserve | 10% of subtotal | ₱106,150 |
| **Total** | | **₱1,167,650** |

**Benefits, at the planning estimates for a 10-center network:** about 800 CDW hours a year freed from preparing handouts, ₱45,000 a year in printing avoided, and about 80 fewer lost home records a year. These benefits are mostly non-financial: caregivers keep a continuous record, children get more screen-free play, and families avoid apps that misuse data or mislabel their child.

**Running cost after handover:** about ₱5,000 a month for cloud and AI services at pilot scale, plus a maintainer's time (named in Section 15).

## 3.6 Evidence Still Needed

- Interview the CDW supervisor and at least one CDW to replace every planning estimate in §3.2 with the center's own numbers, and record the interview in Appendix 17.
- Confirm the sponsor's name and office, and whether funding would come from the barangay, the city social welfare office or a grant.
- Re-score the options in §3.3 with the sponsor's own weights.
