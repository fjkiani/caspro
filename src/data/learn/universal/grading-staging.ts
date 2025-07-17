import { UniversalContent } from '@/types/universal-content';

export const gradingStagingContent: UniversalContent = {
  meta: {
    id: 'grading-staging',
    title: 'Finding, Grading & Staging Prostate Cancer',
    description: 'Comprehensive guide to diagnostic tests, TNM staging system, and Gleason grading for prostate cancer',
    estimatedDuration: 35,
    difficulty: 'intermediate',
    color: 'indigo',
    author: 'Dr. Ken Pienta',
    lastUpdated: '2024-01-15',
    tags: ['diagnosis', 'staging', 'grading', 'TNM', 'Gleason']
  },
  sections: [
    {
      id: 'introduction',
      type: 'introduction',
      title: 'Finding and Staging Prostate Cancer',
      data: {
        content: 'When PSA is elevated or digital rectal exam is abnormal, the next step is prostate ultrasound and biopsy. Understanding how prostate cancer is found, graded, and staged is crucial for treatment planning and prognosis.',
        highlights: [
          { type: 'info', title: 'Workup Trigger', content: '~1 million men yearly have PSA >4, triggering workup' },
          { type: 'info', title: 'Diagnosis Rate', content: '~200,000 men diagnosed with prostate cancer annually' },
          { type: 'info', title: 'Staging Method', content: 'Staging combines TNM system with Gleason grading' },
          { type: 'info', title: 'Importance', content: 'Proper staging guides treatment decisions and prognosis' }
        ],
        learningObjectives: [
          'Understand tests performed to stage prostate cancer',
          'Learn how prostate cancer is staged using TNM system',
          'Master the Gleason grading system and modern updates',
          'Interpret staging results for treatment planning'
        ]
      }
    },
    {
      id: 'diagnostic-tests',
      type: 'cards',
      title: 'Tests That Find Prostate Cancer',
      data: {
        cards: [
          {
            id: 'ultrasound-biopsy',
            title: 'Transrectal Ultrasound & Biopsy',
            content: 'The primary method for diagnosing prostate cancer when PSA is elevated or DRE is abnormal.',
            icon: '🔍',
            type: 'expand',
            expandedContent: {
              details: [
                'Probe placed in rectum to guide needle biopsies',
                'Ultrasound uses sound waves to image prostate',
                'Detects different tissue densities',
                'Typically 12 biopsies sample various prostate areas',
                'If lesion seen: "12-plus-2" biopsy (extra samples of suspicious area)',
                'Most cancers arise in peripheral zone (outer area near rectum)'
              ],
              statistics: 'Standard procedure when PSA >4 or abnormal DRE'
            }
          },
          {
            id: 'prostate-zones',
            title: 'Prostate Anatomy Zones',
            content: 'Urologists divide the prostate into three zones, each with different cancer risk.',
            icon: '🎯',
            type: 'expand',
            expandedContent: {
              details: [
                'Peripheral Zone: Outer area next to rectum - most cancers arise here',
                'Central Zone: Surrounds ejaculatory ducts',
                'Transition Zone: Surrounds urethra - where BPH typically occurs',
                'Biopsy samples target all zones systematically',
                'Peripheral zone cancers more likely to be palpable on DRE'
              ],
              statistics: '70% of prostate cancers arise in peripheral zone'
            }
          }
        ],
        layout: 'grid',
        columns: 2
      }
    },
    {
      id: 'staging-imaging',
      type: 'cards',
      title: 'Imaging for Cancer Staging',
      data: {
        cards: [
          {
            id: 'mri-prostate',
            title: 'MRI of Prostate',
            content: 'Magnetic resonance imaging shows if cancer has broken through the prostate capsule.',
            icon: '🧲',
            type: 'expand',
            expandedContent: {
              details: [
                'Uses powerful magnetic field to create detailed images',
                'No longer requires rectal probe (modern technique)',
                'Shows very clear pictures of prostate structure',
                'Can demonstrate capsule penetration by cancer',
                'Helps determine if cancer is organ-confined',
                'Important for surgical planning'
              ],
              statistics: 'Performed when local invasion suspected'
            }
          },
          {
            id: 'ct-scan',
            title: 'CT Scan of Abdomen/Pelvis',
            content: 'Computerized tomography to assess lymph node involvement.',
            icon: '💻',
            type: 'expand',
            expandedContent: {
              details: [
                'Combines X-ray images from different angles',
                'Creates cross-sectional images of internal structures',
                'Excellent for finding enlarged lymph nodes',
                'Cannot distinguish cancer from inflammation in nodes',
                'Enlarged nodes assumed to be cancerous for staging',
                'Guides treatment planning'
              ],
              statistics: 'Detects enlarged lymph nodes but not cancer-specific'
            }
          },
          {
            id: 'bone-scan',
            title: 'Bone Scan',
            content: 'Nuclear imaging test to detect bone metastases.',
            icon: '🦴',
            type: 'expand',
            expandedContent: {
              details: [
                'Uses technetium-99 radionuclide',
                'Goes to areas where bone is being damaged',
                'Shows up as dark areas on scan',
                'Not cancer-specific - detects any bone damage',
                'Suggests possible bone metastases',
                'Often followed by X-rays for confirmation'
              ],
              statistics: 'Performed when bone metastases suspected'
            }
          },
          {
            id: 'xray-bones',
            title: 'X-rays of Bones',
            content: 'Standard imaging to confirm suspicious bone scan findings.',
            icon: '📷',
            type: 'expand',
            expandedContent: {
              details: [
                'Done when bone scan shows abnormalities',
                'Shows sclerotic (extra-white) areas in bone',
                'Indicates extra bone growth from cancer',
                'Not cancer-specific but highly suggestive',
                'Helps confirm bone metastases',
                'Guides treatment decisions'
              ],
              statistics: 'Follow-up test for positive bone scans'
            }
          }
        ],
        layout: 'grid',
        columns: 2
      }
    },
    {
      id: 'imaging-summary',
      type: 'comparison',
      title: 'Imaging Summary by Purpose',
      data: {
        title: 'Each Imaging Test Serves a Specific Staging Purpose',
        description: 'Different imaging modalities assess different aspects of cancer spread.',
        items: [
          {
            id: 'local-assessment',
            title: 'Local Disease Assessment',
            description: 'Determining if cancer is confined to prostate',
            features: [
              'MRI of prostate - shows capsule penetration',
              'Ultrasound - guides biopsy and shows local anatomy',
              'Assesses T stage (tumor characteristics)',
              'Critical for surgical planning'
            ],
            metadata: {
              focus: 'Local spread',
              staging: 'T stage'
            }
          },
          {
            id: 'regional-assessment',
            title: 'Regional Disease Assessment',
            description: 'Checking for lymph node involvement',
            features: [
              'CT scan of abdomen/pelvis',
              'Shows enlarged lymph nodes',
              'Cannot confirm cancer but assumes malignancy if enlarged',
              'Determines N stage (node involvement)'
            ],
            metadata: {
              focus: 'Lymph nodes',
              staging: 'N stage'
            }
          },
          {
            id: 'distant-assessment',
            title: 'Distant Disease Assessment',
            description: 'Looking for metastases to bones and organs',
            features: [
              'Bone scan - detects bone metastases',
              'X-rays - confirm bone scan findings',
              'CT can show other organ involvement',
              'Determines M stage (metastases)'
            ],
            metadata: {
              focus: 'Distant spread',
              staging: 'M stage'
            }
          }
        ]
      }
    },
    {
      id: 'tnm-staging-system',
      type: 'cards',
      title: 'TNM Staging System',
      data: {
        cards: [
          {
            id: 't-stage',
            title: 'T Stage - Tumor Characteristics',
            content: 'Describes the size and extent of the primary tumor in the prostate.',
            icon: '🎯',
            type: 'expand',
            expandedContent: {
              details: [
                'T1c: Small cancer detected by PSA screening, not palpable on DRE',
                'T2: Cancer palpable on DRE but confined to prostate',
                'T3: Cancer invading through prostate capsule',
                'T4: Cancer invading into rectum or bladder',
                'T1c is special designation for PSA-detected cancers'
              ],
              statistics: 'Most important factor for treatment planning'
            }
          },
          {
            id: 'n-stage',
            title: 'N Stage - Lymph Node Status',
            content: 'Indicates whether cancer has spread to nearby lymph nodes.',
            icon: '🔗',
            type: 'expand',
            expandedContent: {
              details: [
                'Nx: Lymph nodes not assessed (no CT scan)',
                'N0: No regional lymph node involvement (normal CT)',
                'N1: Regional lymph node involvement (enlarged on CT)',
                'CT scan cannot confirm cancer - based on size only',
                'Enlarged nodes assumed cancerous for staging'
              ],
              statistics: 'Based on clinical imaging, not pathology'
            }
          },
          {
            id: 'm-stage',
            title: 'M Stage - Metastases',
            content: 'Describes whether cancer has spread to distant parts of the body.',
            icon: '🌐',
            type: 'expand',
            expandedContent: {
              details: [
                'Mx: Metastases not assessed (no bone scan)',
                'M0: No evidence of distant metastases',
                'M1a: Lymph nodes beyond pelvis',
                'M1b: Bone metastases',
                'M1c: Other sites (liver, lungs, etc.)'
              ],
              statistics: 'M1b (bone) most common distant metastasis'
            }
          }
        ],
        layout: 'grid',
        columns: 1
      }
    },
    {
      id: 'gleason-grading-system',
      type: 'introduction',
      title: 'The Gleason Grading System',
      data: {
        content: 'Prostate cancer grading uses the Gleason scoring system, developed by Dr. Gleason, which evaluates how abnormal cancer cells look under the microscope. This grading is crucial for determining prognosis and treatment.',
        highlights: [
          { type: 'info', title: 'Scoring', content: 'Gleason system scores cancer patterns from 1-5' },
          { type: 'info', title: 'Calculation', content: 'Combines primary and secondary patterns for total score' },
          { type: 'info', title: 'Indication', content: 'Higher scores indicate more aggressive cancer' },
          { type: 'info', title: 'Modern Practice', content: 'Modern pathology rarely reports patterns 1-2' }
        ],
        learningObjectives: [
          'Understand the fundamental principles of Gleason grading',
          'Learn how primary and secondary patterns are determined',
          'Interpret Gleason scores for treatment planning'
        ]
      }
    },
    {
      id: 'normal-vs-cancer-histology',
      type: 'comparison',
      title: 'Normal vs. Cancer Histology',
      data: {
        title: 'What Pathologists See Under the Microscope',
        description: 'Understanding the progression from normal prostate tissue to cancer helps explain the grading system.',
        items: [
          {
            id: 'normal-prostate',
            title: 'Normal Prostate',
            description: 'Healthy prostate architecture',
            features: [
              'Large, well-formed glands',
              'Two-cell layer lining in glands',
              'PSA secreted into gland lumens',
              'Surrounded by normal stroma tissue',
              'Organized, regular pattern'
            ],
            metadata: {
              pattern: 'Well-organized',
              cells: 'Two-layer lining'
            }
          },
          {
            id: 'pia-pin',
            title: 'PIA and PIN',
            description: 'Pre-cancerous changes',
            features: [
              'PIA: Glands involute with inflammation',
              'PIN: Multiple cell layers grow into gland',
              'Gland lining still intact in PIN',
              'Normal stroma still present',
              'Considered precursor lesions'
            ],
            metadata: {
              pattern: 'Pre-malignant',
              cells: 'Multi-layer but contained'
            }
          },
          {
            id: 'prostate-cancer',
            title: 'Prostate Cancer',
            description: 'Malignant transformation',
            features: [
              'Single cell layer only (key diagnostic feature)',
              'Abnormal cells invade into stroma',
              'Gland architecture changes/breaks down',
              'Loss of normal organization',
              'Varying degrees of differentiation'
            ],
            metadata: {
              pattern: 'Disorganized',
              cells: 'Single-layer, invasive'
            }
          }
        ],
        layout: 'side_by_side'
      }
    },
    {
      id: 'gleason-patterns',
      type: 'cards',
      title: 'Gleason Patterns 1-5',
      data: {
        cards: [
          {
            id: 'pattern-1-2',
            title: 'Patterns 1 & 2',
            content: 'Well-differentiated cancer with organized gland structure.',
            icon: '1️⃣',
            type: 'expand',
            expandedContent: {
              details: [
                'Pattern 1: Small, uniform glands, well-differentiated',
                'Pattern 2: More stroma between glands, slight disorganization',
                'Rarely reported in modern pathology',
                'Very low-grade, slow-growing cancers',
                'Excellent prognosis when present'
              ],
              statistics: 'Rarely seen in contemporary practice'
            }
          },
          {
            id: 'pattern-3',
            title: 'Pattern 3',
            content: 'Most common pattern - small glands with single cell layer.',
            icon: '3️⃣',
            type: 'expand',
            expandedContent: {
              details: [
                'Small glands with single cell layer (key feature)',
                'Glands starting to break down',
                'Beginning infiltration into stroma',
                'Most common pattern in contemporary practice',
                'Generally favorable prognosis'
              ],
              statistics: 'Most frequently reported pattern'
            }
          },
          {
            id: 'pattern-4',
            title: 'Pattern 4',
            content: 'Intermediate grade - glands fusing together with loss of structure.',
            icon: '4️⃣',
            type: 'expand',
            expandedContent: {
              details: [
                'Small glands fusing together',
                'Can still see circular patterns but "smeared"',
                'Loss of individual gland architecture',
                'More aggressive than pattern 3',
                'Intermediate prognosis'
              ],
              statistics: 'Indicates more aggressive disease'
            }
          },
          {
            id: 'pattern-5',
            title: 'Pattern 5',
            content: 'High grade - sheets of cells with no gland formation.',
            icon: '5️⃣',
            type: 'expand',
            expandedContent: {
              details: [
                'No gland architecture visible',
                'Sheets of anaplastic cells',
                'Complete loss of differentiation',
                'Most aggressive pattern',
                'Poor prognosis'
              ],
              statistics: 'Highest grade, most aggressive'
            }
          }
        ],
        layout: 'grid',
        columns: 2
      }
    },
    {
      id: 'gleason-scoring-process',
      type: 'process',
      title: 'How Gleason Scores Are Calculated',
      data: {
        title: 'From Microscopic Patterns to Final Score',
        description: 'Pathologists examine biopsy or surgical specimens to identify patterns and calculate scores.',
        steps: [
          {
            id: 'identify-primary',
            title: 'Identify Primary Pattern',
            description: 'Find the most dominant cancer pattern in the specimen',
            details: [
              'Examine entire biopsy or surgical specimen',
              'Identify most common cancer pattern',
              'Assign grade 1-5 (though 1-2 rarely used)',
              'This becomes the primary grade'
            ]
          },
          {
            id: 'identify-secondary',
            title: 'Identify Secondary Pattern',
            description: 'Find the second most common cancer pattern',
            details: [
              'Look for second most prevalent pattern',
              'Assign grade 1-5',
              'This becomes the secondary grade',
              'If only one pattern present, use same grade twice'
            ]
          },
          {
            id: 'calculate-score',
            title: 'Calculate Gleason Score',
            description: 'Add primary and secondary grades together',
            details: [
              'Gleason Score = Primary + Secondary',
              'Example: 3 + 4 = 7',
              'Order matters: 3+4 vs 4+3 have different prognosis',
              'Reported as "3+4=7" format'
            ]
          },
          {
            id: 'tertiary-grade',
            title: 'Tertiary Grade (if present)',
            description: 'Note any small component of higher-grade pattern',
            details: [
              'Small amount of more aggressive pattern',
              'Reported as "3+4 with tertiary pattern 5"',
              'Influences prognosis and treatment',
              'Becoming more commonly reported'
            ]
          }
        ],
        layout: 'horizontal'
      }
    },
    {
      id: 'gleason-score-significance',
      type: 'statistics',
      title: 'Gleason Score Clinical Significance',
      data: {
        statistics: [
          {
            id: 'gleason-6',
            label: 'Gleason 6 (3+3)',
            value: 'Low Risk',
            description: 'Very low risk of recurrence, often managed with active surveillance',
            trend: 'up',
            context: 'Best possible score in modern practice'
          },
          {
            id: 'gleason-7-3-4',
            label: 'Gleason 7 (3+4)',
            value: 'Intermediate Risk',
            description: 'Moderate risk, predominantly pattern 3 with some pattern 4',
            trend: 'stable',
            context: 'Better prognosis than 4+3'
          },
          {
            id: 'gleason-7-4-3',
            label: 'Gleason 7 (4+3)',
            value: 'Intermediate-High Risk',
            description: 'Higher risk than 3+4, predominantly pattern 4',
            trend: 'down',
            context: 'More aggressive than 3+4'
          },
          {
            id: 'gleason-8-10',
            label: 'Gleason 8-10',
            value: 'High Risk',
            description: 'High risk of recurrence and metastasis',
            trend: 'down',
            context: 'Requires aggressive treatment'
          }
        ],
        layout: 'vertical'
      }
    },
    {
      id: 'modern-grading-systems',
      type: 'comparison',
      title: 'Modern Grading: Grade Groups vs. Gleason',
      data: {
        title: 'Epstein/Hopkins Grade Group System',
        description: 'Dr. Epstein and colleagues developed a simplified 1-5 grading system to reduce patient confusion.',
        items: [
          {
            id: 'traditional-gleason',
            title: 'Traditional Gleason System',
            description: 'Original scoring system still widely used',
            features: [
              'Gleason 6 (3+3) = "6 out of 10" confuses patients',
              'Scores range from 6-10 in practice',
              'Patients ask "why not 1 out of 10?"',
              'Sum of primary + secondary patterns',
              'Well-established, extensive research base'
            ],
            metadata: {
              range: '6-10 (in practice)',
              confusion: 'Patient misunderstanding common'
            }
          },
          {
            id: 'grade-groups',
            title: 'Grade Group System',
            description: 'Simplified 1-5 system gaining adoption',
            features: [
              'Grade Group 1 = Gleason 6 (3+3)',
              'Grade Group 2 = Gleason 7 (3+4)',
              'Grade Group 3 = Gleason 7 (4+3)',
              'Grade Group 4 = Gleason 8',
              'Grade Group 5 = Gleason 9-10'
            ],
            metadata: {
              range: '1-5',
              clarity: 'Reduces patient confusion'
            }
          }
        ],
        layout: 'grid'
      }
    },
    {
      id: 'partin-tables',
      type: 'introduction',
      title: 'Partin Tables for Prediction',
      data: {
        content: 'Partin Tables are statistical models that use a patient\'s PSA, Gleason score, and clinical stage to predict the final pathological stage after surgery. They help estimate the likelihood of organ-confined disease, extracapsular extension, seminal vesicle invasion, and lymph node involvement, guiding crucial treatment decisions before surgery is performed.',
        highlights: [
          { type: 'info', title: 'Purpose', content: 'Predict pathological stage pre-surgery' },
          { type: 'info', title: 'Inputs', content: 'Uses PSA, Gleason, and clinical T stage' },
          { type: 'info', title: 'Outputs', content: 'Estimates probabilities of various outcomes' }
        ],
        learningObjectives: [
          'Understand what Partin Tables are and their purpose',
          'Know the inputs used to generate predictions',
          'Interpret the predictive outputs for treatment planning'
        ]
      }
    },
    {
      id: 'staging-integration',
      type: 'process',
      title: 'Integrating Staging and Grading',
      data: {
        title: 'Combining All Information for Treatment Planning',
        description: 'Modern prostate cancer management requires integration of TNM staging, Gleason grading, and PSA levels.',
        steps: [
          {
            id: 'clinical-assessment',
            title: 'Clinical Assessment',
            description: 'Gather all staging and grading information',
            details: [
              'PSA level and trends',
              'Digital rectal exam findings',
              'Biopsy results with Gleason score',
              'Imaging results (MRI, CT, bone scan if indicated)'
            ]
          },
          {
            id: 'assign-tnm',
            title: 'Assign TNM Stage',
            description: 'Determine clinical stage based on imaging',
            details: [
              'T stage: Based on DRE and MRI findings',
              'N stage: Based on CT scan results',
              'M stage: Based on bone scan and other imaging',
              'Clinical vs. pathological staging'
            ]
          },
          {
            id: 'risk-stratification',
            title: 'Risk Stratification',
            description: 'Combine staging and grading for risk assessment',
            details: [
              'Low risk: T1-T2a, Gleason ≤6, PSA <10',
              'Intermediate risk: T2b-T2c, Gleason 7, PSA 10-20',
              'High risk: T3a, Gleason 8-10, PSA >20',
              'Use tools like Partin Tables for refinement'
            ]
          },
          {
            id: 'treatment-planning',
            title: 'Treatment Planning',
            description: 'Select appropriate treatment based on risk',
            details: [
              'Low risk: Active surveillance or local therapy',
              'Intermediate risk: Local therapy ± adjuvant treatment',
              'High risk: Multimodal therapy',
              'Consider patient factors (age, health, preferences)'
            ]
          }
        ],
        layout: 'vertical'
      }
    },
    {
      id: 'gleason-summary',
      type: 'comparison',
      title: 'Gleason vs. Grade Groups',
      data: {
        title: 'Comparing Gleason Scores and Grade Groups',
        description: 'Grade Groups simplify the prognostic information from Gleason scores.',
        items: [
          {
            id: 'gleason-system',
            title: 'Gleason Scoring System',
            description: 'Sum of the two most common cancer patterns (1-5)',
            features: [
              'Scores range from 6 to 10 for prostate cancer',
              'Gleason 7 can be 3+4 or 4+3 with different prognoses',
              'Can be confusing for patients (e.g., lowest score is 6)',
              'Developed in the 1960s'
            ]
          },
          {
            id: 'grade-group-system',
            title: 'Grade Group System',
            description: 'A simpler 1-5 scale directly corresponding to prognosis',
            features: [
              'Grade Group 1 (Gleason 6)',
              'Grade Group 2 (Gleason 3+4)',
              'Grade Group 3 (Gleason 4+3)',
              'Grade Group 4 (Gleason 8)',
              'Grade Group 5 (Gleason 9-10)'
            ]
          }
        ],
        layout: 'grid'
      }
    },
    {
      id: 'grade-groups',
      type: 'statistics',
      title: 'Prognosis by Grade Group',
      data: {
        statistics: [
          {
            id: 'gg1',
            label: 'Grade Group 1 (Gleason 6)',
            value: '>95%',
            description: '5-year biochemical recurrence-free survival',
            trend: 'up',
            context: 'Excellent prognosis, often suitable for active surveillance.'
          },
          {
            id: 'gg2',
            label: 'Grade Group 2 (Gleason 3+4=7)',
            value: '80-90%',
            description: '5-year biochemical recurrence-free survival',
            trend: 'up',
            context: 'Good prognosis, definitive treatment usually recommended.'
          },
          {
            id: 'gg3',
            label: 'Grade Group 3 (Gleason 4+3=7)',
            value: '60-70%',
            description: '5-year biochemical recurrence-free survival',
            trend: 'down',
            context: 'More aggressive, higher risk of recurrence.'
          },
          {
            id: 'gg4',
            label: 'Grade Group 4 (Gleason 8)',
            value: '40-50%',
            description: '5-year biochemical recurrence-free survival',
            trend: 'down',
            context: 'High-risk disease, requires aggressive treatment.'
          },
          {
            id: 'gg5',
            label: 'Grade Group 5 (Gleason 9-10)',
            value: '<30%',
            description: '5-year biochemical recurrence-free survival',
            trend: 'down',
            context: 'Very high-risk, often requires multi-modal therapy.'
          }
        ],
        layout: 'vertical'
      }
    },
    {
      id: 'summary',
      type: 'summary',
      title: 'Grading & Staging Summary',
      data: {
        keyTakeaways: [
          'Prostate cancer is found with ultrasound/biopsy, and staged with imaging',
          'TNM system stages local, regional, and distant spread',
          'Gleason score + Grade Group provide crucial prognostic information',
          'Accurate staging is essential for appropriate treatment planning'
        ],
        assessmentQuestions: [
          'What is the most common site for prostate cancer to arise?',
          'Describe the key components of the TNM staging system.',
          'How is a Gleason score calculated and what does it represent?'
        ],
        nextSteps: [
          'Explore localized treatment options for prostate cancer',
          'Learn about advanced treatments for metastatic disease'
        ],
        relatedTopics: [
          'Localized Prostate Cancer Treatment',
          'Advanced Prostate Cancer Treatment'
        ]
      }
    }
  ]
};