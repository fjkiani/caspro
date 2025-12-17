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
      
      {/* Capability Cards (Act as Tabs) */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {coPilotMappings.map((mapping, idx) => {
            const coPilotData = coPilotDetailsData[mapping.coPilotSlug];
            if (!coPilotData) return null;
            
            const isActive = activeTab === mapping.coPilotSlug;
            // Extract short title: "Chemo Co‑Pilot: ..." -> "Chemo Co‑Pilot"
            let cardTitle = coPilotData.pageTitle.split(':')[0] || coPilotData.pageTitle;
            // Handle "Therapy Fit: ..." -> "Therapy Fit"
            if (cardTitle.includes('Therapy Fit')) {
              cardTitle = 'Therapy Fit';
            } else if (cardTitle.includes('Chemo Co‑Pilot')) {
              cardTitle = 'Chemo Co‑Pilot';
            } else if (cardTitle.includes('Immunotherapy Matching')) {
              cardTitle = 'Immunotherapy Matching';
            }
            
            // Color schemes for each card
            const colorSchemes = [
              { bg: 'from-blue-50 to-indigo-50', border: 'border-blue-200', iconBg: 'bg-blue-100', text: 'text-blue-600' },
              { bg: 'from-green-50 to-emerald-50', border: 'border-green-200', iconBg: 'bg-green-100', text: 'text-green-600' },
              { bg: 'from-purple-50 to-pink-50', border: 'border-purple-200', iconBg: 'bg-purple-100', text: 'text-purple-600' },
            ];
            const colors = colorSchemes[idx % colorSchemes.length];
            
            return (
              <motion.button
                key={mapping.coPilotSlug}
                onClick={() => setActiveTab(mapping.coPilotSlug)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  bg-gradient-to-br ${colors.bg} rounded-2xl p-6 border-2 transition-all duration-300 text-left
                  ${isActive 
                    ? `${colors.border} shadow-xl ring-2 ring-offset-2 ring-blue-500` 
                    : `${colors.border} hover:shadow-lg cursor-pointer`
                  }
                `}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm ${isActive ? 'font-semibold' : ''} text-slate-600 mb-1`}>
                      {mapping.description || 'Capability'}
                    </div>
                    <div className={`text-xl font-bold ${colors.text} line-clamp-2`}>
                      {cardTitle}
                    </div>
                  </div>
                </div>
                {isActive && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold">
                      <span>✓</span>
                      <span>Active</span>
                    </div>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </section>
      
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

