'use client';

import React from 'react';

import { adaptBoltzForHomepage } from '@/data/adapters/platform-adapter';

export default function BoltzPage() {
  // Use the migrated Boltz data
  const boltzData = adaptBoltzForHomepage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900/20 pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center mb-20 mt-8">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-300 bg-clip-text text-transparent">
            ⚡ Boltz: 3D Structural Assessment
          </h1>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto mb-4">
            {boltzData.description}
          </p>
        </section>

        {/* What It Does */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">What It Does</h2>
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
            <p className="text-lg text-slate-300 mb-6">
              {boltzData.description}
            </p>
            <p className="text-slate-400">
              You see a clear pLDDT confidence score, timing, and full provenance.
            </p>
          </div>
        </section>

        {/* Capabilities */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Core Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {boltzData.capabilities.map((capability, idx) => (
              <div key={idx} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h3 className="text-xl font-bold text-orange-400 mb-4">{capability.title}</h3>
                <p className="text-slate-300 mb-4">{capability.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {capability.metrics.map((metric, metricIdx) => (
                    <div key={metricIdx} className="text-center">
                      <div className={`text-2xl font-bold ${metric.color} mb-1`}>{metric.value}</div>
                      <div className="text-sm text-slate-400">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
            <ul className="space-y-4">
              {boltzData.keyFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-300">
                  <span className="text-green-400 font-mono text-lg mt-1">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Performance Metrics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">{boltzData.metrics.confidenceThreshold}</div>
              <div className="text-lg font-semibold text-slate-300 mb-2">High Confidence Threshold</div>
              <div className="text-sm text-slate-400">Structural validation threshold</div>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">{boltzData.metrics.averageConfidence}</div>
              <div className="text-lg font-semibold text-slate-300 mb-2">Average Confidence</div>
              <div className="text-sm text-slate-400">Across all validations</div>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">Confirmed</div>
              <div className="text-lg font-semibold text-slate-300 mb-2">3D Structures</div>
              <div className="text-sm text-slate-400">Plausible folding confirmed</div>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">Multi-Component</div>
              <div className="text-lg font-semibold text-slate-300 mb-2">Validation</div>
              <div className="text-sm text-slate-400">Complex system assessment</div>
            </div>
          </div>
        </section>

        {/* Research Use Only Disclaimer */}
        <div className="mt-16 text-center">
          <div className="mb-8 p-6 bg-yellow-900/20 border border-yellow-600/30 rounded-lg max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-yellow-400 text-xl">⚠️</span>
              <h3 className="text-yellow-400 font-bold text-xl">Research Use Only</h3>
            </div>
            <p className="text-yellow-200 text-sm mb-2">
              Boltz predictions are for research purposes only. Not for use in diagnostic procedures or clinical decision-making.
            </p>
            <p className="text-yellow-300 text-xs">
              All structural validations require experimental confirmation before clinical application.
            </p>
          </div>
          
          <p className="text-slate-400">Powered by migrated CrisPRO.ai data architecture • Research Use Only</p>
        </div>
      </div>
    </div>
  );
}