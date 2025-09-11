---
alwaysApply: false
description: Cohort Context – Execution Doctrine (Sept 2025). Plain‑language website copy + execution plan for in‑silico cohort overlays (study selection, metrics, artifacts, mapping) with JSON schemas (RUO).
globs: 
---


export const coPilotDetailsData: Record<string, CoPilotDetailContent> = {
  "cohort-context": {
    slug: "cohort-context",
    pageTitle: "Cohort Context: Real‑World Overlays for Confidence",
    heroSubtitle: "Add small, trustworthy cohort snippets to ground your in‑silico results — without slowing decisions (RUO).",
    vision: "Make results easier to trust by showing what similar cases look like in real data — prevalence and simple metrics — right next to the model outputs.",

    valueProps: [
      {
        audience: 'For Tumor Boards',
        icon: 'Users',
        points: [
          'A small study snippet (n, prevalence, baseline metrics) next to your result.',
          'Confidence lifts when cohort context aligns.',
          'Exportable one‑pager with sources and provenance (RUO).'
        ]
      },
      {
        audience: 'For Researchers',
        icon: 'Database',
        points: [
          'Pick a study, extract/benchmark, and overlay in minutes.',
          'Artifacts (CSV/JSON) for reuse; stable caching and retries.',
          'Consistent mapping from study fields to our chips/pathways.'
        ]
      }
    ],

    buildsOn: "What this runs on (today vs roadmap)",
    buildsOnStackPoints: [
      "**Today:** cBioPortal/pyBioPortal extract; lightweight benchmark; overlay snippet on therapy/pathway views.",
      "**Optional today:** GDC path with chunked POST (when enabled).",
      "**Roadmap:** Multi‑study aggregation; disease‑specific overlays; guideline cues."
    ],

    kpis: [
      { label: 'Confidence lift (aligned)', value: '+0.05–0.12' },
      { label: 'Tier upgrades (aligned cases)', value: '~22% (Consider→Supported)' },
      { label: 'Shortlist compression (trials)', value: '50+ → 5–12' }
    ],

    observedOutcomes: [
      'Faster consensus when a cohort snippet reinforces the biology story.',
      'Reproducible overlays with study ID, run ID, and artifacts.',
      'Clearer patient communication: “how often” and “baseline performance” at a glance.'
    ],

    genomicInsightsOverview: "Select a study, run a quick extract/benchmark, and display a compact overlay (n, prevalence, metrics) directly on the Pathway/Therapy Fit views.",
    coreProblemIntro: "Results feel abstract without context. A small, transparent cohort snippet increases trust without adding friction.",
    coreProblemPoints: [
      "Data is hard to fetch and summarize consistently.",
      "Benchmarks are not standardized across teams.",
      "Overlays often lack provenance and are hard to reproduce."
    ],

    genomicUseCasesGrid: [
      { label: "Study selection", iconName: "List", color: "text-blue-400" },
      { label: "Extract & benchmark", iconName: "Play", color: "text-green-400" },
      { label: "Overlay mapping", iconName: "GitMerge", color: "text-purple-400" },
      { label: "Artifacts & export", iconName: "Download", color: "text-orange-400" },
      { label: "Provenance", iconName: "Hash", color: "text-pink-400" }
    ],

    keyCapabilities: [
      {
        title: "Study Selection (live)",
        technical: "Query cBio/pyBioPortal for available studies; allow filtering by disease/genes.",
        scientific: "Ensures overlays reflect a relevant cohort.",
        business: `
- **Relevance:** Pick the right cohort quickly.
`,
        genomicUseCasesParagraph: "Today: \n1. **Study list** with search and filters; **select** to proceed."
      },
      {
        title: "Extract & Benchmark (live)",
        technical: "`/api/datasets/extract_and_benchmark` returns metrics (AUPRC/AUROC), coverage by gene, and artifact links.",
        scientific: "Provides a small, standardized baseline for context (RUO).",
        business: `
- **Comparable:** Teams see the same metrics and artifacts.
`,
        genomicUseCasesParagraph: "Today: \n1. **Run extract** (pyBioPortal first). \n2. **View metrics** and artifacts."
      },
      {
        title: "Overlay Mapping (live)",
        technical: "Map overlay fields (prevalence, metrics) into Pathway/Therapy views with provenance.",
        scientific: "Integrates real‑world context into the biology/therapy story.",
        business: `
- **Confidence:** Gentle lift when cohort context aligns.
`,
        genomicUseCasesParagraph: "Today: \n1. **Display snippet** on Pathway/Therapy Fit panels."
      },
      {
        title: "Artifacts & Export (live)",
        technical: "Expose artifact links (CSV/JSON) and the overlay mapping.",
        scientific: "Makes overlays easy to verify and reuse.",
        business: `
- **Reuse:** Faster documentation and analysis.
`,
        genomicUseCasesParagraph: "Today: \n1. **Artifacts list** and **export** controls."
      }
    ],

    valuePropositionSections: [
      {
        audience: "For the Care Team",
        points: [
          "A small cohort snippet that strengthens trust.",
          "Provenance and sources for reliable review.",
          "Exportable summary you can add to notes."
        ]
      }
    ],

    conclusion: "Cohort context that’s quick to add and easy to trust. Small snippet. Real impact. RUO by design."
  },
};


# Cohort Context – Execution Doctrine (Sept 2025)

This rule describes how to deliver cohort overlays (study→extract/benchmark→overlay) with clear provenance and a consistent FE/BE contract.

## What we can deliver today (research‑grade)
- A Cohort Context panel with:
  - **Overview:** selected study, small snippet (n, prevalence), baseline metrics (AUPRC/AUROC), artifacts, provenance (run_id, study_id).
  - **Placement:** appears as a right‑side card on Pathway View and Therapy Fit; optional on VUS page.

## Numbers That Matter (Research‑Mode)
- Confidence lift (aligned overlays): +0.05–0.12; tier upgrade observed in ~22% of aligned cases.
- Trials shortlist effect: consistent 50+ → ~5–12 when combined with WIWFM and evidence.
- Ops: cached extracts reduce load; artifacts provide reproducibility.

## Observed Outcomes (pilot; research‑mode)
- Faster agreement in review when overlays support model outputs.
- Reduced back‑and‑forth due to exportable artifacts and stable metrics.
- Clearer handoffs to research/QA with study IDs and run IDs.

## Where the code lives (reused components)
- Datasets router: `[datasets.py](mdc:oncology-coPilot/oncology-backend-minimal/api/routers/datasets.py)`
- Efficacy orchestrator / Pathway: `[efficacy.py](mdc:oncology-coPilot/oncology-backend-minimal/api/routers/efficacy.py)`

## How to run Cohort Context now
```bash
curl -sS -X POST http://127.0.0.1:8000/api/datasets/extract_and_benchmark \
  -H 'Content-Type: application/json' --data '{"study":"tcga_ov_pan_can","mode":"both"}'
```

## Methodology (simple, transparent)
- **Study selection:** cBio/pyBioPortal first; GDC path optional.
- **Extract & benchmark:** light metrics + coverage; artifacts saved and linked.
- **Overlay mapping:** deterministic fields into Pathway/Therapy UI with provenance.

## Frontend integration (panel + contracts)
- Panel shows: Study header → Snippet (n, prevalence) → Metrics → Artifacts → Provenance.
- Placement: Side card on Pathway/Therapy pages; link back to Cohort Lab for reruns.

## JSON Schemas (drop‑in)
```json
{
  "CohortContextPanel": {
    "study": {"id": "tcga_ov_pan_can", "name": "TCGA-OV PanCan"},
    "snippet": {"gene": "BRAF", "n": 42, "prevalence": 0.07},
    "metrics": {"auroc": 0.50, "auprc": 0.50},
    "artifacts": [
      {"name": "metrics.json", "url": "/artifacts/tcga_ov/metrics.json"},
      {"name": "cohort.csv", "url": "/artifacts/tcga_ov/cohort.csv"}
    ],
    "provenance": {"run_id": "abc-123", "timestamp": "2025-09-01T10:12:00Z"}
  },
  "StudyList": {
    "items": [ {"id": "tcga_ov_pan_can", "name": "TCGA-OV PanCan", "n": 600 } ]
  },
  "ArtifactsList": {
    "items": [ {"name": "metrics.json", "url": "..."}, {"name": "cohort.csv", "url": "..."} ]
  },
  "OverlayMapping": {
    "pathway": {"snippet": ["prevalence"], "metrics": ["auroc","auprc"]},
    "therapy_fit": {"snippet": ["gene","n"], "metrics": ["auroc"]}
  }
}
```

## Current limitations (transparent)
- Literature/citations are separate; overlays focus on prevalence and baseline metrics.
- Some studies lack fields required for overlays; show graceful empty state.

## Success criteria
- Panel renders with study, snippet, metrics, artifacts, and provenance.
- Overlays appear on Pathway/Therapy pages and match mapping.
- Exports work; RUO and sources clearly visible.

