# CC 207B — Applications Development and Emerging Technologies Deliverables

**Course:** CC 207B Applications Development and Emerging Technologies  
**Institution:** West Visayas State University — College of Information and Communications Technology  
**Source:** Summarized from the instructor's [CC 207B Final Project Requirements](CC207B_Final_Project_Requirements.md). The instructor's brief is the authority wherever this page differs from it.  
**Base Framework:** Flutter. The brief allows a web or mobile application; LittleSteps builds an Android mobile app.  
**Team Composition:** 5 members, so at least 6 core features (the AI-powered feature counts as one)  
**Repository:** [`Thesis-Titans/CC-207B_26-27_Final-Project`](https://github.com/Thesis-Titans/CC-207B_26-27_Final-Project/tree/main/BSIT-3A/LittleSteps), the team's fork of the instructor's course repository; the app is in `BSIT-3A/LittleSteps`. See the [execution plan](../../execution-plan.md) §1.3.  
**Submission & Defense:** **December 1, 2026 at 7:00 AM** *(extended from November 26)* — Application presentation, live demonstration, individual code defense (2–3 min/member with live modification), and submission of all deliverable packages (Topic Coverage Matrix, AI Usage Log, software documentation, and presentation deck). Final LMS upload window completes by December 2, 2026.

---

## 1. Application Requirements

- A functioning application built with **Flutter**. It may be part of a larger system and should mostly serve the target customers or clients.
- The UI should follow most of the design in the **low- and high-fidelity prototypes the group presented** earlier in the course.
- At least one **user-facing feature powered by AI**.
- The course topics must be clearly applied, as shown in the **Topic Coverage Matrix**.
- The target users should be a real or realistic client (for example a campus organization, a barangay office or a local small business), and the problem should come from that client's actual needs.

### Core features

A **core feature** is a user-facing flow that takes user input, processes it or changes the application's state, and produces a meaningful result. Login and registration, splash screens and static pages such as About or Settings **do not** count. The AI-powered feature counts as one.

| Team size | 2 | 3 | 4 | 5 |
|---|---|---|---|---|
| Minimum core features | 3 | 4 | 5 | 6 |

LittleSteps (5 members, 6 required): child profile, milestone observation prompts, daily activity planning, private journal, learning library, the "This week" reflection and the AI activity helper. That is seven candidates, so one is spare if the instructor judges any of them too thin (the weekly reflection is the most likely to be questioned).

### Minimum technical requirements

| # | Requirement | Where LittleSteps meets it |
|---|---|---|
| a | Proper use of Value, Layout, Interaction and Navigation components, in both the UI/UX design and the code | [UI/UX Design Specification](../../ui-ux-design-specification.md) §9 widget mapping; Topic Coverage Matrix |
| b | Smooth navigation between screens | Five-tab `NavigationBar`, account sheet, back navigation |
| c | At least one form with input validation and clear error feedback | Child profile form (J1); also the observation and journal forms |
| d | Data persistence (local storage or a cloud database such as Firebase) | Firestore through the shared API; local storage for drafts and the dismissed advisory |
| e | Asynchronous operations with visible loading, empty and error states | UI/UX spec §7 state matrix |
| f | Folders organized by purpose (for example `screens`, `widgets`, `models`, `services`, `assets`), with comments describing each significant part of the code | Organized across `lib/config`, `lib/theme`, `lib/models`, `lib/services`, `lib/utils`, `lib/routing`, `lib/widgets` (including adaptive Material 3 wrappers), and feature `lib/screens` with strict Effective Dart `///` docs (`public_member_api_docs`) |

## 2. AI-Powered Feature Requirement

The end user must **directly interact** with the AI feature; using AI only to help write code does not count. Cloud models (for example through Firebase) and on-device machine-learning packages are both allowed.

| Criterion | What the brief requires | LittleSteps |
|---|---|---|
| a. Relevance | Solves a real problem in the app, and the group can explain why AI fits better than ordinary program logic | AI helper (FR-06). The argument for AI: caregivers describe materials in free text ("recycled boxes, plastic cups"), which simple keyword filters match poorly. This needs to be stated clearly in the AI Feature Specification. |
| b. Security | API keys and secrets are never committed | Gemini key in server configuration only ([ADR-008](../../architecture-decisions.md)) |
| c. Graceful failure | Loading states, timeout and service-error handling, and a usable fallback when the AI is unavailable or returns an unusable result | 8-second timeout, deterministic catalog fallback, rate-limited state (UI/UX spec §7 J6) |
| d. Responsible use | AI content is labelled, users can correct or override it, and only the personal data the feature needs is collected (RA 10173) | `"Suggested by AI"` / `"Material adaptation"` badges and observational disclaimer; `"Edit preferences"` and `"Another idea"` controls; prompts carry zero personal data |

## 3. AI Use Policy (for completing the project)

| Category | Examples |
|---|---|
| Allowed, no disclosure needed | Learning or reviewing concepts; explaining error messages; finding documentation |
| Allowed, **must be recorded in the AI Usage Log** | Generating or refactoring code snippets; debugging suggestions; generating sample data, **text content or image assets**. The member must be able to explain and modify any such code. |
| Not allowed | Generating the whole application or large portions of it; submitting code the member cannot explain or modify; using AI to write the individual reflections or the self and peer assessments |

Honest disclosure in the AI Usage Log does not reduce the score. Undisclosed AI-generated code that a member cannot explain during the Individual Code Defense results in deductions.

## 4. Submission Requirements

### 4.1 Presentation

- A short PowerPoint or PDF, 5 to 10 minutes, covering:
  1. Background: the problem, the target users or client, and the purpose.
  2. Features: at least the minimum number of core features, including the AI feature.
  3. Screenshots of the application.
  4. A **live demonstration**, plus a recorded video used only as a backup if the live demo fails.
  5. Known limitations and planned features or improvements.
- Q&A and an **Individual Code Defense** of about 2 to 3 minutes per member: each member explains code they personally committed and may be asked to make a small live change (for example adding a form field or changing where a button navigates).

### 4.2 Software documentation

The complete, compiled documentation package is maintained in [**Software Documentation Package**](software-documentation.md).

| Section | Required contents |
|---|---|
| i. Overview and Introduction | App name; purpose and target users or client; technology stack (frameworks, SDKs, modules and packages) **with versions** |
| ii. Functional Requirements | Libraries and packages used, with the purpose of each; low- and high-fidelity prototypes; implemented core features with screenshots and descriptions; Topic Coverage Matrix; AI Feature Specification |
| iii. Future Enhancements and Roadmap | Known limitations; planned features and improvements |
| iv. AI Usage Log (appendix) | Table described below |
| v. Individual Reflections (appendix) | About half a page per member: what they built, one bug they fixed and how, and what they would do differently |

The [**AI Feature Specification**](ai-feature-specification.md) covers the AI service or model and package used, the inputs or prompts, sample outputs, how failures are handled and the fallback, known failure cases, why AI was the right tool, and privacy considerations.

**Topic Coverage Matrix** columns: course topic, where applied (file and widget or class), brief description. Required rows: layout widgets, navigation and routing, forms and validation, asynchronous operations and API calls, data persistence, and the AI-powered feature.

**AI Usage Log** columns: member, date, AI tool, what it was used for (prompt summary), what was generated, and what the member changed.

### 4.3 GitHub submission

1. The instructor creates a repository within the course organization.
2. Team leaders fork it and collaborate with their members.
3. Each member works on **feature branches** with meaningful commit messages. Pull requests into the group's main branch are reviewed by at least one other teammate before merging.
4. API keys and other secrets are excluded from the repository (for example through `.gitignore`).
5. The repository includes a README with setup and run instructions.
6. When the project is done, team leaders open a pull request to merge their changes into the main repository.
7. **Collaboration is graded from the commit and pull-request history.** All members must contribute throughout the project, not only near the deadline.

### 4.4 Self and peer assessment

A self and peer assessment template is distributed the day after the presentation. Peer ratings must refer to concrete contributions that can be verified in the GitHub repository.

**Project score** = (project score raw × 70%) + (self evaluation raw × 10%) + (peer evaluation raw × 20%). The project score raw is the group's rubric score, less any late deduction and any Individual Code Defense adjustment for that member.

### 4.5 Late submission

Five points are deducted from the project score raw for each calendar day late, up to seven days. Projects more than a week late are not accepted unless the instructor approves.

## 5. LittleSteps Status and Open Items

| Item | Status |
|---|---|
| Six core features, technical requirements, AI criteria | Specified: product scope FR-01 to FR-06, UI/UX spec, Flutter issues #2–#13 |
| Real or realistic client | **Decided:** Grounded in Iloilo/Western Visayas early-learning families and public Philippine ECCD/DepEd frameworks, validated through informal parent walkthroughs; the separate CIT 246 course simulates an IT Project Management Plan for the CSWDO La Paz–Lapuz District office. |
| UI follows the prototypes presented earlier | **Done:** Low-fidelity wireframes (`figures/low-fi-*.png`) and high-fidelity Material 3 prototypes (`figures/hi-fi-*.png`) are documented in `software-documentation.md` §ii.2 and aligned with the Flutter implementation. |
| Course repository to fork | **Done:** Active fork at `Thesis-Titans/CC-207B_26-27_Final-Project` (`BSIT-3A/LittleSteps`); Milestones M1–M4 are complete on `main` with M5 modularization and adaptive layout polish passing `Flutter CI/Analyze and Test`. |
| Collaboration history | **Active across all 5 members:** Feature branches, pull requests, and reviews from `@markalvincadangin`, `@Justin-Ardena`, `@vincenttamano`, `@Lovelly143`, and `@faithbn` are merged on `main`. |
| AI Usage Log | **Done:** Maintained in `BSIT-3A/LittleSteps/docs/ai-usage-log.md` and synchronized in `software-documentation.md` §iv. |
| Documentation package, presentation, reflections | **In final review (M5):** `software-documentation.md` (including Topic Coverage Matrix, AI Usage Log, and all 5 member reflections) and `ai-feature-specification.md` drafted; live demo rehearsal and backup video preparation underway for December 1, 7:00 AM. |
