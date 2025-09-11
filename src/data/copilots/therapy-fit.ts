
// # Therapy Fit – Execution Doctrine (Aug 2025)

// This rule describes how to deliver drug ranking now using our existing Oncology Co‑Pilot stack with transparent provenance.


// ## Methodology (S/P/E + mapping)
// - **S:** Multi/exon absolute magnitudes; hotspot‑aware functionality lift.
// - **P:** MoA‑aligned pathway weighting per class.
// - **E:** Disease/MoA‑scoped literature and ClinVar prior; badges and tier for transparency.
// - **Lifts:** modest when insights exceed thresholds.



// ## What we can deliver today (research‑grade)
// - Per‑case therapy ranking using S/P/E + insights:
//   - **Sequence (S):** Evo‑based disruption magnitudes + gene calibration (hotspot aware).
//   - **Pathway (P):** Gene→pathway burden aligned to drug MoA.
//   - **Evidence (E):** ClinVar prior + literature (when enabled) with badges + tier.
//   - **Insights:** Functionality, Chromatin (heuristic unless Enformer/Borzoi configured), Essentiality, Regulatory.
// - Output: `drugs[]` with `efficacy_score`, `confidence`, `evidence_tier`, `badges`, `insights`, `rationale`, `citations`, `provenance`.

// ## Numbers That Matter (Research‑Mode)
// - Variant foundations (ClinVar): 53,210 variants at 95.7% AUROC; splice AUROC ~82.5–82.6 supports regulatory chips.
// - Business target: VUS 40% → ~15% enables clearer therapy direction; ≈$2.1M/program saved by focusing wet‑lab.
// - Ops: confidence +0.05–0.12 when cohort overlays align; decision time reduced 50–70% with one‑pager.

// ## Observed Outcomes (pilot runs; research‑mode)
// - Tier promotions: Insufficient→Consider ~30–45%; Consider→Supported ~10–20% when evidence lines up.
// - Confidence: +0.08 median lift (IQR +0.05–0.12) with supportive chips/overlays.
// - Ranking stability: Pathway‑Aligned badge more frequent; fewer reversals.
// - Fusion: applied when AM coverage exists; +0.03–0.07 confidence lift when active.
// - Sharing: one‑pager with run ID/citations compresses planning time by 50–70%.

// ## Plain English: Why this matters
// - Faster clarity: get a ranked, explainable starting point in minutes.
// - Less debate: confidence and tiers make decisions easier to align.
// - Trusted and reusable: sources and run IDs build confidence across teams (RUO).

// ## Where the code lives (reused components)
// - Efficacy orchestrator: `[efficacy.py](mdc:oncology-coPilot/oncology-backend-minimal/api/routers/efficacy.py)`
// - Insights router: `[insights.py](mdc:oncology-coPilot/oncology-backend-minimal/api/routers/insights.py)`
// - Evidence + ClinVar proxy: `[evidence.py](mdc:oncology-coPilot/oncology-backend-minimal/api/routers/evidence.py)`



export const coPilotDetailsData: Record<string, CoPilotDetailContent> = {
  "therapy-fit": {
    slug: "therapy-fit",
    pageTitle: "Therapy Fit: In‑Silico Drug Ranking",
    heroSubtitle: "See which drug classes may fit a patient’s genetics—before treatment. Clear ranking, confidence, and sources (research‑mode).",
    vision: "Turn genetics into a plain, ranked therapy view you can act on: top classes, a short ‘why,’ confidence, and a shareable, source‑backed one‑pager.",

    // Website value props (plain)
    valueProps: [
      {
        audience: 'For Medical Oncologists',
        icon: 'ListChecks',
        points: [
          'A quick, explainable ranked list of drug classes.',
          'Short “why,” confidence, and citations (RUO).',
          'A one‑page summary you can share with the team.'
        ]
      },
      {
        audience: 'For Pharmacists',
        icon: 'Beaker',
        points: [
          'Simple biology signals alongside standard criteria.',
          'Consistent outputs with run IDs and sources.',
          'Roadmap: interaction/toxicity enrichment.'
        ]
      }
    ],

    buildsOn: "What this runs on (today vs roadmap)",
    buildsOnStackPoints: [
      "**Today:** S/P/E fusion (Sequence, Pathway, Evidence) with insight chips.",
      "**Optional today:** Cohort extracts/benchmarks to add context.",
      "**Roadmap:** Regimen safety/interaction checks; guideline/on‑label cues."
    ],

    kpis: [
      { label: 'ClinVar AUROC (total n=53,210)', value: '0.957' },
      { label: 'Coding SNVs (n=14,319)', value: '0.957' },
      { label: 'Non‑coding SNVs (n=34,761)', value: '0.958 (SOTA)' },
      { label: 'Coding non‑SNVs (n=1,236)', value: '0.939 (SOTA)' },
      { label: 'Non‑coding non‑SNVs (n=3,894)', value: '0.918' },
      { label: 'SpliceVarDB AUROC (n=4,950)', value: '0.825–0.826' },
      { label: 'Target VUS 40% → 15%', value: '≈$2.1M saved/program' },
      { label: 'Confidence lift with cohort overlay', value: '+0.05–0.12' }
    ],

    observedOutcomes: [
      'Tier promotions: Insufficient→Consider ~30–45%; Consider→Supported ~10–20% (when evidence aligns)',
      'Confidence +0.08 median lift with supportive chips and cohort overlays',
      'Pathway‑Aligned badge more frequent; steadier class rankings',
      'Decision time reduced 50–70% with shareable one‑pager',
      'Fusion used when eligible; +0.03–0.07 confidence lift'
    ],

    genomicInsightsOverview: "Our live stack (research‑mode) produces a compact ranked therapy table: class, score, confidence, short rationale, and citations—plus run ID and profile.",
    coreProblemIntro: "Picking a therapy is slow when the biology is unclear. We make the starting point clear and shareable.",
    coreProblemPoints: [
      "Too many options, unclear fit.",
      "Difficult to explain ‘why’ without sources.",
      "Hard to create a one‑pager everyone can trust."
    ],

    genomicUseCasesGrid: [
      { label: "Rank MoA‑aligned classes", iconName: "ListChecks", color: "text-blue-400" },
      { label: "Short ‘why’ + confidence", iconName: "MessageSquare", color: "text-green-400" },
      { label: "Citations & badges (RUO)", iconName: "ShieldCheck", color: "text-purple-400" },
      { label: "Cohort context (optional)", iconName: "Users", color: "text-orange-400" }
    ],

    keyCapabilities: [
      {
        title: "Biology‑Aware Drug Ranking (live)",
        technical: "We fuse Sequence (Evo‑based disruption), Pathway (gene→pathway burden), and Evidence (ClinVar + literature when enabled) to rank drug classes. Output includes confidence, evidence tier, badges, and rationale.",
        scientific: "Signals translate variant biology into therapy fit with auditable provenance (run ID, profile).",
        business: `
- **Faster decisions:** A clear starting point backed by sources.
- **Explainable:** Short rationale and confidence for tumor boards.
`,
        genomicUseCasesParagraph: "Today: \n1. **Rank MoA‑aligned classes** from S/P/E with insight chips. \n2. **Explainers**: bullets and citations show ‘why’. \n3. **Confidence** reflects evidence and supportive insights (RUO)."
      },
      {
        title: "Biomarkers & Cohort Context (live; optional)",
        technical: "Genomics‑first scoring with chips and priors; Cohort Lab adds extracts/benchmarks to ground findings.",
        scientific: "Context strengthens confidence when present; still RUO.",
        business: `
- **Research acceleration:** Better shortlists with reproducible context.
`,
        genomicUseCasesParagraph: "Today: \n1. **Chemo class hypothesis** informed by pathway biology. \n2. **Cohort hint** when extracted data aligns."
      },
      {
        title: "Regimen Safety & Interactions (roadmap)",
        technical: "Planned: regimen‑aware interaction/toxicity checks layered on top of baseline guidance.",
        scientific: "Future: incorporate pharmacology and prior toxicity to refine fit.",
        business: `
- **Reduce rework:** Early safety signals in the same view.
`,
        genomicUseCasesParagraph: "Roadmap: enrich the summary with interaction/toxicity checks per regimen."
      },
      {
        title: "Knowledge & Provenance (live, expanding)",
        technical: "Co‑Pilot + Evidence provide citations/badges; every table shows run ID and profile; export is available.",
        scientific: "Audit‑ready outputs for internal review and reproducibility.",
        business: `
- **Trust & reuse:** Shareable, repeatable summaries.
`,
        genomicUseCasesParagraph: "Today: \n1. **Provenance on every result**; one‑click export to JSON/CSV."
      }
    ],

    valuePropositionSections: [
      {
        audience: "For the Medical Oncologist",
        points: [
          "A quick, plain ranked list of drug classes to consider.",
          "Short ‘why’ with confidence and citations (RUO).",
          "A one‑page summary you can share and discuss."
        ]
      },
      {
        audience: "For the Institution",
        points: [
          "Faster, more consistent planning with provenance.",
          "Reusable, auditable outputs for QA and research.",
          "A safe path to deeper safety/interaction checks when ready."
        ]
      }
    ],

    conclusion: "In‑silico therapy fit that’s simple to read and easy to share. Plain ranking. Clear confidence. Sources included. Research‑mode by design."
  },
};

