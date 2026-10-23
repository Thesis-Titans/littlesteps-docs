# Client Interview and Prototype Walkthrough Guide

**Status:** Draft field guide for Sprint 1 (26 October – 1 November 2026)  
**Used for:** the CIT 246 baseline and evidence of client contact, and the caregiver walkthrough in [Docs Issue #15](https://github.com/Thesis-Titans/littlesteps-docs/issues/15)  
**Related Documents:** [Request Letter](academic/cit246/client-request-letter.md), [Prototype Traceability and Storyboards](prototype-traceability-storyboards.md), [CIT 246 Deliverables](academic/cit246/README.md), [Security, Privacy, and AI Safeguards](security-privacy-ai.md)

---

One visit to the CSWDO La Paz–Lapuz District office can cover three sessions. Each needs two team members: one asks, one takes notes. Keep observed facts separate from your interpretation.

| Session | With whom | Length | Main purpose |
|---|---|---|---|
| A | OIC District Head | 30 min | Sponsor, pilot centers, scale and funding |
| B | One or two Child Development Workers | 30 min | Current home-learning process and baseline figures |
| C | Three to five parents, plus one or two other caregivers if available | 20 min each | Prototype walkthrough |

## 1. Before the visit

- [ ] The request letter has been received and a date agreed.
- [ ] Two printed consent sheets per person (one for them, one for us).
- [ ] A charged phone with the Figma prototype open in Present mode on the mobile page. Test that flows 1–7 start, and turn on airplane mode only if the venue has no signal and the prototype is already loaded.
- [ ] Printed copies of sections A–C below and the findings sheet in §6.
- [ ] No recording device unless the person agrees on the consent sheet.

## 2. Consent script (read before every session)

> Thank you for meeting us. We are WVSU students working on a school project about an app that helps parents with learning at home for children aged 0 to 5.
>
> Taking part is voluntary. You can skip any question or stop at any time, and that's fine.
>
> We will not ask for your child's name, photo or records. We will write down your answers without your name, unless you tell us you want to be named. If you agree, we may take a photo of the session without faces, or of a form you use, for our report.
>
> The app on this phone is only a design with sample data. Nothing you tap is saved.
>
> Do you have any questions? May we begin?

Record on the consent sheet: agreed (yes/no), may we quote you without your name (yes/no), may we take a photo without faces (yes/no), may we name you in the report (yes/no), and the date. Do not write the person's name on the notes page.

## 3. Session A — OIC District Head

1. How many Child Development Centers and Child Development Workers does the office supervise in La Paz and Lapuz?
2. Roughly how many children and families does a typical center serve?
3. How do centers share learning-at-home ideas with parents today? Handouts, notebooks, group chats, meetings?
4. What problems do you see with that today?
5. Is there anything CDWs are already asked to report about home learning? We want to make sure the app adds no reporting work.
6. Would your office be willing to act as the sponsor for our project management plan? This is an academic exercise only. May we name you in it?
7. Which two centers in La Paz would be best for a pilot, and why?
8. If a city office paid for something like this, where would the funds usually come from? For example, local funds, the Special Education Fund, the Gender and Development Fund, or a grant.
9. Has the city set up its ECCD office under the new ECCD System Act rules yet? Who should we talk to there?
10. Who looks after data privacy for your office? Is there a Data Protection Officer?
11. Are there forms or handouts you use now that we could photograph for our report, with no children's information on them?

## 4. Session B — Child Development Workers

1. Walk us through what happens when you want a parent to try an activity at home.
2. About how many hours a week do you spend preparing and sharing home-activity handouts?
3. About how much does printing those handouts cost the center in a school year?
4. Do parents keep a home notebook or record? In a school year, about how many are lost or never brought back?
5. About how many families in your class have an Android phone they can use at least once a week?
6. What do parents most often ask you about their child's development?
7. When a parent is worried about their child, what do you advise, and who do you refer them to?
8. Would an app like this make your work easier, harder, or no different? What would worry you about it?
9. Would you prefer to keep anything on paper? Why?
10. Would you be willing to review some activity ideas for us later?

Question 8 is where a CDW who prefers the paper system will speak up. Note their concerns in their own words; they shape the stakeholder register's management plan.

## 5. Session C — Parent walkthrough

Hand the phone over on the sign-in screen. Read each task aloud, then stay quiet and watch. Help only if the parent is stuck for about a minute, and note that you helped.

**Warm-up (2 minutes)**

- How old is your child, roughly? (an age range is enough)
- Who else looks after your child at home, if anyone?
- Does anyone else use this phone?

**Tasks**

| # | Task to read aloud | Prototype flow | Success looks like |
|---|---|---|---|
| 1 | "Sign in and find today's plan for Maya." | 1 | Reaches Today without help |
| 2 | "You have 10 minutes and some cups and a towel. Find something to play." | 2 or the Explore tab | Opens a suggestion or catalog activity and can explain the steps |
| 3 | "You tapped 'Mark complete' by mistake. Fix it." | 1 | Uses Undo on the toast |
| 4 | "You noticed Maya stacking cups. Record that somewhere." | 4 or 5 | Records it in Milestones or the Journal; note which and why |
| 5 | "Write a private note about today, then delete it." | 5 | Saves a note, then confirms the delete |
| 6 | "The internet suggestion isn't working. What can you still do?" | 3 | Understands the catalog picks and can add one |
| 7 | "Find out how many activities Maya did this week." | This week tab | Reads the totals correctly |

**Questions after the tasks** (from the design review, [storyboards §7](prototype-traceability-storyboards.md#7-walkthrough-questions-from-the-design-review))

1. Did anything make you feel judged as a parent, or worried about your child?
2. What do you think "Provisional Academic Reference — Pending Review" means?
3. When recording what you saw, would a "Not sure" answer help, as well as "Observed" and "Not yet observed"?
4. Is "This week" a clear name for the weekly summary?
5. When during the day would you use this? Is the screen comfortable in a dim room?
6. Would you rather use the app in English, Filipino or Hiligaynon?
7. Who would you want to see your notes, if anyone?
8. Would you use this? What would stop you?

**System Usability Scale (optional, 3 minutes):** if time allows, ask the 10 standard SUS statements, each answered from 1 (strongly disagree) to 5 (strongly agree). Treat the score as one signal alongside what you observed, not as proof that the design works.

## 6. Findings sheet

Fill in one row per finding, the same day. This matches the findings format in [storyboards §8](prototype-traceability-storyboards.md#8-decisions-to-record-during-walkthrough).

| ID | Session and task | What happened (observed) | Quote, if agreed | Our interpretation | Other possible explanation | Severity (0–4) | Proposed change | Fix or scope decision |
|---|---|---|---|---|---|---|---|---|
| F1 | | | | | | | | |

**Baseline figures for CIT 246 §3.2:** copy the answers to A1–A2 and B2–B5 into the business case table, replacing the planning estimates, and note the source as "CSWDO La Paz–Lapuz interview, [date]".

## 7. After the visit

- [ ] Send a thank-you message to the District Head within two days.
- [ ] Record the findings in [Docs Issue #15](https://github.com/Thesis-Titans/littlesteps-docs/issues/15) and turn usability fixes into issues for Sprint 2.
- [ ] Update CIT 246 §3.2, §4.5 and §5 with confirmed facts, and add only names that people agreed to.
- [ ] File the received copy of the letter, the consent sheets (kept offline and not uploaded), anonymized notes and any agreed photos for CIT 246 Appendix 17.
