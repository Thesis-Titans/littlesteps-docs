# 6. Scope Statement

**Plan section:** 6 ◆ (Checkpoint 2)  
**Version:** 0.1 draft, 23 October 2026  
**Status:** Draft for team review, then for sponsor approval. The format follows Schwalbe, *Information Technology Project Management*, Chapter 5.  
**Related Documents:** [Business Case](03-business-case.md), [Project Charter](04-project-charter.md), [Stakeholder Register](05-stakeholder-register.md), [Product Scope](../../../product-scope.md)

---

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 0.1 | 23 October 2026 | Project team | First draft for Checkpoint 2 |

## 6.1 Project Title and Justification

**LittleSteps: Home Learning and Observation App for Barangay Child Development Centers.** Parents of children aged 0–5 keep home observations in notebooks that get lost, run out of low-cost activity ideas, and are offered apps that misuse data or show diagnostic-style scores. The [business case](03-business-case.md) compares four options and recommends building LittleSteps.

## 6.2 Product Scope Description

LittleSteps is a free **Flutter app for Android phones** used mainly by parents, and by other caregivers such as grandparents where a family has them, backed by a small **Node.js/TypeScript API** with **Firebase Authentication** and the **Cloud Firestore** database. It has six features:

| # | Feature | What the parent can do |
|---|---|---|
| 1 | Child profile and milestone observations | Add a child by nickname and birth month and year (or an age band), and record "observed" or "not yet observed" for age-appropriate milestone prompts, with a date and an optional note. No scores or pass/fail labels. |
| 2 | Daily activity planning | Add activities to today's plan, mark them complete, and undo a mistaken tap. |
| 3 | Private observation journal | Write dated notes that only the person who wrote them can see. Notes are never sent to the AI service, analytics or error logs. |
| 4 | Learning activity library | Search and filter reviewed activities, stories and rhymes by age band, domain, language and household materials. Every item shows its source and review status. |
| 5 | Weekly summary | See a factual count of completed activities and recorded observations for the week, with no developmental judgement. |
| 6 | AI activity helper | Describe the time, setting and materials available, and get suggestions chosen only from the reviewed catalog. If the AI service fails, the app falls back to rule-based catalog picks. |

In the technical deliverables below, "caregiver" means the signed-in account holder, whether a parent or another caregiver.

Supporting functions: sign-in and sign-out, an account menu, settings, a plain-language privacy notice, about and help pages. The interface is in English and Filipino; catalog items are in English, Filipino and Hiligaynon where a reviewed version exists.

## 6.3 Deliverables

**Project management deliverables:** project charter, scope statement, work breakdown structure and dictionary, schedule, cost baseline, quality, resource, communications, risk and procurement plans, two-weekly status reports, change log, pilot evaluation report and lessons-learned report.

**Product deliverables and their acceptance criteria:**

| # | Deliverable | User acceptance criteria | Accepted by |
|---|---|---|---|
| D1 | Requirements specification | Covers the six features and supporting functions; every requirement has a test; signed by the sponsor | Sponsor |
| D2 | UI design and clickable prototype | All screens and their empty, loading, error and offline states; walked through with at least 5 parents (plus other caregivers where available) and 2 CDWs; top findings resolved | Sponsor and CDW representative |
| D3 | Privacy impact assessment | Lists every data item, its purpose and retention; consent and deletion flows defined; approved before the pilot | Data Protection Officer |
| D4 | Reviewed activity catalog | At least 80 items across all four domains (cognitive, motor, language, social-emotional) and every age band; each with a source, reviewer and review date | ECCD content reviewer |
| D5 | Backend API and database | Every request is authenticated; a caregiver can never read or change another caregiver's data (tested); automated tests pass | Project manager and QA tester |
| D6 | Flutter Android app | Runs on Android 10 and later on a phone with 3 GB of RAM; all six features pass their test cases; core screens load within 3 seconds on 4G; WCAG 2.2 AA contrast; touch targets of at least 48 pixels | Sponsor, after QA sign-off |
| D7 | Test reports | Functional, device, security and usability test results; zero open high-severity defects at release | Quality lead |
| D8 | Pilot evaluation report | Results of the 8-week pilot measured against the charter's success criteria 1–4 and 7 | Sponsor |
| D9 | Training materials | A CDW guide and a parent quick-start sheet in English, Filipino and Hiligaynon; every pilot CDW trained | OIC District Head |
| D10 | Google Play release | Published listing with the privacy notice; release signed with the client's key | Sponsor |
| D11 | Handover package | Source code repositories, deployment runbook, admin guide and account credentials transferred; the maintainer deploys one update unaided | Maintainer and sponsor |

## 6.4 Not Included

The following are explicitly **outside** the project:

- An iPhone (iOS) app or a web app. The CIT 210 React web client built for coursework is not part of this project.
- Any dashboard or report for CDWs, the barangay or the social welfare office that shows individual families' data.
- Developmental screening, diagnosis, scores, percentiles, pass/fail labels or comparisons between children.
- Replacing or digitizing the official ECCD Checklist used by CDWs.
- Integration with government information systems or other barangay systems.
- Sharing records between caregivers, or between a caregiver and a CDW.
- Saving changes offline and syncing them later; the app tells the caregiver when a change was not saved.
- Push notifications, reminders, messaging or chat.
- Photos, video or audio uploads.
- Payments or paid features.
- Creating new early-learning content beyond adapting and reviewing existing sources.
- Buying phones or data plans for families.
- Hosting and maintenance costs after the handover date; these move to the maintainer's budget.

## 6.5 Constraints

- **Budget:** ₱1,167,650 including contingency (charter); changes above ₱50,000 need sponsor approval.
- **Duration:** 8 months, 4 January to 27 August 2027.
- **Law and policy:** the Data Privacy Act of 2012 (RA 10173) and its implementing rules; the ECCD System Act of 2025 (RA 12199) and its implementing rules signed on 5 August 2026, which set up city ECCD offices and govern how the app relates to the official ECCD program.
- **Platform:** Android only, on entry-level phones with limited storage and intermittent mobile data.
- **Content:** no catalog item is shown to parents until the content reviewer approves it with a recorded source and reuse permission.
- **AI service:** the paid Gemini tier or Vertex AI is required before real parents use the AI helper, because the free tier's terms allow Google to use prompts; prompts carry only non-identifying constraints.
- **Team:** two contracted developers and part-time design and QA support; the core team of three has no full-time Flutter developer of its own.

## 6.6 Assumptions

- The district office names two pilot Child Development Centers in La Paz, and their CDWs can attend two training sessions and the two-weekly demos.
- At least 30 pilot households have an Android phone with mobile data or Wi-Fi at least weekly (to be confirmed by the survey in Section 3).
- The ECCD Council and DepEd source materials can be adapted for the catalog with attribution, subject to the content reviewer's check.
- A Data Protection Officer is available to review the privacy impact assessment within two weeks.
- Cloud and AI service prices stay within 20% of October 2026 prices for the project's duration.
- A maintainer (named in Section 15) is available from the project midpoint.
