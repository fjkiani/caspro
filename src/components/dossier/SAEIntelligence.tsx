'use client';

import React, { useState } from 'react';
import { Layers, TrendingDown, Pause, Play } from 'lucide-react';
import { SAEIntelligence as SAEIntelligenceData } from '@/data/dossier/types';
import { SAEFeatureVisualization } from '@/components/evidence/SAEFeatureVisualization';

interface SAEIntelligenceProps {
  data: SAEIntelligenceData;
}

const SAEIntelligence: React.FC<SAEIntelligenceProps> = ({ data }) => {
  const [showSAEAnimation, setShowSAEAnimation] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">{data.title}</h3>
          <p className="text-slate-600">{data.subtitle}</p>
        </div>
        <button
          onClick={() => setShowSAEAnimation(!showSAEAnimation)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          {showSAEAnimation ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {showSAEAnimation ? 'Pause' : 'Animate'} Features
        </button>
      </div>

      {/* SAE Feature Visualization */}
      <div className="bg-slate-50 rounded-xl p-6">
        <SAEFeatureVisualization />
      </div>

      {/* Feature Attribution Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            Active SAE Features ({data.totalFeatures} total)
          </h4>
          <div className="space-y-3">
            {data.activeFeatures.map((feature) => (
              <div key={feature.id} className="p-3 bg-slate-50 rounded-lg border">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-slate-800">{feature.label}</span>
                  <span className="text-sm font-bold text-blue-600">
                    ΔLL: {feature.deltaLL}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-2">{feature.description}</p>
                <p className="text-xs text-purple-700 font-medium">{feature.biologicalImpact}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-red-600" />
            Disruption Score Analysis
          </h4>
          <div className="space-y-4">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {data.disruptionAnalysis.cumulativeScore}
              </div>
              <div className="text-sm text-red-700 font-medium">
                Cumulative Functional Disruption
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium text-slate-700">Feature Impact Distribution:</div>
              {data.activeFeatures.map((feature) => (
                <div key={feature.id} className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 w-24">{feature.label}</span>
                  <div className="flex-1 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(100, Math.abs(feature.deltaLL) * 8)}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-slate-800">{feature.deltaLL}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SAE Methodology */}
      <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
        <h4 className="text-lg font-bold text-purple-900 mb-3">SAE Intelligence Methodology</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="font-semibold text-purple-800">Layer {data.methodology.layer} SAE</div>
            <div className="text-purple-700">{data.totalFeatures} learned biological concepts</div>
          </div>
          <div>
            <div className="font-semibold text-purple-800">Feature Coverage</div>
            <div className="text-purple-700">{data.methodology.concepts.join(' / ')}</div>
          </div>
          <div>
            <div className="font-semibold text-purple-800">Disruption Metric</div>
            <div className="text-purple-700">{data.methodology.metric}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SAEIntelligence;

