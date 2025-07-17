import { UniversalContent } from '@/types/universal-content';

export const metastasisIntroductionContent: UniversalContent = {
  meta: {
    id: 'metastasis-introduction',
    title: 'Introduction to Metastasis',
    subtitle: 'Understanding the process that makes cancer truly dangerous',
    color: 'red',
    difficulty: 'beginner',
    estimatedTime: '15 minutes',
    tags: ['metastasis', 'cancer biology', 'fundamentals']
  },
  sections: [
    {
      id: 'intro',
      type: 'introduction',
      data: {
        content: `
          <p>Metastasis is the defining characteristic that separates benign tumors from malignant cancer. While a primary tumor may be surgically removed, metastatic disease represents the spread of cancer cells to distant sites in the body, making treatment exponentially more challenging.</p>
          
          <p>Understanding metastasis is crucial because <strong>90% of cancer deaths are attributed to metastatic disease</strong>, not the primary tumor itself. This process transforms a localized health problem into a systemic, life-threatening condition.</p>
        `,
        keyPoints: [
          'Metastasis is responsible for 90% of cancer deaths',
          'It involves the spread of cancer cells from primary to distant sites',
          'The process requires cancer cells to overcome multiple biological barriers',
          'Understanding metastasis is key to developing better treatments'
        ],
        highlights: [
          {
            type: 'warning',
            title: 'Critical Point',
            content: 'Metastasis transforms cancer from a local problem to a systemic disease, making early detection and prevention crucial for patient outcomes.'
          }
        ]
      },
      animation: {
        type: 'fade',
        duration: 0.5
      }
    },
    {
      id: 'statistics',
      type: 'statistics',
      data: {
        title: 'The Impact of Metastasis on Survival',
        subtitle: '5-Year Survival Rates: Non-Metastatic vs Metastatic Cancer',
        statistics: [
          {
            id: 'prostate',
            label: 'Prostate Cancer',
            value: '100% → 29%',
            description: 'Dramatic drop in survival when metastatic',
            color: 'blue'
          },
          {
            id: 'breast',
            label: 'Breast Cancer',
            value: '99% → 23%',
            description: 'Nearly 100% survival drops to less than 25%',
            color: 'pink'
          },
          {
            id: 'colorectal',
            label: 'Colorectal Cancer',
            value: '90% → 12%',
            description: 'Survival plummets with distant spread',
            color: 'green'
          },
          {
            id: 'lung',
            label: 'Lung Cancer',
            value: '52% → 4%',
            description: 'Already challenging, becomes nearly fatal',
            color: 'red'
          }
        ]
      },
      animation: {
        type: 'slide',
        duration: 0.6,
        delay: 0.2
      }
    },
    {
      id: 'key-concepts',
      type: 'cards',
      data: {
        title: 'Key Concepts in Metastasis',
        subtitle: 'Understanding the fundamental principles',
        cards: [
          {
            id: 'multi-step',
            title: 'Multi-Step Process',
            content: {
              front: 'Metastasis requires cancer cells to successfully complete multiple sequential steps',
              back: `
                <strong>The Metastatic Cascade:</strong><br/>
                • Local invasion<br/>
                • Intravasation (entering blood/lymph)<br/>
                • Circulation survival<br/>
                • Extravasation (exiting circulation)<br/>
                • Colonization of distant sites<br/><br/>
                Each step presents opportunities for therapeutic intervention.
              `
            },
            type: 'flip',
            color: 'blue',
            metadata: {
              category: 'process',
              difficulty: 'intermediate'
            }
          },
          {
            id: 'inefficient',
            title: 'Inefficient Process',
            content: {
              front: 'Less than 0.01% of circulating tumor cells successfully establish metastases',
              back: `
                <strong>Natural Barriers:</strong><br/>
                • Immune system surveillance<br/>
                • Mechanical stress in circulation<br/>
                • Lack of survival signals<br/>
                • Hostile microenvironments<br/><br/>
                This inefficiency highlights the body's natural defenses against cancer spread.
              `
            },
            type: 'flip',
            color: 'green',
            metadata: {
              category: 'biology',
              difficulty: 'beginner'
            }
          },
          {
            id: 'organ-specificity',
            title: 'Organ Specificity',
            content: {
              front: 'Different cancer types show preferences for specific metastatic sites',
              back: `
                <strong>Seed and Soil Hypothesis:</strong><br/>
                • Cancer cells (seed) require compatible environments (soil)<br/>
                • Breast cancer → bone, liver, lung, brain<br/>
                • Prostate cancer → bone, lymph nodes<br/>
                • Colorectal cancer → liver, lung<br/><br/>
                Understanding these patterns helps predict and monitor disease progression.
              `
            },
            type: 'flip',
            color: 'purple',
            metadata: {
              category: 'clinical',
              difficulty: 'intermediate'
            }
          },
          {
            id: 'clinical-significance',
            title: 'Clinical Significance',
            content: {
              front: 'Understanding metastasis is crucial for developing prevention strategies',
              back: `
                <strong>Clinical Applications:</strong><br/>
                • Early detection strategies<br/>
                • Targeted prevention therapies<br/>
                • Personalized treatment plans<br/>
                • Improved patient outcomes<br/><br/>
                Knowledge of metastatic biology directly translates to better patient care.
              `
            },
            type: 'flip',
            color: 'red',
            metadata: {
              category: 'clinical',
              difficulty: 'beginner'
            }
          }
        ],
        columns: 2,
        filterable: true,
        searchable: true,
        layout: 'grid'
      },
      animation: {
        type: 'cascade',
        duration: 0.5,
        stagger: 0.1
      }
    },
    {
      id: 'timeline',
      type: 'timeline',
      data: {
        title: 'Historical Development of Metastasis Understanding',
        subtitle: 'Key discoveries that shaped our understanding',
        events: [
          {
            id: 'recamier-1829',
            date: '1829',
            title: 'Term "Metastasis" Coined',
            description: 'Joseph Recamier first described the spread of cancer from one part of the body to another.',
            scientist: 'Joseph Recamier',
            contribution: 'Coined the term "metastasis"',
            significance: 'First scientific description of cancer spread'
          },
          {
            id: 'virchow-1858',
            date: '1858',
            title: 'Mechanical Theory',
            description: 'Proposed that metastasis was simply mechanical - cancer cells broke off and got stuck in distant blood vessels.',
            scientist: 'Rudolf Virchow',
            contribution: 'Mechanical theory of metastasis',
            significance: 'First attempt to explain the mechanism of spread'
          },
          {
            id: 'paget-1889',
            date: '1889',
            title: 'Seed and Soil Hypothesis',
            description: 'Introduced the revolutionary idea that cancer cells (seeds) can only grow in specific, hospitable organs (congenial soil).',
            scientist: 'Stephen Paget',
            contribution: 'Seed and Soil hypothesis',
            significance: 'Explained organ-specific metastatic patterns'
          },
          {
            id: 'ewing-1928',
            date: '1928',
            title: 'Anatomical Route Theory',
            description: 'Proposed that metastatic patterns follow anatomical pathways, particularly blood flow patterns.',
            scientist: 'James Ewing',
            contribution: 'Anatomical route theory',
            significance: 'Emphasized the role of circulation in metastasis'
          }
        ],
        interactive: true
      },
      animation: {
        type: 'slide',
        duration: 0.8
      }
    },
    {
      id: 'insights',
      type: 'cards',
      data: {
        title: 'Clinical Insights',
        cards: [
          {
            id: 'early-detection',
            title: 'Early Detection is Critical',
            content: 'The dramatic difference in survival rates between localized and metastatic disease emphasizes the importance of early detection and treatment.',
            icon: 'Search',
            color: 'blue'
          },
          {
            id: 'prevention-focus',
            title: 'Prevention Over Treatment',
            content: 'Given the poor outcomes of metastatic disease, preventing metastasis is often more effective than treating established metastases.',
            icon: 'Shield',
            color: 'green'
          },
          {
            id: 'personalized-approach',
            title: 'Personalized Medicine',
            content: 'Understanding organ-specific metastatic patterns allows for personalized surveillance and treatment strategies.',
            icon: 'Target',
            color: 'purple'
          },
          {
            id: 'research-opportunities',
            title: 'Research Opportunities',
            content: 'The inefficiency of metastasis reveals multiple potential targets for therapeutic intervention.',
            icon: 'Lightbulb',
            color: 'orange'
          }
        ],
        layout: 'grid'
      },
      animation: {
        type: 'scale',
        duration: 0.5,
        stagger: 0.15
      }
    },
    {
      id: 'summary',
      type: 'summary',
      data: {
        title: 'Key Takeaways',
        keyTakeaways: [
          'Metastasis is responsible for 90% of cancer deaths, making it the most critical aspect of cancer biology to understand',
          'The metastatic process is highly inefficient, with less than 0.01% of circulating tumor cells successfully forming metastases',
          'Different cancer types show predictable patterns of organ-specific metastasis, following the "seed and soil" principle',
          'Early detection and prevention of metastasis are more effective than treating established metastatic disease'
        ],
        nextSteps: [
          'Learn about the 8-step metastatic cascade',
          'Understand organ-specific metastatic patterns',
          'Explore therapeutic strategies targeting metastasis'
        ],
        relatedTopics: [
          'The Metastatic Cascade',
          'Organ Tropism',
          'Therapeutic Strategies',
          'Clinical Case Studies'
        ],
        clinicalRelevance: 'Understanding metastasis fundamentals is essential for developing effective cancer prevention, detection, and treatment strategies. This knowledge directly impacts patient outcomes and guides clinical decision-making.'
      },
      animation: {
        type: 'fade',
        duration: 0.6
      }
    }
  ]
}; 