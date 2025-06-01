import { CrisPROSequenceAnnotation } from '@/components/ui/CrisPROAnnotationDetailsPanel';

export const sampleCrisPROAnnotations: CrisPROSequenceAnnotation[] = [
  {
    id: 'annot_exon1', 
    start: 5, 
    end: 15, 
    strand: '+',
    baseAnnotationType: 'exon',
    label: 'Exon 1 (Gene XYZ)',
    description: 'First coding region of Gene XYZ.',
    aiGeneratedSource: 'ENSEMBL Database + CrisPRO Contextualizer v2.1',
    functionalAssessment: {
      summary: 'Essential for protein XYZ N-terminal domain. Mutations here often pathogenic.',
      impactScore: 0.95,
      evidence: ["ClinVar: Multiple pathogenic variants reported in this exon", "UniProt: Critical binding site PTM_SITE_00123"]
    },
    therapeuticRelevance: {
      score: 0.85,
      summary: 'High relevance for diseases linked to Gene XYZ loss-of-function.',
      potentialStrategies: ['HDR_correction', 'SpliceModulation']
    },
    aiInsight: 'CrisPRO AI (Insight Engine v1.5): This exon is a critical functional region. For gain-of-function mutations, consider splice-modifying ASOs. For loss-of-function, HDR correction strategies targeting this exon show high simulated efficacy (see crisproSimulations). Digital Twin (CellModel_HEK293_v1.2) suggests minimal impact on local chromatin accessibility from proposed edits. Recommend organoid validation.',
    dataSource: 'ENSEMBL v108 + CrisPRO AI Augmentation',
    tags: ['critical_exon', 'functional_domain', 'drug_target_candidate'],
    crisproSimulations: {
      functionalImpact_simulated: { // Simulating impact if this exon is disrupted
        simulatedProteinFunctionImpact: "Loss of N-terminal domain binding capability (score: 0.88 based on AlphaFold2 structural prediction and interface analysis)",
        simulatedCellularPathwayPerturbation: "Downregulation of Pathway ABC by 65% (Simulated Flux Balance Analysis on Recon3D model)"
      },
      // Example if this exon was targeted for correction of a *hypothetical* internal mutation:
      // editingOutcome_simulated: { 
      //   hdrEfficiency: 0.55, 
      //   dominantAlleleProduct: "WT sequence (corrected)",
      //   simulatedPreciseCorrectionFidelity: 0.92,
      //   simulatedAlleleConversionRate: 0.50,
      // },
      simulationModelVersion: "CrisPRO DigitalTwin Suite v4.0 (CellModel_HEK293_v1.2, StructurePred_AF2-Mod_v1.1)",
      simulationDate: "2024-05-20"
    }
  },
  {
    id: 'annot_gRNA_target1',
    start: 8, 
    end: 30, // Assuming gRNA is 23nt, start and end refer to the full target site incl. PAM
    strand: '+',
    baseAnnotationType: 'gRNA_target', 
    crisproDetailedType: 'gRNA_on_target',
    label: 'gRNA XYZ-E1-T1 (SpCas9)',
    description: 'Optimal gRNA targeting Exon 1 of Gene XYZ for knockout strategy.',
    aiGeneratedSource: 'CrisPRO gRNA Design Agent v3.2 (DeepCrispr-V2 backend)',
    aiConfidenceScore: 0.95,
    onTargetScore_predicted: 0.92, // e.g., DeepHF score
    specificityScore_predicted: 0.88, // e.g., CFD score aggregate
    editingOutcome_simulated: { // From top-level, for quick display
      nhejFrequency: 0.78, 
      dominantAllele: "Various small indels (1-5bp, 60% frameshift)",
      mosaicismComplexity_predicted: 0.6
    },
    nucleaseSuggestions: {
      primary: { name: 'SpCas9', pam: 'NGG', reasoning: 'High on-target score, good specificity prediction.', predictedImmunogenicity: 'Medium' },
      alternatives: [
        { name: 'SaCas9', pam: 'NNGRRT', reasoning: 'Smaller size for AAV, slightly lower predicted on-target. Good for in vivo.', predictedImmunogenicity: 'Low' },
        { name: 'CasRx', pam: 'N/A (RNA target)', reasoning: 'If targeting RNA instead of DNA for transient knockdown.', predictedImmunogenicity: 'Low'}
      ]
    },
    offTargetSummary: {
      highRiskCount: 1, // CFD score < 0.1
      mediumRiskCount: 5, // CFD score 0.1-0.3
      validationRecommended: true,
      linkedOffTargetAnalysisID: 'OT_XYZ_E1_T1_FullGenomeScan_v2'
    },
    aiInsight: 'CrisPRO AI (gRNA Optimizer v2.1): High-scoring gRNA for knockout. Off-target analysis identified one high-risk site on Chromosome 5 (see OT_XYZ_E1_T1). Recommend GUIDE-seq or DISCOVER-seq validation. Delivery via LNP is predicted to be efficient in target cell type based on CrisPRO Delivery Module (LNPSim_Liver_v1.0). See detailed simulation data.',
    experimentalValidationPlan: "GUIDE-seq for off-target validation; TIDE/NGS for on-target efficiency in iPSCs; Western blot for protein knockout confirmation.",
    tags: ["knockout_candidate", "SpCas9_compatible", "validation_required", "top_performer"],
    crisproSimulations: {
      editingOutcome_simulated: {
        nhejFrequency: 0.78,
        simulatedIndelProfile: [
          { size: "-1bp", frequency: 0.25 },
          { size: "+1bp", frequency: 0.30 },
          { size: "-2bp", frequency: 0.10 },
          { size: "-5bp_to_-10bp", frequency: 0.08 },
          { size: "other_small_indels", frequency: 0.05}
        ],
        simulatedFrameshiftFrequency: 0.62,
        simulatedFunctionalKnockoutEfficiency: 0.55, // Predicted % of alleles resulting in functional KO
        simulatedOffTargetCleavageProfile: "Site chr5:123456 (OT_1): Predicted 5% NHEJ, mostly -1bp indels.",
        simulatedAlleleComplexity: 12, // Number of distinct alleles expected above 1% frequency
        simulatedEditingThresholdForPhenotype: 0.40, // Needs 40% functional KO for desired effect
      },
      delivery_simulated: {
        vectorName: "LNP_GenericLipidMix1",
        simulatedTransductionEfficiency: 0.70, // % in target hepatocytes (simulated)
      },
      immunogenicity_simulated: {
        simulatedNucleaseImmunogenicityScore: 0.45, // Based on NetMHCpan predictions for SpCas9
        simulatedVectorImmunogenicityScore: 0.15, // For LNP formulation
      },
      simulationModelVersion: "CrisPRO DigitalTwin Suite v4.0 (NHEJModel_v2.3, DeliverySim_v1.1, ImmunoSim_v1.5)",
      simulationDate: "2024-05-21"
    }
  },
  {
    id: 'annot_regulatory1', 
    start: 20, 
    end: 35, 
    strand: '+',
    baseAnnotationType: 'regulatory_region', 
    crisproDetailedType: 'enhancer_target_for_crispra',
    label: 'Enhancer E4 (Gene ABC) - CRISPRa Target',
    description: 'Known enhancer element for Gene ABC, active in liver cells. Targeted for CRISPRa.',
    aiGeneratedSource: 'CrisPRO Regulatory Element Analyzer v1.8 (integrating ENCODE/FANTOM5/ActivityByContact)',
    functionalAssessment: {
      summary: 'Strongly influences Gene ABC expression in hepatic context. Contains multiple TF binding sites (YY1, HNF4A).',
      impactScore: 0.7 // Based on eQTL data and CADD scores for non-coding regions
    },
    therapeuticRelevance: {
      score: 0.6,
      summary: 'Potential target for CRISPRa to upregulate Gene ABC in deficiency disorders.',
      potentialStrategies: ['CRISPRa']
    },
    aiInsight: 'CrisPRO AI (CRISPRa Modulator v1.2): This enhancer is a viable target for CRISPRa. CrisPRO dCas-activator selection module suggests dCas9-VPR with gRNAs targeting specific motifs (see linked gRNA designs) for optimal upregulation. Simulated upregulation: 3-5 fold. Epigenetic simulations suggest minimal off-target chromatin modification.',
    dataSource: 'FANTOM5 Enhancer Atlas + ENCODE rV3',
    tags: ['enhancer', 'CRISPRa_target', 'gene_upregulation', 'liver_active'],
    crisproSimulations: {
      functionalImpact_simulated: { // Post-simulated CRISPRa
        simulatedTargetGeneExpressionChange: "+450% (mean simulated increase in Gene ABC mRNA levels using dCas9-VPR and selected gRNAs)",
        simulatedCellularPhenotypeChange: "Restoration of simulated metabolic marker M_ABC to 85% of normal levels in hepatocyte model."
      },
      // No editing outcome for CRISPRa, as it's non-cutting
      simulationModelVersion: "CrisPRO DigitalTwin Suite v4.0 (CRISPRaSim_v1.7, EpigenomeModSim_v1.0)",
      simulationDate: "2024-05-20"
    }
  },
  {
    id: 'annot_mutation1', 
    start: 40, 
    end: 40, 
    strand: '+',
    baseAnnotationType: 'mutation_site', 
    crisproDetailedType: 'pathogenic_snp',
    label: 'Pathogenic SNP rs123 (Gene XYZ, p.Gly15Asp)',
    description: 'A missense G>A SNP in Exon 2 of Gene XYZ strongly associated with Disease Alpha. Target for base editing.',
    aiGeneratedSource: 'CrisPRO Variant Interpreter v2.5 (ClinVar Miner + AI Pathogenicity Predictor - PrimateAI/EVE based)',
    aiConfidenceScore: 0.98, // Confidence in pathogenicity call + data integration
    functionalAssessment: {
      summary: 'High: Disrupts critical protein fold. Directly linked to Disease Alpha phenotype by multiple studies.',
      impactScore: 0.95, // Based on integrated scores like CADD, ClinPred
      evidence: ["ClinVar: RCV000012345.6 (Pathogenic)", "HGMD: CM012345"]
    },
    variantDetails: { // This field remains largely the same but is crucial context
        alleleFrequency: 0.001,
        clinvarID: 'VCV000012345',
        dbSNP_ID: 'rs123',
        zygosity: 'Heterozygous', // Assuming for therapeutic context
        inheritancePattern: 'Autosomal Dominant',
        predictedProteinEffect: 'Missense (p.Gly15Asp / c.44G>A)',
        structuralImpact_simulated: 'Destabilizes beta-sheet in Domain 2 (CrisPRO Structure Module - AlphaFold2 prediction, ΔΔG: +3.1 kcal/mol)'
    },
    therapeuticRelevance: {
      score: 0.95,
      summary: 'Ideal candidate for precise correction to wild-type.',
      potentialStrategies: ['BaseEditing', 'PrimeEditing', 'HDR_correction']
    },
    aiInsight: 'CrisPRO AI (BaseEditor Pro v2.0): Pathogenic SNP suitable for A-to-G base editing (e.g., ABE8e targeting complementary C on antisense strand). CrisPRO Base Editor Design Module identifies optimal gRNAs with minimal bystander potential (see linked gRNA BE_rs123_G1). Simulated correction efficiency: 60-70%. Off-target sites for selected BE gRNA are predicted to be low risk. Recommend functional validation of corrected protein structure and activity.',
    clinicalSignificance: 'Pathogenic',
    nucleaseSuggestions: { // Suggests base editor
        primary: { name: 'ABE8e', pam: 'NGG (for gRNA)', reasoning: 'Efficient A-to-G editing with selected gRNA. High fidelity variant.', predictedImmunogenicity: 'Low' }
    },
    tags: ["base_editing_target", "pathogenic_variant", "precision_medicine", "rs123_correction_candidate"],
    crisproSimulations: {
      editingOutcome_simulated: { // For Base Editing this SNP (A on sense strand means T on guide-binding strand, so ABE targets A)
        baseEditingEfficiency: 0.68, // Target A to G conversion %
        dominantAlleleProduct: "Corrected (G allele at pos 44 / p.Gly15)",
        simulatedBystanderEditingProfile: [ // Example: one potential bystander A three bases away
          { position: 43, originalBase: 'A', conversions: [{ toBase: 'G', frequency: 0.04}] } // Assuming position relative to target A
        ],
        simulatedIndelByproductFrequency_BE: 0.02, // Small indels sometimes occur with BEs
        simulatedCorrectionLongevity: "High (predicted >98% stable over 50 simulated divisions in progenitor cell model)",
        simulatedAlleleConversionRate: 0.65 // Pathogenic to wild-type
      },
      functionalImpact_simulated: { // Post-simulated correction
        simulatedRestoredProteinFunction: "Restored protein activity to 95% of WT (simulated kinase assay)",
        simulatedCellularPhenotypeChange: "Disease Alpha cellular risk markers (e.g., aggregated protein XYZ) reduced by 85% (simulated in patient-derived iPSC model)",
        simulatedProphylacticEfficacyScore: 0.90 // If this was a germline risk variant being corrected prophylactically
      },
      structuralBiology_simulated: {
        simulatedProteinStabilityChange: "Stabilized structure post-correction (ΔΔG: -2.9 kcal/mol compared to pathogenic variant)",
        simulatedConformationalChange: "Restoration of native active site conformation (RMSD to WT < 0.5Å)"
      },
      simulationModelVersion: "CrisPRO DigitalTwin Suite v4.0 (BaseEditSim_v2.2, StructurePred_AF2-Mod_v1.1, CellModel_iPSC_DiseaseAlpha_v1.0)",
      simulationDate: "2024-05-22"
    }
  }
]; 