'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle, Cpu, ShieldCheck, Target, Zap, Brain, Users, ArrowRight, Settings, Microscope, Briefcase } from 'lucide-react';
import { CoPilotDetailContent } from '@/data/coPilotDetails';
import { motion, AnimatePresence } from 'framer-motion';

interface DoctrineInsightsSectionProps {
  content: CoPilotDetailContent;
  className?: string;
}

const DoctrineInsightsSection: React.FC<DoctrineInsightsSectionProps> = ({ content, className = '' }) => {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);

  const toggleCard = (title: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedCards(newExpanded);
  };

  const toggleAll = () => {
    if (showAll) {
      setExpandedCards(new Set());
    } else {
      setExpandedCards(new Set(content.keyCapabilities.map(cap => cap.title)));
    }
    setShowAll(!showAll);
  };

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

  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="container mx-auto px-6">
        {/* Strategic Overview Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ShieldCheck className="h-8 w-8 text-indigo-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Strategic Doctrine
            </h2>
          </div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our operational approach delivers multi-stage precision with cascading strategic advantages. 
            Each capability builds upon the last, creating overwhelming competitive superiority.
          </p>
        </div>

        {/* Strategic Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Core Capabilities */}
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="h-7 w-7 text-blue-600" />
              <h3 className="text-xl font-bold text-slate-800">Core Capabilities</h3>
            </div>
            <ul className="space-y-2">
              {content.keyCapabilities.slice(0, 3).map((capability, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{capability.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Target Audience */}
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 hover:shadow-lg transition-shadow">
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
          </div>

          {/* Strategic Impact */}
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-7 w-7 text-purple-600" />
              <h3 className="text-xl font-bold text-slate-800">Strategic Impact</h3>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed mb-4">
              Multi-stage precision with cascading strategic advantages. Each capability builds upon the last.
            </p>
            <div className="text-center">
              <button
                onClick={toggleAll}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium text-sm flex items-center gap-2 mx-auto"
              >
                {showAll ? 'Collapse All' : 'Expand All'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tactical Breakdown - Doctrine Style */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <Brain className="h-8 w-8 text-indigo-600" />
            <h3 className="text-2xl font-bold text-slate-800">Tactical Breakdown</h3>
          </div>
          
          <div className="space-y-4">
            {content.keyCapabilities.map((capability, index) => (
              <div 
                key={index} 
                className="bg-white border border-slate-200 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:border-blue-500 hover:shadow-lg"
                onClick={() => toggleCard(capability.title)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">
                      {index + 1}
                    </span>
                    <div className="flex items-center gap-3">
                      {getIcon(capability.title)}
                      <h4 className="text-lg font-bold text-slate-800">{capability.title}</h4>
                    </div>
                  </div>
                  {expandedCards.has(capability.title) ? 
                    <ChevronDown className="w-5 h-5 text-slate-400" /> : 
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  }
                </div>
                
                <AnimatePresence initial={false}>
                  {expandedCards.has(capability.title) && (
                    <motion.div
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: 'auto', marginTop: '1rem' },
                        collapsed: { opacity: 0, height: 0, marginTop: '0rem' }
                      }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-12 border-l-2 border-slate-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-6">
                          {/* Technical Approach */}
                          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <div className="flex items-center gap-2 mb-3">
                              <Settings size={16} className="text-sky-600" />
                              <h5 className="font-semibold text-sky-600 text-sm">Technical Approach</h5>
                            </div>
                            <p className="text-slate-700 text-sm leading-relaxed">
                              {typeof capability.technical === 'string' 
                                ? (capability.technical.length > 120 
                                    ? `${capability.technical.substring(0, 120)}...` 
                                    : capability.technical)
                                : capability.technical.keyMetric
                              }
                            </p>
                          </div>
                          
                          {/* Scientific Impact */}
                          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <div className="flex items-center gap-2 mb-3">
                              <Microscope size={16} className="text-teal-600" />
                              <h5 className="font-semibold text-teal-600 text-sm">Scientific Impact</h5>
                            </div>
                            <p className="text-slate-700 text-sm leading-relaxed">
                              {typeof capability.scientific === 'string' 
                                ? (capability.scientific.length > 120 
                                    ? `${capability.scientific.substring(0, 120)}...` 
                                    : capability.scientific)
                                : capability.scientific.keyMetric
                              }
                            </p>
                          </div>
                          
                          {/* Business Value */}
                          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <div className="flex items-center gap-2 mb-3">
                              <Briefcase size={16} className="text-indigo-600" />
                              <h5 className="font-semibold text-indigo-600 text-sm">Business Value</h5>
                            </div>
                            <p className="text-slate-700 text-sm leading-relaxed">
                              {typeof capability.business === 'string' 
                                ? (capability.business.length > 120 
                                    ? `${capability.business.substring(0, 120)}...` 
                                    : capability.business)
                                : capability.business.description
                              }
                            </p>
                          </div>
                        </div>
                        
                        {/* Genomic Use Cases Integration */}
                        {capability.genomicUseCasesParagraph && (
                          <div className="mt-4 ml-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <div className="flex items-center gap-2 mb-2">
                              <Brain size={16} className="text-blue-600" />
                              <h5 className="font-semibold text-blue-600 text-sm">Genomic Use Cases Integration</h5>
                            </div>
                            <p className="text-slate-700 text-sm leading-relaxed">
                              {capability.genomicUseCasesParagraph.length > 200 
                                ? `${capability.genomicUseCasesParagraph.substring(0, 200)}...` 
                                : capability.genomicUseCasesParagraph
                              }
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
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
              <div key={index} className="bg-slate-50 p-6 rounded-lg border border-slate-200 hover:shadow-lg transition-shadow">
                <h4 className="text-lg font-bold text-slate-800 mb-4">{section.audience}</h4>
                <ul className="space-y-3">
                  {section.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-700 text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Conclusion */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="h-8 w-8 text-blue-600" />
            <h3 className="text-2xl font-bold text-slate-800">Strategic Conclusion</h3>
          </div>
          <p className="text-slate-700 text-lg leading-relaxed">
            {content.conclusion}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DoctrineInsightsSection;
