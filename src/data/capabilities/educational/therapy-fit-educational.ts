/**
 * Therapy Fit Educational Data
 * Manually extracted and structured from therapy-fit-data.ts
 * Aligned with therapy-fit-data.ts structure for sidebar navigation
 */

import { EducationalCapabilityPageData } from '@/types/educational-capability';
import { therapyFitData } from '@/data/copilots/therapy-fit-data';

export const therapyFitEducationalData: EducationalCapabilityPageData = {
  // Hero Section - CSI Level 2 Focused
  hero: {
    question: "What platinum/PARPi/DDR therapy should we give next?",
    genericAnswer: "Generic drug ranking based on mutation lists. No mechanism understanding. No transparent reasoning.",
    ourAnswer: "Top 5 drug recommendations ranked by S/P/E framework. Mechanism-based matching with transparent scoring. Validated AUROC 0.70 (n=149).",
    visualComparison: {
      before: "Mutation list → Generic drug suggestions",
      after: "CSI score + Genomic profile → S/P/E scoring → Ranked drug recommendations with mechanism explanation",
    },
  },

  // Problem Section - CSI Level 2 Focused
  problem: {
    title: "The Problem: Generic Drug Ranking for DDR-Targeted Therapy",
    narrative: `For patients with advanced, heavily pretreated cancer, clinicians need to know: **What platinum/PARPi/DDR therapy should we give next?** But generic drug ranking fails for DDR-targeted treatments.

**The core challenges:**

- **No mechanism understanding** - Generic mutation lists don't explain why a drug fits. For DDR-targeted therapy, you need pathway-level understanding of DNA repair mechanisms.

- **No transparent reasoning** - Without clear scoring, it's impossible to understand why PARPi ranks higher than platinum for a specific patient. Manual literature review takes 2-3 days per case.

- **No clinical trial matching** - Missing mechanism-based trial matching means patients miss opportunities for DDR-targeted combination therapies.

- **No pathway analysis** - DDR biology requires understanding of HRD status, BRCA pathway, and DNA repair mechanisms. Generic ranking misses this.

**The impact:**
- 70% of relevant DDR-targeted therapies missed because pathway-level signals aren't visible
- 60% variability in treatment decisions across different oncologists
- 2-3 days per case for manual drug mechanism review
- No systematic connection between CSI score, genomic profile, and DDR-targeted drug mechanisms`,
    visualMetaphor: "Like trying to choose the right DDR-targeted therapy from a pile of options without understanding DNA repair mechanisms",
    painPoints: [
      {
        title: "No Mechanism Understanding",
        description: "Generic mutation lists don't explain why a DDR-targeted drug fits. Need pathway-level understanding.",
        icon: "AlertTriangle",
      },
      {
        title: "No Transparent Reasoning",
        description: "No clear scoring to understand why PARPi ranks higher than platinum for a specific patient",
        icon: "Target",
      },
      {
        title: "No Clinical Trial Matching",
        description: "Missing mechanism-based trial matching means patients miss DDR-targeted combination opportunities",
        icon: "Clock",
      },
      {
        title: "No Pathway Analysis",
        description: "DDR biology requires HRD status, BRCA pathway understanding. Generic ranking misses this.",
        icon: "AlertCircle",
      },
    ],
  },

  // Solution Section - CSI Level 2 Focused
  solution: {
    title: "The Solution: CSI-Powered Drug Recommendations with S/P/E Framework",
    narrative: `Once you have CSI score, unlock drug recommendations and clinical trial matching. S/P/E framework (validated AUROC 0.70, n=149) ranks therapies by mechanism fit for DDR-targeted treatments.

**How it works:**

1. **CSI Integration** - Start with CSI score from Level 1. Add genomic test results (NGS) to unlock drug recommendations.

2. **S/P/E Framework** - Ranks DDR-targeted drugs using Sequence (Evo2 disruption, 30% weight), Pathway (gene-to-pathway alignment, 40% weight), and Evidence (literature + ClinVar, 30% weight). Formula: efficacy_score = 0.3×S + 0.4×P + 0.3×E + ClinVar_prior.

3. **DDR-Targeted Ranking** - Top 5 drug recommendations ranked by match score. Mechanism-based matching with transparent S/P/E scoring for platinum, PARPi, and DDR-targeted therapies.

4. **Clinical Trial Matching** - Clinical trials you qualify for based on mechanism fit. Same-day trial site calls with action-ready packets.

**The CSI Level 2 MOAT (What We Just Built):**
- ✅ CSI-Powered → Uses CSI score to inform drug recommendations
- ✅ S/P/E Framework → Knows how sequence, pathway, and evidence contribute to DDR-targeted drug efficacy
- ✅ Mechanism-Based Matching → Understands DNA repair mechanisms (HRD, BRCA pathway)
- ✅ Clinical Trial Integration → Matches patients to DDR-targeted combination trials

**This is the first system that transforms CSI score + genomic profile into ranked DDR-targeted drug recommendations with transparent S/P/E scoring.**`,
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
        title: "CSI Score Input",
        description: "Start with CSI score from Level 1. Add genomic test results (NGS) to unlock drug recommendations",
      },
      {
        number: 2,
        title: "S/P/E Calculation",
        description: "Sequence (30%) + Pathway (40%) + Evidence (30%) for DDR-targeted therapy ranking",
      },
      {
        number: 3,
        title: "Drug Ranking",
        description: "Top 5 drugs ranked by match score. Mechanism-based matching for platinum, PARPi, DDR-targeted therapies",
      },
      {
        number: 4,
        title: "Trial Matching",
        description: "Clinical trials you qualify for based on mechanism fit. Same-day trial site calls",
      },
    ],
  },

  // How It Works Section - CSI Level 2 Focused
  howItWorks: {
    title: "How CSI-Powered Drug Recommendations Work (Four Steps)",
    steps: [
      {
        number: 1,
        title: "Take CSI Score from Level 1",
        description: "Start with CSI score (0-100) that predicts 6-month PFS probability for next DDR-targeted therapy. Validated AUROC 0.714 (TOPACIO trial).",
        details: [
          { label: "Input", value: "CSI score from Level 1" },
          { label: "Validation", value: "AUROC 0.714 (TOPACIO trial, p=0.023)" },
          { label: "Output", value: "CSI score (0-100) with 6-month PFS probability" },
        ],
      },
      {
        number: 2,
        title: "Add Genomic Test Results (NGS)",
        description: "Add genomic test results (NGS) to unlock drug recommendations. Genomic profile includes mutations, HRD status, BRCA pathway status.",
        details: [
          { label: "Input", value: "Genomic test results (NGS)" },
          { label: "Includes", value: "Mutations, HRD status, BRCA pathway" },
          { label: "Output", value: "Genomic profile ready for S/P/E calculation" },
        ],
      },
      {
        number: 3,
        title: "Calculate S/P/E Scores",
        description: "Sequence (30%) + Pathway (40%) + Evidence (30%) for DDR-targeted therapy ranking. Mechanism-based matching with transparent scoring.",
        details: [
          { label: "Method", value: "S/P/E framework: 30% Sequence, 40% Pathway, 30% Evidence" },
          { label: "Validation", value: "AUROC 0.70 (n=149)" },
          { label: "Output", value: "S/P/E scores for each DDR-targeted drug" },
        ],
      },
      {
        number: 4,
        title: "Rank Drugs and Match Clinical Trials",
        description: "Top 5 drugs ranked by match score. Clinical trials you qualify for based on mechanism fit. Same-day trial site calls.",
        details: [
          { label: "Formula", value: "efficacy_score = 0.3×S + 0.4×P + 0.3×E + ClinVar_prior" },
          { label: "Output", value: "Ranked drug list + Clinical trial matches" },
          { label: "Validation", value: "Retrospective-tested (n=149)" },
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

  // Integration Section - CSI Level 2 Focused
  integration: {
    title: "How Level 2 Unlocks Level 3: Resistance Prediction",
    connections: [
      {
        from: "Level 1: CSI Score",
        to: "Level 2: Drug Recommendations",
        relationship: "CSI score (0-100) informs drug recommendations. Add genomic data to unlock S/P/E ranking.",
        visual: null,
      },
      {
        from: "Level 2: Drug Recommendations",
        to: "Level 3: Resistance Prediction",
        relationship: "Once you have drug recommendations, add treatment history to unlock resistance prediction",
        visual: null,
      },
      {
        from: "Level 2: S/P/E Framework",
        to: "Level 3: Post-Treatment Profiling",
        relationship: "S/P/E framework enables post-treatment pathway profiling for resistance prediction",
        visual: null,
      },
    ],
    carePlanContext: [
      {
        step: 1,
        component: "Level 1: CSI Score",
        howThisHelps: "CSI score (0-100) predicts 6-month PFS probability for next DDR-targeted therapy",
      },
      {
        step: 2,
        component: "Level 2: Drug Recommendations",
        howThisHelps: "S/P/E framework ranks DDR-targeted drugs by mechanism fit. Clinical trial matching.",
      },
      {
        step: 3,
        component: "Level 3: Resistance Prediction",
        howThisHelps: "Add treatment history to predict when chemo might stop working. Early intervention.",
      },
    ],
  },

  // Example Section - CSI Level 2 Focused
  example: {
    title: "Real Example: Sarah, 58, Ovarian Cancer - Level 2 Unlock",
    patient: {
      name: "Sarah",
      profile: ["58 years old", "Ovarian cancer, 2nd-line", "CSI: 72/100 (from Level 1)", "BRCA1 mutation, HRD+"],
      question: "What platinum/PARPi/DDR therapy should we give next?",
    },
    solution: [
      {
        step: 1,
        title: "CSI Score Input",
        description: "CSI: 72/100 (from Level 1). Predicts 6-month PFS probability for next DDR-targeted therapy.",
        result: "CSI score: 72/100 → High probability of 6-month PFS",
      },
      {
        step: 2,
        title: "Genomic Profile",
        description: "BRCA1 mutation, HRD+ → DNA repair pathway disruption. Genomic test results added.",
        result: "Genomic profile: BRCA1 mutation, HRD+ → Ready for S/P/E calculation",
      },
      {
        step: 3,
        title: "S/P/E Calculation",
        description: "Sequence: 0.82 (BRCA1 disruption). Pathway: 0.85 (HRD+ → PARPi match). Evidence: 0.88 (ClinVar-Strong).",
        result: "S/P/E score: 0.3×0.82 + 0.4×0.85 + 0.3×0.88 = 0.85",
      },
      {
        step: 4,
        title: "Drug Ranking",
        description: "PARPi ranked #1 with 0.85 efficacy. Top 5 drugs ranked by match score. Clinical trials: 3 matches.",
        result: "PARPi ranked #1 with 0.85 efficacy, 0.85 confidence (Supported tier). 3 clinical trial matches.",
      },
    ],
    outcome: [
      {
        metric: "Drug Ranking",
        value: "PARPi #1",
        impact: "Clear mechanism-based recommendation for DDR-targeted therapy",
      },
      {
        metric: "Efficacy Score",
        value: "0.85 (High confidence)",
        impact: "30% sequence, 40% pathway, 30% evidence",
      },
      {
        metric: "Clinical Trials",
        value: "3 matches",
        impact: "Mechanism-based trial matching for DDR-targeted combinations",
      },
    ],
  },

  // Concepts Section (required by type)
  concepts: {
    layout: 'accordion' as const,
    concepts: [],
  },

  // Layout - Grid layout without sidebar (like prevent-toxicity)
  layout: {
    sidebar: {
      sections: [], // Empty sections = no sidebar, use grid layout
    },
    progress: {
      current: 1,
      total: 9,
      readingTime: 12,
    },
  },

  // Source data
  sourceData: therapyFitData,
};

