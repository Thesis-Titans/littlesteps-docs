# 15. Change Control and Closing Plan

**Plan section:** 15  
**Version:** 1.0 draft, 23 October 2026  
**Status:** Draft for team review. Closing follows the course's "Closing: making it official" material and Schwalbe, *Information Technology Project Management*, Chapter 3.  
**Related Documents:** [Scope Statement](06-scope-statement.md), [Communications Plan](12-communications-plan.md), [Risk Register](13-risk-register.md)

---

## 15.1 Change Control

**Raising a change.** Anyone (the sponsor, a CDW, a team member or a contractor) can raise a change request by filling in a one-page form or telling the project manager, who writes it up. The form records: an ID, the date, who raised it, what should change and why, and which deliverable or WBS item it affects.

**Assessing it.** Within three working days the project manager, with the business analyst, adds the impact on scope, schedule (including the critical path), cost, quality, risk and data privacy, and a recommendation.

**Deciding it.**

| Size of the change | Who decides | Time to decide |
|---|---|---|
| No effect on a milestone, under ₱10,000, no change to personal data | Project manager | 2 working days |
| Moves a milestone, or ₱10,000–₱50,000 | Change control board | 5 working days |
| Over ₱50,000, changes the scope statement's exclusions, or adds personal data | Change control board, with the sponsor's written approval | 5 working days |

**Recording it.** Every request and decision goes into the change log, with the date and reason. Approved changes update the scope statement (with a new version number), the WBS, the schedule and the cost baseline, and are reported in the next status report. Rejected requests stay in the log with the reason.

**Change control board:**

- the project sponsor (OIC District Head), chair
- the project manager (Mark Alvin Cadangin), secretary
- the business analyst and quality lead (Mae Daniella Faith C. Benjamin)
- one CDW representative from the pilot centers
- the Data Protection Officer, for any change involving personal data

## 15.2 Closing

| Step | What happens | Who | When |
|---|---|---|---|
| Acceptance | Each deliverable is signed off by its acceptor (Section 10.2); the sponsor signs final acceptance of the project | Sponsor and acceptors | By 24 August 2027 (1.4.1) |
| Turnover | Source code repository, cloud, Google Play and AI accounts, the app signing key, the three test phones, documents and the catalog spreadsheet are handed to the client and recorded on the handover checklist | Project manager and Developer A | 17–19 August 2027 (8.3.2) |
| Contract closure | Each supplier's final deliverable is accepted, retention money scheduled for release after the warranty, and accounts settled | Project manager, with the client's BAC | By 24 August 2027 |
| Lessons learned | A one-hour session with the team, the sponsor and a CDW: what went well, what didn't, what to do differently; written up in a two-page report | Project manager | 26–27 August 2027 (1.4.2) |
| Final report and archive | Final project report against the charter's success criteria; all project documents archived with the client | Project manager | 27 August 2027 |

## 15.3 Transition Plan

**Who maintains the system afterwards.** A staff member designated by the **Iloilo City Data Assessment and Systems Management Office**, the city's IT office, maintains the app and backend. The office's role is to be confirmed with the client; if it cannot take this on, the fallback is a maintenance contract with Developer A, funded by the district office.

**Content.** The CSWDO La Paz–Lapuz District office names a CDW supervisor as **content owner**, who sends new or corrected catalog items to the content reviewer; nothing is published without review.

**Support during the transition.**

- From the midpoint (May 2027), the maintainer joins the two-weekly demos and the last two iterations.
- In August the maintainer deploys an update, rotates credentials and restores a backup with Developer A (8.3.2).
- For three months after handover, the developers' warranty covers defects (Section 14.3), and Developer A answers the maintainer's questions.

**Running cost.** About ₱5,000 a month for cloud and AI services at pilot scale, paid by the district office, plus the maintainer's time. Scaling to other districts would need a new estimate.

**Ending support.** Support transfers fully to the maintainer on 19 November 2027, three months after handover. Any issue still open on that date is listed in the final report.
