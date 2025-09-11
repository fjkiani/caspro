// Evidence Intelligence data structure - extracted from documentation
export interface EvidenceBadge {
  type: 'Guideline' | 'RCT' | 'ClinVar-Strong' | 'Pathway-Aligned';
  description: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

export interface EvidenceTier {
  level: 'Supported' | 'Consider' | 'Insufficient';
  description: string;
  criteria: string;
  color: 'green' | 'yellow' | 'red';
}

export interface EvidenceMetric {
  label: string;
  value: string;
  description: string;
  dataset: string;
  sampleSize: number;
  source: string;
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
}

export interface EvidenceData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    keyMetrics: EvidenceMetric[];
  };
  badges: EvidenceBadge[];
  tiers: EvidenceTier[];
  capabilities: EvidenceCapability[];
  kpis: EvidenceMetric[];
  observedOutcomes: string[];
  valueProps: {
    audience: string;
    icon: string;
    points: string[];
  }[];
}

export const evidenceData: EvidenceData = {
  hero: {
    title: "Evidence Intelligence: Confidence, Tiers, Badges, Citations",
    subtitle: "Turn raw findings into a clear evidence story: confidence, tier, badges, and citations — all with provenance (RUO).",
    description: "Make decisions easier by showing exactly how strong the evidence is — and why — in one view you can trust and share.",
    keyMetrics: [
      {
        label: "ClinVar AUROC",
        value: "95.7%",
        description: "Total validation across all variant classes",
        dataset: "ClinVar",
        sampleSize: 53210,
        source: "ClinVar validation dataset"
      },
      {
        label: "SpliceVarDB AUROC",
        value: "82.5-82.6%",
        description: "Splice variant prediction performance",
        dataset: "SpliceVarDB",
        sampleSize: 4950,
        source: "SpliceVarDB validation"
      },
      {
        label: "VUS Target",
        value: "40% → 15%",
        description: "VUS rate reduction with validated predictions",
        dataset: "Clinical Validation",
        sampleSize: 1000,
        source: "Clinical validation studies"
      }
    ]
  },
  badges: [
    {
      type: "Guideline",
      description: "Evidence from clinical practice guidelines",
      color: "blue"
    },
    {
      type: "RCT",
      description: "Randomized controlled trial evidence",
      color: "green"
    },
    {
      type: "ClinVar-Strong",
      description: "Strong evidence from ClinVar database",
      color: "purple"
    },
    {
      type: "Pathway-Aligned",
      description: "Evidence aligned with known biological pathways",
      color: "orange"
    }
  ],
  tiers: [
    {
      level: "Supported",
      description: "Strong evidence supporting the finding",
      criteria: "Meaningful literature or ClinVar-Strong + pathway alignment",
      color: "green"
    },
    {
      level: "Consider",
      description: "Moderate evidence requiring consideration",
      criteria: "Partial support or mixed signals",
      color: "yellow"
    },
    {
      level: "Insufficient",
      description: "Limited evidence available",
      criteria: "Sparse or conflicting evidence",
      color: "red"
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
      ]
    },
    {
      title: "Literature Integration",
      description: "Provider fallback with caching and deduplication",
      icon: "BookOpen",
      color: "indigo",
      technical: "Provider fallback (PubMed/OpenAlex/Semantic Scholar) with Redis caching, dedupe by title/DOI, and timeouts/retries.",
      scientific: "Adds study context and MoA-aware relevance without blocking decisions when rates limit.",
      business: "Stronger story when references are available.",
      features: [
        "Multi-provider literature search",
        "Intelligent caching system",
        "Deduplication by title/DOI",
        "Timeout and retry handling"
      ]
    },
    {
      title: "Cohort Evidence",
      description: "Real-world context overlays when available",
      icon: "Users",
      color: "purple",
      technical: "When Cohort Lab provides overlays, display a small prevalence/metric snippet tied to the gene/variant or pathway.",
      scientific: "Grounds the result in real-world context (RUO).",
      business: "Supplemental lift when context aligns.",
      features: [
        "Cohort prevalence data",
        "Real-world metrics",
        "Contextual overlays",
        "Study integration"
      ]
    }
  ],
  kpis: [
    {
      label: "ClinVar AUROC (total n=53,210)",
      value: "0.957",
      description: "Comprehensive variant interpretation performance",
      dataset: "ClinVar",
      sampleSize: 53210,
      source: "ClinVar validation dataset"
    },
    {
      label: "SpliceVarDB AUROC (n=4,950)",
      value: "0.825-0.826",
      description: "Splice variant prediction accuracy",
      dataset: "SpliceVarDB",
      sampleSize: 4950,
      source: "SpliceVarDB validation"
    },
    {
      label: "VUS target",
      value: "→ 15% (≈$2.1M saved/program)",
      description: "VUS rate reduction with cost savings",
      dataset: "Clinical Validation",
      sampleSize: 1000,
      source: "Program cost analysis"
    }
  ],
  observedOutcomes: [
    "Tier promotions when ClinVar-Strong and Pathway-Aligned co-occur (~10–20% Consider→Supported)",
    "Confidence +0.05–0.12 with literature on and cohort overlays aligned",
    "Fewer reworks: shareable panel with run ID speeds alignment"
  ],
  valueProps: [
    {
      audience: "For Tumor Boards",
      icon: "ShieldCheck",
      points: [
        "Confidence (0–1) and an evidence tier you can read.",
        "Badges that explain strength: Guideline, RCT, ClinVar-Strong, Pathway-Aligned.",
        "Citations and provenance on every result (RUO)."
      ]
    },
    {
      audience: "For Researchers",
      icon: "BookOpen",
      points: [
        "ClinVar priors, literature tabs, and cohort overlays (optional).",
        "Caching and provider fallbacks for stability.",
        "Exportable panels you can reuse in notes."
      ]
    }
  ]
};
