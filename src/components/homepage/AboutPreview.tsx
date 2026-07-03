'use client';

import React from 'react';
;
import { extractAboutHero } from '@/data/about/about-extractor';
import { adaptCompletePlatformForHomepage } from '@/data/adapters/platform-adapter';
import { ArrowRight, Brain, Zap, Shield, Command } from 'lucide-react';
import Link from 'next/link';

const AboutPreview: React.FC = () => {
  const heroData = extractAboutHero();
  const platformData = adaptCompletePlatformForHomepage();

  // Extract engine data from platform adapter - using REAL data structure
  const engines = [
    {
      name: 'Oracle: Discriminative AI Engine',
      description: 'Variant impact prediction with 95.7% ClinVar AUROC',
      icon: Brain,
      href: '/products/oracle',
      color: 'from-blue-600 to-blue-800',
      metric: platformData.platformMetrics.discriminativeAccuracy
    },
    {
      name: 'Forge: Generative AI Engine',
      description: 'Therapeutic design with 70% Pfam-hit rate',
      icon: Zap,
      href: '/products/forge',
      color: 'from-purple-600 to-purple-800',
      metric: platformData.platformMetrics.generativeSuccess
    },
    // {
    //   name: 'Boltz: Structural Validation',
    //   description: '3D structural assessment with 95.8% confidence',
    //   icon: Shield,
    //   href: '/products/boltz',
    //   color: 'from-green-600 to-green-800',
    //   metric: platformData.platformMetrics.structuralValidation
    // },
    // {
    //   name: 'Command Center: Orchestration',
    //   description: 'Multi-engine workflow orchestration',
    //   icon: Command,
    //   href: '/products/command-center',
    //   color: 'from-orange-600 to-orange-800',
    //   metric: 'Real-time Monitoring'
    // }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            {heroData.title}
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            {heroData.subtitle}
          </p>
          <p className="text-lg text-slate-700 max-w-4xl mx-auto">
            {heroData.description}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {heroData.keyMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">
                {metric.value}
              </div>
              <div className="text-lg font-semibold text-slate-700 mb-1">
                {metric.label}
              </div>
              <div className="text-sm text-slate-600">
                {metric.description}
              </div>
            </div>
          ))}
        </div>

        {/* Engine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
          {engines.map((engine, index) => {
            const IconComponent = engine.icon;
            return (
              <Link
                key={index}
                href={engine.href}
                className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-200"
              >
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${engine.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {engine.name}
                  </h3>
                  <p className="text-slate-600 mb-3">
                    {engine.description}
                  </p>
                  <div className="text-sm font-semibold text-slate-700 mb-4">
                    {engine.metric}
                  </div>
                  <div className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/about"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            Explore Complete Platform
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
