# 6. Scope Statement

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 23 October 2026 | Project team | Budget aligned with cost baseline |
| 1.1 | 4 November 2026 | Project team | Aligned with Sections 4, 5, 8, 9 |

## 6.1 Project Title and Justification

**LittleSteps: Home Learning and Observation App for Barangay Child Development Centers.** Parents of children aged 0–5 lose home notebooks, run out of low-cost ideas, and are offered apps that may misuse data or show diagnostic-style scores. Section 3 recommends building LittleSteps.

## 6.2 Product Scope Description

LittleSteps is a free **Flutter app**, one codebase for Android, iOS and the web, used by parents and other caregivers, backed by a small **Node.js/TypeScript API** with **Firebase Authentication** and **Cloud Firestore**. It has six features:

| # | Feature | What the parent can do |
|---|---|---|
| 1 | Child profile and milestone observations | Add a child by nickname and birth month and year (or age band); record "observed" or "not yet observed" for age-appropriate prompts, with date and note. No scores or labels. |
| 2 | Daily activity planning | Plan today's activities, mark them complete, undo a mistaken tap. |
| 3 | Private observation journal | Write dated notes only the writer can see; never sent to the AI service, analytics or error logs. |
| 4 | Learning activity library | Search reviewed activities, stories and rhymes by age band, domain, language and materials. |
| 5 | Weekly summary | See a factual count of activities and observations, with no judgement. |
| 6 | AI activity helper | Describe time and materials; get suggestions from the reviewed catalog only, with a rule-based fallback if the AI service fails. |

"Caregiver" means the signed-in account holder. Supporting functions: sign-in, settings, privacy notice, help pages. The interface is in English and Filipino; catalog items are also in Hiligaynon where reviewed.

## 6.3 Deliverables

**Project management deliverables:** the other sections of this plan, status reports, change log, pilot evaluation report and lessons-learned report.

| # | Deliverable | User acceptance criteria | Accepted by |
|---|---|---|---|
| D1 | Requirements specification | Covers all features; every requirement testable; signed by sponsor | Sponsor |
| D2 | UI design and clickable prototype | All screens and their error and offline states; tested with at least 5 parents and 2 CDWs; top findings resolved | Sponsor, CDW representative |
| D3 | Privacy impact assessment | Data items, purposes and retention listed; consent and deletion flows defined; approved before the pilot | Data Protection Officer |
| D4 | Reviewed activity catalog | At least 80 items across four domains (cognitive, motor, language, social-emotional) and every age band, each with source, reviewer and date | ECCD content reviewer |
| D5 | Backend API and database | Every request authenticated; no caregiver can read or change another's data (tested); automated tests pass | PM, QA tester |
| D6 | Flutter app (Android release for the pilot) | Runs on Android 10+ with 3 GB of RAM; all six features pass tests; core screens load within 3 seconds on 4G; WCAG 2.2 AA contrast; touch targets of at least 48 pixels | Sponsor after QA sign-off |
| D7 | Test reports | Functional, device, security and usability results; no open high-severity defects | Quality lead |
| D8 | Pilot evaluation report | Pilot results against charter criteria 1–4 and 7 | Sponsor |
| D9 | Training materials | CDW guide and parent quick-start sheet in English, Filipino and Hiligaynon; every pilot CDW trained | OIC District Head |
| D10 | Google Play release | Listing with privacy notice; release signed with the client's key | Sponsor |
| D11 | Handover package | Repositories, runbook, admin guide and credentials transferred; maintainer deploys one update unaided | Maintainer, sponsor |

## 6.4 Not Included

Explicitly **outside** the project:

- Apple App Store release; public web version.
- Dashboards or reports showing individual families' data to CDWs, the barangay or the welfare office.
- Developmental screening, diagnosis, scores, pass/fail labels or comparisons between children.
- Replacing the official ECCD Checklist, or integration with government or barangay systems.
- Sharing records between caregivers or with a CDW.
- Offline saving and syncing.
- Push notifications, reminders, messaging or chat; photo, video or audio uploads; payments.
- Creating new early-learning content beyond adapting existing sources; buying phones or data plans.
- Hosting and maintenance after handover (the maintainer's budget).

## 6.5 Constraints

- **Budget:** ₱1,083,185, a ₱984,714 cost baseline plus a 10% contingency reserve of ₱98,471; changes above ₱50,000 need the sponsor's approval (Section 15).
- **Duration:** 4 January to 27 August 2027 (166 working days).
- **Law and policy:** the Data Privacy Act of 2012 (RA 10173); the ECCD System Act of 2025 (RA 12199) and its rules signed on 5 August 2026.
- **Platform:** pilot released on Android, on entry-level phones with intermittent data.
- **Content:** no item is shown to parents until the reviewer approves it with a recorded source and reuse permission.
- **AI service:** the paid Gemini tier or Vertex AI is required before real parents use the AI helper, because the free tier lets Google use prompts.
- **Team:** two contracted developers; part-time design and QA.

## 6.6 Assumptions

- The district office names two pilot centers in La Paz, and their CDWs attend two training sessions and the two-weekly demos.
- At least 30 pilot households have an Android phone with weekly data or Wi-Fi (to be confirmed, Section 3.2).
- ECCD Council and DepEd materials can be adapted with attribution, subject to the reviewer's check.
- A Data Protection Officer reviews the privacy impact assessment within two weeks.
- Cloud and AI prices stay within 20% of October 2026 levels.
- A maintainer (Section 15) is available from the project midpoint.
