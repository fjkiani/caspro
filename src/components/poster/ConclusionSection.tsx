import React from 'react';
import { Shield, CheckCircle, Target, Zap } from 'lucide-react';

const ConclusionSection: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-8">
      {/* The Deliverable */}
      <div className="section bg-gray-50 border border-gray-200 rounded-2xl p-8 flex-grow flex flex-col">
        <h2 className="text-4xl font-black text-gray-900 mb-6 border-b-4 border-gray-300 pb-3">
          The Deliverable
        </h2>
        <div className="flex-grow flex flex-col">
          <p className="text-xl leading-relaxed text-gray-700 mb-8">
            The final output is not data; it's a de-risked, computationally validated immunotherapy candidate with a comprehensive dossier of in-silico evidence.
          </p>
          
            <div className="bg-emerald-100 p-8 rounded-3xl border-2 border-emerald-300 shadow-lg relative">
              <div className="absolute top-4 right-4 bg-yellow-200 text-yellow-800 text-sm font-bold px-3 py-1 rounded-full">
                RUO
              </div>
            <div className="flex items-center">
              <Shield className="w-20 h-20 text-emerald-600 mr-6" />
              <div>
                <h3 className="text-5xl font-bold text-emerald-800">IND-Ready Asset</h3>
                <p className="text-2xl text-emerald-700">Computationally Validated</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* A New Paradigm */}
      <div className="section bg-gray-50 border border-gray-200 rounded-2xl p-8 flex-grow flex flex-col">
        <h2 className="text-4xl font-black text-gray-900 mb-6 border-b-4 border-gray-300 pb-3">
          A New Paradigm
        </h2>
        <div className="flex-grow flex flex-col">
          <div className="space-y-8">
            <div className="flex items-start">
              <Target className="w-10 h-10 text-blue-600 mr-4 mt-2 shrink-0" />
              <div>
                <h4 className="font-bold text-2xl text-gray-800 mb-2">Comprehensive Genome-Scale Analysis</h4>
                <p className="text-lg text-gray-700">We see the 98% of the genome that panel tests structurally ignore.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="w-10 h-10 text-emerald-600 mr-4 mt-2 shrink-0" />
              <div>
                <h4 className="font-bold text-2xl text-gray-800 mb-2">From Ambiguity to Mechanistic Insight</h4>
                <p className="text-lg text-gray-700">We transform a 'maybe' into a definitive, actionable verdict.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Zap className="w-10 h-10 text-purple-600 mr-4 mt-2 shrink-0" />
              <div>
                <h4 className="font-bold text-2xl text-gray-800 mb-2">From Screening to De Novo Design</h4>
                <p className="text-lg text-gray-700">We don't search for a key; we forge one from a blueprint.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conclusion & References */}
      <div className="section bg-gray-50 border border-gray-200 rounded-2xl p-8 flex-grow flex flex-col">
        <h2 className="text-4xl font-black text-gray-900 mb-6 border-b-4 border-gray-300 pb-3">
          Conclusion & References
        </h2>
        <div className="flex-grow flex flex-col">
          <p className="text-xl leading-relaxed text-gray-700 mb-8">
            The CrisPRO.ai RUO framework represents a significant step forward in in-silico drug discovery. By grounding our platform in a rigorously benchmarked, evidence-backed doctrine, we have created a system that can reliably and transparently accelerate therapeutic research, transforming drug development from a high-risk gamble into a predictable engineering discipline.
          </p>
          
          <div className="mt-8 text-center">
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://crispro.ai/blog/post/evidence" 
              alt="QR Code to Research Paper" 
              className="mx-auto"
            />
            <p className="text-lg font-semibold mt-4 text-gray-700">Scan for Full Paper & Evidence</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConclusionSection;




