'use client';

import { useState } from 'react';
import Link from 'next/link';
import { COMPETITORS, getCompetitorsByAIVisibility } from '@/data/seo/competitors';

export default function CompetitorsPage() {
  const [selected, setSelected] = useState<string | null>(null);

  const ranked = getCompetitorsByAIVisibility();
  const selectedComp = selected ? COMPETITORS.find(c => c.id === selected) : null;

  const metricBar = (value: number, max: number, color: string) => (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-800 rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full ${color}`}
          style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
        />
      </div>
      <span className="text-white text-xs w-8 text-right">{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-gray-800 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Link href="/seo" className="hover:text-white">SEO</Link>
            <span>/</span>
            <span className="text-white">Competitors</span>
          </div>
          <h1 className="text-2xl font-bold">Competitor Analysis</h1>
          <p className="text-gray-400 text-sm mt-1">
            SEO benchmarking vs Recursion, Insilico Medicine, Isomorphic Labs, Generate Biomedicines, Exscientia
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-6 space-y-6">

        {/* Comparison Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-white font-semibold">SEO Metrics Comparison</h2>
            <p className="text-gray-500 text-xs mt-1">CrisPRO baseline: DA 0, DR 0, Traffic 0 (not yet established)</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Company</th>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Domain Authority</th>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Organic Traffic</th>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Keywords</th>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Backlinks</th>
                  <th className="text-center px-6 py-3 text-gray-400 font-medium">AI Visibility</th>
                  <th className="text-center px-6 py-3 text-gray-400 font-medium">Threat</th>
                </tr>
              </thead>
              <tbody>
                {/* CrisPRO row */}
                <tr className="border-b border-gray-800 bg-yellow-900/10">
                  <td className="px-6 py-4">
                    <p className="text-yellow-400 font-bold">CrisPRO</p>
                    <p className="text-gray-500 text-xs">crispro.ai · Baseline</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {metricBar(0, 100, 'bg-yellow-500')}
                      <p className="text-gray-600 text-xs">Not established</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600 text-sm">~0</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600 text-sm">~0</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600 text-sm">~0</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-red-400 font-bold text-lg">0</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-500 text-xs">—</span>
                  </td>
                </tr>

                {ranked.map(comp => (
                  <tr
                    key={comp.id}
                    className={`border-b border-gray-800/50 hover:bg-gray-800/30 cursor-pointer transition-colors ${
                      selected === comp.id ? 'bg-gray-800/50' : ''
                    }`}
                    onClick={() => setSelected(selected === comp.id ? null : comp.id)}
                  >
                    <td className="px-6 py-4">
                      <p className="text-white font-medium">{comp.name}</p>
                      <p className="text-gray-500 text-xs">{comp.domain}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {metricBar(comp.seo.domainAuthority, 100, 'bg-blue-500')}
                        <p className="text-gray-500 text-xs">Moz DA {comp.seo.domainAuthority}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white text-sm">{(comp.seo.monthlyOrganicTraffic / 1000).toFixed(0)}K</p>
                      <p className="text-gray-500 text-xs">visits/mo</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white text-sm">{(comp.seo.organicKeywords / 1000).toFixed(1)}K</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white text-sm">{(comp.seo.backlinks / 1000).toFixed(0)}K</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`font-bold text-lg ${
                        comp.aiVisibility.overallScore >= 70 ? 'text-red-400' :
                        comp.aiVisibility.overallScore >= 50 ? 'text-orange-400' :
                        'text-yellow-400'
                      }`}>
                        {comp.aiVisibility.overallScore}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        comp.seo.domainAuthority > 60 ? 'bg-red-900/40 text-red-400' :
                        comp.seo.domainAuthority > 45 ? 'bg-orange-900/40 text-orange-400' :
                        'bg-yellow-900/40 text-yellow-400'
                      }`}>
                        {comp.seo.domainAuthority > 60 ? 'High' : comp.seo.domainAuthority > 45 ? 'Medium' : 'Low'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Competitor Detail */}
        {selectedComp && (
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">{selectedComp.name}</h2>
                <p className="text-gray-400 text-sm mt-1">{selectedComp.description}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white text-xl">✕</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weaknesses */}
              <div>
                <h3 className="text-green-400 font-semibold mb-3">Their Weaknesses (CrisPRO Opportunities)</h3>
                <ul className="space-y-2">
                  {selectedComp.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Top Keywords */}
              <div>
                <h3 className="text-blue-400 font-semibold mb-3">Their Top Keywords (Steal Opportunities)</h3>
                <div className="space-y-2">
                  {selectedComp.topKeywords.map(kw => (
                    <div key={kw.keyword} className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">{kw.keyword}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500">#{kw.position}</span>
                        <span className="text-gray-400">{kw.volume.toLocaleString()}/mo</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CrisPRO Advantage */}
            <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4">
              <h3 className="text-yellow-400 font-semibold mb-2">CrisPRO Advantage vs {selectedComp.name}</h3>
              <p className="text-gray-300 text-sm">{selectedComp.crispro_advantage}</p>
            </div>

            {/* AI Visibility */}
            <div>
              <h3 className="text-white font-semibold mb-3">Their AI Visibility</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(['chatgpt', 'claude', 'perplexity', 'gemini'] as const).map(engine => {
                  const level = selectedComp.aiVisibility[`${engine}Mentions` as keyof typeof selectedComp.aiVisibility] as string;
                  return (
                    <div key={engine} className="bg-gray-800 rounded-lg p-3 text-center">
                      <p className="text-gray-400 text-xs capitalize">{engine}</p>
                      <p className={`text-sm font-semibold mt-1 capitalize ${
                        level === 'high' ? 'text-red-400' :
                        level === 'medium' ? 'text-orange-400' :
                        level === 'low' ? 'text-yellow-400' :
                        'text-gray-600'
                      }`}>
                        {level}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Gap Summary */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">CrisPRO vs Competitor Gap Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-red-400 text-4xl font-bold">62</p>
              <p className="text-gray-400 text-sm mt-1">Avg competitor DA</p>
              <p className="text-gray-600 text-xs">CrisPRO: 0</p>
            </div>
            <div className="text-center">
              <p className="text-red-400 text-4xl font-bold">26K</p>
              <p className="text-gray-400 text-sm mt-1">Avg competitor traffic</p>
              <p className="text-gray-600 text-xs">CrisPRO: ~0</p>
            </div>
            <div className="text-center">
              <p className="text-red-400 text-4xl font-bold">71</p>
              <p className="text-gray-400 text-sm mt-1">Avg AI visibility score</p>
              <p className="text-gray-600 text-xs">CrisPRO: ~0</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-4 text-center">
            CrisPRO is starting from zero. The gap is large but closeable — competitors have weak oncology-specific content.
          </p>
        </div>
      </div>
    </div>
  );
}
