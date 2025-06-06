'use client';

import { motion } from 'framer-motion';
import { Users, Code, Database, GitMerge, ExternalLink } from 'lucide-react';
import React from 'react';
import DoubleDnaHelix from '@/components/ui/DoubleDnaHelix';

// Constants for Foundational Pillars Section configuration
const PILLARS_CONFIG = {
  sectionId: "foundational-pillars",
  foundationalTech: [
    {
      name: 'AlphaFold 3',
      origin: 'DeepMind by Google',
      description: 'Unparalleled predictive power in structural biology.',
      icon: Code,
      link: 'https://alphafoldserver.com/welcome'
    },
    {
      name: 'Evo',
      origin: 'Arc Institute',
      description: 'Deep DNA understanding and powerful generative capabilities.',
      icon: Database,
      link: 'https://arcinstitute.org/tools/evo'
    },
    {
      name: 'CRISPR',
      origin: 'Research Leaders',
      description: 'Foundational principles for precise genomic modifications.',
      icon: GitMerge,
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
    <section id={PILLARS_CONFIG.sectionId} className="relative overflow-hidden py-20 lg:py-32 bg-slate-900 text-white">
      {/* DNA Background Elements */}
      <div className="absolute left-4 top-12 w-24 h-4/5 opacity-10 pointer-events-none" style={{ perspective: '800px', transformStyle: 'preserve-3d' }}>
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
      <div className="absolute right-4 top-20 w-20 h-3/4 opacity-10 pointer-events-none" style={{ perspective: '800px', transformStyle: 'preserve-3d' }}>
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
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={PILLARS_CONFIG.animationVariants.initial}
          whileInView={PILLARS_CONFIG.animationVariants.animate}
          viewport={{ once: true }}
          transition={PILLARS_CONFIG.animationVariants.transition(0.4)}
          className="mt-16 md:mt-20 bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-slate-700"
        >
          {/* Core Philosophy Section */}
          <div className="p-8 md:p-12 text-center border-b border-slate-700">
            <div className="flex justify-center text-4xl mb-5 text-primary">
              <Users />
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
              Our Foundation & Collaborative Spirit
            </h3>
            <p className="text-lg max-w-3xl mx-auto text-slate-300">
              The true power of CrisPRO stems from the unique synergy of our team's deep technical AI knowledge 
              and critical firsthand clinical insight. This combination is the engine driving our innovative solutions.
            </p>
          </div>

          {/* Foundation Statement */}
          <div className="bg-gradient-to-r from-teal-600/20 via-green-600/20 to-cyan-600/20 p-8 md:p-12 text-center relative overflow-hidden">
            <p className="text-xl font-light max-w-3xl mx-auto relative z-10 text-slate-200">
              Our Oncology Co-Pilot is proudly built upon the groundbreaking work and open-source contributions 
              from world-leading institutions and researchers in biological AI and gene editing.
            </p>
          </div>

          {/* Technologies Grid */}
          <div className="p-8 md:p-12">
             <h4 className="text-xl font-semibold text-center mb-8 text-white">Built on a Foundation of Giants</h4>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PILLARS_CONFIG.foundationalTech.map((tech, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center mb-3">
                    <tech.icon className="w-6 h-6 mr-3 text-primary" />
                    <h5 className="font-bold text-lg text-white">{tech.name}</h5>
                  </div>
                  <p className="text-sm text-slate-400 mb-3 font-medium">{tech.origin}</p>
                  <p className="text-sm text-slate-300 mb-4">{tech.description}</p>
                  <a href={tech.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center">
                    Learn more <ExternalLink className="w-3 h-3 ml-1.5" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Closing Statement */}
          <div className="bg-slate-900/50 p-8 md:p-10 text-center border-t border-slate-700">
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
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