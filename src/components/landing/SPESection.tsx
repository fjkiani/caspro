'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Dna, Target, FileText } from 'lucide-react';
import { SPEItem } from '@/data/landing/landing-data';

interface SPESectionProps {
  speItems: SPEItem[];
}

const iconMap = {
  Sequence: Dna,
  Pathway: Target,
  Evidence: FileText
};

const SPESection: React.FC<SPESectionProps> = ({ speItems }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-6">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our three-step approach combines sequence analysis, pathway understanding, and evidence-based validation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {speItems.map((item, index) => {
            const IconComponent = iconMap[item.label as keyof typeof iconMap] || Dna;
            
            return (
              <motion.div
                key={item.label}
                className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="inline-flex p-4 bg-blue-50 rounded-xl mb-6 group-hover:bg-blue-100 transition-colors duration-300">
                  <IconComponent className="w-8 h-8 text-blue-600" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.label}</h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">{item.helper}</p>

                {/* Accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-teal-500 group-hover:h-2 transition-all duration-300"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SPESection;
