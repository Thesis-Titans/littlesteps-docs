# 10. Quality Management Plan

**Plan section:** 10  
**Version:** 1.0 draft, 23 October 2026  
**Status:** Draft for team review. The structure follows Schwalbe, *Information Technology Project Management*, Chapter 8: quality planning, quality assurance and quality control.  
**Related Documents:** [Scope Statement](06-scope-statement.md), [Work Breakdown Structure](07-work-breakdown-structure.md), [Resource and Responsibility Plan](11-resource-and-responsibility-plan.md)

---

## 10.1 Quality Objectives

LittleSteps is acceptable when parents can use it easily on an entry-level phone, it never misleads them about their child's development, and children's data is protected. The quality lead (Mae Daniella Faith C. Benjamin) owns this plan; the project manager makes sure it is followed.

## 10.2 Acceptance Criteria for the Main Deliverables

| Deliverable | What "acceptable" means, measurably | How it is checked | Accepted by |
|---|---|---|---|
| D1 Requirements specification | Every requirement has an ID and at least one test case; zero requirements without an owner | Traceability check by the quality lead | Sponsor |
| D2 Prototype | All screens and their empty, loading, error and offline states; at least 5 parents and 2 CDWs complete the five core tasks; no severity 3–4 finding left open | Walkthrough findings log | Sponsor and a CDW representative |
| D3 Privacy impact assessment | Every stored data item has a purpose, a legal basis and a retention period; consent and deletion flows defined | DPO review | Data Protection Officer |
| D4 Activity catalog | At least 80 items; every age band and all four domains covered; 100% of items have a source, reviewer and review date; 0 items with diagnostic wording | Catalog review log and a wording check | ECCD content reviewer |
| D5 Backend API | 100% of endpoints reject unauthenticated requests; 0 cross-account access in tests; automated tests pass; median response under 500 ms on the pilot setup | Automated tests and the security review | Project manager, after QA |
| D6 Flutter app | All test cases pass on Android 10+ phones with 3 GB of RAM; core screens load within 3 seconds on 4G; text contrast at least 4.5:1; touch targets at least 48 px; 0 open severity 1–2 defects | Test reports from 6.1.2 and 6.2.1 | Sponsor, after QA sign-off |
| D7 Test reports | Every requirement traced to a passed test or an accepted known issue | Quality lead review | Quality lead |
| D8 Pilot evaluation | Reports success criteria 1–4 and 7 with figures and method | Sponsor review | Sponsor |
| D9 Training materials | Available in English, Filipino and Hiligaynon; every pilot CDW trained; a parent can install and sign in using only the quick-start sheet | Trial with two parents | OIC District Head |
| D10 Google Play release | Listing approved by Google; privacy notice linked; app signed with the client's key | Release checklist | Sponsor |
| D11 Handover package | The maintainer deploys one update unaided using the runbook | Handover checklist | Maintainer and sponsor |

Defect severity: **1** blocks use or exposes data; **2** breaks a core task with no workaround; **3** breaks a task with a workaround; **4** cosmetic.

## 10.3 Quality Assurance (during the work)

- **Reviews:** every code change is reviewed by the other developer before it is merged; every catalog item is reviewed by the content reviewer; every document is reviewed by one other team member.
- **Standards:** the UI/UX design specification (accessibility, touch targets, wording rules), the Data Privacy Act of 2012, and the catalog's source-recording rules.
- **Wording rule:** no screen or catalog item may use diagnostic or comparative words such as "delayed", "behind", "normal", "score" or "at risk". The quality lead checks this before each release.
- **Continuous testing:** each feature is tested as soon as it is finished (Section 8.1), not only in the system test.
- **Two-weekly demos** to the district office catch misunderstandings early (Section 12).
- **Process audit:** at the midpoint (end of April 2027) the quality lead checks that reviews, test records and the change log are being kept.

## 10.4 Quality Control (at the end)

- **System and regression testing (6.1.2):** about 60 test cases, run twice.
- **Device and accessibility testing (6.2.1):** three entry-level Android phones; contrast and touch-target checks.
- **Security review (6.3.1):** authentication, cross-account access, input validation and AI prompt contents.
- **Usability testing (6.4.1):** six parents, five core tasks, System Usability Scale.
- **Pilot measures (7.2.1–7.3.1):** the charter's success criteria.

Results go into the test reports (D7). A deliverable that fails its criteria goes back to its owner with the failed items listed, and is checked again before acceptance.

## 10.5 Quality Metrics Tracked

| Metric | Target | Reported |
|---|---|---|
| Open severity 1–2 defects | 0 at release | Weekly during testing |
| Test cases passed | 100%, or accepted known issues | End of each test cycle |
| Catalog items fully reviewed | 100% of published items | Weekly during 3.0 |
| Usability: task success | At least 85% | After 6.4.1 |
| Usability: SUS score | 70 or higher | After 6.4.1 and the pilot |
| Weekly active pilot households | At least 60% in 4 of 8 weeks | Weekly during the pilot |
