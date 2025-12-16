import React from 'react';
import { CheckCircle, AlertTriangle, Target, Dna, Scissors, Zap, Activity, FlaskConical, TestTube, Share2 } from 'lucide-react';

export interface NextStepAction {
  label: string;
  actionId: string;
  icon?: React.ComponentType<any>;
  type: 'trigger_demo' | 'show_info';
  payload?: {
    component: string;
    title: string;
    data?: any;
  };
}

export interface DossierCheckpoint {
  icon?: any;
  label: string;
  color?: 'green' | 'yellow' | 'sky' | 'purple' | 'orange';
  detail?: string;
}

export interface APIDossierSummary {
  apiId: string;
  assetId: string;
  status: string;
  statusColor: 'green' | 'yellow' | 'sky' | 'purple' | 'orange';
  checkpoints: DossierCheckpoint[];
  description: string;
  keyFindings: string[];
  clinicalRelevance?: string;
  nextSteps?: NextStepAction[];
}

export const discriminativeAPIDossiers: { [key: string]: APIDossierSummary } = {
  variant_impact: {
    apiId: 'variant_impact',
    assetId: 'BRCA1:c.5266dupC Analysis',
    status: 'Pathogenic - High Confidence',
    statusColor: 'green',
    checkpoints: [
      {
        icon: CheckCircle,
        label: 'Evo2 Feature Analysis Complete',
        color: 'green',
        detail: '32,768 learned biological features processed'
      },
      {
        icon: Target,
        label: 'Pathogenicity Classification',
        color: 'green',
        detail: 'Delta likelihood score: -2.34 (Pathogenic)'
      },
      {
        icon: Activity,
        label: 'Protein Impact Assessment',
        color: 'yellow',
        detail: 'Frameshift variant - 94% protein disruption confidence'
      },
      {
        icon: CheckCircle,
        label: 'Clinical Validation Ready',
        color: 'green',
        detail: '95.7% AUROC performance on ClinVar dataset'
      }
    ],
    description: 'Comprehensive variant impact analysis reveals high-confidence pathogenic classification for BRCA1 frameshift mutation with severe protein disruption predicted.',
    keyFindings: [
      'Frameshift mutation causing premature stop codon',
      'Severe disruption of BRCA1 tumor suppressor function',
      'High pathogenicity confidence (94%) via zero-shot prediction',
      'Consistent with known BRCA1 loss-of-function mutations'
    ],
    clinicalRelevance: 'This variant significantly increases hereditary breast and ovarian cancer risk. Recommend genetic counseling and enhanced screening protocols.',
    nextSteps: [
      {
        label: 'Simulate Family Cascade Testing',
        actionId: 'run_cascade_testing',
        icon: Share2,
        type: 'trigger_demo',
        payload: {
          component: 'CascadeTestingDemo',
          title: 'Family Cascade Testing Simulation',
        }
      },
      {
        label: 'Corroborate with Orthogonal Methods',
        actionId: 'run_orthogonal_validation',
        icon: TestTube,
        type: 'trigger_demo',
        payload: {
          component: 'OrthogonalValidationDemo',
          title: 'Orthogonal Testing Validation',
        }
      },
    ]
  },
  gene_essentiality: {
    apiId: 'gene_essentiality',
    assetId: 'KRAS Context Dependency Analysis',
    status: 'High Therapeutic Window',
    statusColor: 'green',
    checkpoints: [
      {
        icon: Dna,
        label: 'Multi-Context Analysis Complete',
        color: 'green',
        detail: '3 cellular contexts analyzed with high confidence'
      },
      {
        icon: Target,
        label: 'Selectivity Index Calculated',
        color: 'green',
        detail: 'Therapeutic window: 11.75x (Excellent selectivity)'
      },
      {
        icon: CheckCircle,
        label: 'KRAS-Mutant Dependency Confirmed',
        color: 'green',
        detail: 'Essential in KRAS-mutant cells (0.94 score)'
      },
      {
        icon: CheckCircle,
        label: 'Normal Tissue Safety Validated',
        color: 'green',
        detail: 'Low essentiality in normal cells (0.08 score)'
      }
    ],
    description: 'Context-aware essentiality analysis demonstrates excellent therapeutic window for KRAS targeting in mutant cancer cells while sparing normal tissue.',
    keyFindings: [
      'KRAS shows high essentiality in mutant cancer contexts',
      'Minimal impact on normal lung epithelium survival',
      'Excellent therapeutic window (11.75x selectivity)',
      'High target priority score for drug development'
    ],
    clinicalRelevance: 'Strong rationale for KRAS-targeted therapy development with predicted minimal normal tissue toxicity.',
    nextSteps: [
      {
        label: 'Launch Synthetic Lethality Screen',
        actionId: 'run_synthetic_lethality_screen',
        icon: FlaskConical,
        type: 'trigger_demo',
        payload: {
          component: 'SyntheticLethalityDemo',
          title: 'Synthetic Lethality Screen for KRAS',
        }
      },
      {
        label: 'Prioritize for Drug Discovery Pipeline',
        actionId: 'prioritize_for_drug_discovery',
        icon: Activity,
        type: 'trigger_demo',
        payload: {
          component: 'DrugDiscoveryPipelineDemo',
          title: 'Target Prioritization: KRAS',
        }
      },
    ]
  },
  crispr_efficacy: {
    apiId: 'crispr_efficacy',
    assetId: 'BRCA1 Guide RNA Optimization',
    status: 'High Efficacy Predicted',
    statusColor: 'green',
    checkpoints: [
      {
        icon: Scissors,
        label: 'Guide RNA Sequence Validated',
        color: 'green',
        detail: 'Optimal PAM compatibility and target specificity'
      },
      {
        icon: Activity,
        label: 'Cutting Efficiency Predicted',
        color: 'green',
        detail: '87% predicted on-target cutting efficiency'
      },
      {
        icon: Target,
        label: 'Frameshift Probability High',
        color: 'green',
        detail: '92% probability of successful gene knockout'
      },
      {
        icon: CheckCircle,
        label: 'Alternative Guides Identified',
        color: 'sky',
        detail: '2 backup guides with >84% efficiency available'
      }
    ],
    description: 'CRISPR guide RNA design analysis predicts high cutting efficiency and successful BRCA1 knockout with multiple validated alternatives.',
    keyFindings: [
      'Primary guide shows 87% predicted cutting efficiency',
      'High frameshift probability (92%) for gene knockout',
      'Excellent optimization score (0.89/1.0)',
      'Multiple high-quality backup guides available'
    ],
    clinicalRelevance: 'Optimal guide design for BRCA1 research applications and potential therapeutic gene editing approaches.',
    nextSteps: [
      {
        label: 'Analyze Off-Target Effects',
        actionId: 'run_off_target_analysis',
        icon: Target,
        type: 'trigger_demo',
        payload: {
          component: 'OffTargetAnalysisDemo',
          title: 'Off-Target Analysis for BRCA1 Guide RNA',
        }
      },
      {
        label: 'Simulate Experimental Validation',
        actionId: 'simulate_experimental_validation',
        icon: TestTube,
        type: 'trigger_demo',
        payload: {
          component: 'ExperimentalValidationDemo',
          title: 'Simulated In-Vitro Validation',
        }
      },
    ]
  },
  chromatin_accessibility: {
    apiId: 'chromatin_accessibility',
    assetId: 'Chr1 Regulatory Region Analysis',
    status: 'Open Chromatin - Active',
    statusColor: 'green',
    checkpoints: [
      {
        icon: Zap,
        label: 'Chromatin State Classified',
        color: 'green',
        detail: 'Open chromatin with high accessibility (0.82)'
      },
      {
        icon: Target,
        label: 'TF Binding Sites Identified',
        color: 'green',
        detail: 'CTCF and YY1 binding motifs detected'
      },
      {
        icon: Activity,
        label: 'Regulatory Elements Mapped',
        color: 'green',
        detail: 'Active enhancer region identified (0.85 strength)'
      },
      {
        icon: CheckCircle,
        label: 'Tissue Specificity Assessed',
        color: 'sky',
        detail: 'Moderate tissue specificity (0.73) in hematopoietic cells'
      }
    ],
    description: 'Comprehensive chromatin accessibility analysis reveals active regulatory landscape with key transcription factor binding sites and enhancer elements.',
    keyFindings: [
      'High chromatin accessibility in target region',
      'Multiple transcription factor binding sites detected',
      'Active enhancer element with strong regulatory potential',
      'Tissue-specific regulatory activity confirmed'
    ],
    clinicalRelevance: 'Accessible chromatin region suitable for epigenetic intervention and regulatory element targeting.',
    nextSteps: [
      {
        label: 'Screen for Chromatin Modifiers',
        actionId: 'screen_chromatin_modifiers',
        icon: FlaskConical,
        type: 'trigger_demo',
        payload: {
          component: 'ChromatinModifierScreenDemo',
          title: 'Screening for Chromatin Modifying Compounds',
        }
      },
    ]
  },
  protein_functional_change: {
    apiId: 'protein_functional_change',
    assetId: 'TP53 R273H Functional Analysis',
    status: 'Severe Loss of Function',
    statusColor: 'orange',
    checkpoints: [
      {
        icon: Activity,
        label: 'Protein Stability Analysis',
        color: 'orange',
        detail: 'Significant destabilization predicted (-2.1 ΔΔG)'
      },
      {
        icon: Target,
        label: 'Functional Domain Impact',
        color: 'orange',
        detail: 'DNA-binding domain severely compromised'
      },
      {
        icon: CheckCircle,
        label: 'Deep Mutational Scanning Correlation',
        color: 'green',
        detail: 'Strong correlation with experimental data (r=0.89)'
      },
      {
        icon: AlertTriangle,
        label: 'Dominant Negative Effect',
        color: 'yellow',
        detail: 'Potential interference with wild-type p53 function'
      }
    ],
    description: 'Comprehensive protein functional analysis reveals severe loss of p53 tumor suppressor activity with potential dominant negative effects on remaining wild-type protein.',
    keyFindings: [
      'Hotspot mutation in DNA-binding domain',
      'Severe protein destabilization and misfolding',
      'Loss of transcriptional activation capability',
      'Potential dominant negative interference'
    ],
    clinicalRelevance: 'This TP53 hotspot mutation is associated with aggressive cancer phenotypes and poor prognosis. Consider alternative therapeutic strategies targeting p53-independent pathways.',
    nextSteps: [
      {
        label: 'Screen for p53 Reactivating Compounds',
        actionId: 'screen_p53_reactivators',
        icon: FlaskConical,
        type: 'trigger_demo',
        payload: {
          component: 'DrugScreenDemo',
          title: 'Screening for p53 Reactivating Compounds',
        }
      },
      {
        label: 'Explore Synthetic Lethal Approaches',
        actionId: 'run_synthetic_lethality_screen_p53',
        icon: Dna,
        type: 'trigger_demo',
        payload: {
          component: 'SyntheticLethalityDemo',
          title: 'Synthetic Lethality Screen for TP53 loss-of-function',
        }
      },
    ]
  },
};

// Helper function to get dossier by API ID
export const getDossierByAPI = (apiId: string): APIDossierSummary | null => {
  return discriminativeAPIDossiers[apiId] || null;
};

