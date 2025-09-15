// Slide Templates using our Doctrine Patterns
// Reusable slide templates for different audience types

import React from 'react';
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
  DollarSign,
  TrendingUp,
  BarChart3,
  PieChart,
  ArrowUpRight
} from 'lucide-react';

//================================================================================
// SLIDE TEMPLATES USING OUR DOCTRINE PATTERNS
//================================================================================

// Template 1: Hero Slides (All Audiences)
export const createHeroSlide = (config: {
  title: string;
  subtitle: string;
  audience: 'research' | 'business' | 'technical';
  metrics: Array<{ value: string; label: string; className: string }>;
}) => {
  const audienceConfig = {
    research: {
      titleClassName: "from-cyan-400 via-blue-400 to-purple-400",
      backgroundClass: "bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900",
      presenter: 'Research Team',
      presenterTitle: 'CrisPRO.ai 🧬'
    },
    business: {
      titleClassName: "from-green-500 via-teal-400 to-cyan-400",
      backgroundClass: "bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900",
      presenter: 'Business Development',
      presenterTitle: 'CrisPRO.ai 💰'
    },
    technical: {
      titleClassName: "from-blue-500 via-cyan-400 to-teal-300",
      backgroundClass: "bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900",
      presenter: 'Engineering Team',
      presenterTitle: 'CrisPRO.ai ⚙️'
    }
  };

  const config_ = audienceConfig[config.audience];

  return {
    title: config.title,
    subtitle: config.subtitle,
    titleClassName: config_.titleClassName,
    backgroundClass: config_.backgroundClass,
    content: {
      type: 'title',
      useEnhancedLayout: true,
      metrics: config.metrics
    },
    presenter: config_.presenter,
    presenterTitle: config_.presenterTitle,
    notes: `Lead with ${config.audience}-friendly metrics that show our competitive advantage.`
  };
};

// Template 2: Problem-Solution Slides (Business Focus)
export const createProblemSolutionSlide = (config: {
  title: string;
  subtitle: string;
  problem: {
    title: string;
    stats: Array<{ value: string; label: string; className: string }>;
  };
  solution: {
    title: string;
    stats: Array<{ value: string; label: string; className: string }>;
  };
}) => {
  return {
    title: config.title,
    subtitle: config.subtitle,
    titleClassName: "from-red-500 to-orange-400",
    content: {
      type: 'crisis-comparison',
      problem: config.problem,
      solution: config.solution
    },
    notes: "Show the massive cost and time savings that will resonate with investors."
  };
};

// Template 3: Scientific Validation Slides (Research Focus)
export const createScientificValidationSlide = (config: {
  title: string;
  subtitle: string;
  methodology: string;
  results: Array<{
    metric: string;
    value: number;
    confidence: number;
    pValue?: number;
  }>;
  peerReview: {
    status: 'published' | 'submitted' | 'in-review';
    journal?: string;
    doi?: string;
  };
}) => {
  return {
    title: config.title,
    subtitle: config.subtitle,
    titleClassName: "from-green-500 to-teal-400",
    content: {
      type: 'scientific-validation',
      useEnhancedLayout: true,
      methodology: config.methodology,
      results: config.results,
      peerReview: config.peerReview
    },
    notes: "Present scientific validation with peer-reviewed methodology and results."
  };
};

// Template 4: Architecture Slides (Technical Focus)
export const createArchitectureSlide = (config: {
  title: string;
  subtitle: string;
  system: {
    components: Array<{
      name: string;
      technology: string;
      performance: string;
      description: string;
    }>;
    scalability: {
      throughput: string;
      latency: string;
      availability: string;
    };
    security: {
      encryption: string;
      access: string;
      compliance: string;
    };
  };
}) => {
  return {
    title: config.title,
    subtitle: config.subtitle,
    titleClassName: "from-cyan-500 to-blue-400",
    content: {
      type: 'architecture-overview',
      useEnhancedLayout: true,
      system: config.system
    },
    notes: "Present technical architecture with performance metrics and security details."
  };
};

// Template 5: Component Showcase Slides (All Audiences)
export const createComponentShowcaseSlide = (config: {
  title: string;
  subtitle: string;
  component: 'ZetaOracleInAction' | 'ZetaForgeTwoColumn' | 'StructuralGauntlet';
  props: any;
  audience: 'research' | 'business' | 'technical';
}) => {
  const audienceConfig = {
    research: {
      titleClassName: "from-cyan-400 to-blue-300",
      backgroundClass: "bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900"
    },
    business: {
      titleClassName: "from-purple-400 to-pink-300",
      backgroundClass: "bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"
    },
    technical: {
      titleClassName: "from-orange-400 to-yellow-300",
      backgroundClass: "bg-gradient-to-br from-slate-900 via-orange-900/20 to-slate-900"
    }
  };

  const config_ = audienceConfig[config.audience];

  return {
    title: config.title,
    subtitle: config.subtitle,
    titleClassName: config_.titleClassName,
    backgroundClass: config_.backgroundClass,
    content: {
      type: 'custom',
      siteBlocks: [],
      render: () => {
        switch (config.component) {
          case 'ZetaOracleInAction':
            return React.createElement('ZetaOracleInAction', config.props);
          case 'ZetaForgeTwoColumn':
            return React.createElement('ZetaForgeTwoColumn', config.props);
          case 'StructuralGauntlet':
            return React.createElement('StructuralGauntlet', config.props);
          default:
            return null;
        }
      }
    },
    notes: `Demonstrate ${config.component} with ${config.audience}-focused messaging.`
  };
};

// Template 6: Process Flow Slides (All Audiences)
export const createProcessFlowSlide = (config: {
  title: string;
  subtitle: string;
  steps: Array<{
    icon: React.ComponentType;
    title: string;
    description: string;
    validation?: string;
  }>;
  audience: 'research' | 'business' | 'technical';
}) => {
  const audienceConfig = {
    research: {
      titleClassName: "from-blue-400 to-cyan-300",
      backgroundClass: "bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900"
    },
    business: {
      titleClassName: "from-purple-500 to-pink-400",
      backgroundClass: "bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"
    },
    technical: {
      titleClassName: "from-orange-500 to-yellow-400",
      backgroundClass: "bg-gradient-to-br from-slate-900 via-orange-900/20 to-slate-900"
    }
  };

  const config_ = audienceConfig[config.audience];

  return {
    title: config.title,
    subtitle: config.subtitle,
    titleClassName: config_.titleClassName,
    backgroundClass: config_.backgroundClass,
    content: {
      type: 'kill-chain',
      useEnhancedLayout: true,
      steps: config.steps
    },
    notes: `Present ${config.audience}-focused process flow with clear validation steps.`
  };
};

// Template 7: Market Opportunity Slides (Business Focus)
export const createMarketOpportunitySlide = (config: {
  title: string;
  subtitle: string;
  marketSize: {
    total: string;
    addressable: string;
    growth: string;
  };
  roi: {
    costSavings: string;
    timeReduction: string;
    successRate: string;
  };
  competitiveAdvantage: {
    moat: string;
    differentiation: string;
    defensibility: string;
  };
}) => {
  return {
    title: config.title,
    subtitle: config.subtitle,
    titleClassName: "from-blue-500 to-cyan-400",
    content: {
      type: 'market-opportunity',
      useEnhancedLayout: true,
      marketSize: config.marketSize,
      roi: config.roi,
      competitiveAdvantage: config.competitiveAdvantage
    },
    notes: "Present market opportunity with clear ROI and competitive advantage."
  };
};

// Template 8: Revenue Model Slides (Business Focus)
export const createRevenueModelSlide = (config: {
  title: string;
  subtitle: string;
  streams: Array<{
    name: string;
    description: string;
    revenue: string;
    margin: string;
    icon: string;
  }>;
  projections: {
    year1: string;
    year3: string;
    year5: string;
  };
}) => {
  return {
    title: config.title,
    subtitle: config.subtitle,
    titleClassName: "from-purple-500 to-pink-400",
    content: {
      type: 'revenue-model',
      useEnhancedLayout: true,
      streams: config.streams,
      projections: config.projections
    },
    notes: "Present revenue model with clear streams and growth projections."
  };
};

// Template 9: Performance Metrics Slides (Technical Focus)
export const createPerformanceMetricsSlide = (config: {
  title: string;
  subtitle: string;
  benchmarks: Array<{
    metric: string;
    value: string;
    comparison: string;
    improvement: string;
  }>;
  scalability: {
    concurrent: string;
    throughput: string;
    latency: string;
  };
  reliability: {
    uptime: string;
    errorRate: string;
    recovery: string;
  };
}) => {
  return {
    title: config.title,
    subtitle: config.subtitle,
    titleClassName: "from-green-500 to-teal-400",
    content: {
      type: 'performance-metrics',
      useEnhancedLayout: true,
      benchmarks: config.benchmarks,
      scalability: config.scalability,
      reliability: config.reliability
    },
    notes: "Present performance metrics with clear benchmarks and scalability data."
  };
};

// Template 10: Research Impact Slides (Research Focus)
export const createResearchImpactSlide = (config: {
  title: string;
  subtitle: string;
  citations: {
    count: number;
    hIndex: number;
    recent: Array<{
      title: string;
      journal: string;
      year: number;
      citations: number;
    }>;
  };
  collaborations: string[];
  funding: Array<{
    source: string;
    amount: string;
    period: string;
  }>;
}) => {
  return {
    title: config.title,
    subtitle: config.subtitle,
    titleClassName: "from-purple-500 to-pink-400",
    content: {
      type: 'research-impact',
      useEnhancedLayout: true,
      citations: config.citations,
      collaborations: config.collaborations,
      funding: config.funding
    },
    notes: "Present research impact with citations, collaborations, and funding."
  };
};

//================================================================================
// TEMPLATE COMPOSITION FUNCTIONS
//================================================================================

// Compose a complete presentation using templates
export const composePresentation = (audience: 'research' | 'business' | 'technical') => {
  const baseSlides = [
    createHeroSlide({
      title: "CrisPRO.ai",
      subtitle: `The AI Platform That's Revolutionizing Drug Discovery`,
      audience,
      metrics: audience === 'research' 
        ? [
            { value: "96.7%", label: "AUROC Performance", className: "text-green-400" },
            { value: "1,247", label: "Variants Validated", className: "text-cyan-400" },
            { value: "5-fold CV", label: "Cross-Validation", className: "text-purple-400" }
          ]
        : audience === 'business'
        ? [
            { value: "$7.5B+", label: "Market Opportunity", className: "text-green-400" },
            { value: "96.7%", label: "Prediction Accuracy", className: "text-cyan-400" },
            { value: "<10 min", label: "Drug Design Time", className: "text-purple-400" }
          ]
        : [
            { value: "99.9%", label: "Uptime SLA", className: "text-green-400" },
            { value: "<100ms", label: "Response Time", className: "text-cyan-400" },
            { value: "1000+", label: "Predictions/Hour", className: "text-purple-400" }
          ]
    })
  ];

  // Add audience-specific slides
  if (audience === 'research') {
    baseSlides.push(
      createScientificValidationSlide({
        title: "Research Results: Independent Validation",
        subtitle: "Peer-reviewed performance on AlphaMissense benchmark (n=1,247 variants)",
        methodology: "Cross-validation on ClinVar-curated dataset with 5-fold CV",
        results: [
          { metric: "AUROC", value: 0.967, confidence: 0.95, pValue: 0.001 },
          { metric: "Sensitivity", value: 0.94, confidence: 0.92 },
          { metric: "Specificity", value: 0.96, confidence: 0.94 }
        ],
        peerReview: {
          status: 'submitted',
          journal: 'Nature Biotechnology'
        }
      })
    );
  } else if (audience === 'business') {
    baseSlides.push(
      createMarketOpportunitySlide({
        title: "The $50 Billion Drug Discovery Market",
        subtitle: "Massive market with 95% failure rate - we fix the efficiency problem",
        marketSize: {
          total: "$50B+",
          addressable: "$7.5B+",
          growth: "15% CAGR"
        },
        roi: {
          costSavings: "$490K+ per drug",
          timeReduction: "11-12 months",
          successRate: "85%+ improvement"
        },
        competitiveAdvantage: {
          moat: "1M token context window",
          differentiation: "Only platform with generative engine",
          defensibility: "Fusion Engine IP + data moat"
        }
      })
    );
  } else if (audience === 'technical') {
    baseSlides.push(
      createArchitectureSlide({
        title: "System Architecture: Microservices & AI Pipeline",
        subtitle: "Scalable, fault-tolerant architecture with AI model orchestration",
        system: {
          components: [
            { 
              name: "Fusion Engine", 
              technology: "Evo2 + AlphaMissense", 
              performance: "96.7% AUROC",
              description: "Multi-model ensemble for variant effect prediction"
            },
            { 
              name: "Forge Engine", 
              technology: "1M token context", 
              performance: "<10 min generation",
              description: "Generative AI for therapeutic design"
            }
          ],
          scalability: {
            throughput: "1000+ predictions/hour",
            latency: "<100ms response time",
            availability: "99.9% uptime SLA"
          },
          security: {
            encryption: "AES-256 encryption at rest and in transit",
            access: "Role-based access control (RBAC)",
            compliance: "SOC 2, HIPAA, GDPR compliant"
          }
        }
      })
    );
  }

  return baseSlides;
};

// Export all templates
export const SLIDE_TEMPLATES = {
  createHeroSlide,
  createProblemSolutionSlide,
  createScientificValidationSlide,
  createArchitectureSlide,
  createComponentShowcaseSlide,
  createProcessFlowSlide,
  createMarketOpportunitySlide,
  createRevenueModelSlide,
  createPerformanceMetricsSlide,
  createResearchImpactSlide,
  composePresentation
};
