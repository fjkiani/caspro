'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Stethoscope,
  Microscope,
  ArrowRight,
  Dna,
} from 'lucide-react';

const PRODUCTS = [
  {
    id: 'oncology',
    title: 'CrisPRO Oncology',
    subtitle: 'From VUS to Validated Care Plan in Minutes',
    icon: Stethoscope,
    color: 'from-purple-500 to-indigo-600',
    link: '/products/oncology',
    description: 'Complete clinical intelligence platform with unified care plans, trial matching, and toxicity prevention'
  },
  {
    id: 'r-d',
    title: 'CrisPRO R&D',
    subtitle: 'Design the Undruggable. Validate in Silico.',
    icon: Dna,
    color: 'from-blue-500 to-cyan-600',
    link: '/products/r-d',
    description: 'AI-powered engines for therapeutic design, structural validation, and IND package generation'
  },
  {
    id: 'research',
    title: 'CrisPRO Research',
    subtitle: 'Accelerate Discovery from Years to Hours',
    icon: Microscope,
    color: 'from-teal-500 to-emerald-600',
    link: '/products/research',
    description: 'Universal hypothesis testing, cohort intelligence, and evidence synthesis across 50+ diseases'
  }
] as const;

const PlatformCapabilitiesShowcase: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            <span className="text-blue-600">Transform Drug Development</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-4">
            Through continuous agentic intelligence, we enable complete end-to-end platforms that transform genomic data into actionable therapeutic intelligence.
          </p>
          <p className="text-base text-slate-600 max-w-3xl mx-auto">
            Three integrated products: Precision Oncology for clinical decision support, R&D for therapeutic design, and Research for discovery acceleration.
          </p>
        </motion.div> */}

        {/* Product Cards - 3 Products */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PRODUCTS.map((product, index) => {
            const Icon = product.icon;
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group"
              >
                <Link href={product.link} className="block h-full">
                  <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-blue-400 shadow-lg hover:shadow-xl transition-all overflow-hidden h-full flex flex-col cursor-pointer">
                    <div className="p-8 flex flex-col items-center text-center h-full">
                      {/* Icon */}
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${product.color} mb-6 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-12 h-12 text-white" />
                      </div>
                      {/* Title & Subtitle */}
                      <h3 className={`text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${product.color} group-hover:scale-105 transition-transform`}>
                        {product.title}
                      </h3>
                      <p className="text-slate-700 mb-4 font-semibold">
                        {product.subtitle}
                      </p>
                      <p className="text-sm text-slate-500 mb-6 flex-grow">
                        {product.description}
                      </p>
                      {/* Arrow Indicator */}
                      <div className="flex items-center gap-2 text-blue-600 font-semibold mt-auto">
                        <span>Explore Product</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlatformCapabilitiesShowcase;
