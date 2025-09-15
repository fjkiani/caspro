import { EvidenceData } from './evidence-data';

export interface SAEFeature {
  id: string;
  label: string;
  type: 'exon' | 'intron' | 'tfbs' | 'structure' | 'motif';
  position: number;
  strength: number;
  description: string;
}

export interface SAEAttribution {
  featureId: string;
  description: string;
  deltaLL: number;
  impact: 'high' | 'medium' | 'low';
}

export interface SAECapability {
  title: string;
  status: 'live' | 'roadmap';
  technical: string;
  scientific: string;
  business: string;
  genomicUseCases: string;
  icon: string;
  color: string;
}

export interface SAEData {
  id: string;
  hero: {
    title: string;
    subtitle: string;
    vision: string;
    description?: string;
    badges?: Array<{
      text: string;
      color: string;
    }>;
  };
  interactiveDemo?: {
    component: string;
    title: string;
    description: string;
    features: string[];
    instructions?: string[];
  };
  valueProps: Array<{
    audience: string;
    icon: string;
    points: string[];
  }>;
  buildsOn: {
    title: string;
    points: string[];
  };
  kpis: Array<{
    label: string;
    value: string;
  }>;
  observedOutcomes: string[];
  genomicInsights: {
    overview: string;
    problemIntro: string;
    problemPoints: string[];
  };
  useCases: Array<{
    label: string;
    iconName: string;
    color: string;
  }>;
  capabilities: SAECapability[];
  valueProposition: Array<{
    audience: string;
    points: string[];
  }>;
  conclusion: string;
  technicalDetails: {
    currentImplementation: string;
    dataContract: {
      saeFeatures: string;
      deltaLLSeries: string;
      provenance: string;
    };
    keyMetrics: string[];
    codeLocations: Array<{
      component: string;
      path: string;
      status: 'live' | 'roadmap';
    }>;
    limitations: string[];
    successCriteria: string[];
  };
}

export const saeData: SAEData = {
  id: 'sae-intelligence',
  hero: {
    title: "SAE Intelligence: Interpretable Genomic Features",
    subtitle: "Go beyond the score. See the exact biological features—exons, TF motifs, protein structures—that drive a prediction and understand *why* a variant is disruptive.",
    vision: "Transform black-box predictions into transparent, biologically-grounded stories. We expose the model's internal logic to explain variant impact, flag risky designs, and (on the roadmap) steer generative AI.",
    description: "Transform black-box AI into transparent, biologically-grounded explanations with interpretable feature analysis.",
    badges: [
      { text: 'Interpretable AI', color: 'bg-orange-100 text-orange-700' },
      { text: 'Feature attribution', color: 'bg-purple-100 text-purple-700' },
      { text: 'Transparent predictions', color: 'bg-blue-100 text-blue-700' }
    ]
  },
  interactiveDemo: {
    component: 'SAEDemonstrations',
    title: 'Try SAE Intelligence Live',
    description: 'Explore how our interpretable AI explains genomic predictions with interactive feature analysis',
    features: [
      'Feature Visualization',
      'Attribution Analysis', 
      'Safety Checking',
      'AI Steering'
    ],
    instructions: [
      'Explore the feature visualization dashboard',
      'See how different genomic features contribute to predictions',
      'Test the safety checking system',
      'Try steering the AI with different parameters'
    ]
  },
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
  buildsOn: {
    title: "How It Works Today",
    points: [
      "**`DynamicOracleExplain` Component:** An interactive, multi-track visualizer that displays SAE features and their disruption scores (ΔLL) directly on the genomic sequence.",
      "**`simulateVariantImpactWithSAE` Function:** A powerful simulation in `simulations.ts` that generates the rich feature and attribution data needed to power our visualizations.",
      "**Prompt Quality Checker:** A safety gate that flags pathological inputs (like low‑complexity repeats) in our design flows."
    ]
  },
  kpis: [
    { label: 'Feature Coverage', value: 'Exon/Intron/TFBS/2° Structure' },
    { label: 'Key Metric', value: 'Disruption Score (ΔLL)' },
    { label: 'Prompt Safety', value: 'Low‑complexity/junk flags' },
    { label: 'Steering Scaling (Roadmap)', value: 'Log‑linear beam→quality' }
  ],
  observedOutcomes: [
    'Clearer "why" lines on variant reports, linked directly to biological features.',
    'Fewer junk outputs in design flows via the integrated safety checker.',
    'Increased stakeholder trust, as interpretable overlays reduce black‑box concerns.'
  ],
  genomicInsights: {
    overview: "SAE features, as reported in CrisPRO.ai, reveal interpretable concepts like exons, TF binding motifs, and protein secondary structure cues. We surface these features to explain Oracle's scores and, on the roadmap, to steer the Forge's generative output.",
    problemIntro: "A score is a number. An explanation is a story. We provide the story, making every prediction readable, auditable, and trustworthy.",
    problemPoints: [
      "Users need a concrete 'why' behind each signal, not just a p-value.",
      "Junk-in-junk-out is a real risk; design flows need structure-aware checks.",
      "Effective design requires controllable targets, not black-box knobs."
    ]
  },
  useCases: [
    { label: "Feature Overlay (Oracle)", iconName: "Layers", color: "text-blue-400" },
    { label: "Disruption Score (Oracle)", iconName: "TrendingDown", color: "text-green-400" },
    { label: "Prompt Safety (Forge)", iconName: "Shield", color: "text-purple-400" },
    { label: "Activation Steering (Roadmap)", iconName: "Sliders", color: "text-orange-400" }
  ],
  capabilities: [
    {
      title: "Feature Attribution (Live)",
      status: "live",
      technical: "We simulate the extraction of active SAE features for a given sequence and calculate the change in log-likelihood (ΔLL) caused by a variant.",
      scientific: "Connects the model's internal logic to human-readable biological concepts (RUO).",
      business: "- **Trust:** Defend and document decisions with feature-linked, quantitative explanations.",
      genomicUseCases: "Today: \n1. **Interactive feature tracks** in our `DynamicOracleExplain` component. \n2. **Quantitative disruption scores** to rank a variant's impact.",
      icon: "Layers",
      color: "text-blue-400"
    },
    {
      title: "Prompt Safety (Live)",
      status: "live",
      technical: "Detect low‑complexity repeats and other pathological attractors; flag viral/sensitive content (aligned with Forge safety gates).",
      scientific: "Reduces junk outputs and improves the reliability of generative demos.",
      business: "- **Quality:** Fewer dead‑ends in design flows and cleaner, more compelling demos.",
      genomicUseCases: "Today: \n1. **Automated safety checks** on design inputs, with clear user warnings.",
      icon: "Shield",
      color: "text-purple-400"
    },
    {
      title: "Activation Steering (Roadmap)",
      status: "roadmap",
      technical: "Expose endpoints to nudge/target feature activations (e.g., chromatin patterns, motif presence) with compute‑aware beam search.",
      scientific: "Maps CrisPRO.ai‑style inference‑time scaling to controllable design objectives.",
      business: "- **Control:** Achieve predictable design quality scaling with transparent, auditable controls.",
      genomicUseCases: "Roadmap: \n1. **Steer** generation towards desired feature sets; **measure** quality and efficacy metrics.",
      icon: "Sliders",
      color: "text-orange-400"
    }
  ],
  valueProposition: [
    {
      audience: "For the Institution",
      points: [
        "Interpretable overlays increase confidence and adoption across teams.",
        "Safer demos and design explorations with automated prompt checks.",
        "A clear path to controllable, auditable in-silico design (roadmap)."
      ]
    }
  ],
  conclusion: "SAE features turn the black‑box into a readable story—and open a clear path to controllable in‑silico design (RUO).",
  technicalDetails: {
    currentImplementation: "Our current implementation is a high-fidelity frontend simulation that powers our interactive demos. The `simulateVariantImpactWithSAE` function in `simulations.ts` produces the following data contract:",
    dataContract: {
      saeFeatures: "`{ featureId, description, position, strength }` - The active biological features at specific locations.",
      deltaLLSeries: "`{ featureId, description, deltaLL }` - The quantitative disruption score for each feature caused by the variant.",
      provenance: "run_id, model_profile, etc."
    },
    keyMetrics: [
      "CrisPRO.ai reported interpretable SAE features (exons/introns, TFBS, secondary structure, mutation severity); our UI and data contracts are designed to surface these same concepts.",
      "The **ΔLL (Delta Log-Likelihood)** score is the key quantitative metric we use to measure and display the functional impact of a variant on each biological feature."
    ],
    codeLocations: [
      { component: "Frontend Simulation (Live)", path: "src/utils/simulations.ts", status: "live" },
      { component: "Frontend Component (Live)", path: "src/components/site/blocks/DynamicOracleExplain.tsx", status: "live" },
      { component: "Backend Service (Roadmap)", path: "@/api/routers/sae.py", status: "roadmap" }
    ],
    limitations: [
      "Feature extraction is compute‑heavy; the future backend service will require aggressive caching and optional sampling.",
      "Steering is a roadmap item; current demos should be clearly labeled as RUO and be resource‑bounded."
    ],
    successCriteria: [
      "The `DynamicOracleExplain` component displays feature overlays and 'why' lines without blocking the UI.",
      "The Forge safety checker consistently flags low‑complexity/viral inputs.",
      "When enabled, steering demos show predictable quality scaling with clear provenance."
    ]
  }
};
