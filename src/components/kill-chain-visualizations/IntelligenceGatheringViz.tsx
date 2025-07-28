'use client';

import React, { useRef, useEffect } from 'react';
import { KnowledgeGraph, KnowledgeGraphInstance } from '@/components/visualization';
import { intelligenceGatheringNodes, intelligenceGatheringEdges } from '@/data/kill-chain-graph-data';
import { Cpu, Terminal, Database, CheckCircle } from 'lucide-react';

const legendItems = [
    { type: 'service', label: 'AI Service', color: '#f43f5e', icon: Cpu },
    { type: 'endpoint', label: 'Endpoint', color: '#3b82f6', icon: Terminal },
    { type: 'data-output', label: 'Data Output', color: '#10b981', icon: Database },
    { type: 'outcome', label: 'Outcome', color: '#a855f7', icon: CheckCircle },
];

const CustomLegend = () => (
    <div className="absolute bottom-4 left-4 bg-slate-900/80 border border-slate-700 rounded-lg p-3 text-xs text-slate-300">
        <h4 className="font-bold mb-2">Legend</h4>
        <ul className="space-y-1">
            {legendItems.map(item => {
                const Icon = item.icon;
                return (
                    <li key={item.type} className="flex items-center">
                        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                        <span>{item.label}</span>
                    </li>
                );
            })}
        </ul>
    </div>
);


const IntelligenceGatheringViz = () => {
    const graphRef = useRef<KnowledgeGraphInstance>(null);

    useEffect(() => {
        // Fit the view after a short delay to allow the physics to settle
        const timer = setTimeout(() => {
            graphRef.current?.fitView();
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const handleResetView = () => {
        graphRef.current?.fitView();
    };

    return (
        <div>
            <h3 className="text-xl font-bold text-red-400 mb-4">Step 2: Intelligence Gathering</h3>
            <p className="text-slate-400 mb-6">
                The Zeta Oracle transforms raw genomic noise into actionable intelligence. This graph shows the relationships between our AI service, its key endpoints, and the critical data outputs.
            </p>
            <div className="h-[450px] bg-slate-900 rounded-lg p-4 border border-slate-700 relative">
                 <div className="absolute top-4 right-4 z-10">
                    <button 
                        onClick={handleResetView}
                        className="px-3 py-1.5 bg-slate-700 text-slate-200 text-xs rounded-md hover:bg-slate-600"
                    >
                        Reset View
                    </button>
                </div>
                <KnowledgeGraph
                    ref={graphRef} 
                    nodes={intelligenceGatheringNodes} 
                    edges={intelligenceGatheringEdges}
                    enableDragging={true}
                    showLabels={true}
                    usePhysics={true}
                    simulationRunning={true}
                    highlightConnections={true}
                    customNodeColors={{
                        service: '#f43f5e',
                        endpoint: '#3b82f6',
                        'data-output': '#10b981',
                        outcome: '#a855f7',
                        other: '#64748b'
                    }}
                />
                <CustomLegend />
            </div>
        </div>
    );
};

export default IntelligenceGatheringViz; 