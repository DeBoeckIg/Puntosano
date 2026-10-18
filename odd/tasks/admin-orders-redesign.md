# Admin orders redesign

## Objective
Improve the readability and responsive behavior of the admin orders page without changing its backend contract.

## Checklist
- [x] Reorganize each order into a readable card layout.
- [x] Translate status, payment, and delivery values for the UI.
- [x] Add responsive mobile stacking and preserve status updates.
- [x] Run tests, build, and diff validation.

## Authorized scope
- `src/App.tsx`
- `src/styles.css`

## Acceptance criteria
- Orders show clear sections for reference/status, customer, products, total, payment, and delivery.
- Technical enum values are not shown directly to administrators.
- The layout remains readable at mobile widths.
- Existing filters, loading states, empty states, and status updates continue to work.

## Verification
- `npm test`
- `npm run build`
- `git diff --check`

## Evidence
- `npm test`: 10 tests passed.
- `npm run build`: TypeScript and Vite production build passed.
- `git diff --check`: Passed; only CRLF normalization warnings.
