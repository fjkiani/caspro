'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Zap, 
  Shield, 
  Factory,
  Play,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Layers,
  BrainCircuit,
  FlaskConical,
  TestTube2
} from 'lucide-react';

// Import ALL working components
import BridgingValleySimulation from '@/components/simulations/sections/BridgingValleySimulation';
import DiscoveryRaceSimulation from '@/components/simulations/sections/DiscoveryRaceSimulation';
import InteractiveDemoSection from '@/components/landing/InteractiveDemoSection';
import DrugDevelopmentPlatform from './DrugDevelopmentPlatform';

interface DrugDevelopmentOrchestratorProps {
  className?: string;
}

type ViewMode = 'overview' | 'simulations' | 'platform' | 'demos';

const DrugDevelopmentOrchestrator: React.FC<DrugDevelopmentOrchestratorProps> = ({ 
  className = '' 
}) => {
  const [activeView, setActiveView] = useState<ViewMode>('overview');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['overview']));

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const views = {
    overview: {
      id: 'overview',
      title: 'Valley of Death Overview',
      subtitle: 'High-level 3-stage transformation',
      icon: Target,
      color: 'from-red-500 to-pink-600',
      description: 'See how CrisPRO supports drug development workflows with in-silico validation'
    },
    simulations: {
      id: 'simulations', 
      title: 'Live Simulations',
      subtitle: 'Interactive API demonstrations',
      icon: Zap,
      color: 'from-blue-500 to-cyan-600',
      description: 'Experience our AI engines solving real drug development challenges'
    },
    platform: {
      id: 'platform',
      title: '4-Engine Platform',
      subtitle: 'Oracle + Forge + Boltz + Command Center',
      icon: Factory,
      color: 'from-green-500 to-emerald-600', 
      description: 'Explore our complete AI intelligence stack'
    },
    demos: {
      id: 'demos',
      title: 'Try Our AI Live',
      subtitle: 'Target Validation, Lead Engineering, Pre-Clinical',
      icon: Play,
      color: 'from-purple-500 to-indigo-600',
      description: 'Interactive demos showcasing our core capabilities'
    }
  };

  const currentView = views[activeView];

  return (
    <section className={`py-20 bg-gradient-to-br from-slate-50 to-blue-50 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 text-slate-800">
            Drug Development Transformation
          </h2>
          <p className="text-2xl text-slate-600 max-w-5xl mx-auto mb-8">
            AI-powered tools for drug development workflows
          </p>
        </motion.div>

        {/* View Selector */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-xl p-2 shadow-lg border border-slate-200">
            {Object.values(views).map((view) => {
              const IconComponent = view.icon;
              const isActive = activeView === view.id;
              
              return (
                <button
                  key={view.id}
                  onClick={() => setActiveView(view.id as ViewMode)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${view.color} text-white shadow-md`
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold">{view.title}</div>
                    <div className="text-xs opacity-80">{view.subtitle}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content based on active view */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {activeView === 'overview' && (
              <div className="space-y-16">
                {/* Valley of Death Problem */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-slate-800 mb-4">The Valley of Death Crisis</h3>
                    <p className="text-xl text-slate-600 max-w-4xl mx-auto">
                      90% of drug development projects fail, costing $2.6B on average. 
                      The problem isn't the science—it's the lack of intelligence in target validation and lead discovery.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target className="w-8 h-8 text-red-600" />
                      </div>
                      <h4 className="text-xl font-bold text-slate-800 mb-2">Target Validation</h4>
                      <p className="text-slate-600">Years of exploration with no guarantee of success</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Factory className="w-8 h-8 text-yellow-600" />
                      </div>
                      <h4 className="text-xl font-bold text-slate-800 mb-2">Lead Discovery</h4>
                      <p className="text-slate-600">Screening millions of compounds with low hit rates</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-orange-600" />
                      </div>
                      <h4 className="text-xl font-bold text-slate-800 mb-2">Pre-Clinical</h4>
                      <p className="text-slate-600">Expensive validation with high failure rates</p>
                    </div>
                  </div>
                </div>

                {/* Our Solution */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-xl p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold mb-4">Our Solution: AI-Powered Tools</h3>
                    <p className="text-xl opacity-90 max-w-4xl mx-auto">
                      Replace gambling with mathematical certainty through our 4-engine AI platform
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BrainCircuit className="w-8 h-8" />
                      </div>
                      <h4 className="text-lg font-bold mb-2">Oracle</h4>
                      <p className="text-sm opacity-90">95.7% AUROC variant prediction</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Factory className="w-8 h-8" />
                      </div>
                      <h4 className="text-lg font-bold mb-2">Forge</h4>
                      <p className="text-sm opacity-90">70% Pfam-hit therapeutic design</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8" />
                      </div>
                      <h4 className="text-lg font-bold mb-2">Boltz</h4>
                      <p className="text-sm opacity-90">95.8% structural validation</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Layers className="w-8 h-8" />
                      </div>
                      <h4 className="text-lg font-bold mb-2">Command</h4>
                      <p className="text-sm opacity-90">Complete orchestration</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeView === 'simulations' && (
              <div className="space-y-16">
                <BridgingValleySimulation 
                  autoStart={false}
                  showStaticVersion={false}
                />
                <DiscoveryRaceSimulation />
              </div>
            )}

            {activeView === 'platform' && (
              <DrugDevelopmentPlatform />
            )}

            {activeView === 'demos' && (
              <InteractiveDemoSection />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-slate-800 to-blue-800 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Get Started with CrisPRO R&D</h3>
            <p className="text-slate-200 mb-6 max-w-2xl mx-auto">
              See how CrisPRO supports R&D workflows with in-silico validation
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-white text-slate-800 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors">
                Schedule Executive Demo
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                View Platform Overview
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DrugDevelopmentOrchestrator;
