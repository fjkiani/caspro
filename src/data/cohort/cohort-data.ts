// Cohort Context data structure - extracted from documentation
export interface CohortStudy {
  id: string;
  name: string;
  description: string;
  sampleSize: number;
  disease: string;
  genes: string[];
  source: string;
}

export interface CohortSnippet {
  gene: string;
  n: number;
  prevalence: number;
  metrics: {
    auroc: number;
    auprc: number;
  };
}

export interface CohortArtifact {
  name: string;
  type: 'CSV' | 'JSON' | 'PDF';
  url: string;
  description: string;
}

export interface CohortCapability {
  title: string;
  description: string;
  icon: string;
  color: 'blue' | 'teal' | 'indigo' | 'purple' | 'green' | 'red';
  technical: string;
  scientific: string;
  business: string;
  features: string[];
}

export interface CohortMetric {
  label: string;
  value: string;
  description: string;
  impact: string;
}

export interface CohortData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    keyMetrics: CohortMetric[];
  };
  capabilities: CohortCapability[];
  kpis: CohortMetric[];
  observedOutcomes: string[];
  valueProps: {
    audience: string;
    icon: string;
    points: string[];
  }[];
  studies: CohortStudy[];
  sampleSnippet: CohortSnippet;
  sampleArtifacts: CohortArtifact[];
}

export const cohortData: CohortData = {
  hero: {
    title: "Cohort Context: Real-World Overlays for Confidence",
    subtitle: "Add small, trustworthy cohort snippets to ground your in-silico results — without slowing decisions (RUO).",
    description: "Make results easier to trust by showing what similar cases look like in real data — prevalence and simple metrics — right next to the model outputs.",
    keyMetrics: [
      {
        label: "Confidence Lift",
        value: "+0.05–0.12",
        description: "When cohort context aligns with model outputs",
        impact: "Significant improvement in decision confidence"
      },
      {
        label: "Tier Upgrades",
        value: "~22%",
        description: "Consider→Supported promotions in aligned cases",
        impact: "More actionable results with real-world backing"
      },
      {
        label: "Trial Shortlist",
        value: "50+ → 5–12",
        description: "Compression when combined with WIWFM and evidence",
        impact: "Faster, more focused clinical trial selection"
      }
    ]
  },
  capabilities: [
    {
      title: "Study Selection",
      description: "Query cBio/pyBioPortal for available studies with filtering",
      icon: "List",
      color: "blue",
      technical: "Query cBio/pyBioPortal for available studies; allow filtering by disease/genes.",
      scientific: "Ensures overlays reflect a relevant cohort.",
      business: "Pick the right cohort quickly for maximum relevance.",
      features: [
        "Study database integration",
        "Disease and gene filtering",
        "Sample size information",
        "Study metadata display"
      ]
    },
    {
      title: "Extract & Benchmark",
      description: "Lightweight metrics and coverage analysis with artifacts",
      icon: "Play",
      color: "teal",
      technical: "API returns metrics (AUPRC/AUROC), coverage by gene, and artifact links.",
      scientific: "Provides a small, standardized baseline for context (RUO).",
      business: "Teams see the same metrics and artifacts for consistency.",
      features: [
        "Automated extraction pipeline",
        "Standardized benchmarking",
        "Coverage analysis by gene",
        "Artifact generation and storage"
      ]
    },
    {
      title: "Overlay Mapping",
      description: "Map overlay fields into Pathway/Therapy views with provenance",
      icon: "GitMerge",
      color: "indigo",
      technical: "Map overlay fields (prevalence, metrics) into Pathway/Therapy views with provenance.",
      scientific: "Integrates real-world context into the biology/therapy story.",
      business: "Gentle lift when cohort context aligns with predictions.",
      features: [
        "Contextual overlay display",
        "Prevalence and metrics integration",
        "Provenance tracking",
        "Seamless UI integration"
      ]
    },
    {
      title: "Artifacts & Export",
      description: "Expose artifact links and overlay mapping for reuse",
      icon: "Download",
      color: "purple",
      technical: "Expose artifact links (CSV/JSON) and the overlay mapping.",
      scientific: "Makes overlays easy to verify and reuse.",
      business: "Faster documentation and analysis with reusable artifacts.",
      features: [
        "Multiple export formats",
        "Artifact versioning",
        "Reusable mapping templates",
        "Documentation automation"
      ]
    }
  ],
  kpis: [
    {
      label: "Confidence lift (aligned)",
      value: "+0.05–0.12",
      description: "Improvement when cohort context supports model outputs",
      impact: "Measurable increase in decision confidence"
    },
    {
      label: "Tier upgrades (aligned cases)",
      value: "~22% (Consider→Supported)",
      description: "Promotion rate when real-world data aligns",
      impact: "More actionable results with evidence backing"
    },
    {
      label: "Shortlist compression (trials)",
      value: "50+ → 5–12",
      description: "Reduction in trial candidates when combined with other tools",
      impact: "Faster, more focused clinical trial selection"
    }
  ],
  observedOutcomes: [
    "Faster consensus when a cohort snippet reinforces the biology story",
    "Reproducible overlays with study ID, run ID, and artifacts",
    "Clearer patient communication: 'how often' and 'baseline performance' at a glance"
  ],
  valueProps: [
    {
      audience: "For Tumor Boards",
      icon: "Users",
      points: [
        "A small study snippet (n, prevalence, baseline metrics) next to your result.",
        "Confidence lifts when cohort context aligns.",
        "Exportable one-pager with sources and provenance (RUO)."
      ]
    },
    {
      audience: "For Researchers",
      icon: "Database",
      points: [
        "Pick a study, extract/benchmark, and overlay in minutes.",
        "Artifacts (CSV/JSON) for reuse; stable caching and retries.",
        "Consistent mapping from study fields to our chips/pathways."
      ]
    }
  ],
  studies: [
    {
      id: "tcga_ov_pan_can",
      name: "TCGA-OV PanCan",
      description: "The Cancer Genome Atlas Ovarian Cancer Pan-Cancer Atlas",
      sampleSize: 600,
      disease: "Ovarian Cancer",
      genes: ["BRCA1", "BRCA2", "TP53", "KRAS", "PIK3CA"],
      source: "cBioPortal"
    },
    {
      id: "tcga_brca",
      name: "TCGA-BRCA",
      description: "The Cancer Genome Atlas Breast Cancer",
      sampleSize: 1084,
      disease: "Breast Cancer",
      genes: ["BRCA1", "BRCA2", "TP53", "PIK3CA", "GATA3"],
      source: "cBioPortal"
    },
    {
      id: "tcga_luad",
      name: "TCGA-LUAD",
      description: "The Cancer Genome Atlas Lung Adenocarcinoma",
      sampleSize: 517,
      disease: "Lung Adenocarcinoma",
      genes: ["KRAS", "EGFR", "TP53", "STK11", "KEAP1"],
      source: "cBioPortal"
    }
  ],
  sampleSnippet: {
    gene: "BRAF",
    n: 42,
    prevalence: 0.07,
    metrics: {
      auroc: 0.50,
      auprc: 0.50
    }
  },
  sampleArtifacts: [
    {
      name: "metrics.json",
      type: "JSON",
      url: "/artifacts/tcga_ov/metrics.json",
      description: "Standardized performance metrics and coverage data"
    },
    {
      name: "cohort.csv",
      type: "CSV",
      url: "/artifacts/tcga_ov/cohort.csv",
      description: "Cohort data with gene variants and clinical annotations"
    },
    {
      name: "overlay_mapping.json",
      type: "JSON",
      url: "/artifacts/tcga_ov/overlay_mapping.json",
      description: "Mapping configuration for UI integration"
    }
  ]
};
