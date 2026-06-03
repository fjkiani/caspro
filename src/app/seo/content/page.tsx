'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CONTENT_GAPS, CONTENT_GAP_STATS } from '@/data/seo/content-gaps';
import {
  generateRankedContentPlan,
  generate90DayCalendar,
  expandContentBrief,
  ContentPriorityScore,
} from '@/lib/seo/contentGapAnalyzer';

export default function ContentPage() {
  const [view, setView] = useState<'ranked' | 'calendar' | 'brief'>('ranked');
  const [selectedGap, setSelectedGap] = useState<string | null>(null);

  const ranked = generateRankedContentPlan();
  const calendar = generate90DayCalendar();
  const brief = selectedGap ? expandContentBrief(selectedGap) : null;

  const contentTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      'pillar-page': '📚',
      'comparison-page': '⚖️',
      'landing-page': '🎯',
      'blog-post': '✍️',
      'case-study': '📊',
      'whitepaper': '📄',
      'faq-page': '❓',
      'tool-page': '🔧',
    };
    return icons[type] || '📝';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-gray-800 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Link href="/seo" className="hover:text-white">SEO</Link>
            <span>/</span>
            <span className="text-white">Content Strategy</span>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">Content Strategy</h1>
              <p className="text-gray-400 text-sm mt-1">
                {CONTENT_GAP_STATS.total} content gaps · {CONTENT_GAP_STATS.totalTrafficOpportunity.toLocaleString()} monthly traffic opportunity
              </p>
            </div>
            <div className="flex gap-2">
              {(['ranked', 'calendar', 'brief'] as const).map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`text-sm px-4 py-2 rounded-lg transition-colors capitalize ${
                    view === v ? 'bg-white text-black font-semibold' : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {v === 'brief' ? 'Content Brief' : v === 'ranked' ? 'Priority Queue' : '90-Day Calendar'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-6 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Critical gaps', value: CONTENT_GAP_STATS.critical, color: 'text-red-400' },
            { label: 'High priority', value: CONTENT_GAP_STATS.high, color: 'text-orange-400' },
            { label: 'High AI impact', value: CONTENT_GAP_STATS.highAIImpact, color: 'text-purple-400' },
            { label: 'Traffic opportunity', value: `${(CONTENT_GAP_STATS.totalTrafficOpportunity / 1000).toFixed(0)}K/mo`, color: 'text-green-400' },
          ].map(stat => (
            <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Priority Queue View */}
        {view === 'ranked' && (
          <div className="space-y-3">
            {ranked.map((item: ContentPriorityScore, index: number) => (
              <div
                key={item.gap.id}
                className="bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-xl p-5 cursor-pointer transition-all"
                onClick={() => { setSelectedGap(item.gap.id); setView('brief'); }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-xl shrink-0">
                    {contentTypeIcon(item.gap.contentType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-white font-semibold">{item.gap.title}</p>
                        <p className="text-gray-500 text-xs mt-0.5">
                          {item.gap.recommendedUrl} · {item.gap.contentType.replace('-', ' ')}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-white text-2xl font-bold">{item.score}</p>
                        <p className="text-gray-500 text-xs">priority score</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        item.gap.priority === 'critical' ? 'bg-red-900/40 text-red-400' :
                        item.gap.priority === 'high' ? 'bg-orange-900/40 text-orange-400' :
                        'bg-yellow-900/40 text-yellow-400'
                      }`}>
                        {item.gap.priority}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {item.gap.monthlyTrafficOpportunity.toLocaleString()} visits/mo
                      </span>
                      <span className="text-gray-500 text-xs">KD {item.gap.difficulty}</span>
                      <span className={`text-xs ${
                        item.gap.aiVisibilityImpact === 'high' ? 'text-purple-400' :
                        item.gap.aiVisibilityImpact === 'medium' ? 'text-blue-400' :
                        'text-gray-500'
                      }`}>
                        AI impact: {item.gap.aiVisibilityImpact}
                      </span>
                      <span className="text-gray-500 text-xs">{item.estimated_roi}</span>
                      <span className="text-gray-500 text-xs">~{item.time_to_publish} to write</span>
                    </div>

                    <p className="text-gray-400 text-xs mt-2">{item.rationale}</p>
                  </div>
                </div>

                {/* Score breakdown */}
                <div className="flex gap-4 mt-4 pt-4 border-t border-gray-800">
                  {[
                    { label: 'Traffic', value: item.breakdown.traffic_score, max: 40 },
                    { label: 'AI Visibility', value: item.breakdown.ai_visibility_score, max: 30 },
                    { label: 'Difficulty', value: item.breakdown.difficulty_score, max: 20 },
                    { label: 'Intent', value: item.breakdown.intent_score, max: 10 },
                  ].map(b => (
                    <div key={b.label} className="flex-1">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{b.label}</span>
                        <span>{b.value}/{b.max}</span>
                      </div>
                      <div className="bg-gray-800 rounded-full h-1">
                        <div
                          className="bg-blue-500 h-1 rounded-full"
                          style={{ width: `${(b.value / b.max) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Calendar View */}
        {view === 'calendar' && (
          <div className="space-y-4">
            <p className="text-gray-400 text-sm">
              90-day content calendar — 1 piece per week, ordered by priority score
            </p>
            {calendar.map(week => (
              <div key={week.week} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-gray-800 text-gray-300 text-sm font-semibold px-3 py-1 rounded-full">
                    Week {week.week}
                  </span>
                  <span className="text-gray-500 text-sm">{week.items[0]?.deadline}</span>
                </div>
                {week.items.map(item => (
                  <div
                    key={item.gap.id}
                    className="flex items-center gap-4 cursor-pointer hover:bg-gray-800/50 rounded-lg p-2 -mx-2 transition-colors"
                    onClick={() => { setSelectedGap(item.gap.id); setView('brief'); }}
                  >
                    <span className="text-2xl">{contentTypeIcon(item.gap.contentType)}</span>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{item.gap.title}</p>
                      <p className="text-gray-500 text-xs">{item.gap.recommendedUrl}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      item.gap.priority === 'critical' ? 'bg-red-900/40 text-red-400' :
                      'bg-orange-900/40 text-orange-400'
                    }`}>
                      {item.gap.priority}
                    </span>
                    <span className="text-gray-400 text-sm font-bold">{item.score}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Content Brief View */}
        {view === 'brief' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <select
                value={selectedGap || ''}
                onChange={e => setSelectedGap(e.target.value)}
                className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none flex-1"
              >
                <option value="">Select a content gap...</option>
                {CONTENT_GAPS.map(g => (
                  <option key={g.id} value={g.id}>{g.title}</option>
                ))}
              </select>
            </div>

            {brief && (
              <div className="space-y-4">
                {/* Meta */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white">{brief.gap.title}</h2>
                  <p className="text-gray-400 text-sm mt-1">{brief.gap.recommendedUrl}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {[
                      { label: 'Word count', value: brief.wordCount.toLocaleString() },
                      { label: 'Read time', value: brief.estimatedReadTime },
                      { label: 'Traffic opp', value: `${brief.gap.monthlyTrafficOpportunity.toLocaleString()}/mo` },
                      { label: 'Difficulty', value: `KD ${brief.gap.difficulty}` },
                    ].map(s => (
                      <div key={s.label} className="bg-gray-800 rounded-lg p-3">
                        <p className="text-white font-semibold">{s.value}</p>
                        <p className="text-gray-500 text-xs">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SEO Meta */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">SEO Meta</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Title tag ({brief.seoTitle.length} chars)</p>
                      <p className="text-white text-sm bg-gray-800 rounded px-3 py-2">{brief.seoTitle}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Meta description ({brief.metaDescription.length} chars)</p>
                      <p className="text-white text-sm bg-gray-800 rounded px-3 py-2">{brief.metaDescription}</p>
                    </div>
                  </div>
                </div>

                {/* Target Keywords */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3">Target Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {brief.targetKeywords.map((kw, i) => (
                      <span key={kw} className={`text-xs px-3 py-1.5 rounded-full ${
                        i === 0 ? 'bg-blue-900/40 text-blue-300 border border-blue-800/50' : 'bg-gray-800 text-gray-400'
                      }`}>
                        {i === 0 && <span className="text-blue-500 mr-1">★</span>}
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content Outline */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3">Content Outline</h3>
                  <ol className="space-y-2">
                    {brief.outline.map((section, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="text-gray-600 font-mono w-5 shrink-0">{i + 1}.</span>
                        <span className="text-gray-300">{section}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Must Include */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3">Must Include</h3>
                  <ul className="space-y-2">
                    {brief.mustInclude.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-yellow-400 shrink-0">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="bg-blue-950/20 border border-blue-800/30 rounded-xl p-4">
                  <p className="text-blue-400 text-sm font-semibold">Primary CTA</p>
                  <p className="text-white text-sm mt-1">{brief.cta}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
