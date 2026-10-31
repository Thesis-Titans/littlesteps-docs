# LittleSteps Design Review Rubric

**Status:** Draft for team review  
**Owner:** Mark Alvin Cadangin (Technical Lead)  
**Last Reviewed:** 2026-10-31  
**Governing Standard:** WCAG 2.2 AA  
**Related Documents:** [DESIGN.md](DESIGN.md), [UI/UX Design Specification](ui-ux-design-specification.md), [Documentation Standards](documentation-standards.md)

This rubric is what reviewers (people and review agents) apply to React code and to exported Figma frames. It is a written checklist, not an installed tool: no skill is downloaded or run, and nothing is fetched at review time.

## 1. How to use it

- **Code review (React):** read the changed files, check every rule in sections 2 to 5, and report `file:line - issue`, one line each. Skip explanation unless the fix is not obvious.
- **Figma review:** export frames at 375 and 1280 px, check the rules in sections 2 and 3 that a picture can show, and report `frame name - rule - proposed fix`. Rules about code (labels, handlers, focus CSS) cannot be judged from a picture; check them later in the React build.
- **Order of authority:** Figma, then the [specification](ui-ux-design-specification.md), then [DESIGN.md](DESIGN.md), then this rubric. If a rule here conflicts with the specification, the specification wins and this file is corrected.

## 2. LittleSteps rules (all reviews)

These come from the specification and DESIGN.md.

- Contrast: text at least 4.5:1, large text and field borders at least 3:1 (WCAG 1.4.3, 1.4.11). Never put secondary text on Caution, Offline or Soft Green.
- Touch targets: 48 × 48 px for frequent and primary controls, 44 × 44 px floor, 8 px between targets (spec §2.3; WCAG 2.5.8 needs only 24 × 24).
- Body text at least 16 px; any sentence a parent must read at least 14 px. Running text near 70 characters per line.
- Layout holds at 200% text and 320 px width without horizontal scroll (WCAG 1.4.4, 1.4.10).
- Status never relies on color alone: every status has an icon and words (WCAG 1.4.1).
- One primary action per screen, in the bottom 35% on mobile.
- Wording follows spec §2.6: everyday words, short and calm, no blame, errors say what happened and what is still safe, buttons name the action, AI output labelled "Suggested by AI". No catalog, domain, observation, assessment, analytics, generate or JSON on screen.
- No streaks, scores, delay labels, urgency or countdowns.
- Offline and failed-save messages never say something was saved when it was not.
- Sentence case for headings and buttons ("Add to today's plan"), not Title Case.
- Illustration only as set in spec §10.2; decorative brand colors never on text or controls.

## 3. Interaction and accessibility (code and frames)

- Icon-only buttons have an accessible name (`aria-label`); decorative icons are `aria-hidden="true"`.
- Form controls have a visible `<label>`; placeholders are examples, never labels.
- Use `<button>` for actions and `<a>` for navigation, never a `<div>` with a click handler. Interactive elements work with the keyboard.
- Images have `alt` (or `alt=""` if decorative).
- Headings are hierarchical; each page has a unique title (WCAG 2.4.2); a skip link to main content exists.
- Visible focus on every interactive element (2 px ring, 2 px offset); never `outline: none` without a replacement; use `:focus-visible`. Sticky bars never cover the focused element (WCAG 2.4.11).
- Async updates (toasts, validation, loading) are announced: `role="status"` / `aria-live="polite"`; errors use `role="alert"`.
- Prefer semantic HTML before ARIA.
- Reversible actions get an undo window of at least 10 seconds. Irreversible ones (deleting a note, a child's records or the account) get a confirm dialog whose button names the action. Never act immediately.
- Any drag, swipe or pinch gesture has a tap or click and keyboard alternative (WCAG 2.5.1, 2.5.7).
- Sign-in allows paste and password managers; no CAPTCHA or memory test (WCAG 3.3.8).

## 4. Forms (code)

- Inputs have a meaningful `name` and the right `autocomplete`, `type` and `inputmode` (email, tel, number).
- Never block paste.
- Errors appear inline next to the field and focus moves to the first error on submit.
- The submit button stays enabled until the request starts, then shows a busy state.
- Warn before leaving a note or form with unsaved typed text; an empty form closes without asking.
- Disable spellcheck on emails, codes and usernames.

## 5. Motion, type and content handling (code)

- Honor `prefers-reduced-motion`: static skeletons, no shimmer, no tap-scale. Animate `transform` and `opacity` only; never `transition: all`; animations can be interrupted.
- Nothing moves for more than 300 ms except the skeleton pulse and the AI loading indicator; no shaking, bouncing or flashing, and no motion that signals urgency (spec §10.4).
- Typography: real ellipsis `…`, curly quotes, non-breaking spaces in values with units ("10 MB"), loading text ends with `…`, `tabular-nums` for number columns.
- Long text is handled: `truncate`, `line-clamp` or `break-words`; flex children that truncate need `min-width: 0`. Anticipate short, average and very long user input (notes, nicknames).
- Empty arrays and empty strings render an empty state, not broken UI.
- `<img>` has `width` and `height`; below-the-fold images are `loading="lazy"`.
- Lists longer than 50 items are virtualized or use `content-visibility: auto`.
- Dates, numbers and currency use `Intl.*`, never hard-coded formats. Detect language from `navigator.languages`, not IP.
- URL reflects state (filters, tabs) where it helps; links use `<a>` so open-in-new-tab works.
- Anti-patterns to flag: `user-scalable=no` or `maximum-scale=1`, `onPaste` with `preventDefault`, `transition: all`, `outline-none` without replacement, `<div onClick>`, images without dimensions, inputs without labels, `autoFocus` without a clear reason on mobile.

## 6. Output format

Group findings by file or frame. One line each:

```text
## src/features/children/ChildForm.tsx
ChildForm.tsx:42 - icon button missing aria-label
ChildForm.tsx:67 - transition: all → list properties
## Mobile / Journal / Journal – Confirm delete
copy repeats "cannot be undone" twice → keep one
```

End each file or frame with "pass" when nothing was found.

## 7. Source and licence

Sections 3 to 5 are adapted from Vercel's [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines) (`command.md`, commit `4ecfb9fb8d1d3b7009674869b3aaee2f904042e1`, 2026-10-05), published under the MIT licence. Changes: left out rules that do not apply to a Vite app for parents (hydration, dark theme, safe areas, Next.js and Tailwind terms, touch-action and overscroll tuning, hover-state, preconnect and preload, layout-read performance, `translate="no"`, `scroll-margin-top`, `:focus-within` and the `autocomplete="off"` rule); changed the placeholder rule to "examples, never labels"; switched Title Case to sentence case; and added the LittleSteps and WCAG 2.2 AA rules in sections 2 and 3.

Copyright (c) 2025 Vercel Labs. Permission is granted, free of charge, to use, copy, modify and distribute the source under the MIT licence; the full licence text is in the [upstream LICENSE](https://github.com/vercel-labs/web-interface-guidelines/blob/main/LICENSE). The source is provided "as is", without warranty of any kind. The review process and rules are ours; update this file by pull request, never by fetching an external file at review time.
