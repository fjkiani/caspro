'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, TrendingUp, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import CardSlider from '@/components/shared/CardSlider';

// Import the real metrics data
import { discriminativeMetrics, generativeMetrics, businessMetrics } from '@/data/metrics/core-metrics';

interface MetricsShowcaseProps {
  className?: string;
}

const MetricsShowcase: React.FC<MetricsShowcaseProps> = ({ className = '' }) => {
  // Select key metrics to showcase
  const showcaseMetrics = [
    {
      id: 'clinvar-performance',
      title: 'ClinVar Validation',
      description: 'We Eliminate Failure at the Source.',
      value: '95.7%',
      metric: 'AUROC',
      details: '53,210 variants validated',
      color: 'from-green-500 to-emerald-600',
      icon: Target,
      link: '/metrics#clinvar-coverage',
      badge: 'SOTA'
    },
    {
      id: 'brca-accuracy',
      title: 'BRCA1/2 Precision',
      description: 'We eliminate the failure of clinical translation',
      value: '95.0%',
      metric: 'BRCA1 AUROC',
      details: '3,893 variants analyzed',
      color: 'from-blue-500 to-cyan-600',
      icon: Shield,
      link: '/metrics#brca',
      badge: 'Clinical Grade'
    },
    {
      id: 'generative-quality',
      title: 'Therapeutic Design',
      description: 'we design viable candidates from day one, not by chance',
      value: '70%',
      metric: 'Pfam-hit Rate',
      details: 'vs 18% previous models',
      color: 'from-purple-500 to-violet-600',
      icon: Zap,
      link: '/metrics#generative',
      badge: '4x Better'
    },
    {
      id: 'business-impact',
      title: 'ROI for Biotechs',
      description: 'We Eliminate the Failure of Bankruptcy',
      value: '80%',
      metric: 'Cost Reduction',
      details: '$2.5M → $500K per target',
      color: 'from-orange-500 to-red-600',
      icon: TrendingUp,
      link: '/metrics#business',
      badge: 'Contract Ready'
    }
  ];

  return (
    <section className={`py-20 bg-gradient-to-b from-slate-50 to-white ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
          You Bring the Science, We Bring the AI Engineering
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            <strong>Validated in-silico predictions for variant impact, drug fit, and CRISPR design.</strong> 
          </p>  
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
            <div className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              📊 53,210+ variants validated
            </div>
            <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              🏆 State-of-the-art on ClinVar
            </div>
            <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
              🧬 No training required
            </div>
          
          </div>
        </motion.div>

        {/* Metrics Cards - Desktop Grid / Mobile Slider */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {showcaseMetrics.map((metric, index) => {
            const Icon = metric.icon;
            
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 bg-gradient-to-r ${metric.color} text-white text-xs font-bold rounded-full`}>
                    {metric.badge}
                  </span>
                </div>
                
                {/* Content */}
                <div className="relative p-4 sm:p-6">
                  {/* Icon */}
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-3 sm:mb-4`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 leading-tight">
                    {metric.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                    {metric.description}
                  </p>
                  
                  {/* Main Metric */}
                  <div className="mb-3 sm:mb-4">
                    <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                      {metric.value}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-500 font-semibold">
                      {metric.metric}
                    </div>
                    <div className="text-xs text-slate-400 mt-1 leading-tight">
                      {metric.details}
                    </div>
                  </div>
                  
                  {/* CTA */}
                  <Link href={metric.link}>
                    <motion.button
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-slate-100 group-hover:to-slate-50 text-sm sm:text-base touch-manipulation"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Slider */}
        <div className="sm:hidden mb-8">
          <div className="text-center mb-4">
            <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
              <span>← Swipe to explore →</span>
            </p>
          </div>
          <CardSlider
            slidesToShow={1}
            slidesToScroll={1}
            showDots={true}
            showArrows={true}
            autoPlay={false}
            className="mx-2"
          >
            {showcaseMetrics.map((metric, index) => {
              const Icon = metric.icon;
              
              return (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 bg-gradient-to-r ${metric.color} text-white text-xs font-bold rounded-full`}>
                      {metric.badge}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="relative p-6">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
                      {metric.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                      {metric.description}
                    </p>
                    
                    {/* Main Metric */}
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-slate-900 mb-1">
                        {metric.value}
                      </div>
                      <div className="text-sm text-slate-500 font-semibold">
                        {metric.metric}
                      </div>
                      <div className="text-sm text-slate-400 mt-1 leading-tight">
                        {metric.details}
                      </div>
                    </div>
                    
                    {/* CTA */}
                    <Link href={metric.link}>
                      <motion.button
                        className="w-full px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-slate-100 group-hover:to-slate-50 text-base touch-manipulation"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </CardSlider>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            See All Performance Metrics
          </h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Explore our complete validation results, benchmark comparisons, and business impact analysis. 
            <strong>Everything you need for due diligence and contract negotiations.</strong>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/metrics">
              <motion.button
                className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 sm:gap-3 text-sm sm:text-base touch-manipulation"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <TrendingUp className="w-5 h-5" />
                Complete Metrics Dashboard
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            
            <Link href="/evidence">
              <motion.button
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2 sm:gap-3 text-sm sm:text-base touch-manipulation"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Shield className="w-5 h-5" />
                Interactive Evidence
              </motion.button>
            </Link>
          </div>
          
          <p className="mt-4 text-sm text-slate-500">
            🔬 <strong>Peer-reviewed validation</strong> • 📊 <strong>Real-world benchmarks</strong> • 💼 <strong>Contract-ready analysis</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MetricsShowcase;
