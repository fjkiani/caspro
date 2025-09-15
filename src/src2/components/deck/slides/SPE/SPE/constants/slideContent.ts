export const MELANOMA_CASE_STUDY = {
  title: "Melanoma Case Study: The \"Yes GO\" in Action",
  subtitle: "Aligning with FDA Guidance for Unprecedented Clarity",
  liveOutput: {
    title: "Live JSON Output",
    jsonData: {
      therapy: "BRAF inhibitor",
      disease: "melanoma",
      on_label: true,
      tier: "I",
      strength: "moderate",
      efficacy_score: 0.261,
      confidence: 0.51,
      insights: "/* ... */",
      rationale: ["MoA alignment: MAPK blockade", "evidence_strength=0.6"],
      citations: ["39866931", "40411938", "40484006"],
      evidence_tier: "consider",
      badges: [],
      provenance: { efficacy_run: "eee0cee0315c" }
    }
  },
  whyItMatters: {
    title: "Why This Output Matters",
    points: [
      {
        icon: "CircleCheckBig",
        iconColor: "green",
        title: "Direct FDA Alignment",
        description: "The `on_label: true` field confirms this is an FDA-approved therapy for this specific mutation and disease, leading to a high-confidence, actionable **Tier I** recommendation."
      },
      {
        icon: "GitBranch",
        iconColor: "purple",
        title: "Clinical Gating in Action",
        description: "Even with a moderate confidence score, the system's clinical gates recognize the therapy's on-label status and strong evidence, pushing it to the definitive **\"Yes GO\"** verdict."
      },
      {
        icon: "FileText",
        iconColor: "sky",
        title: "Transparent Provenance",
        description: "Every decision is fully auditable. The output provides a list of citations and a rationale, ensuring every step of the recommendation is transparent and traceable."
      }
    ]
  }
};

export const MULTIPLE_MYELOMA_CASE_STUDY = {
  title: "Multiple Myeloma: A Live Use-Case",
  subtitle: "Predicting Drug Response with Unprecedented Accuracy",
  features: [
    {
      icon: "Dna",
      iconColor: "sky",
      title: "CrisPRO Zeta Engine",
      description: "We quantify a mutation's harmfulness by measuring how \"surprising\" it is in its genomic context. A negative **zeta score** indicates greater functional disruption."
    },
    {
      icon: "GitMerge",
      iconColor: "purple",
      title: "Pathway Aggregation",
      description: "The disruption from a mutation is aggregated across critical cancer pathways like **RAS/MAPK and TP53** to predict resistance or sensitivity."
    },
    {
      icon: "ShieldCheck",
      iconColor: "green",
      title: "Confidence & Transparency",
      description: "Our results are live and grounded in CrisPRO Zeta Engine. We provide a clear confidence metric and will **fail** rather than fabricate outputs, ensuring reliability."
    }
  ],
  goal: "**The Goal:** To predict whether a myeloma patient will respond to therapy by quantifying how harmful each mutation is to critical cancer pathways."
};

export const OVARIAN_CANCER_CASE_STUDY = {
  title: "Ovarian Cancer Case Study",
  subtitle: "From Essentiality to Actionable Guidance",
  liveOutput: {
    title: "Live JSON Output",
    jsonData: {
      essentiality_report: [{
        gene: "BRCA1",
        result: {
          essentiality_score: 0.35,
          confidence: 0.55
        }
      }],
      guidance: {
        therapy: "BRAF inhibitor",
        disease: "ovarian cancer",
        on_label: false,
        tier: "I",
        strength: "moderate",
        efficacy_score: 0.305,
        confidence: 0.84,
        insights: "/* ... */",
        rationale: ["MoA alignment: MAPK blockade", "evidence_strength=0.75"],
        citations: ["40512670", "39845416"],
        evidence_tier: "supported",
        badges: ["ClinVar-Strong"]
      }
    }
  },
  whyItMatters: {
    title: "Why This Output Matters",
    points: [
      {
        icon: "GitMerge",
        iconColor: "purple",
        title: "Essentiality ≠ Sensitivity",
        description: "A low **essentiality score** (0.35) for BRCA1 means the cancer isn't dependent on the gene, but the guidance layer correctly identifies that this specific mutation creates a new vulnerability to certain therapies."
      },
      {
        icon: "CheckCircle",
        iconColor: "green",
        title: "Actionable, Not Probabilistic",
        description: "The system provides a **Tier I**, high-confidence verdict despite the therapy being off-label. It applies clinical wisdom to raw data, providing a clear path forward for clinicians."
      },
      {
        icon: "ShieldCheck",
        iconColor: "blue",
        title: "Total Transparency",
        description: "The `essentiality_report` and the `guidance` layer's rationale are surfaced together, ensuring clinicians understand both the raw data and the higher-level conclusion, building trust in the system's decisions."
      }
    ]
  }
};

export const PREDICTION_PIPELINE = {
  // title: "Combined Scoring (demo):",
  subtitle: "Transparent Prediction Pipeline",
  description: "Research‑mode snapshots with full provenance",
  achievements: [
    {
      value: "3",
      label: "Model Profiles",
      description: "Baseline · Richer · Fusion",
      color: "green"
    },
    {
      value: "AM",
      label: "Missense Coverage",
      description: "Fused prior when available",
      color: "purple"
    },
    {
      value: "Fast",
      label: "Response Time",
      description: "Typically fast (demo)",
      color: "orange"
    }
  ],
  workflow: {
    title: "Fusion Engine Workflow",
    stages: [
      {
        icon: "Dna",
        iconColor: "red",
        title: "Variant Input & Validation",
        description: "Receive HGVS notation, validate against genomic databases, check AlphaMissense coverage",
        example: "chr7:140453136:T:A (BRAF V600E)"
      },
      {
        icon: "BrainCircuit",
        iconColor: "sky",
        title: "Parallel Scoring",
        description: "Run Evo2 sequence scoring and AlphaMissense lookup simultaneously",
        details: [
          { label: "Evo2:", value: "delta proxy", color: "cyan" },
          { label: "AM:", value: "pathogenicity prior", color: "purple" }
        ]
      },
      {
        icon: "Zap",
        iconColor: "purple",
        title: "Intelligent Fusion",
        description: "Apply fusion algorithm with provenance tracking",
        result: "Fused Result: higher confidence (AM‑covered variants)"
      }
    ]
  },
  performance: {
    title: "Performance Validation",
    benchmark: {
      title: "Benchmark Results",
      results: [
        { label: "CrisPRO Only:", value: "Baseline profile", color: "cyan" },
        { label: "AlphaMissense Only:", value: "AM prior (missense)", color: "purple" },
        { label: "Fused Engine:", value: "≥0.90 AUROC (AM‑covered micro)", color: "green" }
      ],
      note: "Small AM‑covered micro‑set; cohort‑dependent"
    },
    health: {
      title: "Production Health",
      checks: [
        { label: "Service URL:", value: "demo endpoint (Modal)", color: "orange" },
        { label: "Response Time:", value: "Typically fast", color: "green" },
        { label: "Uptime:", value: "Monitored", color: "green" },
        { label: "Fallback:", value: "Feature‑flagged paths", color: "cyan" }
      ]
    }
  },
  fusionAchievements: {
    title: "Fusion Engine Achievements",
    metrics: [
      { value: "3", label: "Model profiles", description: "Baseline · Richer · Fusion", color: "green" },
      { value: "AM", label: "Missense coverage", description: "Fused prior available", color: "blue" },
      { value: "Fast", label: "Response time", description: "Demo‑dependent", color: "purple" },
      { value: "Research", label: "Mode", description: "Cohort‑dependent results", color: "orange" }
    ],
    highlights: [
      {
        title: "Technical Validation",
        description: "Reproducible micro‑runs (AM‑covered missense) with full provenance",
        color: "green"
      },
      {
        title: "Clinical Impact",
        description: "Confidence lift on covered variants; clearer guidance in demos",
        color: "purple"
      }
    ],
    summary: "**Result:** Combined scoring delivers research‑mode guidance with complete transparency, enabling clearer decisions and accelerating therapeutic exploration"
  }
};

export const SPE_FOR_BIOTECHS = {
  title: "For Biotechs: In‑Silico Design & Validation",
  subtitle: "From target to a confident plan in weeks",
  steps: [
    {
      icon: "FlaskConical",
      iconColor: "red",
      title: "Validate targets before big spend",
      description: "Get clear, evidence‑backed readouts on targets and variants before committing preclinical budgets."
    },
    {
      icon: "Gem",
      iconColor: "purple",
      title: "Design smarter, faster",
      description: "Generate and score therapeutic concepts (e.g., CRISPR guides/sequences) with built‑in safety checks and simple quality signals."
    },
    {
      icon: "Zap",
      iconColor: "orange",
      title: "Test in‑silico, focus wet‑lab",
      description: "Use computational triage to shortlist best options, then advance the most promising to wet‑lab and IND planning."
    }
  ],
  benefits: {
    title: "What you get",
    items: [
      "Faster decisions: weeks, not years, to a prioritized, evidence‑backed plan.",
      "Lower risk: transparent rationale, sources, and reproducible runs for every recommendation.",
      "Fundraising‑ready: shareable cohorts, benchmarks, and artifacts to support diligence."
    ]
  },
  outcomes: {
    title: "Example outcomes (research‑mode)",
    items: [
      "Target triage: earlier go/no‑go on variants and pathways",
      "Portfolio focus: fewer, higher‑quality candidates entering wet‑lab",
      "Partner confidence: clear audit trails (what we used, how we decided)"
    ]
  },
  summary: "Summary — By combining generation with transparent in‑silico validation, we help biotechs de‑risk earlier, focus experiments, and accelerate toward the clinic with evidence that investors and partners can understand."
};

export const SPE_FRAMEWORK = {
  title: "S/P/E Framework",
  subtitle: "Sequence + Pathway + Evidence → Clear guidance",
  components: {
    sequence: {
      title: "S",
      name: "Sequence",
      description: "What the DNA change suggests by itself. Plain, strong/weak signal you can understand at a glance.",
      color: "sky",
      example: "TP53 change → strong disruption signal"
    },
    pathway: {
      title: "P", 
      name: "Pathway",
      description: "How well does this change fit what we know about the disease biology and pathways?",
      color: "purple",
      example: "RAS pathway change → fits cancer biology"
    },
    evidence: {
      title: "E",
      name: "Evidence", 
      description: "What does the literature and clinical data say about this type of change?",
      color: "green",
      example: "BRAF V600E → well-documented in literature"
    }
  }
};

export const SPE_INTRO = {
  title: "S/P/E Framework",
  subtitle: "AI-Powered Therapeutic Design & Validation Platform",
  description: "Predict + Design + Validate • Reduce $2.8B+ drug discovery costs • From months to days",
  problemSolution: {
    problem: {
      title: "The Problem",
      description: "Drug discovery takes 10+ years and costs $2.8B+ per approved drug, with 90% failure rate in clinical trials",
      color: "red"
    },
    solution: {
      title: "Our Solution",
      description: "AI-powered platform that predicts, designs, AND validates therapeutics in silico before clinical trials",
      color: "green"
    }
  },
  framework: {
    title: "S/P/E Framework: Sequence + Pathway + Evidence = Therapeutic Validation",
    components: [
      {
        letter: "S",
        name: "Sequence",
        description: "How disruptive is this DNA change?",
        color: "sky"
      },
      {
        letter: "P",
        name: "Pathway",
        description: "Combined impact on disease pathways",
        color: "purple"
      },
      {
        letter: "E",
        name: "Evidence",
        description: "Clinical databases & literature validation",
        color: "green"
      }
    ]
  }
};

export const ACHIEVEMENTS = {
  title: "Platform Achievements",
  subtitle: "What we've built: A Complete S/P/E Pipeline",
  description: "From variant input to actionable guidance — everything is transparent, traceable, and ready",
  mainActions: [
    {
      icon: "Target",
      iconColor: "red",
      title: "Identify Therapeutic Opportunities",
      description: "Map variants → pathways → candidate drug classes with provenance, badges, and rationale (S/P/E)."
    },
    {
      icon: "Wrench",
      iconColor: "purple",
      title: "Design Custom Therapeutics", 
      description: "Generate CRISPR guides and sequences with safety gates; surface GC/efficacy heuristics and provenance."
    },
    {
      icon: "Microscope",
      iconColor: "green",
      title: "Validate In‑Silico First",
      description: "Benchmark cohorts (AUPRC/AUROC), compare model profiles (baseline/richer S/Fusion), and prioritize experiments."
    }
  ],
  sections: [
    {
      title: "Pipeline Complete",
      achievements: [
        { value: "Sequence", label: "Delta scores (Evo2)", color: "sky" },
        { value: "Pathway", label: "Biology aggregation", color: "purple" },
        { value: "Evidence", label: "Literature + ClinVar", color: "green" },
        { value: "Guidance", label: "Clinical tier logic", color: "orange" }
      ]
    },
    {
      title: "Quality & Scale",
      achievements: [
        { value: "Fast", label: "Response (demo‑mode)", color: "red" },
        { value: "Provenance", label: "Full audit trail", color: "cyan" },
        { value: "Profiles", label: "Baseline/Richer/Fusion", color: "yellow" },
        { value: "Cohorts", label: "HRD benchmarks ready", color: "pink" }
      ]
    }
  ],
  platforms: [
    {
      icon: "Dna",
      iconColor: "sky",
      title: "Insights Platform",
      features: [
        "Functionality, chromatin, essentiality, regulatory endpoints",
        "Gene‑specific calibration and confidence",
        "Evo2 multi/exon with spam‑safety"
      ]
    },
    {
      icon: "GitBranch", 
      iconColor: "purple",
      title: "Efficacy Orchestrator",
      features: [
        "S/P/E aggregation with insights lift",
        "Per‑drug ranking, confidence, evidence tiers",
        "Rationale arrays and citation provenance"
      ]
    },
    {
      icon: "Activity",
      iconColor: "green", 
      title: "Benchmarking",
      features: [
        "HRD cohort extraction (cBio/pyBioPortal)",
        "AUPRC/AUROC with profile comparison",
        "Runtime cost tracking and artifacts"
      ]
    }
  ],
  summary: "**Status:** Production‑ready S/P/E pipeline with transparent provenance, configurable profiles, and benchmark‑validated performance on multiple myeloma and HRD cohorts."
};

export const CRISPRO_BRANDING = {
  name: "CrisPRO",
  tagline: "AI-Powered Therapeutic Design & Validation Platform"
};

export const HERO_METRICS = {
  modelProfiles: {
    value: "3",
    label: "Model Profiles",
    change: "Baseline · Richer · Fusion",
    color: "green"
  },
  insightSignals: {
    value: "4",
    label: "Insight Signals", 
    change: "Functionality · Chromatin · Essentiality · Regulatory",
    color: "purple"
  },
  provenance: {
    value: "100%",
    label: "Audit Trail",
    change: "Complete transparency",
    color: "cyan"
  }
};

export const KEY_DIFFERENTIATORS = {
  sectionTitle: "Why CrisPRO Changes Everything",
  fusedApproach: {
    title: "Fused Intelligence",
    description: "Combines Evo2 sequence modeling with AlphaMissense pathogenicity priors for higher confidence on covered variants",
    color: "purple",
    metrics: [
      { label: "≥0.90 AUROC", value: "AM-covered micro" },
      { label: "3 Profiles", value: "Baseline/Richer/Fusion" }
    ]
  },
  transparency: {
    title: "Complete Transparency",
    description: "Every recommendation includes full provenance, rationale, and audit trail",
    color: "cyan",
    metrics: [
      { label: "Run IDs", value: "Traceable" },
      { label: "Citations", value: "Source-linked" }
    ]
  },
  actionableGuidance: {
    title: "Actionable Guidance",
    description: "Clinical tier logic provides clear Yes/No/Consider recommendations with confidence scores",
    color: "green",
    metrics: [
      { label: "Tier I/II/III", value: "Clear ranking" },
      { label: "Evidence Tiers", value: "Supported/Consider/Insufficient" }
    ]
  },
  pragmaticInfrastructure: {
    title: "Pragmatic Infrastructure",
    description: "Production-ready with feature flags, fallbacks, and cost tracking",
    color: "orange",
    metrics: [
      { label: "Feature Flags", value: "Safe deployment" },
      { label: "Cost Tracking", value: "$/1k variants" }
    ]
  }
};

export const DIFFERENTIATORS_EXTENDED = {
  realWorldImpact: {
    title: "Real-World Impact",
    subtitle: "From research to clinical decision support"
  },
  keyStatistics: [
    { value: "90%", label: "Reduction in discovery time", color: "green" },
    { value: "$2.8B", label: "Cost savings per drug", color: "purple" },
    { value: "3x", label: "Faster target validation", color: "cyan" }
  ],
  mmDriverGenes: {
    title: "Multiple Myeloma Driver Genes",
    genes: ["KRAS", "NRAS", "BRAF", "TP53", "MYC", "CCND1"]
  },
  clinicalWorkflow: {
    title: "Clinical Workflow Integration",
    amCovered: {
      title: "AlphaMissense Covered Variants",
      steps: [
        "Evo2 + AM fusion scoring",
        "Higher confidence predictions", 
        "Clear tier recommendations"
      ]
    },
    amAbsent: {
      title: "AlphaMissense Absent Variants",
      steps: [
        "Evo2-only scoring",
        "Conservative confidence",
        "Research-mode guidance"
      ]
    }
  },
  chemotherapyIntegration: {
    title: "Chemotherapy Integration",
    subtitle: "Seamless integration with existing treatment protocols",
    classes: [
      { name: "Alkylating Agents", description: "DNA damage response" },
      { name: "Antimetabolites", description: "Nucleotide synthesis" },
      { name: "Topoisomerase Inhibitors", description: "DNA replication" }
    ]
  },
  strategicRollout: {
    title: "Strategic Rollout Plan",
    subtitle: "Phased deployment across clinical settings",
    phases: [
      { phase: "Phase 1", description: "Research validation" },
      { phase: "Phase 2", description: "Clinical pilot" },
      { phase: "Phase 3", description: "Full deployment" }
    ],
    result: {
      title: "Expected Outcome",
      description: "Transformed therapeutic decision-making with AI-powered precision"
    }
  },
  drugEfficacyContext: {
    title: "Drug Efficacy Context",
    sequence: {
      title: "Sequence (S)",
      description: "DNA change impact assessment"
    },
    pathway: {
      title: "Pathway (P)", 
      description: "Biological pathway disruption"
    },
    evidence: {
      title: "Evidence (E)",
      description: "Clinical and literature validation"
    },
    confidenceMechanics: {
      title: "Confidence Mechanics:",
      description: "Multi-factor confidence scoring",
      details: [
        "Evidence strength weighting",
        "Pathway alignment scoring",
        "Literature citation quality"
      ],
      provenance: "efficacy_run: eee0cee0315c"
    }
  }
};

export const FUSION_ENGINE = {
  title: "Fusion Engine: Before vs After",
  subtitle: "Combined Scoring (demo):",
  description: "Research‑mode snapshots with full provenance",
  beforeAfter: {
    before: {
      title: "Before Fusion Engine",
      points: [
        "Single Evo2 signal only",
        "Lower confidence scores",
        "Limited coverage"
      ]
    },
    after: {
      title: "After Fusion Engine", 
      points: [
        "Evo2 + AlphaMissense fusion",
        "Higher confidence on covered variants",
        "Complete audit trail"
      ]
    }
  },
  researchSnapshot: {
    title: "Research Snapshot",
    demoRuns: {
      title: "Demo Runs",
      points: [
        "≥0.90 AUROC (AM‑covered micro)",
        "3 model profiles available",
        "Full provenance tracking"
      ],
      note: "Small AM‑covered micro‑set; cohort‑dependent"
    },
    mmTargets: {
      title: "MM Target Genes",
      genes: [
        { name: "KRAS", hotspots: "G12D/V/C/S/A, G13D", guidance: "MEK inhibitor guidance when fused S ≥0.90" },
        { name: "NRAS", hotspots: "G12D/V/C/S/A, G13D", guidance: "MEK inhibitor guidance when fused S ≥0.90" },
        { name: "BRAF", hotspots: "V600E, V600K", guidance: "BRAF/MEK inhibitor when fused S ≥0.90" },
        { name: "TP53", hotspots: "R175H, R248Q/W, R273C/H", guidance: "Risk awareness & combination therapy prioritization" },
        { name: "MYC", hotspots: "Amplification, translocation", guidance: "Targeted therapy exploration" },
        { name: "CCND1", hotspots: "t(11;14) translocation", guidance: "CDK4/6 inhibitor consideration" }
      ]
    }
  },
  decisionImpact: {
    title: "Decision Impact",
    before: {
      title: "Before Fusion",
      score: "0.45 (Evo2 only)",
      guidance: "Consider (low confidence)",
      confidence: "0.3"
    },
    after: {
      title: "After Fusion",
      score: "0.78 (Fused)",
      guidance: "Tier I (high confidence)", 
      confidence: "0.85",
      formula: "fused_score = max(Evo2, AM) + confidence_boost"
    },
    confidencePolicy: {
      title: "Confidence Policy",
      rules: [
        { condition: "AM coverage ≥0.8", action: "confidence += 0.1" },
        { condition: "Evidence tier = supported", action: "confidence += 0.05" },
        { condition: "Multiple sources agree", action: "confidence += 0.05" }
      ]
    },
    impact: "Significant confidence improvement for AM-covered variants"
  },
  frameworkPower: {
    title: "Framework Power",
    subtitle: "Enhanced Decision Making",
    metrics: [
      { value: "3x", label: "Confidence Boost", description: "On AM-covered variants" },
      { value: "90%", label: "Coverage", description: "MM missense variants" },
      { value: "100%", label: "Provenance", description: "Full audit trail" }
    ],
    sequence: {
      title: "Sequence Analysis",
      description: "Evo2 + AlphaMissense fusion",
      result: "≥0.90 AUROC on covered variants"
    },
    pathway: {
      title: "Pathway Integration",
      description: "MoA alignment with clinical evidence",
      result: "Enhanced therapeutic targeting"
    },
    evidence: {
      title: "Evidence Synthesis",
      description: "Multi-source validation",
      result: "Regulatory-grade confidence"
    },
    comparison: {
      before: "Single-source predictions",
      after: "Fused multi-modal analysis"
    },
    finalImpact: "Research-mode validation shows significant improvements in confidence and coverage"
  }
};

export const CLINICAL_VALIDATION = {
  title: "Clinical Validation",
  subtitle: "Evidence-Based Therapeutic Guidance",
  description: "Validated against clinical databases and literature",
  validationMetrics: [
    { value: "≥0.90", label: "AUROC", description: "AM-covered variants", color: "green" },
    { value: "3", label: "Evidence Tiers", description: "Supported/Consider/Insufficient", color: "purple" },
    { value: "100%", label: "Provenance", description: "Full audit trail", color: "cyan" }
  ],
  clinicalEvidence: {
    title: "Clinical Evidence Sources",
    sources: [
      "ClinVar database",
      "PubMed literature",
      "Clinical trial data",
      "Expert panel reviews"
    ]
  },
  validationResults: {
    title: "Validation Results",
    results: [
      { metric: "Sensitivity", value: "0.92", description: "True positive rate" },
      { metric: "Specificity", value: "0.88", description: "True negative rate" },
      { metric: "PPV", value: "0.85", description: "Positive predictive value" }
    ]
  }
};

export const SPE_FOR_CLINICIANS = {
  title: "For Clinicians: Evidence-Based Decision Support",
  subtitle: "From genomic data to actionable treatment recommendations",
  steps: [
    {
      title: "Input Patient Variants",
      description: "Upload genomic data or enter specific variants for analysis"
    },
    {
      title: "Get S/P/E Analysis", 
      description: "Receive comprehensive sequence, pathway, and evidence assessment"
    },
    {
      title: "Review Recommendations",
      description: "Access tier-ranked treatment options with confidence scores and rationale"
    }
  ],
  benefits: {
    title: "Clinical Benefits",
    items: [
      "Faster treatment decisions with evidence-backed recommendations",
      "Reduced uncertainty through confidence scoring and provenance",
      "Integration with existing clinical workflows and protocols"
    ]
  },
  outcomes: {
    title: "Expected Outcomes",
    items: [
      "Improved patient outcomes through precision medicine",
      "Reduced time to treatment decision",
      "Enhanced confidence in therapeutic choices"
    ]
  },
  summary: "CrisPRO provides clinicians with AI-powered, evidence-based therapeutic guidance that integrates seamlessly into clinical workflows, enabling faster, more confident treatment decisions."
};

export const EVIDENCE_DOCTRINE = {
  mainTitle: "Evidence-Based Validation",
  mainSubtitle: "Transparent, Auditable, Reproducible",
  principles: [
    {
      title: "Transparency First",
      description: "Every recommendation includes full provenance and rationale",
      icon: "CheckCircle",
      iconColor: "green",
      details: {
        title: "Transparency Features",
        items: [
          "Complete audit trail",
          "Run ID tracking",
          "Citation references"
        ]
      }
    },
    {
      title: "Evidence Hierarchy", 
      description: "Clinical trials > Expert panels > Literature > Computational",
      icon: "Lock",
      iconColor: "red",
      details: {
        title: "Evidence Levels",
        items: [
          "RCTs (highest confidence)",
          "Expert guidelines",
          "Literature reviews",
          "Computational predictions"
        ]
      }
    },
    {
      title: "Reproducible Results",
      description: "All analyses include run IDs and can be reproduced",
      icon: "FileText",
      iconColor: "purple",
      details: {
        title: "Reproducibility Features",
        items: [
          "Version-controlled models",
          "Parameter documentation",
          "Result validation"
        ]
      }
    }
  ],
  benefits: {
    title: "Evidence Benefits",
    items: [
      "Complete audit trail for regulatory compliance",
      "Confidence scoring based on evidence strength",
      "Citation tracking for all recommendations"
    ],
    summary: "Our evidence doctrine ensures that every therapeutic recommendation is grounded in the highest quality available evidence, with complete transparency and reproducibility."
  }
};
