# LittleSteps API Reference & Integration Guide

**Status:** Canonical Interface Specification Baseline  
**Governing Standard:** OpenAPI 3.1.0 & ISO/IEC/IEEE 42010:2022 (Interface View)  
**Owner:** Mark Alvin Cadangin (Technical Lead) & Justin (Backend Lead)  
**Last Reviewed:** 2026-10-26  
**Related Documents:** [Architecture Decisions](architecture-decisions.md) (ADR-001, ADR-003, ADR-010), [Data Model Specification](data-model.md), [Security, Privacy, and AI Safeguards](security-privacy-ai.md), [CIT 210 Deliverables](academic/cit210/README.md)

---

## 1. System Overview & Architectural Purpose

The LittleSteps backend API (`littlesteps-api`) is an Express application written in TypeScript and hosted on **Google Firebase Cloud Functions (2nd Gen)**, backed by **Google Cloud Firestore** and **Firebase Authentication**.

```mermaid
flowchart TD
    subgraph ClientLayer["Presentation Layer (Clients)"]
        ReactApp["React 19 Web App<br/><code>littlesteps-react</code> (CIT 210)"]
        FlutterApp["Cross-Platform Client<br/><code>littlesteps-flutter</code> (CC 207B)"]
    end

    ClientLayer -->|"HTTPS (JSON + Bearer ID Token)"| APIGateway

    subgraph GatewayLayer["LittleSteps API Gateway (Express on Cloud Functions v2)"]
        APIGateway["<b>API Gateway Router</b><br/>• Token Verification (Firebase Admin JWT)<br/>• BOLA Ownership Guard (child.caregiverId === uid)<br/>• Zod Schema Validation (Standard 400 Bad Request)<br/>• Response Caching (1-Hour In-Memory Public Cache)"]
    end

    APIGateway -->|"Caregiver-Scoped CRUD"| Firestore[("Cloud Firestore<br/><code>/caregivers/{uid}/...</code>")]
    APIGateway -->|"Books & Covers Proxy"| OpenLibrary["Open Library REST API<br/>(Picture Books Catalog)"]
    APIGateway -->|"AI Suggestion & Cascade"| AIEngine["<b>3-Tier AI Fallback Engine</b><br/>1. Cloud Gemini (8s timeout)<br/>2. Local Edge Ollama (qwen2.5-coder:7b)<br/>3. Deterministic ECCD Catalog Matcher"]
```

### Why This Architecture Enhances Efficiency & Security (CIT 210 Presentation Focus)
1. **Unified Dual-Client Backend:** A single, client-neutral REST API powers both the **CIT 210 React web client** and the **CC 207B Flutter mobile client**, eliminating duplicate database logic.
2. **Strict Credential & Key Isolation:** Third-party credentials (Google Gemini API keys) and service account privileges remain strictly on the server. Client applications never possess external API keys.
3. **Defense Against Broken Object Level Authorization (BOLA):** The API derives user identity directly from the verified cryptographic payload of the Firebase ID token (`req.user.uid`). It rejects requests that attempt to modify someone else's child records by manipulating URL parameters.
4. **Resilient Data Augmentation Pipeline:** Combines real-world structured data from an external REST API (**Open Library**) with generative intelligence (**Google Gemini API**) through a multi-tier fallback that operates smoothly even offline.

---

## 2. Request & Response Lifecycle (Sequence Diagram)

```mermaid
sequenceDiagram
  autonumber
  actor Parent as Caregiver (Web/Mobile)
  participant Client as React / Flutter Client
  participant API as Express API Gateway
  participant DB as Cloud Firestore
  participant ExtData as Open Library API
  participant AI as 3-Tier AI Engine (Gemini/Ollama)

  Parent->>Client: Open "Stories & Rhymes" tab
  Client->>API: GET /api/v1/catalog/books?subject=picture_books
  alt In-Memory Cache Hit
    API-->>Client: 200 OK (Cached Book JSON List)
  else Cache Miss
    API->>ExtData: GET /subjects/picture_books.json?limit=12
    ExtData-->>API: 200 OK (Raw Open Library JSON)
    API->>API: Normalize Schema & Cache
    API-->>Client: 200 OK (Normalized Book Cards)
  end

  Parent->>Client: Tap "Suggest Play Idea for This Story"
  Client->>API: POST /api/v1/ai/story-activity { bookTitle: "..." }
  critical 3-Tier AI Fallback Pipeline
    API->>AI: Tier 1: Query Gemini (8s timeout)
    AI-->>API: Success / Fail (timeout, error, invalid output)
  option Tier 1 Fails
    API->>AI: Tier 2: Query Local Ollama (localhost:11434)
    AI-->>API: Success / Fail
  option Tier 2 Fails or Disabled
    API->>DB: Tier 3: Fetch Deterministic Verified Catalog Match
    DB-->>API: Verified Curriculum Activity
  end
  API-->>Client: 200 OK { activity, provenance: { source, badge } }
  Client-->>Parent: Display Play Suggestion with Provenance Badge
```

---

## 3. Authentication, Authorization & Security Rules

### 3.1 Bearer Token Protocol (NFR-SEC-01)
All endpoints except `/health` and `/api/v1/catalog/*` (public reads) require an HTTP `Authorization` header containing a valid Firebase ID Token:
```http
Authorization: Bearer <Firebase_ID_Token>
```
* The API middleware validates the token signature using the Firebase Admin SDK.
* If missing or invalid, the API returns `401 Unauthorized` with error code `UNAUTHENTICATED`.

### 3.2 BOLA Authorization Defense (NFR-SEC-02)
* When a client queries `/api/v1/children/:childId/...`, the server inspects Firestore at `/caregivers/{uid}/children/{childId}` using the token's authenticated `uid`.
* **Zero-Leakage Policy:** If the child does not exist, or belongs to a different caregiver, the server returns **`404 Not Found`** with error code `RESOURCE_NOT_FOUND`. It deliberately does not return `403 Forbidden`, so callers cannot tell a missing ID from another caregiver's ID. Returning 404 is a project design choice; per-object authorization itself follows [OWASP API1:2023](https://api-security.owasp.org/editions/2023/en/0xa1-broken-object-level-authorization).

---

## 4. Canonical Endpoint Catalog

Base URL (Local Emulator): `http://127.0.0.1:5001/{projectId}/asia-southeast1/api`

### 4.1 System & Identity Endpoints

| Method | Path | Auth | Purpose | Success (Status / Body) | Error Codes |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `GET` | `/health` | None | Public liveness probe | `200 OK`<br/>`{ "status": "ok" }` | `500` |
| `GET` | `/api/v1/me` | Bearer | Return the authenticated Firebase UID (email and `createdAt` are planned, not implemented) | `200 OK`<br/>`{ "uid": "abc" }` (planned additions: `email`, `createdAt`) | `401 UNAUTHENTICATED` |

### 4.2 Child Profile Management (FR-01)

> **Contract merged in littlesteps-api PRs #21, #22 and #24. The four `GET`/`POST`/`GET`/`PATCH` routes are implemented and merged in littlesteps-api PRs #26 and #29.** The routes are defined in `openapi/openapi.yaml` and `docs/child-profile-contract.md`; the implementation tracks [API #8](https://github.com/Thesis-Titans/littlesteps-api/issues/8). `DELETE` is not covered by that contract and stays at its earlier planned shape. Decisions D1 (API-to-storage mapping; `caregiverId` never returned) and D4 (nickname normalization and HTTP details) were recorded on 30 October 2026. D5 (deletion execution) and D6 (production retention) are open.

| Method | Path | Auth | Purpose | Success (Status / Body) | Error Codes |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `GET` | `/api/v1/children` | Bearer | List children owned by the verified caregiver (bare array, ordered by `createdAt` then `id`; read with a safety bound of 50, though a caregiver can have at most 20) | `200 OK`<br/>`[ { "id": "...", "nickname": "Sample Child", "birthMonthYear": "2025-08", "ageBand": "12-23m", "createdAt": "...", "updatedAt": "..." } ]`, or `[]` | `401 UNAUTHENTICATED` |
| `POST` | `/api/v1/children` | Bearer | Create a child profile: `nickname` plus exactly one of `birthMonthYear` (`YYYY-MM`) or `ageBand` | `201 Created`<br/>profile object (as above; no `birthMonthYear` when `ageBand` was sent) | `400 INVALID_INPUT` (shape, extra fields, both or neither age source)<br/>`401 UNAUTHENTICATED`<br/>`422 UNPROCESSABLE_ENTITY` (birth month in the future or over 71 months ago; or the caregiver already has 20 children)<br/>`503 SERVICE_UNAVAILABLE` (transaction aborted by contention after the server's retries; see below) |
| `GET` | `/api/v1/children/:childId` | Bearer | Retrieve a child profile | `200 OK`<br/>profile object | `401 UNAUTHENTICATED`<br/>`404 RESOURCE_NOT_FOUND` (missing, another caregiver's, or malformed id) |
| `PATCH` | `/api/v1/children/:childId` | Bearer | Update `nickname` and/or exactly one of `birthMonthYear` or `ageBand` | `200 OK`<br/>updated profile object | `400 INVALID_INPUT` / `INVALID_JSON` (empty update, nulls, both age sources)<br/>`401 UNAUTHENTICATED`<br/>`404 RESOURCE_NOT_FOUND` (missing, another caregiver's, or malformed id)<br/>`422 UNPROCESSABLE_ENTITY`<br/>`503 SERVICE_UNAVAILABLE` (contention) |
| `DELETE`| `/api/v1/children/:childId` | Bearer | Cascading deletion of child and observations (planned; not part of the child profile contract) | `204 No Content` | `401`<br/>`404` |

Rules from the contract (implemented, api PRs #26 and #29):
* **Age bands:** `0-5m`, `6-11m`, `12-23m`, `24-35m`, `36-47m`, `48-59m`, `60-71m`. They are educational navigation categories, not clinical classifications.
* **Age clock:** age is computed from the server's UTC calendar month (`12 * (currentYear - birthYear) + currentMonth - birthMonth`). A shape error such as `2025-13` is `400`; a future month or one more than 71 months ago is `422` on create and edit.
* **Band derived on read:** when a birth month is stored, `ageBand` is computed on every read and never trusted from storage, so it does not go stale. A child past 71 months stays at `60-71m` on read (never an error). A caregiver-selected band (no birth month) is returned as stored.
* **PATCH age source:** sending `birthMonthYear` stores the month; sending `ageBand` replaces the age source and removes any stored birth month; sending both is `400`.
* **Nickname:** leading and trailing whitespace is trimmed and internal whitespace is collapsed to one space. The result must be 1 to 50 characters, counted as Unicode code points, and must contain no Unicode control or format characters (for example a zero-width space). Otherwise the API returns `400 INVALID_INPUT` with `details` `[{ "field": "nickname", "issue": "Nickname must not contain control or invisible characters" }]` for that case.
* **Strict bodies:** extra fields (`uid`, `caregiverId`, timestamps, surnames, photos, exact birth dates) are rejected with `400`; no field accepts `null`.
* **Ownership:** a missing child, a child owned by another caregiver and a substituted ID all return the same `404 RESOURCE_NOT_FOUND`. A malformed id in the path is also that `404`, not a `400`.
* **Validation before lookup:** body validation errors (`400`, `422`) are returned before the child is looked up and do not depend on the id, so they reveal nothing about whether an id exists.
* **Storage and limits:** records are read and written only under the caller's own path (`/caregivers/{uid}/children/{childId}`). `POST` returns `201`. Each caregiver may have at most 20 children (decision of 30 October 2026, ADR-012). When 20 already exist, `POST` returns `422 UNPROCESSABLE_ENTITY` with the message `You can add up to 20 children.` and `details: [{ "field": "children", "issue": "Limit of 20 children reached" }]`. The count and the create are atomic (one Firestore transaction), so concurrent requests cannot exceed the cap. The list is ordered by `createdAt` then `id` and is still read with a safety bound of 50, which the API never reaches.
* **Contention:** if the transaction that counts and creates the child, or updates it, is aborted by contention after the server's retries, `POST` and `PATCH` return `503 SERVICE_UNAVAILABLE` with the message `Please try again in a moment.`, `Retry-After: 1` and `Cache-Control: no-store`. Nothing is created or changed. The client should retry after a moment.
* **Caching:** child responses send `Cache-Control: no-store`, including error responses such as this `503`.

### 4.3 Milestone Observations (FR-01)

> **Planned, not built.** These routes are not in `openapi.yaml` yet (api #16).

| Method | Path | Auth | Purpose | Success (Status / Body) | Error Codes |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `GET` | `/api/v1/children/:childId/milestones` | Bearer | List caregiver observations for child | `200 OK`<br/>`{ "observations": [ { "milestoneId": "m1", "status": "observed" } ] }` | `401`<br/>`404` |
| `POST` | `/api/v1/children/:childId/milestones` | Bearer | Record milestone observation (`observed` or `not_yet_observed`) | `201 Created`<br/>`{ "observationId": "o1", ... }` | `400 INVALID_INPUT`<br/>`401`<br/>`404` |

### 4.4 Activity Planning & Scheduling (FR-02)

> **Planned, not built.** These routes are not in `openapi.yaml` yet (api #10).

| Method | Path | Auth | Purpose | Success (Status / Body) | Error Codes |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `GET` | `/api/v1/children/:childId/activities` | Bearer | List planned/completed activities | `200 OK`<br/>`{ "activities": [ { "activityId": "a1", "completed": true } ] }` | `401`<br/>`404` |
| `POST` | `/api/v1/children/:childId/activities` | Bearer | Schedule an activity for today | `201 Created`<br/>`{ "scheduledId": "s1", "completed": false }` | `400`<br/>`401`<br/>`404` |
| `PATCH`| `/api/v1/children/:childId/activities/:id` | Bearer | Toggle completion status | `200 OK`<br/>`{ "scheduledId": "s1", "completed": true }` | `400`<br/>`401`<br/>`404` |

### 4.5 Private Observation Journal (FR-03)

> **Planned, not built.** These routes are not in `openapi.yaml` yet (api #11).

| Method | Path | Auth | Purpose | Success (Status / Body) | Error Codes |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `GET` | `/api/v1/children/:childId/journal` | Bearer | List private observation journal entries | `200 OK`<br/>`{ "entries": [ { "id": "j1", "title": "First steps", ... } ] }` | `401`<br/>`404` |
| `POST` | `/api/v1/children/:childId/journal` | Bearer | Create a private journal note | `201 Created`<br/>`{ "id": "j1", ... }` | `400 INVALID_INPUT`<br/>`401`<br/>`404` |
| `DELETE`| `/api/v1/children/:childId/journal/:id`| Bearer | Permanently delete journal note | `204 No Content` | `401`<br/>`404` |

### 4.6 Weekly Summary (FR-05)

> **Planned, not built.** These routes are not in `openapi.yaml` yet (api #12).

| Method | Path | Auth | Purpose | Success (Status / Body) | Error Codes |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `GET` | `/api/v1/children/:childId/summary/weekly` | Bearer | Deterministic factual aggregation of completed activities | `200 OK`<br/>`{ "weekStarting": "2026-10-26", "totalActivities": 4, "domains": {...} }` | `401`<br/>`404` |

---

## 5. External Data API Integration: Open Library (FR-04)

To satisfy the CIT 210 requirement for a live external REST Data API, `littlesteps-api` integrates with the **Internet Archive's Open Library REST API**.

### 5.1 Endpoint Specification: `GET /api/v1/catalog/books`
* **Access:** Public read-only (unauthenticated).
* **Query Parameters:**
  - `subject` (string, optional, default: `"picture_books"`, max 64 characters): allowlist of `picture_books`, `bedtime`, `colors`, `animals`. Any other value returns `400 INVALID_INPUT`. *(Allowlist implemented in littlesteps-api PR #20.)*
  - `limit` (integer, optional, default: `12`, max: `30`): Page size.
* **Upstream Service:** `https://openlibrary.org/subjects/{subject}.json?limit={limit}`
* **Server-Side In-Memory Cache:** Responses are cached in memory for **60 minutes** (`Cache-Control: public, max-age=3600`). The `X-Cache` response header (`HIT` or `MISS`) is a non-standard debug header; [RFC 6648](https://www.rfc-editor.org/rfc/rfc6648) discourages `X-` prefixes for new headers. The CORS middleware may add `Vary: Origin` to catalog responses, which can fragment CDN caches (to be confirmed). Fallback responses use the shorter `Cache-Control: public, max-age=60` so clients retry the upstream soon. *(Implemented in littlesteps-api PR #20; fallback fixes in PR #25.)*
* **Client Response Format:**
  ```json
  {
    "subject": "picture_books",
    "totalCount": 16840,
    "books": [
      {
        "id": "OL7835968W",
        "title": "The Very Hungry Caterpillar",
        "authors": ["Eric Carle"],
        "coverUrl": "https://covers.openlibrary.org/b/id/7835968-M.jpg",
        "subjects": ["Caterpillars", "Metamorphosis", "Picture books"]
      }
    ],
    "provenance": {
      "source": "Open Library (Internet Archive)",
      "license": "Open Library data; no new rights asserted by the Internet Archive; some contributions may carry existing rights"
    }
  }
  ```
* **Licence note:** Open Library data is published with no new rights asserted by the Internet Archive; the licensing page notes that existing rights issues may apply to some contributions ([Open Library licensing](https://openlibrary.org/developers/licensing)).
* **Offline Resilience:** If Open Library times out or returns an error, the API returns a curated local backup JSON list with HTTP status 200 and `"provenance": { "source": "local-fallback" }` and `Cache-Control: public, max-age=60`.

### 5.2 Learning Catalog: `GET /api/v1/catalog/activities` and `/api/v1/catalog/activities/:id`

> **Implemented in littlesteps-api PR #20** (OpenAPI version 0.2.0, review fixes in PR #23), using synthetic fixtures until the source review in Docs #3 is complete.

* **Access:** Public read-only (unauthenticated).
* **List query parameters (all optional):** `ageBand` (the seven bands in §4.2), `type` (`activity`, `story`, `rhyme`, `game`), `domain` (`cognitive`, `motor`, `language`, `socioEmotional`), `language` (`en`, `fil`, `hil`), `setting` (`indoor`, `outdoor`, `either`), `limit` (integer 1-50, default 20). Invalid values return `400 INVALID_INPUT`.
* **List response:** `200 OK` with `{ "total": n, "items": [CatalogActivity] }` and `Cache-Control: public, max-age=3600`.
* **By ID:** the `id` path parameter must match `^[a-z0-9-]+$` and be at most 64 characters, otherwise `400 INVALID_INPUT`. An unknown id returns `404 RESOURCE_NOT_FOUND`. Success is `200 OK` with one `CatalogActivity` and `Cache-Control: public, max-age=3600`.
* **`CatalogActivity` fields:** `id`, `title`, `type`, `language`, `setting`, `ageBand`, `domain`, `durationMinutes` (1-180), `durationEstimate`, `materials`, `instructions` (array of steps), `provenanceSource`, `status` (`reviewed_approved`, `synthetic_fixture`; the OpenAPI draft also lists `draft`, which `data-model.md` does not) and `limitations`.
* **Empty until reviewed:** production serves an empty catalog (`total: 0`, `items: []`, and `404` by id) until reviewed content is loaded. Synthetic engineering fixtures are never served as approved content.

---

## 6. External AI Augmentation & 3-Tier Fallback Engine (FR-06)

LittleSteps integrates generative intelligence to enhance learning without relying on unsupported black-box models.

### 6.1 Endpoints Specification

#### `POST /api/v1/ai/recommendations`
Suggests up to three reviewed catalog activities for an age band, using only non-identifying parameters. Requires a Bearer token.

> **Status:** implemented and merged in littlesteps-api PR #28 (30 October 2026). The Gemini provider was added in api PR #34 and is off by default: it is used only when `GEMINI_API_KEY` and `GEMINI_MODEL` are both set, otherwise, and on any provider failure, the response is the Tier 3 catalog fallback. A live smoke test is still pending before it is enabled.

* **Request body (strict):** unknown fields are rejected with `400`, never ignored, so `childId`, nicknames, notes and similar fields cannot be sent.

  | Field | Type | Rules |
  | :--- | :--- | :--- |
  | `ageBand` | string, required | One of `0-5m`, `6-11m`, `12-23m`, `24-35m`, `36-47m`, `48-59m`, `60-71m` |
  | `domain` | string, optional | One of `cognitive`, `motor`, `language`, `socioEmotional` |
  | `setting` | string, optional | `indoor`, `outdoor` or `either` (default `either`) |
  | `timeMinutes` | integer, required | 5 to 120 |
  | `materials` | string array, optional | Up to 10 items, each at most 40 characters, counted as Unicode code points (default `[]`) |
  | `language` | string, required | `en`, `fil` or `hil` |
  | `count` | integer, optional | 1 to 3 (default 3) |

  ```json
  { "ageBand": "12-23m", "domain": "motor", "setting": "indoor", "timeMinutes": 15, "materials": ["cups", "spoon"], "language": "en", "count": 3 }
  ```
* **Response `200 OK`** (with `Cache-Control: no-store`):

  | Field | Meaning |
  | :--- | :--- |
  | `suggestions[]` | Each item has `activityId`, `title`, `whyPicked` (short plain reason) and `activity` (the full `CatalogActivity`). Only `reviewed_approved` catalog items are returned, and titles and instructions always come from the catalog, never from the provider. |
  | `source` | `"ai"` when the provider's picks passed validation, otherwise `"catalog_fallback"`. (This endpoint no longer uses the value `"catalog"`; that value remains for `/ai/story-activity`.) |
  | `tier` | `1` (provider) or `3` (deterministic catalog). `2` (local Ollama) is reserved and not produced in this slice. |
  | `provenance` | `badge` (`"Suggested by AI"` for tier 1, otherwise `null`), `label` (`"Our picks"` for fallback, otherwise `null`), `disclaimer` (`"Observational play suggestion only. Not developmental assessment."`), `guidance` (tier 1 only: `"You know your child best. Change it as you like, and stay close while you play."`), `model` (provider model name, or `null` for fallback) and `reviewed` (always `true`). |
  | `reason` | Present only as `"NO_REVIEWED_CONTENT"` when the catalog holds no reviewed items. |

  ```json
  {
    "suggestions": [
      { "activityId": "stack-the-cups", "title": "Stack the Cups", "whyPicked": "Matches the age band and the cups you have.", "activity": { "id": "stack-the-cups" } }
    ],
    "source": "catalog_fallback",
    "tier": 3,
    "provenance": { "badge": null, "label": "Our picks", "disclaimer": "Observational play suggestion only. Not developmental assessment.", "model": null, "reviewed": true }
  }
  ```
  The `activity` object is abbreviated above; see section 5.2 for its fields.
* **Empty results:** with an empty reviewed catalog the response is `200` with `suggestions: []` and `reason: "NO_REVIEWED_CONTENT"`. When the catalog has content but nothing matches the request, the response is `200` with an empty `suggestions` list and no `reason`. Clients should show an empty state, not an error.
* **Errors:** `400 INVALID_INPUT` with `details` (`{ "field", "issue" }`; an unknown field is reported as `"Unknown field"`), `401 UNAUTHENTICATED`, `500 INTERNAL_ERROR`. `429 RATE_LIMITED` with `Retry-After` (see section 6.2). Every authenticated request counts toward the limit, including one that later fails validation. A provider failure is never an error response.
* **Privacy boundary:** the request carries no child or caregiver identifiers. The provider prompt contains only age band, time, setting, cleaned materials (lowercased, control characters removed, truncated, de-duplicated), language, the pick count, and the id, title, domain and materials of candidate catalog items. It never contains user ID, token, email, child data, observations or journal text. Logs record only the event name, tier, latency and error class, never prompts, replies, materials or user identifiers.
* **Fallback behaviour:** the provider call is bounded at 8 seconds and its reply must pick only candidate ids and pass output validation. On timeout, error, invalid output, no provider configured, or no eligible candidates, the endpoint returns `200` with the deterministic Tier 3 ranking (`source: "catalog_fallback"`, `tier: 3`, no AI badge). Tier 2 (Ollama) is planned and not part of this slice.

#### `POST /api/v1/ai/story-activity` (planned, not in OpenAPI)
Generates companion play and discussion activities based on a real book selected from the Open Library catalog.
* **Request Payload:**
  ```json
  {
    "bookTitle": "The Very Hungry Caterpillar",
    "subjects": ["Animals", "Counting"],
    "ageBand": "12-23m"
  }
  ```
* **Response Payload (Standard Enriched Format):**
  ```json
  {
    "bookTitle": "The Very Hungry Caterpillar",
    "suggestion": {
      "title": "Fruit Texture & Counting Game",
      "domain": "cognitive",
      "instructions": "Gather fruit from the kitchen (or toy fruit). Count along with the story as the caterpillar eats through each item.",
      "safetyNotice": "Ensure adult supervision with real fruit."
    },
    "provenance": {
      "tier": 1,
      "source": "gemini-1.5-flash",
      "badge": "Suggested by AI",
      "disclaimer": "Observational play suggestion only. Not developmental assessment."
    }
  }
  ```

### 6.2 The 3-Tier Fallback Hierarchy

```
/ai/story-activity (planned):
[Tier 1: Cloud LLM]  ──(Fails: Timeout > 8s, error)──>  [Tier 2: Local AI]  ──(Fails: Offline)──>  [Tier 3: Catalog Rule]

/ai/recommendations (implemented, api PR #28):
[Tier 1: Cloud LLM]  ──(Any provider failure: timeout > 8s, error, invalid output, none configured)──>  [Tier 3: Catalog Rule]
```

The Tier 1 to Tier 2 step applies to `/api/v1/ai/story-activity` only, and that route is planned. `/api/v1/ai/recommendations` has no Tier 2: any provider failure goes straight to Tier 3 (`src/ai/ai-service.ts`).

1. **Tier 1 (Google Gemini - Cloud Primary):**
   - Called using server-side `@google/genai` or REST endpoint.
   - Timeout bounded at **8 seconds** via `AbortSignal.timeout(8000)`.
   - Rate limit (implemented on `POST /api/v1/ai/recommendations`, api PR #33): 10 requests per signed-in user per UTC clock hour, counted in Firestore (`rate_limits`). If the store is unavailable the check fails open and the request proceeds. A per-address cap also applies (default 30 per hour, set with `AI_IP_LIMIT_PER_HOUR`, `0` disables it; the count is in memory per instance; `TRUST_PROXY_HOPS`, default 1, sets how many proxy hops are trusted when reading the address, to be verified on a deployed function before relying on it). Over either limit the API returns `429 RATE_LIMITED` with `Retry-After` set to the real number of seconds until the window resets (1 to 3600), not a fixed value. The window is a fixed clock hour, so a burst across an hour boundary can use up to twice the limit.
2. **Tier 2 (Ollama - Local Offline AI Fallback):**
   - Active when `LOCAL_AI_ENABLED=true` in development/demo environments.
   - Pings `http://localhost:11434/api/generate` with model `qwen2.5-coder:7b`.
   - Enables complete, offline AI demonstration during in-person academic evaluations if campus WiFi is degraded.
3. **Tier 3 (Deterministic Rule-Based Catalog - Guaranteed Safety Net):**
   - If Tier 1 and Tier 2 fail, the backend matches the domain and age group to pre-reviewed activities in [`docs/philippine-content-provenance.md`](philippine-content-provenance.md).
   - Zero latency, 100% deterministic, never crashes.
   - For `/ai/story-activity`, Tier 3 returns a reviewed catalog activity matched on age band and the book's subjects, with `"tier": 3`, `"source": "catalog"` and no AI badge. A Tier 1 or 2 response that fails schema or non-diagnostic validation is also replaced this way.

---

## 7. Standardized Error Handling & HTTP Status Matrix

All error responses strictly follow the standardized JSON error envelope:
```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Request fields are invalid",
    "details": [
      {
        "field": "birthMonthYear",
        "issue": "Expected format YYYY-MM"
      }
    ]
  }
}
```
`details` is an optional array of `{ "field", "issue" }` objects (the `ErrorEnvelope` schema, defined in OpenAPI version 0.2.0 on `main`). `code` and `message` are always present.

### Caching rules
| Route group | `Cache-Control` |
| :--- | :--- |
| Public catalog (`/api/v1/catalog/*`) | `public, max-age=3600` |
| Catalog books fallback response | `public, max-age=60` |
| AI routes (`/api/v1/ai/*`; `/ai/recommendations` is implemented, api PR #28), including its `429` response | `no-store` |
| Authenticated routes: `/health` and `/api/v1/me` (implemented); `/api/v1/children` and `/api/v1/children/{childId}` (implemented, api PRs #26 and #29); `DELETE` (planned) | `no-store` |

### Complete HTTP Status to Error Code Mapping Table

| HTTP Status | Error Code | Trigger Scenario | Handling Strategy |
| :---: | :--- | :--- | :--- |
| **`400`** | `INVALID_INPUT` (a body that is not valid JSON returns `INVALID_JSON`) | Zod validation failure, missing required fields, invalid catalog query or id format; the envelope includes `details` | Client highlights field errors |
| **`401`** | `UNAUTHENTICATED` | Missing or invalid Bearer token | Client redirects to sign-in |
| **`403`** | `ORIGIN_NOT_ALLOWED` | Request from an origin not in the CORS allowlist (implemented) | Client shows access denied alert |
| **`404`** | `RESOURCE_NOT_FOUND` | Child ID, activity, or journal note does not exist OR belongs to another caregiver (BOLA) | Client shows item not found; prevents resource existence leakage |
| **`422`** (Unprocessable Content, [RFC 9110 §15.5.21](https://www.rfc-editor.org/rfc/rfc9110#section-15.5.21)) | `UNPROCESSABLE_ENTITY` | Business logic violation (e.g. child birth month in the future or more than 71 months ago on create/edit, or creating a 21st child) | Client displays business rule explanation |
| **`429`** | `RATE_LIMITED` | Implemented on `POST /api/v1/ai/recommendations` only (api PR #33): more than 10 requests in the UTC clock hour for the signed-in user, or the per-address cap (default 30 per hour). Planned for other endpoints | Client shows the rate-limited state or uses the Tier 3 catalog; response carries `Retry-After` with the real seconds until the window resets (1 to 3600) |
| **`413`** | `PAYLOAD_TOO_LARGE` | Request body over the 100KB limit. Message: "The request body is too large." Sent with `no-store` (implemented, api PR #32) | Client shortens the request |
| **`500`** | `INTERNAL_ERROR` | Unhandled server exception | Client displays generic error toast; hides internal stack traces |
| **`502`** | `UPSTREAM_SERVICE_ERROR`| Open Library or Gemini API unreachable | Server automatically triggers internal cached or deterministic fallback |
| **`503`** | `SERVICE_UNAVAILABLE` | Transient conflict: the transaction that counts and creates a child, or the one that updates it (`POST /api/v1/children` or `PATCH /api/v1/children/{childId}`) was aborted by contention after the server's retries. This is not an AI provider failure (see `502` and `504`). Sent with `Retry-After: 1` and `no-store` | Client retries the same request after a moment |
| **`504`** | `GATEWAY_TIMEOUT` | Upstream provider exceeds 8-second timeout | Server automatically triggers fallback response |

---

## 8. CIT 210 Presentation Script (10-Point Explanation Guide)

When presenting the API Integration during the **CIT 210 Code Defense / Presentation**, deliver the following narrative:

> 1. **Decomposition & Responsibility:** *"Our backend is an Express Node.js API hosted as a serverless Firebase Cloud Function. It serves as an authoritative gateway between the React frontend and Cloud Firestore. We enforce strict server-side validation using Zod and maintain a clean OpenAPI 3.1 contract."*
> 2. **Authentication & BOLA Defense:** *"Every protected request carries a Firebase ID token. Our auth middleware cryptographically decodes the token on the server and derives the caregiver's UID directly from the verified signature. To prevent Broken Object Level Authorization (OWASP API1:2023), accessing an unowned child record returns HTTP 404 (our design choice, so an ID's existence is not revealed)."*
> 3. **Dual-API Layering:** *"In response to our course requirements, we implemented a dual-API integration pipeline. First, we query the **Open Library REST API** to fetch authentic children's storybooks, managing query parameters, pagination, and server-side response caching. Second, we layer **Google Gemini AI** on top of the fetched book metadata to generate contextual, screen-free toddler play activities."*
> 4. **Resilience & Fallbacks:** *"Our AI architecture implements a 3-tier fallback hierarchy: Cloud Gemini with an 8-second timeout $\to$ Local Ollama for offline demo resilience $\to$ Deterministic Philippine curriculum catalog. If any network or quota failure occurs, the application degrades gracefully without breaking the user experience."*
