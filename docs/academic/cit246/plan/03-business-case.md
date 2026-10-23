# 3. Project Background and Business Case

**Plan section:** 3 ◆ (Checkpoint 2)  
**Version:** 0.1 draft, 23 October 2026  
**Status:** Draft for team review. Figures marked *planning estimate* are assumptions until the client interview confirms them (see §3.6).  
**Related Documents:** [Project Charter](04-project-charter.md), [Stakeholder Register](05-stakeholder-register.md), [Scope Statement](06-scope-statement.md), [Checkpoint 1 Concept](../checkpoint-1-concept.md)

---

## 3.1 The Organization

The client is the **Iloilo City Social Welfare and Development Office (CSWDO), La Paz–Lapuz District office**, which supervises the barangay Child Development Centers (CDCs) and their Child Development Workers (CDWs) in the La Paz and Lapuz districts. The project pilots at **two Child Development Centers in La Paz barangays**, chosen with the district office. CDCs run the community-based early childhood care and development (ECCD) program for children below five years old, within the national ECCD system set by Republic Act No. 12199, the ECCD System Act of 2025.

**The district.** La Paz has 25 barangays (population 58,098 in 2024) and Lapuz has 12 (31,603), so the district office serves 37 barangays and about 89,700 people. The office runs training for its CDWs and day care teachers, such as a summer workshop for them. Across the city the ratio is roughly one center per barangay, so the district has an estimated **37 centers** (planning estimate; confirm the count with the district office). WVSU is in La Paz, which keeps the pilot centers within easy reach of the project team.

**The city network.** Iloilo City has 7 districts and 180 barangays, with a population of about 474,000 (2024, as reported from Philippine Statistics Authority figures). The city government reports **more than 200 operating ECCD centers** (January 2026) and is still building new ones. The CSWDO works through district offices like this one, so a successful pilot in La Paz–Lapuz can be extended to the other districts.

**A changing legal setting.** The implementing rules of RA 12199, signed on 5 August 2026, require every city to set up a local **ECCD office** and to keep its child care facilities running. ECCD may be funded from local funds, the Special Education Fund and the Gender and Development Fund, and the Department of the Interior and Local Government (DILG) monitors compliance through the Seal of Good Local Governance. This makes ECCD a funded, monitored priority for the city. The district office sponsors the project; the new city ECCD office is the natural owner of any citywide rollout.

**The workforce.** Nationally there are about 89,000 child development workers against an estimated need of 240,000 for universal access. Their pay varies by local government, and many lack up-to-date training. A tool that saves CDWs time on home-learning handouts, without adding reporting work, fits that situation.

What the center does:

- Runs daily early-learning sessions for enrolled children, led by one or more Child Development Workers.
- Tracks each child's development with the ECCD Checklist at set points in the school year.
- Gives parents and home caregivers ideas for learning at home, mostly through printed handouts, notebooks and group chats.

How it handles the problem today: home observations live in paper notebooks and loose sheets that families bring to the center when they remember. Home-learning ideas are shared one handout or chat message at a time. There is no record a caregiver can keep, look back on, or bring to a pediatrician or health worker.

## 3.2 The Problem

Parents of children aged 0–5, and the grandparents, relatives or guardians who help some of them, want to support their child's learning at home, but the tools they have are scattered, easy to lose and not made for their situation. Three problems follow:

1. **Observation records are fragmented and get lost.** Notebooks and loose sheets are misplaced, damaged or left at home, so neither the parent nor the CDW has a continuous picture of what the child has been doing.
2. **Parents run out of low-cost, screen-free ideas.** Without age-appropriate activities that use ordinary household materials, families fall back on passive phone or TV time.
3. **Available apps are unsafe or misleading.** Popular baby-tracking apps are built for other countries, are rarely in Filipino or Hiligaynon, may monetize children's data, and often show pseudo-clinical scores or pass/fail labels that cause anxiety without being valid screening tools.

### Quantifying the problem

These are the measures the business case rests on. The center's own numbers replace the planning estimates after the client interview.

| Measure | Planning estimate | How the team will confirm it |
|---|---|---|
| Children enrolled at each pilot CDC | 30 children across two sessions (60 across both pilot centers) | Enrollment list from the CDW (count only, no names) |
| Families with an Android smartphone | 70% of enrolled families | Short show-of-hands survey at a parents' meeting |
| Home-learning notebooks lost or not brought back per school year | 1 in 4 families | CDW recollection, checked against the center's records |
| CDW time spent preparing and sharing home-activity handouts | 2 hours a week | CDW interview |
| Printing cost of home-activity handouts | ₱150 per family per school year | Center expense records or CDW estimate |
| Parents who say they lack activity ideas at least once a week | 1 in 2 parents | Five to eight parent interviews during the walkthrough |

At these estimates, one CDC loses the home record of about 8 children a year, a CDW spends about 80 hours a school year (40 weeks × 2 hours) on handouts, and printing costs about ₱4,500 a year per center. Across the district's estimated 37 centers, that is roughly 296 lost records, 2,960 CDW hours and ₱166,500 in printing every school year. If the app is later extended to the city's 200 or more centers, the same estimates add up to roughly 1,600 lost records, 16,000 CDW hours and ₱900,000 a year.

## 3.3 Options Considered

| Option | What it means | One-time cost (rough order of magnitude) | Main drawback |
|---|---|---|---|
| **A. Do nothing** | Keep paper notebooks, handouts and group chats | ₱0 | Every problem in §3.2 continues; lost records and CDW handout time recur every year |
| **B. Improve the paper process** | A printed home-learning booklet with an activity bank and an observation log per family | About ₱40,000 to design once, plus about ₱4,500 a year per center to print (₱900,000 a year for 200 centers) | Still lost or damaged; no reminders or search; reprinting every year; no way to tailor ideas to the materials a family has |
| **C. Recommend an existing commercial app** | Point parents to a free international baby-tracking app | ₱0 to the center | Not Philippine content or languages; unclear data use under the Data Privacy Act of 2012 (RA 10173); many show diagnostic-style scores |
| **D. Build LittleSteps (recommended)** | A Flutter Android app for parents and other caregivers with a reviewed Philippine activity catalog, private observation journal and a constrained AI activity helper, on a small shared backend | About ₱1.17 million over 8 months (§3.5); refined bottom-up in Section 9 | Highest cost and needs a maintainer after handover |

### Weighted scoring

Each option is scored from 1 (poor) to 10 (strong) against criteria agreed with the sponsor. Weights add up to 100%.

| Criterion | Weight | A. Do nothing | B. Paper booklet | C. Commercial app | D. LittleSteps |
|---|---|---|---|---|---|
| Keeps a lasting, private record for each family | 25% | 2 | 4 | 6 | 9 |
| Philippine, low-cost, age-banded activity content | 20% | 3 | 7 | 3 | 9 |
| Child data protection under RA 10173, no diagnostic labels | 20% | 6 | 8 | 3 | 9 |
| Cost to the organization | 20% | 10 | 6 | 9 | 3 |
| Fits parents' phones, time and languages | 15% | 4 | 6 | 5 | 8 |
| **Weighted score** | **100%** | **4.90** | **6.10** | **5.25** | **7.65** |

## 3.4 Recommendation

**Build LittleSteps (Option D).** It scores highest because it is the only option that gives parents a record they keep, Philippine activity content they can search by the materials they already have, and explicit protection against diagnostic labelling and misuse of children's data. Option B is the strongest fallback: if the sponsor cannot fund Option D, the reviewed activity catalog prepared in this project can be printed as a booklet.

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
| Pilot and training logistics | Printing, venue and snacks for parent and CDW sessions | ₱40,000 |
| Google Play developer registration | One-time fee | ₱1,500 |
| **Subtotal** | | **₱1,061,500** |
| Contingency reserve | 10% of subtotal | ₱106,150 |
| **Total** | | **₱1,167,650** |

**Benefits, at the planning estimates:** per center, about 80 CDW hours a year freed from preparing handouts, ₱4,500 a year in printing avoided, and about 8 fewer lost home records a year. Across the district's estimated 37 centers, that is about 2,960 CDW hours and ₱166,500 a year. If the city extends the app to all of its 200 or more centers after the pilot, that rises to about 16,000 CDW hours and ₱900,000 a year. Printing savings alone would cover the project cost in under two years of citywide use, before the running cost at that scale, which Section 9 estimates. These benefits are mostly non-financial: caregivers keep a continuous record, children get more screen-free play, and families avoid apps that misuse data or mislabel their child.

**Running cost after handover:** about ₱5,000 a month for cloud and AI services at pilot scale, plus a maintainer's time (named in Section 15).

## 3.6 Evidence Still Needed

- Interview the OIC District Head and at least one CDW from each pilot center to replace every planning estimate in §3.2 with the centers' own numbers, and record the interview in Appendix 17.
- Confirm that the OIC District Head agrees to act as sponsor and to be named, which two La Paz centers take part in the pilot, and whether funding would come from local funds, the Special Education Fund, the Gender and Development Fund or a grant.
- Confirm the number of centers and CDWs the district office supervises, and how many families each pilot center serves.
- Re-score the options in §3.3 with the sponsor's own weights.

## Sources

- Iloilo Today, "Iloilo City implements numerous programs, projects for Ilonggo children," 1 January 2026: https://www.iloilotoday.com/iloilo-city-programs-projects-for-ilonggo-children/
- Districts and barangays of Iloilo City, including the La Paz and Lapuz barangay counts and 2024 populations: https://en.wikipedia.org/wiki/Districts_of_Iloilo_City
- CSWDO La Paz–Lapuz District office public page (directory listing): https://www.govserv.org/PH/Iloilo-City/649162218285374/CSWDO-Lapaz-Lapuz-District
- Iloilo City 2024 population as reported from Philippine Statistics Authority figures: https://www.citypopulation.de/en/philippines/iloilo/
- Daily Tribune, "DILG, DepEd set nationwide standards for early childhood care," 10 August 2026: https://tribune.net.ph/2026/08/10/dilg-deped-set-nationwide-standards-for-early-childhood-care
- Philippine Institute for Development Studies, "PHL faces shortage of 33K daycare centers: study": https://pids.gov.ph/details/news/in-the-news/phl-faces-shortage-of-33k-daycare-centers-study
- Republic Act No. 12199, ECCD System Act of 2025: https://lawphil.net/statutes/repacts/ra2025/ra_12199_2025.html
