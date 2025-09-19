'use client';

import React from 'react';
import { adaptForgeForHomepage } from '@/data/adapters';

export default function ForgePage() {
  // Use the migrated Forge data
  const forgeData = adaptForgeForHomepage();

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
            Forge: Generative AI Engine
          </h1>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto">
            {forgeData.content.about.oneLiner}
          </p>
        </section>

        {/* API Endpoints */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Generative AI APIs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forgeData.apis.map((api) => (
              <div key={api.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{api.icon}</span>
                  <h3 className="text-xl font-bold">{api.name}</h3>
                </div>
                <p className="text-slate-300 mb-4">{api.description}</p>
                
                {/* Capabilities */}
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-slate-400 mb-2">CAPABILITIES:</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    {api.capabilities.slice(0, 3).map((capability, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-purple-400 font-mono text-xs mt-1">•</span>
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Use Cases */}
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-slate-400 mb-2">USE CASES:</h4>
                  <div className="space-y-2">
                    {api.useCases.slice(0, 2).map((useCase, idx) => (
                      <div key={idx}>
                        <div className="text-sm font-medium text-purple-300">{useCase.title}</div>
                        <div className="text-xs text-slate-400">{useCase.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Capabilities */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Multi-Modal Generation</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {forgeData.capabilities.map((capability) => (
              <div key={capability.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{capability.icon}</span>
                  <h3 className="text-xl font-bold">{capability.title}</h3>
                </div>
                <p className="text-slate-300 mb-4">{capability.description}</p>
                
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {capability.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <div className={`text-lg font-bold ${metric.color === 'green' ? 'text-green-400' : metric.color === 'blue' ? 'text-blue-400' : 'text-purple-400'}`}>
                        {metric.value}
                      </div>
                      <div className="text-xs text-slate-400">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="font-semibold text-sm text-slate-400 mb-2">KEY FEATURES:</h4>
                  <div className="flex flex-wrap gap-2">
                    {capability.keyFeatures.map((feature, idx) => (
                      <span key={idx} className="px-2 py-1 bg-slate-700 text-xs rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Therapeutic Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(forgeData.useCases).map(([key, useCase]) => (
              <div key={key} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{useCase.icon}</span>
                  <h3 className="text-xl font-bold">{useCase.title}</h3>
                </div>
                <p className="text-slate-300 mb-4">{useCase.description}</p>
                
                {/* Workflow */}
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-slate-400 mb-2">WORKFLOW:</h4>
                  <ol className="text-sm text-slate-300 space-y-1">
                    {useCase.workflow.slice(0, 4).map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-purple-400 font-mono text-xs mt-1">{idx + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {Object.entries(useCase.metrics).slice(0, 4).map(([key, value]) => (
                    <div key={key}>
                      <div className="text-green-400 font-mono">{value}</div>
                      <div className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="mt-16 text-center text-slate-400">
          <p>Powered by Evo2 40B-parameter foundation model with 1M-token context window</p>
        </div>
      </div>
    </div>
  );
}
