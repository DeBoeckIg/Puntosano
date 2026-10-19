# Stock reservations and order limits

## Objective
Prevent fake or abandoned orders from consuming all inventory while preserving the manual admin confirmation workflow.

## Scope
- Treat stock deducted at checkout as a temporary reservation.
- Expire pending reservations after 30 minutes using database-backed lazy cleanup.
- Restore stock exactly once when pending or confirmed orders are cancelled or deleted.
- Allow at most 2 active pending orders per normalized phone.
- Allow at most 3 non-cancelled checkout orders per normalized phone in any rolling hour.
- Do not implement IP blocking in this slice.

## Decisions
- Checkout remains the reservation point: stock is decremented transactionally when the order is created.
- `pending` reservations expire after 30 minutes.
- `confirmed` reservations do not expire automatically and remain held until completed or cancelled.
- `completed` orders never restore stock.
- Cancelled orders do not restore stock twice.
- Phone limits are enforced inside the database checkout transaction, not process-local memory.
- Expiry cleanup runs lazily at checkout and admin order reads; no Vercel cron is required.

## Checklist
- [x] STOCK-1: Add idempotent migration for reservation metadata, phone limits, expiry cleanup, and atomic stock restoration.
- [x] STOCK-2: Wire checkout, admin status cancellation, deletion, and admin reads to the database behavior.
- [ ] STOCK-3: Add focused tests for limits, expiry, cancellation, deletion, and concurrent-safe restoration.
- [x] STOCK-4: Allow admins to reopen only orders cancelled by reservation expiry when stock is available.

## Acceptance criteria
- A third active pending order for the same normalized phone is rejected.
- A fourth non-cancelled order in one hour for the same phone is rejected.
- Checkout cannot oversell product or variant stock.
- Expired pending reservations release stock exactly once.
- Cancelling/deleting pending or confirmed orders restores stock exactly once.
- Confirming or completing an order does not restore or double-decrement stock.
- Existing admin and checkout behavior remains protected and compatible.

## Verification
- `npm test -- --run` in `pediD`
- `npm run build` in `pediD`
- `npm run build` in `rociAtz`
- `git diff --check` in both repositories

## Route
Delegated direct implementation: this spans Supabase migration/RPC behavior, checkout and admin routes, tests, and operational documentation.

## Progress
- Migration 0026 corrected to preserve the complete 0023 checkout behavior, including push outbox enqueue and variant validation, and now serializes same-phone limit checks with a transaction-scoped advisory lock; local application tests pass, but remote SQL integration remains pending.
- Migration 0028 adds cancellation reasons and an atomic reopen RPC; the protected admin API and frontend action are implemented. pediD: 125 tests and build passed; rociAtz: 10 tests and build passed.

## Next step
Apply migrations 0026–0028 with `supabase db push`, then run production tests for expiry, stock restoration, and reopening when stock is available or insufficient.
