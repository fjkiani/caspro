/**
 * Toxicity Educational Data
 * Manually extracted and structured from ADVANCED_CARE_PLAN_TOXCITY.md
 * This will be replaced by automated parsing once MOAT doc parser is complete
 */

import { EducationalCapabilityPageData } from '@/types/educational-capability';
import { toxicityData } from '@/data/copilots/toxicity-data';

export const toxicityEducationalData: EducationalCapabilityPageData = {
  // Hero Section
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
    title: "The Problem: Fragmented Care in a Complex World",
    narrative: `Cancer treatment today is like navigating a maze blindfolded. You have:

- **Drug recommendations** that tell you what might work
- **Clinical trial matching** that finds studies you might qualify for
- **Food validation** that checks if supplements are safe

But these systems don't talk to each other. They're isolated islands of information.

**The critical gap:** When a patient asks *"What should I eat during carboplatin treatment?"*, the system can't connect:
- The drug's mechanism of action (how it works)
- The patient's genetic profile (how they metabolize drugs)
- The toxicity pathways (what gets stressed)
- The protective foods (what actually helps)

**Until now.**`,
    visualMetaphor: "Like navigating a maze blindfolded",
    painPoints: [
      {
        title: "Isolated Systems",
        description: "Drug recommendations, trial matching, and food validation don't communicate",
        icon: "AlertTriangle",
      },
      {
        title: "Generic Advice",
        description: "Patients get generic 'eat healthy' advice instead of personalized nutrition",
        icon: "X",
      },
      {
        title: "Reactive Approach",
        description: "Toxicity is managed after it happens, not prevented before",
        icon: "AlertTriangle",
      },
    ],
  },

  // Solution Section
  solution: {
    title: "The Solution: A Connected, Adaptive Care System",
    narrative: `We're building what we call a "GPS navigation system for cancer treatment." It doesn't just tell you where to go—it:

1. **Anticipates resistance** - Predicts what might go wrong and prepares backup plans
2. **Recommends combinations** - Not just single drugs, but smart drug pairs that attack cancer from multiple angles
3. **Monitors continuously** - Tells doctors when to test, re-biopsy, switch therapies
4. **Prevents toxicity** - Flags genetic variants that cause severe drug reactions BEFORE prescribing
5. **Adapts to progression** - Generates new plans when cancer evolves

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

  // Value Proposition Section
  value: {
    title: "THE MOAT: What No Competitor Has",
    question: "What should I eat during carboplatin treatment?",
    genericResponse: `"Eat healthy. Stay hydrated. Avoid grapefruit."`,
    ourResponse: `"You're on carboplatin (DNA repair stress) with BRCA1 (sensitive).
 NAC specifically helps - it boosts glutathione which supports DNA repair.
 Take 600mg twice daily AFTER infusion, not during.
 Here's why this matters for YOU."`,
    comparison: [
      {
        feature: "Toxicity Detection",
        generic: "❌ None",
        ourSystem: "✅ DPYD/TPMT/UGT1A1/CYP2D6 screening",
      },
      {
        feature: "Drug-Specific Nutrition",
        generic: "❌ Generic",
        ourSystem: "✅ 'NAC for carboplatin + BRCA1'",
      },
      {
        feature: "Timing Guidance",
        generic: "❌ None",
        ourSystem: "✅ 'Post-chemo, not during'",
      },
      {
        feature: "Mechanism Explanation",
        generic: "❌ None",
        ourSystem: "✅ 'Glutathione supports DNA repair'",
      },
      {
        feature: "Germline Awareness",
        generic: "❌ None",
        ourSystem: "✅ 'Your BRCA1 increases stress'",
      },
    ],
  },

  // Integration Section
  integration: {
    title: "How This Fits Into Complete Care Plan",
    connections: [
      {
        from: "Toxicity Detection",
        to: "Food Validation",
        relationship: "Connects toxicity pathways to protective foods",
      },
      {
        from: "Pharmacogene Screening",
        to: "Drug Recommendations",
        relationship: "Flags variants before prescribing to prevent toxicity",
      },
      {
        from: "Pathway Overlap Analysis",
        to: "Mitigating Foods",
        relationship: "Maps drug MoA to toxic pathways and recommends pathway-specific foods",
      },
    ],
    carePlanContext: [
      {
        step: 6,
        component: "Risks/Toxicity",
        howThisHelps: "Screens for pharmacogene variants and drug interactions before prescribing",
      },
      {
        step: 7,
        component: "Food Validation",
        howThisHelps: "Validates foods with drug and germline context, recommends timing",
      },
    ],
  },

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

  // Process
  process: {
    title: "The Complete Toxicity Assessment Flow",
    steps: [
      {
        number: 1,
        title: "Pharmacogene Screening",
        description: "Screen 20+ drug-metabolizing enzymes for variants",
      },
      {
        number: 2,
        title: "Pathway Overlap Computation",
        description: "Map drug MoA to toxic pathways and compute overlap with patient variants",
      },
      {
        number: 3,
        title: "Risk Assessment",
        description: "Calculate toxicity risk based on pharmacogene variants and pathway overlap",
      },
      {
        number: 4,
        title: "Food Mapping",
        description: "Map pathway overlap to mitigating foods with timing and dosage",
      },
      {
        number: 5,
        title: "LLM Explanation",
        description: "Generate personalized explanations for why foods mitigate toxicity",
      },
    ],
    layout: "horizontal",
    interactive: true,
  },

  // Example
  example: {
    title: "A Real Patient Story: Ayesha on Carboplatin",
    patient: {
      name: "Ayesha",
      profile: [
        "Stage IVB Ovarian Cancer",
        "HRD-high (somatic): Score 52 → PARP approved",
        "MSI-H: Eligible for IO combos",
        "Germline-negative: Sporadic pathway activated",
        "On carboplatin treatment",
      ],
      question: "What can I eat to help myself during carboplatin treatment?",
    },
    solution: [
      {
        step: 1,
        title: "Pharmacogene Screening",
        description: "Screened for DPYD, TPMT, UGT1A1 variants. No high-risk variants detected.",
        result: "Safe to proceed with carboplatin",
      },
      {
        step: 2,
        title: "Pathway Overlap Analysis",
        description: "Carboplatin → DNA repair pathway stressed (score: 1.0). BRCA1 germline variant increases DNA repair pathway stress.",
        result: "DNA repair pathway identified as at-risk",
      },
      {
        step: 3,
        title: "Mitigating Foods Recommendation",
        description: "NAC (glutathione precursor) specifically helps - supports DNA repair enzymes. Vitamin D and Folate also recommended.",
        result: "NAC, Vitamin D, Folate recommended",
      },
      {
        step: 4,
        title: "Timing Guidance",
        description: "Take NAC post-chemo (not during infusion). Continuous Vitamin D supplementation.",
        result: "Personalized timing provided",
      },
    ],
    outcome: [
      {
        metric: "Toxicity Prevention",
        value: "100%",
        impact: "No severe toxicity events",
      },
      {
        metric: "Personalization",
        value: "Drug + Germline specific",
        impact: "100% personalized recommendations",
      },
      {
        metric: "Patient Adherence",
        value: "Improved",
        impact: "Clear mechanism explanation improves adherence",
      },
    ],
  },

  // Layout
  layout: {
    sidebar: {
      sections: [
        { id: 'hero', title: 'The Question' },
        { id: 'problem', title: 'The Problem' },
        { id: 'solution', title: 'The Solution' },
        { id: 'how-it-works', title: 'How It Works' },
        { id: 'concepts', title: 'Key Concepts' },
        { id: 'process', title: 'Process Flow' },
        { id: 'value', title: 'The MOAT' },
        { id: 'example', title: 'Real Example' },
        { id: 'integration', title: 'Integration' },
      ],
    },
    progress: {
      current: 1,
      total: 9,
      readingTime: 15,
    },
  },

  // Source data
  sourceData: toxicityData,
};

