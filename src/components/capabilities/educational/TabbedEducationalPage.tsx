'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  AlertTriangle, 
  Zap, 
  Activity, 
  Target, 
  FileText,
  ArrowRight,
  CheckCircle,
  BarChart3
} from 'lucide-react';
import { EducationalCapabilityPageData } from '@/types/educational-capability';
import EducationalPageLayout from './EducationalPageLayout';
import HeroQuestionSection from './HeroQuestionSection';
import TherapyFitSolutionInteractive from './TherapyFitSolutionInteractive';
import ToxicitySolutionInteractive from './ToxicitySolutionInteractive';
import ValuePropsSection from './ValuePropsSection';
import ObservedOutcomesSection from './ObservedOutcomesSection';
import ExampleShowcase from './ExampleShowcase';
import IntegrationSection from './IntegrationSection';
import JourneyLevels from '@/components/landing/csi-journey/JourneyLevels';
import ProgressiveMonitoringDashboard from '@/components/products/oncology/ProgressiveMonitoringDashboard';
import ValuePropositionCard from '@/components/shared/ValuePropositionCard';
import { csiJourneyLevels } from '@/data/homepage/csi-journey-data';

interface TabbedEducationalPageProps {
  data: EducationalCapabilityPageData;
  productSlug?: string;
  capabilitySlug?: string;
  className?: string;
}

const tabs = [
  { id: 'hero', label: 'The Question', icon: HelpCircle },
  { id: 'journey', label: 'Journey', icon: BarChart3 },
  { id: 'solution', label: 'The Solution', icon: Zap },
  { id: 'how-it-works', label: 'How It Works', icon: Activity },
  { id: 'outcomes', label: 'Outcomes', icon: Target },
  { id: 'monitoring', label: 'Monitoring', icon: Activity },
  { id: 'integration', label: 'Integration', icon: ArrowRight },
];

export default function TabbedEducationalPage({
  data,
  productSlug,
  capabilitySlug,
  className = '',
}: TabbedEducationalPageProps) {
  const [activeTab, setActiveTab] = useState('hero');

  // Calculate current level once (used in multiple cases)
  const currentLevel = capabilitySlug === 'match-patients-to-therapies' ? 2 :
                      capabilitySlug === 'predict-resistance' ? 3 :
                      capabilitySlug === 'prevent-toxicity' ? 4 : 1;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'hero':
        return <HeroQuestionSection data={data.hero} />;
      
      case 'journey':
        // Show 5-level journey with current level highlighted
        const currentLevelData = csiJourneyLevels.find(l => l.level === currentLevel);
        
        return (
          <div>
            <JourneyLevels />
            {currentLevelData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-300 shadow-lg"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg">
                    {currentLevel}
                  </div>
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full mb-2">
                      <span className="text-sm font-semibold text-blue-800">You are here</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Level {currentLevel}: {currentLevelData.title}</h3>
                    <p className="text-slate-600 mb-4">{currentLevelData.description}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Data Required</div>
                    <div className="text-sm text-slate-700">{currentLevelData.data}</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <div className="text-xs font-semibold text-slate-500 mb-1">Unlocks</div>
                    <div className="text-sm text-slate-700">
                      {currentLevelData.unlocks.slice(0, 2).map((unlock, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>{unlock}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        );
      
      case 'solution':
        return (
          <div>
            {capabilitySlug === 'match-patients-to-therapies' ? (
              <TherapyFitSolutionInteractive data={data.solution} />
            ) : capabilitySlug === 'predict-resistance' ? (
              <ToxicitySolutionInteractive data={data.solution} />
            ) : (
              <ToxicitySolutionInteractive data={data.solution} />
            )}
          </div>
        );
      
      case 'how-it-works':
        return (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{data.howItWorks.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {data.howItWorks.steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 border-2 border-slate-200 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-slate-600 text-sm mb-3">{step.description}</p>
                      {step.details && step.details.length > 0 && (
                        <div className="space-y-1 bg-slate-50 rounded-lg p-3">
                          {step.details.map((detail, idx) => (
                            <div key={idx} className="text-xs flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                              <span className="font-semibold text-slate-700">{detail.label}:</span>
                              <span className="text-slate-600">{detail.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      
      case 'outcomes':
        return (
          <div>
            <ObservedOutcomesSection dataSource={
              capabilitySlug === 'match-patients-to-therapies' ? 'therapy-fit' : 
              capabilitySlug === 'predict-resistance' ? 'therapy-fit' :
              'toxicity'
            } />
          </div>
        );
      
      case 'monitoring':
        // Show progressive monitoring dashboard based on current level
        return (
          <div>
            <ProgressiveMonitoringDashboard level={currentLevel as 1 | 2 | 3 | 4 | 5} patientId="AK" />
          </div>
        );
      
      case 'integration':
        return data.integration ? (
          <div>
            <IntegrationSection data={data.integration} />
          </div>
        ) : null;
      
      default:
        return null;
    }
  };

  return (
    <EducationalPageLayout
      data={data.layout}
      productSlug={productSlug}
      capabilitySlug={capabilitySlug}
    >
      {/* Tabs Navigation */}
      <div className="mb-8 bg-white rounded-xl p-2 shadow-lg border border-slate-200 sticky top-20 z-10">
        <div className="flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isDisabled = 
              (tab.id === 'integration' && !data.integration);

            if (isDisabled) return null;

            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isDisabled}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>
    </EducationalPageLayout>
  );
}
