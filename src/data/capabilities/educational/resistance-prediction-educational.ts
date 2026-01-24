/**
 * Resistance Prediction Educational Data - CSI Level 3
 * Focus: Post-treatment pathway profiling predicts resistance 3-6 weeks before imaging
 */

import { EducationalCapabilityPageData } from '@/types/educational-capability';

export const resistancePredictionEducationalData: EducationalCapabilityPageData = {
  // Hero Section - CSI Level 3 Focused
  hero: {
    question: "When will chemo stop working? When should we retest?",
    genericAnswer: "Wait for imaging to show progression. By then, it's too late. Window to intervene is gone.",
    ourAnswer: "Post-treatment pathway profiling predicts resistance 3-6 weeks before imaging. Early warning signs with resistance timeline.",
    visualComparison: {
      before: "Imaging shows progression → Too late to intervene",
      after: "CA-125 plateau detected → CSI drops → Early intervention → Prevent treatment failure",
    },
  },

  // Problem Section - CSI Level 3 Focused
  problem: {
    title: "The Problem: Resistance Detected Too Late",
    narrative: `For patients with advanced, heavily pretreated cancer, clinicians need to know: **When will chemo stop working? When should we retest?** But resistance is detected too late - 3-6 months after it starts.

**The core challenges:**

- **Resistance detected too late** - By the time imaging shows progression, the window to intervene is gone. Treatment failure is already happening.

- **No early warning system** - CA-125 plateaus, CSI drops, but there's no systematic way to detect these early warning signs before imaging confirms progression.

- **No pathway evolution tracking** - Tumors evolve after treatment. Post-treatment pathway profiling captures this evolution, but it's not systematically tracked.

- **No resistance timeline** - Clinicians don't know when to retest CSI or when to consider alternative therapies. No clear timeline for resistance prediction.

**The impact:**
- 3-6 months delay in detecting resistance
- Window to intervene is gone by the time imaging confirms progression
- No early warning system for treatment failure
- No systematic tracking of tumor evolution after treatment`,
    visualMetaphor: "Like trying to stop a train after it's already left the station",
    painPoints: [
      {
        title: "Resistance Detected Too Late",
        description: "By the time imaging shows progression, the window to intervene is gone. Treatment failure is already happening.",
        icon: "AlertTriangle",
      },
      {
        title: "No Early Warning System",
        description: "CA-125 plateaus, CSI drops, but there's no systematic way to detect these early warning signs before imaging confirms progression.",
        icon: "Target",
      },
      {
        title: "No Pathway Evolution Tracking",
        description: "Tumors evolve after treatment. Post-treatment pathway profiling captures this evolution, but it's not systematically tracked.",
        icon: "Clock",
      },
      {
        title: "No Resistance Timeline",
        description: "Clinicians don't know when to retest CSI or when to consider alternative therapies. No clear timeline for resistance prediction.",
        icon: "AlertCircle",
      },
    ],
  },

  // Solution Section - CSI Level 3 Focused
  solution: {
    title: "The Solution: Post-Treatment Pathway Profiling for Early Resistance Detection",
    narrative: `Once you have CSI score and drug selection from Levels 1-2, add treatment history to unlock resistance prediction. Post-treatment pathway profiling (validated AUROC 0.714-0.750, n=11) predicts resistance 3-6 weeks before imaging.

**How it works:**

1. **Post-Treatment Pathway Profiling** - Analyze post-treatment tumor sample to capture pathway evolution. Track how tumor biology changes after treatment.

2. **Resistance Timeline Prediction** - Predict when chemo might stop working based on pathway evolution and treatment history. Timeline: "Resistance likely in Month 6-9".

3. **Early Warning Signs** - CA-125 plateau, CSI drops, new mutations detected. Early warning system alerts clinicians 3-6 weeks before imaging confirms progression.

4. **When to Retest** - Clear guidance on when to retest CSI and when to consider alternative therapies. Prevent treatment failure before it happens.

**The CSI Level 3 MOAT (What We Just Built):**
- ✅ Post-Treatment Profiling → Captures tumor evolution after treatment
- ✅ Early Warning System → Detects resistance 3-6 weeks before imaging
- ✅ Resistance Timeline → Predicts when chemo might stop working
- ✅ Pathway Evolution Tracking → Systematic tracking of tumor biology changes

**This is the first system that predicts resistance 3-6 weeks before imaging confirms progression.**`,
    keyFeatures: [
      {
        title: "Post-Treatment Profiling",
        description: "Analyze post-treatment tumor sample to capture pathway evolution and track tumor biology changes",
        icon: "Activity",
        status: "implemented",
      },
      {
        title: "Resistance Timeline",
        description: "Predict when chemo might stop working based on pathway evolution and treatment history",
        icon: "Clock",
        status: "implemented",
      },
      {
        title: "Early Warning Signs",
        description: "CA-125 plateau, CSI drops, new mutations detected. Alerts 3-6 weeks before imaging",
        icon: "AlertTriangle",
        status: "implemented",
      },
      {
        title: "When to Retest",
        description: "Clear guidance on when to retest CSI and when to consider alternative therapies",
        icon: "Target",
        status: "implemented",
      },
    ],
    visualFlow: [
      {
        number: 1,
        title: "CSI Score + Drug Selection",
        description: "Start with CSI score from Level 1 and drug selection from Level 2. Add treatment history (PFI, PTPI, TFI, PFS, OS)",
      },
      {
        number: 2,
        title: "Post-Treatment Pathway Profiling",
        description: "Analyze post-treatment tumor sample to capture pathway evolution. Track how tumor biology changes after treatment",
      },
      {
        number: 3,
        title: "Resistance Timeline",
        description: "Predict when chemo might stop working based on pathway evolution. Timeline: 'Resistance likely in Month 6-9'",
      },
      {
        number: 4,
        title: "Early Warning Signs",
        description: "CA-125 plateau, CSI drops, new mutations detected. Alerts 3-6 weeks before imaging confirms progression",
      },
    ],
  },

  // How It Works Section - CSI Level 3 Focused
  howItWorks: {
    title: "How Resistance Prediction Works (Four Steps)",
    steps: [
      {
        number: 1,
        title: "Take CSI Score and Drug Selection from Levels 1-2",
        description: "Start with CSI score (0-100) from Level 1 and drug selection from Level 2. Add treatment history (PFI, PTPI, TFI, PFS, OS).",
        details: [
          { label: "Input", value: "CSI score + Drug selection + Treatment history" },
          { label: "Treatment History", value: "PFI, PTPI, TFI, PFS, OS" },
          { label: "Output", value: "Complete treatment context ready for resistance prediction" },
        ],
      },
      {
        number: 2,
        title: "Add Treatment History",
        description: "Add treatment history (PFI, PTPI, TFI, PFS, OS) to unlock resistance prediction. Track treatment intervals and outcomes.",
        details: [
          { label: "Input", value: "Treatment history (PFI, PTPI, TFI, PFS, OS)" },
          { label: "Includes", value: "Treatment intervals, outcomes, progression data" },
          { label: "Output", value: "Treatment history ready for pathway profiling" },
        ],
      },
      {
        number: 3,
        title: "Analyze Post-Treatment Pathway Profiling",
        description: "Analyze post-treatment tumor sample to capture pathway evolution. Track how tumor biology changes after treatment.",
        details: [
          { label: "Method", value: "Post-treatment pathway profiling" },
          { label: "Validation", value: "AUROC 0.714-0.750 (n=11)" },
          { label: "Output", value: "Pathway evolution tracking and resistance signals" },
        ],
      },
      {
        number: 4,
        title: "Predict Resistance Timeline and Early Warning Signs",
        description: "Predict when chemo might stop working. Early warning signs: CA-125 plateau, CSI drops, new mutations. Alerts 3-6 weeks before imaging.",
        details: [
          { label: "Timeline", value: "Resistance likely in Month 6-9" },
          { label: "Early Warning", value: "3-6 weeks before imaging" },
          { label: "Output", value: "Resistance timeline + Early warning alerts" },
        ],
      },
    ],
    interactive: true,
  },

  // Observed Outcomes - Will use dataSource from ObservedOutcomesSection
  // This will be handled by the component

  // Example Section - CSI Level 3 Focused
  example: {
    title: "Real Example: Sarah, 58, Ovarian Cancer - Month 6 (Level 3 Unlock)",
    patient: {
      name: "Sarah",
      profile: ["58 years old", "Ovarian cancer, 2nd-line", "CSI: 78 → 72 (dropped)", "CA-125 plateau detected", "Month 6 of treatment"],
      question: "When will chemo stop working? When should we retest?",
    },
    solution: [
      {
        step: 1,
        title: "CSI Score + Drug Selection",
        description: "CSI: 72/100 (from Level 1, dropped from 78). PARPi selected (from Level 2). Treatment history: 6 months on PARPi.",
        result: "CSI score: 72/100 → PARPi selected → Treatment history: 6 months",
      },
      {
        step: 2,
        title: "Post-Treatment Pathway Profiling",
        description: "Post-treatment tumor sample analyzed. Pathway evolution detected: KRAS G12D mutation (MAPK pathway) at 0.8% VAF.",
        result: "Pathway evolution: KRAS G12D (MAPK pathway) → Resistance mechanism identified",
      },
      {
        step: 3,
        title: "Resistance Timeline",
        description: "Resistance prediction: Likely in Month 9-12. CA-125 plateau correlates with CSI decrease. Early warning: 3-6 weeks before imaging.",
        result: "Resistance timeline: Month 9-12 → Early warning: 3-6 weeks before imaging",
      },
      {
        step: 4,
        title: "Early Intervention",
        description: "Early intervention recommended: Consider PARP switch NOW. Increase ctDNA monitoring frequency. Alternative therapy: MEK/RAF inhibitors.",
        result: "Early intervention: PARP switch recommended → Alternative therapy: MEK/RAF inhibitors",
      },
    ],
    outcome: [
      {
        metric: "Early Detection",
        value: "3-6 weeks earlier",
        impact: "Resistance detected 3-6 weeks before imaging confirms progression",
      },
      {
        metric: "Resistance Timeline",
        value: "Month 9-12",
        impact: "Clear timeline for when chemo might stop working",
      },
      {
        metric: "Early Intervention",
        value: "PARP switch recommended",
        impact: "Prevent treatment failure before it happens",
      },
    ],
  },

  // Integration Section - CSI Level 3 Focused
  integration: {
    title: "How Level 3 Unlocks Level 4: Safety & Dosing",
    connections: [
      {
        from: "Level 2: Drug Recommendations",
        to: "Level 3: Resistance Prediction",
        relationship: "Drug recommendations from Level 2 inform resistance prediction. Add treatment history to unlock early warning system.",
        visual: null,
      },
      {
        from: "Level 3: Resistance Prediction",
        to: "Level 4: Safety & Dosing",
        relationship: "Once you have resistance prediction, add genetic safety screening to unlock personalized dosing",
        visual: null,
      },
      {
        from: "Level 3: Post-Treatment Profiling",
        to: "Level 4: PGx Screening",
        relationship: "Post-treatment pathway profiling enables PGx-guided therapy selection for alternative therapies",
        visual: null,
      },
    ],
    carePlanContext: [
      {
        step: 2,
        component: "Level 2: Drug Recommendations",
        howThisHelps: "S/P/E framework ranks DDR-targeted drugs by mechanism fit. Clinical trial matching.",
      },
      {
        step: 3,
        component: "Level 3: Resistance Prediction",
        howThisHelps: "Post-treatment pathway profiling predicts resistance 3-6 weeks before imaging. Early intervention.",
      },
      {
        step: 4,
        component: "Level 4: Safety & Dosing",
        howThisHelps: "Add genetic safety screening to unlock personalized dosing. Prevent dangerous side effects.",
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

  // Source data - Will use therapy-fit-data as placeholder (needs resistance-specific data)
  sourceData: {} as any,
};
