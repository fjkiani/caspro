import { Metadata } from 'next';
import { clinicalTransformationContent } from '@/data/industry/clinical-transformation-content';
import HealthcareHeroSection from '@/components/products/healthcare/HealthcareHeroSection';
// import HealthcareMOATMetrics from '@/components/products/healthcare/HealthcareMOATMetrics';
import MOATInteractiveShowcase from '@/components/products/healthcare/MOATInteractiveShowcase';
// import MOATCapabilityShowcase from '@/components/products/healthcare/MOATCapabilityShowcase';
// import CompleteCarePlanVision from '@/components/products/healthcare/CompleteCarePlanVision';
// import UniversalPlatformSection from '@/components/products/healthcare/UniversalPlatformSection';
import HonestFramingSection from '@/components/products/healthcare/HonestFramingSection';
import CapabilityJourneySlider from '@/components/products/healthcare/CapabilityJourneySlider';
import ClinicalWorkflow from '@/components/industry/ClinicalWorkflow';
import { TwoHitDiagram, RiskMap, Arsenal } from '@/components/industry/runx1';
import { runx1Content } from '@/data/industry/runx1-content';
import RelatedProductsSection from '@/components/industry/RelatedProductsSection';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Healthcare & Clinical Oncology | CrisPRO',
    description: 'Transform clinical oncology from VUS uncertainty to precision medicine with AI-powered variant interpretation and personalized therapy design.',
  };
}

const clinicalWorkflowData = {
  traditional: [
    {
      title: 'Genetic Testing & Variant Discovery',
      description: 'Comprehensive genomic sequencing reveals multiple variants of unknown significance',
      duration: '2 weeks',
      outcome: '50% variants remain VUS',
      status: 'uncertain' as const,
      icon: '🧬'
    },
    {
      title: 'Literature Review & Expert Consultation',
      description: 'Manual research across databases and specialist consultations to interpret variants',
      duration: '6 weeks',
      outcome: 'Limited actionable insights',
      status: 'uncertain' as const,
      icon: '📚'
    },
    {
      title: 'Family Studies & Functional Assays',
      description: 'Coordinate family member testing and expensive functional validation studies',
      duration: '12 weeks',
      outcome: 'Some variants classified',
      status: 'actionable' as const,
      icon: '👨‍👩‍👧‍👦'
    },
    {
      title: 'Treatment Selection & Monitoring',
      description: 'Select therapy based on available evidence and monitor for resistance',
      duration: '8 weeks',
      outcome: 'Treatment initiated, resistance monitoring',
      status: 'optimized' as const,
      icon: '💊'
    }
  ],
  oracle: [
    {
      title: 'Genetic Testing & Instant Oracle Analysis',
      description: 'Genomic sequencing with immediate zero-shot variant interpretation',
      duration: '2 days',
      outcome: '73% variants resolved with confidence scores',
      status: 'actionable' as const,
      icon: '⚡'
    },
    {
      title: 'SAE-Powered Explainable Evidence',
      description: 'Mechanistic interpretability reveals biological features driving predictions',
      duration: '1 day',
      outcome: 'Explainable pathogenicity evidence',
      status: 'optimized' as const,
      icon: '🔍'
    },
    {
      title: 'Resistance Pathway Prediction',
      description: 'Predict likely tumor evolution paths and design preemptive combination therapies',
      duration: '3 days',
      outcome: 'Personalized resistance-aware treatment plan',
      status: 'optimized' as const,
      icon: '🎯'
    },
    {
      title: 'Personalized Immunotherapy Design',
      description: 'Generate patient-specific neoantigens and CAR-T designs with structural validation',
      duration: '1 week',
      outcome: 'Bespoke immunotherapy protocol',
      status: 'optimized' as const,
      icon: '🛡️'
    }
  ]
};

export default function HealthcarePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white text-slate-800">
      {/* Hero Section */}
      <HealthcareHeroSection />

      {/* MOAT Metrics - Removed */}
      {/* <div id="moat-metrics">
        <HealthcareMOATMetrics />
      </div> */}

      {/* Complete Care Plan Vision - Removed */}
      {/* <CompleteCarePlanVision /> */}

      {/* Interactive MOAT Showcase */}
      <MOATInteractiveShowcase />

      {/* MOAT Capability Testing - Removed */}
      {/* <MOATCapabilityShowcase /> */}

      {/* Universal Platform - Removed */}
      {/* <UniversalPlatformSection /> */}

      {/* Capability Journey Slider */}
      <CapabilityJourneySlider />

      {/* Patient Journey Transformation */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto space-y-12">
          <ClinicalWorkflow
            title="Patient Journey Transformation"
            subtitle="From months of uncertainty to actionable insights in days"
            traditional={clinicalWorkflowData.traditional}
            oracle={clinicalWorkflowData.oracle}
          />

          {/* RUNX1 Clinical Case Study */}
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-semibold text-white">Clinical Case Study: RUNX1 Leukemia</h3>
              <p className="text-lg text-slate-300">
                Predicting tumor evolution and designing preemptive combination therapies
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

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Clinical Impact</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="font-medium text-slate-200">Traditional Approach</h5>
                  <ul className="text-sm text-red-300 space-y-1">
                    <li>• React to resistance after it develops</li>
                    <li>• Sequential monotherapy trials</li>
                    <li>• 6-month average response duration</li>
                    <li>• Limited treatment options</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h5 className="font-medium text-slate-200">Oracle-Powered Approach</h5>
                  <ul className="text-sm text-green-300 space-y-1">
                    <li>• Predict resistance 6 months early</li>
                    <li>• Preemptive combination therapy</li>
                    <li>• 12-month extended response duration</li>
                    <li>• Multi-modal therapeutic arsenal</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Immunotherapy Personalization */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white text-center">Personalized Cancer Immunotherapy</h3>
            
            <div className="bg-gradient-to-r from-green-900/20 to-green-800/20 border border-green-700/50 rounded-xl p-8">
              <div className="text-center space-y-6">
                <h4 className="text-xl font-bold text-green-300">Immunotherapy Transformation Impact</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-black text-green-400">65%</div>
                    <div className="text-green-300">Response rate</div>
                    <div className="text-xs text-green-400 mt-1">vs 25% standard protocols</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-green-400">4 weeks</div>
                    <div className="text-green-300">Design time</div>
                    <div className="text-xs text-green-400 mt-1">vs 12 months traditional</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-green-400">Individual</div>
                    <div className="text-green-300">Personalization</div>
                    <div className="text-xs text-green-400 mt-1">vs population-based</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-green-400">-60%</div>
                    <div className="text-green-300">Adverse events</div>
                    <div className="text-xs text-green-400 mt-1">Reduced toxicity</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Honest Framing */}
      <HonestFramingSection />

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-semibold text-white">Get Started with CrisPRO</h2>
          <p className="text-lg text-white/90">
            See how CrisPRO helps resolve VUS uncertainty and improve patient outcomes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white hover:bg-slate-100 text-blue-600 rounded-lg font-semibold transition-colors">
              Request Clinical Demo
            </button>
            <button className="px-8 py-3 border-2 border-white hover:bg-white/10 text-white rounded-lg font-semibold transition-colors">
              View Complete Care Plan
            </button>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <RelatedProductsSection
        products={[
          {
            slug: 'oncology',
            title: 'CrisPRO Oncology',
            subtitle: 'From VUS to Validated Care Plan in Minutes. Complete clinical decision support platform.',
          },
          {
            slug: 'r-d',
            title: 'CrisPRO R&D',
            subtitle: 'Design the Undruggable. Validate in Silico. Therapeutic development platform.',
          }
        ]}
        title="Explore CrisPRO Products for Healthcare"
      />
    </main>
  );
}
