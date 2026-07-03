'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, FlaskConical, Factory, ArrowRight } from 'lucide-react';
import Link from 'next/link';
;

interface JourneyCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  href: string;
  features: string[];
}

const journeys: JourneyCard[] = [
  {
    id: 'clinicians',
    title: 'For Clinicians',
    subtitle: 'Unified Care Plans in Minutes',
    description: 'Get evidence-backed treatment recommendations with transparent confidence scores. Complete unified care plans integrate drugs, trials, food/supplements, and monitoring in one place.',
    icon: Stethoscope,
    color: 'text-blue-600 dark:text-blue-400',
    bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950',
    href: '/solutions/clinical-decision-support',
    features: [
      'Resolve 73% of VUS cases instantly',
      'Unified care plans (drugs + trials + PGx)',
      'SAE explanations for every prediction',
      'Action-ready dossiers with contacts'
    ]
  },
  {
    id: 'researchers',
    title: 'For Researchers',
    subtitle: 'Validate Targets In Silico',
    description: 'Test any hypothesis against any disease with mechanistic validation. Validate therapeutic targets in weeks, not years, with complete audit trails.',
    icon: FlaskConical,
    color: 'text-purple-600 dark:text-purple-400',
    bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950',
    href: '/solutions/research-acceleration',
    features: [
      '50+ diseases, 110M+ compounds',
      'VUS Explorer (unknown → understood)',
      'Cohort intelligence & benchmarking',
      'Evidence synthesis from multiple sources'
    ]
  },
  {
    id: 'biotech',
    title: 'For Biotech',
    subtitle: 'Design Therapeutics, Not Experiments',
    description: 'De-risk drug development with in-silico validation. Design CRISPR guides, validate structures, and generate IND packages—all before expensive lab work.',
    icon: Factory,
    color: 'text-green-600 dark:text-green-400',
    bgGradient: 'from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950',
    href: '/solutions/therapeutic-design',
    features: [
      '90% success rate vs 5% traditional',
      '72x faster target validation',
      'Structural validation (pLDDT ≥70)',
      'IND package generation'
    ]
  }
];

export const CustomerJourneyCards = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Built for Every Stage of Drug Development
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Whether you're treating patients, validating hypotheses, or designing therapeutics—CrisPRO.ai has the tools you need.
          </p>
        </motion.div>

        {/* Journey Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {journeys.map((journey, index) => {
            const Icon = journey.icon;
            return (
              <motion.div
                key={journey.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <Link href={journey.href} className="block h-full">
                  <div className={`bg-gradient-to-br ${journey.bgGradient} rounded-2xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col`}>
                    {/* Icon */}
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center mb-4 sm:mb-6 border-2 ${journey.color.replace('text-', 'border-')}`}>
                      <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${journey.color}`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {journey.title}
                    </h3>
                    <p className={`text-base sm:text-lg font-semibold ${journey.color} mb-3`}>
                      {journey.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-6 flex-grow">
                      {journey.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {journey.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="mt-auto flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

