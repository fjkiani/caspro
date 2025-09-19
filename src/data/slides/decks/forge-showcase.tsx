// Import existing components - leveraging our branded components
// These components are referenced in the slide content and used by the slide renderer

//================================================================================
// FORGE SHOWCASE DECK - Generative AI Engine
// Leveraging existing components from RUNX1 and site/blocks
//================================================================================

const forgeShowcaseSlides = [
  // SLIDE 1: TITLE - Forge Introduction
  {
    title: "Forge: The Generative AI Engine",
    subtitle: "Engineering Multi-Modal Therapeutic Solutions",
    titleClassName: "from-purple-400 to-pink-300 drop-shadow-2xl leading-none tracking-tight text-6xl md:text-8xl",
    backgroundClass: "bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900",
    content: {
      type: 'title-slide',
      tagline: '🔨 From Target to Therapeutic in Minutes',
      presenter: 'Research Team',
      presenterTitle: 'CrisPRO.ai 🧬'
    },
    notes: "Hero introduction showcasing Forge's core capability of therapeutic generation."
  },

  // SLIDE 2: THE GENERATIVE CHALLENGE - Problem Statement
  {
    title: "The Therapeutic Design Challenge",
    subtitle: "Traditional R&D: Years of trial and error, 90% failure rates",
    titleClassName: "from-red-500 to-orange-400",
    content: {
      type: 'process-steps',
      steps: [
        { 
          icon: '🎯', 
          title: 'Target Identified', 
          description: 'A validated therapeutic target is discovered', 
          borderColor: 'border-yellow-400', 
          accentColor: 'text-yellow-400' 
        },
        { 
          icon: '❓', 
          title: 'Design Uncertainty', 
          description: 'How do we engineer the optimal therapeutic?', 
          borderColor: 'border-orange-400', 
          accentColor: 'text-orange-400' 
        },
        { 
          icon: '⏰', 
          title: 'Time & Cost', 
          description: 'Years of development, millions in costs, high failure rates', 
          borderColor: 'border-red-400', 
          accentColor: 'text-red-400' 
        }
      ]
    },
    notes: "Establish the problem - traditional therapeutic design is slow, expensive, and uncertain."
  },

  // SLIDE 3: FORGE SOLUTION - AI-Powered Generation
  {
    title: "Forge: AI-Powered Therapeutic Generation",
    subtitle: "1M token context window for complete therapeutic portfolios",
    titleClassName: "from-purple-400 to-pink-300",
    content: {
      type: 'custom',
      component: 'ZetaForgeTwoColumn',
      props: {
        left: { 
          title: 'Traditional Design', 
          value: 'Years', 
          subtitle: 'Manual, iterative, uncertain' 
        },
        right: { 
          title: "CrisPRO's Forge", 
          value: 'Minutes', 
          subtitle: 'AI-generated, validated, optimized' 
        },
        advantage: {
          title: 'Our Unfair Advantage:',
          highlight: '1M Token Context',
          description: 'We see the entire genomic neighborhood.'
        }
      }
    },
    notes: "Demonstrate Forge's core capability using the existing ZetaForgeTwoColumn component."
  },

  // SLIDE 4: FORGE ASSETS - Multi-Modal Therapeutics
  {
    title: "Multi-Modal Therapeutic Generation",
    subtitle: "From CRISPR guides to therapeutic proteins - complete portfolios",
    titleClassName: "from-cyan-500 to-blue-400",
    content: {
      type: 'custom',
      siteBlocks: [
        {
          kind: 'forge-assets',
          props: {
            input: "Validated Pathogenic Threat",
            mission: "Engineer Multi-Modal Therapeutics",
            assets: [
              { type: 'crispr', name: 'CRISPR Guides', description: 'Precision gene editing' },
              { type: 'protein', name: 'Therapeutic Proteins', description: 'Optimized binding affinity' },
              { type: 'antibody', name: 'Monoclonal Antibodies', description: 'Targeted immunotherapy' }
            ],
            advantage: {
              title: 'Our Unfair Advantage:',
              highlight: '1M Token Context',
              description: 'We see the entire genomic neighborhood.'
            }
          }
        }
      ]
    },
    notes: "Show Forge's multi-modal therapeutic generation capabilities using the ForgeAssets component."
  },

  // SLIDE 5: GUIDED DESIGN PROCESS - How Forge Works
  {
    title: "Guided Design Process",
    subtitle: "From objectives to validated therapeutics in 5 steps",
    titleClassName: "from-green-500 to-teal-400",
    content: {
      type: 'process-steps',
      steps: [
        { 
          icon: '🎯', 
          title: 'Objectives', 
          description: 'Define peaks/motifs and desired behavior at the locus', 
          borderColor: 'border-emerald-400', 
          accentColor: 'text-emerald-400' 
        },
        { 
          icon: '🧰', 
          title: 'Constraints', 
          description: 'GC range, avoid homopolymers, length, restriction sites', 
          borderColor: 'border-yellow-400', 
          accentColor: 'text-yellow-400' 
        },
        { 
          icon: '⚙️', 
          title: 'Compute', 
          description: 'Beam width + tokens/bp → predictable quality scaling', 
          borderColor: 'border-sky-400', 
          accentColor: 'text-sky-400' 
        },
        { 
          icon: '📈', 
          title: 'Evidence', 
          description: 'AUROC, ensemble agreement, synteny, dinuc KL, structure', 
          borderColor: 'border-violet-400', 
          accentColor: 'text-violet-400' 
        },
        { 
          icon: '✅', 
          title: 'Decision', 
          description: 'Meet thresholds → handoff to Command Center with provenance', 
          borderColor: 'border-green-400', 
          accentColor: 'text-green-400' 
        }
      ]
    },
    notes: "Show Forge's guided design process with quality control at every step."
  },

  // SLIDE 6: DESIGN RESULTS - Quality Metrics
  {
    title: "Design Results: Validated Performance",
    subtitle: "Quality control metrics for every generated therapeutic",
    titleClassName: "from-blue-500 to-purple-400",
    content: {
      type: 'custom',
      siteBlocks: [
        {
          kind: 'design-result',
          props: {
            auroc: 0.957,
            clinVarSamples: 14319,
            brca1AUROC: 0.94,
            spliceAUROC: 0.826,
            metrics: [
              { label: "AUROC", value: "95.7%", description: "ClinVar validation" },
              { label: "Editing Efficiency", value: "87%", description: "CRISPR performance" },
              { label: "Safety Score", value: "98.2%", description: "Therapeutic design" }
            ]
          }
        }
      ]
    },
    notes: "Show Forge's validated performance metrics using the DesignResultSummary component."
  },

  // SLIDE 7: QUALITY CONTROL - QC Badges
  {
    title: "Quality Control: Every Design Validated",
    subtitle: "Comprehensive quality metrics for regulatory compliance",
    titleClassName: "from-teal-500 to-cyan-400",
    content: {
      type: 'custom',
      siteBlocks: [
        {
          kind: 'qc-badges',
          props: {
            badges: [
              { type: 'synteny', value: 0.95, label: 'Synteny', description: 'Genome-layout similarity' },
              { type: 'pfam', value: 0.78, label: 'Pfam Hits', description: 'Functional domain hits' },
              { type: 'dinucleotide', value: 0.12, label: 'Dinucleotide KL', description: 'Naturalness score' },
              { type: 'structure', value: 0.89, label: 'Structural Validation', description: '3D structure plausibility' }
            ]
          }
        }
      ]
    },
    notes: "Show Forge's quality control system using the QCBadges component."
  },

  // SLIDE 8: THERAPEUTIC MODALITIES - Multi-Modal Approach
  {
    title: "Therapeutic Modalities: Complete Arsenal",
    subtitle: "From gene editing to protein therapy - all in one platform",
    titleClassName: "from-indigo-500 to-purple-400",
    content: {
      type: 'process-steps',
      steps: [
        { 
          icon: '✂️', 
          title: 'Gene Editing', 
          description: 'CRISPR guides with optimized specificity and efficiency', 
          borderColor: 'border-red-400', 
          accentColor: 'text-red-400' 
        },
        { 
          icon: '🧬', 
          title: 'Protein Therapy', 
          description: 'Therapeutic proteins with enhanced binding affinity', 
          borderColor: 'border-blue-400', 
          accentColor: 'text-blue-400' 
        },
        { 
          icon: '🎯', 
          title: 'Antibody Therapy', 
          description: 'Monoclonal antibodies for targeted immunotherapy', 
          borderColor: 'border-green-400', 
          accentColor: 'text-green-400' 
        }
      ]
    },
    notes: "Show Forge's multi-modal therapeutic generation capabilities."
  },

  // SLIDE 9: COMPETITIVE ADVANTAGE - Why Forge
  {
    title: "Our Competitive Advantage",
    subtitle: "The only platform with 1M token context for complete therapeutic portfolios",
    titleClassName: "from-yellow-400 to-orange-400",
    content: {
      type: 'process-steps',
      steps: [
        { 
          icon: '🧠', 
          title: '1M Token Context', 
          description: 'Unprecedented genomic analysis capability', 
          borderColor: 'border-cyan-400', 
          accentColor: 'text-cyan-400' 
        },
        { 
          icon: '🔨', 
          title: 'Generative Creation', 
          description: 'Transform R&D from discovery to engineering', 
          borderColor: 'border-purple-400', 
          accentColor: 'text-purple-400' 
        },
        { 
          icon: '🚀', 
          title: 'Predictable Quality', 
          description: 'Quality scaling with compute - know what you get', 
          borderColor: 'border-green-400', 
          accentColor: 'text-green-400' 
        }
      ]
    },
    notes: "Show Forge's unique competitive advantages."
  },

  // SLIDE 10: EVIDENCE DOCTRINE - Transparency & Validation
  {
    title: "Evidence Doctrine: Transparent, Auditable, Reproducible",
    subtitle: "Every generated therapeutic includes complete provenance and validation",
    titleClassName: "from-green-500 to-teal-400",
    content: {
      type: 'process-steps',
      steps: [
        { 
          icon: '🔍', 
          title: 'Transparency First', 
          description: 'Every design includes full provenance, rationale, and audit trail with run IDs', 
          borderColor: 'border-green-400', 
          accentColor: 'text-green-400' 
        },
        { 
          icon: '📊', 
          title: 'Quality Metrics', 
          description: 'Synteny, Pfam hits, dinucleotide KL, structural validation for every design', 
          borderColor: 'border-blue-400', 
          accentColor: 'text-blue-400' 
        },
        { 
          icon: '🔄', 
          title: 'Reproducible Results', 
          description: 'All designs include run IDs and can be reproduced with version-controlled models (Research Mode)', 
          borderColor: 'border-purple-400', 
          accentColor: 'text-purple-400' 
        }
      ]
    },
    notes: "Show our evidence doctrine principles for generated therapeutics."
  }
];

export default forgeShowcaseSlides;
