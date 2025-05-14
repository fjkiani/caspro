'use client';

import { motion } from 'framer-motion';
import { FiUsers, FiCode, FiDatabase, FiGitMerge } from 'react-icons/fi';
import React from 'react';

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
    <section id={PILLARS_CONFIG.sectionId} className="section bg-white">
      <div className="container">
        <motion.div
          initial={PILLARS_CONFIG.animationVariants.initial}
          whileInView={PILLARS_CONFIG.animationVariants.animate}
          viewport={{ once: true }}
          transition={PILLARS_CONFIG.animationVariants.transition(0.4)} // Matches original delay
          className="mt-16 md:mt-20 bg-slate-100 rounded-xl overflow-hidden shadow-lg"
        >
          {/* Core Philosophy Section */}
          <div className="p-8 md:p-12 text-center border-b border-slate-200">
            <div className="flex justify-center text-4xl text-primary mb-5">
              <FiUsers />
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-slate-800">Our Foundation & Collaborative Spirit</h3>
            <p className="text-lg max-w-3xl mx-auto text-slate-700">
              The true power of CasPro stems from the unique synergy of our team's deep technical AI knowledge 
              and critical firsthand clinical insight. This combination is the engine driving our innovative solutions.
            </p>
          </div>

          {/* Foundation Statement */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 md:p-12 text-center">
            <p className="text-xl font-light max-w-3xl mx-auto">
              Our Oncology Co-Pilot is proudly built upon the groundbreaking work and open-source contributions 
              from world-leading institutions and researchers in biological AI and gene editing.
            </p>
          </div>

          {/* Technologies Grid */}
          <div className="p-8 md:p-12 bg-white">
            <h4 className="text-xl md:text-2xl font-semibold text-center mb-8 md:mb-10 text-slate-800">
              Key Foundational Technologies
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {PILLARS_CONFIG.foundationalTech.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={PILLARS_CONFIG.animationVariants.initial}
                  whileInView={PILLARS_CONFIG.animationVariants.animate}
                  viewport={{ once: true }}
                  transition={PILLARS_CONFIG.animationVariants.transition(index * 0.1 + 0.1)} // Stagger animation
                  className="bg-slate-50 p-6 rounded-lg border border-slate-200 hover:shadow-md transition-shadow duration-300"
                >
                  <a 
                    href={tech.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-80 transition-opacity duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <tech.icon className="text-3xl text-primary mr-3" />
                      <div>
                        <h5 className="text-lg font-bold text-slate-900">{tech.name}</h5>
                        <p className="text-sm text-primary">by {tech.origin}</p>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm">{tech.description}</p>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Closing Statement */}
          <div className="bg-slate-50 p-8 md:p-12 text-center border-t border-slate-200">
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              By ethically and responsibly integrating these powerful open-source tools, 
              CasPro is dedicated to accelerating discovery and personalizing design in 
              the future of precision oncology.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FoundationalPillarsSection; 