'use client';

import React from 'react';
import { adaptBoltzForHomepage } from '@/data/adapters/platform-adapter';

export default function BoltzPage() {
  // Use the migrated Boltz data
  const boltzData = adaptBoltzForHomepage();

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <section className="text-center mb-20 mt-8">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-300 bg-clip-text text-transparent">
            ⚡ Boltz: 3D Structural Assessment
          </h1>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto mb-4">
            {boltzData.content.about.oneLiner}
          </p>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            {boltzData.content.about.subtext}
          </p>
        </section>

        {/* What It Does */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">What It Does</h2>
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
            <p className="text-lg text-slate-300 mb-6">
              {boltzData.content.about.coreConcept}
            </p>
            <p className="text-slate-400">
              You see a clear pLDDT confidence score, timing, and full provenance.
            </p>
          </div>
        </section>

        {/* Real KPIs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Key Performance Indicators</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {boltzData.kpis.map((kpi, idx) => (
              <div key={idx} className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">{kpi.value}</div>
                <div className="text-lg font-semibold text-slate-300 mb-2">{kpi.label}</div>
                <div className="text-sm text-slate-400">{kpi.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Why It Matters */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why It Matters</h2>
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
            <ul className="space-y-4">
              {boltzData.whyItMatters.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-300">
                  <span className="text-orange-400 font-mono text-lg mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {boltzData.howItWorks.map((step, idx) => (
              <div key={idx} className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
                <div className="text-2xl font-bold text-orange-400 mb-4">{idx + 1}</div>
                <p className="text-slate-300">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What You Get */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">What You Get</h2>
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
            <ul className="space-y-4">
              {boltzData.whatYouGet.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-300">
                  <span className="text-green-400 font-mono text-lg mt-1">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Provenance Panel */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Provenance Panel</h2>
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
            <h3 className="text-2xl font-bold mb-6">{boltzData.content.provenance.title}</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-slate-300">Fields:</h4>
                <ul className="space-y-2">
                  {boltzData.content.provenance.fields.map((field: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300">
                      <span className="text-orange-400 font-mono text-sm">•</span>
                      {field}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-slate-300">Example:</h4>
                <div className="bg-slate-700 p-4 rounded-lg space-y-2">
                  <div className="text-sm text-slate-300">
                    <strong>Run ID:</strong> {boltzData.content.provenance.example.runId}
                  </div>
                  <div className="text-sm text-slate-300">
                    <strong>Engine:</strong> {boltzData.content.provenance.example.engine}
                  </div>
                  <div className="text-sm text-slate-300">
                    <strong>Params:</strong> {boltzData.content.provenance.example.params}
                  </div>
                  <div className="text-sm text-slate-300">
                    <strong>Timestamp:</strong> {boltzData.content.provenance.example.timestamp}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RUO Disclaimer */}
        <section className="mb-16">
          <div className="bg-amber-900/20 border border-amber-500/30 p-6 rounded-xl">
            <div className="flex items-start gap-3">
              <span className="text-amber-400 text-2xl">⚠️</span>
              <div>
                <h3 className="text-lg font-semibold text-amber-300 mb-2">Research Use Only</h3>
                <p className="text-amber-100">{boltzData.content.ruoDisclaimer}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-16 text-center text-slate-400">
          <p>Powered by AlphaFold 3 integration with real-time structural validation</p>
        </div>
      </div>
    </div>
  );
}
