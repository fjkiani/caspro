import { UniversalContent } from '@/types/universal-content';

export const prostateScreeningContent: UniversalContent = {
  meta: {
    id: 'prostate-screening',
    title: 'Prostate Cancer Screening',
    description: 'Current screening methods, guidelines, and controversies surrounding prostate cancer detection',
    estimatedDuration: 25,
    difficulty: 'intermediate',
    color: 'purple',
    author: 'Dr. Ken Pienta',
    lastUpdated: '2024-01-15',
    tags: ['screening', 'PSA', 'early-detection', 'guidelines']
  },
  sections: [
    {
      id: 'introduction',
      type: 'introduction',
      title: 'Prostate Cancer Screening Overview',
      data: {
        content: 'Prostate cancer screening has been the subject of much controversy over the last decade. Different medical organizations have varying recommendations, but most agree on the importance of informed decision-making between patients and healthcare providers.',
        highlights: [
          { title: 'Screening Components', content: 'Screening involves PSA blood test and digital rectal exam', type: 'info' },
          { title: 'Controversy', content: 'Controversy exists about benefits vs. risks', type: 'warning' },
          { title: 'Variable Guidelines', content: 'Guidelines vary between medical organizations', type: 'warning' },
          { title: 'Patient-Centered Care', content: 'Shared decision-making is emphasized', type: 'success' }
        ],
        learningObjectives: [
          'Understand current prostate cancer screening methods',
          'Learn about PSA testing and interpretation',
          'Recognize the controversies surrounding screening',
          'Identify appropriate candidates for screening'
        ]
      }
    },
    {
      id: 'screening-methods',
      type: 'cards',
      title: 'Screening Methods',
      data: {
        cards: [
          {
            id: 'psa-test',
            title: 'PSA Blood Test',
            content: 'Prostate-Specific Antigen test measures PSA levels in blood. The cornerstone of prostate cancer screening.',
            icon: '🩸',
            type: 'expand',
            expandedContent: {
              details: [
                'Blood test measuring PSA protein levels',
                'Produced by both normal and cancer cells',
                'Normal level: <4 ng/mL (varies by age)',
                'Elevated levels may indicate cancer, BPH, or infection',
                'Not specific to cancer - can have false positives'
              ],
              statistics: 'Only 25% of men with elevated PSA have cancer'
            }
          },
          {
            id: 'dre',
            title: 'Digital Rectal Exam (DRE)',
            content: 'Physical examination where healthcare provider feels the prostate through the rectum to detect lumps or abnormalities.',
            icon: '👨‍⚕️',
            type: 'expand',
            expandedContent: {
              details: [
                'Physical examination of prostate gland',
                'Can detect lumps, hard areas, or enlargement',
                'Slightly uncomfortable but not painful',
                'Important complement to PSA testing',
                'Can detect cancers missed by PSA'
              ],
              statistics: 'Recommended yearly starting at age 50'
            }
          }
        ],
        layout: 'grid',
        columns: 2
      }
    },
    {
      id: 'current-guidelines',
      type: 'comparison',
      title: 'Screening Guidelines',
      data: {
        title: 'American Urological Association Guidelines',
        description: 'The AUA emphasizes shared decision-making rather than universal screening recommendations.',
        items: [
          {
            id: 'general-population',
            title: 'General Population',
            description: 'Standard risk men',
            features: [
              'Discuss screening starting at age 50',
              'Annual DRE starting at age 50',
              'PSA testing between ages 55-69',
              'Screening decisions should be individualized',
              'Consider life expectancy >10 years'
            ],
            metadata: {
              startAge: '50 years',
              psaAge: '55-69 years',
              frequency: 'Annual'
            }
          },
          {
            id: 'high-risk',
            title: 'High-Risk Groups',
            description: 'African American men and those with family history',
            features: [
              'Begin discussions as early as age 40',
              'Earlier PSA testing may be appropriate',
              'More frequent monitoring may be needed',
              'Consider genetic counseling if strong family history',
              'Individualized approach essential'
            ],
            metadata: {
              startAge: '40 years',
              risk: 'Elevated',
              monitoring: 'More frequent'
            }
          }
        ],
        layout: 'side_by_side'
      }
    },
    {
      id: 'psa-interpretation',
      type: 'statistics',
      title: 'PSA Level Interpretation',
      data: {
        statistics: [
          {
            id: 'normal-psa',
            label: 'Normal PSA',
            value: '<4 ng/mL',
            description: 'Generally considered normal PSA level',
            trend: 'stable',
            context: 'Age-specific ranges may be more appropriate'
          },
          {
            id: 'young-men-psa',
            label: 'Men <50 Years',
            value: '<2.5 ng/mL',
            description: 'PSA level should be below 2.5 in younger men',
            trend: 'stable',
            context: 'Higher levels warrant investigation'
          },
          {
            id: 'gray-zone',
            label: 'Gray Zone',
            value: '4-10 ng/mL',
            description: 'Intermediate range requiring further evaluation',
            trend: 'stable',
            context: '25% chance of cancer in this range'
          },
          {
            id: 'high-psa',
            label: 'High PSA',
            value: '>10 ng/mL',
            description: 'Significantly elevated, high cancer probability',
            trend: 'up',
            context: '>50% chance of cancer'
          }
        ],
        layout: 'vertical'
      }
    },
    {
      id: 'screening-process',
      type: 'process',
      title: 'The Screening Process',
      data: {
        title: 'From Initial Test to Diagnosis',
        description: 'Understanding the step-by-step process from initial screening to potential cancer diagnosis.',
        steps: [
          {
            id: 'initial-screening',
            title: 'Initial Screening',
            description: 'PSA blood test and digital rectal exam',
            details: [
              'Annual PSA blood test (ages 55-69)',
              'Annual digital rectal exam (age 50+)',
              'Discussion of risks and benefits',
              'Consider individual risk factors'
            ]
          },
          {
            id: 'abnormal-results',
            title: 'Abnormal Results',
            description: 'Elevated PSA or abnormal DRE findings',
            details: [
              'PSA >4 ng/mL or rising trend',
              'Abnormal lumps or hardness on DRE',
              'Age-adjusted PSA concerns',
              'Clinical correlation needed'
            ]
          },
          {
            id: 'further-testing',
            title: 'Additional Testing',
            description: 'Repeat tests and additional evaluations',
            details: [
              'Repeat PSA to confirm elevation',
              'Free/total PSA ratio',
              'Consider newer tests (PHI, 4Kscore)',
              'Rule out infection or other causes'
            ]
          },
          {
            id: 'biopsy-decision',
            title: 'Biopsy Decision',
            description: 'Determining need for prostate biopsy',
            details: [
              'Persistently elevated PSA',
              'Abnormal DRE findings',
              'High-risk features present',
              'Patient counseling about biopsy risks/benefits'
            ]
          },
          {
            id: 'biopsy-results',
            title: 'Biopsy and Results',
            description: 'Prostate biopsy and pathology interpretation',
            details: [
              'Transrectal ultrasound-guided biopsy',
              'Multiple tissue samples taken',
              '75% of biopsies are negative for cancer',
              'If positive, cancer grading and staging'
            ]
          }
        ],
        layout: 'horizontal'
      }
    },
    {
      id: 'screening-statistics',
      type: 'statistics',
      title: 'Screening Impact and Statistics',
      data: {
        statistics: [
          {
            id: 'annual-biopsies',
            label: 'Annual Biopsies (US)',
            value: '1 Million',
            description: 'Prostate biopsies performed yearly due to screening',
            trend: 'stable',
            context: 'Most are negative for cancer'
          },
          {
            id: 'biopsy-positive-rate',
            label: 'Positive Biopsy Rate',
            value: '25%',
            description: 'Percentage of biopsies that find cancer',
            trend: 'stable',
            context: '75% of elevated PSA tests are false positives'
          },
          {
            id: 'uspstf-analysis',
            label: 'Deaths Prevented (per 1000 screened)',
            value: '0-1',
            description: 'Estimated deaths prevented by screening 1000 men for 10 years',
            trend: 'down',
            context: 'US Preventive Services Task Force analysis'
          },
          {
            id: 'false-positives',
            label: 'False Positive Tests',
            value: '100-120',
            description: 'Per 1000 men screened, leading to unnecessary biopsies',
            trend: 'stable',
            context: 'Major concern with PSA screening'
          }
        ],
        layout: 'grid'
      }
    },
    {
      id: 'screening-controversies',
      type: 'comparison',
      title: 'Screening Controversies',
      data: {
        title: 'Benefits vs. Risks of Prostate Cancer Screening',
        description: 'The debate over prostate cancer screening centers on whether benefits outweigh potential harms.',
        items: [
          {
            id: 'screening-benefits',
            title: 'Potential Benefits',
            description: 'Arguments in favor of screening',
            features: [
              'Early detection of curable cancers',
              'Opportunity for less invasive treatments',
              'Peace of mind for patients',
              'Potential reduction in cancer deaths',
              'Ability to monitor low-risk cancers'
            ],
            metadata: {
              evidence: 'Moderate',
              impact: 'Individual benefit possible'
            }
          },
          {
            id: 'screening-harms',
            title: 'Potential Harms',
            description: 'Arguments against routine screening',
            features: [
              'Overdiagnosis of indolent cancers',
              'Overtreatment with unnecessary side effects',
              'False positive tests causing anxiety',
              'Biopsy complications and discomfort',
              'Limited impact on overall mortality'
            ],
            metadata: {
              evidence: 'Strong',
              impact: 'Population-level concerns'
            }
          }
        ],
        layout: 'side_by_side'
      }
    },
    {
      id: 'overdiagnosis-overtreatment',
      type: 'cards',
      title: 'Understanding Overdiagnosis and Overtreatment',
      data: {
        cards: [
          {
            id: 'overdiagnosis',
            title: 'Overdiagnosis',
            content: 'Detecting tumors that grow so slowly they would never threaten a man\'s life.',
            icon: '🔍',
            type: 'expand',
            expandedContent: {
              details: [
                'Many prostate cancers grow very slowly',
                '80% of 80-year-old men have prostate cancer at autopsy',
                'Most never knew they had cancer',
                'Some cancers would never cause symptoms or death',
                'Screening can detect these "harmless" cancers'
              ],
              statistics: 'Significant concern with PSA screening'
            }
          },
          {
            id: 'overtreatment',
            title: 'Overtreatment',
            content: 'Treating cancers that would never have harmed the patient, exposing them to unnecessary side effects.',
            icon: '⚕️',
            type: 'expand',
            expandedContent: {
              details: [
                'Surgery and radiation have significant side effects',
                'Erectile dysfunction affects ~29 men per 1000 screened',
                'Urinary incontinence affects ~18 men per 1000 screened',
                'Bowel problems can occur with radiation',
                'Anxiety and worry from cancer diagnosis'
              ],
              statistics: '50 men per 1000 screened experience complications'
            }
          }
        ],
        layout: 'grid',
        columns: 2
      }
    },
    {
      id: 'psa-improvements',
      type: 'cards',
      title: 'Improving PSA Testing',
      data: {
        cards: [
          {
            id: 'free-total-psa',
            title: 'Free vs. Total PSA',
            content: 'Ratio of free PSA to total PSA can help distinguish cancer from benign conditions.',
            icon: '📊',
            type: 'expand',
            expandedContent: {
              details: [
                'Free PSA: PSA not bound to proteins',
                'Total PSA: Free + bound PSA',
                'Lower free/total ratio suggests higher cancer risk',
                'Ratio <0.1: 49-65% cancer risk',
                'Ratio >0.25: 9-16% cancer risk'
              ],
              statistics: 'Useful when total PSA is 4-10 ng/mL'
            }
          },
          {
            id: 'psa-velocity',
            title: 'PSA Velocity & Doubling Time',
            content: 'Rate of PSA increase over time may predict cancer risk better than single values.',
            icon: '📈',
            type: 'expand',
            expandedContent: {
              details: [
                'PSA velocity: Rate of change per year (ng/mL/year)',
                'PSA doubling time: Time for PSA to double',
                'Rise >0.7 ng/mL per year concerning',
                'Requires multiple PSA measurements over time',
                'May help distinguish cancer from BPH'
              ],
              statistics: 'Rapid rise suggests higher cancer risk'
            }
          },
          {
            id: 'age-specific-ranges',
            title: 'Age-Specific PSA Ranges',
            content: 'Using different PSA thresholds based on age may improve screening accuracy.',
            icon: '👴',
            type: 'expand',
            expandedContent: {
              details: [
                'PSA naturally increases with age due to BPH',
                'Younger men: Lower PSA thresholds',
                'Older men: Higher PSA thresholds acceptable',
                'May reduce false positives in elderly',
                'Could miss some cancers in older men'
              ],
              statistics: 'Not widely adopted due to concerns about delayed detection'
            }
          }
        ],
        layout: 'grid',
        columns: 1
      }
    },
    {
      id: 'summary',
      type: 'summary',
      title: 'Screening Summary',
      data: {
        keyTakeaways: [
          'PSA testing and DRE are the main screening tools for prostate cancer',
          'Screening is controversial due to overdiagnosis and overtreatment concerns',
          'Shared decision-making between patient and provider is essential',
          'High-risk men (African American, family history) should discuss screening earlier',
          'New tests and approaches aim to improve PSA accuracy'
        ],
        nextSteps: [
          'Learn about advanced screening tests that improve upon basic PSA',
          'Understand how screening results guide treatment decisions',
          'Explore the future of prostate cancer early detection'
        ],
        relatedTopics: [
          'Advanced Screening Tests',
          'Prostate Cancer Diagnosis',
          'Treatment Decision Making'
        ],
        assessmentQuestions: [
          'What are the two main components of prostate cancer screening?',
          'Why is prostate cancer screening controversial?',
          'What PSA level is generally considered elevated?',
          'Who should consider earlier screening discussions?'
        ]
      }
    }
  ]
}; 