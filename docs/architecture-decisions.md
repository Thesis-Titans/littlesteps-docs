# Architecture Decisions

Status: proposed baseline for team review. Amend through a pull request when a decision changes.

## ADR-001 — Shared backend
**Decision:** Both clients use one shared HTTP API, authentication system, data model, and authorization policy.
**Rationale:** This prevents feature and security rules from diverging between clients.

## ADR-002 — API runtime
**Decision:** Node.js + TypeScript, Express hosted by Firebase Cloud Functions (2nd gen HTTP function).
**Rationale:** TypeScript supports maintainable request/response types and runtime validation; Express provides routing and middleware while Cloud Functions supplies managed HTTP hosting.
**Constraint:** This scaffold is not deployed. Verify runtime and dependency compatibility during local setup.

## ADR-003 — Authentication and authorization
**Decision:** Firebase Authentication on clients; the API verifies Firebase ID tokens with Firebase Admin SDK. The verified token UID is the trusted identity. Every child-scoped operation must separately authorize access to the requested child.
**Important:** Admin SDK access bypasses Firestore Security Rules. Rules remain necessary for client-direct access, but do not replace authorization checks inside this server API.

## ADR-004 — Data store
**Decision:** Cloud Firestore is proposed. Use Firebase Emulator Suite for local integration tests before cloud deployment. Review the exact collection schema and retention/deletion flows before sensitive data is stored.

## ADR-005 — API contract
**Decision:** openapi/openapi.yaml in the API repository is the canonical client/server contract. The web client must not independently invent response shapes.

## ADR-006 — AI suggestions
**Decision:** AI is a constrained helper over reviewed catalog content, not an open-ended child-development diagnostic tool or clinical consultant. Keep provider credentials server-side, minimize prompt data, validate output against catalog IDs and schema, and use deterministic fallback when unavailable.

## ADR-007 — Change control
**Decision:** Work on branches and use draft pull requests. Seek one teammate review when feasible. Protect main with repository settings; those settings must be configured manually if unavailable through the current integration.
