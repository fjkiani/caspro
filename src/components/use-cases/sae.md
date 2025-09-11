---
alwaysApply: false
description: SAE Intelligence – In‑Silico Interpretable Features (Sept 2025). Plain‑language website copy + execution plan for Sparse Autoencoder (SAE) feature discovery, attribution, and activation steering (RUO), inspired by Evo2.
globs: 
---


export const coPilotDetailsData: Record<string, CoPilotDetailContent> = {
  "sae": {
    slug: "sae",
    pageTitle: "SAE Intelligence: Interpretable Genomic Features",
    heroSubtitle: "Go beyond the score. See the exact biological features—exons, TF motifs, protein structures—that drive a prediction and understand *why* a variant is disruptive.",
    vision: "Transform black-box predictions into transparent, biologically-grounded stories. We expose the model's internal logic to explain variant impact, flag risky designs, and (on the roadmap) steer generative AI.",

    valueProps: [
      {
        audience: 'For Scientists',
        icon: 'Lightbulb',
        points: [
          '**Readable Biology:** See features like exon boundaries, TF motifs, and secondary structures.',
          '**Quantifiable Disruption:** Pinpoint exactly which features a variant impacts with disruption scores (ΔLL).',
          '**Explainable AI:** Move from a simple score to a full, auditable explanation for every prediction.'
        ]
      },
      {
        audience: 'For Engineers',
        icon: 'Settings',
        points: [
          '**Live Frontend Components:** Interactive visualizations powered by robust simulations.',
          '**Clear Data Contracts:** Stable JSON from simulations drives predictable UI behavior.',
          '**Roadmap to Production:** Clear path from current RUO simulations to future-state backend services.'
        ]
      }
    ],

    buildsOn: "How It Works Today",
    buildsOnStackPoints: [
      "**`DynamicOracleExplain` Component:** An interactive, multi-track visualizer that displays SAE features and their disruption scores (ΔLL) directly on the genomic sequence.",
      "**`simulateVariantImpactWithSAE` Function:** A powerful simulation in `simulations.ts` that generates the rich feature and attribution data needed to power our visualizations.",
      "**Prompt Quality Checker:** A safety gate that flags pathological inputs (like low‑complexity repeats) in our design flows."
    ],

    kpis: [
      { label: 'Feature Coverage', value: 'Exon/Intron/TFBS/2° Structure' },
      { label: 'Key Metric', value: 'Disruption Score (ΔLL)' },
      { label: 'Prompt Safety', value: 'Low‑complexity/junk flags' },
      { label: 'Steering Scaling (Roadmap)', value: 'Log‑linear beam→quality' }
    ],

    observedOutcomes: [
      'Clearer “why” lines on variant reports, linked directly to biological features.',
      'Fewer junk outputs in design flows via the integrated safety checker.',
      'Increased stakeholder trust, as interpretable overlays reduce black‑box concerns.'
    ],

    genomicInsightsOverview: "SAE features, as reported in Evo2, reveal interpretable concepts like exons, TF binding motifs, and protein secondary structure cues. We surface these features to explain Oracle's scores and, on the roadmap, to steer the Forge's generative output.",
    coreProblemIntro: "A score is a number. An explanation is a story. We provide the story, making every prediction readable, auditable, and trustworthy.",
    coreProblemPoints: [
      "Users need a concrete ‘why’ behind each signal, not just a p-value.",
      "Junk-in-junk-out is a real risk; design flows need structure-aware checks.",
      "Effective design requires controllable targets, not black-box knobs."
    ],

    genomicUseCasesGrid: [
      { label: "Feature Overlay (Oracle)", iconName: "Layers", color: "text-blue-400" },
      { label: "Disruption Score (Oracle)", iconName: "TrendingDown", color: "text-green-400" },
      { label: "Prompt Safety (Forge)", iconName: "Shield", color: "text-purple-400" },
      { label: "Activation Steering (Roadmap)", iconName: "Sliders", color: "text-orange-400" }
    ],

    keyCapabilities: [
      {
        title: "Feature Attribution (Live)",
        technical: "We simulate the extraction of active SAE features for a given sequence and calculate the change in log-likelihood (ΔLL) caused by a variant.",
        scientific: "Connects the model's internal logic to human-readable biological concepts (RUO).",
        business: `
- **Trust:** Defend and document decisions with feature-linked, quantitative explanations.
`,
        genomicUseCasesParagraph: "Today: \n1. **Interactive feature tracks** in our `DynamicOracleExplain` component. \n2. **Quantitative disruption scores** to rank a variant's impact."
      },
      {
        title: "Prompt Safety (Live)",
        technical: "Detect low‑complexity repeats and other pathological attractors; flag viral/sensitive content (aligned with Forge safety gates).",
        scientific: "Reduces junk outputs and improves the reliability of generative demos.",
        business: `
- **Quality:** Fewer dead‑ends in design flows and cleaner, more compelling demos.
`,
        genomicUseCasesParagraph: "Today: \n1. **Automated safety checks** on design inputs, with clear user warnings."
      },
      {
        title: "Activation Steering (Roadmap)",
        technical: "Expose endpoints to nudge/target feature activations (e.g., chromatin patterns, motif presence) with compute‑aware beam search.",
        scientific: "Maps Evo2‑style inference‑time scaling to controllable design objectives.",
        business: `
- **Control:** Achieve predictable design quality scaling with transparent, auditable controls.
`,
        genomicUseCasesParagraph: "Roadmap: \n1. **Steer** generation towards desired feature sets; **measure** quality and efficacy metrics."
      }
    ],

    valuePropositionSections: [
      {
        audience: "For the Institution",
        points: [
          "Interpretable overlays increase confidence and adoption across teams.",
          "Safer demos and design explorations with automated prompt checks.",
          "A clear path to controllable, auditable in-silico design (roadmap)."
        ]
      }
    ],

    conclusion: "SAE features turn the black‑box into a readable story—and open a clear path to controllable in‑silico design (RUO)."
  },
};


# SAE Intelligence – Technical Doctrine (Sept 2025)

This doctrine describes how we surface SAE features for interpretation today and our roadmap for activation steering.

## What We Deliver Today (Frontend Simulation)
Our current implementation is a high-fidelity frontend simulation that powers our interactive demos. The `simulateVariantImpactWithSAE` function in `simulations.ts` produces the following data contract:
- **`saeFeatures[]`:** `{ featureId, description, position, strength }` - The active biological features at specific locations.
- **`deltaLLSeries[]`:** `{ featureId, description, deltaLL }` - The quantitative disruption score for each feature caused by the variant.
- **`provenance`:** run_id, model_profile, etc.

## Numbers That Matter (Research‑Mode)
- Evo2 reported interpretable SAE features (exons/introns, TFBS, secondary structure, mutation severity); our UI and data contracts are designed to surface these same concepts.
- The **ΔLL (Delta Log-Likelihood)** score is the key quantitative metric we use to measure and display the functional impact of a variant on each biological feature.

## Observed Outcomes (Pilot; Research‑Mode)
- Stronger ‘why’ lines in variant reports that align to recognizable biology.
- Early catches on pathological prompts, reducing junk outputs in Forge demos.
- Better user trust in the `DynamicOracleExplain` component due to its transparency.

## Where the Code Lives
- **Frontend Simulation (Live):** `src/utils/simulations.ts` (see `simulateVariantImpactWithSAE`)
- **Frontend Component (Live):** `src/components/site/blocks/DynamicOracleExplain.tsx`
- **Backend Service (Roadmap):** `@/api/routers/sae.py` (future state for production-scale, cached feature extraction).

## Endpoint Sketch (Roadmap)
```http
POST /api/sae/attributes { sequence|coords, region?, model_id? } → { features[], attribution[], provenance }
POST /api/sae/steer { target_features[], weights[], beam?, constraints? } → { proposals[], metrics[], provenance }
```

## Frontend Integration (Live & Roadmap)
- **`DynamicOracleExplain.tsx` (Live):** Renders a multi-track visualization showing the DNA sequence, active SAE `FeatureChips` on a sequence track, and a bar chart below visualizing the `deltaLL` disruption scores. This instantly highlights the most impacted biological functions.
- **Forge Design Input (Live):** Shows prompt warnings from the safety checker.
- **Forge Design Panel (Roadmap):** Will include small steering controls for demos, clearly badged as RUO.

## JSON Schemas (Target State for Backend Service)
*NOTE: The schema below represents the target state for our backend SAE service. Our current frontend simulation provides a simplified version to power `DynamicOracleExplain`.*
```json
{
  "SAEAttributesResponse": {
    "features": [
      {"id": "f_102", "label": "Exon boundary", "type": "exon", "span": {"start": 43044290, "end": 43044360}, "score": 0.82},
      {"id": "f_211", "label": "TF motif (AP-1)", "type": "tfbs", "span": {"start": 43044310, "end": 43044325}, "score": 0.67}
    ],
    "attribution": {
      "why_line": "Variant disrupts a critical Exon Boundary (f_102) and an AP-1 binding motif (f_211).",
      "top_disrupted": [
        {"feature_id": "f_102", "delta_log_likelihood": -12.5, "label": "Exon boundary"},
        {"feature_id": "f_211", "delta_log_likelihood": -8.2, "label": "TF motif (AP-1)"}
      ]
    },
    "provenance": {"run_id": "uuid", "model_id": "crispro_evo2_40b_sae_v1", "layer": "L26"}
  },
  "SAESteerRequest": {"target_features": ["tfbs:AP-1","open_chromatin"], "weights": [0.8, 0.6], "beam": 8},
  "SAESteerResponse": {"proposals": [{"id": "p1", "quality": 0.71}], "metrics": {"beam": 8, "runtime_ms": 1200}}
}
```

## Current Limitations (Transparent)
- Feature extraction is compute‑heavy; the future backend service will require aggressive caching and optional sampling.
- Steering is a roadmap item; current demos should be clearly labeled as RUO and be resource‑bounded.

## Success Criteria
- The `DynamicOracleExplain` component displays feature overlays and ‘why’ lines without blocking the UI.
- The Forge safety checker consistently flags low‑complexity/viral inputs.
- When enabled, steering demos show predictable quality scaling with clear provenance.

