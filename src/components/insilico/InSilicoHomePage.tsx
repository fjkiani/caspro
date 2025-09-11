'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Microscope, Activity, Shield, Target, Dna, FileText, Users, Zap, ArrowRight } from 'lucide-react';
import InSilicoCapabilityCard from './InSilicoCapabilityCard';
import { inSilicoCapabilities } from '@/data/insilico/capabilities';
import { EvidenceMetrics, VariantScoring, TherapeuticPipeline } from './index';

const InSilicoHomePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'evidence' | 'discriminative' | 'workflow'>('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: Microscope },
    { id: 'evidence', label: 'Evidence Backbone', icon: Target },
    { id: 'discriminative', label: 'Discriminative AI', icon: Dna },
    { id: 'workflow', label: 'Fusion Workflow', icon: Activity }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Background decorations */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-teal-100 to-indigo-100 rounded-3xl transform rotate-1 scale-105 opacity-30"></div>
            <div className="relative bg-white rounded-3xl p-16 shadow-2xl border border-gray-100">
              <div className="inline-flex items-center gap-6 mb-8">
                <div className="p-6 bg-gradient-to-r from-blue-500 to-teal-500 rounded-3xl shadow-xl">
                  <Microscope className="w-16 h-16 text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
                    In-Silico Capabilities
                  </h1>
                  <p className="text-2xl text-gray-600 mt-2">Research-Grade AI for Oncology</p>
                </div>
              </div>
              
              <div className="max-w-5xl mx-auto">
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  <strong className="text-blue-600">In-silico</strong> means "in silicon" - referring to computer-based analysis that simulates and predicts biological processes. 
                  Our research-grade AI platform transforms complex genomic data into actionable insights for oncology research and clinical decision support.
                </p>
                
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-8 border border-blue-100">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Shield className="w-8 h-8 text-blue-600" />
                    <span className="text-lg font-semibold text-blue-800">Research Use Only (RUO)</span>
                  </div>
                  <p className="text-gray-700 text-center">
                    All outputs are for research purposes and not for diagnostic use. Built with transparent methodology and auditable provenance.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-center">
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {section.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Content */}
      <section className="py-12">
        {activeSection === 'overview' && (
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Available Now (Research-Mode)</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Live capabilities with transparent evidence metrics, confidence scores, and auditable provenance
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {inSilicoCapabilities.map((capability, index) => (
                <motion.div
                  key={capability.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <InSilicoCapabilityCard capability={capability} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'evidence' && (
          <div className="container mx-auto px-6">
            <EvidenceMetrics />
          </div>
        )}

        {activeSection === 'discriminative' && (
          <div className="container mx-auto px-6">
            <VariantScoring />
          </div>
        )}

        {activeSection === 'workflow' && (
          <div className="container mx-auto px-6">
            <TherapeuticPipeline />
          </div>
        )}
      </section>
    </div>
  );
};

export default InSilicoHomePage;
