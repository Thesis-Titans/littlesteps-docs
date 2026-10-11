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

## Repository settings to configure manually
1. Protect main: require pull requests before merging.
2. Configure approval requirements to match the agreed workflow: Mark reviews setup PRs; apply stricter teammate review during feature execution where feasible.
3. Dismiss stale approvals or require approval of the latest push, if feasible.
4. Require status checks only after CI workflows exist and their check names are verified.
5. Block force pushes and branch deletion on main.
6. Consider organization rulesets for consistent settings across the three repositories.
7. Add CODEOWNERS only after actual maintainers and ownership paths are agreed.

The current GitHub integration can create branches, files, commits, and pull requests, but does not expose repository branch-protection/ruleset or organization Project configuration in this workflow. An organization owner/admin must apply those settings in GitHub.
