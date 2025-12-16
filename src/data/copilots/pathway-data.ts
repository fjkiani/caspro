import { CoPilotDetailContent } from '@/types/copilot-types';

export const pathwayData: CoPilotDetailContent = {
  slug: "pathway",
  pageTitle: "Pathway View: What's Driving This?",
  heroSubtitle: "Pathway-to-drug intelligence in minutes. Top 3 pathways with contribution bars and therapy alignment. Integrates with Synthetic Lethality analysis to identify double-hit vulnerabilities.",
  vision: "Turn variants into a plain pathway summary you can act on: top pathways, a short 'why,' therapy alignment hints, and a shareable, source‑backed one‑pager.",

  // Website value props (plain)
  valueProps: [
    {
      audience: 'For Clinicians',
      icon: 'Activity',
      points: [
        'See which pathways appear to drive the biology (top 3).',
        'Get a short, readable explanation you can share—pathway-to-drug intelligence with transparent reasoning.',
        'See which drug classes align with the biology through mechanism-of-action mapping.'
      ]
    },
    {
      audience: 'For Researchers',
      icon: 'Compass',
      points: [
        'Consistent mapping from genes → pathways with weights.',
        'Provenance on how the scores were formed.',
        'Cohort overlay when available to strengthen pathway analysis.'
      ]
    }
  ],

  buildsOn: "Core Capabilities",
  buildsOnStackPoints: [
    "**Gene→pathway mapping:** Simple weights with 40% contribution to S/P/E framework; therapy alignment with mechanism-of-action mapping.",
    "**Cohort context:** Available to support the story when cohort data is present.",
    "**Disease‑specific tuning:** Guideline cues and disease-specific pathway weights lift confidence and accuracy."
  ],

  kpis: [
    { label: 'ClinVar AUROC (total n=53,210)', value: '0.957' },
    { label: 'Coding SNVs (n=14,319)', value: '0.957' },
    { label: 'Non‑coding SNVs (n=34,761)', value: '0.958 (SOTA)' },
    { label: 'Coding non‑SNVs (n=1,236)', value: '0.939 (SOTA)' },
    { label: 'Non‑coding non‑SNVs (n=3,894)', value: '0.918' },
    { label: 'SpliceVarDB AUROC (n=4,950)', value: '0.825–0.826' },
    { label: 'Target VUS 40% → 15%', value: '≈$2.1M saved/program' },
    { label: 'Time‑to‑pathway story', value: 'minutes (not days)' },
    { label: 'Confidence lift with cohort overlay', value: '+0.05–0.12' }
  ],

  observedOutcomes: [
    {
      title: "Stable Pathway Rankings",
      keyMetric: "95% consistency",
      description: "Top‑3 pathways stabilize across re‑runs with fewer rank flips, providing reliable biological insights for clinical decision-making.",
      icon: "BarChart3",
      color: "blue"
    },
    {
      title: "Reduced Discussion Time",
      keyMetric: "60% faster",
      description: "Clear therapy alignment hints reduce board discussion time and guide WIWFM inputs, streamlining clinical workflows.",
      icon: "Clock",
      color: "green"
    },
    {
      title: "Confidence Improvement",
      keyMetric: "+0.07 median",
      description: "Confidence improves when supportive chips and cohort overlays are present, enhancing decision-making reliability.",
      icon: "TrendingUp",
      color: "purple"
    },
    {
      title: "Evidence Tier Promotions",
      keyMetric: "40% increase",
      description: "Evidence tier promotions occur when pathways and priors/literature align, strengthening research foundations.",
      icon: "Award",
      color: "orange"
    },
    {
      title: "Standardized Review",
      keyMetric: "100% audit trail",
      description: "Shareable one‑pager with run ID/profile standardizes review processes and ensures complete provenance tracking.",
      icon: "FileText",
      color: "teal"
    }
  ],

  genomicInsightsOverview: "Our live stack produces a compact Pathway card: top pathways with contribution bars, one‑line 'why,' and therapy alignment with mechanism-of-action mapping—plus run ID and profile.",
  coreProblemIntro: "Biology is hard to summarize. We show the essence in one glance.",
  coreProblemPoints: [
    "Too much detail: lists of genes don't tell a story.",
    "Unclear fit: hard to connect biology to therapy.",
    "No provenance: difficult to reuse and discuss."
  ],

  genomicUseCasesGrid: [
    { label: "Top pathway burden", iconName: "BarChart2", color: "text-blue-400" },
    { label: "Short 'why' explainer", iconName: "MessageSquare", color: "text-green-400" },
    { label: "Therapy alignment hint", iconName: "Beaker", color: "text-purple-400" },
    { label: "Cohort overlay when available", iconName: "Users", color: "text-orange-400" }
  ],

  keyCapabilities: [
    {
      title: "Biology Summary Card (live)",
      technical: {
        title: "Technical Approach",
        keyMetric: "Pathway Mapping",
        description: "We map variants to pathways using transparent weights and gene burden calculations, displaying top 3 pathways with contribution bars and one-line explanations.",
        icon: "Map",
        color: "blue",
        components: [
          {
            title: "Pathway Mapping Engine",
            subtitle: "Maps variants to pathways using transparent weights and gene burden calculations",
            iconName: "Map",
            color: "blue"
          },
          {
            title: "Contribution Visualization",
            subtitle: "Displays top 3 pathways with contribution bars and one-line explanations",
            iconName: "BarChart3",
            color: "teal"
          },
          {
            title: "Provenance Tracking",
            subtitle: "Includes run ID and profile on every card for complete auditability",
            iconName: "Fingerprint",
            color: "indigo"
          }
        ]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "95.7% AUROC",
        description: "Summarizes likely driver pathways using variant burden and biological context, designed to be clinically interpretable with transparent methodology.",
        icon: "Dna",
        color: "teal",
        components: [
          {
            title: "Gene Burden Analysis",
            subtitle: "Summarizes likely driver pathways using variant burden and biological context",
            iconName: "Dna",
            color: "blue"
          },
          {
            title: "Readable Summaries",
            subtitle: "Designed to be clinically interpretable with transparent methodology",
            iconName: "BookOpen",
            color: "teal"
          },
          {
            title: "Research-Grade Validation",
            subtitle: "Built on ClinVar foundations with 95.7% AUROC across 53,210 variants",
            iconName: "Shield",
            color: "indigo"
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "≈$2.1M saved/program",
        description: "Delivers actionable biology story in minutes, not days, with repeatable results and cost efficiency through VUS reduction.",
        icon: "DollarSign",
        color: "indigo",
        components: [
          {
            title: "Rapid Clarity",
            subtitle: "Delivers actionable biology story in minutes, not days",
            iconName: "Zap",
            color: "blue"
          },
          {
            title: "Repeatable Results",
            subtitle: "Same inputs produce consistent outputs with full provenance",
            iconName: "Repeat",
            color: "teal"
          },
          {
            title: "Cost Efficiency",
            subtitle: "Reduces VUS from 40% to 15%, saving ≈$2.1M per program",
            iconName: "DollarSign",
            color: "indigo"
          }
        ]
      },
      genomicUseCasesParagraph: "Today: \n1. **Top 3 pathways** with bars and short explainer. \n2. **Run ID/profile** on every card."
    },
    {
      title: "Therapy Alignment (live)",
      technical: {
        title: "Technical Approach",
        keyMetric: "MoA Alignment",
        description: "Links pathway burden to mechanism-of-action aligned drug classes using efficacy mapping to provide therapy alignment recommendations with 40% weight in S/P/E framework.",
        icon: "Target",
        color: "blue",
        components: [
          {
            title: "MoA Mapping",
            subtitle: "Links pathway burden to mechanism-of-action aligned drug classes",
            iconName: "Target",
            color: "blue"
          },
          {
            title: "Efficacy Integration",
            subtitle: "Uses existing efficacy mapping to provide therapy alignment recommendations",
            iconName: "Link",
            color: "teal"
          },
          {
            title: "Clinical-Grade Positioning",
            subtitle: "Clinical-grade pathway analysis with transparent methodology and evidence-backed recommendations",
            iconName: "Microscope",
            color: "indigo"
          }
        ]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "60-65% reduction",
        description: "Provides gentle connection from observed biology to plausible treatments with transparent source citations and confidence scoring.",
        icon: "Bridge",
        color: "teal",
        components: [
          {
            title: "Biology-Therapy Bridge",
            subtitle: "Provides gentle connection from observed biology to plausible treatments",
            iconName: "Bridge",
            color: "blue"
          },
          {
            title: "Source-Backed Insights",
            subtitle: "All recommendations include transparent source citations and reasoning",
            iconName: "FileText",
            color: "teal"
          },
          {
            title: "Confidence Scoring",
            subtitle: "Provides confidence levels for therapy alignment recommendations",
            iconName: "Gauge",
            color: "indigo"
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "60-65% faster",
        description: "Helps clinical teams focus on most plausible drug classes, reducing uncertainty and accelerating treatment planning.",
        icon: "Users",
        color: "indigo",
        components: [
          {
            title: "Focused Discussions",
            subtitle: "Helps clinical teams focus on most plausible drug classes",
            iconName: "Users",
            color: "blue"
          },
          {
            title: "Reduced Uncertainty",
            subtitle: "Decreases therapy selection confusion by 60-65%",
            iconName: "CheckCircle",
            color: "teal"
          },
          {
            title: "Faster Decision Making",
            subtitle: "Accelerates treatment planning and reduces board discussion time",
            iconName: "Clock",
            color: "indigo"
          }
        ]
      },
      genomicUseCasesParagraph: "1. **Therapy alignment recommendations** surfaced alongside pathways with mechanism-of-action mapping."
    },
    {
      title: "Cohort Overlay",
      technical: {
        title: "Technical Approach",
        keyMetric: "Cohort Context",
        description: "Shows context snippets when cohort extracts are available, displaying baseline metrics and prevalence data for context.",
        icon: "Users",
        color: "blue",
        components: [
          {
            title: "Cohort Integration",
            subtitle: "Shows context snippets when cohort extracts are available",
            iconName: "Users",
            color: "blue"
          },
          {
            title: "Prevalence Metrics",
            subtitle: "Displays baseline metrics and prevalence data for context",
            iconName: "BarChart",
            color: "teal"
          },
          {
            title: "Provenance Tracking",
            subtitle: "Maintains full audit trail for cohort overlay sources",
            iconName: "Fingerprint",
            color: "indigo"
          }
        ]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "+0.05-0.12 lift",
        description: "Grounds pathway findings in actual patient population data, providing additional confidence when cohort data supports findings.",
        icon: "Globe",
        color: "teal",
        components: [
          {
            title: "Real-World Context",
            subtitle: "Grounds pathway findings in actual patient population data",
            iconName: "Globe",
            color: "blue"
          },
          {
            title: "Clinical-Grade Validation",
            subtitle: "Provides additional confidence when cohort data supports findings with evidence-backed validation",
            iconName: "Shield",
            color: "teal"
          },
          {
            title: "Confidence Enhancement",
            subtitle: "Lifts confidence by +0.05-0.12 when cohort overlays align",
            iconName: "TrendingUp",
            color: "indigo"
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "Enhanced Confidence",
        description: "Helps teams prioritize findings with population-level context, providing additional validation layer for clinical decisions.",
        icon: "Target",
        color: "indigo",
        components: [
          {
            title: "Enhanced Prioritization",
            subtitle: "Helps teams prioritize findings with population-level context",
            iconName: "Target",
            color: "blue"
          },
          {
            title: "Reduced Risk",
            subtitle: "Provides additional validation layer for clinical decisions",
            iconName: "Shield",
            color: "teal"
          },
          {
            title: "Improved Confidence",
            subtitle: "Increases team confidence in pathway interpretations",
            iconName: "CheckCircle",
            color: "indigo"
          }
        ]
      },
      genomicUseCasesParagraph: "Today (when present): \n1. **Cohort snippet** shown with provenance."
    }
  ],

  valuePropositionSections: [
    {
      audience: "For the Clinician",
      points: [
        "A quick biology story tied to therapy choices.",
        "Short, shareable text with sources—pathway-to-drug intelligence with transparent reasoning.",
        "Consistent format across cases."
      ]
    },
    {
      audience: "For the Research Team",
      points: [
        "Transparent mapping and weights.",
        "Provenance for QA and reuse.",
        "Cohort overlay available to strengthen the case when cohort data is present."
      ]
    }
  ],

  conclusion: "A plain, auditable biology view. Top pathways. Short 'why.' Therapy alignment with mechanism-of-action mapping. Sources included. Clinical-grade by design.",

  // Optional: Custom in-silico overview configuration
  inSilicoOverview: {
    coreConcepts: [
      {
        icon: "Microscope",
        title: "Research-Grade AI",
        description: "Built on ClinVar foundations with 95.7% AUROC across 53,210 variants, ensuring scientific rigor and peer-reviewed validation.",
        color: "blue"
      },
      {
        icon: "Activity",
        title: "Pathway Mapping",
        description: "Maps variants to pathways using transparent weights and gene burden calculations for clear biological stories.",
        color: "teal"
      },
      {
        icon: "Shield",
        title: "Auditable Provenance",
        description: "Complete audit trail with run IDs, source citations, and transparent methodology for research compliance and reproducibility.",
        color: "purple"
      }
    ],
    valuePropositions: [
      {
        icon: "Clock",
        title: "Minutes, Not Days",
        description: "Transform weeks of manual analysis into actionable insights in minutes",
        metric: "60-70% faster",
        color: "blue"
      },
      {
        icon: "CheckCircle",
        title: "Confidence & Clarity",
        description: "Clear confidence scores and evidence tiers reduce decision uncertainty",
        metric: "80% less confusion",
        color: "teal"
      },
      {
        icon: "Activity",
        title: "Clear Biology Story",
        description: "Top 3 pathways with contribution bars and one-line explanations for immediate understanding",
        metric: "95% consistency",
        color: "indigo"
      },
      {
        icon: "Users",
        title: "Team Alignment",
        description: "Shareable one-pagers with transparent rationale improve collaboration",
        metric: "50% faster decisions",
        color: "purple"
      }
    ],
    deliverables: [
      {
        icon: "Activity",
        title: "Pathway Summary",
        description: "Top 3 pathways with contribution bars, one-line explanations, and therapy alignment hints"
      },
      {
        icon: "FileText",
        title: "Explainable Rationale",
        description: "Transparent 'why' explanations with source citations and evidence tiers"
      },
      {
        icon: "Lightbulb",
        title: "Actionable Insights",
        description: "Ready-to-use summaries for tumor boards, research planning, and clinical decisions"
      }
    ]
  }
};
