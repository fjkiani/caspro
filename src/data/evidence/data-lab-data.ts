// Data Lab data structure - extracted from datalab.mdc documentation
export interface DataLabCapability {
  title: string;
  description: string;
  icon: string;
  color: string;
  status: 'live' | 'roadmap';
  technical: string;
  scientific: string;
  business: string;
  features: string[];
}

export interface DataLabStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  details: string[];
  outputs: string[];
}

export interface DataLabData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  capabilities: DataLabCapability[];
  pipeline: DataLabStep[];
  kpis: Array<{
    label: string;
    value: string;
    description: string;
  }>;
  observedOutcomes: string[];
  valuePropositions: Array<{
    audience: string;
    points: string[];
  }>;
}

export const dataLabData: DataLabData = {
  hero: {
    title: "In-Silico Data Lab",
    subtitle: "Find studies, extract cohorts, label, benchmark, and export artifacts — fast and reproducible (RUO)",
    description: "Give researchers a reliable data lane: discover a study, extract it with guardrails, add labels, run a quick benchmark, and export artifacts — all with provenance."
  },
  capabilities: [
    {
      title: "Study Catalog",
      description: "List available studies via pyBioPortal; filter by disease/genes",
      icon: "Search",
      color: "blue",
      status: "live",
      technical: "GET /studies feeds a searchable list with disease/gene filtering",
      scientific: "Ensures you start with a relevant cohort",
      business: "Speed: Less hunting, more doing",
      features: [
        "Study discovery and filtering",
        "Disease and gene-based search",
        "Sample size and metadata display",
        "Real-time study availability"
      ]
    },
    {
      title: "Cohort Extractor",
      description: "Extract cohorts with chunked POST, retries, and caching",
      icon: "Play",
      color: "green",
      status: "live",
      technical: "POST /extract_and_benchmark orchestrates extraction with guardrails",
      scientific: "Stable extraction reduces errors and variance",
      business: "Reliability: Guardrails keep the pipeline moving",
      features: [
        "Chunked POST for large queries",
        "Retry logic with backoff",
        "Redis caching (24-72h)",
        "Single-flight per key"
      ]
    },
    {
      title: "Label Builder & Benchmarks",
      description: "Build light labels and run minimal benchmarks (AUPRC/AUROC)",
      icon: "Tag",
      color: "purple",
      status: "live",
      technical: "Build light labels (e.g., treatments); run minimal benchmarks",
      scientific: "Adds quick context to cohorts (RUO)",
      business: "Comparable: Same metrics for everyone",
      features: [
        "Treatment labeling",
        "AUROC/AUPRC benchmarking",
        "Minimal benchmark execution",
        "Contextual cohort annotation"
      ]
    },
    {
      title: "Artifacts & Coverage",
      description: "Return artifact manifest (CSV/JSON) and coverage by gene for overlays",
      icon: "Download",
      color: "indigo",
      status: "live",
      technical: "Return artifact manifest and coverage by gene for overlays",
      scientific: "Enables reproducible overlays across flows",
      business: "Reuse: Shareable outputs with stable links",
      features: [
        "CSV/JSON artifact export",
        "Gene coverage mapping",
        "Stable artifact links",
        "Provenance tracking"
      ]
    }
  ],
  pipeline: [
    {
      id: 1,
      title: "Study Discovery",
      description: "Browse and filter available studies from pyBioPortal",
      icon: "Search",
      color: "blue",
      details: [
        "Study catalog browsing",
        "Disease and gene filtering",
        "Sample size validation",
        "Metadata verification"
      ],
      outputs: ["Study list", "Filtered results", "Study metadata"]
    },
    {
      id: 2,
      title: "Extraction Request",
      description: "Configure extraction parameters and filters",
      icon: "Settings",
      color: "teal",
      details: [
        "Gene filter specification",
        "Extraction mode selection",
        "Parameter configuration",
        "Request validation"
      ],
      outputs: ["Extraction config", "Parameter validation", "Request ID"]
    },
    {
      id: 3,
      title: "Cohort Extraction",
      description: "Extract cohort data with chunked POST and retries",
      icon: "Database",
      color: "green",
      details: [
        "Chunked POST execution",
        "Retry logic with backoff",
        "Cache key generation",
        "Single-flight protection"
      ],
      outputs: ["Raw cohort data", "Extraction metrics", "Cache entries"]
    },
    {
      id: 4,
      title: "Label Building",
      description: "Add simple labels and annotations to cohort data",
      icon: "Tag",
      color: "purple",
      details: [
        "Treatment labeling",
        "Clinical annotation",
        "Cohort stratification",
        "Label validation"
      ],
      outputs: ["Labeled cohort", "Annotation schema", "Stratification groups"]
    },
    {
      id: 5,
      title: "Benchmarking",
      description: "Run AUROC/AUPRC benchmarks on extracted data",
      icon: "BarChart2",
      color: "orange",
      details: [
        "AUROC calculation",
        "AUPRC computation",
        "Performance metrics",
        "Benchmark validation"
      ],
      outputs: ["AUROC scores", "AUPRC metrics", "Performance report"]
    },
    {
      id: 6,
      title: "Artifact Generation",
      description: "Generate CSV/JSON artifacts and coverage maps",
      icon: "FileText",
      color: "indigo",
      details: [
        "CSV export generation",
        "JSON artifact creation",
        "Coverage mapping",
        "File link generation"
      ],
      outputs: ["CSV files", "JSON artifacts", "Coverage maps", "Download links"]
    },
    {
      id: 7,
      title: "Provenance & Integration",
      description: "Track provenance and enable overlay integration",
      icon: "Hash",
      color: "pink",
      details: [
        "Run ID generation",
        "Provenance logging",
        "Overlay preparation",
        "Integration endpoints"
      ],
      outputs: ["Provenance log", "Run ID", "Overlay data", "Integration links"]
    }
  ],
  kpis: [
    {
      label: "Extract time (typical)",
      value: "minutes",
      description: "Typical extraction time for standard cohort sizes"
    },
    {
      label: "Artifact completeness",
      value: "100%",
      description: "Metrics + coverage + CSV/JSON completeness rate"
    },
    {
      label: "Retry success rate",
      value: "≥ 95%",
      description: "Success rate on transient errors with retry logic"
    },
    {
      label: "Coverage by gene",
      value: "available",
      description: "Gene coverage data available for overlays"
    }
  ],
  observedOutcomes: [
    "Faster cohort prep with reproducible artifacts and provenance",
    "Fewer failures via chunking, retries, and caching",
    "Consistent overlays (coverage/metrics) that lift confidence in Efficacy/Pathway views"
  ],
  valuePropositions: [
    {
      audience: "For Researchers",
      points: [
        "Pick a study and extract cohorts with retries and caching",
        "Add simple labels (e.g., treatments) and run quick benchmarks",
        "Artifacts (CSV/JSON) you can reuse and share"
      ]
    },
    {
      audience: "For Data Engineers",
      points: [
        "Chunked POST for large queries; single-flight and idempotency",
        "Deterministic keys for cache; stable contracts for FE",
        "Provenance on every run (run_id, study_id, params)"
      ]
    }
  ]
};
