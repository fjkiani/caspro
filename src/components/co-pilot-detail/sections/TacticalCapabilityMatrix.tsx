'use client';

import React, { useState, ElementType } from 'react';
import { KeyCapability } from '@/data/coPilotDetails';
import IconSelector from './shared/IconSelector';
import { motion } from 'framer-motion';
import { CheckCircle, Settings, Microscope, Briefcase, Database, Target, FileText, Users, ShieldCheck, TrendingUp, Activity, AlertTriangle, Layers, Zap, MessageSquare, RefreshCw, Brain, Clock, Eye, Hash, Download, Share, Workflow, Repeat, BarChart } from 'lucide-react';
import { normalizeAspect } from './shared/AspectNormalizer';

interface TacticalCapabilityMatrixProps {
  keyCapabilities: KeyCapability[];
}

const iconComponents: { [key: string]: ElementType } = {
  Settings,
  Microscope,
  Briefcase,
  Database,
  Target,
  FileText,
  Users,
  ShieldCheck,
  TrendingUp,
  Activity,
  AlertTriangle,
  Layers,
  CheckCircle,
  Zap,
  MessageSquare,
  RefreshCw,
  Brain,
  Clock,
  Eye,
  Hash,
  Download,
  Share,
  Workflow,
  Repeat,
  BarChart,
};

const getIconComponent = (iconName: string): ElementType => {
  return iconComponents[iconName] || CheckCircle;
};

export default function TacticalCapabilityMatrix({ keyCapabilities }: TacticalCapabilityMatrixProps) {
  const [activeCapabilityTab, setActiveCapabilityTab] = useState(0);
  const [activeAspect, setActiveAspect] = useState<'technical' | 'scientific' | 'business' | null>('technical');

  // Reset activeAspect when capability tab changes
  const handleCapabilityChange = (index: number) => {
    setActiveCapabilityTab(index);
    setActiveAspect('technical'); // Default to technical when switching capabilities
  };

  if (!keyCapabilities || keyCapabilities.length === 0) {
    return null;
  }

  const activeCapability = keyCapabilities[activeCapabilityTab];

  return (
    <motion.div 
      className="mb-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-slate-800 mb-4">Core Capabilities</h3>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          {keyCapabilities.length} advanced AI-powered capabilities designed to transform your workflow
        </p>
      </div>

      {/* Capability Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {keyCapabilities.map((cap, index) => (
          <button
            key={index}
            onClick={() => handleCapabilityChange(index)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              activeCapabilityTab === index
                ? 'bg-primary text-white shadow-lg'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            <IconSelector title={cap.title} size={16} />
            {cap.title.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Active Capability Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {[activeCapability.technical, activeCapability.scientific, activeCapability.business].map((aspect, index) => {
          const aspectData = normalizeAspect(aspect, index);
          const IconComp = getIconComponent(aspectData.icon);
          const aspectTypes = ['technical', 'scientific', 'business'] as const;
          const aspectType = aspectTypes[index];
          const isActive = activeAspect === aspectType;
          
          const colorVariants = {
            'blue': isActive ? 'from-blue-100 to-blue-200 border-blue-300 text-blue-800 shadow-blue-200' : 'from-blue-50 to-blue-100 border-blue-200 text-blue-700 hover:from-blue-100 hover:to-blue-150',
            'teal': isActive ? 'from-teal-100 to-teal-200 border-teal-300 text-teal-800 shadow-teal-200' : 'from-teal-50 to-teal-100 border-teal-200 text-teal-700 hover:from-teal-100 hover:to-teal-150',
            'indigo': isActive ? 'from-indigo-100 to-indigo-200 border-indigo-300 text-indigo-800 shadow-indigo-200' : 'from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-700 hover:from-indigo-100 hover:to-indigo-150',
          };
          const colorClass = colorVariants[aspectData.color as keyof typeof colorVariants] || 'from-slate-50 to-slate-100 border-slate-200 text-slate-700 hover:from-slate-100 hover:to-slate-150';
          
          return (
            <motion.button 
              key={aspectData.title}
              onClick={() => setActiveAspect(aspectType)}
              className={`relative overflow-hidden group transition-all duration-500 p-8 rounded-3xl border-2 bg-gradient-to-br ${colorClass} hover:shadow-xl hover:scale-105 border-opacity-60 cursor-pointer w-full text-left min-h-[280px] flex flex-col`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-5 bg-slate-400" style={{
                backgroundImage: `radial-gradient(circle at 20% 80%, currentColor 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
              
              {/* Content */}
              <div className="relative flex flex-col items-center text-center flex-1">
                {/* Icon */}
                <div className={`relative w-20 h-20 rounded-3xl flex items-center justify-center mb-6 transition-all duration-500 bg-white/90 text-slate-600 group-hover:bg-white group-hover:text-slate-700 group-hover:shadow-lg ${
                  isActive ? 'shadow-lg' : ''
                }`}>
                  <IconComp size={32} />
                </div>
                
                {/* Title */}
                <h4 className="font-bold text-lg leading-tight text-center px-2 text-slate-800 mb-3">
                  {aspectData.title}
                </h4>
                
                {/* Key Metric */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4 ${
                  aspectData.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                  aspectData.color === 'teal' ? 'bg-teal-100 text-teal-700' :
                  'bg-indigo-100 text-indigo-700'
                }`}>
                  <TrendingUp size={14} />
                  {aspectData.keyMetric}
                </div>
                
                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed text-center flex-1">
                  {aspectData.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Detailed Component Cards - Only show when an aspect is selected */}
      {activeAspect && (
        <motion.div 
          className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-white rounded-3xl p-12 border-2 border-slate-200/60 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-slate-100 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative">
            {/* Header */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <IconSelector title={activeCapability.title} size={20} />
                </div>
                <div className="text-left">
                  <h4 className="text-xl font-bold text-slate-800">
                    {activeCapability.title}
                  </h4>
                  <p className="text-sm text-slate-500">Capability Deep Dive</p>
                </div>
              </div>
            </div>
            
            {/* Content - Show only the selected aspect's components */}
            <div className="max-w-6xl mx-auto">
              {(() => {
                const selectedAspect = activeCapability[activeAspect];
                if (typeof selectedAspect === 'object' && selectedAspect.components && selectedAspect.components.length > 0) {
                  const aspectTitles = {
                    technical: 'Technical Approach',
                    scientific: 'Scientific Impact', 
                    business: 'Business Value'
                  };
                  const aspectDescriptions = {
                    technical: 'Advanced AI-powered capabilities',
                    scientific: 'Research and clinical outcomes',
                    business: 'Strategic advantages and ROI'
                  };
                  
                  return (
                    <div className="mb-12">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">{aspectTitles[activeAspect]}</h3>
                        <p className="text-slate-600">{aspectDescriptions[activeAspect]}</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {selectedAspect.components.map((component: any, index: number) => {
                          const ComponentIcon = getIconComponent(component.iconName);
                          const colorThemes = {
                            blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', accent: 'bg-blue-500', hover: 'hover:bg-blue-100' },
                            teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-600', accent: 'bg-teal-500', hover: 'hover:bg-teal-100' },
                            indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-600', accent: 'bg-indigo-500', hover: 'hover:bg-indigo-100' }
                          };
                          const theme = colorThemes[component.color as keyof typeof colorThemes] || colorThemes.blue;
                          
                          return (
                            <motion.div
                              key={component.title}
                              className={`relative overflow-hidden bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 border-2 ${theme.border} shadow-lg hover:shadow-2xl transition-all duration-500 group`}
                              initial={{ opacity: 0, y: 40, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                              whileHover={{ y: -8, scale: 1.02 }}
                            >
                              {/* Decorative corner */}
                              <div className={`absolute top-0 right-0 w-20 h-20 ${theme.accent} opacity-10 rounded-bl-3xl`}></div>
                              
                              {/* Icon */}
                              <div className={`w-16 h-16 rounded-2xl ${theme.bg} ${theme.hover} flex items-center justify-center mb-6 transition-colors duration-300`}>
                                <ComponentIcon className={`w-8 h-8 ${theme.text}`} />
                              </div>
                              
                              {/* Content */}
                              <h4 className={`text-xl font-bold ${theme.text} mb-3 group-hover:text-gray-900 transition-colors duration-300`}>{component.title}</h4>
                              <p className={`text-base font-medium ${theme.text} mb-4 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed`}>{component.subtitle}</p>
                              
                              {/* Features */}
                              {component.features && component.features.length > 0 && (
                                <div className="space-y-3">
                                  {component.features.map((feature: string, featureIndex: number) => (
                                    <div key={feature} className="flex items-center gap-3 text-sm text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                                      <div className={`w-2 h-2 rounded-full ${theme.accent} flex-shrink-0`}></div>
                                      <span className="leading-relaxed">{feature}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  );
                } else {
                  // Fallback for aspects without components
                  const aspectData = normalizeAspect(selectedAspect, 0);
                  return (
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        {React.createElement(getIconComponent(aspectData.icon), { size: 16, className: `text-${aspectData.color}-600` })}
                        <h5 className={`font-semibold text-${aspectData.color}-600 text-sm`}>{aspectData.title}</h5>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">{aspectData.description}</p>
                    </div>
                  );
                }
              })()}
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
        </motion.div>
      )}
    </motion.div>
  );
}
