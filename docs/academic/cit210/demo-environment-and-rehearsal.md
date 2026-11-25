# CIT 210 / CC 207B — Demonstration Environment & Rehearsal Plan

**Course:** CIT 210 Web Systems and Technologies & CC 207B Application Development and Emerging Technologies  
**Project:** LittleSteps Early-Childhood Caregiver Companion  
**Tracking Issue:** [Docs Issue #98](https://github.com/Thesis-Titans/littlesteps-docs/issues/98) (Coordinated with [API #60](https://github.com/Thesis-Titans/littlesteps-api/issues/60))  
**Target Release:** Milestone 5 (M5 — Release-Readiness Review; Flutter Presentation Nov 26, 2026, 7:00 AM)  
**Evaluation Dates:** CC 207B Presentation on Nov 26, 2026 (7:00 AM); CIT 210 & CIT 246 Finals on Dec 2, 2026  

---

## 1. Executive Summary & Purpose

This document outlines the operational environment, physical hardware allocation, network failure contingencies, and execution checklist for the live classroom demonstration and faculty evaluation of the LittleSteps system. 

It satisfies the requirements of **Docs Issue #98**, directly supporting the **CIT 210 Final Project Evaluation Rubric** (35 points for Presentation, Architecture Explanation, and Demo Functionality) and ensuring zero presentation downtime during campus defenses.

---

## 2. Environment Architecture Decision

### 2.1 Primary Setup: Orchestrated Local Emulators (`./run-demo.sh`)

The primary live demonstration runs **locally** using the repository root orchestrator [`run-demo.sh`](https://github.com/Thesis-Titans/littlesteps-api/blob/main/../run-demo.sh).

```
+-------------------------------------------------------------------------------+
|                       PRIMARY HOST LAPTOP (Local Loopback)                    |
|                                                                               |
|  +--------------------+         HTTP/JSON         +------------------------+  |
|  | React 19 Frontend  | ------------------------> | Express Node.js API    |  |
|  | Vite Server (:5173)| <------------------------ | Cloud Functions (:5001)|  |
|  +--------------------+                           +------------------------+  |
|            |                                                   |              |
|            | Web SDK                                           | Admin SDK    |
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
| Internet Archive Open Library |             | Google Gemini AI Studio         |
| REST API (Book Search)        |             | (gemini-3.5-flash-lite)         |
+-------------------------------+             +---------------------------------+
```

#### Why Local Emulators for Live Defense:
1. **Campus Network Independence:** Local loopback (:5001, :8080, :9099, :5173) guarantees instant, sub-50ms responses regardless of campus Wi-Fi congestion, firewalls, or captive portals.
2. **Zero Privacy Risk:** Demonstrations run against throwaway synthetic test identities (`demo.caregiver@littlesteps.local`, child "Maya"), eliminating any risk of ingesting, displaying, or exposing real personal caregiver/child data.
3. **Reproducible State:** The automated seed script [`run-demo.sh`](https://github.com/Thesis-Titans/littlesteps-api/blob/main/../run-demo.sh) idempotently populates standard demonstration records (child profile, planned activities, sample observations) on every startup.
4. **Live External Integration:** Outbound requests to Open Library (books) and Google Gemini (AI activity helper) still utilize live external APIs via outbound HTTPS when an internet connection is available.

---

### 2.2 Proof of Cloud Deployment: Staging Project (`dog-app-cit210-7492`)

To prove to the faculty evaluation panel that the system is fully production-capable and deployable to Google Cloud:
* **Firebase / Google Cloud Project:** `dog-app-cit210-7492` (Region: `asia-southeast1`).
* **Cloud Firestore:** All 7 composite indexes from [`firestore.indexes.json`](https://github.com/Thesis-Titans/littlesteps-api/blob/main/firestore.indexes.json) have been deployed and verified in the **`READY`** state (verified in [API Issue #60](https://github.com/Thesis-Titans/littlesteps-api/issues/60)).
* **Live Query Verification:** Filtered plans and milestone queries were executed against live Firestore endpoints, returning HTTP 200 without index errors.
* The team will present the Firebase Console overview if asked during code defense.

---

## 3. Physical Hardware Allocation

| Role | Member | Hardware Specification | Responsibilities |
|---|---|---|---|
| **Primary Host** | **Mark Alvin Cadangin** | Linux x86_64, Node.js 22 LTS, 16GB RAM, HDMI/Type-C output | Hosts `./run-demo.sh`, controls browser presentation, shares screen to classroom projector. |
| **Secondary / Hot Standby** | **Vincent John Tamaño** | Clean machine, Node.js 22 LTS, 8GB+ RAM, HDMI output | Cloned repositories with pre-cached dependencies, ready to connect if primary laptop encounters hardware issues. |
| **Speaker: Architecture** | **Justin Ace Ardeña** | Dedicated mobile/clicker | Explains Express routing, Firestore data model, and BOLA security boundary. |
| **Speaker: UI/UX & A11y** | **Mae Daniella Faith Benjamin** | Co-presenter | Explains design system, WCAG 2.2 AA contrast, skip-links, and mobile responsiveness. |
| **Speaker: Educational Content** | **Lovelly Grace Piedad** | Co-presenter | Explains Philippine ECCD Council alignment, milestone observation privacy, and non-diagnostic guardrails. |

---

## 4. Network Failure & Contingency Matrix

The presentation must remain seamless even if the classroom network drops completely during the demonstration:

| Failure Mode | Immediate Behavior | Fallback Mechanism | Impact on Demo |
|---|---|---|---|
| **Campus Wi-Fi drops completely** | Core app unaffected (Auth and Firestore run locally). | Open Library falls back to local curated books ([`FALLBACK_BOOKS`](https://github.com/Thesis-Titans/littlesteps-react/blob/main/src/features/catalog/fallbackData.ts)); Gemini falls back to deterministic curriculum picks (`Our picks`). | **Zero.** The UI displays a calm status banner; all browsing, planning, and journal saving continue smoothly. |
| **Gemini AI API times out / rate limits** | Express API bounds calls at 8,000 ms. | Tier 3 deterministic rule-based catalog fallback automatically activates. | **Zero.** Activity cards render with the standard *"Our picks"* badge and disclaimer. No error popups. |
| **Projector / Display cable failure** | Laptop HDMI port or projector fails to handshake. | Hot-standby machine immediately connects, or presentation switches to secondary laptop display. | 2-minute transition window. |
| **Total Hardware Outage** | Laptop crashes or battery fails. | Pre-recorded 1080p full demonstration walkthrough video played from USB drive on classroom podium PC. | Presentation proceeds without live typing. |

---

## 5. Live Demonstration Rehearsal Checklist

### Phase 1: T-24 Hours (Preparation & Sync)
- [ ] Run `git checkout main && git pull origin main` in `littlesteps-api`, `littlesteps-react`, and `littlesteps-docs`.
- [ ] Confirm both `npm test` suites pass locally:
  - `littlesteps-api`: 442/442 unit & integration tests passing.
  - `littlesteps-react`: 322/322 component & hook tests passing.
- [ ] Verify `.env` in `littlesteps-api`:
  - `SERVE_SYNTHETIC_CATALOG=true`
  - `DEMO_ALLOW_SYNTHETIC_AI=true`
  - `GEMINI_MODEL=gemini-3.5-flash-lite` (pinned stable Flash-Lite model; avoid floating `-latest` aliases)
  - `OPEN_LIBRARY_CONTACT=markcadangin@gmail.com`
  - `TRUST_PROXY_HOPS=1`
- [ ] Confirm backup walkthrough MP4 video (`littlesteps-demo-backup.mp4`) is saved on the desktop and copied to a FAT32 USB drive.
- [ ] Test HDMI/Type-C dongle connection to an external monitor.

### Phase 2: T-30 Minutes (Environment Bring-Up)
- [ ] Open terminal in workspace root and run:
  ```bash
  ./run-demo.sh
  ```
- [ ] Confirm terminal logs show:
  - `✓ Firebase Emulators and Functions API are ready!`
  - `✓ Demo caregiver profile verified/created`
  - `✓ Vite web client is ready!`
- [ ] Open Chrome and navigate to `http://localhost:5173`.
- [ ] Verify automatic login to the **Maya (24–35m)** dashboard.
- [ ] In a second tab, open the Firebase Emulator UI: `http://localhost:4000/firestore`.

### Phase 3: T-5 Minutes (Stage Alignment)
- [ ] Connect display cable to projector. Mirror displays at 1920x1080 or 1280x720.
- [ ] Zoom browser to 110% (`Ctrl +`) for readability from classroom back rows.
- [ ] Silence laptop notifications (enable "Do Not Disturb" mode).
- [ ] Confirm presenters are arranged in speaker order.

---

## 6. 5-Minute Live Walkthrough Script

| Time | Presenter | Screen / Action | Talking Points |
|---|---|---|---|
| **0:00 – 1:00** | **Mark** | Title Slide & Architecture Overview | Introduce team, client context (CSWDO Lapuz), and the coordinated system: React 19 + Express on Firebase Functions + Firestore emulators. |
| **1:00 – 2:00** | **Mae / Mark** | `#/today` (Today Dashboard) | Highlight child profile switching, quick-filter chips, and real-time weather context (Open-Meteo) adapting play recommendations without GPS tracking. |
| **2:00 – 3:15** | **Justin / Mark** | `#/explore` (Storybooks & AI Helper) | Search children's literature via Open Library REST API. Open story companion dialog: show Gemini 3.5 Flash Lite generating screen-free play idea with *"Suggested by AI"* badge. Click *"Plan for Today"* to ingest book into Firestore schedule. |
| **3:15 – 4:15** | **Lovelly / Mark** | `#/milestones` & `#/this-week` | Check an observed milestone. Demonstrate non-diagnostic, descriptive guidance and private observation journal. Open This Week summary showing domain distribution and affirming reflection. |
| **4:15 – 5:00** | **All** | Network Resiliency & Conclusion | Demonstrate offline / fallback mode: show that disabling Wi-Fi immediately triggers the calm offline banner and deterministic *"Our picks"* catalog recommendations without crashing. Conclude with limitations and future mobile rollout. |

---

## 7. Verification & Sign-Off

* [x] Environment decided: Local Firebase Emulators via `./run-demo.sh` with live external HTTPS APIs.
* [x] Hardware allocated: Mark (Primary host), Vincent (Hot standby).
* [x] Live checks verified on real cloud project `dog-app-cit210-7492` (API #60).
* [x] Network resilience and offline fallback matrix documented.
* [x] Step-by-step pre-flight rehearsal checklist established.
* [x] 5-minute timed presentation script structured.
