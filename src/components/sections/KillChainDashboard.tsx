'use client';

import React, { useState } from 'react';
import { KnowledgeGraph, GraphNode, GraphEdge } from '@/components/visualization';
import { DEEP_DIVE_CONFIG } from '@/data/technology-deep-dive-config';

// Convert Kill Chain steps to graph nodes
const initialNodes: GraphNode[] = DEEP_DIVE_CONFIG.workflow.steps.map((step, index) => ({
  id: `step-${index + 1}`,
  label: step.title,
  type: 'other',
  weight: 0.9,
  description: step.text,
}));

// Create edges to link the steps sequentially
const initialEdges: GraphEdge[] = DEEP_DIVE_CONFIG.workflow.steps.slice(0, -1).map((_, index) => ({
  id: `e-${index + 1}`,
  source: `step-${index + 1}`,
  target: `step-${index + 2}`,
  type: 'other',
  weight: 0.8,
  label: 'Leads to',
}));

const KillChainDashboard: React.FC = () => {
  const [nodes, setNodes] = useState<GraphNode[]>(initialNodes);
  const [edges, setEdges] = useState<GraphEdge[]>(initialEdges);

  const handleNodeClick = (node: GraphNode) => {
    console.log('Node clicked:', node);
    // Future logic to expand the graph will go here
  };

  return (
    <div className="w-full h-[700px] bg-slate-900/50 rounded-lg border border-slate-700">
      <KnowledgeGraph 
        nodes={nodes} 
        edges={edges}
        enableDragging={true}
        showLabels={true}
        showEdgeLabels={false}
        usePhysics={true}
        highlightConnections={true}
        height={700}
        onNodeClick={handleNodeClick}
      />
    </div>
  );
};

export default KillChainDashboard; 