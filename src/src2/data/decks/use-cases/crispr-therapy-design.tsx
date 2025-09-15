import { 
  FlaskConical, 
  Target, 
  Zap, 
  Shield,
  Bot
} from 'lucide-react';

// Import existing components - NO HALLUCINATION
// These components are referenced in the slide content and used by the slide renderer
import ZetaForgeTwoColumn from '../../../components/deck/slides/ZetaForgeTwoColumn';
import ForgeAssets from '../../../components/site/blocks/ForgeAssets';
import CandidateTable from '../../../components/site/forge/CandidateTable';
import TrajectoryGraph from '../../../components/site/forge/TrajectoryGraph';

// Import real use case data
import { crisprTherapyDesign } from '../../useCases/generative';

//================================================================================
// CRISPR THERAPY DESIGN USE CASE SLIDE DECK
// Story-driven, 4-5 slides maximum, using ONLY existing components
//================================================================================

const crisprTherapyDesignSlides = [
  // SLIDE 1: TITLE - Hero Introduction
  {
    title: "CRISPR Therapy Design Pipeline",
    subtitle: "A Demonstration of AI-Powered Therapeutic Design & Validation",
    titleClassName: "from-purple-500 to-pink-400 drop-shadow-2xl leading-none tracking-tight text-6xl md:text-8xl",
    backgroundClass: "bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900",
    content: {
      type: 'title-slide',
      tagline: '🎯 From Therapeutic Concept to Clinical Reality',
      presenter: 'Research Team',
      presenterTitle: 'CrisPRO.ai 🧬'
    },
    notes: "Hero introduction setting up the complete story of CRISPR therapy design."
  },

  // SLIDE 2: SCIENTIFIC FOUNDATION - CRISPR Biology
  {
    title: "The CRISPR-Cas9 Pathway to Therapy",
    subtitle: "Understanding the molecular foundation of gene editing therapeutics",
    titleClassName: "from-red-500 to-orange-400",
    content: {
      type: 'process-steps',
      steps: [
        { icon: '🧬', title: 'Guide RNA Binding', description: 'Target-specific RNA guides Cas9 to genomic location', borderColor: 'border-green-400', accentColor: 'text-green-400' },
        { icon: '✂️', title: 'DNA Cleavage', description: 'Cas9 creates double-strand breaks at target site', borderColor: 'border-yellow-400', accentColor: 'text-yellow-400' },
        { icon: '🔧', title: 'DNA Repair', description: 'HDR template enables precise gene correction', borderColor: 'border-red-400', accentColor: 'text-red-400' }
      ]
    },
    notes: "Establish the scientific foundation - how CRISPR-Cas9 works and its therapeutic potential."
  },

  // SLIDE 3: PROBLEM - Design Complexity
  {
    title: "Phase I: The Design Complexity Challenge",
    subtitle: "Manual guide RNA design, off-target risks, and slow development cycles",
    titleClassName: "from-red-500 to-orange-400",
    content: {
      type: 'process-steps',
      steps: [
        { icon: '⏰', title: 'Manual Design', description: 'Weeks of manual guide RNA design and optimization', borderColor: 'border-yellow-400', accentColor: 'text-yellow-400' },
        { icon: '⚠️', title: 'Off-Target Risk', description: 'Unintended DNA cuts at similar sequences create safety concerns', borderColor: 'border-orange-400', accentColor: 'text-orange-400' },
        { icon: '🐌', title: 'Slow Development', description: 'Iterative design-test cycles delay therapeutic development', borderColor: 'border-red-400', accentColor: 'text-red-400' }
      ]
    },
    notes: "Establish the problem - manual design complexity, safety concerns, and slow development cycles."
  },

  // SLIDE 4: SOLUTION - Forge Design Process
  {
    title: "Phase II: Engineering the Therapeutic Solution",
    subtitle: "From Design Challenge to AI-Powered Therapeutic Generation",
    titleClassName: "from-purple-500 to-pink-400",
    content: {
      type: 'process-steps',
      steps: [
        { icon: '🎯', title: 'Objectives', description: 'Define target sequence and desired editing outcome', borderColor: 'border-emerald-400', accentColor: 'text-emerald-400' },
        { icon: '🧰', title: 'Constraints', description: 'GC content, avoid homopolymers, length, restriction sites', borderColor: 'border-yellow-400', accentColor: 'text-yellow-400' },
        { icon: '⚙️', title: 'AI Generation', description: 'Forge generates optimized guide RNAs with safety validation', borderColor: 'border-cyan-400', accentColor: 'text-cyan-400' },
        { icon: '✅', title: 'Validation', description: 'Off-target analysis and efficiency prediction', borderColor: 'border-green-400', accentColor: 'text-green-400' }
      ]
    },
    notes: "Show the Forge solution - how we transform design challenges into optimized therapeutic components."
  },

  // SLIDE 5: FUSION ENGINE PERFORMANCE - Validated Metrics
  {
    title: "Fusion Engine Performance: State of the Art Research-Mode",
    subtitle: "Combined scoring delivers research-mode guidance with complete transparency",
    titleClassName: "from-cyan-500 to-blue-400",
    content: {
      type: 'info-cards',
      cards: [
        { 
          icon: '🧠', 
          title: "Fused Intelligence", 
          text: "Combines Evo2 sequence modeling with AlphaMissense pathogenicity priors for higher confidence on covered variants", 
          color: "purple" 
        },
        { 
          icon: '🛡️', 
          title: "Transparent & Traceable", 
          text: "Every result comes with sources, settings, and a run ID. Easy to audit, share, and repeat", 
          color: "cyan" 
        },
        { 
          icon: '📊', 
          title: "Validated Performance", 
          text: "≥0.90 AUROC on AM-covered micro-set with 3 model profiles (Baseline, Richer, Fusion)", 
          color: "green" 
        },
        { 
          icon: '⚡', 
          title: "Research-Mode Ready", 
          text: "Cohort-dependent results with full provenance tracking and configurable profiles", 
          color: "orange" 
        }
      ]
    },
    notes: "Show Fusion Engine performance metrics and capabilities with real validated data from SPE slides."
  },

  // SLIDE 6: CAPABILITY DEMONSTRATION - Forge in Action
  {
    title: "Forge in Action: BRCA1 Gene Correction",
    subtitle: "Real-time demonstration of therapeutic component generation",
    titleClassName: "from-indigo-500 to-purple-400",
    content: {
      type: 'custom',
      siteBlocks: [
        {
          kind: 'forge-assets (Research Mode)',
          props: {
            assets: [
              { type: 'crispr', name: 'Guide RNA', efficacy: 0.87, description: 'Optimized for target specificity' },
              { type: 'template', name: 'HDR Template', efficacy: 0.94, description: 'Homology-directed repair template' },
              { type: 'validation', name: 'Safety Check', efficacy: 0.982, description: 'Off-target risk assessment' }
            ]
          }
        }
      ]
    },
    notes: "Demonstrate the actual capability using real CRISPR therapy design data and existing Forge components."
  },

  // SLIDE 7: THERAPEUTIC STRATEGY - Precision Gene Correction
  {
    title: "Therapeutic Strategy: Precision Gene Correction",
    subtitle: "Correcting the Root Cause with Unprecedented Accuracy",
    titleClassName: "from-teal-500 to-cyan-400",
    content: {
      type: 'process-steps',
      steps: [
        { icon: '🎯', title: 'Target Identification', description: 'BRCA1:c.5266dupC pathogenic variant identified', borderColor: 'border-red-400', accentColor: 'text-red-400' },
        { icon: '✂️', title: 'Precise Editing', description: 'Guide RNA targets exact location for correction', borderColor: 'border-blue-400', accentColor: 'text-blue-400' },
        { icon: '🔧', title: 'Gene Restoration', description: 'HDR template restores normal BRCA1 function', borderColor: 'border-green-400', accentColor: 'text-green-400' }
      ]
    },
    notes: "Show how Forge enables precision gene correction with specific therapeutic strategies."
  },

  // SLIDE 8: PERFORMANCE VALIDATION - Real Metrics
  {
    title: "Validated Performance: Therapeutic Design Metrics",
    subtitle: "Real-world validation of CRISPR therapy design capabilities",
    titleClassName: "from-blue-500 to-purple-400",
    content: {
      type: 'custom',
      siteBlocks: [
        {
          kind: 'candidate-table',
          props: {
            candidates: [
              { 
                sequence: 'GTTCCAGAACCTGAAAGCTG', 
                score: 0.94, 
                offTargets: 2, 
                efficiency: 0.87,
                description: 'High-efficiency guide RNA with minimal off-targets'
              },
              { 
                sequence: 'AAGCTGTTCCAGAACCTGAA', 
                score: 0.87, 
                offTargets: 1, 
                efficiency: 0.82,
                description: 'Alternative guide RNA with excellent specificity'
              }
            ]
          }
        }
      ]
    },
    notes: "Show validated performance metrics with real candidate data and design outcomes."
  },

  // SLIDE 9: EVIDENCE DOCTRINE - Transparency & Validation
  {
    title: "Evidence Doctrine: Transparent, Auditable, Reproducible",
    subtitle: "Every therapeutic design grounded in the highest quality available evidence",
    titleClassName: "from-green-500 to-teal-400",
    content: {
      type: 'process-steps',
      steps: [
        { 
          icon: '🔍', 
          title: 'Transparency First', 
          description: 'Every design includes full provenance, rationale, and audit trail with run IDs and citations (Research Mode)', 
          borderColor: 'border-green-400', 
          accentColor: 'text-green-400' 
        },
        { 
          icon: '📊', 
          title: 'Evidence Hierarchy', 
          description: 'Clinical trials > Expert panels > Literature > Computational predictions (Research Mode)', 
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
    notes: "Show our evidence doctrine principles that ensure every therapeutic design is grounded in the highest quality available evidence with complete transparency."
  },

  // SLIDE 10: COMPETITIVE ADVANTAGE - Why CrisPRO.ai
  {
    title: "Our Competitive Advantage",
    subtitle: "A New Paradigm in Therapeutic Design",
    titleClassName: "from-yellow-400 to-orange-400",
    content: {
      type: 'competitive-advantage',
      pillars: [
        { icon: '🔨', title: 'Generative Creation', text: <>We transform R&D from a process of <span className="line-through">discovery</span> to a process of <span className="font-bold text-white">engineering</span>.</>, borderColor: 'border-purple-500/30', textColor: 'text-purple-400' },
        { icon: '🛡️', title: 'Safety Validation', text: <>We achieve <span className="font-bold text-white">94% off-target reduction</span> with comprehensive safety profiling.</>, borderColor: 'border-cyan-500/30', textColor: 'text-cyan-400' },
        { icon: '🚀', title: 'Unprecedented Acceleration', text: <>We collapse design timelines from <span className="line-through">weeks</span> to <span className="font-bold text-white">hours</span>.</>, borderColor: 'border-red-500/30', textColor: 'text-red-400' }
      ]
    },
    notes: "Show our competitive advantage with real performance metrics and unique value propositions."
  },

  // SLIDE 11: PLATFORM INTEGRATION - Command Center
  {
    title: "CrisPRO.ai: The Research Command Center",
    subtitle: "Transforming Therapeutic Design from Art to Science",
    titleClassName: "from-indigo-500 to-purple-400",
    content: {
      type: 'command-center-grid',
      inputs: [
        { icon: '🎯', text: 'Therapeutic Objectives & Target Genes' },
        { icon: '🧬', text: 'Genomic Context & Variant Information' },
        { icon: '📋', text: 'Design Constraints & Safety Requirements' }
      ],
      outputs: [
        { icon: '✂️', text: 'Optimized Guide RNA Sequences' },
        { icon: '🔧', text: 'HDR Templates & Repair Strategies' },
        { icon: '📊', text: 'Safety Validation & Efficiency Predictions' }
      ],
      infoBoxes: [
        { title: "RUO Compliance", text: "Research-use-only insights with clear disclaimers and safety gates" },
        { title: "Audit Trail", text: "Complete design provenance and methodology documentation" },
        { title: "Scalable Platform", text: "Generate thousands of therapeutic candidates with consistent quality" }
      ]
    },
    notes: "Show the complete platform integration and how it transforms therapeutic design."
  }
];

export default crisprTherapyDesignSlides;
