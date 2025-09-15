// Import existing components - leveraging our branded components
// These components are referenced in the slide content and used by the slide renderer

//================================================================================
// BUSINESS SHOWCASE DECK - ROI and Market Opportunity
// Leveraging existing components from site/blocks
//================================================================================

const businessShowcaseSlides = [
  // SLIDE 1: TITLE - Business Introduction
  {
    title: "CrisPRO.ai: Business Opportunity",
    subtitle: "Transforming Therapeutic R&D with AI-Powered Precision",
    titleClassName: "from-green-400 to-blue-300 drop-shadow-2xl leading-none tracking-tight text-6xl md:text-8xl",
    backgroundClass: "bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900",
    content: {
      type: 'title-slide',
      tagline: '💰 From $2.6B to $50K per Drug',
      presenter: 'Business Team',
      presenterTitle: 'CrisPRO.ai 🧬'
    },
    notes: "Hero introduction showcasing CrisPRO.ai's business value proposition."
  },

  // SLIDE 2: THE R&D CRISIS - Market Problem
  {
    title: "The R&D Crisis: Unsustainable Economics",
    subtitle: "Traditional therapeutic development is broken",
    titleClassName: "from-red-500 to-orange-400",
    content: {
      type: 'process-steps',
      steps: [
        { 
          icon: '💰', 
          title: '$2.6B Cost', 
          description: 'Average cost to bring a drug to market', 
          borderColor: 'border-red-400', 
          accentColor: 'text-red-400' 
        },
        { 
          icon: '⏰', 
          title: '15 Years', 
          description: 'Average development timeline from discovery to approval', 
          borderColor: 'border-orange-400', 
          accentColor: 'text-orange-400' 
        },
        { 
          icon: '❌', 
          title: '90% Failure', 
          description: 'Drug candidates fail in clinical trials', 
          borderColor: 'border-yellow-400', 
          accentColor: 'text-yellow-400' 
        }
      ]
    },
    notes: "Establish the market problem - traditional R&D is expensive, slow, and uncertain."
  },

  // SLIDE 3: MARKET OPPORTUNITY - Size and Growth
  {
    title: "Market Opportunity: Multi-Billion Dollar Market",
    subtitle: "Precision medicine and AI-driven drug discovery",
    titleClassName: "from-blue-500 to-purple-400",
    content: {
      type: 'custom',
      siteBlocks: [
        {
          kind: 'kpi-strip',
          props: {
            kpis: [
              { label: "Total Market", value: "$50B+", description: "Precision medicine market" },
              { label: "Addressable", value: "$7.5B+", description: "AI-driven drug discovery" },
              { label: "Growth Rate", value: "15% CAGR", description: "Annual growth rate" },
              { label: "Our Share", value: "$1B+", description: "Target market share" }
            ]
          }
        }
      ]
    },
    notes: "Show market opportunity using KPIStrip component."
  },

  // SLIDE 4: BUSINESS TRANSFORMATION - ROI Metrics
  {
    title: "Business Transformation: Proven ROI",
    subtitle: "Real cost savings and time compression",
    titleClassName: "from-green-500 to-teal-400",
    content: {
      type: 'custom',
      siteBlocks: [
        {
          kind: 'business-transformation',
          props: {
            transformations: [
              {
                industry: "Biotech R&D",
                problem: "90% failure rate, $2.6B cost, 15-year timeline",
                solution: "73% VUS resolution, $2.1M savings, 6 months → 2 weeks",
                impact: "18-month runway extension, 36x faster discovery"
              },
              {
                industry: "Clinical Oncology",
                problem: "40% VUS rate, 18-month treatment selection",
                solution: "73% VUS resolution, 6 weeks → 1 day decision time",
                impact: "40% improved response rates, 6 months early resistance prediction"
              },
              {
                industry: "Genetic Testing",
                problem: "40-60% VUS rate, 2-4 week turnaround",
                solution: "VUS reduction to 15%, 24-hour turnaround",
                impact: "20x throughput increase, 97% cost reduction"
              }
            ]
          }
        }
      ]
    },
    notes: "Show business transformation metrics using BusinessTransformation component."
  },

  // SLIDE 5: REVENUE MODEL - Monetization Strategy
  {
    title: "Revenue Model: Multiple Streams",
    subtitle: "Scalable, high-margin business model",
    titleClassName: "from-purple-500 to-pink-400",
    content: {
      type: 'process-steps',
      steps: [
        { 
          icon: '🔬', 
          title: 'Research Licenses', 
          description: 'Annual subscriptions for research institutions and biotechs', 
          borderColor: 'border-cyan-400', 
          accentColor: 'text-cyan-400' 
        },
        { 
          icon: '🏥', 
          title: 'Clinical Partnerships', 
          description: 'Revenue sharing with clinical testing laboratories', 
          borderColor: 'border-blue-400', 
          accentColor: 'text-blue-400' 
        },
        { 
          icon: '🤝', 
          title: 'Strategic Alliances', 
          description: 'Partnerships with pharma and biotech companies', 
          borderColor: 'border-green-400', 
          accentColor: 'text-green-400' 
        }
      ]
    },
    notes: "Show revenue model and monetization strategy."
  },

  // SLIDE 6: COMPETITIVE ADVANTAGE - Market Position
  {
    title: "Competitive Advantage: Market Leadership",
    subtitle: "Unique positioning in AI-driven therapeutic development",
    titleClassName: "from-indigo-500 to-purple-400",
    content: {
      type: 'process-steps',
      steps: [
        { 
          icon: '🧠', 
          title: 'Technical Moat', 
          description: '1M token context window, zero-shot capability, cross-species validation', 
          borderColor: 'border-cyan-400', 
          accentColor: 'text-cyan-400' 
        },
        { 
          icon: '🔍', 
          title: 'Data Moat', 
          description: '53,210 validated samples, peer-reviewed benchmarks, clinical partnerships', 
          borderColor: 'border-blue-400', 
          accentColor: 'text-blue-400' 
        },
        { 
          icon: '⚡', 
          title: 'Speed Moat', 
          description: 'Real-time predictions, instant validation, accelerated development', 
          borderColor: 'border-green-400', 
          accentColor: 'text-green-400' 
        }
      ]
    },
    notes: "Show competitive advantages and market positioning."
  },

  // SLIDE 7: CUSTOMER SEGMENTS - Target Markets
  {
    title: "Customer Segments: Diverse Market",
    subtitle: "Multiple high-value customer segments",
    titleClassName: "from-teal-500 to-cyan-400",
    content: {
      type: 'process-steps',
      steps: [
        { 
          icon: '🏢', 
          title: 'Biotech Companies', 
          description: 'Early-stage companies needing accelerated R&D', 
          borderColor: 'border-blue-400', 
          accentColor: 'text-blue-400' 
        },
        { 
          icon: '💊', 
          title: 'Pharma Companies', 
          description: 'Large pharma seeking efficiency and cost reduction', 
          borderColor: 'border-green-400', 
          accentColor: 'text-green-400' 
        },
        { 
          icon: '🏥', 
          title: 'Clinical Labs', 
          description: 'Genetic testing laboratories needing VUS resolution', 
          borderColor: 'border-purple-400', 
          accentColor: 'text-purple-400' 
        }
      ]
    },
    notes: "Show target customer segments and market opportunities."
  },

  // SLIDE 8: FINANCIAL PROJECTIONS - Growth Trajectory
  {
    title: "Financial Projections: Growth Trajectory",
    subtitle: "Scalable revenue model with strong unit economics",
    titleClassName: "from-yellow-400 to-orange-400",
    content: {
      type: 'custom',
      siteBlocks: [
        {
          kind: 'kpi-strip',
          props: {
            kpis: [
              { label: "Year 1", value: "$2M ARR", description: "Early customers and pilots" },
              { label: "Year 3", value: "$25M ARR", description: "Market expansion and partnerships" },
              { label: "Year 5", value: "$100M ARR", description: "Market leadership position" },
              { label: "Gross Margin", value: "85%+", description: "High-margin software business" }
            ]
          }
        }
      ]
    },
    notes: "Show financial projections and growth trajectory using KPIStrip component."
  },

  // SLIDE 9: PARTNERSHIP STRATEGY - Go-to-Market
  {
    title: "Partnership Strategy: Accelerated Growth",
    subtitle: "Strategic alliances for market penetration",
    titleClassName: "from-pink-500 to-purple-400",
    content: {
      type: 'process-steps',
      steps: [
        { 
          icon: '🤝', 
          title: 'Pharma Partnerships', 
          description: 'Strategic alliances with top 10 pharma companies', 
          borderColor: 'border-blue-400', 
          accentColor: 'text-blue-400' 
        },
        { 
          icon: '🏥', 
          title: 'Clinical Partnerships', 
          description: 'Integration with major clinical testing laboratories', 
          borderColor: 'border-green-400', 
          accentColor: 'text-green-400' 
        },
        { 
          icon: '🎓', 
          title: 'Academic Partnerships', 
          description: 'Research collaborations with top universities', 
          borderColor: 'border-purple-400', 
          accentColor: 'text-purple-400' 
        }
      ]
    },
    notes: "Show partnership strategy and go-to-market approach."
  },

  // SLIDE 10: INVESTMENT OPPORTUNITY - Why Invest
  {
    title: "Investment Opportunity: Why Invest Now",
    subtitle: "Unique opportunity in AI-driven therapeutic development",
    titleClassName: "from-green-500 to-teal-400",
    content: {
      type: 'process-steps',
      steps: [
        { 
          icon: '📈', 
          title: 'Market Timing', 
          description: 'AI revolution in healthcare, precision medicine growth', 
          borderColor: 'border-green-400', 
          accentColor: 'text-green-400' 
        },
        { 
          icon: '🏆', 
          title: 'Competitive Position', 
          description: 'First-mover advantage, technical moats, validated performance', 
          borderColor: 'border-blue-400', 
          accentColor: 'text-blue-400' 
        },
        { 
          icon: '💰', 
          title: 'Financial Returns', 
          description: 'High-margin business, scalable model, strong unit economics', 
          borderColor: 'border-purple-400', 
          accentColor: 'text-purple-400' 
        }
      ]
    },
    notes: "Show investment opportunity and why invest now."
  }
];

export default businessShowcaseSlides;
