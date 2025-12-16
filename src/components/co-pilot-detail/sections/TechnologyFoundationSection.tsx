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
              className={`text-center group transition-all duration-300 p-4 rounded-xl cursor-pointer ${isActive ? 'bg-blue-50 shadow-lg scale-105 border-2 border-blue-300' : 'bg-white hover:bg-slate-50 border border-slate-200'}`}
              onClick={() => setActiveTechFoundationPointIndex(index)}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-colors border ${isActive ? 'border-blue-500' : 'border-slate-300 group-hover:border-slate-400'} ${isActive ? 'bg-blue-100' : 'bg-slate-50 group-hover:bg-slate-100'}`}>
                <IconComp size={28} className={`${item.color} ${isActive ? 'text-blue-600' : item.color}`} />
              </div>
              <div className={`font-medium text-sm px-1 ${isActive ? 'text-blue-700 font-semibold' : 'text-slate-700'}`}>{item.label}</div>
            </div>
          ) : null;
        })}
      </div>

      <div className="bg-white rounded-xl p-6 md:p-8 border border-slate-200 shadow-lg text-center">
        {currentTechFoundationDescriptionPoint ? (
          <div className="flex flex-col items-center">
            <CheckCircle size={24} className="text-blue-600 mb-4" />
            <div 
              className="text-slate-700 text-base md:text-lg text-center leading-relaxed prose prose-lg prose-slate max-w-3xl mx-auto prose-strong:text-slate-800 prose-strong:font-semibold" 
              dangerouslySetInnerHTML={renderMarkdown(currentTechFoundationDescriptionPoint)}>
            </div>
          </div>
        ) : (
          <p className="text-slate-600 text-center text-base md:text-lg py-8">Select a technology above to see details.</p>
        )}
      </div>
    </motion.div>
  );
}
