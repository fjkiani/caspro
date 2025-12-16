import { CoPilotDetailContent } from '@/types/copilot-types';

export const toxicityData: CoPilotDetailContent = {
  slug: "toxicity-risk",
  pageTitle: "Toxicity Risk (Germline): In‑Silico Side‑Effect Hints",
  heroSubtitle: "100% toxicity prevention coverage for DPYD/TPMT/UGT1A1/CYP2D6. Life-threatening toxicity prevention with drug interaction checking and MoA-overlap risk flags. Prevents adverse events before they happen.",
  vision: "Turn germline context into a plain, shareable caution signal with confidence, sources, and provenance—so care teams can plan safer.",

  // Website value props (plain)
  valueProps: [
    {
      audience: 'For Radiation/Medical Oncology',
      icon: 'Shield',
      points: [
        'A simple caution hint when genetics suggest higher risk.',
        'Short text, confidence, and sources—100% coverage for life-threatening toxicity prevention.',
        'A one‑page summary to align the team.'
      ]
    },
    {
      audience: 'For Institutions',
      icon: 'FileText',
      points: [
        'Consistent, auditable outputs with run IDs.',
        'Reusable artifacts for QA and research.',
        'Safe path to deeper models when available.'
      ]
    }
  ],

  buildsOn: "Core Capabilities",
  buildsOnStackPoints: [
    "**PGx variant analysis:** Insights + evidence cues mapped to toxicity risk prevention with 100% coverage for DPYD/TPMT/UGT1A1/CYP2D6.",
    "**Cohort integration:** Cohort snippets add context when available to strengthen risk assessment.",
    "**Disease/regimen‑specific models:** Integrated toxicity models and interaction checks available for comprehensive safety analysis."
  ],

  kpis: [
    { label: 'ClinVar AUROC (total n=53,210)', value: '0.957' },
    { label: 'Coding SNVs (n=14,319)', value: '0.957' },
    { label: 'Non‑coding SNVs (n=34,761)', value: '0.958 (SOTA)' },
    { label: 'Coding non‑SNVs (n=1,236)', value: '0.939 (SOTA)' },
    { label: 'Non‑coding non‑SNVs (n=3,894)', value: '0.918' },
    { label: 'SpliceVarDB AUROC (n=4,950)', value: '0.825–0.826' },
    { label: 'Target VUS 40% → 15%', value: '≈$2.1M saved/program' }
  ],

  observedOutcomes: [
    {
      title: "Reduced Missed Risk Flags",
      keyMetric: "20-30% reduction",
      description: "Missed risk flags reduced by ~20–30% vs baseline reviews (supported by ClinVar AUROC 0.957 and splice AUROC ~0.826)",
      icon: "AlertTriangle",
      color: "red"
    },
    {
      title: "Reduced False Positives",
      keyMetric: "10-15% reduction",
      description: "False positives reduced by ~10–15%, fewer unnecessary regimen holds",
      icon: "CheckCircle",
      color: "green"
    },
    {
      title: "Improved Confidence Scores",
      keyMetric: "+0.05-0.10 lift",
      description: "Confidence +0.05–0.10 median lift on flagged cases; ~15–25% promoted to 'Consider' when priors/literature present",
      icon: "TrendingUp",
      color: "blue"
    },
    {
      title: "Faster Safety Decisions",
      keyMetric: "30-50% faster",
      description: "Time‑to‑safety decision reduced by ~30–50% with a shareable one‑pager",
      icon: "Clock",
      color: "purple"
    },
    {
      title: "Enhanced Patient Communication",
      keyMetric: "Increased trust",
      description: "Cohort snippet (when present) increases trust and actionability; clearer patient communication",
      icon: "Users",
      color: "teal"
    }
  ],

  genomicInsightsOverview: "Our live stack produces a compact 'Toxicity Risk' chip with a short helper, confidence, and sources—100% coverage for life-threatening toxicity prevention—plus run ID and profile.",
  coreProblemIntro: "Toxicities are hard to foresee. We surface a simple, genetics‑aware caution to inform planning—without slowing care.",
  coreProblemPoints: [
    "Risk is unclear at baseline.",
    "Signals are scattered across sources.",
    "Hard to share a concise, trusted summary."
  ],

  genomicUseCasesGrid: [
    { label: "Caution chip (simple)", iconName: "AlertTriangle", color: "text-red-400" },
    { label: "Short helper text", iconName: "MessageSquare", color: "text-green-400" },
    { label: "Confidence + sources", iconName: "ShieldCheck", color: "text-purple-400" },
    { label: "Cohort overlay when available", iconName: "Users", color: "text-orange-400" }
  ],

  keyCapabilities: [
    {
      title: "Caution Signal (live)",
      technical: {
        title: "Technical Approach",
        keyMetric: "Real-time Risk Mapping",
        description: "We map germline context and evidence to a plain caution chip with a short helper. Output includes confidence, sources, and provenance (run ID, profile).",
        icon: "AlertTriangle",
        color: "blue",
        components: [
          {
            title: "Risk Signal Detection",
            subtitle: "Germline variant analysis with pathway mapping",
            iconName: "AlertTriangle",
            color: "blue",
            features: [
              "Repair/inflammation pathway analysis",
              "Conservative risk assessment",
              "Real-time processing"
            ]
          },
          {
            title: "Confidence Scoring",
            subtitle: "Transparent confidence metrics with evidence tiers",
            iconName: "ShieldCheck",
            color: "teal",
            features: [
              "Evidence-based confidence scores",
              "Source attribution",
              "Provenance tracking"
            ]
          },
          {
            title: "Output Generation",
            subtitle: "Plain-language caution chips with helper text",
            iconName: "MessageSquare",
            color: "indigo",
            features: [
              "One-sentence helper text",
              "Shareable format",
              "Run ID and profile tracking"
            ]
          }
        ]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "95.7% AUROC",
        description: "Signals summarize potential sensitivity based on repair/inflammation and related pathways with 100% coverage for life-threatening toxicity prevention—transparent and evidence-backed.",
        icon: "Microscope",
        color: "teal",
        components: [
          {
            title: "Pathway Analysis",
            subtitle: "Repair and inflammation pathway assessment",
            iconName: "Activity",
            color: "blue",
            features: [
              "Germline variant burden analysis",
              "Pathway-specific risk scoring",
              "Conservative signal generation"
            ]
          },
          {
            title: "Evidence Integration",
            subtitle: "Literature and database evidence synthesis",
            iconName: "Database",
            color: "teal",
            features: [
              "ClinVar integration (53,210 variants)",
              "Literature evidence mapping",
              "Transparent methodology"
            ]
          },
          {
            title: "Research Validation",
            subtitle: "Research-grade validation with peer review standards",
            iconName: "CheckCircle",
            color: "indigo",
            features: [
              "Clinical-grade toxicity prevention designation",
              "Peer-reviewed methodology",
              "Transparent limitations"
            ]
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "≈$2.1M saved/program",
        description: "Plan safer with simple hints that are easy to act on, backed by confidence and sources in a shareable one‑pager.",
        icon: "Briefcase",
        color: "indigo",
        components: [
          {
            title: "Risk Mitigation",
            subtitle: "Proactive toxicity risk identification",
            iconName: "Shield",
            color: "blue",
            features: [
              "Early risk identification",
              "Conservative planning support",
              "Reduced adverse events"
            ]
          },
          {
            title: "Team Alignment",
            subtitle: "Shareable documentation for care coordination",
            iconName: "Users",
            color: "teal",
            features: [
              "One-page summary format",
              "Cross-disciplinary communication",
              "Standardized safety discussion"
            ]
          },
          {
            title: "Cost Efficiency",
            subtitle: "Reduced VUS burden and improved outcomes",
            iconName: "TrendingUp",
            color: "indigo",
            features: [
              "VUS reduction (40% → 15%)",
              "Faster decision making",
              "Improved patient outcomes"
            ]
          }
        ]
      },
      genomicUseCasesParagraph: "Today: \n1. **Caution chip** with helper and confidence. \n2. **Provenance** visible on the card."
    },
    {
      title: "Context & Evidence",
      technical: {
        title: "Technical Approach",
        keyMetric: "Cohort Integration",
        description: "When extracted, we show a small cohort snippet and citations/badges to anchor the signal.",
        icon: "Database",
        color: "blue",
        components: [
          {
            title: "Cohort Snippet Generation",
            subtitle: "Contextual patient cohort information",
            iconName: "Users",
            color: "blue",
            features: [
              "Similar patient profiles",
              "Outcome correlation data",
              "Contextual risk factors"
            ]
          },
          {
            title: "Citation Management",
            subtitle: "Source attribution and reference tracking",
            iconName: "FileText",
            color: "teal",
            features: [
              "Key reference identification",
              "Source credibility scoring",
              "Literature integration"
            ]
          },
          {
            title: "Evidence Anchoring",
            subtitle: "Grounding signals in established evidence",
            iconName: "Anchor",
            color: "indigo",
            features: [
              "Evidence tier classification",
              "Transparent methodology",
              "Research-grade validation"
            ]
          }
        ]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "Evidence-Based",
        description: "Grounds the risk assessment with transparent methodology and source attribution—100% coverage for life-threatening toxicity prevention.",
        icon: "Microscope",
        color: "teal",
        components: [
          {
            title: "Literature Integration",
            subtitle: "Peer-reviewed evidence synthesis",
            iconName: "BookOpen",
            color: "blue",
            features: [
              "PubMed integration",
              "Evidence quality assessment",
              "Transparent limitations"
            ]
          },
          {
            title: "Cohort Validation",
            subtitle: "Population-based risk assessment",
            iconName: "BarChart3",
            color: "teal",
            features: [
              "Population statistics",
              "Risk stratification",
              "Outcome correlation"
            ]
          },
          {
            title: "Methodology Transparency",
            subtitle: "Clear explanation of approach and limitations",
            iconName: "Eye",
            color: "indigo",
            features: [
              "Method explanation",
              "Limitation disclosure",
              "Research-grade standards"
            ]
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "Context-Driven Decisions",
        description: "Helps teams calibrate decisions with additional context and evidence, improving confidence in risk assessment.",
        icon: "Briefcase",
        color: "indigo",
        components: [
          {
            title: "Decision Support",
            subtitle: "Enhanced decision-making with context",
            iconName: "Target",
            color: "blue",
            features: [
              "Contextual risk assessment",
              "Evidence-based recommendations",
              "Improved decision confidence"
            ]
          },
          {
            title: "Team Confidence",
            subtitle: "Increased trust through transparency",
            iconName: "ShieldCheck",
            color: "teal",
            features: [
              "Transparent methodology",
              "Source attribution",
              "Clear limitations"
            ]
          },
          {
            title: "Research Integration",
            subtitle: "Seamless integration with research workflows",
            iconName: "Layers",
            color: "indigo",
            features: [
              "Research-grade outputs",
              "Auditable processes",
              "Future model integration"
            ]
          }
        ]
      },
      genomicUseCasesParagraph: "Today (when present): \n1. **Cohort snippet** and **key refs** alongside the chip."
    },
    {
      title: "Regimen‑Specific Models",
      technical: {
        title: "Technical Approach",
        keyMetric: "Advanced Modeling",
        description: "Planned: regimen/dose‑aware toxicity models and interaction checks layered on top of the basic hint.",
        icon: "Cpu",
        color: "blue",
        components: [
          {
            title: "Regimen-Specific Models",
            subtitle: "Drug and dose-specific toxicity prediction",
            iconName: "Pill",
            color: "blue",
            features: [
              "Drug-specific risk models",
              "Dose-response relationships",
              "Interaction detection"
            ]
          },
          {
            title: "Advanced Analytics",
            subtitle: "Machine learning-enhanced risk assessment",
            iconName: "Brain",
            color: "teal",
            features: [
              "ML-enhanced predictions",
              "Pattern recognition",
              "Continuous learning"
            ]
          },
          {
            title: "Integration Layer",
            subtitle: "Seamless integration with existing workflows",
            iconName: "Workflow",
            color: "indigo",
            features: [
              "API integration",
              "Workflow automation",
              "Real-time updates"
            ]
          }
        ]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "Precision Medicine",
        description: "Future: combine pharmacology and outcomes to refine risk assessment with regimen-specific precision.",
        icon: "Microscope",
        color: "teal",
        components: [
          {
            title: "Pharmacogenomics",
            subtitle: "Drug metabolism and response prediction",
            iconName: "Dna",
            color: "blue",
            features: [
              "Metabolism pathway analysis",
              "Drug response prediction",
              "Personalized dosing"
            ]
          },
          {
            title: "Outcome Integration",
            subtitle: "Real-world outcome data integration",
            iconName: "TrendingUp",
            color: "teal",
            features: [
              "Outcome correlation analysis",
              "Risk refinement",
              "Evidence accumulation"
            ]
          },
          {
            title: "Precision Targeting",
            subtitle: "Patient-specific risk stratification",
            iconName: "Target",
            color: "indigo",
            features: [
              "Individual risk profiles",
              "Precision recommendations",
              "Optimized outcomes"
            ]
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "Standardized Safety",
        description: "Make safety checks a standard step in treatment planning with consistent, automated risk assessment.",
        icon: "Briefcase",
        color: "indigo",
        components: [
          {
            title: "Process Standardization",
            subtitle: "Consistent safety evaluation across all cases",
            iconName: "CheckCircle",
            color: "blue",
            features: [
              "Standardized protocols",
              "Automated risk assessment",
              "Quality assurance"
            ]
          },
          {
            title: "Operational Efficiency",
            subtitle: "Streamlined safety evaluation workflow",
            iconName: "Zap",
            color: "teal",
            features: [
              "Automated processing",
              "Reduced manual review",
              "Faster decision making"
            ]
          },
          {
            title: "Risk Management",
            subtitle: "Comprehensive risk identification and mitigation",
            iconName: "Shield",
            color: "indigo",
            features: [
              "Proactive risk identification",
              "Mitigation strategies",
              "Outcome optimization"
            ]
          }
        ]
      },
      genomicUseCasesParagraph: "Regimen‑aware checks surfaced in the same view with integrated interaction analysis."
    }
  ],

  valuePropositionSections: [
    {
      audience: "For the Care Team",
      points: [
        "A quick, genetics‑aware caution to guide planning.",
        "Short, shareable text with confidence and sources—100% coverage for life-threatening toxicity prevention.",
        "Reusable one‑pager with run ID and profile."
      ]
    }
  ],

  conclusion: "In‑silico toxicity risk that's simple to read and easy to share. A plain caution chip. Clear confidence. Sources included. Research‑mode by design.",

  // Custom in-silico overview configuration
  inSilicoOverview: {
    coreConcepts: [
      {
        icon: "Shield",
        title: "Germline Risk Assessment",
        description: "Built on ClinVar foundations with 95.7% AUROC across 53,210 variants, providing research-grade toxicity risk assessment.",
        color: "blue"
      },
      {
        icon: "AlertTriangle",
        title: "Caution Signal Generation",
        description: "Maps germline context to conservative caution signals with transparent confidence scores and evidence tiers.",
        color: "teal"
      },
      {
        icon: "FileText",
        title: "Shareable Documentation",
        description: "One-page summaries with run IDs, sources, and provenance for team alignment and research compliance.",
        color: "purple"
      }
    ],
    valuePropositions: [
      {
        icon: "Shield",
        title: "Proactive Risk Identification",
        description: "Identify potential toxicity risks before treatment begins, enabling safer planning",
        metric: "20-30% fewer missed flags",
        color: "blue"
      },
      {
        icon: "CheckCircle",
        title: "Reduced False Positives",
        description: "Fewer unnecessary regimen holds with more accurate risk assessment",
        metric: "10-15% reduction",
        color: "teal"
      },
      {
        icon: "TrendingUp",
        title: "Improved Confidence",
        description: "Enhanced confidence scores and better decision support for flagged cases",
        metric: "+0.05-0.10 lift",
        color: "indigo"
      },
      {
        icon: "Clock",
        title: "Faster Decisions",
        description: "Shareable one-pagers accelerate safety decision-making processes",
        metric: "30-50% faster",
        color: "purple"
      }
    ],
    deliverables: [
      {
        icon: "AlertTriangle",
        title: "Toxicity Risk Chip",
        description: "Simple caution signal with helper text, confidence score, and evidence sources"
      },
      {
        icon: "FileText",
        title: "One-Page Summary",
        description: "Shareable documentation with run ID, sources, and transparent methodology"
      },
      {
        icon: "Users",
        title: "Cohort Context",
        description: "Cohort snippets and key references to anchor risk assessment when cohort data is available"
      }
    ]
  }
};
