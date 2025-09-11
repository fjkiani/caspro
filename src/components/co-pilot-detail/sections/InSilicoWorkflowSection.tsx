'use client';

import React, { ElementType } from 'react';
import { motion } from 'framer-motion';
import { InSilicoWorkflow } from '@/data/coPilotDetails';
import {
  Database,
  Target,
  BrainCircuit,
  DraftingCompass,
  ShieldCheck,
  Settings2,
  FileText,
  HelpCircle,
} from 'lucide-react';

const iconMap: { [key: string]: ElementType } = {
  Database,
  Target,
  BrainCircuit,
  DraftingCompass,
  ShieldCheck,
  Settings2,
  FileText,
  HelpCircle,
};

interface InSilicoWorkflowSectionProps {
  workflow: InSilicoWorkflow;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const InSilicoWorkflowSection: React.FC<InSilicoWorkflowSectionProps> = ({ workflow }) => {
  if (!workflow || !workflow.steps || workflow.steps.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">{workflow.title}</h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          From data curation to final validation, our automated pipeline transforms complex biological challenges into engineered therapeutic solutions.
        </p>
      </div>
      
      <div className="relative max-w-2xl mx-auto">
        {/* The vertical line */}
        <div className="absolute left-9 top-0 h-full w-0.5 bg-slate-200" aria-hidden="true"></div>
        
        <motion.ul
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {workflow.steps.map((step, index) => {
            const Icon = iconMap[step.iconName] || HelpCircle;
            return (
              <motion.li key={index} className="relative pl-20" variants={itemVariants}>
                <div className="absolute left-0 top-1 flex items-center justify-center w-18 h-18">
                    <div className="absolute z-10 flex items-center justify-center w-12 h-12 bg-white rounded-full border-2 border-slate-200">
                        <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="absolute z-0 flex items-center justify-center w-18 h-18 bg-primary/10 rounded-full"></div>
                </div>
                <div className="pt-1.5">
                  <h3 className="text-lg font-bold text-slate-800 mb-1">{`${index + 1}. ${step.title}`}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
};

export default InSilicoWorkflowSection;
