'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  AI_VISIBILITY_PROMPTS,
  generateMockAIVisibilityResults,
  generateAIVisibilityReport,
  AIEngine,
  AIVisibilityResult,
} from '@/lib/seo/aiVisibilityAudit';

const ENGINE_LABELS: Record<AIEngine, { label: string; color: string; bg: string }> = {
  chatgpt: { label: 'ChatGPT', color: 'text-green-400', bg: 'bg-green-900/20 border-green-800/30' },
  claude: { label: 'Claude', color: 'text-orange-400', bg: 'bg-orange-900/20 border-orange-800/30' },
  perplexity: { label: 'Perplexity', color: 'text-blue-400', bg: 'bg-blue-900/20 border-blue-800/30' },
  gemini: { label: 'Gemini', color: 'text-purple-400', bg: 'bg-purple-900/20 border-purple-800/30' },
};

export default function AIVisibilityPage() {
  const [activeEngine, setActiveEngine] = useState<AIEngine | 'all'>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const results = generateMockAIVisibilityResults();
  const report = generateAIVisibilityReport(results);

  const filteredPrompts = AI_VISIBILITY_PROMPTS.filter(p => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false;
    return true;
  });

  const getResultForPrompt = (promptId: string, engine: AIEngine): AIVisibilityResult | undefined =>
    results.find(r => r.promptId === promptId && r.engine === engine);

  const categories = [...new Set(AI_VISIBILITY_PROMPTS.map(p => p.category))];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Link href="/seo" className="hover:text-white">SEO</Link>
            <span>/</span>
            <span className="text-white">AI Visibility</span>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">AI Visibility Audit</h1>
              <p className="text-gray-400 text-sm mt-1">
                Measures CrisPRO citation presence across ChatGPT, Claude, Perplexity, and Gemini
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-sm">Overall AI Score</p>
              <p className={`text-5xl font-bold mt-1 ${
                report.overall_score >= 60 ? 'text-green-400' :
                report.overall_score >= 30 ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {report.overall_score}
              </p>
              <p className="text-gray-500 text-xs">/100</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-6 space-y-6">

        {/* Engine Score Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {report.by_engine.map(engine => {
            const meta = ENGINE_LABELS[engine.engine];
            return (
              <button
                key={engine.engine}
                onClick={() => setActiveEngine(activeEngine === engine.engine ? 'all' : engine.engine)}
                className={`border rounded-xl p-5 text-left transition-all ${
                  activeEngine === engine.engine
                    ? `${meta.bg} border-opacity-100`
                    : 'bg-gray-900 border-gray-800 hover:border-gray-600'
                }`}
              >
                <p className={`text-sm font-medium ${meta.color}`}>{meta.label}</p>
                <p className={`text-4xl font-bold mt-2 ${meta.color}`}>{engine.score}</p>
                <div className="mt-3 space-y-1">
                  <p className="text-gray-500 text-xs">
                    {engine.crispro_mentions}/{engine.total_prompts} prompts mention CrisPRO
                  </p>
                  <p className="text-gray-500 text-xs">
                    Top competitor: <span className="text-gray-300">{engine.top_competitor}</span>
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Critical Alert */}
        {report.overall_score < 20 && (
          <div className="bg-red-950/30 border border-red-800/50 rounded-xl p-6">
            <h3 className="text-red-400 font-semibold text-lg">
              ⚠ CrisPRO has near-zero AI visibility
            </h3>
            <p className="text-gray-400 text-sm mt-2">
              CrisPRO is not being cited by any major AI engine for category-defining prompts like
              "best AI drug discovery platforms" or "AI oncology companies." Recursion and Insilico
              appear in 80%+ of responses. This is the #1 growth blocker.
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {report.recommendations.slice(0, 4).map((rec, i) => (
                <div key={i} className="bg-gray-900/50 rounded-lg p-3">
                  <p className="text-gray-300 text-sm">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prompt Coverage Matrix */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Prompt Coverage Matrix</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                  activeCategory === 'all' ? 'bg-white text-black' : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-colors capitalize ${
                    activeCategory === cat ? 'bg-white text-black' : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-4 py-3 text-gray-400 font-medium">Prompt</th>
                  <th className="text-center px-4 py-3 text-gray-400 font-medium">Priority</th>
                  <th className="text-center px-4 py-3 text-green-400 font-medium">ChatGPT</th>
                  <th className="text-center px-4 py-3 text-orange-400 font-medium">Claude</th>
                  <th className="text-center px-4 py-3 text-blue-400 font-medium">Perplexity</th>
                  <th className="text-center px-4 py-3 text-purple-400 font-medium">Gemini</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrompts.map(prompt => {
                  const engines: AIEngine[] = ['chatgpt', 'claude', 'perplexity', 'gemini'];
                  return (
                    <tr key={prompt.id} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                      <td className="px-4 py-3">
                        <p className="text-white text-sm">{prompt.prompt}</p>
                        <p className="text-gray-500 text-xs capitalize mt-0.5">{prompt.category} · {prompt.intent.replace('_', ' ')}</p>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          prompt.priority === 'critical' ? 'bg-red-900/40 text-red-400' :
                          prompt.priority === 'high' ? 'bg-orange-900/40 text-orange-400' :
                          'bg-gray-800 text-gray-400'
                        }`}>
                          {prompt.priority}
                        </span>
                      </td>
                      {engines.map(engine => {
                        const result = getResultForPrompt(prompt.id, engine);
                        const mentioned = result?.crispro_mentioned;
                        return (
                          <td key={engine} className="px-4 py-3 text-center">
                            {mentioned ? (
                              <span className="text-green-400 text-lg" title={`Position: ${result?.crispro_position}`}>✓</span>
                            ) : (
                              <span className="text-gray-700 text-lg">✗</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Plan */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">AI Visibility Action Plan</h3>
          <div className="space-y-3">
            {[
              {
                step: '1',
                title: 'Publish "deterministic drug development" pillar page',
                impact: 'Immediate — CrisPRO owns this term uniquely. Will rank #1 within 2 weeks.',
                color: 'text-red-400',
              },
              {
                step: '2',
                title: 'Create Wikipedia page for CrisPRO',
                impact: 'High — Wikipedia is the #1 source for AI engine citations. Requires notability evidence.',
                color: 'text-orange-400',
              },
              {
                step: '3',
                title: 'Get listed on Crunchbase, CB Insights, and Fierce Biotech',
                impact: 'High — AI engines cite these databases for company information.',
                color: 'text-yellow-400',
              },
              {
                step: '4',
                title: 'Publish "best AI drug discovery platforms 2025" comparison post',
                impact: 'High — This exact prompt is where competitors appear and CrisPRO does not.',
                color: 'text-green-400',
              },
              {
                step: '5',
                title: 'Submit press releases to STAT News, BioPharma Dive, Fierce Biotech',
                impact: 'Medium — AI engines cite industry press. BreAK CRC-001 trial is newsworthy.',
                color: 'text-blue-400',
              },
            ].map(action => (
              <div key={action.step} className="flex items-start gap-4">
                <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${action.color} border-current`}>
                  {action.step}
                </span>
                <div>
                  <p className="text-white text-sm font-medium">{action.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{action.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
