/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useState } from 'react';
import { KeyCapability, CapabilityAspect } from '../../types/copilot-types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, ChevronUp, Brain, TestTube, Briefcase, Zap, Lightbulb, Microscope, Dna, Settings,
  ChevronRight, Target, Database, FileText, MessageSquare, RefreshCw, TrendingUp, ShieldCheck, AlertTriangle
} from 'lucide-react'; 
import { renderMarkdown } from '@/utils/markdownRenderer';

interface KeyCapabilityCardProps {
  capability: KeyCapability;
  globalGenomicInsightsOverview?: string;
}

const AspectIcon = ({ iconName, className }: { iconName: string, className?: string }) => {
  const icons: { [key: string]: React.ElementType } = {
    Settings,
    Microscope,
    Briefcase,
    Database,
    Target,
    FileText,
    Brain,
    ShieldCheck,
    Users: TrendingUp, // Assuming Users maps to an icon
    Zap,
    MessageSquare,
    RefreshCw,
    TrendingUp,
    AlertTriangle,
    Dna,
    TestTube,
    Lightbulb
  };
  const Icon = icons[iconName] || Settings;
  return <Icon className={className} />;
};

const CapabilityAspectDisplay = ({ aspect, colorClass, icon: AspectIconComponent }: { aspect: CapabilityAspect, colorClass: string, icon: React.ElementType }) => {
  return (
    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex flex-col h-full">
      <div className={`flex items-center justify-center ${colorClass} mb-4`}>
        <AspectIconComponent size={18} className="mr-2 flex-shrink-0" />
        <h4 className="font-semibold text-center">{aspect.title}</h4>
      </div>
      <div className="text-center mb-4">
        <span className="inline-block bg-slate-200 rounded-full px-3 py-1 text-sm font-semibold text-slate-700">
          {aspect.keyMetric}
        </span>
      </div>
      <div className="space-y-4">
        {aspect.components && aspect.components.map((component, idx) => (
          <div key={idx} className="bg-white p-3 rounded-md border border-slate-200 text-left">
            <div className="flex items-start">
              <AspectIcon iconName={component.iconName} className={`w-5 h-5 mr-3 mt-1 text-${component.color}-500 flex-shrink-0`} />
              <div>
                <h5 className="font-semibold text-slate-800">{component.title}</h5>
                <p className="text-xs text-slate-500 mb-2">{component.subtitle}</p>
                <ul className="space-y-1">
                  {component.features && component.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start text-xs text-slate-600">
                      <ChevronRight size={12} className="mr-1.5 mt-0.5 text-slate-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mb-6">
              {capability.technical && typeof capability.technical === 'object' && <CapabilityAspectDisplay aspect={capability.technical} colorClass="text-sky-600" icon={Settings} />}
              {capability.scientific && typeof capability.scientific === 'object' && <CapabilityAspectDisplay aspect={capability.scientific} colorClass="text-teal-600" icon={Microscope} />}
              {capability.business && typeof capability.business === 'object' && <CapabilityAspectDisplay aspect={capability.business} colorClass="text-indigo-600" icon={Briefcase} />}
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