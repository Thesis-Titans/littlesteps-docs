# CIT 246 — IT Project Management Plan Deliverables

**Course:** CIT 246 IT Project Management  
**Institution:** West Visayas State University — College of Information and Communications Technology  
**Source:** Summarized from the instructor's [Final Project: IT Project Management Plan](CIT246_Final_Project_IT_Project_Management_Plan.md) brief. The instructor's brief is the authority wherever this page differs from it.  
**Key Deliverable:** One Project Management Plan, 25–40 pages including appendices, as a single PDF plus a printed copy, followed by a class presentation  
**CIT 246 Team:** Mark Alvin Cadangin (Lead), Nherie C. Acebuche, Mae Daniella Faith C. Benjamin. CIT 246 is taken by these three members, who share this track; the other two LittleSteps members are on a different track. CC 207B and CIT 210 involve all five members.  
**Final Presentation:** December 2, 2026 (15 minutes plus 5 minutes of questions; every CIT 246 team member speaks)

---

## 1. What the Plan Is

- The group acts as the project management team for one proposed IT project and produces **a single Project Management Plan** that carries the project from justification to closure, applying every knowledge area in the course.
- **The group plans the project; it does not build the system.** No code is required or expected.
- The project must be for an organization or business with a **real problem** that the group has access to (for example a barangay, LGU office, school, clinic, cooperative, small business, NGO, or a CICT or WVSU office).
- It must be large enough to need managing, **roughly six to twelve months of work with a budget the group can defend**, but small enough that the group could plausibly deliver it.

For LittleSteps this means the plan describes a 6–12 month project for the proposed client (the City Social Welfare and Development Office [CSWDO] La Paz–Lapuz District office in Iloilo City), covering build, pilot, training and handover, with peso costs. It is a separate document from the [execution plan](../../execution-plan.md), which schedules the real one-month course build (October 26 to November 25, 2026).

- **The timeline is a practice plan.** The 6–12 month schedule exercises the course's planning methods; it does not describe how the team actually builds the course project. The plan's risk, stakeholder, quality and communication work is still used in the real build.
- **The planned system is the Flutter app.** CIT 246 is coupled with CC 207B, so the plan describes the Flutter Android app on the shared Node.js/TypeScript API with Firebase Authentication and Firestore. The React web client from CIT 210 is not part of this plan. The [Checkpoint 1 concept](checkpoint-1-concept.md) mentioned both clients; the full plan narrows the scope to the Flutter app and its backend.
- **Where it is written:** each template section is a Markdown file in this folder, reviewed through pull requests, then exported to one A4, Arial 11 PDF.

## 2. Checkpoints

The checkpoints are not optional and are not graded separately. A group that skips one and submits a plan with a structural problem is marked on what it submitted.

| Checkpoint | Deliverable | Due | Status |
|---|---|---|---|
| **Checkpoint 1** | One-page project concept: the organization, the problem, the proposed system and the possible sponsor (Arial 11, A4). Must be approved before the full document is started. | October 14, 2026 | Drafted (see [Checkpoint 1 Concept](checkpoint-1-concept.md)); **submission and approval not yet recorded** |
| **Checkpoint 2** | Charter, stakeholder register and scope statement (template sections 3–6) | To be announced | Drafted for team review (see the [plan sections](#deliverables-index)); per-center figures are researched estimates, since the client was not contacted |
| **Checkpoint 3** | WBS, schedule and cost baseline (template sections 7–9) | To be announced | Drafted for team review (see the [plan sections](#deliverables-index)) |
| **Final submission** | Complete Project Management Plan (PDF, Google Drive, printed copy) | December 2, 2026 | All 17 sections drafted (version 1.0 draft); team review, PDF export and printing still to do |
| **Presentation** | 15 minutes per group plus 5 minutes of questions | December 2, 2026 | [Outline](plan/presentation-outline.md) drafted; slides still to make |

## 3. Key Deliverables

| Deliverable | What it answers | Course unit |
|---|---|---|
| Business Case | Whether the project is worth doing at all | Unit 4 |
| Project Charter | Formal authorization, naming the project manager | Unit 4 |
| Stakeholder Register | Everyone affected, what they want and how much influence they have | Units 1–2 |
| Scope Statement | What is included and excluded, and the acceptance criteria | Unit 5 |
| Work Breakdown Structure and WBS Dictionary | The work decomposed to work-package level | Unit 5 |
| Schedule: network diagram and Gantt chart | Activities, dependencies, durations and the critical path | Unit 6 |
| Cost Estimate and Cost Baseline | What each work package costs, rolled up into a budget | Unit 7 |
| Quality Management Plan | How the team will know the work is acceptable | Unit 8 |
| Resource Plan: organizational chart and responsibility matrix | Who is on the team and who is accountable for what | Unit 8 |
| Communications Plan | Who is told what, how often and in what form | Unit 9 |
| Risk Register | What could go wrong, ranked, owned and with responses | Unit 9 |
| Procurement Plan | What will be bought or outsourced, and how suppliers are chosen | Unit 10 |

## 4. Template (Use These Section Numbers and Headings)

Sections marked ◆ carry the heaviest marks.

| # | Section | Required contents |
|---|---|---|
| 1 | Title Page | Project title and client organization; group name, member names and section; submitted to the instructor and the named sponsor; submission date |
| 2 | Executive Summary | One page at most: problem, proposed system, cost, duration and what the organization gains. Written last, placed here. |
| 3 ◆ | Project Background and Business Case | The organization and how it handles the problem now; the problem quantified where possible; options considered, including doing nothing; the recommendation and why |
| 4 ◆ | Project Charter | Standard structure: title and authorization date, project manager, start and finish dates, key milestones, budget, objectives, **measurable** success criteria, approach, roles and responsibilities, sign-off and stakeholder comments |
| 5 | Stakeholder Register and Analysis | At least **eight** stakeholders with role, relationship, what they want and influence level with a justification; **at least one who would prefer the project did not happen**, and a paragraph on managing that person |
| 6 ◆ | Scope Statement | Product scope, deliverables and user acceptance criteria; an explicit list of what is **not** included; constraints and assumptions; a **version number and date** |
| 7 ◆ | Work Breakdown Structure | At least **three levels** with consistent numbering; dictionary entries for at least **five** work packages (included, excluded, owner, output); a **1.0 Project Management** branch |
| 8 ◆ | Schedule | Activity list from the WBS work packages with duration estimates and their basis; network diagram with the **critical path**; Gantt chart with milestones; the software used |
| 9 ◆ | Cost Estimate and Budget | Cost by WBS item with the method named (analogous, parametric or bottom-up); a cost baseline showing cumulative cost over time; assumptions; peso amounts with separators |
| 10 | Quality Management Plan | Measurable acceptance for the main deliverables; how quality is assured during the work and controlled at the end; who accepts each deliverable |
| 11 | Resource and Responsibility Plan | Organizational chart with sponsor, project manager and team; responsibility assignment matrix mapping WBS items to people; skills required and skills the team lacks |
| 12 | Communications Plan | Who receives what, in what format, how often and from whom; escalation path and speed; how stakeholder feedback is captured and acted on |
| 13 ◆ | Risk Register | At least **eight** risks, ranked, each with probability, impact, owner and response; **at least three about people or the organization**; the top risk named and explained |
| 14 | Procurement Plan | What is bought or outsourced versus done in-house; supplier selection criteria and process; contract protections for the client |
| 15 | Change Control and Closing Plan | How change requests are raised, assessed, decided and recorded; the change control board; closing with acceptance, turnover, lessons learned and a transition plan **naming who maintains the system** |
| 16 | Conclusion | The value in the client's terms; what the sponsor is asked to approve; one paragraph on what was hardest to plan and why |
| 17 | Appendices | **Evidence of client contact** (interview notes, photos, correspondence or a letter); forms, screenshots or documents from the current process; an individual contribution statement signed by every member |

Each document follows the standard structure in the course decks and in Schwalbe, *Information Technology Project Management*, Revised 6th Edition (the course e-book). Do not invent formats.

**Tools:** MS Project, ProjectLibre, GanttProject or a spreadsheet for schedules and Gantt charts; Excel or Google Sheets for cost baselines; Word, Google Docs, draw.io, Lucidchart or Canva for diagrams. Everything must be readable at normal zoom in the PDF; blurry screenshots lose marks.

## 5. Submission Requirements

| Item | Requirement |
|---|---|
| Format | One PDF per group (not Word, a Docs link or photos of paper) |
| Length | 25 to 40 pages including appendices; quality over volume |
| File name | `CIT246_FinalProject_GroupName.pdf` |
| Where | Google Drive on or before the deadline, **and** a printed copy at the faculty office |
| Presentation | 15 minutes plus 5 minutes of questions; every member speaks; slides submitted with the document |
| Names | Every member on the title page, each with the sections they led |

## 6. Rubric (100 points: 5 criteria × 20)

| Criterion | What "Excellent (20)" requires |
|---|---|
| 1. Project Initiation and Business Case | Quantified, compelling business case with options; complete, formal charter with measurable success criteria and sign-off; 8+ stakeholders including a genuine opponent, with justified influence ratings |
| 2. Scope Management and WBS | Precise scope with explicit IN and OUT boundaries, acceptance criteria, constraints and assumptions; deliverable-oriented WBS of 3+ levels that satisfies the 100% rule; complete dictionary entries for 5+ work packages |
| 3. Schedule and Cost | Activity list derived from the WBS; network diagram with the critical path identified and justified; Gantt chart with milestones; cost estimate that names its method, rolls up to a baseline and states assumptions |
| 4. Quality, Resource, Communications and Risk | Measurable quality criteria with an acceptor; org chart and responsibility matrix mapped to the WBS; communications plan with audience, format, frequency and escalation; 8+ ranked, owned risks, 3+ non-technical, with real responses |
| 5. Procurement, Closing and Proposal Quality | Procurement justified with selection criteria and a named contract safeguard; concrete change control and closing with a transition plan naming the maintainer; professional, consistent document; clear presentation delivered by the whole group |

Lower bands (15, 10, 0–5) apply when, for example, justification is not quantified, the WBS is a task list rather than a deliverable breakdown, the critical path is not justified, risks have no owners, or one or two members dominate the presentation.

## 7. LittleSteps Status and Open Items

| Item | Status |
|---|---|
| Checkpoint 1 concept | The team's concept proposal in Google Drive is dated 13 October 2026. **Record when it was submitted, whether it was approved, and any feedback.** |
| Checkpoint 2 and 3 dates | **Ask the instructor**; the brief leaves them blank |
| Team of three | The brief's template mentions "all five members" on the title page and in the signed contribution statement. **Confirm with the instructor** that three names and three signatures are correct for this group. |
| Client organization and sponsor | The client is the **CSWDO La Paz–Lapuz District office**, chosen from public sources as a realistic client. The team decided **not to contact** it; the plan uses sourced facts and labelled estimates, identifies the sponsor by role, and Appendix 17 states openly that there was no client contact. This may cost marks under the brief's evidence-of-contact requirement. |
| Project scale | The plan must cover a 6–12 month project with a peso budget, not the one-month course build |
| Scope narrowed to Flutter | The Checkpoint 1 concept described both the Flutter and React clients; the full plan covers only the Flutter app and its backend. **Mention this to the instructor** with the Checkpoint 2 submission. |
| Reusable inputs | [Product scope](../../product-scope.md) (in and out of scope), [architecture decisions](../../architecture-decisions.md) (including the paid AI tier in ADR-008 as a cost line), [security, privacy and AI safeguards](../../security-privacy-ai.md) and the execution plan's work packages. Rewrite them in the course and Schwalbe formats. |

## Deliverables Index
- [Checkpoint 1: One-Page Project Concept](checkpoint-1-concept.md)
- Project Management Plan (version 1.0 draft):
  - [1. Title Page](plan/01-title-page.md)
  - [2. Executive Summary](plan/02-executive-summary.md)
  - [3. Project Background and Business Case](plan/03-business-case.md) ◆
  - [4. Project Charter](plan/04-project-charter.md) ◆
  - [5. Stakeholder Register and Analysis](plan/05-stakeholder-register.md)
  - [6. Scope Statement](plan/06-scope-statement.md) ◆
  - [7. Work Breakdown Structure](plan/07-work-breakdown-structure.md) ◆
  - [8. Schedule](plan/08-schedule.md) ◆
  - [9. Cost Estimate and Budget](plan/09-cost-estimate-and-budget.md) ◆
  - [10. Quality Management Plan](plan/10-quality-management-plan.md)
  - [11. Resource and Responsibility Plan](plan/11-resource-and-responsibility-plan.md)
  - [12. Communications Plan](plan/12-communications-plan.md)
  - [13. Risk Register](plan/13-risk-register.md) ◆
  - [14. Procurement Plan](plan/14-procurement-plan.md)
  - [15. Change Control and Closing Plan](plan/15-change-control-and-closing-plan.md)
  - [16. Conclusion](plan/16-conclusion.md)
  - [17. Appendices](plan/17-appendices.md)
  - Data: [schedule and cost (CSV)](plan/data/schedule-and-cost.csv), [monthly cost baseline (CSV)](plan/data/cost-baseline-by-month.csv)
- [Presentation outline](plan/presentation-outline.md)
