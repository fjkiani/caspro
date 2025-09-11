'use client';

import React, { useState, useEffect, ElementType } from 'react';
import { CheckCircle, ListChecks, MessageSquare, ShieldCheck, Lightbulb, Users } from 'lucide-react';
import { GenomicUseCaseGridItem } from '@/data/coPilotDetails';
import { renderMarkdown } from '@/utils/markdownRenderer';
import { motion } from 'framer-motion';

// Helper to get icon component by name
const iconComponents: { [key: string]: ElementType } = {
  ListChecks,
  MessageSquare,
  ShieldCheck,
  Lightbulb,
  Users,
  CheckCircle,
};

const getIconComponent = (iconName: string): ElementType | null => {
  return iconComponents[iconName] || CheckCircle;
};

interface GenomicUseCasesSectionProps {
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

export default function GenomicUseCasesSection({ 
  genomicUseCasesGrid, 
  buildsOnStackPoints, 
  buildsOnStackIntro 
}: GenomicUseCasesSectionProps) {
  const [activeUseCaseIndex, setActiveUseCaseIndex] = useState(0);

  // Reset activeUseCaseIndex if content changes to one without enough points
  useEffect(() => {
    if (!genomicUseCasesGrid || activeUseCaseIndex >= genomicUseCasesGrid.length) {
      setActiveUseCaseIndex(0);
    }
  }, [genomicUseCasesGrid, activeUseCaseIndex]);

  const currentUseCaseDescription = buildsOnStackPoints?.[activeUseCaseIndex] || null;

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
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-slate-800 mb-4">Core Capabilities</h3>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          {buildsOnStackIntro || "Advanced AI-powered capabilities designed to transform your workflow"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"> 
        {genomicUseCasesGrid.map((item, index) => {
          const IconComp = getIconComponent(item.iconName);
          const isActive = index === activeUseCaseIndex;
          const colorVariants = {
            'text-blue-400': 'from-blue-50 to-blue-100 border-blue-200 text-blue-700',
            'text-green-400': 'from-green-50 to-green-100 border-green-200 text-green-700',
            'text-purple-400': 'from-purple-50 to-purple-100 border-purple-200 text-purple-700',
            'text-yellow-400': 'from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-700',
            'text-orange-400': 'from-orange-50 to-orange-100 border-orange-200 text-orange-700',
          };
          const colorClass = colorVariants[item.color as keyof typeof colorVariants] || 'from-slate-50 to-slate-100 border-slate-200 text-slate-700';
          
          return IconComp ? (
            <motion.div 
              key={index} 
              className={`relative overflow-hidden group transition-all duration-500 p-6 rounded-2xl cursor-pointer border-2 ${
                isActive 
                  ? 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary/40 shadow-xl shadow-primary/20 scale-105' 
                  : `bg-gradient-to-br ${colorClass} hover:shadow-lg hover:scale-102 border-opacity-60`
              }`}
              onClick={() => setActiveUseCaseIndex(index)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated background pattern */}
              <div className={`absolute inset-0 opacity-5 ${
                isActive ? 'bg-primary' : 'bg-slate-400'
              }`} style={{
                backgroundImage: `radial-gradient(circle at 20% 80%, currentColor 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
              
              {/* Icon with animated ring */}
              <div className="relative flex flex-col items-center">
                <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${
                  isActive 
                    ? 'bg-primary/20 text-primary shadow-lg shadow-primary/30' 
                    : 'bg-white/80 text-slate-600 group-hover:bg-white group-hover:text-slate-700 group-hover:shadow-md'
                }`}>
                  <IconComp size={24} />
                  {isActive && (
                    <motion.div 
                      className="absolute inset-0 rounded-2xl border-2 border-primary/30"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </div>
                
                {/* Title with better typography */}
                <h4 className={`font-bold text-sm leading-tight text-center px-2 ${
                  isActive ? 'text-primary' : 'text-slate-800'
                }`}>
                  {item.label}
                </h4>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div 
                    className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <CheckCircle size={12} className="text-white" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : null;
        })}
      </div>

      <motion.div 
        className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-white rounded-2xl p-10 border border-slate-200/60 shadow-lg"
        key={activeUseCaseIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-slate-100 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
        
        {currentUseCaseDescription ? (
          <div className="relative">
            {/* Header with icon and title */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CheckCircle size={20} className="text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="text-xl font-bold text-slate-800">
                    {genomicUseCasesGrid[activeUseCaseIndex]?.label}
                  </h4>
                  <p className="text-sm text-slate-500">Capability Deep Dive</p>
                </div>
              </div>
            </div>
            
            {/* Enhanced content with better typography */}
            <div className="max-w-4xl mx-auto">
              <div 
                className="text-slate-700 text-lg leading-relaxed prose prose-lg prose-slate max-w-none
                  prose-headings:text-slate-800 prose-headings:font-bold
                  prose-strong:text-slate-800 prose-strong:font-semibold
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-ul:list-disc prose-ol:list-decimal
                  prose-li:text-slate-700 prose-li:leading-relaxed" 
                dangerouslySetInnerHTML={renderMarkdown(currentUseCaseDescription)}>
              </div>
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
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={24} className="text-slate-400" />
            </div>
            <p className="text-slate-500 text-lg">Select a capability above to explore its impact</p>
            <p className="text-slate-400 text-sm mt-2">Each capability transforms your research workflow</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
