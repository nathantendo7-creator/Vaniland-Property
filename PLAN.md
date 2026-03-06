# Vaniland Property Portal - Development Plan

This document outlines the strategic roadmap for building the **Vaniland Property Portal**, a luxury real estate web application designed for high performance, SEO optimization, and a premium "X1" aesthetic.

---

## 1. Project Vision & Mission
**Objective:** Transform Vaniland’s text-based property dataset into a professional, performant, and accessible real estate portal targeting the Ugandan market.

**Key Mandates:**
- **Luxury Aesthetic:** Deep Navy (#0B1222) and Gold (#C1A36F) palette with sophisticated GSAP animations.
- **Data Integrity:** Property codes (e.g., `240181`) are the canonical keys and must be unique and visible.
- **Zero Lending:** Strictly exclude all money-lending or financial services from the application.
- **Performance First:** Targeting Lighthouse scores > 90 for SEO and Accessibility.

---

## 2. Technical Stack
| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js (SSR/SSG/ISR) |
| **Styling** | Tailwind CSS |
| **CMS** | Sanity (Primary) or local JSON fallback |
| **Animations** | GSAP (ScrollTrigger, SplitText) |
| **Search** | Algolia (or local JSON search index fallback) |
| **Maps** | OpenStreetMap (OSM) via Leaflet |
| **Deployment** | Vercel (Staging/Production) |

---

## 3. Phased Execution Roadmap

### Phase 1: Discovery & Data Mapping
*   **Task:** Parse `🏢 Vaniland Property Consultants.txt` to extract and normalize property listings.
*   **Deliverables:** 
    - `dry-run.json`: Statistics on row counts, successes, and malformed data.
    - `field-completeness-report.md`: Audit of missing fields.
    - `seed/preview-20.json`: First 20 normalized listings for human approval.
*   **Constraint Check:** Identify and strip any "money lending" references.

### Phase 2: CMS Schema & Migration
*   **Task:** Define Sanity schemas and create a robust migration script.
*   **Deliverables:**
    - `/cms/schema/property.js`: Schema for listings (code, title, price, etc.).
    - `/cms/schema/lead.js`: Schema for contact form submissions.
    - `migrate-vaniland.js`: Migration script with `--dry-run` and `--commit` flags.

### Phase 3: Frontend Architecture & UI
*   **Task:** Scaffold the Next.js application and build core components.
*   **Key Pages:** `/` (Home), `/listings` (Search/Grid), `/listing/[code]` (Details), `/contact`, `/admin`.
*   **Components:**
    - **Hero:** Impactful H1 with GSAP entrance.
    - **ListingGrid:** Responsive cards with scroll-reveal animations.
    - **ListingDetail:** High-res carousel, sticky price panel, and OSM map integration.
    - **ContactForm:** Lead capture with validation against property codes.

### Phase 4: Search & Indexing
*   **Task:** Implement instant search with debouncing and URL sync.
*   **Filters:** Status (Rent/Sale), Type, District, Price Range, Bedrooms.
*   **Fallback:** If Algolia keys are missing, implement `/api/search` with a local `search-index.json`.

### Phase 5: QA, Performance & Deployment
*   **Task:** Execute automated tests and performance audits.
*   **Metrics:** 
    - Lighthouse Performance > 50 (with auto-optimization for images/animations).
    - Lighthouse Accessibility > 85.
*   **CI/CD:** GitHub Actions/Vercel pipeline for automated staging deployments.

### Phase 6: Final Review & Handoff
*   **Task:** Final smoke tests and human sign-off.
*   **Deliverables:** Staging URL, Final `seed-properties.json`, and `human-review-checklist.md`.

---

## 4. Design System (Tailwind Tokens)
- **Primary:** `--color-deep-navy: #0B1222`
- **Accent:** `--color-gold: #C1A36F`
- **Typography:** 
    - Headings: Wide-tracking (e.g., Montserrat or Jost).
    - Body: Clean and readable (e.g., Inter or Roboto).

---

## 5. Security & Privacy
- **Environment Variables:** All API keys (Sanity, Algolia) stored in `.env`.
- **Form Protection:** Honeypot and rate-limiting on contact forms.
- **Admin Access:** Enforce MFA for the CMS/Admin interface.

---

## 6. Immediate Next Steps
1.  [ ] **Phase 1 Start:** Parse the raw property data and generate the `dry-run.json`.
2.  [ ] **Human Approval:** Review the data mapping before proceeding to CMS schema design.
