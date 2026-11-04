# 13. Risk Register

## 13.1 Rating Scales

- **Probability:** 1 under 10%, 2 10–30%, 3 30–50%, 4 50–70%, 5 over 70%.
- **Impact:** 1 negligible; 2 minor (a few days or under ₱10,000); 3 moderate (up to two weeks or ₱50,000); 4 major (moves a milestone or over ₱50,000); 5 severe (project fails or children's data exposed).
- **Score** = probability × impact. Scores of 12 or more are reviewed at every two-weekly status meeting; the rest monthly.

## 13.2 Prioritized Risks

| Rank | ID | Risk | Category | P | I | Score | Owner | Response |
|---|---|---|---|---|---|---|---|---|
| 1 | R1 | The sponsor changes: the OIC District Head is an acting appointment, and a new head may not support the project | **Organization** | 3 | 5 | 15 | Project manager | **Mitigate:** ask the CSWDO city head office to co-endorse the charter; brief the district's next-in-line staff at each demo; keep every decision in writing. **Contingency:** re-baselining meeting within two weeks of a change. |
| 2 | R2 | Parents do not keep using the app: limited phone access or mobile data, or poor fit with their routines | **People** | 3 | 4 | 12 | Stakeholder and content coordinator | **Mitigate:** a small app with text-only activities; onboarding at the center; CDW reminders in weeks 1, 4 and 8; usability fixes before the pilot. **Contingency:** the reviewed catalog as a printed booklet (business case Option B). |
| 3 | R3 | CDWs resist the app, led by a senior CDW who prefers the paper system, and families follow | **People** | 3 | 4 | 12 | Stakeholder and content coordinator | **Mitigate:** the engagement plan in §5.3: co-review of content, a written commitment that usage never evaluates CDWs, paper kept for families without smartphones. **Contingency:** if the objection remains at the first check-in, the sponsor meets the CDW and supervisor and the pilot continues at the other center. |
| 4 | R4 | Funding is not released on time, since LGU funds (Special Education Fund, Gender and Development Fund) need annual budget approval | **Organization** | 3 | 4 | 12 | Project sponsor | **Avoid/mitigate:** confirm the funding source and release schedule before the charter is signed; pay contractors by accepted deliverable, so a delay pauses work instead of creating debt. |
| 5 | R5 | The DPO's approval of the privacy impact assessment is late or needs major changes, delaying the AI service on the critical path | Legal | 3 | 4 | 12 | Business analyst | **Mitigate:** start the assessment once requirements are done; pre-review meeting with the DPO; the privacy consultant reviews first. **Contingency:** release without the AI helper, using rule-based catalog picks, and add AI in an update. |
| 6 | R6 | A contracted developer leaves or underperforms, delaying critical-path work | **People** | 2 | 5 | 10 | Project manager | **Mitigate:** developers review each other's code; shared repository from day one; replacement clause in the contract (Section 14). **Contingency:** contingency reserve for a replacement. |
| 7 | R7 | Typhoons or heavy rain in the June–July pilot close centers or cancel sessions | Environment | 3 | 3 | 9 | Stakeholder and content coordinator | **Mitigate:** onboarding in late May; phone or chat check-ins when centers close. **Accept:** a week's closure is absorbed by the pilot's length. |
| 8 | R8 | Fewer than 80 catalog items are approved, because of reuse permissions or reviewer availability | Content | 3 | 3 | 9 | Stakeholder and content coordinator | **Mitigate:** two possible reviewers identified; sourcing starts in January; 9–11 days of float on the catalog path. **Contingency:** launch with at least 60 approved items, with the sponsor's agreement. |
| 9 | R9 | The app runs slowly on entry-level phones | Technical | 2 | 3 | 6 | Developer B | **Mitigate:** test on three entry-level phones from the start of 5.0; 3-second screen-load target (Section 10). |
| 10 | R10 | The AI provider changes its prices or terms, or has an outage | Technical | 2 | 3 | 6 | Developer A | **Mitigate:** the rule-based fallback keeps the helper working; monthly price check. **Accept:** small price changes are covered by the reserve. |
| 11 | R11 | A security flaw exposes children's or parents' data | Security | 1 | 5 | 5 | Project manager, with the DPO | **Avoid:** store only a nickname, an age band or birth month and year, and parents' entries; security review before release (6.3.1). **Contingency:** the incident process in Section 12.2. |

Five of the eleven risks concern people or the organization (R1, R2, R3, R4, R6) and one is environmental (R7), above the course minimum of three non-technical risks.

## 13.3 Top Risk

**R1, a change of sponsor, is the top risk.** Every part of the project runs through the sponsor: the pilot centers, the CDWs' time, access to the Data Protection Officer and the release of funds. An officer-in-charge is usually an acting appointment that can change at short notice, and a new head may have other priorities. The team cannot fix this by working harder; it can only reduce the damage, by getting the city head office to co-endorse the charter, keeping decisions in writing and briefing the people who would take over. It scores highest (15) because it is as likely as the people risks (probability 3) but more severe (impact 5): without a sponsor the pilot cannot start.

## 13.4 Reserves

The 10% contingency reserve (₱98,471, Section 9) covers the contingency responses above, such as replacing a developer (R6) or printing the booklet (R2). The project manager may spend under ₱10,000 of it on a single risk; ₱10,000–₱50,000 goes to the change control board, and more than ₱50,000 needs the sponsor's approval through change control (Section 15).
