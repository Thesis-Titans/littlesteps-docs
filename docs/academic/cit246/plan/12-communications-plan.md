# 12. Communications Plan

**Plan section:** 12  
**Version:** 1.0 draft, 23 October 2026  
**Status:** Draft for team review. The structure follows Schwalbe, *Information Technology Project Management*, Chapter 10.  
**Related Documents:** [Stakeholder Register](05-stakeholder-register.md), [Risk Register](13-risk-register.md), [Change Control and Closing Plan](15-change-control-and-closing-plan.md)

---

## 12.1 Communications Matrix

| Audience | What they receive | Format | How often | From |
|---|---|---|---|---|
| Project sponsor (OIC District Head) | Status report: progress against milestones, budget used, top risks, decisions needed | One-page report, then a 30-minute meeting | Every two weeks | Project manager |
| Project sponsor | Working demo of what was built | In person at the district office, or by video call | Every two weeks, with the status report | Project manager and developers |
| CSWDO city head office and city ECCD office | Summary of progress and pilot results | Short memo | At design approval, pilot start, pilot end and closing | Project manager, through the sponsor |
| Data Protection Officer | Privacy impact assessment; any change that touches personal data | Document and review meeting | At 2.3 and whenever data handling changes | Business analyst |
| Child Development Workers at the pilot centers | What is happening, what they need to do, training dates | Group chat message and short in-person briefing | Weekly during the pilot; at each phase change before it | Stakeholder and content coordinator |
| Parents in the pilot | How to install and use the app, privacy notice, who to ask for help | Quick-start sheet, onboarding session, in-app help | At onboarding; reminders in weeks 1, 4 and 8 | Coordinator, through the CDWs |
| Barangay officials of the pilot barangays | Notice of the pilot and its purpose | Courtesy letter | Before the pilot | Project manager |
| Content reviewer and translator | Items to review, deadlines, feedback | Shared spreadsheet and email | Weekly during 3.0 | Coordinator |
| Project team and contractors | Tasks, blockers, decisions | 15-minute stand-up and the issue board | Daily stand-up; board updated continuously | Project manager |
| Maintainer | Runbook, accounts, training schedule | Handover meeting and documents | From the midpoint; weekly in the last month | Project manager and Developer A |
| CIT 246 instructor | Checkpoint submissions | Document | At each checkpoint | Project team |

The public Facebook page of the CSWDO La Paz–Lapuz District office is the client's public contact channel. Project messages go to the sponsor directly; the page is used only for public notices the sponsor approves.

## 12.2 Escalation Path

| Situation | Who is told | How fast | Next step if unresolved |
|---|---|---|---|
| A task will slip but the activity has float | Project manager | Same day, at stand-up | Re-plan within the team |
| A critical-path activity will slip, or a cost overrun up to ₱50,000 | Project manager, then the sponsor in the next status report | Within 2 working days | Change request (Section 15) |
| A slip that moves a milestone, or an overrun above ₱50,000 | Sponsor | Within 1 working day | Change control board decides within 5 working days |
| A data-privacy incident or a suspected data leak | Project manager, the DPO and the sponsor | **Within 24 hours** | DPO decides whether to notify the National Privacy Commission (72-hour rule) |
| A parent or CDW reports content that seems wrong or harmful | Coordinator removes the item from the catalog, tells the content reviewer | Within 1 working day | Item stays hidden until re-reviewed |
| A conflict between stakeholders the project manager cannot settle | Sponsor | Within 2 working days | CSWDO city head office |

## 12.3 Capturing and Acting on Feedback

- **Parents:** an in-app "Send feedback" form (no child data), the CDWs' weekly check-ins, and the usability and pilot surveys.
- **CDWs:** the weekly pilot briefing and a short survey at the end of the pilot.
- **Sponsor and DPO:** comments at the two-weekly status meetings and document reviews.
- **How feedback is used:** every item goes into a feedback log with its source and date. The business analyst sorts it weekly into defects (fixed through testing), change requests (Section 15) or ideas for later, and the status report says what was done with the main items.
