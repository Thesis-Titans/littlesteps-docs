# LittleSteps Usability & Design Evaluation

**Status:** Canonical Usability, Walkthrough & Design Review Package  
**Governing Standards:** ISO 9241-11:2018 (Usability), Nielsen's 10 Usability Heuristics, & WCAG 2.2 AA  
**Owners:** Nherie C. Acebuche (Frontend Lead), Mae Daniella Faith C. Benjamin (Usability & QA Lead), Vincent John A. Tamaño (Docs & Content Lead), Mark Alvin C. Cadangin (Technical Lead)  
**Last Reviewed:** 2026-11-28  
**Related Documents:** [UI/UX Design Specification](ui-ux-design-specification.md), [DESIGN.md](DESIGN.md), [Product Scope](product-scope.md), [Traceability Matrix](traceability-matrix.md), [Security, Privacy, and AI Safeguards](security-privacy-ai.md)

---

This document consolidates four complementary design-validation artifacts into a single canonical reference:
1. **Prototype Traceability & Caregiver Storyboards** (M0 evidence-to-feature mapping and post-M0 design resolutions).
2. **Informal Parent Walkthrough Protocol** (consent script, task matrix, debrief questions, and findings format).
3. **Nielsen Heuristic Evaluation & Pre-Submission Audit** (10-heuristic review baseline and architectural clarifications).
4. **Design Review Rubric** (code and frame checklist for React, Flutter, and Figma, with upstream MIT attribution).

---

## 1. Prototype Traceability & Caregiver Storyboards (M0 Baseline)

### 1.1 Evidence Rules & Research Limitations
Keep evidence types strictly distinct:
- **Exploratory pilot (`P01`):** One informal caregiver interview illustrating a single household's practices (paper notebook, whiteboard, everyday games). Not representative of Filipino caregivers broadly; retrospective observations of ages 4–5 are labeled accordingly.
- **Official and institutional sources:** WHO/UNICEF Nurturing Care guidance, PSA household connectivity context, Philippine statutes (RA 10173, RA 12199), and ECCD/DepEd frameworks. These support general principles, not product demand.
- **Project constraints:** Six-feature canonical scope (FR-01..06), synthetic-only demo data, non-diagnostic language, privacy isolation, and server-side AI fallbacks.
- **Design hypotheses:** Proposed UI responses validated through walkthroughs and heuristic reviews rather than assumed as established facts.

### 1.2 Evidence-to-Feature Traceability

| Canonical Capability | Evidence / Constraint | Prototype & Implementation Treatment | Post-M0 Resolution Status |
| :--- | :--- | :--- | :--- |
| **FR-01: Child Profile & Milestones** | WHO/UNICEF responsive caregiving; P01 paper notebook; RA 10173 data minimization. | Nickname + birth month or coarse age band (no exact birth dates, surnames, or photos); observational prompts with `"Seen on [date]"` / `"Not seen yet"` / `"Not sure"`. | Implemented across API, React, and Flutter; `"Not sure"` status supported in schema (`observed`, `not_yet_observed`, `not_sure`). |
| **FR-02: Daily Activity Planning** | WHO active play guidance; caregiver routine flexibility. | Today schedule with quick filters (`Under 10 mins`, `No materials needed`, `Indoor`, `Outdoor`), 1-tap completion with 10 s Undo toast, and optional Open-Meteo weather play hint. | Implemented across API, React, and Flutter; `.today-hero` false alert banner removed ([ADR-014](architecture-decisions.md)). |
| **FR-03: Private Observation Journal** | P01 notebook habit; RA 10173 confidentiality. | Caregiver-isolated qualitative notes with clear privacy explanation, excluded from AI prompts, telemetry, and local offline caches. | Implemented across API, React, and Flutter; verified by automated AI-isolation tests. |
| **FR-04: Story, Rhyme & Activity Library** | WHO/UNICEF shared reading & play; Philippine ECCD provenance. | Searchable Firestore-backed activity catalog, Open Library picture-book search, saved Family Bookshelf ([ADR-015](architecture-decisions.md)), and in-app English/Filipino/Hiligaynon rhymes. | Implemented across API, React, and Flutter; source-checked catalog in Firestore (`Docs #3` adviser sign-off remains open). |
| **FR-05: Weekly Progress Summary** | Non-diagnostic scope boundary. | Factual Monday–Sunday activity and milestone counts by kind of play (`Thinking`, `Moving`, `Talking`, `Feelings`) with calm reflection prompt; zero clinical scores or streaks. | Implemented as `"This week"` across API, React, and Flutter. |
| **FR-06: Constrained AI Helper** | Household material variability; CC 207B AI criteria; child safety. | Structured form (`time`, `where`, `materials`, `language`) + Open Library story companion + activity adaptation, backed by 3-layer pediatric guardrails and deterministic catalog fallback. | Implemented across API, React, and Flutter; free-text chat removed ([ADR-013](architecture-decisions.md)). |

### 1.3 Provisional Caregiver Storyboards
- **Storyboard A — Find a practical activity:** Caregiver selects a short screen-free activity filtered by age band, materials, or setting, reviews steps and supervision notes, sets the phone down to play, and optionally marks it complete.
- **Storyboard B — Record an observation:** Caregiver notices a moment during play, logs a dated milestone cue or private journal note under the active child chip, and sees clear confirmation or honest offline-retry feedback without losing typed drafts.
- **Storyboard C — Unreliable connectivity:** Cached catalog activities, plans, and saved books remain viewable while offline; network-dependent actions clearly display an offline state and never falsely claim a save succeeded.

### 1.4 M0 Prototype Walkthrough Acceptance Criteria
Walkthrough evaluation (tracked in [Docs Issue #15](https://github.com/Thesis-Titans/littlesteps-docs/issues/15)) checked all 10 criteria across desktop (1280px) and mobile (375px) Figma frames: core navigation, all six capabilities represented, clear activity instructions, non-diagnostic observation wording, honest source attribution, 5-state coverage (populated, empty, loading, error/denied, offline/fallback), private journal boundary, synthetic data honesty, separate observation vs. interpretation logging, and unresolved issue tracking.

---

## 2. Informal Parent Walkthrough Protocol (ISO 9241-11:2018)

An informal usability check conducted with parents of children aged 0–5 (relatives, neighbors, or classmates) using synthetic prototype data. Informal walkthroughs inform UI refinements and are never reported as statistically representative research. *(M0 walkthrough completed on 2026-10-30 with two participants; gate report logged in Docs Issue #15.)*

### 2.1 Preparation & Ethical Consent Script
Prepare a charged phone with the prototype open, a notes sheet, and obtain verbal consent without recording personal names:

> *"Thank you for helping us. We are testing a design for an app that helps parents with learning at home for children aged 0 to 5. It's voluntary — you can skip anything or stop at any time. We won't ask for your child's name or photos, and we'll write down what you say without your name. The app on this phone uses sample data; nothing you tap is saved, and you can't break it. Is it okay to start?"*

### 2.2 Core Task Matrix

| # | Task Read Aloud | Target Flow | Success Indicator |
| :---: | :--- | :--- | :--- |
| 1 | "Sign in and find today's plan for Maya." | Sign-in → Today | Reaches Today without assistance |
| 2 | "You have 10 minutes and some cups and a towel. Find something to play." | Idea Helper or Explore | Opens a suggestion/activity and explains the steps |
| 3 | "You tapped 'Mark complete' by mistake. Fix it." | Today Undo toast | Uses Undo action on toast |
| 4 | "You noticed Maya stacking cups. Write that down somewhere." | Milestones or Journal | Logs observation; facilitator notes chosen screen and rationale |
| 5 | "Write a private note about today, then delete it." | Journal | Saves note and completes named delete confirmation |
| 6 | "The idea helper isn't working. What can you still do?" | AI Fallback | Understands `"Our picks"` and adds an activity |
| 7 | "Find out how many activities Maya did this week." | This week | Reads factual totals without mistaking them for a score |
| 8 | "Find a picture book about food and get a play idea to go with it." | Storybooks → Story companion | Opens book, views AI-labeled idea, and adds to plan |

### 2.3 Debrief Questions & Findings Recording Format
Post-task questions probe emotional tone (no judgment/anxiety), clarity of `"This week"`, usefulness of `"Not sure"` on observations, evening readability, language preference (`en`/`fil`/`hil`), shared-phone habits, and confusing wording. Optional 10-item SUS is treated strictly as a directional signal alongside observed task behavior.

Record findings on the same day separating observed facts from interpretation:

| ID | Participant & Task | Observed Behavior | Quote | Interpretation | Alternative Explanation | Severity (0–4) | Proposed Change | Decision |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- | :--- |
| F1 | | | | | | | | |

---

## 3. Nielsen Heuristic Evaluation & Pre-Submission Audit

### 3.1 Methodology & Severity Scale
Evaluators assess all core user journeys (FR-01..06 + PRQ-01..03) across React and Flutter against Nielsen's 10 Usability Heuristics using the standard 0–4 severity scale (`0` = No problem, `1` = Cosmetic, `2` = Minor, `3` = Major, `4` = Catastrophe).

### 3.2 Team Evaluator Coverage

| Evaluator | Role | Assigned Heuristics | Status |
| :--- | :--- | :--- | :--- |
| **Vincent John A. Tamaño** (`@vincenttamano`) | Docs & Backend Lead | H1 (Status), H2 (ECCD wording), H9 (Error recovery) | Reviewed |
| **Nherie C. Acebuche** (`@Lovelly143`) | Frontend Lead | H4 (Tokens & consistency), H8 (Minimalist & responsive layout) | Reviewed |
| **Mae Daniella Faith C. Benjamin** (`@faithbn`) | Frontend & QA Lead | H3 (Freedom & undo), H5 (Error prevention), H7 (Efficiency) | Reviewed |
| **Justin Ace D. Ardeña** (`@Justin-Ardena`) | Backend Lead | H1 (Offline status), H9 (API error envelopes & rate limits) | Reviewed |
| **Mark Alvin C. Cadangin** (`@markalvincadangin`) | Project & Tech Lead | H6 (Recognition), H10 (Help & documentation), Synthesis | Reviewed |

### 3.3 React Web Client Heuristic Audit & Verified Resolutions (2026-11-28)

A full code and UX pass over `littlesteps-react` verified all 10 heuristics and resolved every Severity 1–3 finding before CIT 210 submission:

| Heuristic | Initial Severity | Verified Finding | Verified Resolution |
| :--- | :---: | :--- | :--- |
| **H1: Visibility of System Status** | 2 | Offline alerts used `kind="info"` on Journal, This Week, and Storybooks instead of `kind="offline"`; This Week omitted an `"unauthorized"` alert handler. | Standardized offline notices to `InlineAlert kind="offline"`, added `SessionExpiredAlert` across screens including This Week. |
| **H2: Match Between System & Real World** | 3 | Internal placeholders (`"Pending Review"`, `"Sample wording, not reviewed"`, `"still being checked"`, `"to be confirmed by the team"`) and banned copy (`"Generate adaptation"`, `"Not developmental assessment."`, hardcoded `"toddler"`) appeared in UI strings. | Replaced all internal placeholders and jargon with calm caregiver copy, `"Adjust activity"`, and published framework citations (CDC, WHO/UNICEF, ECCD Council, DepEd MATATAG, Open Library). |
| **H3: User Control & Freedom** | 3 | Empty-week `"Explore play ideas"` set `window.location.hash = "#/explore"` (no-op under `BrowserRouter`); `/forgot-password` linked to a non-existent route; Play Idea `<dialog>` lacked focus restoration; Settings disabled RA 10173 data export and account deletion. | Switched to `useNavigate()("/explore")`, added an inline Firebase password reset modal on Sign-In, unified modals on `ModalDialog` with `useRestoreFocus`, and wired live `GET /api/v1/me/export` and `DELETE /api/v1/me` in Settings. |
| **H4: Consistency & Standards** | 2 | Chip toggle groups used invalid `role="radiogroup"`; inline `style={{ ... }}` and imperative image `onError` DOM mutation bypassed shared styling; auth forms duplicated password toggle markup. | Changed chip groups to `role="group"`, moved inline styles to tokenized CSS (`storybooks.css`, `milestones.css`, `this-week.css`), added declarative `StorybookCard`/`BookCover`, and shared `PasswordField`. |
| **H5: Error Prevention** | 3 | `JournalScreen` and `ThisWeekScreen` omitted `key={activeChild.id}`, allowing unsaved journal drafts or filters to carry over when switching children. | Added `key={activeChild.id}` on inner child-scoped views so switching children always starts clean. |
| **H6: Recognition Rather Than Recall** | 3 | Milestones bundled only `12-23m` prompts (leaving the other 6 age bands empty) and Today's sidebar hardcoded three `12-23m` cues for every child. | Wired Milestones to live `GET /api/v1/catalog/milestones` with full 7-band fallback (`0-5m` to `60-71m`) and populated Today's sidebar from the active child's age band. |
| **H7: Flexibility & Efficiency of Use** | 2 | Today's Weather Hint only rendered a CTA on rainy weather and routed to `/explore` without preselecting `setting` in `IdeaHelper`. | Made Weather Hint CTA symmetric (`"Find indoor ideas"` / `"Find outdoor ideas"`) and passed route state `{ presetSetting }` to preselect `"Where will you play?"`. |
| **H8: Aesthetic & Minimalist Design** | 1 | Retry buttons used inline top margins instead of `InlineAlert action`; Storybooks duplicated card markup across tabs; `catalog.css` mixed catalog and storybook rules; missing favicon, broken desktop Create Account split layout, harsh programmatic `<h1>` focus box, over-stretched filters, stacked vertical clutter on `Explore`/`Journal`/`This week`, and `1,360 px` whitespace imbalance. | Standardized `InlineAlert action={...}`, extracted reusable `StorybookCard`, `AuthBrandPanel`, `FilterChips`, `SegmentedTabs`, and `TwoColumnLayout`, aligned `Explore` to 4 top-level tabs with compact `IdeaHelperBanner` and direct card `"Adapt"`, docked advisory toggles in `ScreenHeader`, unified `1160 px` / `720 px` containers, added `public/favicon.svg`, cleared `<h1>` focus ring, and normalized `"none"` materials. |
| **H9: Error Diagnosis & Recovery** | 2 | Journal offline retry constructed a synthetic `FormEvent` cast; activity adaptation relied on `as unknown as` casts. | Extracted clean `saveEntry()` handler and typed optional fields on `AdaptedActivitySuggestion`. |
| **H10: Help & Documentation** | 2 | About lacked published framework links; Privacy and Help still described export/deletion as unavailable. | Centralized links in `src/config/externalLinks.ts`, added clickable framework citations on About, and synced Privacy/Help with live RA 10173 controls. |

### 3.4 Key Usability & HCI Enhancements Verified Across Both Clients
1. **Standardized Iconography (H4):** Replaced informal unicode emojis on user-facing screens with tokenized SVG/Material icons.
2. **Grounded Caregiver Copy (H2):** Removed promotional buzzwords and clinical/technical jargon; standardized `"Edit preferences"`, `"Another idea"`, and sentence-case labels per [UI/UX Design Specification](ui-ux-design-specification.md) §2.6.
3. **Header & Alert Affordance Cleanup (H8, [ADR-014](architecture-decisions.md)):** Eliminated the alert-styled `.today-hero` callout banner and 5-way greeting repetition; integrated the time-of-day greeting cleanly into the screen header subtitle.
4. **WCAG 2.2 AA Contrast Sync (H4 / WCAG 1.4.3):** Darkened secondary text token from `#63756E` to `#5A6A64` across React and Flutter so every surface clears 4.5:1 contrast.
5. **Closed-Loop Storybook & Weather Flows (H7, [ADR-009](architecture-decisions.md), [ADR-013](architecture-decisions.md), [ADR-015](architecture-decisions.md)):** Connected Open Library book search and Family Bookshelf directly to `"Add to today's plan"`, and routed the symmetric Weather Hint CTA directly into the AI Idea Helper with `"Where will you play?"` preselected.
6. **Horizontal Filter Bar & Responsive Stability (H4, H8):** Fixed scroll-position reset on horizontal chip bars (`HorizontalScrollFade`) and modularized Material 3 adaptive layout wrappers (`AppWindowSize`, `ResponsiveContentBox`, `AdaptiveTwoPane`) in Flutter.
7. **Honest Offline & Fallback Invariants (H1, H5, H9):** Disabling network connectivity renders calm offline banners, disables unsafe writes without claiming success, and seamlessly serves reviewed Tier 3 catalog picks when AI is unavailable.

### 3.5 Key UX Architecture Justifications
- **Structured AI Form Instead of Free Chat:** Prevents pediatric hallucination and clinical advice requests, guarantees RA 10173 prompt minimization (zero child names or journal text), and keeps interaction under 5 seconds for busy caregivers.
- **Bibliographic Book Metadata Instead of In-App Full Text:** Respects copyright on Open Library works and reinforces screen-free parent-child reading; in-app readable traditional Philippine rhymes (*Bahay Kubo*, *Ili-Ili Tulog Anay*, etc.) support families without physical picture books on hand.

---

## 4. Design Review Rubric (React, Flutter & Figma)

Applied during code reviews (React and Flutter) and Figma frame reviews. **Order of authority:** Figma → [UI/UX Design Specification](ui-ux-design-specification.md) → [DESIGN.md](DESIGN.md) → this checklist.

### 4.1 LittleSteps Product & Token Rules (All Reviews)
- **Contrast:** Normal text ≥ 4.5:1; large text and input borders ≥ 3:1 (WCAG 1.4.3, 1.4.11). Primary text (`#1A2B29`) preferred on Caution, Info, Offline, and Soft Green surfaces.
- **Touch targets:** ≥ 48 × 48 px/dp for frequent and primary controls; 44 × 44 floor; ≥ 8 px/dp spacing between adjacent targets.
- **Typography & reflow:** Body text ≥ 16 px; any parent-readable sentence ≥ 14 px; running text near 70 characters per line; layouts hold at 200% text scaling and 320 px width with zero unintended horizontal overflow (WCAG 1.4.4, 1.4.10).
- **Color independence:** Every status combines color, icon, and text (WCAG 1.4.1).
- **Calm, plain voice:** Sentence case everywhere; one primary action per screen; zero streaks, scores, delay labels, urgency cues, or technical jargon (`catalog`, `domain`, `observation`, `assessment`, `analytics`, `generate`, `JSON`); AI outputs always carry `"Suggested by AI"` (or `"Material adaptation"`).
- **Strict token discipline:** Zero hardcoded colors, font sizes, radii, or durations outside `tokens.css` (React) or `lib/theme/app_tokens.dart` (Flutter).

### 4.2 Interaction & Accessibility (Code & Frames)
- Icon-only buttons expose an accessible name (`aria-label` / Flutter `tooltip` & `Semantics`); decorative icons and illustrations are hidden from assistive technology.
- Every form control has a visible label; placeholders are examples only.
- Semantic controls only (`<button>`/`<a>` in React, never clickable `<div>`; Material buttons/chips in Flutter). Full keyboard support with visible 2 px focus rings (`:focus-visible`) never obscured by sticky bars (WCAG 2.4.7, 2.4.11).
- Async updates announce politely (`role="status"` / `aria-live="polite"` / `Semantics(liveRegion: true)`); errors use `role="alert"`.
- Reversible actions provide ≥ 10 s Undo; irreversible deletes require a confirmation dialog whose button names the destructive action with Cancel focused first.
- Sign-in permits paste and password managers; no CAPTCHA or memory test (WCAG 3.3.8).

### 4.3 Forms, Motion & Content Handling (Code)
- Inputs carry appropriate `name`, `autocomplete`, `type`, and `inputmode` (React) or `TextInputType` / `autofillHints` (Flutter); never block paste; validate inline and lock submit while busy; confirm before discarding unsaved typed text.
- Honor `prefers-reduced-motion` / `MediaQuery.disableAnimations` (static skeletons, zero shimmer or tap-scale); animate `transform`/`opacity` only (never `transition: all`); durations ≤ 300 ms except skeletons and AI loading indicators.
- Handle short, average, and very long text cleanly (`min-width: 0`, ellipsis/wrapping); render explicit empty states for empty lists; format dates via `Intl.*` / `package:intl`.
- **Flag immediately:** `user-scalable=no`, `onPaste` calling `preventDefault`, `transition: all`, `outline: none` without replacement, `<div onClick>`, unlabeled inputs, hardcoded hex/pixel values, or false offline-save notices.

### 4.4 Review Output Format
Group findings by file or frame, one line per issue (`file:line - issue`), ending with `pass` when clean.

### 4.5 Source Attribution & Licence (Section 4)
Sections 4.2 and 4.3 are adapted from Vercel's [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines) (`command.md`, commit `4ecfb9fb8d1d3b7009674869b3aaee2f904042e1`, 2026-10-05), published under the MIT licence, customized for LittleSteps' React/Flutter architecture, sentence-case rules, and WCAG 2.2 AA standards.

Copyright (c) 2025 Vercel Labs. Permission is granted, free of charge, to use, copy, modify and distribute the source under the MIT licence; the full licence text is in the [upstream LICENSE](https://github.com/vercel-labs/web-interface-guidelines/blob/main/LICENSE). The source is provided "as is", without warranty of any kind. Update this file only by pull request.
