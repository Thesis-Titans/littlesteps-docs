# LittleSteps Data Model Specification

**Status:** Canonical Data Architecture Baseline  
**Governing Standard:** ISO/IEC/IEEE 42010:2022 (Data Viewpoint) & RA 10173 (Data Privacy Act of 2012)  
**Related Documents:** [Architecture Decisions](architecture-decisions.md) (ADR-003, ADR-004), [Security, Privacy, and AI Safeguards](security-privacy-ai.md) (NFR-SEC-02, NFR-PRIV-01..03)

---

## 1. Storage Architecture & Multi-Tenant Isolation

The planned datastore is **Cloud Firestore**. Private records are organized under caregiver-scoped paths to support tenant isolation. Path structure alone does not enforce authorization: every API operation must verify the authenticated caregiver's ownership, and tests must cover cross-caregiver access.

```text
caregivers/{caregiverUid}/                      <-- Caregiver root record
  └── children/{childId}/                       <-- Child profile record
        ├── milestone_observations/{obsId}      <-- Qualitative milestone checks (FR-01)
        ├── scheduled_activities/{schedId}      <-- Routine planning & completion logs (FR-02)
        ├── journal_entries/{entryId}           <-- Private qualitative notes (FR-03)
        └── weekly_summaries/{summaryId}        <-- Calculated reflection recaps (FR-05)

catalog_activities/{activityId}                 <-- Static, reviewed activity catalog (FR-04)
catalog_milestones/{milestoneId}                 <-- Static, reviewed milestone prompts (FR-01)
```

> [!SECURITY]
> **Server-Enforced Isolation:** All API operations must execute server-side authorization checks verifying that `child.caregiverId === req.user.uid`. Admin SDK access bypasses Firestore rules, so this boundary is enforced in application code. Restrictive Firestore Security Rules block client SDK direct writes.

---

## 2. Entity Schemas & Attributes

### 2.1 Caregiver Profile (`caregivers/{caregiverUid}`)
Represents the authenticated parent or guardian account.

| Field | Type | Required | Description & Constraints |
| :--- | :--- | :---: | :--- |
| `uid` | string | Yes | Firebase Authentication UID (Primary Key). |
| `email` | string | Yes | Account contact email from verified Firebase token. |
| `displayName` | string | No | Optional caregiver display name (max 60 chars). |
| `weatherLocation` | map | No | Optional weather-hint place: `{ name, latitude, longitude }`, coordinates rounded to 2 decimal places. Chosen by the caregiver; never from GPS ([ADR-009](architecture-decisions.md)). |
| `createdAt` | timestamp | Yes | UTC creation timestamp. |
| `updatedAt` | timestamp | Yes | UTC last update timestamp. |

---

### 2.2 Child Profile (`caregivers/{caregiverUid}/children/{childId}`)
Represents an individual child under the caregiver's care.

| Field | Type | Required | Description & Constraints |
| :--- | :--- | :---: | :--- |
| `id` | string | Yes | Unique child identifier (UUIDv4). |
| `caregiverId` | string | Yes | Must match parent document UID (`uid`). |
| `name` | string | Yes | Child given name or nickname (max 50 chars). |
| `ageBand` | string (enum) | Yes | One of 7 canonical bands (`0-5m`, `6-11m`, `12-23m`, `24-35m`, `36-47m`, `48-59m`, `60-71m`). |
| `birthMonth` | string | No | Optional `YYYY-MM` string for coarse age tracking (exact birth date is avoided per NFR-PRIV-01). |
| `createdAt` | timestamp | Yes | UTC creation timestamp. |
| `updatedAt` | timestamp | Yes | UTC last update timestamp. |

---

### 2.3 Milestone Observation (`.../children/{childId}/milestone_observations/{obsId}`)
Caregiver observation recorded against a reviewed milestone prompt.

| Field | Type | Required | Description & Constraints |
| :--- | :--- | :---: | :--- |
| `id` | string | Yes | Unique observation identifier. |
| `milestoneId` | string | Yes | References a valid item in `catalog_milestones`. |
| `status` | string (enum) | Yes | `observed` or `not_yet_observed` (strictly non-diagnostic). |
| `observedDate` | string | Yes | ISO 8601 date string (`YYYY-MM-DD`). |
| `notes` | string | No | Caregiver observation note (max 500 chars). |
| `createdAt` | timestamp | Yes | UTC creation timestamp. |

---

### 2.4 Scheduled Activity (`.../children/{childId}/scheduled_activities/{schedId}`)
A learning activity added to the daily routine or completed.

| Field | Type | Required | Description & Constraints |
| :--- | :--- | :---: | :--- |
| `id` | string | Yes | Unique schedule entry identifier. |
| `activityId` | string | Yes | References a valid item in `catalog_activities`. |
| `scheduledDate` | string | Yes | Target date (`YYYY-MM-DD`). |
| `status` | string (enum) | Yes | `planned`, `completed`, `skipped`. |
| `completedAt` | timestamp | No | UTC timestamp when marked complete. |
| `durationMinutes` | number | No | Engagement duration in minutes (integer, 1–180). |
| `feedbackNote` | string | No | Optional caregiver reflection (max 300 chars). |

---

### 2.5 Private Observation Journal (`.../children/{childId}/journal_entries/{entryId}`)
Confidential qualitative reflections by the caregiver.

| Field | Type | Required | Description & Constraints |
| :--- | :--- | :---: | :--- |
| `id` | string | Yes | Unique journal entry identifier. |
| `entryDate` | string | Yes | ISO 8601 date string (`YYYY-MM-DD`). |
| `content` | string | Yes | Narrative text (max 2,000 chars). |
| `linkedMilestoneId` | string | No | Optional reference to a related milestone. |
| `linkedActivityId` | string | No | Optional reference to a related activity. |
| `createdAt` | timestamp | Yes | UTC creation timestamp. |
| `updatedAt` | timestamp | Yes | UTC last update timestamp. |

> [!CAUTION]
> **AI Isolation:** The `content` field is strictly excluded from telemetry, search indexes, and external AI prompts (NFR-PRIV-02).
>
> **Journal search (FR-03):** Search runs only over the signed-in caregiver's own entries, as an ownership-checked filter at request time. No search index or third-party search service stores journal text.

---

### 2.6 Weekly Progress Summary (`.../children/{childId}/weekly_summaries/{summaryId}`)
Deterministic periodic recap of child activities and observations.

| Field | Type | Required | Description & Constraints |
| :--- | :--- | :---: | :--- |
| `id` | string | Yes | Unique summary identifier (`YYYY-Www`, e.g., `2026-W41`). |
| `weekStartDate` | string | Yes | ISO date for Monday of the summary week. |
| `weekEndDate` | string | Yes | ISO date for Sunday of the summary week. |
| `completedActivityCount` | number | Yes | Total activities marked `completed` during the week. |
| `observedMilestoneCount` | number | Yes | Total milestones marked `observed` during the week. |
| `domainDistribution` | map | Yes | Counts per domain: `{ cognitive: N, motor: N, language: N, socioEmotional: N }`. |
| `reflectionPrompt` | string | Yes | Educational caregiver prompt (non-diagnostic). |
| `generatedAt` | timestamp | Yes | UTC generation timestamp. |

---

### 2.7 Reviewed Activity Catalog (`catalog_activities/{activityId}`)
Curated learning activities available to all caregivers.

| Field | Type | Required | Description & Constraints |
| :--- | :--- | :---: | :--- |
| `id` | string | Yes | Canonical slug (e.g., `act-ph-bahay-bahayan-01`). |
| `title` | string | Yes | Title in Filipino/English (max 100 chars). |
| `ageBand` | string (enum) | Yes | Target navigation age band (`0-5m` to `60-71m`). |
| `domain` | string (enum) | Yes | `cognitive`, `motor`, `language`, `socio_emotional`. |
| `durationEstimate` | string | Yes | Human-readable duration (e.g., `10-15 mins`). |
| `materials` | array of str | Yes | Required household items (e.g., `["blanket", "cushions"]`). |
| `instructions` | array of str | Yes | 3–4 step-by-step guidance points. |
| `provenanceSource` | string | Yes | Official curriculum citation locator (Issue #3). |
| `status` | string (enum) | Yes | `reviewed_approved`, `synthetic_fixture`. |

---

## 3. Data Lifecycle Requirements and Privacy Review

The following are proposed data-handling requirements informed by Republic Act No. 10173 (Data Privacy Act of 2012). This specification is not a legal compliance determination; the actual implementation, notices, retention rules, and rights-handling process require review.

1. **Data Minimization:** No biometric data, exact GPS coordinates, or official national IDs are collected. Coarse age bands are preferred over exact birth dates.
2. **Right to Rectification:** Caregivers can edit child details, journal notes, and observation records at any time.
3. **Right to Erasure (Hard Cascade Deletion):**
   - Deleting a child profile must trigger a server-side process that deletes all associated subcollection documents (`milestone_observations`, `scheduled_activities`, `journal_entries`, `weekly_summaries`).
   - Deleting a caregiver account must trigger a server-side process that deletes associated child records and caregiver documents.
4. **Data Export:** The API must support a structured JSON export of all records associated with a caregiver's UID upon verified request.
5. **Proposed Retention Rule:** Synthetic demo records should be reset with the emulator environment. The proposed 12-month inactivity rule for production is not approved policy; confirm lawful purpose, notice, exceptions, and deletion behavior before deployment.
