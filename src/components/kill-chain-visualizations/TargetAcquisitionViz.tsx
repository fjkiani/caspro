'use client';

import React from 'react';
import { TimelineVisualizer } from '@/components/visualization';
import { targetAcquisitionTimeline } from '@/data/kill-chain-timeline-data';

const TargetAcquisitionViz = () => {
    const firstTrack = targetAcquisitionTimeline[0];

    if (!firstTrack) {
        return null; // Return nothing if the data is not available
    }

    // A simplified track for a cleaner embedded view
    const simplifiedTrack = {
        ...firstTrack,
        events: (firstTrack.events ?? []).map(e => ({...e, description: '' })) // Safely handle undefined events
    };

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-shrink-0 p-4">
                <h3 className="text-xl font-bold text-red-400 mb-2">Step 1: Target Acquisition</h3>
                <p className="text-sm text-slate-400">
                    Visualizing the initial data ingestion protocol, from sample collection to a structured VCF file ready for AI analysis.
                </p>
            </div>
            <div className="flex-grow rounded-lg border border-slate-700 bg-slate-900/50">
                <TimelineVisualizer 
                    tracks={[simplifiedTrack]}
                    timeMode="relative"
                    timeUnit="hours"
                    startTime={-1}
                    endTime={3}
                    showRiskIndicators={true}
                    enableZoom={false}
                    enablePan={false}
                    showCurrentTime={false}
                />
            </div>
        </div>
    );
};

export default TargetAcquisitionViz; 