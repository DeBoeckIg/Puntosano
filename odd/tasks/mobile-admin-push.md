# Mobile admin push notifications

## Objective
Make the administrator's installed mobile web app receive new-order push notifications reliably after local verification and before deploy.

## Scope
- Add a secure automatic trigger for processing the pediD push outbox.
- Make VAPID configuration explicit and consistent across rociAtz and pediD.
- Add focused tests for enqueue, processing, retry, and delivery contracts.
- Preserve all existing uncommitted work; do not edit secrets, reset, or commit unrelated files.

## Checklist
- [x] PUSH-1: Secure automatic outbox processing trigger via Vercel cron with fail-closed secret validation.
- [x] PUSH-2: Unified VAPID configuration and deployment documentation.
- [x] PUSH-3: End-to-end-oriented local contract tests for authorization, delivery, retries, and stale endpoints.
- [x] PUSH-4: Run local verification and record deploy/mobile test steps.

## Acceptance criteria
- An authenticated or explicitly signed internal trigger can process pending jobs without exposing admin session credentials.
- Duplicate processing is safe and retries remain bounded.
- Frontend and backend use one documented public VAPID key contract.
- Tests cover successful delivery, no subscriptions, invalid subscriptions, retries, and enqueue behavior.
- Existing test suites and builds remain green.

## Verification
- pediD: `npm test -- --run`
- pediD: `npm run build`
- rociAtz: `npm run build`
- Both repositories: `git diff --check`

## Route
Delegated direct implementation: the work spans multiple non-trivial files in two repositories. Existing local changes are outside this feature scope and must remain untouched.

## Progress
- Completed without commits or resets; pre-existing worktree changes were preserved.
- Focused push tests: 13 passed.
- pediD full tests: 117 passed across 14 files.
- pediD build: passed.
- rociAtz build: passed.
- `git diff --check`: passed in both repositories; Git reported only line-ending normalization warnings.

## Next step
Configure deployment secrets and run the HTTPS/mobile verification after deploy. Unit tests do not prove browser push delivery or Vercel scheduling.

## Commit evidence
- rociAtz: `b148630 feat(admin): add mobile push notifications`
- pediD: `0f86733 feat(push): add admin notifications and catalog updates`
