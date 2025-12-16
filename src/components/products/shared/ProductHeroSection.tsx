'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface ProductHeroContent {
  badge?: {
    text: string;
    emoji?: string;
    bgColor?: string;
    textColor?: string;
  };
  mainHeadline: string;
  headlineGradient?: string;
  subtitle?: string;
  description: string;
  ctas?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
    icon?: React.ReactNode;
  }>;
}

interface ProductHeroSectionProps {
  content: ProductHeroContent;
  className?: string;
}

export default function ProductHeroSection({ content, className = '' }: ProductHeroSectionProps) {
  const gradientClass = content.headlineGradient || 'from-blue-600 via-purple-600 to-indigo-600';
  
  return (
    <section className={`text-center mb-16 md:mb-24 pt-10 ${className}`}>
      {content.badge && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`inline-flex items-center gap-3 ${content.badge.bgColor || 'bg-blue-100'} ${content.badge.textColor || 'text-blue-800'} px-4 py-2 rounded-full text-sm font-semibold mb-6`}
        >
          {content.badge.emoji && <span>{content.badge.emoji}</span>}
          {content.badge.text}
        </motion.div>
      )}
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r ${gradientClass}`}
      >
        {content.mainHeadline}
      </motion.h1>
      
      {content.subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 max-w-4xl mx-auto"
        >
          {content.subtitle}
        </motion.p>
      )}
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8"
      >
        {content.description}
      </motion.p>

      {content.ctas && content.ctas.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {content.ctas.map((cta, idx) => {
            const buttonClasses = `inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg transition-colors ${
              cta.variant === 'primary'
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                : 'text-blue-600 hover:text-blue-700'
            }`;
            
            if (cta.href) {
              return (
                <a
                  key={idx}
                  href={cta.href}
                  className={buttonClasses}
                >
                  {cta.icon}
                  {cta.label}
                </a>
              );
            }
            return (
              <button
                key={idx}
                onClick={cta.onClick}
                className={buttonClasses}
              >
                {cta.icon}
                {cta.label}
              </button>
            );
          })}
        </motion.div>
      )}
    </section>
  );
}

