'use client';

import React from 'react';
import { ProductSlug, CapabilitySlug, getCapabilityCoPilots } from '@/data/navigation/co-pilot-mappings';
import { getCapabilityDefinition } from '@/data/navigation/product-capabilities';
import { coPilotDetailsData } from '@/data/coPilotDetails';
import ProductHeroSection, { ProductHeroContent } from './ProductHeroSection';
import OutcomeFocusedCoPilotPage from '@/components/co-pilot-detail/OutcomeFocusedCoPilotPage';
import { Target, Shield, Activity, Search, Dna } from 'lucide-react';

interface DirectCapabilityPageProps {
  productSlug: ProductSlug;
  capabilitySlug: CapabilitySlug;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Target,
  Shield,
  Activity,
  Search,
  Dna,
};

export default function DirectCapabilityPage({ 
  productSlug, 
  capabilitySlug 
}: DirectCapabilityPageProps) {
  const capabilityDef = getCapabilityDefinition(productSlug, capabilitySlug);
  const coPilotMappings = getCapabilityCoPilots(productSlug, capabilitySlug);
  
  if (!capabilityDef) {
    return <div>Capability not found</div>;
  }
  
  // For single co-pilot capabilities, show the co-pilot content directly
  const coPilotSlug = coPilotMappings[0]?.coPilotSlug;
  const coPilotData = coPilotSlug ? coPilotDetailsData[coPilotSlug] : null;
  
  if (!coPilotData) {
    return <div>Co-pilot data not found</div>;
  }
  
  const IconComponent = iconMap[capabilityDef.icon] || Target;
  
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
      
      {/* Co-Pilot Content (shown directly) */}
      <OutcomeFocusedCoPilotPage content={coPilotData} />
      
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

