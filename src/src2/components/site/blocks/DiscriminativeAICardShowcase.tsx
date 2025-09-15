import React, { useState } from 'react';
import { useAccessibility } from '../../../contexts/AccessibilityContext';
import { discriminativeAIContent } from '../../../data/discriminativeAIContent';
import { discriminativeAISampleData } from '../../../data/discriminativeAISampleData';
import CrisprEfficacyCard from './CrisprEfficacyCard';
import VariantImpactLandscape from './VariantImpactLandscape';
import EssentialityChart from './EssentialityChart';
import ProteinDeltaCard from './ProteinDeltaCard';
import AccessibilityTrack from './AccessibilityTrack';

interface DiscriminativeAICardShowcaseProps {
  selectedEndpoint?: string;
  showUseCases?: boolean;
}

const DiscriminativeAICardShowcase: React.FC<DiscriminativeAICardShowcaseProps> = ({
  selectedEndpoint,
  showUseCases = true
}) => {
  const { getTextSize } = useAccessibility();
  const [activeEndpoint, setActiveEndpoint] = useState(selectedEndpoint || 'variantImpact');
  const [activeUseCase, setActiveUseCase] = useState<string>('hallmarksOfCancer');

  const endpoints = discriminativeAIContent.endpoints;
  const currentEndpoint = endpoints[activeEndpoint as keyof typeof endpoints];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-600', text: 'text-blue-400', border: 'border-blue-500', light: 'bg-blue-900/20' },
      green: { bg: 'bg-green-600', text: 'text-green-400', border: 'border-green-500', light: 'bg-green-900/20' },
      purple: { bg: 'bg-purple-600', text: 'text-purple-400', border: 'border-purple-500', light: 'bg-purple-900/20' },
      orange: { bg: 'bg-orange-600', text: 'text-orange-400', border: 'border-orange-500', light: 'bg-orange-900/20' },
      red: { bg: 'bg-red-600', text: 'text-red-400', border: 'border-red-500', light: 'bg-red-900/20' }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getAPICapabilities = (endpointKey: string) => {
    const capabilityMap: { [key: string]: Array<{ title: string; description: string }> } = {
      variantImpact: [
        { title: 'Zero-Shot Pathogenicity Prediction', description: 'Predict variant pathogenicity without task-specific training' },
        { title: 'Delta Likelihood Scoring', description: 'Quantify functional disruption with likelihood-based scoring' },
        { title: 'Multi-Modal Variant Analysis', description: 'Handle SNVs, indels, and structural variants uniformly' },
        { title: 'Mechanistic Interpretability', description: 'Explain predictions through learned biological features' },
        { title: 'Cross-Species Generalization', description: 'Apply to variants across phylogenetically diverse species' }
      ],
      geneEssentiality: [
        { title: 'Context-Dependent Essentiality', description: 'Predict gene importance across different cellular contexts' },
        { title: 'Synthetic Lethality Discovery', description: 'Identify gene dependencies in specific mutation backgrounds' },
        { title: 'Therapeutic Window Assessment', description: 'Evaluate selectivity between cancer and normal cells' },
        { title: 'Dynamic Essentiality Scoring', description: 'Account for changing gene dependencies over time' },
        { title: 'Multi-Condition Analysis', description: 'Compare essentiality across treatments and environments' }
      ],
      crisprEfficacy: [
        { title: 'Guide RNA Efficiency Prediction', description: 'Predict cutting efficiency from guide sequence alone' },
        { title: 'Frameshift Outcome Modeling', description: 'Predict likelihood of functional gene knockout' },
        { title: 'Indel Pattern Prediction', description: 'Forecast specific insertion/deletion patterns' },
        { title: 'PAM-Independent Scoring', description: 'Work across different Cas systems and PAM requirements' },
        { title: 'Multiplexed Guide Optimization', description: 'Optimize multiple guides simultaneously' }
      ],
      chromatinAccessibility: [
        { title: 'Tissue-Specific Accessibility', description: 'Predict chromatin state across different cell types' },
        { title: 'Regulatory Element Identification', description: 'Identify enhancers, promoters, and silencers' },
        { title: 'Epigenomic State Prediction', description: 'Predict histone modifications and chromatin structure' },
        { title: 'Transcription Factor Binding', description: 'Predict TF binding sites and accessibility' },
        { title: 'Dynamic Chromatin Modeling', description: 'Model chromatin changes over time and conditions' }
      ],
      proteinFunctionality: [
        { title: 'Functional Impact Quantification', description: 'Measure precise functional changes from sequence alterations' },
        { title: 'Protein Stability Prediction', description: 'Predict thermodynamic stability and folding changes' },
        { title: 'Binding Affinity Modeling', description: 'Predict changes in protein-protein and protein-drug interactions' },
        { title: 'Allosteric Effect Analysis', description: 'Understand long-range effects of mutations' },
        { title: 'Evolutionary Constraint Integration', description: 'Incorporate evolutionary information for better predictions' }
      ]
    };
    return capabilityMap[endpointKey] || [];
  };

  const getTechnicalDetails = (endpointKey: string) => {
    const technicalMap: { [key: string]: Array<{ aspect: string; implementation: string }> } = {
      variantImpact: [
        { aspect: 'Model Architecture', implementation: 'StripedHyena 2 with 1M token context window for long-range genomic dependencies' },
        { aspect: 'Training Data', implementation: '9.3 trillion DNA base pairs from diverse species and genomic contexts' },
        { aspect: 'Scoring Method', implementation: 'Likelihood ratio between reference and alternate sequences' },
        { aspect: 'Interpretability', implementation: 'Sparse Autoencoders with 32,768 learned biological features' }
      ],
      geneEssentiality: [
        { aspect: 'Knockout Simulation', implementation: 'Insert premature stop codons at multiple transcript positions' },
        { aspect: 'Context Integration', implementation: 'Cell-type specific embeddings and mutation background modeling' },
        { aspect: 'Validation Data', implementation: 'DepMap, TCGA, and experimental knockout screen datasets' },
        { aspect: 'Scoring Algorithm', implementation: 'Aggregated likelihood difference across multiple knockout positions' }
      ],
      crisprEfficacy: [
        { aspect: 'Repair Outcome Modeling', implementation: 'Simulate typical indel patterns and frameshift probabilities' },
        { aspect: 'Sequence Features', implementation: 'Guide sequence, PAM context, and local chromatin accessibility' },
        { aspect: 'Training Data', implementation: 'Large-scale CRISPR screen datasets with experimental outcomes' },
        { aspect: 'Efficacy Scoring', implementation: 'Composite score combining cutting efficiency and functional impact' }
      ],
      chromatinAccessibility: [
        { aspect: 'Epigenomic Integration', implementation: 'ATAC-seq, DNase-seq, and ChIP-seq data from ENCODE and Roadmap' },
        { aspect: 'Sequence Context', implementation: 'CpG islands, TF motifs, and chromatin domain boundaries' },
        { aspect: 'Cell-Type Specificity', implementation: 'Tissue-specific embeddings and regulatory element databases' },
        { aspect: 'Prediction Method', implementation: 'Enformer/Borzoi ensemble for multi-scale accessibility prediction' }
      ],
      proteinFunctionality: [
        { aspect: 'Sequence Analysis', implementation: 'Both DNA-level and protein-level sequence embeddings' },
        { aspect: 'Structural Integration', implementation: 'AlphaFold 3 structural predictions for stability analysis' },
        { aspect: 'Functional Validation', implementation: 'Deep Mutational Scanning and experimental protein assays' },
        { aspect: 'Multi-Modal Scoring', implementation: 'Combined sequence, structure, and evolutionary constraint scores' }
      ]
    };
    return technicalMap[endpointKey] || [];
  };

  const renderEndpointComponent = (endpointKey: string) => {
    switch (endpointKey) {
      case 'variantImpact':
        return (
          <VariantImpactLandscape
            locus="chr17:43044000-43052000"
            windowSize={8000}
            variants={[...discriminativeAISampleData.variantImpactLandscape.brca1Region.variants]}
            regions={[...discriminativeAISampleData.variantImpactLandscape.brca1Region.regions]}
            metrics={discriminativeAISampleData.variantImpactLandscape.brca1Region.metrics}
          />
        );
      case 'crisprEfficacy':
        return (
          <CrisprEfficacyCard
            targetGene="KRAS"
            targetLocus="chr12:25245350-25245370"
            guides={[...discriminativeAISampleData.crisprEfficacy.krasExample.guides]}
            metrics={discriminativeAISampleData.crisprEfficacy.krasExample.metrics}
          />
        );
      case 'geneEssentiality':
        return (
          <EssentialityChart 
            series={[
              { context: { cellLine: 'KRAS-driven NSCLC', mutations: ['KRAS-G12C'] }, score: 0.94 },
              { context: { cellLine: 'EGFR-driven NSCLC', mutations: ['EGFR-L858R'] }, score: 0.89 },
              { context: { cellLine: 'Normal lung epithelium', mutations: [] }, score: 0.12 },
              { context: { cellLine: 'Normal hepatocytes', mutations: [] }, score: 0.08 }
            ]}
          />
        );
      case 'proteinFunctionality':
        return (
          <ProteinDeltaCard
            function={-0.89}
            stability={-0.45}
            foldingImpact={0.76}
            notes="High-impact variant (Δ likelihood: -2.34) correlates with severe protein dysfunction"
          />
        );
      case 'chromatinAccessibility':
        return (
          <AccessibilityTrack
            tracks={[{
              context: 'CRISPR target accessibility analysis',
              points: [
                { pos: 15, score: 0.89 },
                { pos: 30, score: 0.95 },
                { pos: 45, score: 0.23 },
                { pos: 60, score: 0.78 },
                { pos: 85, score: 0.92 }
              ]
            }]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Endpoint Selector */}
      <div className="flex flex-wrap gap-3 justify-center">
        {Object.entries(endpoints).map(([key, endpoint]) => {
          const colors = getColorClasses(endpoint.color);
          const isActive = activeEndpoint === key;
          
          return (
            <button
              key={key}
              onClick={() => setActiveEndpoint(key)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl border-2 transition-all duration-200 ${
                isActive 
                  ? `${colors.bg} border-transparent text-white` 
                  : `bg-slate-800 ${colors.border} border-opacity-50 text-slate-300 hover:border-opacity-100`
              }`}
            >
              <span className={getTextSize('text-xl')}>{endpoint.icon}</span>
              <div className="text-left">
                <div className={`font-semibold ${getTextSize('text-sm')}`}>
                  {endpoint.name}
                </div>
                <div className={`text-xs opacity-80 ${getTextSize('text-xs')}`}>
                  {endpoint.id}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Card Layout - Similar to Multi-Modal Biological Predictions */}
      {currentEndpoint && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Component Visualization */}
          <div className="space-y-8">
            <div className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 ${getColorClasses(currentEndpoint.color).bg} rounded-xl flex items-center justify-center text-2xl`}>
                  {currentEndpoint.icon}
                </div>
                <div>
                  <h3 className={`font-bold text-white ${getTextSize('text-3xl')}`}>
                    {currentEndpoint.name}
                  </h3>
                  <p className={`text-slate-400 font-mono ${getTextSize('text-sm')}`}>
                    /{currentEndpoint.id}
                  </p>
                </div>
              </div>
              <p className={`text-slate-300 mb-6 leading-relaxed ${getTextSize('text-lg')}`}>
                {currentEndpoint.description}
              </p>
              
              {/* Embedded Custom Component */}
              <div className="mt-6">
                {renderEndpointComponent(activeEndpoint)}
              </div>
            </div>

            {/* Embedded Use Cases Card */}
            {showUseCases && currentEndpoint.useCases && (
              <div className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8">
                <h3 className={`font-bold text-white mb-6 ${getTextSize('text-2xl')}`}>
                  Use Cases & Applications
                </h3>
                
                {/* Use Case Selector */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {Object.keys(currentEndpoint.useCases).map((useCaseKey) => (
                    <button
                      key={useCaseKey}
                      onClick={() => setActiveUseCase(useCaseKey)}
                      className={`px-3 py-2 rounded-lg border transition-all duration-200 ${getTextSize('text-xs')} ${
                        activeUseCase === useCaseKey
                          ? `${getColorClasses(currentEndpoint.color).bg} border-transparent text-white`
                          : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {useCaseKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </button>
                  ))}
                </div>

                {/* Active Use Case Applications */}
                {activeUseCase && currentEndpoint.useCases[activeUseCase as keyof typeof currentEndpoint.useCases] && (
                  <div className="space-y-3">
                    {[...(currentEndpoint.useCases[activeUseCase as keyof typeof currentEndpoint.useCases] as readonly string[])].map((application, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-slate-700/30 border border-slate-600 rounded-lg">
                        <span className={`${getColorClasses(currentEndpoint.color).text} mt-1 text-sm`}>•</span>
                        <span className={`text-slate-300 ${getTextSize('text-sm')}`}>{application}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Applications (for endpoints without use cases) */}
            {'applications' in currentEndpoint && (
              <div className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8">
                <h3 className={`font-bold text-white mb-6 ${getTextSize('text-2xl')}`}>
                  Applications
                </h3>
                <div className="space-y-3">
                  {[...(currentEndpoint.applications as readonly string[])].map((application, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-slate-700/30 border border-slate-600 rounded-lg">
                      <span className={`${getColorClasses(currentEndpoint.color).text} mt-1 text-sm`}>•</span>
                      <span className={`text-slate-300 ${getTextSize('text-sm')}`}>{application}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Details and Metrics */}
          <div className="space-y-8">
            {/* Performance Metrics Card */}
            <div className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8">
              <h3 className={`font-bold text-white mb-6 ${getTextSize('text-2xl')}`}>
                Performance Metrics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(currentEndpoint.metrics).map(([key, metric]) => (
                  <div key={key} className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 text-center">
                    <div className={`font-bold ${getColorClasses(currentEndpoint.color).text} ${getTextSize('text-lg')}`}>
                      {typeof metric === 'object' && 'auroc' in metric 
                        ? (metric.auroc * 100).toFixed(1) + '%'
                        : typeof metric === 'object' && 'correlation' in metric
                        ? (metric.correlation * 100).toFixed(1) + '%'
                        : typeof metric === 'object' && 'accuracy' in metric
                        ? (metric.accuracy * 100).toFixed(1) + '%'
                        : typeof metric === 'object' && 'aurocRange' in metric
                        ? metric.aurocRange
                        : 'N/A'
                      }
                    </div>
                    <div className={`text-slate-400 ${getTextSize('text-xs')} mt-1`}>
                      {typeof metric === 'object' ? metric.description : key}
                    </div>
                    {typeof metric === 'object' && 'samples' in metric && (
                      <div className={`text-slate-500 ${getTextSize('text-xs')}`}>
                        n={metric.samples?.toLocaleString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced API Details Card */}
            <div className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8">
              <h3 className={`font-bold text-white mb-6 ${getTextSize('text-2xl')}`}>
                API Capabilities
              </h3>
              
              {/* API Outputs */}
              <div className="mb-6">
                <h4 className={`font-semibold ${getColorClasses(currentEndpoint.color).text} mb-3 ${getTextSize('text-base')}`}>
                  Output Parameters
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentEndpoint.outputs.map((output, index) => (
                    <span 
                      key={index}
                      className={`px-3 py-1 bg-slate-700 border ${getColorClasses(currentEndpoint.color).border} border-opacity-50 rounded-full font-mono ${getTextSize('text-xs')} text-slate-300`}
                    >
                      {output}
                    </span>
                  ))}
                </div>
              </div>

              {/* What the API Provides */}
              <div className="space-y-4">
                <h4 className={`font-semibold ${getColorClasses(currentEndpoint.color).text} mb-3 ${getTextSize('text-base')}`}>
                  What This API Provides
                </h4>
                {getAPICapabilities(activeEndpoint).map((capability, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-slate-700/30 border border-slate-600 rounded-lg">
                    <span className={`${getColorClasses(currentEndpoint.color).text} mt-1`}>🔹</span>
                    <div>
                      <div className={`font-semibold text-slate-200 ${getTextSize('text-sm')}`}>
                        {capability.title}
                      </div>
                      <div className={`text-slate-400 ${getTextSize('text-xs')} mt-1`}>
                        {capability.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Implementation Card */}
            <div className="bg-slate-800/50 border border-slate-600 rounded-2xl p-8">
              <h3 className={`font-bold text-white mb-6 ${getTextSize('text-2xl')}`}>
                Technical Implementation
              </h3>
              
              <div className="space-y-4">
                {getTechnicalDetails(activeEndpoint).map((detail, index) => (
                  <div key={index} className="p-4 bg-slate-700/30 border border-slate-600 rounded-lg">
                    <div className={`font-semibold ${getColorClasses(currentEndpoint.color).text} mb-2 ${getTextSize('text-sm')}`}>
                      {detail.aspect}
                    </div>
                    <div className={`text-slate-300 ${getTextSize('text-xs')}`}>
                      {detail.implementation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default DiscriminativeAICardShowcase; 