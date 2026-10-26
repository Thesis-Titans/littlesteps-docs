# LittleSteps Parent Walkthrough Guide

**Status:** Canonical Field Protocol Baseline  
**Governing Standard:** ISO 9241-11:2018 (Usability: Definitions and Concepts)  
**Owner:** Faith (Frontend & Usability Lead)  
**Last Reviewed:** 2026-10-26  
**Associated Gate:** [Docs Issue #15 — [M0] Plan and validate the LittleSteps UI prototype before implementation](https://github.com/Thesis-Titans/littlesteps-docs/issues/15)  
**Related Documents:** [Prototype Traceability and Storyboards](prototype-traceability-storyboards.md), [UI/UX Design Specification](ui-ux-design-specification.md), [Security, Privacy, and AI Safeguards](security-privacy-ai.md)

---

The team tests the Figma prototype informally with **three to five parents it already knows**, such as relatives, neighbours or classmates who are parents of children aged 0–5, and one or two other caregivers such as a grandparent if available. No letter or office visit is needed. Each session takes about 20 minutes and needs two team members: one reads the tasks, one takes notes. Keep what you observed separate from your interpretation.

These sessions are an informal usability check, not research with a representative sample. Report the findings that way.

## 1. Before each session

- [ ] A charged phone with the Figma prototype open in Present mode on the mobile page. Check that flows 1–7 start.
- [ ] A printed or on-screen copy of §3 and the findings sheet in §4.
- [ ] No recording unless the person agrees.

## 2. Consent script (read before every session)

> Thank you for helping us. We are testing a design for an app that helps parents with learning at home for children aged 0 to 5.
>
> It's voluntary. You can skip anything or stop at any time.
>
> We won't ask for your child's name or photos, and we'll write down what you say without your name.
>
> The app on this phone is only a design with sample data. Nothing you tap is saved, and you can't break it.
>
> Is it okay to start?

Note on the findings sheet only that the person agreed. Do not write their name.

## 3. The session

Hand the phone over on the sign-in screen. Read each task aloud, then stay quiet and watch. Help only if the person is stuck for about a minute, and note that you helped.

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

**System Usability Scale (optional, 3 minutes):** if time allows, ask the 10 standard SUS statements, each answered from 1 (strongly disagree) to 5 (strongly agree). With so few people, treat the score as one signal alongside what you observed.

## 4. Findings sheet

Fill in one row per finding, the same day. This matches the findings format in [storyboards §8](prototype-traceability-storyboards.md#8-decisions-to-record-during-walkthrough).

| ID | Participant (P1, P2…) and task | What happened (observed) | Quote | Our interpretation | Other possible explanation | Severity (0–4) | Proposed change | Fix or scope decision |
|---|---|---|---|---|---|---|---|---|
| F1 | | | | | | | | |

## 5. After the sessions

- [ ] Post a summary of the findings in [Docs Issue #15](https://github.com/Thesis-Titans/littlesteps-docs/issues/15), without names.
- [ ] Turn usability fixes into issues for Sprint 2, before the M2–M4 screens are built.
- [ ] Record open questions (such as "Not sure" or the source label wording) as decisions for the team.
