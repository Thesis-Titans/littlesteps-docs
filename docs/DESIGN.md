---
version: alpha
name: LittleSteps
description: Calm, plain-spoken design system for a parent-first early-learning app. Forest green on a warm canvas, Inter type, WCAG 2.2 AA.
colors:
  primary: "#1F634D"
  on-primary: "#FFFFFF"
  canvas: "#F7F7ED"
  card: "#FFFFFF"
  soft-green: "#E0F2E5"
  text: "#1A2B29"
  text-secondary: "#63756E"
  text-error: "#853029"
  text-offline: "#475569"
  border-subtle: "#E0E5DB"
  border-input: "#7E8C86"
  border-error: "#B83D33"
  status-error: "#FFF6F5"
  status-caution: "#FAE8A8"
  status-info: "#D9E8F7"
  status-offline: "#F1F5F9"
  focus: "#1F634D"
  artwork-forest: "#286B58"
  warm-cream: "#F4F2E8"
  soft-sage: "#8DAF98"
  orange: "#EC6A2C"
  mist: "#E8EDF1"
  slate: "#304D5C"
  dusty-blue: "#708798"
typography:
  display-desktop: { fontFamily: Inter, fontSize: 32px, fontWeight: 700, lineHeight: 40px }
  display-mobile: { fontFamily: Inter, fontSize: 26px, fontWeight: 700, lineHeight: 32px }
  h2-desktop: { fontFamily: Inter, fontSize: 24px, fontWeight: 600, lineHeight: 32px }
  h2-mobile: { fontFamily: Inter, fontSize: 20px, fontWeight: 600, lineHeight: 28px }
  h3: { fontFamily: Inter, fontSize: 16px, fontWeight: 600, lineHeight: 24px }
  body: { fontFamily: Inter, fontSize: 16px, fontWeight: 400, lineHeight: 24px }
  body-small: { fontFamily: Inter, fontSize: 14px, fontWeight: 400, lineHeight: 20px }
  label: { fontFamily: Inter, fontSize: 14px, fontWeight: 600, lineHeight: 20px }
  meta: { fontFamily: Inter, fontSize: 13px, fontWeight: 500, lineHeight: 18px }
rounded:
  control: 10px
  card: 16px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px
  touch-min: 48px
  touch-secondary: 44px
  top-bar: 60px
  bottom-bar: 72px
  sidebar: 240px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    height: 48px
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.text}"
    rounded: "{rounded.card}"
  text-field:
    backgroundColor: "{colors.card}"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    height: 48px
---

# LittleSteps Design System (DESIGN.md)

**Status:** Draft for team review  
**Owner:** Nherie (Frontend Lead) & Faith (Usability Lead); drafted by Mark Alvin Cadangin (Technical Lead)  
**Last Reviewed:** 2026-10-31  
**Governing Standard:** WCAG 2.2 AA and ISO 9241  
**Related Documents:** [UI/UX Design Specification](ui-ux-design-specification.md), [Documentation Standards](documentation-standards.md), [Development Workflow](development-workflow.md)

This file is the one design brief that people, AI agents and both clients (React and Flutter) read before they design or review the UI (Flutter: advise and review only, see the Agent Guide). It follows the open [DESIGN.md format](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md) (version `alpha`): token values in the front matter above, rationale in the sections below, in the format's section order.

**Order of authority.** Figma (file `yqUHW4lOuuly4jDPNMkMVI`, collection **LittleSteps · Design Tokens**) is canonical. The [UI/UX specification](ui-ux-design-specification.md) holds the reasoning and the rules. This file summarizes both for fast reading. If they disagree, Figma wins for values and the specification wins for rules, and this file is corrected. Change a value in Figma first, then `tokens.css`, then a member updates `app_tokens.dart`, then this file. If code and this file disagree, report it; do not silently pick one.

## Overview

LittleSteps helps a parent pick one small, age-fitting activity and note what they saw. Parents are the primary users; other caregivers are secondary (the technical actor name stays `caregiver`). They read in short bursts, often one-handed, sometimes in a second or third language, and often worried about being judged.

The product should feel **calm, warm and plain**: a quiet helper, never a coach or a test. These rules apply to every screen:

- **Calm technology.** No push alerts that demand attention, no streaks or daily goals, no countdowns, no guilt. Nothing moves unless it explains something.
- **Not a test.** No scores, delay labels or percentiles. A milestone is a prompt to talk to a person, not a verdict.
- **One thing at a time.** One primary action per screen. Reassurance appears once per screen.
- **Thumb first.** Primary actions sit in the bottom 35% of a 375 px screen.
- **Honest about AI.** AI-written output always carries the "Suggested by AI" badge. Features are named for what they do ("Idea helper"), not for the technology.

The reasoning is in the specification: [principles and the thumb zone (§2)](ui-ux-design-specification.md) and [navigation (§5)](ui-ux-design-specification.md).

## Colors

Forest green is the single action color on a warm canvas. Every color has one meaning, and every status also carries an icon and words, so meaning never depends on color alone (WCAG 1.4.1).

- **Primary, Forest (`#1F634D`):** actions and selection. White text on it is 7.1:1. It is also the focus ring color.
- **Canvas (`#F7F7ED`) and Card (`#FFFFFF`):** page and surface. Cards use a subtle border (`#E0E5DB`).
- **Text (`#1A2B29`):** 14.8:1 on white, 13.7:1 on canvas. **Secondary text (`#63756E`)** is 4.9:1 on white and 4.5:1 on canvas, for timestamps and helper labels only.
- **Soft Green (`#E0F2E5`):** a positive record (completed, observed) and privacy, with Forest text and a check or lock icon.
- **Caution (`#FAE8A8`), Info (`#D9E8F7`), Offline (`#F1F5F9` with `#475569` text), Error (`#FFF6F5` with `#853029` text and `#B83D33` border):** warnings, source and AI labels, connection, and failures. Error is a muted brick red: clearly an error, still calm.
- **Field borders (`#7E8C86`):** text fields, selects and unselected chips, 3.5:1 on white (WCAG 1.4.11).
- **Decorative brand colors (`artwork-forest`, `warm-cream`, `soft-sage`, `orange`, `mist`, `slate`, `dusty-blue`):** artwork and illustrations only, never UI text or controls.

Pairs that fail AA, never use: secondary text on Caution (3.99:1), on Offline (4.46:1) or on Soft Green (4.2:1).

The full meaning table is specification [§6.3](ui-ux-design-specification.md).

## Typography

One family, **Inter**, loading only Regular, Medium, Semi Bold and Bold, subset to Latin to limit data cost on prepaid plans.

- **Display and headings** step down on mobile (26/20 px against 32/24 px on desktop).
- **Body is 16 px with 24 px line height, and never smaller.** Any sentence a parent must read (privacy statements, helper text, alert bodies, errors) is at least 14 px. Privacy and helper text use the primary text color; error messages use the error text color on the error background, as `tokens.css` and `components.css` do.
- **Meta (13 px, Medium)** is for timestamps, counts, badges and short labels only, never for full sentences.
- **Line length** is capped near 70 characters, including inside wide desktop cards.
- **Room to grow:** screens stay usable at 200% text and at 320 px width with no horizontal scroll (WCAG 1.4.4, 1.4.10). Labels fit text 30% longer than English; tab labels may wrap to two lines.

## Layout

Two frame sizes: **1280** (desktop) and **375** (mobile). Mobile is designed first. The populated state is required at both sizes; the other states are required at 375 and may be reused at 1280.

- **Spacing scale:** 4, 8, 12, 16, 24, 32 px. Adjacent touch targets stay at least 8 px apart.
- **Touch targets:** frequent and primary controls are at least **48 × 48 px**; secondary links may go to **44 × 44**, never lower. WCAG 2.5.8 requires only 24 × 24; ours is for one-handed comfort.
- **App shell:** top bar 60 px, side navigation 240 px on desktop, bottom tab bar 72 px (five tabs). The 72 px height is decided (spec §10.6) and is in `tokens.css` (react PR #36); at 320 px two-line labels make the bar taller, so scroll padding adds 16 px.
- **Five states on every screen:** populated, empty, loading, error or permission denied, offline or AI fallback. Journeys J1 to J7 are in specification [§7](ui-ux-design-specification.md).

## Elevation & Depth

Depth is quiet. Cards sit on the canvas with a subtle border and, when they stand alone on the page background, a soft shadow (`0 1px 2px` and `0 4px 14px` at 4% and 6% of the text color). Overlays and dialogs use one larger shadow (`0 12px 32px` at 14%). No cards inside cards, no glows, no gradients.

## Shapes

Two radii only: **10 px** for controls (buttons, fields, chips) and **16 px** for cards. Radii, spacing and sizes are recorded in [spec §6.1a](ui-ux-design-specification.md). Icons come from the 15 Figma icons, take the text color, and are decorative (`aria-hidden`) unless they are the only content of a control.

## Components

The shared set is built once in Figma (page `02 · Components`) and mirrored in React (`src/components/common`, `layout`) and Flutter (`lib/widgets/`). Do not restyle a component inside a feature; ask for a variant instead.

| Component | Purpose | Rule that matters |
|---|---|---|
| Button | Every action | One `primary` per screen. 48 px tall (text buttons 44). Variants: `primary`, `secondary`, `text`, `danger` (permanent deletes only). |
| TextField, Select | Input | Visible label, never placeholder-only. Errors inline, linked to the field. Paste is never blocked. |
| Chip | Filters and choices | A toggle, 48 px tall, selected state shown by more than color. |
| Card | Grouping | `elevated` only on the page background. |
| Badge | Short status | The AI badge is required on every AI-written result. |
| InlineAlert | Errors, offline, notices | Stays until solved. Errors `role="alert"`, the rest `role="status"`. Never a toast for an error. |
| Icon | The 15 Figma icons | Decorative by default; give a label only when the icon is the whole control. |
| Skeleton, EmptyState | Loading, nothing yet | Static under reduced motion. Empty states say what will appear and how to add the first item, with no blame. |
| ConfirmDialog | Permanent actions only | The button names the action ("Delete Maya's records"), never "OK". Cancel has focus first. |
| UndoToast, SuccessNotice | Reversible actions, confirmations | At least 10 seconds, pause on hover or focus, announced politely. |
| App shell | Top bar, bottom tabs, side nav | Tab labels may wrap. Focus is never covered by a bar. |

Full props and states are in the [React components README](https://github.com/Thesis-Titans/littlesteps-react/blob/main/src/components/README.md).

## Do's and Don'ts

**Do**

- Use tokens only: color, spacing, radius, type and sizes come from the tokens in this file and `tokens.css`.
- Show a visible focus ring on every interactive element: 2 px `focus` color, 2 px offset.
- Give every screen a unique, descriptive page title (WCAG 2.4.2).
- Offer undo for reversible actions and a named confirmation for irreversible ones.
- Say what happened, what is still safe, and what to do next when something fails.
- Honor `prefers-reduced-motion`: static skeletons, no shimmer, no tap-scale.

**Don't**

- Don't hard-code a color, spacing or radius, and don't add Tailwind (the React client uses plain CSS with these tokens).
- Don't put secondary text on Caution, Offline or Soft Green.
- Don't use decorative brand colors for text or controls.
- Don't use streaks, scores, delay labels, urgency or blame, anywhere.
- Don't use Title Case (proper nouns, standard acronyms and the single tab names keep their capitals) or marketing words ("unlock", "seamless", "smart"); spec §2.6 requires strict sentence case and plain wording.
- Don't use clinical or technical words on screen: catalog, domain, observation, assessment, analytics, generate, JSON.
- Don't let color alone carry meaning.

### Voice

Everyday words, short sentences, no blame. Technical names stay in the API, data model and code; only the words parents see change. Examples: "Thinking, Moving, Talking, Feelings" (not Cognitive, Motor, Language, Socio-Emotional); "Idea helper" and "Another idea" (not AI helper, Generate another); "Note what you saw" (not Record an observation); "It's not a test" (not the assessment disclaimer). The standard reassurance line, used once per screen where needed: "Children develop at different rates. Talk to a health professional if you have concerns." For worries, name "your pediatrician or barangay health worker".

The full rules and the complete swap table live in specification [§2.6](ui-ux-design-specification.md). They are not copied here, so they cannot drift.

## Agent Guide

Read this file first, then the specification sections it links, before designing or reviewing any UI.

1. **Order of authority:** Figma, then the specification, then this file, then code.
2. **Tokens in code:** React reads `littlesteps-react/src/styles/tokens.css`; Flutter reads `littlesteps-flutter/lib/theme/app_tokens.dart`. The front matter keys here are short aliases. React names follow the Figma variable paths (`color/brand/forest` becomes `--color-brand-forest`); Dart uses camelCase equivalents.

   | Front matter key | CSS variable |
   |---|---|
   | `primary` | `--color-brand-forest` |
   | `canvas`, `card`, `soft-green` | `--color-surface-canvas`, `--color-surface-card`, `--color-surface-soft-green` |
   | `text`, `text-secondary`, `on-primary` | `--color-text-primary`, `--color-text-secondary`, `--color-text-on-brand` |
   | `border-*`, `status-*`, `focus` | `--color-border-*`, `--color-status-*`, `--color-focus` |
   | `xs` to `xxl` | `--space-4` to `--space-32` (the number is pixels) |
   | `touch-min`, `touch-secondary`, `top-bar`, `bottom-bar`, `sidebar` | `--size-touch-target-min`, `--size-touch-target-secondary`, `--size-top-bar`, `--size-bottom-bar`, `--size-sidebar` |

   Not in the front matter: the font fallback stack, the 2 px focus ring width and offset, and the 16 px minimum body size. Read them in `tokens.css`. Desktop type sizes are React-only.
3. **Reviewing:** check against the specification §8 checklist, WCAG 2.2 AA, the do's and don'ts above and the voice rules. Report findings with a location and a proposed fix; do not rewrite the design.
4. **Flutter:** members write and can defend all Flutter code (Individual Code Defense, CC 207B). AI may advise, review and give teaching snippets of 15 lines or fewer, never whole screens or features. Log every use in `littlesteps-flutter/docs/ai-usage-log.md` before opening the pull request, and tick the box in the PR template. Members add the tokens Dart still lacks (Soft Green, the status colors, offline and error text, error border, focus, on-primary, the decorative brand colors) and the 44 px target, shell sizes and 2 px focus ring offset.
5. **Skills and plugins:** none are installed as of 2026-10-31. Design-review rules are applied as written rubrics, not as downloaded skills.
6. **Decisions of 2026-10-31** (spec §10.6): illustration option A with the activity cover exception; motion tokens 120 ms (fast), 200 ms (base) and one standard easing, to be added to Figma and `tokens.css`; no photography of children or stock people; strict sentence case; one canonical non-diagnostic banner (wording in spec §2.6); 72 px tab bar. Low-fidelity wireframes (docs #44) are in progress.
