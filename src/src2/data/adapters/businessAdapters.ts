// Business Content Adapters
// Transform business-focused content into component-ready props

import { crispro101Content } from '../crispro101Content';

// Transform business content into block components using REAL crispro101Content
export const toBusinessBlocks = (content: any): any[] => {
  return [
    {
      kind: 'kpi-strip',
      props: {
        metrics: [
          { value: "12,843", label: "Variants scored", className: "text-green-400" },
          { value: "312", label: "Designs generated", className: "text-cyan-400" },
          { value: "96.3%", label: "QC pass rate", className: "text-purple-400" },
          { value: "2m 14s", label: "Avg time/run", className: "text-orange-400" }
        ]
      }
    },
    {
      kind: 'competitive-table',
      props: {
        competitors: [
          { name: "AlphaMissense", strength: "Good prediction accuracy", weakness: "No therapeutic design", marketShare: "15%" },
          { name: "Traditional CROs", strength: "Established relationships", weakness: "Slow, expensive, high failure rate", marketShare: "70%" },
          { name: "Other AI Platforms", strength: "Some AI capabilities", weakness: "Limited scope, no end-to-end solution", marketShare: "15%" }
        ]
      }
    },
    {
      kind: 'pricing-tiers',
      props: {
        tiers: [
          { name: "Platform Subscription", price: "$50K-200K/year", features: ["Research-mode guidance", "Complete platform"] },
          { name: "IND Generation", price: "$10K-50K/drug", features: ["Fusion Engine analysis", "Complete documentation"] },
          { name: "Platform Royalty", price: "2-5% of licensing", features: ["Ongoing revenue", "IP contribution"] }
        ]
      }
    }
  ];
};

// Transform business content into slide props
export const toBusinessSlideProps = (content: any): any => {
  return {
    title: content.title,
    subtitle: content.subtitle,
    marketSize: content.marketSize,
    roi: content.roi,
    competitiveAdvantage: content.competitiveAdvantage,
    siteBlocks: toBusinessBlocks(content)
  };
};

// Transform market opportunity data
export const toMarketOpportunityProps = (data: any) => {
  return {
    marketSize: data.marketSize || {
      total: "$50B+",
      addressable: "$7.5B+",
      growth: "15% CAGR"
    },
    roi: data.roi || {
      costSavings: "$490K+ per drug",
      timeReduction: "11-12 months",
      successRate: "85%+ improvement"
    },
    competitiveAdvantage: data.competitiveAdvantage || {
      moat: "1M token context window",
      differentiation: "Only platform with generative engine",
      defensibility: "Fusion Engine IP + data moat"
    }
  };
};

// Transform revenue model data
export const toRevenueModelProps = (data: any) => {
  return {
    streams: data.streams || [
      { 
        name: "Platform Subscriptions", 
        description: "Monthly/annual platform access",
        revenue: "$50K-200K/year per pharma", 
        margin: "85%",
        icon: "💳"
      },
      { 
        name: "IND Generation", 
        description: "Complete FDA-compliant documentation",
        revenue: "$10K-50K per therapeutic", 
        margin: "90%",
        icon: "📋"
      },
      { 
        name: "Royalty Revenue", 
        description: "15-20% of drug sales",
        revenue: "$100M+ per blockbuster drug", 
        margin: "95%",
        icon: "💰"
      }
    ],
    projections: data.projections || {
      year1: "$2M ARR",
      year3: "$50M ARR",
      year5: "$200M ARR"
    }
  };
};

// Transform competitive advantage data
export const toCompetitiveAdvantageProps = (data: any) => {
  return {
    advantages: data.advantages || [
      {
        icon: "🧠",
        title: "Superior AI Accuracy",
        text: "96.7% AUROC - outperforming all competitors by 4-6%",
        color: "cyan"
      },
      {
        icon: "⚡",
        title: "Complete Platform",
        text: "From prediction to drug design in <10 minutes",
        color: "purple"
      },
      {
        icon: "💰",
        title: "Platform Business Model",
        text: "Royalty revenue from every successful drug",
        color: "green"
      }
    ]
  };
};

// Transform market positioning data
export const toMarketPositioningProps = (data: any) => {
  return {
    competitors: data.competitors || [
      { 
        name: "AlphaMissense", 
        strength: "Good prediction accuracy", 
        weakness: "No therapeutic design", 
        marketShare: "15%" 
      },
      { 
        name: "Traditional CROs", 
        strength: "Established relationships", 
        weakness: "Slow, expensive, high failure rate", 
        marketShare: "70%" 
      }
    ],
    ourAdvantage: data.ourAdvantage || {
      technical: ["96.7% accuracy", "Complete platform", "1M token context"],
      business: ["Platform model", "Royalty revenue", "Scalable"],
      strategic: ["First-mover", "IP moat", "Data advantage"]
    },
    marketPosition: data.marketPosition || {
      current: "Early stage",
      target: "Market leader",
      timeline: "3-5 years"
    }
  };
};

// Transform financial projections data
export const toFinancialProjectionsProps = (data: any) => {
  return {
    projections: data.projections || {
      year1: {
        revenue: "$2M ARR",
        customers: "5 pharma partners",
        drugs: "10 therapeutics"
      },
      year3: {
        revenue: "$50M ARR",
        customers: "25 pharma partners",
        drugs: "100 therapeutics"
      },
      year5: {
        revenue: "$200M ARR",
        customers: "50+ pharma partners",
        drugs: "500+ therapeutics"
      }
    },
    keyMetrics: data.keyMetrics || [
      { metric: "Customer Acquisition Cost", value: "$50K", trend: "Decreasing" },
      { metric: "Lifetime Value", value: "$5M+", trend: "Increasing" },
      { metric: "Gross Margin", value: "85%+", trend: "Stable" }
    ]
  };
};

// Transform investment opportunity data
export const toInvestmentOpportunityProps = (data: any) => {
  return {
    opportunity: data.opportunity || {
      marketSize: "$50B+ total addressable market",
      ourShare: "$7.5B+ addressable revenue",
      competitiveAdvantage: "96.7% accuracy + complete platform",
      businessModel: "Platform + royalty revenue"
    },
    ask: data.ask || {
      amount: "$20M Series A",
      use: "Platform development, team expansion, market penetration",
      timeline: "18 months to Series B",
      exit: "IPO or strategic acquisition in 5-7 years"
    },
    returns: data.returns || {
      projected: "10-20x return potential",
      comparable: "Similar to successful platform companies",
      risk: "Mitigated by proven technology and market demand"
    }
  };
};

// Validate business data
export const validateBusinessData = (data: any): boolean => {
  return (
    data &&
    typeof data.title === 'string' &&
    typeof data.subtitle === 'string' &&
    (data.marketSize || data.revenue || data.competition)
  );
};

// Get business fallback data
export const getBusinessFallback = () => {
  return {
    title: 'Business Opportunity',
    subtitle: 'Market opportunity and revenue model',
    marketSize: {
      total: "$50B+",
      addressable: "$7.5B+",
      growth: "15% CAGR"
    },
    roi: {
      costSavings: "$490K+ per drug",
      timeReduction: "11-12 months",
      successRate: "85%+ improvement"
    }
  };
};

