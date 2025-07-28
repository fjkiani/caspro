'use client';

import React from 'react';
import ProteinModelViewer from '@/components/ui/ProteinModelViewer';
import { ScientificNotation } from '@/components/visualization';

const StructuralValidationViz = () => {
    const plddtScore = 0.92; // High confidence score

    return (
        <div>
            <h3 className="text-xl font-bold text-red-400 mb-4">Step 5: Structural Validation</h3>
            <p className="text-slate-400 mb-6">
                Every forged weapon is subjected to the gauntlet. This is where 1D genius meets 3D reality. We ensure our AI-designed proteins are structurally robust and not just "wet noodles."
            </p>
            <div className="h-[400px] bg-slate-900 rounded-lg border border-slate-700 mb-4">
                <ProteinModelViewer modelUrl="/models/3nmm-haemoglobin.glb" />
            </div>
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 text-center">
                <h4 className="text-lg font-semibold text-slate-300 mb-2">Predicted Local Distance Difference Test (pLDDT)</h4>
                <div className="text-4xl font-bold text-green-400">
                    <ScientificNotation value={plddtScore} />
                </div>
                <p className="text-sm text-slate-500 mt-1">Confidence Score (0-1)</p>
            </div>
        </div>
    );
};

export default StructuralValidationViz; 
 
 