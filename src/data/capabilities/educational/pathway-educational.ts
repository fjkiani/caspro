/**
 * Pathway Educational Data
 * Manually extracted and structured from pathway-data.ts
 * Aligned with pathway-data.ts structure for sidebar navigation
 */

import { EducationalCapabilityPageData } from '@/types/educational-capability';
import { pathwayData } from '@/data/copilots/pathway-data';

export const pathwayEducationalData: EducationalCapabilityPageData = {
  // Hero Section - Aligned with pathway-data.ts
  hero: {
    question: "How do I know which pathways are affected by my patient's mutations?",
    genericAnswer: "Review literature and pathway databases manually. No systematic aggregation.",
    ourAnswer: "Your patient's BRCA1/2 mutations → DDR pathway disruption (0.85). PARP inhibitors target DDR. Match score: 0.89.",
    visualComparison: {
      before: "Manual pathway review. No systematic aggregation.",
      after: "BRCA1/2 → DDR pathway (0.85). PARP inhibitors → DDR (0.9). Match: 0.89.",
    },
  },

  // Problem Section
  problem: {
    title: "The Problem: Variant-Level Scores Don't Show Pathway Burden",
    narrative: `Sequence scores are variant-level. We need pathway-level aggregation for drug mechanism alignment.

**The core challenges:**

- **Variant-level scores don't show pathway burden** - Individual variant disruption scores don't aggregate to show overall pathway impact. A patient with 5 BRCA1 variants has high DDR pathway disruption, but this isn't visible from variant-level scores alone.

- **Drugs target pathways, not individual variants** - PARP inhibitors target the DDR pathway, not specific BRCA1 variants. Without pathway aggregation, we can't match drugs to patient pathway disruptions.

- **Need pathway aggregation for mechanism-based therapy selection** - To enable mechanism-based drug selection, we need to aggregate sequence disruption scores by pathway and match drugs to pathway disruptions.

**The impact:**
- 70% of relevant therapies missed because pathway-level signals aren't visible
- Manual pathway review takes 2-3 days per case
- Inconsistent pathway aggregation across different analysis tools
- No systematic connection between variant biology and drug mechanisms`,
    visualMetaphor: "Like trying to understand a forest by examining individual leaves",
    painPoints: [
      {
        title: "Variant-Level Limitation",
        description: "Sequence scores are variant-level, don't show pathway burden",
        icon: "AlertTriangle",
      },
      {
        title: "Drug-Pathway Mismatch",
        description: "Drugs target pathways, not individual variants",
        icon: "Target",
      },
      {
        title: "Manual Aggregation",
        description: "No systematic pathway aggregation for mechanism-based selection",
        icon: "Clock",
      },
      {
        title: "Inconsistent Methods",
        description: "Different tools use different pathway aggregation methods",
        icon: "AlertCircle",
      },
    ],
  },

  // Solution Section
  solution: {
    title: "The Solution: Pathway-Level Aggregation with S/P/E Integration",
    narrative: `We've built the first system that aggregates sequence disruption scores into pathway-level signals and integrates them into drug efficacy prediction.

**How it works:**

1. **Pathway Aggregation** - Aggregates sequence disruption scores by pathway using weighted gene-to-pathway mappings. Formula: pathway_score = sum(sequence_disruption × weight) / count.

2. **Gene-to-Pathway Mapping** - Maps cancer genes to biological pathways (DDR, MAPK, TP53, PI3K, VEGF) with transparent weights. Key genes: BRCA1/2→DDR, BRAF/KRAS→MAPK, TP53→TP53.

3. **Drug-to-Pathway Alignment** - Pre-configured drug panels for Multiple Myeloma, Ovarian Cancer, and Melanoma with pathway weight mappings and mechanism-of-action annotations.

4. **S/P/E Integration** - Pathway component contributes 40% weight to drug efficacy scoring in the S/P/E framework, combining with Sequence (30%) and Evidence (30%).

**The Pathway Analysis MOAT (What We Just Built):**
- ✅ Pathway aggregation → Knows which pathways are disrupted by patient mutations
- ✅ Gene-to-pathway mapping → Knows which genes belong to which pathways
- ✅ Drug-to-pathway alignment → Knows which drugs target which pathways
- ✅ S/P/E integration → Knows how pathway disruption affects drug efficacy (40% weight)

**This is the first system that transforms variant-level scores into pathway-level drug efficacy predictions.**`,
    keyFeatures: [
      {
        title: "Pathway Aggregation",
        description: "Aggregates sequence disruption scores by pathway using weighted gene-to-pathway mappings",
        icon: "BarChart3",
        status: "implemented",
      },
      {
        title: "Gene-to-Pathway Mapping",
        description: "Maps cancer genes to biological pathways with transparent weights",
        icon: "Map",
        status: "implemented",
      },
      {
        title: "Drug-to-Pathway Alignment",
        description: "Pre-configured drug panels with pathway weight mappings",
        icon: "Target",
        status: "implemented",
      },
      {
        title: "S/P/E Integration",
        description: "Pathway component contributes 40% weight to drug efficacy scoring",
        icon: "Activity",
        status: "implemented",
      },
    ],
    visualFlow: [
      {
        number: 1,
        title: "Aggregate Sequence Scores",
        description: "Aggregate variant-level sequence disruption scores by pathway",
      },
      {
        number: 2,
        title: "Map Genes to Pathways",
        description: "Map patient genes to biological pathways (DDR, MAPK, TP53, PI3K, VEGF)",
      },
      {
        number: 3,
        title: "Align Drugs to Pathways",
        description: "Match drugs to pathways based on mechanism-of-action",
      },
      {
        number: 4,
        title: "Calculate Efficacy Scores",
        description: "Integrate pathway scores into S/P/E framework (40% weight)",
      },
    ],
  },

  // How It Works Section
  howItWorks: {
    title: "How Pathway Analysis Works (Four Steps)",
    steps: [
      {
        number: 1,
        title: "Aggregate Sequence Scores by Pathway",
        description: "Aggregate variant-level sequence disruption scores by pathway using weighted gene-to-pathway mappings. Formula: pathway_score = sum(sequence_disruption × weight) / count.",
        details: [
          { label: "Method", value: "Weighted averaging of sequence scores" },
          { label: "Integration", value: "Called from efficacy orchestrator during S/P/E pipeline" },
          { label: "Weight", value: "40% of S/P/E framework" },
        ],
      },
      {
        number: 2,
        title: "Map Genes to Pathways",
        description: "Map cancer genes to biological pathways with transparent weights. Supports DDR, MAPK, TP53, PI3K, and VEGF pathways.",
        details: [
          { label: "Pathways", value: "DDR, MAPK, TP53, PI3K, VEGF" },
          { label: "Key Genes", value: "BRCA1/2→DDR, BRAF/KRAS→MAPK, TP53→TP53" },
          { label: "Weight System", value: "Binary weights (1.0) for primary pathway" },
        ],
      },
      {
        number: 3,
        title: "Align Drugs to Pathways",
        description: "Match drugs to pathways based on mechanism-of-action and pathway weights. Pre-configured panels for MM, Ovarian, and Melanoma.",
        details: [
          { label: "Disease Panels", value: "MM, Ovarian, Melanoma" },
          { label: "Pathway Weights", value: "Drug-specific pathway relevance weights" },
          { label: "MoA Integration", value: "Mechanism-of-action annotations" },
        ],
      },
      {
        number: 4,
        title: "Integrate into S/P/E Framework",
        description: "Pathway component contributes 40% weight to drug efficacy scoring, combining with Sequence (30%) and Evidence (30%).",
        details: [
          { label: "S/P/E Weight", value: "Pathway = 40%, Sequence = 30%, Evidence = 30%" },
          { label: "Integration", value: "Synthetic Lethality analysis" },
          { label: "Status", value: "✅ Complete" },
        ],
      },
    ],
    interactive: true,
  },

  // Process Flow
  process: {
    title: "Pathway Analysis Process Flow",
    steps: [
      {
        number: 1,
        title: "Variant-Level Scores",
        description: "Sequence disruption scores for each variant",
        visual: null,
      },
      {
        number: 2,
        title: "Gene-to-Pathway Mapping",
        description: "Map genes to pathways (DDR, MAPK, TP53, PI3K, VEGF)",
        visual: null,
      },
      {
        number: 3,
        title: "Pathway Aggregation",
        description: "Aggregate scores by pathway using weighted averaging",
        visual: null,
      },
      {
        number: 4,
        title: "Drug-to-Pathway Alignment",
        description: "Match drugs to pathways based on MoA",
        visual: null,
      },
      {
        number: 5,
        title: "S/P/E Integration",
        description: "Pathway scores contribute 40% to drug efficacy prediction",
        visual: null,
      },
    ],
    layout: "horizontal",
  },

  // Value Proposition
  value: {
    title: "THE MOAT: Pathway-Level Drug Efficacy Prediction",
    question: "How do I know which drugs target the pathways disrupted by my patient's mutations?",
    genericResponse: "Review drug mechanisms manually. No systematic pathway matching.",
    ourResponse: "Your patient's DDR pathway disruption (0.85) matches PARP inhibitors (DDR: 0.9). Efficacy score: 0.89 (40% from pathway, 30% sequence, 30% evidence).",
    comparison: [
      {
        feature: "Pathway Aggregation",
        generic: "Manual pathway review",
        ourSystem: "Automated weighted aggregation",
      },
      {
        feature: "Gene Mapping",
        generic: "No systematic mapping",
        ourSystem: "Transparent gene-to-pathway mappings",
      },
      {
        feature: "Drug Alignment",
        generic: "Manual drug-pathway matching",
        ourSystem: "Pre-configured panels with pathway weights",
      },
      {
        feature: "Efficacy Prediction",
        generic: "No pathway component",
        ourSystem: "40% weight in S/P/E framework",
      },
    ],
  },

  // Integration Section
  integration: {
    title: "How Pathway Analysis Fits Into Complete Care",
    connections: [
      {
        from: "Pathway Analysis",
        to: "S/P/E Framework",
        relationship: "Pathway component contributes 40% weight to drug efficacy scoring",
        visual: null,
      },
      {
        from: "Pathway Analysis",
        to: "Synthetic Lethality",
        relationship: "Pathway disruption data feeds into double-hit vulnerability detection",
        visual: null,
      },
      {
        from: "Pathway Analysis",
        to: "Drug Ranking",
        relationship: "Pathway scores enable mechanism-based therapy selection",
        visual: null,
      },
    ],
    carePlanContext: [
      {
        step: 1,
        component: "Molecular Profile",
        howThisHelps: "Pathway disruption scores identify affected biological pathways",
      },
      {
        step: 2,
        component: "Therapeutic Options",
        howThisHelps: "Pathway-drug alignment enables mechanism-based drug ranking",
      },
      {
        step: 3,
        component: "Synthetic Lethality",
        howThisHelps: "Pathway data identifies double-hit vulnerabilities",
      },
    ],
  },

  // Example Section
  example: {
    title: "Real Example: Ovarian Cancer with BRCA1 Mutations",
    patient: {
      name: "Patient OV-001",
      diagnosis: "High-grade serous ovarian cancer",
      keyMutations: ["BRCA1:c.5266dupC", "BRCA1:c.3113G>A"],
      pathwayDisruptions: ["DDR: 0.85", "TP53: 0.42"],
    },
    solution: [
      {
        step: 1,
        title: "Pathway Aggregation",
        description: "BRCA1 mutations → DDR pathway disruption score: 0.85",
        result: "DDR pathway identified as primary disruption",
      },
      {
        step: 2,
        title: "Drug-to-Pathway Alignment",
        description: "PARP inhibitors → DDR pathway: 0.9 weight",
        result: "PARP inhibitors match DDR pathway disruption",
      },
      {
        step: 3,
        title: "S/P/E Integration",
        description: "Pathway (0.85 × 0.4) + Sequence (0.82 × 0.3) + Evidence (0.88 × 0.3) = 0.85",
        result: "Efficacy score: 0.85 (High confidence)",
      },
      {
        step: 4,
        title: "Therapy Recommendation",
        description: "Olaparib (PARP inhibitor) ranked #1 with 0.85 efficacy score",
        result: "PARP inhibitor recommended as first-line therapy",
      },
    ],
    outcome: [
      {
        metric: "Pathway Identification",
        value: "DDR pathway disruption (0.85)",
        impact: "Clear pathway-level signal from variant aggregation",
      },
      {
        metric: "Drug Matching",
        value: "PARP inhibitors → DDR (0.9)",
        impact: "Mechanism-based drug selection",
      },
      {
        metric: "Efficacy Prediction",
        value: "0.85 (High confidence)",
        impact: "40% contribution from pathway component",
      },
    ],
  },

  // Layout - Aligned with pathway-data.ts structure
  layout: {
    sidebar: {
      sections: [
        { id: 'hero', title: 'The Question', subsections: [] },
        { id: 'problem', title: 'The Problem', subsections: [] },
        { id: 'solution', title: 'The Solution', subsections: [] },
        { id: 'value-props', title: 'Value Propositions', subsections: [
          'For Clinicians',
          'For Researchers'
        ] },
        { id: 'how-it-works', title: 'How It Works', subsections: [] },
        { id: 'observed-outcomes', title: 'Observed Outcomes', subsections: [
          'Pathway Aggregation Working',
          'Gene-to-Pathway Mapping',
          'Disease-Specific Panels',
          'Synthetic Lethality Integration'
        ] },
        { id: 'key-capabilities', title: 'Core Capabilities', subsections: [
          'Pathway Aggregation',
          'Gene-to-Pathway Mapping',
          'Drug-to-Pathway Mapping'
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
  sourceData: pathwayData,
};

