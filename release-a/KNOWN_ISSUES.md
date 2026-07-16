# Release A — Known Issues

## KI-01 · VerticalSurface mobile stacked-layout overlap (pre-existing, tracked)

**Severity:** Low (cosmetic, mobile only) · **Scope:** shared component, not W5-specific

**Symptom:** At narrow viewports (~390px), `VerticalSurface` renders the section
navigation rail and the content pane in a single-column grid inside a fixed
`h-screen … overflow-hidden` shell. Because neither grid row has a defined height
in single-column mode, the content pane can visually overlap the section-nav
cards (observed on the Interception and Tumor Board mobile screenshots).

**Where:** `src/components/audience/VerticalSurface.tsx`
- Outer shell: `<main className="h-screen flex flex-col overflow-hidden …">`
- Body region: `<section className="flex-1 min-h-0 overflow-hidden"> … grid grid-cols-1 md:grid-cols-[240px_1fr] …`

**Blast radius:** Affects EVERY page routed through `VerticalSurface`
(industry / product / partner / patient surfaces), not just the three new
`/products/*` pages shipped in Release A. It predates this work.

**Desktop status:** No defect. All three product pages PASS media-check at
1440×900 — titles fully visible, fixed navbar sits cleanly above the title
strip (navbar-spacer fix confirmed), receipts and section content render.

**Decision (2026-07-16):** Ship desktop-verified pages now; defer the mobile fix
to a dedicated responsive pass on the shared component so it can be validated
across all VerticalSurface pages rather than changed under release pressure.

**Suggested fix (future):** Allow the shell to grow on mobile — e.g. switch
`h-screen overflow-hidden` to `min-h-screen` below the `md` breakpoint and let
the single-column grid flow in normal document height, or give the mobile
nav-rail an explicit auto height with the content pane below it (no shared
fixed-height competition). Re-run `scripts/release-a/shoot_products.mjs` mobile
shots and media-check after any change.
