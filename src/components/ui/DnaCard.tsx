'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import DnaStrand from './DnaStrand';

interface DnaCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  icon?: ReactNode;
  variant?: 'default' | 'adenine' | 'thymine' | 'guanine' | 'cytosine' | 'protein';
  hover?: boolean;
  showDnaStrand?: boolean;
  strandPosition?: 'left' | 'right' | 'top' | 'bottom';
}

export default function DnaCard({
  children,
  className = '',
  title,
  icon,
  variant = 'default',
  hover = true,
  showDnaStrand = false,
  strandPosition = 'left'
}: DnaCardProps) {
  // Define color variants
  const variantStyles = {
    default: 'bg-white border-gray-200',
    adenine: 'bg-white border-adenine',
    thymine: 'bg-white border-thymine',
    guanine: 'bg-white border-guanine',
    cytosine: 'bg-white border-cytosine',
    protein: 'bg-protein border-amber-300'
  };

  // Define accent color for title
  const accentColor = {
    default: 'bg-gradient-to-r from-primary to-accent',
    adenine: 'bg-adenine',
    thymine: 'bg-thymine',
    guanine: 'bg-guanine',
    cytosine: 'bg-cytosine',
    protein: 'bg-amber-400'
  };

  const isLightVariant = ['default', 'adenine', 'thymine', 'guanine', 'cytosine'].includes(variant);
  const textColor = isLightVariant ? 'text-slate-700' : 'text-foreground';
  const iconColor = isLightVariant ? 'text-gray-700' : 'text-foreground';
  
  // Set strand direction based on position
  const isVertical = strandPosition === 'left' || strandPosition === 'right';
  
  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg border shadow-sm ${variantStyles[variant]} ${hover ? 'transition-all duration-300 hover:shadow-md' : ''} ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top accent strip */}
      <div className={`h-1 w-full ${accentColor[variant]}`}></div>
      
      {/* DNA Strand decoration if enabled */}
      {showDnaStrand && (
        <div 
          className={`absolute ${
            strandPosition === 'left' ? 'left-0 top-0 bottom-0 w-8' : 
            strandPosition === 'right' ? 'right-0 top-0 bottom-0 w-8' : 
            strandPosition === 'top' ? 'top-0 left-0 right-0 h-8' : 
            'bottom-0 left-0 right-0 h-8'
          } opacity-30 pointer-events-none overflow-hidden`}
        >
          <DnaStrand 
            className="w-full h-full" 
            vertical={isVertical}
            strandCount={3}
          />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {(title || icon) && (
          <div className="flex items-center gap-3 mb-4">
            {icon && <div className={`text-2xl ${iconColor}`}>{icon}</div>}
            {title && <h3 className={`text-xl font-semibold ${textColor}`}>{title}</h3>}
          </div>
        )}
        
        <div className={textColor}>{children}</div>
      </div>
    </motion.div>
  );
} 