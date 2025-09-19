// Import existing components - leveraging our branded components
// These components are referenced in the slide content and used by the slide renderer

//================================================================================
// ORACLE SHOWCASE DECK - Discriminative AI Engine
// Leveraging existing components from RUNX1 and site/blocks
//================================================================================

const oracleShowcaseSlides = [
  // SLIDE 1: TITLE - Oracle Introduction
  {
    title: "Oracle: The Discriminative AI Engine",
    subtitle: "Transforming Genetic Uncertainty into Actionable Intelligence",
    titleClassName: "from-cyan-400 to-blue-300 drop-shadow-2xl leading-none tracking-tight text-6xl md:text-8xl",
    backgroundClass: "bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900",
    content: {
      type: 'title-slide',
      tagline: '🎯 From VUS to Pathogenic in Seconds',
      presenter: 'Research Team',
      presenterTitle: 'CrisPRO.ai 🧬'
    },
    notes: "Hero introduction showcasing Oracle's core capability of VUS resolution."
  },

  // SLIDE 2: THE VUS CRISIS - Problem Statement
  {
    title: "The VUS Crisis: A Clinical Dead End",
    subtitle: "40% of genetic tests return uncertain results, paralyzing clinical decisions",
    titleClassName: "from-red-500 to-orange-400",
    content: {
      type: 'process-steps',
      steps: [
        { 
          icon: '🧬', 
          title: 'Genetic Variant Identified', 
          description: 'A mutation is found, but its clinical significance is unknown', 
          borderColor: 'border-yellow-400', 
          accentColor: 'text-yellow-400' 
        },
        { 
          icon: '❓', 
          title: 'VUS Classification', 
          description: 'Variant of Uncertain Significance - no clear pathogenic or benign verdict', 
          borderColor: 'border-orange-400', 
          accentColor: 'text-orange-400' 
        },
        { 
          icon: '⏰', 
          title: 'Clinical Paralysis', 
          description: 'Physicians cannot make treatment decisions without definitive classification', 
          borderColor: 'border-red-400', 
          accentColor: 'text-red-400' 
        }
      ]
    },
    notes: "Establish the problem - VUS uncertainty creates clinical dead ends and delays care."
  },

  // SLIDE 3: ORACLE SOLUTION - AI-Powered Resolution
  {
    title: "Oracle: AI-Powered VUS Resolution",
    subtitle: "Zero-shot predictions with transparent methodology",
    titleClassName: "from-cyan-400 to-blue-300",
    content: {
      type: 'custom',
      component: 'ZetaOracleInAction',
      props: {
        left: { 
          title: 'Traditional Analysis', 
          value: 'VUS', 
          subtitle: 'Variant of Uncertain Significance' 
        },
        right: { 
          title: "CrisPRO's Oracle", 
          value: 'PATHOGENIC', 
          subtitle: 'High-confidence classification' 
        },
        score: { 
          title: 'Zeta Score', 
          value: '-26,140.8' 
        }
      }
    },
    notes: "Demonstrate Oracle's core capability using the existing ZetaOracleInAction component."
  },

  // SLIDE 4: ORACLE EXPLANATION - Transparent AI
  {
    title: "Transparent AI: How Oracle Works",
    subtitle: "SAE features and biological reasoning for every prediction",
    titleClassName: "from-purple-500 to-pink-400",
    content: {
      type: 'custom',
      siteBlocks: [
        {
          kind: 'oracle-explain',
          props: {
            variant: 'BRCA1:c.5266dupC',
            score: -26.1408,
            confidence: 0.94,
            explanation: 'Pathogenic variant with high confidence - SAE features show strong functional disruption signal'
          }
        }
      ]
    },
    notes: "Show Oracle's explainable AI capabilities using the OracleExplainTrack component."
  },

  // SLIDE 5: VALIDATED PERFORMANCE - Real Metrics
  {
    title: "Validated Performance: Peer-Reviewed Results",
    subtitle: "State-of-the-art performance on clinical benchmark datasets",
    titleClassName: "from-blue-500 to-purple-400",
    content: {
      type: 'custom',
      siteBlocks: [
        {
          kind: 'vep-metrics',
          props: {
            metrics: [
              { label: "ClinVar AUROC", value: "95.7%", description: "Coding SNVs (14,319 samples)" },
              { label: "BRCA1 AUROC", value: "94.0%", description: "Supervised classifier" },
              { label: "BRCA1 Zero-shot", value: "89.1%", description: "No task-specific training" },
              { label: "SpliceVarDB", value: "82.6%", description: "Exonic variants (1,181 samples)" }
            ]
          }
        }
      ]
    },
    notes: "Show validated performance metrics from peer-reviewed sources using VEPMetrics component."
  },

  // SLIDE 6: VARIANT DETAIL - Individual Analysis
  {
    title: "Individual Variant Analysis",
    subtitle: "Comprehensive variant assessment with clinical context",
    titleClassName: "from-teal-500 to-cyan-400",
    content: {
      type: 'custom',
      siteBlocks: [
        {
          kind: 'variant-detail',
          props: {
            gene: 'BRCA1',
            variant: 'c.5266dupC',
            position: 'chr17:43044295',
            clinicalSignificance: 'Pathogenic',
            evidence: 'Multiple lines of computational evidence',
            confidence: 0.94,
            zetaScore: -26.1408
          }
        }
      ]
    },
    notes: "Show detailed variant analysis using the VariantDetailCard component."
  },

  // SLIDE 7: CROSS-SPECIES CAPABILITY - Generalization
  {
    title: "Cross-Species Generalization",
    subtitle: "From prokaryotes to eukaryotes - validated across all domains of life",
    titleClassName: "from-green-500 to-teal-400",
    content: {
      type: 'process-steps',
      steps: [
        { 
          icon: '🦠', 
          title: 'Prokaryotes', 
          description: '56 bacterial genomes - essentiality prediction', 
          borderColor: 'border-blue-400', 
          accentColor: 'text-blue-400' 
        },
        { 
          icon: '🧬', 
          title: 'Eukaryotes', 
          description: '8 species exon classification - 0.82-0.99 AUROC range', 
          borderColor: 'border-green-400', 
          accentColor: 'text-green-400' 
        },
        { 
          icon: '👤', 
          title: 'Human', 
          description: 'ClinVar validation - 53,210 total samples', 
          borderColor: 'border-purple-400', 
          accentColor: 'text-purple-400' 
        }
      ]
    },
    notes: "Show Oracle's cross-species generalization capabilities."
  },

  // SLIDE 8: CLINICAL IMPACT - Real-World Applications
  {
    title: "Clinical Impact: From Lab to Patient",
    subtitle: "Transforming research insights into clinical action",
    titleClassName: "from-indigo-500 to-purple-400",
    content: {
      type: 'process-steps',
      steps: [
        { 
          icon: '🔬', 
          title: 'Research Mode', 
          description: 'VUS resolution for therapeutic target identification', 
          borderColor: 'border-cyan-400', 
          accentColor: 'text-cyan-400' 
        },
        { 
          icon: '🏥', 
          title: 'Clinical Translation', 
          description: 'Risk stratification and treatment planning', 
          borderColor: 'border-blue-400', 
          accentColor: 'text-blue-400' 
        },
        { 
          icon: '👨‍👩‍👧‍👦', 
          title: 'Family Testing', 
          description: 'Cascade testing for at-risk family members', 
          borderColor: 'border-green-400', 
          accentColor: 'text-green-400' 
        }
      ]
    },
    notes: "Show how Oracle's research capabilities translate to clinical impact."
  },

  // SLIDE 9: COMPETITIVE ADVANTAGE - Why Oracle
  {
    title: "Our Competitive Advantage",
    subtitle: "The only platform with zero-shot accuracy across all variant types",
    titleClassName: "from-yellow-400 to-orange-400",
    content: {
      type: 'process-steps',
      steps: [
        { 
          icon: '🎯', 
          title: 'Zero-Shot Capability', 
          description: 'No task-specific training required - works out of the box', 
          borderColor: 'border-cyan-400', 
          accentColor: 'text-cyan-400' 
        },
        { 
          icon: '🔍', 
          title: 'Transparent Methodology', 
          description: 'Complete audit trails and SAE feature explanations', 
          borderColor: 'border-purple-400', 
          accentColor: 'text-purple-400' 
        },
        { 
          icon: '🌍', 
          title: 'Cross-Domain', 
          description: 'All variant types, all species, all domains of life', 
          borderColor: 'border-green-400', 
          accentColor: 'text-green-400' 
        }
      ]
    },
    notes: "Show Oracle's unique competitive advantages."
  },

  // SLIDE 10: EVIDENCE DOCTRINE - Transparency & Validation
  {
    title: "Evidence Doctrine: Transparent, Auditable, Reproducible",
    subtitle: "Every recommendation grounded in the highest quality available evidence",
    titleClassName: "from-green-500 to-teal-400",
    content: {
      type: 'process-steps',
      steps: [
        { 
          icon: '🔍', 
          title: 'Transparency First', 
          description: 'Every recommendation includes full provenance, rationale, and audit trail with run IDs and citations', 
          borderColor: 'border-green-400', 
          accentColor: 'text-green-400' 
        },
        { 
          icon: '📊', 
          title: 'Evidence Hierarchy', 
          description: 'Clinical trials > Expert panels > Literature > Computational (Research Mode)', 
          borderColor: 'border-blue-400', 
          accentColor: 'text-blue-400' 
        },
        { 
          icon: '🔄', 
          title: 'Reproducible Results', 
          description: 'All analyses include run IDs and can be reproduced with version-controlled models (Research Mode)', 
          borderColor: 'border-purple-400', 
          accentColor: 'text-purple-400' 
        }
      ]
    },
    notes: "Show our evidence doctrine principles that ensure every therapeutic recommendation is grounded in the highest quality available evidence with complete transparency."
  }
];

export default oracleShowcaseSlides;
