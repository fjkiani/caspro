import { UniversalContent } from '@/types/universal-content';

export const prostateRiskFactorsContent: UniversalContent = {
  meta: {
    id: 'prostate-risk-factors',
    title: 'Prostate Cancer Risk Factors',
    description: 'Understanding the factors that increase or decrease prostate cancer risk, from genetics to lifestyle',
    estimatedDuration: 30,
    difficulty: 'intermediate',
    color: 'orange',
    author: 'Dr. Ken Pienta',
    lastUpdated: '2024-01-15',
    tags: ['risk-factors', 'prevention', 'genetics', 'lifestyle']
  },
  sections: [
    {
      id: 'introduction',
      type: 'introduction',
      title: 'Understanding Prostate Cancer Risk',
      data: {
        content: 'There are five main risk factors for prostate cancer: age, ethnicity, family history, genetics, and diet. Understanding these factors helps identify men at higher risk and informs prevention strategies.',
        highlights: [
          { title: 'Age Factor', content: 'Age is the strongest risk factor', type: 'warning' },
          { title: 'Racial Disparity', content: 'African American men have highest risk', type: 'warning' },
          { title: 'Genetic Link', content: 'Family history doubles risk', type: 'warning' },
          { title: 'Gene Mutations', content: 'Specific genes increase risk significantly', type: 'danger' },
          { title: 'Lifestyle Influence', content: 'Diet and lifestyle play important roles', type: 'info' }
        ],
        learningObjectives: [
          'Identify the five main prostate cancer risk factors',
          'Understand how age affects prostate cancer risk',
          'Recognize genetic and familial risk patterns',
          'Distinguish between modifiable and non-modifiable risk factors'
        ]
      }
    },
    {
      id: 'main-risk-factors',
      type: 'cards',
      title: 'The Five Main Risk Factors',
      data: {
        cards: [
          {
            id: 'age',
            title: 'Age',
            content: 'The strongest risk factor. Prostate cancer occurs mainly in older men, with 6 in 10 cases diagnosed in men 65 or older.',
            icon: '👴',
            type: 'basic',
            metadata: {
              type: 'Non-modifiable',
              impact: 'Very High'
            }
          },
          {
            id: 'ethnicity',
            title: 'Race/Ethnicity',
            content: 'African American men have the highest risk, while Asian men have the lowest risk globally.',
            icon: '🌍',
            type: 'basic',
            metadata: {
              type: 'Non-modifiable',
              impact: 'High'
            }
          },
          {
            id: 'family-history',
            title: 'Family History',
            content: 'Having a father or brother with prostate cancer more than doubles risk, especially if diagnosed young.',
            icon: '👨‍👩‍👦',
            type: 'basic',
            metadata: {
              type: 'Non-modifiable',
              impact: 'High'
            }
          },
          {
            id: 'genetics',
            title: 'Genetic Mutations',
            content: 'Mutations in genes like BRCA1, BRCA2, and HOXB13 significantly increase prostate cancer risk.',
            icon: '🧬',
            type: 'basic',
            metadata: {
              type: 'Non-modifiable',
              impact: 'Very High'
            }
          },
          {
            id: 'diet',
            title: 'Diet & Lifestyle',
            content: 'High-fat, low-vegetable diets increase risk. Obesity and lack of exercise may promote aggressive disease.',
            icon: '🥗',
            type: 'basic',
            metadata: {
              type: 'Modifiable',
              impact: 'Moderate'
            }
          }
        ],
        layout: 'grid',
        columns: 2
      }
    },
    {
      id: 'age-risk-details',
      type: 'statistics',
      title: 'Age and Prostate Cancer Risk',
      data: {
        statistics: [
          {
            id: 'under-40',
            label: 'Under Age 40',
            value: '1 in 10,000',
            description: 'Men under 40 will develop prostate cancer',
            trend: 'stable',
            context: 'Extremely rare in young men'
          },
          {
            id: 'age-40-59',
            label: 'Ages 40-59',
            value: '1 in 38',
            description: 'Men in their 40s and 50s will develop prostate cancer',
            trend: 'stable',
            context: 'Risk begins to increase'
          },
          {
            id: 'age-60-69',
            label: 'Ages 60-69',
            value: '1 in 14',
            description: 'Men in their 60s will develop prostate cancer',
            trend: 'stable',
            context: 'Significant risk increase'
          },
          {
            id: 'median-age',
            label: 'Average Age at Diagnosis',
            value: '66-70 years',
            description: 'Most men diagnosed in late 60s',
            trend: 'stable',
            context: 'Peak incidence in elderly'
          },
          {
            id: 'autopsy-findings',
            label: 'Autopsy Studies',
            value: '30% (50s) → 80% (70s)',
            description: 'Percentage with prostate cancer at autopsy by age',
            trend: 'stable',
            context: 'Many cases never diagnosed clinically'
          }
        ],
        layout: 'vertical'
      }
    },
    {
      id: 'genetic-risk-factors',
      type: 'cards',
      title: 'Genetic Risk Factors',
      data: {
        cards: [
          {
            id: 'brca1-brca2',
            title: 'BRCA1 & BRCA2 Mutations',
            content: 'Men with BRCA mutations have significantly higher prostate cancer risk and more aggressive disease.',
            icon: '🧬',
            type: 'expand',
            expandedContent: {
              details: [
                'Originally discovered in breast/ovarian cancer families',
                'BRCA2 mutations particularly increase prostate cancer risk',
                '10% of metastatic prostate cancer patients have germline mutations',
                'Another 10% develop somatic mutations during cancer development',
                'Associated with more aggressive, earlier-onset disease'
              ],
              statistics: 'Higher risk of metastatic disease'
            }
          },
          {
            id: 'hoxb13',
            title: 'HOXB13 Gene',
            content: 'Mutations in HOXB13 are associated with hereditary prostate cancer, especially early-onset cases.',
            icon: '🔬',
            type: 'expand',
            expandedContent: {
              details: [
                'Found in hereditary prostate cancer families',
                'Associated with earlier age of onset',
                'More common in certain populations',
                'Being studied for screening implications'
              ],
              statistics: 'Significantly increased risk in carriers'
            }
          },
          {
            id: 'dna-repair-genes',
            title: 'DNA Repair Genes',
            content: 'Mutations in MSH2, MLH1, and other DNA repair genes increase prostate cancer risk.',
            icon: '🔧',
            type: 'expand',
            expandedContent: {
              details: [
                'Part of Lynch syndrome gene family',
                'Impair ability to repair DNA damage',
                'Associated with multiple cancer types',
                'May respond better to certain treatments'
              ],
              statistics: 'Moderate to high increased risk'
            }
          }
        ],
        layout: 'grid',
        columns: 1
      }
    },
    {
      id: 'family-history-details',
      type: 'statistics',
      title: 'Family History Impact',
      data: {
        statistics: [
          {
            id: 'father-brother',
            label: 'Father or Brother with Prostate Cancer',
            value: '2x Risk',
            description: 'Having a first-degree relative doubles prostate cancer risk',
            trend: 'stable',
            context: 'Most significant family history factor'
          },
          {
            id: 'young-diagnosis',
            label: 'Family Member Diagnosed <55',
            value: 'Higher Risk',
            description: 'Risk further increased if family member diagnosed young',
            trend: 'stable',
            context: 'Early onset suggests genetic component'
          },
          {
            id: 'multiple-relatives',
            label: 'Three or More Family Members',
            value: 'Very High Risk',
            description: 'Risk substantially increased with multiple affected relatives',
            trend: 'stable',
            context: 'Suggests hereditary prostate cancer syndrome'
          }
        ],
        layout: 'horizontal'
      }
    },
    {
      id: 'racial-ethnic-factors',
      type: 'comparison',
      title: 'Racial and Ethnic Risk Differences',
      data: {
        title: 'Significant Variations Exist by Race and Ethnicity',
        description: 'Prostate cancer risk varies dramatically by racial and ethnic background, with complex interactions between genetics and environment.',
        items: [
          {
            id: 'african-american-risk',
            title: 'African American Men',
            description: 'Highest risk group globally',
            features: [
              'Highest incidence rates worldwide',
              '2.5x more likely to die from prostate cancer',
              'Often diagnosed at younger ages',
              'More likely to have aggressive disease',
              'Reasons not fully understood - likely genetic and social factors'
            ],
            metadata: {
              risk: 'Highest',
              mortality: '2.5x higher',
              onset: 'Earlier'
            }
          },
          {
            id: 'asian-protection',
            title: 'Asian Men',
            description: 'Lowest risk group with protective factors',
            features: [
              'Lowest incidence rates globally (2% vs 17% lifetime risk)',
              'Traditional Asian diet appears protective',
              'Risk increases when moving to Western countries',
              'Genetic factors likely protective',
              'Soy consumption may be protective'
            ],
            metadata: {
              risk: 'Lowest',
              migration: 'Risk increases',
              diet: 'Protective factors'
            }
          }
        ],
        layout: 'side_by_side'
      }
    },
    {
      id: 'geographic-lifestyle',
      type: 'statistics',
      title: 'Geographic and Lifestyle Factors',
      data: {
        statistics: [
          {
            id: 'latitude-effect',
            label: 'Northern Latitude (>40°)',
            value: 'Higher Risk',
            description: 'Men living north of 40° latitude have higher prostate cancer mortality',
            trend: 'stable',
            context: 'Possibly due to reduced vitamin D from sunlight'
          },
          {
            id: 'rural-china',
            label: 'Rural China vs US',
            value: '2% vs 17%',
            description: 'Lifetime risk comparison shows dramatic geographic differences',
            trend: 'stable',
            context: 'Not due to screening differences - likely diet/lifestyle'
          },
          {
            id: 'western-migration',
            label: 'Asian Migration to West',
            value: 'Risk Increases',
            description: 'Asian men adopting Western lifestyle see increased prostate cancer risk',
            trend: 'up',
            context: 'Suggests environmental/dietary factors important'
          }
        ],
        layout: 'horizontal'
      }
    },
    {
      id: 'diet-lifestyle-details',
      type: 'comparison',
      title: 'Diet and Lifestyle Risk Factors',
      data: {
        title: 'Modifiable Risk Factors',
        description: 'While genetics and age cannot be changed, diet and lifestyle factors offer opportunities for risk reduction.',
        items: [
          {
            id: 'risk-increasing',
            title: 'Risk-Increasing Factors',
            description: 'Dietary and lifestyle factors that may increase risk',
            features: [
              'Diet high in red meat and animal fat',
              'Diet low in vegetables, especially cruciferous vegetables',
              'Obesity and lack of exercise',
              'Smoking (associated with more aggressive disease)',
              'Agent Orange exposure (Vietnam veterans)'
            ],
            metadata: {
              type: 'Risk Factors',
              modifiable: 'Yes',
              evidence: 'Moderate to strong'
            }
          },
          {
            id: 'protective-factors',
            title: 'Potentially Protective Factors',
            description: 'Factors that may reduce prostate cancer risk',
            features: [
              'Diet high in vegetables, especially broccoli family',
              'Soy consumption (traditional Asian diets)',
              'Regular physical activity',
              'Maintaining healthy weight',
              'Adequate vitamin D levels'
            ],
            metadata: {
              type: 'Protective Factors',
              modifiable: 'Yes',
              evidence: 'Moderate'
            }
          }
        ],
        layout: 'side_by_side'
      }
    },
    {
      id: 'myths-facts',
      type: 'comparison',
      title: 'Myths vs. Facts About Prostate Cancer Risk',
      data: {
        title: 'Common Misconceptions About Prostate Cancer Risk',
        description: 'Many myths exist about prostate cancer risk factors. It\'s important to distinguish fact from fiction.',
        items: [
          {
            id: 'myths',
            title: 'MYTHS (Not Risk Factors)',
            description: 'These do NOT increase prostate cancer risk',
            features: [
              'Benign prostatic hyperplasia (BPH)',
              'Prostatitis (prostate infection)',
              'Sexual activity level',
              'Vasectomy',
              'Bicycle riding',
              'Alcohol consumption'
            ],
            metadata: {
              evidence: 'No association found',
              misconception: 'Common myths'
            }
          },
          {
            id: 'facts',
            title: 'FACTS (Real Risk Factors)',
            description: 'These DO increase prostate cancer risk',
            features: [
              'Advanced age (strongest factor)',
              'African American ethnicity',
              'Family history of prostate cancer',
              'Genetic mutations (BRCA1/2, HOXB13)',
              'High-fat, low-vegetable diet',
              'Geographic location (northern latitudes)'
            ],
            metadata: {
              evidence: 'Strong scientific evidence',
              actionable: 'Some modifiable'
            }
          }
        ],
        layout: 'side_by_side'
      }
    },
    {
      id: 'prevention-strategies',
      type: 'process',
      title: 'Prostate Cancer Prevention Strategies',
      data: {
        title: 'Evidence-Based Prevention Approaches',
        description: 'While there are no proven prevention strategies, certain lifestyle modifications may reduce risk or promote overall health.',
        steps: [
          {
            id: 'healthy-diet',
            title: 'Adopt a Healthy Diet',
            description: 'Focus on plant-based foods and limit red meat consumption',
            details: [
              'Increase vegetable intake, especially cruciferous vegetables',
              'Limit red meat and high-fat foods',
              'Consider soy products (if tolerated)',
              'Maintain balanced nutrition'
            ]
          },
          {
            id: 'physical-activity',
            title: 'Stay Physically Active',
            description: 'Regular exercise may reduce risk of aggressive prostate cancer',
            details: [
              'Engage in regular aerobic exercise',
              'Maintain healthy body weight',
              'Include strength training',
              'Aim for 150 minutes moderate activity weekly'
            ]
          },
          {
            id: 'healthy-weight',
            title: 'Maintain Healthy Weight',
            description: 'Obesity is associated with more aggressive prostate cancer',
            details: [
              'Monitor BMI and waist circumference',
              'Follow balanced diet',
              'Regular physical activity',
              'Avoid excessive weight gain with age'
            ]
          },
          {
            id: 'risk-awareness',
            title: 'Know Your Risk',
            description: 'Understanding personal risk helps guide screening decisions',
            details: [
              'Discuss family history with healthcare provider',
              'Consider genetic counseling if strong family history',
              'Understand ethnic/racial risk factors',
              'Make informed screening decisions'
            ]
          }
        ],
        layout: 'vertical'
      }
    },
    {
      id: 'summary',
      type: 'summary',
      title: 'Risk Factors Summary',
      data: {
        keyTakeaways: [
          'Age is the strongest risk factor - most cases occur after age 65',
          'African American men have the highest risk, Asian men the lowest',
          'Family history doubles risk, especially with early-onset or multiple relatives',
          'Genetic mutations (BRCA1/2, HOXB13) significantly increase risk',
          'Diet and lifestyle factors are modifiable and may influence risk'
        ],
        nextSteps: [
          'Learn about prostate cancer screening guidelines and methods',
          'Understand how risk factors influence screening recommendations',
          'Explore advanced screening tests for high-risk individuals'
        ],
        relatedTopics: [
          'Prostate Cancer Screening',
          'Advanced Screening Methods',
          'Genetic Counseling'
        ],
        assessmentQuestions: [
          'What are the five main risk factors for prostate cancer?',
          'How does age affect prostate cancer risk?',
          'Which racial group has the highest prostate cancer risk?',
          'What lifestyle modifications might reduce prostate cancer risk?'
        ]
      }
    }
  ]
}; 