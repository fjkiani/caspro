'use client';

import React from 'react';
import { adaptOracleForHomepage } from '@/data/adapters';
import { AnnihilationOfUncertaintySlide } from '@/components/oracle/AnnihilationOfUncertaintySlide';

export default function OraclePage() {
  // Use the migrated Oracle data
  const oracleData = adaptOracleForHomepage();

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <section className="text-center mb-16 sm:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent leading-tight">
            Oracle: Discriminative AI Engine
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 max-w-5xl mx-auto px-4 leading-relaxed">
            Transform genetic uncertainty into actionable intelligence with zero-shot variant impact prediction
          </p>
        </section>
      </div>

      {/* Annihilation of Uncertainty Slide */}
      <AnnihilationOfUncertaintySlide />

      <div className="container mx-auto px-4 pt-16 pb-16">
        {/* API Endpoints */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Core API Endpoints</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {oracleData.endpoints && oracleData.endpoints.map((endpoint) => (
              <div key={endpoint.id} className="bg-slate-800 p-4 sm:p-6 rounded-xl border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl sm:text-2xl">{endpoint.icon}</span>
                  <h3 className="text-lg sm:text-xl font-bold">{endpoint.name}</h3>
                </div>
                <p className="text-slate-300 mb-4 text-sm sm:text-base">{endpoint.description}</p>
                
                {/* Metrics */}
                {endpoint.metrics && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-slate-400">VALIDATED METRICS:</h4>
                    {Object.entries(endpoint.metrics).slice(0, 2).map(([key, metric]) => (
                      <div key={key} className="text-sm">
                        <span className="text-green-400 font-mono">
                          {typeof metric === 'object' && 'auroc' in metric 
                            ? `${(metric.auroc * 100).toFixed(1)}%` 
                            : 'Validated'}
                        </span>
                        <span className="text-slate-400 ml-2">
                          {typeof metric === 'object' && 'description' in metric 
                            ? metric.description 
                            : key}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Multi-Modal Capabilities */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Multi-Modal Predictions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {oracleData.capabilities && oracleData.capabilities.map((capability) => (
              <div key={capability.id} className="bg-slate-800 p-4 sm:p-6 rounded-xl border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl sm:text-2xl">{capability.icon}</span>
                  <h3 className="text-lg sm:text-xl font-bold">{capability.title}</h3>
                </div>
                <p className="text-slate-300 mb-4 text-sm sm:text-base">{capability.description}</p>
                
                {/* Metrics */}
                <div className="mb-4">
                  {capability.metrics.map((metric, idx) => (
                    <div key={idx} className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-400">{metric.label}</span>
                      <span className={`text-sm font-mono ${metric.color}`}>{metric.value}</span>
                    </div>
                  ))}
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="font-semibold text-sm text-slate-400 mb-2">KEY FEATURES:</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    {capability.keyFeatures.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Scientific Validation */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Scientific Validation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {oracleData.validation && oracleData.validation.map((validation) => (
              <div key={validation.id} className="bg-slate-800 p-4 sm:p-6 rounded-xl border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl sm:text-2xl">{validation.icon}</span>
                  <h3 className="text-lg sm:text-xl font-bold">{validation.title}</h3>
                </div>
                <p className="text-slate-300 mb-4 text-sm sm:text-base">{validation.description}</p>
                
                {/* Validation Metrics */}
                <div className="mb-4">
                  {validation.metrics.map((metric, idx) => (
                    <div key={idx} className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-400">{metric.label}</span>
                      <span className={`text-sm font-mono ${metric.color}`}>{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Clinical Use Cases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {oracleData.useCases && Object.entries(oracleData.useCases).map(([key, useCase]) => (
              <div key={key} className="bg-slate-800 p-4 sm:p-6 rounded-xl border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl sm:text-2xl">{useCase.icon}</span>
                  <h3 className="text-lg sm:text-xl font-bold">{useCase.title}</h3>
                </div>
                <p className="text-slate-300 mb-4 text-sm sm:text-base">{useCase.description}</p>
                
                {/* Workflow */}
                {useCase.workflow && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm text-slate-400 mb-2">WORKFLOW:</h4>
                    <ol className="text-sm text-slate-300 space-y-1">
                      {useCase.workflow.slice(0, 4).map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-400 font-mono text-xs mt-1">{idx + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Metrics */}
                {useCase.metrics && (
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {Object.entries(useCase.metrics).slice(0, 4).map(([key, value]) => (
                      <div key={key}>
                        <div className="text-green-400 font-mono">{value}</div>
                        <div className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="mt-16 text-center">
          {/* Research Use Only Disclaimer */}
          <div className="mb-8 p-6 bg-yellow-900/20 border border-yellow-600/30 rounded-lg max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-yellow-400 text-xl">⚠️</span>
              <h3 className="text-yellow-400 font-bold text-xl">Research Use Only</h3>
            </div>
            <p className="text-yellow-200 text-sm mb-2">
              Oracle predictions are for research purposes only. Not for use in diagnostic procedures or clinical decision-making.
            </p>
            <p className="text-yellow-300 text-xs">
              All variant classifications require experimental validation before clinical application.
            </p>
          </div>
          
          <p className="text-slate-400">Powered by migrated CrisPRO.ai data architecture • Research Use Only</p>
        </div>
      </div>
    </div>
  );
}