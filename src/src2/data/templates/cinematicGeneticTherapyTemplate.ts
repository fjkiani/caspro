import type { SlideDeck } from '../../types/slides';

export interface CinematicGeneticTherapyConfig {
  gene: string;
  disease: string;
  company: string;
  presenter: string;
  presenterTitle: string;
  targetScore: string;
  futureThreats: Array<{
    gene: string;
    riskScore: string;
    severity: 'high' | 'medium' | 'low';
  }>;
  therapeuticAdvantages: string[];
  competitorLimitations: string[];
  keyMetrics: Array<{
    label: string;
    value: string;
    status: 'good' | 'warning' | 'danger';
  }>;
}

export const createCinematicGeneticTherapyDeck = (config: CinematicGeneticTherapyConfig): SlideDeck => {
  return {
    id: `cinematic-genetic-therapy-${config.gene.toLowerCase()}`,
    title: `The ${config.gene} Conquest: AI-Powered Therapeutic Design`,
    description: `Cinematic presentation: How our Agentic Platform solved a multi-year ${config.disease} research challenge entirely in silico`,
    category: 'research',
    tags: ['AI', 'genetics', config.gene, config.disease, 'cinematic', 'therapeutic design'],
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
    metadata: {
      author: config.presenter,
      template: 'cinematic-genetic-therapy',
      theme: 'futuristic',
      confidentiality: 'internal'
    },
    slides: [
      // Slide 1: Cinematic Title Slide
      {
        id: 'cinematic-title',
        title: `The ${config.gene} Conquest`,
        backgroundStyle: 'animated',
        backgroundConfig: {
          animation: 'dna',
          intensity: 'high'
        },
        content: [
          {
            type: 'cinematic',
            data: {
              type: 'title',
              title: `The ${config.gene} Conquest`,
              backgroundGradient: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
              titleGradient: 'bg-gradient-to-r from-purple-400 via-pink-400 to-red-400',
              content: {
                mainTitle: `The ${config.gene}`,
                subTitle: 'Conquest',
                subTitleGradient: 'bg-gradient-to-r from-cyan-400 to-blue-500',
                description: `How Our Agentic Platform Solved a Multi-Year ${config.disease} Grant In Silico`,
                callout: '🎯 A Demonstration of AI-Powered Therapeutic Design & Validation',
                presenter: config.presenter,
                presenterTitle: config.presenterTitle
              }
            },
            layout: 'full'
          }
        ]
      },

      // Slide 2: Disease Pathway (Cinematic)
      {
        id: 'cinematic-pathway',
        title: 'The Genetic Pathway to Disease',
        backgroundStyle: 'animated',
        backgroundConfig: {
          animation: 'particles',
          intensity: 'medium'
        },
        content: [
          {
            type: 'cinematic',
            data: {
              type: 'pathway',
              title: 'The Genetic Pathway to Disease',
              subtitle: `The Two-Hit Hypothesis: <span class="text-red-400 font-bold">A Model for Disease Progression</span>`,
              backgroundGradient: 'bg-gradient-to-br from-slate-800 via-red-900/20 to-slate-800',
              titleGradient: 'bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400',
              content: {
                steps: [
                  {
                    title: 'Healthy<br/>Cell',
                    description: `Normal ${config.gene}`,
                    bgGradient: 'bg-gradient-to-br from-green-400 to-emerald-600',
                    descBg: 'bg-green-500/20',
                    descBorder: 'border-green-500/30',
                    descColor: 'text-green-300',
                    animation: 'animate-ping',
                    animationBg: 'bg-green-400'
                  },
                  {
                    title: 'First<br/>Hit',
                    description: `Inherited ${config.gene}<br/>Mutation`,
                    bgGradient: 'bg-gradient-to-br from-yellow-400 to-orange-500',
                    descBg: 'bg-yellow-500/20',
                    descBorder: 'border-yellow-500/30',
                    descColor: 'text-yellow-300',
                    badge: {
                      bg: 'bg-red-500',
                      icon: '🧬',
                      animation: 'animate-bounce'
                    }
                  },
                  {
                    title: 'Second<br/>Hit',
                    description: 'Acquired Somatic<br/>Mutation',
                    bgGradient: 'bg-gradient-to-br from-orange-500 to-red-600',
                    descBg: 'bg-orange-500/20',
                    descBorder: 'border-orange-500/30',
                    descColor: 'text-orange-300',
                    badge: {
                      bg: 'bg-white',
                      icon: '💥',
                      animation: 'animate-spin'
                    }
                  },
                  {
                    title: `${config.disease}<br/>Cell`,
                    description: `Full-Blown<br/>${config.disease}`,
                    bgGradient: 'bg-gradient-to-br from-red-600 to-red-900',
                    descBg: 'bg-red-500/20',
                    descBorder: 'border-red-500/30',
                    descColor: 'text-red-300',
                    animation: 'animate-pulse',
                    animationBg: 'bg-red-600'
                  }
                ],
                explanation: `This slide illustrates the 'two-hit' model, a fundamental concept in cancer genetics. It shows how an initial inherited mutation creates a predisposition, which can then progress to full-blown disease after a second, acquired mutation. Our entire approach begins with understanding this pathway.`
              }
            },
            layout: 'full'
          }
        ]
      },

      // Slide 3: VUS Solution (Cinematic)
      {
        id: 'cinematic-vus',
        title: 'Phase I: From Ambiguity to Actionable Insight',
        backgroundStyle: 'animated',
        backgroundConfig: {
          animation: 'network',
          intensity: 'low'
        },
        content: [
          {
            type: 'cinematic',
            data: {
              type: 'vus-solution',
              title: 'Phase I: From Ambiguity to Actionable Insight',
              subtitle: 'Solving the "Variant of Uncertain Significance" (VUS) Crisis',
              backgroundGradient: 'bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900',
              titleGradient: 'bg-gradient-to-r from-purple-400 via-pink-400 to-red-400',
              content: {
                steps: [
                  {
                    type: 'problem',
                    icon: '🧬',
                    title: 'The VUS Problem',
                    titleColor: 'text-yellow-400',
                    description: 'A genetic variant is identified, but its impact is unknown, creating a clinical dead end.'
                  },
                  {
                    type: 'process',
                    icon: '🧠',
                    title: config.company,
                    titleColor: 'text-cyan-400',
                    description: 'Our AI analyzes the variant from first principles, understanding its biological grammar.'
                  },
                  {
                    type: 'solution',
                    score: config.targetScore,
                    title: 'Pathogenic Verdict',
                    titleColor: 'text-red-400',
                    description: 'The Oracle delivers a definitive, quantitative score, providing the certainty to act.'
                  }
                ]
              }
            },
            layout: 'full'
          }
        ]
      },

      // Slide 4: Competitive Advantage (Cinematic)
      {
        id: 'cinematic-competitive',
        title: 'Our Competitive Advantage',
        backgroundStyle: 'animated',
        backgroundConfig: {
          animation: 'waves',
          intensity: 'medium'
        },
        content: [
          {
            type: 'cinematic',
            data: {
              type: 'competitive-grid',
              title: 'Our Competitive Advantage',
              subtitle: 'A New Paradigm in Therapeutic R&D',
              backgroundGradient: 'bg-gradient-to-br from-slate-900 via-yellow-900/20 to-slate-900',
              titleGradient: 'bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500',
              content: {
                pillars: [
                  {
                    icon: '🧠',
                    title: 'Predictive Precision',
                    titleColor: 'text-cyan-400',
                    borderColor: 'border-cyan-500/30',
                    description: '<span class="font-bold text-white">AUROC > 0.95</span> on the most difficult non-coding and splice-site variants.'
                  },
                  {
                    icon: '🔨',
                    title: 'Generative Creation',
                    titleColor: 'text-purple-400',
                    borderColor: 'border-purple-500/30',
                    description: 'We transform R&D from a process of <span class="line-through">discovery</span> to a process of <span class="font-bold text-white">engineering</span>.'
                  },
                  {
                    icon: '🚀',
                    title: 'Unprecedented Acceleration',
                    titleColor: 'text-red-400',
                    borderColor: 'border-red-500/30',
                    description: 'We collapse traditional R&D timelines from <span class="line-through">years</span> to <span class="font-bold text-white">weeks</span>.'
                  }
                ]
              }
            },
            layout: 'full'
          }
        ]
      },

      // Slide 5: Command Center (Cinematic)
      {
        id: 'cinematic-command-center',
        title: `${config.company}: The R&D Command Center`,
        backgroundStyle: 'animated',
        backgroundConfig: {
          animation: 'dna',
          intensity: 'high'
        },
        content: [
          {
            type: 'cinematic',
            data: {
              type: 'command-center',
              title: `${config.company}: The R&D Command Center`,
              subtitle: 'Transforming Therapeutic Development from a Game of Chance into a Deterministic Science',
              backgroundGradient: 'bg-gradient-to-br from-slate-900 via-indigo-900/30 to-slate-900',
              titleGradient: 'bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400',
              content: {
                inputs: [
                  {
                    icon: '🧬',
                    title: 'Genomic Data'
                  },
                  {
                    icon: '❓',
                    title: 'Clinical Uncertainty',
                    subtitle: '(40% VUS Rate)'
                  }
                ],
                outputs: [
                  {
                    icon: '✅',
                    title: 'Validated Therapeutics'
                  },
                  {
                    icon: '🛡️',
                    title: 'De-Risked Pipelines'
                  }
                ],
                platforms: [
                  {
                    title: 'The Zeta Oracle (Prediction)',
                    titleColor: 'text-cyan-400',
                    borderColor: 'border-cyan-500/30',
                    description: 'Our foundational AI that understands the language of biology to annihilate clinical uncertainty.'
                  },
                  {
                    title: 'The Zeta Forge (Generation)',
                    titleColor: 'text-purple-400',
                    borderColor: 'border-purple-500/30',
                    description: 'Our generative AI that forges novel, validated therapeutic candidates entirely in silico.'
                  },
                  {
                    title: 'The Command Center (Orchestration)',
                    titleColor: 'text-sky-400',
                    borderColor: 'border-sky-500/30',
                    description: 'The central nervous system that unifies our arsenal, turning a query into a complete therapeutic battle plan.'
                  }
                ]
              }
            },
            layout: 'full'
          }
        ]
      }
    ]
  };
};

// Enhanced RUNX1 configuration with cinematic styling
export const CINEMATIC_RUNX1_CONFIG: CinematicGeneticTherapyConfig = {
  gene: 'RUNX1',
  disease: 'Leukemia',
  company: 'CrisPRO.ai',
  presenter: 'Fahad Kiani',
  presenterTitle: 'Commander and Founder, CrisPRO.ai 🧬',
  targetScore: '-26,140.8',
  futureThreats: [
    { gene: 'ASXL1', riskScore: '-15k', severity: 'high' },
    { gene: 'TET2', riskScore: '-12k', severity: 'high' },
    { gene: 'DNMT3A', riskScore: '-9k', severity: 'medium' }
  ],
  therapeuticAdvantages: [
    'Patent-pending AI algorithms for variant interpretation',
    'Massive AI-generated homology arms for surgical precision',
    '10x faster processing than traditional methods',
    'HIPAA-compliant cloud infrastructure'
  ],
  competitorLimitations: [
    'Tiny, context-unaware homology arms',
    'Low efficiency and high off-target effects',
    'Years-long development cycles',
    'Limited predictive capabilities'
  ],
  keyMetrics: [
    { label: 'Prediction Accuracy', value: '>95%', status: 'good' },
    { label: 'Development Time', value: '3 weeks', status: 'good' },
    { label: 'Off-target Risk', value: '<0.1%', status: 'good' },
    { label: 'Cost Reduction', value: '90%', status: 'good' }
  ]
}; 