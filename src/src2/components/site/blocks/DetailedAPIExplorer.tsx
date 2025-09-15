import React, { useState } from 'react';
import { useAccessibility } from '../../../contexts/AccessibilityContext';
import { discriminativeAIContent } from '../../../data/discriminativeAIContent';

interface DetailedAPIExplorerProps {
  selectedEndpoint?: string;
  onEndpointChange?: (endpointKey: string) => void;
}

const DetailedAPIExplorer: React.FC<DetailedAPIExplorerProps> = ({
  selectedEndpoint = 'variantImpact',
  onEndpointChange
}) => {
  const { getTextSize } = useAccessibility();
  const [activeEndpoint, setActiveEndpoint] = useState(selectedEndpoint);
  const [activeTab, setActiveTab] = useState<'useCases' | 'technical' | 'capabilities'>('useCases');
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
    const capabilityMap: { [key: string]: Array<{ title: string; description: string; details: string }> } = {
      variantImpact: [
        { 
          title: 'Zero-Shot Pathogenicity Prediction', 
          description: 'Predict variant pathogenicity without task-specific training',
          details: 'Uses Evo2\'s foundation model understanding to assess functional impact without requiring labeled training data for each variant type. Achieves 95.7% AUROC on ClinVar.'
        },
        { 
          title: 'Delta Likelihood Scoring', 
          description: 'Quantify functional disruption with likelihood-based scoring',
          details: 'Computes the difference in sequence likelihood between reference and alternate alleles. More negative scores indicate greater functional disruption.'
        },
        { 
          title: 'Multi-Modal Variant Analysis', 
          description: 'Handle SNVs, indels, and structural variants uniformly',
          details: 'Single unified model handles all variant types from single nucleotide changes to large structural rearrangements with consistent scoring methodology.'
        },
        { 
          title: 'Mechanistic Interpretability', 
          description: 'Explain predictions through learned biological features',
          details: 'Sparse Autoencoders reveal 32,768 learned biological concepts including exon boundaries, TF motifs, and protein structural elements.'
        },
        { 
          title: 'Cross-Species Generalization', 
          description: 'Apply to variants across phylogenetically diverse species',
          details: 'Trained on diverse genomic data enabling variant analysis across 8+ species with 82-99% AUROC performance.'
        }
      ],
      geneEssentiality: [
        { 
          title: 'Context-Dependent Essentiality', 
          description: 'Predict gene importance across different cellular contexts',
          details: 'Accounts for cell type, tissue, and genetic background to provide context-specific essentiality scores rather than universal predictions.'
        },
        { 
          title: 'Synthetic Lethality Discovery', 
          description: 'Identify gene dependencies in specific mutation backgrounds',
          details: 'Predicts which genes become essential when other genes are mutated, enabling precision targeting of cancer vulnerabilities.'
        },
        { 
          title: 'Therapeutic Window Assessment', 
          description: 'Evaluate selectivity between cancer and normal cells',
          details: 'Quantifies the difference in gene essentiality between tumor and healthy tissue to identify safe therapeutic targets.'
        },
        { 
          title: 'Dynamic Essentiality Scoring', 
          description: 'Account for changing gene dependencies over time',
          details: 'Models how gene essentiality changes during development, disease progression, or treatment response.'
        },
        { 
          title: 'Multi-Condition Analysis', 
          description: 'Compare essentiality across treatments and environments',
          details: 'Evaluates how drug treatments, stress conditions, or environmental factors alter gene dependency networks.'
        }
      ],
      crisprEfficacy: [
        { 
          title: 'Guide RNA Efficiency Prediction', 
          description: 'Predict cutting efficiency from guide sequence alone',
          details: 'Analyzes guide RNA sequence features to predict on-target cutting efficiency with 76% correlation to experimental results.'
        },
        { 
          title: 'Frameshift Outcome Modeling', 
          description: 'Predict likelihood of functional gene knockout',
          details: 'Models repair outcomes to predict probability of frameshift mutations that lead to functional gene knockout with 82% accuracy.'
        },
        { 
          title: 'Indel Pattern Prediction', 
          description: 'Forecast specific insertion/deletion patterns',
          details: 'Predicts the specific indel patterns likely to result from CRISPR cutting at each target site based on local sequence context.'
        },
        { 
          title: 'PAM-Independent Scoring', 
          description: 'Work across different Cas systems and PAM requirements',
          details: 'Unified scoring system works across Cas9, Cas12, and other CRISPR systems with different PAM sequence requirements.'
        },
        { 
          title: 'Multiplexed Guide Optimization', 
          description: 'Optimize multiple guides simultaneously',
          details: 'Considers interactions between multiple guide RNAs to optimize multiplexed CRISPR experiments and minimize off-target effects.'
        }
      ],
      chromatinAccessibility: [
        { 
          title: 'Tissue-Specific Accessibility', 
          description: 'Predict chromatin state across different cell types',
          details: 'Integrates cell-type specific regulatory networks to predict chromatin accessibility with 85% correlation to ATAC-seq data.'
        },
        { 
          title: 'Regulatory Element Identification', 
          description: 'Identify enhancers, promoters, and silencers',
          details: 'Predicts functional regulatory elements and their activity levels across different cellular contexts and conditions.'
        },
        { 
          title: 'Epigenomic State Prediction', 
          description: 'Predict histone modifications and chromatin structure',
          details: 'Models chromatin structure including histone modifications, nucleosome positioning, and higher-order chromatin organization.'
        },
        { 
          title: 'Transcription Factor Binding', 
          description: 'Predict TF binding sites and accessibility',
          details: 'Identifies transcription factor binding sites and predicts their accessibility in different cellular contexts.'
        },
        { 
          title: 'Dynamic Chromatin Modeling', 
          description: 'Model chromatin changes over time and conditions',
          details: 'Predicts how chromatin accessibility changes during development, differentiation, or in response to stimuli.'
        }
      ],
      proteinFunctionality: [
        { 
          title: 'Functional Impact Quantification', 
          description: 'Measure precise functional changes from sequence alterations',
          details: 'Quantifies the specific functional impact of mutations with 71% correlation to Deep Mutational Scanning experiments.'
        },
        { 
          title: 'Protein Stability Prediction', 
          description: 'Predict thermodynamic stability and folding changes',
          details: 'Models protein stability changes including melting temperature, folding kinetics, and aggregation propensity.'
        },
        { 
          title: 'Binding Affinity Modeling', 
          description: 'Predict changes in protein-protein and protein-drug interactions',
          details: 'Predicts how mutations affect binding affinity for protein partners, drugs, and other molecular interactions.'
        },
        { 
          title: 'Allosteric Effect Analysis', 
          description: 'Understand long-range effects of mutations',
          details: 'Models how mutations at one site affect protein function at distant sites through allosteric mechanisms.'
        },
        { 
          title: 'Evolutionary Constraint Integration', 
          description: 'Incorporate evolutionary information for better predictions',
          details: 'Integrates evolutionary conservation and constraint data to improve functional impact predictions.'
        }
      ]
    };
    return capabilityMap[endpointKey] || [];
  };

  const getTechnicalDetails = (endpointKey: string) => {
    const technicalMap: { [key: string]: Array<{ aspect: string; implementation: string; details: string }> } = {
      variantImpact: [
        { 
          aspect: 'Model Architecture', 
          implementation: 'StripedHyena 2 with 1M token context window',
          details: 'Novel convolutional multi-hybrid architecture optimized for long DNA sequences. 1M token context enables analysis of entire genes and regulatory regions in single pass.'
        },
        { 
          aspect: 'Training Data', 
          implementation: '9.3 trillion DNA base pairs from diverse species',
          details: 'Massive multi-species dataset including human, model organisms, and phylogenetically diverse species. Enables cross-species generalization and robust predictions.'
        },
        { 
          aspect: 'Scoring Method', 
          implementation: 'Likelihood ratio between reference and alternate sequences',
          details: 'Computes log-likelihood of reference and alternate sequences. Delta likelihood (alt - ref) quantifies functional disruption with negative values indicating damage.'
        },
        { 
          aspect: 'Interpretability', 
          implementation: 'Sparse Autoencoders with 32,768 learned features',
          details: 'Layer 26 SAE features reveal learned biological concepts: exon-intron boundaries, TF binding sites, protein structural elements, prophage regions.'
        }
      ],
      geneEssentiality: [
        { 
          aspect: 'Knockout Simulation', 
          implementation: 'Insert premature stop codons at multiple positions',
          details: 'Simulates gene knockout by inserting stop codons at various transcript positions. Aggregates likelihood differences to compute essentiality score.'
        },
        { 
          aspect: 'Context Integration', 
          implementation: 'Cell-type embeddings and mutation background modeling',
          details: 'Incorporates cell-type specific gene expression, chromatin state, and genetic background to provide context-dependent predictions.'
        },
        { 
          aspect: 'Validation Data', 
          implementation: 'DepMap, TCGA, and experimental knockout screens',
          details: 'Validated against large-scale genetic screens including DepMap (1000+ cell lines), TCGA patient data, and experimental knockout studies.'
        },
        { 
          aspect: 'Scoring Algorithm', 
          implementation: 'Aggregated likelihood difference across knockout positions',
          details: 'Computes essentiality by averaging likelihood differences across multiple simulated knockout positions within the gene.'
        }
      ],
      crisprEfficacy: [
        { 
          aspect: 'Repair Outcome Modeling', 
          implementation: 'Simulate typical indel patterns and frameshift probabilities',
          details: 'Models DNA repair outcomes including NHEJ and HDR pathways. Predicts specific indel patterns and their functional consequences.'
        },
        { 
          aspect: 'Sequence Features', 
          implementation: 'Guide sequence, PAM context, and chromatin accessibility',
          details: 'Integrates guide RNA sequence, PAM site context, local chromatin state, and genomic features for comprehensive efficacy prediction.'
        },
        { 
          aspect: 'Training Data', 
          implementation: 'Large-scale CRISPR screen datasets',
          details: 'Trained on experimental CRISPR screen data including cutting efficiency, repair outcomes, and functional knockout measurements.'
        },
        { 
          aspect: 'Efficacy Scoring', 
          implementation: 'Composite score combining cutting and functional impact',
          details: 'Combines predicted cutting efficiency with functional impact of resulting mutations to provide overall guide efficacy score.'
        }
      ],
      chromatinAccessibility: [
        { 
          aspect: 'Epigenomic Integration', 
          implementation: 'ATAC-seq, DNase-seq, ChIP-seq from ENCODE/Roadmap',
          details: 'Integrates comprehensive epigenomic datasets including chromatin accessibility, histone modifications, and transcription factor binding.'
        },
        { 
          aspect: 'Sequence Context', 
          implementation: 'CpG islands, TF motifs, chromatin domain boundaries',
          details: 'Analyzes sequence features including CpG content, transcription factor motifs, and chromatin domain organization.'
        },
        { 
          aspect: 'Cell-Type Specificity', 
          implementation: 'Tissue-specific embeddings and regulatory databases',
          details: 'Uses cell-type specific regulatory networks and expression data to predict context-dependent chromatin accessibility.'
        },
        { 
          aspect: 'Prediction Method', 
          implementation: 'Enformer/Borzoi ensemble for multi-scale prediction',
          details: 'Ensemble of state-of-the-art genomic models (Enformer, Borzoi) for accurate multi-scale chromatin accessibility prediction.'
        }
      ],
      proteinFunctionality: [
        { 
          aspect: 'Sequence Analysis', 
          implementation: 'DNA-level and protein-level sequence embeddings',
          details: 'Analyzes both nucleotide sequences (for splicing effects) and amino acid sequences (for protein function) in unified framework.'
        },
        { 
          aspect: 'Structural Integration', 
          implementation: 'AlphaFold 3 structural predictions',
          details: 'Integrates AlphaFold 3 protein structure predictions to assess structural impact of mutations on protein stability and function.'
        },
        { 
          aspect: 'Functional Validation', 
          implementation: 'Deep Mutational Scanning and protein assays',
          details: 'Validated against experimental protein function assays including Deep Mutational Scanning, binding assays, and enzymatic activity measurements.'
        },
        { 
          aspect: 'Multi-Modal Scoring', 
          implementation: 'Combined sequence, structure, and evolutionary scores',
          details: 'Integrates sequence-based predictions, structural analysis, and evolutionary constraint information for comprehensive functional assessment.'
        }
      ]
    };
    return technicalMap[endpointKey] || [];
  };

  const handleEndpointChange = (endpointKey: string) => {
    setActiveEndpoint(endpointKey);
    if (onEndpointChange) {
      onEndpointChange(endpointKey);
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
              onClick={() => handleEndpointChange(key)}
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

      {/* Tab Navigation */}
      {currentEndpoint && (
        <div className="flex justify-center">
          <div className="flex bg-slate-800 rounded-xl p-1 border border-slate-700">
            {[
              { key: 'useCases', label: 'Use Cases & Applications', icon: '🎯' },
              { key: 'capabilities', label: 'API Capabilities', icon: '⚡' },
              { key: 'technical', label: 'Technical Implementation', icon: '🔧' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 ${getTextSize('text-sm')} ${
                  activeTab === tab.key
                    ? `${getColorClasses(currentEndpoint.color).bg} text-white`
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content */}
      {currentEndpoint && (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
          {/* Use Cases Tab */}
          {activeTab === 'useCases' && currentEndpoint.useCases && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className={`font-bold text-white mb-4 ${getTextSize('text-3xl')}`}>
                  Use Cases & Applications
                </h3>
                <p className={`text-slate-300 ${getTextSize('text-lg')}`}>
                  Real-world applications across different domains and industries
                </p>
              </div>

              {/* Use Case Selector */}
              <div className="flex flex-wrap gap-3 justify-center">
                {Object.keys(currentEndpoint.useCases).map((useCaseKey) => (
                  <button
                    key={useCaseKey}
                    onClick={() => setActiveUseCase(useCaseKey)}
                    className={`px-4 py-2 rounded-lg border transition-all duration-200 ${getTextSize('text-sm')} ${
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...(currentEndpoint.useCases[activeUseCase as keyof typeof currentEndpoint.useCases] as readonly string[])].map((application, index) => (
                    <div key={index} className="p-6 bg-slate-700/30 border border-slate-600 rounded-xl">
                      <div className="flex items-start gap-3">
                        <span className={`${getColorClasses(currentEndpoint.color).text} mt-1 text-lg`}>•</span>
                        <span className={`text-slate-200 leading-relaxed ${getTextSize('text-base')}`}>
                          {application}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Applications (for endpoints without use cases) */}
          {activeTab === 'useCases' && 'applications' in currentEndpoint && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className={`font-bold text-white mb-4 ${getTextSize('text-3xl')}`}>
                  Applications
                </h3>
                <p className={`text-slate-300 ${getTextSize('text-lg')}`}>
                  Key applications and use cases for this API endpoint
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...(currentEndpoint.applications as readonly string[])].map((application, index) => (
                  <div key={index} className="p-6 bg-slate-700/30 border border-slate-600 rounded-xl">
                    <div className="flex items-start gap-3">
                      <span className={`${getColorClasses(currentEndpoint.color).text} mt-1 text-lg`}>•</span>
                      <span className={`text-slate-200 leading-relaxed ${getTextSize('text-base')}`}>
                        {application}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* API Capabilities Tab */}
          {activeTab === 'capabilities' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className={`font-bold text-white mb-4 ${getTextSize('text-3xl')}`}>
                  API Capabilities
                </h3>
                <p className={`text-slate-300 ${getTextSize('text-lg')}`}>
                  Comprehensive overview of what this API can do for you
                </p>
              </div>

              <div className="space-y-6">
                {getAPICapabilities(activeEndpoint).map((capability, index) => (
                  <div key={index} className="p-6 bg-slate-700/30 border border-slate-600 rounded-xl">
                    <div className="flex items-start gap-4">
                      <span className={`${getColorClasses(currentEndpoint.color).text} text-2xl mt-1`}>🔹</span>
                      <div className="flex-1">
                        <h4 className={`font-bold text-white mb-2 ${getTextSize('text-xl')}`}>
                          {capability.title}
                        </h4>
                        <p className={`text-slate-300 mb-3 ${getTextSize('text-base')}`}>
                          {capability.description}
                        </p>
                        <p className={`text-slate-400 leading-relaxed ${getTextSize('text-sm')}`}>
                          {capability.details}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Implementation Tab */}
          {activeTab === 'technical' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className={`font-bold text-white mb-4 ${getTextSize('text-3xl')}`}>
                  Technical Implementation
                </h3>
                <p className={`text-slate-300 ${getTextSize('text-lg')}`}>
                  Deep dive into the technical architecture and implementation details
                </p>
              </div>

              <div className="space-y-6">
                {getTechnicalDetails(activeEndpoint).map((detail, index) => (
                  <div key={index} className="p-6 bg-slate-700/30 border border-slate-600 rounded-xl">
                    <div className="space-y-3">
                      <h4 className={`font-bold ${getColorClasses(currentEndpoint.color).text} ${getTextSize('text-xl')}`}>
                        {detail.aspect}
                      </h4>
                      <p className={`text-slate-200 font-medium ${getTextSize('text-base')}`}>
                        {detail.implementation}
                      </p>
                      <p className={`text-slate-400 leading-relaxed ${getTextSize('text-sm')}`}>
                        {detail.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DetailedAPIExplorer; 