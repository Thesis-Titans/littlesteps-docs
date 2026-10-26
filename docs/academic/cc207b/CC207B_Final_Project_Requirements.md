# CC 207B Final Project Requirements

**Course:** CC 207B — Applications Development and Emerging Technologies  
**Institution:** West Visayas State University — College of Information and Communications Technology  
**Authority:** Official CICT Course Final Project Brief  
**Related Documents:** [CC 207B Deliverables](README.md), [Academic Deliverables Index](../README.md), [Traceability Matrix](../../traceability-matrix.md)

> [!NOTE]
> **Authoritative Source:** The course instructor's project brief is the authoritative source for course requirements and grading. This document transcribes the official specifications governing the LittleSteps Flutter mobile application, documentation package, AI criteria, and code defense.

---

## Requirements

For the Final Project in CC 207B, you and your group members are required to develop, present, and submit a functioning application. The application may be a web or mobile application that mostly interacts with your target customers or clients, and it may be part of a larger system. The application should be developed using **Flutter** as the base framework, and its UI should follow the majority of the design found in the low- and high-fidelity prototypes your group presented before.

The application must also **(1)** include at least one **user-facing feature powered by Artificial Intelligence**, and **(2)** clearly apply the topics discussed in this course, as shown in the Topic Coverage Matrix of your documentation. Your target users should ideally be a real or realistic client (for example, a campus organization, a barangay office, or a local small business), and the problem your application solves should come from that client's actual needs.

Aside from the application, you need to prepare two documents that will support it:

a. A **software documentation** encompassing the overview, introduction, features, technical aspects, UI/UX prototypes, functional requirements, AI feature specification, AI usage log, and individual reflections.

b. A **short presentation** of the application's purpose and core features, with a live demonstration of its navigation and core features.

---

## Groupings and Project Scope

A group can consist of 2 to 5 members. Bigger teams are expected to submit a more complex application, so the minimum number of core features scales with team size:

| Team size | 2 members | 3 members | 4 members | 5 members |
|---|---|---|---|---|
| **Minimum core features** | 3 | 4 | 5 | 6 |

A **core feature** is a user-facing flow that takes user input, processes it or changes the application's state, and produces a meaningful result (for example: booking a schedule, submitting and tracking a request, or searching and filtering records). Login/registration, splash screens, and static pages such as "About" or "Settings" **do not** count as core features. The AI-powered feature counts as one core feature.

---

## Minimum Technical Requirements

Every application must demonstrate the following:

a. Proper use of Value, Layout, Interaction, and Navigation components:
   - i. UI/UX Design-wise
   - ii. Code Implementation-wise

b. Smooth navigation between screens.

c. At least one form with input validation and clear error feedback.

d. Data persistence (local storage or a cloud database such as Firebase).

e. Asynchronous operations with visible loading, empty, and error states.

f. Organized folders by purpose (for example: *screens*, *widgets*, *models*, *services*, *assets*), and comments that describe what each significant part of the code does.

---

## AI-Powered Feature Requirement

Each application must include at least one AI-powered feature that the **end user directly interacts with**. Using AI only to help write the code does not satisfy this requirement. Possible features include a domain-specific assistant or FAQ bot, personalized recommendations, text or image recognition (e.g., scanning receipts or documents), summarizing or classifying user-generated content, and natural-language search. Groups may use cloud-based models (e.g., through Firebase) or on-device machine learning packages. The AI feature must meet the following:

a. **Relevance.** It solves a real problem within the application's purpose, and the group can explain why AI is a better fit than ordinary program logic.

b. **Security.** API keys and other secrets are never committed to the repository.

c. **Graceful failure.** It shows loading states, handles timeouts and service errors, and offers a usable fallback when the AI is unavailable or returns an unusable result.

d. **Responsible use.** AI-generated content is labeled as such, users can correct or override it, and only the personal data the feature actually needs is collected, consistent with the Data Privacy Act of 2012 (RA 10173).

---

## AI Use Policy for Completing the Project

AI tools may support your learning, but the application must be your group's own work, and every member must understand the code they submit. The following policy applies:

| Category | Examples |
|---|---|
| **Allowed**, no disclosure needed | Learning or reviewing concepts; explaining error messages; finding relevant documentation. |
| **Allowed**, must be recorded in the AI Usage Log | Generating or refactoring code snippets; debugging suggestions; generating sample data, text content, or image assets. The member must be able to explain and modify any such code. |
| **Not allowed** | Generating the whole application or large portions of it wholesale; submitting code that the member cannot explain or modify; using AI to write the individual reflections or the self and peer assessments. |

Honest disclosure in the AI Usage Log does **not** reduce your score. Undisclosed AI-generated code that a member cannot explain during the Individual Code Defense **will result in deductions.**

---

## Specific Requirements for Submission

### 1. Presentation

a. A short PowerPoint or PDF presentation file to be presented on a scheduled date. The content should include the following:
   - i. Background of the application: the problem, the target users or client, and the purpose.
   - ii. Features: at least the minimum number of core features for your team size, including the AI-powered feature.
   - iii. Screenshots of the application.
   - iv. A **live demonstration** of the application. A recorded video demonstration must also be prepared, but it will only be used as a backup if a technical problem prevents the live demo.
   - v. Known limitations and planned future features or improvements.

b. Presentation time should be 5 to 10 minutes long.

c. A Q&A session and **Individual Code Defense** of about 2 to 3 minutes per member:
   - i. Each member will be asked to explain a part of the code that they personally committed.
   - ii. A member may be asked to make a small live change to their code (for example, adding a form field or changing where a button navigates).

### 2. A software documentation listing the technical aspects of the developed Flutter application

a. The documentation must contain the following sections:

- **i. Overview and Introduction**
  1. App Name
  2. Purpose and Target Users or Client
  3. Technology Stack (frameworks, SDKs, modules/packages utilized) along with their versions
- **ii. Functional Requirements** (arranged in any order)
  1. Libraries/packages used and the purpose of each
  2. Low- and High-Fidelity Prototypes
  3. Implemented core features with screenshots and descriptions
  4. Topic Coverage Matrix (see the template below)
  5. AI Feature Specification: the AI service or model and package used; the inputs or prompts; sample outputs; how failures are handled and what the fallback is; known failure cases; why AI was the right tool for this problem; and privacy considerations
- **iii. Future Enhancements and Roadmap**
  1. Known Limitations
  2. Planned Features and Improvements
- **iv. AI Usage Log** (appendix; see the template below)
- **v. Individual Reflections** (appendix): about half a page per member describing what they built, one bug they fixed and how they fixed it, and what they would do differently

#### Topic Coverage Matrix template

*List every required topic and point to exactly where it is applied in your code.*

| Course topic | Where applied (file and widget/class) | Brief description |
|---|---|---|
| Layout widgets | `lib/screens/home_screen.dart` — HomeScreen | |
| Navigation and routing | | |
| Forms and validation | | |
| Asynchronous operations / API calls | | |
| Data persistence | | |
| AI-powered feature | | |

#### AI Usage Log template

| Member | Date | AI tool | What it was used for / prompt summary | What was generated | What the member changed |
|---|---|---|---|---|---|
| | | | | | |
| | | | | | |
| | | | | | |

### 3. GitHub submission of the project source code and folders

a. A GitHub repository is going to be created within our organization.

b. The team leaders will fork the repository and collaborate with their team members.

c. Each member works on **feature branches** with meaningful commit messages. Pull requests into the group's main branch must be reviewed by at least one other teammate before merging.

d. API keys and other secrets must be excluded from the repository (e.g., through `.gitignore`).

e. The repository must include a README with setup and run instructions.

f. Once the project is done, the team leaders will create a PR to merge their changes to the main repository.

g. Collaboration is part of your grading criteria and will be assessed from the commit and pull request history. Make sure that all members contribute throughout the project, not only near the deadline.

### 4. Self and Peer Assessment

a. A Self and Peer Assessment template will be distributed to everyone a day after your project presentation.

b. Peer ratings should refer to concrete contributions that can be verified in the GitHub repository.

c. This will factor into the final project score, as follows:

**Project Score Calculation:** *(PROJECT SCORE RAW × 70%) + (SELF EVAL SCORE RAW × 10%) + (PEER EVAL SCORE RAW × 20%)*

*The PROJECT SCORE RAW is the group's rubric score, less any late submission deduction and any Individual Code Defense adjustment for that member.*

### 5. Late Submission

Five (5) points will be deducted from the PROJECT SCORE RAW for each calendar day the project is submitted after the due date, up to seven (7) days. Projects more than one week overdue will not be accepted unless approved by the instructor.

Finally, an assignment on the LMS will be created later for submitting the necessary files.
