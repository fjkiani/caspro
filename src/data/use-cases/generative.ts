import type { UseCase } from '@/types/use-case';

export const crisprTherapyDesign: UseCase = {
  id: 'crispr_therapy_design',
  name: 'CRISPR Therapy Design Pipeline',
  summary: 'End-to-end design of CRISPR therapeutic components: guide RNAs, HDR templates, and safety validation.',
  seed: { 
    gene: 'BRCA1', 
    target_locus: 'chr17:43044295-43044395',
    therapeutic_goal: 'gene_knockout',
    pam_type: 'NGG'
  },
  category: 'generative',
  tags: ['CRISPR', 'Gene Therapy', 'Guide RNA Design'],
  steps: [
    {
      id: 'generate_optimized_guide_rna',
      title: 'Generate Optimized Guide RNAs',
      input: (ctx) => ({ 
        target_locus: ctx.seed.target_locus,
        pam_type: ctx.seed.pam_type,
        num_guides: 5,
        avoid_off_targets: true
      }),
      runMode: 'simulate'
    },
    {
      id: 'generate_repair_template',
      title: 'Design HDR Repair Template',
      input: (ctx) => ({ 
        target_locus: ctx.seed.target_locus,
        correction_type: 'knockout_repair',
        homology_arm_length: 4000
      }),
      runMode: 'simulate'
    },
    {
      id: 'predict_crispr_spacer_efficacy',
      title: 'Validate Guide Efficacy',
      input: (ctx) => ({ 
        guide_sequence: ctx.outputs?.generate_optimized_guide_rna?.output?.guides?.[0]?.sequence || 'GTTCCAGAACCTGAAAGCTG',
        target_gene: ctx.seed.gene
      }),
      runMode: 'simulate'
    }
  ],
  dossierApi: 'generate_optimized_guide_rna'
};

export const proteinTherapyDesign: UseCase = {
  id: 'protein_therapy_design',
  name: 'Therapeutic Protein Engineering',
  summary: 'Design and optimize therapeutic proteins with enhanced properties for cancer immunotherapy.',
  seed: {
    protein_type: 'antibody',
    target_antigen: 'PD-L1',
    optimization_goals: ['binding_affinity', 'stability', 'low_immunogenicity'],
    expression_system: 'mammalian'
  },
  category: 'generative',
  tags: ['Protein Design', 'Immunotherapy', 'Antibody Engineering'],
  steps: [
    {
      id: 'generate_therapeutic_protein',
      title: 'Generate Protein Candidates',
      input: (ctx) => ({
        protein_type: ctx.seed.protein_type,
        target_antigen: ctx.seed.target_antigen,
        optimization_goals: ctx.seed.optimization_goals,
        expression_system: ctx.seed.expression_system
      }),
      runMode: 'simulate'
    },
    {
      id: 'predict_protein_functional_change',
      title: 'Validate Protein Function',
      input: (ctx) => ({
        protein: ctx.seed.target_antigen,
        candidate_sequence: ctx.outputs?.generate_therapeutic_protein?.output?.protein_candidates?.[0]?.sequence || 'MDSKGSS...',
        optimization_type: 'therapeutic_enhancement'
      }),
      runMode: 'simulate'
    }
  ],
  dossierApi: 'generate_therapeutic_protein'
};

export const geneTherapyVectorDesign: UseCase = {
  id: 'gene_therapy_vector_design',
  name: 'Gene Therapy Vector Optimization',
  summary: 'Design tissue-specific regulatory elements and optimize expression for targeted gene therapy.',
  seed: {
    target_tissue: 'liver',
    expression_level: 'high',
    therapeutic_gene: 'F9', // Factor IX for hemophilia
    vector_type: 'AAV'
  },
  category: 'generative',
  tags: ['Gene Therapy', 'AAV Vectors', 'Regulatory Elements'],
  steps: [
    {
      id: 'generate_regulatory_element',
      title: 'Design Tissue-Specific Promoter',
      input: (ctx) => ({
        element_type: 'promoter',
        tissue_specificity: [ctx.seed.target_tissue, 'hepatocytes'],
        expression_level: ctx.seed.expression_level,
        inducible: false
      }),
      runMode: 'simulate'
    },
    {
      id: 'generate_epigenome_sequence',
      title: 'Optimize Chromatin Context',
      input: (ctx) => ({
        genomic_region: 'chr17:43000000-43100000',
        target_modifications: ['H3K27ac', 'H3K4me3'],
        accessibility_enhancement: true,
        cell_type: 'hepatocytes'
      }),
      runMode: 'simulate'
    },
    {
      id: 'predict_chromatin_accessibility',
      title: 'Validate Regulatory Function',
      input: (ctx) => ({
        genomic_region: 'chr17:43000000-43100000',
        cell_type: ctx.seed.target_tissue,
        regulatory_elements: ctx.outputs?.generate_regulatory_element?.output?.regulatory_elements || []
      }),
      runMode: 'simulate'
    }
  ],
  dossierApi: 'generate_regulatory_element'
};

export const personalizedCancerTherapy: UseCase = {
  id: 'personalized_cancer_therapy',
  name: 'Personalized Cancer Therapy Design',
  summary: 'End-to-end personalized therapy design combining target identification, asset generation, and validation.',
  seed: {
    tumor_profile: {
      mutations: ['KRAS G12C', 'TP53 R273H'],
      cancer_type: 'NSCLC',
      stage: 'metastatic'
    },
    therapeutic_modalities: ['small_molecule', 'immunotherapy', 'gene_therapy']
  },
  category: 'generative',
  tags: ['Personalized Medicine', 'Multi-Modal Therapy', 'Precision Oncology'],
  steps: [
    {
      id: 'analyze_cancer_hallmarks',
      title: 'Analyze Cancer Hallmarks',
      input: (ctx) => ({
        tumor_mutations: ctx.seed.tumor_profile.mutations,
        cancer_type: ctx.seed.tumor_profile.cancer_type,
        clinical_stage: ctx.seed.tumor_profile.stage
      }),
      runMode: 'simulate'
    },
    {
      id: 'design_personalized_therapy',
      title: 'Design Therapeutic Strategy',
      input: (ctx) => ({
        tumor_profile: ctx.seed.tumor_profile,
        hallmark_analysis: ctx.outputs?.analyze_cancer_hallmarks?.output || {},
        modalities: ctx.seed.therapeutic_modalities
      }),
      runMode: 'simulate'
    },
    {
      id: 'generate_therapeutic_protein',
      title: 'Generate Therapeutic Assets',
      input: (ctx) => ({
        protein_type: 'nanobody',
        target_antigen: 'KRAS G12C',
        optimization_goals: ['binding_affinity', 'specificity'],
        expression_system: 'bacterial'
      }),
      runMode: 'simulate'
    }
  ],
  dossierApi: 'design_personalized_therapy'
};

export const generativeUseCases = [
  crisprTherapyDesign,
  proteinTherapyDesign,
  geneTherapyVectorDesign,
  personalizedCancerTherapy
];
