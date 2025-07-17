import { UniversalContent } from '@/types/universal-content';

export const advancedScreeningContent: UniversalContent = {
  meta: {
    id: 'advanced-screening',
    title: 'Advanced Prostate Cancer Screening',
    description: 'Next-generation screening tests and technologies that improve upon traditional PSA testing',
    estimatedDuration: 20,
    difficulty: 'advanced',
    color: 'teal',
    author: 'Dr. Ken Pienta',
    lastUpdated: '2024-01-15',
    tags: ['advanced-screening', 'biomarkers', 'precision-medicine', 'future-technology']
  },
  sections: [
    {
      id: 'introduction',
      type: 'introduction',
      title: 'Beyond Basic PSA Testing',
      data: {
        content: 'While PSA testing has been the cornerstone of prostate cancer screening, newer tests are being developed to improve accuracy and reduce unnecessary biopsies. These advanced tests combine multiple biomarkers and clinical information to better predict cancer risk.',
        highlights: [
          { title: 'Improved Accuracy', content: 'New tests improve upon basic PSA accuracy', type: 'success' },
          { title: 'Better Prediction', content: 'Combine multiple biomarkers for better prediction', type: 'success' },
          { title: 'Reduced Harm', content: 'Reduce unnecessary biopsies and anxiety', type: 'success' },
          { title: 'Targeted Detection', content: 'Help identify clinically significant cancers', type: 'success' }
        ],
        learningObjectives: [
          'Understand limitations of traditional PSA testing',
          'Learn about newer biomarker-based tests',
          'Compare accuracy of different screening approaches',
          'Recognize the future direction of prostate cancer screening'
        ]
      }
    },
    {
      id: 'advanced-tests-overview',
      type: 'cards',
      title: 'Advanced Screening Tests',
      data: {
        cards: [
          {
            id: 'phi-test',
            title: 'Prostate Health Index (PHI)',
            content: 'Combines total PSA, free PSA, and proPSA in a mathematical formula for better cancer prediction.',
            icon: '🧮',
            type: 'basic',
            metadata: {
              accuracy: 'Better than PSA alone',
              availability: 'FDA approved, widely available'
            }
          },
          {
            id: '4kscore',
            title: '4Kscore Test',
            content: 'Uses four kallikrein markers plus clinical information to calculate individual risk of aggressive cancer.',
            icon: '🎯',
            type: 'basic',
            metadata: {
              focus: 'Aggressive cancer detection',
              timeframe: '20-year risk prediction'
            }
          },
          {
            id: 'pca3',
            title: 'PCA3 Test',
            content: 'Urine test measuring prostate cancer gene 3, performed after DRE to detect cancer-specific markers.',
            icon: '🧪',
            type: 'basic',
            metadata: {
              sample: 'Urine-based',
              specificity: 'Cancer-specific gene'
            }
          },
          {
            id: 'multiparametric-mri',
            title: 'Multiparametric MRI',
            content: 'Advanced imaging that can identify suspicious areas before biopsy, improving targeting accuracy.',
            icon: '🔍',
            type: 'basic',
            metadata: {
              type: 'Imaging',
              benefit: 'Targeted biopsies'
            }
          }
        ],
        layout: 'grid',
        columns: 2
      }
    },
    {
      id: 'phi-details',
      type: 'statistics',
      title: 'Prostate Health Index (PHI) Details',
      data: {
        statistics: [
          {
            id: 'phi-components',
            label: 'PHI Components',
            value: 'Total PSA + Free PSA + proPSA',
            description: 'Three PSA measurements combined in mathematical formula',
            trend: 'stable',
            context: 'More comprehensive than single PSA measurement'
          },
          {
            id: 'phi-accuracy',
            label: 'Improved Accuracy',
            value: 'Better than PSA alone',
            description: 'PHI is a better predictor of prostate cancer than total or free PSA alone',
            trend: 'up',
            context: 'Reduces unnecessary biopsies'
          },
          {
            id: 'phi-usage',
            label: 'Clinical Usage',
            value: 'PSA 4-10 ng/mL range',
            description: 'Most useful when total PSA is in the "gray zone"',
            trend: 'stable',
            context: 'Helps decision-making in borderline cases'
          },
          {
            id: 'phi-availability',
            label: 'Availability',
            value: 'FDA Approved',
            description: 'Approved for clinical use and becoming more common',
            trend: 'up',
            context: 'Growing adoption by urologists'
          }
        ],
        layout: 'vertical'
      }
    },
    {
      id: '4kscore-details',
      type: 'cards',
      title: '4Kscore Test Deep Dive',
      data: {
        cards: [
          {
            id: '4k-components',
            title: '4Kscore Components',
            content: 'Combines four kallikrein markers with clinical information in an algorithm.',
            icon: '🔬',
            type: 'expand',
            expandedContent: {
              details: [
                'Total PSA',
                'Free PSA', 
                'Intact PSA',
                'Human kallikrein 2 (hK2)',
                'Plus: Age, DRE results, prior biopsy history'
              ],
              statistics: 'More comprehensive risk assessment'
            }
          },
          {
            id: '4k-risk-calculation',
            title: 'Individual Risk Calculation',
            content: 'Provides personalized percentage risk of having aggressive prostate cancer.',
            icon: '📊',
            type: 'expand',
            expandedContent: {
              details: [
                'Calculates individual patient risk percentage',
                'Focuses on high-grade (Gleason ≥7) cancer',
                'Predicts 20-year outcomes',
                'Helps patients make informed biopsy decisions',
                'More accurate than PSA alone for aggressive cancer'
              ],
              statistics: 'Identifies aggressive cancer risk'
            }
          },
          {
            id: '4k-clinical-example',
            title: 'Clinical Example',
            content: 'A 60-year-old man with PSA >3 has ~10% risk of metastatic cancer at 20 years.',
            icon: '👨',
            type: 'expand',
            expandedContent: {
              details: [
                'Baseline risk: ~10% for PSA >3 at age 60',
                'If 4Kscore >7.5%: Risk increases to ~15%',
                'If 4Kscore <7.5%: Risk decreases to ~2%',
                'Helps stratify patients for biopsy decisions',
                'Provides long-term risk perspective'
              ],
              statistics: '7.5% threshold commonly used for decision-making'
            }
          }
        ],
        layout: 'grid',
        columns: 1
      }
    },
    {
      id: 'test-comparison',
      type: 'comparison',
      title: 'Screening Test Comparison',
      data: {
        title: 'Comparing Different Prostate Cancer Screening Approaches',
        description: 'Each screening method has unique advantages and limitations. Understanding these helps guide clinical decision-making.',
        items: [
          {
            id: 'traditional-psa',
            title: 'Traditional PSA',
            description: 'The established standard',
            features: [
              'Simple, inexpensive blood test',
              'Widely available and understood',
              'Extensive research and guidelines',
              'High sensitivity but low specificity',
              '75% false positive rate'
            ],
            metadata: {
              cost: 'Low',
              accuracy: 'Moderate',
              availability: 'Universal'
            }
          },
          {
            id: 'advanced-biomarkers',
            title: 'Advanced Biomarker Tests',
            description: 'PHI, 4Kscore, PCA3',
            features: [
              'Better accuracy than PSA alone',
              'Reduce unnecessary biopsies',
              'More expensive than basic PSA',
              'Growing clinical adoption',
              'Help identify aggressive cancers'
            ],
            metadata: {
              cost: 'Higher',
              accuracy: 'Improved',
              availability: 'Growing'
            }
          },
          {
            id: 'imaging-guided',
            title: 'MRI-Guided Approaches',
            description: 'Multiparametric MRI + targeted biopsy',
            features: [
              'Visual identification of suspicious areas',
              'Targeted rather than random biopsies',
              'Better detection of significant cancers',
              'Expensive and resource-intensive',
              'Requires specialized expertise'
            ],
            metadata: {
              cost: 'High',
              accuracy: 'High for significant cancer',
              availability: 'Limited'
            }
          }
        ],
        layout: 'grid'
      }
    },
    {
      id: 'decision-making-algorithm',
      type: 'process',
      title: 'Modern Screening Decision Algorithm',
      data: {
        title: 'Using Advanced Tests in Clinical Practice',
        description: 'How advanced screening tests fit into modern prostate cancer detection strategies.',
        steps: [
          {
            id: 'initial-assessment',
            title: 'Initial Risk Assessment',
            description: 'Evaluate patient risk factors and screening candidacy',
            details: [
              'Age, life expectancy, overall health',
              'Family history and genetic factors',
              'Race/ethnicity considerations',
              'Patient preferences and values'
            ]
          },
          {
            id: 'baseline-psa',
            title: 'Baseline PSA Testing',
            description: 'Start with traditional PSA and DRE',
            details: [
              'Annual PSA testing (ages 55-69)',
              'Digital rectal examination',
              'Establish baseline values',
              'Monitor trends over time'
            ]
          },
          {
            id: 'elevated-psa-evaluation',
            title: 'Elevated PSA Evaluation',
            description: 'Use advanced tests when PSA is elevated',
            details: [
              'Confirm elevated PSA with repeat testing',
              'Consider PHI or 4Kscore if PSA 4-10 ng/mL',
              'Rule out infection or other causes',
              'Evaluate free/total PSA ratio'
            ]
          },
          {
            id: 'advanced-risk-stratification',
            title: 'Advanced Risk Stratification',
            description: 'Use results to guide biopsy decisions',
            details: [
              'High-risk results: Proceed to biopsy',
              'Low-risk results: Consider active surveillance',
              'Intermediate risk: Shared decision-making',
              'Consider MRI if available and appropriate'
            ]
          },
          {
            id: 'personalized-approach',
            title: 'Personalized Follow-up',
            description: 'Tailor monitoring based on individual risk',
            details: [
              'High-risk patients: More frequent monitoring',
              'Low-risk patients: Less intensive follow-up',
              'Adjust based on age and life expectancy',
              'Regular reassessment of risk factors'
            ]
          }
        ],
        layout: 'vertical'
      }
    },
    {
      id: 'future-developments',
      type: 'cards',
      title: 'Future of Prostate Cancer Screening',
      data: {
        cards: [
          {
            id: 'liquid-biopsies',
            title: 'Liquid Biopsies',
            content: 'Blood tests detecting circulating tumor cells or DNA for early cancer detection.',
            icon: '🩸',
            type: 'basic',
            metadata: {
              status: 'In development',
              potential: 'Early detection'
            }
          },
          {
            id: 'ai-integration',
            title: 'Artificial Intelligence',
            content: 'AI algorithms combining multiple data sources for improved risk prediction.',
            icon: '🤖',
            type: 'basic',
            metadata: {
              status: 'Emerging',
              potential: 'Precision medicine'
            }
          },
          {
            id: 'genomic-testing',
            title: 'Genomic Risk Scores',
            content: 'Genetic testing to identify inherited cancer susceptibility and guide screening.',
            icon: '🧬',
            type: 'basic',
            metadata: {
              status: 'Available',
              potential: 'Personalized screening'
            }
          },
          {
            id: 'novel-biomarkers',
            title: 'Novel Biomarkers',
            content: 'New protein and genetic markers for more specific cancer detection.',
            icon: '🔬',
            type: 'basic',
            metadata: {
              status: 'Research phase',
              potential: 'Improved specificity'
            }
          }
        ],
        layout: 'grid',
        columns: 2
      }
    },
    {
      id: 'clinical-implementation',
      type: 'statistics',
      title: 'Clinical Implementation Challenges',
      data: {
        statistics: [
          {
            id: 'cost-considerations',
            label: 'Cost Factor',
            value: '3-5x Higher',
            description: 'Advanced tests cost 3-5 times more than basic PSA',
            trend: 'stable',
            context: 'May be offset by reduced unnecessary biopsies'
          },
          {
            id: 'insurance-coverage',
            label: 'Insurance Coverage',
            value: 'Variable',
            description: 'Coverage varies by test and insurance provider',
            trend: 'up',
            context: 'Growing acceptance as evidence accumulates'
          },
          {
            id: 'physician-adoption',
            label: 'Physician Adoption',
            value: 'Gradual',
            description: 'Urologists gradually incorporating advanced tests',
            trend: 'up',
            context: 'Education and evidence driving adoption'
          },
          {
            id: 'patient-acceptance',
            label: 'Patient Acceptance',
            value: 'High',
            description: 'Patients generally receptive to more accurate testing',
            trend: 'up',
            context: 'Especially when avoiding unnecessary procedures'
          }
        ],
        layout: 'horizontal'
      }
    },
    {
      id: 'summary',
      type: 'summary',
      title: 'Advanced Screening Summary',
      data: {
        keyTakeaways: [
          'Advanced tests like PHI and 4Kscore improve upon basic PSA accuracy',
          'These tests reduce unnecessary biopsies while maintaining cancer detection',
          'MRI-guided approaches offer visual targeting of suspicious areas',
          'Cost and availability remain barriers to widespread adoption',
          'Future developments include AI, liquid biopsies, and genomic risk scores'
        ],
        nextSteps: [
          'Discuss advanced testing options with healthcare providers',
          'Understand insurance coverage for newer tests',
          'Stay informed about emerging screening technologies',
          'Consider participation in screening research studies'
        ],
        relatedTopics: [
          'Prostate Cancer Diagnosis',
          'Treatment Decision Making',
          'Genetic Counseling',
          'Clinical Trials'
        ],
        assessmentQuestions: [
          'What are the main components of the PHI test?',
          'How does the 4Kscore differ from traditional PSA testing?',
          'What are the advantages of MRI-guided biopsy approaches?',
          'What future developments may improve prostate cancer screening?'
        ]
      }
    }
  ]
}; 