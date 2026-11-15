# LittleSteps Heuristic Evaluation (Jakob Nielsen's 10 Usability Heuristics)

**Status:** Pre-Evaluation Baseline & Team Evaluation Guide  
**Owner:** Vincent Tamano (Lead), Lovelly / Nherie, Faith, Justin, Mark  
**Evaluation Standard:** Nielsen Norman Group 10 Usability Heuristics for User Interface Design  
**Date:** November 2026  
**Related Documents:** [UI/UX Design Specification](ui-ux-design-specification.md), [Design Review Rubric](design-review-rubric.md), [Product Scope](product-scope.md)

---

## 1. Objective and Evaluation Methodology

The purpose of this heuristic evaluation is to assess the LittleSteps React application against established human-computer interaction (HCI) standards before final demonstrations and submissions.

Evaluators inspect the application's core user journeys:
1. **Child Profile Setup & Switcher** (FR-01)
2. **Daily Routine & Execution on Today** (FR-02)
3. **Philippine ECCD Early Learning Catalog Browsing** (FR-04)
4. **AI-Powered Play Idea Helper & Deterministic Fallback** (FR-06)
5. **Private Caregiver Journal** (FR-03)
6. **Milestones & Observational Cues** (FR-01)
7. **Weekly Reflection & Growth Summary** (FR-05)

### Nielsen Severity Rating Scale
Each identified usability issue is assigned a severity rating:
- **0 = No Problem**: Pure cosmetic or preferential observation; does not affect usability.
- **1 = Cosmetic Problem Only**: Need not be fixed unless extra time is available.
- **2 = Minor Usability Problem**: Low priority; causes slight hesitation or friction.
- **3 = Major Usability Problem**: High priority; causes notable confusion or error; important to fix.
- **4 = Usability Catastrophe**: Imperative to fix; prevents completion of task or violates safety invariants.

---

## 2. Nielsen's 10 Heuristics Assessment & Checklist

### Heuristic 1: Visibility of System Status
*The design should always keep users informed about what is going on, through appropriate feedback within a reasonable amount of time.*
- [ ] **Loading states**: Skeleton cards and loading bars are shown during async API fetches.
- [ ] **Action feedback**: Marking an activity complete immediately shows an inline completed badge and an Undo toast (`role="status"`, `aria-live="polite"`).
- [ ] **Saving status**: Journal entry saves show timestamp and persistence confirmation.
- [ ] **Real-time network awareness**: Offline alert bar renders immediately when network connection is severed.

### Heuristic 2: Match Between System and the Real World
*The design should speak the users' language, with words, phrases, and concepts familiar to the user, rather than internal jargon.*
- [ ] **Grounded Caregiver Language**: No clinical, diagnostic, or psychometric jargon. Uses friendly terms ("Things to notice", "Play ideas", "This week").
- [ ] **Anti-AI Buzzword Invariant**: Free from promotional buzzwords (*"Find a personalized play idea in seconds"*, *"seamless"*, *"supercharge"*).
- [ ] **Local Context**: Philippine ECCD developmental domains are mapped to understandable everyday themes (*Cognitive / Thinking*, *Motor / Moving*, *Language / Talking*, *Socio-Emotional / Relating*).

### Heuristic 3: User Control and Freedom
*Users often perform actions by mistake. They need a clearly marked "emergency exit" to leave the unwanted action without having to go through an extended process.*
- [ ] **Undo Mechanism**: Activity completion offers a 10-second sticky Undo toast with keyboard focus management.
- [ ] **Dialog Escape**: All modals (`PlanActivityDialog`, `ChildSwitcher`, catalog detail) dismiss on `Escape` key, click outside, or Cancel/Close buttons.
- [ ] **Child Switching**: Caregivers can switch between multiple children at any time from the persistent chip or menu without losing unsaved journal drafts.

### Heuristic 4: Consistency and Standards
*Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform and industry conventions.*
- [ ] **Design Tokens**: Standard font sizes (`--font-*`), spacing (`--space-*`), and color variables (`--color-brand-forest`, `--color-surface-card`) used throughout.
- [ ] **Icon Standards**: 100% SVG icon components (`<Icon name="..." />`). Zero loose unicode emojis.
- [ ] **Consistent Action Placement**: Primary buttons use consistent forest green styling; secondary actions use clear bordered style.

### Heuristic 5: Error Prevention
*Good error messages are important, but the best designs carefully prevent problems from occurring in the first place.*
- [ ] **Input Constraints**: Date selectors disable future dates where inappropriate, and disallow invalid scheduled dates.
- [ ] **Non-Diagnostic Advisory**: Prominent, persistent non-diagnostic disclaimer ensures caregivers do not mistake developmental play cues for diagnostic medical tests.
- [ ] **Offline Guardrails**: Destructive or irreversible writes are prevented when offline; no false claims of success.

### Heuristic 6: Recognition Rather than Recall
*Minimize the user's memory load by making elements, actions, and options visible. The user should not have to remember information from one part of the interface to another.*
- [ ] **Active Child Persistence**: Active child's name and age band remain visible in the top header and switcher chip.
- [ ] **Filter Chips**: Quick filters show selected state visibly.
- [ ] **Materials Cue**: Idea Helper displays pre-filled popular household materials (*"cups, spoon, towel, paper"*).

### Heuristic 7: Flexibility and Efficiency of Use
*Shortcuts — hidden from novice users — may speed up the interaction for the expert user such that the design can cater to both inexperienced and experienced users.*
- [ ] **Today Screen Shortcuts**: Direct widgets for "Need a quick idea?", "This week", and "Milestones to notice" allow one-click jumping to key flows.
- [ ] **Quick Filters**: One-tap filtering for *Under 10 mins*, *Low mess*, and *Indoor*.
- [ ] **Keyboard Navigability**: Full tab sequence support with standard 2px focus rings (`:focus-visible`).

### Heuristic 8: Aesthetic and Minimalist Design
*Interfaces should not contain information that is irrelevant or rarely needed. Every extra unit of information in an interface competes with the relevant units of information.*
- [ ] **Balanced Desktop Grid**: Screens expand cleanly up to 1120px max-width without awkward empty dead space on 1920px monitors.
- [ ] **Zero Repetition**: Removed redundant hero banners and duplicated greetings.
- [ ] **Typography Hierarchy**: Distinct heading levels (`h1`, `h2`, `h3`) with comfortable line lengths for reading.

### Heuristic 9: Help Users Recognize, Diagnose, and Recover from Errors
*Error messages should be expressed in plain language (no error codes), precisely indicate the problem, and constructively suggest a solution.*
- [ ] **Constructive Error Messages**: Plain language alerts (e.g. *"We couldn't reach LittleSteps"* instead of *"HTTP 500 NetworkError"*).
- [ ] **Actionable Recovery**: Inline error alerts include a dedicated "Retry" button.
- [ ] **Safety Guarantee**: Error alerts reassure the caregiver: *"Your saved notes are safe."*

### Heuristic 10: Help and Documentation
*It’s best if the system doesn’t need any additional explanation, but it may be necessary to provide documentation to help users understand how to complete their tasks.*
- [ ] **Contextual Advisory**: "Not a diagnostic tool" modal explains the purpose of developmental play observations and provides healthcare worker referral guidance.
- [ ] **Weather Play Hint**: Explains source attribution (*"Weather data by Open-Meteo.com"*).
- [ ] **Privacy Note**: Clear explanation of local offline caching and data ownership in Settings.

---

## 3. Team Evaluator Assignments & Log

| Evaluator | Role | Focus Areas | Evaluation Date | Status |
|---|---|---|---|---|
| **Vincent Tamano** (`@vincenttamano`) | Docs & Backend Lead | H1 (Status), H2 (Philippine ECCD wording), H9 (Error recovery) | Nov 15, 2026 | Assigned |
| **Lovelly / Nherie** (`@Lovelly143`) | Frontend Lead | H4 (Tokens & consistency), H8 (Aesthetics & responsive layout) | Nov 15, 2026 | Assigned |
| **Faith** (`@faithbn`) | Frontend & QA | H3 (Freedom & undo), H5 (Error prevention), H7 (Efficiency) | Nov 15, 2026 | Assigned |
| **Justin Ardena** (`@Justin-Ardena`) | Backend Lead | H1 (Offline status), H9 (API error codes & rate limits) | Nov 15, 2026 | Assigned |
| **Mark Alvin Cadangin** (`@markalvincadangin`) | Project & Tech Lead | H6 (Recognition), H10 (Help & documentation), Synthesis | Nov 16, 2026 | Assigned |

---

## 4. Summary of Pre-Evaluation Enhancements (November 14, 2026)

The following baseline improvements were completed prior to team evaluation:
1. **Standardized Iconography**: Eradicated all informal unicode emojis from user-facing screens and replaced them with SVG icons conforming to design tokens.
2. **Copywriter Tone Cleanup**: Removed AI buzzwords (*"Find a personalized play idea in seconds"*) in favor of clear, grounded caregiver copy.
3. **Balanced Responsive Layout**: Removed the rigid 70ch width clamp that previously caused severe blank voids on wide desktop displays; added responsive 2-column input grid and multi-column suggestion cards.
4. **Header Streamlining & Alert Affordance Cleanup (H8 & H2)**: Identified that the green `.today-hero` banner (`border-left: 4px solid var(--color-brand-forest)`) created false alert affordances (users mistook it for an active system notification) and produced 5-way text redundancy ("Today", "For Maya", "Good afternoon!", "Today's plan for Maya", "Maya's plan for today"). Resolved by eliminating the callout container and integrating the time-of-day greeting cleanly into the `ScreenHeader` subtitle (`[getTimeGreeting()]! Here's [nickname]'s play plan for today.`).
5. **Closed-Loop Storybook Integration**: Replaced the dead-end "Done" dialog button in Storybooks with an actionable "Add to today's plan" button, directly connecting Open Library play suggestions to Firestore daily schedules.
6. **Offline Safety Invariant**: Enforced strict offline guards ensuring no false claims of success are ever displayed when disconnected.

---

## 5. Architectural & Domain Clarifications

### 5.1 Why the AI Feature Uses a Structured Form, Not Free Chat
- **Child Safety & Halucination Prevention**: Free-form conversational models can hallucinate unsafe or physically hazardous play for infants (e.g. choking hazards, toxic materials, unsafe water play). LittleSteps binds AI outputs strictly to approved, verified Philippine ECCD curriculum activities.
- **Strict Non-Diagnostic Safeguard**: Open chatbots frequently generate unverified clinical opinions. LittleSteps is strictly a home play companion and must never provide diagnostic medical assessments.
- **Privacy & Data Minimization (RA 10173)**: Gemini API free-tier terms allow Google to log prompts for model training. To protect child privacy, zero child names, locations, caregiver IDs, or private journal notes are sent to the AI.
- **Cognitive Load for Parents**: Busy caregivers need actionable ideas in under 5 seconds with 3 simple taps, rather than crafting complex conversational prompts.

### 5.2 Why Book Contents Cannot Be Read Inside the App
- **Open Library API Scope & Copyright**: Open Library is an open bibliographic catalog metadata service (titles, authors, subjects, covers). It does not provide open digital distribution of copyrighted children's picture books.
- **Screen-Free Play Philosophy**: LittleSteps exists to reduce passive infant screen time and encourage interactive, physical caregiver-child bonding. The Storybooks shelf inspires physical reading at home, and the "Get a play idea" button uses AI to generate real-world play activities based on the book's themes.
- **In-App Philippine Rhyme Solution**: To support families without foreign children's books at home, LittleSteps provides in-app readable traditional Philippine nursery rhymes, shown as pending review until the content review (Docs #3) confirms sources and rights, (*Bahay Kubo*, *Tong Tong Tong Pakitong-kitong*) with complete lyrics and motor action prompts under Explore.

### 5.3 Deterministic Catalog Fallback vs. Dynamic AI Recommendations
- When running in offline or unconfigured environments, the backend falls back to Tier 3 (Deterministic Catalog Matcher). Its ranking formula (`domain match -> material overlap -> duration -> id ascending`) contains zero randomness by design to ensure test reproducibility, which produces identical top-ranked recommendations for identical inputs.
- When `GEMINI_MODEL=gemini-3.5-flash-lite` is connected with a valid API key, the badge displays "Suggested by AI" with dynamic, personalized rationale. Selecting different domains, durations, or household materials dynamically reshuffles the suggestions.

### 5.4 Closed-Loop External API Integration (Fulfilling CIT 210 with Practical Utility)
- Rather than passive data viewing, LittleSteps establishes a bidirectional data flow:
  1. Caregivers search Open Library for books they own (`GET /api/v1/catalog/books/search`).
  2. Gemini drafts a screen-free companion play activity based on the book's themes (`POST /api/v1/ai/story-activity`).
  3. The caregiver clicks "Add to today's plan", saving the scheduled activity directly to their child's daily routine in Firestore (`POST /api/v1/children/:id/plans`).
- Combined with Open-Meteo weather forecasts dynamically filtering indoor/outdoor play routines, this multi-API ecosystem directly enhances application utility and daily user workflow.
