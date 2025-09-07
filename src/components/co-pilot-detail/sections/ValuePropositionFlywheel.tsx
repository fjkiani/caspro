'use client';

import React from 'react';
import { ValuePropositionSection } from '@/data/coPilotDetails';
import SectionHeader from './shared/SectionHeader';
import MarkdownText from './shared/MarkdownText';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

interface ValuePropositionFlywheelProps {
  valuePropositionSections: ValuePropositionSection[];
}

export default function ValuePropositionFlywheel({ valuePropositionSections }: ValuePropositionFlywheelProps) {
  if (!valuePropositionSections || valuePropositionSections.length === 0) {
    return null;
  }

  return (
    <div className="mb-16">
      <SectionHeader 
        title="The Value Proposition Flywheel" 
        subtitle="Strategic advantages that create a self-sustaining cycle of value delivery for each target audience." 
      />
      
      <div className="mt-16 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          {valuePropositionSections.map((section, i) => (
            <motion.div
              key={section.audience}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <Users size={32} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{section.audience}</h3>
                  <ul className="space-y-2">
                    {section.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <MarkdownText 
                          text={point}
                          className="text-slate-600 text-sm leading-relaxed"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Flywheel Visualization */}
        <div className="relative h-96 flex items-center justify-center">
          <motion.svg 
            viewBox="0 0 400 400" 
            className="w-full h-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <defs>
              <linearGradient id="value-flywheel-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            
            {/* Dashed circle */}
            <motion.circle 
              cx="200" cy="200" r="150" 
              fill="none" 
              stroke="url(#value-flywheel-gradient)" 
              strokeWidth="4" 
              strokeDasharray="15 15"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />

            {/* Nodes for each audience */}
            {valuePropositionSections.map((section, i) => (
              <motion.g 
                key={`value-node-${i}`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.2 }}
              >
                <circle 
                  cx={200 + 150 * Math.cos(i * 2 * Math.PI / valuePropositionSections.length - Math.PI / 2)}
                  cy={200 + 150 * Math.sin(i * 2 * Math.PI / valuePropositionSections.length - Math.PI / 2)}
                  r="18"
                  fill="#f8fafc"
                  stroke="url(#value-flywheel-gradient)"
                  strokeWidth="3"
                />
                <g transform={`translate(${200 + 150 * Math.cos(i * 2 * Math.PI / valuePropositionSections.length - Math.PI / 2)}, ${200 + 150 * Math.sin(i * 2 * Math.PI / valuePropositionSections.length - Math.PI / 2)}) scale(0.5)`}>
                  <Users size={32} className="text-blue-600" transform="translate(-16, -16)" />
                </g>
              </motion.g>
            ))}
          </motion.svg>
        </div>
      </div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-center text-xl text-slate-600 mt-16 max-w-4xl mx-auto"
      >
        This value delivery cycle creates a self-sustaining loop of strategic advantages, accelerating therapeutic development and market adoption at an unprecedented pace.
      </motion.p>
    </div>
  );
}
