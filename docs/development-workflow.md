# LittleSteps Development Workflow

**Status:** Canonical Engineering Workflow Baseline  
**Governing Standard:** ISO/IEC/IEEE 12207:2026 (Process Governance) & GitHub Flow  
**Related Documents:** [Documentation Standards](documentation-standards.md), [Execution Plan](execution-plan.md)

---

## Branch and pull-request policy

### Initial setup/foundation stage
- Do not work directly on `main`; use focused branches and draft pull requests.
- The project lead acts as the reviewer and approval boundary during the foundation setup stage. A separate teammate review is not a blocker during this stage.
- Keep changes narrow, describe limitations, and verify technical claims with actual local or GitHub Actions checks.
- Do not merge a draft PR or claim a check passed unless the relevant result is available. The project lead reviews and approves foundation PRs before merging.

### Feature execution stage
- Use focused branches such as `feat/activity-planning`, `fix/child-ownership-check`, or `docs/privacy-notice`.
- Define acceptance criteria and relevant tests before implementing a feature.
- Require relevant automated checks and security/privacy verification before merging.
- Seek teammate review where feasible; do not treat the setup-stage review exception as a general feature-development policy.
- Never force-push or delete protected shared branches without team agreement.
- Do not mark checks as passed unless they ran and the results are recorded.

## Verification expectations

For API changes:
1. Install dependencies using the committed lockfile.
2. Run typecheck, build, and unit tests.
3. Run integration tests against Firebase emulators where applicable.
4. Test auth failures, unauthorized child access, malformed inputs, and provider failure paths.
5. Update OpenAPI and docs with behavior changes.

For web changes:
1. Run typecheck, build, and unit tests.
2. Test loading, empty, error, and unauthorized states.
3. Confirm private data is not exposed in logs or browser storage beyond documented needs.
4. Check keyboard navigation and responsive behavior for touched UI.

## Local-first Firebase workflow
- Follow the verified step-by-step setup in [getting-started.md](getting-started.md) to initialize the local multi-repo environment.
- Start with Firebase Emulator Suite and synthetic data.
- Keep deployment credentials and production data out of local development.
- Before deployment, review billing and cost exposure, set budget alerts, and confirm the target project explicitly.
- Emulator success is not proof of deployed cloud configuration or production readiness.

## Repository settings & governance baseline (Active & Verified)

Following the governance audit ([Docs Issue #2](https://github.com/Thesis-Titans/littlesteps-docs/issues/2)), repository settings are configured and enforced in GitHub across the active repositories:

1. **Visibility & Branch Protection Enforcement:**
   - Repositories (`littlesteps-docs`, `littlesteps-api`, and `littlesteps-react`) are set to public to enable GitHub's native branch protection and ruleset enforcement.
   - The `main` branch across all three repositories is protected:
     - Direct pushes to `main` are blocked for standard contributors.
     - Force pushes (`allow_force_pushes: false`) and branch deletions (`allow_deletions: false`) are strictly prohibited.
     - Pull requests are required before merging into `main`.
   - **Administrator Bypass Retained (`enforce_admins: false`):** Branch protection deliberately retains the administrator bypass. Repository administrators are technically permitted by GitHub to bypass branch rules. The restriction against direct pushes to `main` is therefore enforced on administrators procedurally through team discipline, rather than through server-enforced administrator lockouts.
2. **Review & Approval Policy (Technical Enforcement vs. Procedural Boundary):**
   - **Technical GitHub Configuration:** Pull requests are strictly required before merging to `main`, but GitHub's `required_approving_review_count` is set to `0`. This technically prohibits direct git pushes to `main` while avoiding owner/author self-review deadlocks during solo setup tasks. GitHub's branch rule alone does not enforce an approval before merge under this configuration.
   - **Procedural Team Enforcement:** The team operates under an agreed procedural rule that Mark serves as the reviewer and approval boundary during the setup stage. No pull request may be merged into `main` without Mark's explicit human review and approval, even though GitHub's technical setting permits merges without an approval.
   - **Feature Execution Transition:** For subsequent feature execution, stricter server-side review requirements (e.g., `required_approving_review_count: 1` or CODEOWNERS) will be evaluated and configured by team agreement once multiple collaborators are submitting PRs.
3. **Required Status Checks:**
   - **`littlesteps-api`:** Strictly requires the `API CI/verify` GitHub Actions status check to pass before merging.
   - **`littlesteps-react`:** Strictly requires the `Web CI/verify` GitHub Actions status check to pass before merging.
   - **`littlesteps-docs`:** Strictly requires the `Docs CI/verify` GitHub Actions status check (`.github/workflows/ci.yml`) to pass before merging, running `npm test` (`verify-docs.mjs` and `verify-docs.test.mjs`) to validate relative internal links and issue template frontmatter.
4. **Cross-Repository Work Queue & Coverage:**
   - [Thesis-Titans LittleSteps Project #2](https://github.com/orgs/Thesis-Titans/projects/2) is the organization-level board tracking active issues and pull requests across `littlesteps-docs`, `littlesteps-api`, and `littlesteps-react`.
   - As verified by repository queries, active organization items are populated on the board.
   - Items are maintained manually or via Project workflows as new work is scheduled.
5. **Academic Collaboration & Code Defense Governance (CC 207B):**
   - **Teammate PR Reviews:** During the feature execution phase, every pull request must be reviewed and approved by at least one teammate prior to merging into `main`. Collaboration is a graded criterion assessed directly from Git commit and PR review history.
   - **Continuous Contribution:** All 5 members must contribute commits throughout the project lifecycle, avoiding last-minute commits before the December 2, 2026 deadline.
   - **Individual Code Defense Readiness:** Each member must personally author, understand, and explain their committed code during the mandatory 2–3 minute individual code defense, including the ability to perform small live code edits (e.g., adding form fields, adjusting navigation).
   - **AI Usage Log Compliance:** Any AI-assisted code generation (allowed only for snippets, debugging, or sample fixtures) must be documented in the shared AI Usage Log. Wholesale generation of the app or unexplainable code is strictly prohibited.
6. **Mobile Repository Boundary:**
   - `littlesteps-flutter` remains strictly untouched on `main` pending the CC 207B external fork requirement.
7. **Synthetic Credentials & Exposure Verification:**
   - The test suite in `littlesteps-api/test/auth-emulator.test.ts` uses mock keys (`fake-api-key`) and local test passwords (`LocalTestPassword123!`). These values are strictly synthetic throwaway inputs for the ephemeral in-memory Firebase Auth Emulator and must never be reused in production, deployed environments, or real account credentials.
