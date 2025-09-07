'use client';

import React, { useState, useEffect, ElementType } from 'react';
import { CheckCircle } from 'lucide-react';
import { GenomicUseCaseGridItem } from '@/data/coPilotDetails';
import { renderMarkdown } from '@/utils/markdownRenderer';
import { motion } from 'framer-motion';

// Helper to get icon component by name
const iconComponents: { [key: string]: ElementType } = {
  Activity: require('lucide-react').Activity,
  Shield: require('lucide-react').Shield,
  Layers: require('lucide-react').Layers,
  Lightbulb: require('lucide-react').Lightbulb,
  Beaker: require('lucide-react').Beaker,
  Users: require('lucide-react').Users,
  ListChecks: require('lucide-react').ListChecks,
  MessageSquare: require('lucide-react').MessageSquare,
  ShieldCheck: require('lucide-react').ShieldCheck,
};

const getIconComponent = (iconName: string): ElementType | null => {
  return iconComponents[iconName] || null;
};

interface TechnologyFoundationSectionProps {
  genomicUseCasesGrid: GenomicUseCaseGridItem[];
  buildsOnStackPoints: string[];
  buildsOnStackIntro?: string;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function TechnologyFoundationSection({ 
  genomicUseCasesGrid, 
  buildsOnStackPoints, 
  buildsOnStackIntro 
}: TechnologyFoundationSectionProps) {
  const [activeTechFoundationPointIndex, setActiveTechFoundationPointIndex] = useState(0);

  // Reset activeTechFoundationPointIndex if content changes to one without enough points
  useEffect(() => {
    if (!genomicUseCasesGrid || activeTechFoundationPointIndex >= genomicUseCasesGrid.length) {
      setActiveTechFoundationPointIndex(0);
    }
  }, [genomicUseCasesGrid, activeTechFoundationPointIndex]);

  const currentTechFoundationDescriptionPoint = buildsOnStackPoints?.[activeTechFoundationPointIndex] || null;

  if (!genomicUseCasesGrid || genomicUseCasesGrid.length === 0 || !buildsOnStackPoints || buildsOnStackPoints.length === 0) {
    return null;
  }

  return (
    <motion.div 
      variants={sectionVariants} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, amount: 0.2 }}
      className="mb-16"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-8 mb-10"> 
        {genomicUseCasesGrid.map((item, index) => {
          const IconComp = getIconComponent(item.iconName);
          const isActive = index === activeTechFoundationPointIndex;
          return IconComp ? (
            <div 
              key={index} 
              className={`text-center group transition-all duration-300 p-4 rounded-xl cursor-pointer ${isActive ? 'bg-slate-700 shadow-lg scale-105' : 'bg-slate-800/70 hover:bg-slate-700/80'}`}
              onClick={() => setActiveTechFoundationPointIndex(index)}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-colors border ${isActive ? 'border-primary/70' : 'border-slate-700 group-hover:border-slate-600'} ${isActive ? 'bg-primary/10' : 'group-hover:bg-slate-700'}`}>
                <IconComp size={28} className={`${item.color} ${isActive ? 'text-primary' : item.color}`} />
              </div>
              <div className={`font-medium text-sm px-1 ${isActive ? 'text-primary' : 'text-slate-300'}`}>{item.label}</div>
            </div>
          ) : null;
        })}
      </div>

      <div className="bg-gradient-to-t from-slate-800/80 to-slate-800/50 rounded-xl p-8 md:p-12 border border-slate-700 text-center">
        {currentTechFoundationDescriptionPoint ? (
          <div className="flex flex-col items-center">
            <CheckCircle size={24} className="text-blue-400 mb-4" />
            <div 
              className="text-slate-200 text-xl text-center leading-relaxed prose prose-xl prose-invert max-w-3xl mx-auto prose-strong:text-white prose-strong:font-semibold" 
              dangerouslySetInnerHTML={renderMarkdown(currentTechFoundationDescriptionPoint)}>
            </div>
          </div>
        ) : (
          <p className="text-slate-400 text-center text-lg py-8">Select a technology above to see details.</p>
        )}
      </div>
    </motion.div>
  );
}
