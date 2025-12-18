import { CoPilotDetailContent } from '@/types/copilot-types';

export const pathwayData: CoPilotDetailContent = {
  slug: "pathway",
  pageTitle: "Pathway Analysis: Gene-to-Pathway Mapping",
  heroSubtitle: "Aggregates sequence disruption scores into pathway-level signals. Integrates with S/P/E framework (40% weight) and Synthetic Lethality analysis.",
  vision: "Transform variant-level sequence scores into pathway-level biological insights for drug efficacy prediction.",

  // Website value props (actual capabilities)
  valueProps: [
    {
      audience: 'For Clinicians',
      icon: 'Activity',
      points: [
        'Pathway disruption scores inform drug efficacy predictions (40% of S/P/E framework).',
        'Gene-to-pathway mapping identifies which biological pathways are affected by mutations.',
        'Drug-to-pathway alignment enables mechanism-based therapy selection.'
      ]
    },
    {
      audience: 'For Researchers',
      icon: 'Compass',
      points: [
        'Transparent gene-to-pathway mapping with weighted aggregation.',
        'Disease-specific drug panels (MM, Ovarian, Melanoma) with pathway weights.',
        'Integration with Synthetic Lethality analysis for double-hit vulnerability detection.'
      ]
    }
  ],

  buildsOn: "Core Capabilities",
  buildsOnStackPoints: [
    "**Gene→pathway mapping:** Maps variants to pathways (DDR, MAPK, TP53, PI3K, VEGF) using transparent weights.",
    "**Pathway aggregation:** Aggregates sequence disruption scores by pathway with weighted averaging.",
    "**S/P/E integration:** Pathway component contributes 40% weight to drug efficacy scoring."
  ],

  kpis: [
    { label: 'Pathway Component Weight', value: '40%' },
    { label: 'Supported Pathways', value: '5 pathways' },
    { label: 'Disease Panels', value: '3 (MM, Ovarian, Melanoma)' },
    { label: 'Integration Status', value: '✅ S/P/E + Synthetic Lethality' }
  ],

  observedOutcomes: [
    {
      title: "Pathway Aggregation Working",
      keyMetric: "100% integration",
      description: "Pathway aggregation successfully integrated into S/P/E framework, contributing 40% weight to drug efficacy scores.",
      icon: "BarChart3",
      color: "blue"
    },
    {
      title: "Gene-to-Pathway Mapping",
      keyMetric: "5 pathways",
      description: "Maps key cancer genes (BRCA1/2, BRAF/KRAS, TP53, PIK3CA, VEGFA) to biological pathways with transparent weights.",
      icon: "Map",
      color: "green"
    },
    {
      title: "Disease-Specific Panels",
      keyMetric: "3 panels",
      description: "Pre-configured drug panels for Multiple Myeloma, Ovarian Cancer, and Melanoma with pathway weight mappings.",
      icon: "Database",
      color: "purple"
    },
    {
      title: "Synthetic Lethality Integration",
      keyMetric: "✅ Complete",
      description: "Pathway disruption data feeds into Synthetic Lethality analysis for double-hit vulnerability detection.",
      icon: "Link",
      color: "orange"
    }
  ],

  genomicInsightsOverview: "Pathway service aggregates sequence disruption scores into pathway-level signals. Gene-to-pathway mapping identifies affected biological pathways, which inform drug efficacy predictions through the S/P/E framework.",
  coreProblemIntro: "Sequence scores are variant-level. We need pathway-level aggregation for drug mechanism alignment.",
  coreProblemPoints: [
    "Variant-level scores don't show pathway burden.",
    "Drugs target pathways, not individual variants.",
    "Need pathway aggregation for mechanism-based therapy selection."
  ],

  genomicUseCasesGrid: [
    { label: "Pathway aggregation", iconName: "BarChart2", color: "text-blue-400" },
    { label: "Gene-to-pathway mapping", iconName: "Map", color: "text-green-400" },
    { label: "Drug-to-pathway alignment", iconName: "Target", color: "text-purple-400" },
    { label: "S/P/E integration", iconName: "Activity", color: "text-orange-400" }
  ],

  keyCapabilities: [
    {
      title: "Pathway Aggregation (Built)",
      technical: {
        title: "Technical Implementation",
        keyMetric: "Weighted Averaging",
        description: "Aggregates sequence disruption scores by pathway using weighted gene-to-pathway mappings. Formula: pathway_score = sum(sequence_disruption × weight) / count.",
        icon: "BarChart3",
        color: "blue",
        components: [
          {
            title: "Aggregation Algorithm",
            subtitle: "Weighted averaging of sequence scores by pathway",
            iconName: "Calculator",
            color: "blue"
          },
          {
            title: "Gene-to-Pathway Mapping",
            subtitle: "Maps genes to pathways (DDR, MAPK, TP53, PI3K, VEGF) with weights",
            iconName: "Map",
            color: "teal"
          },
          {
            title: "Integration Point",
            subtitle: "Called from efficacy orchestrator during S/P/E pipeline",
            iconName: "Link",
            color: "indigo"
          }
        ]
      },
      scientific: {
        title: "Scientific Foundation",
        keyMetric: "40% S/P/E Weight",
        description: "Pathway component contributes 40% weight to drug efficacy scoring, combining with Sequence (30%) and Evidence (30%) for comprehensive prediction.",
        icon: "Dna",
        color: "teal",
        components: [
          {
            title: "Biological Rationale",
            subtitle: "Drugs target pathways, not individual variants - pathway aggregation enables mechanism-based prediction",
            iconName: "Dna",
            color: "blue"
          },
          {
            title: "S/P/E Framework",
            subtitle: "Pathway (P) = 40% weight, integrates with Sequence (S) and Evidence (E)",
            iconName: "Activity",
            color: "teal"
          },
          {
            title: "Transparent Methodology",
            subtitle: "Clear gene-to-pathway mappings with documented weights",
            iconName: "BookOpen",
            color: "indigo"
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "Core S/P/E Component",
        description: "Essential component of drug efficacy prediction framework, enabling mechanism-based therapy selection.",
        icon: "Target",
        color: "indigo",
        components: [
          {
            title: "Efficacy Prediction",
            subtitle: "40% contribution to drug efficacy scores",
            iconName: "Target",
            color: "blue"
          },
          {
            title: "Mechanism Alignment",
            subtitle: "Enables drug-to-pathway mechanism matching",
            iconName: "Link",
            color: "teal"
          },
          {
            title: "Disease-Specific",
            subtitle: "Pre-configured panels for MM, Ovarian, Melanoma",
            iconName: "Database",
            color: "indigo"
          }
        ]
      },
      genomicUseCasesParagraph: "**Current Implementation:** \n1. **Pathway aggregation** from sequence scores. \n2. **Gene-to-pathway mapping** (5 pathways: DDR, MAPK, TP53, PI3K, VEGF). \n3. **Integration** with S/P/E framework (40% weight)."
    },
    {
      title: "Gene-to-Pathway Mapping (Built)",
      technical: {
        title: "Technical Implementation",
        keyMetric: "5 Pathways",
        description: "Maps cancer genes to biological pathways using transparent weights. Supports DDR, MAPK, TP53, PI3K, and VEGF pathways.",
        icon: "Map",
        color: "blue",
        components: [
          {
            title: "Pathway Definitions",
            subtitle: "DDR (DNA Damage Response), MAPK (RAS/MAPK), TP53 (Tumor Suppressor), PI3K (PI3K/AKT), VEGF (Angiogenesis)",
            iconName: "Map",
            color: "blue"
          },
          {
            title: "Gene Mappings",
            subtitle: "BRCA1/2→DDR, BRAF/KRAS→MAPK, TP53→TP53, PIK3CA→PI3K, VEGFA→VEGF",
            iconName: "Dna",
            color: "teal"
          },
          {
            title: "Weight System",
            subtitle: "Binary weights (1.0) for primary pathway, extensible for multi-pathway genes",
            iconName: "Gauge",
            color: "indigo"
          }
        ]
      },
      scientific: {
        title: "Scientific Foundation",
        keyMetric: "Transparent Mapping",
        description: "Clear gene-to-pathway relationships based on established cancer biology. Includes key cancer genes: BRCA1/2, BRAF/KRAS, TP53, PIK3CA, VEGFA.",
        icon: "BookOpen",
        color: "teal",
        components: [
          {
            title: "DDR Pathway",
            subtitle: "BRCA1, BRCA2, ATR, CHEK1, RAD51, PALB2, MBD4 (DNA repair genes)",
            iconName: "Shield",
            color: "blue"
          },
          {
            title: "MAPK Pathway",
            subtitle: "BRAF, KRAS, NRAS, MEK1, MEK2 (RAS/MAPK signaling)",
            iconName: "Activity",
            color: "teal"
          },
          {
            title: "TP53 Pathway",
            subtitle: "TP53, MDM2, CHEK2 (Tumor suppressor and checkpoint)",
            iconName: "AlertCircle",
            color: "indigo"
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "Mechanism-Based Selection",
        description: "Enables drug selection based on pathway disruption rather than individual variant matching.",
        icon: "Target",
        color: "indigo",
        components: [
          {
            title: "Drug Alignment",
            subtitle: "Maps drugs to pathways for mechanism-based matching",
            iconName: "Target",
            color: "blue"
          },
          {
            title: "Extensible Design",
            subtitle: "Easy addition of new genes and pathways",
            iconName: "Plus",
            color: "teal"
          },
          {
            title: "Disease Context",
            subtitle: "Disease-specific pathway weights in drug panels",
            iconName: "Database",
            color: "indigo"
          }
        ]
      },
      genomicUseCasesParagraph: "**Current Implementation:** \n1. **5 pathway types** (DDR, MAPK, TP53, PI3K, VEGF). \n2. **Gene mappings** for key cancer genes. \n3. **Extensible** for new pathways and genes."
    },
    {
      title: "Drug-to-Pathway Mapping (Built)",
      technical: {
        title: "Technical Implementation",
        keyMetric: "Disease-Specific Panels",
        description: "Pre-configured drug panels for Multiple Myeloma, Ovarian Cancer, and Melanoma with pathway weight mappings and mechanism-of-action annotations.",
        icon: "Database",
        color: "blue",
        components: [
          {
            title: "MM Panel",
            subtitle: "BRAF inhibitor, MEK inhibitor, IMiD, Proteasome inhibitor, Anti-CD38",
            iconName: "Database",
            color: "blue"
          },
          {
            title: "Ovarian Panel",
            subtitle: "PARP inhibitors, Platinum agents, Checkpoint inhibitors",
            iconName: "Database",
            color: "teal"
          },
          {
            title: "Melanoma Panel",
            subtitle: "BRAF inhibitors, MEK inhibitors, PD-1 inhibitors",
            iconName: "Database",
            color: "indigo"
          }
        ]
      },
      scientific: {
        title: "Scientific Foundation",
        keyMetric: "Mechanism-of-Action",
        description: "Each drug includes MoA annotation and pathway weights indicating which pathways the drug targets.",
        icon: "Target",
        color: "teal",
        components: [
          {
            title: "Pathway Weights",
            subtitle: "Drug-specific pathway relevance weights (e.g., PARP inhibitor → DDR: 0.9)",
            iconName: "Gauge",
            color: "blue"
          },
          {
            title: "MoA Integration",
            subtitle: "Mechanism-of-action annotations for each drug",
            iconName: "Target",
            color: "teal"
          },
          {
            title: "Disease Context",
            subtitle: "Disease-specific panels with appropriate drug selections",
            iconName: "Database",
            color: "indigo"
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "Ready-to-Use Panels",
        description: "Pre-configured drug panels eliminate manual configuration and ensure consistent pathway mappings across disease types.",
        icon: "CheckCircle",
        color: "indigo",
        components: [
          {
            title: "Consistency",
            subtitle: "Standardized pathway weights across disease panels",
            iconName: "CheckCircle",
            color: "blue"
          },
          {
            title: "Extensibility",
            subtitle: "Easy addition of new drugs and pathway weights",
            iconName: "Plus",
            color: "teal"
          },
          {
            title: "Maintainability",
            subtitle: "Centralized panel configuration management",
            iconName: "Settings",
            color: "indigo"
          }
        ]
      },
      genomicUseCasesParagraph: "**Current Implementation:** \n1. **3 disease panels** (MM, Ovarian, Melanoma). \n2. **Pathway weights** for each drug. \n3. **MoA annotations** for mechanism tracking."
    }
  ],

  valuePropositionSections: [
    {
      audience: "For the Clinician",
      points: [
        "Pathway disruption scores inform drug efficacy predictions (40% of S/P/E framework).",
        "Mechanism-based therapy selection through drug-to-pathway alignment.",
        "Integration with Synthetic Lethality analysis for double-hit vulnerability detection."
      ]
    },
    {
      audience: "For the Research Team",
      points: [
        "Transparent gene-to-pathway mappings with documented weights.",
        "Extensible design for adding new pathways and genes.",
        "Integration with S/P/E framework and Synthetic Lethality analysis."
      ]
    }
  ],

  conclusion: "Pathway aggregation service transforms variant-level sequence scores into pathway-level biological insights. Integrated into S/P/E framework (40% weight) and Synthetic Lethality analysis. Transparent gene-to-pathway and drug-to-pathway mappings with disease-specific panels.",

  // In-silico overview configuration
  inSilicoOverview: {
    coreConcepts: [
      {
        icon: "Activity",
        title: "Pathway Aggregation",
        description: "Aggregates sequence disruption scores by pathway using weighted gene-to-pathway mappings for mechanism-based drug selection.",
        color: "blue"
      },
      {
        icon: "Map",
        title: "Gene-to-Pathway Mapping",
        description: "Maps cancer genes to biological pathways (DDR, MAPK, TP53, PI3K, VEGF) with transparent weights.",
        color: "teal"
      },
      {
        icon: "Link",
        title: "S/P/E Integration",
        description: "Pathway component contributes 40% weight to drug efficacy scoring in the S/P/E framework.",
        color: "purple"
      }
    ],
    valuePropositions: [
      {
        icon: "Target",
        title: "Mechanism-Based Selection",
        description: "Enables drug selection based on pathway disruption rather than individual variant matching",
        metric: "40% S/P/E weight",
        color: "blue"
      },
      {
        icon: "Database",
        title: "Disease-Specific Panels",
        description: "Pre-configured drug panels for MM, Ovarian, and Melanoma with pathway weight mappings",
        metric: "3 panels",
        color: "teal"
      },
      {
        icon: "Link",
        title: "Synthetic Lethality Integration",
        description: "Pathway disruption data feeds into Synthetic Lethality analysis for double-hit detection",
        metric: "✅ Integrated",
        color: "indigo"
      },
      {
        icon: "Activity",
        title: "Transparent Methodology",
        description: "Clear gene-to-pathway mappings with documented weights and extensible design",
        metric: "5 pathways",
        color: "purple"
      }
    ],
    deliverables: [
      {
        icon: "BarChart3",
        title: "Pathway Scores",
        description: "Aggregated pathway disruption scores from sequence disruption data"
      },
      {
        icon: "Map",
        title: "Gene-to-Pathway Mappings",
        description: "Transparent mappings of cancer genes to biological pathways"
      },
      {
        icon: "Target",
        title: "Drug-to-Pathway Alignment",
        description: "Mechanism-based drug selection through pathway weight matching"
      }
    ]
  }
};
