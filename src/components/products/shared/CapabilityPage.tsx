'use client';

import React from 'react';
import Link from 'next/link';
import { ProductSlug, CapabilitySlug, getCapabilityCoPilots } from '@/data/navigation/co-pilot-mappings';
import { getCapabilityDefinition } from '@/data/navigation/product-capabilities';
import { coPilotDetailsData } from '@/data/coPilotDetails';
import ProductHeroSection, { ProductHeroContent } from './ProductHeroSection';
import SectionHeader from './SectionHeader';
import { ArrowRight, Target, Shield, Activity, Search, Dna } from 'lucide-react';
import { motion } from 'framer-motion';

interface CapabilityPageProps {
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

export default function CapabilityPage({ productSlug, capabilitySlug }: CapabilityPageProps) {
  const capabilityDef = getCapabilityDefinition(productSlug, capabilitySlug);
  const coPilotMappings = getCapabilityCoPilots(productSlug, capabilitySlug);
  
  if (!capabilityDef) {
    return <div>Capability not found</div>;
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
    ctas: [
      {
        label: 'Explore Co-Pilots →',
        href: '#co-pilots',
        variant: 'secondary' as const,
      },
    ],
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
      
      {/* Co-Pilots List */}
      <section id="co-pilots" className="mb-16">
        <SectionHeader
          title="Co-Pilots"
          description={`${coPilotMappings.length} co-pilot${coPilotMappings.length !== 1 ? 's' : ''} available for this capability`}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coPilotMappings.map((mapping, idx) => {
            const coPilotData = coPilotDetailsData[mapping.coPilotSlug];
            if (!coPilotData) return null;
            
            return (
              <motion.div
                key={mapping.coPilotSlug}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Link
                  href={`/products/${productSlug}/${capabilitySlug}/${mapping.coPilotSlug}`}
                  className="block bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-900">{coPilotData.pageTitle}</h3>
                    <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  </div>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {coPilotData.heroSubtitle || coPilotData.vision}
                  </p>
                  {mapping.description && (
                    <div className="text-xs text-blue-600 font-semibold">{mapping.description}</div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
      
      {/* API Endpoints */}
      {capabilityDef.apis && capabilityDef.apis.length > 0 && (
        <section className="mb-16">
          <SectionHeader
            title="API Endpoints"
            description="APIs powering this capability"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {capabilityDef.apis.map((api, idx) => (
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


