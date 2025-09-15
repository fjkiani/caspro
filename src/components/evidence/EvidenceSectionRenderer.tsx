'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, FileText } from 'lucide-react';

// Import interactive components
import {
  EvidenceIntelligenceSimulator,
  SPEFusionPlayground,
  DataLabExplorer,
  CohortContextSimulator
} from './interactive';

// Import existing SAE components
import {
  SAEFeatureVisualization,
  SAEAttributionCard,
  SAESafetyChecker,
  SAESteeringPanel
} from '@/components/evidence';

// Component mapping for interactive demos
const INTERACTIVE_COMPONENTS = {
  'EvidenceIntelligenceSimulator': EvidenceIntelligenceSimulator,
  'SPEFusionPlayground': SPEFusionPlayground,
  'DataLabExplorer': DataLabExplorer,
  'CohortContextSimulator': CohortContextSimulator,
  'SAEDemonstrations': () => (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <SAEFeatureVisualization />
        <SAEAttributionCard />
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <SAESafetyChecker />
        <SAESteeringPanel />
      </div>
    </div>
  )
} as const;

interface EvidenceSectionRendererProps {
  data: any; // We'll type this properly later
}

const EvidenceSectionRenderer: React.FC<EvidenceSectionRendererProps> = ({ data }) => {
  // Handle special case for overview
  if (data.capabilities && data.featureConnections) {
    return (
      <div className="space-y-16 ml-8"> {/* Add left margin to avoid sidebar overlap */}
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            {data.hero.title}
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {data.hero.description}
          </p>
          
          {/* Badges */}
          {data.hero.badges && (
            <div className="flex flex-wrap justify-center gap-4">
              {data.hero.badges.map((badge: any, index: number) => (
                <div key={index} className={`px-4 py-2 rounded-full text-sm font-medium ${badge.color}`}>
                  {badge.text}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Capability Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.capabilities.map((capability: any, index: number) => (
            <div
              key={capability.id}
              className={`p-6 bg-white rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-all ${capability.hoverBorder}`}
            >
              <div className={`p-3 ${capability.iconBg} rounded-lg w-fit mb-4`}>
                <capability.icon className={`w-6 h-6 ${capability.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{capability.title}</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">{capability.description}</p>
              <div className={`text-sm font-medium ${capability.textColor}`}>
                {capability.stats}
              </div>
            </div>
          ))}
        </div>

        {/* Interconnected Features */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">
            Interconnected Intelligence
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {data.featureConnections.map((feature: any, index: number) => (
              <div
                key={feature.title}
                className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm"
              >
                <div className={`p-2 rounded-lg ${feature.color}`}>
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{feature.title}</h4>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Get the interactive component
  const InteractiveComponent = data.interactiveDemo ? 
    INTERACTIVE_COMPONENTS[data.interactiveDemo.component as keyof typeof INTERACTIVE_COMPONENTS] : 
    null;

  return (
    <div className="space-y-16 ml-8"> {/* Add left margin to avoid sidebar overlap */}
      {/* Hero Section */}
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-slate-900">{data.hero?.title || data.title}</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {data.hero?.description || data.description}
          </p>
        </div>
        
        {/* Badges */}
        {data.hero?.badges && (
          <div className="flex flex-wrap justify-center gap-4">
            {data.hero.badges.map((badge: any, index: number) => (
              <div key={index} className={`px-4 py-2 rounded-full text-sm font-medium ${badge.color}`}>
                {badge.text}
              </div>
            ))}
          </div>
        )}
      </div>

      

      {/* Interactive Demo Component */}
      {InteractiveComponent && (
        <div className="relative">
          
        
          
          <InteractiveComponent />
        </div>
      )}

      

      {/* Tab Navigation Hint */}
   

     

      {/* Call to Action */}
      {/* {data.callToAction && (
        <section className="py-16 px-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">
              {data.callToAction.title}
            </h3>
            <p className="text-xl text-blue-100 mb-8">
              {data.callToAction.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                {data.callToAction.primaryButton}
              </button>
              <button className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 transition-colors border border-blue-400">
                {data.callToAction.secondaryButton}
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}; */}
    </div>
  );
};

export default EvidenceSectionRenderer;
