'use client';

import React from 'react';

const ActionabilityGapSection: React.FC = () => {
  return (
    <section className="mb-20">
      <h3 className="text-2xl font-bold text-white text-center mb-4">
        1.0 The Human Cost & The Actionability Gap
      </h3>
      <p className="text-lg text-gray-400 text-center max-w-3xl mx-auto mb-12">
        To understand the opportunity, one must first understand the profound failure of the current system. 
        The rise of genomic testing was meant to bring clarity. Instead, it has created a crisis of interpretation 
        that has a devastating human and economic cost.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Crisis 1: VUS & Patient Journey */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
          <h4 className="text-lg font-bold text-white mb-2">Crisis 1: The Clinical Actionability Gap</h4>
          <p className="text-gray-400 mb-6">
            The promise of genomics was clarity. The reality is a crisis of interpretation, creating a massive 
            market for any company that can provide definitive answers.
          </p>
          <div className="mt-6">
            <h5 className="text-white font-semibold mb-3">Genetic Test Outcomes: The VUS Market</h5>
            <div className="w-full bg-gray-700 rounded-full h-6 flex overflow-hidden">
              <div className="bg-red-600 h-6 text-center text-white font-bold flex items-center justify-center" style={{width: '10%'}}>10%</div>
              <div className="bg-blue-600 h-6 text-center text-white font-bold flex items-center justify-center" style={{width: '50%'}}>50%</div>
              <div className="bg-yellow-500 h-6 text-center text-white font-bold flex items-center justify-center" style={{width: '40%'}}>40%</div>
            </div>
            <div className="flex justify-between text-xs mt-2 text-gray-400">
              <span>Pathogenic</span>
              <span>Benign</span>
              <span className="font-bold">Uncertain (VUS)</span>
            </div>
          </div>
          <p className="text-gray-400 mt-4 text-sm">
            Our platform's ability to resolve the <strong>~40% of VUS cases</strong> with state-of-the-art 
            accuracy (AUROC {'>'} 0.95) turns a competitor's weakness into our revenue stream.
          </p>
        </div>

        {/* Crisis 2: R&D Quagmire */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
          <h4 className="text-lg font-bold text-white mb-2">Crisis 2: The R&D Quagmire</h4>
          <p className="text-gray-400 mb-6">
            Developing new therapies is a slow, expensive gamble with a catastrophic failure rate. 
            The "translational chasm" is where most investment dies.
          </p>
          
          <h5 className="text-white font-semibold mb-3">The Drug Development Funnel of Death</h5>
          <div className="space-y-1">
            <div className="bg-blue-900/50 text-center p-2 text-white rounded" style={{clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)'}}>
              <span className="font-bold">Phase 1</span> <span className="text-gray-300">(100 Candidates Start)</span>
            </div>
            <div className="mx-auto h-4 w-px bg-gray-600"></div>
            <div className="bg-blue-800/60 text-center p-2 text-white rounded" style={{clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)'}}>
              <span className="font-bold">Phase 2</span> <span className="text-gray-300">(~63 Survive, 37% Fail)</span>
            </div>
            <div className="mx-auto h-4 w-px bg-gray-600"></div>
            <div className="bg-blue-700/70 text-center p-2 text-white rounded" style={{clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)'}}>
              <span className="font-bold">Phase 3</span> <span className="text-gray-300">(~21 Survive, 67% Fail)</span>
            </div>
            <div className="mx-auto h-4 w-px bg-gray-600"></div>
            <div className="bg-blue-600/80 text-center p-2 text-white rounded" style={{clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)'}}>
              <span className="font-bold">Approval</span> <span className="font-bold text-green-400">(~9-10 Succeed)</span>
            </div>
          </div>
          <p className="text-gray-400 mt-6 text-sm">
            With a <strong>{'>'} 90% failure rate</strong> and a <strong>$2.8B</strong> cost per approved drug, 
            the market is desperate for our in silico flywheel that de-risks candidates before they enter this costly funnel.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ActionabilityGapSection; 