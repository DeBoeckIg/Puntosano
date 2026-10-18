# Safe error contracts

## Objective
Replace raw and English backend exceptions with stable, safe error codes that rociAtz can present through clear Spanish windows, without changing visual styling.

## Scope
- Phase 1: pediD API error contracts, validation translations, and leak prevention.
- Phase 2: rociAtz centralized error-to-user-message mapping and operation-specific windows.
- Preserve authentication, CSRF, checkout, catalog, image, variant, and push behavior.
- Do not expose Supabase details, migration names, IDs, or internal infrastructure in user-facing responses.

## Checklist
- [x] ERR-1: Define stable pediD error envelope and safe status mapping.
- [x] ERR-2: Normalize pediD catalog, admin catalog, media, checkout, auth, and push exceptions.
- [x] ERR-3: Add pediD contract tests and verify the backend.
- [ ] ERR-4: Add rociAtz presentation mapper and operation-specific windows.
- [ ] ERR-5: Verify both projects and record remaining edge cases.

## Acceptance criteria
- Expected failures return `{ code, message, fields? }` with Spanish-safe messages.
- Unexpected failures remain generic and do not expose persistence/provider/migration details.
- rociAtz never renders raw backend `error`/`message` directly.
- Partial multi-step saves are reported explicitly with recovery guidance.
- Existing business behavior, auth, CSRF, checkout, and image constraints remain unchanged.

## Verification
- pediD: `npm test -- --run`
- pediD: `npm run build`
- rociAtz: `npm run build`
- Both repositories: `git diff --check`

## Route
Delegated direct implementation per phase: pediD first, then rociAtz. Keep commits separate and do not mix visual styling changes.

## Progress
- pediD Phase 1 completed in commit `30d8c7d feat(errors): normalize safe api failures`.
- Contract now returns stable `{ code, message, fields? }` responses and suppresses migration/provider/database details.
- pediD verification: focused contract tests 23 passed; worker full suite 118 passed; build passed; diff check passed.

## Next step
Implement the rociAtz presentation mapper and operation-specific Spanish windows against the stable pediD codes.
