// Sample data for Discriminative AI components
export const discriminativeAISampleData = {
  // CRISPR Efficacy Sample Data
  crisprEfficacy: {
    krasExample: {
      targetGene: 'KRAS',
      targetLocus: 'chr12:25245350-25245370',
      guides: [
        {
          sequence: 'GACGGAGGCTAAGCGTCGCAA',
          efficacy: 0.92,
          frameshift: 0.89,
          pam: 'CGG',
          position: 25245355
        },
        {
          sequence: 'CTAAGCGTCGCAACGGAGCTT',
          efficacy: 0.87,
          frameshift: 0.84,
          pam: 'TGG',
          position: 25245362
        },
        {
          sequence: 'AAGCGTCGCAACGGAGCTTAG',
          efficacy: 0.83,
          frameshift: 0.91,
          pam: 'AGG',
          position: 25245368
        },
        {
          sequence: 'GCGTCGCAACGGAGCTTAGAA',
          efficacy: 0.79,
          frameshift: 0.76,
          pam: 'AAG',
          position: 25245374
        },
        {
          sequence: 'CGTCGCAACGGAGCTTAGAAC',
          efficacy: 0.74,
          frameshift: 0.82,
          pam: 'ACG',
          position: 25245380
        }
      ],
      metrics: {
        avgEfficacy: 0.83,
        topGuideScore: 0.92,
        frameshiftRate: 0.84
      }
    },
    
    brca1Example: {
      targetGene: 'BRCA1',
      targetLocus: 'chr17:43044295-43044315',
      guides: [
        {
          sequence: 'GAAGATACCGTTTGGGAACGT',
          efficacy: 0.88,
          frameshift: 0.93,
          pam: 'TGG',
          position: 43044300
        },
        {
          sequence: 'AGATACCGTTTGGGAACGTAG',
          efficacy: 0.85,
          frameshift: 0.87,
          pam: 'AGG',
          position: 43044307
        },
        {
          sequence: 'GATACCGTTTGGGAACGTAGC',
          efficacy: 0.81,
          frameshift: 0.89,
          pam: 'GCG',
          position: 43044314
        }
      ],
      metrics: {
        avgEfficacy: 0.85,
        topGuideScore: 0.88,
        frameshiftRate: 0.90
      }
    }
  },

  // Variant Impact Landscape Sample Data
  variantImpactLandscape: {
    brca1Region: {
      locus: 'chr17:43044000-43052000',
      windowSize: 8000,
      variants: [
        {
          position: 43044295,
          ref: 'A',
          alt: 'T',
          deltaLikelihood: -2.34,
          pathogenicity: 'Pathogenic' as const,
          confidence: 0.94,
          consequence: 'missense_variant',
          gene: 'BRCA1'
        },
        {
          position: 43045123,
          ref: 'G',
          alt: 'C',
          deltaLikelihood: -1.87,
          pathogenicity: 'Pathogenic' as const,
          confidence: 0.89,
          consequence: 'splice_donor_variant',
          gene: 'BRCA1'
        },
        {
          position: 43046789,
          ref: 'C',
          alt: 'T',
          deltaLikelihood: -0.23,
          pathogenicity: 'VUS' as const,
          confidence: 0.67,
          consequence: 'synonymous_variant',
          gene: 'BRCA1'
        },
        {
          position: 43047456,
          ref: 'T',
          alt: 'G',
          deltaLikelihood: -2.91,
          pathogenicity: 'Pathogenic' as const,
          confidence: 0.96,
          consequence: 'frameshift_variant',
          gene: 'BRCA1'
        },
        {
          position: 43048234,
          ref: 'A',
          alt: 'G',
          deltaLikelihood: 0.12,
          pathogenicity: 'Benign' as const,
          confidence: 0.82,
          consequence: 'intron_variant',
          gene: 'BRCA1'
        },
        {
          position: 43049567,
          ref: 'G',
          alt: 'A',
          deltaLikelihood: -1.45,
          pathogenicity: 'Pathogenic' as const,
          confidence: 0.91,
          consequence: 'stop_gained',
          gene: 'BRCA1'
        },
        {
          position: 43050123,
          ref: 'C',
          alt: 'A',
          deltaLikelihood: -0.67,
          pathogenicity: 'VUS' as const,
          confidence: 0.73,
          consequence: 'missense_variant',
          gene: 'BRCA1'
        },
        {
          position: 43051234,
          ref: 'T',
          alt: 'C',
          deltaLikelihood: 0.34,
          pathogenicity: 'Benign' as const,
          confidence: 0.88,
          consequence: 'intron_variant',
          gene: 'BRCA1'
        }
      ],
      regions: [
        { start: 43044200, end: 43044400, type: 'exon' as const, name: 'Exon 2' },
        { start: 43044400, end: 43045000, type: 'intron' as const, name: 'Intron 2' },
        { start: 43045000, end: 43045200, type: 'exon' as const, name: 'Exon 3' },
        { start: 43045200, end: 43046800, type: 'intron' as const, name: 'Intron 3' },
        { start: 43046800, end: 43047000, type: 'exon' as const, name: 'Exon 4' },
        { start: 43047000, end: 43048000, type: 'intron' as const, name: 'Intron 4' },
        { start: 43048000, end: 43048300, type: 'exon' as const, name: 'Exon 5' },
        { start: 43048300, end: 43050000, type: 'intron' as const, name: 'Intron 5' },
        { start: 43050000, end: 43050400, type: 'exon' as const, name: 'Exon 6' },
        { start: 43050400, end: 43052000, type: 'intron' as const, name: 'Intron 6' }
      ],
      metrics: {
        totalVariants: 8,
        pathogenicCount: 4,
        vusResolved: 2,
        avgConfidence: 0.85
      }
    },

    tp53Region: {
      locus: 'chr17:7668000-7676000',
      windowSize: 8000,
      variants: [
        {
          position: 7669608,
          ref: 'C',
          alt: 'T',
          deltaLikelihood: -2.87,
          pathogenicity: 'Pathogenic' as const,
          confidence: 0.97,
          consequence: 'missense_variant',
          gene: 'TP53'
        },
        {
          position: 7670234,
          ref: 'G',
          alt: 'A',
          deltaLikelihood: -2.45,
          pathogenicity: 'Pathogenic' as const,
          confidence: 0.93,
          consequence: 'missense_variant',
          gene: 'TP53'
        },
        {
          position: 7671123,
          ref: 'A',
          alt: 'C',
          deltaLikelihood: -1.23,
          pathogenicity: 'VUS' as const,
          confidence: 0.71,
          consequence: 'missense_variant',
          gene: 'TP53'
        },
        {
          position: 7672456,
          ref: 'T',
          alt: 'A',
          deltaLikelihood: -3.12,
          pathogenicity: 'Pathogenic' as const,
          confidence: 0.98,
          consequence: 'stop_gained',
          gene: 'TP53'
        },
        {
          position: 7673789,
          ref: 'G',
          alt: 'T',
          deltaLikelihood: 0.23,
          pathogenicity: 'Benign' as const,
          confidence: 0.85,
          consequence: 'synonymous_variant',
          gene: 'TP53'
        }
      ],
      regions: [
        { start: 7668000, end: 7669000, type: 'promoter' as const, name: 'TP53 Promoter' },
        { start: 7669000, end: 7669200, type: 'exon' as const, name: 'Exon 1' },
        { start: 7669200, end: 7670000, type: 'intron' as const, name: 'Intron 1' },
        { start: 7670000, end: 7670400, type: 'exon' as const, name: 'Exon 2' },
        { start: 7670400, end: 7671000, type: 'intron' as const, name: 'Intron 2' },
        { start: 7671000, end: 7671300, type: 'exon' as const, name: 'Exon 3' },
        { start: 7671300, end: 7672000, type: 'intron' as const, name: 'Intron 3' },
        { start: 7672000, end: 7672500, type: 'exon' as const, name: 'Exon 4' },
        { start: 7672500, end: 7673500, type: 'intron' as const, name: 'Intron 4' },
        { start: 7673500, end: 7674000, type: 'exon' as const, name: 'Exon 5' },
        { start: 7674000, end: 7676000, type: 'intron' as const, name: 'Intron 5' }
      ],
      metrics: {
        totalVariants: 5,
        pathogenicCount: 3,
        vusResolved: 1,
        avgConfidence: 0.89
      }
    }
  },

  // Demo Factory - Scalable approach for creating contextual demos
  demoFactory: {
    // Biotech R&D specific scenarios
    biotechRnD: {
      variantTriaging: {
        title: 'Variant Triaging Pipeline',
        variant: 'CFTR:c.1521_1523delCTT',
        description: 'Pre-screen 1,000+ variants before expensive wet-lab validation',
        problem: 'Screen 1,000 variants → $500K cost → 5% hit rate',
        solution: 'AI pre-screening → Test top 200 → 73% hit rate',
        steps: [
          {
            endpoint: 'predict_variant_impact',
            title: 'Pathogenicity Screening',
            input: { 
              locus: 'chr7:117199644', 
              ref: 'CTT', 
              alt: 'del',
              gene: 'CFTR',
              context: 'cystic_fibrosis_screening'
            },
            result: { 
              deltaLikelihood: -2.89, 
              pathogenicity: 'Pathogenic', 
              confidence: 0.957,
              consequence: 'frameshift_variant',
              clinicalSignificance: 'Disease-causing'
            },
            explanation: 'ClinVar-level pathogenicity prediction (95.7% AUROC) identifies high-priority variant for wet-lab validation'
          },
          {
            endpoint: 'predict_gene_essentiality',
            title: 'Therapeutic Context Assessment',
            input: { 
              gene: 'CFTR', 
              contexts: ['lung_epithelium', 'pancreatic_duct'] 
            },
            result: { 
              lungEssentiality: 0.94,
              pancreasEssentiality: 0.89,
              therapeuticWindow: 'High',
              targetability: 0.91
            },
            explanation: 'Context-specific essentiality (82-99% AUROC) confirms CFTR as high-value therapeutic target'
          },
          {
            endpoint: 'predict_protein_functionality_change',
            title: 'Functional Impact Validation',
            input: { 
              gene: 'CFTR', 
              variant: 'c.1521_1523delCTT',
              proteinContext: 'chloride_channel'
            },
            result: { 
              functionalityLoss: -0.96,
              stabilityChange: -0.78,
              channelActivity: -0.92,
              foldingImpact: -0.85
            },
            explanation: 'Strong DMS correlation confirms complete loss of chloride channel function'
          }
        ],
        summary: {
          verdict: 'High-Priority Target',
          confidence: 0.95,
          clinicalAction: 'Prioritize for wet-lab validation and therapeutic development',
          costSavings: '$497K saved by avoiding 800 low-priority variants',
          timeReduction: '6 months → 2 weeks to first validated hit'
        }
      },

      constructPrioritization: {
        title: 'Construct Risk Assessment',
        variant: 'BRCA1:exon11_repair_template',
        description: 'Use SAE features to rank construct safety and avoid failures',
        problem: 'Test 50 constructs → 20% success → $2M waste on failures',
        solution: 'Risk-rank constructs → Test top 12 → 83% success',
        steps: [
          {
            endpoint: 'predict_variant_impact',
            title: 'Repair Template Safety',
            input: { 
              sequence: 'repair_template_sequence',
              targetLocus: 'chr17:43044295',
              editType: 'homology_directed_repair'
            },
            result: { 
              editSafety: 0.94,
              offTargetRisk: 0.02,
              onTargetEfficiency: 0.89,
              unintendedConsequences: 'Low'
            },
            explanation: 'Variant impact simulation predicts safe, high-efficiency repair with minimal off-target effects'
          },
          {
            endpoint: 'predict_chromatin_accessibility',
            title: 'Target Site Accessibility',
            input: { 
              locus: 'chr17:43044295',
              cellType: 'primary_fibroblasts',
              editingContext: 'CRISPR_HDR'
            },
            result: { 
              accessibility: 0.87,
              chromatinState: 'Open_Chromatin',
              tfBindingSites: ['p53_motif', 'BRCA1_binding'],
              editingFeasibility: 'High'
            },
            explanation: 'SAE features detect TF binding motifs (Figure 4F) - accessible chromatin enables efficient editing'
          },
          {
            endpoint: 'predict_crispr_spacer_efficacy',
            title: 'Guide RNA Optimization',
            input: { 
              target: 'BRCA1_exon11',
              repairStrategy: 'HDR_template',
              specificity: 'high'
            },
            result: { 
              guideEfficacy: 0.92,
              frameshiftProbability: 0.05,
              hdrEfficiency: 0.78,
              offtargetScore: 0.01
            },
            explanation: 'Frameshift probability prediction with empirical priors ensures precise repair template integration'
          }
        ],
        summary: {
          verdict: 'Low-Risk Construct',
          confidence: 0.91,
          clinicalAction: 'Proceed with construct synthesis and testing',
          riskReduction: '38 failed constructs avoided → $1.9M saved',
          successPrediction: '83% probability of functional repair'
        }
      },

      guidedSequenceGeneration: {
        title: 'Predictable Guide Design',
        variant: 'Therapeutic_gRNA_design',
        description: 'Trade compute for design quality with predictable AUROC scaling',
        problem: '20 iterations → 6 months → Random success',
        solution: '3 iterations → 2 weeks → 91% AUROC predictable success',
        steps: [
          {
            endpoint: 'predict_gene_essentiality',
            title: 'Target Prioritization',
            input: { 
              candidateGenes: ['KRAS', 'MYC', 'BCL2'],
              cancerContext: 'NSCLC',
              therapeuticWindow: 'assess'
            },
            result: { 
              krasPriority: 0.94,
              mycPriority: 0.87,
              bcl2Priority: 0.82,
              optimalTarget: 'KRAS',
              selectivityIndex: 11.75
            },
            explanation: 'Cross-species essentiality (82-99% AUROC) identifies KRAS as optimal therapeutic target with excellent selectivity'
          },
          {
            endpoint: 'predict_crispr_spacer_efficacy',
            title: 'High-Efficacy Guide Design',
            input: { 
              target: 'KRAS_G12C',
              designObjective: 'therapeutic_knockout',
              computeBudget: 'high'
            },
            result: { 
              topGuideEfficacy: 0.94,
              predictedAUROC: 0.91,
              frameshiftProbability: 0.89,
              therapeuticIndex: 'Excellent'
            },
            explanation: 'Compute-scaling design success (~0.9 AUROC with higher beam width) enables predictable therapeutic guide generation'
          },
          {
            endpoint: 'predict_chromatin_accessibility',
            title: 'Delivery Optimization',
            input: { 
              targetTissue: 'lung_tumor',
              deliveryVector: 'AAV',
              accessibilityRequirement: 'high'
            },
            result: { 
              tissueAccessibility: 0.91,
              vectorCompatibility: 0.88,
              deliveryEfficiency: 0.85,
              therapeuticWindow: 'Optimal'
            },
            explanation: 'Tissue-specific accessibility prediction ensures optimal guide delivery and therapeutic efficacy'
          }
        ],
        summary: {
          verdict: 'Production-Ready Design',
          confidence: 0.91,
          clinicalAction: 'Advance to preclinical testing with high confidence',
          designEfficiency: '17x faster design cycles (20 → 3 iterations)',
          predictability: '91% AUROC success vs random trial-and-error'
        }
      }
    }
  },

  // Interactive Demo Scenarios
  interactiveDemos: {
    brca1Analysis: {
      title: 'BRCA1 Variant Analysis Pipeline',
      variant: 'BRCA1:c.123A>T',
      description: 'Complete discriminative AI analysis workflow',
      steps: [
        {
          endpoint: 'predict_variant_impact',
          title: 'Variant Impact Prediction',
          input: { locus: 'chr17:43044295', ref: 'A', alt: 'T' },
          result: { 
            deltaLikelihood: -2.34, 
            pathogenicity: 'Pathogenic', 
            confidence: 0.94,
            consequence: 'missense_variant'
          },
          explanation: 'Evo2 predicts significant functional disruption with high confidence'
        },
        {
          endpoint: 'predict_protein_functionality_change',
          title: 'Protein Function Analysis',
          input: { gene: 'BRCA1', variant: 'A123T' },
          result: { 
            functionalityChange: -0.89, 
            stabilityChange: -0.45,
            foldingImpact: 0.76
          },
          explanation: 'Severe loss of DNA repair function predicted'
        },
        {
          endpoint: 'predict_chromatin_accessibility',
          title: 'Chromatin Context',
          input: { locus: 'chr17:43044295', context: 'breast_tissue' },
          result: { 
            accessibility: 0.82, 
            state: 'Open_Chromatin',
            tissueSpecificity: 0.91
          },
          explanation: 'Variant in accessible chromatin region, high tissue relevance'
        }
      ],
      summary: {
        verdict: 'Pathogenic',
        confidence: 0.94,
        clinicalAction: 'High-risk surveillance recommended',
        therapeuticOptions: ['PARP inhibitors', 'Platinum-based chemotherapy']
      }
    },

    oncogeneTargeting: {
      title: 'Oncogene Targeting Strategy',
      gene: 'KRAS G12C',
      context: 'NSCLC (A549)',
      description: 'Multi-endpoint analysis for therapeutic targeting',
      steps: [
        {
          endpoint: 'predict_gene_essentiality',
          title: 'Essentiality Assessment',
          input: { gene: 'KRAS', context: 'A549_NSCLC' },
          result: { 
            essentialityScore: 0.94, 
            category: 'Essential',
            contextSpecificity: 0.87
          },
          explanation: 'KRAS is essential in this cancer context - ideal therapeutic target'
        },
        {
          endpoint: 'predict_crispr_spacer_efficacy',
          title: 'Guide RNA Design',
          input: { target: 'KRAS_G12C', numCandidates: 10 },
          result: { 
            topEfficacy: 0.92, 
            frameshiftRate: 0.89,
            offTargetRisk: 0.03
          },
          explanation: 'High-efficacy guides identified with minimal off-target risk'
        },
        {
          endpoint: 'predict_variant_impact',
          title: 'Knockout Impact',
          input: { simulatedKnockout: 'KRAS_frameshift' },
          result: { 
            knockoutEffect: -3.45,
            cellViability: 0.12,
            therapeuticWindow: 0.94
          },
          explanation: 'Knockout predicted to severely impact cancer cell survival'
        }
      ],
      summary: {
        verdict: 'High-Priority Target',
        confidence: 0.96,
        clinicalAction: 'CRISPR-based knockout therapy recommended',
        therapeuticOptions: ['Guide RNA therapy', 'Base editing', 'Prime editing']
      }
    },

    crisprTherapeuticDesign: {
      title: 'CRISPR Therapeutic Design Pipeline',
      variant: 'KRAS:c.35G>T (G12C)',
      description: 'End-to-end CRISPR therapy development workflow',
      steps: [
        {
          endpoint: 'predict_variant_impact',
          title: 'Target Variant Analysis',
          input: { 
            locus: 'chr12:25245350', 
            ref: 'G', 
            alt: 'T',
            gene: 'KRAS',
            context: 'oncogenic_mutation'
          },
          result: { 
            deltaLikelihood: -3.12, 
            pathogenicity: 'Pathogenic', 
            confidence: 0.96,
            consequence: 'missense_variant',
            oncogenicPotential: 0.98
          },
          explanation: 'KRAS G12C is a well-characterized oncogenic driver mutation with high pathogenic confidence'
        },
        {
          endpoint: 'predict_gene_essentiality',
          title: 'Therapeutic Window Assessment',
          input: { 
            gene: 'KRAS', 
            contexts: ['KRAS_mutant_NSCLC', 'normal_lung_epithelium'] 
          },
          result: { 
            cancerEssentiality: 0.94, 
            normalEssentiality: 0.08,
            therapeuticWindow: 11.75,
            selectivityIndex: 0.92
          },
          explanation: 'Excellent therapeutic window - KRAS essential in cancer (94%) but not normal cells (8%)'
        },
        {
          endpoint: 'predict_crispr_spacer_efficacy',
          title: 'Precision Guide Design',
          input: { 
            target: 'KRAS_exon2', 
            mutation: 'G12C',
            strategy: 'allele_specific_targeting'
          },
          result: { 
            topGuideEfficacy: 0.92, 
            allelicSpecificity: 0.89,
            frameshiftProbability: 0.87,
            offTargetScore: 0.02
          },
          explanation: 'High-efficacy allele-specific guides designed to target mutant KRAS while sparing wild-type'
        },
        {
          endpoint: 'predict_protein_functionality_change',
          title: 'Functional Knockout Validation',
          input: { 
            gene: 'KRAS', 
            intervention: 'CRISPR_knockout',
            context: 'G12C_background'
          },
          result: { 
            functionalityLoss: -0.96, 
            pathwayDisruption: 0.91,
            cellularImpact: -0.88,
            resistanceLikelihood: 0.05
          },
          explanation: 'CRISPR knockout predicted to eliminate oncogenic KRAS function with minimal resistance risk'
        }
      ],
      summary: {
        verdict: 'Optimal CRISPR Target',
        confidence: 0.94,
        clinicalAction: 'Proceed with allele-specific CRISPR therapy development',
        therapeuticOptions: [
          'In vivo CRISPR-Cas9 delivery',
          'Ex vivo T-cell engineering',
          'Base editing for reversion therapy',
          'Combination with targeted inhibitors'
        ]
      }
    }
  }
} as const; 