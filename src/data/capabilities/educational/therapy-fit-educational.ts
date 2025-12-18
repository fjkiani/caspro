/**
 * Therapy Fit Educational Data
 * Manually extracted and structured from therapy-fit-data.ts
 * Aligned with therapy-fit-data.ts structure for sidebar navigation
 */

import { EducationalCapabilityPageData } from '@/types/educational-capability';
import { therapyFitData } from '@/data/copilots/therapy-fit-data';

export const therapyFitEducationalData: EducationalCapabilityPageData = {
  // Hero Section - Aligned with therapy-fit-data.ts
  hero: {
    question: "Which drug should I prescribe for this patient?",
    genericAnswer: "Review standard of care guidelines. Consider patient's mutation profile manually.",
    ourAnswer: "Your patient's BRAF V600E → MAPK pathway disruption (0.85). BRAF inhibitors match MAPK (0.9). Efficacy score: 0.87 (30% sequence, 40% pathway, 30% evidence).",
    visualComparison: {
      before: "Manual drug review. No systematic ranking.",
      after: "BRAF V600E → MAPK (0.85). BRAF inhibitors → MAPK (0.9). Ranked #1 with 0.87 efficacy.",
    },
  },

  // Problem Section
  problem: {
    title: "The Problem: Multiple Drugs, Unclear Fit",
    narrative: `Need mechanism-based drug ranking with transparent scoring and confidence assessment.

**The core challenges:**

- **Multiple drugs to consider, unclear which fit patient's biology** - Oncologists face 20+ drug options with no clear ranking or biological rationale. Subjective therapy selection leads to 60% variability in treatment decisions.

- **Need transparent scoring methodology** - Without clear scoring, it's impossible to understand why one drug is recommended over another. Manual literature review takes 2-3 days per case to understand drug mechanisms.

- **Require confidence assessment and evidence backing** - No confidence scoring creates uncertainty about therapy fit and patient response. Evidence signals scattered across multiple sources make comprehensive assessment difficult.

**The impact:**
- 70% of relevant therapies missed because pathway-level signals aren't visible
- 60% variability in treatment decisions across different oncologists
- 2-3 days per case for manual drug mechanism review
- No systematic connection between patient biology and drug mechanisms`,
    visualMetaphor: "Like trying to choose the right key from a pile of 20 keys without knowing which lock you're opening",
    painPoints: [
      {
        title: "No Clear Ranking",
        description: "Multiple drugs to consider with no systematic ranking or biological rationale",
        icon: "AlertTriangle",
      },
      {
        title: "Unclear Methodology",
        description: "No transparent scoring to understand why one drug is recommended over another",
        icon: "Target",
      },
      {
        title: "Missing Confidence",
        description: "No confidence scoring creates uncertainty about therapy fit and patient response",
        icon: "Clock",
      },
      {
        title: "Scattered Evidence",
        description: "Evidence signals scattered across multiple sources, making comprehensive assessment difficult",
        icon: "AlertCircle",
      },
    ],
  },

  // Solution Section
  solution: {
    title: "The Solution: S/P/E Drug Ranking with Transparent Scoring",
    narrative: `We've built the first system that ranks drugs by efficacy using Sequence/Pathway/Evidence scoring with transparent rationale.

**How it works:**

1. **S/P/E Framework** - Ranks drugs using Sequence (Evo2 disruption, 30% weight), Pathway (gene-to-pathway alignment, 40% weight), and Evidence (literature + ClinVar, 30% weight). Formula: efficacy_score = 0.3×S + 0.4×P + 0.3×E + ClinVar_prior.

2. **Confidence & Evidence Tiers** - Confidence computed from evidence tier, badges, and insights lifts. Tiers: Supported (≥0.6), Consider (≥0.3), Insufficient (<0.3). Badges: RCT, Guideline, ClinVar-Strong, PathwayAligned.

3. **Insights Integration** - Functionality, chromatin, essentiality, regulatory chips provide confidence lifts when thresholds exceeded. Lifts: +0.05 (functionality≥0.6), +0.04 (chromatin≥0.5), +0.07 (essentiality≥0.7), +0.02 (regulatory≥0.6).

4. **Provenance Tracking** - Complete audit trail with run ID, profile, methods, flags, and confidence breakdown for full reproducibility.

**The Therapy Fit MOAT (What We Just Built):**
- ✅ S/P/E Framework → Knows how sequence, pathway, and evidence contribute to drug efficacy
- ✅ Confidence & Tiers → Knows prediction reliability and evidence strength
- ✅ Insights Integration → Knows when biological signals align for additional confidence
- ✅ Provenance Tracking → Knows complete methodology for reproducibility

**This is the first system that transforms patient mutations into ranked drug recommendations with transparent S/P/E scoring.**`,
    keyFeatures: [
      {
        title: "S/P/E Framework",
        description: "Sequence (30%) + Pathway (40%) + Evidence (30%) for comprehensive drug ranking",
        icon: "Activity",
        status: "implemented",
      },
      {
        title: "Confidence & Tiers",
        description: "Evidence tiers (Supported/Consider/Insufficient) with confidence scores and badges",
        icon: "Gauge",
        status: "implemented",
      },
      {
        title: "Insights Integration",
        description: "4 insights chips provide confidence lifts when biological signals align",
        icon: "TrendingUp",
        status: "implemented",
      },
      {
        title: "Provenance Tracking",
        description: "Complete audit trail with run ID, profile, methods, and confidence breakdown",
        icon: "Fingerprint",
        status: "implemented",
      },
    ],
    visualFlow: [
      {
        number: 1,
        title: "Sequence Scoring",
        description: "Evo2 adaptive multi-window scoring measures variant impact (30% weight)",
      },
      {
        number: 2,
        title: "Pathway Alignment",
        description: "Gene-to-pathway mapping with drug-pathway alignment (40% weight)",
      },
      {
        number: 3,
        title: "Evidence Synthesis",
        description: "Literature search + ClinVar classification (30% weight)",
      },
      {
        number: 4,
        title: "Ranked Drug List",
        description: "Drugs sorted by confidence with efficacy scores, tiers, badges, and rationale",
      },
    ],
  },

  // How It Works Section
  howItWorks: {
    title: "How Therapy Fit Works (Four Steps)",
    steps: [
      {
        number: 1,
        title: "Sequence Scoring (S)",
        description: "Evo2 adaptive multi-window scoring with gene-specific calibration. Measures variant impact on protein function (30% weight).",
        details: [
          { label: "Method", value: "Evo2 adaptive multi-window scoring" },
          { label: "Weight", value: "30% of S/P/E framework" },
          { label: "Output", value: "Sequence disruption scores" },
        ],
      },
      {
        number: 2,
        title: "Pathway Alignment (P)",
        description: "Gene-to-pathway mapping with drug-pathway alignment. Matches drug mechanisms to patient's pathway disruptions (40% weight).",
        details: [
          { label: "Method", value: "Gene-to-pathway mapping with drug alignment" },
          { label: "Weight", value: "40% of S/P/E framework" },
          { label: "Output", value: "Pathway disruption scores" },
        ],
      },
      {
        number: 3,
        title: "Evidence Synthesis (E)",
        description: "Literature search (PubMed/OpenAlex/S2) + ClinVar classification. Synthesizes RCTs, guidelines, and clinical evidence (30% weight).",
        details: [
          { label: "Method", value: "Literature search + ClinVar classification" },
          { label: "Weight", value: "30% of S/P/E framework" },
          { label: "Output", value: "Evidence strength scores" },
        ],
      },
      {
        number: 4,
        title: "Ranked Drug List",
        description: "Drugs sorted by confidence with efficacy scores, evidence tiers, badges, and transparent S/P/E breakdown.",
        details: [
          { label: "Formula", value: "efficacy_score = 0.3×S + 0.4×P + 0.3×E + ClinVar_prior" },
          { label: "Output", value: "Ranked drug list with confidence and rationale" },
          { label: "Provenance", value: "Complete audit trail with run ID" },
        ],
      },
    ],
    interactive: true,
  },

  // Process Flow
  process: {
    title: "Therapy Fit Process Flow",
    steps: [
      {
        number: 1,
        title: "Patient Mutations",
        description: "Input patient's genetic mutations",
        visual: null,
      },
      {
        number: 2,
        title: "Sequence Scoring",
        description: "Evo2 scores variant impact (30% weight)",
        visual: null,
      },
      {
        number: 3,
        title: "Pathway Alignment",
        description: "Map genes to pathways, align drugs (40% weight)",
        visual: null,
      },
      {
        number: 4,
        title: "Evidence Synthesis",
        description: "Literature + ClinVar evidence (30% weight)",
        visual: null,
      },
      {
        number: 5,
        title: "Efficacy Scoring",
        description: "Calculate efficacy_score = 0.3×S + 0.4×P + 0.3×E",
        visual: null,
      },
      {
        number: 6,
        title: "Ranked Drug List",
        description: "Drugs sorted by confidence with tiers, badges, rationale",
        visual: null,
      },
    ],
    layout: "horizontal",
  },

  // Value Proposition
  value: {
    title: "THE MOAT: Transparent Drug Ranking with S/P/E Framework",
    question: "How do I know which drug fits my patient's biology?",
    genericResponse: "Review standard of care. Consider mutations manually. No systematic ranking.",
    ourResponse: "Your patient's BRAF V600E → MAPK pathway (0.85). BRAF inhibitors → MAPK (0.9). Ranked #1 with 0.87 efficacy (30% sequence, 40% pathway, 30% evidence). Confidence: 0.85 (Supported tier, PathwayAligned badge).",
    comparison: [
      {
        feature: "Drug Ranking",
        generic: "Manual review, no systematic ranking",
        ourSystem: "Automated S/P/E scoring with transparent rationale",
      },
      {
        feature: "Scoring Methodology",
        generic: "No clear methodology",
        ourSystem: "30% Sequence, 40% Pathway, 30% Evidence",
      },
      {
        feature: "Confidence Assessment",
        generic: "No confidence scoring",
        ourSystem: "Evidence tiers + badges + insights lifts",
      },
      {
        feature: "Evidence Backing",
        generic: "Scattered evidence sources",
        ourSystem: "Literature + ClinVar with badges and tiers",
      },
    ],
  },

  // Integration Section
  integration: {
    title: "How Therapy Fit Fits Into Complete Care",
    connections: [
      {
        from: "Therapy Fit",
        to: "Pathway Analysis",
        relationship: "Pathway component (40% weight) uses pathway aggregation service",
        visual: null,
      },
      {
        from: "Therapy Fit",
        to: "Evidence Intelligence",
        relationship: "Evidence component (30% weight) uses literature and ClinVar data",
        visual: null,
      },
      {
        from: "Therapy Fit",
        to: "Toxicity Risk",
        relationship: "Drug recommendations can be enriched with toxicity risk assessment",
        visual: null,
      },
    ],
    carePlanContext: [
      {
        step: 1,
        component: "Molecular Profile",
        howThisHelps: "Sequence and pathway scores identify affected biological pathways",
      },
      {
        step: 2,
        component: "Therapeutic Options",
        howThisHelps: "Ranked drug list with transparent S/P/E scoring enables mechanism-based selection",
      },
      {
        step: 3,
        component: "Clinical Trials",
        howThisHelps: "Drug rankings inform clinical trial matching with mechanism-based rationale",
      },
    ],
  },

  // Example Section
  example: {
    title: "Real Example: Melanoma with BRAF V600E Mutation",
    patient: {
      name: "Patient MEL-001",
      diagnosis: "Metastatic melanoma",
      keyMutations: ["BRAF:c.1799T>A (V600E)"],
      pathwayDisruptions: ["MAPK: 0.85"],
    },
    solution: [
      {
        step: 1,
        title: "Sequence Scoring",
        description: "BRAF V600E → Evo2 sequence disruption score: 0.82 (30% weight)",
        result: "Sequence component: 0.82 × 0.3 = 0.246",
      },
      {
        step: 2,
        title: "Pathway Alignment",
        description: "BRAF → MAPK pathway disruption: 0.85. BRAF inhibitors → MAPK: 0.9 (40% weight)",
        result: "Pathway component: 0.85 × 0.4 = 0.34",
      },
      {
        step: 3,
        title: "Evidence Synthesis",
        description: "Literature evidence: 0.88. ClinVar-Strong classification (30% weight)",
        result: "Evidence component: 0.88 × 0.3 = 0.264",
      },
      {
        step: 4,
        title: "Efficacy Scoring",
        description: "efficacy_score = 0.246 + 0.34 + 0.264 + 0.02 (ClinVar prior) = 0.87",
        result: "BRAF inhibitors ranked #1 with 0.87 efficacy, 0.85 confidence (Supported tier)",
      },
    ],
    outcome: [
      {
        metric: "Drug Ranking",
        value: "BRAF inhibitors #1",
        impact: "Clear mechanism-based recommendation",
      },
      {
        metric: "Efficacy Score",
        value: "0.87 (High confidence)",
        impact: "30% sequence, 40% pathway, 30% evidence",
      },
      {
        metric: "Evidence Tier",
        value: "Supported",
        impact: "Strong evidence with PathwayAligned badge",
      },
    ],
  },

  // Layout - Aligned with therapy-fit-data.ts structure
  layout: {
    sidebar: {
      sections: [
        { id: 'hero', title: 'The Question', subsections: [] },
        { id: 'problem', title: 'The Problem', subsections: [] },
        { id: 'solution', title: 'The Solution', subsections: [] },
        { id: 'value-props', title: 'Value Propositions', subsections: [
          'For Medical Oncologists',
          'For Researchers'
        ] },
        { id: 'how-it-works', title: 'How It Works', subsections: [] },
        { id: 'observed-outcomes', title: 'Observed Outcomes', subsections: [
          'S/P/E Framework',
          'Drug Ranking',
          'Insights Integration',
          'Provenance Tracking'
        ] },
        { id: 'key-capabilities', title: 'Core Capabilities', subsections: [
          'S/P/E Drug Ranking',
          'Confidence & Evidence Tiers',
          'Insights Integration'
        ] },
        { id: 'process', title: 'Process Flow', subsections: [] },
        { id: 'value', title: 'The MOAT', subsections: [] },
        { id: 'example', title: 'Real Example', subsections: [] },
        { id: 'integration', title: 'Integration', subsections: [] },
      ],
    },
    progress: {
      current: 1,
      total: 11,
      readingTime: 15,
    },
  },

  // Source data
  sourceData: therapyFitData,
};

