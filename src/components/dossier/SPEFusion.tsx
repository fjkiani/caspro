'use client';

import React from 'react';
import { Dna, Network, BookOpen, Target } from 'lucide-react';
import { SPEFusion as SPEFusionData } from '@/data/dossier/types';

interface SPEFusionProps {
  data: SPEFusionData;
}

const SPEFusion: React.FC<SPEFusionProps> = ({ data }) => {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{data.title}</h3>
        <p className="text-slate-600">{data.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sequence Component */}
        <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
          <div className="flex items-center gap-2 mb-4">
            <Dna className="w-5 h-5 text-blue-600" />
            <h4 className="text-lg font-bold text-blue-800">Sequence (S)</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Delta Threshold</span>
              <span className="font-bold text-blue-700">≤ {data.sequence.deltaThreshold}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Context Window</span>
              <span className="font-bold text-blue-700">{data.sequence.contextWindow.toLocaleString()} nt</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Multi-Scale Consistency</span>
              <span className="font-bold text-blue-700">{data.sequence.consistency * 100}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Hotspot-Aware</span>
              <span className={`font-bold ${data.sequence.hotspotAware ? 'text-green-700' : 'text-red-700'}`}>
                {data.sequence.hotspotAware ? '✓ Active' : '✗ Inactive'}
              </span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800">
              CrisPRO.ai multi-scale analysis with hotspot-aware functionality lift
            </p>
          </div>
        </div>

        {/* Pathway Component */}
        <div className="bg-white p-6 rounded-xl border-2 border-green-200">
          <div className="flex items-center gap-2 mb-4">
            <Network className="w-5 h-5 text-green-600" />
            <h4 className="text-lg font-bold text-green-800">Pathway (P)</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">RAS/MAPK Coverage</span>
              <span className="font-bold text-green-700">{data.pathway.coverage * 100}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">TP53 Cooperation</span>
              <span className="font-bold text-green-700">{data.pathway.cooperation * 100}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Pathway Accuracy</span>
              <span className="font-bold text-green-700">{data.pathway.accuracy * 100}%</span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {data.pathway.topPathways.map((pathway, index) => (
              <div key={index} className="p-2 bg-green-50 rounded border">
                <div className="font-semibold text-green-800 text-sm">{pathway.name}</div>
                <div className="text-xs text-green-600">Weight: {pathway.weight} • {pathway.moa}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Evidence Component */}
        <div className="bg-white p-6 rounded-xl border-2 border-purple-200">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <h4 className="text-lg font-bold text-purple-800">Evidence (E)</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">ClinVar AUROC</span>
              <span className="font-bold text-purple-700">{data.evidence.clinvarAUROC}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">SpliceVarDB AUROC</span>
              <span className="font-bold text-purple-700">{data.evidence.splicevardbAUROC}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Tier Promotions</span>
              <span className="font-bold text-purple-700">{data.evidence.tierPromotions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Evidence Tier</span>
              <span className="font-bold text-green-700">{data.evidence.evidenceTier}</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <p className="text-xs text-purple-800">
              ClinVar priors with literature integration and tier transparency
            </p>
          </div>
        </div>
      </div>

      {/* Fusion Result */}
      <div className="p-6 bg-gradient-to-r from-slate-100 to-blue-100 rounded-xl border border-slate-300">
        <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" />
          Integrated S/P/E Analysis Result
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-lg border">
            <div className="text-2xl font-bold text-blue-600 mb-2">{data.integratedResult.sequenceConfidence * 100}%</div>
            <div className="text-sm text-slate-700">Sequence Confidence</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border">
            <div className="text-2xl font-bold text-green-600 mb-2">{data.integratedResult.pathwayAlignments}</div>
            <div className="text-sm text-slate-700">Pathway Alignments</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border">
            <div className="text-2xl font-bold text-purple-600 mb-2">{data.integratedResult.evidenceLevel}</div>
            <div className="text-sm text-slate-700">Evidence Level</div>
          </div>
        </div>
        <p className="text-slate-700 mt-4 text-center font-medium">
          Explainable therapy ranking with confidence, evidence tier, badges, and citations
        </p>
      </div>
    </div>
  );
};

export default SPEFusion;

