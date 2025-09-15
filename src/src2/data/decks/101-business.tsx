import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  Shield, 
  Zap,
  Users,
  AlertTriangle,
  BrainCircuit,
  Bot,
  FlaskConical
} from 'lucide-react';

// Import our custom components
import KPIStrip from '../../components/site/blocks/KPIStrip';
import CompetitiveTable from '../../components/site/CompetitiveTable';
import PricingTiers from '../../components/site/PricingTiers';
import TrustBadges from '../../components/site/TrustBadges';

// Import Oracle and Forge components
import OracleExplainTrack from '../../components/site/blocks/OracleExplainTrack';
import ForgeAssets from '../../components/site/blocks/ForgeAssets';
import ZetaOracleInAction from '../../components/deck/slides/ZetaOracleInAction';
import ZetaForgeTwoColumn from '../../components/deck/slides/ZetaForgeTwoColumn';

// Import content adapters
import { toOracleBlocks, toForgeBlocks } from '../../data/adapters/crispro101';
import { crispro101Content } from '../../data/crispro101Content';
// Note: We are composing the business slide from oracle and forge blocks.

//================================================================================
// BUSINESS-FOCUSED SLIDE DECK - ROI, MARKET OPPORTUNITY & COMPETITIVE ADVANTAGE
//================================================================================

const businessSlidesData = [
  // SLIDE 1: BUSINESS TITLE
  {
    title: "CrisPRO.ai: The Qualcomm of Drug Discovery",
    subtitle: "$50B+ market opportunity with platform royalty model generating recurring revenue from every approved drug",
    titleClassName: "from-green-500 via-teal-400 to-cyan-400 drop-shadow-2xl leading-none tracking-tight text-6xl md:text-8xl",
    backgroundClass: "bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900",
    content: {
      type: 'title',
      useEnhancedLayout: true,
      metrics: [
        { value: "$50B+", label: "Total Addressable Market", className: "text-green-400" },
        { value: "95.7%", label: "ClinVar AUROC (14,319 samples)", className: "text-cyan-400" },
        { value: "2-5%", label: "Platform Royalty Model", className: "text-purple-400" }
      ]
    },
    presenter: 'Business Development',
    presenterTitle: 'CrisPRO.ai 💰',
    notes: "Lead with massive market size, validated performance, and clear monetization model that investors understand."
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
        title: "CrisPRO.ai Platform Solution",
        stats: [
          { value: "95.7%", label: "ClinVar AUROC (14,319 samples)", className: "text-green-400" },
          { value: "73%", label: "VUS Resolution Rate (Research Mode)", className: "text-green-400" },
          { value: "12x", label: "Faster Screening Speed (Research Mode)", className: "text-green-400" },
          { value: "2-5%", label: "Platform Royalty Model", className: "text-green-400" }
        ]
      }
    },
    notes: "Show the massive cost and time savings with REAL validated performance metrics that investors can verify."
  },

  // SLIDE 3: THE $2 BILLION VUS PROBLEM
  {
    title: "The $2 Billion 'Unknown Variant' Problem",
    subtitle: "40% of genetic tests return 'uncertain' results - we turn uncertainty into certainty with 95.7% AUROC",
    titleClassName: "from-yellow-500 to-orange-400",
    content: {
      type: 'simple-block',
      block: {
        icon: AlertTriangle,
        mainText: `Up to <span class="font-bold text-yellow-400 text-2xl">40%</span> of genetic tests return "Variant of Uncertain Significance" - costing the industry $2B+ annually.`,
        subText: `Our platform resolves 73% of VUS cases with 95.7% AUROC on ClinVar validation (14,319 samples). This uncertainty paralyzes decisions - we provide transparent, research‑mode insights with audit trails.`,
        iconColor: "text-yellow-400",
        borderColor: "border-slate-700"
      }
    }
  },

  // SLIDE 3.5: ORACLE - THE VUS RESOLUTION ENGINE
  {
    title: "Oracle: The VUS Resolution Engine",
    subtitle: "Transform genetic uncertainty into actionable business intelligence",
    titleClassName: "from-cyan-400 to-blue-400",
    content: {
      type: 'custom',
      siteBlocks: toOracleBlocks(crispro101Content),
      render: () => (
        <ZetaOracleInAction
          left={{ title: 'Traditional Result', value: 'VUS', subtitle: '(Uncertain)' }}
          right={{ title: "Oracle's Output", value: 'PATHOGENIC', subtitle: '(Actionable)' }}
          score={{ title: 'Zeta Score:', value: '-26,140.8' }}
        />
      )
    },
    notes: "Show Oracle's core capability - transforming VUS into actionable intelligence with validated performance."
  },

  // SLIDE 4: THE QUALCOMM OF PHARMA
  {
    title: "The Qualcomm of Pharma: Platform Royalty Model",
    subtitle: "Recurring revenue from every drug that uses our AI technology",
    titleClassName: "from-purple-500 to-pink-400",
    backgroundClass: 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900',
    content: {
      type: 'qualcomm-comparison',
      useEnhancedLayout: true,
      comparison: {
        qualcomm: {
          title: "Qualcomm's Model",
          icon: "📱",
          revenue: "$8.6B annual revenue",
          elements: [
            "Baseband processor licensing",
            "Royalty: 5% of device price",
            "Every smartphone pays Qualcomm",
            "Continuous tech evolution"
          ]
        },
        crispro: {
          title: "CrisPRO.ai Model",
          icon: "🧬",
          revenue: "Platform royalty + IP co‑invention",
          elements: [
            "AI therapeutic design licensing",
            "Platform royalty: 2–5% of licensing",
            "Every approved drug pays us",
            "Continuous AI model improvement"
          ]
        }
      },
      revenueStreams: {
        title: "Multiple Revenue Streams",
        streams: [
          {
            name: "IND Generation",
            description: "One-time fee per drug program (95.7% AUROC ClinVar validation, 14,319 samples)",
            potential: "$10K-50K per drug",
            icon: "📋"
          },
          {
            name: "Platform Subscription",
            description: "Monthly/annual platform access (research‑mode guidance)",
            potential: "$50K-200K per year",
            icon: "💳"
          },
          {
            name: "Platform Royalty",
            description: "2–5% of licensing revenue when platform contributes materially",
            potential: "Recurring annuity per licensed asset",
            icon: "💰"
          },
          {
            name: "Co‑Inventor/IP Monetization",
            description: "10–30% patent ownership (case‑dependent) and licensing",
            potential: "$50M+ per therapeutic",
            icon: "🎯"
          }
        ]
      }
    },
    notes: "This is the most important slide for investors. Show the massive revenue potential and how our platform creates ongoing value unlike traditional biotech companies."
  },

  // SLIDE 5: FORGE - THE THERAPEUTIC DESIGN ENGINE
  {
    title: "Forge: The Therapeutic Design Engine",
    subtitle: "From validated targets to complete therapeutic solutions in minutes",
    titleClassName: "from-purple-500 to-pink-400",
    content: {
      type: 'custom',
      siteBlocks: toForgeBlocks(crispro101Content),
      render: () => (
        <ZetaForgeTwoColumn
          column1={{
            input: 'Validated Pathogenic Target',
            mission: 'Engineer Multi-Modal Therapeutics',
            assets: [
              { icon: Bot, label: 'CRISPR Guide Design' },
              { icon: Shield, label: 'Therapeutic Proteins' },
              { icon: FlaskConical, label: 'Small Molecules' }
            ]
          }}
          column2={{
            title: 'Our Unfair Advantage:',
            highlight: '1M Token Context',
            description: 'We see the entire genomic neighborhood.',
            infoHeader: 'Research Mode Capabilities:',
            infoText: 'Complete therapeutic portfolios with predictable quality scaling and transparent design processes.'
          }}
        />
      )
    },
    notes: "Show Forge's core capability - generating complete therapeutic solutions from validated targets."
  },

  // SLIDE 5.5: ORACLE BUSINESS IMPACT
  {
    title: "Oracle: Business Impact & ROI",
    subtitle: "Transform genetic uncertainty into predictable revenue streams",
    titleClassName: "from-green-500 to-teal-400",
    content: {
      type: 'info-cards',
      cards: [
        { 
          icon: DollarSign, 
          title: "Cost Reduction", 
          text: "$2.1M savings per program through VUS resolution (73% rate)", 
          color: "green" 
        },
        { 
          icon: TrendingUp, 
          title: "Revenue Acceleration", 
          text: "6 months → 2 weeks to first hit with 95.7% AUROC validation", 
          color: "cyan" 
        },
        { 
          icon: Target, 
          title: "Risk Mitigation", 
          text: "40% VUS rate → 15% with transparent audit trails", 
          color: "purple" 
        },
        { 
          icon: Users, 
          title: "Market Expansion", 
          text: "Access to $2B+ VUS market with validated performance", 
          color: "orange" 
        }
      ]
    },
    notes: "Show Oracle's direct business impact - cost savings, revenue acceleration, risk mitigation, and market expansion."
  },

  // SLIDE 7: COMPETITIVE ADVANTAGE
  {
    title: "Fusion & S/P/E: Current Capability and Roadmap",
    subtitle: "Research‑mode guidance today; lift via Fusion and cohorts next",
    titleClassName: "from-yellow-400 via-orange-400 to-red-500",
    backgroundClass: "",
    content: {
      type: 'fusion-engine-advantage',
      useEnhancedLayout: true,
      benchmark: {
        title: "Validated Performance (Peer-Reviewed)",
        metrics: [
          { label: "ClinVar SNV (coding)", value: "95.7% AUROC (14,319 samples)", color: "cyan" },
          { label: "ClinVar non-SNV (coding)", value: "93.9% AUROC (1,236 samples)", color: "purple" },
          { label: "BRCA1 Supervised", value: "94.0% AUROC (3,893 samples)", color: "green" }
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
  },

  // SLIDE 8: BUSINESS OVERVIEW PLATFORM
  {
    title: "CrisPRO.ai: Complete AI Therapeutic Design Platform",
    subtitle: "End-to-end ecosystem transforming drug development from gamble to science",
    titleClassName: "from-purple-500 via-pink-400 to-red-400",
    backgroundClass: 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900',
    content: {
      type: 'business-overview-platform',
      useEnhancedLayout: true,
      platform: {
        title: "The CrisPRO.ai Platform",
        description: "End-to-end AI therapeutic design ecosystem - from genetic insight to clinical candidate",
        capabilities: [
          { icon: "🔬", text: "Research‑mode variant insights (S/P/E + provenance)" },
          { icon: "🧬", text: "Generative proposals (CRISPR, antibodies, small molecules) — RUO" },
          { icon: "📋", text: "Automated IND document scaffolding (research‑mode)" },
          { icon: "💰", text: "IP monetization via co‑invention/royalty doctrine" }
        ]
      },
      valueProposition: {
        title: "Proven Value Proposition",
        metrics: [
          { value: "12x", label: "Faster screening speed (Research Mode)", className: "text-green-400" },
          { value: "73%", label: "VUS resolution rate (Research Mode)", className: "text-cyan-400" },
          { value: "95.7%", label: "ClinVar AUROC (14,319 samples)", className: "text-purple-400" },
          { value: "$50B+", label: "Total addressable market", className: "text-orange-400" }
        ]
      }
    },
    notes: "First business slide: Show what we do and the massive value we deliver to pharma companies."
  },

  // SLIDE 9: BUSINESS OVERVIEW BUSINESS MODEL
  {
    title: "CrisPRO.ai: Revenue Model & Market Opportunity",
    subtitle: "Multi-billion dollar market with proven monetization strategy",
    titleClassName: "from-green-500 via-teal-400 to-cyan-400",
    backgroundClass: 'bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900',
    content: {
      type: 'business-overview-business',
      useEnhancedLayout: true,
      businessModel: {
        title: "Multi-Stream Revenue Model",
        streams: [
          { name: "Platform Subscriptions", revenue: "$50K-200K/year per pharma", icon: "💳" },
          { name: "IND Generation", revenue: "$10K-50K per therapeutic", icon: "📋" },
          { name: "Platform Royalty", revenue: "2–5% of licensing revenue", icon: "💰" },
          { name: "Co‑Inventor Ownership", revenue: "10–30% patent ownership (case‑dependent)", icon: "🧾" },
          { name: "IP Licensing", revenue: "$50M+ per therapeutic", icon: "🎯" }
        ]
      },
      marketOpportunity: {
        title: "Massive Market Opportunity",
        stats: [
          { value: "$50B+", label: "Global Drug Discovery Market" },
          { value: "$8B+", label: "CRISPR Therapeutics (2025)" },
          { value: "40%", label: "VUS Rate (Our Target Market)" },
          { value: "$2.8B", label: "Cost Per Approved Drug" }
        ]
      }
    },
    notes: "Second business slide: Show how we make money and the size of the opportunity."
  }
];

export default businessSlidesData;

