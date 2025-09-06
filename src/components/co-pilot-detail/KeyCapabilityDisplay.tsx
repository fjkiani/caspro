/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useState } from 'react';
import { KeyCapability } from '@/data/coPilotDetails'; // Assuming this path is correct
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, ChevronUp, Brain, TestTube, Briefcase, Zap, Lightbulb, Microscope, Dna, Settings,
  ChevronRight // Added for list item styling
} from 'lucide-react'; // Added more icons for variety
import { renderMarkdown } from '@/utils/markdownRenderer';

interface KeyCapabilityCardProps {
  capability: KeyCapability;
  globalGenomicInsightsOverview?: string; // New prop for fallback
}

const KeyCapabilityDisplay: React.FC<KeyCapabilityCardProps> = ({ capability, globalGenomicInsightsOverview }) => {
  const [isExpanded, setIsExpanded] = useState(true); 
  const [isGenomicsExpanded, setIsGenomicsExpanded] = useState(true); // Keep it expanded by default

  const genomicTextToDisplay = capability.genomicUseCasesParagraph || globalGenomicInsightsOverview;

  const getIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('plan') || lowerTitle.includes('quality')) return <Settings size={20} className="mr-2 text-blue-400 flex-shrink-0" />;
    if (lowerTitle.includes('radio-genomics') || lowerTitle.includes('biomarker')) return <Dna size={20} className="mr-2 text-pink-400 flex-shrink-0" />;
    if (lowerTitle.includes('adaptive') || lowerTitle.includes('art')) return <Zap size={20} className="mr-2 text-yellow-400 flex-shrink-0" />;
    if (lowerTitle.includes('outcome') || lowerTitle.includes('predict')) return <Lightbulb size={20} className="mr-2 text-green-400 flex-shrink-0" />;
    if (lowerTitle.includes('knowledge') || lowerTitle.includes('research')) return <Microscope size={20} className="mr-2 text-teal-400 flex-shrink-0" />;
    if (lowerTitle.includes('design') || lowerTitle.includes('chopchop')) return <Brain size={20} className="mr-2 text-sky-400 flex-shrink-0" />;
    if (lowerTitle.includes('variant effect') || lowerTitle.includes('evo 2')) return <TestTube size={20} className="mr-2 text-lime-400 flex-shrink-0" />;
    if (lowerTitle.includes('outcome analysis') || lowerTitle.includes('crispresso2')) return <Briefcase size={20} className="mr-2 text-indigo-400 flex-shrink-0" />;
    return <Brain size={20} className="mr-2 text-blue-400 flex-shrink-0" />;
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-6 md:p-8 border border-slate-200 hover:shadow-primary/20 transition-shadow duration-300">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left text-2xl font-bold text-primary mb-6 group"
      >
        <div className="flex items-center">
          {getIcon(capability.title)}
          <span>{capability.title}</span>
        </div>
        {isExpanded ? <ChevronUp size={24} className="text-primary min-w-[24px]" /> : <ChevronDown size={24} className="text-slate-500 group-hover:text-primary/80 min-w-[24px]" />}
      </button>
      
      <AnimatePresence initial={false}>
        {isExpanded && (
           <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto', marginTop: '0px' },
              collapsed: { opacity: 0, height: 0, marginTop: '0px' }
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mb-6 text-center">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex items-center justify-center text-sky-600 mb-2">
                  <Settings size={18} className="mr-2 flex-shrink-0" />
                  <h4 className="font-semibold">Technical Approach</h4>
                </div>
                <div className="text-slate-700 leading-relaxed prose prose-base max-w-none" dangerouslySetInnerHTML={renderMarkdown(capability.technical)} />
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex items-center justify-center text-teal-600 mb-2">
                  <Microscope size={18} className="mr-2 flex-shrink-0" />
                  <h4 className="font-semibold">Scientific Impact</h4>
                </div>
                <div className="text-slate-700 leading-relaxed prose prose-base max-w-none" dangerouslySetInnerHTML={renderMarkdown(capability.scientific)} />
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex items-center justify-center text-indigo-600 mb-2">
                  <Briefcase size={18} className="mr-2 flex-shrink-0" />
                  <h4 className="font-semibold">Business Value</h4>
                </div>
                <div className="text-slate-700 leading-relaxed prose prose-base max-w-none" dangerouslySetInnerHTML={renderMarkdown(capability.business)} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Genomic Use Cases Integration - Moved outside the main expand/collapse animation */}
      {genomicTextToDisplay && (
        <div className="mt-8 pt-6 border-t border-slate-200 bg-slate-50 p-5 rounded-lg shadow">
          <button 
            onClick={() => setIsGenomicsExpanded(!isGenomicsExpanded)}
            className="flex items-center justify-between w-full text-left text-xl font-semibold text-blue-600 hover:text-blue-700 transition-colors mb-4 group"
          >
            <span>Genomic Use Cases Integration</span>
            {isGenomicsExpanded ? <ChevronUp size={22} className="text-blue-600 group-hover:text-blue-700" /> : <ChevronDown size={22} className="text-blue-500 group-hover:text-blue-600" />}
          </button>
          <AnimatePresence initial={false}>
            {isGenomicsExpanded && (
              <motion.div
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: 'auto', marginTop: '0rem' },
                  collapsed: { opacity: 0, height: 0, marginTop: '0rem' }
                }}
                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="overflow-hidden"
              >
                <div 
                  className="text-slate-300 text-sm leading-relaxed prose prose-sm prose-invert max-w-none"
                  dangerouslySetInnerHTML={renderMarkdown(genomicTextToDisplay)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default KeyCapabilityDisplay; 