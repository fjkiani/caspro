'use client';

import React from 'react';
import { motion } from 'framer-motion';
import DemoFactory from './DemoFactory';

interface APIDemoSectionProps {
  className?: string;
}

const APIDemoSection: React.FC<APIDemoSectionProps> = ({ className = '' }) => {
  return (
    <section className={`py-20 bg-gradient-to-b from-slate-50 to-white ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-100 text-blue-700 rounded-full font-semibold mb-6">
            <span className="text-xl">🧬</span>
            API Demo Factory
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Try Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI APIs Live
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8">
            Experience step-by-step API simulations with real-time results. 
            <strong> See how our discriminative AI engines transform variant analysis.</strong>
          </p>
        </motion.div>

        {/* DemoFactory Component */}
        <DemoFactory />
      </div>
    </section>
  );
};

export default APIDemoSection;

