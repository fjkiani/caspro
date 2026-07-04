'use client';

import React, { useState } from 'react';
;
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight, CheckCircle, LucideIcon } from 'lucide-react';
import Link from 'next/link';

export interface CapabilityCardData {
  id: string;
  capabilitySlug?: string; // For navigation to capability page
  title: string;
  subtitle: string;
  description?: string;
  icon: LucideIcon;
  color: string; // Tailwind gradient class
  badge: string;
  metrics: string;
  time: string;
  businessImpact: string;
  apis: string[];
  component: React.ComponentType<any>;
  seedData?: any;
}

export interface CapabilityShowcaseProps {
  className?: string;
  sectionId?: string;
  title: string;
  description: string;
  capabilities: CapabilityCardData[];
  defaultCapabilityId?: string;
  headerEmoji?: string;
  headerGradient?: string;
  productSlug?: 'oncology' | 'r-d' | 'research'; // For navigation links
}

export default function CapabilityShowcase({
  className = '',
  sectionId = 'capability-showcase',
  title,
  description,
  capabilities,
  defaultCapabilityId,
  headerEmoji = '🎯',
  headerGradient = 'from-green-600 via-emerald-600 to-teal-600',
  productSlug = 'oncology' // Default to oncology
}: CapabilityShowcaseProps) {
  const defaultId = defaultCapabilityId || capabilities[0]?.id;
  const [activeCapability, setActiveCapability] = useState<string | null>(defaultId);
  const [demoStarted, setDemoStarted] = useState(false);

  const currentCapability = capabilities.find(cap => cap.id === activeCapability);

  const handleStartDemo = () => {
    setDemoStarted(true);
  };

  const renderActiveDemo = () => {
    if (!currentCapability) return null;
    const DemoComponent = currentCapability.component;
    return <DemoComponent {...(currentCapability.seedData || {})} />;
  };

  return (
    <section id={sectionId} className={`py-20 bg-gradient-to-b from-white to-slate-50 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            {headerEmoji} <span className={`bg-gradient-to-r ${headerGradient} bg-clip-text text-transparent`}>
              {title}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto mb-8">
            {description}
          </p>
        </motion.div>

        {/* Capability Cards - Grid layout */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-${capabilities.length} gap-4 md:gap-6 mb-12 max-w-7xl mx-auto`}>
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            const isActive = activeCapability === capability.id;
            
            return (
              <motion.div
                key={capability.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {capability.capabilitySlug ? (
                  <Link
                    href={`/products/${productSlug}/${capability.capabilitySlug}`}
                    className="block text-left p-6 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg text-slate-800 transition-all duration-300"
                  >
                    <div className="flex flex-col items-start gap-3 w-full">
                      {/* Icon */}
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${capability.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      {/* Content */}
                      <div className="mb-4 w-full">
                        <h3 className="font-bold text-lg md:text-xl mb-1 text-slate-900 group-hover:text-green-600 transition-colors">
                          {capability.title}
                        </h3>
                        <div className="text-sm mb-2 text-slate-500">
                          {capability.subtitle}
                        </div>
                        {capability.description && (
                          <p className="text-sm leading-relaxed text-slate-600">
                            {capability.description}
                          </p>
                        )}
                      </div>

                      {/* Metrics Preview */}
                      <div className="flex items-center gap-4 text-xs mb-4 text-slate-500">
                        <span>⚡ {capability.metrics}</span>
                        <span>🕒 {capability.time}</span>
                      </div>

                      {/* Link Indicator */}
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-200 w-full">
                        <ArrowRight className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-blue-600 font-semibold">View Details →</span>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <motion.button
                    onClick={() => {
                      setActiveCapability(capability.id);
                      setDemoStarted(false);
                    }}
                    className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 w-full ${
                      isActive
                        ? `border-${capability.color.split('-')[1]}-500 shadow-xl scale-105 bg-gradient-to-br ${capability.color} text-white`
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg text-slate-800'
                    }`}
                  >
                    <div className="flex flex-col items-start gap-3 w-full">
                      {/* Icon */}
                      <div className={`p-3 rounded-xl ${
                        isActive 
                          ? 'bg-white/20' 
                          : `bg-gradient-to-br ${capability.color}`
                      }`}>
                        <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-white'}`} />
                      </div>

                      {/* Content */}
                      <div className="mb-4 w-full">
                        <h3 className={`font-bold text-lg md:text-xl mb-1 ${
                          isActive ? 'text-white' : 'text-slate-900 group-hover:text-green-600'
                        } transition-colors`}>
                          {capability.title}
                        </h3>
                        <div className={`text-sm mb-2 ${isActive ? 'text-white/90' : 'text-slate-500'}`}>
                          {capability.subtitle}
                        </div>
                        {capability.description && (
                          <p className={`text-sm leading-relaxed ${isActive ? 'text-white/80' : 'text-slate-600'}`}>
                            {capability.description}
                          </p>
                        )}
                      </div>

                      {/* Metrics Preview */}
                      <div className={`flex items-center gap-4 text-xs mb-4 ${
                        isActive ? 'text-white/90' : 'text-slate-500'
                      }`}>
                        <span>⚡ {capability.metrics}</span>
                        <span>🕒 {capability.time}</span>
                      </div>

                      {/* Active Indicator */}
                      {isActive && (
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/20 w-full">
                          <CheckCircle className="w-4 h-4 text-white" />
                          <span className="text-sm text-white font-semibold">Selected for Demo</span>
                        </div>
                      )}
                    </div>
                  </motion.button>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Expanded Dossier - Only show when capability is selected */}
        {currentCapability && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 rounded-2xl border-2 border-slate-200 bg-white shadow-xl overflow-hidden max-w-7xl mx-auto"
          >
            {/* Dossier Header */}
            <div className={`bg-gradient-to-r ${currentCapability.color} p-6 md:p-8 text-white`}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <currentCapability.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 truncate">{currentCapability.title}</h3>
                    <p className="text-white/90 text-sm sm:text-base truncate">{currentCapability.subtitle}</p>
                  </div>
                  <div className="hidden sm:block flex-shrink-0">
                    <span className={`px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 text-white text-xs sm:text-sm font-bold rounded-full`}>
                      {currentCapability.badge}
                    </span>
                  </div>
                </div>

                {/* Performance Metrics and API Pipeline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-white/20 rounded-xl p-4">
                    <div className="text-xs text-white/80 mb-2">Performance</div>
                    <div className="text-2xl font-bold">{currentCapability.metrics}</div>
                    <div className="text-sm text-white/90">{currentCapability.time}</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4">
                    <div className="text-xs text-white/80 mb-2">API Pipeline</div>
                    <div className="flex flex-wrap gap-2">
                      {currentCapability.apis.slice(0, 3).map((api, idx) => (
                        <span key={idx} className="text-xs bg-white/30 px-2 py-1 rounded">
                          {api}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Demo Section */}
            <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-white">
              {!demoStarted ? (
                <div className="text-center py-12">
                  <motion.button
                    onClick={handleStartDemo}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${currentCapability.color} text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all`}
                  >
                    <Play className="w-6 h-6" />
                    <span>Start Interactive Demo</span>
                  </motion.button>
                  <p className="text-slate-600 mt-4 text-sm">
                    Experience how {currentCapability.title} works with real-time AI-powered analysis
                  </p>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    {renderActiveDemo()}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

