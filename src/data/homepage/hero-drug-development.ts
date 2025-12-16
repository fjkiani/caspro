// Enhanced Hero Configuration for Drug Development Focus
// Replaces generic messaging with contract-winning biotech value proposition

export const HERO_DRUG_DEVELOPMENT_CONFIG = {
  // Primary Focus Statement
  primaryFocus: {
    badge: "AI-Powered Precision Oncology & Therapeutic Development Platform",
    shortDescription: "Transform drug development from high-risk discovery into deterministic engineering through continuous agentic intelligence.",
    fullDescription: "We enable biotech companies, pharmaceutical researchers, and clinical oncologists to make evidence-backed treatment decisions using validated AI models for variant interpretation, therapeutic design, and real-time patient monitoring."
  },
  
  // Audience indicators
  audiences: [
    {
      id: 'biotech',
      label: 'For Biotech Companies',
      description: 'De-risk R&D pipelines with validated AI',
      icon: '🧬',
      color: 'bg-blue-100 text-blue-700 border-blue-300'
    },
    {
      id: 'pharma',
      label: 'For Pharma Researchers',
      description: 'Accelerate discovery from years to hours',
      icon: '🔬',
      color: 'bg-purple-100 text-purple-700 border-purple-300'
    },
    {
      id: 'oncologists',
      label: 'For Clinical Oncologists',
      description: 'Make evidence-backed treatment decisions',
      icon: '🏥',
      color: 'bg-green-100 text-green-700 border-green-300'
    }
  ],
  
  // Crisis-focused messaging with rotating words
  crisis: {   
    titlePart1: "The Operating System for",
    rotatingWords: ["Zero-Shot Oncology", "Verdict Engineering", "Certainty Oncology", "Mathematical Medicine"],
    titlePart2: "",
    subtitle: "Transform drug development from high-risk discovery into deterministic engineering. Solve the VUS. Design the Cure. Validate in Silico.",
    captivatingSentences: [
      "AI-powered precision oncology platform that transforms drug development into deterministic engineering.",
      "Transform $2.6B drug failures into mathematical certainty through continuous agentic intelligence.",
      "From genetic uncertainty to validated therapeutics in weeks, not decades.",
      "The only AI platform that explains every prediction with biological reasoning.",
      "Stop gambling on discovery. Start engineering cures."
    ],
    problemStats: [
      { 
        value: "90%", 
        label: "Failure Rate", 
        description: "of drugs fail in development",
        color: "text-red-400"
      },
      { 
        value: "$2.6B", 
        label: "Average Cost", 
        description: "per successful drug",
        color: "text-red-400"
      },
      { 
        value: "15 years", 
        label: "Timeline", 
        description: "from discovery to market",
        color: "text-red-400"
      },
      { 
        value: "<5%", 
        label: "Success Rate", 
        description: "of targets become drugs",
        color: "text-red-400"
      }
    ]
  },
  
  // Solution-focused transformation
  solution: {
    titlePart1: "Transform Gambling into",
    titlePart2: "Deterministic Engineering",
    subtitle: "CrisPRO.ai replaces ambiguity with mathematical certainty across the entire drug development lifecycle.",
    transformationMetrics: [
      {
        label: "Target Validation",
        before: "18 months",
        after: "1 week",
        improvement: "72x faster",
        color: "text-cyan-400"
      },
      {
        label: "Cost per Target", 
        before: "$2.5M",
        after: "$3K",
        improvement: "99.8% reduction",
        color: "text-green-400"
      },
      {
        label: "Success Rate",
        before: "15%", 
        after: "90%",
        improvement: "6x improvement",
        color: "text-blue-400"
      },
      {
        label: "False Discovery",
        before: "88%",
        after: "12%", 
        improvement: "7x reduction",
        color: "text-purple-400"
      }
    ]
  },

  // Strong CTAs - Consolidated to 3 buttons
  cta: {
    primary: {
      text: "I am treating patients",
      href: "/products/oncology",
      icon: "🏥",
      urgency: "CrisPRO Oncology - From VUS to Validated Care Plan in Minutes"
    },
    secondary: {
      text: "I am designing a drug",
      href: "/products/r-d",
      icon: "🔬"
    },
    tertiary: {
      text: "I am a patient",
      href: "/products/oncology",
      icon: "👤"
    }
  },

  // Real metrics badges for credibility
  credibilityBadges: [
    { text: "✅ 95.7% ClinVar AUROC", color: "bg-green-100 text-green-700" },
    { text: "🧬 95.0% BRCA AUROC", color: "bg-blue-100 text-blue-700" },
    { text: "⚡ Real-time predictions", color: "bg-purple-100 text-purple-700" },
    { text: "🎯 Zero-shot capability", color: "bg-orange-100 text-orange-700" }
  ],

  // Business-focused messaging for different audiences
  audienceMessages: {
    biotech: "Eliminate the $2.6B gamble. Validate targets with 95% accuracy before wet-lab investment.",
    pharma: "Transform your R&D pipeline with AI that turns drug development from gambling to engineering.",
    clinical: "Resolve 73% of VUS cases instantly. Turn genetic uncertainty into actionable treatment decisions.",
    investors: "Invest in the platform that's transforming a $2.6B failure industry into predictable success."
  }
};

export type HeroDrugDevelopmentConfig = typeof HERO_DRUG_DEVELOPMENT_CONFIG;
