import { UniversalContent } from '@/types/universal-content';

export const prostateAnatomyContent: UniversalContent = {
  meta: {
    id: 'prostate-anatomy',
    title: 'Prostate Anatomy & Biology',
    description: 'Understanding the prostate gland: location, function, and biological role',
    estimatedDuration: 15,
    difficulty: 'beginner',
    color: 'blue',
    author: 'Dr. Ken Pienta',
    lastUpdated: '2024-01-15',
    tags: ['anatomy', 'prostate', 'biology', 'male-health']
  },
  sections: [
    {
      id: 'introduction',
      type: 'introduction',
      title: 'Introduction to the Prostate',
      data: {
        content: 'The prostate is a gland about the size of a walnut that sits below the bladder. It is only found in men and plays a crucial role in male reproductive health.',
        highlights: [
          { title: 'Location', content: 'Walnut-sized gland located between bladder and penis', type: 'info' },
          { title: 'Urethra', content: 'Urethra runs through the center of the prostate', type: 'info' },
          { title: 'Gender Specificity', content: 'Only found in males', type: 'info' },
          { title: 'Key Product', content: 'Produces prostate-specific antigen (PSA)', type: 'info' },
          { title: 'Functionality', content: 'Not necessary for erections or reproduction', type: 'info' }
        ],
        learningObjectives: [
          'Locate the prostate in the male anatomy',
          'Understand the biological function of the prostate',
          'Distinguish between normal prostate function and disease',
          'Identify the role of PSA in prostate health'
        ]
      }
    },
    {
      id: 'anatomy-overview',
      type: 'cards',
      title: 'Prostate Anatomy Overview',
      data: {
        cards: [
          {
            id: 'location',
            title: 'Anatomical Location',
            content: 'The prostate sits directly below the bladder and surrounds the urethra, the tube that carries urine from the bladder.',
            icon: '📍',
            type: 'basic',
            metadata: {
              keyPoint: 'Strategic location affects urinary function'
            }
          },
          {
            id: 'size',
            title: 'Size & Shape',
            content: 'About the size of a walnut in healthy adult men, typically weighing 20-25 grams.',
            icon: '🥜',
            type: 'basic',
            metadata: {
              keyPoint: 'Size increases with age (BPH)'
            }
          },
          {
            id: 'function',
            title: 'Primary Function',
            content: 'Produces prostatic fluid that nourishes and protects sperm, making up about 30% of seminal fluid.',
            icon: '🔬',
            type: 'basic',
            metadata: {
              keyPoint: 'Essential for reproductive health'
            }
          },
          {
            id: 'psa-production',
            title: 'PSA Production',
            content: 'Produces prostate-specific antigen (PSA), an enzyme that helps liquefy ejaculate.',
            icon: '🧪',
            type: 'basic',
            metadata: {
              keyPoint: 'PSA levels used for screening'
            }
          }
        ],
        layout: 'grid',
        columns: 2
      }
    },
    {
      id: 'evolutionary-role',
      type: 'statistics',
      title: 'Evolutionary & Protective Role',
      data: {
        statistics: [
          {
            id: 'infection-protection',
            label: 'Primary Evolutionary Purpose',
            value: 'Urinary Tract Protection',
            description: 'The prostate is thought to help protect the urinary tract from infections',
            trend: 'stable',
            context: 'Evolutionary biology suggests this protective function'
          },
          {
            id: 'reproductive-necessity',
            label: 'Required for Reproduction',
            value: 'No',
            description: 'The prostate is not necessary for erections or reproduction',
            trend: 'stable',
            context: 'Men can father children without a prostate'
          }
        ],
        layout: 'horizontal'
      }
    },
    {
      id: 'bph-vs-cancer',
      type: 'comparison',
      title: 'BPH vs. Prostate Cancer',
      data: {
        title: 'Understanding the Difference',
        description: 'Many people confuse benign prostatic hyperplasia (BPH) with cancer. It\'s crucial to understand these are completely different conditions.',
        items: [
          {
            id: 'bph',
            title: 'Benign Prostatic Hyperplasia (BPH)',
            description: 'Non-cancerous enlargement of the prostate',
            features: [
              'Benign (non-cancerous) condition',
              'Common with aging - affects most men over 50',
              'Causes urinary symptoms (difficulty urinating)',
              'Treated with medications or surgery',
              'Does NOT increase cancer risk',
              'Also called benign prostatic hypertrophy'
            ],
            metadata: {
              prevalence: '50% of men over 50',
              treatment: 'Medications, minimally invasive procedures',
              prognosis: 'Excellent, manageable condition'
            }
          },
          {
            id: 'prostate-cancer',
            title: 'Prostate Cancer',
            description: 'Malignant growth of prostate cells',
            features: [
              'Malignant (cancerous) condition',
              'Can spread to other parts of the body',
              'May have no early symptoms',
              'Requires cancer treatment (surgery, radiation, etc.)',
              'Can be life-threatening if advanced',
              'Completely different disease from BPH'
            ],
            metadata: {
              prevalence: '1 in 7 men lifetime risk',
              treatment: 'Surgery, radiation, hormone therapy',
              prognosis: 'Varies by stage and grade'
            }
          }
        ],
        layout: 'side_by_side'
      }
    },
    {
      id: 'key-takeaways',
      type: 'summary',
      title: 'Key Takeaways',
      data: {
        keyTakeaways: [
          'The prostate is a walnut-sized gland located below the bladder in men',
          'It produces PSA and prostatic fluid essential for reproductive health',
          'BPH (benign enlargement) is NOT cancer and does not increase cancer risk',
          'The prostate\'s evolutionary role is likely urinary tract protection',
          'Understanding normal prostate function is crucial for recognizing disease'
        ],
        nextSteps: [
          'Learn about cancer fundamentals and how they apply to the prostate',
          'Understand the epidemiology of prostate cancer worldwide',
          'Explore risk factors that influence prostate cancer development'
        ],
        relatedTopics: [
          'Cancer Fundamentals',
          'Prostate Cancer Epidemiology',
          'Risk Factors & Prevention'
        ],
        assessmentQuestions: [
          'Where is the prostate located in the male anatomy?',
          'What is the primary function of the prostate gland?',
          'How does BPH differ from prostate cancer?',
          'What is PSA and why is it important?'
        ]
      }
    }
  ]
}; 