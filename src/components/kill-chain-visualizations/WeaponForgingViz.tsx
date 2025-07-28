'use client';

import React from 'react';
import { SequenceViewer } from '@/components/visualization';
import { forgedGuideRNASequence, forgedGuideRNAAnnotations } from '@/data/kill-chain-sequence-data';
import { CrisPROSequenceAnnotation } from '@/components/ui/CrisPROAnnotationDetailsPanel';
import type { SequenceAnnotation as OldSequenceAnnotation } from '@/components/visualization';

// Adapter function to conform to the SequenceViewer's expected prop type
const adaptCrisPROAnnotationToOldFormat = (crisproAn: CrisPROSequenceAnnotation): OldSequenceAnnotation => {
    let oldType: string = crisproAn.baseAnnotationType;
    if (crisproAn.baseAnnotationType === 'regulatory_region') oldType = 'regulatory';
    else if (crisproAn.baseAnnotationType === 'cds') oldType = 'cds';
    return {
      id: crisproAn.id,
      start: crisproAn.start,
      end: crisproAn.end,
      label: crisproAn.label,
      description: crisproAn.description,
      type: oldType,
      aiGenerated: !!crisproAn.aiGeneratedSource,
      significance: crisproAn.functionalAssessment?.impactScore,
    };
  };

const WeaponForgingViz = () => {
    const adaptedAnnotations = forgedGuideRNAAnnotations.map(adaptCrisPROAnnotationToOldFormat);

    return (
        <div>
            <h3 className="text-xl font-bold text-red-400 mb-4">Step 4: Weapon Forging</h3>
            <p className="text-slate-400 mb-6">
                The Zeta Forge is unleashed. This viewer displays a de novo engineered guide RNA sequence, the weapon designed for a precision strike against a validated target (TP53 R175H).
            </p>
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                <SequenceViewer 
                    sequence={forgedGuideRNASequence} 
                    annotations={adaptedAnnotations}
                    basesPerLine={forgedGuideRNASequence.length}
                />
            </div>
        </div>
    );
};

export default WeaponForgingViz; 
 
 