'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle, Cpu, ShieldCheck, Target, Zap, Brain, Users, ArrowRight, Settings, Microscope, Briefcase, Beaker, BookCheck, Bot } from 'lucide-react';
import { CoPilotDetailContent } from '@/data/coPilotDetails';
import { motion, AnimatePresence } from 'framer-motion';

// Reuse desci components
const FeatureHighlight = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-xl shadow-lg border border-slate-200 h-full transition-all duration-300 hover:border-blue-500 hover:shadow-blue-500/20">
      <div className="mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 text-lg">{description}</p>
    </div>
  );
};

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4 leading-tight">
        {title}
      </h2>
      <p className="text-lg md:text-xl text-slate-600 font-light max-w-3xl mx-auto">
        {subtitle}
      </p>
    </motion.div>
  );
};

const featureVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

interface DesciStyleDoctrineInsightsProps {
  content: CoPilotDetailContent;
  className?: string;
}

const DesciStyleDoctrineInsights: React.FC<DesciStyleDoctrineInsightsProps> = ({ content, className = '' }) => {
  const [activeCapabilityTab, setActiveCapabilityTab] = useState(0);

  const getIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('plan') || lowerTitle.includes('quality')) return <Settings size={48} className="text-blue-400" />;
    if (lowerTitle.includes('radio-genomics') || lowerTitle.includes('biomarker')) return <Brain size={48} className="text-pink-400" />;
    if (lowerTitle.includes('adaptive') || lowerTitle.includes('art')) return <Zap size={48} className="text-yellow-400" />;
    if (lowerTitle.includes('outcome') || lowerTitle.includes('predict')) return <Target size={48} className="text-green-400" />;
    if (lowerTitle.includes('knowledge') || lowerTitle.includes('research')) return <Microscope size={48} className="text-teal-400" />;
    if (lowerTitle.includes('design') || lowerTitle.includes('chopchop')) return <Brain size={48} className="text-sky-400" />;
    if (lowerTitle.includes('variant effect') || lowerTitle.includes('evo 2')) return <Cpu size={48} className="text-lime-400" />;
    if (lowerTitle.includes('outcome analysis') || lowerTitle.includes('crispresso2')) return <Briefcase size={48} className="text-indigo-400" />;
    return <Brain size={48} className="text-blue-400" />;
  };

  const activeCapability = content.keyCapabilities[activeCapabilityTab];

  // Create desci-style doctrine cards
  

  return (
    <section className={`py-20 bg-white ${className}`}>
      <div className="container mx-auto px-6">
        {/* Desci-Style Header */}
        <SectionHeader 
          title="Strategic Doctrine" 
          subtitle="Our operational approach delivers multi-stage precision with cascading strategic advantages. Each capability builds upon the last, creating overwhelming competitive superiority." 
        />

        {/* Core Capabilities Overview */}
        <div className="text-center mb-16">
        
          {/* Genomic Use Cases Integration */}
          {content.keyCapabilities.some(cap => cap.genomicUseCasesParagraph) && (
            <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 shadow-lg max-w-4xl mx-auto">
              
           
            
                </div>
          )}
        </div>

     

        {/* Capability Tabs */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-800 mb-8">Tactical Capability Matrix</h3>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {content.keyCapabilities.map((cap, index) => (
              <button
                key={index}
                onClick={() => setActiveCapabilityTab(index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeCapabilityTab === index
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                }`}
              >
                {getIcon(cap.title)}
                {cap.title.split(':')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Active Capability Display - White Theme */}
        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-lg mb-16">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">
                {activeCapabilityTab + 1}
              </span>
              <div className="flex items-center gap-3">
                {getIcon(activeCapability.title)}
                <h4 className="text-2xl font-bold text-slate-800">{activeCapability.title}</h4>
              </div>
            </div>
          </div>

          {/* Capability Details Grid - Using FeatureHighlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Technical Approach */}
            <FeatureHighlight 
              icon={<Settings size={48} className="text-blue-400" />}
              title="Technical Approach"
              description={activeCapability.technical}
            />
            
            {/* Scientific Impact */}
            <FeatureHighlight 
              icon={<Microscope size={48} className="text-teal-400" />}
              title="Scientific Impact"
              description={activeCapability.scientific}
            />
            
            {/* Business Value */}
            <FeatureHighlight 
              icon={<Briefcase size={48} className="text-indigo-400" />}
              title="Business Value"
              description={activeCapability.business}
            />
          </div>
          
          {/* Genomic Use Cases Integration - White Theme */}
          {activeCapability.genomicUseCasesParagraph && (
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Brain size={20} className="text-pink-600" />
                <h5 className="font-semibold text-pink-600">Genomic Use Cases Integration</h5>
              </div>
              <div className="text-slate-700 text-sm leading-relaxed">
                {activeCapability.genomicUseCasesParagraph.split('**').map((part, partIndex) => {
                  if (partIndex % 2 === 1) {
                    return <strong key={partIndex} className="text-slate-800 font-semibold">{part}</strong>;
                  }
                  return part;
                })}
              </div>
            </div>
          )}
        </div>

        {/* Value Proposition Flywheel */}
        <div className="mb-16">
          <SectionHeader 
            title="The Value Proposition Flywheel" 
            subtitle="Strategic advantages that create a self-sustaining cycle of value delivery for each target audience." 
          />
          
          <div className="mt-16 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {content.valuePropositionSections.map((section, i) => (
                <motion.div
                  key={section.audience}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <Users size={32} className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{section.audience}</h3>
                      <ul className="space-y-2">
                        {section.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <div className="text-slate-600 text-sm leading-relaxed">
                              {point.split('**').map((part, partIndex) => {
                                if (partIndex % 2 === 1) {
                                  return <strong key={partIndex} className="text-slate-800 font-semibold">{part}</strong>;
                                }
                                return part;
                              })}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Flywheel Visualization */}
            <div className="relative h-96 flex items-center justify-center">
              <motion.svg 
                viewBox="0 0 400 400" 
                className="w-full h-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <defs>
                  <linearGradient id="value-flywheel-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                
                {/* Dashed circle */}
                <motion.circle 
                  cx="200" cy="200" r="150" 
                  fill="none" 
                  stroke="url(#value-flywheel-gradient)" 
                  strokeWidth="4" 
                  strokeDasharray="15 15"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />

                {/* Nodes for each audience */}
                {content.valuePropositionSections.map((section, i) => (
                  <motion.g 
                    key={`value-node-${i}`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.2 }}
                  >
                    <circle 
                      cx={200 + 150 * Math.cos(i * 2 * Math.PI / content.valuePropositionSections.length - Math.PI / 2)}
                      cy={200 + 150 * Math.sin(i * 2 * Math.PI / content.valuePropositionSections.length - Math.PI / 2)}
                      r="18"
                      fill="#f8fafc"
                      stroke="url(#value-flywheel-gradient)"
                      strokeWidth="3"
                    />
                    <g transform={`translate(${200 + 150 * Math.cos(i * 2 * Math.PI / content.valuePropositionSections.length - Math.PI / 2)}, ${200 + 150 * Math.sin(i * 2 * Math.PI / content.valuePropositionSections.length - Math.PI / 2)}) scale(0.5)`}>
                      <Users size={32} className="text-blue-600" transform="translate(-16, -16)" />
                    </g>
                  </motion.g>
                ))}
              </motion.svg>
            </div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center text-xl text-slate-600 mt-16 max-w-4xl mx-auto"
          >
            This value delivery cycle creates a self-sustaining loop of strategic advantages, accelerating therapeutic development and market adoption at an unprecedented pace.
          </motion.p>
        </div>

        {/* Strategic Conclusion - White Theme */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="h-8 w-8 text-blue-600" />
            <h3 className="text-2xl font-bold text-slate-800">Strategic Conclusion</h3>
          </div>
          <div className="text-slate-700 text-lg leading-relaxed">
            {content.conclusion.split('**').map((part, partIndex) => {
              if (partIndex % 2 === 1) {
                return <strong key={partIndex} className="text-slate-800 font-semibold">{part}</strong>;
              }
              return part;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesciStyleDoctrineInsights;
