'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, ArrowRight, Clock } from 'lucide-react';
import BiotechROICalculator from './BiotechROICalculator';

interface ROICalculatorSectionProps {
  className?: string;
}

const ROICalculatorSection: React.FC<ROICalculatorSectionProps> = ({ className = '' }) => {
  return (
    <section className={`py-20 bg-gradient-to-br from-green-50 via-white to-blue-50 ${className}`}>
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
            <Calculator className="w-5 h-5" />
            R&D ROI Calculator
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Calculate Your <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              R&D ROI Improvement
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8">
            See exactly how CrisPRO's AI <strong>reduces failure costs</strong> and <strong>accelerates your pipeline</strong>. 
            <strong>Real ROI calculations for biotech executives.</strong>
          </p>

          {/* Business Transformation Impact Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 shadow-sm"
            >
              <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-green-600 mb-2">99.8%</div>
              <div className="text-sm font-semibold text-slate-700 mb-1">Cost Reduction</div>
              <div className="text-xs text-green-600">$2.1M saved per program</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 shadow-sm"
            >
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-blue-600 mb-2">72x</div>
              <div className="text-sm font-semibold text-slate-700 mb-1">Time Acceleration</div>
              <div className="text-xs text-blue-600">18 months → 1 week</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200 shadow-sm"
            >
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-purple-600 mb-2">6x</div>
              <div className="text-sm font-semibold text-slate-700 mb-1">Success Rate</div>
              <div className="text-xs text-purple-600">15% → 90% success</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Interactive Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-8">
            <BiotechROICalculator />

            {/* Call to Action */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white text-center">
              <h4 className="text-xl font-bold mb-3">
                Calculate Your ROI
              </h4>
              <p className="mb-6 opacity-90">
                Schedule a demo to see how these metrics apply to your programs
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  to="/contact"
                  className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <DollarSign className="w-5 h-5" />
                  Schedule Executive Demo
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                
                <motion.a
                  to="/metrics"
                  className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <TrendingUp className="w-5 h-5" />
                  See All Metrics
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ROICalculatorSection;
