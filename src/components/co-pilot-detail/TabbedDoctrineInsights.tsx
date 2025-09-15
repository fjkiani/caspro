'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle, Cpu, ShieldCheck, Target, Zap, Brain, Users, ArrowRight, Settings, Microscope, Briefcase } from 'lucide-react';
import { CoPilotDetailContent } from '@/data/coPilotDetails';
import { motion, AnimatePresence } from 'framer-motion';

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

interface TabbedDoctrineInsightsProps {
  content: CoPilotDetailContent;
  className?: string;
}

const TabbedDoctrineInsights: React.FC<TabbedDoctrineInsightsProps> = ({ content, className = '' }) => {
  const [activeCapabilityTab, setActiveCapabilityTab] = useState(0);

  const getIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('plan') || lowerTitle.includes('quality')) return <Settings size={20} className="text-blue-600" />;
    if (lowerTitle.includes('radio-genomics') || lowerTitle.includes('biomarker')) return <Brain size={20} className="text-pink-600" />;
    if (lowerTitle.includes('adaptive') || lowerTitle.includes('art')) return <Zap size={20} className="text-yellow-600" />;
    if (lowerTitle.includes('outcome') || lowerTitle.includes('predict')) return <Target size={20} className="text-green-600" />;
    if (lowerTitle.includes('knowledge') || lowerTitle.includes('research')) return <Microscope size={20} className="text-teal-600" />;
    if (lowerTitle.includes('design') || lowerTitle.includes('chopchop')) return <Brain size={20} className="text-sky-600" />;
    if (lowerTitle.includes('variant effect') || lowerTitle.includes('evo 2')) return <Cpu size={20} className="text-lime-600" />;
    if (lowerTitle.includes('outcome analysis') || lowerTitle.includes('crispresso2')) return <Briefcase size={20} className="text-indigo-600" />;
    return <Brain size={20} className="text-blue-600" />;
  };

  const activeCapability = content.keyCapabilities[activeCapabilityTab];

  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="container mx-auto px-6">
        {/* Strategic Overview Header */}
        {/* <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ShieldCheck className="h-8 w-8 text-indigo-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Strategic Doctrine
            </h2>
          </div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our operational approach delivers multi-stage precision with cascading strategic advantages. 
            Each capability builds upon the last, creating overwhelming competitive superiority.
          </p> */}
        </div>

        {/* Strategic Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Core Capabilities Count */}
          <motion.div 
            custom={0}
            variants={featureVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="bg-slate-50 p-6 rounded-lg border border-slate-200 hover:shadow-lg transition-all duration-300 hover:border-blue-500 hover:shadow-blue-500/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="h-7 w-7 text-blue-600" />
              <h3 className="text-xl font-bold text-slate-800">Core Capability</h3>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{content.keyCapabilities.length}</div>
              <p className="text-slate-600 text-sm">Why it matters</p>
            </div>
          </motion.div>

          {/* Target Audience */}
          <motion.div 
            custom={1}
            variants={featureVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="bg-slate-50 p-6 rounded-lg border border-slate-200 hover:shadow-lg transition-all duration-300 hover:border-green-500 hover:shadow-green-500/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-7 w-7 text-green-600" />
              <h3 className="text-xl font-bold text-slate-800">Target Audience</h3>
            </div>
            <ul className="space-y-2">
              {content.valuePropositionSections.map((section, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{section.audience}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Strategic Impact */}
          <motion.div 
            custom={2}
            variants={featureVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="bg-slate-50 p-6 rounded-lg border border-slate-200 hover:shadow-lg transition-all duration-300 hover:border-purple-500 hover:shadow-purple-500/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-7 w-7 text-purple-600" />
              <h3 className="text-xl font-bold text-slate-800">Strategic Impact</h3>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">
              Multi-stage precision with cascading strategic advantages. Each capability builds upon the last.
            </p>
          </motion.div>
        </div>

        {/* Tabbed Capability Display */}
        <div className="mb-12">
        
          
          {/* Capability Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {content.keyCapabilities.map((cap, index) => (
              <button
                key={index}
                onClick={() => setActiveCapabilityTab(index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeCapabilityTab === index
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {getIcon(cap.title)}
                {cap.title.split(':')[0]}
              </button>
            ))}
          </div>

          {/* Active Capability Display */}
          <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200 shadow-lg">
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

            {/* Capability Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Technical Approach */}
              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Settings size={20} className="text-sky-600" />
                  <h5 className="font-semibold text-sky-600">Technical Approach</h5>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {activeCapability.technical}
                </p>
              </div>
              
              {/* Scientific Impact */}
              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Microscope size={20} className="text-teal-600" />
                  <h5 className="font-semibold text-teal-600">Scientific Impact</h5>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {activeCapability.scientific}
                </p>
              </div>
              
              {/* Business Value */}
              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase size={20} className="text-indigo-600" />
                  <h5 className="font-semibold text-indigo-600">Business Value</h5>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {activeCapability.business}
                </p>
              </div>
            </div>
            
            {/* Genomic Use Cases Integration */}
            {activeCapability.genomicUseCasesParagraph && (
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-4">
                  <Brain size={20} className="text-blue-600" />
                  <h5 className="font-semibold text-blue-600">Genomic Use Cases Integration</h5>
                </div>
                <div 
                  className="text-slate-700 text-sm leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: activeCapability.genomicUseCasesParagraph
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-800 font-semibold">$1</strong>')
                      .replace(/\n\n/g, '</p><p>')
                      .replace(/^(.*)$/, '<p>$1</p>')
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Value Proposition Matrix */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <Target className="h-8 w-8 text-green-600" />
            <h3 className="text-2xl font-bold text-slate-800">Value Proposition Matrix</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.valuePropositionSections.map((section, index) => (
              <motion.div 
                key={index} 
                custom={index}
                variants={featureVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="bg-slate-50 p-6 rounded-lg border border-slate-200 hover:shadow-lg transition-all duration-300 hover:border-green-500 hover:shadow-green-500/20"
              >
                <h4 className="text-lg font-bold text-slate-800 mb-4">{section.audience}</h4>
                <ul className="space-y-3">
                  {section.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div 
                        className="text-slate-700 text-sm leading-relaxed prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: point
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-800 font-semibold">$1</strong>')
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Strategic Conclusion */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="h-8 w-8 text-blue-600" />
            <h3 className="text-2xl font-bold text-slate-800">Strategic Conclusion</h3>
          </div>
          <div 
            className="text-slate-700 text-lg leading-relaxed prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{
              __html: content.conclusion
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-800 font-semibold">$1</strong>')
                .replace(/\n\n/g, '</p><p>')
                .replace(/^(.*)$/, '<p>$1</p>')
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default TabbedDoctrineInsights;
