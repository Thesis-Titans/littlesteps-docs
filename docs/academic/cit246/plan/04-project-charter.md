# 4. Project Charter

| Field | Entry |
|---|---|
| **Project title** | LittleSteps: Home Learning and Observation App for Barangay Child Development Centers |
| **Client organization** | Iloilo City Social Welfare and Development Office (CSWDO), La Paz–Lapuz District office; pilot at two Child Development Centers in La Paz |
| **Authorization date** | On sponsor sign-off (target: 8 January 2027) |
| **Project start date** | 4 January 2027 |
| **Projected finish date** | 27 August 2027 (8 months) |
| **Budget** | ₱1,083,185, including a 10% contingency reserve of ₱98,471 (Section 9) |
| **Project manager** | Mark Alvin Cadangin |

## 4.1 Key Schedule Milestones

| Milestone | Target date |
|---|---|
| Charter signed | 8 January 2027 |
| Design and privacy impact assessment approved | 5 March 2027 |
| 80 catalog items reviewed | 6 April 2027 |
| Features built; testing starts | 4–5 May 2027 |
| Pilot at two Child Development Centers in La Paz | 3 June–28 July 2027 |
| Pilot evaluation report | 4 August 2027 |
| App published on Google Play | 16 August 2027 |
| CDW training complete; handover | 19 August 2027 |
| Project closed; lessons learned | 27 August 2027 |

## 4.2 Project Objectives

1. Give parents and other caregivers of children aged 0–5 a free Flutter app (Android for the pilot) that keeps a private record of home observations and suggests low-cost, screen-free activities.
2. Build a reviewed catalog of Philippine early-learning activities, stories and rhymes.
3. Protect data under the Data Privacy Act of 2012 (RA 10173), with no diagnostic scores or labels.
4. Hand over a running system, trained CDWs and a maintainer.

## 4.3 Success Criteria

The project succeeds when all criteria are met by the finish date, within budget plus or minus 10% and schedule plus or minus two weeks:

| # | Criterion | Measure | Measured by |
|---|---|---|---|
| 1 | Adoption | At least 30 households across two centers install the app and create a child profile | App records (no names) |
| 2 | Weekly use | At least 60% of pilot households use the app in 4 or more of the 8 weeks | Anonymous usage counts |
| 3 | Records kept | At least 70% of households record 4 or more observations or activities | App records (no names) |
| 4 | Usability | System Usability Scale (SUS) average of 70 or higher; 85% task success on five core tasks | SUS survey, test sheets |
| 5 | Content | At least 80 catalog items covering four domains and every age band, each with source and reviewer sign-off; none unreviewed | Catalog review log |
| 6 | Privacy, security | Privacy impact assessment approved by the Data Protection Officer; no open high-severity security findings | Signed assessment, review report |
| 7 | CDW workload | CDW handout time falls at least 50% against the Section 3 baseline | CDW time log |
| 8 | Handover | A named maintainer can deploy an update unaided after training | Signed handover checklist |

## 4.4 Approach

- **Discover first.** In the first two weeks, interview the OIC District Head, CDWs and parents to confirm the Section 3 baseline.
- **Privacy by design.** Approve a privacy impact assessment before collecting real data. Store only a nickname, an age band or birth month and year, and caregiver records. Never send journal text or child identifiers to the AI service.
- **Content only.** The reviewer approves every catalog item before parents see it.
- **Iterative build.** Build in two-week iterations, each ending with a district office demo, using synthetic data until the pilot.
- **Pilot before launch.** Run an 8-week pilot, measure the criteria and fix top issues before publishing.
- **Plan the handover early.** Name the maintainer by May 2027 and involve them in the last two iterations.

## 4.5 Roles and Responsibilities

| Role | Name | Responsibility |
|---|---|---|
| Project sponsor | OIC District Head, CSWDO La Paz–Lapuz (by role) | Approves charter, budget and major changes; accepts deliverables |
| Project manager | Mark Alvin Cadangin | Controls scope, schedule, cost, risk; reports to the sponsor; chairs change control |
| Business analyst and quality lead | Mae Daniella Faith C. Benjamin | Requirements, acceptance, testing |
| Stakeholder and content coordinator | Nherie C. Acebuche | Stakeholder engagement, CDW and parent sessions, content review, training |
| Flutter and backend developers (2), UI/UX designer, QA tester | To be contracted | Build, design and test |
| ECCD content reviewer | To be identified | Signs off every catalog item |
| Data Protection Officer | To be identified | Reviews the privacy impact assessment |
| Child Development Workers | Pilot center staff | Recommend the app, onboard parents |
| Maintainer | To be named by May 2027 | Runs and updates the system after handover |

## 4.6 Sign-off

| Name | Role | Signature | Date |
|---|---|---|---|
| | Project sponsor | | |
| Mark Alvin Cadangin | Project manager | | |
| Mae Daniella Faith C. Benjamin | Business analyst and quality lead | | |
| Nherie C. Acebuche | Stakeholder and content coordinator | | |

## 4.7 Stakeholder Comments

At the meeting on 27 October 2026 the OIC District Head wanted a no-fee solution run by existing staff, asked who answers parents' complaints and who maintains the system, and asked for a monthly summary report (Appendix A.5). Comments on the charter will be recorded at its review with the sponsor and CDWs. Expected concerns:

- CDWs will ask whether the app adds reporting work. It does not; they only recommend it and run onboarding (Section 5).
- The Data Protection Officer must approve how children's data is stored before the pilot (success criterion 6).
