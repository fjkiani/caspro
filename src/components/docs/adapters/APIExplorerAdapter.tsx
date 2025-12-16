/**
 * API Explorer Adapter - Bridge DetailedAPIExplorer from src2 to docs format
 * Adapts parsed APIEndpoint data to DetailedAPIExplorer props
 */

'use client';

import React from 'react';
import type { APIEndpoint } from '@/lib/docs/hygraph/types';
import { Code2, Zap, Target, Database } from 'lucide-react';

interface APIExplorerAdapterProps {
  endpoint: APIEndpoint;
  className?: string;
}

/**
 * API Explorer Adapter Component
 * Displays endpoint information in a beautiful format
 */
export function APIExplorerAdapter({ endpoint, className }: APIExplorerAdapterProps) {
  const isOracle = endpoint.category === 'ORACLE_DISCRIMINATIVE';
  const categoryColor = isOracle ? 'blue' : 'purple';
  const categoryLabel = isOracle ? 'Oracle' : 'Forge';

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-6 p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className={`px-3 py-1 rounded-lg text-sm font-semibold ${
            isOracle
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
              : 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
          }`}>
            {categoryLabel}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-1">{endpoint.name}</h1>
            <code className="text-slate-400 font-mono text-sm">{endpoint.method} {endpoint.path}</code>
          </div>
        </div>
        
        {/* Description */}
        <div 
          className="text-slate-300 prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: endpoint.description.html }}
        />
      </div>

      {/* Parameters */}
      {endpoint.parameters && endpoint.parameters.length > 0 && (
        <div className="mb-6 p-6 bg-slate-800/30 border border-slate-700 rounded-xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Database className="w-5 h-5" />
            Parameters
          </h2>
          <div className="space-y-3">
            {endpoint.parameters.map((param, idx) => (
              <div key={idx} className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <code className="text-blue-400 font-mono text-sm">{param.name}</code>
                  <span className="text-slate-500 text-sm">{param.type}</span>
                  {param.required && (
                    <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded">
                      Required
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-sm">{param.description}</p>
                {param.example && (
                  <div className="mt-2 p-2 bg-slate-950 rounded text-xs font-mono text-slate-500">
                    Example: {param.example}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Code Examples */}
      {endpoint.codeExamples && endpoint.codeExamples.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Code Examples
          </h2>
          <div className="space-y-4">
            {endpoint.codeExamples.map((example) => (
              <div key={example.id} className="p-6 bg-slate-900 border border-slate-700 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-300">{example.title}</h3>
                  <span className="px-2 py-1 bg-slate-800 text-slate-400 text-xs rounded uppercase">
                    {example.language}
                  </span>
                </div>
                <pre className="overflow-x-auto">
                  <code className="text-sm text-slate-200 font-mono">{example.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Response Schema */}
      {endpoint.responseSchema && Object.keys(endpoint.responseSchema).length > 0 && (
        <div className="mb-6 p-6 bg-slate-800/30 border border-slate-700 rounded-xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Response Schema
          </h2>
          <div className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
            <pre className="text-sm text-slate-200 font-mono overflow-x-auto">
              <code>{JSON.stringify(endpoint.responseSchema, null, 2)}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Performance Metrics */}
      {endpoint.performanceMetrics && (
        <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Performance Metrics
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {endpoint.performanceMetrics.auroc && (
              <div>
                <div className="text-sm text-slate-400">AUROC</div>
                <div className="text-2xl font-bold text-blue-400">
                  {(endpoint.performanceMetrics.auroc * 100).toFixed(1)}%
                </div>
              </div>
            )}
            {endpoint.performanceMetrics.samples && (
              <div>
                <div className="text-sm text-slate-400">Samples</div>
                <div className="text-2xl font-bold text-purple-400">
                  {endpoint.performanceMetrics.samples.toLocaleString()}
                </div>
              </div>
            )}
            {endpoint.performanceMetrics.benchmark && (
              <div className="col-span-2">
                <div className="text-sm text-slate-400">Benchmark</div>
                <div className="text-lg font-semibold text-slate-300">
                  {endpoint.performanceMetrics.benchmark}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default APIExplorerAdapter;
