// Demo Factory Data for Biotech R&D Scenarios
// Extracted from src2/data/discriminativeAISampleData.ts

export type DemoStep = {
  endpoint: string;
  title: string;
  input: Record<string, any>;
  result: Record<string, any>;
  explanation: string;
};

export type DemoScenario = {
  title: string;
  variant: string;
  description: string;
  problem: string;
  solution: string;
  steps: DemoStep[];
  summary: {
    verdict: string;
    confidence: number;
    clinicalAction: string;
    costSavings?: string;
    timeReduction?: string;
    riskReduction?: string;
    successPrediction?: string;
    designEfficiency?: string;
    predictability?: string;
  };
};

export type DemoCategory = {
  variantTriaging: DemoScenario;
  constructPrioritization: DemoScenario;
  guidedSequenceGeneration: DemoScenario;
};

export const biotechDemoFactory: { biotechRnD: DemoCategory } = {
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
          explanation: 'SAE features detect TF binding motifs - accessible chromatin enables efficient editing'
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
};


