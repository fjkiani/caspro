import { PresentationConfig } from '@/types/presentation-types';

export const RUNX1_CONQUEST_PRESENTATION: PresentationConfig = {
  id: 'runx1-conquest',
  title: 'The RUNX1 Conquest',
  description: 'How Our Agentic Platform Solved a Multi-Year Leukemia Grant In Silico',
  brand: {
    name: 'CrisPRO.ai',
    emoji: '🧬'
  },
  theme: {
    primary: 'purple',
    secondary: 'cyan', 
    accent: 'red'
  },
  navigation: {
    showProgress: true,
    showSlideNumbers: true,
    keyboardEnabled: true
  },
  slides: [
    // Slide 1: Title
    {
      id: 'title',
      type: 'title',
      title: 'The RUNX1 Conquest',
      backgroundType: 'gradient',
      gradientColors: ['from-slate-900', 'via-purple-900', 'to-slate-900'],
      content: {
        mainTitle: 'The RUNX1\nConquest',
        subtitle: 'How Our Agentic Platform Solved a Multi-Year Leukemia Grant In Silico',
        presenter: {
          name: 'Fahad Kiani',
          title: 'Commander and Founder',
          company: 'CrisPRO.ai 🧬'
        },
        titleGradient: 'from-purple-400 via-pink-400 to-red-400',
        subtitleGradient: 'from-yellow-400 to-cyan-400'
      }
    },

    // Slide 2: R&D Crisis Stats
    {
      id: 'rd-crisis',
      type: 'stats',
      title: 'The R&D Efficiency Crisis',
      subtitle: 'The current model for drug discovery is defined by high risk and inefficiency.',
      content: {
        description: 'This high-risk, trial-and-error process is unsustainable. Our platform re-architects R&D into a rapid, data-driven, and predictive science.',
        stats: [
          {
            value: '>90%',
            label: 'Clinical Trial Failure Rate',
            color: 'red'
          },
          {
            value: '$2.8B+',
            label: 'Cost Per Approved Drug',
            color: 'red'
          },
          {
            value: '5-10',
            label: 'Years to a Candidate',
            color: 'red'
          }
        ],
        titleGradient: 'from-red-500 to-orange-400'
      }
    },

    // Slide 3: VUS Problem
    {
      id: 'vus-problem',
      type: 'problem',
      title: 'The Clinical Actionability Gap',
      subtitle: 'While others deliver data, we deliver decisions.',
      content: {
        description: 'This creates a critical gap between data and clinical action, causing patient anxiety and delaying care. The Zeta Oracle was built to close this gap.',
        highlight: {
          icon: '⚠️',
          value: '40%',
          description: 'of clinical genetic tests return a "Variant of Uncertain Significance" (VUS)',
          color: 'yellow'
        },
        titleGradient: 'from-yellow-500 to-orange-400'
      }
    },

    // Slide 4: Command Center
    {
      id: 'command-center',
      type: 'features',
      title: 'The AI-Powered R&D Command Center',
      subtitle: 'An integrated platform turning clinical uncertainty into validated therapeutics.',
      content: {
        features: [
          {
            icon: '🧠',
            title: 'The Zeta Oracle (Prediction)',
            description: 'Resolves genetic uncertainty with a definitive, quantitative score.',
            color: 'cyan'
          },
          {
            icon: '🤖',
            title: 'The Zeta Forge (Generation)',
            description: 'Engineers multi-modal therapeutic blueprints from first principles.',
            color: 'purple'
          },
          {
            icon: '🔬',
            title: 'Zeta Boltz (Validation)',
            description: 'Structurally validates therapeutic candidates in silico before wet-lab experiments.',
            color: 'orange'
          }
        ],
        titleGradient: 'from-blue-400 to-cyan-300'
      }
    },

    // Slide 5: Zeta Oracle Demo
    {
      id: 'zeta-oracle',
      type: 'solution',
      title: 'The Zeta Oracle: Predictive Intelligence',
      subtitle: 'Resolving the Billion-Dollar "Variant of Uncertain Significance" Problem',
      content: {
        comparison: {
          traditional: {
            label: 'Traditional Verdict',
            value: 'VUS',
            description: '(Variant of Uncertain Significance)',
            color: 'yellow'
          },
          crispro: {
            label: 'CrisPRO\'s Verdict',
            value: 'PATHOGENIC',
            description: '(Confirmed High-Risk Threat)',
            color: 'red'
          }
        },
        zetaScore: {
          label: 'Zeta Score (Functional Damage)',
          value: '-26,140.8',
          color: 'red'
        },
        titleGradient: 'from-cyan-400 to-sky-300'
      }
    },

    // Slide 6: Generative Advantage
    {
      id: 'generative-advantage',
      type: 'problem',
      title: 'Beyond Analysis: The Generative Advantage',
      subtitle: 'Identifying a target is only the first step. We engineer the solution.',
      content: {
        description: 'This is our most profound advantage. We are the only platform with a **generative engine**. We don\'t just find the target; we engineer the therapeutic to neutralize it.',
        highlight: {
          icon: '🧪',
          value: 'GENERATIVE',
          description: 'Competitors are analysts. They are trapped in the world of observation, identifying problems without the tools to solve them.',
          color: 'purple'
        },
        titleGradient: 'from-purple-500 to-pink-400'
      }
    }
  ]
}; 