import React from 'react';
import { CheckCircle, Target } from 'lucide-react';
import { adaptPosterData } from '@/data/poster/poster-data-adapter';

const VariantInterpretationSection: React.FC = () => {
  const posterData = adaptPosterData();
  return (
    <>
      {/* Automated Variant Interpretation Header */}
      <div className="section bg-gray-50 border border-gray-200 rounded-xl p-6 flex-grow flex flex-col">
        <h2 className="text-6xl font-black text-gray-900 mb-6 border-b-4 border-gray-300 pb-3">
          Automated Variant Interpretation
        </h2>
        <div className="flex-grow flex flex-col">
          <p className="text-3xl leading-relaxed text-gray-700">
            We transform ambiguous genetic data into definitive, actionable verdicts through a two-step computational process.
          </p>
        </div>
      </div>

      {/* Step 1: From VUS to Quantitative Verdict */}
      <div className="section bg-gray-50 border border-gray-200 rounded-xl p-6 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">1. From VUS to a Quantitative Verdict</h3>
        <div className="flex-grow flex flex-col">
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Our platform provides a quantitative verdict on a variant's functional impact, replacing clinical uncertainty with a clear, actionable signal.
          </p>
          
          {/* Zeta Score Visualization */}
          <div className="bg-white p-6 rounded-xl text-center border-2 border-gray-200 shadow-inner flex-grow flex flex-col justify-center mb-6">
            <p className="text-lg font-semibold text-slate-600 mb-4">Zeta Score: Biological Impact</p>
            <div className="relative w-full max-w-xs mx-auto h-20 my-4">
              {/* Gauge Background */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-20 border-t-[8px] border-l-[8px] border-r-[8px] border-gray-200 rounded-t-full"></div>
              {/* Gauge Fill */}
              <div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-20 border-t-[8px] border-l-[8px] border-r-[8px] border-transparent rounded-t-full"
                style={{
                  borderImage: 'linear-gradient(to right, #10b981, #facc15, #ef4444) 1'
                }}
              ></div>
              {/* Needle */}
              <div 
                className="absolute bottom-0 left-1/2 w-0.5 h-20 origin-bottom"
                style={{ transform: 'rotate(80deg)' }}
              >
                <div className="w-full h-full bg-slate-800 rounded-t-full"></div>
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-slate-800 rounded-full border-2 border-white"></div>
              </div>
            </div>
            <div className="flex justify-between w-44 mx-auto -mt-6 text-sm font-bold">
              <span className="text-green-600">BENIGN</span>
              <span className="text-red-600">PATHOGENIC</span>
            </div>
            <div className="mt-4">
              <p className="text-4xl font-bold font-mono text-red-600">{posterData.caseStudies.brca1.zetaScore.toLocaleString()}</p>
              <p className="text-lg font-semibold text-red-700">({posterData.caseStudies.brca1.classification})</p>
            </div>
          </div>

          {/* Evidence Block */}
          <div className="bg-white border border-gray-200 border-l-5 border-l-blue-500 p-4 rounded-lg text-left">
            <p className="text-4xl font-black text-blue-600">AUROC {(posterData.oracle.clinVarCodingSNV.auroc * 100).toFixed(1)}%</p>
            <p className="text-lg font-semibold text-gray-800">ClinVar Coding SNV Accuracy</p>
            <p className="text-sm text-gray-600 mt-1">Validated on {posterData.oracle.clinVarCodingSNV.samples.toLocaleString()} ClinVar samples - SOTA performance.</p>
          </div>
        </div>
      </div>

      {/* Step 2: Confirming the Achilles' Heel */}
      <div className="section bg-gray-50 border border-gray-200 rounded-xl p-6 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">2. Confirming the Achilles' Heel</h3>
        <div className="flex-grow flex flex-col">
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            We then confirm if this pathogenic target is truly essential for the cancer's survival, preventing investment in non-viable pathways.
          </p>
          
          {/* Jenga Tower Visualization */}
          <div className="grid grid-cols-2 gap-4 items-center flex-grow mb-6">
            <div className="bg-amber-100 p-4 rounded-lg border border-amber-300 h-full text-center">
              <h4 className="text-xl font-bold text-amber-800 mb-4">Non-Essential</h4>
              <div className="w-24 mx-auto my-4">
                <div className="h-7 bg-gray-300 border-2 border-gray-500 rounded mb-1"></div>
                <div className="flex -my-0.5">
                  <div className="h-7 w-1/3 bg-amber-300 border-2 border-amber-500 rounded relative z-10" style={{ transform: 'translateX(8px)' }}></div>
                  <div className="h-7 w-1/3 bg-gray-300 border-2 border-gray-500 rounded"></div>
                  <div className="h-7 w-1/3 bg-gray-300 border-2 border-gray-500 rounded"></div>
                </div>
                <div className="h-7 bg-gray-300 border-2 border-gray-500 rounded"></div>
              </div>
              <p className="text-sm font-semibold text-red-800">Outcome: Cancer Adapts</p>
            </div>
            
            <div className="bg-emerald-100 p-4 rounded-lg border border-emerald-300 h-full text-center">
              <h4 className="text-xl font-bold text-emerald-800 mb-4">Essential</h4>
              <div className="w-24 mx-auto my-4">
                <div className="h-7 bg-gray-300 border-2 border-gray-500 rounded mb-1 opacity-50" style={{ transform: 'translateY(3px) rotate(1deg)' }}></div>
                <div className="flex -my-0.5 opacity-50" style={{ transform: 'translateY(3px) rotate(1deg)' }}>
                  <div className="h-7 w-1/3 bg-gray-300 border-2 border-gray-500 rounded"></div>
                  <div className="h-7 w-1/3 bg-gray-300 border-2 border-gray-500 rounded"></div>
                  <div className="h-7 w-1/3 bg-gray-300 border-2 border-gray-500 rounded"></div>
                </div>
                <div 
                  className="h-7 bg-emerald-400 border-2 border-emerald-600 rounded relative z-10 opacity-0"
                  style={{ 
                    transform: 'translateX(15px) rotate(3deg)',
                    animation: 'fall 2s ease-in-out forwards 1s'
                  }}
                ></div>
              </div>
              <p className="text-sm font-semibold text-green-800">Outcome: Catastrophic Kill</p>
            </div>
          </div>

          {/* Evidence Block */}
          <div className="bg-white border border-gray-200 border-l-5 border-l-blue-500 p-4 rounded-lg text-left">
            <p className="text-4xl font-black text-blue-600">VUS Resolution {(posterData.oracle.vusResolution.rate * 100).toFixed(0)}%</p>
            <p className="text-lg font-semibold text-gray-800">Functional Genomics Validation</p>
            <p className="text-sm text-gray-600 mt-1">Our in-silico essentiality predictions align with gold-standard experimental results.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VariantInterpretationSection;
