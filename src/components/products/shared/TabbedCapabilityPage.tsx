'use client';

import React, { useState } from 'react';
import { ProductSlug, CapabilitySlug, getCapabilityCoPilots } from '@/data/navigation/co-pilot-mappings';
import { getCapabilityDefinition } from '@/data/navigation/product-capabilities';
import { coPilotDetailsData } from '@/data/coPilotDetails';
import ProductHeroSection, { ProductHeroContent } from './ProductHeroSection';
import OutcomeFocusedCoPilotPage from '@/components/co-pilot-detail/OutcomeFocusedCoPilotPage';
import { Target, Shield, Activity, Search, Dna } from 'lucide-react';
import { motion } from 'framer-motion';

interface TabbedCapabilityPageProps {
  productSlug: ProductSlug;
  capabilitySlug: CapabilitySlug;
  defaultTab?: string; // Optional: co-pilot slug to show by default
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Target,
  Shield,
  Activity,
  Search,
  Dna,
};

export default function TabbedCapabilityPage({ 
  productSlug, 
  capabilitySlug,
  defaultTab 
}: TabbedCapabilityPageProps) {
  const capabilityDef = getCapabilityDefinition(productSlug, capabilitySlug);
  const coPilotMappings = getCapabilityCoPilots(productSlug, capabilitySlug);
  
  // Determine default tab: use defaultTab param, or first co-pilot, or first mapping
  const defaultCoPilotSlug = defaultTab || coPilotMappings[0]?.coPilotSlug;
  const [activeTab, setActiveTab] = useState<string>(defaultCoPilotSlug || '');
  
  if (!capabilityDef) {
    return <div>Capability not found</div>;
  }
  
  const IconComponent = iconMap[capabilityDef.icon] || Target;
  const activeCoPilotData = coPilotDetailsData[activeTab];
  
  // Transform to hero content
  const heroContent: ProductHeroContent = {
    badge: {
      text: productSlug === 'oncology' ? 'ONCOLOGY CAPABILITY' : productSlug === 'r-d' ? 'R&D CAPABILITY' : 'RESEARCH CAPABILITY',
      emoji: productSlug === 'oncology' ? '🏥' : productSlug === 'r-d' ? '🔬' : '🧪',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
    },
    mainHeadline: capabilityDef.title,
    subtitle: capabilityDef.subtitle,
    description: capabilityDef.description,
    headlineGradient: 'from-blue-600 via-purple-600 to-indigo-600',
    ctas: [],
  };
  
  return (
    <>
      {/* Hero Section */}
      <ProductHeroSection content={heroContent} />
      
      {/* Capability Overview */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <IconComponent className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-slate-600">Metrics</div>
                <div className="text-2xl font-bold text-blue-600">{capabilityDef.metrics}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <div className="text-sm text-slate-600">Time</div>
                <div className="text-2xl font-bold text-green-600">{capabilityDef.time}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <div className="text-sm text-slate-600">Impact</div>
                <div className="text-sm font-semibold text-purple-600">{capabilityDef.businessImpact}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tabs */}
      {coPilotMappings.length > 1 && (
        <section className="mb-8">
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8 overflow-x-auto">
              {coPilotMappings.map((mapping) => {
                const coPilotData = coPilotDetailsData[mapping.coPilotSlug];
                if (!coPilotData) return null;
                
                const isActive = activeTab === mapping.coPilotSlug;
                const tabTitle = coPilotData.pageTitle.split(':')[0] || coPilotData.pageTitle;
                
                return (
                  <button
                    key={mapping.coPilotSlug}
                    onClick={() => setActiveTab(mapping.coPilotSlug)}
                    className={`
                      py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap
                      ${isActive 
                        ? 'border-blue-600 text-blue-600' 
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                      }
                    `}
                  >
                    {tabTitle}
                  </button>
                );
              })}
            </nav>
          </div>
        </section>
      )}
      
      {/* Active Tab Content */}
      {activeCoPilotData ? (
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <OutcomeFocusedCoPilotPage content={activeCoPilotData} />
        </motion.div>
      ) : (
        <div className="text-center py-12 text-slate-500">
          <p>Content for this tab is coming soon.</p>
        </div>
      )}
      
      {/* API Endpoints */}
      {capabilityDef.apis && capabilityDef.apis.length > 0 && (
        <section className="mb-16 mt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">API Endpoints</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {capabilityDef.apis.map((api) => (
              <div
                key={api}
                className="bg-slate-50 rounded-xl p-4 border border-slate-200 font-mono text-sm"
              >
                <code className="text-blue-600">/{api}</code>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

