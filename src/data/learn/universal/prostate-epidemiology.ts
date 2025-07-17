import { UniversalContent } from '@/types/universal-content';

export const prostateEpidemiologyContent: UniversalContent = {
  meta: {
    id: 'prostate-epidemiology',
    title: 'Prostate Cancer Epidemiology',
    description: 'Global patterns of prostate cancer incidence, mortality, and demographic variations',
    estimatedDuration: 20,
    difficulty: 'intermediate',
    color: 'green',
    author: 'Dr. Ken Pienta',
    lastUpdated: '2024-01-15',
    tags: ['epidemiology', 'global-health', 'demographics', 'statistics']
  },
  sections: [
    {
      id: 'global-overview',
      type: 'introduction',
      title: 'Global Prostate Cancer Overview',
      data: {
        content: 'Prostate cancer is the most common cancer in men and a major global health challenge. Over one million men worldwide are diagnosed each year, with significant variations across different populations and regions.',
        highlights: [
          { title: 'Global Impact', content: 'Most common cancer in men globally', type: 'info' },
          { title: 'High Incidence', content: '1+ million new cases diagnosed yearly worldwide', type: 'info' },
          { title: 'Significant Mortality', content: 'Second leading cause of cancer death in men', type: 'warning' },
          { title: 'Wide Variation', content: 'Incidence varies 25-fold between different populations', type: 'info' }
        ],
        learningObjectives: [
          'Understand the global burden of prostate cancer',
          'Identify demographic and geographic variations',
          'Compare incidence and mortality rates across populations',
          'Recognize factors contributing to epidemiological patterns'
        ]
      }
    },
    {
      id: 'us-statistics',
      type: 'statistics',
      title: 'United States Statistics',
      data: {
        statistics: [
          {
            id: 'lifetime-risk',
            label: 'Lifetime Risk',
            value: '1 in 7',
            description: 'Men in the US will be diagnosed with prostate cancer in their lifetime',
            trend: 'stable',
            context: 'Approximately 14.3% lifetime risk'
          },
          {
            id: 'annual-cases',
            label: 'Annual New Cases',
            value: '220,000',
            description: 'New prostate cancer cases diagnosed yearly in the US',
            trend: 'stable',
            context: 'Range: 200,000-230,000 cases per year'
          },
          {
            id: 'annual-deaths',
            label: 'Annual Deaths',
            value: '27,000',
            description: 'Men die from prostate cancer each year in the US',
            trend: 'down',
            context: 'Second leading cause of cancer death in men'
          },
          {
            id: 'cancer-rank',
            label: 'Cancer Ranking',
            value: '#1',
            description: 'Most common cancer in men (excluding skin cancer)',
            trend: 'stable',
            context: 'Consistently the most diagnosed cancer in men'
          }
        ],
        layout: 'grid'
      }
    },
    {
      id: 'global-statistics',
      type: 'statistics',
      title: 'Global Statistics',
      data: {
        statistics: [
          {
            id: 'global-cases',
            label: 'Global Annual Cases',
            value: '1.1 Million',
            description: 'Men diagnosed with prostate cancer worldwide each year',
            trend: 'up',
            context: 'Represents 15% of all cancers in men'
          },
          {
            id: 'global-deaths',
            label: 'Global Annual Deaths',
            value: '300,000',
            description: 'Deaths attributed to prostate cancer yearly worldwide',
            trend: 'up',
            context: '5th leading cause of cancer death in men globally'
          },
          {
            id: 'developed-countries',
            label: 'Developed Countries',
            value: '70%',
            description: 'Of prostate cancer cases occur in more developed countries',
            trend: 'stable',
            context: 'Higher incidence in developed nations'
          },
          {
            id: 'cancer-death-percentage',
            label: 'Cancer Deaths',
            value: '7%',
            description: 'Of total cancer deaths in men worldwide',
            trend: 'stable',
            context: 'Significant contributor to male cancer mortality'
          }
        ],
        layout: 'grid'
      }
    },
    {
      id: 'geographic-variation',
      type: 'comparison',
      title: 'Geographic Variation in Incidence',
      data: {
        title: 'Prostate Cancer Incidence Varies Dramatically Worldwide',
        description: 'Prostate cancer incidence varies more than 25-fold worldwide, with highest rates in developed countries and lowest in Asian populations.',
        items: [
          {
            id: 'highest-incidence',
            title: 'Highest Incidence Regions',
            description: 'Areas with the highest prostate cancer rates',
            features: [
              'Australia and New Zealand',
              'Northern America (US and Canada)',
              'Northern and Western Europe',
              'Age-adjusted rates: 60-120 per 100,000 men'
            ],
            metadata: {
              rate: '60-120 per 100,000',
              factors: 'Screening, lifestyle, genetics'
            }
          },
          {
            id: 'moderate-incidence',
            title: 'Moderate Incidence Regions',
            description: 'Areas with intermediate prostate cancer rates',
            features: [
              'Southern and Eastern Europe',
              'South America',
              'Some parts of Africa',
              'Age-adjusted rates: 20-60 per 100,000 men'
            ],
            metadata: {
              rate: '20-60 per 100,000',
              factors: 'Mixed screening practices, varying lifestyles'
            }
          },
          {
            id: 'lowest-incidence',
            title: 'Lowest Incidence Regions',
            description: 'Areas with the lowest prostate cancer rates',
            features: [
              'Asian populations (China, Japan, India)',
              'Some African regions',
              'Age-adjusted rates: 2-20 per 100,000 men',
              'Rural China: ~2% lifetime risk vs US 17%'
            ],
            metadata: {
              rate: '2-20 per 100,000',
              factors: 'Diet, genetics, limited screening'
            }
          }
        ],
        layout: 'side_by_side'
      }
    },
    {
      id: 'age-demographics',
      type: 'statistics',
      title: 'Age and Demographic Patterns',
      data: {
        statistics: [
          {
            id: 'age-65-plus',
            label: 'Age 65+ Cases',
            value: '60%',
            description: 'Of prostate cancer cases diagnosed in men 65 or older',
            trend: 'stable',
            context: 'Primarily a disease of older men'
          },
          {
            id: 'median-age',
            label: 'Median Age at Diagnosis',
            value: '66 years',
            description: 'Average age when prostate cancer is diagnosed',
            trend: 'stable',
            context: 'Range typically 66-70 years'
          },
          {
            id: 'under-40-risk',
            label: 'Under Age 40 Risk',
            value: '1 in 10,000',
            description: 'Men under 40 will be diagnosed with prostate cancer',
            trend: 'stable',
            context: 'Extremely rare in young men'
          },
          {
            id: 'autopsy-findings',
            label: 'Autopsy Studies',
            value: '30-80%',
            description: 'Of men have prostate cancer at autopsy (age-dependent)',
            trend: 'stable',
            context: '30% in 50s, 80% in 70s - often undiagnosed'
          }
        ],
        layout: 'horizontal'
      }
    },
    {
      id: 'racial-ethnic-disparities',
      type: 'comparison',
      title: 'Racial and Ethnic Disparities',
      data: {
        title: 'Significant Disparities Exist Across Racial and Ethnic Groups',
        description: 'Prostate cancer incidence and mortality vary significantly by race and ethnicity, with African American men having the highest risk.',
        items: [
          {
            id: 'african-american',
            title: 'African American Men',
            description: 'Highest risk group globally',
            features: [
              'Highest incidence rates worldwide',
              '2.5x more likely to die from prostate cancer',
              'Often diagnosed at younger ages',
              'More likely to have aggressive disease',
              'Reasons for disparity not fully understood'
            ],
            metadata: {
              incidence: 'Highest globally',
              mortality: '2.5x higher than Caucasian',
              age: 'Often younger at diagnosis'
            }
          },
          {
            id: 'caucasian',
            title: 'Caucasian Men',
            description: 'Intermediate risk group',
            features: [
              'Moderate to high incidence rates',
              'Standard reference group for comparisons',
              'Good access to screening in developed countries',
              'Intermediate mortality rates'
            ],
            metadata: {
              incidence: 'Moderate-high',
              mortality: 'Intermediate',
              screening: 'Good access'
            }
          },
          {
            id: 'asian',
            title: 'Asian Men',
            description: 'Lowest risk group traditionally',
            features: [
              'Lowest incidence rates globally',
              'Risk increases when migrating to Western countries',
              'Genetic and lifestyle factors protective',
              'Lower mortality rates'
            ],
            metadata: {
              incidence: 'Lowest globally',
              migration: 'Risk increases with Western lifestyle',
              protection: 'Genetic and dietary factors'
            }
          }
        ],
        layout: 'cards'
      }
    },
    {
      id: 'trends-projections',
      type: 'timeline',
      title: 'Trends and Future Projections',
      data: {
        title: 'Prostate Cancer Epidemiological Trends',
        description: 'As populations age globally, prostate cancer incidence is expected to continue rising, particularly in developing countries.',
        events: [
          {
            id: 'historical-low',
            title: 'Pre-1990s: Low Reported Incidence',
            date: 'Before 1990',
            description: 'Limited screening led to lower reported incidence rates',
            details: [
              'Minimal PSA screening',
              'Many cases undiagnosed',
              'Focus on symptomatic disease'
            ]
          },
          {
            id: 'psa-era',
            title: 'PSA Screening Era',
            date: '1990s-2010s',
            description: 'Widespread PSA adoption led to dramatic increase in diagnoses',
            details: [
              'Sharp increase in incidence',
              'Earlier stage detection',
              'Concerns about overdiagnosis'
            ]
          },
          {
            id: 'current-era',
            title: 'Current: Refined Screening',
            date: '2010s-Present',
            description: 'More selective screening approaches being adopted',
            details: [
              'Risk-based screening strategies',
              'Improved diagnostic tools',
              'Focus on clinically significant cancer'
            ]
          },
          {
            id: 'future-projections',
            title: 'Future: Global Aging',
            date: '2030s and Beyond',
            description: 'Aging populations will drive continued increases globally',
            details: [
              'Increased incidence in developing countries',
              'Growing elderly populations',
              'Need for global screening strategies'
            ]
          }
        ]
      }
    },
    {
      id: 'summary',
      type: 'summary',
      title: 'Epidemiology Summary',
      data: {
        keyTakeaways: [
          'Prostate cancer is the most common cancer in men, with 1+ million cases yearly worldwide',
          'Incidence varies 25-fold globally, highest in developed countries, lowest in Asia',
          'African American men have the highest risk and mortality rates',
          'Primarily affects older men (median age 66), rare before age 40',
          'As populations age globally, incidence will continue to rise'
        ],
        nextSteps: [
          'Explore specific risk factors that contribute to these epidemiological patterns',
          'Learn about prevention strategies and lifestyle modifications',
          'Understand how these patterns inform screening recommendations'
        ],
        relatedTopics: [
          'Risk Factors & Prevention',
          'Screening & Diagnosis',
          'Advanced Screening Methods'
        ]
      }
    }
  ]
}; 