'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TestTube, Zap, Search, Database, BookOpen, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ResearchHeroSection() {
  return (
    <section className="relative pt-20 pb-16 md:pb-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Hero Content */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <TestTube className="w-4 h-4" />
            RESEARCH ACCELERATION PLATFORM
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
          >
            Accelerate Discovery
            <br />
            <span className="text-slate-800">from Years to Hours</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto mb-8 leading-relaxed"
          >
            Test any hypothesis against any disease with mechanistic validation.
            Validate research in hours, not months. Every insight is traceable
            to source data with complete audit trails.
          </motion.p>

          {/* Key Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-sm text-slate-600">Diseases Supported</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">110M+</div>
              <div className="text-sm text-slate-600">Compounds Queryable</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">73%</div>
              <div className="text-sm text-slate-600">VUS Resolution Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">12x</div>
              <div className="text-sm text-slate-600">Faster Discovery</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="#hypothesis-testing">
              <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                <TestTube className="w-5 h-5 mr-3" />
                Try Hypothesis Testing
              </button>
            </Link>
            <Link to="#interactive-tools">
              <button className="inline-flex items-center px-8 py-4 bg-white text-slate-700 border-2 border-slate-300 rounded-xl font-semibold text-lg hover:bg-slate-50 hover:border-slate-400 transition-all duration-300">
                <Search className="w-5 h-5 mr-3" />
                Explore Research Tools
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Research Capabilities Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {[
            {
              icon: Target,
              title: "Universal Hypothesis Testing",
              description: "Test any compound against 50+ diseases simultaneously with mechanistic validation",
              color: "blue"
            },
            {
              icon: Database,
              title: "Cohort Intelligence",
              description: "Extract, label, and benchmark datasets from TCGA, cBioPortal, and GDC",
              color: "purple"
            },
            {
              icon: BookOpen,
              title: "Evidence Synthesis",
              description: "Multi-provider literature search with PubMed, OpenAlex, and S2 integration",
              color: "teal"
            }
          ].map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className={`bg-white p-6 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 group`}
            >
              <div className={`w-12 h-12 bg-${capability.color}-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-${capability.color}-200 transition-colors`}>
                <capability.icon className={`w-6 h-6 text-${capability.color}-600`} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                {capability.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {capability.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
