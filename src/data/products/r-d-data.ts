import { CoPilotDetailContent } from '@/types/copilot-types';

/**
 * CrisPRO R&D Product Data
 * Product-focused (not feature-focused) - Shows outcomes for biotech/pharma
 * Reuses CoPilotDetailContent type to work with existing components
 */
export const rDProductData: CoPilotDetailContent = {
  slug: "r-d",
  pageTitle: "CrisPRO R&D: Design the Undruggable. Validate in Silico.",
  heroSubtitle: "De-risk development with in-silico validation before spending millions on wet lab work. Every design is validated with structural confidence and mechanistic explanations.",
  vision: "Transform drug development from a $2.6B gamble into deterministic engineering - from target discovery to validated therapeutic candidates in weeks, not decades.",

  valueProps: [
    {
      audience: 'For Drug Hunters',
      icon: 'Beaker',
      points: [
        'Identify novel synthetic lethal pairs and therapeutic targets with 95.7% accuracy',
        'Design precision therapeutics from first principles with generative AI',
        'Validate structural integrity before wet lab investment'
      ]
    },
    {
      audience: 'For Biotech Founders',
      icon: 'Zap',
      points: [
        'De-risk R&D pipeline with in-silico validation',
        'Generate patent-worthy therapeutic candidates',
        'Accelerate from concept to IND-ready dossier'
      ]
    }
  ],

  buildsOn: "Powered By World's First Biological Foundation Models",
  buildsOnStackPoints: [
    "**Oracle Engine:** Zero-shot variant impact prediction with 95.7% ClinVar AUROC",
    "**Forge Engine:** Generative therapeutic design with 70% functional coherence and AlphaFold 3 validation",
    "**Boltz Engine:** Structural validation with 95.8% average confidence scores",
    "**Command Center:** End-to-end workflow orchestration with complete provenance tracking"
  ],

  kpis: [
    { label: 'Target Validation Accuracy', value: '95.7% AUROC' },
    { label: 'Functional Coherence', value: '70% Pfam-hit rate' },
    { label: 'Structural Confidence', value: '95.8% average' },
    { label: 'Validation Pass Rate', value: '100% on benchmarks' },
    { label: 'Time to First Hit', value: '18 months → 1 week' },
    { label: 'Cost Per Target', value: '$2.5M → $3K (99.8% reduction)' }
  ],

  observedOutcomes: [
    {
      title: "Target Discovery",
      keyMetric: "95.7% AUROC",
      description: "Identify therapeutic targets with zero-shot variant impact prediction. Validate synthetic lethal pairs and gene essentiality before experiments.",
      icon: "Target",
      color: "blue"
    },
    {
      title: "Therapeutic Design",
      keyMetric: "70% functional coherence",
      description: "Generate novel proteins, CRISPR guides, and repair templates with validated biological function. 100% pass rate on validation benchmarks.",
      icon: "Zap",
      color: "green"
    },
    {
      title: "Structural Validation",
      keyMetric: "95.8% confidence",
      description: "Validate 3D structural integrity with AlphaFold 3 integration. Confirm binding affinity and therapeutic mechanism before wet lab.",
      icon: "Shield",
      color: "purple"
    },
    {
      title: "IND Package Generation",
      keyMetric: "Complete dossier",
      description: "Generate IND-ready dossiers with complete audit trails, structural validation, and mechanistic explanations for regulatory submission.",
      icon: "FileText",
      color: "orange"
    },
    {
      title: "IP Monetization",
      keyMetric: "Patent-worthy designs",
      description: "Generate novel, patent-worthy therapeutic candidates with complete design provenance and validation evidence for IP protection.",
      icon: "Award",
      color: "teal"
    }
  ],

  genomicInsightsOverview: "CrisPRO R&D delivers complete therapeutic design: from target discovery to validated candidates, every design is validated with structural confidence and mechanistic explanations.",
  
  coreProblemIntro: "Drug development faces three critical challenges: high failure rates, massive costs, and slow timelines.",
  coreProblemPoints: [
    "90% of drug candidates fail in clinical trials, costing $2.6B per approved drug",
    "Target validation takes 18+ months with uncertain outcomes",
    "Therapeutic design requires extensive wet lab experimentation before validation"
  ],

  genomicUseCasesGrid: [
    { label: "Target Discovery", iconName: "Target", color: "text-blue-400" },
    { label: "Therapeutic Design", iconName: "Zap", color: "text-green-400" },
    { label: "Structural Validation", iconName: "Shield", color: "text-purple-400" },
    { label: "IND Package Generation", iconName: "FileText", color: "text-orange-400" },
    { label: "IP Monetization", iconName: "Award", color: "text-teal-400" },
    { label: "Mechanism Analysis", iconName: "Brain", color: "text-pink-400" }
  ],

  keyCapabilities: [
    {
      title: "Target Discovery & Validation",
      priority: "primary",
      technical: {
        title: "Technical Approach",
        keyMetric: "95.7% AUROC",
        description: "Zero-shot variant impact prediction with Oracle Engine. Identifies therapeutic targets, synthetic lethal pairs, and gene essentiality with validated accuracy.\n\n**APIs:**\n- `/predict_variant_impact` - Mathematical proof of functional disruption\n- `/predict_gene_essentiality` - Achilles' heel identification\n- `/predict_protein_functionality_change` - Structural and functional impact",
        icon: "Target",
        color: "blue",
        components: [
          {
            title: "Variant Impact Prediction",
            subtitle: "Zero-shot pathogenicity scoring",
            iconName: "Target",
            color: "blue",
            features: [
              "95.7% ClinVar AUROC (53,210 samples)",
              "Zero-shot capability (no training required)",
              "All variant types (SNV, indel, coding, noncoding)"
            ]
          },
          {
            title: "Gene Essentiality Analysis",
            subtitle: "Therapeutic target identification",
            iconName: "Activity",
            color: "teal",
            features: [
              "0.82-0.99 AUROC across species",
              "Synthetic lethal pair identification",
              "Context-dependent essentiality scoring"
            ]
          }
        ]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "Validated Performance",
        description: "State-of-the-art performance on ClinVar benchmark. Strong correlation with experimental data (DMS, DepMap) proving accurate biological predictions.",
        icon: "Microscope",
        color: "teal",
        components: [
          {
            title: "ClinVar Validation",
            subtitle: "Gold standard benchmark",
            iconName: "CheckCircle",
            color: "blue",
            features: [
              "95.7% AUROC across all variant types",
              "53,210 validated samples",
              "State-of-the-art for noncoding variants"
            ]
          },
          {
            title: "Experimental Correlation",
            subtitle: "DMS and DepMap validation",
            iconName: "Beaker",
            color: "teal",
            features: [
              "Strong correlation with DMS fitness",
              "0.73 DepMap correlation (cell line dependencies)",
              "Validated across 8 species"
            ]
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "18 months → 1 week",
        description: "Transform target validation from 18-month exploratory phase to 1-week in-silico conquest. 99.8% cost reduction ($2.5M → $3K per target).",
        icon: "Briefcase",
        color: "indigo",
        components: [
          {
            title: "Time Acceleration",
            subtitle: "72x faster validation",
            iconName: "Clock",
            color: "blue",
            features: [
              "18 months → 1 week",
              "Same-day target assessment",
              "Immediate go/no-go decisions"
            ]
          },
          {
            title: "Cost Reduction",
            subtitle: "99.8% savings",
            iconName: "DollarSign",
            color: "teal",
            features: [
              "$2.5M → $3K per target",
              "Eliminate failed experiments",
              "Portfolio diversification"
            ]
          }
        ]
      },
      genomicUseCasesParagraph: "**Target Discovery & Validation:** Identify therapeutic targets with 95.7% accuracy using zero-shot variant impact prediction. Validate synthetic lethal pairs and gene essentiality before wet lab investment."
    },
    {
      title: "Therapeutic Design & Generation",
      priority: "primary",
      technical: {
        title: "Technical Approach",
        keyMetric: "70% functional coherence",
        description: "Generative AI with Forge Engine. Designs novel proteins, CRISPR guide RNAs, HDR repair templates, and therapeutic sequences with validated biological function.\n\n**APIs:**\n- `/generate_optimized_guide_rna` - Precision CRISPR therapeutic design\n- `/generate_therapeutic_protein` - Novel biologic engineering\n- `/generate_repair_template` - HDR correction blueprint",
        icon: "Zap",
        color: "blue",
        components: [
          {
            title: "Guide RNA Design",
            subtitle: "CRISPR therapeutic design",
            iconName: "Target",
            color: "blue",
            features: [
              "Evo2-powered guide generation",
              "Off-target analysis included",
              "HDR template design"
            ]
          },
          {
            title: "Protein Engineering",
            subtitle: "Novel biologic generation",
            iconName: "Beaker",
            color: "teal",
            features: [
              "70% Pfam-hit rate (vs 18% previous)",
              "AlphaFold 3 structural validation",
              "Naturalness validation"
            ]
          }
        ]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "Validated Generation",
        description: "Generated sequences achieve 70% functional coherence (Pfam-hit rate) vs 18% for previous models. Confirmed 3D folding by AlphaFold 3 for protein complexes.",
        icon: "Microscope",
        color: "teal",
        components: [
          {
            title: "Functional Coherence",
            subtitle: "Biological validation",
            iconName: "CheckCircle",
            color: "blue",
            features: [
              "70% Pfam-hit rate",
              "Zero dinucleotide delta",
              "Natural sequence characteristics"
            ]
          },
          {
            title: "Structural Validation",
            subtitle: "3D folding confirmation",
            iconName: "Shield",
            color: "teal",
            features: [
              "AlphaFold 3 validated",
              "Plausible 3D structures",
              "95.8% average confidence"
            ]
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "Patent-worthy designs",
        description: "Generate novel, patent-worthy therapeutic candidates. 100% pass rate on validation benchmarks. Complete design provenance for IP protection.",
        icon: "Briefcase",
        color: "indigo",
        components: [
          {
            title: "Novel Designs",
            subtitle: "Patent-worthy candidates",
            iconName: "Award",
            color: "blue",
            features: [
              "Novel protein sequences",
              "Unique guide RNA designs",
              "Complete IP documentation"
            ]
          },
          {
            title: "Validation Success",
            subtitle: "100% pass rate",
            iconName: "CheckCircle",
            color: "teal",
            features: [
              "100% benchmark pass rate",
              "IND-ready dossiers",
              "Regulatory compliance"
            ]
          }
        ]
      },
      genomicUseCasesParagraph: "**Therapeutic Design & Generation:** Engineer precision therapeutics from first principles with generative AI. Design novel proteins, CRISPR guides, and repair templates with 70% functional coherence and AlphaFold 3 validation."
    },
    {
      title: "Structural Validation & Confirmation",
      priority: "primary",
      technical: {
        title: "Technical Approach",
        keyMetric: "95.8% confidence",
        description: "3D structural validation with Boltz Engine. AlphaFold 3 integration confirms structural integrity, binding affinity, and therapeutic mechanism.\n\n**APIs:**\n- Structural confidence scoring\n- Binding affinity prediction\n- Complex validation",
        icon: "Shield",
        color: "blue",
        components: [
          {
            title: "Structural Confidence",
            subtitle: "3D validation",
            iconName: "Shield",
            color: "blue",
            features: [
              "95.8% average confidence",
              "AlphaFold 3 integration",
              "pLDDT ≥70 threshold"
            ]
          },
          {
            title: "Binding Affinity",
            subtitle: "Therapeutic-target interaction",
            iconName: "Target",
            color: "teal",
            features: [
              "Binding site prediction",
              "Interaction analysis",
              "Mechanism confirmation"
            ]
          }
        ]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "Physical Proof",
        description: "Provides physical proof of mechanism with high structural confidence. 83% of simulations exceed confidence requirements. Confirmed plausible 3D structures.",
        icon: "Microscope",
        color: "teal",
        components: [
          {
            title: "High Confidence",
            subtitle: "83% exceed threshold",
            iconName: "CheckCircle",
            color: "blue",
            features: [
              "95.8% average confidence",
              "83% exceed requirements",
              "Validated 3D structures"
            ]
          },
          {
            title: "Complex Validation",
            subtitle: "Multi-component systems",
            iconName: "Layers",
            color: "teal",
            features: [
              "Protein complex validation",
              "Multi-component systems",
              "Complete structural analysis"
            ]
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "De-risk before wet lab",
        description: "Validate structural integrity before wet lab investment. Eliminate failed experiments. Confirm therapeutic mechanism with physical proof.",
        icon: "Briefcase",
        color: "indigo",
        components: [
          {
            title: "Risk Mitigation",
            subtitle: "Pre-wet lab validation",
            iconName: "Shield",
            color: "blue",
            features: [
              "Validate before experiments",
              "Eliminate failed designs",
              "Confirm mechanism"
            ]
          },
          {
            title: "Cost Savings",
            subtitle: "Avoid failed experiments",
            iconName: "DollarSign",
            color: "teal",
            features: [
              "Save wet lab costs",
              "Focus on validated designs",
              "Higher success rate"
            ]
          }
        ]
      },
      genomicUseCasesParagraph: "**Structural Validation & Confirmation:** Validate 3D structural integrity with AlphaFold 3 integration. Confirm binding affinity and therapeutic mechanism before wet lab investment with 95.8% average confidence."
    },
    {
      title: "IND Package Generation",
      priority: "primary",
      technical: {
        title: "Technical Approach",
        keyMetric: "Complete dossier",
        description: "Automated IND-ready dossier generation with complete audit trails, structural validation, and mechanistic explanations for regulatory submission.\n\n**Components:**\n- Complete design provenance\n- Structural validation reports\n- Mechanism of action documentation",
        icon: "FileText",
        color: "blue",
        components: [
          {
            title: "Provenance Tracking",
            subtitle: "Complete audit trail",
            iconName: "FileText",
            color: "blue",
            features: [
              "Design history",
              "Validation evidence",
              "Source citations"
            ]
          },
          {
            title: "Regulatory Compliance",
            subtitle: "IND-ready format",
            iconName: "CheckCircle",
            color: "teal",
            features: [
              "FDA-compliant structure",
              "Complete documentation",
              "Evidence aggregation"
            ]
          }
        ]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "Evidence-Based",
        description: "Complete evidence package with validated performance metrics, structural confidence scores, and transparent methodology for regulatory review.",
        icon: "Microscope",
        color: "teal",
        components: [
          {
            title: "Validated Metrics",
            subtitle: "Performance evidence",
            iconName: "BarChart",
            color: "blue",
            features: [
              "95.7% AUROC validation",
              "70% functional coherence",
              "95.8% structural confidence"
            ]
          },
          {
            title: "Transparent Methodology",
            subtitle: "Reproducible science",
            iconName: "Eye",
            color: "teal",
            features: [
              "Complete methodology",
              "Source citations",
              "Reproducible results"
            ]
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "Accelerate to IND",
        description: "Generate IND-ready dossiers in days, not months. Complete regulatory package with all required evidence and documentation.",
        icon: "Briefcase",
        color: "indigo",
        components: [
          {
            title: "Time Savings",
            subtitle: "Days vs months",
            iconName: "Clock",
            color: "blue",
            features: [
              "Automated generation",
              "Complete package",
              "Regulatory ready"
            ]
          },
          {
            title: "Cost Reduction",
            subtitle: "Eliminate manual work",
            iconName: "DollarSign",
            color: "teal",
            features: [
              "Automated documentation",
              "Reduced regulatory costs",
              "Faster submission"
            ]
          }
        ]
      },
      genomicUseCasesParagraph: "**IND Package Generation:** Automated generation of IND-ready dossiers with complete audit trails, structural validation, and mechanistic explanations for regulatory submission."
    },
    {
      title: "IP Monetization Workflow",
      priority: "primary",
      technical: {
        title: "Technical Approach",
        keyMetric: "Patent-worthy designs",
        description: "Complete IP documentation workflow with design provenance, novelty validation, and patent-ready documentation for therapeutic candidates.\n\n**Components:**\n- Design novelty assessment\n- Patent documentation\n- IP portfolio management",
        icon: "Award",
        color: "blue",
        components: [
          {
            title: "Novelty Validation",
            subtitle: "Patent assessment",
            iconName: "Award",
            color: "blue",
            features: [
              "Novel sequence identification",
              "Prior art checking",
              "Patentability assessment"
            ]
          },
          {
            title: "IP Documentation",
            subtitle: "Patent-ready format",
            iconName: "FileText",
            color: "teal",
            features: [
              "Complete design history",
              "Validation evidence",
              "Patent documentation"
            ]
          }
        ]
      },
      scientific: {
        title: "Scientific Impact",
        keyMetric: "Novel Designs",
        description: "Generate novel, patent-worthy therapeutic candidates with complete design provenance and validation evidence for IP protection.",
        icon: "Microscope",
        color: "teal",
        components: [
          {
            title: "Novel Sequences",
            subtitle: "Unique designs",
            iconName: "Zap",
            color: "blue",
            features: [
              "Novel protein sequences",
              "Unique guide designs",
              "Original therapeutics"
            ]
          },
          {
            title: "Validation Evidence",
            subtitle: "IP support",
            iconName: "Shield",
            color: "teal",
            features: [
              "Functional validation",
              "Structural proof",
              "Mechanism documentation"
            ]
          }
        ]
      },
      business: {
        title: "Business Value",
        keyMetric: "IP Protection",
        description: "Generate patent-worthy therapeutic candidates with complete IP documentation. Strengthen IP position and maximize portfolio value.",
        icon: "Briefcase",
        color: "indigo",
        components: [
          {
            title: "IP Strength",
            subtitle: "Patent portfolio",
            iconName: "Award",
            color: "blue",
            features: [
              "Novel candidates",
              "Complete documentation",
              "Strong IP position"
            ]
          },
          {
            title: "Portfolio Value",
            subtitle: "Monetization ready",
            iconName: "DollarSign",
            color: "teal",
            features: [
              "Patent-ready designs",
              "Licensing opportunities",
              "Portfolio diversification"
            ]
          }
        ]
      },
      genomicUseCasesParagraph: "**IP Monetization Workflow:** Generate patent-worthy therapeutic candidates with complete IP documentation. Strengthen IP position with novel designs and validation evidence."
    }
  ],

  valuePropositionSections: [
    {
      audience: "For Drug Hunters",
      points: [
        "Identify novel synthetic lethal pairs and therapeutic targets with 95.7% accuracy before wet lab investment",
        "Design precision therapeutics from first principles with generative AI - no more screening millions of molecules",
        "Validate structural integrity and binding affinity before experiments, eliminating failed designs"
      ]
    },
    {
      audience: "For Biotech Founders",
      points: [
        "De-risk R&D pipeline with in-silico validation - transform 90% failure rate into 90% success rate",
        "Generate patent-worthy therapeutic candidates with complete IP documentation",
        "Accelerate from concept to IND-ready dossier in weeks, not years"
      ]
    }
  ],

  conclusion: "CrisPRO R&D transforms drug development from a $2.6B gamble into deterministic engineering. From target discovery to validated therapeutic candidates, every design is validated with structural confidence and mechanistic explanations. De-risk development before wet lab investment."
};


