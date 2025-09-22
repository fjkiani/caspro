'use client';

import React from 'react';
import { adaptCommandCenterForHomepage } from '@/data/adapters/platform-adapter';

export default function CommandCenterPage() {
  // Use the migrated Command Center data
  const commandCenterData = adaptCommandCenterForHomepage();

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <section className="text-center mb-20 mt-8">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
            🎯 Command Center: Central Nervous System
          </h1>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto mb-4">
            {commandCenterData.content.about.oneLiner}
          </p>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-4">
            {commandCenterData.content.about.coreConcept}
          </p>
          <p className="text-base text-purple-300 max-w-2xl mx-auto">
            {commandCenterData.content.about.mission}
          </p>
        </section>

        {/* Real KPIs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Live Performance Metrics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commandCenterData.kpis.map((kpi, idx) => (
              <div key={idx} className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{kpi.value}</div>
                <div className="text-lg font-semibold text-slate-300 mb-2">{kpi.label}</div>
                {kpi.delta && (
                  <div className={`text-sm ${kpi.delta > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {kpi.delta > 0 ? '+' : ''}{kpi.delta}%
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Kill Chain Status */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">In Silico Kill Chain</h2>
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              {commandCenterData.killChain.states.map((state, idx) => (
                <div key={state.id} className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center text-white font-bold ${
                    state.status === 'done' ? 'bg-green-500' :
                    state.status === 'running' ? 'bg-blue-500' :
                    state.status === 'queued' ? 'bg-yellow-500' :
                    'bg-gray-500'
                  }`}>
                    {state.status === 'done' ? '✓' : 
                     state.status === 'running' ? '⟳' :
                     state.status === 'queued' ? '⏳' : '○'}
                  </div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">{state.name}</h3>
                  <p className="text-xs text-slate-400">{state.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Active Runs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Active Runs</h2>
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
            <div className="space-y-4">
              {commandCenterData.runs.map((run, idx) => (
                <div key={run.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${
                      run.status === 'running' ? 'bg-blue-400' :
                      run.status === 'done' ? 'bg-green-400' :
                      run.status === 'queued' ? 'bg-yellow-400' :
                      'bg-red-400'
                    }`}></div>
                    <div>
                      <div className="font-semibold text-slate-300">{run.id}</div>
                      <div className="text-sm text-slate-400">Engine: {run.engine}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-300 capitalize">{run.status}</div>
                    {run.startedAt && (
                      <div className="text-xs text-slate-400">Started: {run.startedAt}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Evidence Items */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Evidence Aggregation</h2>
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
            <div className="space-y-4">
              {commandCenterData.evidence.map((evidence, idx) => (
                <div key={evidence.id} className="flex items-start gap-4 p-4 bg-slate-700 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    evidence.type === 'score' ? 'bg-orange-500' :
                    evidence.type === 'design' ? 'bg-blue-500' :
                    'bg-green-500'
                  }`}>
                    {evidence.type === 'score' ? 'S' :
                     evidence.type === 'design' ? 'D' : 'ST'}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-300 mb-1">{evidence.id}</div>
                    <div className="text-slate-400">{evidence.summary}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* API Endpoints */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Campaign Management API</h2>
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
            <p className="text-slate-300 mb-6 text-center">{commandCenterData.apiEndpoints.description}</p>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(commandCenterData.apiEndpoints.campaigns).map(([key, endpoint]) => (
                <div key={key} className="bg-slate-700 p-4 rounded-lg">
                  <div className="font-mono text-purple-400 text-sm mb-2">{endpoint}</div>
                  <div className="text-slate-400 text-xs capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Zeta Shield Security */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Zeta Shield Security Architecture</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Human Layer (Okta)</h3>
              <p className="text-slate-300 mb-4">{commandCenterData.zetaShield.humanLayer.description}</p>
              <div className="space-y-2">
                {commandCenterData.zetaShield.humanLayer.roles.map((role, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-slate-300">
                    <span className="text-blue-400 font-mono text-sm mt-1">•</span>
                    <div>
                      <div className="font-semibold">{role.name}</div>
                      <div className="text-sm text-slate-400">{role.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-bold mb-4 text-green-400">Asset Layer (Blockchain)</h3>
              <p className="text-slate-300 mb-4">{commandCenterData.zetaShield.assetLayer.description}</p>
              <div className="space-y-2">
                {commandCenterData.zetaShield.assetLayer.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-slate-300">
                    <span className="text-green-400 font-mono text-sm mt-1">•</span>
                    <div className="text-sm">{feature}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Business Use Cases */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Business Use Cases</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {commandCenterData.businessUseCases.map((useCase, idx) => (
              <div key={useCase.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h3 className="text-xl font-bold mb-4 text-purple-400">{useCase.title}</h3>
                <p className="text-slate-300 mb-4">{useCase.description}</p>
                <div className="text-sm text-green-400 font-semibold">{useCase.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Control */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">CrisPRO Studio Mission Control</h2>
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
            <h3 className="text-2xl font-bold mb-6 text-center">{commandCenterData.missionControl.name}</h3>
            <p className="text-slate-300 mb-6 text-center">{commandCenterData.missionControl.description}</p>
            <div className="grid md:grid-cols-2 gap-4">
              {commandCenterData.missionControl.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 text-slate-300">
                  <span className="text-purple-400 font-mono text-sm mt-1">•</span>
                  <div className="text-sm">{feature}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Provenance */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">System Provenance</h2>
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-slate-300">Model Information</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Model:</strong> {commandCenterData.provenance.model}</div>
                  <div><strong>Version:</strong> {commandCenterData.provenance.modelVersion}</div>
                  <div><strong>Scorer:</strong> {commandCenterData.provenance.scorer}</div>
                  <div><strong>Scorer Version:</strong> {commandCenterData.provenance.scorerVersion}</div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-slate-300">Run Information</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Seed:</strong> {commandCenterData.provenance.seed}</div>
                  <div><strong>Created:</strong> {new Date(commandCenterData.provenance.createdAt).toLocaleString()}</div>
                  <div><strong>Commit:</strong> {commandCenterData.provenance.commit}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-16 text-center text-slate-400">
          <p>Powered by multi-engine orchestration with complete audit trails</p>
        </div>
      </div>
    </div>
  );
}