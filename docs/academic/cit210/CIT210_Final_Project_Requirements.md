# CIT 210 Final Project Requirements & Evaluation Rubric

**Course:** CIT 210 — Web Systems and Technologies  
**Institution:** West Visayas State University — College of Information and Communications Technology  
**Authority:** Official CICT Course Brief & Evaluation Rubric  
**Related Documents:** [CIT 210 Deliverables](README.md), [Academic Deliverables Index](../README.md), [Traceability Matrix](../../traceability-matrix.md)

> [!NOTE]
> **Authoritative Source:** The course instructor's brief and evaluation rubric are the authoritative source for course grading. This document transcribes the official 100-point rubric and technical requirements governing the LittleSteps React web client, API, and database deliverables.

---

## Project Overview

For the Final Project in **CIT 210 (Web Systems and Technologies)**, students are required to develop, present, and demonstrate a functioning web application. The application must feature an intuitive, responsive user interface developed using **React**, integrate with a **custom or third-party API**, manage server-side logic and data processing efficiently, and enforce proper input validation and error handling.

The project is evaluated through two major components:
1. **Application Development (65%)**: Code implementation, API integration, client-side React UI/UX, server-side processing, and error handling.
2. **Presentation & Demonstration (35%)**: Structured presentation explaining system architecture and API endpoints, followed by a live, functioning application demo.

---

## Technical & Architectural Requirements

### 1. API Integration
- Seamless integration of a third-party or custom API with fully functional and dynamic data flow between client and server.
- The system must communicate asynchronously with the API using standard HTTP methods and JSON payloads.
- Authentication tokens, API keys, or authorized session headers must be handled securely without exposing credentials in client bundles.

### 2. Client-Side Interface & Usability (React)
- Intuitive, responsive, and user-friendly interface developed in **React**.
- Must adapt across desktop and mobile-sized browser viewports.
- Interactivity requirements:
  - Dynamic rendering of data based on user actions or API responses.
  - Interactive searching, multi-factor filtering, or dynamic data views.
  - Visible UI feedback during asynchronous operations (loading skeletons/spinners, empty states, and error alerts).

### 3. Server-Side Logic & Data Processing
- Efficient handling of API requests with structured routing and controllers.
- Robust state management and optimized data processing with minimal performance latency.
- Secure data persistence via cloud or local database systems (e.g., Firebase Firestore, relational database).

### 4. Error Handling & Data Validation
- Proper validation of user input prior to processing (form constraints, data types, length boundaries).
- Consistent and descriptive error handling for failed API calls, network interruptions, or invalid data inputs without exposing internal server stack traces or crashing the client.

---

## Evaluation Rubric (100 Points Total)

| Category | Criteria | Description | Points |
| :--- | :--- | :--- | :---: |
| **Application Development (65%)** | **API Integration (25%)** | Seamless integration of a third-party or custom API with fully functional and dynamic data flow between client and server. | **25** |
| | **Client-Side Interface & Usability (20%)** | Intuitive, responsive, and user-friendly interface developed in React; includes interactivity such as search, filter, or dynamic rendering of data. | **20** |
| | **Server-Side Logic & Data Processing (15%)** | Efficient handling of API requests, proper state management, and optimized data processing with minimal performance issues. | **15** |
| | **Error Handling & Data Validation (5%)** | Proper validation of user input and consistent error handling for failed API calls or invalid data inputs. | **5** |
| **Presentation (35%)** | **Clarity and Structure (10%)** | Presentation is organized, clear, and demonstrates logical project flow (introduction, system overview, demo, conclusion). | **10** |
| | **Explanation of API Integration (10%)** | Clearly explains API functionality, endpoints used, and how it enhances the system's purpose or efficiency. | **10** |
| | **Demo & Functionality (15%)** | Demonstrates complete and stable application; all main features work as intended during live demo. | **15** |
| **TOTAL** | | | **100** |

---

## Presentation & Demonstration Structure

The presentation accounts for **35 points (35%)** of the total course evaluation and must adhere to a clear, logical project flow:

1. **Introduction & Project Context:**
   - Problem statement, intended user persona/organization, and system purpose.
2. **System Architecture & Overview:**
   - Architectural relationship between the React frontend, API layer, and database.
3. **API Integration Explanation:**
   - Detailed walkthrough of API functionality, endpoints used, request/response formats, and how integration enhances efficiency and user value.
4. **Live Demonstration:**
   - Live walkthrough proving all main features operate stably (creation, retrieval, search/filter, and edge-case handling).
5. **Conclusion & Project Learnings:**
   - Project summary, current limitations, and future architectural enhancements.
