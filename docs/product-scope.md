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

To satisfy the **CC 207B team-scaling formula** (a group of 5 members requires at least 6 core features), the application implements exactly six core user-facing capabilities. Under CC 207B grading criteria, a **core feature** must be a complete user-facing flow that accepts user input, processes it or changes application state, and produces a meaningful result. Authentication/registration, splash screens, and static informational pages ("About", "Settings") **do not** count as core features. The AI-powered feature counts as one of the six core features.

Both web and mobile clients serve a **single user role** (the caregiver/parent) and implement all six core features using the same backend API, data model, and authorization policies:

1. **Child Profile and Milestone Tracking** — maintain caregiver-managed child profiles and record observations against clearly sourced, age-appropriate milestones. (Input: child details/observations $\rightarrow$ Processing: child-scoped database persistence $\rightarrow$ Result: structured profile and observation history).
2. **Daily Activity Planning and Tracking** — select activities, schedule or mark them complete, and record participation. (Input: activity selection and date $\rightarrow$ Processing: schedule state update $\rightarrow$ Result: active daily routine and progress log).
3. **Private Observation Journal** — let authorized caregivers record private qualitative notes with explicit ownership and access controls. (Input: journal text $\rightarrow$ Processing: encrypted storage with AI isolation $\rightarrow$ Result: chronological personal reflection feed).
4. **Story, Rhyme, and Learning Activity Library** — browse reviewed content with age range, materials, language, duration, and source metadata. (Input: search queries and age/material filters $\rightarrow$ Processing: catalog query and filtering $\rightarrow$ Result: curated learning resource cards).
5. **Weekly Progress Summary** — summarize recorded activity and observations without diagnosing, clinically scoring, or asserting unsupported developmental conclusions. (Input: date range $\rightarrow$ Processing: deterministic aggregation of completed activities/milestones $\rightarrow$ Result: structured weekly progress recap).
6. **AI Activity Suggestion Helper** — recommend activities grounded in the reviewed catalog and caregiver-provided constraints, with deterministic non-AI fallback. (Input: caregiver constraints: time, materials, language $\rightarrow$ Processing: catalog-constrained recommendation $\rightarrow$ Result: tailored offline activity prompts with explicit AI labeling and override options).

## Milestone-content rules
- Show source attribution and intended age range for each milestone item.
- Treat milestones as prompts for observation, not pass/fail judgments.
- CDC milestone checklists may be educational references but must not be represented as a validated local screening instrument.
- Do not imply that a single missed or observed behavior establishes a developmental condition.
- Keep caregiver guidance cautious, non-diagnostic, and reviewed by an appropriate subject-matter specialist or course faculty.

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
