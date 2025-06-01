'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the CrisPROSequenceAnnotation interface (moved from page.tsx)
export interface CrisPROSequenceAnnotation {
  id: string;
  start: number;
  end: number;
  strand?: '+' | '-';
  baseAnnotationType: 'exon' | 'intron' | 'regulatory_region' | 'cds' | 'utr' | 'mutation_site' | 'ins_del' | 'gRNA_target' | 'HDR_template_region' | 'other';
  crisproDetailedType?: 'gRNA_on_target' | 'gRNA_pam_site' | 'predicted_off_target' | 'HDR_template_region' | 'prime_edit_pegRNA_binding_site' | 'base_editor_window' | 'splice_site' | 'enhancer' | 'silencer' | 'insulator' | 'pathogenic_variant' | 'pathogenic_snp' | 'vus' | 'benign_variant' | 'structural_variant_breakpoint' | 'enhancer_target_for_crispra' | 'splice_site_target' | 'safe_harbor_locus';
  label: string;
  description?: string;
  aiGeneratedSource?: string;
  aiConfidenceScore?: number;
  aiInsight?: string;
  functionalAssessment?: {
    summary: string;
    impactScore?: number;
    evidence?: string[];
  };
  therapeuticRelevance?: {
    score: number;
    summary?: string;
    potentialStrategies?: ('Knockout' | 'HDR_correction' | 'BaseEditing' | 'PrimeEditing' | 'CRISPRa' | 'CRISPRi' | 'SpliceModulation')[];
  };
  predictedImpact?: {
    proteinEffect?: 'missense' | 'nonsense' | 'frameshift' | 'splice_alteration' | 'silent';
    severityScore?: number;
    structuralEffect_simulated?: string;
    expressionImpact_simulated?: string;
  };
  clinicalSignificance?: 'Pathogenic' | 'Likely Pathogenic' | 'VUS' | 'Likely Benign' | 'Benign';
  crisproSimulations?: {
    editingOutcome_simulated?: {
      nhejFrequency?: number;
      simulatedIndelProfile?: { size: string, frequency: number }[];
      simulatedFrameshiftFrequency?: number;
      simulatedFunctionalKnockoutEfficiency?: number;
      simulatedOffTargetCleavageProfile?: string;
      hdrEfficiency?: number;
      simulatedPreciseCorrectionFidelity?: number;
      simulatedUnwantedIntegrationFrequency?: number;
      simulatedAlleleConversionRate?: number;
      baseEditingEfficiency?: number;
      simulatedBystanderEditingProfile?: { position: number, originalBase: string, conversions: {toBase: string, frequency: number}[] }[];
      simulatedIndelByproductFrequency_BE?: number;
      simulatedUndesiredConversionFrequency_BE?: number;
      primeEditingEfficiency?: number;
      simulatedPegRNAIntegrationFidelity?: number;
      simulatedIndelByproductFrequency_PE?: number;
      dominantAlleleProduct?: string;
      simulatedCorrectionLongevity?: string;
      simulatedAlleleComplexity?: number;
      simulatedEditingThresholdForPhenotype?: number;
    };
    functionalImpact_simulated?: {
      proteinFunctionChange?: string;
      pathwayPerturbation?: string;
      cellularPhenotype?: string;
      simulatedProteinFunctionImpact?: string;
      simulatedCellularPathwayPerturbation?: string;
      simulatedCellularPhenotypeChange?: string;
      simulatedProphylacticEfficacyScore?: number;
      simulatedRestoredProteinFunction?: string;
      simulatedTargetGeneExpressionChange?: string;
      simulatedImpactOnCellularViabilityFitness?: string;
    };
    delivery_simulated?: {
      vectorName?: string;
      transductionEfficiency?: number;
      simulatedTransductionEfficiency?: number;
    };
    immunogenicity_simulated?: {
      nucleaseImmunogenicityScore?: number;
      vectorImmunogenicityScore?: number;
      simulatedNucleaseImmunogenicityScore?: number;
      simulatedVectorImmunogenicityScore?: number;
    };
    structuralBiology_simulated?: {
      simulatedProteinStabilityChange?: string;
      simulatedLigandBindingAffinityChange?: string;
      simulatedConformationalChange?: string;
      simulatedEpitopeAccessibilityChange?: string;
    };
    simulationModelVersion?: string;
    simulationDate?: string;
  };
  onTargetScore_predicted?: number;
  specificityScore_predicted?: number;
  editingOutcome_simulated?: {
    nhejFrequency?: number;
    hdrFrequency?: number;
    preciseEditFrequency?: number;
    dominantAllele?: string;
    mosaicismComplexity_predicted?: number;
  };
  nucleaseSuggestions?: {
    primary: {
      name: string;
      pam?: string;
      reasoning?: string;
      predictedImmunogenicity?: 'Low' | 'Medium' | 'High';
    };
    alternatives?: { name: string; pam?: string; reasoning?: string; predictedImmunogenicity?: 'Low' | 'Medium' | 'High'; }[];
  };
  offTargetSummary?: {
    highRiskCount: number;
    mediumRiskCount: number;
    validationRecommended?: boolean;
    linkedOffTargetAnalysisID?: string;
  };
  variantDetails?: {
    alleleFrequency?: number;
    clinvarID?: string;
    dbSNP_ID?: string;
    zygosity?: 'Homozygous' | 'Heterozygous';
    inheritancePattern?: 'Autosomal Dominant' | 'Autosomal Recessive' | 'X-linked';
    predictedProteinEffect?: string;
    structuralImpact_simulated?: string;
  };
  linkedAnalyses?: { analysisId: string; type: string; summary: string; }[];
  experimentalValidationPlan?: string;
  dataSource?: string;
  tags?: string[];
}

interface CrisPROAnnotationDetailsPanelProps {
  annotation: CrisPROSequenceAnnotation | null;
  onClose: () => void;
}

const CrisPROAnnotationDetailsPanel: React.FC<CrisPROAnnotationDetailsPanelProps> = ({ annotation, onClose }) => {
  const [isAiAnalysisVisible, setIsAiAnalysisVisible] = useState(true);

  if (!annotation) {
    return null;
  }

  return (
    <AnimatePresence>
      {annotation && (
        <motion.aside
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
          className="lg:w-1/3 xl:w-1/4 bg-slate-900 rounded-lg shadow-lg border border-slate-700 lg:sticky lg:top-8 h-fit lg:max-h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800"
        >
          {/* Sticky Header Container */}
          <div className="sticky top-0 z-20 bg-slate-900 pb-2">
            {/* Top part of sticky header: Title and Close button */}
            <div className="px-4 pt-4 pb-2">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-sky-400">
                  {annotation.label}
                </h3>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-white transition-colors text-xl leading-none"
                  aria-label="Close details"
                >
                  &times;
                </button>
              </div>
              {annotation.description && (
                <p className="text-sm text-slate-300 mb-1">{annotation.description}</p>
              )}
              <p className="text-sm text-slate-400 mb-3">Type: <span className="capitalize">{annotation.baseAnnotationType.replace(/_/g, ' ')}</span></p>
            </div>
            
            {/* AI Analysis Button - part of sticky header */}
            <div className="px-4 border-t border-b border-slate-800 py-2">
              <button 
                onClick={() => setIsAiAnalysisVisible(!isAiAnalysisVisible)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-sm transition-colors duration-150 flex items-center justify-between"
              >
                <span>AI Analysis</span>
                <motion.span animate={{ rotate: isAiAnalysisVisible ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.span>
              </button>
            </div>
          </div>
          
          {/* Scrollable Content Part (includes conditional AI Analysis and other sections) */}
          <div className="p-4">
            <AnimatePresence initial={false}>
              {isAiAnalysisVisible && (
                <motion.div
                  key="ai-analysis-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {/* AI Insights & Scores Section (Now Collapsible) */}
                  <div className="pt-2 pb-3 border-b border-slate-800 space-y-2 text-sm mb-3">
                    <h4 className="text-md font-semibold text-sky-500 mb-1">AI Analysis Details</h4>
                    {annotation.aiGeneratedSource && (
                      <p><strong className="text-slate-400 w-36 inline-block">AI Source:</strong> <span className="text-teal-300">{annotation.aiGeneratedSource}</span></p>
                    )}
                    {annotation.aiConfidenceScore !== undefined && (
                      <p><strong className="text-slate-400 w-36 inline-block">AI Confidence:</strong> <span className="font-medium text-sky-300">{(annotation.aiConfidenceScore * 100).toFixed(0)}%</span></p>
                    )}
                    {annotation.functionalAssessment && (
                      <div className="mt-1">
                        <strong className="text-slate-400 block mb-0.5">Functional Assessment:</strong>
                        <p className="text-slate-300 text-xs">{annotation.functionalAssessment.summary}</p>
                        {annotation.functionalAssessment.impactScore !== undefined && (
                           <p className="text-xs"><strong className="text-slate-500">Impact Score:</strong> {annotation.functionalAssessment.impactScore}</p>
                        )}
                        {annotation.functionalAssessment.evidence && annotation.functionalAssessment.evidence.length > 0 && (
                          <ul className="list-disc list-inside pl-4 text-xs text-slate-400 mt-1 max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700">
                            {annotation.functionalAssessment.evidence.map((ev, i) => <li key={i}>{ev}</li>)}
                          </ul>
                        )}
                      </div>
                    )}
                    {annotation.therapeuticRelevance && (
                      <div className="mt-1">
                        <strong className="text-slate-400 block mb-0.5">Therapeutic Relevance:</strong>
                        <p className="text-slate-300 text-xs">Score: <span className="font-medium text-sky-300">{(annotation.therapeuticRelevance.score * 100).toFixed(0)}%</span></p>
                        {annotation.therapeuticRelevance.summary && <p className="text-xs text-slate-300 max-h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700">{annotation.therapeuticRelevance.summary}</p>}
                        {annotation.therapeuticRelevance.potentialStrategies && annotation.therapeuticRelevance.potentialStrategies.length > 0 && (
                          <p className="text-xs"><strong className="text-slate-500">Strategies:</strong> {annotation.therapeuticRelevance.potentialStrategies.join(', ')}</p>
                        )}
                      </div>
                    )}
                    {annotation.aiInsight && (
                      <div className="mt-2 pt-2 border-t border-slate-700">
                        <strong className="text-blue-400 block mb-1">CrisPRO AI Insight:</strong>
                        <p className="italic text-slate-300 text-sm max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700">
                          {annotation.aiInsight}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Basic Info Section (ID, Range, CrisPRO Type) */}
            <div className="space-y-1 text-sm mb-3 pb-3 border-b border-slate-800">
              <p><strong className="text-slate-400 w-32 inline-block">ID:</strong> {annotation.id}</p>
              <p><strong className="text-slate-400 w-32 inline-block">Range:</strong> {annotation.start} - {annotation.end} {annotation.strand && `(${annotation.strand})`}</p>
              {annotation.crisproDetailedType && (
                <p><strong className="text-slate-400 w-32 inline-block">CrisPRO Type:</strong> <span className="capitalize text-sky-300">{annotation.crisproDetailedType.replace(/_/g, ' ')}</span></p>
              )}
            </div>
            
            {/* gRNA/Editing Specific Section */}
            {(annotation.onTargetScore_predicted !== undefined || annotation.nucleaseSuggestions || annotation.offTargetSummary || annotation.editingOutcome_simulated) && (
              <div className="mb-3 pb-3 border-b border-slate-800 space-y-2 text-sm">
                <h4 className="text-md font-semibold text-purple-400 mb-1">Editing Specifics</h4>
                {annotation.onTargetScore_predicted !== undefined && (
                  <p><strong className="text-slate-400 w-36 inline-block">On-Target (Pred.):</strong> <span className="font-medium text-green-400">{(annotation.onTargetScore_predicted * 100).toFixed(0)}%</span></p>
                )}
                {annotation.specificityScore_predicted !== undefined && (
                  <p><strong className="text-slate-400 w-36 inline-block">Specificity (Pred.):</strong> <span className="font-medium text-teal-400">{(annotation.specificityScore_predicted * 100).toFixed(0)}%</span></p>
                )}
                {annotation.editingOutcome_simulated && (
                  <div className="mt-1">
                    <strong className="text-slate-400 block">Simulated Editing Outcome:</strong>
                    {annotation.editingOutcome_simulated.nhejFrequency !== undefined && <p className="text-xs ml-2"><strong className="text-slate-500">NHEJ:</strong> {(annotation.editingOutcome_simulated.nhejFrequency * 100).toFixed(0)}%</p>}
                    {annotation.editingOutcome_simulated.hdrFrequency !== undefined && <p className="text-xs ml-2"><strong className="text-slate-500">HDR:</strong> {(annotation.editingOutcome_simulated.hdrFrequency * 100).toFixed(0)}%</p>}
                    {annotation.editingOutcome_simulated.preciseEditFrequency !== undefined && <p className="text-xs ml-2"><strong className="text-slate-500">Precise Edit:</strong> {(annotation.editingOutcome_simulated.preciseEditFrequency * 100).toFixed(0)}%</p>}
                    {annotation.editingOutcome_simulated.dominantAllele && <p className="text-xs ml-2"><strong className="text-slate-500">Dominant Allele:</strong> {annotation.editingOutcome_simulated.dominantAllele}</p>}
                    {annotation.editingOutcome_simulated.mosaicismComplexity_predicted !== undefined && <p className="text-xs ml-2"><strong className="text-slate-500">Mosaicism (Pred.):</strong> {annotation.editingOutcome_simulated.mosaicismComplexity_predicted.toFixed(2)}</p>}
                  </div>
                )}
                {annotation.nucleaseSuggestions && (
                  <div className="mt-1">
                    <strong className="text-slate-400 block">Nuclease Suggestions:</strong>
                    <div className="ml-2">
                      <p className="text-xs"><strong className="text-sky-400">Primary:</strong> {annotation.nucleaseSuggestions.primary.name} (PAM: {annotation.nucleaseSuggestions.primary.pam || 'N/A'})</p>
                      {annotation.nucleaseSuggestions.primary.reasoning && <p className="text-xs ml-4 italic text-slate-500">{annotation.nucleaseSuggestions.primary.reasoning}</p>}
                      {annotation.nucleaseSuggestions.primary.predictedImmunogenicity && <p className="text-xs ml-4"><strong className="text-slate-500">Immunogenicity:</strong> {annotation.nucleaseSuggestions.primary.predictedImmunogenicity}</p>}
                      {annotation.nucleaseSuggestions.alternatives?.map((alt, i) => (
                        <div key={i} className="mt-0.5">
                          <p className="text-xs"><strong className="text-slate-500">Alternative:</strong> {alt.name} (PAM: {alt.pam || 'N/A'})</p>
                          {alt.reasoning && <p className="text-xs ml-4 italic text-slate-500">{alt.reasoning}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                 {annotation.offTargetSummary && (
                  <div className="mt-1">
                    <strong className="text-slate-400 block">Off-Target Summary:</strong>
                    <p className="text-xs ml-2"><strong className="text-red-500">High Risk:</strong> {annotation.offTargetSummary.highRiskCount}, <strong className="text-yellow-500">Medium Risk:</strong> {annotation.offTargetSummary.mediumRiskCount}</p>
                    {annotation.offTargetSummary.validationRecommended && <p className="text-xs ml-2 text-amber-400">Validation Recommended</p>}
                    {annotation.offTargetSummary.linkedOffTargetAnalysisID && <p className="text-xs ml-2"><strong className="text-slate-500">Analysis ID:</strong> {annotation.offTargetSummary.linkedOffTargetAnalysisID}</p>}
                  </div>
                )}
              </div>
            )}

            {/* Variant Specific Section */}
            {annotation.variantDetails && (
               <div className="mb-3 pb-3 border-b border-slate-800 space-y-2 text-sm">
                <h4 className="text-md font-semibold text-amber-400 mb-1">Variant Details</h4>
                {annotation.variantDetails.dbSNP_ID && <p><strong className="text-slate-400 w-32 inline-block">dbSNP ID:</strong> {annotation.variantDetails.dbSNP_ID}</p>}
                {annotation.variantDetails.clinvarID && <p><strong className="text-slate-400 w-32 inline-block">ClinVar ID:</strong> {annotation.variantDetails.clinvarID}</p>}
                {annotation.variantDetails.alleleFrequency !== undefined && <p><strong className="text-slate-400 w-32 inline-block">Allele Freq:</strong> {annotation.variantDetails.alleleFrequency}</p>}
                {annotation.variantDetails.zygosity && <p><strong className="text-slate-400 w-32 inline-block">Zygosity:</strong> {annotation.variantDetails.zygosity}</p>}
                {annotation.variantDetails.inheritancePattern && <p><strong className="text-slate-400 w-32 inline-block">Inheritance:</strong> {annotation.variantDetails.inheritancePattern}</p>}
                {annotation.variantDetails.predictedProteinEffect && <p><strong className="text-slate-400 w-32 inline-block">Protein Effect:</strong> {annotation.variantDetails.predictedProteinEffect}</p>}
                {annotation.variantDetails.structuralImpact_simulated && <p><strong className="text-slate-400 w-32 inline-block">Structural (Sim.):</strong> {annotation.variantDetails.structuralImpact_simulated}</p>}
              </div>
            )}

            {/* General CrisPRO Context Section */}
            <div className="space-y-2 text-sm">
              <h4 className="text-md font-semibold text-slate-500 mb-1">CrisPRO Context</h4>
              {annotation.dataSource && (
                <p><strong className="text-slate-400 w-32 inline-block">Data Source:</strong> {annotation.dataSource}</p>
              )}
               {annotation.experimentalValidationPlan && (
                <div className="mt-1">
                  <strong className="text-slate-400 block mb-0.5">Experimental Validation Plan:</strong>
                  <p className="text-xs text-slate-300">{annotation.experimentalValidationPlan}</p>
                </div>
              )}
              {annotation.linkedAnalyses && annotation.linkedAnalyses.length > 0 && (
                <div className="mt-1">
                  <strong className="text-slate-400 block mb-0.5">Linked Analyses:</strong>
                  <ul className="list-disc list-inside pl-4 text-xs text-slate-300">
                    {annotation.linkedAnalyses.map((link, i) => (
                      <li key={i}>{link.type}: {link.summary} (ID: {link.analysisId})</li>
                    ))}
                  </ul>
                </div>
              )}
              {annotation.tags && annotation.tags.length > 0 && (
                <div className="mt-2">
                  <strong className="text-slate-400 block mb-1">Tags:</strong>
                  <div className="flex flex-wrap gap-1">
                    {annotation.tags.map(tag => (
                      <span key={tag} className="bg-slate-700 text-sky-300 text-xs px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default CrisPROAnnotationDetailsPanel; 