# Admin order management

## Objective
Improve order status visuals and add safe deletion for test orders.

## Checklist
- [x] Round status controls and color order cards by status.
- [x] Add an admin delete action with confirmation.
- [x] Add and test the backend delete endpoint and transactional database operation.
- [x] Reorder payment, delivery, and date metadata in the order header.
- [x] Align delete and status controls with the web visual language.
- [x] Run frontend and backend verification.

## Authorized scope
- Frontend: `src/App.tsx`, `src/styles.css`, `src/client.ts`
- Backend: `app/api/admin/orders/route.ts`, `src/modules/orders/admin-service.ts`, `supabase/migrations/0024_admin_delete_orders.sql`, `tests/admin-orders.test.ts`

## Evidence
- Frontend tests: 10 passed.
- Frontend build: passed.
- Frontend `git diff --check`: passed; only CRLF normalization warnings.
