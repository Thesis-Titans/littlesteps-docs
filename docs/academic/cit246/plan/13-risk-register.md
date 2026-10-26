# 13. Risk Register

**Plan section:** 13 ◆  
**Version:** 1.0 draft, 23 October 2026  
**Status:** Draft for team review. The register follows the prioritized-risk format in Schwalbe, *Information Technology Project Management*, Table 3-10, with probability and impact rated as in Chapter 11.  
**Related Documents:** [Stakeholder Register](05-stakeholder-register.md), [Schedule](08-schedule.md), [Cost Estimate and Budget](09-cost-estimate-and-budget.md), [Communications Plan](12-communications-plan.md)

---

## 13.1 Rating Scales

- **Probability:** 1 very unlikely (under 10%), 2 unlikely (10–30%), 3 possible (30–50%), 4 likely (50–70%), 5 very likely (over 70%).
- **Impact:** 1 negligible; 2 minor (a few days or under ₱10,000); 3 moderate (up to two weeks or ₱50,000); 4 major (moves a milestone or over ₱50,000); 5 severe (the project fails or children's data is exposed).
- **Score** = probability × impact. Scores of 12 or more are reviewed at every two-weekly status meeting; the rest monthly.

## 13.2 Prioritized Risks

| Rank | ID | Risk | Category | P | I | Score | Owner | Response |
|---|---|---|---|---|---|---|---|---|
| 1 | R1 | The sponsor changes: the OIC District Head is an acting appointment and could be replaced, and a new head may not support the project | **Organization** | 3 | 5 | 15 | Project manager | **Mitigate:** ask the CSWDO city head office to co-endorse the charter; brief the district's next-in-line staff at each demo; keep every decision in writing so a new sponsor can pick up the project. **Contingency:** if the sponsor changes, hold a re-baselining meeting within two weeks. |
| 2 | R2 | Parents do not keep using the app: limited phone access or mobile data, or the app does not fit their routines | **People** | 3 | 4 | 12 | Stakeholder and content coordinator | **Mitigate:** a small app with text-only activities; onboarding at the center; reminders through CDWs in weeks 1, 4 and 8; usability fixes before the pilot. **Contingency:** offer the reviewed catalog as a printed booklet (the business case's Option B). |
| 3 | R3 | CDWs resist the app, led by a senior CDW who prefers the paper system, and families follow their lead | **People** | 3 | 4 | 12 | Stakeholder and content coordinator | **Mitigate:** the engagement plan in §5.3: co-review of content, a written commitment that usage is never used to evaluate CDWs, and keeping paper for families without smartphones. |
| 4 | R4 | Funding is not released on time, because LGU funds such as the Special Education Fund or the Gender and Development Fund need approval in the annual budget | **Organization** | 3 | 4 | 12 | Project sponsor | **Avoid/mitigate:** confirm the funding source and its release schedule before the charter is signed; pay contractors by accepted deliverable, so a delay pauses work instead of creating debt. |
| 5 | R5 | The Data Protection Officer's approval of the privacy impact assessment is late or needs major changes, delaying the AI service on the critical path | Legal | 3 | 4 | 12 | Business analyst | **Mitigate:** start the assessment as soon as the requirements are done; a pre-review meeting with the DPO; the privacy consultant reviews it first. **Contingency:** release without the AI helper, using only the rule-based catalog picks, and add AI in an update. |
| 6 | R6 | A contracted developer leaves or underperforms, delaying critical-path work | **People** | 2 | 5 | 10 | Project manager | **Mitigate:** each developer reviews the other's code; all code in a shared repository from day one; a replacement clause in the contract (Section 14). **Contingency:** use the contingency reserve for a replacement at short notice. |
| 7 | R7 | Typhoons or heavy rain during the June–August pilot close centers or cancel sessions | Environment | 3 | 3 | 9 | Stakeholder and content coordinator | **Mitigate:** onboarding in late May before the peak of the rainy season; check-ins by phone or chat when centers are closed. **Accept:** a week's closure is absorbed by the pilot's length. |
| 8 | R8 | Fewer than 80 catalog items are approved, because of reuse permissions or reviewer availability | Content | 3 | 3 | 9 | Stakeholder and content coordinator | **Mitigate:** identify two possible reviewers; start sourcing in January; use the 9–11 days of float on the catalog path. **Contingency:** launch with at least 60 approved items, with the sponsor's agreement. |
| 9 | R9 | The app runs slowly on entry-level phones | Technical | 2 | 3 | 6 | Developer B | **Mitigate:** test on three entry-level phones from the start of 5.0; set a 3-second screen-load target (Section 10). |
| 10 | R10 | The AI provider changes its prices or terms, or has an outage | Technical | 2 | 3 | 6 | Developer A | **Mitigate:** the rule-based fallback keeps the helper working; check prices monthly. **Accept:** small price changes are covered by the reserve. |
| 11 | R11 | A security flaw exposes children's or parents' data | Security | 1 | 5 | 5 | Project manager, with the DPO | **Avoid:** store only a nickname, an age band or birth month and year, and parents' own entries; a security review before release (6.3.1). **Contingency:** the incident process in Section 12.2: DPO informed within 24 hours. |

Five of the eleven risks are about people or the organization (R1, R2, R3, R4, R6), and one is environmental (R7). This exceeds the course requirement of at least three non-technical risks.

## 13.3 Top Risk

**R1, a change of sponsor, is the top risk.** Every part of the project runs through the sponsor: the choice of pilot centers, the CDWs' time, access to the Data Protection Officer and the release of funds. The sponsor is an officer-in-charge, which in local government usually means an acting appointment that can change at short notice, and a new head may have other priorities. Unlike technical risks, the project team cannot fix this by working harder; it can only reduce the damage, by getting the city head office to co-endorse the charter, keeping decisions in writing, and briefing the people who would take over. It scores highest because it is as likely as the people risks and its impact is the most severe: without a sponsor the pilot cannot start.

## 13.4 Reserves

The 10% contingency reserve (₱98,471, Section 9) covers the contingency responses above, such as replacing a developer (R6) or printing the booklet (R2). The project manager may spend under ₱10,000 of it on a single risk without affecting a milestone; larger amounts (₱10,000–₱50,000) go to the change control board, and amounts over ₱50,000 need the sponsor's approval through change control (Section 15).
