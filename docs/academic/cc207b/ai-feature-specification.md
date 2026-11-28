# CC 207B — AI Feature Specification

**Course:** CC 207B — Applications Development and Emerging Technologies  
**Institution:** West Visayas State University — College of Information and Communications Technology  
**Group:** BSIT-3A — Thesis Titans  
**References:** [CC 207B Final Project Requirements](CC207B_Final_Project_Requirements.md), [Software Documentation](software-documentation.md)

---

## Overview

LittleSteps includes an AI-assisted feature called the **Idea Helper**. It helps parents and caregivers of children aged 0 to 5 years choose quick, screen-free activities based on their child's age, available time, indoor or outdoor space, and everyday items at home.

Instead of an open chatbot, LittleSteps uses a **catalog-first design with three safety checks**. Whenever household items match reviewed activities in the library, Google Gemini ranks those reviewed activities and explains briefly why they fit (`Suggested by AI`). When a caregiver enters household items not yet in the library (such as a cardboard box, plastic cups, or local Filipino/Hiligaynon terms), Gemini checks item safety first and creates a custom suggestion (`Material adaptation`) paired with supervision tips. If any check fails or the internet drops, the app falls back automatically to reviewed activities (`Our picks`).

---

## 1. AI Service, Model, and Packages Used

All AI requests go through the shared Node.js and Express backend running on Firebase Cloud Functions. Neither the Flutter mobile app nor the React web app calls Gemini directly or stores an API key.

![AI Selection Pipeline and Fallback Architecture](figures/fig-ai-pipeline-fallback.svg)  
*Fig. 1. How caregiver requests move through backend safety checks to Google Gemini and fall back to reviewed activities.*

The server calls the Google Gemini REST API using Node's built-in `fetch` and a server-configured model version (`GEMINI_MODEL`) so model upgrades do not break app behavior. Request and response payloads are validated with `zod`, while the mobile client uses Flutter's `http` package with the signed-in caregiver's Firebase token. The backend exposes three AI routes: finding play ideas (`/api/v1/ai/recommendations`), creating a play idea from a storybook (`/api/v1/ai/story-activity`), and adjusting an existing activity (`/api/v1/ai/adapt`).

---

## 2. Inputs and Prompts

Strict server validation accepts only non-identifying context fields and rejects unexpected personal details (such as a child's name, ID, or private journal notes) with HTTP `400`.

*Table 1. Request Fields Sent to the Idea Helper*

| Field | Accepted Values | How Caregivers Set It in the App |
|---|---|---|
| `ageBand` | Seven age groups from `0-5m` to `60-71m` | Pre-filled from the selected child profile |
| `setting` | `indoor`, `outdoor`, or `either` | Selected in `"Where will you play?"` (preset from the weather banner when opened from Today) |
| `timeMinutes` | Integer between `5` and `120` | Tapped via duration chips (`10`, `15`, `30`, `45` minutes); `30–45` minute sessions group into Play Blocks |
| `materials` | Up to 10 short item names | Typed household items separated by commas |
| `language` | `en`, `fil`, or `hil` | Selects Idea Helper language (`English`, `Filipino`, or `Hiligaynon`) |
| `domain` | Optional play area (`cognitive`, `motor`, `language`, `socioEmotional`) | Optional focus filter |
| `allowCustom` | Boolean | Lets safe custom household items generate `"Material adaptation"` cards |

Before calling Gemini, the backend filters reviewed catalog activities matching the age and setting and passes only safe context and candidate IDs:

```text
You pick play activities for a young child from a fixed list.
Choose only from the candidate ids given. Do not invent activities or ids.
Reply with JSON only: {"picks":[{"id":"<candidate id>","why":"<one short sentence>"}]}.
Each why is at most 140 characters, plain and observational.
Never mention delays, diagnoses, assessments, treatment or scores.
```

Storybook companion and activity adaptation prompts follow the same plain, non-diagnostic rules and strict length limits.

---

## 3. Output Validation and Sample Outputs

Every AI response passes two automatic server checks before reaching the phone:

1. **Format and source verification:** Confirms valid JSON, removes stray HTML or URLs, checks text length limits, and confirms catalog picks match real IDs from the reviewed list.
2. **Non-diagnostic and safety filter:** Normalizes punctuation and accents and rejects any reply containing hazardous materials or clinical terms such as *delay*, *diagnosis*, *assessment*, or *therapy*.

### Sample Live AI Response (`Suggested by AI`)

```json
{
  "suggestions": [
    {
      "activityId": "act-box-tunnel-01",
      "title": "Cardboard Box Peek-and-Crawl",
      "whyPicked": "Uses your cardboard box and soft sock for active indoor crawling play."
    }
  ],
  "source": "ai",
  "provenance": {
    "badge": "Suggested by AI",
    "disclaimer": "Everyday play idea only — not a medical or developmental test."
  }
}
```

### Sample Backup Catalog Response (`Our picks`)

```json
{
  "suggestions": [
    {
      "activityId": "act-cup-stacking-01",
      "title": "Cup Stacking and Nesting",
      "whyPicked": "Picked from our reviewed activity list for this age and setting."
    }
  ],
  "source": "catalog_fallback",
  "provenance": {
    "label": "Our picks",
    "disclaimer": "Everyday play idea only — not a medical or developmental test."
  }
}
```

---

## 4. Failure Handling and Fallback

*Table 2. AI Execution Paths and Fallback Handling*

| Path | How It Runs | When Used |
|---|---|---|
| Live AI (Primary) | Google Gemini via backend with an 8-second timeout and circuit breaker | Default path when connected and configured |
| Rule-Based Tweak | Fast local adjustment rules on the server | Backup when adjusting a single activity and Gemini is unavailable |
| Reviewed Catalog Backup | Ranked picks from the cached early-learning activity list | Used automatically on timeouts, errors, offline states, or blocked replies |

Hourly rate limits allow up to 10 requests per signed-in user and 30 requests per IP address. When exceeded, the server returns HTTP `429` with a `Retry-After` cooldown notice alongside immediate non-AI catalog picks so caregivers are never stuck. Server logs capture only timing and status metadata—never prompts, household items, or caregiver notes.

---

## 5. Known Failure Cases

1. **Unsafe household items:** Dangerous items (such as bleach, knives, fire, or medicine) are rejected immediately or caught during item safety evaluation, switching cleanly to reviewed catalog activities.
2. **Prompt manipulation or clinical questions:** Free-text fields are short and strictly separated from instructions, and any clinical or diagnostic wording triggers automatic fallback.
3. **Weak or offline mobile data:** When disconnected, the mobile app displays a clear non-AI notice and serves cached reviewed activities from the current session.
4. **Partial Filipino and Hiligaynon catalog coverage:** Prompts instruct Gemini to write caregiver-facing explanations and custom household play cards in the selected language (`en`, `fil`, or `hil`), while output validation checks both Filipino and Hiligaynon clinical terms. If a regional age band has no dedicated reviewed catalog entry yet, catalog ranking automatically falls back to age-matched reviewed activities so caregivers never receive an empty list.

---

## 6. Why AI Is the Right Tool

Database filters handle age bands and indoor/outdoor tags reliably, but parents naturally describe materials in casual, varied phrases (*"empty delivery box, clean sock"*, *"plastic food tubs"*). A constrained language model bridges that gap by matching informal descriptions to safe play ideas and explaining in one friendly sentence how those items fit.

Keeping the interaction structured instead of using an open chat avoids medical misinformation, reduces screen reading time, and lets caregivers jump straight into play.

---

## 7. Privacy Considerations (RA 10173)

LittleSteps follows data minimization aligned with the Philippine Data Privacy Act of 2012 (Republic Act No. 10173). Child profiles require only a nickname and coarse age band—no legal names, exact birthdates, or photos. Backend schemas strip unexpected fields so child names, user IDs, and private caregiver journal entries never reach any AI model. Every suggestion clearly labels whether it was `"Suggested by AI"`, a `"Material adaptation"`, or `"Our picks"` and allows caregivers to adjust, replace, or skip any idea.
