# CIT 210 — Web Systems and Technologies Deliverables

**Course:** CIT 210 Web Systems and Technologies  
**Institution:** West Visayas State University — College of Information and Communications Technology  
**Core Technologies:** React + TypeScript Web Application (Vite), Express Node.js API, Firebase Auth & Firestore  
**Evaluation:** Presentation & Local Demonstration (December 2, 2026; no individual code defense)  

---

## Required Submission Components

1. **Functioning React Web Application:**
   - React frontend reading and writing shared data via the LittleSteps API.
   - Comprehensive error, empty, loading, and responsive states across desktop and mobile viewports.
2. **API & Database Integration:**
   - Unified Node.js Express API with token-verified authorization.
   - Local integration testing via the Firebase Emulator Suite.
   - Third-party services, called only from the API: the Gemini API for the AI helper ([ADR-008](../../architecture-decisions.md)) and Open-Meteo for optional weather-aware ideas ([ADR-009](../../architecture-decisions.md)).
3. **Documentation:**
   - Shared documentation hierarchy with CC 207B.
   - Canonical OpenAPI contract maintained at [`openapi/openapi.yaml`](https://github.com/Thesis-Titans/littlesteps-api/blob/main/openapi/openapi.yaml).
   - Step-by-step local execution instructions in [Developer Onboarding Guide](../../getting-started.md).
