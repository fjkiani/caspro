import React from 'react';
import { ArrowRight, CheckCircle, Plus } from 'lucide-react';

const TherapeuticDesignSection: React.FC = () => {
  return (
    <>
      {/* Step 1: Design */}
      <div className="section bg-gray-50 border border-gray-200 rounded-xl p-6 flex-grow flex flex-col">
        <h3 className="text-3xl font-black text-gray-900 mb-2 border-b-4 border-gray-300 pb-2">Step 1: Design</h3>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">AI-Powered Therapeutic Engineering</h2>
        <div className="flex-grow flex flex-col">
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            We bypass serendipitous discovery by engineering candidates from first principles. Our generative engine forges novel biologics and CRISPR payloads optimized for high affinity and minimal off-target effects.
          </p>
          
          {/* Design Process Visualization */}
          <div className="flex items-center justify-around space-x-4 my-6 p-6 bg-white rounded-xl border-2 border-gray-200 flex-grow">
            <div className="text-center">
              <div className="h-16 w-16 text-purple-600 mx-auto mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M12 7.5V5.25m0 2.25l-2.25-1.313M6.75 7.5l-2.25-1.313M6.75 7.5l2.25 1.313M6.75 7.5V5.25m9 0l2.25-1.313M17.25 5.25l-2.25 1.313M17.25 5.25V7.5" />
                </svg>
              </div>
              <p className="font-semibold text-purple-800">Engineered Biologic</p>
            </div>
            
            <ArrowRight className="h-12 w-12 text-slate-400" />
            
            <div className="text-center">
              <div className="h-16 w-16 text-emerald-600 mx-auto mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.17 48.17 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
              </div>
              <p className="font-semibold text-emerald-800">Validated Target</p>
            </div>
          </div>
          
          {/* Evidence Box */}
          <div className="p-4 bg-amber-50 border-l-4 border-amber-400 text-amber-900">
            <p className="font-semibold">Hard Evidence:</p>
            <p className="text-sm">Generated genomes achieve a **~70% Pfam-hit rate** vs. ~18% for prior models, proving we engineer biologically coherent assets.</p>
          </div>
        </div>
      </div>

      {/* Step 2: Validation */}
      <div className="section bg-gray-50 border border-gray-200 rounded-xl p-6 flex-grow flex flex-col">
        <h3 className="text-3xl font-black text-gray-900 mb-2 border-b-4 border-gray-300 pb-2">Step 2: Validation</h3>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Virtual Trials, Real-World Correlation</h2>
        <div className="flex-grow flex flex-col">
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Our computational predictions are validated against "gold-standard" Deep Mutational Scanning (DMS) assays, turning slow, expensive experiments into rapid, high-certainty verdicts.
          </p>
          
          {/* Correlation Chart */}
          <div className="w-full h-80 bg-white rounded-xl p-6 border-2 border-slate-200 relative my-6 flex-grow">
            {/* Grid Lines */}
            <div className="absolute inset-6 grid grid-cols-4 grid-rows-4">
              <div className="w-full h-px bg-gray-200 top-0"></div>
              <div className="w-full h-px bg-gray-200 top-1/4"></div>
              <div className="w-full h-px bg-gray-200 top-2/4"></div>
              <div className="w-full h-px bg-gray-200 top-3/4"></div>
              <div className="w-full h-px bg-gray-200 top-full"></div>
              <div className="h-full w-px bg-gray-200 left-0"></div>
              <div className="h-full w-px bg-gray-200 left-1/4"></div>
              <div className="h-full w-px bg-gray-200 left-2/4"></div>
              <div className="h-full w-px bg-gray-200 left-3/4"></div>
              <div className="h-full w-px bg-gray-200 left-full"></div>
            </div>
            
            {/* Axis Labels */}
            <p className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-sm font-semibold text-slate-600" style={{ transformOrigin: 'left center' }}>
              CrisPRO.ai Prediction ↑
            </p>
            <p className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-sm font-semibold text-slate-600">
              Experimental Score (DMS) →
            </p>
            
            {/* Correlation Line and Points */}
            <svg className="relative" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Data Points */}
              <circle cx="10" cy="90" r="2" className="text-sky-500" fill="currentColor"></circle>
              <circle cx="22" cy="78" r="2" className="text-sky-500" fill="currentColor"></circle>
              <circle cx="35" cy="68" r="2" className="text-sky-500" fill="currentColor"></circle>
              <circle cx="45" cy="52" r="2" className="text-sky-500" fill="currentColor"></circle>
              <circle cx="58" cy="45" r="2" className="text-sky-500" fill="currentColor"></circle>
              <circle cx="70" cy="31" r="2" className="text-sky-500" fill="currentColor"></circle>
              <circle cx="82" cy="22" r="2" className="text-sky-500" fill="currentColor"></circle>
              <circle cx="91" cy="10" r="2" className="text-sky-500" fill="currentColor"></circle>
              
              {/* Trend Line */}
              <line x1="5" y1="95" x2="95" y2="5" strokeWidth="3" className="text-emerald-500" stroke="currentColor" strokeLinecap="round"></line>
            </svg>
            
            {/* R² Value */}
            <div className="absolute top-4 right-4 bg-white/70 backdrop-blur-sm p-2 rounded-md border border-slate-300">
              <p className="font-bold text-emerald-800 text-lg">R² ≈ 0.92</p>
              <p className="text-xs text-slate-500">Strong Correlation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Outcome */}
      <div className="section bg-gray-50 border border-gray-200 rounded-xl p-6 flex-grow flex flex-col">
        <h3 className="text-3xl font-black text-gray-900 mb-2 border-b-4 border-gray-300 pb-2">Outcome</h3>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">From Verdict to De-Risked Asset</h2>
        <div className="flex-grow flex flex-col">
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            The validated target becomes the input for our **Zeta Forge**, which generates a complete, computationally-proven therapeutic blueprint, ready for synthesis.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 h-12 w-12 bg-blue-100 border-2 border-blue-200 rounded-full flex items-center justify-center">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-lg">Engineered Arsenal</h4>
                <p className="text-slate-600">Optimized CRISPR Payloads, HDR Templates, and Novel Biologics.</p>
              </div>
            </div>

            <div className="ml-6 border-l-2 border-dashed border-slate-300 h-8"></div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-12 w-12 bg-green-100 border-2 border-green-200 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-slate-800 mb-2 text-lg">Final Deliverable: The Blueprint</h4>
                <div className="bg-slate-800 text-white rounded-lg p-4 border-2 border-slate-600 shadow-lg font-mono text-left w-full">
                  <p className="text-sm text-cyan-400">// THERAPEUTIC_BLUEPRINT</p>
                  <p><span className="text-slate-400">asset_id:</span> "CS-BRCA1-GC-001"</p>
                  <p><span className="text-slate-400">type:</span> "High-Fidelity HDR"</p>
                  <p><span className="text-slate-400">predicted_efficacy:</span> <span className="text-green-400 font-bold">0.895</span></p>
                  <p><span className="text-slate-400">status:</span> "<span className="text-yellow-400">READY_FOR_SYNTHESIS</span>"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TherapeuticDesignSection;

