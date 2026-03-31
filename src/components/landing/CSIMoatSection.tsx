'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Dna, Clock, TrendingUp, ArrowRight, Shield, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FOCUSED_HERO_CONFIG } from '@/data/homepage/hero-focused-claim';
import ComparisonSection from '@/components/universal/organisms/ComparisonSection';
import type { ComparisonData } from '@/types/universal-content';
import { csiCompetitorData, crisproAdvantages } from '@/data/competitors/csi-competitor-data';

const CSIMoatSection: React.FC = () => {
  const moatConfig = FOCUSED_HERO_CONFIG.moat;

  // Build comparison data from competitor data + CrisPRO
  const comparisonData: ComparisonData = {
    title: 'What Others Don\'t Have',
    subtitle: 'Foundation Medicine/Guardant vs CrisPRO',
    layout: 'side_by_side',
    items: [
      {
        id: 'competitors',
        title: 'Foundation Medicine / Guardant',
        description: csiCompetitorData['Foundation Medicine'].assessment,
        color: 'red',
        features: csiCompetitorData['Foundation Medicine'].weaknesses
      },
      {
        id: 'crispro',
        title: 'CrisPRO',
        description: 'Continuous chemosensitivity re-estimation across treatment lines',
        color: 'green',
        features: crisproAdvantages
      }
    ]
  };

  const components = [
    {
      name: 'DDR_bin Engine',
      description: moatConfig.components.biology,
      icon: Dna,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      name: 'Efflux Axis',
      description: moatConfig.components.efflux,
      icon: Clock,
      color: 'from-purple-500 to-violet-600'
    },
    {
      name: 'RSS Axis',
      description: moatConfig.components.rss,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-600'
    }
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {moatConfig.headline}
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            {moatConfig.description}
          </p>
        </motion.div>

        {/* Comparison Section - Reuse ComparisonSection component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <ComparisonSection data={comparisonData} />
        </motion.div>

        {/* Three Components */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {components.map((component, index) => {
            const Icon = component.icon;
            return (
              <motion.div
                key={component.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-xl p-6 border-2 border-slate-200 shadow-md hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${component.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{component.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{component.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200 text-center"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-4">The Result</h3>
          <p className="text-lg text-slate-700 mb-6 max-w-3xl mx-auto">
            {moatConfig.value}
          </p>
          <Link
            to={FOCUSED_HERO_CONFIG.cta.primary.href}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            {FOCUSED_HERO_CONFIG.cta.primary.text}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CSIMoatSection;
