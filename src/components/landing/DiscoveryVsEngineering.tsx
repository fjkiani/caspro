'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FlaskConical, ArrowRight, DraftingCompass, Shield, Dna, Bot, BrainCircuit, Factory } from 'lucide-react';

interface DiscoveryVsEngineeringProps {
  className?: string;
}

const DiscoveryVsEngineering: React.FC<DiscoveryVsEngineeringProps> = ({ className = '' }) => {
  return (
    <section className={`py-20 bg-gradient-to-br from-purple-50 via-white to-pink-50 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Discovery vs. Engineering
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8">
            The fundamental shift from a <strong>game of chance</strong> to a <strong>discipline of creation</strong>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-xl text-center flex flex-col"
          >
            <h3 className="text-3xl font-bold text-slate-800 mb-4">The Old Way: A Funnel</h3>
            <p className="text-xl text-slate-500 mb-8">Low-probability screening</p>
            
            <div className="flex-grow flex flex-col items-center justify-center space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex space-x-2"
              >
                {[...Array(7)].map((_, i) => (
                  <FlaskConical key={i} className="text-slate-400" size={24} />
                ))}
              </motion.div>
              
              <p className="text-lg font-semibold text-slate-600">
                Millions of Molecules
              </p>

              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="w-48 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-t-[80px] border-t-slate-300 my-4"
              ></motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                className="bg-amber-100 p-4 rounded-lg border border-amber-300"
              >
                <h4 className="text-2xl font-bold text-amber-800">1 Potential Lead</h4>
                <p className="text-sm text-amber-600 mt-1">Maybe</p>
              </motion.div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-2xl font-bold text-red-600">18 months</div>
                  <div className="text-slate-500">Timeline</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">$50M+</div>
                  <div className="text-slate-500">Cost</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl border-2 border-emerald-400 shadow-2xl text-center flex flex-col"
          >
            <h3 className="text-3xl font-bold text-emerald-800 mb-4">The New Doctrine: A Factory</h3>
            <p className="text-xl text-emerald-600 mb-8">High-certainty generation</p>
            
            <div className="flex-grow flex flex-col items-center justify-center space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <DraftingCompass size={64} className="text-emerald-500" />
              </motion.div>
              
              <p className="text-lg font-semibold text-emerald-700">
                AI Engineering
              </p>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <ArrowRight size={48} className="text-emerald-400" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                className="bg-emerald-100 p-6 rounded-lg border border-emerald-300"
              >
                <h4 className="text-2xl font-bold text-emerald-800 mb-3">
                  Portfolio of Optimized Assets
                </h4>
                <div className="flex justify-center space-x-4">
                  <Shield className="text-emerald-600" size={32} />
                  <Dna className="text-emerald-600" size={32} />
                  <Bot className="text-emerald-600" size={32} />
                </div>
                <p className="text-sm text-emerald-600 mt-2">Validated & Patent-Ready</p>
              </motion.div>
            </div>

            <div className="mt-8 pt-6 border-t border-emerald-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-2xl font-bold text-emerald-600">6 week</div>
                  <div className="text-slate-500">Timeline</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600">$500K</div>
                  <div className="text-slate-500">Cost</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border border-purple-200">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              The Transformation
            </h3>
            <p className="text-xl text-slate-600 leading-relaxed">
              We've replaced the <strong className="text-red-600">needle-in-haystack</strong> approach 
              with <strong className="text-emerald-600">precision engineering</strong>. 
              Every therapeutic candidate is designed for success, not discovered by chance.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DiscoveryVsEngineering;