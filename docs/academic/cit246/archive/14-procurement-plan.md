# 14. Procurement Plan

## 14.1 Make-or-Buy Decisions

| Item | Decision | Why | Budget (Section 9) |
|---|---|---|---|
| Project management, requirements, quality, stakeholder engagement, training delivery | **In-house** | Core team skills | Labour in 1.0, 2.1, 6.4, 7.0, 8.1 |
| Two Flutter and backend developers | **Buy** (contract) | No experienced full-time Flutter developers (Section 11.4) | Labour in 4.0, 5.0, 6.0, 8.0 |
| UI/UX designer and QA tester (part-time) | **Buy** (contract) | Short, specialist work | Labour in 2.2, 6.1, 6.2 |
| ECCD content reviewer | **Buy** (honorarium) | No early-childhood expertise | ₱60,000 |
| Translator (Filipino, Hiligaynon) | **Buy** (per item) | Quality translation | ₱48,000 |
| Privacy consultant | **Buy** (fixed fee) | No data-privacy law expertise | ₱50,000 |
| Cloud and AI services (Firebase, paid Gemini tier) | **Buy** (subscription) | In-house hosting is not realistic | ₱30,000 |
| Three Android test phones | **Buy** | Device testing; given to the client at handover | ₱30,000 |
| Google Play developer registration | **Buy** | Required to publish | ₱1,500 |
| Printing, venue and snacks | **Buy** (small purchases) | Pilot onboarding and training | ₱40,000 |
| Activity content | **Adapt** existing sources, with permission | New content is out of scope | In 3.2 |

## 14.2 How Suppliers Are Selected

The client is a local government office, so its Bids and Awards Committee (BAC) runs procurement under the New Government Procurement Act (Republic Act No. 12009, 2024). The team prepares the terms of reference and helps evaluate; the BAC decides and confirms the method, likely a simplified one such as small-value or negotiated procurement.

1. The team writes terms of reference: scope, deliverables, acceptance criteria (Section 10), schedule and the ceiling price from Section 9.
2. The BAC posts the request or invites at least three qualified suppliers.
3. Suppliers submit a quotation and, for developers and the designer, a portfolio or short paid test task.
4. The team scores the offers against the criteria below; the BAC checks eligibility and price.
5. The BAC awards the contract; the project manager confirms references before work starts.

| Selection criterion (developers; adapted for other services) | Weight |
|---|---|
| Experience: one published Flutter app and one Node.js or Firebase backend | 30% |
| Short paid test task (a screen with loading and error states) | 25% |
| Price within the ceiling | 20% |
| Experience with personal data under RA 10173 | 15% |
| Availability for the whole contract; based in or near Iloilo City | 10% |

## 14.3 Contract Protections for the Client

- **Ownership:** the client owns all source code, designs, content and documents from creation.
- **Accounts in the client's name:** code is in a client-owned repository; cloud, Google Play and AI accounts are owned by the client, never a supplier's personal account.
- **Data processing (RA 10173):** suppliers use personal data only for the project, keep it confidential, and report a suspected breach to the project manager within 24 hours.
- **Payment on acceptance:** payments follow accepted deliverables (Section 10), with 10% retained until the warranty ends.
- **Warranty:** defects found within three months of acceptance are fixed at no cost.
- **Key people:** a named developer cannot be replaced without the client's approval, and an equally qualified replacement is provided within ten working days (risk R6).
- **Termination:** a non-disclosure clause, and the right to end the contract for non-performance with handover of all work done.
