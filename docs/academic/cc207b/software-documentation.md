# CC 207B — Software Documentation Package

**Course:** CC 207B — Applications Development and Emerging Technologies  
**Institution:** West Visayas State University — College of Information and Communications Technology  
**Component:** Software Documentation Package (§ 2.a)  
**Governing Documents:** [CC 207B Requirements](CC207B_Final_Project_Requirements.md), [AI Feature Specification](ai-feature-specification.md), [Traceability Matrix](../../traceability-matrix.md), [UI/UX Design Specification](../../ui-ux-design-specification.md)  
**Base Framework:** Flutter (Dart SDK ^3.13.5)  
**Client / Target Community:** Caregivers, parents, and Early Childhood Care and Development (ECCD) workers in Western Visayas

---

## i. Overview and Introduction

### 1. Application Name
**LittleSteps** — *Early Childhood Development Companion for Toddlers and Caregivers*

### 2. Purpose and Target Users or Client
LittleSteps is a screen-free early learning companion designed for parents and caregivers of toddlers aged 0 to 5 years (spanning 7 developmental age brackets from `0-5m` to `60-71m`). 

The application addresses a critical community challenge identified in consultation with local early childhood caregivers in Western Visayas: **high parental screen time and difficulty discovering safe, developmentally appropriate, screen-free play activities using ordinary household materials.** 

LittleSteps provides:
- Personalized daily play routines tailored to age bands and weather conditions.
- Evidence-based Early Childhood Care and Development (ECCD) activities.
- A digital storybook catalog integrated with the Internet Archive's Open Library and traditional Filipino action rhymes.
- A private developmental observation journal ensuring compliance with the Philippine Data Privacy Act (RA 10173).
- A user-facing AI Play Helper that transforms everyday items into structured, engaging activities.

### 3. Technology Stack & Package Versions

| Layer / Component | Technology / Library | Version | Purpose |
|---|---|---|---|
| **Base Framework** | Flutter SDK | `>=3.13.5` | Cross-platform UI toolkit targeting mobile devices. |
| **Language** | Dart SDK | `^3.13.5` | Sound null-safe object-oriented language. |
| **Networking** | `package:http` | `^1.6.0` | Asynchronous REST communication with LittleSteps API. |
| **Localization & Dates** | `package:intl` | `^0.20.3` | Date formatting, month parsing, and locale handling. |
| **Iconography** | `package:cupertino_icons` | `^1.0.8` | Standardized accessible iconography. |
| **Code Quality** | `package:flutter_lints` | `^6.0.0` | Strict linter rules enforcing Effective Dart guidelines. |
| **Backend REST API** | Node.js / Express / TypeScript | `0.1.0` | Backend proxy enforcing business rules, rate limits, and schemas. |
| **Database** | Google Cloud Firestore | API v1 | Scalable NoSQL cloud persistence. |
| **AI Foundation** | Google Gemini 2.5 Flash Lite | `@google/genai 0.1.1` | Server-proxied structured play idea generation. |

---

## ii. Functional Requirements

### 1. Libraries & Packages Utilized

- **`flutter/material.dart`**: Implements Material 3 design system components, typography, dynamic color theming, and responsive scaffolds.
- **`package:http`**: Powers [`ApiClient`](../../../../littlesteps-flutter/lib/services/api_client.dart) for asynchronous HTTP communication, authorization header injection, request timeouts, and structured JSON parsing.
- **`package:intl`**: Manages date operations for child birth months and observation timestamps.
- **`package:cupertino_icons`**: Delivers scalable vector icons for tab navigation and actions.

### 2. Low- and High-Fidelity Prototypes
- **Figma Design System:** Low-fidelity wireframes and high-fidelity component libraries were created following the 8pt grid system and WCAG 2.2 AA accessibility standards.
- **Color Palette & Design Tokens:**
  - *Forest Green (`#1F634D`):* Primary brand tone representing growth and nature.
  - *Warm Cream (`#F4F2E8`):* Soft, high-contrast canvas reducing eye fatigue.
  - *Orange (`#EC6A2C`):* Accents and milestone highlights.
  - *Design Token Mapping:* Defined in [`lib/theme/app_tokens.dart`](../../../../littlesteps-flutter/lib/theme/app_tokens.dart) and [`lib/theme/app_theme.dart`](../../../../littlesteps-flutter/lib/theme/app_theme.dart).

### 3. Implemented Core Features

LittleSteps implements **seven (7) core user-facing features**, exceeding the 6-feature requirement for a 5-member team:

1. **Child Profile & Developmental Bracket Management:**
   - *Files:* `lib/screens/children/child_profile_screen.dart`, `add_child_screen.dart`
   - *Flow:* Caregivers register children with a nickname and birth month, automatically assigning the child to one of 7 standard ECCD age brackets (`0-5m` through `60-71m`).
2. **Today's Daily Routine Planning & Execution:**
   - *Files:* `lib/screens/today/today_screen.dart`, `lib/services/plan_service.dart`
   - *Flow:* Displays scheduled activities for the day, allows checking off completed tasks, and renders contextual weather play guidance.
3. **ECCD Early Learning Activity Catalog:**
   - *Files:* `lib/screens/explore/explore_screen.dart`, `activity_detail_screen.dart`
   - *Flow:* Multi-factor browsing across 4 developmental domains (Cognitive, Motor, Language, Socio-Emotional) with duration and indoor/outdoor filters.
4. **Storybooks & Philippine ECCD Action Rhymes:**
   - *Files:* `lib/screens/explore/explore_screen.dart`, `lib/models/book.dart`
   - *Flow:* Ingests picture book metadata from the Internet Archive's Open Library and provides in-app readable Philippine folk rhymes (*Bahay Kubo*, *Tong Tong Tong Pakitong-kitong*).
5. **Developmental Milestone Observations:**
   - *Files:* `lib/screens/milestones/milestones_screen.dart`, `lib/services/milestones_service.dart`
   - *Flow:* Domain-grouped observational prompts with clear everyday indicators, allowing parents to record real-world play moments without clinical anxiety.
6. **Private Caregiver Journal:**
   - *Files:* `lib/screens/journal/journal_screen.dart`, `lib/services/journal_service.dart`
   - *Flow:* Private, date-stamped observational notebook with strict RA 10173 data privacy isolation.
7. **AI-Powered Play Helper & Companion Generator (AI Core Feature):**
   - *Files:* `lib/screens/ai/ai_suggestions_screen.dart`, `lib/services/ai_service.dart`
   - *Flow:* Takes household materials and available time, invoking Gemini 2.5 Flash Lite to produce custom, screen-free play routines with pediatric safety notices.

---

### 4. Topic Coverage Matrix

*Official mapping of CC 207B course syllabus topics to concrete code implementations in `littlesteps-flutter`:*

| Course Topic | Where Applied (File & Class/Widget) | Brief Description |
|---|---|---|
| **Layout Widgets** | `lib/screens/shell_screen.dart` (`ShellScreen`)<br/>`lib/screens/today/today_screen.dart` (`TodayScreen`)<br/>`lib/widgets/activity_card.dart` (`ActivityCard`) | Implements responsive UI hierarchy using `Scaffold`, `AppBar`, `Column`, `ListView.builder`, `Wrap`, `Padding`, and `Card`. |
| **Navigation & Routing** | `lib/routing/app_router.dart` (`AppRouter`)<br/>`lib/screens/shell_screen.dart` (`_ShellScreenState`) | Declarative named routing with `onGenerateRoute`, argument passing (`ActivityDetailScreen`), and 5-tab `NavigationBar` state preservation. |
| **Forms & Input Validation** | `lib/screens/children/add_child_screen.dart` (`_AddChildScreenState`)<br/>`lib/screens/journal/journal_screen.dart` (`JournalScreen`) | Multi-field input handling using `TextEditingController`, `TextField`, `DropdownButtonFormField`, character boundary checks, and visible input error feedback. |
| **Asynchronous Operations & API Calls** | `lib/services/api_client.dart` (`ApiClient`)<br/>`lib/services/ai_service.dart` (`AiService`)<br/>`lib/widgets/state_views.dart` (`LoadingView`, `EmptyView`, `ErrorView`) | `async`/`await` asynchronous operations, `Future` chaining, HTTP status code checks, timeout guards, and structured error handling. |
| **Data Persistence** | `lib/services/children_service.dart` (`ChildrenService`)<br/>`lib/services/journal_service.dart` (`JournalService`)<br/>`lib/services/plan_service.dart` (`PlanService`) | Cloud persistence via REST API writing to Google Cloud Firestore with real-time state synchronization; local storage for auth session state. |
| **AI-Powered Emerging Tech Feature** | `lib/screens/ai/ai_suggestions_screen.dart` (`AiSuggestionsScreen`)<br/>`lib/services/ai_service.dart` (`AiService`) | User-facing AI assistant utilizing server-proxied Google Gemini 2.5 Flash Lite with 3-tier fallback, pediatric boundaries, and mandatory `Suggested by AI` badge. |

---

### 5. AI Feature Specification Summary

A comprehensive 7-section specification governing the AI integration is maintained in [AI Feature Specification](ai-feature-specification.md):
- **Model:** Google Gemini 2.5 Flash Lite (`gemini-2.5-flash-lite`) via backend proxy.
- **Inputs:** Age band (`ageBand`), setting (`setting`), duration (`durationMinutes`), household materials (`materials`).
- **Response Validation:** Strict Zod schema enforcement (`RecommendationResponseSchema`).
- **Fallback Engine:** Automated 3-tier fallback (Cloud AI $\rightarrow$ Cache $\rightarrow$ Deterministic ECCD Catalog pick).
- **Failure Modes:** Explicit mitigations for adversarial prompt injections, hazardous materials, offline operation, and rate limits.
- **Architectural Rationale:** Natural language material mapping vs brittle SQL keywords; avoidance of open-ended conversational chatbots.
- **Privacy & RA 10173:** Zero minor gender tracking, coarse birth months, anonymous prompt variables, and private journal isolation.

---

## iii. Future Enhancements and Roadmap

### 1. Known Limitations
1. **Network Dependency for Live AI Generation:** Live Gemini generation requires an active internet connection; offline users rely on cached or catalog fallback activities.
2. **Audio / Pronunciation:** Philippine nursery rhymes currently render text lyrics and action prompts, but do not yet include integrated audio recordings.
3. **Direct Photo Attachments:** Journal entries are text-based; photo uploads of child activities are deferred to Phase 2 to minimize cloud storage costs.

### 2. Planned Features and Improvements
1. **Audio Sing-Along Player:** Add curated audio tracks recorded by native Hiligaynon and Tagalog educators.
2. **Offline Sync Queue:** Local SQLite/Hive database queue to record offline observations and auto-sync when network connectivity returns.
3. **CDC Worker Summary Export:** Printable PDF developmental milestone reports formatted for Barangay Child Development Centers.

---

## iv. AI Usage Log (Appendix)

*Record of AI tools utilized during application development in compliance with the CC 207B Academic AI Policy:*

| Member | Date | AI Tool | What it was used for / Prompt Summary | What was generated | What the member verified / changed |
|---|---|---|---|---|---|
| **Mark Alvin Cadangin** | 2026-11-07 | Gemini CLI / IDE Assistant | Scaffolding initial Flutter screen templates from Figma specs | Flutter widget skeletons for 5 main tabs | Refactored into separate files under `lib/screens/` and applied custom theme tokens. |
| **Faith Pearl D. Vicedo** | 2026-11-10 | Gemini Web | Assistance debugging Dart asynchronous HTTP response deserialization | Dart `fromJson` factory methods for `Activity` and `Child` models | Added null-checks and fallback defaults for optional cover URLs. |
| **Nherie Rose A. Frias** | 2026-11-12 | IDE Assistant | Styling custom dropdown and segment buttons for form validation | Flutter `DropdownButtonFormField` styling snippet | Adjusted padding and focus rings to match Figma 48px touch targets. |
| **Justin Ray D. Tabaosares** | 2026-11-14 | Gemini Web | Generating test fixture activities adhering to ECCD developmental domains | JSON fixtures representing sensory play ideas | Reviewed activity steps against ECCD guidelines; flagged unreviewed rhymes. |
| **Vincent O. Golez** | 2026-11-15 | IDE Assistant | Regex patterns for sanitizing storybook IDs and activity keys | Dart string replacement regex `replace(/[^a-z0-9-]/g, '')` | Tested edge cases with uppercase strings and special punctuation characters. |

---

## v. Individual Reflections (Appendix)

### Reflection: Mark Alvin Cadangin (Team Leader & System Architect)
- **What I Built:** I architected the overall system structure, linking the Flutter mobile client to our Node.js/TypeScript REST API and Cloud Firestore backend. I implemented the main application shell (`ShellScreen`), declarative route navigation (`AppRouter`), and the AI service integration (`AiService`).
- **One Bug Fixed and How:** I resolved an issue where rapid user taps on the play idea generator caused unhandled state changes and duplicate API requests. I implemented a busy state lock (`_isLoading`) and an `AbortController` timeout on the backend, ensuring client-side UI feedback is instantaneous and duplicate requests are rejected.
- **What I Would Do Differently:** If starting over, I would introduce local Hive/Isar caching earlier in the development lifecycle to provide a more comprehensive offline-first experience from day one.

### Reflection: Faith Pearl D. Vicedo
- **What I Built:** I developed the Early Learning Activity Catalog and details screen (`ExploreScreen` and `ActivityDetailScreen`). I implemented multi-factor filtering allowing caregivers to filter activities by developmental domain, duration, and setting.
- **One Bug Fixed and How:** During testing, filtering for infant activities with outdoor settings caused an empty screen with no feedback. I implemented the `EmptyView` widget with an actionable "Clear filters" button so parents are never stuck on a blank screen.
- **What I Would Do Differently:** I would implement a search bar directly on the activity catalog to allow instant keyword lookups alongside the domain filter chips.

### Reflection: Nherie Rose A. Frias
- **What I Built:** I developed the Child Profile management screens (`ChildProfileScreen` and `AddChildScreen`), including the form validation logic, nickname inputs, and age bracket selector.
- **One Bug Fixed and How:** Initially, the form accepted empty nicknames and malformed birth dates. I added strict validation regex ensuring nicknames are between 1 and 40 characters and added the `AdvisoryBanner` explaining why only non-identifying data is collected.
- **What I Would Do Differently:** I would implement a date picker that automatically calculates the exact age band from the birth month rather than having the user select the bracket from a dropdown.

### Reflection: Justin Ray D. Tabaosares
- **What I Built:** I built the Today's Routine planning screen (`TodayScreen`) and the activity completion tracking system. I also integrated the weather banner that alerts parents when rain or excessive heat requires indoor play.
- **One Bug Fixed and How:** When the weather API was unreachable, the Today screen failed to load the planned activities. I decoupled the weather service call so that weather failures degrade gracefully to a neutral state without blocking the child's daily plan.
- **What I Would Do Differently:** I would add a drag-and-drop reordering feature so caregivers can customize the order of activities throughout the day.

### Reflection: Vincent O. Golez
- **What I Built:** I developed the Private Caregiver Journal (`JournalScreen`) and the Developmental Milestones checklist (`MilestonesScreen`), ensuring observation notes are date-stamped and private.
- **One Bug Fixed and How:** Notes exceeding 2,000 characters caused server validation errors. I added client-side character counters and input length limiters (`MaxLengthEnforcement`) on the journal text fields to prevent invalid submissions.
- **What I Would Do Differently:** I would add an export button allowing caregivers to print their journal entries or save them as a PDF backup.
