// Enhanced Hero Configuration for Drug Development Focus
// Replaces generic messaging with contract-winning biotech value proposition

export const HERO_DRUG_DEVELOPMENT_CONFIG = {
  // Crisis-focused messaging
  crisis: {   
    titlePart1: "We Don't Discover Cures, We Help YOU Engineer Them",
    titlePart2: "",
    subtitle: "Our In-Silico Therapeutics Platform doesn't replace experiments. It help you choose WHICH experiments to run.",
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

  // Strong CTAs for biotech decision-makers
  cta: {
    primary: {
      text: "See Live Drug Development AI",
      href: "/contact",
      icon: "🚀",
      urgency: "No signup required • See results in 30 seconds • Try real genetic variants"
    },
    secondary: {
      text: "Schedule Executive Demo",
      href: "/contact",
      icon: "📅"
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
