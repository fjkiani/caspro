import { GraphNode, GraphEdge } from '@/components/visualization';

const oracleNode: GraphNode = {
    id: 'zeta-oracle',
    label: 'Zeta Oracle',
    type: 'service',
    weight: 1.0,
    description: 'Central intelligence agency, powered by Evo2. Annihilates uncertainty and quantifies damage.'
};

const endpointNodes: GraphNode[] = [
    { id: 'ep-variant-impact', label: '/predict_variant_impact', type: 'endpoint', weight: 0.8, description: 'Calculates biological disruptiveness (Zeta Score).' },
    { id: 'ep-gene-essentiality', label: '/predict_gene_essentiality', type: 'endpoint', weight: 0.7, description: 'Assesses gene criticality for survival.' },
    { id: 'ep-protein-func', label: '/predict_protein_functionality_change', type: 'endpoint', weight: 0.7, description: 'Predicts impact on protein function and stability.' },
    { id: 'ep-chromatin', label: '/predict_chromatin_accessibility', type: 'endpoint', weight: 0.6, description: 'Reveals hidden regulatory vulnerabilities.' },
];

const outputNodes: GraphNode[] = [
    { id: 'out-zeta-score', label: 'Zeta Score', type: 'data-output', weight: 0.9, description: 'A definitive quantification of functional damage.' },
    { id: 'out-vus-eliminated', label: 'VUS Eliminated', type: 'outcome', weight: 0.85, description: 'Variants of Uncertain Significance are reclassified.' },
    { id: 'out-actionable-intel', label: 'Actionable Intelligence', type: 'data-output', weight: 0.95, description: 'Deep, causal understanding of the enemy\'s genetic weaknesses.' },
];

export const intelligenceGatheringNodes: GraphNode[] = [
    oracleNode,
    ...endpointNodes,
    ...outputNodes
];

export const intelligenceGatheringEdges: GraphEdge[] = [
    // Edges from Oracle to Endpoints
    { id: 'e-oracle-variant', source: 'zeta-oracle', target: 'ep-variant-impact', type: 'uses', weight: 0.9, label: 'deploys' },
    { id: 'e-oracle-essentiality', source: 'zeta-oracle', target: 'ep-gene-essentiality', type: 'uses', weight: 0.8, label: 'deploys' },
    { id: 'e-oracle-protein', source: 'zeta-oracle', target: 'ep-protein-func', type: 'uses', weight: 0.8, label: 'deploys' },
    { id: 'e-oracle-chromatin', source: 'zeta-oracle', target: 'ep-chromatin', type: 'uses', weight: 0.7, label: 'deploys' },
    // Edges from Endpoints to Outputs
    { id: 'e-variant-zeta', source: 'ep-variant-impact', target: 'out-zeta-score', type: 'produces', weight: 0.9, label: 'generates' },
    { id: 'e-variant-vus', source: 'ep-variant-impact', target: 'out-vus-eliminated', type: 'produces', weight: 0.9, label: 'enables' },
    { id: 'e-zeta-intel', source: 'out-zeta-score', target: 'out-actionable-intel', type: 'informs', weight: 1.0, label: 'is key to' },
    { id: 'e-vus-intel', source: 'out-vus-eliminated', target: 'out-actionable-intel', type: 'informs', weight: 1.0, label: 'is key to' }
]; 