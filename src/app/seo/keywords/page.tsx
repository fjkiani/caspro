'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { CRISPRO_KEYWORDS, KEYWORD_STATS, KEYWORD_CATEGORIES, Keyword } from '@/data/seo/crispro-keywords';
import { generateKeywordGapReport, calculateOpportunityScore } from '@/lib/seo/keywordEngine';

type SortKey = 'monthlyVolume' | 'difficulty' | 'crispro_relevance' | 'opportunity';
type FilterPriority = 'all' | 'critical' | 'high' | 'medium' | 'low';
type FilterCategory = 'all' | string;

export default function KeywordsPage() {
  const [sortKey, setSortKey] = useState<SortKey>('opportunity');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [filterPriority, setFilterPriority] = useState<FilterPriority>('all');
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const [filterGapsOnly, setFilterGapsOnly] = useState(false);
  const [search, setSearch] = useState('');

  const report = generateKeywordGapReport();

  const filtered = useMemo(() => {
    let kws = [...CRISPRO_KEYWORDS];

    if (search) {
      kws = kws.filter(k => k.keyword.toLowerCase().includes(search.toLowerCase()));
    }
    if (filterPriority !== 'all') {
      kws = kws.filter(k => k.priority === filterPriority);
    }
    if (filterCategory !== 'all') {
      kws = kws.filter(k => k.category === filterCategory);
    }
    if (filterGapsOnly) {
      kws = kws.filter(k => k.content_gap);
    }

    kws.sort((a, b) => {
      let valA: number, valB: number;
      if (sortKey === 'opportunity') {
        valA = calculateOpportunityScore(a);
        valB = calculateOpportunityScore(b);
      } else {
        valA = a[sortKey] as number;
        valB = b[sortKey] as number;
      }
      return sortDir === 'desc' ? valB - valA : valA - valB;
    });

    return kws;
  }, [search, filterPriority, filterCategory, filterGapsOnly, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'desc' ? 'asc' : 'desc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const difficultyColor = (d: number) =>
    d < 25 ? 'text-green-400' : d < 45 ? 'text-yellow-400' : d < 65 ? 'text-orange-400' : 'text-red-400';

  const intentBadge = (intent: Keyword['intent']) => {
    const map = {
      commercial: 'bg-blue-900/40 text-blue-400',
      transactional: 'bg-green-900/40 text-green-400',
      informational: 'bg-gray-800 text-gray-400',
      navigational: 'bg-purple-900/40 text-purple-400',
    };
    return map[intent];
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Link href="/seo" className="hover:text-white">SEO</Link>
            <span>/</span>
            <span className="text-white">Keywords</span>
          </div>
          <h1 className="text-2xl font-bold">Keyword Intelligence</h1>
          <p className="text-gray-400 text-sm mt-1">
            {KEYWORD_STATS.total} keywords tracked · {KEYWORD_STATS.notRanking} not ranking ·{' '}
            {(KEYWORD_STATS.totalMonthlyVolume / 1000).toFixed(0)}K monthly opportunity
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-6 space-y-6">

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Quick Wins', value: report.quick_wins.length, color: 'text-green-400', desc: 'KD < 35, relevance ≥ 9' },
            { label: 'Critical Gaps', value: report.critical_gaps.length, color: 'text-red-400', desc: 'Must rank immediately' },
            { label: 'Avg Difficulty', value: KEYWORD_STATS.avgDifficulty, color: 'text-yellow-400', desc: 'Across all keywords' },
            { label: 'Total Volume', value: `${(KEYWORD_STATS.totalMonthlyVolume / 1000).toFixed(0)}K`, color: 'text-blue-400', desc: 'Monthly searches' },
          ].map(stat => (
            <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-white text-sm font-medium mt-1">{stat.label}</p>
              <p className="text-gray-500 text-xs mt-0.5">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Search keywords..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-gray-500 w-64"
          />

          <select
            value={filterPriority}
            onChange={e => setFilterPriority(e.target.value as FilterPriority)}
            className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none"
          >
            <option value="all">All priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none"
          >
            <option value="all">All categories</option>
            {KEYWORD_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filterGapsOnly}
              onChange={e => setFilterGapsOnly(e.target.checked)}
              className="rounded"
            />
            <span className="text-gray-400 text-sm">Content gaps only</span>
          </label>

          <span className="text-gray-500 text-sm ml-auto">{filtered.length} keywords</span>
        </div>

        {/* Keyword Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-4 py-3 text-gray-400 font-medium">Keyword</th>
                <th
                  className="text-right px-4 py-3 text-gray-400 font-medium cursor-pointer hover:text-white"
                  onClick={() => toggleSort('monthlyVolume')}
                >
                  Volume {sortKey === 'monthlyVolume' ? (sortDir === 'desc' ? '↓' : '↑') : ''}
                </th>
                <th
                  className="text-right px-4 py-3 text-gray-400 font-medium cursor-pointer hover:text-white"
                  onClick={() => toggleSort('difficulty')}
                >
                  KD {sortKey === 'difficulty' ? (sortDir === 'desc' ? '↓' : '↑') : ''}
                </th>
                <th className="text-center px-4 py-3 text-gray-400 font-medium">Intent</th>
                <th
                  className="text-right px-4 py-3 text-gray-400 font-medium cursor-pointer hover:text-white"
                  onClick={() => toggleSort('crispro_relevance')}
                >
                  Relevance {sortKey === 'crispro_relevance' ? (sortDir === 'desc' ? '↓' : '↑') : ''}
                </th>
                <th
                  className="text-right px-4 py-3 text-gray-400 font-medium cursor-pointer hover:text-white"
                  onClick={() => toggleSort('opportunity')}
                >
                  Opp Score {sortKey === 'opportunity' ? (sortDir === 'desc' ? '↓' : '↑') : ''}
                </th>
                <th className="text-center px-4 py-3 text-gray-400 font-medium">Rank</th>
                <th className="text-center px-4 py-3 text-gray-400 font-medium">Priority</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(kw => (
                <tr key={kw.keyword} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-white font-medium">{kw.keyword}</p>
                      <p className="text-gray-500 text-xs">{kw.category}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-white">
                    {kw.monthlyVolume.toLocaleString()}
                  </td>
                  <td className={`px-4 py-3 text-right font-semibold ${difficultyColor(kw.difficulty)}`}>
                    {kw.difficulty}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${intentBadge(kw.intent)}`}>
                      {kw.intent}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-3 rounded-sm ${i < kw.crispro_relevance ? 'bg-blue-500' : 'bg-gray-700'}`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-white font-bold">{calculateOpportunityScore(kw)}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {kw.crispro_current_rank !== null ? (
                      <span className="text-green-400 font-semibold">#{kw.crispro_current_rank}</span>
                    ) : (
                      <span className="text-gray-600">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      kw.priority === 'critical' ? 'bg-red-900/40 text-red-400' :
                      kw.priority === 'high' ? 'bg-orange-900/40 text-orange-400' :
                      kw.priority === 'medium' ? 'bg-yellow-900/40 text-yellow-400' :
                      'bg-gray-800 text-gray-500'
                    }`}>
                      {kw.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Wins Callout */}
        <div className="bg-green-950/20 border border-green-800/30 rounded-xl p-6">
          <h3 className="text-green-400 font-semibold mb-3">
            {report.quick_wins.length} Quick Win Keywords — Start Here
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            These keywords have difficulty &lt; 35, CrisPRO relevance ≥ 9, and no current ranking.
            Publishing targeted content for these can achieve page 1 rankings within 4-8 weeks.
          </p>
          <div className="flex flex-wrap gap-2">
            {report.quick_wins.slice(0, 8).map(kw => (
              <span key={kw.keyword} className="bg-green-900/20 border border-green-800/30 text-green-300 text-xs px-3 py-1.5 rounded-full">
                {kw.keyword} · KD {kw.difficulty}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
