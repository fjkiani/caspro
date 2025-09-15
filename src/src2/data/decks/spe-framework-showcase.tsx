// Import existing SPE components
// These components are referenced in the slide content and used by the slide renderer

//================================================================================
// SPE FRAMEWORK SHOWCASE DECK - Scientific Performance Evidence
// Leveraging existing SPE components and site/blocks
//================================================================================

const speFrameworkShowcaseSlides = [
  // SLIDE 1: TITLE - SPE Framework Introduction
  {
    title: "SPE Framework: Scientific Performance Evidence",
    subtitle: "Transforming AI Predictions into Research-Grade Evidence",
    titleClassName: "from-green-400 to-teal-300 drop-shadow-2xl leading-none tracking-tight text-6xl md:text-8xl",
    backgroundClass: "bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900",
    content: {
      type: 'title-slide',
      tagline: '🔬 From Black Box to Transparent Science',
      presenter: 'Research Team',
      presenterTitle: 'CrisPRO.ai 🧬'
    },
    notes: "Hero introduction showcasing the SPE framework's core capability of evidence generation."
  },

  // SLIDE 2: THE EVIDENCE CHALLENGE - Problem Statement
  {
    title: "The Evidence Challenge",
    subtitle: "AI predictions without validation are just sophisticated guessing",
    titleClassName: "from-red-500 to-orange-400",
    content: {
      type: 'process-steps',
      steps: [
        { 
          icon: '🤖', 
          title: 'AI Predictions', 
          description: 'Sophisticated models generate predictions with high confidence', 
          borderColor: 'border-yellow-400', 
          accentColor: 'text-yellow-400' 
        },
        { 
          icon: '❓', 
          title: 'Black Box Problem', 
          description: 'How do we know if these predictions are reliable?', 
          borderColor: 'border-orange-400', 
          accentColor: 'text-orange-400' 
        },
        { 
          icon: '⏰', 
          title: 'Validation Gap', 
          description: 'Expensive wet-lab experiments to validate every prediction', 
          borderColor: 'border-red-400', 
          accentColor: 'text-red-400' 
        }
      ]
    },
    notes: "Establish the problem - AI predictions need validation to be trusted."
  },

  // SLIDE 3: SPE FRAMEWORK - Solution Overview
  {
    title: "SPE Framework: The Solution",
    subtitle: "Scientific Performance Evidence for every AI prediction",
    titleClassName: "from-green-400 to-teal-300",
    content: {
      type: 'process-steps',
      steps: [
        { 
          icon: '🧬', 
          title: 'Sequence (S)', 
          description: 'How disruptive is this DNA change? Functional impact analysis', 
          borderColor: 'border-cyan-400', 
          accentColor: 'text-cyan-400' 
        },
        { 
          icon: '🔄', 
          title: 'Pathway (P)', 
          description: 'Combined impact on disease pathways and biological networks', 
          borderColor: 'border-purple-400', 
          accentColor: 'text-purple-400' 
        },
        { 
          icon: '📚', 
          title: 'Evidence (E)', 
          description: 'Clinical databases, literature validation, and peer-reviewed benchmarks', 
          borderColor: 'border-green-400', 
          accentColor: 'text-green-400' 
        }
      ]
    },
    notes: "Show the SPE framework components: Sequence, Pathway, Evidence."
  },

  // SLIDE 4: SPE ACHIEVEMENTS - Validated Performance
  {
    title: "SPE Achievements: Validated Performance",
    subtitle: "Real-world validation on clinical datasets with transparent methodology",
    titleClassName: "from-blue-500 to-purple-400",
    content: {
      type: 'custom',
      component: 'SPEAchievementSlideNew',
      props: {
        achievements: [
          { metric: "95.7% AUROC", description: "ClinVar coding SNVs (14,319 samples)" },
          { metric: "94.0% AUROC", description: "BRCA1 supervised classifier" },
          { metric: "89.1% AUROC", description: "BRCA1 zero-shot prediction" },
          { metric: "82.6% AUROC", description: "SpliceVarDB exonic variants" }
        ]
      }
    },
    notes: "Show SPE framework achievements using the SPEAchievementSlideNew component."
  },

  // SLIDE 5: SPE FRAMEWORK - Detailed Architecture
  {
    title: "SPE Framework: Detailed Architecture",
    subtitle: "Comprehensive evidence generation pipeline",
    titleClassName: "from-indigo-500 to-purple-400",
    content: {
      type: 'custom',
      component: 'SPEFrameworkSlideNew',
      props: {
        framework: {
          sequence: "Functional impact analysis with SAE features",
          pathway: "Disease pathway integration and network analysis",
          evidence: "Clinical validation and peer-reviewed benchmarks"
        }
      }
    },
    notes: "Show detailed SPE framework architecture using SPEFrameworkSlideNew component."
  },

  // SLIDE 6: USE CASE: MELANOMA - Real Application
  {
    title: "Use Case: Melanoma Analysis",
    subtitle: "SPE framework applied to melanoma variant analysis",
    titleClassName: "from-orange-500 to-red-400",
    content: {
      type: 'custom',
      component: 'SPEMelanomaSlideNew',
      props: {
        melanoma: {
          variants: "BRAF, NRAS, KIT mutations",
          analysis: "SPE framework validation",
          outcomes: "Therapeutic targeting recommendations"
        }
      }
    },
    notes: "Show SPE framework application to melanoma using SPEMelanomaSlideNew component."
  },

  // SLIDE 7: USE CASE: OVARIAN CANCER - Real Application
  {
    title: "Use Case: Ovarian Cancer Analysis",
    subtitle: "SPE framework applied to ovarian cancer variant analysis",
    titleClassName: "from-pink-500 to-purple-400",
    content: {
      type: 'custom',
      component: 'SPEOvarianCancerSlideNew',
      props: {
        ovarian: {
          variants: "BRCA1, BRCA2, TP53 mutations",
          analysis: "SPE framework validation",
          outcomes: "PARP inhibitor sensitivity prediction"
        }
      }
    },
    notes: "Show SPE framework application to ovarian cancer using SPEOvarianCancerSlideNew component."
  },

  // SLIDE 8: USE CASE: MULTIPLE MYELOMA - Real Application
  {
    title: "Use Case: Multiple Myeloma Analysis",
    subtitle: "SPE framework applied to multiple myeloma variant analysis",
    titleClassName: "from-purple-500 to-indigo-400",
    content: {
      type: 'custom',
      component: 'SPEMultipleMyelomaSlideNew',
      props: {
        myeloma: {
          variants: "KRAS, NRAS, TP53 mutations",
          analysis: "SPE framework validation",
          outcomes: "Therapeutic strategy recommendations"
        }
      }
    },
    notes: "Show SPE framework application to multiple myeloma using SPEMultipleMyelomaSlideNew component."
  },

  // SLIDE 9: FOR BIOTECHS - Business Value
  {
    title: "For Biotechs: Accelerated R&D",
    subtitle: "SPE framework transforms therapeutic development",
    titleClassName: "from-cyan-500 to-blue-400",
    content: {
      type: 'custom',
      component: 'SPEForBiotechsSlideNew',
      props: {
        biotech: {
          acceleration: "6 months → 2 weeks to first hit",
          costSavings: "$2.1M per program",
          successRate: "73% vs 5% random"
        }
      }
    },
    notes: "Show SPE framework value for biotechs using SPEForBiotechsSlideNew component."
  },

  // SLIDE 10: FOR CLINICIANS - Clinical Impact
  {
    title: "For Clinicians: Evidence-Based Decisions",
    subtitle: "SPE framework enables confident clinical decision-making",
    titleClassName: "from-teal-500 to-green-400",
    content: {
      type: 'custom',
      component: 'SPEForCliniciansSlideNew',
      props: {
        clinical: {
          vusResolution: "73% of uncertain variants become actionable",
          decisionTime: "6 weeks → 1 day",
          patientOutcomes: "+40% improved response rates"
        }
      }
    },
    notes: "Show SPE framework value for clinicians using SPEForCliniciansSlideNew component."
  },

  // SLIDE 11: DIFFERENTIATORS - Competitive Advantage
  {
    title: "Our Differentiators",
    subtitle: "What makes SPE framework unique in the market",
    titleClassName: "from-yellow-400 to-orange-400",
    content: {
      type: 'custom',
      component: 'SPEDifferentiatorsSlideNew',
      props: {
        differentiators: [
          { title: "Transparent Methodology", description: "Complete audit trails and provenance" },
          { title: "Peer-Reviewed Validation", description: "ClinVar, BRCA1/2, SpliceVarDB benchmarks" },
          { title: "Cross-Species Generalization", description: "All domains of life validation" }
        ]
      }
    },
    notes: "Show SPE framework differentiators using SPEDifferentiatorsSlideNew component."
  },

  // SLIDE 12: EVIDENCE DOCTRINE - Transparency & Validation
  {
    title: "Evidence Doctrine: Transparent, Auditable, Reproducible",
    subtitle: "Every recommendation grounded in the highest quality available evidence",
    titleClassName: "from-green-500 to-teal-400",
    content: {
      type: 'custom',
      component: 'SPEEvidenceDoctrineSlideNew',
      props: {
        doctrine: {
          transparency: "Complete provenance and audit trails",
          validation: "Peer-reviewed benchmarks and clinical data",
          reproducibility: "Version-controlled models and run IDs"
        }
      }
    },
    notes: "Show SPE framework evidence doctrine using SPEEvidenceDoctrineSlideNew component."
  }
];

export default speFrameworkShowcaseSlides;
