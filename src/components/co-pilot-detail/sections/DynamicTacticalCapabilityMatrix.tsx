'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Award, TrendingUp, Zap, Clock } from 'lucide-react';
import MetricCard from '../../ui/MetricCard';
import { 
  extractComponentsFromText, 
  renderUniversalComponents, 
  getIconComponent 
} from './shared/UniversalCapabilityParser';

// Universal capability interface that can handle any structure
interface UniversalCapability {
  title: string;
  technical?: string | { title: string; keyMetric: string; description: string; components?: any[] };
  scientific?: string | { title: string; keyMetric: string; description: string };
  business?: string | { title: string; keyMetric: string; description: string };
  genomicUseCasesParagraph?: string;
}

interface DynamicTacticalCapabilityMatrixProps {
  keyCapabilities: UniversalCapability[];
  kpis?: Array<{ label: string; value: string }>;
  observedOutcomes?: Array<{ title: string; keyMetric: string; description: string; icon: string; color: string }>;
}

export default function DynamicTacticalCapabilityMatrix({ 
  keyCapabilities, 
  kpis, 
  observedOutcomes 
}: DynamicTacticalCapabilityMatrixProps) {
  const [activeCapabilityTab, setActiveCapabilityTab] = useState(0);

  if (!keyCapabilities || keyCapabilities.length === 0) {
    return null;
  }

  const activeCapability = keyCapabilities[activeCapabilityTab];

  // Smart parsing function that handles both string and object formats
  const parseCapabilityAspect = (aspect: string | any) => {
    if (typeof aspect === 'string') {
      return {
        title: 'Technical Approach',
        keyMetric: 'Advanced AI',
        description: aspect,
        components: extractComponentsFromText(aspect, activeCapability.title)
      };
    }
    return aspect;
  };

  const technicalAspect = parseCapabilityAspect(activeCapability.technical);
  const scientificAspect = parseCapabilityAspect(activeCapability.scientific);
  const businessAspect = parseCapabilityAspect(activeCapability.business);

  return (
    <div className="mb-16">
      {/* Capability Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {keyCapabilities.map((capability, index) => (
          <button
            key={capability.title}
            onClick={() => setActiveCapabilityTab(index)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeCapabilityTab === index
                ? 'bg-primary text-white shadow-lg'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {capability.title}
          </button>
        ))}
      </div>

      {/* Active Capability Display */}
      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-lg mb-16">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-primary" />
          </div>
          <div className="text-left">
            <h4 className="text-xl font-bold text-slate-800">
              {activeCapability.title}
            </h4>
            <p className="text-sm text-slate-500">Capability Deep Dive</p>
          </div>
        </div>
        
        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {/* Dynamic Components Rendering */}
          {technicalAspect.components && technicalAspect.components.length > 0 ? (
            renderUniversalComponents(technicalAspect.components, 0.2)
          ) : (
            /* Fallback for capabilities without components */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[technicalAspect, scientificAspect, businessAspect].map((aspect, index) => (
                <div key={aspect.title} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <h5 className="font-semibold text-primary text-sm">{aspect.title}</h5>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">{aspect.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Performance Metrics Section */}
          {(kpis && kpis.length > 0) && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="text-center mb-8">
                <h4 className="text-2xl font-bold text-slate-800 mb-2">Validated Performance</h4>
                <p className="text-slate-600">Real metrics from ClinVar validation and research applications</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.slice(0, 4).map((kpi, index) => {
                  // Extract numeric value for animation
                  const numericValue = parseFloat(kpi.value);
                  const isNumeric = !isNaN(numericValue);
                  
                  // Determine icon and color based on KPI content
                  let icon = Award;
                  let color = "text-blue-400";
                  
                  if (kpi.label.toLowerCase().includes('auro') || kpi.label.toLowerCase().includes('clinvar')) {
                    icon = Award;
                    color = "text-blue-400";
                  } else if (kpi.label.toLowerCase().includes('vus') || kpi.label.toLowerCase().includes('uncertainty')) {
                    icon = TrendingUp;
                    color = "text-green-400";
                  } else if (kpi.label.toLowerCase().includes('context') || kpi.label.toLowerCase().includes('token')) {
                    icon = Zap;
                    color = "text-purple-400";
                  } else if (kpi.label.toLowerCase().includes('brca') || kpi.label.toLowerCase().includes('supervised')) {
                    icon = CheckCircle;
                    color = "text-teal-400";
                  }
                  
                  return (
                    <MetricCard
                      key={kpi.label}
                      icon={icon}
                      value={isNumeric ? numericValue : kpi.value}
                      suffix={isNumeric ? "" : ""}
                      label={kpi.label}
                      description="Validated research performance"
                      color={color}
                      animated={isNumeric}
                      delay={0.1 + (index * 0.1)}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Observed Outcomes Section */}
          {(observedOutcomes && observedOutcomes.length > 0) && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="text-center mb-8">
                <h4 className="text-2xl font-bold text-slate-800 mb-2">Observed Outcomes</h4>
                <p className="text-slate-600">Real-world impact metrics from research applications</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {observedOutcomes.slice(0, 4).map((outcome, index) => {
                  const OutcomeIcon = getIconComponent(outcome.icon);
                  const colorMap = {
                    blue: "text-blue-400",
                    teal: "text-teal-400", 
                    indigo: "text-indigo-400",
                    green: "text-green-400",
                    purple: "text-purple-400"
                  };
                  const color = colorMap[outcome.color as keyof typeof colorMap] || "text-blue-400";
                  
                  return (
                    <motion.div
                      key={outcome.title}
                      className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.2 + (index * 0.1) }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center`}>
                          <OutcomeIcon className={`w-5 h-5 ${color}`} />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800">{outcome.title}</h5>
                          <p className={`text-sm font-semibold ${color}`}>{outcome.keyMetric}</p>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">{outcome.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Bottom accent */}
        <div className="mt-8 pt-6 border-t border-slate-200/60">
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <div className="w-2 h-2 rounded-full bg-primary/60"></div>
            <span>Research Use Only • Validated Performance</span>
            <div className="w-2 h-2 rounded-full bg-primary/60"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
