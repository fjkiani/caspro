/**
 * @file KnowledgeGraphExample.tsx
 * @description This component provides a demonstration and testing environment for the
 * KnowledgeGraph component. It showcases how to instantiate the graph with sample data
 * and provides UI controls to interact with its physics parameters and features.
 *
 * CrisPRO.ai Context and Purpose:
 * - Feature Demonstration: Illustrates how CrisPRO.ai-specific properties like
 *   `aiRelevanceScore`, `insightSummary`, and `predictedImpact` on nodes, and
 *   `confidenceScore` on edges, are passed to and can be utilized by the
 *   KnowledgeGraph component.
 * - Interactive Testing: Allows developers and users to experiment with graph physics
 *   (repulsion, spring length, damping) and node spacing to understand their impact on
 *   visualization, which is crucial for optimizing the display of complex CrisPRO.ai-generated datasets.
 * - Simulation Control: Demonstrates manual control over the physics simulation
 *   (`simulationActive` state and `toggleSimulation` function), a pattern that might be
 *   used in the main CrisPRO.ai application to allow users to pause and resume complex layouts.
 * - Data Structure Example: The `nodes` and `edges` data directly exemplify the kind of
 *   structured information (including AI-derived scores) that CrisPRO.ai agents would
 *   provide to the graph.
 * - Therapeutic Context Simulation: The `therapeuticContext` prop passed to KnowledgeGraph
 *   simulates how a real CrisPRO.ai application would provide contextual information (e.g.,
 *   specific disease, patient cohort) to tailor the graph visualization.
 * - Node Detail Panel: The right-hand panel shows how detailed information for a selected
 *   node, including AI-generated insights and scores, can be displayed, mimicking a key UI
 *   pattern in CrisPRO.ai for data exploration.
 *
 * This example serves as a practical guide for integrating and configuring the
 * KnowledgeGraph within the broader CrisPRO.ai platform, ensuring that AI-enhanced
 * data is effectively visualized and interactively explorable.
 */
'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import KnowledgeGraph, { GraphNode as BaseGraphNode, GraphEdge as BaseGraphEdge, CrisPROGraphNodeDetailedType } from './KnowledgeGraph';

// CrisPRO.ai Specific Tutorial Steps
interface CrisPROTutorialStep {
  id: string;
  title: string;
  description: string;
  action?: () => void;
  highlightElement?: string;
  focusOnNode?: string;
  userActionPrompt?: string;
}

const crisPROTutorialSteps: CrisPROTutorialStep[] = [
  {
    id: 'welcome_crispro',
    title: 'Welcome to the CrisPRO.ai Enhanced Knowledge Graph!',
    description: 'This graph doesn\'t just show connections; it uses AI to help you find the most important information for CRISPR research. Let\'s explore how!',
    highlightElement: '.crispro-ai-header'
  },
  {
    id: 'therapeutic_context',
    title: 'Focusing Your Research: Therapeutic Context',
    description: 'The \"Therapeutic Context\" box (top left) lets you tell CrisPRO.ai what you\'re researching (e.g., \"Breast Cancer HER2+\", \"Cystic Fibrosis CFTR F508del\"). The graph will then try to prioritize information relevant to this context. The main graph component would use this to filter or emphasize nodes.',
    highlightElement: '#therapeuticContextInput',
    userActionPrompt: 'Try typing a different disease or gene into the \"Therapeutic Context\" box. Observe how this *could* change the graph in a fully integrated system.'
  },
  {
    id: 'ai_weighting',
    title: 'AI-Powered Prioritization: AI Weighting',
    description: 'Toggle \"AI Weighting\". When ON, CrisPRO.ai uses its AI models to assess the relevance and strength of evidence for each item and connection. Nodes and edges considered more important by the AI would appear more prominently (e.g., larger, brighter). This helps you spot key players quickly.',
    highlightElement: '#aiWeightingToggle',
    action: () => {
      const toggle = document.getElementById('aiWeightingToggle');
      if (toggle) toggle.click();
    },
    userActionPrompt: 'Toggle \"AI Weighting\" on and off. Imagine how this would change node/edge appearance based on their AI scores.'
  },
  {
    id: 'llm_insights',
    title: 'Deeper Understanding: LLM Insights',
    description: 'Toggle \"LLM Insights\". When ON, clicking a node tells CrisPRO.ai to fetch a detailed, AI-generated summary for that item, considering the current therapeutic context. This gives you quick, in-depth knowledge.',
    highlightElement: '#llmInsightsToggle',
    focusOnNode: '4',
    userActionPrompt: 'With \"LLM Insights\" ON, click the \"BRCA1 (Variant rs28397696A1)\" node. You\'ll see a *mock* AI summary appear in the details panel after a short delay.'
  },
  {
    id: 'pathway_highlighting',
    title: 'Seeing the Bigger Picture: Highlight Pathways',
    description: 'Toggle \"Highlight Pathways\". When ON, CrisPRO.ai can illuminate important biological pathways or sequences of connections that its AI has identified as critical for your research context. Edges with `inTherapeuticPath: true` (like some in this example) would be visually distinct.',
    highlightElement: '#highlightPathwaysToggle',
    action: () => {
      const toggle = document.getElementById('highlightPathwaysToggle');
      if (toggle) toggle.click();
    },
    userActionPrompt: 'Toggle \"Highlight Pathways\" ON. Observe that the `highlightKeyPathways` prop is passed to the graph. In a full implementation, edges marked as part of a key path would change appearance.'
  },
  {
    id: 'node_details_ai_scores',
    title: 'Decoding AI Scores: Node Details Panel',
    description: 'When you select a node, the right-hand panel shows several AI-derived scores:\n• CrisPRO.ai Relevance: AI\'s view of how relevant this item is to your current context.\n• CrisPRO.ai Evidence Strength: AI\'s confidence in the data supporting this item.\n• AI Predicted Impact (for Variants): AI\'s prediction of how impactful a genetic variant might be.',
    focusOnNode: '4',
    highlightElement: '.node-details-panel'
  },
  {
    id: 'edge_details_ai_scores',
    title: 'Decoding AI Scores: Edge Connections',
    description: 'Edges (connections) in our data also have AI scores like \"Confidence Score\", \"Clinical Relevance\", and \"Literature Support\". While not directly listed in the details panel for edges yet, these scores influence features like AI Weighting and Pathway Highlighting behind the scenes.',
    userActionPrompt: 'Hover over different edges. Their properties (like `inTherapeuticPath`) are used by the main graph component.'
  },
  {
    id: 'conclusion_crispro',
    title: 'Explore with AI Assistance!',
    description: 'You\'ve seen how CrisPRO.ai enhances the knowledge graph. Now, feel free to explore! Change contexts, toggle AI features, and click on nodes/edges to see how AI can guide your CRISPR research.'
  }
];

// BaseGraphNode.type is assumed to be: 'gene' | 'variant' | 'outcome' | 'therapy' | 'publication' | 'other' (and NOT optional)
// BaseGraphEdge.type is assumed to be: 'causes' | 'treats' | 'associates' | 'reports' | 'includes' | 'other' | undefined

export interface CrisPROGraphNode extends Omit<BaseGraphNode, 'type' | 'label' | 'id' | 'description' | 'metadata'> { // Omit properties that BaseGraphNode mandates to avoid conflict, then redefine them if CrisPRO needs them (which it does)
  id: string; // Ensure id is string as BaseGraphNode likely requires
  label: string; // Ensure label is string
  type: 'gene' | 'variant' | 'outcome' | 'therapy' | 'publication' | 'other'; // Must match BaseGraphNode.type exact union and be non-optional
  crisproDetailedType?: CrisPROGraphNodeDetailedType; // Use the correct type from KnowledgeGraph.tsx
  description?: string;
  metadata?: any;
  baseEvidenceScore?: number;
  aiRelevanceScore?: number;
  predictedImpact?: number;
  vusClassification?: 'Pathogenic' | 'Likely Pathogenic' | 'VUS' | 'Likely Benign' | 'Benign';
  crisprTargetabilityScore?: number;
  insightSummary?: string;
  llmGeneratedSummaryTimestamp?: string;
  therapeuticContext?: string; 
  evidenceStrength?: number; 
  prophylacticSuitabilityScore?: number;
  druggabilityIndex?: number;
}

export interface CrisPROGraphEdge extends Omit<BaseGraphEdge, 'type' | 'id' | 'source' | 'target' | 'label' | 'weight'> {
  id: string;
  source: string;
  target: string;
  type?: 'causes' | 'treats' | 'associates' | 'reports' | 'includes' | 'other'; // Must match BaseGraphEdge.type union, can be optional if BaseGraphEdge.type is optional
  crisproDetailedEdgeType?: 'REPORTS_ON_THERAPY' | 'TREATS_DISEASE' | 'INCREASES_RISK_FOR_DISEASE' | 'SUPPORTS_THERAPY_USE' | 'ASSOCIATED_WITH_VARIANT' | 'RELATED_PUBLICATION' | 'IMPACTS_PATHWAY' | 'TARGETS_PATHWAY_VULNERABILITY' | 'INFLUENCES_PATHWAY' | 'CUSTOM_CRISPRO_EDGE_TYPE';
  label?: string;
  weight?: number;
  confidenceScore?: number;
  evidenceSourceType?: 'Literature' | 'ClinicalTrial' | 'CrisPRO_Simulation' | 'CrisPRO_Prediction' | 'User_Annotated';
  mechanismDetails?: string;
  isSynergistic?: boolean;
  isAntagonistic?: boolean;
  inTherapeuticPath?: boolean; 
  clinicalRelevance?: number; 
  literatureSupport?: number; 
}

/**
 * @function KnowledgeGraphExample
 * @description A functional React component that demonstrates the usage of the 
 * `KnowledgeGraph` component with sample data and interactive controls.
 * It allows for dynamic adjustment of graph physics and showcases how AI-enhanced
 * data from CrisPRO.ai can be visualized.
 */
export default function KnowledgeGraphExample() {
  const initialNodes: CrisPROGraphNode[] = [
    {
      id: '1',
      label: 'Robson et al. 2017',
      type: 'publication',
      description: 'Clinical trial of PARP inhibitors in BRCA-mutated breast cancer',
      baseEvidenceScore: 0.8,
      aiRelevanceScore: 0.92,
      therapeuticContext: 'BRCA-mutated breast cancer',
      evidenceStrength: 0.85,
      llmGeneratedSummaryTimestamp: '2023-10-26T14:00:00Z',
      metadata: { journal: 'NEJM', year: 2017 }
    },
    {
      id: '2',
      label: 'PARP Inhibitors',
      type: 'therapy',
      description: 'Poly (ADP-ribose) polymerase inhibitors used in treatment of BRCA-mutated cancers',
      baseEvidenceScore: 0.9,
      aiRelevanceScore: 0.95,
      insightSummary: 'CrisPRO Agent Insight: Highly relevant for BRCA1/2 mutation carriers. Clinical trials show significant PFS benefits. LLM analysis indicates emerging resistance mechanisms to monitor.',
      therapeuticContext: 'BRCA-mutated breast cancer',
      evidenceStrength: 0.9,
      druggabilityIndex: 0.85,
      llmGeneratedSummaryTimestamp: '2023-10-27T11:00:00Z',
      metadata: { drugClass: 'Enzyme Inhibitor'}
    },
    {
      id: '3',
      label: 'Breast Cancer',
      type: 'outcome', // Assuming 'outcome' is a valid BaseGraphNode type. If not, use 'other'.
      crisproDetailedType: 'disease',
      description: 'Malignant breast neoplasm',
      baseEvidenceScore: 1.0,
      aiRelevanceScore: 0.97,
      therapeuticContext: 'BRCA-mutated breast cancer',
      evidenceStrength: 0.98,
      metadata: { prevalence: 'High in BRCA mutation carriers'}
    },
    {
      id: '4',
      label: 'BRCA1 (Variant rs28397696A1)',
      type: 'variant',
      crisproDetailedType: 'pathogenic_variant', // Example of storing detailed CrisPRO type
      description: 'Pathogenic BRCA1 variant linked to increased breast cancer risk.',
      baseEvidenceScore: 0.85,
      aiRelevanceScore: 0.90,
      predictedImpact: 0.95,
      vusClassification: 'Pathogenic',
      crisprTargetabilityScore: 0.88,
      therapeuticContext: 'BRCA-mutated breast cancer',
      insightSummary: 'CrisPRO Analysis: Pathogenic variant. High predicted impact (0.95). Strong candidate for prophylactic intervention via HDR. Off-target risk assessment by CrisPRO suggests 3 high-priority sites for validation. (LLM-gen v1.3)',
      llmGeneratedSummaryTimestamp: '2023-10-27T10:30:00Z',
      evidenceStrength: 0.92,
      prophylacticSuitabilityScore: 0.9,
      metadata: { gene: 'BRCA1', allele: 'A1'}
    },
    {
      id: '5',
      label: 'Ovarian Cancer',
      type: 'outcome', // Assuming 'outcome' is valid for BaseGraphNode
      crisproDetailedType: 'disease',
      description: 'Malignant ovarian neoplasm, often associated with BRCA mutations.',
      baseEvidenceScore: 0.75,
      aiRelevanceScore: 0.82,
      therapeuticContext: 'BRCA-mutated cancers',
      evidenceStrength: 0.80,
      metadata: { relatedTo: 'BRCA1/2'}
    },
    {
      id: '6',
      label: 'BRCA2 (Variant rs5991231)',
      type: 'variant',
      crisproDetailedType: 'pathogenic_variant',
      description: 'Pathogenic BRCA2 variant, common in hereditary breast and ovarian cancer.',
      baseEvidenceScore: 0.80,
      aiRelevanceScore: 0.88,
      predictedImpact: 0.88,
      vusClassification: 'Pathogenic',
      crisprTargetabilityScore: 0.85,
      therapeuticContext: 'BRCA-mutated cancers',
      insightSummary: 'CrisPRO Analysis: Pathogenic. Similar prophylactic potential to BRCA1 variant but may require different gRNA design due to sequence context. CrisPRO Simulation Core predicts 80% correction efficiency with proposed strategy.',
      llmGeneratedSummaryTimestamp: '2023-10-27T12:15:00Z',
      evidenceStrength: 0.85,
      metadata: { gene: 'BRCA2'}
    },
    {
      id: '7',
      label: 'Platinum Chemotherapy',
      type: 'therapy',
      description: 'Platinum-based chemotherapy agents, effective in BRCA-deficient tumors.',
      baseEvidenceScore: 0.7,
      aiRelevanceScore: 0.75,
      therapeuticContext: 'BRCA-mutated cancers',
      insightSummary: 'CrisPRO Agent Insight: Standard of care. LLM analysis of recent literature suggests PARP inhibitor combination significantly improves outcomes.',
      evidenceStrength: 0.78,
      metadata: { mechanism: 'DNA cross-linking' }
    },
    {
      id: '8',
      label: 'Turner et al. 2019',
      type: 'publication',
      description: 'Study on synthetic lethality in BRCA-deficient cells, supporting PARP inhibitor use.',
      baseEvidenceScore: 0.65,
      aiRelevanceScore: 0.70,
      therapeuticContext: 'BRCA-mutated breast cancer',
      evidenceStrength: 0.72,
      metadata: { journal: 'Lancet Oncology', year: 2019 }
    },
    {
      id: '9',
      label: 'DNA Repair Pathway (HR)',
      type: 'other', // Changed from 'pathway' to 'other' to match assumed BaseGraphNode.type
      crisproDetailedType: 'pathway', 
      description: 'Homologous Recombination pathway, critical for repairing double-strand breaks. Often compromised in BRCA-mutated cells.',
      baseEvidenceScore: 0.9,
      aiRelevanceScore: 0.93,
      therapeuticContext: 'BRCA-mutated cancers',
      insightSummary: 'CrisPRO Agent Insight: Key vulnerability. PARP inhibitors exploit HR deficiency. CrisPRO can model impact of edits on this pathway.',
      metadata: { process: 'Homologous Recombination' }
    },
    {
      id: '10',
      label: 'Cell Cycle Checkpoint (G2/M)',
      type: 'other', // Changed from 'pathway' to 'other'
      crisproDetailedType: 'pathway',
      description: 'Regulatory points in the cell cycle ensuring proper cell division. Often dysregulated in cancer.',
      baseEvidenceScore: 0.7,
      aiRelevanceScore: 0.65,
      therapeuticContext: 'General Oncology',
      metadata: { involvedIn: 'Cancer Progression' }
    }
  ];

  const initialEdges: CrisPROGraphEdge[] = [
    // Ensure 'type' for edges matches BaseGraphEdge.type or is undefined if allowed by BaseGraphEdge.type
    // Store CrisPRO specific edge types in 'crisproDetailedEdgeType'
    { id: 'e1', source: '1', target: '2', type: 'reports', crisproDetailedEdgeType: 'REPORTS_ON_THERAPY', weight: 0.9, confidenceScore: 0.95, label: 'Reports Use Of', clinicalRelevance: 0.9, literatureSupport: 0.88, evidenceSourceType: 'Literature' },
    { id: 'e2', source: '2', target: '3', type: 'treats', crisproDetailedEdgeType: 'TREATS_DISEASE', weight: 0.85, confidenceScore: 0.90, label: 'Treats', clinicalRelevance: 0.92, literatureSupport: 0.9, inTherapeuticPath: true, evidenceSourceType: 'ClinicalTrial' },
    { id: 'e3', source: '4', target: '3', type: 'causes', crisproDetailedEdgeType: 'INCREASES_RISK_FOR_DISEASE', weight: 0.95, confidenceScore: 0.92, label: 'Increases Risk Of', clinicalRelevance: 0.95, literatureSupport: 0.93, inTherapeuticPath: true, evidenceSourceType: 'Literature' },
    { id: 'e4', source: '2', target: '5', type: 'treats', crisproDetailedEdgeType: 'TREATS_DISEASE', weight: 0.80, confidenceScore: 0.85, label: 'Treats', clinicalRelevance: 0.80, literatureSupport: 0.82, evidenceSourceType: 'ClinicalTrial' },
    { id: 'e5', source: '6', target: '5', type: 'causes', crisproDetailedEdgeType: 'INCREASES_RISK_FOR_DISEASE', weight: 0.90, confidenceScore: 0.88, label: 'Increases Risk Of', clinicalRelevance: 0.87, literatureSupport: 0.85, inTherapeuticPath: true, evidenceSourceType: 'Literature'},
    { id: 'e6', source: '7', target: '5', type: 'treats', crisproDetailedEdgeType: 'TREATS_DISEASE', weight: 0.75, confidenceScore: 0.80, label: 'Treats', clinicalRelevance: 0.78, literatureSupport: 0.75, evidenceSourceType: 'ClinicalTrial' },
    { id: 'e7', source: '8', target: '2', type: 'reports', crisproDetailedEdgeType: 'SUPPORTS_THERAPY_USE', weight: 0.70, confidenceScore: 0.75, label: 'Supports Use Of', clinicalRelevance: 0.7, literatureSupport: 0.65, evidenceSourceType: 'Literature' },
    { id: 'e8', source: '7', target: '3', type: 'treats', crisproDetailedEdgeType: 'TREATS_DISEASE', weight: 0.65, confidenceScore: 0.70, label: 'Treats', clinicalRelevance: 0.68, literatureSupport: 0.62, evidenceSourceType: 'ClinicalTrial' },
    { id: 'e9', source: '4', target: '6', type: 'associates', crisproDetailedEdgeType: 'ASSOCIATED_WITH_VARIANT', weight: 0.60, confidenceScore: 0.65, label: 'Co-occurs With', clinicalRelevance: 0.5, literatureSupport: 0.55, evidenceSourceType: 'User_Annotated' }, 
    { id: 'e10', source: '1', target: '8', type: 'associates', crisproDetailedEdgeType: 'RELATED_PUBLICATION', weight: 0.50, confidenceScore: 0.55, label: 'Related Research', clinicalRelevance: 0.4, literatureSupport: 0.45, evidenceSourceType: 'Literature' },
    { id: 'e11', source: '4', target: '9', type: 'associates', crisproDetailedEdgeType: 'IMPACTS_PATHWAY', weight: 0.88, confidenceScore: 0.90, label: 'Impacts HR Pathway', clinicalRelevance: 0.92, literatureSupport: 0.89, inTherapeuticPath: true, mechanismDetails: 'BRCA1 loss impairs Homologous Recombination.', evidenceSourceType: 'CrisPRO_Prediction' },
    { id: 'e12', source: '2', target: '9', type: 'associates', crisproDetailedEdgeType: 'TARGETS_PATHWAY_VULNERABILITY', weight: 0.92, confidenceScore: 0.94, label: 'Targets HR Deficiency', clinicalRelevance: 0.95, literatureSupport: 0.91, inTherapeuticPath: true, mechanismDetails: 'PARP inhibitors exploit synthetic lethality in HR-deficient cells.', evidenceSourceType: 'Literature' },
    { id: 'e13', source: '9', target: '10', type: 'associates', crisproDetailedEdgeType: 'INFLUENCES_PATHWAY', weight: 0.70, confidenceScore: 0.68, label: 'Influences Cell Cycle', clinicalRelevance: 0.60, literatureSupport: 0.65, evidenceSourceType: 'Literature' }
  ];
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<CrisPROGraphNode[]>(initialNodes);
  const [edges, setEdges] = useState<CrisPROGraphEdge[]>(initialEdges);
  const [isLoadingLLMInsight, setIsLoadingLLMInsight] = useState(false);

  const [showTutorial, setShowTutorial] = useState(true);
  const [currentTutorialStepIndex, setCurrentTutorialStepIndex] = useState(0);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);
  const [highlightedElementSelector, setHighlightedElementSelector] = useState<string | null>(null);

  const [physicsConfig, setPhysicsConfig] = useState({
    repulsion: 6000,
    springLength: 280,
    damping: 0.85,
    maxVelocity: 35
  });

  const [nodeSpacing, setNodeSpacing] = useState(80);
  const [graphKey, setGraphKey] = useState(Date.now());
  const [simulationActive, setSimulationActive] = useState(true);
  const [selectedNode, setSelectedNode] = useState<CrisPROGraphNode | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<CrisPROGraphEdge | null>(null);

  const [enableAIFeatures, setEnableAIFeatures] = useState({
    aiWeighting: true,
    llmInsights: true,
    highlightPathways: false,
  });

  const [currentTherapeuticContext, setTherapeuticContextString] = useState('BRCA-mutated Cancers');

  useEffect(() => {
    console.log("Therapeutic Context Changed:", currentTherapeuticContext);
    setNodes(prevNodes => prevNodes.map(n => ({
        ...n,
        aiRelevanceScore: n.therapeuticContext === currentTherapeuticContext || n.therapeuticContext?.includes('General')
                          ? Math.min(1, (n.aiRelevanceScore || 0.5) + 0.1)
                          : Math.max(0, (n.aiRelevanceScore || 0.5) - 0.1)
    })));
    setGraphKey(Date.now());
  }, [currentTherapeuticContext]);

  const handleNodeClick = useCallback((node: BaseGraphNode) => {
    const crisproNode = node as CrisPROGraphNode;
    setSelectedNode(crisproNode);
    setSelectedEdge(null);

    if (enableAIFeatures.llmInsights && crisproNode) {
      setIsLoadingLLMInsight(true);
      setTimeout(() => {
        setSelectedNode(prevNode => {
          if (prevNode && prevNode.id === crisproNode.id) {
            let insight = `(Mock CrisPRO LLM Insight for ${crisproNode.label} | Context: ${currentTherapeuticContext}):\n`;
            // Use crisproDetailedType for CrisPRO specific logic
            if (crisproNode.crisproDetailedType === 'pathogenic_variant' && crisproNode.predictedImpact && crisproNode.predictedImpact > 0.7) {
              insight += `High predicted pathogenicity (${(crisproNode.predictedImpact * 100).toFixed(0)}%). CrisPRO Therapeutic Strategy Agent suggests exploring HDR for correction if prophylactic context or precise knockout if tumor suppression. Key off-target risks identified in genes X, Y, Z. Consider high-fidelity nucleases.`;
            } else if (crisproNode.type === 'therapy') { // Base type check is fine here if general
              insight += `This therapy shows high CrisPRO AI Relevance for ${currentTherapeuticContext}. CrisPRO Literature Analysis Module identified 3 new supporting publications this week. CrisPRO Digital Twin simulation predicts 75% efficacy with manageable immunogenicity for this patient profile.`;
            } else if (crisproNode.crisproDetailedType === 'pathway') { 
                insight += `This pathway (${crisproNode.label}) is critical in ${currentTherapeuticContext}. CrisPRO Simulation Core can model the effects of interventions targeting this pathway. Current aiRelevanceScore (${crisproNode.aiRelevanceScore?.toFixed(2)}) is high due to its central role.`;
            }
            else {
              insight += `Standard LLM summary for type '${crisproNode.type}'. Further CrisPRO analysis for detailed type '${crisproNode.crisproDetailedType || 'N/A'}' can provide deeper insights.`;
            }
            return { ...prevNode, insightSummary: insight, llmGeneratedSummaryTimestamp: new Date().toISOString() };
          }
          return prevNode;
        });
        setIsLoadingLLMInsight(false);
      }, 1500);
    }
  }, [enableAIFeatures.llmInsights, currentTherapeuticContext]);

  const handleEdgeClick = useCallback((edge: BaseGraphEdge | null) => {
    const crisproEdge = edge as CrisPROGraphEdge | null;
    setSelectedEdge(crisproEdge);
    setSelectedNode(null);

     if (enableAIFeatures.llmInsights && crisproEdge) {
      setIsLoadingLLMInsight(true);
      setTimeout(() => {
        setSelectedEdge(prevEdge => {
          if (prevEdge && prevEdge.id === crisproEdge?.id) {
            const sourceNode = nodes.find(n => n.id === crisproEdge.source);
            const targetNode = nodes.find(n => n.id === crisproEdge.target);
            let insight = `(Mock CrisPRO LLM Insight for edge: ${sourceNode?.label} -> ${targetNode?.label} | Context: ${currentTherapeuticContext}):\n`;
            insight += `This '${crisproEdge.crisproDetailedEdgeType || crisproEdge.type || 'N/A'}' relationship has a CrisPRO confidence of ${(crisproEdge.confidenceScore!*100).toFixed(0)}%. Evidence: ${crisproEdge.evidenceSourceType}. `;
            if (crisproEdge.inTherapeuticPath) {
                insight += `Part of key therapeutic pathway for ${currentTherapeuticContext}. `;
            }
            if (crisproEdge.mechanismDetails) {
                insight += `Mechanism: ${crisproEdge.mechanismDetails}`;
            }
            return { ...prevEdge, insightSummary: insight } as CrisPROGraphEdge;
          }
          return prevEdge;
        });
        setIsLoadingLLMInsight(false);
      }, 1200);
    }
  }, [enableAIFeatures.llmInsights, currentTherapeuticContext, nodes]);

  const handleResetLayout = useCallback(() => {
    setGraphKey(Date.now());
    setSimulationActive(false);
  }, []);

  const toggleSimulation = useCallback(() => {
    setSimulationActive(prev => !prev);
  }, []);

  const handlePhysicsChange = (param: keyof typeof physicsConfig, value: number) => {
    setPhysicsConfig(prev => ({ ...prev, [param]: value }));
  };

  const handleAIFeatureToggle = (feature: keyof typeof enableAIFeatures) => {
    setEnableAIFeatures(prev => ({ ...prev, [feature]: !prev[feature] }));
  };

  // Tutorial Logic
  const currentTutorialStep = crisPROTutorialSteps[currentTutorialStepIndex];

  const nextTutorialStep = () => {
    if (currentTutorialStepIndex < crisPROTutorialSteps.length - 1) {
      setCurrentTutorialStepIndex(prev => prev + 1);
    } else {
      setTutorialCompleted(true);
      setShowTutorial(false);
    }
  };

  const prevTutorialStep = () => {
    if (currentTutorialStepIndex > 0) {
      setCurrentTutorialStepIndex(prev => prev - 1);
    }
  };

  const skipTutorial = () => {
    setShowTutorial(false);
    setTutorialCompleted(true);
    setHighlightedElementSelector(null);
  };

  const restartTutorial = () => {
    setShowTutorial(true);
    setCurrentTutorialStepIndex(0);
    setTutorialCompleted(false);
  };

  useEffect(() => {
    if (showTutorial && currentTutorialStep) {
      setHighlightedElementSelector(currentTutorialStep.highlightElement || null);
      currentTutorialStep.action?.();
      if (currentTutorialStep.focusOnNode) {
        const nodeToFocus = nodes.find(n => n.id === currentTutorialStep.focusOnNode);
        if (nodeToFocus) {
            handleNodeClick(nodeToFocus);
        }
      }
    } else {
      setHighlightedElementSelector(null);
    }
  }, [currentTutorialStepIndex, showTutorial, currentTutorialStep, nodes, handleNodeClick]);

  return (
    <div ref={containerRef} className="p-4 md:p-6 bg-gray-950 text-white min-h-screen flex flex-col relative">
      {showTutorial && currentTutorialStep && (
        <div className="fixed inset-0 bg-black/80 z-40 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-lg p-6 max-w-2xl w-full shadow-2xl border border-slate-700 max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-sky-400">{currentTutorialStep.title}</h2>
                <p className="text-sm text-gray-400">CrisPRO.ai Guide: Step {currentTutorialStepIndex + 1} of {crisPROTutorialSteps.length}</p>
              </div>
              <button 
                onClick={skipTutorial}
                className="text-gray-400 hover:text-white text-sm"
              >
                Skip Tutorial
              </button>
            </div>
            <div className="mb-6 overflow-y-auto flex-grow">
              <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                {currentTutorialStep.description}
              </p>
              {currentTutorialStep.userActionPrompt && (
                <p className="mt-3 text-sm text-amber-400 italic bg-amber-900/30 p-2 rounded">
                  <strong>Try this:</strong> {currentTutorialStep.userActionPrompt}
                </p>
              )}
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
              <div 
                className="bg-sky-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentTutorialStepIndex + 1) / crisPROTutorialSteps.length) * 100}%` }}
              />
            </div>
            <div className="flex justify-between items-center">
              <button 
                onClick={prevTutorialStep}
                disabled={currentTutorialStepIndex === 0}
                className="px-4 py-2 bg-slate-600 hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed rounded text-sm transition-colors"
              >
                Previous
              </button>
              <button 
                onClick={nextTutorialStep}
                className="px-6 py-2 bg-sky-600 hover:bg-sky-700 rounded text-sm transition-colors"
              >
                {currentTutorialStepIndex === crisPROTutorialSteps.length - 1 ? 'Finish Guide' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showTutorial && highlightedElementSelector && (
        (() => {
          const targetElement = document.querySelector(highlightedElementSelector);
          if (!targetElement || !containerRef.current) return null;
          const targetRect = targetElement.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();
          
          const top = targetRect.top - containerRect.top + containerRef.current.scrollTop;
          const left = targetRect.left - containerRect.left + containerRef.current.scrollLeft;
          
          return (
            <div 
              className="absolute border-2 border-sky-400 rounded-md shadow-xl pointer-events-none z-30 transition-all duration-300 ease-in-out animate-pulse"
              style={{
                top: `${top - 6}px`,
                left: `${left - 6}px`,
                width: `${targetRect.width + 12}px`,
                height: `${targetRect.height + 12}px`,
                boxShadow: '0 0 25px 5px rgba(56, 189, 248, 0.7)', // Sky-400 glow
              }}
            />
          );
        })()
      )}

      <header className="mb-6 crispro-ai-header"> 
        <h1 className="text-3xl font-bold text-sky-400">CrisPRO.ai Knowledge Graph Explorer</h1>
        <div className="flex justify-between items-center">
        <p className="text-sm text-gray-400">
          Demonstrating interactive visualization of AI-enhanced biological relationship data.
        </p>
          {!showTutorial && tutorialCompleted && (
            <button 
              onClick={restartTutorial}
              className="text-sm text-sky-500 hover:text-sky-400 underline"
            >
              Restart CrisPRO.ai Guide
            </button>
          )}
        </div>
      </header>
      
      <div className="mb-6 p-4 bg-slate-800 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-3 text-sky-300">Graph Configuration</h2>
        <div className="mb-4">
            <label htmlFor="therapeuticContextInput" className="block text-sm text-gray-300 mb-1">Therapeutic Context:</label>
            <input 
              id="therapeuticContextInput"
              type="text"
              value={currentTherapeuticContext}
              onChange={(e) => setTherapeuticContextString(e.target.value)}
              className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:ring-sky-500 focus:border-sky-500"
              placeholder="e.g., Lung Adenocarcinoma, EGFR pathway"
            />
            <p className="text-xs text-gray-500 mt-1">
              CrisPRO.ai: Enter a context to see how the graph might filter or emphasize relevant information.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            {/* <h3 className="text-md font-medium mb-2 text-gray-300">Physics Parameters:</h3>
            {Object.entries(physicsConfig).map(([key, value]) => (
              <div key={key} className="mb-2">
                <label className="block text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                <input 
                  type="range" 
                  min={key === 'damping' ? 0.5 : (key === 'repulsion' ? 500 : 50)}
                  max={key === 'damping' ? 0.99 : (key === 'repulsion' ? 10000 : (key === 'springLength' ? 500 : 100))}
                  step={key === 'damping' ? 0.01 : (key === 'repulsion' ? 100 : 10)}
                  value={value} 
                  onChange={(e) => handlePhysicsChange(key as keyof typeof physicsConfig, parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
                <div className="text-xs text-right text-gray-400">{value.toFixed(key === 'damping' ? 2 : 0)}</div>
              </div>
            ))}
             <div className="mb-2">
                <label className="block text-xs text-gray-400">Node Spacing</label>
                <input 
                  type="range" min="20" max="150" step="10" value={nodeSpacing} 
                  onChange={(e) => setNodeSpacing(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
                <div className="text-xs text-right text-gray-400">{nodeSpacing}px</div>
              </div> */}
          </div>
          <div>
            <h3 className="text-md font-medium mb-2 text-gray-300">CrisPRO.ai Features:</h3>
            {Object.entries(enableAIFeatures).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between mb-2">
                <label htmlFor={`${key}Toggle`} id={`${key}Label`} className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                <button
                  id={`${key}Toggle`} 
                  onClick={() => handleAIFeatureToggle(key as keyof typeof enableAIFeatures)}
                  className={`px-3 py-1 text-xs rounded-md ${value ? 'bg-green-500 hover:bg-green-600' : 'bg-slate-600 hover:bg-slate-500'}`}
                >
                  {value ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            ))}
            <p className="text-xs text-gray-500 mt-2">
              CrisPRO.ai: Toggle AI-driven enhancements for relevance, insights, and pathway highlighting.
            </p>
          </div>
          <div>
            <h3 className="text-md font-medium mb-2 text-gray-300">Actions:</h3>
            <div className="flex flex-col space-y-2">
              <button 
                onClick={toggleSimulation}
                className={`${simulationActive ? 'bg-orange-500 hover:bg-orange-600' : 'bg-teal-500 hover:bg-teal-600'} text-white px-4 py-2 rounded-md text-sm transition-colors`}
              >
                {simulationActive ? 'Pause Simulation' : 'Start Simulation'}
              </button>
              <button 
                onClick={handleResetLayout}
                className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Reset Layout (Re-initialize)
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 flex-grow">
        <div className="flex-grow md:w-2/3 h-[600px] md:h-auto">
          <KnowledgeGraph 
            key={graphKey}
            nodes={nodes as BaseGraphNode[]}
            edges={edges as BaseGraphEdge[]}
            enableDragging={true}
            enableZoom={true}
            showLabels={true}
            showEdgeLabels={true}
            usePhysics={true}
            physicsConfig={physicsConfig}
            nodeSpacing={nodeSpacing}
            onNodeClick={handleNodeClick}
            onEdgeClick={handleEdgeClick}
            simulationRunning={simulationActive}
            therapeuticContext={currentTherapeuticContext}
            enableAIWeighting={enableAIFeatures.aiWeighting}
            enableLLMInsights={enableAIFeatures.llmInsights}
            highlightKeyPathways={enableAIFeatures.highlightPathways}
            className="bg-slate-900 rounded-lg shadow-2xl border border-slate-700 w-full h-full"
          />
        </div>
        
        <aside className="w-full md:w-1/3 lg:w-1/4 bg-slate-800 p-4 rounded-lg shadow-lg h-full overflow-y-auto node-details-panel">
          <h2 className="text-xl font-semibold mb-3 text-sky-300">Selected Node Details</h2>
          {selectedNode ? (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-sky-400">{selectedNode.label}</h3>
              <p className="text-xs uppercase text-gray-400 tracking-wider">Type: {selectedNode.type}</p>
              {selectedNode.description && (
                <p className="text-sm text-gray-300">{selectedNode.description}</p>
              )}
              <div className="grid grid-cols-2 gap-x-4">
                {selectedNode.baseEvidenceScore !== undefined && (
                <div>
                    <label className="text-xs text-gray-400">Base Evidence:</label>
                  <div className="w-full bg-slate-700 h-2.5 rounded-full mt-1">
                    <div 
                      className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${selectedNode.baseEvidenceScore * 100}%` }}
                        title={`${(selectedNode.baseEvidenceScore * 100).toFixed(0)}%`}
                    />
                  </div>
                </div>
              )}
              {enableAIFeatures.aiWeighting && selectedNode.aiRelevanceScore !== undefined && (
                 <div>
                  <label className="text-xs text-gray-400">CrisPRO.ai Relevance:</label>
                  <div className="w-full bg-slate-700 h-2.5 rounded-full mt-1">
                    <div 
                      className="bg-green-500 h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: `${selectedNode.aiRelevanceScore * 100}%` }}
                      title={`${(selectedNode.aiRelevanceScore * 100).toFixed(0)}%`}
                    />
                  </div>
                </div>
              )}
              </div>
              {enableAIFeatures.aiWeighting && selectedNode.evidenceStrength !== undefined && (
                 <div className="mt-2">
                  <label className="text-xs text-gray-400">CrisPRO.ai Evidence Strength:</label>
                  <div className="w-full bg-slate-700 h-2.5 rounded-full mt-1">
                    <div 
                      className="bg-teal-500 h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: `${selectedNode.evidenceStrength * 100}%` }}
                      title={`${(selectedNode.evidenceStrength * 100).toFixed(0)}%`}
                    />
                  </div>
                </div>
              )}
              {enableAIFeatures.llmInsights && selectedNode && (
                <div className="mt-3 pt-3 border-t border-slate-700">
                  <h4 className="text-sm font-semibold mb-1 text-sky-400">CrisPRO.ai Insight:</h4>
                  {isLoadingLLMInsight && selectedNode?.id === selectedNode?.id ? (
                    <p className="text-sm italic text-sky-400 animate-pulse">Fetching LLM insight...</p>
                  ) : selectedNode.insightSummary ? (
                  <p className="text-sm italic text-gray-300">{selectedNode.insightSummary}</p>
                  ) : (
                    <p className="text-sm italic text-gray-500">Click node to attempt LLM insight generation.</p>
                  )}
                </div>
              )}
              {selectedNode.type === 'variant' && selectedNode.predictedImpact !== undefined && (
                <div className="mt-3 pt-3 border-t border-slate-700">
                  <h4 className="text-sm font-semibold mb-1">AI Predicted Impact (Variant):</h4>
                  <div className="text-lg font-bold" style={{ 
                    color: selectedNode.predictedImpact > 0.7 ? '#ef4444'
                         : selectedNode.predictedImpact > 0.4 ? '#f59e0b'
                         : '#22c55e'
                  }}>
                    {selectedNode.predictedImpact > 0.7 ? 'High' 
                     : selectedNode.predictedImpact > 0.4 ? 'Medium' 
                     : 'Low'}
                    <span className="ml-2 text-sm text-gray-400">
                      (Score: {(selectedNode.predictedImpact * 100).toFixed(0)}%)
                    </span>
                  </div>
                </div>
              )}
              {selectedNode.metadata && Object.keys(selectedNode.metadata).length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-700">
                  <h4 className="text-sm font-semibold mb-1 text-gray-300">Additional Details:</h4>
                  {Object.entries(selectedNode.metadata).map(([key, value]) => (
                    <p key={key} className="text-xs text-gray-400">
                      <span className="capitalize font-medium">{key.replace(/([A-Z])/g, ' $1')}:</span> {String(value)}
                    </p>
                  ))}
                </div>
              )}
              {selectedNode.therapeuticContext && (
                 <div className="mt-3 pt-3 border-t border-slate-700">
                  <h4 className="text-sm font-semibold mb-1 text-gray-300">Node Therapeutic Context:</h4>
                  <p className="text-xs text-gray-400 bg-slate-700 px-2 py-1 rounded w-fit">
                    {selectedNode.therapeuticContext}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-500 text-sm italic">Select a node from the graph to view its details and AI-driven insights.</div>
          )}
        </aside>
      </div>
    </div>
  );
} 