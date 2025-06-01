'use client';

import React, { useState } from 'react';
import { 
  DataVisualizer, 
  InteractiveCanvas, 
  SequenceViewer, 
  RiskHeatmap, 
  ScientificNotation, 
  DashboardLayout,
  KnowledgeGraph,
  TimelineVisualizer,
  GraphNode,
  GraphEdge,
  TimelineTrack,
} from '@/components/visualization';
// Import the old SequenceAnnotation type for the adapter function
import type { SequenceAnnotation as OldSequenceAnnotation } from '@/components/visualization';
// Import the new CrisPROAnnotationDetailsPanel and its interface
import CrisPROAnnotationDetailsPanel, { CrisPROSequenceAnnotation } from '@/components/ui/CrisPROAnnotationDetailsPanel';
// Import the sample data
import { sampleCrisPROAnnotations } from './sampleCrisPROAnnotationsData';

import CrisprGenomeEditor from '@/components/ui/CrisprGenomeEditor';
import ProteinFoldingVisualizer from '@/components/ui/ProteinFoldingVisualizer';
import DoubleDnaHelix from '@/components/ui/DoubleDnaHelix';
import { motion, AnimatePresence } from 'framer-motion';

// CrisPROSequenceAnnotation interface is now imported from CrisPROAnnotationDetailsPanel.tsx

// Sample data for demonstrations
const sampleSequence = 'ATGCTAGCTAGCTAGCTAGCTATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGAT';

// Use the CrisPROSequenceAnnotation (imported) for sample data
// const sampleCrisPROAnnotations: CrisPROSequenceAnnotation[] = [ ... array content removed ... ]; // This is now imported

// Heatmap data for RiskHeatmap
const sampleHeatmapData = Array(10).fill(0).map((_, i) => 
  Array(10).fill(0).map((_, j) => ({
    x: `Gene ${String.fromCharCode(65 + j)}`,
    y: `Variant ${i + 1}`,
    value: Math.random(),
    significance: Math.random() > 0.7,
    metadata: { notes: `Sample note for ${String.fromCharCode(65 + j)}-${i + 1}` }
  }))
).flat();

// Knowledge graph data
const graphNodes: GraphNode[] = [
  { id: 'g1', label: 'BRCA1', type: 'gene', weight: 0.9, description: 'Breast cancer susceptibility gene 1' },
  { id: 'g2', label: 'TP53', type: 'gene', weight: 0.85, description: 'Tumor protein p53' },
  { id: 'v1', label: 'rs28897696', type: 'variant', weight: 0.7, description: 'Missense variant in BRCA1' },
  { id: 'v2', label: 'rs121912651', type: 'variant', weight: 0.75, description: 'Missense variant in TP53' },
  { id: 'o1', label: 'Breast Cancer', type: 'outcome', weight: 0.9, description: 'Increased risk of breast cancer' },
  { id: 'o2', label: 'Ovarian Cancer', type: 'outcome', weight: 0.8, description: 'Increased risk of ovarian cancer' },
  { id: 't1', label: 'PARP Inhibitors', type: 'therapy', weight: 0.75, description: 'Poly ADP ribose polymerase inhibitors' },
  { id: 't2', label: 'Platinum Chemotherapy', type: 'therapy', weight: 0.7, description: 'DNA crosslinking agents' },
  { id: 'p1', label: 'Robson et al. 2017', type: 'publication', weight: 0.6, description: 'NEJM study on PARP inhibitors' },
  { id: 'p2', label: 'Turner et al. 2019', type: 'publication', weight: 0.5, description: 'Study on TP53 mutations' },
];

const graphEdges: GraphEdge[] = [
  { id: 'e1', source: 'g1', target: 'v1', type: 'includes', weight: 0.9, label: 'Has variant' },
  { id: 'e2', source: 'g2', target: 'v2', type: 'includes', weight: 0.9, label: 'Has variant' },
  { id: 'e3', source: 'v1', target: 'o1', type: 'causes', weight: 0.8, label: 'Increases risk' },
  { id: 'e4', source: 'v1', target: 'o2', type: 'causes', weight: 0.7, label: 'Increases risk' },
  { id: 'e5', source: 'v2', target: 'o1', type: 'causes', weight: 0.6, label: 'Increases risk' },
  { id: 'e6', source: 't1', target: 'o1', type: 'treats', weight: 0.8, label: 'Effective for' },
  { id: 'e7', source: 't2', target: 'o2', type: 'treats', weight: 0.7, label: 'Effective for' },
  { id: 'e8', source: 'p1', target: 't1', type: 'reports', weight: 0.9, label: 'Reports on' },
  { id: 'e9', source: 'p2', target: 'v2', type: 'reports', weight: 0.8, label: 'Reports on' },
  { id: 'e10', source: 'g1', target: 'g2', type: 'associates', weight: 0.5, label: 'Interacts with' },
];

// Timeline data
const timelineTracks: TimelineTrack[] = [
  {
    id: 'disease',
    title: 'Disease Progression',
    color: '#ef4444',
    events: [
      { 
        id: 'e1', 
        title: 'Initial Diagnosis', 
        timestamp: 0, 
        riskLevel: 0.6,
        confidenceLevel: 0.9,
        description: 'Patient diagnosed with early-stage disease'
      },
      { 
        id: 'e2', 
        title: 'First Symptoms', 
        timestamp: -30, 
        riskLevel: 0.3,
        confidenceLevel: 0.7,
        description: 'Patient reported initial symptoms'
      },
      { 
        id: 'e3', 
        title: 'Disease Progression', 
        timestamp: 90, 
        riskLevel: 0.8,
        confidenceLevel: 0.8,
        description: 'Disease advanced to next stage'
      },
    ],
    stages: [
      {
        id: 's1',
        title: 'Early Stage',
        startTime: -30,
        endTime: 45,
        riskLevel: 0.4,
        description: 'Early stage of disease progression'
      },
      {
        id: 's2',
        title: 'Advanced Stage',
        startTime: 45,
        endTime: 120,
        riskLevel: 0.7,
        description: 'Advanced stage of disease progression'
      },
    ]
  },
  {
    id: 'treatment',
    title: 'Treatment Timeline',
    color: '#3b82f6',
    events: [
      { 
        id: 'e4', 
        title: 'Treatment Initiation', 
        timestamp: 15, 
        riskLevel: 0.2,
        confidenceLevel: 0.9,
        description: 'First-line treatment initiated'
      },
      { 
        id: 'e5', 
        title: 'Side Effects', 
        timestamp: 30, 
        riskLevel: 0.5,
        confidenceLevel: 0.8,
        description: 'Patient experienced side effects'
      },
      { 
        id: 'e6', 
        title: 'Treatment Change', 
        timestamp: 60, 
        riskLevel: 0.4,
        confidenceLevel: 0.7,
        description: 'Switched to second-line treatment'
      },
    ],
    stages: [
      {
        id: 's3',
        title: 'First-line Treatment',
        startTime: 15,
        endTime: 60,
        riskLevel: 0.3,
        description: 'Initial treatment protocol'
      },
      {
        id: 's4',
        title: 'Second-line Treatment',
        startTime: 60,
        endTime: 120,
        riskLevel: 0.5,
        description: 'Modified treatment protocol'
      },
    ]
  },
  {
    id: 'biomarkers',
    title: 'Biomarker Levels',
    color: '#10b981',
    events: [
      { 
        id: 'e7', 
        title: 'Elevated Marker A', 
        timestamp: -15, 
        riskLevel: 0.6,
        confidenceLevel: 0.7,
        description: 'Biomarker A elevated above normal range'
      },
      { 
        id: 'e8', 
        title: 'Peak Marker B', 
        timestamp: 45, 
        riskLevel: 0.8,
        confidenceLevel: 0.9,
        description: 'Biomarker B reached peak concentration'
      },
      { 
        id: 'e9', 
        title: 'Normalized Marker A', 
        timestamp: 75, 
        riskLevel: 0.2,
        confidenceLevel: 0.8,
        description: 'Biomarker A returned to normal range'
      },
    ]
  },
];

export default function VisualizationDemoPage() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedAnnotationDetail, setSelectedAnnotationDetail] = useState<CrisPROSequenceAnnotation | null>(null);

  const adaptCrisPROAnnotationToOldFormat = (crisproAn: CrisPROSequenceAnnotation): OldSequenceAnnotation => {
    let oldType: string = crisproAn.baseAnnotationType;
    if (crisproAn.baseAnnotationType === 'regulatory_region') oldType = 'regulatory';
    else if (crisproAn.baseAnnotationType === 'mutation_site') oldType = 'mutation';
    else if (crisproAn.baseAnnotationType === 'cds') oldType = 'cds';
    else if (crisproAn.baseAnnotationType === 'utr') oldType = 'utr';
    else if (crisproAn.baseAnnotationType === 'ins_del') oldType = 'mutation';
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
  
  const adaptedSampleAnnotationsForViewer = sampleCrisPROAnnotations.map(adaptCrisPROAnnotationToOldFormat);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'sequence', label: 'Sequence Viewer' },
    { id: 'heatmap', label: 'Risk Heatmap' },
    { id: 'knowledgegraph', label: 'Knowledge Graph' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'canvas', label: '3D Visualization' },
    { id: 'notation', label: 'Scientific Notation' },
  ];

  const handleAnnotationClickInWidget = (item: OldSequenceAnnotation | any) => {
    if (item && typeof item === 'object' && 'id' in item) {
      const fullAnnotation = sampleCrisPROAnnotations.find(anno => anno.id === item.id);
      setSelectedAnnotationDetail(fullAnnotation || null);
    } else {
      setSelectedAnnotationDetail(null);
      console.log('Clicked item is not a full annotation or is a simple range:', item);
    }
  };

  const dashboardPanels = [
    {
      id: 'sequence-widget',
      title: 'Gene Sequence Analysis',
      content: (
        <SequenceViewer 
          sequence={sampleSequence.slice(0, 50)}
          annotations={adaptedSampleAnnotationsForViewer.filter(a => a.end <= 50)}
          onRequestAIInsight={handleAnnotationClickInWidget}
          basesPerLine={50}
        />
      ),
      width: 'half' as const,
      height: 'large' as const,
    },
    {
      id: 'heatmap-widget',
      title: 'Variant Risk Assessment',
      content: (
        <RiskHeatmap 
          data={sampleHeatmapData.slice(0, 25)} 
          showLegend={false}
        />
      ),
      width: 'half' as const,
      height: 'large' as const,
    },
    {
      id: 'graph-widget',
      title: 'Gene-Variant Relationships',
      content: (
        <KnowledgeGraph 
          nodes={graphNodes.slice(0, 6)} 
          edges={graphEdges.filter(e => 
            graphNodes.slice(0, 6).some(n => n.id === e.source) && 
            graphNodes.slice(0, 6).some(n => n.id === e.target)
          )}
          showLabels={true}
          enableZoom={true}
          highlightConnections={true}
        />
      ),
      width: 'full' as const,
      height: 'large' as const,
    },
    {
      id: 'timeline-widget',
      title: 'Treatment & Disease Timeline',
      content: (
        <TimelineVisualizer 
          tracks={timelineTracks.slice(0, 2)} 
          startTime={-50}
          endTime={150}
          timeUnit="days"
          showRiskIndicators={true}
        />
      ),
      width: 'full' as const,
      height: 'large' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">CrisPRO Visualization Framework</h1>
        <p className="text-slate-400 max-w-3xl">
          A comprehensive set of visualization components for CRISPR therapeutic development,
          including sequence analysis, risk assessment, knowledge graphs, and timeline visualization.
        </p>
      </header>

      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === tab.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === 'dashboard' && (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:flex-grow space-y-6">
              <h2 className="text-xl font-semibold mb-0">Integrated Visualization Dashboard</h2>
              <div className="min-h-screen">
                <DashboardLayout panels={dashboardPanels} gap="large" />
              </div>
            </div>

            {/* Use the new CrisPROAnnotationDetailsPanel component */}
            <CrisPROAnnotationDetailsPanel 
              annotation={selectedAnnotationDetail} 
              onClose={() => setSelectedAnnotationDetail(null)} 
            />
          </div>
        )}

        {activeTab === 'sequence' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">DNA/RNA Sequence Viewer</h2>
            <p className="text-slate-400 mb-4">
              Interactive visualization of genetic sequences with annotation support.
            </p>
            <div className="bg-slate-900 p-4 rounded-lg">
              <SequenceViewer 
                sequence={sampleSequence} 
                annotations={adaptedSampleAnnotationsForViewer}
                showControls={true}
                enableSelection={true}
                showPositions={true}
                onRequestAIInsight={(item) => { 
                  if (item && typeof item === 'object' && 'id' in item) {
                    const fullAnnotation = sampleCrisPROAnnotations.find(anno => anno.id === item.id);
                    setSelectedAnnotationDetail(fullAnnotation || null);
                    setActiveTab('dashboard'); 
                  }
                }}
              />
            </div>
          </div>
        )}

        {activeTab === 'heatmap' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Risk Assessment Heatmap</h2>
            <p className="text-slate-400 mb-4">
              Visualize risk scores across multiple variants and factors with support for 
              significance highlighting and interactive exploration.
            </p>
            <div className="bg-slate-900 p-4 rounded-lg">
              <RiskHeatmap 
                data={sampleHeatmapData} 
                showLegend={true}
                enableSelection={true}
                showLabels={true}
                height={500}
              />
            </div>
          </div>
        )}

        {activeTab === 'knowledgegraph' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Biomedical Knowledge Graph</h2>
            <p className="text-slate-400 mb-4">
              Interactive network visualization of relationships between genes, variants, 
              outcomes, therapeutic approaches, and scientific literature.
            </p>
            <div className="bg-slate-900 p-4 rounded-lg">
              <KnowledgeGraph 
                nodes={graphNodes} 
                edges={graphEdges}
                enableDragging={true}
                showLabels={true}
                showEdgeLabels={false}
                usePhysics={true}
                highlightConnections={true}
                height={600}
                onNodeClick={(node) => console.log('Node clicked:', node)}
                onEdgeClick={(edge) => console.log('Edge clicked:', edge)}
              />
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
           <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Disease & Treatment Timeline</h2>
            <p className="text-slate-400 mb-4">
              Visualize disease progression, treatment events, and biomarker changes over time
              with risk and confidence indicators.
            </p>
            <div className="bg-slate-900 p-4 rounded-lg">
              <TimelineVisualizer 
                tracks={timelineTracks}
                timeMode="relative"
                timeUnit="days"
                startTime={-50}
                endTime={150}
                showCurrentTime={true}
                enableZoom={true}
                enablePan={true}
                showRiskIndicators={true}
                height={400}
                onEventClick={(event) => console.log('Event clicked:', event)}
                onStageClick={(stage) => console.log('Stage clicked:', stage)}
              />
            </div>
          </div>
        )}

        {activeTab === 'canvas' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Interactive 3D Visualization</h2>
            <p className="text-slate-400 mb-4">
              Foundation for 3D molecular visualization with camera controls and interactive elements.
            </p>
            <div className="bg-slate-900 p-4 rounded-lg h-[500px]">
              <InteractiveCanvas 
                rotationEnabled={true}
                zoomEnabled={true}
                panEnabled={true}
              >
                <mesh>
                  <boxGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial color="#3b82f6" />
                </mesh>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
              </InteractiveCanvas>
            </div>
          </div>
        )}

        {activeTab === 'notation' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Scientific Notation Components</h2>
            <p className="text-slate-400 mb-4">
              Components for displaying scientific values with appropriate formatting and significance indicators.
            </p>
            <div className="bg-slate-900 p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Numeric Values</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Standard Value:</span>
                    <ScientificNotation value={0.42} />
                  </div>
                  <div className="flex justify-between">
                    <span>Small Value:</span>
                    <ScientificNotation value={0.00000235} />
                  </div>
                  <div className="flex justify-between">
                    <span>Large Value:</span>
                    <ScientificNotation value={42500000} />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Risk Indicators</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Low Risk:</span>
                    <ScientificNotation value={0.12} percentage={true} isSignificant={false} />
                  </div>
                  <div className="flex justify-between">
                    <span>Medium Risk:</span>
                    <ScientificNotation value={0.54} percentage={true} isSignificant={false} />
                  </div>
                  <div className="flex justify-between">
                    <span>High Risk:</span>
                    <ScientificNotation value={0.89} percentage={true} isSignificant={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 