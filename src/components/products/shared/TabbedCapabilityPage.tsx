'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProductSlug, CapabilitySlug, getCapabilityCoPilots } from '@/data/navigation/co-pilot-mappings';
import { getCapabilityDefinition } from '@/data/navigation/product-capabilities';
import { coPilotDetailsData } from '@/data/coPilotDetails';
import ProductHeroSection, { ProductHeroContent } from './ProductHeroSection';
import OutcomeFocusedCoPilotPage from '@/components/co-pilot-detail/OutcomeFocusedCoPilotPage';
import CSIJourneyContext from '@/components/products/oncology/CSIJourneyContext';
import { Target, Shield, Activity, Search, Dna, Clock, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { csiJourneyLevels } from '@/data/homepage/csi-journey-data';

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
  // For match-patients-to-therapies, default to therapy-fit
  const defaultCoPilotSlug = defaultTab || (capabilitySlug === 'match-patients-to-therapies' 
    ? coPilotMappings.find(m => m.coPilotSlug === 'therapy-fit')?.coPilotSlug 
    : coPilotMappings[0]?.coPilotSlug);
  const [activeTab, setActiveTab] = useState<string>(defaultCoPilotSlug || '');
  
  // For match-patients-to-therapies, only show Therapy Fit (filter out other co-pilots)
  const displayMappings = capabilitySlug === 'match-patients-to-therapies'
    ? coPilotMappings.filter(m => m.coPilotSlug === 'therapy-fit')
    : coPilotMappings;
  
  if (!capabilityDef) {
    return <div>Capability not found</div>;
  }
  
  const IconComponent = iconMap[capabilityDef.icon] || Target;
  const activeCoPilotData = coPilotDetailsData[activeTab];
  
  // Get next level for progression guidance
  const currentJourneyLevel = capabilitySlug === 'match-patients-to-therapies' ? 2 :
                               capabilitySlug === 'predict-resistance' ? 3 :
                               capabilitySlug === 'prevent-toxicity' ? 4 : null;
  const nextLevel = currentJourneyLevel && currentJourneyLevel < 5 
    ? csiJourneyLevels.find(l => l.level === currentJourneyLevel + 1) 
    : null;
  
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
      
      {/* CSI Journey Context for journey level pages */}
      {capabilitySlug === 'match-patients-to-therapies' && (
        <CSIJourneyContext level={2} capabilitySlug={capabilitySlug} />
      )}
      {capabilitySlug === 'predict-resistance' && (
        <CSIJourneyContext level={3} capabilitySlug={capabilitySlug} />
      )}
      {capabilitySlug === 'prevent-toxicity' && (
        <CSIJourneyContext level={4} capabilitySlug={capabilitySlug} />
      )}
      
      {/* Show Therapy Fit card + Related Capabilities for match-patients-to-therapies */}
      {capabilitySlug === 'match-patients-to-therapies' ? (
        <section className="mb-16">
          {/* Primary Capability: CSI-Powered Drug Recommendations */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">CSI-Powered Drug Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Therapy Fit Card (Active) - Updated to CSI-focused */}
              {displayMappings.map((mapping, idx) => {
                const coPilotData = coPilotDetailsData[mapping.coPilotSlug];
                if (!coPilotData) return null;
                
                const isActive = activeTab === mapping.coPilotSlug;
                let cardTitle = 'CSI-Powered Drug Recommendations';
                
                const colors = { bg: 'from-green-50 to-emerald-50', border: 'border-green-200', iconBg: 'bg-green-100', text: 'text-green-600' };
                
                return (
                  <motion.div
                    key={mapping.coPilotSlug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className={`
                      bg-gradient-to-br ${colors.bg} rounded-2xl p-6 border-2 transition-all duration-300
                      ${colors.border} shadow-xl ring-2 ring-offset-2 ring-blue-500
                    `}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-slate-600 mb-1">
                          S/P/E Framework (Validated)
                        </div>
                        <div className={`text-xl font-bold ${colors.text} line-clamp-2`}>
                          {cardTitle}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">
                      Rank drugs by mechanism fit for DDR-targeted therapy. S/P/E framework (AUROC 0.70, n=149) computes M (Mechanism Fit) component of CSI.
                    </p>
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold">
                          <span>✓</span>
                          <span>Retrospective-tested</span>
                        </div>
                        <div className="text-sm font-semibold text-slate-700">
                          AUROC 0.70
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* Next Steps: Unlock Level 3 */}
          {nextLevel && (
            <div className="mt-16 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 rounded-2xl border-2 border-orange-200 p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {nextLevel.level}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-orange-700 mb-2">Next: Unlock Level {nextLevel.level}</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{nextLevel.title}</h3>
                  <p className="text-slate-700 mb-4">{nextLevel.description}</p>
                  <Link
                    href={nextLevel.href}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                  >
                    <span>Continue to Level {nextLevel.level}</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Supporting Capabilities (Tertiary Section) - Only show non-journey capabilities */}
          {capabilitySlug === 'match-patients-to-therapies' && (
            <div className="mt-12">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Supporting Capabilities</h3>
              <p className="text-sm text-slate-600 mb-6">
                Additional tools that enhance your CSI-powered treatment journey:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {[
                {
                  title: 'Resolve Genetic Uncertainty',
                  subtitle: 'Zero-Shot Variant Interpretation',
                  description: 'Zero-shot variant interpretation with Evo2 foundation model. Instantly resolves variants of unknown significance with 95.7% AUROC accuracy and transparent biological reasoning.',
                  metric: '95.7% AUROC, 73% VUS Resolution',
                  time: '30 seconds',
                  href: '/products/oncology/resolve-genetic-uncertainty',
                  icon: Search,
                  colors: { bg: 'from-blue-50 to-cyan-50', border: 'border-blue-200', iconBg: 'bg-blue-100', text: 'text-blue-600' }
                },
                {
                  title: 'Match Patients to Clinical Trials',
                  subtitle: '96.6% Match Accuracy',
                  description: 'Transparent eligibility reasoning with green/yellow/red flags per criterion. Same-day trial site calls with action-ready packets.',
                  metric: '96.6% Accuracy',
                  time: '45 seconds',
                  href: '/products/oncology/clinical-trials',
                  icon: Target,
                  colors: { bg: 'from-purple-50 to-violet-50', border: 'border-purple-200', iconBg: 'bg-purple-100', text: 'text-purple-600' }
                }
              ].map((capability, idx) => {
              const IconComp = capability.icon;
              return (
                <Link key={capability.href} href={capability.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: (displayMappings.length + idx) * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className={`
                      bg-gradient-to-br ${capability.colors.bg} rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer
                      ${capability.colors.border} hover:shadow-lg
                    `}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl ${capability.colors.iconBg} flex items-center justify-center flex-shrink-0`}>
                        <IconComp className={`w-6 h-6 ${capability.colors.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-slate-600 mb-1">
                          {capability.subtitle}
                        </div>
                        <div className={`text-xl font-bold ${capability.colors.text} line-clamp-2 mb-2`}>
                          {capability.title}
                        </div>
                        <p className="text-sm text-slate-600 line-clamp-3">
                          {capability.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
                      <div className="flex items-center gap-4 text-xs text-slate-600">
                        <span className="flex items-center gap-1">
                          <Zap className="w-4 h-4" />
                          {capability.metric}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {capability.time}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-blue-600">
                        View Details →
                      </span>
                    </div>
                  </motion.div>
                </Link>
              );
              })}
              </div>
            </div>
          )}
        </section>
      ) : (
        /* Original behavior for other capabilities */
        displayMappings.length > 0 && (
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {displayMappings.map((mapping, idx) => {
            const coPilotData = coPilotDetailsData[mapping.coPilotSlug];
            if (!coPilotData) return null;
            
            const isActive = activeTab === mapping.coPilotSlug;
                
            let cardTitle = coPilotData.pageTitle.split(':')[0] || coPilotData.pageTitle;
            if (cardTitle.includes('Therapy Fit')) {
              cardTitle = 'Therapy Fit';
            } else if (cardTitle.includes('Chemo Co‑Pilot')) {
              cardTitle = 'Chemo Co‑Pilot';
            } else if (cardTitle.includes('Immunotherapy Matching')) {
              cardTitle = 'Immunotherapy Matching';
            }
            
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
        )
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

