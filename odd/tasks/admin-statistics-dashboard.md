# Admin statistics dashboard

## Objective
Add a protected administrator dashboard with trustworthy operational and sales metrics, using the existing Punto Sano data and visual language.

## Scope
- Add an `/admin/statistics` route and navigation entry.
- Support date filters with the existing inclusive date-range semantics.
- Show completed sales separately from confirmed pipeline and pending workload.
- Show KPI cards, a daily completed-sales table, top products, pending orders, and low-stock alerts.
- Keep all statistics server-side and admin-protected.
- Avoid adding a chart dependency in the first slice; use accessible tables and responsive cards.

## Decisions
- Completed orders are the only source for realized sales and ticket average.
- Confirmed orders are shown as sales in progress, not realized revenue.
- Pending orders are operational workload and never count toward sales.
- Cancelled orders are excluded from all sales metrics.
- Daily grouping uses the existing UTC timestamps until a business timezone is explicitly configured.
- Low stock includes variants with stock at or below a documented threshold; the first implementation uses 5 units.

## Checklist
- [x] DASH-1: Add protected statistics data service/API with date filters and tested aggregation.
- [x] DASH-2: Add admin statistics route, navigation, and responsive KPI/operational views.
- [x] DASH-3: Add focused tests and verify existing builds without introducing a chart dependency.

## Acceptance criteria
- Only an authenticated administrator can load statistics.
- Date filters apply consistently to every metric and are visibly represented.
- Realized sales only include completed orders.
- Confirmed pipeline and pending workload remain separate.
- Product and stock values are derived from persisted order/item and variant data.
- Empty and malformed data render safely.
- Existing admin navigation and order/catalog behavior remain intact.

## Verification
- `npm test -- --run` in `pediD`
- `npm run build` in `pediD`
- `npm run build` in `rociAtz`
- `git diff --check` in both repositories

## Route
Delegated direct implementation: the dashboard spans backend aggregation, frontend route/navigation, styling, and tests across two repositories.

## Progress
- Backend aggregation/API, focused tests, frontend view, navigation entry, and responsive styling implemented. App route wiring remains to be completed.

## Next step
Implement DASH-1 with server-side aggregation and focused tests, then build the protected UI slice.
