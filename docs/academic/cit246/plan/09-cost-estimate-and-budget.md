# 9. Cost Estimate and Budget

All amounts are in Philippine pesos.

## 9.1 Estimating Method

The method is **bottom-up** for every work package: duration × the share of each role assigned × that role's daily rate, plus any quoted non-labour cost, rolled up through levels 2 and 1 to the baseline. Durations were set **parametrically** (for example 80 catalog items at about 3 hours each), **by analogy** with the team's course build, or by **expert judgment** (Section 8.2). Monitoring and control (1.3) is a level-of-effort cost over the whole execution period.

| Role | Daily rate | Basis |
|---|---|---|
| Project manager | ₱1,820 | ₱40,000/month ÷ 22 working days, rounded |
| Business analyst and quality lead | ₱1,365 | ₱30,000/month ÷ 22, rounded |
| Stakeholder and content coordinator | ₱1,275 | ₱28,000/month ÷ 22, rounded |
| Flutter and backend developer, each | ₱1,365 | ₱30,000/month ÷ 22, rounded |
| UI/UX designer | ₱1,365 | ₱30,000/month ÷ 22, rounded |
| QA tester | ₱1,135 | ₱25,000/month ÷ 22, rounded |

## 9.2 Cost Estimate by WBS Item

Each level-1 branch is shown with the work packages that carry non-labour costs. The cost of all 49 work packages is in the activity table in Section 8.2, and its labour and other-cost split is in [schedule-and-cost.csv](data/schedule-and-cost.csv) (Appendix D) and sums to these branch totals.

| WBS | Item | Method | Labour | Other costs | Total |
|---|---|---|---:|---:|---:|
| **1.0** | **Project Management** | Analogous; level of effort | ₱186,512 | ₱0 | ₱186,512 |
| **2.0** | **Requirements and Design** | Parametric; analogous; expert judgment | ₱98,020 | ₱50,000 | ₱148,020 |
| 2.3.1 | Privacy impact assessment draft (consultant) | Expert judgment | ₱10,465 | ₱50,000 | ₱60,465 |
| **3.0** | **Learning Content Catalog** | Parametric | ₱69,436 | ₱108,000 | ₱177,436 |
| 3.2.2 | Translate items to Filipino and Hiligaynon (160 × ₱300) | Parametric | ₱5,738 | ₱48,000 | ₱53,738 |
| 3.3.1 | Content reviewer sign-off (80 items × ₱750) | Parametric | ₱3,825 | ₱60,000 | ₱63,825 |
| **4.0** | **Backend API and Database** | Analogous | ₱96,915 | ₱10,000 | ₱106,915 |
| 4.1.2 | Cloud project, environments and CI (2 months × ₱5,000) | Analogous | ₱4,095 | ₱10,000 | ₱14,095 |
| **5.0** | **Flutter Android App** | Analogous | ₱75,075 | ₱0 | ₱75,075 |
| **6.0** | **Testing and Quality** | Parametric; expert judgment | ₱65,604 | ₱30,000 | ₱95,604 |
| 6.2.1 | Device and accessibility testing (three Android phones) | Parametric | ₱9,267 | ₱30,000 | ₱39,267 |
| **7.0** | **Pilot** | Parametric; analogous | ₱78,740 | ₱40,000 | ₱118,740 |
| 7.1.1 | Pilot onboarding at two centers (printing, venue, snacks) | Parametric | ₱9,105 | ₱20,000 | ₱29,105 |
| 7.2.1 | Eight-week pilot with support (cloud and AI, 4 months × ₱5,000) | Parametric | ₱60,080 | ₱20,000 | ₱80,080 |
| **8.0** | **Release, Training and Handover** | Parametric; analogous; expert judgment | ₱54,912 | ₱21,500 | ₱76,412 |
| 8.1.1 | Training materials, D9 (printing) | Parametric | ₱16,845 | ₱20,000 | ₱36,845 |
| 8.2.2 | Google Play release, D10 (registration, US$25) | Analogous | ₱3,140 | ₱1,500 | ₱4,640 |
| | **Subtotal** | | **₱725,214** | **₱259,500** | **₱984,714** |
| | **Contingency reserve (10% of subtotal)** | | | | **₱98,471** |
| | **Total budget** | | | | **₱1,083,185** |

The bottom-up total of **₱1,083,185** is 7.2% below the business case's rough order-of-magnitude estimate of ₱1,167,650, inside its −25% to +75% range, and replaces that estimate in the charter.

## 9.3 Cost Baseline

Each work package's cost is spread evenly over its working days, and monthly figures are rounded to add up to the baseline. The sponsor holds the contingency reserve outside the time-phased baseline.

| Month | Planned cost | Cumulative cost |
|---|---|---|
| January 2027 | ₱116,592 | ₱116,592 |
| February 2027 | ₱217,168 | ₱333,760 |
| March 2027 | ₱159,404 | ₱493,164 |
| April 2027 | ₱121,656 | ₱614,820 |
| May 2027 | ₱170,444 | ₱785,264 |
| June 2027 | ₱74,250 | ₱859,514 |
| July 2027 | ₱62,881 | ₱922,395 |
| August 2027 | ₱62,319 | ₱984,714 |
| **Baseline (excluding contingency)** | | **₱984,714** |

The S-curve of this baseline and the ₱1,083,185 budget are drawn under the Gantt chart in Figure 8.2 (Section 8.4).

## 9.4 Assumptions

- Rates are assumptions for contracted staff in Iloilo City in 2027, from monthly pay of ₱25,000–₱40,000 and 22 working days a month, to be checked against local job postings.
- The three project-team roles are costed as if paid, so the budget shows the full cost of the project.
- The content reviewer is paid ₱750 per catalog item and the translator ₱300 per item per language (80 items, 2 languages).
- The privacy consultant's fee of ₱50,000 is an estimate, not a quote.
- Cloud and AI services cost about ₱5,000 a month for 6 months of testing, pilot and release, at pilot scale and October 2026 prices.
- Three entry-level Android phones cost about ₱10,000 each. The Google Play registration is US$25 (about ₱1,500).
- No office space, computers or internet are costed: the team uses its own equipment, and sessions are held at the pilot centers.
- Costs after the handover date, such as hosting and maintenance, are outside the budget (see the scope statement).
- The 10% contingency reserve covers known risks in the risk register (Section 13). A management reserve for unknown risks is the sponsor's decision and is not included.
