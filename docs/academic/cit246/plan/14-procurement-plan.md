# 14. Procurement Plan

**Plan section:** 14  
**Version:** 1.0 draft, 23 October 2026  
**Status:** Draft for team review. The structure follows Schwalbe, *Information Technology Project Management*, Chapter 12.  
**Related Documents:** [Cost Estimate and Budget](09-cost-estimate-and-budget.md), [Resource and Responsibility Plan](11-resource-and-responsibility-plan.md), [Risk Register](13-risk-register.md)

---

## 14.1 Make-or-Buy Decisions

| Item | Decision | Why | Budget (Section 9) |
|---|---|---|---|
| Project management, requirements, quality, stakeholder engagement, training delivery | **In-house** (project team) | Core skills of the team; keeps knowledge with the project | Labour in 1.0, 2.1, 6.4, 7.0, 8.1 |
| Two Flutter and backend developers | **Buy** (contract) | The team lacks experienced full-time Flutter developers (Section 11.4) | Labour in 4.0, 5.0, parts of 6.0 and 8.0 |
| UI/UX designer and QA tester (part-time) | **Buy** (contract) | Short, specialist work | Labour in 2.2, 6.1, 6.2 |
| ECCD content reviewer | **Buy** (honorarium) | The team lacks early-childhood expertise | ₱60,000 |
| Translator (Filipino and Hiligaynon) | **Buy** (per item) | Quality translation for parents | ₱48,000 |
| Privacy consultant | **Buy** (fixed fee) | The team lacks data-privacy law expertise | ₱50,000 |
| Cloud and AI services (Firebase pay-as-you-go plan, paid Gemini tier) | **Buy** (subscription) | Building hosting in-house is not realistic | ₱30,000 |
| Three Android test phones | **Buy** | Needed for device testing; given to the client at handover | ₱30,000 |
| Google Play developer registration | **Buy** | Required to publish | ₱1,500 |
| Printing, venue and snacks | **Buy** (small purchases) | Pilot onboarding and training | ₱40,000 |
| Activity content | **Adapt** existing sources, with permission | Writing new content is out of scope | In 3.2 |

## 14.2 How Suppliers Are Selected

**Rules.** The client is a local government office, so its Bids and Awards Committee (BAC) runs the procurement under the New Government Procurement Act (Republic Act No. 12009, 2024) and its implementing rules. The project team prepares the terms of reference and helps evaluate; the BAC decides. Given the amounts involved, the BAC will likely use a simplified method such as small-value or negotiated procurement for each contract; it confirms the method.

**Process for each contracted service:**

1. The project team writes terms of reference: scope, deliverables, acceptance criteria (Section 10), schedule and the ceiling price from Section 9.
2. The BAC posts the request or invites at least three qualified suppliers.
3. Suppliers submit a quotation and, for developers and the designer, a portfolio or a short paid test task.
4. The project team scores the offers against the criteria below; the BAC checks eligibility and price.
5. The BAC awards the contract; the project manager confirms references before work starts.

**Selection criteria (developers; adapted for other services):**

| Criterion | Weight |
|---|---|
| Relevant experience: at least one published Flutter app and one Node.js or Firebase backend | 30% |
| Result of a short paid test task (a screen with loading and error states, reviewed by the team) | 25% |
| Price within the ceiling | 20% |
| Experience handling personal data under RA 10173 | 15% |
| Availability for the whole contract period, and based in or near Iloilo City | 10% |

## 14.3 Contract Protections for the Client

Every service contract includes:

- **Ownership:** the client owns all source code, designs, content and documents produced, from the moment they are created.
- **Code and accounts in the client's name:** all code lives in a repository the client owns; cloud, Google Play and AI accounts are opened in the client's name with the client as owner, never in a supplier's personal account.
- **Data processing agreement (RA 10173):** suppliers process personal data only for the project, keep it confidential, do not copy or reuse it, and report any suspected breach to the project manager within 24 hours.
- **Payment on acceptance:** payments are tied to accepted deliverables (Section 10), with 10% retained until the end of the warranty.
- **Warranty:** suppliers fix defects found within three months of acceptance at no extra cost.
- **Key people and replacement:** a named developer cannot be replaced without the client's approval, and the supplier must provide an equally qualified replacement within ten working days (risk R6).
- **Confidentiality and termination:** a non-disclosure clause, and the right to end the contract for non-performance with handover of all work done.
