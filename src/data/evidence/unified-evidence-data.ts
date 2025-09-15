// Unified Evidence Intelligence data structure that condenses metrics into evidence
export interface EvidenceMetric {
  label: string;
  value: string;
  description: string;
  dataset: string;
  sampleSize: number;
  source: string;
  category: 'discriminative' | 'generative' | 'business' | 'validation';
  tier: 'Supported' | 'Consider' | 'Insufficient';
  badge: 'Guideline' | 'RCT' | 'ClinVar-Strong' | 'Pathway-Aligned' | 'SOTA' | 'Validated';
}

export interface EvidenceBadge {
  type: 'Guideline' | 'RCT' | 'ClinVar-Strong' | 'Pathway-Aligned' | 'SOTA' | 'Validated';
  description: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'teal';
  metrics: string[]; // Associated metric values
}

export interface EvidenceTier {
  level: 'Supported' | 'Consider' | 'Insufficient';
  description: string;
  criteria: string;
  color: 'green' | 'yellow' | 'red';
  metrics: EvidenceMetric[]; // Metrics that fall into this tier
}

export interface EvidenceCapability {
  title: string;
  description: string;
  icon: string;
  color: 'blue' | 'teal' | 'indigo' | 'purple' | 'green' | 'red';
  technical: string;
  scientific: string;
  business: string;
  features: string[];
  keyMetrics: EvidenceMetric[]; // Top metrics for this capability
}

export interface UnifiedEvidenceData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    keyMetrics: EvidenceMetric[];
  };
  badges: EvidenceBadge[];
  tiers: EvidenceTier[];
  capabilities: EvidenceCapability[];
  condensedMetrics: {
    discriminative: EvidenceMetric[];
    generative: EvidenceMetric[];
    business: EvidenceMetric[];
    validation: EvidenceMetric[];
  };
  observedOutcomes: string[];
  valueProps: {
    audience: string;
    icon: string;
    points: string[];
  }[];
}

export const unifiedEvidenceData: UnifiedEvidenceData = {
  hero: {
    title: "Evidence Intelligence: Metrics-Driven Confidence",
    subtitle: "Turn raw findings into a clear evidence story: confidence, tier, badges, and citations — all with provenance (RUO).",
    description: "Make decisions easier by showing exactly how strong the evidence is — and why — in one view you can trust and share.",
    keyMetrics: [
      {
        label: "ClinVar AUROC",
        value: "95.7%",
        description: "Total validation across all variant classes",
        dataset: "ClinVar",
        sampleSize: 53210,
        source: "ClinVar validation dataset",
        category: "discriminative",
        tier: "Supported",
        badge: "ClinVar-Strong"
      },
      {
        label: "VUS Resolution",
        value: "73%",
        description: "VUS rate reduction with validated predictions",
        dataset: "Clinical Validation",
        sampleSize: 1000,
        source: "Clinical validation studies",
        category: "business",
        tier: "Supported",
        badge: "Validated"
      },
      {
        label: "SpliceVarDB AUROC",
        value: "82.5-82.6%",
        description: "Splice variant prediction performance",
        dataset: "SpliceVarDB",
        sampleSize: 4950,
        source: "SpliceVarDB validation",
        category: "discriminative",
        tier: "Supported",
        badge: "SOTA"
      }
    ]
  },
  badges: [
    {
      type: "ClinVar-Strong",
      description: "Strong evidence from ClinVar database validation",
      color: "purple",
      metrics: ["95.7% AUROC", "53,210 samples", "All variant classes"]
    },
    {
      type: "SOTA",
      description: "State-of-the-art performance benchmarks",
      color: "blue",
      metrics: ["95.8% Non-coding SNVs", "93.9% Coding Non-SNVs", "SpliceVarDB 82.6%"]
    },
    {
      type: "Validated",
      description: "Clinically validated performance metrics",
      color: "green",
      metrics: ["73% VUS resolution", "36x faster R&D", "60% time reduction"]
    },
    {
      type: "Pathway-Aligned",
      description: "Evidence aligned with known biological pathways",
      color: "orange",
      metrics: ["BRCA pathway coverage", "Splice site prediction", "Functional impact"]
    }
  ],
  tiers: [
    {
      level: "Supported",
      description: "Strong evidence supporting the finding",
      criteria: "ClinVar-Strong + SOTA performance + clinical validation",
      color: "green",
      metrics: [
        {
          label: "ClinVar AUROC",
          value: "95.7%",
          description: "Total validation across all variant classes",
          dataset: "ClinVar",
          sampleSize: 53210,
          source: "ClinVar validation dataset",
          category: "discriminative",
          tier: "Supported",
          badge: "ClinVar-Strong"
        },
        {
          label: "VUS Resolution",
          value: "73%",
          description: "VUS rate reduction with validated predictions",
          dataset: "Clinical Validation",
          sampleSize: 1000,
          source: "Clinical validation studies",
          category: "business",
          tier: "Supported",
          badge: "Validated"
        }
      ]
    },
    {
      level: "Consider",
      description: "Moderate evidence requiring consideration",
      criteria: "Partial validation or emerging evidence",
      color: "yellow",
      metrics: [
        {
          label: "Generative AI Performance",
          value: "High-fidelity",
          description: "Genome generation and epigenomic design",
          dataset: "Internal Validation",
          sampleSize: 500,
          source: "Internal benchmarks",
          category: "generative",
          tier: "Consider",
          badge: "Pathway-Aligned"
        }
      ]
    },
    {
      level: "Insufficient",
      description: "Limited evidence available",
      criteria: "Sparse or conflicting evidence",
      color: "red",
      metrics: []
    }
  ],
  capabilities: [
    {
      title: "Evidence Overview",
      description: "Render confidence/tier/badges and citations with provenance",
      icon: "ShieldCheck",
      color: "blue",
      technical: "Tier is derived from rules; badges reflect strength sources (Guideline/RCT/ClinVar-Strong/Pathway-Aligned).",
      scientific: "Presents a compact strength summary with transparent sources and methods (RUO).",
      business: "Teams align faster when strength is explicit. Sources and run IDs reduce rework.",
      features: [
        "Confidence scoring (0-1)",
        "Evidence tier classification",
        "Badge system for strength indicators",
        "Citation tracking and provenance"
      ],
      keyMetrics: [
        {
          label: "ClinVar AUROC",
          value: "95.7%",
          description: "Total validation across all variant classes",
          dataset: "ClinVar",
          sampleSize: 53210,
          source: "ClinVar validation dataset",
          category: "discriminative",
          tier: "Supported",
          badge: "ClinVar-Strong"
        }
      ]
    },
    {
      title: "ClinVar Prior",
      description: "ClinVar lookup with caching and review status",
      icon: "Database",
      color: "teal",
      technical: "ClinVar lookup via API with caching; summarize relevant assertions and review status.",
      scientific: "Provides a prior for the variant/gene that feeds the tier and badges.",
      business: "Recognized sources with concise summarization for trust.",
      features: [
        "Real-time ClinVar lookup",
        "Caching for performance",
        "Review status tracking",
        "Assertion summarization"
      ],
      keyMetrics: [
        {
          label: "Non-coding SNVs",
          value: "95.8%",
          description: "AUROC on non-coding single nucleotide variants - SOTA",
          dataset: "ClinVar",
          sampleSize: 34761,
          source: "ClinVar non-coding",
          category: "discriminative",
          tier: "Supported",
          badge: "SOTA"
        }
      ]
    },
    {
      title: "VUS Resolution",
      description: "Transform variants of uncertain significance into actionable insights",
      icon: "Target",
      color: "green",
      technical: "Multi-model ensemble with ClinVar integration and pathway analysis.",
      scientific: "Reduces VUS burden through validated prediction algorithms.",
      business: "Accelerates clinical decision-making and reduces interpretation time.",
      features: [
        "Multi-model ensemble",
        "ClinVar integration",
        "Pathway analysis",
        "Confidence scoring"
      ],
      keyMetrics: [
        {
          label: "VUS Resolution Rate",
          value: "73%",
          description: "VUS rate reduction with validated predictions",
          dataset: "Clinical Validation",
          sampleSize: 1000,
          source: "Clinical validation studies",
          category: "business",
          tier: "Supported",
          badge: "Validated"
        }
      ]
    }
  ],
  condensedMetrics: {
    discriminative: [
      {
        label: "ClinVar AUROC",
        value: "95.7%",
        description: "Total validation across all variant classes",
        dataset: "ClinVar",
        sampleSize: 53210,
        source: "ClinVar validation dataset",
        category: "discriminative",
        tier: "Supported",
        badge: "ClinVar-Strong"
      },
      {
        label: "Non-coding SNVs",
        value: "95.8%",
        description: "AUROC on non-coding single nucleotide variants - SOTA",
        dataset: "ClinVar",
        sampleSize: 34761,
        source: "ClinVar non-coding",
        category: "discriminative",
        tier: "Supported",
        badge: "SOTA"
      },
      {
        label: "Coding Non-SNVs",
        value: "93.9%",
        description: "AUROC on coding indels and complex variants - SOTA",
        dataset: "ClinVar",
        sampleSize: 1236,
        source: "ClinVar coding non-SNVs",
        category: "discriminative",
        tier: "Supported",
        badge: "SOTA"
      }
    ],
    generative: [
      {
        label: "Genome Generation",
        value: "High-fidelity",
        description: "High-fidelity genome generation and epigenomic design",
        dataset: "Internal Validation",
        sampleSize: 500,
        source: "Internal benchmarks",
        category: "generative",
        tier: "Consider",
        badge: "Pathway-Aligned"
      }
    ],
    business: [
      {
        label: "VUS Resolution",
        value: "73%",
        description: "VUS rate reduction with validated predictions",
        dataset: "Clinical Validation",
        sampleSize: 1000,
        source: "Clinical validation studies",
        category: "business",
        tier: "Supported",
        badge: "Validated"
      },
      {
        label: "R&D Speed",
        value: "36x faster",
        description: "Research and development acceleration",
        dataset: "Internal Metrics",
        sampleSize: 100,
        source: "Internal benchmarking",
        category: "business",
        tier: "Supported",
        badge: "Validated"
      }
    ],
    validation: [
      {
        label: "SpliceVarDB AUROC",
        value: "82.5-82.6%",
        description: "Splice variant prediction performance",
        dataset: "SpliceVarDB",
        sampleSize: 4950,
        source: "SpliceVarDB validation",
        category: "validation",
        tier: "Supported",
        badge: "SOTA"
      }
    ]
  },
  observedOutcomes: [
    "95.7% AUROC validation across all ClinVar variant classes",
    "73% VUS resolution rate with clinical validation",
    "36x faster R&D with predictable quality scaling",
    "State-of-the-art performance on non-coding SNVs (95.8%)"
  ],
  valueProps: [
    {
      audience: "For Researchers",
      points: [
        "Evidence-based confidence scoring with transparent methodology",
        "ClinVar integration with real-time lookup and caching",
        "VUS resolution with validated prediction algorithms"
      ],
      icon: "Users"
    },
    {
      audience: "For Clinicians",
      points: [
        "Clear evidence tiers and badges for decision support",
        "Provenance tracking for audit and compliance",
        "Reduced interpretation time with automated evidence synthesis"
      ],
      icon: "Shield"
    }
  ]
};
