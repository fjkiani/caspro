import { UniversalContent } from '../../../types/universal-content';

export const advancedTreatmentContent: UniversalContent = {
  meta: {
    id: 'advanced-treatment',
    title: 'Treatment of Advanced Prostate Cancer',
    description: 'Comprehensive overview of treatment options for metastatic and castrate-resistant prostate cancer',
    estimatedDuration: 25,
    difficulty: 'advanced',
    color: 'red',
    author: 'Dr. Ken Pienta',
    lastUpdated: '2024-01-15',
    tags: ['advanced-treatment', 'hormonal-therapy', 'chemotherapy', 'precision-medicine', 'immunotherapy']
  },
  sections: [
    {
      id: 'introduction',
      type: 'introduction',
      title: 'Introduction to Advanced Prostate Cancer Treatment',
      data: {
        content: 'Advanced prostate cancer represents a significant clinical challenge, with nearly 100% of men having bone involvement at the time of death. This section explores the comprehensive treatment landscape for metastatic and castrate-resistant prostate cancer.',
        keyPoints: [
          'Metastases are predominantly osteoblastic (bone-forming)',
          'Treatment progresses from hormonal therapy to targeted agents',
          'Precision medicine is revolutionizing treatment selection',
          'Clinical trials remain crucial for advancing care'
        ],
        learningObjectives: [
          'Understand hormonal therapy mechanisms and applications',
          'Explain supra-castration agents and their role',
          'Summarize chemotherapy use in advanced disease',
          'Describe emerging immunotherapy and targeted treatments',
          'Appreciate the role of genomic testing in treatment selection'
        ]
      }
    },
    {
      id: 'first-line-hormonal',
      type: 'process',
      title: 'First-Line Hormonal Therapy',
      data: {
        title: 'Androgen Deprivation Therapy (ADT)',
        description: 'The foundation of advanced prostate cancer treatment targets the testosterone pathway that drives cancer growth.',
        steps: [
          {
            title: 'Hypothalamic-Pituitary-Gonadal Axis',
            description: 'Understanding the testosterone production pathway',
            details: [
              'Hypothalamus secretes LHRH to pituitary',
              'Pituitary releases LH to testicles',
              'Testicles produce 90% of circulating testosterone',
              'Adrenals contribute 10% via steroid metabolism'
            ]
          },
          {
            title: 'Testosterone Action in Cancer Cells',
            description: 'How testosterone promotes cancer growth',
            details: [
              'Testosterone enters prostate cancer cells',
              'Converted to dihydrotestosterone (DHT) by 5α-reductase',
              'DHT binds to androgen receptor (AR)',
              'AR-DHT complex moves to nucleus and promotes proliferation'
            ]
          },
          {
            title: 'LHRH Analogs/Antagonists',
            description: 'Medications that suppress testosterone production',
            details: [
              'Eligard, Zoladex, Trelstar, Vantas (agonists)',
              'Firmagon (antagonist)',
              'Lupron (most commonly used)',
              'Achieve medical castration without surgery'
            ]
          },
          {
            title: 'Androgen Receptor Blockers',
            description: 'Drugs that block testosterone binding',
            details: [
              'Bicalutamide (Casodex) - most common in US',
              'Flutamide (Eulexin)',
              'Nilutamide (Nilandron)',
              'Often used in combination with LHRH analogs'
            ]
          }
        ]
      }
    },
    {
      id: 'hormonal-effectiveness',
      type: 'statistics',
      title: 'Effectiveness of First-Line Hormonal Therapy',
      data: {
        title: 'Survival Outcomes with ADT',
        description: 'Clinical trial data demonstrating the effectiveness of hormonal therapy in metastatic disease.',
        statistics: [
          {
            id: 'median-survival',
            value: '5-6 years',
            label: 'Median Overall Survival',
            description: 'Average survival from start of hormonal therapy for metastatic disease',
            trend: 'stable'
          },
          {
            id: 'adt-alone',
            value: '44 months',
            label: 'ADT Alone (CHAARTED)',
            description: 'Median survival with androgen deprivation therapy only',
            trend: 'baseline'
          },
          {
            id: 'adt-docetaxel',
            value: '58 months',
            label: 'ADT + Docetaxel',
            description: 'Median survival with combination therapy in CHAARTED study',
            trend: 'up'
          },
          {
            id: 'high-volume-disease',
            value: '32 vs 50 months',
            label: 'High-Volume Disease',
            description: 'ADT alone vs ADT + chemotherapy in extensive disease',
            trend: 'up'
          }
        ]
      }
    },
    {
      id: 'chaarted-study',
      type: 'comparison',
      title: 'CHAARTED Study Impact',
      data: {
        title: 'Paradigm Shift in First-Line Treatment',
        description: 'The CHAARTED study revolutionized treatment of newly diagnosed metastatic prostate cancer.',
        items: [
          {
            id: 'traditional-approach',
            title: 'Traditional Approach',
            description: 'ADT alone as first-line therapy, with treatments added sequentially.',
            features: [
              'ADT alone as first-line therapy',
              'Sequential addition of treatments',
              'Chemotherapy reserved for later stages',
              'Median survival 44 months (all patients)'
            ],
            advantages: ['Well-tolerated', 'Established safety profile'],
            disadvantages: ['Suboptimal outcomes in high-volume disease', 'Delayed use of effective agents']
          },
          {
            id: 'chaarted-protocol',
            title: 'CHAARTED Protocol',
            description: 'Upfront ADT with docetaxel chemotherapy, based on disease volume.',
            features: [
              'ADT + 6 cycles of docetaxel upfront',
              'Combination therapy from diagnosis',
              'Stratification by disease volume',
              'Median survival 58 months (all patients)'
            ],
            advantages: ['Improved survival in high-volume disease', 'Early use of effective therapy'],
            disadvantages: ['Increased toxicity upfront', 'Not beneficial in low-volume disease']
          }
        ]
      }
    },
    {
      id: 'hormonal-side-effects',
      type: 'cards',
      title: 'Side Effects of Hormonal Therapy',
      data: {
        title: 'Consequences of Low Testosterone',
        description: 'Comprehensive overview of side effects resulting from androgen deprivation therapy.',
        cards: [
          {
            title: 'Sexual Function',
            content: 'Reduced or absent libido, erectile dysfunction, genital atrophy',
            color: 'red'
          },
          {
            title: 'Vasomotor Symptoms',
            content: 'Hot flashes (may improve over time), night sweats',
            color: 'blue'
          },
          {
            title: 'Physical Changes',
            content: 'Breast tenderness/growth, loss of muscle mass, weight gain',
            color: 'orange'
          },
          {
            title: 'Bone Health',
            content: 'Osteoporosis, increased fracture risk, bone density loss',
            color: 'red'
          },
          {
            title: 'Metabolic Effects',
            content: 'Increased cholesterol, insulin resistance, diabetes risk',
            color: 'yellow'
          },
          {
            title: 'Neuropsychiatric',
            content: 'Fatigue, decreased mental sharpness, depression',
            color: 'purple'
          }
        ]
      }
    },
    {
      id: 'castrate-resistance',
      type: 'process',
      title: 'Development of Castrate Resistance',
      data: {
        title: 'Mechanisms of Treatment Resistance',
        description: 'Understanding how prostate cancer escapes hormonal therapy and develops castrate resistance.',
        steps: [
          {
            title: 'AR Amplification',
            description: 'Primary mechanism of resistance',
            details: [
              'Cancer cells increase androgen receptor numbers',
              'Enhanced sensitivity to low testosterone levels',
              'Allows growth despite castrate testosterone levels',
              'Most common resistance mechanism'
            ]
          },
          {
            title: 'AR Mutations',
            description: 'Gain-of-function alterations',
            details: [
              'Mutations allow AR self-activation',
              'Independence from testosterone binding',
              'Constitutively active receptors',
              'Ligand-independent signaling'
            ]
          },
          {
            title: 'AR Splice Variants',
            description: 'Truncated receptor forms',
            details: [
              'Loss of ligand-binding domain',
              'Constitutively active AR-V7 variant',
              'Predicts resistance to AR-targeted therapy',
              'Biomarker for treatment selection'
            ]
          },
          {
            title: 'Intracrine Synthesis',
            description: 'Local testosterone production',
            details: [
              'Cancer cells produce own androgens',
              'Independent of circulating testosterone',
              'Bypass systemic androgen suppression',
              'Target for novel therapies'
            ]
          }
        ]
      }
    },
    {
      id: 'second-line-hormonal',
      type: 'comparison',
      title: 'Second-Line Hormonal Therapy',
      data: {
        title: 'Supra-Castration Agents',
        description: 'Advanced hormonal therapies for castrate-resistant prostate cancer.',
        items: [
          {
            id: 'abiraterone',
            title: 'Abiraterone (Zytiga)',
            description: 'An androgen synthesis inhibitor that blocks testosterone production in all tissues.',
            features: [
              'Androgen synthesis inhibitor',
              'Blocks CYP17A1 enzyme',
              'Prevents testosterone production in all tissues',
              'Requires corticosteroid co-administration'
            ],
            advantages: [
              'Well-tolerated',
              'Minimal fatigue',
              'No seizure risk',
              'Extends survival ~5 months'
            ],
            disadvantages: [
              'Requires steroid use',
              'Can worsen diabetes',
              'Mineralocorticoid excess',
              'Drug interactions'
            ]
          },
          {
            id: 'enzalutamide',
            title: 'Enzalutamide (Xtandi)',
            description: 'A next-generation androgen receptor antagonist with high binding affinity.',
            features: [
              'Next-generation AR antagonist',
              'High-affinity AR binding',
              'Blocks AR nuclear translocation',
              'Inhibits DNA binding'
            ],
            advantages: [
              'No steroid requirement',
              'Potent AR inhibition',
              'Oral administration',
              'Extends survival ~5 months'
            ],
            disadvantages: [
              'Severe fatigue (common)',
              'Seizure risk (rare)',
              'Drug interactions',
              'Falls risk in elderly'
            ]
          }
        ]
      }
    },
    {
      id: 'ar-v7-testing',
      type: 'statistics',
      title: 'AR-V7 Biomarker Testing',
      data: {
        title: 'Predicting Response to AR-Targeted Therapy',
        description: 'AR-V7 splice variant testing helps predict response to abiraterone and enzalutamide.',
        statistics: [
          {
            id: 'psa-response-neg',
            value: '70%+',
            label: 'PSA Response (AR-V7 Negative)',
            description: 'Patients without AR-V7 show good PSA decline',
            trend: 'up'
          },
          {
            id: 'psa-response-pos',
            value: '<20%',
            label: 'PSA Response (AR-V7 Positive)',
            description: 'Patients with AR-V7 rarely respond to AR-targeted therapy',
            trend: 'down'
          },
          {
            id: 'median-survival-neg',
            value: '16.8 months',
            label: 'Median Survival (AR-V7 Negative)',
            description: 'Better survival in AR-V7 negative patients',
            trend: 'up'
          },
          {
            id: 'median-survival-pos',
            value: '10.8 months',
            label: 'Median Survival (AR-V7 Positive)',
            description: 'Poorer survival in AR-V7 positive patients',
            trend: 'down'
          }
        ]
      }
    },
    {
      id: 'chemotherapy',
      type: 'cards',
      title: 'Chemotherapy for Advanced Prostate Cancer',
      data: {
        title: 'Cytotoxic Therapy Options',
        description: 'Chemotherapy agents used in castrate-resistant prostate cancer and their mechanisms.',
        cards: [
          {
            title: 'Docetaxel (Taxotere)',
            content: 'First-line chemotherapy. Microtubule inhibitor. ~3 months survival benefit. Given every 3 weeks.',
            color: 'blue'
          },
          {
            title: 'Cabazitaxel (Jevtana)',
            content: 'Second-line chemotherapy. Microtubule inhibitor. ~2-3 months survival benefit. More diarrhea.',
            color: 'green'
          },
          {
            title: 'Mitoxantrone (Novantrone)',
            content: 'Older agent. DNA intercalator. Palliative benefit. Rarely used due to limited survival benefit.',
            color: 'gray'
          },
          {
            title: 'Mechanism of Action',
            content: 'Interfere with cell division by blocking microtubules. Rapidly dividing cancer cells more susceptible.',
            color: 'purple'
          }
        ]
      }
    },
    {
      id: 'chemo-side-effects',
      type: 'cards',
      title: 'Chemotherapy Side Effects',
      data: {
        title: 'Expected Toxicities',
        description: 'Common side effects of chemotherapy targeting rapidly dividing cells.',
        cards: [
          {
            title: 'Hematologic',
            content: 'Neutropenia, increased infection risk, thrombocytopenia, anemia',
            color: 'red'
          },
          {
            title: 'Gastrointestinal',
            content: 'Nausea, vomiting, diarrhea (especially cabazitaxel), mucositis',
            color: 'orange'
          },
          {
            title: 'Neurologic',
            content: 'Peripheral neuropathy, numbness/tingling in fingers and toes',
            color: 'yellow'
          },
          {
            title: 'General',
            content: 'Alopecia, fatigue, loss of appetite, rare allergic reactions',
            color: 'blue'
          }
        ]
      }
    },
    {
      id: 'novel-therapies',
      type: 'comparison',
      title: 'Novel Therapeutic Approaches',
      data: {
        title: 'Emerging Treatment Modalities',
        description: 'Innovative therapies beyond traditional hormonal and chemotherapy approaches.',
        items: [
          {
            id: 'sipuleucel-t',
            title: 'Sipuleucel-T (Provenge)',
            description: "A personalized cancer vaccine that uses the patient's own immune cells.",
            features: [
              'Autologous cellular immunotherapy',
              'Personalized cancer vaccine',
              'Three treatments over 4 weeks',
              'Targets prostatic acid phosphatase (PAP)'
            ],
            advantages: [
              'Survival benefit (several months)',
              'Minimal side effects',
              'Well-tolerated',
              'No PSA effect (not a concern)'
            ],
            disadvantages: [
              'Complex manufacturing process',
              'Expensive treatment',
              'Limited to asymptomatic patients',
              'No PSA or imaging response'
            ]
          },
          {
            id: 'radium-223',
            title: 'Radium-223 (Xofigo)',
            description: 'An alpha-emitting radiopharmaceutical that mimics calcium to target bone metastases.',
            features: [
              'Alpha-emitting radiopharmaceutical',
              'Calcium-mimetic bone targeting',
              'Six injections every 4 weeks',
              'Systemic bone-directed therapy'
            ],
            advantages: [
              'Survival benefit (several months)',
              'Significant pain reduction',
              'Bone-specific targeting',
              'Minimal systemic toxicity'
            ],
            disadvantages: [
              'Limited to bone-only disease',
              'Hematologic toxicity',
              'Expensive treatment',
              'Requires nuclear medicine expertise'
            ]
          }
        ]
      }
    },
    {
      id: 'treatment-sequence',
      type: 'timeline',
      title: 'Treatment Sequencing Strategy',
      data: {
        title: 'Optimal Treatment Sequence for CRPC',
        description: 'Evidence-based approach to sequencing treatments in castrate-resistant prostate cancer.',
        events: [
          {
            id: 'crpc-diagnosis',
            date: 'Diagnosis',
            title: 'CRPC Confirmed',
            description: 'Rising PSA despite castrate testosterone levels',
            details: ['Confirm castrate testosterone <50 ng/dL', 'Document progression', 'Assess symptoms and disease burden']
          },
          {
            id: 'first-line-crpc',
            date: 'First-Line',
            title: 'Asymptomatic/Minimally Symptomatic',
            description: 'Consider Sipuleucel-T for eligible patients',
            details: ['Bone-only or limited disease', 'Good performance status', 'Minimal symptoms']
          },
          {
            id: 'second-line-crpc',
            date: 'Second-Line',
            title: 'AR-Targeted Therapy',
            description: 'Abiraterone or Enzalutamide',
            details: ['Check AR-V7 status if available', 'Consider patient factors', 'Monitor for resistance']
          },
          {
            id: 'third-line-crpc',
            date: 'Third-Line',
            title: 'Alternative AR Agent',
            description: 'Switch to other AR-targeted therapy',
            details: ['If AR-V7 negative', 'Cross-resistance possible', 'Consider chemotherapy if AR-V7 positive']
          },
          {
            id: 'fourth-line-crpc',
            date: 'Fourth-Line',
            title: 'Chemotherapy',
            description: 'Docetaxel or consider Radium-223',
            details: ['Docetaxel if symptomatic', 'Radium-223 if bone pain/bone-only disease', 'Clinical trial consideration']
          },
          {
            id: 'fifth-line-crpc',
            date: 'Fifth-Line',
            title: 'Subsequent Therapy',
            description: 'Cabazitaxel, clinical trials',
            details: ['Second-line chemotherapy', 'Investigational agents', 'Supportive care focus']
          }
        ]
      }
    },
    {
      id: 'precision-medicine',
      type: 'cards',
      title: 'Precision Medicine in Prostate Cancer',
      data: {
        title: 'Genomic Testing and Targeted Therapy',
        description: 'Molecular profiling to guide treatment selection and identify clinical trial opportunities.',
        cards: [
          {
            title: 'DNA Repair Defects',
            content: '~20% of CRPC patients have BRCA1/2, ATM mutations. Respond to PARP inhibitors and platinum therapy.',
            color: 'blue'
          },
          {
            title: 'Mismatch Repair Deficiency',
            content: 'MLH1/MSH2 mutations predict response to immunotherapy (pembrolizumab, nivolumab).',
            color: 'green'
          },
          {
            title: 'AR Pathway Alterations',
            content: 'AR amplification/mutations predict response to AR-targeted therapies (abiraterone, enzalutamide).',
            color: 'purple'
          },
          {
            title: 'PI3K/PTEN Pathway',
            content: 'PTEN loss, PI3K mutations. Multiple clinical trials targeting this pathway available.',
            color: 'orange'
          }
        ]
      }
    },
    {
      id: 'clinical-trials',
      type: 'process',
      title: 'Clinical Trials in Advanced Prostate Cancer',
      data: {
        title: 'Advancing Treatment Through Research',
        description: 'Understanding clinical trial phases and their role in improving outcomes for advanced prostate cancer.',
        steps: [
          {
            title: 'Phase I Trials',
            description: 'Dose-finding and safety studies',
            details: [
              'Determine maximum tolerated dose',
              'Assess safety and toxicity profile',
              'Usually not cancer-specific',
              'Small patient numbers (20-100)'
            ]
          },
          {
            title: 'Phase II Trials',
            description: 'Efficacy testing in specific cancer types',
            details: [
              'Test effectiveness at determined dose',
              'Prostate cancer-specific studies',
              'Larger patient groups (100-300)',
              'Preliminary efficacy data'
            ]
          },
          {
            title: 'Phase III Trials',
            description: 'Comparison with standard of care',
            details: [
              'Randomized controlled studies',
              'Compare new treatment to current standard',
              'Large patient populations (300-3000)',
              'Can lead to FDA approval'
            ]
          },
          {
            title: 'Resources for Patients',
            description: 'Finding appropriate clinical trials',
            details: [
              'ClinicalTrials.gov - comprehensive database',
              'American Cancer Society resources',
              'ASCO patient information',
              'Institution-specific trial listings'
            ]
          }
        ]
      }
    },
    {
      id: 'summary',
      type: 'summary',
      title: 'Treatment Summary',
      data: {
        keyTakeaways: [
          'Advanced prostate cancer treatment follows a sequential approach from hormonal therapy to chemotherapy',
          'CHAARTED study established combination ADT + docetaxel for high-volume metastatic disease',
          'Second-line hormonal agents (abiraterone, enzalutamide) extend survival by ~5 months',
          'AR-V7 testing can predict resistance to AR-targeted therapies',
          'Novel therapies include immunotherapy (Sipuleucel-T) and targeted radiotherapy (Radium-223)',
          'Precision medicine using genomic testing is increasingly important for treatment selection',
          'Clinical trials remain crucial for advancing care and should be considered throughout treatment'
        ],
        clinicalPearls: [
          'Nearly 100% of men with prostate cancer have bone involvement at death',
          'Castrate resistance develops through multiple mechanisms, primarily AR amplification',
          'Treatment sequencing should consider patient symptoms, disease burden, and molecular features',
          'Genomic testing can identify ~20% of patients with DNA repair defects eligible for targeted therapy',
          'Supportive care with bone-strengthening agents is essential throughout treatment'
        ],
        nextSteps: [
          'Review supportive care measures for advanced prostate cancer',
          'Understand bone health management in metastatic disease',
          'Learn about palliative care integration',
          'Explore emerging immunotherapy approaches'
        ]
      }
    }
  ]
}; 