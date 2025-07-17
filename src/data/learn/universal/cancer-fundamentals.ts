import { UniversalContent } from '@/types/universal-content';

export const cancerFundamentalsContent: UniversalContent = {
  meta: {
    id: 'cancer-fundamentals',
    title: 'Cancer Fundamentals',
    description: 'Understanding what cancer is, how it develops, and the hallmarks that define malignant behavior',
    estimatedDuration: 25,
    difficulty: 'intermediate',
    color: 'red',
    author: 'Dr. Ken Pienta',
    lastUpdated: '2024-01-15',
    tags: ['cancer-biology', 'oncology', 'hallmarks', 'genetics']
  },
  sections: [
    {
      id: 'what-is-cancer',
      type: 'introduction',
      title: 'What is Cancer?',
      data: {
        content: 'Cancer means uncontrolled growth. It\'s a disease caused by uncontrolled division of abnormal cells in a part of the body.',
        highlights: [
          { type: 'info', title: 'Definition', content: 'Cancer = uncontrolled cell growth and division' },
          { type: 'info', title: 'Cause', content: 'Caused by accumulation of genetic mutations' },
          { type: 'info', title: 'Nomenclature', content: 'Can also be called tumor or neoplasm' },
          { type: 'info', title: 'Example', content: 'Prostate cancer is specifically an adenocarcinoma' },
        ],
        learningObjectives: [
          'Define cancer and understand its basic characteristics',
          'Distinguish between different types of cancer',
          'Understand the genetic basis of cancer development',
          'Identify the hallmarks that define cancer behavior'
        ]
      }
    },
    {
      id: 'cancer-terminology',
      type: 'cards',
      title: 'Cancer Terminology',
      data: {
        cards: [
          {
            id: 'cancer-definition',
            title: 'Cancer',
            content: 'A disease caused by uncontrolled division of abnormal cells in a part of the body.',
            icon: '🔬',
            type: 'basic'
          },
          {
            id: 'tumor-definition',
            title: 'Tumor',
            content: 'A swelling of a part of the body, generally without inflammation, caused by abnormal growth of tissue. Can be benign or malignant.',
            icon: '🎯',
            type: 'basic'
          },
          {
            id: 'neoplasm-definition',
            title: 'Neoplasm',
            content: 'A new and abnormal growth of tissue in some part of the body. Another term for cancer.',
            icon: '📈',
            type: 'basic'
          },
          {
            id: 'adenocarcinoma-definition',
            title: 'Adenocarcinoma',
            content: 'A type of cancer that develops in an organ or gland. Prostate cancer is an adenocarcinoma.',
            icon: '🏥',
            type: 'basic'
          }
        ],
        layout: 'grid',
        columns: 2
      }
    },
    {
      id: 'cancer-types',
      type: 'comparison',
      title: 'Main Types of Cancer',
      data: {
        title: 'Cancer Classification by Tissue Origin',
        description: 'Cancers are classified according to the tissue where they originate. There are four main types.',
        items: [
          {
            id: 'carcinomas',
            title: 'Carcinomas',
            description: 'Most common type of cancer',
            features: [
              'Arise in epithelial tissue',
              'Found in internal and external body linings',
              'Includes adenocarcinomas (like prostate cancer)',
              'Includes squamous cell carcinomas'
            ]
          },
          {
            id: 'sarcomas',
            title: 'Sarcomas',
            description: 'Cancers of connective tissue',
            features: [
              'Arise from connective tissue',
              'Found in bones, tendons, cartilage',
              'Also found in muscle and fat',
              'Less common than carcinomas'
            ]
          },
          {
            id: 'blood-cancers',
            title: 'Blood Cancers',
            description: 'Cancers affecting blood and immune system',
            features: [
              'Leukemias - cancers of the blood',
              'Originate in bone marrow',
              'Lymphomas - cancers of lymph system',
              'Affect immune system function'
            ]
          }
        ],
        layout: 'grid'
      }
    },
    {
      id: 'genetic-basis',
      type: 'process',
      title: 'The Genetic Basis of Cancer',
      data: {
        title: 'Cancer is a Genetic Disease',
        description: 'Cancer develops through an accumulation of genetic mutations over time. Most of the time, a single mutation is not sufficient to cause cancer.',
        steps: [
          {
            id: 'normal-cell',
            title: 'Normal Cell',
            description: 'Healthy cell with normal DNA and controlled growth',
            details: [
              'Normal tumor suppressor genes active',
              'Controlled cell division',
              'DNA repair mechanisms working'
            ]
          },
          {
            id: 'first-mutation',
            title: 'First Mutation',
            description: 'Tumor suppressor gene becomes inactivated',
            details: [
              'Loss of growth control mechanism',
              'Cells begin to proliferate more',
              'Still not cancerous'
            ]
          },
          {
            id: 'dna-repair-loss',
            title: 'DNA Repair Defect',
            description: 'Mutation in DNA repair gene makes more mutations likely',
            details: [
              'DNA repair mechanisms compromised',
              'Increased mutation rate',
              'Genetic instability develops'
            ]
          },
          {
            id: 'oncogene-activation',
            title: 'Oncogene Activation',
            description: 'Mutation activates an oncogene, promoting cell growth',
            details: [
              'Growth-promoting genes activated',
              'Uncontrolled proliferation begins',
              'Pre-cancerous changes develop'
            ]
          },
          {
            id: 'cancer-formation',
            title: 'Cancer Formation',
            description: 'Multiple genetic alterations lead to full cancer',
            details: [
              'Multiple hallmarks acquired',
              'Invasive capabilities develop',
              'Potential for metastasis'
            ]
          }
        ],
        layout: 'horizontal'
      }
    },
    {
      id: 'hallmarks-of-cancer',
      type: 'cards',
      title: 'The Hallmarks of Cancer',
      data: {
        cards: [
          {
            id: 'self-growth',
            title: 'Self-Stimulated Growth',
            content: 'Cancer cells stimulate their own growth signals, becoming independent of external growth factors.',
            icon: '📊',
            type: 'basic'
          },
          {
            id: 'resist-inhibition',
            title: 'Resist Growth Inhibition',
            content: 'Cancer cells ignore signals that normally stop cell division and growth.',
            icon: '🚫',
            type: 'basic'
          },
          {
            id: 'avoid-death',
            title: 'Resist Cell Death',
            content: 'Cancer cells avoid programmed cell death (apoptosis) that would normally eliminate damaged cells.',
            icon: '💀',
            type: 'basic'
          },
          {
            id: 'unlimited-replication',
            title: 'Unlimited Replication',
            content: 'Cancer cells multiply indefinitely, bypassing normal limits on cell division.',
            icon: '♾️',
            type: 'basic'
          },
          {
            id: 'angiogenesis',
            title: 'Stimulate Blood Vessel Growth',
            content: 'Cancer cells promote the growth of new blood vessels to supply nutrients to tumors.',
            icon: '🩸',
            type: 'basic'
          },
          {
            id: 'invasion-metastasis',
            title: 'Invasion & Metastasis',
            content: 'Cancer cells invade local tissue and spread to distant sites in the body.',
            icon: '🌐',
            type: 'basic'
          },
          {
            id: 'abnormal-metabolism',
            title: 'Abnormal Metabolism',
            content: 'Cancer cells use energy differently than normal cells, often preferring glucose.',
            icon: '⚡',
            type: 'basic'
          },
          {
            id: 'immune-evasion',
            title: 'Evade Immune System',
            content: 'Cancer cells develop ways to hide from or suppress the immune system.',
            icon: '🛡️',
            type: 'basic'
          },
          {
            id: 'genetic-instability',
            title: 'Genetic Instability',
            content: 'Cancer cells accumulate mutations at an accelerated rate.',
            icon: '🧬',
            type: 'basic'
          },
          {
            id: 'inflammation',
            title: 'Tumor-Promoting Inflammation',
            content: 'Cancer cells are often associated with inflammatory cells that help them grow.',
            icon: '🔥',
            type: 'basic'
          }
        ],
        layout: 'grid',
        columns: 2
      }
    },
    {
      id: 'prostate-cancer-development',
      type: 'timeline',
      title: 'Prostate Cancer Development Timeline',
      data: {
        title: 'How Prostate Cancer Develops Over Time',
        description: 'Prostate cancer develops gradually through several precursor stages before becoming invasive cancer.',
        events: [
          {
            id: 'normal-prostate',
            title: 'Normal Prostate Epithelial Cells',
            date: 'Baseline',
            description: 'Healthy prostate epithelial cells with normal growth patterns',
            details: [
              'Normal cell division and death',
              'Proper response to growth signals',
              'Intact DNA repair mechanisms'
            ]
          },
          {
            id: 'pia-stage',
            title: 'Proliferative Inflammatory Atrophy (PIA)',
            date: 'Early Changes',
            description: 'Epithelial cells become associated with inflammatory cells and begin to atrophy',
            details: [
              'Chronic inflammation present',
              'Epithelial cell atrophy',
              'Increased cell proliferation'
            ]
          },
          {
            id: 'pin-stage',
            title: 'High-Grade Prostatic Intraepithelial Neoplasia (PIN)',
            date: 'Pre-Cancer',
            description: 'Cells start to proliferate and grow abnormally inside the gland',
            details: [
              'Abnormal cell growth patterns',
              'Cells growing inside gland',
              'Haven\'t broken through gland wall'
            ]
          },
          {
            id: 'localized-cancer',
            title: 'Localized Prostate Cancer',
            date: 'Early Cancer',
            description: 'Cancer cells break through the gland and become invasive',
            details: [
              'Cells invade surrounding tissue',
              'Still confined to prostate',
              'Detectable by biopsy'
            ]
          },
          {
            id: 'metastatic-cancer',
            title: 'Metastatic Prostate Cancer',
            date: 'Advanced Cancer',
            description: 'Cancer spreads beyond the prostate to other parts of the body',
            details: [
              'Breaks out of prostate capsule',
              'Spreads to lymph nodes, bones',
              'Most serious stage'
            ]
          }
        ]
      }
    },
    {
      id: 'summary',
      type: 'summary',
      title: 'Cancer Fundamentals Summary',
      data: {
        keyTakeaways: [
          'Cancer is uncontrolled cell growth caused by genetic mutations',
          'Multiple mutations accumulate over time to cause cancer',
          'Prostate cancer is an adenocarcinoma that develops in the prostate gland',
          'Cancer cells acquire hallmark capabilities that enable malignant behavior',
          'Prostate cancer develops through recognizable precursor stages (PIA → PIN → Cancer)'
        ],
        nextSteps: [
          'Explore the global epidemiology of prostate cancer',
          'Learn about specific risk factors for prostate cancer',
          'Understand how these fundamentals apply to screening and detection'
        ],
        relatedTopics: [
          'Prostate Cancer Epidemiology',
          'Risk Factors & Prevention',
          'Screening & Diagnosis'
        ]
      }
    }
  ]
}; 