'use client';

import React from 'react';

interface DnaBasePairStripProps {
  className?: string;
  // Future props for configurability (e.g., colors, pairCount) can be added here
}

const DnaBasePairStrip: React.FC<DnaBasePairStripProps> = ({ className }) => {
  // Colors match the HeroSection's DNA base pair strip
  const colors = {
    adenine: 'bg-red-400',
    thymine: 'bg-blue-400',
    guanine: 'bg-yellow-400',
    cytosine: 'bg-green-400',
    adenineShadow: 'shadow-red-400/50',
    thymineShadow: 'shadow-blue-400/50',
    guanineShadow: 'shadow-yellow-400/50',
    cytosineShadow: 'shadow-green-400/50',
  };

  const stripGradient = 'bg-gradient-to-r from-red-400 via-blue-400 to-green-400 to-yellow-400 to-red-400';

  const basePairDot = (
    base: 'A' | 'T' | 'G' | 'C',
    bgColor: string,
    shadowColor: string
  ) => (
    <div 
      className={`w-4 h-4 rounded-full ${bgColor} shadow-lg ${shadowColor} flex items-center justify-center text-white text-xs font-bold`}
    >
      {base}
    </div>
  );

  return (
    <div className={`w-full h-px relative ${className || ''}`}>
      <div className={`absolute inset-0 ${stripGradient}`}></div>
      
      {/* DNA base pairs represented as dots with labels */}
      {/* Pair 1: A-T */}
      <div className="absolute -top-2 left-1/4 flex flex-col items-center">
        {basePairDot('A', colors.adenine, colors.adenineShadow)}
        <div className="h-3 w-0.5 bg-white/20"></div>
        {basePairDot('T', colors.thymine, colors.thymineShadow)}
      </div>
      
      {/* Pair 2: G-C */}
      <div className="absolute -top-2 left-1/2 flex flex-col items-center">
        {basePairDot('G', colors.guanine, colors.guanineShadow)}
        <div className="h-3 w-0.5 bg-white/20"></div>
        {basePairDot('C', colors.cytosine, colors.cytosineShadow)}
      </div>
      
      {/* Pair 3: A-T */}
      <div className="absolute -top-2 left-3/4 flex flex-col items-center">
        {basePairDot('A', colors.adenine, colors.adenineShadow)}
        <div className="h-3 w-0.5 bg-white/20"></div>
        {basePairDot('T', colors.thymine, colors.thymineShadow)}
      </div>
    </div>
  );
};

export default DnaBasePairStrip; 