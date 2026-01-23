'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Microscope, FlaskConical, ArrowRight, Play, Brain, Target } from 'lucide-react';
import Link from 'next/link';

export default function FeaturedDemosSection() {
  const featuredDemos = [
    {
      id: 'agent-swarm',
      title: 'Agent Swarm Intelligence',
      subtitle: 'Autonomous Oncology Orchestration',
      description: 'Watch 8 autonomous agents work together to analyze patient data, resolve variants, and generate complete care plans in real-time.',
      icon: Brain,
      color: 'from-blue-500 to-cyan-600',
      product: 'Oncology',
      productIcon: Stethoscope,
      link: '/products/oncology',
      cta: 'Experience Agent Swarm',
      metrics: ['8 Active Agents', 'Real-time Processing', 'Complete Care Plans']
    },
    {
      id: 'hypothesis-testing',
      title: 'Universal Hypothesis Testing',
      subtitle: 'Validate Research Questions Instantly',
      description: 'Test any compound against any disease with mechanistic validation. See live results for curcumin + KRAS, metformin + breast cancer, and more.',
      icon: Target,
      color: 'from-teal-500 to-emerald-600',
      product: 'Research',
      productIcon: Microscope,
      link: '/products/research#hypothesis-testing',
      cta: 'Test Hypotheses Live',
      metrics: ['50+ Diseases', '110M+ Compounds', 'Mechanistic Validation']
    },
    {
      id: 'intelligence-cascade',
      title: 'Intelligence Cascade',
      subtitle: 'Full End-to-End Processing Pipeline',
      description: 'Experience the complete AI processing pipeline with rich dossier components showing molecular analysis, therapeutic options, and clinical trials.',
      icon: Play,
      color: 'from-purple-500 to-indigo-600',
      product: 'Oncology',
      productIcon: Stethoscope,
      link: '/products/oncology',
      cta: 'View Intelligence Cascade',
      metrics: ['7-Phase Pipeline', 'Rich Visualizations', 'Complete Analysis']
    },
    {
      id: 'research-tools',
      title: 'Interactive Research Tools',
      subtitle: 'Accelerate Discovery from Years to Hours',
      description: 'Explore VUS resolution, cohort intelligence, evidence synthesis, and metastasis assessment with live interactive demonstrations.',
      icon: FlaskConical,
      color: 'from-orange-500 to-red-600',
      product: 'Research',
      productIcon: Microscope,
      link: '/products/research#interactive-tools',
      cta: 'Explore Research Tools',
      metrics: ['12x Acceleration', '73% VUS Resolution', 'Grant-Ready Data']
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <Play className="w-4 h-4" />
            FEATURED AI DEMONSTRATIONS
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
          >
            Experience Our AI in Action
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-600 max-w-3xl mx-auto"
          >
            Don't just read about our capabilities - see them working in real-time.
            Click any demo below to experience our AI transforming complex data into actionable insights.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredDemos.map((demo, index) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Header with Product Badge */}
              <div className={`bg-gradient-to-r ${demo.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center`}>
                    <demo.icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                    <demo.productIcon className="w-3 h-3" />
                    {demo.product}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2">{demo.title}</h3>
                <p className="text-blue-100 text-sm">{demo.subtitle}</p>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-slate-600 mb-6 leading-relaxed">{demo.description}</p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {demo.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-lg font-bold text-slate-800">{metric.split(' ')[0]}</div>
                      <div className="text-xs text-slate-600">{metric.split(' ').slice(1).join(' ')}</div>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link href={demo.link}>
                  <motion.button
                    className={`w-full bg-gradient-to-r ${demo.color} text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Play className="w-4 h-4" />
                    {demo.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Explore our product suite designed for different user needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                Explore All Products
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-300 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all duration-300">
                Schedule Demo
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
