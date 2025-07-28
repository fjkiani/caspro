/**
 * @file KnowledgeGraph.tsx
 * @description This component renders a dynamic, interactive force-directed graph
 * to visualize complex relationships between biological entities. It serves as a core
 * visualization tool within the CrisPRO.ai platform for exploring research data.
 *
 * CrisPRO.ai Enhancements:
 * - AI-Driven Prioritization: Integrates with CrisPRO.ai's Variant Investigation and
 *   Therapeutic Strategy Agents to intelligently weight nodes and edges, highlighting
 *   the most relevant entities based on AI-calculated scores (e.g., `aiRelevanceScore`,
 *   `confidenceScore`).
 * - Contextual Awareness: Adapts the visualization based on the active therapeutic
 *   context (`therapeuticContext`), disease focus (`diseaseContext`), or patient
 *   profile (`patientProfile`), filtering or emphasizing data accordingly.
 * - LLM-Powered Insights: Enables the display of AI-generated summaries and insights
 *   (`insightSummary`) for selected nodes, providing deeper understanding within the
 *   graph interface.
 * - Pathway Highlighting: Supports the visual emphasis of key biological pathways
 *   identified by CrisPRO.ai's analysis, aiding in the discovery of novel therapeutic
 *   associations.
 *
 * Purpose and Workflows:
 * This component is central to several CrisPRO.ai workflows, including:
 * - Target Validation: Visualizing evidence connecting genes/variants to outcomes.
 * - Therapeutic Strategy Development: Exploring relationships between therapies, targets,
 *   and patient populations.
 * - Literature Review Augmentation: Graphically representing connections found in
 *   scientific publications.
 * - Data-Driven Discovery: Identifying novel or unexpected relationships between
 *   disparate biological entities through visual exploration.
 *
 * The graph helps users to quickly grasp complex interdependencies, assess the strength
 * of evidence for various connections, and identify promising avenues for CRISPR-based
 * therapeutic development.
 */
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import DataVisualizer from './DataVisualizer';
import { getColorInRange } from './ColorSchemes';

// Define the detailed types that can be associated with a graph node from CrisPRO
export type CrisPROGraphNodeDetailedType = 
  // Types from CrisPROSequenceAnnotation
  'gRNA_on_target' | 'gRNA_pam_site' | 'predicted_off_target' | 'HDR_template_region' | 
  'prime_edit_pegRNA_binding_site' | 'base_editor_window' | 'splice_site' | 'enhancer' | 
  'silencer' | 'insulator' | 'pathogenic_variant' | 'pathogenic_snp' | 'vus' | 
  'benign_variant' | 'structural_variant_breakpoint' | 'enhancer_target_for_crispra' | 
  'splice_site_target' | 'safe_harbor_locus' |
  // Additional types from KnowledgeGraphExample.tsx for broader graph node classification
  'protein' | 'cell_type' | 'disease' | 'clinical_trial' | 'lab_protocol' | 
  'safety_event' | 'mechanism_of_action' | 'biological_process' | 'molecular_function' | 
  'cellular_component' | 'data_source' | 'user_annotation' | 'pathway' | 'custom_crispro_type';

export interface GraphNode {
  id: string;
  label: string;
  type: string;
  description?: string;
  size?: number;
  color?: string;
  weight?: number; // Base weight, potentially modulated by AI scores
  metadata?: Record<string, any>;
  // CrisPRO.ai specific properties
  aiRelevanceScore?: number; // Score from CrisPRO.ai agents (0-1) indicating contextual relevance
  therapeuticContext?: string; // Specific disease or treatment context, used by CrisPRO.ai for filtering/emphasis
  evidenceStrength?: number; // AI-determined aggregate strength of evidence for this node's role (0-1)
  insightSummary?: string; // LLM-generated summary for this node, triggered via `enableLLMInsights`
  predictedImpact?: number; // For 'variant' type, impact score from CrisPRO.ai's Variant Impact Prediction Engine
  crisproDetailedType?: CrisPROGraphNodeDetailedType; // Add the new CrisPRO detailed type
}

export interface GraphEdge {
  id: string;
  source: string; // ID of source node
  target: string; // ID of target node
  label?: string;
  weight?: number; // Base weight, potentially modulated by AI scores
  type?: string;
  color?: string;
  metadata?: Record<string, any>;
  // CrisPRO.ai specific properties
  confidenceScore?: number; // AI-determined confidence (0-1) in this relationship, influences visual representation if `enableAIWeighting` is true
  literatureSupport?: number; // Quantitative measure of literature support, potentially used by AI for `confidenceScore`
  clinicalRelevance?: number; // Score (0-1) indicating relevance to clinical outcomes, a CrisPRO.ai metric
  inTherapeuticPath?: boolean; // Flag set by CrisPRO.ai to highlight edges part of a key therapeutic pathway
}

export interface KnowledgeGraphProps {
  /** Nodes in the graph. Data primarily sourced from CrisPRO.ai backend. */
  nodes: GraphNode[];
  /** Edges connecting nodes. Data primarily sourced from CrisPRO.ai backend. */
  edges: GraphEdge[];
  /** Whether to enable node dragging. User interaction feature. */
  enableDragging?: boolean;
  /** Whether to enable zooming and panning. User interaction feature. */
  enableZoom?: boolean;
  /** Whether to show node labels. UI preference. */
  showLabels?: boolean;
  /** Whether to show edge labels. UI preference. */
  showEdgeLabels?: boolean;
  /** Whether to use physics simulation for layout. */
  usePhysics?: boolean;
  /** Controls if the physics simulation is active. Managed by parent or example component. */
  simulationRunning?: boolean;
  /** Physics configuration for the simulation. Tunable for optimal visualization. */
  physicsConfig?: {
    /** Repulsion force between nodes (higher = more spacing). */
    repulsion?: number;
    /** Spring length for edges (higher = longer edges). */
    springLength?: number;
    /** Damping factor for stabilization (0-1). */
    damping?: number;
    /** Max velocity of nodes during simulation. */
    maxVelocity?: number;
  };
  /** Initial spacing factor between nodes. Affects initial layout. */
  nodeSpacing?: number;
  /** Callback when a node is clicked. Can trigger CrisPRO.ai insight generation. */
  onNodeClick?: (node: GraphNode) => void;
  /** Callback when an edge is clicked. */
  onEdgeClick?: (edge: GraphEdge) => void;
  /** Type filters to show/hide node types. UI control for data slicing. */
  typeFilters?: Record<string, boolean>;
  /** Whether to highlight connected nodes when hovering. UI enhancement. */
  highlightConnections?: boolean;
  /** Additional CSS classes for styling. */
  className?: string;
  /** Width of the graph canvas. */
  width?: number;
  /** Height of the graph canvas. */
  height?: number;
  // CrisPRO.ai specific props
  /** Current therapeutic context (e.g., "Breast Cancer HER2+"). Used by CrisPRO.ai to filter/highlight relevant nodes/edges. */
  therapeuticContext?: string;
  /** Whether to enable AI-driven weighting for nodes/edges, affecting their visual prominence. */
  enableAIWeighting?: boolean;
  /** Whether to trigger LLM insights (e.g., `insightSummary` population) when a node is clicked. */
  enableLLMInsights?: boolean;
  /** Whether to highlight AI-identified key pathways. CrisPRO.ai backend provides pathway data. */
  highlightKeyPathways?: boolean;
  /** Current disease focus (e.g., "Cystic Fibrosis"). Used by CrisPRO.ai for contextualization. */
  diseaseContext?: string;
  /** Patient profile information (e.g., genetic markers, demographics). Used by CrisPRO.ai for personalized graph views. */
  patientProfile?: Record<string, any>;
  customNodeColors?: Record<string, string>;
}

export type KnowledgeGraphInstance = {
  fitView: () => void;
};

/**
 * @function KnowledgeGraph
 * @description Primary React component for rendering the knowledge graph.
 * It handles node positioning, physics simulation, user interactions (drag, zoom, click),
 * and rendering of nodes and edges. This component is designed to be highly configurable
 * and deeply integrated with CrisPRO.ai's data and intelligence layers.
 */
const KnowledgeGraph = React.forwardRef<KnowledgeGraphInstance, KnowledgeGraphProps>((
  {
    nodes,
    edges,
    enableDragging = true,
    enableZoom = true,
    showLabels = true,
    showEdgeLabels = false,
    usePhysics = true,
    simulationRunning = false, // Controlled by parent, starts inactive
    physicsConfig, // Prop will be merged with defaults below
    nodeSpacing = 70,     // Increased default nodeSpacing
    onNodeClick,
    onEdgeClick,
    typeFilters, // TODO: CrisPRO.ai - Implement filtering logic based on typeFilters
    highlightConnections = true,
    className = '',
    width = 800,
    height = 600,
    // CrisPRO.ai specific props
    therapeuticContext, // Used for displaying context and potentially by AI for filtering
    enableAIWeighting = false, // If true, AI scores influence node/edge visuals
    enableLLMInsights = false, // If true, onNodeClick might trigger LLM calls
    highlightKeyPathways = false, // If true, pathways identified by CrisPRO.ai are visually emphasized
    diseaseContext, // Additional context for CrisPRO.ai
    patientProfile, // Additional context for CrisPRO.ai
    customNodeColors,
  },
  ref
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number, y: number }>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isStabilized, setIsStabilized] = useState(!simulationRunning);
  const [actualWidth, setActualWidth] = useState(width);
  const [actualHeight, setActualHeight] = useState(height);

  // Default physics config merged with user-provided
  const activePhysicsConfig = {
    repulsion: 6000,    // Reduced from 7000
    springLength: 280,  // Increased from 250
    damping: 0.85,      // Increased from 0.82 for more smoothness
    maxVelocity: 35,    // Reduced from 45 to prevent fast jumps
    ...(physicsConfig || {}), // Merge with prop, ensuring physicsConfig is not undefined
  };

  // Expose the fitView function via the ref
  React.useImperativeHandle(ref, () => ({
    fitView: () => {
      if (!containerRef.current || !nodes.length || Object.keys(nodePositions).length === 0) return;

      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      nodes.forEach(node => {
        const pos = nodePositions[node.id];
        if (pos) {
          minX = Math.min(minX, pos.x);
          minY = Math.min(minY, pos.y);
          maxX = Math.max(maxX, pos.x);
          maxY = Math.max(maxY, pos.y);
        }
      });

      if (minX === Infinity) return;

      const graphWidth = maxX - minX;
      const graphHeight = maxY - minY;
      
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;

      const padding = 100;
      const scaleX = containerWidth / (graphWidth + padding);
      const scaleY = containerHeight / (graphHeight + padding);
      const newScale = Math.min(scaleX, scaleY, 1.5); // Allow slight zoom-in

      const newOffsetX = (containerWidth / 2) - ((minX + maxX) / 2) * newScale;
      const newOffsetY = (containerHeight / 2) - ((minY + maxY) / 2) * newScale;

      setScale(newScale);
      setOffset({ x: newOffsetX, y: newOffsetY });
    }
  }));

  // Effect to observe container size and update actualWidth/Height
  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    setActualWidth(currentContainer.offsetWidth);
    setActualHeight(currentContainer.offsetHeight);

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        setActualWidth(entry.contentRect.width);
        setActualHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(currentContainer);
    return () => resizeObserver.unobserve(currentContainer);
  }, []); // Runs once on mount to set up observer

  // Effect for initializing node positions
  // CrisPRO.ai Context: Initial positioning can be influenced by node types,
  // which themselves might have semantic meaning within the CrisPRO.ai domain.
  useEffect(() => {
    if (nodes.length === 0 || actualWidth === 0 || actualHeight === 0) return;
    
    const initialPositions: Record<string, { x: number, y: number }> = {};
    const centerX = actualWidth / 2;
    const centerY = actualHeight / 2;
    const radius = Math.min(actualWidth, actualHeight) * 0.4;
    
    const nodesByType: Record<string, GraphNode[]> = {};
    nodes.forEach(node => {
      if (!nodesByType[node.type]) {
        nodesByType[node.type] = [];
      }
      nodesByType[node.type].push(node);
    });
    
    let typeIndex = 0;
    const typeCount = Object.keys(nodesByType).length;
    
    Object.entries(nodesByType).forEach(([type, typeNodes]) => {
      const typeAngleOffset = (typeIndex / typeCount) * 2 * Math.PI;
      const typeSectorSize = (2 * Math.PI) / typeCount;
      
      typeNodes.forEach((node, i) => {
        const angleWithinSector = (i / typeNodes.length) * (typeSectorSize * 0.8);
        const angle = typeAngleOffset + angleWithinSector;
        
        let radiusModifier = 1;
        // CrisPRO.ai Context: Node types have inherent importance, could influence default spacing.
        // e.g., 'outcome' nodes might be larger or more central.
        switch (node.type) {
          case 'gene': radiusModifier = 0.85; break;
          case 'variant': radiusModifier = 1.1; break;
          case 'outcome': radiusModifier = 1.2; break;
          case 'therapy': radiusModifier = 0.9; break;
          case 'publication': radiusModifier = 0.8; break;
        }
        
        const randomRadius = radius * radiusModifier * (2.0 + Math.random() * 0.8);
        const xOffset = (Math.random() - 0.5) * radius * 0.5;
        const yOffset = (Math.random() - 0.5) * radius * 0.5;
        
        initialPositions[node.id] = {
          x: centerX + randomRadius * Math.cos(angle) + xOffset,
          y: centerY + randomRadius * Math.sin(angle) + yOffset
        };
      });
      typeIndex++;
    });
    
    setNodePositions(initialPositions);
    setIsStabilized(!simulationRunning);
  }, [nodes, actualWidth, actualHeight, simulationRunning]); // Depend on actualWidth/Height
  
  // Effect for running the physics simulation
  useEffect(() => {
    if (!usePhysics || !simulationRunning || nodes.length === 0 || Object.keys(nodePositions).length === 0) {
      if (!simulationRunning) setIsStabilized(true);
      return;
    }
    
    setIsStabilized(false);
    
    const velocities: Record<string, { vx: number, vy: number }> = {};
    nodes.forEach(node => {
      velocities[node.id] = { vx: 0, vy: 0 };
    });
    
    // Use activePhysicsConfig defined above
    const { repulsion, springLength, damping, maxVelocity } = activePhysicsConfig;
    const minNodeDistance = nodeSpacing * 3.5; // Increased minimum distance multiplier
    
    let stabilityCount = 0;
    const stabilityThreshold = 15; // Increased threshold for stability
    let isActive = true;
    
    const simulationStep = () => {
      if (!isActive) return;
      
      let totalMovement = 0;
      const newPositions = { ...nodePositions };
      
      // Repulsive forces - much stronger
      nodes.forEach(node1 => {
        nodes.forEach(node2 => {
          if (node1.id === node2.id) return;
          const pos1 = newPositions[node1.id];
          const pos2 = newPositions[node2.id];
          if (!pos1 || !pos2) return;
          
          const dx = pos1.x - pos2.x;
          const dy = pos1.y - pos2.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance === 0) distance = 0.1;
          
          const size1 = getNodeSize(node1);
          const size2 = getNodeSize(node2);
          const requiredNodeDistance = (size1 + size2) / 2 + minNodeDistance;
          
          // Much stronger repulsive force - base repulsion
          let repulsiveForce = repulsion / (distance * distance);
          
          // Massive boost if nodes are too close - toned down significantly
          if (distance < requiredNodeDistance) {
            repulsiveForce *= 5 * (requiredNodeDistance / distance); // Reduced from 20 to 5
          }
          
          // Additional close-range repulsion - toned down
          if (distance < minNodeDistance * 2) {
            repulsiveForce *= 2; // Reduced from 5 to 2
          }
          
          velocities[node1.id].vx += (dx / distance) * repulsiveForce;
          velocities[node1.id].vy += (dy / distance) * repulsiveForce;
        });
      });
      
      // Attractive forces (springs) - almost eliminated
      edges.forEach(edge => {
        const sourcePos = newPositions[edge.source];
        const targetPos = newPositions[edge.target];
        if (!sourcePos || !targetPos) return;
        
        const dx = targetPos.x - sourcePos.x;
        const dy = targetPos.y - sourcePos.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance === 0) distance = 0.1;
        
        // Extremely weak spring constant - barely any attraction
        const baseSpringConstant = 0.0005; // Reduced from 0.0008 for a gentler pull
        const weightFactor = edge.weight !== undefined ? Math.max(0.1, edge.weight * 0.4) : 0.25; // Reduced factors slightly
        const actualSpringConstant = baseSpringConstant * weightFactor;

        // Only apply attraction if nodes are further than desired spring length
        const attractionDistance = springLength * 2.0; // Increased from 1.8, springs activate a bit later
        if (distance > attractionDistance) {
          const forceMagnitude = (distance - springLength) * actualSpringConstant * 0.7; // Reduced from 0.8
          
          velocities[edge.source].vx += (dx / distance) * forceMagnitude;
          velocities[edge.source].vy += (dy / distance) * forceMagnitude;
          velocities[edge.target].vx -= (dx / distance) * forceMagnitude;
          velocities[edge.target].vy -= (dy / distance) * forceMagnitude;
        }
      });
      
      // Apply velocities
      nodes.forEach(node => {
        if (node.id === draggedNode) return;
        
        velocities[node.id].vx *= damping;
        velocities[node.id].vy *= damping;
        
        const speed = Math.sqrt(velocities[node.id].vx**2 + velocities[node.id].vy**2);
        if (speed > maxVelocity) {
          velocities[node.id].vx = (velocities[node.id].vx / speed) * maxVelocity;
          velocities[node.id].vy = (velocities[node.id].vy / speed) * maxVelocity;
        }
        
        newPositions[node.id].x += velocities[node.id].vx;
        newPositions[node.id].y += velocities[node.id].vy;
        
        totalMovement += Math.abs(velocities[node.id].vx) + Math.abs(velocities[node.id].vy);
      });
      
      // Enforce minimum distances - prevent nodes from getting too close
      nodes.forEach(node1 => {
        nodes.forEach(node2 => {
          if (node1.id === node2.id) return;
          const pos1 = newPositions[node1.id];
          const pos2 = newPositions[node2.id];
          if (!pos1 || !pos2) return;
          
          const dx = pos1.x - pos2.x;
          const dy = pos1.y - pos2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          const size1 = getNodeSize(node1);
          const size2 = getNodeSize(node2);
          const minimumAllowedDistance = (size1 + size2) / 2 + minNodeDistance;
          
          if (distance < minimumAllowedDistance && distance > 0) {
            // Push nodes apart to maintain minimum distance
            const pushDistance = (minimumAllowedDistance - distance) / 2;
            const normalizedDx = dx / distance;
            const normalizedDy = dy / distance;
            
            newPositions[node1.id].x += normalizedDx * pushDistance;
            newPositions[node1.id].y += normalizedDy * pushDistance;
            newPositions[node2.id].x -= normalizedDx * pushDistance;
            newPositions[node2.id].y -= normalizedDy * pushDistance;
          }
        });
      });
      
      // Keep nodes within bounds with better margin
      Object.keys(newPositions).forEach(nodeId => {
        const pos = newPositions[nodeId];
        const nodeSize = getNodeSize(nodes.find(n => n.id === nodeId)!);
        const margin = nodeSize + 20; // Increased margin
        
        newPositions[nodeId] = {
          x: Math.max(margin, Math.min(actualWidth - margin, pos.x)),
          y: Math.max(margin, Math.min(actualHeight - margin, pos.y)),
        };
      });
      
      setNodePositions(newPositions);
      
      if (totalMovement < nodes.length * 0.05) { // Reduced threshold for earlier stabilization
        stabilityCount++;
        if (stabilityCount > stabilityThreshold) {
          isActive = false;
          setIsStabilized(true);
          return;
        }
      } else {
        stabilityCount = 0;
      }
      
      if (isActive) {
        requestAnimationFrame(simulationStep);
      }
    };
    
    requestAnimationFrame(simulationStep);
    
    return () => {
      isActive = false;
    };
  }, [nodes, edges, nodePositions, draggedNode, usePhysics, simulationRunning, activePhysicsConfig, nodeSpacing, actualWidth, actualHeight]);

  // Node dragging handlers
  const handleNodeDragStart = (nodeId: string, e: React.MouseEvent) => {
    if (!enableDragging) return;
    setDraggedNode(nodeId);
    setIsDragging(true);
    // When dragging starts, if simulation was running, pause it by setting simulationRunning to false via parent?
    // Or just stop this instance of simulation and restart on mouseUp if it was running before.
    // For now, dragging overrides physics for the dragged node.
    setDragStart({ x: e.clientX / scale - offset.x, y: e.clientY / scale - offset.y });
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !draggedNode) return;
    const currentPos = { x: e.clientX / scale - offset.x, y: e.clientY / scale - offset.y };
    const dx = currentPos.x - dragStart.x;
    const dy = currentPos.y - dragStart.y;
  
    setNodePositions(prev => ({
      ...prev,
      [draggedNode]: {
        x: prev[draggedNode].x + dx,
        y: prev[draggedNode].y + dy
      }
    }));
    // No need to update dragStart here if dx/dy are relative to previous position
    // setDragStart(currentPos); // This would make dx/dy relative to current mouse, simpler
  };
  
  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      setDraggedNode(null);
      // CrisPRO.ai Context: If simulation was paused due to drag, it might be resumed here.
      // This depends on how `simulationRunning` prop is managed by the parent.
    }
  };
  
  // Reset physics simulation - typically called by parent via a button
  const resetPhysics = () => {
    setIsStabilized(false); // Will trigger re-initialization of positions if simulationRunning is true
    // Parent component should toggle `simulationRunning` prop or re-key the component
    // to force a full reset including initial positions.
    // CrisPRO.ai: A "smart reset" could re-cluster based on new AI insights or context.
  };
  
  // Zoom functionality
  const handleWheel = (e: React.WheelEvent) => {
    if (!enableZoom || !containerRef.current) return;
    e.preventDefault();
  
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left; // Mouse X relative to container
    const mouseY = e.clientY - rect.top;  // Mouse Y relative to container
  
    const newScale = scale * (1 - e.deltaY * 0.001);
    const newClippedScale = Math.max(0.1, Math.min(newScale, 5)); // Zoom limits
  
    // New offset calculation for zoom towards mouse pointer
    const newOffsetX = mouseX - (mouseX - offset.x) * (newClippedScale / scale);
    const newOffsetY = mouseY - (mouseY - offset.y) * (newClippedScale / scale);
  
    setScale(newClippedScale);
    setOffset({ x: newOffsetX, y: newOffsetY });
  };

  // Get color for node type
  // CrisPRO.ai Context: Node colors can be dynamically assigned by CrisPRO.ai
  // based on AI scores, relevance, or user-defined color schemes related to therapeutic areas.
  const getNodeColor = (node: GraphNode): string => {
    if (node.color) return node.color;
    if (customNodeColors && customNodeColors[node.type]) {
        return customNodeColors[node.type];
    }
    switch (node.type) {
      case 'gene': return '#2563eb';
      case 'variant': return '#dc2626';
      case 'outcome': return '#16a34a';
      case 'therapy': return '#9333ea';
      case 'publication': return '#d97706';
      default: return '#64748b';
    }
  };

  // Get color for edge type
  // CrisPRO.ai Context: Edge colors could reflect relationship strength (`confidenceScore`),
  // literature support, or clinical relevance as determined by CrisPRO.ai agents.
  // Example: if (enableAIWeighting && edge.confidenceScore) return getColorInRange(edge.confidenceScore, 0, 1, ['#dddddd', '#ff0000']);
  const getEdgeColor = (edge: GraphEdge): string => {
    if (edge.color) return edge.color;
    // CrisPRO.ai: if `edge.inTherapeuticPath` is true, use a distinct highlight color.
    if (highlightKeyPathways && edge.inTherapeuticPath) return '#ffcc00'; // Example highlight

    switch (edge.type) {
      case 'causes': return '#f87171';
      case 'treats': return '#34d399';
      case 'associates': return '#60a5fa';
      case 'reports': return '#fbbf24';
      case 'includes': return '#a78bfa';
      default: return '#94a3b8';
    }
  };

  // Get size for node based on weight or default by type
  // CrisPRO.ai Context: Node size can be dynamically scaled based on `aiRelevanceScore`,
  // `evidenceStrength`, or other AI-derived metrics to visually emphasize importance.
  const getNodeSize = (node: GraphNode): number => {
    if (node.size) return node.size;
    let baseSize = 15;
    // CrisPRO.ai: If `enableAIWeighting` is true, `node.weight` (potentially AI-augmented) or `aiRelevanceScore` influences size.
    if (enableAIWeighting && node.aiRelevanceScore) {
      baseSize = 10 + node.aiRelevanceScore * 20; // Scale size by AI relevance
    } else if (node.weight) {
      baseSize = 10 + node.weight * 15; // Scale by base weight
    }
    
    switch (node.type) {
      case 'gene': return baseSize * 1.2;
      case 'variant': return baseSize;
      case 'outcome': return baseSize * 1.3;
      case 'therapy': return baseSize * 1.4;
      case 'publication': return baseSize * 1.1;
      default: return baseSize;
    }
  };

  // Handle node click
  // CrisPRO.ai Context: This is a key integration point. If `enableLLMInsights` is true,
  // clicking a node could trigger a call to a CrisPRO.ai service to fetch or generate
  // an `insightSummary` for the node, which is then displayed in a side panel or tooltip.
  const handleNodeClick = (node: GraphNode) => {
    if (onNodeClick) {
      // CrisPRO.ai TODO: if (enableLLMInsights && !node.insightSummary) {
      //   // async fetchLLMInsight(node.id, therapeuticContext).then(summary => {
      //   //   // Update node data (ideally in a central store) and trigger re-render
      //   //   // For now, might pass an updated node object back up.
      //   // });
      // }
      onNodeClick(node);
    }
  };

  // Render tooltip for hovered node
  // CrisPRO.ai Context: Tooltip content is significantly enhanced by CrisPRO.ai properties
  // like `aiRelevanceScore`, `insightSummary`, and `predictedImpact`.
  const renderTooltip = () => {
    if (!hoveredNode || !nodePositions[hoveredNode]) return null;
    
    const node = nodes.find(n => n.id === hoveredNode);
    if (!node) return null;

    const position = nodePositions[hoveredNode];
    const tooltipStyle: React.CSSProperties = {
        position: 'absolute',
        left: `${position.x * scale + offset.x + 20}px`,
        top: `${position.y * scale + offset.y}px`,
        zIndex: 100, // Ensure tooltip is above other elements
        pointerEvents: 'none', // Prevent tooltip from interfering with mouse events on graph
    };
    
    return (
      <div style={tooltipStyle} className="bg-slate-800 text-white p-3 rounded-md shadow-xl text-sm max-w-sm opacity-95">
        <div className="font-bold text-base mb-1">{node.label}</div>
        <div className="text-xs text-slate-300 uppercase mb-2">{node.type}</div>
        {node.description && <div className="text-xs mt-1 mb-2">{node.description}</div>}
        
        {/* CrisPRO.ai Enhanced Information */}
        {node.weight !== undefined && (
          <div className="text-xs mt-1"><strong>Base Evidence:</strong> {node.weight.toFixed(2)}</div>
        )}
        {enableAIWeighting && node.aiRelevanceScore !== undefined && (
          <div className="text-xs mt-1 flex items-center">
            <strong className="mr-1">AI Relevance:</strong>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-sky-500 h-2" 
                style={{ width: `${node.aiRelevanceScore * 100}%` }}
              />
            </div>
            <span className="ml-1 text-slate-400">({(node.aiRelevanceScore * 100).toFixed(0)}%)</span>
          </div>
        )}
        {enableAIWeighting && node.evidenceStrength !== undefined && (
          <div className="text-xs mt-1"><strong>AI Evidence Strength:</strong> {node.evidenceStrength.toFixed(2)}</div>
        )}
        
        {/* CrisPRO.ai LLM Insight Summary */}
        {enableLLMInsights && node.insightSummary && (
          <div className="text-xs mt-2 pt-2 border-t border-slate-700">
            <div className="font-semibold mb-1 text-sky-400">CrisPRO.ai Insight:</div>
            <p className="italic">{node.insightSummary}</p>
          </div>
        )}
        
        {/* CrisPRO.ai Variant Impact */}
        {node.type === 'variant' && node.predictedImpact !== undefined && (
          <div className="text-xs mt-2 pt-2 border-t border-slate-700">
            <div className="font-semibold mb-1">Predicted Impact (AI):</div>
            <span className={`font-bold ${node.predictedImpact > 0.7 ? 'text-red-400' : node.predictedImpact > 0.4 ? 'text-yellow-400' : 'text-green-400'}`}>
              {node.predictedImpact > 0.7 ? 'High' : node.predictedImpact > 0.4 ? 'Medium' : 'Low'}
              <span className="ml-1 text-slate-400">({(node.predictedImpact * 100).toFixed(0)}%)</span>
            </span>
          </div>
        )}
      </div>
    );
  };

  // Apply therapeutic context filtering - Placeholder for CrisPRO.ai logic
  // CrisPRO.ai Context: This function would interact with CrisPRO.ai's backend or use
  // client-side logic to filter/dim/highlight nodes and edges based on `therapeuticContext`,
  // `diseaseContext`, or `patientProfile`. For example, nodes not relevant to the current
  // context might be faded out or hidden.
  const getContextFilteredNodes = (): GraphNode[] => {
    // TODO: CrisPRO.ai - Implement actual filtering based on context props.
    // Example:
    // if (therapeuticContext && enableAIWeighting) {
    //   return nodes.map(node => ({
    //     ...node,
    //     // Visual properties like opacity or a special highlight color can be set here
    //     // based on node.therapeuticContext matching the main therapeuticContext prop,
    //     // or its relevance determined by an AI agent.
    //     isDimmed: node.therapeuticContext !== therapeuticContext,
    //   }));
    // }
    return nodes; // Return all nodes if no context filtering is applied
  };
  const contextFilteredNodes = getContextFilteredNodes(); // Use this for rendering

  // Main render method
  return (
    <DataVisualizer
      data={contextFilteredNodes} // Use filtered nodes
      isLoading={contextFilteredNodes.length === 0 && nodes.length > 0} // Show loading if initial nodes exist but filtered result is empty temporarily
      emptyComponent={<p className="text-slate-400">No relevant data for the current context or filters.</p>} // CrisPRO.ai: Message reflects filtering
      className={`knowledge-graph select-none ${className}`} // Added select-none
    >
      <div 
        ref={containerRef}
        className={`relative bg-slate-900 rounded-lg overflow-hidden w-full h-full ${className}`} // Ensure it fills container, pass className
        // style prop removed, dimensions will come from parent via CSS + ResizeObserver
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Important to end drag if mouse leaves canvas
        onWheel={handleWheel}
      >
        {/* CrisPRO.ai Context: Information overlays can display current AI model versions or data sources. */}
        <div className="absolute top-2 right-2 bg-slate-800/80 text-xs text-white px-2 py-1 rounded-md shadow">
          {usePhysics ? 
            `Physics: ${simulationRunning ? 'Active' : (isStabilized ? 'Stabilized' : 'Initializing')}` : 
            'Physics: Disabled'}
        </div>
        
        {/* CrisPRO.ai Context Display */}
        {therapeuticContext && (
          <div className="absolute top-2 left-2 bg-sky-700/80 text-white text-xs px-2 py-1 rounded-md shadow">
            Context: {therapeuticContext}
          </div>
        )}
        
        {/* SVG container for the graph */}
        <svg width="100%" height="100%" className="overflow-visible">
          <g transform={`translate(${offset.x}, ${offset.y}) scale(${scale})`}>
            {/* Render Edges */}
            {edges.map(edge => {
              // CrisPRO.ai: Edges might be filtered out if their source/target nodes are filtered by context.
              const sourceNode = contextFilteredNodes.find(n => n.id === edge.source);
              const targetNode = contextFilteredNodes.find(n => n.id === edge.target);
              if (!sourceNode || !targetNode) return null; // Don't render edges for filtered out nodes

              const sourcePos = nodePositions[edge.source];
              const targetPos = nodePositions[edge.target];
              if (!sourcePos || !targetPos) return null; // Ensure positions exist
              
              const edgeColor = getEdgeColor(edge);
              // CrisPRO.ai: Edge opacity/thickness can be influenced by `confidenceScore` or `inTherapeuticPath`.
              const isHighlighted = highlightKeyPathways && edge.inTherapeuticPath;
              const edgeOpacity = enableAIWeighting && edge.confidenceScore ? 0.4 + edge.confidenceScore * 0.6 : (isHighlighted ? 1 : 0.6);
              const edgeWidth = isHighlighted ? 2.5 : (enableAIWeighting && edge.weight ? 0.5 + edge.weight * 2 : 1.5);
              
              return (
                <line
                  key={edge.id}
                  x1={sourcePos.x} y1={sourcePos.y}
                  x2={targetPos.x} y2={targetPos.y}
                  stroke={edgeColor}
                  strokeWidth={edgeWidth}
                  opacity={edgeOpacity}
                  // CrisPRO.ai: Different dash patterns could signify AI-inferred vs. curated relationships.
                  strokeDasharray={edge.type === 'associates' ? "4,4" : undefined} 
                  onMouseEnter={() => setHoveredEdge(edge.id)}
                  onMouseLeave={() => setHoveredEdge(null)}
                  onClick={() => onEdgeClick && onEdgeClick(edge)}
                  className={`transition-opacity duration-150 ${hoveredEdge === edge.id ? 'opacity-100' : ''}`}
                />
              );
            })}
            
            {/* Render Nodes */}
            {contextFilteredNodes.map(node => {
              const position = nodePositions[node.id];
              if (!position) return null; // Ensure position exists
              
              const nodeColor = getNodeColor(node);
              const nodeSize = getNodeSize(node);
              const isCurrentHoveredNode = hoveredNode === node.id;
              // CrisPRO.ai: Node opacity can be affected by AI relevance or context filtering.
              // Example: Dim nodes not directly relevant to `therapeuticContext` if `enableAIWeighting` is true.
              const nodeOpacity = (enableAIWeighting && node.aiRelevanceScore !== undefined) ? 0.5 + node.aiRelevanceScore * 0.5 : 0.9;

              return (
                <g
                  key={node.id}
                  transform={`translate(${position.x}, ${position.y})`}
                  onMouseDown={(e) => handleNodeDragStart(node.id, e)}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => handleNodeClick(node)}
                  style={{ cursor: enableDragging ? (isDragging ? 'grabbing' : 'grab') : 'pointer' }}
                  className="transition-transform duration-100 ease-out"
                >
                  {/* CrisPRO.ai: Outer ring could indicate AI relevance or a specific status. */}
                  {enableAIWeighting && node.aiRelevanceScore !== undefined && (
                    <circle
                      r={nodeSize + 4}
                      fill={nodeColor}
                      opacity={node.aiRelevanceScore * 0.3} // Glow intensity based on relevance
                      className="pointer-events-none"
                    />
                  )}
                  
                  <circle
                    r={nodeSize}
                    fill={nodeColor}
                    opacity={nodeOpacity}
                    stroke={isCurrentHoveredNode ? 'white' : 'rgba(255,255,255,0.2)'}
                    strokeWidth={isCurrentHoveredNode ? 2.5 : 1}
                    className="transition-all duration-150"
                  />
                  
                  {/* Node Label */}
                  {/* CrisPRO.ai: Label content or style could change based on AI insights or context. */}
                  {showLabels && (isCurrentHoveredNode || scale > 0.8) && ( // Show labels if hovered or zoomed in
                    <text
                      textAnchor="middle"
                      y={nodeSize + 14} // Position below the node
                      fontSize={Math.max(10, Math.min(12 / scale, 12))} // Adjust font size with zoom, but cap it
                      fill="white"
                      paintOrder="stroke"
                      stroke="rgba(15, 23, 42, 0.7)" // Text outline for readability
                      strokeWidth={2 / scale}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="pointer-events-none font-medium"
                    >
                      {node.label}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
        
        {/* Tooltip - already uses CrisPRO.ai data */}
        {hoveredNode && renderTooltip()}

        {/* Legend - TODO: CrisPRO.ai - Legend could dynamically update based on active filters or AI-driven color/size encodings */}
        <div className="absolute bottom-2 left-2 bg-slate-800/70 p-2 rounded-md text-xs text-slate-300">
          <div className="font-semibold mb-1">Legend:</div>
          {Object.entries({Gene:getNodeColor({type:'gene'} as GraphNode), Variant:getNodeColor({type:'variant'} as GraphNode), Outcome:getNodeColor({type:'outcome'} as GraphNode), Therapy:getNodeColor({type:'therapy'} as GraphNode), Publication:getNodeColor({type:'publication'} as GraphNode)}).map(([type, color]) => (
            <div key={type} className="flex items-center mb-0.5">
              <div style={{backgroundColor: color}} className="w-2.5 h-2.5 rounded-full mr-1.5"></div>
              {type}
            </div>
          ))}
        </div>

        {/* Interactive Controls Display (managed by parent/example) */}
        {/* CrisPRO.ai: These controls might include toggles for AI features or context selectors. */}
        {/* Example: Displaying status of `highlightKeyPathways` or `enableAIWeighting` */}
        <div className="absolute top-10 right-2 flex flex-col gap-2">
          {/* Buttons are usually in the example component, but status can be shown here */}
          {usePhysics && (
             <button 
               className="bg-slate-700 hover:bg-slate-600 text-white text-xs px-2 py-1 rounded"
               onClick={resetPhysics} // This resetPhysics is local, parent should handle full reset
             >
               Reset Local Layout
             </button>
           )}
          {simulationRunning && (
            <div className="text-xs bg-sky-600/80 text-white px-2 py-1 rounded animate-pulse">
              Simulating...
            </div>
          )}
           {enableAIWeighting && (
            <div className="text-xs bg-purple-600/80 text-white px-2 py-1 rounded">
              AI Weighting ON
            </div>
          )}
          {highlightKeyPathways && (
            <div className="text-xs bg-amber-500/80 text-white px-2 py-1 rounded">
              Key Pathways ON
            </div>
          )}
        </div>
      </div>
    </DataVisualizer>
  );
});
KnowledgeGraph.displayName = 'KnowledgeGraph';

export default KnowledgeGraph; 