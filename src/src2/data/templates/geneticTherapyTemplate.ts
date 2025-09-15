import type { SlideDeck } from '../../types/slides.js';

export interface GeneticTherapyConfig {
  gene: string;
  disease: string;
  company: string;
  presenter: string;
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

export const createGeneticTherapyDeck = (config: GeneticTherapyConfig): SlideDeck => {
  return {
    id: `genetic-therapy-${config.gene.toLowerCase()}`,
    title: `The ${config.gene} Conquest: AI-Powered Therapeutic Design`,
    description: `Demonstration of how our Agentic Platform solved a multi-year ${config.disease} research challenge entirely in silico`,
    category: 'research',
    tags: ['AI', 'genetics', config.gene, config.disease, 'therapeutic design'],
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
    metadata: {
      author: config.presenter,
      template: 'genetic-therapy',
      theme: 'futuristic',
      confidentiality: 'internal'
    },
    slides: [
      // Slide 1: Title Slide
      {
        id: 'title-slide',
        title: `The ${config.gene} Conquest`,
        subtitle: `How Our Agentic Platform Solved a Multi-Year ${config.disease} Grant In Silico`,
        backgroundStyle: 'animated',
        backgroundConfig: {
          animation: 'dna',
          intensity: 'medium',
          colors: ['#1e293b', '#7c3aed', '#1e293b']
        },
        theme: 'futuristic',
        content: [
          {
            type: 'text',
            data: {
              text: '🎯 A Demonstration of AI-Powered Therapeutic Design & Validation',
              size: 'xl',
              align: 'center'
            },
            layout: 'centered'
          },
          {
            type: 'text',
            data: {
              text: `Presented by: ${config.presenter}\nCommander and Founder, ${config.company} 🧬`,
              size: 'lg',
              align: 'center'
            },
            layout: 'centered'
          }
        ]
      },

      // Slide 2: Disease Pathway
      {
        id: 'disease-pathway',
        title: 'The Genetic Pathway to Disease',
        subtitle: 'The Two-Hit Hypothesis: A Model for Disease Progression',
        backgroundStyle: 'gradient',
        content: [
          {
            type: 'pathway',
            data: {
              steps: [
                {
                  id: 'healthy',
                  title: 'Healthy Cell',
                  description: `Normal ${config.gene}`,
                  icon: '🧬',
                  status: 'normal'
                },
                {
                  id: 'first-hit',
                  title: 'First Hit',
                  description: `Inherited ${config.gene} Mutation`,
                  icon: '⚡',
                  status: 'warning'
                },
                {
                  id: 'second-hit',
                  title: 'Second Hit',
                  description: 'Acquired Somatic Mutation',
                  icon: '💥',
                  status: 'danger'
                },
                {
                  id: 'disease',
                  title: `${config.disease} Cell`,
                  description: `Full-Blown ${config.disease}`,
                  icon: '🦠',
                  status: 'danger',
                  animation: 'pulse'
                }
              ]
            },
            layout: 'full'
          },
          {
            type: 'text',
            data: {
              text: `This slide illustrates the 'two-hit' model, a fundamental concept in cancer genetics. It shows how an initial inherited mutation creates a predisposition, which can then progress to full-blown disease after a second, acquired mutation. Our entire approach begins with understanding this pathway.`,
              size: 'md',
              align: 'center'
            },
            layout: 'centered'
          }
        ]
      },

      // Slide 3: VUS Solution
      {
        id: 'vus-solution',
        title: 'Phase I: From Ambiguity to Actionable Insight',
        subtitle: 'Solving the "Variant of Uncertain Significance" (VUS) Crisis',
        backgroundStyle: 'animated',
        backgroundConfig: {
          animation: 'network',
          intensity: 'low'
        },
        content: [
          {
            type: 'pathway',
            data: {
              steps: [
                {
                  id: 'vus-problem',
                  title: 'The VUS Problem',
                  description: 'A genetic variant is identified, but its impact is unknown',
                  icon: '🧬',
                  status: 'warning'
                },
                {
                  id: 'ai-analysis',
                  title: `${config.company}`,
                  description: 'Our AI analyzes the variant from first principles',
                  icon: '🧠',
                  status: 'highlight',
                  animation: 'pulse'
                },
                {
                  id: 'pathogenic-verdict',
                  title: 'Pathogenic Verdict',
                  description: `Zeta Score: ${config.targetScore}`,
                  icon: '🎯',
                  status: 'danger'
                }
              ]
            },
            layout: 'full'
          }
        ]
      },

      // Slide 4: Predictive Modeling
      {
        id: 'predictive-modeling',
        title: 'Phase II: Predictive Modeling of Disease Evolution',
        subtitle: 'Mapping Future Mutations to Design Proactive Therapies',
        content: [
          {
            type: 'pathway',
            data: {
              steps: [
                {
                  id: 'known-risk',
                  title: 'Known Genetic Risk',
                  description: `${config.gene} (First Hit)`,
                  icon: '🧬',
                  status: 'danger'
                },
                {
                  id: 'ai-prediction',
                  title: 'Zeta Oracle Analysis',
                  description: 'AI predicts evolutionary pathways',
                  icon: '🧠',
                  status: 'highlight',
                  animation: 'pulse'
                },
                {
                  id: 'future-threats',
                  title: 'Probabilistic Map',
                  description: 'Future mutation predictions',
                  icon: '🗺️',
                  status: 'warning'
                }
              ]
            },
            layout: 'full'
          },
          {
            type: 'metrics',
            data: {
              title: 'Predicted Future Threats',
              layout: 'grid',
              metrics: config.futureThreats.map(threat => ({
                label: threat.gene,
                value: threat.riskScore,
                status: threat.severity === 'high' ? 'danger' : threat.severity === 'medium' ? 'warning' : 'good',
                description: 'Risk Score'
              }))
            },
            layout: 'centered'
          }
        ]
      },

      // Slide 5: Therapeutic Engineering
      {
        id: 'therapeutic-engineering',
        title: 'Phase III: Engineering the Therapeutic Solution',
        subtitle: 'From Predictive Insight to In Silico Drug Design',
        content: [
          {
            type: 'pathway',
            data: {
              steps: [
                {
                  id: 'disease-map',
                  title: 'Input: Disease Map',
                  description: 'Comprehensive pathway analysis',
                  icon: '🗺️',
                  status: 'normal'
                },
                {
                  id: 'forge-engine',
                  title: 'Zeta Forge Engine',
                  description: 'AI-powered therapeutic design',
                  icon: '🔨',
                  status: 'highlight',
                  animation: 'pulse'
                },
                {
                  id: 'therapeutic-arsenal',
                  title: 'Therapeutic Arsenal',
                  description: 'Complete treatment strategy',
                  icon: '🛡️',
                  status: 'normal'
                }
              ]
            },
            layout: 'full'
          },
          {
            type: 'text',
            data: {
              text: 'This transforms drug discovery from a process of chance into a deterministic engineering discipline.',
              size: 'lg',
              align: 'center'
            },
            layout: 'centered'
          }
        ]
      },

      // Slide 6: Competitive Advantage
      {
        id: 'competitive-advantage',
        title: 'Our Competitive Advantage',
        subtitle: 'A New Paradigm in Therapeutic R&D',
        content: [
          {
            type: 'comparison',
            data: {
              title: 'CrisPRO vs Traditional Approaches',
              items: [
                {
                  title: 'CrisPRO Advantage',
                  description: 'Our AI-powered approach provides unprecedented precision and speed',
                  status: 'advantage',
                  pros: config.therapeuticAdvantages,
                  metrics: {
                    'AUROC': '> 0.95',
                    'Timeline': 'Weeks',
                    'Accuracy': '99.9%'
                  }
                },
                {
                  title: 'Industry Limitation',
                  description: 'Standard approaches suffer from fundamental constraints',
                  status: 'disadvantage',
                  cons: config.competitorLimitations,
                  metrics: {
                    'AUROC': '< 0.80',
                    'Timeline': 'Years',
                    'Off-target Risk': 'High'
                  }
                }
              ]
            },
            layout: 'full'
          }
        ]
      },

      // Slide 7: Performance Metrics
      {
        id: 'performance-metrics',
        title: 'Platform Performance',
        subtitle: 'Validated Results Across Key Metrics',
        content: [
          {
            type: 'metrics',
            data: {
              title: 'Key Performance Indicators',
              layout: 'dashboard',
              metrics: config.keyMetrics
            },
            layout: 'full'
          }
        ]
      }
    ]
  };
};

// Pre-configured templates for common use cases
export const RUNX1_CONFIG: GeneticTherapyConfig = {
  gene: 'RUNX1',
  disease: 'Leukemia',
  company: 'CrisPRO.ai',
  presenter: 'Fahad Kiani',
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

export const BRCA1_CONFIG: GeneticTherapyConfig = {
  gene: 'BRCA1',
  disease: 'Breast Cancer',
  company: 'CrisPRO.ai',
  presenter: 'Fahad Kiani',
  targetScore: '-18,750.2',
  futureThreats: [
    { gene: 'TP53', riskScore: '-22k', severity: 'high' },
    { gene: 'PIK3CA', riskScore: '-14k', severity: 'high' },
    { gene: 'PTEN', riskScore: '-11k', severity: 'medium' }
  ],
  therapeuticAdvantages: [
    'PARP inhibitor resistance prediction',
    'Homologous recombination pathway modeling',
    'Personalized dosing algorithms',
    'Real-time mutation tracking'
  ],
  competitorLimitations: [
    'Static treatment protocols',
    'Limited resistance prediction',
    'One-size-fits-all approaches',
    'Reactive rather than proactive treatment'
  ],
  keyMetrics: [
    { label: 'Survival Improvement', value: '40%', status: 'good' },
    { label: 'Resistance Prediction', value: '98%', status: 'good' },
    { label: 'Treatment Response', value: '85%', status: 'good' },
    { label: 'Side Effects', value: '-60%', status: 'good' }
  ]
}; 