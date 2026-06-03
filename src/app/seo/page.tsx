'use client';

/**
 * /seo — CrisPRO SEO Intelligence Dashboard
 *
 * Internal tool. Not public-facing.
 * Shows: keyword gap score, competitor matrix, content calendar, AI visibility score, technical health.
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { generateKeywordGapReport, groupKeywordsByCluster } from '@/lib/seo/keywordEngine';
import { getContentGapSummary } from '@/lib/seo/contentGapAnalyzer';
import { generateMockAIVisibilityResults, generateAIVisibilityReport } from '@/lib/seo/aiVisibilityAudit';
import { generateMockTechnicalAudit } from '@/lib/seo/technicalSeoAudit';
import { COMPETITOR_STATS } from '@/data/seo/competitors';
import { KEYWORD_STATS } from '@/data/seo/crispro-keywords';

// ── Sub-components ────────────────────────────────────────────────────────────

function ScoreCard({
  label,
  score,
  max = 100,
  color,
  href,
  subtitle,
}: {
  label: string;
  score: number;
  max?: number;
  color: string;
  href: string;
  subtitle: string;
}) {
  const pct = Math.round((score / max) * 100);
  return (
    <Link href={href} className="block group">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-all">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-gray-400 text-sm font-medium">{label}</p>
            <p className="text-gray-500 text-xs mt-1">{subtitle}</p>
          </div>
          <span className={`text-3xl font-bold ${color}`}>{score}</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${color.replace('text-', 'bg-')}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-gray-600 text-xs mt-2 group-hover:text-gray-400 transition-colors">
          View details →
        </p>
      </div>
    </Link>
  );
}

function StatBadge({ label, value, highlight = false }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div className={`rounded-lg p-4 ${highlight ? 'bg-yellow-900/20 border border-yellow-700/30' : 'bg-gray-900 border border-gray-800'}`}>
      <p className={`text-2xl font-bold ${highlight ? 'text-yellow-400' : 'text-white'}`}>{value}</p>
      <p className="text-gray-400 text-sm mt-1">{label}</p>
    </div>
  );
}

function QuickWinRow({ keyword, volume, difficulty, relevance }: {
  keyword: string;
  volume: number;
  difficulty: number;
  relevance: number;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
      <div className="flex-1">
        <p className="text-white text-sm font-medium">{keyword}</p>
        <p className="text-gray-500 text-xs">{volume.toLocaleString()} searches/mo</p>
      </div>
      <div className="flex items-center gap-3">
        <span className={`text-xs px-2 py-1 rounded-full ${
          difficulty < 25 ? 'bg-green-900/40 text-green-400' :
          difficulty < 40 ? 'bg-yellow-900/40 text-yellow-400' :
          'bg-red-900/40 text-red-400'
        }`}>
          KD {difficulty}
        </span>
        <span className="text-xs text-gray-400">Rel {relevance}/10</span>
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────

export default function SEODashboard() {
  const [loading, setLoading] = useState(true);

  // Compute all stats from seed data (no API calls needed for dashboard overview)
  const keywordReport = generateKeywordGapReport();
  const contentSummary = getContentGapSummary();
  const aiResults = generateMockAIVisibilityResults();
  const aiReport = generateAIVisibilityReport(aiResults);
  const techAudit = generateMockTechnicalAudit('crispro.ai');
  const clusters = groupKeywordsByCluster();

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gray-400">Loading SEO Intelligence...</div>
      </div>
    );
  }

  const overallSEOScore = Math.round(
    (aiReport.overall_score * 0.35) +
    (techAudit.overall_score * 0.25) +
    (Math.max(0, 100 - KEYWORD_STATS.avgDifficulty) * 0.20) +
    (contentSummary.ai_prompt_coverage * 100 * 0.20)
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">SEO Intelligence Platform</h1>
            <p className="text-gray-400 text-sm mt-1">
              CrisPRO · Internal Tool · Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 bg-gray-900 border border-gray-700 px-3 py-1.5 rounded-full">
              Seed data mode — add API keys to enable live data
            </span>
            <Link
              href="/seo/keywords"
              className="bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Run Full Audit
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">

        {/* Overall Score Banner */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Overall SEO Health Score</h2>
              <div className="flex items-end gap-4 mt-2">
                <span className={`text-7xl font-bold ${
                  overallSEOScore >= 60 ? 'text-green-400' :
                  overallSEOScore >= 40 ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {overallSEOScore}
                </span>
                <span className="text-gray-500 text-2xl mb-2">/100</span>
              </div>
              <p className="text-gray-400 mt-2">
                {overallSEOScore < 30
                  ? 'Critical: CrisPRO has minimal SEO presence. Immediate action required.'
                  : overallSEOScore < 60
                  ? 'Below average: Significant gaps vs competitors. Content strategy needed.'
                  : 'Good: On track. Continue executing content plan.'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-sm">Competitor benchmark</p>
              <p className="text-white text-3xl font-bold mt-1">72</p>
              <p className="text-gray-500 text-sm">Recursion avg score</p>
            </div>
          </div>
        </div>

        {/* Module Score Cards */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Intelligence Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <ScoreCard
              label="Keyword Coverage"
              score={Math.round((1 - KEYWORD_STATS.notRanking / KEYWORD_STATS.total) * 100)}
              color="text-blue-400"
              href="/seo/keywords"
              subtitle={`${KEYWORD_STATS.notRanking} gaps found`}
            />
            <ScoreCard
              label="Competitor Gap"
              score={35}
              color="text-purple-400"
              href="/seo/competitors"
              subtitle={`vs ${COMPETITOR_STATS.total} competitors`}
            />
            <ScoreCard
              label="Content Coverage"
              score={Math.round(contentSummary.ai_prompt_coverage * 100)}
              color="text-green-400"
              href="/seo/content"
              subtitle={`${contentSummary.notStarted} pages needed`}
            />
            <ScoreCard
              label="Technical Health"
              score={techAudit.overall_score}
              color="text-orange-400"
              href="/seo/technical"
              subtitle={`${techAudit.critical_issues.length} critical issues`}
            />
            <ScoreCard
              label="AI Visibility"
              score={aiReport.overall_score}
              color="text-red-400"
              href="/seo/ai-visibility"
              subtitle={`${aiReport.critical_gaps.length} critical gaps`}
            />
          </div>
        </div>

        {/* Key Stats */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Key Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <StatBadge label="Keywords tracked" value={KEYWORD_STATS.total} />
            <StatBadge label="Not ranking" value={KEYWORD_STATS.notRanking} highlight />
            <StatBadge label="Critical gaps" value={KEYWORD_STATS.critical} highlight />
            <StatBadge label="Monthly opportunity" value={`${(KEYWORD_STATS.totalMonthlyVolume / 1000).toFixed(0)}K`} />
            <StatBadge label="Content gaps" value={contentSummary.notStarted} highlight />
            <StatBadge label="AI prompt coverage" value={`${Math.round(contentSummary.ai_prompt_coverage * 100)}%`} highlight />
          </div>
        </div>

        {/* Quick Wins + Content Plan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Quick Win Keywords */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Quick Win Keywords</h3>
              <Link href="/seo/keywords" className="text-blue-400 text-sm hover:text-blue-300">
                View all →
              </Link>
            </div>
            <p className="text-gray-500 text-xs mb-4">
              High relevance · Low difficulty · Not yet ranking
            </p>
            <div>
              {keywordReport.quick_wins.slice(0, 6).map(kw => (
                <QuickWinRow
                  key={kw.keyword}
                  keyword={kw.keyword}
                  volume={kw.monthlyVolume}
                  difficulty={kw.difficulty}
                  relevance={kw.crispro_relevance}
                />
              ))}
            </div>
          </div>

          {/* Content Priority Queue */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Content Priority Queue</h3>
              <Link href="/seo/content" className="text-green-400 text-sm hover:text-green-300">
                View calendar →
              </Link>
            </div>
            <p className="text-gray-500 text-xs mb-4">
              Ranked by: traffic opportunity × AI visibility impact × difficulty
            </p>
            <div className="space-y-3">
              {contentSummary.ranked_plan.slice(0, 5).map((item, i) => (
                <div key={item.gap.id} className="flex items-start gap-3">
                  <span className="text-gray-600 text-sm font-mono w-5 shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{item.gap.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        item.gap.priority === 'critical' ? 'bg-red-900/40 text-red-400' :
                        'bg-yellow-900/40 text-yellow-400'
                      }`}>
                        {item.gap.priority}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {item.gap.monthlyTrafficOpportunity.toLocaleString()} visits/mo
                      </span>
                      <span className="text-gray-500 text-xs">
                        KD {item.gap.difficulty}
                      </span>
                    </div>
                  </div>
                  <span className="text-white font-bold text-sm shrink-0">{item.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Visibility Alert */}
        {aiReport.overall_score < 30 && (
          <div className="bg-red-950/30 border border-red-800/50 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-red-900/50 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-red-400 text-lg">⚠</span>
              </div>
              <div>
                <h3 className="text-red-400 font-semibold">Critical: Near-Zero AI Visibility</h3>
                <p className="text-gray-400 text-sm mt-1">
                  CrisPRO is not being cited by ChatGPT, Claude, or Perplexity for any of the{' '}
                  {aiReport.critical_gaps.length} critical prompts tested. Competitors (Recursion, Insilico)
                  appear in 88% of AI responses for "best AI drug discovery platforms."
                </p>
                <div className="flex gap-3 mt-4">
                  <Link
                    href="/seo/ai-visibility"
                    className="bg-red-900/50 hover:bg-red-900 text-red-300 text-sm px-4 py-2 rounded-lg transition-colors"
                  >
                    View AI Visibility Report
                  </Link>
                  <Link
                    href="/seo/content"
                    className="bg-gray-800 hover:bg-gray-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
                  >
                    Start Content Plan
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Keyword Clusters */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Keyword Clusters</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Object.entries(clusters).map(([category, keywords]) => (
              <div key={category} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                <p className="text-white text-sm font-medium">{category}</p>
                <p className="text-gray-400 text-2xl font-bold mt-1">{keywords.length}</p>
                <p className="text-gray-600 text-xs">keywords</p>
                <p className="text-gray-500 text-xs mt-2">
                  {keywords.filter(k => k.crispro_current_rank === null).length} not ranking
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="border-t border-gray-800 pt-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { href: '/seo/keywords', label: 'Keyword Intelligence', icon: '🔍' },
              { href: '/seo/competitors', label: 'Competitor Analysis', icon: '⚔️' },
              { href: '/seo/content', label: 'Content Strategy', icon: '📝' },
              { href: '/seo/technical', label: 'Technical Audit', icon: '⚙️' },
              { href: '/seo/ai-visibility', label: 'AI Visibility', icon: '🤖' },
            ].map(nav => (
              <Link
                key={nav.href}
                href={nav.href}
                className="bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-600 rounded-xl p-4 text-center transition-all"
              >
                <div className="text-2xl mb-2">{nav.icon}</div>
                <p className="text-white text-sm font-medium">{nav.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
