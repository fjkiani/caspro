'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, ArrowRight } from 'lucide-react';
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

          {/* Quick ROI Impact Props */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            <div className="p-4 bg-white rounded-xl border border-green-200 shadow-sm">
              <div className="text-2xl font-bold text-green-600">90%</div>
              <div className="text-sm text-slate-600">Success Rate</div>
            </div>
            <div className="p-4 bg-white rounded-xl border border-blue-200 shadow-sm">
              <div className="text-2xl font-bold text-blue-600">72x</div>
              <div className="text-sm text-slate-600">Faster Validation</div>
            </div>
            <div className="p-4 bg-white rounded-xl border border-purple-200 shadow-sm">
              <div className="text-2xl font-bold text-purple-600">$12M+</div>
              <div className="text-sm text-slate-600">Annual Savings</div>
            </div>
            <div className="p-4 bg-white rounded-xl border border-orange-200 shadow-sm">
              <div className="text-2xl font-bold text-orange-600">6x</div>
              <div className="text-sm text-slate-600">ROI Multiple</div>
            </div>
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
                Ready to Transform Your Numbers?
              </h4>
              <p className="mb-6 opacity-90">
                Schedule a demo to see how these savings apply to your specific programs
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <DollarSign className="w-5 h-5" />
                  Schedule Executive Demo
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                
                <motion.a
                  href="/metrics"
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
