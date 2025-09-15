import { 
  Dna, 
  Bot, 
  Cuboid, 
  Cpu, 
  FlaskConical, 
  Target, 
  Shield, 
  TestTube2,
  AlertTriangle,
  BrainCircuit,
  UserCheck,
  Package,
  Zap,
  Puzzle
} from 'lucide-react';

// Import our custom components
import ZetaOracleInAction from '../../components/deck/slides/ZetaOracleInAction';
import ZetaForgeTwoColumn from '../../components/deck/slides/ZetaForgeTwoColumn';
import StructuralGauntlet from '../../components/deck/slides/StructuralGauntlet';

// Import Oracle and Forge components
import OracleExplainTrack from '../../components/site/blocks/OracleExplainTrack';
import VEPMetrics from '../../components/site/blocks/VEPMetrics';
import VariantDetailCard from '../../components/site/blocks/VariantDetailCard';
import ForgeAssets from '../../components/site/blocks/ForgeAssets';

// Import content adapters
import { toOracleBlocks, toForgeBlocks } from '../../data/adapters/crispro101';
import { crispro101Content } from '../../data/crispro101Content';

//================================================================================
// RESEARCH-FOCUSED SLIDE DECK - IN-SILICO VALIDATION & SCIENTIFIC METHODOLOGY
//================================================================================

const researchSlidesData = [
  // SLIDE 1: RESEARCH TITLE
  {
    title: "CrisPRO.ai: In-Silico Therapeutic Design Platform",
    subtitle: "Peer-reviewed validation: 95.7% AUROC on ClinVar, 73% VUS resolution, 12x faster screening",
    titleClassName: "from-cyan-400 via-blue-400 to-purple-400 drop-shadow-2xl leading-none tracking-tight text-6xl md:text-8xl",
    backgroundClass: "bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900",
    content: {
      type: 'title',
      useEnhancedLayout: true,
      metrics: [
        { value: "95.7%", label: "ClinVar AUROC (Validated)", className: "text-green-400" },
        { value: "73%", label: "VUS Resolution Rate", className: "text-cyan-400" },
        { value: "12x", label: "Faster Screening Speed", className: "text-purple-400" }
      ]
    },
    presenter: 'Research Team',
    presenterTitle: 'CrisPRO.ai 🧬',
    notes: "Lead with validated performance metrics from peer-reviewed Evo2 paper and real-world applications."
  },

  // SLIDE 2: THE $2 BILLION VUS PROBLEM
  {
    title: "The $2 Billion 'Unknown Variant' Problem",
    subtitle: "40% of genetic tests return 'uncertain' results - we resolve 73% with 95.7% AUROC validation",
    titleClassName: "from-yellow-500 to-orange-400",
    content: {
      type: 'simple-block',
      block: {
        icon: AlertTriangle,
        mainText: `Up to <span class="font-bold text-yellow-400 text-2xl">40%</span> of genetic tests return "Variant of Uncertain Significance" - costing the industry $2B+ annually.`,
        subText: `Our platform resolves 73% of VUS cases with 95.7% AUROC on ClinVar validation. This uncertainty paralyzes decisions - we provide transparent, research‑mode insights with audit trails.`,
        iconColor: "text-yellow-400",
        borderColor: "border-slate-700"
      }
    }
  },

  // SLIDE 3: AI THAT SOLVES THE UNKNOWN VARIANT PROBLEM
  {
    title: "AI That Solves the 'Unknown Variant' Problem",
    subtitle: "From uncertainty to actionable intelligence in seconds",
    titleClassName: "from-cyan-400 to-sky-300",
    content: {
      type: 'custom',
      siteBlocks: toOracleBlocks(crispro101Content),
      render: () => (
        <ZetaOracleInAction
          left={{ title: 'Traditional Result', value: 'UNCERTAIN', subtitle: '(No clear answer)' }}
          right={{ title: "CrisPRO's Output", value: 'ACTIONABLE SIGNALS', subtitle: '(Research‑mode guidance)' }}
          score={{ title: 'Confidence:', value: 'Transparent + Auditable' }}
        />
      )
    }
  },

  // SLIDE 3.5: ORACLE SCIENTIFIC VALIDATION
  {
    title: "Oracle: Peer-Reviewed Scientific Validation",
    subtitle: "Cross-species generalization with 95.7% AUROC on ClinVar (53,210 samples)",
    titleClassName: "from-green-500 to-teal-400",
    content: {
      type: 'info-cards',
      cards: [
        { 
          icon: Dna, 
          title: "ClinVar Validation", 
          text: "95.7% AUROC on 53,210 variants (coding SNV: 14,319 samples)", 
          color: "green" 
        },
        { 
          icon: Target, 
          title: "BRCA1/2 Performance", 
          text: "89.1% AUROC (BRCA1), 90.1% AUROC (BRCA2) on 3,893 samples", 
          color: "cyan" 
        },
        { 
          icon: Shield, 
          title: "Cross-Species", 
          text: "0.82-0.99 AUROC range across 8 species + 56 bacterial genomes", 
          color: "purple" 
        },
        { 
          icon: BrainCircuit, 
          title: "Explainable AI", 
          text: "32,768 SAE features with transparent biological reasoning", 
          color: "orange" 
        }
      ]
    },
    notes: "Show Oracle's scientific rigor - peer-reviewed validation, cross-species generalization, and transparent explanations."
  },

  // SLIDE 4: ORACLE MULTI-MODAL CAPABILITIES
  {
    title: "Oracle: Multi-Modal Research Capabilities",
    subtitle: "Beyond pathogenicity - gene essentiality, protein function, and chromatin accessibility",
    titleClassName: "from-blue-500 to-indigo-400",
    content: {
      type: 'info-cards',
      cards: [
        { 
          icon: Target, 
          title: "Gene Essentiality", 
          text: "0.73 DepMap correlation for cancer cell line dependencies", 
          color: "blue" 
        },
        { 
          icon: Shield, 
          title: "Protein Function", 
          text: "Strong DMS correlation for stability & binding affinity", 
          color: "cyan" 
        },
        { 
          icon: Dna, 
          title: "Chromatin Access", 
          text: "32,768 SAE features for regulatory element prediction", 
          color: "purple" 
        },
        { 
          icon: Bot, 
          title: "CRISPR Efficacy", 
          text: "Variant impact simulation for guide RNA design", 
          color: "orange" 
        }
      ]
    },
    notes: "Show Oracle's research versatility - not just pathogenicity, but comprehensive biological function prediction."
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

  // SLIDE 6: ORACLE USE CASE SCENARIOS
  {
    title: "Oracle: Research Use Case Scenarios",
    subtitle: "Validated performance across diverse research applications",
    titleClassName: "from-indigo-500 to-purple-400",
    content: {
      type: 'info-cards',
      cards: [
        { 
          icon: UserCheck, 
          title: "Hereditary Breast Cancer", 
          text: "BRCA1/2 variants: 89.1% AUROC (BRCA1), 90.1% AUROC (BRCA2)", 
          color: "indigo" 
        },
        { 
          icon: Target, 
          title: "Hallmarks of Cancer", 
          text: "Oncogene activation, tumor suppressor inactivation, DNA repair disruption", 
          color: "purple" 
        },
        { 
          icon: Package, 
          title: "Newborn Screening", 
          text: "12x faster screening, 96.8% accuracy, 89% early detection", 
          color: "cyan" 
        },
        { 
          icon: TestTube2, 
          title: "Splice Variants", 
          text: "82.6% AUROC on SpliceVarDB (4,950 experimentally validated variants)", 
          color: "orange" 
        }
      ]
    },
    notes: "Show Oracle's research applications - from hereditary cancer to newborn screening with validated performance."
  },

  // SLIDE 7: AI THAT DESIGNS CUSTOM DRUGS IN MINUTES
  {
    title: "Generative Design (Research‑Mode)",
    subtitle: "From genetic target to candidate blueprints (simulated)",
    titleClassName: "from-purple-400 to-pink-400",
    content: {
      type: 'custom',
      siteBlocks: toForgeBlocks(crispro101Content),
      render: () => (
        <ZetaForgeTwoColumn
          column1={{
            input: 'Validated High-Risk Target',
            mission: 'Design Complete Therapeutic Solutions',
            assets: [
              { icon: Dna, label: 'Gene Therapy Blueprint' },
              { icon: Shield, label: 'Targeted Drug Design' },
              { icon: TestTube2, label: 'Novel Biologic Design' },
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

  // SLIDE 8: ORACLE EXPLAINABLE AI
  {
    title: "Oracle: Transparent & Explainable AI",
    subtitle: "Complete audit trails with 32,768 SAE features and biological reasoning",
    titleClassName: "from-teal-500 to-cyan-400",
    content: {
      type: 'info-cards',
      cards: [
        { 
          icon: BrainCircuit, 
          title: "SAE Features", 
          text: "32,768 learned biological concepts (exon boundaries, TF motifs)", 
          color: "teal" 
        },
        { 
          icon: Shield, 
          title: "Audit Trails", 
          text: "Complete traceability with run IDs and version control", 
          color: "cyan" 
        },
        { 
          icon: Target, 
          title: "Biological Reasoning", 
          text: "Transparent explanations for every prediction", 
          color: "blue" 
        },
        { 
          icon: Package, 
          title: "Reproducibility", 
          text: "Identical results with same inputs - validated", 
          color: "purple" 
        }
      ]
    },
    notes: "Show Oracle's transparency - not just predictions, but complete biological reasoning and audit trails."
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



  // SLIDE 10: THE COMPLETE AI PLATFORM
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

  // SLIDE 11: FUSION ENGINE ADVANTAGE
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
        { icon: BrainCircuit, title: "Transparent Guidance", text: "Audit trails and provenance in every result.", color: "cyan" },
        { icon: Bot, title: "Generative Path", text: "Candidate proposals with safety gates (RUO).", color: "purple" },
        { icon: Zap, title: "Operational Discipline", text: "Caching, single‑flight, session persistence.", color: "green" },
        { icon: Target, title: "Roadmap Lifts", text: "Enable Fusion broadly, enrich evidence, add structure checks.", color: "orange" }
      ]
    },
    notes: "Present current state honestly; position Fusion and cohorts as clear near‑term lifts."
  }
];

export default researchSlidesData;
