'use client';

import React from 'react';
import { Target, Dna, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

interface SyntheticLethalityDemoProps {
  seedData?: any;
}

const SyntheticLethalityDemo: React.FC<SyntheticLethalityDemoProps> = ({ seedData }) => {
  const defaultAnalysis = seedData?.analysis || {
    patientMutations: [
      { gene: 'BRCA1', variant: 'p.C61G', consequence: 'stop_gained' },
      { gene: 'TP53', variant: 'p.R175H', consequence: 'missense' },
    ],
    brokenPathways: [
      {
        pathway: 'HR (Homologous Recombination)',
        status: 'Non-Functional',
        score: 0.0,
        reason: 'BRCA1 loss-of-function mutation eliminates HR repair',
      },
      {
        pathway: 'TP53',
        status: 'Compromised',
        score: 0.2,
        reason: 'TP53 R175H hotspot mutation disrupts checkpoint function',
      },
    ],
    essentialPathways: [
      {
        pathway: 'PARP',
        essentiality: 0.95,
        reason: 'HR deficiency makes cancer dependent on PARP-mediated repair',
        drugs: ['Olaparib', 'Rucaparib', 'Niraparib'],
      },
      {
        pathway: 'ATR/CHK1',
        essentiality: 0.78,
        reason: 'Checkpoint bypass creates dependency on ATR/CHK1 signaling',
        drugs: ['ATR inhibitors', 'CHK1 inhibitors'],
      },
    ],
    recommendedDrugs: [
      {
        drug: 'Olaparib',
        confidence: 0.85,
        rationale: 'BRCA1 loss creates HR deficiency → cancer depends on PARP → PARP inhibitors trap PARP → lethal DNA damage',
        evidenceLevel: 'FDA Approved',
        diseaseMatch: 'Ovarian Cancer',
      },
      {
        drug: 'Rucaparib',
        confidence: 0.82,
        rationale: 'Same mechanism as Olaparib - targets PARP dependency in HR-deficient cells',
        evidenceLevel: 'FDA Approved',
        diseaseMatch: 'Ovarian Cancer',
      },
      {
        drug: 'ATR Inhibitors',
        confidence: 0.75,
        rationale: 'TP53 checkpoint bypass creates dependency on ATR/CHK1 signaling pathway',
        evidenceLevel: 'Clinical Trials',
        diseaseMatch: 'Multiple Cancers',
      },
    ],
    doubleHitDescription: 'HR pathway loss + TP53 checkpoint bypass = double DNA repair deficiency',
    syntheticLethalityDetected: true,
  };

  const getPathwayColor = (status: string) => {
    switch (status) {
      case 'Non-Functional':
        return 'bg-red-50 border-red-200 text-red-900';
      case 'Compromised':
        return 'bg-orange-50 border-orange-200 text-orange-900';
      default:
        return 'bg-slate-50 border-slate-200 text-slate-900';
    }
  };

  const getEvidenceColor = (level: string) => {
    switch (level) {
      case 'FDA Approved':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Clinical Trials':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="w-full bg-white rounded-xl p-6 border border-slate-200">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Synthetic Lethality Analysis</h3>
        <p className="text-slate-600">Identify double-hit vulnerabilities where cancer depends on backup pathways</p>
      </div>

      {/* Patient Mutations */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <Dna className="w-5 h-5 text-blue-600" />
          Patient Mutations
        </h4>
        <div className="flex flex-wrap gap-2">
          {defaultAnalysis.patientMutations.map((mutation: any, idx: number) => (
            <div key={idx} className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="font-semibold text-blue-900">{mutation.gene}</span>
              <span className="text-sm text-blue-700 ml-2">{mutation.variant}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Broken Pathways */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          Broken Pathways
        </h4>
        <div className="space-y-3">
          {defaultAnalysis.brokenPathways.map((pathway: any, idx: number) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border-2 ${getPathwayColor(pathway.status)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold">{pathway.pathway}</span>
                <span className="text-sm font-semibold">{pathway.status}</span>
              </div>
              <p className="text-sm mt-1">{pathway.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Essential Pathways (Dependencies) */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <Target className="w-5 h-5 text-green-600" />
          Essential Backup Pathways (Dependencies)
        </h4>
        <div className="space-y-3">
          {defaultAnalysis.essentialPathways.map((pathway: any, idx: number) => (
            <div
              key={idx}
              className="p-4 rounded-lg border-2 bg-green-50 border-green-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-green-900">{pathway.pathway}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-700">Essentiality:</span>
                  <span className="text-lg font-bold text-green-900">{Math.round(pathway.essentiality * 100)}%</span>
                </div>
              </div>
              <p className="text-sm text-green-800 mb-2">{pathway.reason}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {pathway.drugs.map((drug: string, drugIdx: number) => (
                  <span key={drugIdx} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                    {drug}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Double-Hit Description */}
      {defaultAnalysis.syntheticLethalityDetected && (
        <div className="mb-6 p-4 bg-purple-50 border-2 border-purple-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span className="font-bold text-purple-900">Synthetic Lethality Detected</span>
          </div>
          <p className="text-sm text-purple-800">{defaultAnalysis.doubleHitDescription}</p>
        </div>
      )}

      {/* Recommended Drugs */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-slate-900 mb-3">Recommended Drugs</h4>
        <div className="space-y-3">
          {defaultAnalysis.recommendedDrugs.map((drug: any, idx: number) => (
            <div
              key={idx}
              className="p-4 rounded-lg border-2 border-slate-200 bg-slate-50"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-slate-900">#{idx + 1}</span>
                  <span className="text-lg font-semibold text-slate-900">{drug.drug}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getEvidenceColor(drug.evidenceLevel)}`}>
                    {drug.evidenceLevel}
                  </span>
                  <span className="text-lg font-bold text-slate-900">
                    {Math.round(drug.confidence * 100)}%
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-700 mb-2">{drug.rationale}</p>
              <div className="text-xs text-slate-600">
                <span className="font-medium">Disease Match:</span> {drug.diseaseMatch}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Validation Footer */}
      <div className="mt-6 p-4 bg-slate-50 border border-slate-300 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="w-5 h-5 text-slate-600" />
          <span className="text-sm font-semibold text-slate-900">Validated Performance</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded border border-slate-200">
            <div className="text-xs text-slate-600 mb-1">Drug Match Accuracy</div>
            <div className="text-lg font-bold text-slate-900">50%</div>
            <div className="text-xs text-slate-600">Pilot benchmark</div>
          </div>
          <div className="bg-white p-3 rounded border border-slate-200">
            <div className="text-xs text-slate-600 mb-1">Evo2 Usage</div>
            <div className="text-lg font-bold text-slate-900">100%</div>
            <div className="text-xs text-slate-600">Foundation model integration</div>
          </div>
        </div>
        <p className="text-xs text-slate-600 mt-3">
          <span className="font-semibold">Reference:</span> Synthetic Lethality & Essentiality Agent - Module 14. 
          Identifies double-hit vulnerabilities through pathway dependency analysis.
        </p>
      </div>
    </div>
  );
};

export default SyntheticLethalityDemo;

