import { PresentationConfig } from '@/types/presentation-types';

export const COMPANY_OVERVIEW_PRESENTATION: PresentationConfig = {
  id: 'company-overview',
  title: 'CrisPRO Company Overview',
  description: 'A comprehensive overview of CrisPRO\'s mission, technology, and impact',
  brand: {
    name: 'CrisPRO.ai',
    emoji: '🧬'
  },
  theme: {
    primary: 'blue',
    secondary: 'cyan', 
    accent: 'green'
  },
  navigation: {
    showProgress: true,
    showSlideNumbers: true,
    keyboardEnabled: true
  },
  slides: [
    // Slide 1: Company Title
    {
      id: 'company-title',
      type: 'title',
      title: 'CrisPRO.ai',
      backgroundType: 'gradient',
      gradientColors: ['from-blue-900', 'via-cyan-900', 'to-slate-900'],
      content: {
        mainTitle: 'CrisPRO.ai\nInnovating Cancer Research',
        subtitle: 'AI-Powered Platform for Accelerated Drug Discovery',
        presenter: {
          name: 'Leadership Team',
          title: 'Executive Presentation',
          company: 'CrisPRO.ai 🧬'
        },
        titleGradient: 'from-blue-400 via-cyan-400 to-green-400',
        subtitleGradient: 'from-cyan-400 to-blue-400'
      }
    },

    // Slide 2: Market Problem
    {
      id: 'market-problem',
      type: 'stats',
      title: 'The Cancer Research Crisis',
      subtitle: 'Current cancer research is plagued by inefficiency and high failure rates',
      content: {
        description: 'Traditional cancer research methods are slow, expensive, and often ineffective. We need a paradigm shift.',
        stats: [
          {
            value: '1.9M',
            label: 'New Cancer Cases (2023)',
            color: 'red'
          },
          {
            value: '609K',
            label: 'Cancer Deaths (2023)',
            color: 'red'
          },
          {
            value: '15+',
            label: 'Years Average Drug Development',
            color: 'orange'
          }
        ],
        titleGradient: 'from-red-500 to-orange-400'
      }
    },

    // Slide 3: Our Solution
    {
      id: 'our-solution',
      type: 'features',
      title: 'Our AI-Powered Solution',
      subtitle: 'Revolutionizing cancer research through advanced artificial intelligence',
      content: {
        features: [
          {
            icon: '🧠',
            title: 'Predictive AI Models',
            description: 'Advanced machine learning algorithms predict drug efficacy and safety.',
            color: 'blue'
          },
          {
            icon: '⚡',
            title: 'Rapid Discovery',
            description: 'Accelerate drug discovery from years to months.',
            color: 'cyan'
          },
          {
            icon: '🎯',
            title: 'Precision Targeting',
            description: 'Identify and target specific cancer vulnerabilities.',
            color: 'green'
          }
        ],
        titleGradient: 'from-blue-400 to-cyan-300'
      }
    },

    // Slide 4: Market Opportunity
    {
      id: 'market-opportunity',
      type: 'stats',
      title: 'Massive Market Opportunity',
      subtitle: 'The global oncology market is experiencing unprecedented growth',
      content: {
        description: 'We are positioned to capture significant value in this rapidly expanding market.',
        stats: [
          {
            value: '$248B',
            label: 'Global Oncology Market (2023)',
            color: 'green'
          },
          {
            value: '$465B',
            label: 'Projected Market (2030)',
            color: 'green'
          },
          {
            value: '8.2%',
            label: 'Annual Growth Rate (CAGR)',
            color: 'blue'
          }
        ],
        titleGradient: 'from-green-500 to-blue-400'
      }
    },

    // Slide 5: Competitive Advantage
    {
      id: 'competitive-advantage',
      type: 'problem',
      title: 'Our Competitive Advantage',
      subtitle: 'What sets CrisPRO apart from traditional biotech companies',
      content: {
        description: 'While others focus on trial-and-error approaches, we leverage AI to make data-driven decisions that dramatically increase success rates.',
        highlight: {
          icon: '🚀',
          value: '10x FASTER',
          description: 'discovery timeline compared to traditional methods',
          color: 'cyan'
        },
        titleGradient: 'from-cyan-500 to-blue-400'
      }
    },

    // Slide 6: Call to Action
    {
      id: 'call-to-action',
      type: 'solution',
      title: 'Join the Revolution',
      subtitle: 'Partner with us to transform cancer research',
      content: {
        description: 'Together, we can accelerate the development of life-saving cancer treatments.',
        comparison: {
          traditional: {
            label: 'Traditional Approach',
            value: '15+ YEARS',
            description: 'Slow, expensive, high failure rate',
            color: 'red'
          },
          crispro: {
            label: 'CrisPRO Approach',
            value: '2-3 YEARS',
            description: 'Fast, efficient, data-driven',
            color: 'green'
          }
        },
        titleGradient: 'from-green-400 to-blue-400'
      }
    }
  ]
}; 