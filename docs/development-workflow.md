# Development Workflow

## Branch and pull-request policy

### Initial setup/foundation stage
- Do not work directly on `main`; use focused branches and draft pull requests.
- Mark is the reviewer and approval boundary for foundation/setup work. A separate teammate review is not a blocker during this stage.
- Keep changes narrow, describe limitations, and verify technical claims with actual local or GitHub Actions checks.
- Do not merge a draft PR or claim a check passed unless the relevant result is available. Mark reviews and approves the foundation PRs before merging.

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
   - Repositories (`littlesteps-docs`, `littlesteps-api`, and `littlesteps-web`) are set to public to enable GitHub's native branch protection and ruleset enforcement.
   - The `main` branch across all three repositories is protected:
     - Direct pushes to `main` are blocked.
     - Force pushes (`allow_force_pushes: false`) and branch deletions (`allow_deletions: false`) are strictly prohibited.
     - Pull requests are required before merging into `main`.
2. **Review & Approval Policy:**
   - During the foundation/setup stage, Mark serves as the reviewer and approval boundary. Setting `required_approving_review_count: 0` ensures PRs are mandatory while avoiding owner self-review deadlocks.
   - For feature execution, stricter review requirements (formal peer review where feasible) will be adopted by team agreement.
3. **Required Status Checks:**
   - **`littlesteps-api`:** Strictly requires the `API CI/verify` GitHub Actions status check to pass before merging.
   - **`littlesteps-web`:** Strictly requires the `Web CI/verify` GitHub Actions status check to pass before merging.
   - **`littlesteps-docs`:** No automated CI workflow is configured; PR verification relies on manual peer review.
4. **Cross-Repository Work Queue:**
   - [Thesis-Titans LittleSteps Project #2](https://github.com/orgs/Thesis-Titans/projects/2) is the designated organization-level board tracking all active issues and pull requests across `littlesteps-docs`, `littlesteps-api`, and `littlesteps-web`.
5. **Mobile Repository Boundary:**
   - `littlesteps-mobile` remains private and strictly untouched pending the CC 207B external fork requirement.

