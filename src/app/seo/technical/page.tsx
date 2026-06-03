'use client';

import Link from 'next/link';
import { generateMockTechnicalAudit } from '@/lib/seo/technicalSeoAudit';

export default function TechnicalPage() {
  const audit = generateMockTechnicalAudit('crispro.ai');
  const vitals = audit.core_web_vitals;

  const vitalStatus = (value: number, good: number, poor: number) =>
    value <= good ? 'good' : value <= poor ? 'needs-improvement' : 'poor';

  const vitalColor = (status: string) =>
    status === 'good' ? 'text-green-400' :
    status === 'needs-improvement' ? 'text-yellow-400' :
    'text-red-400';

  const vitalBg = (status: string) =>
    status === 'good' ? 'bg-green-900/20 border-green-800/30' :
    status === 'needs-improvement' ? 'bg-yellow-900/20 border-yellow-800/30' :
    'bg-red-900/20 border-red-800/30';

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-gray-800 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Link href="/seo" className="hover:text-white">SEO</Link>
            <span>/</span>
            <span className="text-white">Technical Audit</span>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">Technical SEO Audit</h1>
              <p className="text-gray-400 text-sm mt-1">
                crispro.ai · Audited: {new Date(audit.audited_at).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-sm">Overall Score</p>
              <p className={`text-5xl font-bold mt-1 ${
                audit.overall_score >= 70 ? 'text-green-400' :
                audit.overall_score >= 50 ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {audit.overall_score}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-6 space-y-6">

        {/* Core Web Vitals */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Core Web Vitals</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'LCP', value: vitals.lcp, unit: 'ms', good: 2500, poor: 4000, desc: 'Largest Contentful Paint' },
              { label: 'CLS', value: vitals.cls, unit: '', good: 0.1, poor: 0.25, desc: 'Cumulative Layout Shift' },
              { label: 'FCP', value: vitals.fcp, unit: 'ms', good: 1800, poor: 3000, desc: 'First Contentful Paint' },
              { label: 'TTFB', value: vitals.ttfb, unit: 'ms', good: 800, poor: 1800, desc: 'Time to First Byte' },
            ].map(vital => {
              const status = vitalStatus(vital.value, vital.good, vital.poor);
              return (
                <div key={vital.label} className={`border rounded-xl p-5 ${vitalBg(status)}`}>
                  <p className="text-gray-400 text-xs">{vital.desc}</p>
                  <p className={`text-3xl font-bold mt-2 ${vitalColor(status)}`}>
                    {vital.value}{vital.unit}
                  </p>
                  <p className="text-gray-400 text-sm font-semibold mt-1">{vital.label}</p>
                  <p className={`text-xs mt-1 capitalize ${vitalColor(status)}`}>
                    {status.replace('-', ' ')}
                  </p>
                  <p className="text-gray-600 text-xs mt-1">Target: ≤{vital.good}{vital.unit}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lighthouse Scores */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Lighthouse Scores</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Performance', score: vitals.performance_score },
              { label: 'Accessibility', score: vitals.accessibility_score },
              { label: 'SEO', score: vitals.seo_score },
              { label: 'Best Practices', score: vitals.best_practices_score },
            ].map(item => (
              <div key={item.label} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <div className="relative w-16 h-16 mx-auto">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1f2937" strokeWidth="3" />
                    <circle
                      cx="18" cy="18" r="15.9" fill="none"
                      stroke={item.score >= 90 ? '#4ade80' : item.score >= 50 ? '#facc15' : '#f87171'}
                      strokeWidth="3"
                      strokeDasharray={`${item.score} 100`}
                    />
                  </svg>
                  <span className={`absolute inset-0 flex items-center justify-center text-sm font-bold ${
                    item.score >= 90 ? 'text-green-400' : item.score >= 50 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {item.score}
                  </span>
                </div>
                <p className="text-gray-400 text-sm text-center mt-3">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Issues */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Issues Found
            <span className="ml-2 text-sm text-gray-500 font-normal">
              {audit.critical_issues.length} critical · {audit.on_page.issues.length} total
            </span>
          </h2>
          <div className="space-y-2">
            {audit.on_page.issues.map((issue, i) => (
              <div key={i} className={`border rounded-xl p-4 ${
                issue.type === 'error' ? 'bg-red-950/20 border-red-800/30' :
                issue.type === 'warning' ? 'bg-yellow-950/20 border-yellow-800/30' :
                'bg-gray-900 border-gray-800'
              }`}>
                <div className="flex items-start gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                    issue.type === 'error' ? 'bg-red-900/50 text-red-400' :
                    issue.type === 'warning' ? 'bg-yellow-900/50 text-yellow-400' :
                    'bg-gray-800 text-gray-400'
                  }`}>
                    {issue.type}
                  </span>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{issue.message}</p>
                    <p className="text-gray-400 text-xs mt-1">Fix: {issue.fix}</p>
                  </div>
                  <span className={`text-xs shrink-0 ${
                    issue.impact === 'high' ? 'text-red-400' :
                    issue.impact === 'medium' ? 'text-yellow-400' :
                    'text-gray-500'
                  }`}>
                    {issue.impact} impact
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Index Coverage */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Google Index Coverage</h2>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-bold text-white">{audit.index_coverage.indexed_pages}</p>
              <p className="text-gray-400 text-sm">Indexed pages</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{audit.index_coverage.estimated_total_pages}</p>
              <p className="text-gray-400 text-sm">Total pages</p>
            </div>
            <div>
              <p className={`text-3xl font-bold ${
                audit.index_coverage.coverage_rate >= 0.8 ? 'text-green-400' : 'text-red-400'
              }`}>
                {Math.round(audit.index_coverage.coverage_rate * 100)}%
              </p>
              <p className="text-gray-400 text-sm">Coverage rate</p>
            </div>
          </div>
          {audit.index_coverage.coverage_rate < 0.8 && (
            <p className="text-yellow-400 text-sm mt-4">
              ⚠ Only {Math.round(audit.index_coverage.coverage_rate * 100)}% of pages are indexed.
              Submit XML sitemap to Google Search Console and fix crawl errors.
            </p>
          )}
        </div>

        {/* Recommendations */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Recommendations</h2>
          <div className="space-y-3">
            {audit.recommendations.map((rec, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${
                    rec.priority === 'critical' ? 'bg-red-900/40 text-red-400' :
                    rec.priority === 'high' ? 'bg-orange-900/40 text-orange-400' :
                    rec.priority === 'medium' ? 'bg-yellow-900/40 text-yellow-400' :
                    'bg-gray-800 text-gray-400'
                  }`}>
                    {rec.priority}
                  </span>
                  <div className="flex-1">
                    <p className="text-white font-medium">{rec.title}</p>
                    <p className="text-gray-400 text-sm mt-1">{rec.description}</p>
                    <p className="text-gray-500 text-xs mt-2">
                      <span className="text-gray-400">Impact:</span> {rec.estimated_impact}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      <span className="text-gray-400">How:</span> {rec.implementation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
