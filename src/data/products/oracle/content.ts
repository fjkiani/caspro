// Discriminative AI Capabilities - Complete endpoint definitions and metrics
export const discriminativeAIContent = {
  // Core Discriminative Endpoints
  endpoints: {
    variantImpact: {
      id: 'predict_variant_impact',
      name: 'Variant Impact Prediction',
      description: 'Predicts functional and clinical impact of genetic variants at genome scale',
      icon: '🎯',
      color: 'blue',
      metrics: {
        clinVarCodingSNV: { auroc: 0.957, samples: 14319, description: 'ClinVar coding SNVs' },
        clinVarNonCodingSNV: { auroc: 0.957, samples: 34761, description: 'ClinVar noncoding SNVs' },
        clinVarCodingNonSNV: { auroc: 0.939, samples: 1236, description: 'ClinVar coding indels' },
        clinVarNonCodingNonSNV: { auroc: 0.939, samples: 3894, description: 'ClinVar noncoding indels' },
        brca1Supervised: { auroc: 0.94, auprc: 0.84, description: 'BRCA1 supervised classifier' },
        brca1ZeroShot: { auroc: 0.891, description: 'BRCA1 zero-shot performance' }
      },
      outputs: ['delta_likelihood_score', 'pathogenicity_prediction', 'evo2_confidence', 'predicted_consequence', 'feature_disruption_scores'],
      useCases: {
        hallmarksOfCancer: [
          'Identify activating mutations in oncogenes (BRAF V600E, KRAS G12C)',
          'Classify inactivating mutations in tumor suppressors (TP53, RB1)',
          'Analyze mutations in DNA repair genes (BRCA1/2, MMR genes)',
          'Assess TERT promoter mutations',
          'Evaluate immune evasion mutations (MHC genes, PD-L1)'
        ],
        hereditaryBreastCancer: [
          'Categorize variants in BRCA1/2, PALB2, CHEK2, ATM',
          'Assess non-coding region variants',
          'Resolve variants of uncertain significance (VUS)',
          'Analyze moderate-risk gene variants'
        ],
        newbornScreening: [
          'Identify pathogenic mutations in disease genes (PAH for PKU, SMN1 for SMA)',
          'Rapid VUS interpretation for missed conditions',
          'Novel variant assessment'
        ],
        geneTherapy: [
          'Select guides with minimal off-target activity',
          'Predict functional impact of unintended edits',
          'Safety assessment for therapeutic interventions'
        ]
      }
    },
    
    geneEssentiality: {
      id: 'predict_gene_essentiality',
      name: 'Gene Essentiality Prediction',
      description: 'Context-aware prediction of gene importance for cell survival and proliferation',
      icon: '🧬',
      color: 'green',
      metrics: {
        crossSpecies: { aurocRange: '0.82-0.99', species: 8, description: 'Cross-species exon classification (Figure 2G)' },
        bacterialPhage: { description: 'Matched Evo 1 performance on bacterial/phage essentiality (Figure 2I)' },
        lncRNA: { description: 'Massively outperformed other models on lncRNA essentiality (Figure 2J)' },
        zeroShot: { description: 'No task-specific training required - pure sequence understanding' }
      },
      outputs: ['essentiality_score', 'essentiality_category', 'context_specificity', 'confidence'],
      categories: ['Essential', 'Non-essential', 'Conditionally Essential'],
      useCases: {
        hallmarksOfCancer: [
          'Identify oncogenes essential in cancer context',
          'Uncover synthetic lethal relationships',
          'Find anti-apoptotic genes essential for cancer survival',
          'Identify essential metabolic genes',
          'Discover essential inflammatory mediators'
        ],
        precisionOncology: [
          'Cell-line specific essentiality scoring',
          'Cancer-type specific target identification',
          'Therapeutic window assessment',
          'Resistance mechanism prediction'
        ],
        geneTherapy: [
          'Identify high-priority conditions for gene therapy',
          'Assess severity and treatment urgency',
          'Evaluate alternative treatment availability'
        ]
      }
    },

    crisprEfficacy: {
      id: 'predict_crispr_spacer_efficacy',
      name: 'CRISPR Spacer Efficacy',
      description: 'Predicts on-target cutting efficiency of CRISPR guide RNAs',
      icon: '✂️',
      color: 'purple',
      metrics: {
        variantImpactBased: { description: 'Efficacy predicted via variant impact simulation (endpoints.md)' },
        frameshiftProxy: { description: 'Frameshift probability as efficacy proxy' },
        empiricalPriors: { description: 'Combined with empirical indel outcome priors' },
        offTargetSeparate: { description: 'Off-target analysis handled separately in guide design' }
      },
      outputs: ['efficacy_score', 'efficacy_prediction', 'frameshift_probability', 'indel_patterns'],
      applications: [
        'Optimal guide design for knockout efficiency',
        'Functional activity scoring independent of indel outcome',
        'Therapeutic guide RNA optimization',
        'Off-target risk assessment'
      ],
      useCases: {
        hallmarksOfCancer: [
          'Design guides to knock out overactive oncogenes',
          'Create synthetic lethality approaches',
          'Target anti-apoptotic genes (BCL2)',
          'Disrupt TERT expression',
          'Knock out pro-angiogenic genes (VEGFA)'
        ],
        geneTherapy: [
          'Design highly specific guides',
          'Minimize off-target effects',
          'Optimize therapeutic cutting efficiency',
          'Reduce promiscuity risks'
        ]
      }
    },

    chromatinAccessibility: {
      id: 'predict_chromatin_accessibility',
      name: 'Chromatin Accessibility Prediction',
      description: 'Predicts chromatin state and accessibility across genomic regions',
      icon: '🧭',
      color: 'orange',
      metrics: {
        sae_tf_motifs: { description: 'SAE features activate on TF binding motifs (Figure 4F)' },
        enformer_borzoi: { description: 'Tier 2: Integration with Enformer/Borzoi tracks (endpoints.md)' },
        dart_eval: { description: 'Validated on DART-Eval Tasks 1/2/5 (endpoints.md)' },
        regulatory_elements: { description: 'Learned representations of regulatory motifs without supervision' }
      },
      outputs: ['accessibility_score', 'accessibility_state', 'tissue_specificity', 'regulatory_elements'],
      states: ['Open_Chromatin', 'Closed_Chromatin', 'Poised_Chromatin', 'Heterochromatin'],
      useCases: {
        hallmarksOfCancer: [
          'Analyze chromatin state around TERT',
          'Assess accessibility of immune-related genes',
          'Identify silenced tumor suppressor regions',
          'Map oncogene regulatory landscapes'
        ],
        hereditaryBreastCancer: [
          'Predict non-coding variant impacts on accessibility',
          'Assess regulatory site alterations',
          'Evaluate enhancer/silencer disruptions'
        ],
        geneTherapy: [
          'Ensure on-target accessibility',
          'Identify safer off-target sites',
          'Design interventions for accessible regions',
          'Optimize delivery efficiency'
        ]
      }
    },

    proteinFunctionality: {
      id: 'predict_protein_functionality_change',
      name: 'Protein Functionality Prediction',
      description: 'Predicts changes in protein function, stability, and binding affinity',
      icon: '🔬',
      color: 'red',
      metrics: {
        dms_correlation: { description: 'Strong correlation with Deep Mutational Scanning (Figure 2E)' },
        competitive_performance: { description: 'Competitive with protein-specialized models (Evo2 paper)' },
        prokaryotic_eukaryotic: { description: 'Works across prokaryotic and eukaryotic proteins' },
        zero_shot_capability: { description: 'No task-specific training required' }
      },
      outputs: ['functionality_score_change', 'stability_change', 'folding_impact_score', 'binding_predictions'],
      applications: [
        'Verify knockout leads to non-functional protein',
        'Ensure repair template restores full function',
        'Optimize engineered therapeutic proteins',
        'Predict resistance mutations'
      ],
      useCases: {
        hallmarksOfCancer: [
          'Confirm DNA repair protein dysfunction',
          'Assess oncogene activation mechanisms',
          'Predict drug resistance mutations',
          'Evaluate therapeutic target druggability'
        ],
        hereditaryBreastCancer: [
          'Assess BRCA1/2 variant functional impact',
          'Predict loss-of-function severity',
          'Evaluate DNA repair capacity',
          'Guide therapeutic interventions'
        ],
        newbornScreening: [
          'Confirm enzyme loss-of-function',
          'Assess disease severity',
          'Guide treatment strategies',
          'Predict therapeutic response'
        ],
        geneTherapy: [
          'Ensure functional protein restoration',
          'Predict therapeutic protein stability',
          'Optimize engineered constructs',
          'Assess delivery requirements'
        ]
      }
    }
  },

  // Comprehensive Use Case Scenarios
  useCaseScenarios: {
    hallmarksOfCancer: {
      title: 'Hallmarks of Cancer Analysis',
      description: 'Comprehensive genomic strategy and vulnerability assessment',
      icon: '🎯',
      color: 'red',
      workflow: [
        'Identify oncogene activating mutations',
        'Classify tumor suppressor inactivation',
        'Assess DNA repair pathway disruption',
        'Evaluate immune evasion mechanisms',
        'Map metabolic reprogramming',
        'Analyze invasion/metastasis drivers'
      ],
      endpoints: ['predict_variant_impact', 'predict_gene_essentiality', 'predict_chromatin_accessibility'],
      metrics: {
        accuracy: '94.2%',
        coverage: '98.7%',
        timeReduction: '85%'
      }
    },

    hereditaryBreastCancer: {
      title: 'Hereditary Breast Cancer Risk',
      description: 'Comprehensive hereditary cancer risk assessment and intervention design',
      icon: '🧬',
      color: 'pink',
      workflow: [
        'Screen full hereditary cancer gene panel',
        'Resolve variants of uncertain significance',
        'Assess polygenic risk factors',
        'Design personalized interventions',
        'Optimize surveillance strategies'
      ],
      endpoints: ['predict_variant_impact', 'predict_protein_functionality_change', 'predict_chromatin_accessibility'],
      metrics: {
        vusResolution: '73%',
        riskAccuracy: '91.3%',
        interventionSuccess: '87%'
      }
    },

    newbornScreening: {
      title: 'Newborn Genetic Screening',
      description: 'AI-powered comprehensive newborn genomic health assessment',
      icon: '👶',
      color: 'blue',
      workflow: [
        'Rapid variant interpretation at scale',
        'Identify treatable pediatric conditions',
        'Design proactive interventions',
        'Enable early therapeutic intervention'
      ],
      endpoints: ['predict_variant_impact', 'predict_gene_essentiality', 'predict_protein_functionality_change'],
      metrics: {
        screeningSpeed: '12x faster',
        accuracy: '96.8%',
        earlyDetection: '89%'
      }
    },

    geneTherapy: {
      title: 'Gene Therapy Optimization',
      description: 'Intelligent gene therapy design and safety assessment',
      icon: '🧪',
      color: 'green',
      workflow: [
        'Prioritize conditions for gene therapy',
        'Design high-fidelity editing strategies',
        'Minimize off-target effects',
        'Optimize delivery and expression'
      ],
      endpoints: ['predict_crispr_spacer_efficacy', 'predict_variant_impact', 'predict_chromatin_accessibility'],
      metrics: {
        offTargetReduction: '94%',
        editingEfficiency: '87%',
        safetyScore: '98.2%'
      }
    }
  },

  // Interactive Demo Scenarios
  demoScenarios: {
    brca1Analysis: {
      title: 'BRCA1 Variant Analysis',
      variant: 'BRCA1:c.123A>T',
      description: 'Complete discriminative AI analysis of a BRCA1 variant',
      steps: [
        { endpoint: 'predict_variant_impact', result: { score: -0.872, prediction: 'Pathogenic' } },
        { endpoint: 'predict_protein_functionality_change', result: { change: -0.89, stability: -0.45 } },
        { endpoint: 'predict_chromatin_accessibility', result: { accessibility: 0.76, state: 'Open' } }
      ]
    },

    oncogeneAnalysis: {
      title: 'Oncogene Essentiality Analysis',
      gene: 'KRAS',
      context: 'A549 (NSCLC)',
      description: 'Context-specific essentiality analysis for therapeutic targeting',
      steps: [
        { endpoint: 'predict_gene_essentiality', result: { score: 0.94, category: 'Essential' } },
        { endpoint: 'predict_crispr_spacer_efficacy', result: { efficacy: 0.87, frameshift: 0.92 } },
        { endpoint: 'predict_variant_impact', result: { knockout_effect: -2.34 } }
      ]
    }
  },

  // Performance Benchmarks
  benchmarks: {
    clinVar: {
      name: 'ClinVar Pathogenicity',
      description: 'Gold standard clinical variant database',
      samples: 53210,
      auroc: 0.957,
      auprc: 0.891,
      categories: ['coding SNV', 'noncoding SNV', 'coding indel', 'noncoding indel']
    },
    brca: {
      name: 'BRCA1/2 Functional Assessment',
      description: 'Breast cancer variant functional impact',
      samples: 3893,
      auroc: 0.95,
      auprc: 0.86,
      zeroShotAUROC: 0.891
    },
    spliceVarDB: {
      name: 'Splice Variant Database',
      description: 'Experimentally validated splice variants',
      auroc: 0.826,
      categories: ['exonic', 'intronic']
    },
    depMap: {
      name: 'DepMap Gene Essentiality',
      description: 'Cancer cell line gene dependencies',
      correlation: 0.73,
      cellLines: 1000,
      genes: 18000
    }
  }
} as const;

export type DiscriminativeEndpoint = keyof typeof discriminativeAIContent.endpoints;
export type UseCaseScenario = keyof typeof discriminativeAIContent.useCaseScenarios; 