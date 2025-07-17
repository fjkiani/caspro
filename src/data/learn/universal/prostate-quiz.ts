import { UniversalContent } from '@/types/universal-content';

export const prostateQuizContent: UniversalContent = {
  meta: {
    id: 'prostate-quiz',
    title: 'Prostate Cancer Knowledge Assessment',
    description: 'Comprehensive quiz covering all aspects of prostate cancer from biology to treatment',
    estimatedDuration: 20,
    difficulty: 'intermediate',
    color: 'violet',
    author: 'Dr. Ken Pienta',
    lastUpdated: '2024-01-15',
    tags: ['assessment', 'quiz', 'knowledge-check', 'comprehensive']
  },
  sections: [
    {
      id: 'quiz-introduction',
      type: 'introduction',
      title: 'Prostate Cancer Knowledge Assessment',
      data: {
        content: 'Test your understanding of prostate cancer fundamentals, risk factors, screening, diagnosis, staging, and treatment. This comprehensive assessment covers all major topics from the course.',
        highlights: [
          { title: 'Comprehensive Coverage', content: 'Covers all 8 topics from the prostate cancer module', type: 'info' },
          { title: 'Varied Question Types', content: 'Multiple choice and true/false questions', type: 'info' },
          { title: 'Instant Results', content: 'Immediate feedback provided', type: 'success' },
          { title: 'Targeted Review', content: 'Identifies areas for review', type: 'info' }
        ],
        learningObjectives: [
          'Assess comprehension of prostate cancer biology',
          'Evaluate understanding of risk factors and screening',
          'Test knowledge of staging and grading systems',
          'Verify understanding of treatment approaches'
        ]
      }
    },
    {
      id: 'anatomy-biology-quiz',
      type: 'interactive',
      title: 'Anatomy & Biology Questions',
      data: {
        interactiveType: 'quiz',
        questions: [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'Where is the prostate located in the male anatomy?',
            options: [
              'Above the bladder',
              'Below the bladder',
              'In the brain',
              'In the neck'
            ],
            correctAnswer: 1,
            explanation: 'The prostate is a walnut-sized gland that sits below the bladder and surrounds the urethra.'
          },
          {
            id: 'q2',
            type: 'multiple-choice',
            question: 'What is the primary function of the prostate gland?',
            options: [
              'Produce urine',
              'Produce PSA and prostatic fluid',
              'Control erections',
              'Filter blood'
            ],
            correctAnswer: 1,
            explanation: 'The prostate produces PSA (prostate-specific antigen) and prostatic fluid that nourishes and protects sperm.'
          },
          {
            id: 'q3',
            type: 'true-false',
            question: 'Benign Prostatic Hyperplasia (BPH) increases the risk of developing prostate cancer.',
            correctAnswer: false,
            explanation: 'BPH is a benign enlargement of the prostate that occurs with age and does NOT increase cancer risk. It is a completely different condition from prostate cancer.'
          }
        ]
      }
    },
    {
      id: 'cancer-fundamentals-quiz',
      type: 'interactive',
      title: 'Cancer Fundamentals Questions',
      data: {
        interactiveType: 'quiz',
        questions: [
          {
            id: 'q4',
            type: 'multiple-choice',
            question: 'What does cancer mean?',
            options: [
              'Controlled growth',
              'Uncontrolled growth',
              'Infection that is treated with antibiotics',
              'Benign enlargement of a gland'
            ],
            correctAnswer: 1,
            explanation: 'Cancer means uncontrolled growth - a disease caused by uncontrolled division of abnormal cells.'
          },
          {
            id: 'q5',
            type: 'true-false',
            question: 'Most of the time, a single mutation is sufficient to cause cancer.',
            correctAnswer: false,
            explanation: 'Cancer is a disease of multiple genetic alterations. Most of the time, a single mutation is NOT sufficient to cause cancer - it takes many mutations accumulated over time.'
          },
          {
            id: 'q6',
            type: 'multiple-choice',
            question: 'Prostate cancer is considered to be what type of cancer?',
            options: [
              'A leukemia',
              'A pediatric sarcoma',
              'An adenocarcinoma',
              'A lymphoma'
            ],
            correctAnswer: 2,
            explanation: 'Prostate cancer is an adenocarcinoma - a type of cancer that develops in an organ or gland.'
          }
        ]
      }
    },
    {
      id: 'risk-factors-quiz',
      type: 'interactive',
      title: 'Risk Factors Questions',
      data: {
        interactiveType: 'quiz',
        questions: [
          {
            id: 'q7',
            type: 'multiple-choice',
            question: 'What are the main risk factors for prostate cancer?',
            options: [
              'Alcohol abuse, smoking, diet',
              'Family history, Asian race, age',
              'Family history, African American race, age',
              'Smoking, exercise, diet'
            ],
            correctAnswer: 2,
            explanation: 'The main risk factors are family history, African American race, and age. African American men have the highest risk globally.'
          },
          {
            id: 'q8',
            type: 'multiple-choice',
            question: 'Which racial group has the highest prostate cancer risk?',
            options: [
              'Caucasian men',
              'Asian men',
              'African American men',
              'Hispanic men'
            ],
            correctAnswer: 2,
            explanation: 'African American men have the highest prostate cancer incidence rates worldwide and are 2.5 times more likely to die from the disease.'
          },
          {
            id: 'q9',
            type: 'true-false',
            question: 'Bicycle riding increases prostate cancer risk.',
            correctAnswer: false,
            explanation: 'Bicycle riding does NOT increase prostate cancer risk. This is a common myth. Other myths include vasectomy, sexual activity, and alcohol consumption.'
          }
        ]
      }
    },
    {
      id: 'screening-quiz',
      type: 'interactive',
      title: 'Screening Questions',
      data: {
        interactiveType: 'quiz',
        questions: [
          {
            id: 'q10',
            type: 'multiple-choice',
            question: 'PSA is the abbreviation for:',
            options: [
              'Benign Prostate Hyperplasia',
              'Prostate Specific Antigen',
              'Prostate Sensitive Antigen',
              'Prostate cancer'
            ],
            correctAnswer: 1,
            explanation: 'PSA stands for Prostate Specific Antigen, a protein produced by prostate cells that is measured in blood for screening.'
          },
          {
            id: 'q11',
            type: 'multiple-choice',
            question: 'A normal PSA level is generally considered to be:',
            options: [
              'Over 100 ng/mL',
              'Less than 4 ng/mL',
              'Between 10-20 ng/mL',
              'Greater than 50 ng/mL'
            ],
            correctAnswer: 1,
            explanation: 'A normal PSA level is generally considered to be less than 4 ng/mL, though age-specific ranges may be more appropriate.'
          },
          {
            id: 'q12',
            type: 'multiple-choice',
            question: 'Who should discuss prostate cancer screening with their healthcare provider?',
            options: [
              'A 38-year-old man',
              'An 80-year-old man with 5-year life expectancy',
              'A 60-year-old African American man',
              'All of these options'
            ],
            correctAnswer: 2,
            explanation: 'A 60-year-old African American man should discuss screening as African Americans are high-risk and should consider earlier screening discussions.'
          }
        ]
      }
    },
    {
      id: 'staging-grading-quiz',
      type: 'interactive',
      title: 'Staging & Grading Questions',
      data: {
        interactiveType: 'quiz',
        questions: [
          {
            id: 'q13',
            type: 'multiple-choice',
            question: 'What does T1c stage mean in prostate cancer?',
            options: [
              'Cancer that can be felt on DRE',
              'Cancer that has spread to lymph nodes',
              'Small cancer detected by PSA screening, not palpable',
              'Cancer that has spread to bones'
            ],
            correctAnswer: 2,
            explanation: 'T1c refers to a small prostate cancer detected by PSA screening that cannot be felt by digital rectal exam.'
          },
          {
            id: 'q14',
            type: 'multiple-choice',
            question: 'How is a Gleason score calculated?',
            options: [
              'Primary pattern + secondary pattern',
              'Primary pattern × secondary pattern',
              'Average of all patterns seen',
              'Highest pattern found'
            ],
            correctAnswer: 0,
            explanation: 'The Gleason score is the sum of the primary (most common) and secondary (second most common) patterns, e.g., 3+4=7.'
          },
          {
            id: 'q15',
            type: 'multiple-choice',
            question: 'What imaging test best shows prostate capsule penetration?',
            options: [
              'CT scan',
              'Bone scan',
              'MRI',
              'X-ray'
            ],
            correctAnswer: 2,
            explanation: 'MRI of the prostate can best demonstrate if cancer has broken through the prostate capsule into surrounding structures.'
          }
        ]
      }
    },
    {
      id: 'treatment-quiz',
      type: 'interactive',
      title: 'Treatment Questions',
      data: {
        interactiveType: 'quiz',
        questions: [
          {
            id: 'q16',
            type: 'multiple-choice',
            question: 'What are the main treatment options for localized prostate cancer?',
            options: [
              'Chemotherapy only',
              'Active surveillance, surgery, radiation',
              'Immunotherapy only',
              'Hormone therapy only'
            ],
            correctAnswer: 1,
            explanation: 'The main treatments for localized prostate cancer are active surveillance, radical prostatectomy (surgery), and radiation therapy.'
          },
          {
            id: 'q17',
            type: 'multiple-choice',
            question: 'When is active surveillance most appropriate?',
            options: [
              'High-risk prostate cancer',
              'Very low and low-risk prostate cancer',
              'Metastatic prostate cancer',
              'Never appropriate'
            ],
            correctAnswer: 1,
            explanation: 'Active surveillance is most appropriate for very low-risk and low-risk prostate cancer, where the cancer is unlikely to cause harm.'
          },
          {
            id: 'q18',
            type: 'multiple-choice',
            question: 'What defines high-risk prostate cancer?',
            options: [
              'T1c, Gleason 6, PSA <10',
              'T2a, Gleason 7, PSA 10-20',
              'T3a OR Gleason 8-10 OR PSA >20',
              'Only PSA >50'
            ],
            correctAnswer: 2,
            explanation: 'High-risk prostate cancer is defined as T3a (extracapsular extension) OR Gleason 8-10 OR PSA >20 ng/mL.'
          },
          {
            id: 'q19',
            type: 'true-false',
            question: 'Surgery and radiation are equally effective for localized prostate cancer.',
            correctAnswer: true,
            explanation: 'For localized low and intermediate-risk prostate cancer, radical prostatectomy and external beam radiation therapy are generally considered equally curative.'
          },
          {
            id: 'q20',
            type: 'multiple-choice',
            question: 'What percentage of men with localized prostate cancer are cured by surgery or radiation?',
            options: [
              'Less than 50%',
              'About 70%',
              'Greater than 90%',
              'About 30%'
            ],
            correctAnswer: 2,
            explanation: 'Greater than 90% of men with localized prostate cancer are cured by surgery or radiation therapy.'
          }
        ]
      }
    },
    {
      id: 'quiz-results',
      type: 'summary',
      title: 'Quiz Complete!',
      data: {
        keyTakeaways: [
          'You have completed the comprehensive prostate cancer knowledge assessment',
          'Review any questions you missed to reinforce learning',
          'Consider revisiting relevant course sections for topics you found challenging',
          'This knowledge foundation prepares you for advanced prostate cancer topics'
        ],
        nextSteps: [
          'Review any missed questions and explanations',
          'Revisit course sections for challenging topics',
          'Explore advanced prostate cancer treatment topics',
          'Consider additional clinical resources for deeper learning'
        ],
        relatedTopics: [
          'Advanced Prostate Cancer Treatment',
          'Prostate Cancer Research',
          'Patient Counseling Strategies',
          'Quality of Life Considerations'
        ],
        assessmentQuestions: [
          'Which topics do you need to review further?',
          'What aspects of prostate cancer are you most confident about?',
          'How will you apply this knowledge in your work?',
          'What additional learning would be most valuable?'
        ]
      }
    }
  ]
}; 