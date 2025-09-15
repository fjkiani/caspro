import React from 'react';
import { Link } from 'react-router-dom';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { generativeUseCases } from '../data/useCases/generative';
import AccessibilityToggle from '../components/AccessibilityToggle';

const ForgeUseCasesIndex: React.FC = () => {
  const { getTextSize } = useAccessibility();

  const getUseCaseIcon = (id: string) => {
    switch (id) {
      case 'crispr_therapy_design': return '✂️';
      case 'protein_therapy_design': return '🧬';
      case 'gene_therapy_vector_design': return '⚡';
      case 'personalized_cancer_therapy': return '🎯';
      default: return '🧪';
    }
  };

  const getUseCaseColor = (id: string) => {
    switch (id) {
      case 'crispr_therapy_design': return 'border-purple-500/50 hover:border-purple-400 bg-purple-900/10';
      case 'protein_therapy_design': return 'border-green-500/50 hover:border-green-400 bg-green-900/10';
      case 'gene_therapy_vector_design': return 'border-orange-500/50 hover:border-orange-400 bg-orange-900/10';
      case 'personalized_cancer_therapy': return 'border-blue-500/50 hover:border-blue-400 bg-blue-900/10';
      default: return 'border-slate-500/50 hover:border-slate-400 bg-slate-900/10';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">
        {/* Accessibility Toggle */}
        <div className="flex justify-end">
          <AccessibilityToggle />
        </div>

        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className={`font-bold text-white ${getTextSize('text-5xl')}`}>
            🧬 Forge Use Cases
          </h1>
          <p className={`text-slate-300 max-w-4xl mx-auto leading-relaxed ${getTextSize('text-xl')}`}>
            End-to-end generative design workflows showcasing Forge's capabilities across 
            different therapeutic modalities. Each use case demonstrates the complete pipeline 
            from design requirements to validated therapeutic assets.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <span className="px-4 py-2 bg-purple-800/30 border border-purple-600/50 rounded-full font-medium text-purple-200">
              CRISPR Design
            </span>
            <span className="px-4 py-2 bg-green-800/30 border border-green-600/50 rounded-full font-medium text-green-200">
              Protein Engineering
            </span>
            <span className="px-4 py-2 bg-orange-800/30 border border-orange-600/50 rounded-full font-medium text-orange-200">
              Gene Therapy
            </span>
            <span className="px-4 py-2 bg-blue-800/30 border border-blue-600/50 rounded-full font-medium text-blue-200">
              Personalized Medicine
            </span>
          </div>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {generativeUseCases.map((useCase) => (
            <Link
              key={useCase.id}
              to={`/site/forge/demo/usecase/${useCase.id}`}
              className={`group block p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 ${getUseCaseColor(useCase.id)}`}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="text-4xl">{getUseCaseIcon(useCase.id)}</div>
                <div className="flex-1">
                  <h2 className={`font-bold text-white mb-2 group-hover:text-purple-300 transition-colors ${getTextSize('text-2xl')}`}>
                    {useCase.name}
                  </h2>
                  <p className={`text-slate-300 leading-relaxed ${getTextSize('text-base')}`}>
                    {useCase.summary}
                  </p>
                </div>
              </div>

              {/* Design Pipeline Overview */}
              <div className="mb-6">
                <h3 className={`font-semibold text-white mb-3 ${getTextSize('text-lg')}`}>
                  Design Pipeline:
                </h3>
                <div className="space-y-2">
                  {useCase.steps.map((step, i) => (
                    <div key={step.id} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </div>
                      <span className={`text-slate-300 ${getTextSize('text-sm')}`}>
                        {step.title}
                      </span>
                      <code className={`text-purple-400 font-mono ${getTextSize('text-xs')}`}>
                        /{step.id}
                      </code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Inputs Preview */}
              <div className="mb-6">
                <h3 className={`font-semibold text-white mb-3 ${getTextSize('text-lg')}`}>
                  Key Inputs:
                </h3>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <pre className={`text-green-400 font-mono overflow-x-auto ${getTextSize('text-xs')}`}>
                    {JSON.stringify(useCase.seed, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Expected Outcomes */}
              <div className="mb-6">
                <h3 className={`font-semibold text-white mb-3 ${getTextSize('text-lg')}`}>
                  Expected Outcomes:
                </h3>
                <ul className="space-y-1">
                  {getExpectedOutcomes(useCase.id).map((outcome, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className={`text-slate-300 ${getTextSize('text-sm')}`}>
                        {outcome}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call to Action */}
              <div className="text-center pt-6 border-t border-slate-700">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-6 py-3 rounded-xl font-bold text-white transition-all duration-200 group-hover:shadow-lg group-hover:shadow-purple-500/20">
                  🚀 Run Complete Workflow
                </div>
                <p className={`text-slate-400 mt-2 ${getTextSize('text-sm')}`}>
                  {useCase.steps.length} step pipeline • ~{useCase.steps.length * 2}min runtime
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-slate-800 border border-slate-600 rounded-2xl p-8">
          <h2 className={`font-bold text-white mb-6 ${getTextSize('text-2xl')}`}>
            🎯 Why These Use Cases Matter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className={`font-semibold text-white mb-3 ${getTextSize('text-lg')}`}>
                Real-World Applications
              </h3>
              <p className={`text-slate-300 leading-relaxed ${getTextSize('text-base')}`}>
                These use cases represent actual therapeutic development challenges that 
                biotechnology companies face daily. Each workflow demonstrates how Forge 
                accelerates the design process from months to hours.
              </p>
            </div>
            <div>
              <h3 className={`font-semibold text-white mb-3 ${getTextSize('text-lg')}`}>
                End-to-End Validation
              </h3>
              <p className={`text-slate-300 leading-relaxed ${getTextSize('text-base')}`}>
                Every generated asset undergoes comprehensive in-silico validation, 
                ensuring that designs meet therapeutic requirements before expensive 
                wet-lab validation begins.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getExpectedOutcomes = (useCaseId: string): string[] => {
  switch (useCaseId) {
    case 'crispr_therapy_design':
      return [
        'High-efficiency guide RNAs (>85% cutting efficiency)',
        'Optimized HDR templates with 4kb+ homology arms',
        'Comprehensive safety validation and off-target analysis',
        'Ready-to-synthesize therapeutic components'
      ];
    case 'protein_therapy_design':
      return [
        'Therapeutic proteins with enhanced binding affinity',
        'Reduced immunogenicity risk (<30%)',
        'Optimized expression and stability profiles',
        'Validated functional enhancement predictions'
      ];
    case 'gene_therapy_vector_design':
      return [
        'Tissue-specific regulatory elements (>90% specificity)',
        'Optimized chromatin accessibility',
        'Minimal off-target expression (<5% leakage)',
        'Ready-for-cloning vector components'
      ];
    case 'personalized_cancer_therapy':
      return [
        'Patient-specific therapeutic strategy',
        'Multi-modal asset generation',
        'Cancer hallmark-based target prioritization',
        'Validated therapeutic protein candidates'
      ];
    default:
      return ['Optimized therapeutic design', 'Comprehensive validation', 'Ready-to-test assets'];
  }
};

export default ForgeUseCasesIndex; 