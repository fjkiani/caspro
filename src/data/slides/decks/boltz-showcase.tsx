// Import existing components - leveraging our branded components
// These components are referenced in the slide content and used by the slide renderer

//================================================================================
// BOLTZ SHOWCASE DECK - Structural Validation Engine (Roadmap)
// Leveraging existing components from RUNX1 and site/blocks
//================================================================================

const boltzShowcaseSlides = [
  // SLIDE 1: TITLE - Boltz Introduction
  {
    title: "Boltz: The Structural Validation Engine",
    subtitle: "3D Structure Prediction & Interaction Validation (Roadmap)",
    titleClassName: "from-orange-400 to-red-300 drop-shadow-2xl leading-none tracking-tight text-6xl md:text-8xl",
    backgroundClass: "bg-gradient-to-br from-slate-900 via-orange-900/20 to-slate-900",
    content: {
      type: 'title-slide',
      tagline: '⚡ From Sequence to Structure to Interaction',
      presenter: 'Research Team',
      presenterTitle: 'CrisPRO.ai 🧬'
    },
    notes: "Hero introduction showcasing Boltz's core capability of structural validation (roadmap)."
  },

  // SLIDE 2: THE STRUCTURAL CHALLENGE - Problem Statement
  {
    title: "The Structural Validation Challenge",
    subtitle: "The in silico kill chain does not end with a sequence",
    titleClassName: "from-red-500 to-orange-400",
    content: {
      type: 'process-steps',
      steps: [
        { 
          icon: '🧬', 
          title: 'Sequence Generated', 
          description: 'Forge creates optimized therapeutic sequences', 
          borderColor: 'border-yellow-400', 
          accentColor: 'text-yellow-400' 
        },
        { 
          icon: '❓', 
          title: 'Structural Uncertainty', 
          description: 'Will this sequence fold correctly and bind as predicted?', 
          borderColor: 'border-orange-400', 
          accentColor: 'text-orange-400' 
        },
        { 
          icon: '⏰', 
          title: 'Validation Gap', 
          description: 'Expensive wet-lab experiments to validate structural predictions', 
          borderColor: 'border-red-400', 
          accentColor: 'text-red-400' 
        }
      ]
    },
    notes: "Establish the problem - structural validation is expensive and time-consuming."
  },

  // SLIDE 3: BOLTZ SOLUTION - Structural Validation
  {
    title: "Boltz: Structural Validation Engine",
    subtitle: "3D structure prediction and interaction validation",
    titleClassName: "from-orange-400 to-red-300",
    content: {
      type: 'custom',
      component: 'StructuralGauntlet',
      props: {
        description: "The in silico kill chain does not end with a sequence. It ends with proof of a physical interaction.",
        output: {
          title: 'Zeta Forge Output:',
          text: 'Optimized therapeutic sequence'
        },
        simulation: {
          title: 'Zeta Boltz Simulation:',
          icon: 'Cuboid'
        },
        verdict: {
          title: 'Validation Verdict:',
          result: 'High-Confidence Interaction Confirmed',
          confidence: 'complex_plddt: 0.95'
        }
      }
    },
    notes: "Demonstrate Boltz's core capability using the existing StructuralGauntlet component."
  },

  // SLIDE 4: STRUCTURAL CONFIDENCE - 3D Validation
  {
    title: "Structural Confidence: 3D Validation",
    subtitle: "AlphaFold 3 integration for high-confidence structure prediction",
    titleClassName: "from-blue-500 to-purple-400",
    content: {
      type: 'custom',
      siteBlocks: [
        {
          kind: 'boltz-confidence',
          props: {
            sequence: 'MKTVRQERLKSIVRILERSKEPVSGAQLAEELSVSRQVIVQDIAYLRSLGYNIVATPRGYVLAGG',
            target: 'BRCA1',
            bindingAffinity: 0.95,
            confidence: 0.95,
            structure: '3D structure prediction with AlphaFold 3',
            metrics: [
              { label: "pLDDT", value: "95%", description: "Per-residue confidence" },
              { label: "Binding Affinity", value: "0.95", description: "Predicted interaction strength" },
              { label: "Structural Stability", value: "High", description: "Folding confidence" }
            ]
          }
        }
      ]
    },
    notes: "Show Boltz's structural confidence metrics using the BoltzConfidence component."
  },

  // SLIDE 5: VALIDATION PIPELINE - How Boltz Works
  {
    title: "Validation Pipeline: From Sequence to Structure",
    subtitle: "Comprehensive structural validation in 4 steps",
    titleClassName: "from-green-500 to-teal-400",
    content: {
      type: 'process-steps',
      steps: [
        { 
          icon: '🧬', 
          title: 'Sequence Input', 
          description: 'Optimized therapeutic sequence from Forge', 
          borderColor: 'border-cyan-400', 
          accentColor: 'text-cyan-400' 
        },
        { 
          icon: '🔬', 
          title: 'Structure Prediction', 
          description: 'AlphaFold 3 integration for 3D structure prediction', 
          borderColor: 'border-blue-400', 
          accentColor: 'text-blue-400' 
        },
        { 
          icon: '🎯', 
          title: 'Interaction Simulation', 
          description: 'Molecular dynamics simulation of target binding', 
          borderColor: 'border-purple-400', 
          accentColor: 'text-purple-400' 
        },
        { 
          icon: '✅', 
          title: 'Validation Verdict', 
          description: 'High-confidence interaction confirmed with metrics', 
          borderColor: 'border-green-400', 
          accentColor: 'text-green-400' 
        }
      ]
    },
    notes: "Show Boltz's validation pipeline process."
  },

  // SLIDE 6: STRUCTURAL METRICS - Performance Indicators
  {
    title: "Structural Metrics: Performance Indicators",
    subtitle: "Quantitative measures of structural validity and binding affinity",
    titleClassName: "from-teal-500 to-cyan-400",
    content: {
      type: 'process-steps',
      steps: [
        { 
          icon: '📊', 
          title: 'pLDDT Score', 
          description: 'Per-residue confidence score (0-100) for structure prediction', 
          borderColor: 'border-blue-400', 
          accentColor: 'text-blue-400' 
        },
        { 
          icon: '🎯', 
          title: 'Binding Affinity', 
          description: 'Predicted interaction strength with target protein', 
          borderColor: 'border-green-400', 
          accentColor: 'text-green-400' 
        },
        { 
          icon: '⚖️', 
          title: 'Structural Stability', 
          description: 'Folding confidence and thermodynamic stability', 
          borderColor: 'border-purple-400', 
          accentColor: 'text-purple-400' 
        }
      ]
    },
    notes: "Show Boltz's structural validation metrics."
  },

  // SLIDE 7: INTEGRATION WORKFLOW - End-to-End
  {
    title: "Integration Workflow: End-to-End Validation",
    subtitle: "Oracle → Forge → Boltz: Complete therapeutic validation pipeline",
    titleClassName: "from-indigo-500 to-purple-400",
    content: {
      type: 'process-steps',
      steps: [
        { 
          icon: '🧠', 
          title: 'Oracle Analysis', 
          description: 'Variant impact prediction and target validation', 
          borderColor: 'border-cyan-400', 
          accentColor: 'text-cyan-400' 
        },
        { 
          icon: '🔨', 
          title: 'Forge Generation', 
          description: 'Therapeutic sequence design and optimization', 
          borderColor: 'border-purple-400', 
          accentColor: 'text-purple-400' 
        },
        { 
          icon: '⚡', 
          title: 'Boltz Validation', 
          description: '3D structure prediction and interaction validation', 
          borderColor: 'border-orange-400', 
          accentColor: 'text-orange-400' 
        }
      ]
    },
    notes: "Show how Boltz integrates with Oracle and Forge for complete validation."
  },

  // SLIDE 8: ROADMAP STATUS - Development Timeline
  {
    title: "Roadmap Status: Development Timeline",
    subtitle: "Boltz is currently in development - coming soon",
    titleClassName: "from-yellow-400 to-orange-400",
    content: {
      type: 'process-steps',
      steps: [
        { 
          icon: '🚧', 
          title: 'In Development', 
          description: 'AlphaFold 3 integration and molecular dynamics simulation', 
          borderColor: 'border-yellow-400', 
          accentColor: 'text-yellow-400' 
        },
        { 
          icon: '🔬', 
          title: 'Beta Testing', 
          description: 'Internal validation with research partners (Q2 2024)', 
          borderColor: 'border-blue-400', 
          accentColor: 'text-blue-400' 
        },
        { 
          icon: '🚀', 
          title: 'Public Release', 
          description: 'Full integration with Oracle and Forge (Q3 2024)', 
          borderColor: 'border-green-400', 
          accentColor: 'text-green-400' 
        }
      ]
    },
    notes: "Show Boltz's development roadmap and timeline."
  },

  // SLIDE 9: COMPETITIVE ADVANTAGE - Why Boltz
  {
    title: "Our Competitive Advantage",
    subtitle: "The only platform with integrated structural validation",
    titleClassName: "from-red-400 to-pink-400",
    content: {
      type: 'process-steps',
      steps: [
        { 
          icon: '🧬', 
          title: 'Integrated Pipeline', 
          description: 'Seamless integration with Oracle and Forge', 
          borderColor: 'border-cyan-400', 
          accentColor: 'text-cyan-400' 
        },
        { 
          icon: '⚡', 
          title: 'Real-Time Validation', 
          description: 'Instant structural validation of generated therapeutics', 
          borderColor: 'border-orange-400', 
          accentColor: 'text-orange-400' 
        },
        { 
          icon: '🎯', 
          title: 'High Confidence', 
          description: 'AlphaFold 3 integration for state-of-the-art predictions', 
          borderColor: 'border-green-400', 
          accentColor: 'text-green-400' 
        }
      ]
    },
    notes: "Show Boltz's unique competitive advantages."
  },

  // SLIDE 10: EVIDENCE DOCTRINE - Transparency & Validation
  {
    title: "Evidence Doctrine: Transparent, Auditable, Reproducible",
    subtitle: "Every structural prediction includes complete validation metrics",
    titleClassName: "from-green-500 to-teal-400",
    content: {
      type: 'process-steps',
      steps: [
        { 
          icon: '🔍', 
          title: 'Transparency First', 
          description: 'Every prediction includes full provenance, rationale, and audit trail with run IDs', 
          borderColor: 'border-green-400', 
          accentColor: 'text-green-400' 
        },
        { 
          icon: '📊', 
          title: 'Validation Metrics', 
          description: 'pLDDT scores, binding affinity, structural stability for every prediction', 
          borderColor: 'border-blue-400', 
          accentColor: 'text-blue-400' 
        },
        { 
          icon: '🔄', 
          title: 'Reproducible Results', 
          description: 'All predictions include run IDs and can be reproduced with version-controlled models (Research Mode)', 
          borderColor: 'border-purple-400', 
          accentColor: 'text-purple-400' 
        }
      ]
    },
    notes: "Show our evidence doctrine principles for structural validation."
  }
];

export default boltzShowcaseSlides;
