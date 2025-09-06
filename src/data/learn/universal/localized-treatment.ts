import { UniversalContent } from '@/types/universal-content';

export const localizedTreatmentContent: UniversalContent = {
  meta: {
    id: 'localized-treatment',
    title: 'Treatment of Localized Prostate Cancer',
    description: 'Comprehensive guide to surgery, radiation, active surveillance, and risk-based treatment strategies',
    estimatedDuration: 40,
    difficulty: 'advanced',
    color: 'emerald',
    author: 'Dr. Ken Pienta',
    lastUpdated: '2024-01-15',
    tags: ['treatment', 'surgery', 'radiation', 'active-surveillance', 'risk-stratification']
  },
  sections: [
    {
      id: 'introduction',
      type: 'introduction',
      title: 'Introduction to Prostate Cancer Treatment',
      data: {
        content: 'Approximately 50% of all people diagnosed with cancer in the United States are cured by surgery or radiation. A cancer diagnosis is not a death sentence. Treatment selection depends on cancer risk category, life expectancy, and patient preferences.',
        highlights: [
          { type: 'info', title: 'Surgery and radiation provide backbone of cancer therapy', content: 'Surgery and radiation provide backbone of cancer therapy' },
          { type: 'info', title: '50% of cancer patients cured by local treatment', content: '50% of cancer patients cured by local treatment' },
          { type: 'info', title: 'Treatment guided by risk of recurrence', content: 'Treatment guided by risk of recurrence' },
          { type: 'info', title: 'Multiple effective options for most patients', content: 'Multiple effective options for most patients' }
        ],
        learningObjectives: [
          'Understand when active surveillance, radiation, and surgery are used',
          'Learn about risk stratification for treatment decisions',
          'Recognize treatment side effects and their management',
          'Apply risk-based treatment algorithms to clinical scenarios'
        ]
      }
    },
    {
      id: 'treatment-modalities',
      type: 'cards',
      title: 'Main Treatment Modalities',
      data: {
        cards: [
          {
            id: 'surgery',
            title: 'Radical Prostatectomy',
            content: 'Surgical removal of the entire prostate, seminal vesicles, and nearby lymph nodes.',
            icon: '🔪',
            type: 'expand',
            expandedContent: {
              details: [
                'Open approach: Incision between umbilicus and pubic bone',
                'Laparoscopic: Multiple small incisions with camera guidance',
                'Robotic: Surgeon-controlled robotic arms (most common in US)',
                'Nerve-sparing techniques preserve erectile function when possible',
                'Removes prostate, seminal vesicles, ± lymph nodes'
              ],
              statistics: 'Most prostatectomies in US are robotic-assisted'
            }
          },
          {
            id: 'radiation',
            title: 'Radiation Therapy',
            content: 'High-energy beams that kill cancer cells through DNA damage leading to programmed cell death.',
            icon: '☢️',
            type: 'expand',
            expandedContent: {
              details: [
                'External beam: 75-80 Gray over ~7 weeks',
                'IMRT: Computer-controlled precise targeting',
                'IGRT: Real-time imaging guidance',
                'Brachytherapy: Radioactive seeds implanted in prostate',
                'Proton beam: Theoretical advantage, similar outcomes'
              ],
              statistics: 'IMRT is most common external beam technique'
            }
          },
          {
            id: 'active-surveillance',
            title: 'Active Surveillance',
            content: 'Close monitoring of low-risk cancer without immediate treatment.',
            icon: '👁️',
            type: 'expand',
            expandedContent: {
              details: [
                'PSA every 6 months',
                'DRE every 12 months',
                'Repeat biopsy every 12-24 months',
                '~30% eventually need treatment',
                'Avoids treatment side effects for indolent cancers'
              ],
              statistics: 'Safe approach for very low and low-risk disease'
            }
          },
          {
            id: 'hormone-therapy',
            title: 'Hormone Therapy',
            content: 'Blocks testosterone to slow cancer growth, used with radiation for higher-risk disease.',
            icon: '💊',
            type: 'expand',
            expandedContent: {
              details: [
                'LHRH agonists (leuprolide) block testosterone production',
                'Antiandrogens (bicalutamide) block androgen receptors',
                'Used 4 months to 3 years depending on risk',
                'Neoadjuvant: Before radiation',
                'Adjuvant: After radiation'
              ],
              statistics: 'Standard for high-risk disease with radiation'
            }
          }
        ],
        layout: 'grid',
        columns: 2
      }
    },
    {
      id: 'surgical-techniques',
      type: 'comparison',
      title: 'Surgical Approaches Comparison',
      data: {
        title: 'Different Surgical Techniques for Radical Prostatectomy',
        description: 'Multiple surgical approaches exist, each with specific advantages and considerations.',
        items: [
          {
            id: 'open-surgery',
            title: 'Open Radical Prostatectomy',
            description: 'Traditional open surgical approach',
            features: [
              'Single large incision in lower abdomen',
              'Direct visualization and tactile feedback',
              'Established technique with long track record',
              'No special equipment required',
              'Longer recovery time'
            ],
            metadata: {
              recovery: '6-8 weeks',
              bloodLoss: 'Higher',
              experience: 'Extensive'
            }
          },
          {
            id: 'laparoscopic-surgery',
            title: 'Laparoscopic Prostatectomy',
            description: 'Minimally invasive approach',
            features: [
              'Multiple small incisions (5-6 ports)',
              'Camera and long instruments',
              'Magnified visualization',
              'Less blood loss and faster recovery',
              'Requires specialized training'
            ],
            metadata: {
              recovery: '4-6 weeks',
              bloodLoss: 'Lower',
              experience: 'Moderate'
            }
          },
          {
            id: 'robotic-surgery',
            title: 'Robotic-Assisted Prostatectomy',
            description: 'Most common approach in US',
            features: [
              'Surgeon controls robotic arms from console',
              '3D high-definition visualization',
              'Enhanced dexterity and precision',
              'Tremor elimination',
              'Requires expensive equipment and training'
            ],
            metadata: {
              recovery: '4-6 weeks',
              bloodLoss: 'Lowest',
              experience: 'Growing rapidly'
            }
          }
        ],
        layout: 'grid'
      }
    },
    {
      id: 'nerve-sparing',
      type: 'cards',
      title: 'Nerve-Sparing Surgery',
      data: {
        cards: [
          {
            id: 'nerve-anatomy',
            title: 'Nerve Bundle Anatomy',
            content: 'Nerves controlling erections run in bundles along both sides of the prostate.',
            icon: '🧠',
            type: 'expand',
            expandedContent: {
              details: [
                'Cavernous nerves run alongside prostate',
                'Control erectile function',
                'Can be preserved during surgery if cancer allows',
                'Bilateral preservation best for function',
                'Unilateral preservation may maintain some function'
              ],
              statistics: 'Nerve preservation attempted when oncologically safe'
            }
          },
          {
            id: 'nerve-outcomes',
            title: 'Nerve-Sparing Outcomes',
            content: 'Erectile function outcomes depend on nerve preservation and patient factors.',
            icon: '📊',
            type: 'expand',
            expandedContent: {
              details: [
                'Both nerves preserved: Best chance of function recovery',
                'One nerve preserved: Partial function possible',
                'No nerves preserved: Permanent erectile dysfunction',
                'Recovery may take months to years',
                'Age and pre-surgery function important factors'
              ],
              statistics: 'Function recovery varies widely by patient'
            }
          }
        ],
        layout: 'grid',
        columns: 2
      }
    },
    {
      id: 'radiation-types',
      type: 'cards',
      title: 'Types of Radiation Therapy',
      data: {
        cards: [
          {
            id: 'external-beam',
            title: 'External Beam Radiation (EBRT)',
            content: 'Radiation delivered from outside the body using linear accelerators.',
            icon: '🎯',
            type: 'expand',
            expandedContent: {
              details: [
                'IMRT: Intensity-modulated radiation therapy (most common)',
                'IGRT: Image-guided radiation therapy',
                'VMAT: Volumetric modulated arc therapy',
                '75-80 Gray total dose over 7-8 weeks',
                'Daily treatments Monday-Friday'
              ],
              statistics: 'Standard treatment for intermediate/high-risk disease'
            }
          },
          {
            id: 'brachytherapy',
            title: 'Brachytherapy (Seed Implantation)',
            content: 'Radioactive seeds placed directly into the prostate tissue.',
            icon: '🌾',
            type: 'expand',
            expandedContent: {
              details: [
                'LDR: ~100 permanent seeds (Iodine-125, Palladium-103)',
                'HDR: Temporary high-dose seeds (Iridium-192)',
                'Used for low-risk disease alone',
                'Combined with EBRT for higher-risk disease',
                'Single procedure for LDR'
              ],
              statistics: 'Best for early-stage, low-grade disease'
            }
          },
          {
            id: 'proton-therapy',
            title: 'Proton Beam Therapy',
            content: 'Uses protons instead of X-rays for potentially more precise treatment.',
            icon: '⚛️',
            type: 'expand',
            expandedContent: {
              details: [
                'Protons release energy at specific depth',
                'Theoretically less damage to normal tissues',
                'Limited availability, very expensive',
                'Studies show similar outcomes to IMRT',
                'Side effects similar to conventional radiation'
              ],
              statistics: 'Theoretical advantage not proven clinically'
            }
          }
        ],
        layout: 'grid',
        columns: 1
      }
    },
    {
      id: 'treatment-side-effects',
      type: 'comparison',
      title: 'Treatment Side Effects Comparison',
      data: {
        title: 'Understanding Side Effects of Different Treatments',
        description: 'All treatments have potential side effects. Understanding these helps inform treatment decisions.',
        items: [
          {
            id: 'surgery-side-effects',
            title: 'Radical Prostatectomy',
            description: 'Surgical side effects',
            features: [
              'Incontinence: 50% at 6 months, 20% at 5 years',
              'Erectile dysfunction: 80% at 6 months and 5 years',
              'Usually stress incontinence (leakage with activity)',
              'Bowel function rarely affected',
              'Rectal injury very rare'
            ],
            metadata: {
              recovery: 'Immediate effects',
              continence: 'Gradual improvement',
              function: 'Age-dependent recovery'
            }
          },
          {
            id: 'radiation-side-effects',
            title: 'External Beam Radiation',
            description: 'Radiation therapy side effects',
            features: [
              'Incontinence: 5% at 6 months and 5 years',
              'Erectile dysfunction: 75% at 6 months and 5 years',
              'Rectal bleeding: <5% (usually painless)',
              'Loose stools: <5%',
              'Late urethral stricture possible'
            ],
            metadata: {
              recovery: 'Gradual onset',
              continence: 'Rarely affected',
              function: 'Progressive decline'
            }
          },
          {
            id: 'brachytherapy-side-effects',
            title: 'Brachytherapy',
            description: 'Seed implantation side effects',
            features: [
              'Urinary function rarely affected',
              'Sexual function similar to EBRT',
              'Low rates of radiation proctitis',
              'Rectal pain/burning possible',
              'Usually improves over time'
            ],
            metadata: {
              recovery: 'Generally well tolerated',
              continence: 'Minimal impact',
              function: 'Similar to EBRT'
            }
          },
          {
            id: 'hormone-side-effects',
            title: 'Hormone Therapy',
            description: 'Androgen deprivation side effects',
            features: [
              'Hot flashes',
              'Loss of libido',
              'Decreased muscle mass',
              'Decreased bone density',
              'Weight gain and fatigue'
            ],
            metadata: {
              recovery: 'Reversible when stopped',
              duration: 'Throughout treatment',
              function: 'Significant impact'
            }
          }
        ],
        layout: 'grid'
      }
    },
    {
      id: 'risk-categories',
      type: 'cards',
      title: 'Risk Categories for Treatment Planning',
      data: {
        cards: [
          {
            id: 'very-low-risk',
            title: 'Very Low-Risk',
            content: 'T1c, Gleason 6, PSA <10, PSA density <0.15, low volume disease.',
            icon: '🟢',
            type: 'expand',
            expandedContent: {
              details: [
                'T1c (PSA-detected, not palpable)',
                'Gleason score 6',
                'PSA <10 ng/mL',
                'PSA density <0.15',
                '<3 positive cores, <50% cancer in each core'
              ],
              statistics: 'Excellent prognosis, often managed with surveillance'
            }
          },
          {
            id: 'low-risk',
            title: 'Low-Risk',
            content: 'T1-T2a, Gleason 6, PSA <10. Similar to very low-risk but without volume restrictions.',
            icon: '🟡',
            type: 'expand',
            expandedContent: {
              details: [
                'T1-T2a (small palpable lesion allowed)',
                'Gleason score 6',
                'PSA <10 ng/mL',
                'No PSA density or volume restrictions',
                'T2a = ≤50% of one side of prostate'
              ],
              statistics: 'Very good prognosis, multiple treatment options'
            }
          },
          {
            id: 'intermediate-risk',
            title: 'Intermediate-Risk',
            content: 'T2b-T2c OR Gleason 7 OR PSA 10-20. Any one criterion qualifies.',
            icon: '🟠',
            type: 'expand',
            expandedContent: {
              details: [
                'T2b (>50% of one side) OR T2c (both sides)',
                'Gleason score 7 (3+4 or 4+3)',
                'PSA 10-20 ng/mL',
                'Only one criterion needed for classification',
                'Further subdivided by number of risk factors'
              ],
              statistics: 'Moderate risk, requires careful treatment selection'
            }
          },
          {
            id: 'high-risk',
            title: 'High-Risk',
            content: 'T3a OR Gleason 8-10 OR PSA >20. Requires aggressive treatment approach.',
            icon: '🔴',
            type: 'expand',
            expandedContent: {
              details: [
                'T3a (extracapsular extension)',
                'Gleason score 8-10',
                'PSA >20 ng/mL',
                'Significant risk of recurrence',
                'Usually requires multimodal therapy'
              ],
              statistics: 'High recurrence risk, aggressive treatment needed'
            }
          }
        ],
        layout: 'grid',
        columns: 2
      }
    },
    {
      id: 'treatment-by-risk',
      type: 'process',
      title: 'Treatment Selection by Risk Category',
      data: {
        title: 'Risk-Based Treatment Algorithm',
        description: 'Treatment recommendations vary by risk category and life expectancy.',
        steps: [
          {
            id: 'very-low-low-risk',
            title: 'Very Low & Low-Risk Disease',
            description: 'Multiple options including surveillance',
            details: [
              'Life expectancy <10 years: Observation',
              'Life expectancy 10-20 years: Active surveillance preferred',
              'Life expectancy >20 years: Patient choice',
              'Options: Active surveillance, surgery, radiation, brachytherapy',
              'All treatments considered equally effective'
            ]
          },
          {
            id: 'intermediate-risk',
            title: 'Intermediate-Risk Disease',
            description: 'Treatment varies by life expectancy',
            details: [
              'Life expectancy <10 years: Radiation ± hormones',
              'Life expectancy >10 years: Add surgery as option',
              'Hormone therapy 4-6 months with radiation',
              'Surgery with lymph node dissection',
              'Multiple effective options available'
            ]
          },
          {
            id: 'high-very-high-risk',
            title: 'High & Very High-Risk Disease',
            description: 'Aggressive multimodal approach',
            details: [
              'No life expectancy stratification',
              'External beam radiation + 2-3 years hormone therapy',
              'OR radical prostatectomy + lymph node dissection',
              'Hormone therapy standard with radiation',
              'Surgery requires lymph node sampling'
            ]
          },
          {
            id: 'follow-up',
            title: 'Post-Treatment Follow-up',
            description: 'Monitoring for recurrence',
            details: [
              'PSA every 6-12 months for 5 years, then yearly',
              'First 2 years: PSA every 3 months if high risk',
              'DRE yearly (optional if PSA undetectable post-surgery)',
              'Radiation patients: DRE not optional',
              'Majority of patients cured by local treatment'
            ]
          }
        ],
        layout: 'vertical'
      }
    },
    {
      id: 'active-surveillance-details',
      type: 'cards',
      title: 'Active Surveillance in Detail',
      data: {
        cards: [
          {
            id: 'surveillance-protocol',
            title: 'Surveillance Protocol',
            content: 'Systematic monitoring approach for low-risk prostate cancer.',
            icon: '📋',
            type: 'expand',
            expandedContent: {
              details: [
                'PSA every 6 months',
                'Digital rectal exam every 12 months',
                'Repeat prostate biopsy every 12-24 months',
                'Patient education about warning signs',
                'Regular physician consultations'
              ],
              statistics: 'Safe approach proven in multiple studies'
            }
          },
          {
            id: 'surveillance-outcomes',
            title: 'Surveillance Outcomes',
            content: 'What happens to men on active surveillance over time.',
            icon: '📈',
            type: 'expand',
            expandedContent: {
              details: [
                '~30% eventually require treatment',
                'Upgrade usually due to sampling, not progression',
                'Avoids treatment side effects',
                'Quality of life preserved',
                'Cancer-specific survival excellent'
              ],
              statistics: '70% remain on surveillance long-term'
            }
          },
          {
            id: 'surveillance-triggers',
            title: 'Triggers for Treatment',
            content: 'When to exit surveillance and proceed to treatment.',
            icon: '⚠️',
            type: 'expand',
            expandedContent: {
              details: [
                'Grade progression (Gleason 7 or higher)',
                'Volume progression (more cores positive)',
                'PSA kinetics (rapid rise)',
                'Patient anxiety/preference',
                'New symptoms'
              ],
              statistics: 'Most common trigger is grade progression'
            }
          }
        ],
        layout: 'grid',
        columns: 1
      }
    },
    {
      id: 'treatment-complications',
      type: 'statistics',
      title: 'Treatment Complication Rates',
      data: {
        statistics: [
          {
            id: 'surgery-continence',
            label: 'Surgery - Continence Recovery',
            value: '80% at 5 years',
            description: 'Percentage of men continent (no pads) 5 years after surgery',
            trend: 'up',
            context: 'Most incontinence is stress-related (with activity)'
          },
          {
            id: 'radiation-continence',
            label: 'Radiation - Continence Issues',
            value: '5% need pads',
            description: 'Percentage requiring pads at 6 months and 5 years',
            trend: 'stable',
            context: 'Continence rarely affected by radiation'
          },
          {
            id: 'erectile-dysfunction-baseline',
            label: 'Baseline ED (Untreated Men)',
            value: '30% → 70%',
            description: 'ED rates in untreated men: 30% at diagnosis, 70% at 5 years',
            trend: 'stable',
            context: 'ED is largely age and health-related'
          },
          {
            id: 'treatment-effectiveness',
            label: 'Local Treatment Cure Rate',
            value: '>90%',
            description: 'Percentage of localized prostate cancer cured by surgery or radiation',
            trend: 'up',
            context: 'Most men with localized disease are cured'
          }
        ],
        layout: 'grid'
      }
    },
    {
      id: 'hormone-therapy-mechanism',
      type: 'process',
      title: 'How Hormone Therapy Works',
      data: {
        title: 'Testosterone Suppression Pathway',
        description: 'Understanding how hormone therapy blocks testosterone to slow prostate cancer growth.',
        steps: [
          {
            id: 'normal-pathway',
            title: 'Normal Testosterone Production',
            description: 'Brain signals testicles to produce testosterone',
            details: [
              'Hypothalamus releases LHRH',
              'Pituitary releases LH',
              'Testicles produce testosterone (90%)',
              'Adrenals contribute steroids (10%)',
              'Testosterone → DHT in prostate cells'
            ]
          },
          {
            id: 'cancer-stimulation',
            title: 'Cancer Cell Stimulation',
            description: 'Testosterone promotes prostate cancer growth',
            details: [
              'Testosterone enters cancer cells',
              'Converted to dihydrotestosterone (DHT)',
              'Binds to androgen receptor',
              'Receptor moves to nucleus',
              'Stimulates cell proliferation'
            ]
          },
          {
            id: 'hormone-blockade',
            title: 'Hormone Therapy Blockade',
            description: 'Medications interrupt testosterone pathway',
            details: [
              'LHRH agonists (leuprolide) block brain signals',
              'Antiandrogens (bicalutamide) block receptors',
              'Testicles stop producing testosterone',
              'Cancer cells lose growth stimulus',
              'Tumor shrinkage and growth control'
            ]
          },
          {
            id: 'clinical-use',
            title: 'Clinical Application',
            description: 'How hormone therapy is used with other treatments',
            details: [
              'Neoadjuvant: 4-6 months before radiation',
              'Concurrent: During radiation therapy',
              'Adjuvant: 2-3 years total for high-risk disease',
              'Improves radiation effectiveness',
              'Reduces recurrence risk'
            ]
          }
        ],
        layout: 'horizontal'
      }
    },
    {
      id: 'nccn-guidelines',
      type: 'cards',
      title: 'NCCN Guidelines Summary',
      data: {
        cards: [
          {
            id: 'nccn-overview',
            title: 'What are NCCN Guidelines?',
            content: 'National Comprehensive Cancer Network guidelines provide evidence-based treatment recommendations.',
            icon: '📖',
            type: 'expand',
            expandedContent: {
              details: [
                'Developed by panel of experts',
                'Based on clinical evidence and experience',
                'Updated regularly (usually yearly)',
                'Widely adopted by oncologists',
                'Guide treatment decisions worldwide'
              ],
              statistics: 'Gold standard for cancer treatment recommendations'
            }
          },
          {
            id: 'risk-stratification-basis',
            title: 'Risk Stratification Basis',
            content: 'Guidelines based on monitoring thousands of men after treatment over many years.',
            icon: '📊',
            type: 'expand',
            expandedContent: {
              details: [
                'Based on PSA, clinical stage, Gleason score',
                'Incorporates PSA density for very low-risk',
                'Considers life expectancy',
                'Validated in large patient populations',
                'Predicts risk of recurrence'
              ],
              statistics: 'Evidence from decades of follow-up data'
            }
          }
        ],
        layout: 'grid',
        columns: 2
      }
    },
    {
      id: 'summary',
      type: 'summary',
      title: 'Localized Treatment Summary',
      data: {
        keyTakeaways: [
          'Surgery and radiation are equally effective for localized prostate cancer',
          'Active surveillance is safe for very low and low-risk disease',
          'Treatment selection depends on risk category and life expectancy',
          'High-risk disease requires multimodal therapy with hormone therapy',
          'Most men with localized prostate cancer are cured by treatment'
        ],
        nextSteps: [
          'Learn about treatment of advanced prostate cancer',
          'Understand management of treatment side effects',
          'Explore quality of life considerations',
          'Study long-term follow-up strategies'
        ],
        relatedTopics: [
          'Advanced Prostate Cancer Treatment',
          'Managing Treatment Side Effects',
          'Quality of Life After Treatment',
          'Prostate Cancer Survivorship'
        ],
        assessmentQuestions: [
          'What are the main treatment options for localized prostate cancer?',
          'When is active surveillance appropriate?',
          'How do treatment side effects differ between surgery and radiation?',
          'What defines high-risk prostate cancer?'
        ]
      }
    }
  ]
}; 