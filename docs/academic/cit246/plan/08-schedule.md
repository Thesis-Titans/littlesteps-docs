# 8. Schedule

## 8.1 Software and Calendar

- **Software:** the activity list, critical path (forward and backward pass) and costs were calculated with a Python script, [schedule_model.py](data/schedule_model.py), and exported to [schedule-and-cost.csv](data/schedule-and-cost.csv), which opens in Excel or Google Sheets and imports into GanttProject or ProjectLibre. The network diagram, Gantt chart and cost curve are drawn by [make_figures.py](data/make_figures.py) from the same data.
- **Calendar:** 4 Jan 2027 to 27 Aug 2027, 166 working days (Monday to Friday). Holidays excluded: Maundy Thursday (25 March), Good Friday (26 March), Araw ng Kagitingan (9 April) and Iloilo City Charter Day (25 August). Holidays set by proclamation are not in the calendar; a weekday proclamation may move later dates by a day without changing the order of work.
- **Resources:** two developers. Developer A builds the backend (4.1.2–4.3.3), then the journal, weekly summary and AI helper screens (5.4–5.5). Developer B builds the catalog service (4.3.1), then the remaining screens (5.1–5.3). The schedule never needs more than two developers on the same day.

## 8.2 Activity List

Each activity is a WBS work package; all dates are in 2027. Basis of the duration estimate: Analog. (analogous, from the team's course build), Param. (parametric, from a unit count and rate), Expert (expert judgment), LOE (level of effort) and Fixed (set by the pilot design). Float is the number of working days an activity can slip without delaying the finish; zero-float activities form the critical path (**bold**). Work packages 1.3.1 and 1.3.2 run from the end of planning to the start of closing and have no float.

| WBS | Activity | Days | Basis | Predecessors | Start | Finish | Float | Cost (₱) |
|---|---|---:|---|---|---|---|---:|---:|
| **1.1.1** | **Project charter and sponsor sign-off** | 5 | Analog. | — | 4 Jan | 8 Jan | 0 | 12,512 |
| 1.1.2 | Stakeholder register and analysis | 5 | Analog. | — | 4 Jan | 8 Jan | 156 | 8,195 |
| 1.2.1 | Scope statement and WBS | 5 | Analog. | 1.1.1 | 11 Jan | 15 Jan | 151 | 12,740 |
| 1.2.2 | Schedule, cost baseline and subsidiary plans | 5 | Analog. | 1.2.1, 1.1.2 | 18 Jan | 22 Jan | 151 | 13,060 |
| 1.3.1 | Status reports, two-weekly demos and sponsor updates | 146 | LOE | — | 25 Jan | 19 Aug | — | 79,716 |
| 1.3.2 | Risk, issue and change control | 146 | LOE | — | 25 Jan | 19 Aug | — | 46,501 |
| **1.4.1** | **Final acceptance and closure report** | 3 | Analog. | 8.3.2 | 20 Aug | 24 Aug | 0 | 7,508 |
| **1.4.2** | **Lessons learned and archive** | 2 | Analog. | 1.4.1 | 26 Aug | 27 Aug | 0 | 6,280 |
| **2.1.1** | **Discovery interviews and baseline measures** | 10 | Param. | 1.1.1 | 11 Jan | 22 Jan | 0 | 30,040 |
| 2.1.2 | Requirements specification (D1) | 10 | Param. | 2.1.1 | 25 Jan | 5 Feb | 13 | 13,650 |
| 2.2.1 | Wireframes and design system | 10 | Analog. | 2.1.1 | 25 Jan | 5 Feb | 17 | 17,745 |
| 2.2.2 | Clickable prototype and parent walkthrough (D2) | 10 | Analog. | 2.2.1, 2.1.2 | 8 Feb | 19 Feb | 43 | 24,300 |
| 2.3.1 | Privacy impact assessment draft | 10 | Expert | 2.1.2 | 8 Feb | 19 Feb | 13 | 60,465 |
| 2.3.2 | DPO review and approval (D3) | 10 | Expert | 2.3.1 | 22 Feb | 5 Mar | 13 | 1,820 |
| 3.1.1 | Source selection and reuse permissions | 15 | Param. | 2.1.1 | 25 Jan | 12 Feb | 11 | 19,125 |
| 3.2.1 | Adapt 80 activities, stories and rhymes | 25 | Param. | 3.1.1 | 15 Feb | 19 Mar | 11 | 38,700 |
| 3.2.2 | Translate items to Filipino and Hiligaynon | 15 | Param. | 3.2.1 | 22 Mar | 14 Apr | 11 | 53,738 |
| 3.3.1 | Content reviewer sign-off (D4) | 10 | Param. | 3.2.1 | 22 Mar | 6 Apr | 16 | 63,825 |
| 3.3.2 | Load the reviewed catalog into the database | 3 | Analog. | 3.3.1, 3.2.2, 4.3.1, 5.3.2 | 19 Apr | 21 Apr | 9 | 2,048 |
| **4.1.1** | **API contract and data model** | 10 | Analog. | 2.1.1 | 25 Jan | 5 Feb | 0 | 27,300 |
| **4.1.2** | **Cloud project, environments and CI** | 3 | Analog. | 4.1.1 | 8 Feb | 10 Feb | 0 | 14,095 |
| **4.2.1** | **Authentication and child profile service** | 10 | Analog. | 4.1.2 | 11 Feb | 24 Feb | 0 | 13,650 |
| **4.2.2** | **Activity planning and observation services** | 10 | Analog. | 4.2.1 | 25 Feb | 10 Mar | 0 | 13,650 |
| 4.3.1 | Catalog service | 8 | Analog. | 4.1.1 | 8 Feb | 17 Feb | 9 | 10,920 |
| **4.3.2** | **Journal and weekly summary services** | 10 | Analog. | 4.2.2 | 11 Mar | 24 Mar | 0 | 13,650 |
| **4.3.3** | **AI suggestion service and fallback** | 10 | Analog. | 4.3.2, 4.3.1, 2.3.2 | 29 Mar | 12 Apr | 0 | 13,650 |
| 5.1.1 | App project, theme and navigation | 8 | Analog. | 2.2.1, 4.3.1 | 18 Feb | 1 Mar | 9 | 10,920 |
| 5.1.2 | Sign-in and API client | 5 | Analog. | 5.1.1, 4.2.1 | 2 Mar | 8 Mar | 9 | 6,825 |
| 5.2.1 | Child profile screens | 5 | Analog. | 5.1.2 | 9 Mar | 15 Mar | 9 | 6,825 |
| 5.2.2 | Milestone observation screens | 6 | Analog. | 5.2.1, 4.2.2 | 16 Mar | 23 Mar | 9 | 8,190 |
| 5.3.1 | Activity library screens | 8 | Analog. | 5.2.2, 4.3.1 | 24 Mar | 6 Apr | 9 | 10,920 |
| 5.3.2 | Today and activity planning screens | 7 | Analog. | 5.3.1 | 7 Apr | 16 Apr | 9 | 9,555 |
| **5.4.1** | **Private journal screens** | 6 | Analog. | 4.3.3, 5.1.2 | 13 Apr | 20 Apr | 0 | 8,190 |
| **5.4.2** | **Weekly summary screens** | 4 | Analog. | 5.4.1 | 21 Apr | 26 Apr | 0 | 5,460 |
| **5.5.1** | **AI helper screens and fallback states** | 6 | Analog. | 5.4.2, 2.2.2 | 27 Apr | 4 May | 0 | 8,190 |
| 6.1.1 | Test plan and test cases | 5 | Param. | 2.1.2 | 8 Feb | 12 Feb | 54 | 5,675 |
| **6.1.2** | **System and regression testing** | 10 | Param. | 5.3.2, 5.5.1, 3.3.2, 6.1.1 | 5 May | 18 May | 0 | 25,000 |
| **6.2.1** | **Device and accessibility testing** | 6 | Param. | 6.1.2 | 19 May | 26 May | 0 | 39,267 |
| **6.3.1** | **Security review and fixes** | 6 | Expert | 6.1.2 | 19 May | 26 May | 0 | 9,282 |
| **6.4.1** | **Usability testing and fixes** | 6 | Param. | 6.1.2 | 19 May | 26 May | 0 | 16,380 |
| **7.1.1** | **Pilot onboarding at two centers** | 5 | Param. | 6.2.1, 6.3.1, 6.4.1, 8.1.1 | 27 May | 2 Jun | 0 | 29,105 |
| **7.2.1** | **Eight-week pilot with support** | 40 | Fixed | 7.1.1 | 3 Jun | 28 Jul | 0 | 80,080 |
| **7.3.1** | **Pilot evaluation report (D8)** | 5 | Analog. | 7.2.1 | 29 Jul | 4 Aug | 0 | 9,555 |
| 8.1.1 | Training materials (D9) | 10 | Param. | 3.3.1, 5.3.2, 5.5.1 | 5 May | 18 May | 6 | 36,845 |
| 8.1.2 | CDW training sessions | 2 | Param. | 7.3.1 | 5 Aug | 6 Aug | 6 | 3,642 |
| **8.2.1** | **Post-pilot fixes** | 5 | Expert | 7.3.1 | 5 Aug | 11 Aug | 0 | 16,488 |
| **8.2.2** | **Google Play release (D10)** | 3 | Analog. | 8.2.1 | 12 Aug | 16 Aug | 0 | 4,640 |
| 8.3.1 | Handover package (D11) | 5 | Analog. | 6.3.1, 6.4.1 | 27 May | 2 Jun | 53 | 8,872 |
| **8.3.2** | **Maintainer training and handover sign-off** | 3 | Param. | 8.2.2, 8.3.1, 8.1.2 | 17 Aug | 19 Aug | 0 | 5,925 |

## 8.3 Network Diagram and Critical Path

Activity-on-node diagram: each box shows the WBS number and duration, and arrows are finish-to-start dependencies.

![Figure 8.1. Network diagram with the critical path](figures/fig-8-1-network.png)

*Figure 8.1. Network diagram by WBS branch (rows) and dependency depth (columns). Red boxes and heavy arrows are the critical path; levels of effort 1.3.1 and 1.3.2 are shown as a bar outside the network.*

**Critical path:** 1.1.1 → 2.1.1 → 4.1.1 → 4.1.2 → 4.2.1 → 4.2.2 → 4.3.2 → 4.3.3 → 5.4.1 → 5.4.2 → 5.5.1 → 6.1.2 → (6.2.1, 6.3.1 and 6.4.1 in parallel) → 7.1.1 → 7.2.1 → 7.3.1 → 8.2.1 → 8.2.2 → 8.3.2 → 1.4.1 → 1.4.2 = 166 working days.

**Why this is the critical path.** The longest chain runs through Developer A's work: the API contract, cloud setup, the four backend services, then the journal, weekly summary and AI helper screens. The AI service (4.3.3) cannot start until the Data Protection Officer approves the privacy impact assessment and the journal service exists. Testing, the fixed eight-week pilot, its evaluation, release and handover then follow in sequence. The catalog and screen path (3.x and 5.1–5.3) has 9–11 days of float (16 for reviewer sign-off) and the design path 13–17 days (43 for the clickable prototype). A delay there moves the finish date only if it exceeds that float. A slip is most likely to hurt in the backend services and at the pilot start, so these get the closest weekly tracking (Section 12).

## 8.4 Gantt Chart

![Figure 8.2. Gantt chart and cumulative cost baseline](figures/fig-8-2-gantt-cost.png)

*Figure 8.2. Gantt chart (red bars are on the critical path; diamonds are milestones) with the cumulative cost baseline (S-curve) and the budget with contingency on the same time axis.*

## 8.5 Milestones

| Milestone | Date | Marks the end of |
|---|---|---|
| Charter signed | 8 Jan 2027 | 1.1.1 Project charter and sponsor sign-off |
| Design and privacy approved | 5 Mar 2027 | 2.3.2 DPO review and approval (D3) |
| Catalog reviewed | 6 Apr 2027 | 3.3.1 Content reviewer sign-off (D4) |
| All features built | 4 May 2027 | 5.5.1 AI helper screens and fallback states |
| Pilot starts | 3 Jun 2027 | 7.1.1 Pilot onboarding at two centers; first day of 7.2.1 |
| Pilot evaluation report | 4 Aug 2027 | 7.3.1 Pilot evaluation report (D8) |
| Google Play release | 16 Aug 2027 | 8.2.2 Google Play release (D10) |
| Handover | 19 Aug 2027 | 8.3.2 Maintainer training and handover sign-off |
| Project closed | 27 Aug 2027 | 1.4.2 Lessons learned and archive |
