'use client';

import { motion } from 'framer-motion';
import { FiUsers, FiCode, FiDatabase, FiGitMerge } from 'react-icons/fi';
import React from 'react';
import DoubleDnaHelix from '@/components/ui/DoubleDnaHelix';
import DnaBasePairStrip from '@/components/ui/DnaBasePairStrip';

// Constants for Foundational Pillars Section configuration
const PILLARS_CONFIG = {
  sectionId: "foundational-pillars", // New ID
  foundationalTech: [
    {
      name: 'AlphaFold 3',
      origin: 'DeepMind by Google',
      description: 'Unparalleled predictive power in structural biology',
      icon: FiCode,
      link: 'https://alphafoldserver.com/welcome'
    },
    {
      name: 'Evo2',
      origin: 'Arc Institute',
      description: 'Deep DNA understanding and powerful generative capabilities',
      icon: FiDatabase,
      link: 'https://arcinstitute.org/tools/evo'
    },
    {
      name: 'CRISPR',
      origin: 'Research Leaders',
      description: 'Foundational principles enabling precise genomic modifications',
      icon: FiGitMerge,
      link: 'https://crisprtx.com/'
    }
  ],
  animationVariants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: (delay: number = 0) => ({ duration: 0.5, delay })
  }
};

const FoundationalPillarsSection: React.FC = () => {
  return (
    <section id={PILLARS_CONFIG.sectionId} className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-b from-slate-50 via-green-50 to-teal-50">
      {/* DNA Background Elements */}
      <div className="absolute left-4 top-12 w-24 h-4/5 opacity-25 pointer-events-none" style={{ perspective: '800px', transformStyle: 'preserve-3d' }}>
        <DoubleDnaHelix 
          className="w-full h-full" 
          baseCount={12}
          rotationSpeed={40}
          colors={{
            adenine: '#10b981',
            thymine: '#06b6d4', 
            guanine: '#14b8a6',
            cytosine: '#0891b2',
            backbone1: '#10b981',
            backbone2: '#06b6d4'
          }}
        />
      </div>
      <div className="absolute right-4 top-20 w-20 h-3/4 opacity-20 pointer-events-none" style={{ perspective: '800px', transformStyle: 'preserve-3d' }}>
        <DoubleDnaHelix 
          className="w-full h-full" 
          baseCount={10}
          rotationSpeed={32}
          colors={{
            adenine: '#06b6d4',
            thymine: '#10b981',
            guanine: '#0891b2', 
            cytosine: '#14b8a6',
            backbone1: '#06b6d4',
            backbone2: '#10b981'
          }}
        />
      </div>
      
      {/* DNA base pairs decorative element */}
      <DnaBasePairStrip className="absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={PILLARS_CONFIG.animationVariants.initial}
          whileInView={PILLARS_CONFIG.animationVariants.animate}
          viewport={{ once: true }}
          transition={PILLARS_CONFIG.animationVariants.transition(0.4)} // Matches original delay
          className="mt-16 md:mt-20 bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-teal-200/50"
        >
          {/* DNA-themed glowing border */}
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 opacity-60"></div>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400 opacity-60"></div>
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 via-teal-400 to-cyan-400 opacity-60"></div>
            <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-teal-400 to-green-400 opacity-60"></div>
          </div>
          
          {/* Core Philosophy Section */}
          <div className="p-8 md:p-12 text-center border-b border-teal-200/50">
            <div className="flex justify-center text-4xl mb-5">
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600">
                <FiUsers />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-teal-700 to-cyan-700">
                Our Foundation & Collaborative Spirit
              </span>
            </h3>
            <p className="text-lg max-w-3xl mx-auto text-slate-700">
              The true power of CrisPRO stems from the unique synergy of our team's deep technical AI knowledge 
              and critical firsthand clinical insight. This combination is the engine driving our innovative solutions.
            </p>
          </div>

          {/* Foundation Statement */}
          <div className="bg-gradient-to-r from-teal-600 via-green-600 to-cyan-600 text-white p-8 md:p-12 text-center relative overflow-hidden">
            {/* DNA background pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute left-0 top-0 bottom-0 w-8">
                <DoubleDnaHelix 
                  className="w-full h-full" 
                  baseCount={2} 
                  rotationSpeed={20}
                  colors={{
                    adenine: '#ffffff',
                    thymine: '#ffffff', 
                    guanine: '#ffffff',
                    cytosine: '#ffffff',
                    backbone1: '#ffffff',
                    backbone2: '#ffffff'
                  }}
                />
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-8">
                <DoubleDnaHelix 
                  className="w-full h-full" 
                  baseCount={2} 
                  rotationSpeed={20}
                  colors={{
                    adenine: '#ffffff',
                    thymine: '#ffffff', 
                    guanine: '#ffffff',
                    cytosine: '#ffffff',
                    backbone1: '#ffffff',
                    backbone2: '#ffffff'
                  }}
                />
              </div>
            </div>
            <p className="text-xl font-light max-w-3xl mx-auto relative z-10">
              Our Oncology Co-Pilot is proudly built upon the groundbreaking work and open-source contributions 
              from world-leading institutions and researchers in biological AI and gene editing.
            </p>
          </div>

          {/* Technologies Grid */}
          <div className="p-8 md:p-12 bg-gradient-to-b from-white to-teal-50/30">
            {/* Technologies section intentionally left commented out as in original */}
          </div>

          {/* Closing Statement */}
          <div className="bg-gradient-to-r from-teal-50 to-green-50 p-8 md:p-12 text-center border-t border-teal-200/50">
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              By ethically and responsibly integrating these powerful open-source tools, 
              CrisPRO is dedicated to accelerating discovery and personalizing design in 
              the future of precision oncology.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FoundationalPillarsSection; 