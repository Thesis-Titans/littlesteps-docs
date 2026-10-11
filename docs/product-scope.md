# LittleSteps Product Scope

## Purpose
LittleSteps supports caregivers and early-learning practitioners with age-aware activities, observation, and progress reflection. It is not a diagnostic, screening, treatment, or emergency-care tool.

## Intended age groups
The product uses seven activity-navigation bands spanning 0–71 months:

| App category | Age range |
|---|---:|
| Young Infants | 0–5 months |
| Older Infants | 6–11 months |
| Young Toddlers | 12–23 months |
| Older Toddlers | 24–35 months |
| Younger Preschoolers | 36–47 months |
| Older Preschoolers | 48–59 months |
| Kindergarten Transition | 60–71 months |

These are app categories, not official clinical developmental stages. Content for ages 60–71 months should consider applicable DepEd Kindergarten guidance as well as relevant ECCD Council materials.

## Six core features
1. **Child Profile and Milestone Tracking** — maintain caregiver-managed profiles and record observations against clearly sourced, age-appropriate milestones.
2. **Daily Activity Planning and Tracking** — select activities, schedule or mark them complete, and record participation.
3. **Private Observation Journal** — let authorized caregivers record private notes with explicit ownership and access controls.
4. **Story, Rhyme, and Learning Activity Library** — browse reviewed content with age range, materials, language, duration, and source metadata.
5. **Weekly Progress Summary** — summarize recorded activity and observations without diagnosing, clinically scoring, or asserting unsupported developmental conclusions.
6. **AI Activity Suggestion Helper** — recommend activities grounded in the reviewed catalog and caregiver-provided constraints.

Both web and mobile clients must implement all six features and use the same backend API, data model, and authentication/authorization rules. Neither client is intended to be only a companion or partial system.

## Milestone-content rules
- Show source attribution and intended age range for each milestone item.
- Treat milestones as prompts for observation, not pass/fail judgments.
- CDC milestone checklists may be educational references but must not be represented as a validated local screening instrument.
- Do not imply that a single missed or observed behavior establishes a developmental condition.
- Keep caregiver guidance cautious, non-diagnostic, and reviewed by an appropriate subject-matter adviser.

## AI boundaries
Suggestions must be based on approved catalog items and may consider age band, interests, time, materials, and language. The helper must not diagnose, prescribe medical care, or infer a clinical condition. Do not send private journal entries or direct child identifiers to an external AI provider. Validate output against catalog IDs and a strict schema; provide a non-AI fallback and apply rate/cost limits.

## Initial acceptance criteria
- Authentication is required for private child and caregiver data.
- The server verifies Firebase ID tokens and derives identity from the verified token.
- Every child-scoped operation enforces server-side ownership/authorization.
- Inputs are validated on the server, not only in the browser.
- Errors do not reveal stack traces, tokens, journal content, or internal details.
- CORS allows only explicitly configured frontend origins.
- Core paths have automated tests before they are described as working.
- Local emulator development is the first integration target; deployment waits for billing and privacy review.
