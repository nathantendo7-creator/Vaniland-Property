# Human Review Checklist

## Phase A: Discovery & Dry-Run
- [x] Review `reports/dry-run.json` for data completeness.
- [x] Verify no lending features are present in the seed data.
- [x] Approve `seed/seed-properties.json` for migration.

## Phase B: CMS Schema + Migration
- [x] Review `cms/schema/property.js` and `cms/schema/lead.js`.
- [x] Review `reports/migration-dryrun.log`.
- [ ] Run `node migrations/migrate-vaniland.js --commit` to execute the migration.

## Phase C: Frontend Scaffold + Components
- [x] Verify Next.js (Vite + React Router fallback) app structure.
- [x] Verify Tailwind tokens (Deep Navy, Gold, Slate).
- [x] Test Hero, ListingGrid, ListingCard, ListingDetail, ContactForm components.
- [x] Verify GSAP animations respect `prefers-reduced-motion`.
- [x] Verify Algolia fallback search (`/api/search`) works.
- [x] Implement `/admin` pages for listings and leads view.

## Phase D: CI, Lint, Lighthouse, Deploy
- [ ] Review Lighthouse scores (Performance, Accessibility, SEO).
- [ ] Approve staging deployment.

## Phase E: Smoke Tests, Observability
- [x] Implement core unit tests for price parsing, yield calculation, and data integrity.
- [ ] Verify homepage loads.
- [ ] Verify `/listings` loads.
- [ ] Verify `/listing/[code]` loads.
- [ ] Verify contact form submission (`POST /api/leads`).

## Final Signoff
- [ ] Approve PR for production deployment.
