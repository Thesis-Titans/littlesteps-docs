# CIT 210 / CC 207B — Demonstration Environment & Rehearsal Plan

**Course:** CIT 210 Web Systems and Technologies & CC 207B Applications Development and Emerging Technologies  
**Project:** LittleSteps Early-Childhood Caregiver Companion  
**Tracking Issue:** [Docs Issue #98](https://github.com/Thesis-Titans/littlesteps-docs/issues/98) (Coordinated with [API #60](https://github.com/Thesis-Titans/littlesteps-api/issues/60))  
**Target Release:** Milestone 5 (M5 — Release-Readiness Review)  
**Evaluation Dates:** CC 207B Docs & Slides due ≤ Dec 1, 2026 (Google Classroom) / Live Presentation & Defense Dec 2, 2026 (morning); CIT 246 PMP due before Dec 3, 2026 (no presentation); CIT 210 Live Presentation & System Documentation (IMRAD) on Dec 4, 2026 (8:00 AM)  

---

## 1. Executive Summary & Purpose

This document defines the operational environment, hardware allocation, network failure contingencies, and rehearsal checklist for the live classroom demonstrations of LittleSteps. It supports the **CIT 210 Final Project Evaluation Rubric** (35 points for Presentation, API Explanation, and Demo Functionality) and the **CC 207B live mobile demo** so classroom evaluations run without technical downtime.

---

## 2. Environment Architecture Decision

### 2.1 Primary Setup: Orchestrated Local Emulators (`run-demo.mjs`)

The primary live demonstration runs **locally** using the tracked cross-platform Node.js Demo CLI ([`scripts/demo-cli/run-demo.mjs`](../../../scripts/demo-cli/run-demo.mjs); see [CLI guide](../../../scripts/demo-cli/README.md)) on Windows, macOS, Linux, or WSL.

```text
+-------------------------------------------------------------------------------+
|                       PRIMARY HOST LAPTOP (Local Loopback)                    |
|                                                                               |
|  +--------------------+         HTTP/JSON         +------------------------+  |
|  | React 19 (:5173)   | ------------------------> | Express 5 Node.js API  |  |
|  | Flutter Web (:5174)| <------------------------ | Cloud Functions (:5001)|  |
|  +--------------------+                           +------------------------+  |
|            |                                                   |              |
|            | Web / HTTP                                        | Admin SDK    |
|            v                                                   v              |
|  +--------------------+                           +------------------------+  |
|  | Firebase Auth      |                           | Cloud Firestore        |  |
|  | Emulator (:9099)   |                           | Emulator (:8080)       |  |
|  +--------------------+                           +------------------------+  |
|            |                                                   |              |
|            +-------------------+   +---------------------------+              |
|                                |   |                                          |
|                                v   v                                          |
|                   +-----------------------------+                             |
|                   | Firebase Emulator UI (:4000)|                             |
|                   +-----------------------------+                             |
+-------------------------------------------------------------------------------+
         | Outbound HTTPS (443)                         | Outbound HTTPS (443)
         v                                              v
+-------------------------------+             +---------------------------------+
| Open Library & Open-Meteo     |             | Google Gemini REST API          |
| REST APIs (Books & Weather)   |             | (Server-pinned GEMINI_MODEL)    |
+-------------------------------+             +---------------------------------+
```

#### Why Local Emulators for Live Defense:
1. **Campus Network Independence:** Local loopback (`:5001`, `:8080`, `:9099`, `:5173`, `:5174`) guarantees sub-50 ms responses regardless of campus Wi-Fi congestion, firewalls, or captive portals.
2. **Zero Privacy Risk:** Demonstrations run strictly against throwaway synthetic identities defined in [`scripts/demo-cli/seed/demo-family.json`](../../../scripts/demo-cli/seed/demo-family.json) (`littlesteps@demo.com`, children Maya `12–23m`, Leo `6–11m`, Tala `24–35m`), eliminating any exposure of real personal data.
3. **Reproducible State:** The Demo CLI idempotently seeds all three Firestore catalog collections (`catalog_activities`, `catalog_milestones`, `catalog_rhymes`) and the demo family's plans, milestones, journal entries, and saved books on startup.
4. **Live External Integration:** Outbound HTTPS requests to Open Library (books), Open-Meteo (weather hints), and Google Gemini (AI suggestions) run live when internet access is available and fail over smoothly to deterministic fallbacks when offline.

---

### 2.2 Proof of Cloud Deployment (`littlesteps-app-cict`)

To demonstrate cloud deployment readiness beyond local emulators:
* **Live Firebase Project:** `littlesteps-app-cict` (Region: `asia-southeast1`), hosting the deployed Cloud Functions (2nd Gen) Express API, Firebase Authentication, and seeded Cloud Firestore collections (`catalog_activities`, `catalog_milestones`, `catalog_rhymes`) powering the production Android release APK.
* **Composite Indexes Verified:** All Firestore composite indexes from [`firestore.indexes.json`](https://github.com/Thesis-Titans/littlesteps-api/blob/main/firestore.indexes.json) are deployed and verified in the **`READY`** state (initially validated on staging during [API Issue #60](https://github.com/Thesis-Titans/littlesteps-api/issues/60) and replicated in `littlesteps-app-cict`).
* The team can open the Firebase Console overview if requested during Q&A.

---

## 3. Physical Hardware Allocation

| Role | Member | Hardware Specification | Responsibilities |
| :--- | :--- | :--- | :--- |
| **Primary Host** | **Mark Alvin C. Cadangin** | Linux x86_64, Node.js 22 LTS, 16 GB RAM, HDMI/USB-C output | Runs `node littlesteps-docs/scripts/demo-cli/run-demo.mjs`, controls live browser/Android screen mirror, shares display to classroom projector. |
| **Secondary / Hot Standby** | **Vincent John A. Tamaño** | Clean laptop, Node.js 22 LTS, 8 GB+ RAM, HDMI output | Cloned repositories with pre-installed dependencies, ready to take over if the primary laptop encounters hardware issues. |
| **Speaker: Architecture** | **Justin Ace D. Ardeña** | Co-presenter | Explains Express routing, Firestore data model, and BOLA security boundary. |
| **Speaker: UI/UX & A11y** | **Mae Daniella Faith C. Benjamin** | Co-presenter | Explains design system, WCAG 2.2 AA contrast, responsive shell, and Storybook/Bookshelf workflows. |
| **Speaker: Content & Privacy** | **Nherie C. Acebuche** | Co-presenter | Explains Philippine ECCD alignment, child profile data minimization, private journal isolation, and non-diagnostic guardrails. |

---

## 4. Network Failure & Contingency Matrix

| Failure Mode | Immediate Behavior | Fallback Mechanism | Impact on Demo |
| :--- | :--- | :--- | :--- |
| **Campus Wi-Fi drops completely** | Core app unaffected (Auth, API, and Firestore run locally). | Open Library falls back to local curated books; Open-Meteo hides silently; Gemini falls back to deterministic reviewed catalog picks (`Our picks`). | **Zero.** Calm status notice shown; browsing, planning, milestones, and journal continue cleanly. |
| **Gemini AI API times out / rate limits** | Express API enforces an 8,000 ms timeout and circuit breaker. | Tier 3 deterministic catalog fallback (or Tier 2 rule-based adaptation on `/ai/adapt`) activates automatically. | **Zero.** Suggestions render with non-AI catalog attribution and zero crash dialogs. |
| **Projector / display cable failure** | Primary laptop HDMI/USB-C fails to handshake. | Hot-standby laptop connects immediately. | Under 2-minute switchover. |
| **Total hardware outage** | Host laptop crashes or loses power. | Pre-recorded 1080p full walkthrough backup video plays from FAT32 USB drive on classroom podium PC. | Presentation proceeds smoothly without live typing. |

---

## 5. Live Demonstration Rehearsal Checklist

### Phase 1: T-24 Hours (Preparation & Sync)
- [ ] Run `git checkout main && git pull origin main` across `littlesteps-api`, `littlesteps-react`, `littlesteps-docs`, and `CC-207B_26-27_Final-Project`.
- [ ] Run automated verification suites locally (`npm test` in API, React, and Docs; `flutter analyze --fatal-infos && flutter test` in Flutter).
- [ ] Verify local `littlesteps-api/.env` contains valid non-committed demo settings:
  - `GEMINI_MODEL=gemini-3.5-flash-lite` (explicit pinned stable model)
  - `OPEN_LIBRARY_CONTACT=markcadangin@gmail.com`
  - `TRUST_PROXY_HOPS=1`
- [ ] Verify prerequisites and workspace discovery:
  ```bash
  node littlesteps-docs/scripts/demo-cli/run-demo.mjs doctor
  ```
- [ ] Confirm backup walkthrough MP4 video (`littlesteps-demo-backup.mp4`) is saved locally and copied to a FAT32 USB drive.
- [ ] Test HDMI/USB-C adapter against an external display.

### Phase 2: T-30 Minutes (Environment Bring-Up)
- [ ] From the workspace root, start the orchestrated local demo stack (or use `start react` for CIT 210 web-only):
  ```bash
  node littlesteps-docs/scripts/demo-cli/run-demo.mjs start all --no-input
  ```
- [ ] Confirm the CLI reports healthy Firebase Emulators (`:4000`, `:5001`, `:8080`, `:9099`), seeded Firestore catalog collections (`catalog_activities`, `catalog_milestones`, `catalog_rhymes`), seeded demo family (`seed/demo-family.json`), and Vite web server (`http://localhost:5173`).
- [ ] Open Chrome to `http://localhost:5173`, sign in with the seeded synthetic caregiver account (`littlesteps@demo.com`), and verify **Maya (12–23m)** loads on `/today`.
- [ ] Open a second tab to the Firebase Emulator UI (`http://localhost:4000/firestore`) to inspect live Firestore documents during Q&A.

### Phase 3: T-5 Minutes (Stage Alignment)
- [ ] Connect to classroom projector (1920×1080 or 1280×720 mirror).
- [ ] Zoom browser to 110% for clear legibility from the back row.
- [ ] Enable Do Not Disturb mode to silence OS notifications.
- [ ] Confirm speaker order and microphone/clicker handoffs.

---

## 6. 5-Minute CIT 210 Live Walkthrough Script

| Time | Presenter | Route / Screen | Talking Points |
| :--- | :--- | :--- | :--- |
| **0:00 – 1:00** | **Mark** | Title Slide & Architecture Overview | Introduce team, caregiver problem context, and unified architecture: React 19 + Express 5 on Firebase Cloud Functions + Cloud Firestore + external REST integrations. |
| **1:00 – 2:00** | **Faith / Mark** | `/today` (Today Dashboard) | Highlight child profile switcher (Maya `12–23m`, Leo `6–11m`, Tala `24–35m`), symmetric quick filters (`Under 10 mins`, `No materials needed`, `Indoor`, `Outdoor`), 1-tap completion with 10 s Undo, and Open-Meteo weather hint without GPS tracking. |
| **2:00 – 3:15** | **Justin / Mark** | `/explore` (Activities, Storybooks, Family Bookshelf & Idea Helper) | Search Open Library picture books, save to Family Bookshelf, open the Gemini story companion (`"Suggested by AI"` badge), and click `"Add to today's plan"` to persist directly into Firestore. |
| **3:15 – 4:15** | **Nherie / Mark** | `/milestones`, `/journal` & `/this-week` | Record a non-diagnostic milestone observation, demonstrate private journal isolation from AI prompts, and open This Week showing factual domain distribution and reflection prompt. |
| **4:15 – 5:00** | **All** | Network Resiliency & Conclusion | Demonstrate offline/fallback behavior: calm offline banner and deterministic `"Our picks"` catalog fallback without crashing; conclude with known limitations and roadmap. |

---

## 7. Readiness Verification Checklist

* [x] Environment standardized on tracked Demo CLI (`node littlesteps-docs/scripts/demo-cli/run-demo.mjs`) with local Firebase Emulators and live external HTTPS APIs.
* [x] Hardware allocated: Mark (Primary host), Vincent (Hot standby).
* [x] Cloud deployment and Firestore composite indexes verified (`littlesteps-app-cict` / API #60).
* [x] Network failure and offline fallback matrix documented.
* [x] Pre-flight checklist and 5-minute live walkthrough script aligned with current routes and `seed/demo-family.json`.
