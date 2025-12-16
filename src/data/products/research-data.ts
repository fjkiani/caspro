import { CoPilotDetailContent } from '@/types/copilot-types';

/**
 * CrisPRO Research Product Data
 * Product-focused (not feature-focused) - Shows outcomes for academics/researchers
 * Reuses CoPilotDetailContent type to work with existing components
 */
export const researchProductData: CoPilotDetailContent = {
  slug: "research",
  pageTitle: "CrisPRO Research: Accelerate Discovery from Years to Hours.",
  heroSubtitle: "Validate hypotheses in hours, not months. Every insight is traceable to source data with complete audit trails. Generate grant-ready data and publications.",
  vision: "Transform research from manual, time-consuming analysis into rapid, AI-powered discovery - from hypothesis to validated insights in hours, not years.",

  valueProps: [
    {
      audience: 'For Principal Investigators',
      icon: 'GraduationCap',
      points: [
        'Accelerate hypothesis validation from months to hours',
        'Generate grant-ready data with validated metrics and visualizations',
        'Access complete audit trails for publication and reproducibility'
      ]
    },
    {
      audience: 'For Research Institutes',
      icon: 'Building2',
      points: [
        'Scale research capabilities without scaling computational infrastructure',
        'Enable collaborative research with transparent, shareable workflows',
        'Maximize research output with AI-powered insights'
      ]
    }
  ],

  buildsOn: "Powered By World's First Biological Foundation Models",
  buildsOnStackPoints: [
    "**Oracle Engine:** Large-scale variant scoring across massive datasets with 95.7% accuracy",
    "**Command Center:** Knowledge graph and literature retrieval with multi-provider synthesis",
    "**Research Platform:** Cohort intelligence, hypothesis testing, and evidence synthesis",
    "**Universal Testing:** Test compounds and hypotheses across 50+ diseases simultaneously"
  ],

  kpis: [
    { label: 'Hypothesis Validation Time', value: 'Months → Hours' },
    { label: 'Disease Coverage', value: '50+ diseases' },
    { label: 'Dataset Analysis', value: 'TCGA, cBioPortal, GDC' },
    { label: 'VUS Resolution Rate', value: '73% actionable conversion' },
    { label: 'Literature Sources', value: 'PubMed, OpenAlex, S2' },
    { label: 'Research Acceleration', value: '12x faster discovery' }
  ],

  observedOutcomes: [
    {
      title: "Hypothesis Testing",
      keyMetric: "50+ diseases",
      description: "Rapidly test gene-disease associations across 50+ diseases simultaneously. Universal hypothesis testing with validated performance metrics.",
      icon: "Target",
      color: "blue"
    },
    {
      title: "Cohort Intelligence",
      keyMetric: "Massive datasets",
      description: "Analyze TCGA, cBioPortal, GDC datasets for patterns and insights. Scale research capabilities without scaling infrastructure.",
      icon: "Database",
      color: "green"
    },
    {
      title: "VUS Explorer",
      keyMetric: "73% resolution",
      description: "Turn 'unknown' variants into 'understood and actionable' insights. Resolve VUS with 95.7% accuracy and transparent reasoning.",
      icon: "Search",
      color: "purple"
    },
    {
      title: "Literature Synthesis",
      keyMetric: "Multi-provider",
      description: "AI agents that scour PubMed, OpenAlex, S2 to find supporting evidence. Automated evidence aggregation with source citations.",
      icon: "BookOpen",
      color: "orange"
    },
    {
      title: "Grant-Ready Data",
      keyMetric: "Publication ready",
      description: "Generate charts, p-values, and structural models for grant applications. Complete audit trails for reproducibility and peer review.",
      icon: "FileText",
      color: "teal"
    }
  ],

  genomicInsightsOverview: "CrisPRO Research delivers universal research capabilities: from hypothesis testing to validated insights, every analysis is traceable with complete audit trails for publication and reproducibility.",
  
  coreProblemIntro: "Research faces three critical challenges: slow hypothesis validation, fragmented data sources, and manual literature synthesis.",
  coreProblemPoints: [
    "Manual hypothesis testing takes months with uncertain outcomes",
    "Fragmented datasets (TCGA, cBioPortal, GDC) require manual integration",
    "Literature synthesis is time-consuming and incomplete"
  ],

  genomicUseCasesGrid: [
    { label: "Universal Hypothesis Testing", iconName: "Target", color: "text-blue-400" },
    { label: "Cohort Intelligence", iconName: "Database", color: "text-green-400" },
    { label: "VUS Explorer", iconName: "Search", color: "text-purple-400" },
    { label: "Literature Synthesis", iconName: "BookOpen", color: "text-orange-400" },
    { label: "Grant-Ready Data", iconName: "FileText", color: "text-teal-400" },
    { label: "Evidence Synthesis", iconName: "Layers", color: "text-pink-400" }
  ],

  keyCapabilities: [
    {
      title: "Universal Hypothesis Testing",
      priority: "primary",
      technical: {
        title: "Technical Approach",
        keyMetric: "50+ diseases",
        description: "Rapidly test gene-disease associations across 50+ diseases simultaneously. Universal hypothesis testing with validated performance metrics.\n\n**APIs:**\n- `/predict_variant_impact` - Test variants across diseases\n- `/predict_gene_essentiality` - Gene-disease associations\n- Universal testing framework",
        icon: "Target",
        color: "blue",
        components: [
          {
            title: "Multi-Disease Testing",
            subtitle: "Simultaneous testing across diseases",
            iconName: "Layers",
            color: "blue",
            features: [
              "Test across 50+ diseases",
              "Parallel hypothesis validation",
              "Comparative disease analysis"
            ]
          },
          {
            title: "Validated Metrics",
            subtitle: "Performance-guaranteed results",
            iconName: "CheckCircle",
            color: "teal",
            features: [
              "95.7% AUROC validation",
              "Transparent confidence scores",
              "Reproducible results"
            ]
          }
        ]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "Rapid Validation",
        description: "Accelerate hypothesis validation from months to hours. Test gene-disease associations with validated accuracy and complete audit trails.",
        icon: "Microscope",
        color: "teal",
        components: [
          {
            title: "Time Acceleration",
            subtitle: "Months → Hours",
            iconName: "Clock",
            color: "blue",
            features: [
              "12x faster discovery",
              "Same-day hypothesis validation",
              "Rapid iteration cycles"
            ]
          },
          {
            title: "Reproducibility",
            subtitle: "Complete audit trails",
            iconName: "Eye",
            color: "teal",
            features: [
              "Transparent methodology",
              "Source citations",
              "Reproducible workflows"
            ]
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "Accelerate Discovery",
        description: "Validate hypotheses in hours, not months. Generate publication-ready results with complete evidence and audit trails.",
        icon: "Briefcase",
        color: "indigo",
        components: [
          {
            title: "Research Speed",
            subtitle: "Accelerate discovery cycles",
            iconName: "Zap",
            color: "blue",
            features: [
              "Faster publication cycles",
              "More hypotheses tested",
              "Higher research output"
            ]
          },
          {
            title: "Grant Readiness",
            subtitle: "Publication-ready data",
            iconName: "FileText",
            color: "teal",
            features: [
              "Grant-ready visualizations",
              "Validated metrics",
              "Complete documentation"
            ]
          }
        ]
      },
      genomicUseCasesParagraph: "**Universal Hypothesis Testing:** Rapidly test gene-disease associations across 50+ diseases simultaneously. Accelerate hypothesis validation from months to hours with validated accuracy."
    },
    {
      title: "Cohort Intelligence & Analysis",
      priority: "primary",
      technical: {
        title: "Technical Approach",
        keyMetric: "Massive datasets",
        description: "Analyze TCGA, cBioPortal, GDC datasets for patterns and insights. Scale research capabilities without scaling computational infrastructure.\n\n**Capabilities:**\n- Multi-dataset integration\n- Pattern identification\n- Cohort comparison",
        icon: "Database",
        color: "blue",
        components: [
          {
            title: "Dataset Integration",
            subtitle: "Unified data access",
            iconName: "Database",
            color: "blue",
            features: [
              "TCGA integration",
              "cBioPortal access",
              "GDC data integration"
            ]
          },
          {
            title: "Pattern Analysis",
            subtitle: "AI-powered insights",
            iconName: "BarChart",
            color: "teal",
            features: [
              "Variant pattern identification",
              "Cohort comparison",
              "Trend analysis"
            ]
          }
        ]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "Scalable Analysis",
        description: "Analyze massive datasets without computational overhead. Identify patterns and insights across cohorts with validated methodology.",
        icon: "Microscope",
        color: "teal",
        components: [
          {
            title: "Scale Research",
            subtitle: "Without scaling infrastructure",
            iconName: "TrendingUp",
            color: "blue",
            features: [
              "Analyze massive cohorts",
              "No infrastructure overhead",
              "Cloud-based analysis"
            ]
          },
          {
            title: "Validated Methodology",
            subtitle: "Reproducible analysis",
            iconName: "Shield",
            color: "teal",
            features: [
              "Transparent algorithms",
              "Complete audit trails",
              "Reproducible results"
            ]
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "Maximize Research Output",
        description: "Scale research capabilities without scaling infrastructure. Enable collaborative research with transparent, shareable workflows.",
        icon: "Briefcase",
        color: "indigo",
        components: [
          {
            title: "Infrastructure Savings",
            subtitle: "No computational overhead",
            iconName: "DollarSign",
            color: "blue",
            features: [
              "Cloud-based platform",
              "No server management",
              "Pay-per-use model"
            ]
          },
          {
            title: "Collaboration",
            subtitle: "Shareable workflows",
            iconName: "Users",
            color: "teal",
            features: [
              "Transparent methodology",
              "Reproducible workflows",
              "Team collaboration"
            ]
          }
        ]
      },
      genomicUseCasesParagraph: "**Cohort Intelligence:** Analyze TCGA, cBioPortal, GDC datasets for patterns and insights. Scale research capabilities without scaling computational infrastructure."
    },
    {
      title: "VUS Explorer & Resolution",
      priority: "primary",
      technical: {
        title: "Technical Approach",
        keyMetric: "73% resolution",
        description: "Turn 'unknown' variants into 'understood and actionable' insights. Resolve VUS with 95.7% accuracy and transparent reasoning.\n\n**APIs:**\n- `/predict_variant_impact` - Zero-shot VUS resolution\n- SAE feature visualization\n- Transparent explanations",
        icon: "Search",
        color: "blue",
        components: [
          {
            title: "VUS Resolution",
            subtitle: "73% actionable conversion",
            iconName: "Target",
            color: "blue",
            features: [
              "95.7% AUROC accuracy",
              "Zero-shot capability",
              "All variant types"
            ]
          },
          {
            title: "Transparent Reasoning",
            subtitle: "SAE feature visualization",
            iconName: "Eye",
            color: "teal",
            features: [
              "Biological explanations",
              "Feature attribution",
              "Complete audit trails"
            ]
          }
        ]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "Actionable Insights",
        description: "Resolve 73% of VUS cases with 95.7% accuracy. Provide transparent biological reasoning with SAE feature visualization.",
        icon: "Microscope",
        color: "teal",
        components: [
          {
            title: "Resolution Rate",
            subtitle: "73% actionable conversion",
            iconName: "CheckCircle",
            color: "blue",
            features: [
              "95.7% AUROC validation",
              "State-of-the-art performance",
              "All variant types"
            ]
          },
          {
            title: "Explainability",
            subtitle: "Biological reasoning",
            iconName: "Brain",
            color: "teal",
            features: [
              "SAE feature maps",
              "Transparent explanations",
              "Reproducible methodology"
            ]
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "Research Acceleration",
        description: "Turn uncertain variants into research hypotheses. Accelerate discovery with validated, actionable insights.",
        icon: "Briefcase",
        color: "indigo",
        components: [
          {
            title: "Research Speed",
            subtitle: "Faster hypothesis generation",
            iconName: "Zap",
            color: "blue",
            features: [
              "Immediate insights",
              "Actionable hypotheses",
              "Faster discovery"
            ]
          },
          {
            title: "Publication Quality",
            subtitle: "Validated results",
            iconName: "FileText",
            color: "teal",
            features: [
              "Peer-review ready",
              "Complete evidence",
              "Reproducible methodology"
            ]
          }
        ]
      },
      genomicUseCasesParagraph: "**VUS Explorer:** Turn 'unknown' variants into 'understood and actionable' insights. Resolve VUS with 95.7% accuracy and transparent biological reasoning."
    },
    {
      title: "Literature Synthesis & Evidence",
      priority: "primary",
      technical: {
        title: "Technical Approach",
        keyMetric: "Multi-provider",
        description: "AI agents that scour PubMed, OpenAlex, S2 to find supporting evidence. Automated evidence aggregation with source citations.\n\n**Sources:**\n- PubMed integration\n- OpenAlex access\n- S2 (Semantic Scholar) search",
        icon: "BookOpen",
        color: "blue",
        components: [
          {
            title: "Multi-Provider Search",
            subtitle: "Comprehensive coverage",
            iconName: "Search",
            color: "blue",
            features: [
              "PubMed integration",
              "OpenAlex access",
              "S2 search"
            ]
          },
          {
            title: "Automated Synthesis",
            subtitle: "AI-powered aggregation",
            iconName: "Brain",
            color: "teal",
            features: [
              "Evidence aggregation",
              "Source citations",
              "Relevance ranking"
            ]
          }
        ]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "Complete Evidence",
        description: "Automated literature synthesis saves months of manual research. Complete evidence packages with source citations and relevance ranking.",
        icon: "Microscope",
        color: "teal",
        components: [
          {
            title: "Time Savings",
            subtitle: "Months → Hours",
            iconName: "Clock",
            color: "blue",
            features: [
              "Automated literature search",
              "Evidence aggregation",
              "Relevance ranking"
            ]
          },
          {
            title: "Comprehensive Coverage",
            subtitle: "Multi-source synthesis",
            iconName: "Layers",
            color: "teal",
            features: [
              "Multiple providers",
              "Complete coverage",
              "Up-to-date sources"
            ]
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "Accelerate Research",
        description: "Save months of manual literature review. Generate comprehensive evidence packages for publications and grants.",
        icon: "Briefcase",
        color: "indigo",
        components: [
          {
            title: "Research Efficiency",
            subtitle: "Automated synthesis",
            iconName: "Zap",
            color: "blue",
            features: [
              "Save research time",
              "Comprehensive coverage",
              "Always up-to-date"
            ]
          },
          {
            title: "Publication Support",
            subtitle: "Grant-ready evidence",
            iconName: "FileText",
            color: "teal",
            features: [
              "Complete citations",
              "Source attribution",
              "Reproducible searches"
            ]
          }
        ]
      },
      genomicUseCasesParagraph: "**Literature Synthesis:** AI agents that scour PubMed, OpenAlex, S2 to find supporting evidence. Automated evidence aggregation with source citations saves months of manual research."
    },
    {
      title: "Grant-Ready Data & Publications",
      priority: "primary",
      technical: {
        title: "Technical Approach",
        keyMetric: "Publication ready",
        description: "Generate charts, p-values, and structural models for grant applications. Complete audit trails for reproducibility and peer review.\n\n**Outputs:**\n- Publication-ready visualizations\n- Statistical analysis\n- Complete methodology",
        icon: "FileText",
        color: "blue",
        components: [
          {
            title: "Visualizations",
            subtitle: "Publication-ready charts",
            iconName: "BarChart",
            color: "blue",
            features: [
              "High-quality graphics",
              "Customizable formats",
              "Grant-ready styling"
            ]
          },
          {
            title: "Statistical Analysis",
            subtitle: "Complete metrics",
            iconName: "TrendingUp",
            color: "teal",
            features: [
              "P-value calculations",
              "Confidence intervals",
              "Statistical validation"
            ]
          }
        ]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "Reproducibility",
        description: "Complete audit trails for reproducibility and peer review. Publication-ready data with validated methodology and source citations.",
        icon: "Microscope",
        color: "teal",
        components: [
          {
            title: "Audit Trails",
            subtitle: "Complete provenance",
            iconName: "Eye",
            color: "blue",
            features: [
              "Complete workflow history",
              "Source citations",
              "Methodology documentation"
            ]
          },
          {
            title: "Reproducibility",
            subtitle: "Peer-review ready",
            iconName: "CheckCircle",
            color: "teal",
            features: [
              "Reproducible workflows",
              "Transparent methodology",
              "Complete documentation"
            ]
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "Grant Success",
        description: "Generate grant-ready data with validated metrics. Accelerate publication cycles with publication-ready outputs.",
        icon: "Briefcase",
        color: "indigo",
        components: [
          {
            title: "Grant Applications",
            subtitle: "Publication-ready data",
            iconName: "FileText",
            color: "blue",
            features: [
              "High-quality visualizations",
              "Validated metrics",
              "Complete documentation"
            ]
          },
          {
            title: "Publication Speed",
            subtitle: "Faster publication cycles",
            iconName: "Clock",
            color: "teal",
            features: [
              "Ready-to-publish data",
              "Complete methodology",
              "Reproducible results"
            ]
          }
        ]
      },
      genomicUseCasesParagraph: "**Grant-Ready Data:** Generate charts, p-values, and structural models for grant applications. Complete audit trails for reproducibility and peer review."
    }
  ],

  valuePropositionSections: [
    {
      audience: "For Principal Investigators",
      points: [
        "Accelerate hypothesis validation from months to hours with validated accuracy",
        "Generate grant-ready data with publication-ready visualizations and complete audit trails",
        "Access complete audit trails for publication and reproducibility"
      ]
    },
    {
      audience: "For Research Institutes",
      points: [
        "Scale research capabilities without scaling computational infrastructure",
        "Enable collaborative research with transparent, shareable workflows",
        "Maximize research output with AI-powered insights and validated methodology"
      ]
    }
  ],

  conclusion: "CrisPRO Research transforms discovery from manual, time-consuming analysis into rapid, AI-powered insights. From hypothesis to validated results, every analysis is traceable with complete audit trails for publication and reproducibility. Accelerate discovery from years to hours."
};


