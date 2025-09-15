import React from 'react';
import { ProductPageLayout, ProductHero, ProductSection } from './ProductPageLayout';
import { oracleCapabilities } from '../../data/oracleCapabilities';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { OracleExplainTrack, VEPMetrics, VariantDetailCard, EssentialityChart, AccessibilityTrack, ProteinDeltaCard, KPIStrip, CrisprEfficacyCard, VariantImpactLandscape, DemoFactory, InteractiveDemoShowcase, VUSResolutionDemo, DynamicOracleExplain, VisualCapabilityGrid } from './blocks';
import { OracleScore, ProcessStepper } from './blocks';

interface OracleProductProps {
  content: {
    title: string;
    subtitle: string;
    badge: {
      icon: string;
      text: string;
      color: string;
    };
    metrics: Array<{
      value: string;
      label: string;
      description: string;
    }>;
    contextTags: string[];
    processSteps: Array<{
      title: string;
      description: string;
      accent: 'cyan' | 'purple' | 'orange';
    }>;
    oracleScore: {
      left: { title: string; value: string; subtitle: string };
      right: { title: string; value: string; subtitle: string };
      score: { title: string; value: string };
    };
    explainTrack: any;
    vepMetrics: any;
    variantDetail: any;
    performanceMetrics: Array<{
      label: string;
      value: string;
    }>;
    multiModal: {
      essentialitySeries: any[];
      accessibilityTracks: any;
      proteinDelta: any;
    };
    validation: any;
    transformations: Array<{
      id: string;
      title: string;
      subtitle: string;
      icon: string;
      color: string;
      metrics: Array<{ label: string; value: string }>;
      description: string;
      href: string;
      buttonText: string;
    }>;
  };
}

const OracleProduct: React.FC<OracleProductProps> = ({ content }) => {
  const { getTextSize } = useAccessibility();
  const [analyzedVariant, setAnalyzedVariant] = React.useState<any>(null);

  return (
    <ProductPageLayout>
      {/* Hero Section */}
      <ProductHero
        title={content.title}
        subtitle={content.subtitle}
        badge={content.badge}
        metrics={content.metrics}
        contextTags={content.contextTags}
      />

      {/* Process Flow */}
      {/* <ProductSection
        title="Zero-Shot Prediction Pipeline"
        subtitle="Resolve uncertainty with quantitative, zero-shot predictions."
      >
        <ProcessStepper steps={content.processSteps} />
      </ProductSection> */}

      {/* Oracle in Action */}
      <ProductSection
        title="Annihilation of Uncertainty"
        subtitle="From uncertain variants to clinical verdicts with explainable evidence. "
      >
        <VUSResolutionDemo onVariantAnalyzed={setAnalyzedVariant} />
      </ProductSection>

      {/* Oracle's Thinking Process */}
    
        <DynamicOracleExplain analyzedVariant={analyzedVariant} />
   

      {/* Multi-Modal Predictions - Visual Grid */}
      <ProductSection
        title="Multi-Modal Biological Predictions"
        subtitle="Oracle's comprehensive biological insights across multiple modalities. Click any capability to explore features and see live demos."
      >
        <VisualCapabilityGrid
          capabilities={oracleCapabilities.multiModalPredictions}
          title=""
          subtitle=""
        />
      </ProductSection>

      {/* Complete Discriminative AI Arsenal */}
      <ProductSection
        title="5 Discriminative AI Endpoints"
        subtitle="Zero-shot predictions. Each endpoint addresses specific biological questions with state-of-the-art accuracy, from variant pathogenicity to CRISPR guide design."
      >
        <DemoFactory />
      </ProductSection>

      {/* Interactive AI Analysis Workflows */}
      <ProductSection
        title="In-Silico Validation"
        subtitle="Watch how multiple endpoints work together to provide comprehensive biological insights and therapeutic guidance."
      >
        <InteractiveDemoShowcase selectedDemo="brca1Analysis" />
      </ProductSection>

      {/* Scientific Validation */}
      <ProductSection
        title="Scientific Validation"
        subtitle="State-of-the-art performance across gold-standard benchmarks with rigorous evaluation."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-blue-700/50 bg-gradient-to-br from-blue-900/30 to-blue-800/30">
            <div className="font-bold text-blue-300 mb-3 text-lg">ClinVar Pathogenicity</div>
            <div className="space-y-2 text-blue-200">
              <div>Coding SNVs: <span className="font-semibold">95.7% AUROC</span></div>
              <div>Non-coding variants: <span className="font-semibold">95.7% AUROC</span></div>
              <div>Indels: <span className="font-semibold">93.9% AUROC</span></div>
            </div>
            <div className="text-blue-400 mt-3 text-xs">Gold standard clinical variant database (53,210 variants)</div>
          </div>

          <div className="p-6 rounded-xl border border-green-700/50 bg-gradient-to-br from-green-900/30 to-green-800/30">
            <div className="font-bold text-green-300 mb-3 text-lg">BRCA1/2 Classification</div>
            <div className="space-y-2 text-green-200">
              <div>Supervised AUROC: <span className="font-semibold">94.0%</span></div>
              <div>Zero-shot AUROC: <span className="font-semibold">89.1%</span></div>
              <div>AUPRC: <span className="font-semibold">84.0%</span></div>
            </div>
            <div className="text-green-400 mt-3 text-xs">Breast cancer variant functional assessment (3,893 variants)</div>
          </div>

          <div className="p-6 rounded-xl border border-purple-700/50 bg-gradient-to-br from-purple-900/30 to-purple-800/30">
            <div className="font-bold text-purple-300 mb-3 text-lg">Gene Essentiality</div>
            <div className="space-y-2 text-purple-200">
              <div>Cross-species: <span className="font-semibold">82-99% AUROC</span></div>
              <div>lncRNA prediction: <span className="font-semibold">SOTA</span></div>
              <div>Bacterial/phage: <span className="font-semibold">Matched Evo1</span></div>
            </div>
            <div className="text-purple-400 mt-3 text-xs">Zero-shot essentiality across 8 species</div>
          </div>

          <div className="p-6 rounded-xl border border-orange-700/50 bg-gradient-to-br from-orange-900/30 to-orange-800/30">
            <div className="font-bold text-orange-300 mb-3 text-lg">Protein Function</div>
            <div className="space-y-2 text-orange-200">
              <div>DMS correlation: <span className="font-semibold">Strong</span></div>
              <div>Cross-species: <span className="font-semibold">Prokaryotic + Eukaryotic</span></div>
              <div>Specialization: <span className="font-semibold">Competitive</span></div>
            </div>
            <div className="text-orange-400 mt-3 text-xs">Deep mutational scanning validation (Figure 2E)</div>
          </div>

          <div className="p-6 rounded-xl border border-cyan-700/50 bg-gradient-to-br from-cyan-900/30 to-cyan-800/30">
            <div className="font-bold text-cyan-300 mb-3 text-lg">Chromatin Accessibility</div>
            <div className="space-y-2 text-cyan-200">
              <div>TF motif detection: <span className="font-semibold">SAE validated</span></div>
              <div>DART-Eval tasks: <span className="font-semibold">1/2/5 validated</span></div>
              <div>Regulatory elements: <span className="font-semibold">Unsupervised</span></div>
            </div>
            <div className="text-cyan-400 mt-3 text-xs">Learned TF binding motifs without supervision (Figure 4F)</div>
          </div>

          <div className="p-6 rounded-xl border border-red-700/50 bg-gradient-to-br from-red-900/30 to-red-800/30">
            <div className="font-bold text-red-300 mb-3 text-lg">CRISPR Efficacy</div>
            <div className="space-y-2 text-red-200">
              <div>Prediction method: <span className="font-semibold">Variant impact</span></div>
              <div>Frameshift proxy: <span className="font-semibold">Empirical priors</span></div>
              <div>Off-target: <span className="font-semibold">Separate analysis</span></div>
            </div>
            <div className="text-red-400 mt-3 text-xs">Guide RNA efficacy via frameshift simulation</div>
          </div>
        </div>
      </ProductSection>

      {/* Industry Transformations CTA */}
      <section className="py-20 px-8 bg-gradient-to-r from-slate-800/60 to-slate-700/60 rounded-3xl">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-8">
            <h2 className={`font-bold text-white ${getTextSize('text-6xl')}`}>See How CrisPRO.ai is Transforming Industries</h2>
            <p className={`text-slate-200 max-w-5xl mx-auto leading-relaxed font-medium ${getTextSize('text-3xl')}`}>
              Dive deep into specific industry transformations and see the complete workflow revolution. 
              From 90% failure rates to predictable success across biotech, clinical, and genetic testing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {content.transformations.map((transformation) => {
              const colorClasses = {
                blue: {
                  border: 'hover:border-blue-500/50',
                  bg: 'bg-blue-600',
                  hover: 'hover:bg-blue-500',
                  text: 'text-blue-400',
                  groupHover: 'group-hover:bg-blue-500'
                },
                green: {
                  border: 'hover:border-green-500/50',
                  bg: 'bg-green-600',
                  hover: 'hover:bg-green-500',
                  text: 'text-green-400',
                  groupHover: 'group-hover:bg-green-500'
                },
                purple: {
                  border: 'hover:border-purple-500/50',
                  bg: 'bg-purple-600',
                  hover: 'hover:bg-purple-500',
                  text: 'text-purple-400',
                  groupHover: 'group-hover:bg-purple-500'
                }
              }[transformation.color] || {
                border: 'hover:border-blue-500/50',
                bg: 'bg-blue-600',
                hover: 'hover:bg-blue-500',
                text: 'text-blue-400',
                groupHover: 'group-hover:bg-blue-500'
              };

              return (
                <div key={transformation.id} className={`bg-slate-800 border border-slate-700 rounded-xl p-8 ${colorClasses.border} transition-colors group`}>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${colorClasses.bg} rounded-lg flex items-center justify-center text-2xl`}>
                        {transformation.icon}
                      </div>
                      <div>
                        <h3 className={`font-bold text-white ${getTextSize('text-2xl')}`}>{transformation.title}</h3>
                        <p className={`text-slate-300 ${getTextSize('text-base')}`}>{transformation.subtitle}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      {transformation.metrics.map((metric, i) => (
                        <div key={i}>
                          <div className={`font-bold ${colorClasses.text} ${getTextSize('text-2xl')}`}>{metric.value}</div>
                          <div className={`text-slate-400 ${getTextSize('text-xs')}`}>{metric.label}</div>
                        </div>
                      ))}
                    </div>
                    
                    <p className={`text-slate-300 ${getTextSize('text-sm')}`}>
                      {transformation.description}
                    </p>
                    
                    <a 
                      href={transformation.href}
                      className={`inline-flex items-center gap-2 px-6 py-3 ${colorClasses.bg} ${colorClasses.hover} text-white rounded-lg font-semibold transition-colors ${colorClasses.groupHover}`}
                    >
                      {transformation.buttonText}
                      <span className="text-lg">→</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </ProductPageLayout>
  );
};

export default OracleProduct; 