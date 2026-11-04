# 3. Project Background and Business Case

## 3.1 The Organization

The client is the **Iloilo City Social Welfare and Development Office (CSWDO), La Paz–Lapuz District office**, which supervises the barangay Child Development Centers (CDCs) and their Child Development Workers (CDWs) in the La Paz and Lapuz districts. The project pilots at **two CDCs in La Paz barangays** chosen with the office. CDCs run the early childhood care and development (ECCD) program for children below five under Republic Act No. 12199, the ECCD System Act of 2025.

**The district.** La Paz has 25 barangays (population 58,098 in 2024) and Lapuz has 12 (31,603), so the office serves 37 barangays and about 89,700 people. With roughly one center per barangay, the district has an estimated **37 centers** (planning estimate).

**The city.** Iloilo City has 7 districts, 180 barangays and about 474,000 people (2024), and reports **more than 200 operating ECCD centers** (January 2026). 

**The legal setting.** The implementing rules of RA 12199, signed on 5 August 2026, require every city to set up a local **ECCD office** and keep child care facilities running. ECCD may be funded from local funds, the Special Education Fund and the Gender and Development Fund. The new city ECCD office is the natural owner of any citywide rollout.

**The workforce.** Nationally there are about 89,000 child development workers against an estimated need of 240,000, and many lack up-to-date training, so a tool must save CDW time.

**How the center handles the problem today.** Each center runs daily early-learning sessions and tracks each child with the ECCD Checklist. Home-learning ideas reach parents through printed handouts, notebooks and group chats, and home observations live in paper notebooks and loose sheets. There is no record a caregiver can keep or bring to a pediatrician or health worker.

## 3.2 The Problem

Parents of children aged 0–5, and the grandparents or guardians who help some of them, want to support learning at home, but their tools are scattered and easy to lose:

1. **Observation records are fragmented and get lost.** Notebooks and loose sheets are misplaced, so neither parent nor CDW has a continuous picture of the child.
2. **Parents run out of low-cost, screen-free ideas.** Without age-appropriate activities using household materials, families fall back on phone or TV time.
3. **Available apps are unsafe or misleading.** Popular baby-tracking apps are rarely in Filipino or Hiligaynon, may monetize children's data, and often show pseudo-clinical scores that cause anxiety without being valid screening tools.

### Quantifying the problem

Figures are planning estimates reported in the October 2026 interviews (Appendix A).

| Measure | Planning estimate |
|---|---|
| Children enrolled at each pilot CDC | 30 across two sessions (60 across both pilot centers) |
| Families with an Android smartphone | 70% of enrolled families |
| Home-learning notebooks lost or not brought back per school year | 1 in 4 families |
| CDW time preparing and sharing home-activity handouts | 2 hours a week |
| Printing cost of handouts | ₱150 per family per school year |
| Parents who lack activity ideas at least once a week | 1 in 2 |

At these estimates, one CDC loses about 8 children's home records a year, a CDW spends about 80 hours a school year (40 weeks × 2 hours) on handouts, and printing costs about ₱4,500 a year per center. Across the district's 37 centers, that is roughly 296 lost records, 2,960 CDW hours and ₱166,500 in printing every school year. For the city's 200 or more centers: roughly 1,600 lost records, 16,000 CDW hours and ₱900,000 a year.

## 3.3 Options Considered

| Option | What it means | One-time cost (rough) | Main drawback |
|---|---|---|---|
| **A. Do nothing** | Keep notebooks, handouts, group chats | ₱0 | Every problem in §3.2 continues |
| **B. Improve the paper process** | A printed booklet with an activity bank and observation log | About ₱40,000 to design, plus about ₱4,500 a year per center to print (₱900,000 a year for 200 centers) | Still lost or damaged; no search; reprinted yearly; ideas not tailored to a family's materials |
| **C. Recommend an existing commercial app** | Point parents to a free foreign baby app | ₱0 to the center | Not Philippine content or languages; unclear data use under the Data Privacy Act of 2012 (RA 10173); diagnostic-style scores |
| **D. Build LittleSteps (recommended)** | A Flutter app with a reviewed Philippine activity catalog, private observation journal and constrained AI activity helper | About ₱1.17 million over 8 months (§3.5); refined bottom-up in Section 9 | Highest cost; needs a maintainer |

### Weighted scoring

Scores run from 1 (poor) to 10 (strong); the team's criteria will be re-weighted with the sponsor (§3.6).

| Criterion | Weight | A. Do nothing | B. Paper booklet | C. Commercial app | D. LittleSteps |
|---|---|---|---|---|---|
| Lasting, private record for each family | 25% | 2 | 4 | 6 | 9 |
| Philippine, low-cost, age-banded content | 20% | 3 | 7 | 3 | 9 |
| Data protection (RA 10173), no diagnostic labels | 20% | 6 | 8 | 3 | 9 |
| Cost to the organization | 20% | 10 | 6 | 9 | 3 |
| Fits parents' phones, time, languages | 15% | 4 | 6 | 5 | 8 |
| **Weighted score** | **100%** | **4.90** | **6.10** | **5.25** | **7.65** |

## 3.4 Recommendation

**Build LittleSteps (Option D).** It scores highest because it alone gives parents a record they keep, Philippine activity content searchable by materials at hand, and protection against diagnostic labels and misuse of children's data. Option B is the fallback: if the sponsor cannot fund Option D, the reviewed catalog can be printed as a booklet.

The project is justified on cost-effectiveness, not revenue. The measures in §3.2 are the benefit baseline: the project succeeds if the pilot reduces lost records and CDW handout time and caregivers use the app weekly (see the charter's success criteria).

## 3.5 Cost and Benefit Summary

**Rough order-of-magnitude estimate (−25% to +75%)**, made before the WBS existed. Section 9 replaces it with a bottom-up estimate of **₱1,083,185**, 7.2% lower and inside this range.

| Cost item | Amount |
|---|---|
| Project manager (1 × 8 months × ₱40,000) | ₱320,000 |
| Flutter and backend developers (2 × 7 months × ₱30,000) | ₱420,000 |
| UI/UX designer (half time × 4 months × ₱30,000) | ₱60,000 |
| QA tester (half time × 4 months × ₱25,000) | ₱50,000 |
| ECCD content reviewer honorarium | ₱60,000 |
| Data privacy review | ₱50,000 |
| Cloud and AI services (6 × ₱5,000) | ₱30,000 |
| Three Android test phones | ₱30,000 |
| Pilot and training logistics | ₱40,000 |
| Google Play developer registration | ₱1,500 |
| **Subtotal** | **₱1,061,500** |
| Contingency reserve (10%) | ₱106,150 |
| **Total** | **₱1,167,650** |

**Benefits (upper bounds, if the app fully replaces handouts):** per center, about 80 CDW hours and ₱4,500 in printing a year, and 8 fewer lost records. The charter targets a 50% cut in CDW handout time, about 40 hours per center. If the app replaced printed handouts completely across 200 or more centers, printing savings alone would repay the project cost in about 14 months (₱1,083,185 ÷ ₱900,000 a year); if only the 70% of families with Android phones stopped printing, in about 21 months. Running costs are not deducted. Other benefits are non-financial.

**Running cost after handover:** about ₱5,000 a month for cloud and AI services at pilot scale, plus a maintainer's time (named in Section 15).

## 3.6 Basis of This Case

- **Client contact.** The team wrote to the district office on 12 October 2026, met the OIC District Head on 27 October and interviewed two CDWs and two parents on 28 and 29 October. The District Head wants a no-fee solution run by existing staff and a monthly summary report; the office has not committed funding, pilot centers or dates (Appendix A, Section 17).
- **Sourced:** city and district size, ECCD center numbers, the legal setting and workforce figures (see Sources). **Estimated:** the per-center figures in §3.2, the district's center count, the cost rates in §3.5 and the option scores in §3.3.
- **Confirmation:** in discovery interviews in the first two weeks (WBS 2.1.1, January 2027), confirm the sponsor, pilot centers and funding source (local funds, the two funds above or a grant), and re-score the options with the sponsor's weights.

## Sources

- Iloilo Today, 1 January 2026: https://www.iloilotoday.com/iloilo-city-programs-projects-for-ilonggo-children/
- Districts of Iloilo City: https://en.wikipedia.org/wiki/Districts_of_Iloilo_City
- CSWDO La Paz–Lapuz page: https://www.govserv.org/PH/Iloilo-City/649162218285374/CSWDO-Lapaz-Lapuz-District
- City population 2024: https://www.citypopulation.de/en/philippines/iloilo/
- Daily Tribune, 10 August 2026: https://tribune.net.ph/2026/08/10/dilg-deped-set-nationwide-standards-for-early-childhood-care
- Philippine Institute for Development Studies (PIDS): https://pids.gov.ph/details/news/in-the-news/phl-faces-shortage-of-33k-daycare-centers-study
- Republic Act No. 12199, ECCD System Act of 2025: https://lawphil.net/statutes/repacts/ra2025/ra_12199_2025.html
