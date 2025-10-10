import React from 'react';
import { X, Clock, AlertTriangle, DollarSign } from 'lucide-react';
import { adaptPosterData } from '@/data/poster/poster-data-adapter';

const ProblemSection: React.FC = () => {
  const posterData = adaptPosterData();
  return (
    <>
      {/* Abstract Section */}
      <div className="section bg-gray-50 border border-gray-200 rounded-xl p-6 flex-grow flex flex-col">
        <h2 className="text-6xl font-black text-gray-900 mb-6 border-b-4 border-gray-300 pb-3">
          Abstract
        </h2>
        <div className="flex-grow flex flex-col">
          <p className="text-3xl leading-relaxed text-gray-700">
            The development of novel therapeutics is crippled by the clinical and financial paralysis caused by Variants of Uncertain Significance (VUS). To address this, we have developed CrisPRO.ai, an in-silico research-use-only (RUO) framework that provides a definitive, evidence-backed verdict on such variants. Our platform orchestrates a generalist genome foundation model with specialist predictors and structural oracles to achieve state-of-the-art (SOTA) accuracy. We demonstrate how our fusion AI framework transforms a VUS from a point of clinical ambiguity into a de-risked, computationally validated, and patent-worthy therapeutic asset.
          </p>
        </div>
      </div>

      {/* The Challenge Section */}
      <div className="section bg-gray-50 border border-gray-200 rounded-xl p-6 flex-grow flex flex-col">
        <h2 className="text-6xl font-black text-gray-900 mb-6 border-b-4 border-gray-300 pb-3">
          The Challenge: Mechanistic Uncertainty
        </h2>
        <div className="flex-grow flex flex-col">
          <p className="text-3xl leading-relaxed text-gray-700 mb-8">
            Traditional drug development is a process defined by catastrophic failure. This is not a law of nature; it is a failure of intelligence. The <strong className="text-red-600">$2.6 billion</strong> price tag per drug is the direct cost of ambiguity and mechanistic uncertainty.
          </p>
          
          {/* Funnel Visual */}
          <div className="w-full mx-auto mt-12">
            <div className="flex w-full">
              <div className="w-1/6 bg-blue-800 text-white text-2xl font-semibold p-4 rounded-l-md flex items-center justify-center">Target Discovery</div>
              <div className="w-5/6">
                <div className="relative h-64">
                  <div className="absolute top-0 left-0 h-full bg-blue-600" style={{width: '100%', height: '100%', clipPath: 'polygon(0px 0px, 100% 0px, 100% 65%, 25% 100%, 0% 100%)'}}>
                     <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-400 opacity-70"></div>
                  </div>
                  <div className="absolute -top-16 left-[5%]">
                    <div className="bg-white px-6 py-3 rounded-lg shadow-lg border text-center">
                      <p className="text-4xl font-bold text-blue-800">10,000</p>
                      <p className="text-xl text-slate-600">compounds</p>
                    </div>
                  </div>
                   <div className="absolute -top-16 left-[50%]">
                    <div className="bg-white px-6 py-3 rounded-lg shadow-lg border text-center">
                      <p className="text-4xl font-bold text-blue-800">10</p>
                      <p className="text-xl text-slate-600">in clinic</p>
                    </div>
                  </div>
                   <div className="absolute -top-16 right-[10%]">
                    <div className="bg-white px-6 py-3 rounded-lg shadow-lg border text-center">
                      <p className="text-4xl font-bold text-blue-800">1</p>
                      <p className="text-xl text-slate-600">medicine</p>
                    </div>
                  </div>
                </div>
                <div className="relative -mt-16 flex items-center">
                   <div className="flex h-16 w-full shadow-inner">
                    <div className="w-2/5 bg-blue-700 flex items-center justify-center text-white text-lg font-semibold p-2 text-center border-r border-blue-900/20">Discovery & Design</div>
                    <div className="w-1/5 bg-blue-600 flex items-center justify-center text-white text-lg font-semibold p-2 text-center border-r border-blue-900/20">Phase I</div>
                    <div className="w-1/5 bg-blue-500 flex items-center justify-center text-white text-lg font-semibold p-2 text-center border-r border-blue-900/20">Phase II</div>
                    <div className="w-1/5 bg-blue-400 flex items-center justify-center text-white text-lg font-semibold p-2 text-center border-r border-blue-900/20">Phase III</div>
                    <div className="w-1/12 bg-blue-300 flex items-center justify-center text-white text-lg font-semibold p-2 text-center">Reg.</div>
                  </div>
                  <div className="absolute -right-4 top-0 w-0 h-0 border-t-[32px] border-t-transparent border-b-[32px] border-b-transparent border-l-[32px] border-l-blue-300"></div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-3xl font-bold text-slate-700">10-15 Year Timeline</p>
          </div>
        </div>
      </div>

      {/* Core Drivers of Failure */}
      <div className="section bg-gray-50 border border-gray-200 rounded-2xl p-8 flex-grow flex flex-col">
        <h2 className="text-6xl font-black text-gray-900 mb-8 border-b-4 border-gray-300 pb-4">
          The Core Drivers of Failure
        </h2>
        <div className="flex-grow flex flex-col">
          <div className="grid grid-cols-2 gap-8">
            <div className="failure-card bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <X className="w-24 h-24 text-red-500 mx-auto mb-6" />
              <p className="text-8xl font-black text-red-600 mb-6">&gt;90%</p>
              <p className="text-4xl font-semibold text-gray-800">Clinical Failure Rate</p>
            </div>
            <div className="failure-card bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <Clock className="w-24 h-24 text-red-500 mx-auto mb-6" />
              <p className="text-8xl font-black text-red-600 mb-6">10-15</p>
              <p className="text-4xl font-semibold text-gray-800">Years of R&D</p>
            </div>
            <div className="failure-card bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <AlertTriangle className="w-24 h-24 text-red-500 mx-auto mb-6" />
              <p className="text-8xl font-black text-red-600 mb-6">{Math.round(posterData.business.vusReduction.from * 100)}%</p>
              <p className="text-4xl font-semibold text-gray-800">VUS Rate</p>
            </div>
            <div className="failure-card bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <DollarSign className="w-24 h-24 text-red-500 mx-auto mb-6" />
              <p className="text-8xl font-black text-red-600 mb-6">$2.6B</p>
              <p className="text-4xl font-semibold text-gray-800">Wasted Capital</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProblemSection;
