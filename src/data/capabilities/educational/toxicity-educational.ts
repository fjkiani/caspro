/**
 * Toxicity Educational Data
 * Manually extracted and structured from ADVANCED_CARE_PLAN_TOXCITY.md
 * This will be replaced by automated parsing once MOAT doc parser is complete
 */

import { EducationalCapabilityPageData } from '@/types/educational-capability';
import { toxicityData } from '@/data/copilots/toxicity-data';

export const toxicityEducationalData: EducationalCapabilityPageData = {
  // Hero Section - Aligned with toxicity-data.ts (removed "generic" label)
  hero: {
    question: "What can I do to help myself during treatment?",
    genericAnswer: "Eat healthy. Stay hydrated. Avoid grapefruit.",
    ourAnswer: "Your carboplatin + BRCA1 = DNA repair stress. NAC helps. Here's when.",
    visualComparison: {
      before: "Eat healthy. Stay hydrated.",
      after: "Your carboplatin + BRCA1 = DNA repair stress. NAC helps. Here's when.",
    },
  },

  // Problem Section
  problem: {
    title: "The Problem: Germline Variants Cause Severe Drug Toxicity",
    narrative: `Germline variants can cause severe drug toxicity. Patients with pharmacogene variants face life-threatening reactions when prescribed certain drugs.

**The core challenges:**

- **Pharmacogene variants affect drug breakdown** - Variants in DPYD, TPMT, UGT1A1, and other drug-metabolizing enzymes can cause drugs to accumulate to toxic levels. For example, DPYD variants cause 5-10% mortality risk with 5-FU if not detected.

- **Drug MoA overlaps with patient's germline pathway vulnerabilities** - When a drug's mechanism of action (like platinum agents damaging DNA) overlaps with a patient's germline pathway vulnerabilities (like BRCA1 mutations affecting DNA repair), the toxicity risk multiplies.

- **Need mechanism-based food recommendations** - Generic "eat healthy" advice doesn't help. Patients need specific foods that support the exact pathways their drugs stress. For example, NAC (N-acetylcysteine) specifically supports DNA repair pathways stressed by platinum agents.

**Until now, there was no system that could:**
- Screen for pharmacogene variants before prescribing
- Compute pathway overlap between drug MoA and patient variants
- Recommend pathway-specific mitigating foods with timing and dosage

**Until now.**`,
    visualMetaphor: "Like prescribing drugs without knowing if the patient can metabolize them",
    painPoints: [
      {
        title: "Pharmacogene Variants Undetected",
        description: "DPYD, TPMT, UGT1A1 variants cause severe toxicity but aren't routinely screened",
        icon: "AlertTriangle",
      },
      {
        title: "Pathway Overlap Unknown",
        description: "Drug MoA overlaps with patient's germline vulnerabilities, multiplying risk",
        icon: "X",
      },
      {
        title: "Generic Nutrition Advice",
        description: "Patients get generic 'eat healthy' instead of pathway-specific foods",
        icon: "AlertTriangle",
      },
    ],
  },

  // Solution Section
  solution: {
    title: "The Solution: Toxicity-Aware Nutrition",
    narrative: `We've built the first system that prevents drug toxicity by identifying germline risks and recommending protective foods.

**How it works:**

1. **Pharmacogene Detection** - Screens 20+ drug-metabolizing enzymes (DPYD, TPMT, UGT1A1, CYP2D6) for variants that affect drug breakdown. High-impact genes get risk weight 0.4.

2. **Pathway Overlap Analysis** - Maps drug MoA to toxic pathways (DNA repair, inflammation, cardiometabolic) and computes overlap with patient's germline variants. For example, platinum → DNA repair: 0.9 overlap.

3. **Mitigating Foods Mapping** - Connects pathway overlap to specific foods:
   - DNA repair → NAC, Vitamin D, Folate (post-chemo)
   - Inflammation → Omega-3, Curcumin, EGCG (post-infusion)
   - Cardiometabolic → CoQ10, L-Carnitine, Magnesium (continuous)

4. **Personalized Timing & Dosage** - Recommends when to take supplements (post-infusion for NAC, continuous for Vitamin D, between meals for Curcumin) with specific dosages.

**The Patient MOAT (What We Just Built):**
- ✅ Toxicity pathway detection → Knows which biological pathways your drug stresses
- ✅ Mitigating foods mapping → Knows which foods support those pathways
- ✅ Personalized timing → Knows when to take supplements (during vs. after infusion)

**This is the first system that connects toxicity detection to precision nutrition.**`,
    keyFeatures: [
      {
        title: "Toxicity Pathway Detection",
        description: "Identifies which biological pathways your drug stresses",
        icon: "Activity",
        status: "implemented",
      },
      {
        title: "Mitigating Foods Mapping",
        description: "Knows which foods support those pathways",
        icon: "Apple",
        status: "implemented",
      },
      {
        title: "Personalized Timing",
        description: "Knows when to take supplements (during vs. after infusion)",
        icon: "Clock",
        status: "implemented",
      },
    ],
    visualFlow: [
      {
        number: 1,
        title: "Screen for Pharmacogene Variants",
        description: "Test patient's genetics for variants in drug-metabolizing enzymes",
      },
      {
        number: 2,
        title: "Predict Toxicity Risk",
        description: "Identify which toxicity pathway is at risk",
      },
      {
        number: 3,
        title: "Recommend Actions",
        description: "Dose adjustments or alternative drugs",
      },
      {
        number: 4,
        title: "Recommend Mitigating Foods",
        description: "Pathway-specific foods with timing and dosage",
      },
    ],
  },

  // How It Works Section
  howItWorks: {
    title: "How Toxicity Detection Works (Four Steps)",
    steps: [
      {
        number: 1,
        title: "Screen for Pharmacogene Variants",
        description: "Test patient's genetics for variants in drug-metabolizing enzymes. Check: DPYD, TPMT, NUDT15, UGT1A1, CYP2D6",
        details: [
          { label: "Genes Screened", value: "20+ pharmacogenes" },
          { label: "High-Impact", value: "DPYD, TPMT, UGT1A1" },
          { label: "Risk Weight", value: "0.4 for high-impact genes" },
        ],
      },
      {
        number: 2,
        title: "Predict Toxicity Risk",
        description: "Assess risk level based on variant type and drug combination",
        details: [
          { label: "DPYD variant + 5-FU", value: "HIGH (5-10% mortality)" },
          { label: "TPMT variant + Thiopurines", value: "HIGH (severe toxicity)" },
          { label: "UGT1A1*28 + Irinotecan", value: "MODERATE (diarrhea)" },
        ],
      },
      {
        number: 3,
        title: "Recommend Actions",
        description: "Provide specific guidance based on risk level",
        details: [
          { label: "High Risk", value: "Avoid drug entirely, use alternative" },
          { label: "Moderate Risk", value: "Reduce dose by 50-90%" },
          { label: "Low Risk", value: "Proceed with standard dose" },
        ],
      },
      {
        number: 4,
        title: "Recommend Mitigating Foods (THE MOAT)",
        description: "Connect toxicity pathways to protective foods with personalized timing",
        details: [
          { label: "Platinum → DNA Repair", value: "NAC, Vitamin D, Folate (post-chemo)" },
          { label: "Anthracycline → Cardiotoxicity", value: "CoQ10, L-Carnitine, Magnesium (continuous)" },
          { label: "Checkpoint Inhibitor → Inflammation", value: "Omega-3, Curcumin, EGCG (post-infusion)" },
        ],
      },
    ],
    interactive: true,
  },

  // Value Proposition Section - REMOVED per user request
  // value: {
  //   title: "THE MOAT: What No Competitor Has",
  //   question: "What should I eat during carboplatin treatment?",
  //   genericResponse: `"Eat healthy. Stay hydrated. Avoid grapefruit."`,
  //   ourResponse: `"You're on carboplatin (DNA repair stress) with BRCA1 (sensitive).
  //  NAC specifically helps - it boosts glutathione which supports DNA repair.
  //  Take 600mg twice daily AFTER infusion, not during.
  //  Here's why this matters for YOU."`,
  //   comparison: [
  //     {
  //       feature: "Toxicity Detection",
  //       generic: "❌ None",
  //       ourSystem: "✅ DPYD/TPMT/UGT1A1/CYP2D6 screening",
  //     },
  //     {
  //       feature: "Drug-Specific Nutrition",
  //       generic: "❌ Generic",
  //       ourSystem: "✅ 'NAC for carboplatin + BRCA1'",
  //     },
  //     {
  //       feature: "Timing Guidance",
  //       generic: "❌ None",
  //       ourSystem: "✅ 'Post-chemo, not during'",
  //     },
  //     {
  //       feature: "Mechanism Explanation",
  //       generic: "❌ None",
  //       ourSystem: "✅ 'Glutathione supports DNA repair'",
  //     },
  //     {
  //       feature: "Germline Awareness",
  //       generic: "❌ None",
  //       ourSystem: "✅ 'Your BRCA1 increases stress'",
  //     },
  //   ],
  // },

  // Integration Section - REMOVED per user request
  // integration: {
  //   title: "How This Fits Into Complete Care Plan",
  //   connections: [
  //     {
  //       from: "Toxicity Detection",
  //       to: "Food Validation",
  //       relationship: "Connects toxicity pathways to protective foods",
  //     },
  //     {
  //       from: "Pharmacogene Screening",
  //       to: "Drug Recommendations",
  //       relationship: "Flags variants before prescribing to prevent toxicity",
  //     },
  //     {
  //       from: "Pathway Overlap Analysis",
  //       to: "Mitigating Foods",
  //       relationship: "Maps drug MoA to toxic pathways and recommends pathway-specific foods",
  //     },
  //   ],
  //   carePlanContext: [
  //     {
  //       step: 6,
  //       component: "Risks/Toxicity",
  //       howThisHelps: "Screens for pharmacogene variants and drug interactions before prescribing",
  //     },
  //     {
  //       step: 7,
  //       component: "Food Validation",
  //       howThisHelps: "Validates foods with drug and germline context, recommends timing",
  //     },
  //   ],
  // },

  // Concepts
  concepts: {
    concepts: [
      {
        term: "Pharmacogene Detection",
        definition: "Identifies variants in drug-metabolizing enzymes (DPYD, TPMT, UGT1A1, CYP2D6) that affect drug breakdown. High-impact genes get risk weight 0.4.",
        example: "DPYD variant causes 5-10% mortality risk with 5-FU if not detected",
        related: ["Pathway Overlap Analysis", "Mitigating Foods"],
      },
      {
        term: "Pathway Overlap Analysis",
        definition: "Computes overlap between patient germline variants and drug MoA toxic pathways. Maps 15+ drug MoAs to 3 toxic pathways (DNA repair, inflammation, cardiometabolic).",
        example: "Platinum → DNA repair: 0.9 overlap, Anthracycline → cardiometabolic: 0.9 overlap",
        related: ["Pharmacogene Detection", "Mitigating Foods"],
      },
      {
        term: "Mitigating Foods",
        definition: "Pathway-specific foods (NAC for DNA repair, Omega-3 for inflammation, CoQ10 for cardiometabolic) with timing, dosage, and LLM explanations.",
        example: "NAC post-platinum → Specifically mitigates carboplatin DNA repair stress",
        related: ["Pathway Overlap Analysis", "Pharmacogene Detection"],
      },
      {
        term: "Timing & Dosage",
        definition: "Personalized guidance on when to take supplements relative to chemotherapy. Post-infusion (NAC), continuous (Vitamin D), between meals (Curcumin).",
        example: "Take NAC after platinum, not during - prevents interference with chemotherapy",
        related: ["Mitigating Foods"],
      },
    ],
    layout: "grid",
    interactive: true,
  },

  // Process - REMOVED per user request
  // process: {
  //   title: "The Complete Toxicity Assessment Flow",
  //   steps: [
  //     {
  //       number: 1,
  //       title: "Pharmacogene Screening",
  //       description: "Screen 20+ drug-metabolizing enzymes for variants",
  //     },
  //     {
  //       number: 2,
  //       title: "Pathway Overlap Computation",
  //       description: "Map drug MoA to toxic pathways and compute overlap with patient variants",
  //     },
  //     {
  //       number: 3,
  //       title: "Risk Assessment",
  //       description: "Calculate toxicity risk based on pharmacogene variants and pathway overlap",
  //     },
  //     {
  //       number: 4,
  //       title: "Food Mapping",
  //       description: "Map pathway overlap to mitigating foods with timing and dosage",
  //     },
  //     {
  //       number: 5,
  //       title: "LLM Explanation",
  //       description: "Generate personalized explanations for why foods mitigate toxicity",
  //     },
  //   ],
  //   layout: "horizontal",
  //   interactive: true,
  // },

  // Example - REMOVED per user request
  // example: {
  //   title: "A Real Patient Story: Ayesha on Carboplatin",
  //   patient: {
  //     name: "Ayesha",
  //     profile: [
  //       "Stage IVB Ovarian Cancer",
  //       "HRD-high (somatic): Score 52 → PARP approved",
  //       "MSI-H: Eligible for IO combos",
  //       "Germline-negative: Sporadic pathway activated",
  //       "On carboplatin treatment",
  //     ],
  //     question: "What can I eat to help myself during carboplatin treatment?",
  //   },
  //   solution: [
  //     {
  //       step: 1,
  //       title: "Pharmacogene Screening",
  //       description: "Screened for DPYD, TPMT, UGT1A1 variants. No high-risk variants detected.",
  //       result: "Safe to proceed with carboplatin",
  //     },
  //     {
  //       step: 2,
  //       title: "Pathway Overlap Analysis",
  //       description: "Carboplatin → DNA repair pathway stressed (score: 1.0). BRCA1 germline variant increases DNA repair pathway stress.",
  //       result: "DNA repair pathway identified as at-risk",
  //     },
  //     {
  //       step: 3,
  //       title: "Mitigating Foods Recommendation",
  //       description: "NAC (glutathione precursor) specifically helps - supports DNA repair enzymes. Vitamin D and Folate also recommended.",
  //       result: "NAC, Vitamin D, Folate recommended",
  //     },
  //     {
  //       step: 4,
  //       title: "Timing Guidance",
  //       description: "Take NAC post-chemo (not during infusion). Continuous Vitamin D supplementation.",
  //       result: "Personalized timing provided",
  //     },
  //   ],
  //   outcome: [
  //     {
  //       metric: "Toxicity Prevention",
  //       value: "100%",
  //       impact: "No severe toxicity events",
  //     },
  //     {
  //       metric: "Personalization",
  //       value: "Drug + Germline specific",
  //       impact: "100% personalized recommendations",
  //     },
  //     {
  //       metric: "Patient Adherence",
  //       value: "Improved",
  //       impact: "Clear mechanism explanation improves adherence",
  //     },
  //   ],
  // },

  // Layout - Aligned with toxicity-data.ts structure
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
          'Pharmacogene Detection',
          'Pathway Overlap Analysis',
          'Mitigating Foods',
          'LLM Explanations'
        ] },
        { id: 'key-capabilities', title: 'Core Capabilities', subsections: [
          'Pharmacogene Detection',
          'Pathway Overlap Analysis',
          'Mitigating Foods'
        ] },
        // { id: 'process', title: 'Process Flow', subsections: [] }, // REMOVED
        // { id: 'value', title: 'The MOAT', subsections: [] }, // REMOVED
        // { id: 'example', title: 'Real Example', subsections: [] }, // REMOVED per user request
        // { id: 'integration', title: 'Integration', subsections: [] }, // REMOVED per user request
      ],
    },
    progress: {
      current: 1,
      total: 9, // Reduced from 11 (removed process and value sections)
      readingTime: 12, // Reduced from 15
    },
  },

  // Source data
  sourceData: toxicityData,
};

