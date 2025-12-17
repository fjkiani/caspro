'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FileText, Clock, Search, Zap, Infinity, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export interface ProblemSolutionCard {
  emoji?: string;
  icon?: 'document' | 'clock' | 'search' | 'zap' | 'infinity' | 'check';
  title: string;
  description: string;
  highlight?: string;
}

export interface ProblemSolutionContent {
  type: 'problem' | 'solution';
  title: string;
  description: string;
  cards: ProblemSolutionCard[];
  bgGradient?: string;
  borderColor?: string;
}

interface ProblemSolutionSectionProps {
  content: ProblemSolutionContent;
  className?: string;
}

const iconMap = {
  document: FileText,
  clock: Clock,
  search: Search,
  zap: Zap,
  infinity: Infinity,
  check: CheckCircle2,
};

const colorThemes = {
  problem: {
    bg: 'from-red-50 via-orange-50 to-pink-50',
    border: 'border-red-200',
    cardBg: 'from-white to-slate-50',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    titleColor: 'text-red-700',
    accent: 'bg-red-500',
    borderColor: 'border-red-300',
  },
  solution: {
    bg: 'from-green-50 via-teal-50 to-emerald-50',
    border: 'border-green-200',
    cardBg: 'from-white to-slate-50',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    titleColor: 'text-green-700',
    accent: 'bg-green-500',
    borderColor: 'border-green-300',
  },
};

export default function ProblemSolutionSection({ 
  content, 
  className = '' 
}: ProblemSolutionSectionProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const defaultBg = content.type === 'problem' 
    ? 'from-red-50 via-orange-50 to-pink-50' 
    : 'from-green-50 via-teal-50 to-emerald-50';
  const defaultBorder = content.type === 'problem' 
    ? 'border-red-200' 
    : 'border-green-200';
  
  const bgGradient = content.bgGradient || defaultBg;
  const borderColor = content.borderColor || defaultBorder;
  const theme = colorThemes[content.type];

  return (
    <section 
      ref={sectionRef}
      className={`mb-16 bg-gradient-to-br ${bgGradient} rounded-3xl p-8 md:p-12 border-2 ${borderColor} ${className} relative overflow-hidden`}
    >
      {/* Background decoration */}
      <div className={`absolute top-0 right-0 w-64 h-64 ${theme.accent} opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2`}></div>
      <div className={`absolute bottom-0 left-0 w-48 h-48 ${theme.accent} opacity-5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2`}></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {content.title}
          </h2>
          <p className="text-lg md:text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            {content.description}
          </p>
        </motion.div>

        {/* Cards Grid - Force 2 columns for side-by-side display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {content.cards.map((card, idx) => {
            const IconComponent = card.icon ? iconMap[card.icon] : null;
            
            return (
              <motion.div
                key={`${content.type}-card-${idx}-${card.title}`}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    delay: 0.2 + (idx * 0.15),
                    ease: "easeOut"
                  }
                } : { opacity: 0, y: 40, scale: 0.95 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`relative overflow-hidden bg-gradient-to-br ${theme.cardBg} rounded-2xl p-6 border-2 ${theme.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 group`}
              >
                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-20 h-20 ${theme.accent} opacity-5 rounded-bl-3xl`}></div>
                
                {/* Icon/Emoji */}
                <div className="mb-4">
                  {IconComponent ? (
                    <motion.div 
                      className={`w-14 h-14 rounded-xl ${theme.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={isInView ? { 
                        scale: 1, 
                        rotate: 0,
                        transition: {
                          duration: 0.6,
                          delay: 0.4 + (idx * 0.15),
                          ease: "backOut"
                        }
                      } : { scale: 0, rotate: -180 }}
                    >
                      <IconComponent className={`w-7 h-7 ${theme.iconColor}`} />
                    </motion.div>
                  ) : card.emoji ? (
                    <div className="text-5xl mb-4">{card.emoji}</div>
                  ) : null}
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  {card.highlight && (
                    <span className={`inline-block px-3 py-1 ${theme.iconBg} ${theme.iconColor} rounded-full text-xs font-semibold mb-3`}>
                      {card.highlight}
                    </span>
                  )}
                  <h3 className={`text-xl font-bold ${theme.titleColor} mb-3 group-hover:text-slate-900 transition-colors`}>
                    {card.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
