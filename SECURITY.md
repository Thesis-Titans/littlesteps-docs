# Security Policy

LittleSteps is an early learning and caregiver support system developed as an academic capstone/thesis project by Thesis-Titans. This policy outlines our vulnerability disclosure process and response expectations.

---

## 1. Supported Versions

LittleSteps is under active academic development. Only the latest commit on the `main` branch of active repositories receives updates and security evaluations:

| Repository | Scope / Branch | Supported |
| :--- | :--- | :---: |
| **`littlesteps-docs`** | `main` | :white_check_mark: |
| **`littlesteps-api`** | `main` | :white_check_mark: |
| **`littlesteps-web`** | `main` | :white_check_mark: |
| All other branches / forks / historical tags | Older revisions | :x: |
| **`littlesteps-mobile`** | Pending external CC 207B course fork | *Isolated / Out of scope* |

---

## 2. Realistic Academic Response Expectations

LittleSteps is maintained by undergraduate students for academic research and capstone evaluation:
- **No Commercial SLA:** We do not operate a commercial 24/7 security operations center (SOC) or guarantee formal turnaround times.
- **Best-Effort Handling:** The project maintainers review incoming vulnerability reports on a best-effort basis during academic terms.
- **Responsible Coordination:** We ask researchers and reviewers to coordinate responsibly with us before publicly discussing any unpatched vulnerabilities.

---

## 3. Reporting a Vulnerability

> [!IMPORTANT]
> **Do NOT report potential security vulnerabilities through public GitHub issues, discussions, or pull requests.** Public disclosure exposes system vulnerabilities before mitigations can be implemented.

### How to Report Privately
Please submit vulnerability details through either of the following private channels:

1. **GitHub Private Vulnerability Reporting (Preferred):**  
   If enabled on the repository, navigate to the **Security** tab of the relevant repository and click **Report a vulnerability** to open a private advisory draft.
2. **Direct Contact:**  
   Email the project lead and thesis maintainer, **Mark Alvin Cadangin**, at [markcadangin@gmail.com](mailto:markcadangin@gmail.com) with the subject prefix `[SECURITY] LittleSteps: <Brief Description>`.

### Information to Include in Your Report
To help us triage and verify the issue efficiently, please provide:
- **Repository & Component:** Affected repository (`littlesteps-api`, `littlesteps-web`, or `littlesteps-docs`) and specific file paths or endpoints.
- **Vulnerability Category:** Description of the weakness (e.g., authorization bypass, broken access control, synthetic credential exposure, injection flaw, or sensitive data leak).
- **Reproduction Steps:** Step-by-step instructions or proof-of-concept (POC) using **strictly synthetic test data**.
- **Impact Assessment:** Potential consequence of the vulnerability if exploited.
- **Suggested Remediation:** Any recommended fixes, mitigations, or relevant security references.

---

## 4. Child Privacy & High-Priority Safeguards

Because LittleSteps is designed around early learning and caregiver support, data privacy and child safety are our highest priorities:
- **Data Privacy Act (RA 10173) Alignment:** Child and caregiver records must remain strictly confidential. Any flaw allowing unauthorized access to child records or cross-tenant visibility (caregiver A accessing caregiver B's data) is treated with immediate urgency.
- **Synthetic Data Baseline:** Testing and reproductions must use synthetic data only (e.g., following the `demo-littlesteps` Firebase Emulator setup in [getting-started.md](docs/getting-started.md)). Never submit real personal data or real child information in reports.
- **Secret & Key Isolation:** Service account keys, cloud credentials, and API tokens must never be committed. Throwaway emulator test values (`fake-api-key`, `LocalTestPassword123!`) are strictly local in-memory inputs for emulator testing and are not real secrets.

---

## 5. Non-Vulnerability Inquiries

For general questions, bug reports not related to security, or feature proposals, please open a standard issue in the respective repository or refer to [CONTRIBUTING.md](CONTRIBUTING.md).
