'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FileText, Clock, Search, Zap, Infinity, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export interface ProblemSolutionCard {
  emoji?: string;
  icon?: 'document' | 'clock' | 'search' | 'zap' | 'infinity' | 'check' | 'alert';
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
  alert: AlertTriangle,
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
          {content.description && (
            <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed mb-2">
              {content.description.split('.')[0].substring(0, 80) + (content.description.split('.')[0].length > 80 ? '...' : '')}
            </p>
          )}
        </motion.div>

        {/* Cards Grid - 3 columns on both mobile and desktop */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {content.cards.map((card, idx) => {
            const IconComponent = card.icon ? iconMap[card.icon] : null;

            return (
              <motion.div
                key={`${content.type}-card-${idx}-${card.title}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: idx * 0.1,
                    ease: "easeOut"
                  }
                } : { opacity: 0, y: 20 }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className={`relative overflow-hidden bg-gradient-to-br ${theme.cardBg} rounded-xl p-3 md:p-4 border ${theme.borderColor} shadow-md hover:shadow-lg transition-all duration-300 group flex flex-col`}
              >
                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-12 h-12 ${theme.accent} opacity-5 rounded-bl-xl`}></div>

                {/* Top section: Icon + Highlight badge */}
                <div className="flex items-start justify-between gap-2 mb-2 md:mb-3">
                  {/* Icon/Emoji */}
                  <div className="flex-shrink-0">
                    {IconComponent ? (
                      <div
                        className={`w-7 h-7 md:w-9 md:h-9 rounded-lg ${theme.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className={`w-4 h-4 md:w-5 md:h-5 ${theme.iconColor}`} />
                      </div>
                    ) : card.emoji ? (
                      <div className="text-xl md:text-2xl">{card.emoji}</div>
                    ) : null}
                  </div>
                  
                  {/* Highlight badge - Top right */}
                  {card.highlight && (
                    <span className={`inline-block px-2 py-0.5 md:px-2.5 md:py-1 ${theme.iconBg} ${theme.iconColor} rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-tight flex-shrink-0`}>
                      {card.highlight}
                    </span>
                  )}
                </div>

                {/* Content - Compact and organized */}
                <div className="relative z-10 flex-1 flex flex-col">
                  {/* Title - Prominent */}
                  <h3 className={`text-xs md:text-sm font-bold ${theme.titleColor} mb-1.5 md:mb-2 group-hover:text-slate-900 transition-colors leading-tight`}>
                    {card.title}
                  </h3>
                  
                  {/* Description - Condensed with bullet points for key info */}
                  <div className="text-[10px] md:text-xs text-slate-600 leading-snug flex-1">
                    {card.description.includes('→') ? (
                      // For descriptions with arrows, show as bullet points
                      <ul className="space-y-0.5 md:space-y-1">
                        {card.description
                          .split('→')
                          .filter(phrase => phrase.trim().length > 0)
                          .slice(0, 3) // Show max 3 steps
                          .map((phrase, phraseIdx) => (
                            <li key={phraseIdx} className="flex items-start gap-1.5">
                              <span className={`w-1 h-1 rounded-full ${theme.accent} mt-1.5 flex-shrink-0`}></span>
                              <span className="flex-1">{phrase.trim()}</span>
                            </li>
                          ))}
                      </ul>
                    ) : card.description.includes(': ') ? (
                      // For descriptions with colons, show as key-value pairs
                      <ul className="space-y-0.5 md:space-y-1">
                        {card.description
                          .split(': ')
                          .filter(phrase => phrase.trim().length > 0)
                          .slice(0, 2)
                          .map((phrase, phraseIdx) => (
                            <li key={phraseIdx} className="flex items-start gap-1.5">
                              <span className={`w-1 h-1 rounded-full ${theme.accent} mt-1.5 flex-shrink-0`}></span>
                              <span className="flex-1">{phrase.trim()}</span>
                            </li>
                          ))}
                      </ul>
                    ) : (
                      // Regular description - truncated to 2 lines
                      <p className="line-clamp-2 leading-snug">{card.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
