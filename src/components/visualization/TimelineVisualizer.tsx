'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import DataVisualizer from './DataVisualizer';
import { getColorForRisk, getColorInRange } from './ColorSchemes';
import { ScientificNotation } from './ScientificNotation';

export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp: number | Date; // Can be numeric for relative time or Date for absolute
  category?: string;
  riskLevel?: number; // 0-1 scale, 0 = no risk, 1 = high risk
  confidenceLevel?: number; // 0-1 scale, 0 = low confidence, 1 = high confidence
  icon?: React.ReactNode;
  highlighted?: boolean;
  metadata?: Record<string, any>;
  // CrisPRO.ai specific properties
  isPredicted?: boolean; // Whether this is an AI-predicted future event
  predictionConfidence?: number; // AI confidence in this prediction (0-1)
  therapeuticSignificance?: number; // Importance in therapeutic context (0-1)
  aiAnnotation?: string; // LLM-generated annotation explaining significance
  interventionRelated?: boolean; // Whether related to a CRISPR intervention
  simulationSource?: string; // ID of the simulation that generated this prediction
  riskAssessmentDetails?: { // Detailed risk assessment from Risk Assessment Agent
    categories: { name: string; score: number }[];
    summary: string;
    mitigationSuggestions?: string;
  };
}

export interface TimelineStage {
  id: string;
  title: string;
  description?: string;
  startTime: number | Date;
  endTime?: number | Date;
  color?: string;
  riskLevel?: number; // 0-1 scale
  metadata?: Record<string, any>;
  // CrisPRO.ai specific properties
  isPredicted?: boolean; // Whether this is an AI-predicted future stage
  predictionConfidence?: number; // AI confidence in this prediction (0-1)
  therapeuticWindow?: boolean; // Whether this represents an optimal time for intervention
  responsePhase?: boolean; // Whether this represents a response to treatment phase
  aiRecommendedActions?: string[]; // Actions recommended during this stage
  alternateOutcomes?: { // Potential alternate outcomes based on interventions
    description: string;
    probability: number;
    interventionId?: string;
  }[];
}

export interface TimelineTrack {
  id: string;
  title: string;
  description?: string;
  events?: TimelineEvent[];
  stages?: TimelineStage[];
  color?: string;
  collapsed?: boolean;
  // CrisPRO.ai specific properties
  isSimulated?: boolean; // Whether this track represents a simulation
  simulationId?: string; // ID of the simulation that generated this track
  therapeuticContext?: string; // The therapeutic context this track represents
  comparedToTrackId?: string; // ID of a track this one is being compared to
  confidenceInterval?: { // Confidence interval for predictions in this track
    lower: TimelineEvent[] | TimelineStage[];
    upper: TimelineEvent[] | TimelineStage[];
    confidence: number; // e.g., 0.95 for 95% confidence
  };
}

export interface TimelineVisualizerProps {
  /** Tracks to display in the timeline */
  tracks: TimelineTrack[];
  /** Start time of the visible range */
  startTime?: number | Date;
  /** End time of the visible range */
  endTime?: number | Date;
  /** Whether time is relative (numeric) or absolute (Date) */
  timeMode?: 'relative' | 'absolute';
  /** Time format for display (e.g., 'MM/DD/YYYY', 'relative') */
  timeFormat?: string;
  /** Time unit for relative time (e.g., 'days', 'months', 'years') */
  timeUnit?: string;
  /** Whether to show the current time indicator */
  showCurrentTime?: boolean;
  /** Whether to enable zooming */
  enableZoom?: boolean;
  /** Whether to enable panning */
  enablePan?: boolean;
  /** Whether to animate events when they appear */
  animateEvents?: boolean;
  /** Whether to show risk indicators */
  showRiskIndicators?: boolean;
  /** Callback when an event is clicked */
  onEventClick?: (event: TimelineEvent) => void;
  /** Callback when a stage is clicked */
  onStageClick?: (stage: TimelineStage) => void;
  /** Callback when the visible time range changes */
  onTimeRangeChange?: (startTime: number | Date, endTime: number | Date) => void;
  /** Additional CSS classes */
  className?: string;
  /** Width of the timeline */
  width?: number | string;
  /** Height of the timeline */
  height?: number | string;
  // CrisPRO.ai specific properties
  /** Whether to show AI-predicted future events */
  showPredictions?: boolean;
  /** Confidence threshold for displaying predictions (0-1) */
  predictionConfidenceThreshold?: number;
  /** Whether to highlight therapeutic windows */
  highlightTherapeuticWindows?: boolean;
  /** Whether to show AI annotations on events */
  showAIAnnotations?: boolean;
  /** Current therapeutic context for filtering/highlighting */
  therapeuticContext?: string;
  /** Whether to compare simulations to actual data */
  enableSimulationComparison?: boolean;
  /** Whether to show confidence intervals for predictions */
  showConfidenceIntervals?: boolean;
  /** Callback when simulation parameters are adjusted */
  onSimulationAdjust?: (params: Record<string, any>) => void;
  /** Patient data for personalized predictions */
  patientData?: Record<string, any>;
  /** Whether to enable AI recommendations on timeline */
  enableAIRecommendations?: boolean;
}

/**
 * TimelineVisualizer displays events and stages along a timeline,
 * useful for showing disease progression, therapeutic development,
 * and risk factors at different points in time.
 * 
 * In the CrisPRO.ai context, this component is enhanced to:
 * - Project AI-predicted future events & risk trajectories via Digital Twin simulations
 * - Display therapeutically contextualized event annotations with LLM-generated insights
 * - Correlate with simulated CRISPR interventions to compare therapeutic strategies
 * - Incorporate dynamic risk indicators informed by the Risk/Feasibility Assessment Agent
 * 
 * This transforms the TimelineVisualizer from a historical data display tool into a
 * predictive and strategic planning instrument that helps visualize potential future outcomes,
 * understand temporal risk/benefit profiles, and plan interventions more effectively.
 */
export function TimelineVisualizer({
  tracks,
  startTime,
  endTime,
  timeMode = 'relative',
  timeFormat = timeMode === 'relative' ? 'numeric' : 'MM/DD/YYYY',
  timeUnit = 'days',
  showCurrentTime = true,
  enableZoom = true,
  enablePan = true,
  animateEvents = true,
  showRiskIndicators = true,
  onEventClick,
  onStageClick,
  onTimeRangeChange,
  className = '',
  width = '100%',
  height = 'auto',
  showPredictions = true,
  predictionConfidenceThreshold = 0.5,
  highlightTherapeuticWindows = true,
  showAIAnnotations = true,
  therapeuticContext,
  enableSimulationComparison = true,
  showConfidenceIntervals = true,
  onSimulationAdjust,
  patientData,
  enableAIRecommendations = true,
}: TimelineVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleStartTime, setVisibleStartTime] = useState<number | Date>(
    startTime || (timeMode === 'relative' ? 0 : new Date())
  );
  const [visibleEndTime, setVisibleEndTime] = useState<number | Date>(
    endTime || (timeMode === 'relative' ? 100 : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, time: visibleStartTime });
  const [hoveredEvent, setHoveredEvent] = useState<TimelineEvent | null>(null);
  const [hoveredStage, setHoveredStage] = useState<TimelineStage | null>(null);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  // Find actual time bounds across all events and stages
  const calculateTimeBounds = () => {
    let minTime: number | Date | null = null;
    let maxTime: number | Date | null = null;
    
    tracks.forEach(track => {
      if (track.events) {
        track.events.forEach(event => {
          if (minTime === null || event.timestamp < minTime) {
            minTime = event.timestamp;
          }
          if (maxTime === null || event.timestamp > maxTime) {
            maxTime = event.timestamp;
          }
        });
      }
      
      if (track.stages) {
        track.stages.forEach(stage => {
          if (minTime === null || stage.startTime < minTime) {
            minTime = stage.startTime;
          }
          if (maxTime === null || (stage.endTime && stage.endTime > maxTime)) {
            maxTime = stage.endTime || maxTime;
          }
        });
      }
    });
    
    return { minTime, maxTime };
  };

  // Initialize visible time range if not provided
  useEffect(() => {
    if (!startTime || !endTime) {
      const { minTime, maxTime } = calculateTimeBounds();
      
      if (minTime !== null && !startTime) {
        setVisibleStartTime(minTime);
      }
      
      if (maxTime !== null && !endTime) {
        // Add some padding to max time
        if (timeMode === 'relative') {
          setVisibleEndTime((maxTime as number) * 1.1);
        } else {
          const date = maxTime as Date;
          setVisibleEndTime(new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000));
        }
      }
    }
  }, [startTime, endTime, tracks, timeMode]);

  // Initialize collapsed state
  useEffect(() => {
    const initialCollapsed: Record<string, boolean> = {};
    tracks.forEach(track => {
      initialCollapsed[track.id] = track.collapsed || false;
    });
    setCollapsed(initialCollapsed);
  }, [tracks]);

  // Convert time to position
  const timeToPosition = (time: number | Date): number => {
    const startVal = timeMode === 'relative' 
      ? visibleStartTime as number 
      : (visibleStartTime as Date).getTime();
    
    const endVal = timeMode === 'relative' 
      ? visibleEndTime as number 
      : (visibleEndTime as Date).getTime();
    
    const timeVal = timeMode === 'relative' 
      ? time as number 
      : (time as Date).getTime();
    
    const timeRange = endVal - startVal;
    if (timeRange <= 0) return 0;
    
    const containerWidth = containerRef.current?.clientWidth || 1000;
    return ((timeVal - startVal) / timeRange) * containerWidth;
  };

  // Format time for display
  const formatTime = (time: number | Date): string => {
    if (timeMode === 'relative') {
      const val = time as number;
      return `${val.toFixed(1)} ${timeUnit}`;
    } else {
      const date = time as Date;
      
      switch (timeFormat) {
        case 'MM/DD/YYYY':
          return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        case 'YYYY-MM-DD':
          return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        case 'MM/YYYY':
          return `${date.getMonth() + 1}/${date.getFullYear()}`;
        case 'MMM DD':
          return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        case 'MMM YYYY':
          return date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
        default:
          return date.toLocaleDateString();
      }
    }
  };

  // Handle panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!enablePan) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      time: visibleStartTime,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !enablePan) return;
    
    const dx = e.clientX - dragStart.x;
    const containerWidth = containerRef.current?.clientWidth || 1000;
    
    const startVal = timeMode === 'relative' 
      ? visibleStartTime as number 
      : (visibleStartTime as Date).getTime();
    
    const endVal = timeMode === 'relative' 
      ? visibleEndTime as number 
      : (visibleEndTime as Date).getTime();
    
    const timeRange = endVal - startVal;
    const timeDelta = -(dx / containerWidth) * timeRange;
    
    if (timeMode === 'relative') {
      const newStart = (dragStart.time as number) + timeDelta;
      const newEnd = newStart + timeRange;
      setVisibleStartTime(newStart);
      setVisibleEndTime(newEnd);
      
      if (onTimeRangeChange) {
        onTimeRangeChange(newStart, newEnd);
      }
    } else {
      const newStart = new Date((dragStart.time as Date).getTime() + timeDelta);
      const newEnd = new Date(newStart.getTime() + timeRange);
      setVisibleStartTime(newStart);
      setVisibleEndTime(newEnd);
      
      if (onTimeRangeChange) {
        onTimeRangeChange(newStart, newEnd);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle zooming
  const handleWheel = (e: React.WheelEvent) => {
    if (!enableZoom) return;
    
    e.preventDefault();
    
    const delta = e.deltaY * 0.001;
    const containerWidth = containerRef.current?.clientWidth || 1000;
    const mouseX = e.nativeEvent.offsetX;
    const mousePercentage = mouseX / containerWidth;
    
    const startVal = timeMode === 'relative' 
      ? visibleStartTime as number 
      : (visibleStartTime as Date).getTime();
    
    const endVal = timeMode === 'relative' 
      ? visibleEndTime as number 
      : (visibleEndTime as Date).getTime();
    
    const timeRange = endVal - startVal;
    const newTimeRange = Math.max(timeRange * (1 + delta), timeRange * 0.1);
    
    const timeDelta = newTimeRange - timeRange;
    const startDelta = timeDelta * mousePercentage;
    const endDelta = timeDelta * (1 - mousePercentage);
    
    if (timeMode === 'relative') {
      const newStart = (visibleStartTime as number) - startDelta;
      const newEnd = (visibleEndTime as number) + endDelta;
      setVisibleStartTime(newStart);
      setVisibleEndTime(newEnd);
      
      if (onTimeRangeChange) {
        onTimeRangeChange(newStart, newEnd);
      }
    } else {
      const newStart = new Date((visibleStartTime as Date).getTime() - startDelta);
      const newEnd = new Date((visibleEndTime as Date).getTime() + endDelta);
      setVisibleStartTime(newStart);
      setVisibleEndTime(newEnd);
      
      if (onTimeRangeChange) {
        onTimeRangeChange(newStart, newEnd);
      }
    }
  };

  // Toggle track collapse
  const toggleTrackCollapse = (trackId: string) => {
    setCollapsed(prev => ({
      ...prev,
      [trackId]: !prev[trackId],
    }));
  };

  // Render time axis
  const renderTimeAxis = () => {
    const containerWidth = containerRef.current?.clientWidth || 1000;
    const numTicks = Math.min(Math.floor(containerWidth / 100) + 1, 10);
    const ticks = [];
    
    for (let i = 0; i <= numTicks; i++) {
      const percentage = i / numTicks;
      
      let time: number | Date;
      if (timeMode === 'relative') {
        time = (visibleStartTime as number) + percentage * ((visibleEndTime as number) - (visibleStartTime as number));
      } else {
        const startMs = (visibleStartTime as Date).getTime();
        const endMs = (visibleEndTime as Date).getTime();
        time = new Date(startMs + percentage * (endMs - startMs));
      }
      
      const position = timeToPosition(time);
      
      ticks.push(
        <div 
          key={`tick-${i}`} 
          className="absolute top-0 flex flex-col items-center"
          style={{ left: `${position}px` }}
        >
          <div className="h-4 border-l border-slate-500"></div>
          <div className="text-xs text-slate-300 mt-1">
            {formatTime(time)}
          </div>
        </div>
      );
    }
    
    return (
      <div className="relative h-8 border-b border-slate-700">
        {ticks}
      </div>
    );
  };

  // Render current time indicator
  const renderCurrentTimeIndicator = () => {
    if (!showCurrentTime) return null;
    
    const currentTime = timeMode === 'relative' ? 0 : new Date();
    const position = timeToPosition(currentTime);
    
    // Check if current time is within visible range
    if (position < 0 || position > (containerRef.current?.clientWidth || 1000)) {
      return null;
    }
    
    return (
      <div 
        className="absolute top-8 bottom-0 border-l-2 border-red-500 z-10"
        style={{ left: `${position}px` }}
      >
        <div className="absolute top-0 -left-[9px] w-4 h-4 bg-red-500 rounded-full"></div>
        <div className="absolute top-5 -left-12 text-xs text-red-400 whitespace-nowrap">
          Current Time
        </div>
      </div>
    );
  };

  // Render events for a track
  const renderEvents = (track: TimelineTrack) => {
    if (!track.events || track.events.length === 0 || collapsed[track.id]) {
      return null;
    }
    
    return track.events.map(event => {
      const position = timeToPosition(event.timestamp);
      
      // Skip events outside the visible range
      if (position < 0 || position > (containerRef.current?.clientWidth || 0)) {
        return null;
      }
      
      // Set color based on risk level if available
      const color = event.riskLevel !== undefined
        ? getColorForRisk(event.riskLevel)
        : track.color || '#60a5fa';
      
      // CrisPRO.ai: Apply visual treatment for predicted events
      const isPredicted = event.isPredicted || track.isSimulated;
      const predictionConfidence = event.predictionConfidence || 1;
      const isSignificant = event.therapeuticSignificance && event.therapeuticSignificance > 0.7;
      
      // CrisPRO.ai: Skip predicted events below confidence threshold
      if (isPredicted && predictionConfidence < predictionConfidenceThreshold) {
        return null;
      }
      
      // CrisPRO.ai: Apply styles based on therapeutic relevance
      const borderStyle = event.interventionRelated ? 'dashed' : 'solid';
      const opacity = isPredicted ? Math.max(0.5, predictionConfidence) : 1;
      const scale = isSignificant ? 1.1 : 1;
      
      return (
        <div
          key={event.id}
          className={`absolute ${animateEvents ? 'animate-fadeIn' : ''} ${
            event.highlighted ? 'z-10' : 'z-0'
          }`}
          style={{
            left: `${position}px`,
            transform: 'translateX(-50%)',
            top: 0,
            opacity,
          }}
          onMouseEnter={() => setHoveredEvent(event)}
          onMouseLeave={() => setHoveredEvent(null)}
          onClick={() => onEventClick && onEventClick(event)}
        >
          <div
            className={`flex flex-col items-center cursor-pointer transition-all ${
              event.highlighted ? 'scale-110' : ''
            }`}
            style={{ transform: `scale(${scale})` }}
          >
            {/* CrisPRO.ai: Add prediction indicator for AI predictions */}
            {isPredicted && (
              <div className="text-xs font-medium text-blue-400 mb-1 bg-slate-800 px-1 rounded">
                AI Predicted
                {predictionConfidence < 0.9 && ` (${Math.round(predictionConfidence * 100)}%)`}
              </div>
            )}
            
            <div
              className={`w-4 h-4 rounded-full ${event.highlighted ? 'ring-2 ring-white' : ''}`}
              style={{
                backgroundColor: color,
                borderWidth: isPredicted ? 2 : 0,
                borderStyle,
                borderColor: 'rgba(255,255,255,0.5)',
              }}
            />
            
            {/* Event title */}
            <div className="text-xs font-medium text-white mt-1 max-w-[120px] text-center">
              {event.title}
              
              {/* CrisPRO.ai: Show therapeutic significance indicator */}
              {isSignificant && showAIAnnotations && (
                <span className="ml-1 text-yellow-400 text-xs">★</span>
              )}
            </div>
            
            {/* CrisPRO.ai: Show risk assessment indicators */}
            {showRiskIndicators && event.riskLevel !== undefined && (
              <div
                className="w-6 h-1 mt-1 rounded-full"
                style={{ backgroundColor: getColorForRisk(event.riskLevel) }}
              />
            )}
            
            {/* CrisPRO.ai: Add brief AI annotation if available */}
            {showAIAnnotations && event.aiAnnotation && (
              <div className="text-xs text-blue-300 mt-1 max-w-[150px] text-center italic opacity-80">
                "{event.aiAnnotation.substring(0, 40)}..."
              </div>
            )}
          </div>
        </div>
      );
    });
  };

  // Render stages for a track
  const renderStages = (track: TimelineTrack) => {
    if (!track.stages || track.stages.length === 0) return null;
    
    return track.stages.map(stage => {
      const startPosition = timeToPosition(stage.startTime);
      const endPosition = stage.endTime 
        ? timeToPosition(stage.endTime)
        : containerRef.current?.clientWidth || 1000;
      
      // Skip if outside visible range
      if (endPosition < 0 || startPosition > (containerRef.current?.clientWidth || 1000)) {
        return null;
      }
      
      const width = Math.max(endPosition - startPosition, 2);
      const isHovered = hoveredStage?.id === stage.id;
      const stageColor = stage.riskLevel !== undefined 
        ? getColorForRisk(stage.riskLevel)
        : stage.color || track.color || '#60a5fa';
      
      return (
        <div
          key={stage.id}
          className="absolute h-10 rounded-md cursor-pointer"
          style={{ 
            left: `${startPosition}px`, 
            width: `${width}px`,
            backgroundColor: stageColor,
            opacity: isHovered ? 0.9 : 0.5,
          }}
          onMouseEnter={() => setHoveredStage(stage)}
          onMouseLeave={() => setHoveredStage(null)}
          onClick={() => onStageClick && onStageClick(stage)}
        >
          {width > 50 && (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium truncate px-2">
              {stage.title}
            </div>
          )}
        </div>
      );
    });
  };

  // Render tracks
  const renderTracks = () => {
    return tracks.map(track => {
      const isCollapsed = collapsed[track.id];
      
      return (
        <div key={track.id} className="mb-4">
          {/* Track header */}
          <div 
            className="flex items-center justify-between p-2 bg-slate-800 rounded-md cursor-pointer hover:bg-slate-700"
            onClick={() => toggleTrackCollapse(track.id)}
          >
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: track.color || '#60a5fa' }}
              ></div>
              <span className="font-medium">{track.title}</span>
            </div>
            <div className="text-slate-400">
              <svg 
                className={`w-4 h-4 transform transition-transform ${isCollapsed ? '' : 'rotate-180'}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          {/* Track content */}
          {!isCollapsed && (
            <div className="mt-2 relative h-16 border-l-2 border-r-2 border-slate-800 rounded-md">
              {/* Stages in background */}
              {renderStages(track)}
              
              {/* Events in foreground */}
              <div className="absolute inset-0">
                {renderEvents(track)}
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  // Render tooltip for hovered event or stage
  const renderTooltip = () => {
    const item = hoveredEvent || hoveredStage;
    if (!item) return null;
    
    return (
      <div 
        className="absolute z-20 bg-slate-800 text-white p-2 rounded-md shadow-lg text-sm max-w-xs"
        style={{ 
          top: hoveredEvent ? '30px' : '50px',
          left: timeToPosition(hoveredEvent?.timestamp || (hoveredStage?.startTime as number | Date)),
          transform: 'translateX(-50%)',
        }}
      >
        <div className="font-semibold">{item.title}</div>
        <div className="text-xs text-slate-300">
          {hoveredEvent 
            ? formatTime(hoveredEvent.timestamp)
            : `${formatTime(hoveredStage!.startTime)} - ${hoveredStage!.endTime ? formatTime(hoveredStage!.endTime) : 'Present'}`
          }
        </div>
        {item.description && <div className="text-xs mt-1">{item.description}</div>}
        {item.riskLevel !== undefined && (
          <div className="text-xs mt-1 flex items-center">
            <span className="mr-1">Risk:</span>
            <ScientificNotation 
              value={item.riskLevel} 
              percentage={true} 
              isSignificant={item.riskLevel > 0.7}
            />
          </div>
        )}
        {hoveredEvent?.confidenceLevel !== undefined && (
          <div className="text-xs mt-1 flex items-center">
            <span className="mr-1">Confidence:</span>
            <ScientificNotation 
              value={hoveredEvent.confidenceLevel} 
              percentage={true} 
              isSignificant={hoveredEvent.confidenceLevel > 0.7}
            />
          </div>
        )}
      </div>
    );
  };

  // Render zoom/reset controls
  const renderControls = () => {
    return (
      <div className="absolute top-2 right-2 flex space-x-1">
        {enableZoom && (
          <>
            <button
              className="bg-slate-700 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-600"
              onClick={() => {
                if (timeMode === 'relative') {
                  const timeRange = (visibleEndTime as number) - (visibleStartTime as number);
                  const center = (visibleStartTime as number) + timeRange / 2;
                  setVisibleStartTime(center - timeRange / 4);
                  setVisibleEndTime(center + timeRange / 4);
                } else {
                  const startMs = (visibleStartTime as Date).getTime();
                  const endMs = (visibleEndTime as Date).getTime();
                  const timeRange = endMs - startMs;
                  const center = startMs + timeRange / 2;
                  setVisibleStartTime(new Date(center - timeRange / 4));
                  setVisibleEndTime(new Date(center + timeRange / 4));
                }
              }}
            >
              +
            </button>
            <button
              className="bg-slate-700 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-600"
              onClick={() => {
                if (timeMode === 'relative') {
                  const timeRange = (visibleEndTime as number) - (visibleStartTime as number);
                  const center = (visibleStartTime as number) + timeRange / 2;
                  setVisibleStartTime(center - timeRange);
                  setVisibleEndTime(center + timeRange);
                } else {
                  const startMs = (visibleStartTime as Date).getTime();
                  const endMs = (visibleEndTime as Date).getTime();
                  const timeRange = endMs - startMs;
                  const center = startMs + timeRange / 2;
                  setVisibleStartTime(new Date(center - timeRange));
                  setVisibleEndTime(new Date(center + timeRange));
                }
              }}
            >
              -
            </button>
          </>
        )}
        <button
          className="bg-slate-700 text-white rounded-full p-2 flex items-center justify-center hover:bg-slate-600"
          onClick={() => {
            // Reset to original time range
            const { minTime, maxTime } = calculateTimeBounds();
            if (minTime !== null && maxTime !== null) {
              setVisibleStartTime(minTime);
              if (timeMode === 'relative') {
                setVisibleEndTime((maxTime as number) * 1.1);
              } else {
                const date = maxTime as Date;
                setVisibleEndTime(new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000));
              }
            }
          }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <DataVisualizer
      data={tracks}
      isLoading={tracks.length === 0}
      className={`timeline-visualizer ${className}`}
    >
      <div 
        ref={containerRef}
        className="relative bg-slate-900 rounded-lg p-4 overflow-hidden"
        style={{ width, height }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* Time axis */}
        {renderTimeAxis()}
        
        {/* Current time indicator */}
        {renderCurrentTimeIndicator()}
        
        {/* Tracks */}
        <div className="mt-4">
          {renderTracks()}
        </div>
        
        {/* Tooltip */}
        {(hoveredEvent || hoveredStage) && renderTooltip()}
        
        {/* Controls */}
        {renderControls()}
        
        {/* Dragging cursor */}
        {isDragging && (
          <div className="fixed inset-0 cursor-grabbing z-50 pointer-events-none"></div>
        )}
      </div>
    </DataVisualizer>
  );
}

export default TimelineVisualizer; 