import { CoPilotDetailContent } from '@/types/copilot-types';

/**
 * CrisPRO Oncology Product Data
 * Product-focused (not feature-focused) - Shows outcomes, not individual capabilities
 * Reuses CoPilotDetailContent type to work with existing components
 */
export const oncologyProductData: CoPilotDetailContent = {
  slug: "oncology",
  pageTitle: "CrisPRO Oncology: From VUS to Validated Care Plan",
  heroSubtitle: "Evidence-backed treatment recommendations with transparent confidence scores. Every recommendation shows WHY (eligibility + fit + conditions), not just WHAT. Action-ready packets mean you can call trial sites the same day.",
  vision: "Transform clinical oncology from uncertainty to precision - from VUS resolution to validated care plans in minutes, not months.",

  valueProps: [
    {
      audience: 'For Medical Oncologists',
      icon: 'Stethoscope',
      points: [
        'Evidence-backed treatment recommendations with transparent confidence scores',
        'Every recommendation shows WHY (eligibility + fit + conditions), not just WHAT',
        'Action-ready packets mean you can call trial sites the same day'
      ]
    },
    {
      audience: 'For Clinical Directors',
      icon: 'Building2',
      points: [
        '73% VUS resolution rate reduces genetic uncertainty',
        'Same-day tumor board ready dossiers',
        'Complete audit trail for QA and research'
      ]
    }
  ],

  buildsOn: "Powered By World's First Biological Foundation Models",
  buildsOnStackPoints: [
    "**Oracle Engine:** Zero-shot variant interpretation with 95.7% AUROC",
    "**Command Center:** Patient data integration (VCF/BAM ingestion) with complete audit trails",
    "**Unified Care API:** Complete care orchestration integrating all clinical intelligence layers"
  ],

  kpis: [
    { label: 'ClinVar AUROC (total n=53,210)', value: '95.7%' },
    { label: 'VUS Resolution Rate', value: '73% actionable conversion' },
    { label: 'Trial Matching Accuracy', value: '96.6%' },
    { label: 'Toxicity Prevention Coverage', value: '100% (DPYD/TPMT/UGT1A1/CYP2D6)' },
    { label: 'Decision Time Reduction', value: '6 weeks → Same day' },
    { label: 'Cost Per Variant', value: '$75K → $50 (99.9% reduction)' }
  ],

  observedOutcomes: [
    {
      title: "VUS Resolution",
      keyMetric: "73% actionable conversion",
      description: "73% of uncertain variants become actionable with 95.7% accuracy, reducing genetic uncertainty from 40% to 15%",
      icon: "Target",
      color: "blue"
    },
    {
      title: "Decision Speed",
      keyMetric: "6 weeks → Same day",
      description: "Treatment selection timeline reduced from 6 weeks to same day with action-ready dossiers",
      icon: "Zap",
      color: "green"
    },
    {
      title: "Trial Matching Accuracy",
      keyMetric: "96.6% match accuracy",
      description: "Transparent eligibility reasoning with green/yellow/red flags per criterion",
      icon: "CheckCircle",
      color: "purple"
    },
    {
      title: "Resistance Detection",
      keyMetric: "3-6 weeks earlier",
      description: "Proactive resistance detection 3-6 weeks faster than imaging with CA-125 intelligence",
      icon: "Shield",
      color: "orange"
    },
    {
      title: "Complete Care Integration",
      keyMetric: "Single unified output",
      description: "Drugs + Trials + Safety + Nutrition + Monitoring integrated in one actionable care plan",
      icon: "Network",
      color: "teal"
    }
  ],

  genomicInsightsOverview: "CrisPRO Oncology delivers complete clinical intelligence: from VUS resolution to validated care plans, every recommendation is evidence-backed, transparent, and ready for same-day clinical decisions.",
  
  coreProblemIntro: "Clinical oncology faces three critical challenges: genetic uncertainty, slow decision-making, and fragmented care planning.",
  coreProblemPoints: [
    "40% of variants are of unknown significance (VUS), paralyzing clinical decision-making",
    "Treatment selection takes 6+ weeks, delaying patient care",
    "Care planning is fragmented across multiple tools and sources, requiring manual integration"
  ],

  genomicUseCasesGrid: [
    { label: "Resolve Genetic Uncertainty", iconName: "Search", color: "text-blue-400" },
    { label: "Match Patients to Therapies", iconName: "Users", color: "text-green-400" },
    { label: "Prevent Toxicity Before It Happens", iconName: "ShieldAlert", color: "text-purple-400" },
    { label: "Predict Resistance Proactively", iconName: "TrendingUp", color: "text-orange-400" },
    { label: "Complete Unified Care Plans", iconName: "FileCheck", color: "text-teal-400" }
  ],

  keyCapabilities: [
    {
      title: "Resolve Genetic Uncertainty",
      priority: "primary",
      technical: {
        title: "Technical Approach",
        keyMetric: "95.7% AUROC",
        description: "Zero-shot variant interpretation with Evo2 foundation model. Instantly resolves variants of unknown significance (VUS) with 95.7% ClinVar AUROC accuracy. No task-specific training required.",
        icon: "Search",
        color: "blue",
        components: [
          {
            title: "Zero-Shot Interpretation",
            subtitle: "Evo2 foundation model with 95.7% ClinVar AUROC",
            iconName: "Zap",
            color: "blue"
          },
          {
            title: "Transparent Reasoning",
            subtitle: "SAE feature attribution shows biological reasoning",
            iconName: "Eye",
            color: "teal"
          },
          {
            title: "73% VUS Resolution",
            subtitle: "Actionable conversion from uncertain to validated",
            iconName: "CheckCircle",
            color: "indigo"
          }
        ]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "73% VUS Resolution Rate",
        description: "Transforms 40% VUS rate to 15% through validated interpretation. 95.7% ClinVar AUROC across 53,210 variants with transparent biological reasoning.",
        icon: "Microscope",
        color: "teal",
        components: [
          {
            title: "Validated Performance",
            subtitle: "95.7% AUROC on ClinVar benchmark (n=53,210)",
            iconName: "Award",
            color: "blue"
          },
          {
            title: "Actionable Conversion",
            subtitle: "73% of uncertain variants become actionable",
            iconName: "TrendingUp",
            color: "teal"
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "Same-Day Decisions",
        description: "Eliminates genetic uncertainty that delays treatment decisions. Reduces VUS rate from 40% to 15%, enabling same-day clinical action.",
        icon: "Clock",
        color: "indigo",
        components: [
          {
            title: "Faster Decisions",
            subtitle: "6 weeks → Same day treatment selection",
            iconName: "Zap",
            color: "blue"
          },
          {
            title: "Cost Efficiency",
            subtitle: "$75K → $50 per variant (99.9% reduction)",
            iconName: "DollarSign",
            color: "teal"
          }
        ]
      },
      genomicUseCasesParagraph: "**VUS Annihilation:** Instantly resolve variants of unknown significance (e.g., MBD4, PDGFRA) with 95.7% accuracy. 73% actionable conversion rate transforms genetic uncertainty into validated clinical decisions."
    },
    {
      title: "Match Patients to Therapies",
      priority: "primary",
      technical: {
        title: "Technical Approach",
        keyMetric: "96.6% Trial Match Accuracy",
        description: "Mechanism-based matching using S/P/E fusion (Sequence/Pathway/Evidence). Matches patients to therapies based on biological mechanisms, not just standard of care. Integrates drug ranking with clinical trial matching.",
        icon: "Target",
        color: "blue",
        components: [
          {
            title: "Mechanism-Based Matching",
            subtitle: "S/P/E fusion: Sequence + Pathway + Evidence",
            iconName: "Cpu",
            color: "blue"
          },
          {
            title: "Trial Matching",
            subtitle: "96.6% accuracy with transparent eligibility reasoning",
            iconName: "Search",
            color: "teal"
          },
          {
            title: "Drug Ranking",
            subtitle: "70-85% confidence with evidence-backed rationale",
            iconName: "ListChecks",
            color: "indigo"
          }
        ]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "Precision Matching",
        description: "Matches patients to therapies based on mechanism (e.g., 'High-TMB + MBD4 loss = Checkpoint Inhibitor'), not just standard of care. Validated against clinical outcomes with transparent reasoning.",
        icon: "Dna",
        color: "teal",
        components: [
          {
            title: "Mechanism-Based",
            subtitle: "Biological pathway alignment, not just guidelines",
            iconName: "Map",
            color: "blue"
          },
          {
            title: "Transparent Reasoning",
            subtitle: "Shows WHY (eligibility + fit + conditions)",
            iconName: "Eye",
            color: "teal"
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "Same-Day Action",
        description: "Action-ready packets mean oncologists can call trial sites the same day. Complete eligibility checklists and trial-specific evidence included.",
        icon: "Phone",
        color: "indigo",
        components: [
          {
            title: "Same-Day Action",
            subtitle: "Call trial sites same day with complete dossiers",
            iconName: "Zap",
            color: "blue"
          },
          {
            title: "Action-Ready",
            subtitle: "Complete eligibility checklists and contacts",
            iconName: "FileCheck",
            color: "teal"
          }
        ]
      },
      genomicUseCasesParagraph: "**Precision Matching:** Match patients to therapies based on mechanism (e.g., 'High-TMB + MBD4 loss = Checkpoint Inhibitor'), not just standard of care. Includes drug ranking (70-85% confidence) and clinical trial matching (96.6% accuracy)."
    },
    {
      title: "Prevent Toxicity Before It Happens",
      priority: "primary",
      technical: {
        title: "Technical Approach",
        keyMetric: "100% Coverage",
        description: "100% toxicity prevention coverage for DPYD/TPMT/UGT1A1/CYP2D6. HLA-based autoimmune toxicity forecasting. Drug interaction checking with MoA-overlap risk flags.",
        icon: "ShieldAlert",
        color: "blue",
        components: [
          {
            title: "PGx Coverage",
            subtitle: "100% coverage: DPYD/TPMT/UGT1A1/CYP2D6",
            iconName: "Shield",
            color: "blue"
          },
          {
            title: "HLA-Based Forecasting",
            subtitle: "Autoimmune toxicity prediction (Saad Protocol)",
            iconName: "AlertTriangle",
            color: "teal"
          },
          {
            title: "Interaction Checking",
            subtitle: "Drug interactions and MoA-overlap risk flags",
            iconName: "Link",
            color: "indigo"
          }
        ]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "Life-Threatening Prevention",
        description: "Prevents life-threatening adverse events before they happen. 100% coverage for critical PGx variants with evidence-backed drug interaction checking.",
        icon: "Heart",
        color: "teal",
        components: [
          {
            title: "Prevention First",
            subtitle: "Proactive toxicity prevention, not reactive monitoring",
            iconName: "Shield",
            color: "blue"
          },
          {
            title: "Complete Coverage",
            subtitle: "100% coverage for critical PGx variants",
            iconName: "CheckCircle",
            color: "teal"
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "Prevent Adverse Events",
        description: "Prevents costly adverse events and improves patient safety. Reduces hospitalizations and treatment delays.",
        icon: "Hospital",
        color: "indigo",
        components: [
          {
            title: "Patient Safety",
            subtitle: "Prevents life-threatening adverse events",
            iconName: "Heart",
            color: "blue"
          },
          {
            title: "Cost Savings",
            subtitle: "Reduces hospitalizations and treatment delays",
            iconName: "DollarSign",
            color: "teal"
          }
        ]
      },
      genomicUseCasesParagraph: "**Safety Prediction:** HLA-based autoimmune toxicity forecasting (The 'Saad Protocol'). 100% coverage for DPYD/TPMT/UGT1A1/CYP2D6 prevents life-threatening adverse events before they happen."
    },
    {
      title: "Predict Resistance Before It Happens",
      priority: "primary",
      technical: {
        title: "Technical Approach",
        keyMetric: "3-6 Weeks Earlier",
        description: "Proactive resistance detection 3-6 weeks faster than imaging. CA-125 intelligence with kinetics forecasting. Next-line strategies pre-planned with resistance playbooks.",
        icon: "TrendingUp",
        color: "blue",
        components: [
          {
            title: "CA-125 Intelligence",
            subtitle: "Early resistance detection with kinetics forecasting",
            iconName: "Activity",
            color: "blue"
          },
          {
            title: "Proactive Detection",
            subtitle: "3-6 weeks earlier than imaging",
            iconName: "Zap",
            color: "teal"
          },
          {
            title: "Resistance Playbooks",
            subtitle: "Next-line strategies pre-planned",
            iconName: "BookOpen",
            color: "indigo"
          }
        ]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "Early Detection",
        description: "Predicts resistance risks BEFORE they happen (e.g., 'HR Restoration detected - 70% confidence'). Enables proactive treatment switches with validated biomarkers.",
        icon: "Radar",
        color: "teal",
        components: [
          {
            title: "Proactive Prediction",
            subtitle: "Resistance detection before it happens",
            iconName: "Eye",
            color: "blue"
          },
          {
            title: "Validated Biomarkers",
            subtitle: "CA-125 kinetics and pathway analysis",
            iconName: "Dna",
            color: "teal"
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "Prevent Treatment Failures",
        description: "Prevents treatment failures and enables proactive switches. Improves patient outcomes through early intervention.",
        icon: "ArrowRight",
        color: "indigo",
        components: [
          {
            title: "Better Outcomes",
            subtitle: "Proactive switches improve patient survival",
            iconName: "TrendingUp",
            color: "blue"
          },
          {
            title: "Cost Efficiency",
            subtitle: "Prevents costly failed treatment cycles",
            iconName: "DollarSign",
            color: "teal"
          }
        ]
      },
      genomicUseCasesParagraph: "**Resistance Prediction:** Proactive resistance detection BEFORE it happens. CA-125 intelligence detects resistance 3-6 weeks earlier than imaging, enabling proactive treatment switches."
    },
    {
      title: "Complete Unified Care Plans",
      priority: "primary",
      technical: {
        title: "Technical Integration",
        keyMetric: "/api/complete_care/universal",
        description: "Single API endpoint integrating all clinical intelligence layers: drug recommendations, trial matching, toxicity prevention, pathway analysis, nutrition guidance. Complete orchestration in one unified output.",
        icon: "Network",
        color: "blue",
        components: [
          {
            title: "Unified Endpoint",
            subtitle: "/api/complete_care/universal",
            iconName: "Server",
            color: "blue"
          },
          {
            title: "Complete Integration",
            subtitle: "Drugs + Trials + Safety + Nutrition + Monitoring",
            iconName: "Layers",
            color: "teal"
          },
          {
            title: "Single Output",
            subtitle: "One actionable care plan, not fragmented tools",
            iconName: "FileCheck",
            color: "indigo"
          }
        ]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "Holistic Care Context",
        description: "Provides holistic patient care by integrating all clinical intelligence signals. Combines variant impact, pathway burden, toxicity risk, and trial eligibility in one view.",
        icon: "Users",
        color: "teal",
        components: [
          {
            title: "Holistic Analysis",
            subtitle: "All clinical signals in one place",
            iconName: "Layers",
            color: "blue"
          },
          {
            title: "Evidence Integration",
            subtitle: "S/P/E framework with transparent reasoning",
            iconName: "ShieldCheck",
            color: "teal"
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "Same-Day Tumor Board Ready",
        description: "Complete care plans ready for same-day tumor board discussions. All recommendations integrated and prioritized in one actionable output.",
        icon: "Calendar",
        color: "indigo",
        components: [
          {
            title: "Tumor Board Ready",
            subtitle: "Complete dossiers for same-day discussions",
            iconName: "Users",
            color: "blue"
          },
          {
            title: "Time Savings",
            subtitle: "Single integration replaces multiple manual tools",
            iconName: "Clock",
            color: "teal"
          }
        ]
      },
      genomicUseCasesParagraph: "**Unified Care Plan:** Single output integrating drugs + trials + food/supplements + monitoring + pharmacogenomics (all in one place). Action-ready for same-day tumor board discussions."
    }
  ],

  integratedCare: {
    title: "Complete Unified Care Plan Integration",
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
      audience: "For Medical Oncologists",
      points: [
        "Evidence-backed treatment recommendations with transparent confidence scores",
        "Every recommendation shows WHY (eligibility + fit + conditions), not just WHAT",
        "Action-ready packets mean you can call trial sites the same day"
      ]
    },
    {
      audience: "For Clinical Directors",
      points: [
        "73% VUS resolution rate reduces genetic uncertainty from 40% to 15%",
        "Same-day tumor board ready dossiers with complete audit trails",
        "Complete care integration eliminates manual tool stitching"
      ]
    }
  ],

  unifiedCarePlan: {
    title: "Unified Care Plan - The FLAGSHIP Capability",
    subtitle: "Complete care orchestration in one actionable output",
    description: "Generate comprehensive care plans integrating drugs, trials, food/supplements, monitoring, and pharmacogenomics in one place. No more switching between tools - everything your patient needs in one regulatory-ready dossier.",
    apiEndpoint: "/api/complete_care/universal",
    capabilities: [
      "Drug ranking with 70-85% confidence",
      "Clinical trial matching with 96.6% accuracy",
      "Toxicity prevention (100% PGx coverage)",
      "Nutrition optimization with evidence-backed dosages",
      "Monitoring protocols with CA-125 kinetics",
      "Resistance prediction before it happens"
    ],
    outputs: [
      "Clinician-ready dossiers with contacts and checklists",
      "Patient education materials with simple explanations",
      "Regulatory-ready documentation for IND submissions",
      "Complete audit trail with provenance tracking",
      "Actionable next steps with timeline and priorities"
    ]
  },

  detailedCapabilities: [
    {
      title: "Therapy Fit",
      description: "Personalized drug ranking with 70-85% confidence. Mechanism-based matching, not standard of care.",
      link: "/platform/therapy-fit",
      icon: "Target",
      metrics: ["70-85% confidence", "Mechanism-based", "96.6% trial match"],
      color: "blue"
    },
    {
      title: "Clinical Trials",
      description: "Match patients to trials with transparent eligibility reasoning. Green/yellow/red flags per criterion.",
      link: "/platform/clinical-trials",
      icon: "Users",
      metrics: ["96.6% accuracy", "Transparent reasoning", "Same-day calls"],
      color: "green"
    },
    {
      title: "Chemo Intelligence",
      description: "Chemotherapy recommendations with toxicity prevention. 100% coverage for DPYD/TPMT/UGT1A1/CYP2D6.",
      link: "/platform/chemo",
      icon: "Pill",
      metrics: ["100% toxicity coverage", "Life-threatening prevention", "Drug interactions"],
      color: "purple"
    },
    {
      title: "Toxicity Risk",
      description: "Prevent life-threatening toxicity before it happens. PGx analysis for safe prescribing.",
      link: "/platform/toxicity-risk",
      icon: "AlertTriangle",
      metrics: ["100% coverage", "Life-threatening prevention", "Drug interaction checking"],
      color: "red"
    },
    {
      title: "Pathway Analysis",
      description: "Pathway analysis and therapy alignment. Understand how mutations disrupt cellular processes.",
      link: "/platform/pathway",
      icon: "Route",
      metrics: ["Pathway disruption", "Therapy alignment", "Mechanistic understanding"],
      color: "orange"
    }
  ],

  conclusion: "CrisPRO Oncology transforms clinical oncology from uncertainty to precision. From VUS resolution to validated care plans, every recommendation is evidence-backed, transparent, and action-ready. Same-day clinical decisions are now possible with complete unified care plans."
};


