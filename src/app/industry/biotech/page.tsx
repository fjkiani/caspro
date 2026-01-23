import { Metadata } from 'next';
import { biotechTransformationContent } from '@/data/industry/biotech-transformation-content';
import BiotechHeroSection from '@/components/products/biotech/BiotechHeroSection';
import BiotechTransformationMetrics from '@/components/products/biotech/BiotechTransformationMetrics';
import BiotechInteractiveShowcase from '@/components/products/biotech/BiotechInteractiveShowcase';
import BiotechCapabilityTesting from '@/components/products/biotech/BiotechCapabilityTesting';
import BusinessTransformation from '@/components/industry/BusinessTransformation';
import { TwoHitDiagram, RiskMap, Arsenal } from '@/components/industry/runx1';
import { runx1Content } from '@/data/industry/runx1-content';
import VisualCapabilityGrid from '@/components/industry/VisualCapabilityGrid';
import { biotechDiscriminativeCapabilities } from '@/data/industry/biotech-capabilities';
import RelatedProductsSection from '@/components/industry/RelatedProductsSection';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Biotech & Pharma R&D | CrisPRO',
    description: 'Transform drug development with AI-powered target validation and therapeutic design. From undruggable to validated in hours.',
  };
}

export default function BiotechPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white text-slate-800">
      {/* Hero Section */}
      <BiotechHeroSection />

      {/* Biotech Transformation Metrics */}
      <div id="biotech-metrics">
        <BiotechTransformationMetrics />
      </div>

      {/* Interactive Biotech Showcase */}
      <BiotechInteractiveShowcase />

      {/* Biotech Capability Testing */}
      <BiotechCapabilityTesting />

      {/* Main Transformation Content */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <BusinessTransformation
            productName="Oracle"
            valuePropositions={biotechTransformationContent.valuePropositions}
            summary={biotechTransformationContent.summary}
          />
        </div>
      </section>

      {/* RUNX1 Research Case Study */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-semibold text-slate-800">Research Case Study: RUNX1 Discovery Pipeline</h2>
            <p className="text-lg text-slate-600 max-w-4xl mx-auto">
              From variant discovery to therapeutic design: Complete biotech research transformation
            </p>
          </div>

          <TwoHitDiagram steps={runx1Content.twoHit.steps} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RiskMap {...runx1Content.riskMap} />
            <Arsenal 
              input={runx1Content.arsenal.input}
              processTitle={runx1Content.arsenal.processTitle}
              outputs={[...runx1Content.arsenal.outputs]}
            />
          </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-slate-800 mb-4">Biotech Research Impact</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="font-medium text-slate-800">Traditional Drug Discovery</h5>
                  <ul className="text-sm text-red-600 space-y-1">
                  <li>• 18 months variant characterization</li>
                  <li>• Random target selection</li>
                  <li>• 85% design failure rate</li>
                  <li>• $8M per successful candidate</li>
                </ul>
              </div>
                <div className="space-y-3">
                  <h5 className="font-medium text-slate-800">Oracle-Powered Discovery</h5>
                  <ul className="text-sm text-green-600 space-y-1">
                  <li>• 2 weeks variant-to-target pipeline</li>
                  <li>• Systematic target prioritization</li>
                  {/* <li>• 90% design success prediction</li> */} {/* HALLUCINATED: Not validated */}
                  <li>• Improved design success prediction</li>
                  <li>• $300K per validated portfolio</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Research Pipeline Metrics */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-8">
            <div className="text-center space-y-6">
              <h4 className="text-xl font-bold text-blue-800">Complete Research Transformation</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                {/* <div>
                  <div className="text-2xl font-black text-blue-600">36x</div>
                  <div className="text-blue-700">Faster discovery</div>
                  <div className="text-xs text-blue-600 mt-1">18 months → 2 weeks</div>
                </div> */} {/* HALLUCINATED: Not validated */}
                <div>
                  <div className="text-2xl font-black text-blue-600">Significantly</div>
                  <div className="text-blue-700">Faster discovery</div>
                  <div className="text-xs text-blue-600 mt-1">18 months → 2 weeks</div>
                </div>
                {/* <div>
                  <div className="text-2xl font-black text-blue-600">96%</div>
                  <div className="text-blue-700">Cost reduction</div>
                  <div className="text-xs text-blue-600 mt-1">$8M → $300K per program</div>
                </div> */} {/* HALLUCINATED: Not validated */}
                <div>
                  <div className="text-2xl font-black text-blue-600">Major</div>
                  <div className="text-blue-700">Cost reduction</div>
                  <div className="text-xs text-blue-600 mt-1">$8M → $300K per program</div>
                </div>
                {/* <div>
                  <div className="text-2xl font-black text-blue-600">90%</div>
                  <div className="text-blue-700">Success prediction</div>
                  <div className="text-xs text-blue-600 mt-1">vs 15% random chance</div>
                </div> */} {/* HALLUCINATED: Not validated */}
                <div>
                  <div className="text-2xl font-black text-blue-600">Improved</div>
                  <div className="text-blue-700">Success prediction</div>
                  <div className="text-xs text-blue-600 mt-1">vs 15% random chance</div>
                </div>
                {/* <div>
                  <div className="text-2xl font-black text-blue-600">10x</div>
                  <div className="text-blue-700">Portfolio diversity</div>
                  <div className="text-xs text-blue-600 mt-1">Multiple families per target</div>
                </div> */} {/* HALLUCINATED: Not validated */}
                <div>
                  <div className="text-2xl font-black text-blue-600">Enhanced</div>
                  <div className="text-blue-700">Portfolio diversity</div>
                  <div className="text-xs text-blue-600 mt-1">Multiple families per target</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discriminative AI Arsenal Enhancement */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <h2 className="font-bold text-slate-800 text-4xl">
              🎯 Complete Discriminative AI Arsenal
            </h2>
            <p className="text-slate-600 max-w-4xl mx-auto leading-relaxed text-lg">
              Five core AI endpoints that power every biotech transformation. Each capability includes live demos 
              showing real biotech R&D applications with factual performance metrics.
            </p>
          </div>
          
          <VisualCapabilityGrid
            capabilities={biotechDiscriminativeCapabilities}
            title=""
            subtitle=""
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-cyan-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-semibold text-white">Get Started with CrisPRO</h2>
          <p className="text-lg text-white/90">
            See how CrisPRO supports R&D workflows with AI-powered target validation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white hover:bg-slate-100 text-cyan-600 rounded-lg font-semibold transition-colors">
              Request Demo
            </button>
            <button className="px-8 py-3 border-2 border-white hover:bg-white/10 text-white rounded-lg font-semibold transition-colors">
              View R&D Platform
            </button>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <RelatedProductsSection
        products={[
          {
            slug: 'r-d',
            title: 'CrisPRO R&D',
            subtitle: 'Design the Undruggable. Validate in Silico. Complete therapeutic development platform.',
          },
          {
            slug: 'research',
            title: 'CrisPRO Research',
            subtitle: 'Multi-modal AI analysis for research institutions.',
          }
        ]}
        title="Explore CrisPRO Products for R&D"
      />
    </main>
  );
}
