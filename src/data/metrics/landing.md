---
alwaysApply: false
description: Landing Page Doctrine – IA, copy, components, KPIs, schemas, flows, acceptance (RUO). For building the marketing/product landing with live KPIs and CTAs.
globs: 
---

# Landing Page Doctrine (RUO)

This rule details the information architecture, copy, components, data contracts, KPIs, and acceptance criteria for the public landing page. It is business‑first and implementation‑ready.

## 1) Page goals (what users should get in 10 seconds)
- Understand what we do: in‑silico therapeutics for research oncology (RUO)
- See proof: headline KPIs (AUROC 0.957; Splice ~0.826; VUS → 15% target)
- Know where to click: primary CTA to the Myeloma Digital Twin; secondary CTA to all capabilities

## 2) IA (sections and order)
1. Hero (promise + proof + primary/secondary CTAs)
2. Capability Cards grid (6–8 tiles: WIWFM, VUS, Trials, Pathway, CRISPR Demo, Toxicity, Cohort Lab)
3. Evidence & Trust band (confidence, tier, badges, provenance explainer)
4. How It Works (S/P/E) – 3 short chips with helper copy
5. Live Demo CTAs (Analyze a Variant • Run Therapy Fit • Find Trials)
6. Footer trust (RUO disclaimer, data sources, docs, contact)

## 3) Copy (drop‑in)
- Hero headline: “In‑Silico Therapeutics for Research Oncology (RUO)”
- Hero sub: “From variants to therapies and trials in minutes — with confidence, evidence, and provenance.”
- Proof strip: “AUROC 0.957 (53,210 variants) • Splice ~0.826 (4,950) • VUS → 15% target”
- Primary CTA: “Explore Myeloma Digital Twin”  Secondary CTA: “See all capabilities”

## 4) Capability Cards (spec)
- Each card shows: title, subtitle (benefit), 2–3 KPIs, CTA
- Recommended tiles:
  - Myeloma Digital Twin (WIWFM): “Explainable therapy ranking for MM.” KPIs: AUROC 0.957 • VUS → 15% • Confidence ~0.45–0.51
  - VUS Explorer: “From unknown to four clear signals.” KPIs: AUROC 0.957 • BRCA1 0.94/0.84 • Splice ~0.826
  - Clinical Trials Co‑Pilot: “Shortlist relevant trials with clear eligibility.” KPIs: 50+ → 5–12 • −60% time‑to‑first‑trial
  - Pathway View: “A fast biology story linked to therapy.” KPIs: Minutes to view • +0.05–0.12 with cohort overlay
  - CRISPR Readiness (Demo): “Feasibility, access, risk — fast.” KPIs: 1M context • safer candidates (demo)
  - Toxicity Risk: “Simple, genetics‑aware caution.” KPIs (assumption): missed flags −20–30% • FP −10–15%
  - Cohort Lab: “Extract • label • benchmark — then overlay.” KPIs: AUPRC/AUROC cards • artifacts links

## 5) Evidence & Trust band
- Elements: Confidence (0–1) • Evidence Tier (Supported | Consider | Insufficient) • Badges (Guideline | RCT | ClinVar‑Strong | Pathway‑Aligned) • Provenance (run ID, profile)
- Tooltips: one sentence each; methods live in product pages

## 6) How It Works (S/P/E)
- Sequence (Evo2): “Variant impact signals with long‑context understanding (1M tokens).”
- Pathway: “Gene→pathway mapping to show what’s likely driving biology.”
- Evidence: “ClinVar priors + optional literature; transparent badges and tiers.”

## 7) Component tree (suggested files)
- `pages/Landing.tsx` (composes sections)
- `components/hero/Hero.tsx`, `components/metrics/KpiStrip.tsx`
- `components/cards/CapabilityCard.tsx` (+ grid)
- `components/evidence/EvidenceBand.tsx` (ConfidenceBar + EvidenceBadges + ProvenanceMini)
- `components/sections/SPESection.tsx` (Sequence/Pathway/Evidence chips)
- `components/cta/ActionButtons.tsx`
- `components/footer/RUOBanner.tsx`, `components/footer/FooterLinks.tsx`

## 8) Data contracts (JSON)
```json
{
  "hero": {
    "headline": "In‑Silico Therapeutics for Research Oncology (RUO)",
    "subtitle": "From variants to therapies and trials in minutes — with confidence, evidence, and provenance.",
    "kpis": [
      {"label": "AUROC", "value": 0.957, "unit": null, "tooltip": "Across 53,210 ClinVar variants"},
      {"label": "Splice AUROC", "value": 0.826, "unit": null, "tooltip": "SpliceVarDB (n=4,950)"},
      {"label": "VUS", "value": "→ 15% target", "unit": null, "tooltip": "Research‑mode reduction target"}
    ],
    "primaryCta": {"label": "Explore Myeloma Digital Twin", "href": "/mm"},
    "secondaryCta": {"label": "See all capabilities", "href": "/capabilities"}
  },
  "capabilities": [
    {"title": "Myeloma Digital Twin", "subtitle": "Explainable therapy ranking for MM.", "kpis": [{"label": "AUROC", "value": 0.957}, {"label": "VUS", "value": "→ 15%"}, {"label": "Confidence", "value": "~0.45–0.51"}], "actions": [{"label": "Open Digital Twin", "href": "/mm"}]},
    {"title": "VUS Explorer", "subtitle": "From unknown to four clear signals.", "kpis": [{"label": "AUROC", "value": 0.957}, {"label": "BRCA1", "value": "0.94/0.84"}, {"label": "Splice", "value": "~0.826"}], "actions": [{"label": "Analyze a Variant", "href": "/vus"}]},
    {"title": "Clinical Trials Co‑Pilot", "subtitle": "Shortlist relevant trials with clear eligibility.", "kpis": [{"label": "Shortlist", "value": "50+ → 5–12"}, {"label": "Time", "value": "−60%"}], "actions": [{"label": "Find Trials", "href": "/trials"}]},
    {"title": "Pathway View", "subtitle": "A fast biology story linked to therapy.", "kpis": [{"label": "Time", "value": "minutes"}, {"label": "Confidence lift", "value": "+0.05–0.12"}], "actions": [{"label": "See Pathways", "href": "/pathway"}]},
    {"title": "CRISPR Readiness (Demo)", "subtitle": "Feasibility, access, risk — fast.", "kpis": [{"label": "Context", "value": "1M tokens"}, {"label": "Safety", "value": "guided"}], "actions": [{"label": "Check Readiness", "href": "/crispr"}]},
    {"title": "Toxicity Risk", "subtitle": "Simple, genetics‑aware caution.", "kpis": [{"label": "Missed flags", "value": "−20–30%"}, {"label": "False positives", "value": "−10–15%"}], "actions": [{"label": "See Caution Signals", "href": "/toxicity"}]},
    {"title": "Cohort Lab", "subtitle": "Extract • label • benchmark — then overlay.", "kpis": [{"label": "Metrics", "value": "AUPRC/AUROC"}, {"label": "Artifacts", "value": "links"}], "actions": [{"label": "Run a Cohort", "href": "/cohort"}]}
  ],
  "evidenceBand": {
    "confidence": {"value": 0.5, "tier": "Consider"},
    "badges": ["Pathway‑Aligned", "ClinVar‑Strong"],
    "provenance": {"hasRun": false}
  },
  "spe": [
    {"label": "Sequence", "helper": "Variant impact with long‑context understanding."},
    {"label": "Pathway", "helper": "What’s likely driving the biology."},
    {"label": "Evidence", "helper": "Priors + optional literature with transparent badges."}
  ],
  "actions": [
    {"label": "Analyze a Variant", "href": "/vus"},
    {"label": "Run Therapy Fit", "href": "/mm"},
    {"label": "Find Clinical Trials", "href": "/trials"}
  ]
}
```

## 9) Copy tokens (centralized)
- `copy.hero.headline`, `copy.hero.subtitle`, `copy.hero.kpiLabels.auroc`, `copy.hero.kpiLabels.splice`, `copy.hero.kpiLabels.vus`
- `copy.cards.mm.subtitle`, `copy.cards.vus.subtitle`, `copy.cards.trials.subtitle`, `copy.cards.pathway.subtitle`, `copy.cards.crispr.subtitle`, `copy.cards.toxicity.subtitle`, `copy.cards.cohort.subtitle`
- `copy.evidence.confidence`, `copy.evidence.tier`, `copy.evidence.badges.*`

## 10) Design and UX rules
- Keep cards visually uniform; 2–3 KPIs only; numerals aligned
- Methods in tooltips, not in body copy; RUO badge visible on hero + headers
- Keyboard focus for CTAs; ARIA labels on cards/chips; WCAG AA contrast
- Defer heavy scripts; lazy‑load images; prefetch app routes for CTAs

## 11) Observability and provenance
- Emit minimal analytics on CTA clicks: `{ event, label, href }`
- Record `runId` when user transitions into app pages; show a Provenance mini on product pages

## 12) Feature flags (surface behavior)
- Show banner/tooltips when Fusion or Literature is disabled; keep CTAs active
- Reflect profile labels in downstream pages (Baseline, Richer, Fusion)

## 13) Acceptance criteria (landing)
- Above‑the‑fold: hero headline+sub+proof KPIs+primary CTA visible on first paint
- Capability grid renders 6–8 cards with KPIs and working links
- Evidence band shows explainer with tooltips; RUO visible
- S/P/E section shows 3 chips with helpers
- Action buttons navigate to app routes without blocking
- Page LCP <2.5s (desktop) with optimized assets

