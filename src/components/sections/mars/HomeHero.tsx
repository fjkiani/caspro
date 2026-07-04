'use client';

import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const BackgroundDNAStruct = dynamic(() => import('./BackgroundDNAStruct'), { ssr: false });

export const HomeHero = () => {
  return (
    <section className="relative w-full h-screen min-h-[900px] flex flex-col justify-end bg-[#0A0A0F] overflow-hidden">
      
      {/* Background 3D DNA Structure */}
      <BackgroundDNAStruct />

      {/* Subtle grid overlay for terminal aesthetic */}
      <div 
        className="absolute inset-0 z-10 opacity-[0.015] pointer-events-none"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 229, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.5) 1px, transparent 1px)', 
          backgroundSize: '60px 60px' 
        }}
      />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0A0A0F] to-transparent z-10 pointer-events-none" />

      {/* Foreground Content Panel */}
      <div className="relative z-20 w-full px-6 md:px-12 lg:px-16 pb-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Divider line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#E8E8F0]/20 to-transparent mb-6" />
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
            
            {/* Left: Headline & Subtext */}
            <div className="max-w-2xl">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-xl md:text-2xl lg:text-[26px] font-medium text-[#E8E8F0] leading-snug mb-3"
                style={{ fontFamily: '"Inter", system-ui, sans-serif', letterSpacing: '-0.01em' }}
              >
                Built the first clinical AI that tells you why a precision oncology trial will fail.
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-[#00E5FF] text-sm md:text-[15px] tracking-wide"
                style={{ fontFamily: '"JetBrains Mono", "Fira Code", monospace' }}
              >
                Three Phase III failures. Three cancers. One engine.
              </motion.p>
            </div>

            {/* Right: CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-row gap-3 shrink-0"
            >
              <a 
                href="#proof" 
                className="group flex items-center justify-center px-5 py-2.5 border border-[#E8E8F0]/25 rounded text-[#E8E8F0] text-xs uppercase tracking-wider hover:border-[#00E5FF] hover:text-[#00E5FF] transition-all duration-300 bg-[#0A0A0F]/60 backdrop-blur-sm"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                [See the receipts]
              </a>
              
              <a 
                href="/contact" 
                className="group flex items-center justify-center px-5 py-2.5 border border-[#E8E8F0]/25 rounded text-[#E8E8F0] text-xs uppercase tracking-wider hover:border-[#00E5FF] hover:text-[#00E5FF] transition-all duration-300 bg-[#0A0A0F]/60 backdrop-blur-sm"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                [Talk to us]
              </a>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
