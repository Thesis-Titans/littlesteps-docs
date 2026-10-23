# LittleSteps Prototype Traceability, Storyboards, and Scope

**Status:** Working Design Baseline  
**Governing Reference:** ISO 9241 usability guidance; no claim of formal conformity  
**Associated Gate:** [Docs Issue #15 — [M0] Plan and validate the LittleSteps UI prototype before implementation](https://github.com/Thesis-Titans/littlesteps-docs/issues/15)  
**Related Documents:** [UI/UX Design Specification](ui-ux-design-specification.md), [Traceability Matrix](traceability-matrix.md), [Research Register](research-register.md)

---

**Boundary:** This is a planning and design artifact. It does not authorize production API, Web, or Mobile implementation, use of real personal data, or external AI processing.

---

## 1. Evidence and decision rules

Keep these evidence types distinct:

- **P01 — exploratory caregiver pilot:** one caregiver interview. It illustrates one household's practices; it is not representative of Filipino caregivers. The participant's child was reported to be six years old, so current routines are outside the project's 0–71-month product range; retrospective accounts of ages four to five must be labeled as retrospective.
- **Official and institutional sources:** WHO/UNICEF early-learning guidance, PSA household internet-access statistics, Philippine statutes, and NPC privacy guidance. These support general principles and national context, not LittleSteps demand or feature acceptance.
- **Project constraints:** canonical six-feature scope, synthetic-only prototype data, non-diagnostic language, privacy safeguards, source provenance, and simulated services.
- **Design hypotheses:** proposed responses to the above. Do not present them as confirmed user requirements until tested.

A feature is not validated merely because it is consistent with published guidance. Preserve unanswered questions and contradictory evidence.

## 2. Evidence-to-feature traceability

| Canonical capability | Evidence or constraint | Provisional prototype treatment | What remains unverified |
|---|---|---|---|
| Child profile and milestone tracking | WHO/UNICEF guidance supports responsive caregiving and observation; P01 describes conversation, a notebook, and a whiteboard. Product scope requires sourced, non-diagnostic milestone prompts. | Include synthetic child profiles and a small set of clearly attributed example observation prompts. Avoid exact birth dates when an age band is sufficient. | Whether caregivers want structured prompts, free notes, checklists, or another method; whether the proposed prompts are understandable and culturally appropriate. |
| Daily activity planning and participation | WHO guidance supports play and active movement; P01 mentions swimming, outdoor activity, chess, Snakes and Ladders, books, and writing. | Include activity discovery, details, a simple schedule/mark-as-tried interaction, and participation history using synthetic data. | Preferred planning workflow, reminder needs, material constraints, and willingness to track activities digitally. |
| Private observation journal | P01 reports a paper notebook; project security policy requires private notes and strict access boundaries. | Include a private-by-default observation form with a clear non-diagnostic explanation. Simulate save/error behavior. | Whether digital notes add value over paper; acceptable data categories, retention expectations, and sharing boundaries. |
| Story, rhyme, and learning activity library | WHO/UNICEF guidance supports caregiver-child learning interactions; product scope requires source metadata. | Include a small curated demonstration catalog with age band, language, materials, duration, instructions, source, and review status. Use placeholder/synthetic content only where rights or review are unresolved. | Preferred language by task, content format, accessibility, source trust, and local relevance. |
| Weekly progress summary | Product scope permits a factual summary of recorded activity and observations but prohibits clinical scoring or unsupported developmental conclusions. | Include only if it can be plainly derived from synthetic recorded activity. Label it as participation reflection, not an assessment. | Whether caregivers find summaries useful or interpret them as a judgment of child development. |
| Constrained AI activity suggestion helper | Existing guidance does not establish caregiver trust in AI. Product/security scope requires catalog-grounded suggestions, minimal inputs, no diagnosis, and a deterministic fallback. | If shown, make it a constrained simulated experience using reviewed/placeholder catalog entries, optional age band/time/materials/language inputs, explicit limitations, and a deterministic fallback. Do not send personal data to an external model. | AI trust, perceived usefulness, acceptable inputs, explanation needs, and whether AI adds value beyond ordinary filters. |

## 3. Provisional storyboards

These are design scenarios, not observed journeys or claims about how most caregivers behave.

### Storyboard A — Find a practical activity

1. A caregiver has a short period for shared play and wants an activity suitable for the child's age band.
2. The caregiver browses a small library and filters by activity type or available materials.
3. The activity page explains the purpose, materials, steps, approximate duration, and adult-supervision notes.
4. The caregiver can try the activity without needing to play a video or keep the app open.
5. The caregiver may mark it as tried, but tracking is optional.

**Failure/offline state:** Previously available text instructions remain viewable in the simulation. If an action requires a connection, the UI says so and does not falsely report that it was saved.

**Evidence link:** WHO/UNICEF early-learning guidance; P01 is an illustrative example of offline activities, not population-level validation.

### Storyboard B — Record an observation

1. A caregiver notices a behavior or new skill during everyday activity.
2. The caregiver opens the child's synthetic profile and writes a short observation with an optional date and broad developmental area.
3. The UI distinguishes the caregiver's observation from general educational information.
4. The caregiver can review the note or return to the profile.
5. The UI states that the note is private in the prototype and avoids diagnostic labels.

**Failure state:** A simulated save error clearly distinguishes saved from unsaved content and offers retry. Do not imply persistence if the mock state was reset.

**Evidence link:** Responsive caregiving guidance, P01's notebook practice, and the project's privacy/non-diagnostic constraints.

### Storyboard C — Use learning content with unreliable connectivity

1. A caregiver opens the experience when the network is unavailable.
2. The caregiver can access only the sample content explicitly labeled available in the offline simulation.
3. Network-dependent actions show a clear unavailable/retry state.
4. The UI differentiates local mock state from server synchronization and never claims that data was synced when it was not.

**Evidence link:** PSA's national household internet-access data justifies considering connectivity resilience; it does not establish the connectivity situation of each target user.

## 4. Minimal prototype scope

### P0 — Core walkthrough

All six canonical capabilities are P0. The weekly summary and the AI helper are core features in the product scope, and an AI-powered feature is a CC 207B requirement, so they are not optional.

- Sign-in, plus settings, privacy notice, and about views reachable from the header avatar.
- Responsive caregiver home/dashboard with synthetic data.
- Child switcher/profile and age-band context.
- Learning library with source/provisional-review metadata.
- Activity detail and a simple schedule/mark-as-tried flow.
- Non-diagnostic observation entry and review.
- Empty, loading, error, unauthorized/permission-denied, and simulated offline states.
- Clear privacy boundary and content-source attribution.
- Factual weekly participation summary based solely on synthetic records.
- Constrained suggestion-helper simulation with catalog-grounded options and deterministic fallback.
- Figma frames at 1280px (desktop) and 375px (mobile browser), following the coverage rule in [UI/UX Design Specification §7](ui-ux-design-specification.md). The native Flutter client is outside this prototype.

### P1 — Secondary evaluation, only if the core flow remains coherent

- Language selection/alternate-language samples.

### Out of scope for this prototype

- Any code. The prototype is built in Figma; production backend/API integration, migrations, live database writes, cloud billing, real child/caregiver data, real external AI calls, and native mobile implementation are all excluded.
- Clinical scores, diagnosis, pass/fail milestone labels, or unsupported developmental claims.
- Public child profiles, social feeds, or open child-to-child messaging.
- Claims of validated demand, developmental efficacy, or sustained adoption.

This prototype treatment should be compared against the canonical six-feature scope and any project decision that formally changes it; it must not silently redefine the product scope.

## 5. Prototype walkthrough acceptance criteria

Record evidence for each criterion rather than relying only on a participant saying they like the design.

- [ ] A reviewer can navigate the core caregiver flow at desktop/tablet and mobile-sized browser widths.
- [ ] All six canonical capabilities are represented. Any omission needs a scope decision recorded in Docs Issue #15 before the walkthrough.
- [ ] A reviewer can find an activity and explain the displayed instructions.
- [ ] A reviewer can add/review a non-diagnostic observation without confusing it with a clinical assessment.
- [ ] The interface visibly distinguishes source-attributed content from placeholder or not-yet-reviewed content.
- [ ] Empty, loading, error, permission-denied, offline/unavailable, and suggestion-fallback states are demonstrated.
- [ ] The interface explains privacy boundaries and does not expose private notes publicly.
- [ ] Synthetic-only data is used throughout; mock save/sync behavior is represented honestly.
- [ ] Feedback records task completion, errors, assistance, confusion, and participant comments separately.
- [ ] Any unresolved content, privacy, accessibility, or safety concern is logged instead of silently accepted.

SUS ≥80 may be recorded as an aspirational usability benchmark if used, but it must not replace task observation or be presented as evidence of product-market fit.

## 6. Research limitations and remaining questions

1. P01 is one exploratory pilot and is not a representative sample. Its child's current age falls outside the 0–71-month product scope; retrospective observations should be identified as such.
2. Secondary sources establish general guidance and national context, not the target cohort's actual needs, language preference, device-sharing prevalence, AI trust, or willingness to share information.
3. Do not claim that most Filipino caregivers want LittleSteps, that caregivers trust AI advice, or that LittleSteps improves developmental outcomes.
4. Review exact source versions, page/section locators, adaptation rights, and subject-matter approval before real learning/milestone content is represented as reviewed.
5. The responsible school/team authority must review privacy notice, lawful basis/consent, access, retention/deletion, withdrawal, vendor processing, and incident handling before collecting real data.
6. Keep the prototype synthetic and simulated. No production implementation should begin as a side effect of this design artifact.

## 7. Decisions to record during walkthrough

For each finding, record: observation, task/context, evidence excerpt or event, interpretation, alternative explanation, severity, confidence, proposed change, and whether the change is a usability fix or a scope decision. Keep observed facts separate from interpretations.

The walkthrough can proceed as an exploratory design evaluation if project leadership authorizes it, but findings must be labeled preliminary until the team's agreed review process is completed.
