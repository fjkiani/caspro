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

  // New endpoints
  splice_impact: {
    apiId: 'splice_impact',
    assetId: 'BRCA1 Splice Impact Analysis',
    status: 'Splicing Disruption Likely',
    statusColor: 'orange',
    checkpoints: [
      { icon: Activity, label: 'Splice Site Scored', color: 'orange', detail: 'Motif strength reduced' },
      { icon: CheckCircle, label: 'Exon Skipping Risk', color: 'yellow', detail: 'Predicted exon skipping' }
    ],
    description: 'Splice motif disruption suggests altered splicing with exon skipping risk.',
    keyFindings: [ 'Junction confidence high', 'Potential exon skipping event detected' ],
  },

  drug_target_interaction: {
    apiId: 'drug_target_interaction',
    assetId: 'KRAS Pathway Drug Sensitivity',
    status: 'Drug Sensitive',
    statusColor: 'green',
    checkpoints: [
      { icon: Target, label: 'MOA Mapped', color: 'green', detail: 'KRAS G12C inhibitor aligned' },
      { icon: CheckCircle, label: 'Response Score', color: 'green', detail: '0.81 likelihood of response' }
    ],
    description: 'Variant/pathway profile indicates likely sensitivity to KRAS G12C inhibitor.',
    keyFindings: [ 'KRAS driver intact', 'Co-factor status compatible' ],
  },

  immunogenicity: {
    apiId: 'immunogenicity',
    assetId: 'Therapeutic Protein Immunogenicity',
    status: 'Moderate Immunogenicity Risk',
    statusColor: 'yellow',
    checkpoints: [
      { icon: Activity, label: 'Epitope Scan', color: 'yellow', detail: 'Top epitope at pos 87' },
      { icon: CheckCircle, label: 'MHC Binding', color: 'yellow', detail: 'HLA-A*02:01 moderate' }
    ],
    description: 'Predicted moderate immunogenicity with specific MHC binding hotspots.',
    keyFindings: [ 'Consider deimmunization of hotspot regions' ],
  },

  generate_optimized_guide_rna: {
    apiId: 'generate_optimized_guide_rna',
    assetId: 'Guide RNA Design - BRCA1',
    status: 'Top Designs Generated',
    statusColor: 'green',
    checkpoints: [ { icon: Scissors, label: 'Candidates Generated', color: 'green', detail: 'PAM-compatible set' }, { icon: CheckCircle, label: 'Composite Score', color: 'green', detail: 'Multi-objective optimized' } ],
    description: 'Generated and ranked guide RNA candidates using multi-objective optimization.',
    keyFindings: [ 'High on-target, low off-target top guide identified' ],
  },

  generate_repair_template: {
    apiId: 'generate_repair_template',
    assetId: 'HDR Template Design - BRCA1',
    status: 'HDR Templates Generated',
    statusColor: 'green',
    checkpoints: [ { icon: Activity, label: 'Homology Arms', color: 'green', detail: '500bp configured' }, { icon: CheckCircle, label: 'Likelihood Optimized', color: 'green', detail: 'Sequence likelihood maximized' } ],
    description: 'Designed HDR templates balancing sequence likelihood and QC constraints.',
    keyFindings: [ 'Top template meets GC and repeat constraints' ],
  },

  generate_therapeutic_protein: {
    apiId: 'generate_therapeutic_protein',
    assetId: 'Therapeutic Protein Design',
    status: 'Candidate Proteins Designed',
    statusColor: 'sky',
    checkpoints: [ { icon: Activity, label: 'Codon Optimization', color: 'sky', detail: 'Human expression optimized' }, { icon: CheckCircle, label: 'Function/Structure Scored', color: 'green', detail: 'Composite rank computed' } ],
    description: 'Generated protein candidates with balanced function and structure.',
    keyFindings: [ 'Top candidate achieves strong function and structure scores' ],
  },

  cancer_hallmarks: {
    apiId: 'cancer_hallmarks',
    assetId: 'Hallmark Profile Summary',
    status: 'Hallmark Profile Generated',
    statusColor: 'green',
    checkpoints: [ { icon: Activity, label: 'Aggregation Complete', color: 'green', detail: 'Endpoints aggregated' }, { icon: CheckCircle, label: 'Mapping Complete', color: 'green', detail: 'Hallmarks scored' } ],
    description: 'Composite hallmark profile with prioritized vulnerabilities.',
    keyFindings: [ 'Proliferative signaling dominant', 'DNA repair deficiency present' ],
  },

  personalized_therapy: {
    apiId: 'personalized_therapy',
    assetId: 'Therapy Strategy',
    status: 'Therapy Strategy Designed',
    statusColor: 'green',
    checkpoints: [ { icon: Target, label: 'Target Selected', color: 'green', detail: 'KRAS G12C' }, { icon: CheckCircle, label: 'Assets Generated', color: 'green', detail: 'Guides and templates ready' } ],
    description: 'Designed a combined modality strategy with backup editing plan.',
    keyFindings: [ 'Primary drug modality with designed edit contingency' ],
  }
};

// Helper function to get dossier by API ID
export const getDossierByAPI = (apiId: string): APIDossierSummary | null => {
  return discriminativeAPIDossiers[apiId] || null;
};

// Helper function to generate dynamic dossier based on demo results
export const generateDynamicDossier = (
  apiId: string,
  demoResults: any,
  inputParams: any
): APIDossierSummary | null => {
  const baseDossier = discriminativeAPIDossiers[apiId];
  if (!baseDossier) return null;

  const output = demoResults?.output ?? demoResults; // allow direct or wrapped

  const dynamicCheckpoints: DossierCheckpoint[] = [];
  const keyFindings: string[] = [];
  let status = baseDossier.status;
  let statusColor = baseDossier.statusColor;
  let description = baseDossier.description;

  if (apiId === 'variant_impact' && output) {
    const delta = output.delta_likelihood_score;
    const pred = output.pathogenicity_prediction;
    dynamicCheckpoints.push(
      { icon: Target, label: 'Delta likelihood computed', color: 'green', detail: `${delta}` },
      { icon: CheckCircle, label: 'Classification', color: pred === 'Pathogenic' ? 'green' : 'yellow', detail: pred }
    );
    keyFindings.push(
      `Predicted ${pred} with delta likelihood ${delta}`,
      output.feature_disruption_scores?.protein_coding ? `Protein coding disruption score ${output.feature_disruption_scores.protein_coding}` : ''
    );
    status = pred === 'Pathogenic' ? 'Pathogenic - High Confidence' : 'Likely Benign/Uncertain';
    statusColor = pred === 'Pathogenic' ? 'green' : 'yellow';
    description = `Variant impact analysis for ${inputParams?.gene ?? ''} ${inputParams?.variant ?? ''} shows ${pred} classification with delta_ll ${delta}.`;
  }

  if (apiId === 'protein_functional_change' && output) {
    dynamicCheckpoints.push(
      { icon: Activity, label: 'ΔΔG stability change', color: output.stability_change < 0 ? 'orange' : 'green', detail: `${output.stability_change}` },
      { icon: Target, label: 'Functional effect', color: 'orange', detail: output.predicted_effect }
    );
    keyFindings.push(
      `Functional score ${output.functional_score} with domain impact ${output.domain_impact}`,
      output.dms_correlation ? `Aligned with DMS (r=${output.dms_correlation})` : ''
    );
  }

  if (apiId === 'chromatin_accessibility' && output) {
    dynamicCheckpoints.push(
      { icon: Zap, label: 'Accessibility score', color: 'green', detail: `${output.accessibility_score}` },
      { icon: Target, label: 'State', color: 'green', detail: output.chromatin_state }
    );
    keyFindings.push(
      `Open chromatin with tissue specificity ${output.tissue_specificity}`,
      output.tf_binding_sites?.length ? `TF motifs: ${output.tf_binding_sites.map((t: any) => t.tf).join(', ')}` : ''
    );
  }

  if (apiId === 'gene_essentiality' && output) {
    const cancer = output.essentiality_scores?.[0]?.score;
    const normal = output.essentiality_scores?.[1]?.score;
    dynamicCheckpoints.push(
      { icon: Dna, label: 'Context scores computed', color: 'green', detail: `Cancer ${cancer} vs Normal ${normal}` },
      { icon: CheckCircle, label: 'Therapeutic window', color: 'green', detail: `${output.therapeutic_window}×` }
    );
    keyFindings.push(`Selectivity window ${output.therapeutic_window}× with high target priority (${output.target_priority})`);
  }

  if (apiId === 'crispr_efficacy' && output) {
    dynamicCheckpoints.push(
      { icon: Scissors, label: 'Cutting efficiency', color: 'green', detail: `${output.cutting_efficiency}` },
      { icon: CheckCircle, label: 'Frameshift probability', color: 'green', detail: `${output.frameshift_probability}` }
    );
    keyFindings.push('High-efficacy guide with strong KO probability; alternatives available.');
  }

  if (apiId === 'splice_impact' && output) {
    dynamicCheckpoints.push(
      { icon: Activity, label: 'Splice disruption score', color: 'orange', detail: `${output.splice_disruption_score}` },
      { icon: CheckCircle, label: 'Predicted effect', color: 'yellow', detail: output.predicted_effect }
    );
    keyFindings.push('Splicing alteration likely; monitor exon inclusion changes.');
    status = 'Splicing Disruption Likely';
    statusColor = 'orange';
  }

  if (apiId === 'drug_target_interaction' && output) {
    dynamicCheckpoints.push(
      { icon: Target, label: 'Predicted response', color: 'green', detail: output.predicted_response },
      { icon: CheckCircle, label: 'Response score', color: 'green', detail: `${output.response_score}` }
    );
    keyFindings.push(`Biomarkers: ${(output.biomarkers || []).join(', ')}`);
    status = output.predicted_response === 'Sensitive' ? 'Drug Sensitive' : 'Drug Resistant';
    statusColor = output.predicted_response === 'Sensitive' ? 'green' : 'orange';
  }

  if (apiId === 'immunogenicity' && output) {
    dynamicCheckpoints.push(
      { icon: Activity, label: 'Epitope score', color: 'yellow', detail: `${output.t_cell_epitope_score}` },
      { icon: CheckCircle, label: 'Hotspots', color: 'yellow', detail: `${(output.mhc_binding_hotspots||[]).length} regions` }
    );
    keyFindings.push('Moderate immunogenicity risk; consider deimmunization.');
    status = 'Moderate Immunogenicity Risk';
    statusColor = 'yellow';
  }

  if (apiId === 'generate_optimized_guide_rna' && output) {
    const top = output.guides?.[0];
    dynamicCheckpoints.push(
      { icon: Scissors, label: 'Candidates generated', color: 'green', detail: `${output.guides?.length || 0}` },
      { icon: CheckCircle, label: 'Top composite score', color: 'green', detail: `${top?.composite_score ?? ''}` }
    );
    keyFindings.push(`Top guide: ${top?.sequence}`);
    status = 'Top Designs Generated';
    statusColor = 'green';
  }

  if (apiId === 'generate_repair_template' && output) {
    dynamicCheckpoints.push(
      { icon: Activity, label: 'Templates generated', color: 'green', detail: `${output.templates?.length || 0}` },
      { icon: CheckCircle, label: 'QC pass', color: 'green', detail: 'GC/repeats ok' }
    );
    keyFindings.push('HDR templates designed and ranked.');
    status = 'HDR Templates Generated';
    statusColor = 'green';
  }

  if (apiId === 'generate_therapeutic_protein' && output) {
    dynamicCheckpoints.push(
      { icon: Activity, label: 'Candidates', color: 'sky', detail: `${output.candidates?.length || 0}` },
      { icon: CheckCircle, label: 'Top scores', color: 'green', detail: `${output.candidates?.[0]?.function_score}/${output.candidates?.[0]?.structure_score}` }
    );
    keyFindings.push('Protein candidates generated with favorable scores.');
    status = 'Candidate Proteins Designed';
    statusColor = 'sky';
  }

  if (apiId === 'cancer_hallmarks' && output) {
    dynamicCheckpoints.push(
      { icon: Activity, label: 'Hallmarks scored', color: 'green', detail: `${(output.hallmarks||[]).length}` },
      { icon: CheckCircle, label: 'Vulnerabilities', color: 'green', detail: `${(output.vulnerabilities||[]).length}` }
    );
    keyFindings.push(`Top hallmark: ${output.hallmarks?.[0]?.name}`);
    status = 'Hallmark Profile Generated';
    statusColor = 'green';
  }

  if (apiId === 'personalized_therapy' && output) {
    dynamicCheckpoints.push(
      { icon: Target, label: 'Target', color: 'green', detail: output.strategy?.target },
      { icon: CheckCircle, label: 'Assets', color: 'green', detail: `${(output.strategy?.design_assets?.guides||[]).length} guides / ${(output.strategy?.design_assets?.templates||[]).length} templates` }
    );
    keyFindings.push(`Modality: ${output.strategy?.modality}`);
    status = 'Therapy Strategy Designed';
    statusColor = 'green';
  }

  const assetId = inputParams?.variant || inputParams?.gene || inputParams?.genomic_region || baseDossier.assetId;

  return {
    ...baseDossier,
    assetId,
    status,
    statusColor,
    description,
    keyFindings: keyFindings.filter(Boolean),
    checkpoints: dynamicCheckpoints.length ? dynamicCheckpoints : baseDossier.checkpoints,
  };
}; 