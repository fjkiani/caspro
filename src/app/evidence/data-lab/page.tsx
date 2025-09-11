import React from 'react';
import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { 
  Database, 
  Search, 
  Play, 
  Tag, 
  Download,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { dataLabData } from '@/data/evidence/data-lab-data';
import { StudyBrowser } from '@/components/evidence/StudyBrowser';
import { 
  InSilicoCapabilityCard 
} from '@/components/insilico/InSilicoCapabilityCard';
import { TherapeuticPipeline } from '@/components/insilico/FusionWorkflow/TherapeuticPipeline';
import { 
  ObservedOutcomes,
  ValuePropositionCard,
  SectionHeader,
  CTASection
} from '@/components/shared';

export const metadata: Metadata = {
  title: 'Data Lab - Evidence Intelligence | CrisPRO.ai',
  description: 'Find studies, extract cohorts, label, benchmark, and export artifacts — fast and reproducible (RUO).',
};

// Transform Data Lab capabilities to match InSilicoCapability interface
const transformToInSilicoCapability = (capability: any) => ({
  slug: capability.title.toLowerCase().replace(/\s+/g, '-'),
  title: capability.title,
  coreCapability: capability.description,
  icon: capability.icon,
  color: capability.color,
  status: capability.status,
  keyMetric: {
    value: capability.status === 'live' ? '100%' : 'Roadmap',
    unit: capability.status === 'live' ? 'Operational' : ''
  },
  evidenceMetrics: [
    {
      label: 'Status',
      value: capability.status === 'live' ? 'Live' : 'Roadmap',
      description: capability.status === 'live' ? 'Currently operational' : 'In development'
    }
  ],
  coPilotSlug: `data-lab-${capability.title.toLowerCase().replace(/\s+/g, '-')}`
});

// Transform Data Lab pipeline to match WorkflowStepData interface
const transformToWorkflowStep = (step: any) => ({
  id: step.id,
  title: step.title,
  description: step.description,
  icon: getIconComponent(step.icon),
  color: step.color,
  details: step.details,
  outputs: step.outputs
});

const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: any } = {
    Search,
    Settings: Play,
    Database,
    Tag,
    BarChart2: Download,
    FileText: Download,
    Hash: Database
  };
  return iconMap[iconName] || Database;
};

export default function DataLabPage() {
  const transformedCapabilities = dataLabData.capabilities.map(transformToInSilicoCapability);
  const transformedPipeline = dataLabData.pipeline.map(transformToWorkflowStep);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"></div>
        <div className="container mx-auto px-6 relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Database className="w-4 h-4" />
              Research Use Only - Data Infrastructure
            </motion.div>

            <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {dataLabData.hero.title}
            </h1>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              {dataLabData.hero.subtitle}
            </p>

            <p className="text-lg text-gray-500 max-w-3xl mx-auto">
              {dataLabData.hero.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Study Browser Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <SectionHeader
            title="Study Discovery & Selection"
            subtitle="Browse available studies and configure extraction parameters"
            description="Start by exploring our curated catalog of genomic studies, then select and configure your cohort extraction."
          />
          
          <div className="max-w-7xl mx-auto">
            <StudyBrowser />
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeader
            title="Core Capabilities"
            subtitle="Live data infrastructure for cohort extraction and analysis"
            description="Four key capabilities that power the entire evidence intelligence pipeline"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {transformedCapabilities.map((capability, index) => (
              <motion.div
                key={capability.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <InSilicoCapabilityCard capability={capability} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Lab Pipeline Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <PipelineHeader
              title="Data Lab Pipeline: Study to Artifacts"
              description="Complete workflow from study discovery to exportable artifacts with full provenance tracking"
            >
              <PipelineControls
                isRunning={false}
                onRun={() => {}}
                onReset={() => {}}
              />
            </PipelineHeader>

            {/* Pipeline Steps */}
            <div className="relative mt-12">
              {/* Connection Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 hidden lg:block"></div>
              
              <div className="space-y-8">
                {transformedPipeline.map((step, index) => (
                  <WorkflowStep
                    key={step.id}
                    step={step}
                    isActive={false}
                    isCompleted={false}
                    index={index}
                  />
                ))}
              </div>
            </div>

            <RUODisclaimer />
          </div>
        </div>
      </section>

      {/* KPIs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeader
            title="Performance Metrics"
            subtitle="Key performance indicators for data lab operations"
            description="Measurable outcomes that demonstrate the reliability and efficiency of our data infrastructure"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {dataLabData.kpis.map((kpi, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="text-3xl font-bold text-blue-600 mb-2">{kpi.value}</div>
                <div className="text-lg font-semibold text-gray-800 mb-2">{kpi.label}</div>
                <div className="text-sm text-gray-600">{kpi.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Observed Outcomes Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-6">
          <ObservedOutcomes outcomes={dataLabData.observedOutcomes} color="green" />
        </div>
      </section>

      {/* Value Propositions Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeader
            title="Value Propositions"
            subtitle="Benefits for different user types"
            description="How the Data Lab serves researchers and data engineers with different needs"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {dataLabData.valuePropositions.map((proposition, index) => (
              <ValuePropositionCard
                key={index}
                audience={proposition.audience}
                points={proposition.points}
                color="blue"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-600">
        <div className="container mx-auto px-6">
          <CTASection
            title="Ready to Extract Your First Cohort?"
            description="Start with our study catalog, configure your extraction, and get reproducible artifacts with full provenance."
            primaryButton={{
              text: "Browse Studies",
              href: "#study-browser",
              color: "white"
            }}
            secondaryButton={{
              text: "View API Docs",
              href: "/docs/api",
              color: "white"
            }}
            backgroundColor="blue"
          />
        </div>
      </section>
    </div>
  );
}
