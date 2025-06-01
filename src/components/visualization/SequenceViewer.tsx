'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { getColorForNucleotide, DefaultNucleotideColors } from './ColorSchemes';
import DataVisualizer from './DataVisualizer';

export interface SequenceRange {
  id?: string;
  start: number;
  end: number;
  label?: string;
  color?: string;
  description?: string;
  type?: 'exon' | 'intron' | 'promoter' | 'utr' | 'guide' | 'pam' | 'mutation' | 'custom';
  onClick?: () => void;
  // CrisPRO.ai specific properties
  aiGenerated?: boolean; // Whether this range was identified by AI
  offTargetScore?: number; // Off-target risk score (0-1) for guide RNA targets
  onTargetScore?: number; // On-target efficacy score (0-1) for guide RNA targets
  functionalImpact?: number; // Predicted functional impact (0-1) for mutations
  therapeuticRelevance?: number; // Relevance to therapeutic approach (0-1)
  aiInsight?: string; // AI-generated explanation of significance
  structuralContext?: { // Information from Structural Biology Module
    secondaryStructure?: string;
    domainRegion?: string;
    interactionSite?: boolean;
    conservationScore?: number;
  };
  nucleaseCompatibility?: { // Compatibility with different nucleases
    cas9?: boolean;
    cas12?: boolean;
    baseEditor?: boolean;
    primeEditor?: boolean;
    preferredNuclease?: string;
  };
}

export interface SequenceAnnotation {
  id: string;
  start: number;
  end: number;
  type: string;
  label: string;
  significance?: number;
  description?: string;
  color?: string;
  // CrisPRO.ai specific properties
  aiGenerated?: boolean; // Whether this annotation was created by AI
  confidenceScore?: number; // AI confidence in this annotation (0-1)
  therapeuticRelevance?: number; // Relevance to therapeutic approach (0-1)
  functionalAssessment?: string; // AI assessment of functional significance
  aiInsight?: string; // AI-generated explanation of significance for this specific annotation
  predictedImpact?: { // Detailed impact prediction for variants
    proteinEffect?: string; // e.g., "missense", "frameshift", "silent"
    severityScore?: number; // 0-1 scale
    structuralEffect?: string; // e.g., "destabilizing", "neutral"
    expressionImpact?: string; // e.g., "reduced", "increased", "unchanged"
  };
  linkedPublications?: string[]; // IDs of publications supporting this annotation
  clinicalSignificance?: string; // e.g., "pathogenic", "benign", "VUS"
  offTargetRisk?: { // For guide RNA annotations
    score: number;
    sites: number;
    worstSite?: string;
  };
  // Additional fields from mdc for AI-driven annotations
  nucleaseCompatibility?: { // Compatibility with different nucleases, if annotation is a target site
    cas9?: boolean;
    cas12?: boolean;
    baseEditor?: boolean;
    primeEditor?: boolean;
    preferredNuclease?: string;
  };
  onTargetScore?: number; // On-target efficacy score (0-1) if it's a gRNA target site
  structuralContextLink?: string; // Link or ID to detailed structural visualization for this region
}

export interface SequenceViewerProps {
  /** The DNA or RNA sequence */
  sequence: string;
  /** Whether the sequence is RNA (affects coloring) */
  isRna?: boolean;
  /** Highlighted regions of the sequence */
  highlightedRanges?: SequenceRange[];
  /** Annotations of the sequence (alternative to highlightedRanges) */
  annotations?: SequenceAnnotation[];
  /** Whether to show position numbers */
  showPositions?: boolean;
  /** Number of bases per line */
  basesPerLine?: number;
  /** Whether to enable base selection */
  enableSelection?: boolean;
  /** Font size for bases */
  fontSize?: number;
  /** Current visible range */
  visibleRange?: {
    start: number;
    end: number;
  };
  /** Callback when a base is clicked */
  onBaseClick?: (position: number, base: string) => void;
  /** Callback when a range is selected */
  onRangeSelect?: (start: number, end: number) => void;
  /** Additional CSS classes */
  className?: string;
  /** Whether to animate highlighting transitions */
  animateHighlights?: boolean;
  /** Whether to show a line connecting guide RNA to its PAM site */
  showGuideConnections?: boolean;
  /** Custom colors for nucleotides */
  customColors?: { [key: string]: string };
  /** Show controls for zooming, etc. */
  showControls?: boolean;
  /** Height of the component */
  height?: number | string;
  // CrisPRO.ai specific properties
  /** Selected CRISPR nuclease for specialized views */
  selectedNuclease?: 'cas9' | 'cas12' | 'baseEditor' | 'primeEditor';
  /** Whether to highlight optimal gRNA target sites */
  showOptimalTargets?: boolean;
  /** Whether to show AI-generated annotations */
  showAIAnnotations?: boolean;
  /** Whether to show AI-predicted off-target sites */
  showOffTargetSites?: boolean;
  /** Whether to show structural context for regions */
  showStructuralContext?: boolean;
  /** Whether to prioritize therapeutic relevance */
  prioritizeTherapeuticRelevance?: boolean;
  /** Therapeutic context to filter/highlight relevant regions */
  therapeuticContext?: string;
  /** On-target efficacy threshold for showing potential guides (0-1) */
  onTargetThreshold?: number;
  /** Off-target risk threshold for filtering (0-1) */
  offTargetThreshold?: number;
  /** Callback when AI insights are requested for a region */
  onRequestAIInsight?: (range: SequenceRange | SequenceAnnotation) => void;
  /** Callback when structural visualization is requested */
  onRequestStructuralView?: (range: SequenceRange | SequenceAnnotation) => void;
}

/**
 * SequenceViewer displays DNA or RNA sequences with optional highlighting,
 * annotations, and interactive features like selection and zooming.
 * 
 * In the CrisPRO.ai context, this component is enhanced to:
 * - Provide AI-driven annotation of therapeutically relevant regions, including
 *   optimal gRNA target sites, critical functional regions, and predicted off-target sites
 * - Integrate with Variant Impact & Structural Predictions to display predicted functional
 *   consequences of variants and structural changes to gene products
 * - Offer nuclease-specific views that adapt the display based on the chosen CRISPR system,
 *   highlighting relevant PAM sites and optimal editing windows
 * 
 * This transforms the SequenceViewer into an active design, validation, and safety assessment
 * tool that helps identify optimal CRISPR targets, understand molecular consequences of edits,
 * and thoroughly assess potential off-target effects.
 */
export function SequenceViewer({
  sequence,
  isRna = false,
  highlightedRanges = [],
  annotations = [],
  showPositions = true,
  basesPerLine = 50,
  enableSelection = false,
  fontSize = 14,
  visibleRange,
  onBaseClick,
  onRangeSelect,
  className = '',
  animateHighlights = true,
  showGuideConnections = true,
  customColors,
  showControls = false,
  height,
  selectedNuclease,
  showOptimalTargets,
  showAIAnnotations,
  showOffTargetSites,
  showStructuralContext,
  prioritizeTherapeuticRelevance,
  therapeuticContext,
  onTargetThreshold,
  offTargetThreshold,
  onRequestAIInsight,
  onRequestStructuralView,
}: SequenceViewerProps) {
  const allHighlightedRanges = [
    ...highlightedRanges,
    ...annotations.map(annotation => ({
      start: annotation.start,
      end: annotation.end,
      label: annotation.label,
      description: annotation.description,
      type: annotation.type as any,
      color: annotation.color || getAnnotationColor(annotation.type, annotation.significance),
      // Pass down other relevant fields from SequenceAnnotation to SequenceRange for tooltip
      id: annotation.id,
      aiGenerated: annotation.aiGenerated,
      aiInsight: annotation.aiInsight,
      nucleaseCompatibility: annotation.nucleaseCompatibility,
      onTargetScore: annotation.onTargetScore,
      // Add other fields needed by the tooltip from SequenceAnnotation here if necessary
    })),
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null); // Ref for the tooltip
  const [selectionStart, setSelectionStart] = useState<number | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<number | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [hoveredPosition, setHoveredPosition] = useState<number | null>(null);
  const [hoveredRange, setHoveredRange] = useState<SequenceRange | null>(null);
  const [clickedRange, setClickedRange] = useState<SequenceRange | null>(null); // For persistent tooltip
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number, left: number } | null>(null);

  // Helper to get a color based on annotation type
  function getAnnotationColor(type: string, significance?: number): string {
    switch (type.toLowerCase()) {
      case 'exon':
        return '#60a5fa'; // Blue
      case 'intron':
        return '#a78bfa'; // Purple
      case 'regulatory':
        return '#34d399'; // Green
      case 'mutation':
        return significance !== undefined && significance > 0.7 
          ? '#ef4444'  // Red for significant mutations
          : '#f97316'; // Orange for other mutations
      default:
        return '#94a3b8'; // Gray
    }
  }

  const displaySequence = visibleRange
    ? sequence.slice(visibleRange.start, visibleRange.end + 1)
    : sequence;
  const positionOffset = visibleRange ? visibleRange.start : 0;
  const sequenceLines = [];
  for (let i = 0; i < displaySequence.length; i += basesPerLine) {
    sequenceLines.push(displaySequence.slice(i, i + basesPerLine));
  }

  const handleMouseDown = (position: number) => {
    if (!enableSelection) return;
    setIsSelecting(true);
    setSelectionStart(position);
    setSelectionEnd(position);
  };

  const handleMouseMove = (position: number) => {
    if (!isSelecting || !enableSelection) return;
    setSelectionEnd(position);
  };

  const handleMouseUp = () => {
    if (!enableSelection) return;
    setIsSelecting(false);
    if (selectionStart !== null && selectionEnd !== null && onRangeSelect) {
      const start = Math.min(selectionStart, selectionEnd);
      const end = Math.max(selectionStart, selectionEnd);
      onRangeSelect(start, end);
    }
  };

  useEffect(() => {
    setSelectionStart(null);
    setSelectionEnd(null);
    setIsSelecting(false);
  }, [sequence, visibleRange]);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isSelecting) {
        handleMouseUp();
      }
    };
    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isSelecting]);

  // Close clicked tooltip if clicking outside of it or its trigger
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        // A more robust check would be to see if the click was on an annotation span.
        // For now, any click outside the tooltip closes it.
        // We also need to ensure clicking an annotation doesn't immediately close its own tooltip.
        let targetIsAnnotationSpan = false;
        if (event.target instanceof HTMLElement) {
            let el: HTMLElement | null = event.target;
            while(el) {
                if (el.getAttribute('data-annotation-span') === 'true') {
                    targetIsAnnotationSpan = true;
                    break;
                }
                el = el.parentElement;
            }
        }
        if (!targetIsAnnotationSpan) {
            setClickedRange(null);
            setTooltipPosition(null);
        }
      }
    };
    if (clickedRange) { // Only add listener if a tooltip is active
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [clickedRange]);

  const getRangesForPosition = (position: number): SequenceRange[] => {
    const adjustedPosition = position + positionOffset;
    return allHighlightedRanges.filter(
      range => adjustedPosition >= range.start && adjustedPosition <= range.end
    );
  };

  const handleAnnotationClick = (event: React.MouseEvent<HTMLSpanElement>, range: SequenceRange) => {
    setClickedRange(range); // Set the clicked range for persistent tooltip
    setHoveredRange(null); // Clear hover range to avoid conflict
    
    // Calculate tooltip position relative to the clicked element or event
    const rect = event.currentTarget.getBoundingClientRect();
    const containerScrollTop = containerRef.current?.scrollTop || 0;
    const containerScrollLeft = containerRef.current?.scrollLeft || 0;
    
    // Position tooltip below the clicked range, adjusting for container scroll
    // and preventing overflow from viewport edges.
    let top = rect.bottom + window.scrollY + 5 - (containerRef.current?.getBoundingClientRect().top || 0) + containerScrollTop;
    let left = rect.left + window.scrollX - (containerRef.current?.getBoundingClientRect().left || 0) + containerScrollLeft;

    // Basic boundary detection (can be improved)
    if (tooltipRef.current) {
        const tooltipHeight = tooltipRef.current.offsetHeight;
        const tooltipWidth = tooltipRef.current.offsetWidth;
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        if (top + tooltipHeight > viewportHeight + window.scrollY - (containerRef.current?.getBoundingClientRect().top || 0) + containerScrollTop ) {
            top = rect.top + window.scrollY - tooltipHeight - 5 - (containerRef.current?.getBoundingClientRect().top || 0) + containerScrollTop;
        }
        if (left + tooltipWidth > viewportWidth + window.scrollX - (containerRef.current?.getBoundingClientRect().left || 0) + containerScrollLeft) {
            left = viewportWidth + window.scrollX - tooltipWidth - (containerRef.current?.getBoundingClientRect().left || 0) + containerScrollLeft - 5;
        }
        if (left <  window.scrollX - (containerRef.current?.getBoundingClientRect().left || 0) + containerScrollLeft) {
            left = window.scrollX - (containerRef.current?.getBoundingClientRect().left || 0) + containerScrollLeft + 5;
        }
    }
    setTooltipPosition({ top, left });
    
    // Prevent default onBaseClick if an annotation is clicked
    // event.stopPropagation(); // May not be needed depending on onBaseClick behavior
  };

  const getBaseStyles = (base: string, position: number) => {
    const absolutePosition = position + positionOffset;
    const positionRanges = getRangesForPosition(position);
    const isInSelection = 
      selectionStart !== null && 
      selectionEnd !== null && 
      absolutePosition >= Math.min(selectionStart, selectionEnd) && 
      absolutePosition <= Math.max(selectionStart, selectionEnd);
    
    let backgroundColor = 'transparent';
    let isClickableAnnotation = positionRanges.length > 0;
    
    if (positionRanges.length > 0) {
      backgroundColor = positionRanges[positionRanges.length - 1].color || 'rgba(255, 255, 255, 0.2)';
    }
    if (isInSelection) {
      backgroundColor = 'rgba(59, 130, 246, 0.5)';
    }
    const nucleotideColors = { ...DefaultNucleotideColors, ...customColors };
    const textColor = getColorForNucleotide(base, isRna && base === 'T' ? { ...nucleotideColors, T: nucleotideColors.U || '#c084fc' } : nucleotideColors);
    
    return {
      color: textColor,
      backgroundColor,
      cursor: isClickableAnnotation || enableSelection || onBaseClick ? 'pointer' : 'default',
      fontSize: `${fontSize}px`,
      fontFamily: 'monospace',
      padding: '0 1px',
      borderRadius: '2px',
      fontWeight: (hoveredPosition === position || positionRanges.length > 0) ? 'bold' : 'normal',
    };
  };

  const renderTooltipContent = (rangeToDisplay: SequenceRange) => {
    if (!rangeToDisplay) return null;
    const isAIGenerated = rangeToDisplay.aiGenerated;
    const isGuideRNA = rangeToDisplay.type === 'guide';
    const isMutation = rangeToDisplay.type === 'mutation';

    return (
      <>
        <div className="flex justify-between items-center mb-2">
          <div className="font-semibold flex items-center">
            {rangeToDisplay.label || `Position ${rangeToDisplay.start}-${rangeToDisplay.end}`}
            {isAIGenerated && (
              <span className="ml-2 text-xs bg-blue-500 text-white px-1 rounded">AI</span>
            )}
          </div>
          {clickedRange && rangeToDisplay === clickedRange && ( // Show close button only for clicked/sticky tooltip
            <button 
              onClick={() => { setClickedRange(null); setTooltipPosition(null); }} 
              className="text-slate-400 hover:text-white text-lg leading-none"
              aria-label="Close tooltip"
            >
              &times;
            </button>
          )}
        </div>
        
        {rangeToDisplay.description && (
          <div className="text-xs mt-1">{rangeToDisplay.description}</div>
        )}
        {rangeToDisplay.type && (
          <div className="text-xs text-slate-300 mt-1">Type: {rangeToDisplay.type}</div>
        )}

        {/* ... (rest of the CrisPRO.ai specific fields like nuclease compatibility, scores, etc.) ... */}
        {isGuideRNA && rangeToDisplay.nucleaseCompatibility && (
          <div className="mt-2 pt-2 border-t border-slate-700">
            <div className="text-xs font-semibold">Nuclease Compatibility:</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {rangeToDisplay.nucleaseCompatibility.cas9 && (
                <span className="text-xs bg-green-800 px-1 rounded">Cas9</span>
              )}
              {rangeToDisplay.nucleaseCompatibility.cas12 && (
                <span className="text-xs bg-blue-800 px-1 rounded">Cas12</span>
              )}
              {rangeToDisplay.nucleaseCompatibility.baseEditor && (
                <span className="text-xs bg-purple-800 px-1 rounded">Base Editor</span>
              )}
              {rangeToDisplay.nucleaseCompatibility.primeEditor && (
                <span className="text-xs bg-yellow-800 px-1 rounded">Prime Editor</span>
              )}
            </div>
            {rangeToDisplay.nucleaseCompatibility.preferredNuclease && (
              <div className="text-xs text-green-400 mt-1">
                Preferred: {rangeToDisplay.nucleaseCompatibility.preferredNuclease}
              </div>
            )}
          </div>
        )}
        {isGuideRNA && (rangeToDisplay.onTargetScore !== undefined || rangeToDisplay.offTargetScore !== undefined) && (
           <div className="mt-2 pt-2 border-t border-slate-700">
            {rangeToDisplay.onTargetScore !== undefined && (
              <div className="flex items-center text-xs">
                <span className="mr-2">On-target Efficacy:</span>
                <div className="w-full bg-slate-700 h-1.5 rounded-full">
                  <div
                    className="bg-green-500 h-1.5 rounded-full"
                    style={{ width: `${rangeToDisplay.onTargetScore * 100}%` }}
                  />
                </div>
              </div>
            )}
            {rangeToDisplay.offTargetScore !== undefined && (
              <div className="flex items-center text-xs mt-1">
                <span className="mr-2">Off-target Risk:</span>
                <div className="w-full bg-slate-700 h-1.5 rounded-full">
                  <div
                    className="bg-red-500 h-1.5 rounded-full"
                    style={{ width: `${rangeToDisplay.offTargetScore * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
        {isMutation && rangeToDisplay.functionalImpact !== undefined && ( 
            <div className="mt-2 pt-2 border-t border-slate-700">
            <div className="flex items-center text-xs">
              <span className="mr-2">Functional Impact:</span>
              <div className="w-full bg-slate-700 h-1.5 rounded-full">
                <div
                  className="h-1.5 rounded-full"
                  style={{
                    width: `${rangeToDisplay.functionalImpact * 100}%`,
                    backgroundColor: rangeToDisplay.functionalImpact > 0.7 ? '#ef4444' : '#f97316',
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {rangeToDisplay.therapeuticRelevance !== undefined && ( 
            <div className="mt-2 pt-2 border-t border-slate-700">
            <div className="flex items-center text-xs">
              <span className="mr-2">Therapeutic Relevance:</span>
              <div className="w-full bg-slate-700 h-1.5 rounded-full">
                <div
                  className="bg-blue-500 h-1.5 rounded-full"
                  style={{ width: `${rangeToDisplay.therapeuticRelevance * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}
        {rangeToDisplay.structuralContext && ( 
            <div className="mt-2 pt-2 border-t border-slate-700">
            <div className="text-xs font-semibold">Structural Context:</div>
            {rangeToDisplay.structuralContext.secondaryStructure && (
              <div className="text-xs mt-1">
                Secondary: {rangeToDisplay.structuralContext.secondaryStructure}
              </div>
            )}
            {rangeToDisplay.structuralContext.domainRegion && (
              <div className="text-xs mt-0.5">
                Domain: {rangeToDisplay.structuralContext.domainRegion}
              </div>
            )}
            {rangeToDisplay.structuralContext.interactionSite && (
              <div className="text-xs mt-0.5 text-yellow-400">
                Interaction Site
              </div>
            )}
            {rangeToDisplay.structuralContext.conservationScore !== undefined && (
              <div className="text-xs mt-0.5">
                Conservation: {(rangeToDisplay.structuralContext.conservationScore * 100).toFixed(0)}%
              </div>
            )}
          </div>
        )}

        {rangeToDisplay.aiInsight && (
          <div className="mt-2 pt-2 border-t border-slate-700">
            <div className="text-xs font-semibold text-blue-400">AI Insight:</div>
            <div className="text-xs mt-1 italic">{rangeToDisplay.aiInsight}</div>
          </div>
        )}
        
        <div className="mt-3 pt-2 border-t border-slate-700 flex gap-2">
          {onRequestAIInsight && (
            <button
              className="text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
              onClick={() => {
                onRequestAIInsight(rangeToDisplay);
                setClickedRange(null); // Close this tooltip when opening the main panel
                setTooltipPosition(null);
              }}
            >
              AI Analysis
            </button>
          )}
          {showStructuralContext && onRequestStructuralView && (
            <button
              className="text-xs bg-purple-600 hover:bg-purple-700 px-2 py-1 rounded"
              onClick={() => onRequestStructuralView(rangeToDisplay)}
            >
              3D View
            </button>
          )}
        </div>
      </>
    );
  }

  const renderTooltip = () => {
    const rangeToDisplay = clickedRange || hoveredRange;
    if (!rangeToDisplay) return null;

    const style: React.CSSProperties = clickedRange && tooltipPosition 
        ? { position: 'absolute', top: tooltipPosition.top, left: tooltipPosition.left, zIndex: 100 }
        : { position: 'absolute', zIndex: 100 }; // Fallback for hover or if position not ready

    return (
      <motion.div 
        ref={tooltipRef}
        className="bg-slate-800 text-white p-3 rounded-md shadow-lg text-sm max-w-xs"
        style={style}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        // Prevent mouse leave from closing if it's a clicked tooltip
        onMouseLeave={() => {
          if (!clickedRange) { // Only hide on mouse leave if it was a hover tooltip
            setHoveredRange(null);
          }
        }}
      >
        {renderTooltipContent(rangeToDisplay)}
      </motion.div>
    );
  };
  
  const renderGuideConnections = () => {
    if (!showGuideConnections) return null;

    const guideRanges = highlightedRanges.filter(range => range.type === 'guide');
    const pamRanges = highlightedRanges.filter(range => range.type === 'pam');
    
    return guideRanges.map((guide, index) => {
      // Find the PAM site closest to this guide
      const associatedPam = pamRanges.find(pam => 
        Math.abs(pam.start - guide.end) <= 10 || Math.abs(pam.end - guide.start) <= 10
      );
      
      if (!associatedPam) return null;
      
      // Calculate positions for the connection line
      // This is complex and would depend on the actual rendering layout
      // For now, we'll just indicate a connection exists
      return (
        <div 
          key={`guide-connection-${index}`}
          className="absolute border-dashed border-t-2 z-0"
          style={{
            borderColor: guide.color || 'rgba(255, 255, 255, 0.3)',
            // Positioning would need to be calculated based on the actual DOM layout
          }}
        />
      );
    });
  };

  return (
    <DataVisualizer
      data={sequence}
      isLoading={!sequence}
      className={`sequence-viewer ${className}`}
    >
      <div 
        ref={containerRef}
        className="relative font-mono p-4 bg-slate-900 rounded-lg h-full"
        // Removed onMouseLeave from main container to keep clicked tooltip open
      >
        {sequenceLines.map((line, lineIndex) => (
          <div key={`line-${lineIndex}`} className="flex">
            {showPositions && (
              <div className="text-slate-400 select-none mr-4 text-right" style={{ fontSize: `${fontSize}px`, width: '3em' }}>
                {lineIndex * basesPerLine + 1 + positionOffset}
              </div>
            )}
            <div className="flex flex-wrap">
              {line.split('').map((base, baseIndex) => {
                const position = lineIndex * basesPerLine + baseIndex;
                const absolutePosition = position + positionOffset;
                const positionRanges = getRangesForPosition(position);
                
                // Find the most specific range to attach click/hover events to
                const primaryRange = positionRanges.length > 0 ? positionRanges[positionRanges.length - 1] : null;

                return (
                  <motion.span
                    key={`base-${position}`}
                    style={getBaseStyles(base, position)}
                    data-annotation-span="true" // Mark as an annotation span for click outside logic
                    animate={animateHighlights ? { 
                      backgroundColor: primaryRange?.color || 'transparent'
                    } : undefined}
                    transition={{ duration: 0.3 }}
                    onMouseDown={() => handleMouseDown(absolutePosition)}
                    onMouseMove={() => handleMouseMove(absolutePosition)}
                    onMouseEnter={() => {
                      setHoveredPosition(position);
                      if (primaryRange && !clickedRange) { // Only set hover if no range is clicked
                        setHoveredRange(primaryRange);
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredPosition(null);
                      if (!clickedRange) { // Only clear hover if no range is clicked
                        setHoveredRange(null);
                      }
                    }}
                    onClick={(e) => {
                      if (primaryRange) {
                        handleAnnotationClick(e, primaryRange);
                      } else if (onBaseClick) {
                        onBaseClick(absolutePosition, base);
                      }
                    }}
                  >
                    {base}
                  </motion.span>
                );
              })}
            </div>
          </div>
        ))}
        
        { (clickedRange || hoveredRange) && renderTooltip() }
        
        {renderGuideConnections()}
      </div>
    </DataVisualizer>
  );
}

export default SequenceViewer; 