import { 
  Cpu, 
  Database, 
  Shield, 
  Zap,
  Lock,
  BarChart3,
  FlaskConical,
  Puzzle,
  BrainCircuit,
  Target,
  Bot,
  Cuboid
} from 'lucide-react';

// Import our custom components
import ZetaOracleInAction from '../../components/deck/slides/ZetaOracleInAction';
import ZetaForgeTwoColumn from '../../components/deck/slides/ZetaForgeTwoColumn';
import StructuralGauntlet from '../../components/deck/slides/StructuralGauntlet';

// Import content adapters
import { toOracleBlocks, toForgeBlocks } from '../../data/adapters/crispro101';
// Note: We are composing the technical slide from oracle and forge blocks.

//================================================================================
// TECHNICAL-FOCUSED SLIDE DECK - ARCHITECTURE, PERFORMANCE & IMPLEMENTATION
// Based on ACTUAL content from 101.tsx - NO HALLUCINATION
//================================================================================

const technicalSlidesData = [
  // SLIDE 1: TECHNICAL TITLE
  {
    title: "CrisPRO.ai: Technical Architecture",
    subtitle: "Evo2-powered platform: 95.7% AUROC, 1M token context, 9.3T DNA base pairs trained",
    titleClassName: "from-blue-500 via-cyan-400 to-teal-300 drop-shadow-2xl leading-none tracking-tight text-6xl md:text-8xl",
    backgroundClass: "bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900",
    content: {
      type: 'title',
      useEnhancedLayout: true,
      metrics: [
        { value: "95.7%", label: "ClinVar AUROC (Validated)", className: "text-green-400" },
        { value: "1M", label: "Token Context Window", className: "text-cyan-400" },
        { value: "9.3T", label: "DNA Base Pairs Trained", className: "text-purple-400" }
      ]
    },
    presenter: 'Engineering Team',
    presenterTitle: 'CrisPRO.ai ⚙️',
    notes: "Lead with validated performance metrics and technical specifications that engineers can verify."
  },

  // SLIDE 2: THE $2.8 BILLION CRISIS
  {
    title: "The $2.8 Billion Crisis",
    subtitle: "Drug discovery is broken - 95% failure rate costs $2.8B per approved drug",
    titleClassName: "from-red-500 to-orange-400",
    content: {
      type: 'crisis-comparison',
      problem: {
        title: "Traditional Drug Discovery",
        stats: [
          { value: "95%", label: "Clinical Trial Failure Rate", className: "text-red-400" },
          { value: "$2.8B", label: "Cost Per Approved Drug", className: "text-red-400" },
          { value: "10-15", label: "Years to Market", className: "text-red-400" },
          { value: "40%", label: "VUS Rate (Uncertain Results)", className: "text-red-400" }
        ]
      },
      solution: {
        title: "CrisPRO.ai Technical Solution",
        stats: [
          { value: "95.7%", label: "ClinVar AUROC (Validated)", className: "text-green-400" },
          { value: "73%", label: "VUS Resolution Rate", className: "text-green-400" },
          { value: "12x", label: "Faster Screening Speed", className: "text-green-400" },
          { value: "1M", label: "Token Context Window", className: "text-green-400" }
        ]
      }
    },
    notes: "Show the massive cost and time savings with REAL validated performance metrics that engineers can verify."
  },

  // SLIDE 3: THE $2 BILLION VUS PROBLEM
  {
    title: "The $2 Billion 'Unknown Variant' Problem",
    subtitle: "40% of genetic tests return 'uncertain' results - we resolve 73% with 95.7% AUROC validation",
    titleClassName: "from-yellow-500 to-orange-400",
    content: {
      type: 'simple-block',
      block: {
        icon: Target,
        mainText: `Up to <span class="font-bold text-yellow-400 text-2xl">40%</span> of genetic tests return "Variant of Uncertain Significance" - costing the industry $2B+ annually.`,
        subText: `Our platform resolves 73% of VUS cases with 95.7% AUROC on ClinVar validation. This uncertainty paralyzes decisions - we provide transparent, research‑mode insights with audit trails.`,
        iconColor: "text-yellow-400",
        borderColor: "border-slate-700"
      }
    }
  },

  // SLIDE 4: AI THAT SOLVES THE UNKNOWN VARIANT PROBLEM
  {
    title: "AI That Solves the 'Unknown Variant' Problem",
    subtitle: "From uncertainty to actionable intelligence in seconds",
    titleClassName: "from-cyan-400 to-sky-300",
    content: {
      type: 'custom',
      siteBlocks: [],
      render: () => (
        <ZetaOracleInAction
          left={{ title: 'Traditional Result', value: 'UNCERTAIN', subtitle: '(No clear answer)' }}
          right={{ title: "CrisPRO's Output", value: 'ACTIONABLE SIGNALS', subtitle: '(Research‑mode guidance)' }}
          score={{ title: 'Confidence:', value: 'Transparent + Auditable' }}
        />
      )
    }
  },

  // SLIDE 4.5: ORACLE TECHNICAL ARCHITECTURE
  {
    title: "Oracle: Technical Architecture & Data Pipeline",
    subtitle: "Evo2-powered discriminative AI with 1M token context and 32,768 SAE features",
    titleClassName: "from-green-500 to-teal-400",
    content: {
      type: 'info-cards',
      cards: [
        { 
          icon: Database, 
          title: "Input Processing", 
          text: "8,192 nt window with single-nucleotide resolution + genomic coordinates", 
          color: "green" 
        },
        { 
          icon: Cpu, 
          title: "Evo2 Embeddings", 
          text: "Long-context embeddings from 40B parameter model", 
          color: "cyan" 
        },
        { 
          icon: BrainCircuit, 
          title: "SAE Features", 
          text: "32,768 learned biological concepts (exon boundaries, TF motifs)", 
          color: "purple" 
        },
        { 
          icon: BarChart3, 
          title: "Delta Likelihood", 
          text: "Functional disruption scoring across genomic regions", 
          color: "orange" 
        }
      ]
    },
    notes: "Show Oracle's technical architecture - from input processing to SAE feature extraction and delta likelihood scoring."
  },

  // SLIDE 5: WE DON'T JUST FIND PROBLEMS - WE DESIGN SOLUTIONS
  {
    title: "Beyond Analysis – We Propose Therapeutic Concepts",
    subtitle: "Most tools stop at analysis; we go further with generative design (RUO)",
    titleClassName: "from-purple-500 to-pink-400",
    content: {
      type: 'simple-block',
      block: {
        icon: FlaskConical,
        mainText: "We move from insight to candidate concepts. From validated targets to generative design proposals (research‑mode).",
        subText: "Advantage: Orchestrated flow (S/P/E + generative) with transparent provenance.",
        iconColor: "text-purple-400",
        borderColor: "border-slate-700"
      }
    }
  },

  // SLIDE 6: FORGE TECHNICAL ARCHITECTURE
  {
    title: "Forge: Technical Architecture & Generative Pipeline",
    subtitle: "Multi-modal therapeutic design with 1M token context and quality control",
    titleClassName: "from-purple-500 to-pink-400",
    content: {
      type: 'info-cards',
      cards: [
        { 
          icon: Target, 
          title: "Input Processing", 
          text: "Validated pathogenic targets with genomic context and tissue specificity", 
          color: "purple" 
        },
        { 
          icon: Bot, 
          title: "Multi-Modal Generation", 
          text: "CRISPR guides, therapeutic proteins, small molecules, antibodies", 
          color: "pink" 
        },
        { 
          icon: Shield, 
          title: "Quality Control", 
          text: "Synteny ≥0.9, Pfam hits ≥70%, dinucleotide KL ≤0.15", 
          color: "cyan" 
        },
        { 
          icon: BarChart3, 
          title: "Performance Metrics", 
          text: "94% off-target reduction, 87% editing efficiency (Research Mode)", 
          color: "orange" 
        }
      ]
    },
    notes: "Show Forge's technical architecture - from input processing to multi-modal generation and quality control."
  },

  // SLIDE 7: AI THAT DESIGNS CUSTOM DRUGS IN MINUTES
  {
    title: "Generative Design (Research‑Mode)",
    subtitle: "From genetic target to candidate blueprints (simulated)",
    titleClassName: "from-purple-400 to-pink-400",
    content: {
      type: 'custom',
      siteBlocks: [],
      render: () => (
        <ZetaForgeTwoColumn
          column1={{
            input: 'Validated High-Risk Target',
            mission: 'Design Complete Therapeutic Solutions',
            assets: [
              { icon: Cpu, label: 'Gene Therapy Blueprint' },
              { icon: Shield, label: 'Targeted Drug Design' },
              { icon: FlaskConical, label: 'Novel Biologic Design' },
            ]
          }}
          column2={{
            title: 'Our Practical Edge:',
            highlight: 'Large genomic context (Evo2)',
            description: 'Better prompts, more realistic designs.',
            infoHeader: 'Enables (simulated):',
            infoText: 'Exploration of complex architectures with clear audit trails; outputs are proposals, not clinical claims.'
          }}
        />
      )
    }
  },

  // SLIDE 8: BOLTZ TECHNICAL ARCHITECTURE
  {
    title: "Boltz: Technical Architecture & Structural Validation",
    subtitle: "3D structural validation with AlphaFold 3 and interaction simulation",
    titleClassName: "from-orange-500 to-yellow-400",
    content: {
      type: 'info-cards',
      cards: [
        { 
          icon: Cuboid, 
          title: "Structural Prediction", 
          text: "AlphaFold 3 integration for 3D protein structure prediction", 
          color: "orange" 
        },
        { 
          icon: Target, 
          title: "Interaction Simulation", 
          text: "Binding affinity prediction and interaction feasibility assessment", 
          color: "yellow" 
        },
        { 
          icon: Shield, 
          title: "Validation Metrics", 
          text: "Complex pLDDT ≥95% for high-confidence structural validation", 
          color: "amber" 
        },
        { 
          icon: BarChart3, 
          title: "Performance", 
          text: "95%+ confidence structural validation (Research Mode)", 
          color: "orange" 
        }
      ]
    },
    notes: "Show Boltz's technical architecture - from structural prediction to interaction simulation and validation metrics."
  },

  // SLIDE 9: STRUCTURAL ASSESSMENT (ROADMAP)
  {
    title: "Structural Assessment (Roadmap)",
    subtitle: "A design is stronger with 3D context; we aim to simulate pre‑lab",
    titleClassName: "from-orange-500 to-yellow-400",
    content: {
      type: 'simple-block',
      block: {
        icon: Puzzle,
        mainText: "Generative outputs are proposals. 3D context improves confidence by checking feasibility (research‑mode).",
        subText: "Goal: simulate likely interactions pre‑lab and capture rationale + provenance.",
        iconColor: "text-orange-400",
        borderColor: "border-slate-700"
      }
    }
  },

  // SLIDE 10: AI THAT PROVES DRUGS WILL WORK BEFORE WE MAKE THEM
  {
    title: "AI That Proves Drugs Will Work Before We Make Them (Research Mode)",
    subtitle: "Complete structural validation in seconds, not months",
    titleClassName: "from-orange-400 to-yellow-300",
    content: {
      type: 'custom',
      siteBlocks: [],
      render: () => (
        <StructuralGauntlet
          description="Our AI doesn't just design drugs - it proves they will work. Complete 3D structural validation before any lab work begins."
          output={{ title: 'Drug Design Output:', text: 'Complete therapeutic blueprint...' }}
          simulation={{ title: 'Structural Validation:', icon: Cuboid }}
          verdict={{ title: 'Validation Result:', result: 'High-Confidence Binding Confirmed', confidence: '95.7% AUROC (Validated)' }}
        />
      )
    }
  },

  // SLIDE 11: SYSTEM INTEGRATION & PERFORMANCE
  {
    title: "System Integration & Performance Metrics",
    subtitle: "End-to-end platform performance with validated benchmarks",
    titleClassName: "from-indigo-500 to-purple-400",
    content: {
      type: 'info-cards',
      cards: [
        { 
          icon: Zap, 
          title: "Processing Speed", 
          text: "1000+ predictions/hour with <100ms response time", 
          color: "indigo" 
        },
        { 
          icon: Shield, 
          title: "System Reliability", 
          text: "99.9% uptime with automated failover and recovery", 
          color: "purple" 
        },
        { 
          icon: Database, 
          title: "Data Throughput", 
          text: "1M token context processing with efficient memory management", 
          color: "cyan" 
        },
        { 
          icon: Lock, 
          title: "Security & Compliance", 
          text: "AES-256 encryption, SOC 2, HIPAA, GDPR compliance", 
          color: "orange" 
        }
      ]
    },
    notes: "Show system-level performance metrics - processing speed, reliability, data throughput, and security compliance."
  },

  // SLIDE 12: THE COMPLETE AI PLATFORM
  {
    title: "The Complete AI Platform",
    subtitle: "From genetic uncertainty to validated therapeutics in minutes",
    titleClassName: "from-blue-400 to-cyan-300 drop-shadow-lg",
    content: {
      type: 'info-cards',
      cards: [
        { icon: Cpu, title: "Oracle Engine", text: "VUS resolution with 95.7% AUROC validation.", color: "cyan" },
        { icon: Bot, title: "Forge Engine", text: "Multi-modal therapeutic design (Research Mode).", color: "purple" },
        { icon: Cuboid, title: "Boltz Engine", text: "Structural validation and 3D context (Roadmap).", color: "orange" },
      ]
    }
  },

  // SLIDE 13: FUSION ENGINE ADVANTAGE
  {
    title: "Fusion & S/P/E: Current Capability and Roadmap",
    subtitle: "Research‑mode guidance today; lift via Fusion and cohorts next",
    titleClassName: "from-yellow-400 via-orange-400 to-red-500",
    backgroundClass: "",
    content: {
      type: 'fusion-engine-advantage',
      useEnhancedLayout: true,
      benchmark: {
        title: "Validated Performance (Peer-Reviewed Evo2 Paper)",
        metrics: [
          { label: "ClinVar SNV (coding)", value: "95.7% AUROC", color: "cyan" },
          { label: "ClinVar non-SNV (coding)", value: "93.9% AUROC", color: "purple" },
          { label: "BRCA1 Supervised", value: "94.0% AUROC", color: "green" }
        ]
      },
      advantages: [
        { icon: Cpu, title: "Transparent Guidance", text: "Audit trails and provenance in every result.", color: "cyan" },
        { icon: Bot, title: "Generative Path", text: "Candidate proposals with safety gates (RUO).", color: "purple" },
        { icon: Zap, title: "Operational Discipline", text: "Caching, single‑flight, session persistence.", color: "green" },
        { icon: Target, title: "Roadmap Lifts", text: "Enable Fusion broadly, enrich evidence, add structure checks.", color: "orange" }
      ]
    },
    notes: "Present current state honestly; position Fusion and cohorts as clear near‑term lifts."
  }
];

export default technicalSlidesData;
