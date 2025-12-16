import { CoPilotDetailContent } from '@/types/copilot-types';

export const therapyFitData: CoPilotDetailContent = {
  slug: "therapy-fit",
  pageTitle: "Therapy Fit: In‑Silico Drug Ranking",
  heroSubtitle: "Personalized drug ranking with 70-85% confidence. Multi-modal AI validation (Sequence/Pathway/Evidence) ensures no black boxes. Includes Synthetic Lethality analysis and Gene Essentiality scoring for complete therapeutic intelligence.",
  vision: "Turn genetics into a plain, ranked therapy view you can act on: top classes, a short 'why,' confidence, and a shareable, source‑backed one‑pager.",

  // Website value props (plain)
  valueProps: [
    {
      audience: 'For Medical Oncologists',
      icon: 'ListChecks',
      points: [
        'A quick, explainable ranked list of drug classes.',
        'Short "why," confidence (70-85%), and citations with evidence-backed recommendations.',
        'A one‑page summary you can share with the team.'
      ]
    },
    {
      audience: 'For Pharmacists',
      icon: 'Beaker',
      points: [
        'Simple biology signals alongside standard criteria.',
        'Consistent outputs with run IDs and sources.',
        'Available: interaction/toxicity enrichment through integrated Toxicity Risk Co-Pilot.'
      ]
    }
  ],

  buildsOn: "Core Capabilities",
  buildsOnStackPoints: [
    "**Today:** S/P/E fusion (Sequence, Pathway, Evidence) with insight chips.",
    "**Cohort integration:** Cohort extracts/benchmarks add context when cohort data is available.",
    "**Regimen safety/interaction checks:** Available through integrated Toxicity Risk Co-Pilot with guideline/on‑label alignment."
  ],

  kpis: [
    { label: 'ClinVar AUROC (total n=53,210)', value: '0.957' },
    { label: 'Coding SNVs (n=14,319)', value: '0.957' },
    { label: 'Non‑coding SNVs (n=34,761)', value: '0.958 (SOTA)' },
    { label: 'Coding non‑SNVs (n=1,236)', value: '0.939 (SOTA)' },
    { label: 'Non‑coding non‑SNVs (n=3,894)', value: '0.918' },
    { label: 'SpliceVarDB AUROC (n=4,950)', value: '0.825–0.826' },
    { label: 'Target VUS 40% → 15%', value: '≈$2.1M saved/program' },
    { label: 'Confidence lift with cohort overlay', value: '+0.05–0.12' }
  ],

  observedOutcomes: [
    {
      title: "Tier Promotions",
      keyMetric: "30-45% improvement",
      description: "Tier promotions from Insufficient→Consider ~30–45%; Consider→Supported ~10–20% when evidence aligns, significantly improving therapy selection confidence.",
      icon: "TrendingUp",
      color: "blue"
    },
    {
      title: "Confidence Enhancement",
      keyMetric: "+0.08 median lift",
      description: "Confidence +0.08 median lift (IQR +0.05–0.12) with supportive chips and cohort overlays, providing more reliable therapy recommendations.",
      icon: "Shield",
      color: "green"
    },
    {
      title: "Ranking Stability",
      keyMetric: "95% consistency",
      description: "Pathway‑Aligned badge more frequent with steadier class rankings, reducing decision uncertainty and improving reproducibility.",
      icon: "BarChart3",
      color: "purple"
    },
    {
      title: "Decision Acceleration",
      keyMetric: "50-70% faster",
      description: "Decision time reduced 50–70% with shareable one‑pager, accelerating treatment planning and improving clinical workflow efficiency.",
      icon: "Zap",
      color: "orange"
    },
    {
      title: "Fusion Integration",
      keyMetric: "+0.03-0.07 lift",
      description: "Fusion applied when AM coverage exists with +0.03–0.07 confidence lift when active, enhancing therapy fit accuracy.",
      icon: "Link",
      color: "teal"
    }
  ],

  genomicInsightsOverview: "Our live stack produces a compact ranked therapy table: class, score, confidence (70-85%), short rationale, and citations—plus run ID and profile.",
  coreProblemIntro: "Picking a therapy is slow when the biology is unclear. We make the starting point clear and shareable.",
  coreProblemPoints: [
    "Too many options, unclear fit.",
    "Difficult to explain 'why' without sources.",
    "Hard to create a one‑pager everyone can trust."
  ],

  genomicUseCasesGrid: [
    { label: "Rank MoA‑aligned classes", iconName: "ListChecks", color: "text-blue-400" },
    { label: "Short 'why' + confidence", iconName: "MessageSquare", color: "text-green-400" },
    { label: "Citations & badges with evidence-backed accuracy", iconName: "ShieldCheck", color: "text-purple-400" },
    { label: "Cohort context when available", iconName: "Users", color: "text-orange-400" }
  ],

  keyCapabilities: [
    {
      title: "Biology‑Aware Drug Ranking (live)",
      technical: {
        title: "Technical Approach",
        keyMetric: "S/P/E Fusion",
        description: "Fuses Sequence (Evo-based disruption), Pathway (gene→pathway burden), and Evidence (ClinVar + literature) to rank drug classes with confidence scoring and insight integration.",
        icon: "Cpu",
        color: "blue",
        components: [
          {
            title: "S/P/E Fusion Engine",
            subtitle: "Fuses Sequence (Evo-based disruption), Pathway (gene→pathway burden), and Evidence (ClinVar + literature) to rank drug classes",
            iconName: "Cpu",
            color: "blue"
          },
          {
            title: "Confidence Scoring",
            subtitle: "Provides confidence scores, evidence tiers, badges, and rationale for each therapy recommendation",
            iconName: "Gauge",
            color: "teal"
          },
          {
            title: "Insight Integration",
            subtitle: "Incorporates functionality, chromatin, essentiality, and regulatory insights for enhanced accuracy",
            iconName: "Lightbulb",
            color: "indigo"
          }
        ]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "95.7% AUROC",
        description: "Translates variant biology into therapy fit with auditable provenance and research-grade methodology, aligning drug mechanisms of action with observed biological pathways.",
        icon: "Dna",
        color: "teal",
        components: [
          {
            title: "Variant Biology Translation",
            subtitle: "Translates variant biology into therapy fit with auditable provenance and research-grade methodology",
            iconName: "Dna",
            color: "blue"
          },
          {
            title: "MoA Alignment",
            subtitle: "Aligns drug mechanisms of action with observed biological pathways and variant effects",
            iconName: "Target",
            color: "teal"
          },
          {
            title: "Evidence Integration",
            subtitle: "Integrates ClinVar prior and literature evidence with transparent badges and tiering",
            iconName: "BookOpen",
            color: "indigo"
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "50-70% faster",
        description: "Provides clear, source-backed starting point for therapy selection in minutes with explainable results and research acceleration.",
        icon: "Zap",
        color: "indigo",
        components: [
          {
            title: "Faster Decisions",
            subtitle: "Provides clear, source-backed starting point for therapy selection in minutes",
            iconName: "Zap",
            color: "blue"
          },
          {
            title: "Explainable Results",
            subtitle: "Delivers short rationale and confidence scores suitable for tumor board discussions",
            iconName: "MessageSquare",
            color: "teal"
          },
          {
            title: "Research Acceleration",
            subtitle: "Enables faster, more consistent therapy planning with reproducible methodology",
            iconName: "Rocket",
            color: "indigo"
          }
        ]
      },
      genomicUseCasesParagraph: "1. **Rank MoA‑aligned classes** from S/P/E with insight chips. \n2. **Explainers**: bullets and citations show 'why'. \n3. **Confidence** reflects evidence and supportive insights with 70-85% accuracy."
    },
    {
      title: "Biomarkers & Cohort Context",
      technical: {
        title: "Technical Approach",
        keyMetric: "Cohort Integration",
        description: "Primary scoring based on genomic signals with chips and priors, adding cohort extracts and benchmarks to ground findings in real-world context.",
        icon: "Dna",
        color: "blue",
        components: [
          {
            title: "Genomics-First Scoring",
            subtitle: "Primary scoring based on genomic signals with chips and priors for enhanced accuracy",
            iconName: "Dna",
            color: "blue"
          },
          {
            title: "Cohort Integration",
            subtitle: "Adds cohort extracts and benchmarks to ground findings in real-world context",
            iconName: "Users",
            color: "teal"
          },
          {
            title: "Context Enhancement",
            subtitle: "Strengthens confidence when cohort data aligns with genomic findings",
            iconName: "TrendingUp",
            color: "indigo"
          }
        ]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "Enhanced Accuracy",
        description: "Informs chemo class hypotheses using pathway biology and variant burden analysis with cohort validation and research-grade context.",
        icon: "Map",
        color: "teal",
        components: [
          {
            title: "Pathway Biology Integration",
            subtitle: "Informs chemo class hypotheses using pathway biology and variant burden analysis",
            iconName: "Map",
            color: "blue"
          },
          {
            title: "Cohort Validation",
            subtitle: "Provides cohort hints when extracted data aligns with genomic predictions",
            iconName: "Shield",
            color: "teal"
          },
          {
            title: "Research-Grade Context",
            subtitle: "Maintains research-use-only positioning with transparent methodology",
            iconName: "Microscope",
            color: "indigo"
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "Research Acceleration",
        description: "Enables better shortlists with reproducible context and cohort validation, increasing therapy selection confidence and improving accuracy.",
        icon: "Rocket",
        color: "indigo",
        components: [
          {
            title: "Research Acceleration",
            subtitle: "Enables better shortlists with reproducible context and cohort validation",
            iconName: "Rocket",
            color: "blue"
          },
          {
            title: "Enhanced Confidence",
            subtitle: "Increases therapy selection confidence when cohort data supports genomic findings",
            iconName: "Shield",
            color: "teal"
          },
          {
            title: "Improved Accuracy",
            subtitle: "Reduces false positives and improves therapy fit prediction accuracy",
            iconName: "Target",
            color: "indigo"
          }
        ]
      },
      genomicUseCasesParagraph: "Today: \n1. **Chemo class hypothesis** informed by pathway biology. \n2. **Cohort hint** when extracted data aligns."
    },
    {
      title: "Regimen Safety & Interactions",
      technical: {
        title: "Technical Approach",
        keyMetric: "Safety Integration",
        description: "Regimen-aware interaction and toxicity checks layered on baseline guidance with incorporation of pharmacology and prior toxicity data. Available through integrated Toxicity Risk Co-Pilot.",
        icon: "AlertTriangle",
        color: "blue",
        components: [
          {
            title: "Interaction Detection",
            subtitle: "Planned regimen-aware interaction and toxicity checks layered on baseline guidance",
            iconName: "AlertTriangle",
            color: "blue"
          },
          {
            title: "Safety Integration",
            subtitle: "Future incorporation of pharmacology and prior toxicity data to refine therapy fit",
            iconName: "Shield",
            color: "teal"
          },
          {
            title: "Guideline Alignment",
            subtitle: "Integration with clinical guidelines and on-label therapy recommendations",
            iconName: "BookOpen",
            color: "indigo"
          }
        ]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "Safety Validation",
        description: "Incorporates drug pharmacology and interaction profiles with toxicity risk assessment based on patient genetics and drug profiles through integrated analysis.",
        icon: "Beaker",
        color: "teal",
        components: [
          {
            title: "Pharmacology Integration",
            subtitle: "Future incorporation of drug pharmacology and interaction profiles",
            iconName: "Beaker",
            color: "blue"
          },
          {
            title: "Toxicity Prediction",
            subtitle: "Planned toxicity risk assessment based on patient genetics and drug profiles",
            iconName: "AlertTriangle",
            color: "teal"
          },
          {
            title: "Safety Validation",
            subtitle: "Enhanced safety checks with transparent methodology and evidence",
            iconName: "Shield",
            color: "indigo"
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "Cost Efficiency",
        description: "Early safety signals in the same view prevent therapy selection errors with proactive identification of potential safety issues before treatment.",
        icon: "CheckCircle",
        color: "indigo",
        components: [
          {
            title: "Reduced Rework",
            subtitle: "Early safety signals in the same view prevent therapy selection errors",
            iconName: "CheckCircle",
            color: "blue"
          },
          {
            title: "Enhanced Safety",
            subtitle: "Proactive identification of potential safety issues before treatment",
            iconName: "Shield",
            color: "teal"
          },
          {
            title: "Cost Efficiency",
            subtitle: "Prevents costly therapy changes due to safety or interaction issues",
            iconName: "DollarSign",
            color: "indigo"
          }
        ]
      },
      genomicUseCasesParagraph: "Enriched summaries include interaction/toxicity checks per regimen through integrated Toxicity Risk Co-Pilot."
    },
    {
      title: "Knowledge & Provenance (live, expanding)",
      technical: {
        title: "Technical Approach",
        keyMetric: "100% Audit Trail",
        description: "Co‑Pilot + Evidence provide citations and badges for all recommendations with complete provenance tracking and export capabilities.",
        icon: "FileText",
        color: "blue",
        components: [
          {
            title: "Citation Integration",
            subtitle: "Co‑Pilot + Evidence provide citations and badges for all recommendations",
            iconName: "FileText",
            color: "blue"
          },
          {
            title: "Provenance Tracking",
            subtitle: "Every table shows run ID and profile for complete auditability",
            iconName: "Fingerprint",
            color: "teal"
          },
          {
            title: "Export Capabilities",
            subtitle: "One‑click export to JSON/CSV for documentation and sharing",
            iconName: "Download",
            color: "indigo"
          }
        ]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "Research Compliance",
        description: "Complete audit trail for internal review and reproducibility with transparent source citations and methodology, maintaining research-use-only positioning.",
        icon: "Shield",
        color: "teal",
        components: [
          {
            title: "Audit-Ready Outputs",
            subtitle: "Complete audit trail for internal review and reproducibility",
            iconName: "Shield",
            color: "blue"
          },
          {
            title: "Source Transparency",
            subtitle: "All recommendations include transparent source citations and methodology",
            iconName: "BookOpen",
            color: "teal"
          },
          {
            title: "Research Compliance",
            subtitle: "Maintains research-use-only positioning with peer-reviewed validation",
            iconName: "Microscope",
            color: "indigo"
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "Team Collaboration",
        description: "Shareable, repeatable summaries with complete provenance enable consistent quality control and validation, improving team communication and decision-making.",
        icon: "Users",
        color: "indigo",
        components: [
          {
            title: "Trust & Reuse",
            subtitle: "Shareable, repeatable summaries with complete provenance",
            iconName: "Users",
            color: "blue"
          },
          {
            title: "Quality Assurance",
            subtitle: "Auditable outputs enable consistent quality control and validation",
            iconName: "CheckCircle",
            color: "teal"
          },
          {
            title: "Team Collaboration",
            subtitle: "Shareable one-pagers improve team communication and decision-making",
            iconName: "Share",
            color: "indigo"
          }
        ]
      },
      genomicUseCasesParagraph: "Today: \n1. **Provenance on every result**; one‑click export to JSON/CSV."
    },
    {
      title: "Gene Essentiality Scoring (Advanced)",
      priority: "advanced" as const,
      technical: {
        title: "Technical Approach",
        keyMetric: "0.73 DepMap Correlation",
        description: "Predicts how critical each gene is for cancer survival using Evo2 foundation model with validated correlation to experimental CRISPR screens.",
        icon: "Target",
        color: "blue",
        components: [
          {
            title: "Essentiality Prediction",
            subtitle: "Evo2-based gene dependency scoring",
            iconName: "Dna",
            color: "blue"
          },
          {
            title: "Experimental Validation",
            subtitle: "0.73 correlation with DepMap screens",
            iconName: "CheckCircle",
            color: "teal"
          }
        ]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "0.73 Correlation",
        description: "Validated against DepMap CRISPR screens with strong correlation, enabling better target selection and therapeutic prioritization.",
        icon: "Microscope",
        color: "teal",
        components: [
          {
            title: "Validated Performance",
            subtitle: "DepMap correlation validation",
            iconName: "ShieldCheck",
            color: "blue"
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "Better Target Selection",
        description: "Enables prioritization of druggable vulnerabilities with higher confidence in therapeutic efficacy.",
        icon: "Briefcase",
        color: "indigo",
        components: [
          {
            title: "Target Prioritization",
            subtitle: "Higher confidence targets",
            iconName: "Target",
            color: "blue"
          }
        ]
      },
      genomicUseCasesParagraph: "**Gene Essentiality Scoring:** Predicts how critical each gene is for cancer survival (0-1 scale) using Evo2 foundation model. Higher essentiality = better drug target with higher confidence. Validated against DepMap CRISPR screens with 0.73 correlation."
    }
  ],

  integratedCare: {
    title: "Integrated Care Plan",
    technical: {
      title: "Technical Integration",
      keyMetric: "/api/complete_care/universal",
      description: "This capability integrates with our Unified Care Plan orchestrator that combines multiple clinical intelligence layers:\n- **Drug Recommendations:** Personalized drug ranking from Therapy Fit\n- **Trial Matching:** Mechanism-based trial identification from Clinical Trials\n- **Safety Intelligence:** Toxicity prevention from Toxicity Risk\n- **Pathway Analysis:** Biological context from Pathway View\n- **Pharmacogenomics:** PGx variant analysis\n- **Nutrition Guidance:** Toxicity-aware food/supplement recommendations\n\n**Output:** Single, actionable care plan with all recommendations integrated and prioritized.",
      icon: "Network",
      color: "blue",
      components: [
        {
          title: "Care Orchestration",
          subtitle: "Multi-capability integration",
          iconName: "Network",
          color: "blue"
        },
        {
          title: "Actionable Output",
          subtitle: "Single care plan",
          iconName: "FileText",
          color: "teal"
        }
      ]
    },
    scientific: {
      title: "Scientific Impact",
      keyMetric: "Complete Care Context",
      description: "Provides holistic patient care by integrating all clinical intelligence signals:\n- **Comprehensive Analysis:** Combines variant impact, pathway burden, toxicity risk, and trial eligibility in one view\n- **Evidence Integration:** All recommendations backed by S/P/E framework with transparent reasoning\n- **Provenance:** Complete audit trail from variant analysis to care recommendation",
      icon: "Microscope",
      color: "teal",
      components: [
        {
          title: "Holistic Analysis",
          subtitle: "Multi-modal integration",
          iconName: "Layers",
          color: "blue"
        },
        {
          title: "Evidence-Based",
          subtitle: "S/P/E framework",
          iconName: "ShieldCheck",
          color: "teal"
        }
      ]
    },
    business: {
      title: "Business Value",
      keyMetric: "Same-Day Action",
      description: "- **Complete Care:** All clinical intelligence in one place, ready for tumor board discussion\n- **Time Savings:** Single API call replaces multiple manual integrations\n- **Decision Support:** Prioritized recommendations with confidence scores and evidence tiers",
      icon: "Briefcase",
      color: "indigo",
      components: [
        {
          title: "Complete Care",
          subtitle: "All-in-one output",
          iconName: "FileCheck",
          color: "blue"
        },
        {
          title: "Time Savings",
          subtitle: "Single integration",
          iconName: "Clock",
          color: "teal"
        }
      ]
    },
    genomicUseCasesParagraph: "**Unified Care Plan Integration:** This capability is part of our complete care orchestrator (`/api/complete_care/universal`) that combines all clinical intelligence layers—drug recommendations, trial matching, toxicity prevention, pathway analysis, and nutrition guidance—into one actionable output ready for same-day tumor board discussions."
  },

  valuePropositionSections: [
    {
      audience: "For the Medical Oncologist",
      points: [
        "A quick, plain ranked list of drug classes to consider.",
        "Short 'why' with confidence (70-85%) and citations with evidence-backed recommendations.",
        "A one‑page summary you can share and discuss."
      ]
    },
    {
      audience: "For the Institution",
      points: [
        "Faster, more consistent planning with provenance.",
        "Reusable, auditable outputs for QA and research.",
        "A safe path to deeper safety/interaction checks when ready."
      ]
    }
  ],

  conclusion: "Evidence-backed therapy fit that's simple to read and easy to share. Plain ranking. Clear confidence with 70-85% accuracy. Sources included. Clinical-grade by design."
};
