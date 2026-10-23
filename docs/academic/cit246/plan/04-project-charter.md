# 4. Project Charter

**Plan section:** 4 ◆ (Checkpoint 2)  
**Version:** 1.0 draft, 23 October 2026  
**Status:** Draft for team review, then for sponsor sign-off. The format follows Schwalbe, *Information Technology Project Management*, Table 4-1.  
**Related Documents:** [Business Case](03-business-case.md), [Stakeholder Register](05-stakeholder-register.md), [Scope Statement](06-scope-statement.md)

---

> **Practice timeline.** The dates below are for the CIT 246 planning exercise: an 8-month project for the client. They are not the team's course build schedule, which is in the [execution plan](../../../execution-plan.md).

| Field | Entry |
|---|---|
| **Project title** | LittleSteps: Home Learning and Observation App for Barangay Child Development Centers |
| **Client organization** | Iloilo City Social Welfare and Development Office (CSWDO), La Paz–Lapuz District office, which supervises the Child Development Centers in 37 barangays; pilot at two Child Development Centers in La Paz |
| **Authorization date** | On sponsor sign-off (target: 8 January 2027) |
| **Project start date** | 4 January 2027 |
| **Projected finish date** | 27 August 2027 (8 months) |
| **Budget** | ₱1,083,185, including a 10% contingency reserve of ₱98,471 (bottom-up cost baseline, Section 9) |
| **Project manager** | Mark Alvin Cadangin |

## 4.1 Key Schedule Milestones

| Milestone | Target date |
|---|---|
| Charter signed by the sponsor | 8 January 2027 |
| Design approved and privacy impact assessment approved by the DPO | 5 March 2027 |
| 80 activity catalog items reviewed by the ECCD content reviewer | 6 April 2027 |
| All features built; system testing starts | 4 May 2027 |
| Pilot onboarding done; pilot starts at two Child Development Centers in La Paz | 3 June 2027 |
| Pilot ends | 28 July 2027 |
| Pilot evaluation report delivered | 4 August 2027 |
| App published on Google Play | 16 August 2027 |
| CDW training complete; system handed over to the maintainer | 19 August 2027 |
| Project closed; lessons learned recorded | 27 August 2027 |

The dates come from the schedule in Section 8.

## 4.2 Project Objectives

1. Give parents of children aged 0–5, and other caregivers who look after them at home, a free Android app that keeps a private record of what they observe at home and suggests low-cost, screen-free activities matched to their child's age.
2. Build a reviewed catalog of Philippine early-learning activities, stories and rhymes that CDWs can recommend with confidence.
3. Protect children's and parents' data under the Data Privacy Act of 2012 (RA 10173), with no diagnostic scores or pass/fail labels.
4. Hand over a running system, trained CDWs and a named maintainer so the app keeps working after the project ends.

## 4.3 Success Criteria

The project succeeds when all of the following are met by the finish date, within the budget plus or minus 10% and the schedule plus or minus two weeks:

| # | Criterion | Measure | Measured by |
|---|---|---|---|
| 1 | Pilot adoption | At least 30 households, mostly parents, across two Child Development Centers install the app and create a child profile | App records, counted without names |
| 2 | Weekly use | At least 60% of pilot households use the app in at least 4 of the 8 pilot weeks | Weekly active households, from anonymous usage counts |
| 3 | Records kept | At least 70% of pilot households record 4 or more observations or completed activities during the pilot | App records, counted without names |
| 4 | Usability | Average System Usability Scale (SUS) score of 70 or higher from pilot parents and other caregivers; at least 85% task success on the five core tasks in moderated tests | SUS survey and usability test sheets |
| 5 | Reviewed content | At least 80 catalog items covering all four domains and every age band, each with a recorded source and reviewer sign-off; zero unreviewed items shown to caregivers | Catalog review log |
| 6 | Privacy and security | Privacy impact assessment approved by the Data Protection Officer; zero open high-severity findings in the pre-release security review | Signed assessment and review report |
| 7 | CDW workload | CDW time spent preparing home-activity handouts falls by at least 50% against the baseline measured in Section 3 | CDW time log, before and during the pilot |
| 8 | Handover | A named maintainer has completed handover training and can deploy an update unaided | Handover checklist signed by the maintainer |

## 4.4 Approach

- **Discover first.** Interview the OIC District Head, CDWs and parents in the first two weeks to confirm the baseline in Section 3 and the requirements.
- **Privacy by design.** Complete a privacy impact assessment before any real data is collected. Store only a nickname, an age band or birth month and year, and caregiver-entered records. Never send journal text or child identifiers to the AI service.
- **Reviewed content only.** An ECCD content reviewer approves every catalog item, with its source recorded, before parents can see it.
- **Iterative build.** Build the Flutter app and backend in two-week iterations, each ending with a demo to the district office. Test against local emulators with synthetic data until the pilot.
- **Pilot before launch.** Run an 8-week pilot at two centers, measure the success criteria, and fix the top issues before publishing on Google Play.
- **Plan the handover from the start.** Name the maintainer by the midpoint and involve them in the last two iterations.

## 4.5 Roles and Responsibilities

| Role | Name | Organization or position | Responsibility |
|---|---|---|---|
| Project sponsor | Identified by role; not contacted for this plan | OIC District Head, CSWDO La Paz–Lapuz District office | Approves the charter, budget and major changes; accepts the final deliverables |
| Project manager | Mark Alvin Cadangin | Project team, WVSU CICT | Plans and controls scope, schedule, cost and risk; reports to the sponsor; chairs the change control board |
| Business analyst and quality lead | Mae Daniella Faith C. Benjamin | Project team, WVSU CICT | Requirements, acceptance criteria, test planning and usability evaluation |
| Stakeholder and content coordinator | Nherie C. Acebuche | Project team, WVSU CICT | Stakeholder engagement, CDW and parent sessions, content review workflow, training materials |
| Flutter and backend developers (2) | To be contracted | Contracted developers | Build and test the app and backend |
| UI/UX designer | To be contracted | Part-time contractor | Screen design and usability fixes |
| QA tester | To be contracted | Part-time contractor | Functional, device and regression testing |
| ECCD content reviewer | To be identified | ECCD specialist or early-childhood educator | Reviews and signs off every catalog item |
| Data Protection Officer | To be identified | Barangay or city DPO | Reviews the privacy impact assessment and data handling |
| Child Development Workers | Pilot center staff | The two pilot Child Development Centers in La Paz | Recommend the app to families, run parent onboarding, give feedback |
| Maintainer | To be named by the midpoint | Named in Section 15 | Runs and updates the system after handover |

The three project-team roles are proposed for the team to confirm.

## 4.6 Sign-off

| Name | Role | Signature | Date |
|---|---|---|---|
| | Project sponsor | | |
| Mark Alvin Cadangin | Project manager | | |
| Mae Daniella Faith C. Benjamin | Business analyst and quality lead | | |
| Nherie C. Acebuche | Stakeholder and content coordinator | | |

## 4.7 Stakeholder Comments

To be recorded at the charter review with the sponsor and CDWs. Issues already raised during planning:

- The CDW network will want to know whether the app adds reporting work for CDWs. It does not; CDWs only recommend the app and run onboarding (see Section 5).
- The Data Protection Officer will need to approve how children's data is stored before the pilot (success criterion 6).
