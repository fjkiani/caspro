'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getColorForRisk, getColorInRange, DefaultRiskColors, ColorLegend } from './ColorSchemes';
import DataVisualizer from './DataVisualizer';
import { ScientificNotation, Score } from './ScientificNotation';

export interface RiskCategory {
  id: string;
  name: string;
  description?: string;
  // CrisPRO.ai specific properties
  therapeuticContext?: string; // Associated therapeutic context
  weightInContext?: number; // Weight of this category in current context (0-1)
  aiGenerated?: boolean; // Whether this category was identified by AI
  dataSource?: string; // Source of data for this risk category
  confidenceLevel?: number; // AI confidence in this risk assessment (0-1)
  mitigationDifficulty?: number; // How difficult to mitigate this risk (0-1)
  mitigationStrategies?: string[]; // Potential strategies to mitigate this risk
  riskTimeline?: 'immediate' | 'short-term' | 'long-term' | 'unknown'; // When this risk might manifest
}

export interface RiskItem {
  id: string;
  name: string;
  description?: string;
  categories: {
    [categoryId: string]: number;
  };
  // CrisPRO.ai specific properties
  isCandidate?: boolean; // Whether this is a candidate design
  isPredicted?: boolean; // Whether the risk scores are predicted by AI
  overallEfficacy?: number; // Overall efficacy score (0-1)
  overallSafety?: number; // Overall safety score (0-1)
  compositeScore?: number; // AI-generated composite score
  aiRecommendation?: string; // AI recommendation regarding this item
  experimentalValidation?: 'validated' | 'partially-validated' | 'not-validated'; // Validation status
  detailedAnalysis?: { // Additional analysis details
    [categoryId: string]: {
      explanation: string;
      confidenceLevel: number;
      supportingEvidence?: string[];
    };
  };
  simulationResults?: { // Results from Digital Twin simulations
    scenarios: number; // Number of scenarios simulated
    successRate: number; // Success rate across scenarios (0-1)
    timeToEffect?: number; // Average time to effect (if applicable)
    adverseEvents?: { // Predicted adverse events
      type: string;
      probability: number;
      severity: number;
    }[];
  };
}

export interface HeatmapDataPoint {
  x: string;
  y: string;
  value: number;
  significance: boolean;
  metadata?: Record<string, any>;
  // CrisPRO.ai specific properties
  isAIPredicted?: boolean; // Whether this data point is AI-predicted
  confidenceScore?: number; // AI confidence in prediction (0-1)
  explanation?: string; // LLM-generated explanation for this value
  mitigationStrategy?: string; // Suggested mitigation strategy
  supportingData?: string[]; // References to supporting data sources
  riskFactors?: { // Contributing risk factors
    factor: string;
    contribution: number; // 0-1 indicating how much this factor contributes
  }[];
}

export interface RiskHeatmapProps {
  /** Categories to display in the heatmap (columns) */
  categories?: RiskCategory[];
  /** Items to display in the heatmap (rows) */
  items?: RiskItem[];
  /** Alternative data format for the heatmap */
  data?: HeatmapDataPoint[];
  /** Title of the heatmap */
  title?: string;
  /** Subtitle of the heatmap */
  subtitle?: string;
  /** Callback when a cell is clicked */
  onCellClick?: (item: RiskItem | HeatmapDataPoint, category?: RiskCategory, value?: number) => void;
  /** Whether to show a summary score for each item */
  showSummaryScore?: boolean;
  /** How to calculate the summary score */
  summaryMethod?: 'average' | 'max' | 'weighted';
  /** Weights for weighted summary calculation */
  categoryWeights?: {
    [categoryId: string]: number;
  };
  /** Whether to show the value in each cell */
  showValues?: boolean;
  /** Whether to show row/column labels */
  showLabels?: boolean;
  /** Color range for the heatmap */
  colorRange?: {
    min: number;
    max: number;
    minColor: string;
    maxColor: string;
  };
  /** Whether to show a legend */
  showLegend?: boolean;
  /** Whether to enable selection of cells */
  enableSelection?: boolean;
  /** Height of the heatmap */
  height?: number | string;
  /** Additional CSS classes */
  className?: string;
  // CrisPRO.ai specific properties
  /** Current therapeutic context to apply */
  therapeuticContext?: string;
  /** Whether to show AI-predicted values */
  showPredicted?: boolean;
  /** Whether to show AI-generated explanations */
  showExplanations?: boolean;
  /** Whether to highlight recommended strategies */
  highlightRecommended?: boolean;
  /** Whether to show mitigation strategies */
  showMitigationStrategies?: boolean;
  /** Callback when AI explanation is requested */
  onRequestExplanation?: (item: RiskItem | HeatmapDataPoint, category?: RiskCategory) => void;
  /** Callback when mitigation strategy is requested */
  onRequestMitigation?: (item: RiskItem | HeatmapDataPoint, category?: RiskCategory) => void;
  /** Confidence threshold for AI predictions (0-1) */
  confidenceThreshold?: number;
  /** Risk threshold for highlighting critical cells */
  criticalRiskThreshold?: number;
  /** Whether to enable simulation mode */
  enableSimulation?: boolean;
  /** Callback when simulation parameters change */
  onSimulationParametersChange?: (params: Record<string, any>) => void;
  /** Risk Assessment Agent mode */
  riskAssessmentMode?: 'standard' | 'conservative' | 'aggressive';
  /** Whether to show confidence indicators */
  showConfidenceIndicators?: boolean;
}

/**
 * RiskHeatmap displays a matrix of risk scores or other analytical data
 * with color coding and interactive features.
 *
 * In the CrisPRO.ai context, this component is enhanced to:
 * - Apply contextualized risk dimensions based on the active "Therapeutic Context Enabled Mode"
 *   (e.g., different weightings for prophylactic edits vs. somatic cell therapies)
 * - Display AI-generated composite risk scores that integrate multiple data parameters
 *   (e.g., off-target likelihood, immunogenicity, genomic instability markers)
 * - Provide LLM-explained hotspots that explain why certain combinations are flagged as risky
 *   and suggest potential mitigation strategies
 * - Visualize predicted risks for panels of candidate gRNAs or therapeutic strategies
 *   to enable in-silico comparison and prioritization
 * 
 * This transforms the RiskHeatmap from a static display into an interactive diagnostic, 
 * predictive, and decision-support tool that clarifies complex risk profiles and guides
 * risk mitigation and strategy selection.
 */
export function RiskHeatmap({
  categories,
  items,
  data,
  title = 'Risk Assessment',
  subtitle,
  onCellClick,
  showSummaryScore = true,
  summaryMethod = 'average',
  categoryWeights,
  showValues = true,
  showLabels = true,
  colorRange = {
    min: 0,
    max: 1,
    minColor: '#22c55e', // Green
    maxColor: '#ef4444', // Red
  },
  showLegend = true,
  enableSelection = false,
  height = 'auto',
  className = '',
  therapeuticContext,
  showPredicted,
  showExplanations,
  highlightRecommended,
  showMitigationStrategies,
  onRequestExplanation,
  onRequestMitigation,
  confidenceThreshold,
  criticalRiskThreshold,
  enableSimulation,
  onSimulationParametersChange,
  riskAssessmentMode,
  showConfidenceIndicators,
}: RiskHeatmapProps) {
  const [hoveredCell, setHoveredCell] = useState<{
    itemId: string;
    categoryId: string;
  } | null>(null);
  
  // Calculate summary score for an item
  const calculateSummaryScore = (item: RiskItem): number => {
    const values = Object.entries(item.categories).map(([categoryId, value]) => {
      if (summaryMethod === 'weighted' && categoryWeights && categoryWeights[categoryId]) {
        return value * categoryWeights[categoryId];
      }
      return value;
    });
    
    if (values.length === 0) return 0;
    
    if (summaryMethod === 'max') {
      return Math.max(...values);
    }
    
    // Default to average
    if (summaryMethod === 'weighted' && categoryWeights) {
      const totalWeight = Object.values(categoryWeights).reduce((sum, weight) => sum + weight, 0);
      return values.reduce((sum, value) => sum + value, 0) / totalWeight;
    }
    
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  };

  // Get the color for a cell based on its value
  const getCellColor = (value: number): string => {
    // Use the continuous color scale between min and max
    return getColorInRange(
      value,
      colorRange.min,
      colorRange.max,
      colorRange.minColor,
      colorRange.maxColor
    );
  };

  // Get cell background style
  const getCellStyle = (value: number) => {
    const backgroundColor = getCellColor(value);
    
    // Calculate text color based on background brightness
    const rgb = backgroundColor.match(/\d+/g);
    let textColor = '#ffffff';
    
    if (rgb && rgb.length >= 3) {
      const brightness = (
        parseInt(rgb[0]) * 0.299 +
        parseInt(rgb[1]) * 0.587 +
        parseInt(rgb[2]) * 0.114
      );
      
      if (brightness > 140) {
        textColor = '#000000';
      }
    }
    
    return {
      backgroundColor,
      color: textColor,
    };
  };

  // Render tooltip for hovered cell
  const renderTooltip = () => {
    if (!hoveredCell) return null;
    
    const item = items?.find(i => i.id === hoveredCell.itemId);
    const category = categories?.find(c => c.id === hoveredCell.categoryId);
    
    if (!item || !category) return null;
    
    const value = item.categories[category.id] || 0;
    const isAIPredicted = item.isPredicted;
    const hasMitigation = category.mitigationStrategies && category.mitigationStrategies.length > 0;
    const hasDetailedAnalysis = item.detailedAnalysis && item.detailedAnalysis[category.id];
    const analysisData = hasDetailedAnalysis ? item.detailedAnalysis![category.id] : undefined;
    
    return (
      <div className="absolute z-10 bg-slate-800 text-white p-3 rounded-lg shadow-lg text-sm max-w-xs">
        <div className="font-semibold flex items-center">
          {item.name} - {category.name}
          
          {/* CrisPRO.ai: Show AI prediction badge */}
          {isAIPredicted && (
            <span className="ml-2 text-xs bg-blue-600 text-white px-1 rounded">AI Predicted</span>
          )}
        </div>
        
        <div className="text-xl my-1">
          <Score value={value} threshold={criticalRiskThreshold || 0.7} />
          
          {/* CrisPRO.ai: Show confidence indicator */}
          {showConfidenceIndicators && isAIPredicted && analysisData?.confidenceLevel !== undefined && (
            <span className="ml-2 text-xs text-slate-300">
              (Confidence: {Math.round(analysisData.confidenceLevel * 100)}%)
            </span>
          )}
        </div>
        
        {item.description && <div className="text-xs mt-1">{item.description}</div>}
        {category.description && <div className="text-xs mt-1">{category.description}</div>}
        
        {/* CrisPRO.ai: Show therapeutic context relevance */}
        {category.therapeuticContext && category.weightInContext !== undefined && (
          <div className="mt-2 pt-2 border-t border-slate-700">
            <div className="text-xs">
              <span className="text-blue-400">Context:</span> {category.therapeuticContext}
            </div>
            <div className="text-xs mt-1 flex items-center">
              <span className="mr-2">Relevance:</span>
              <div className="w-full bg-slate-700 h-1.5 rounded-full">
                <div
                  className="bg-blue-500 h-1.5 rounded-full"
                  style={{ width: `${category.weightInContext * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}
        
        {/* CrisPRO.ai: Show detailed AI analysis */}
        {hasDetailedAnalysis && analysisData && (
          <div className="mt-2 pt-2 border-t border-slate-700">
            <div className="text-xs font-semibold text-blue-400">AI Analysis:</div>
            <div className="text-xs mt-1">
              {analysisData.explanation}
            </div>
            
            {analysisData.supportingEvidence && (
              <div className="text-xs mt-1">
                <span className="text-slate-400">Evidence: </span>
                {analysisData.supportingEvidence.join(', ')}
              </div>
            )}
          </div>
        )}
        
        {/* CrisPRO.ai: Show risk timeline */}
        {category.riskTimeline && (
          <div className="mt-2 pt-2 border-t border-slate-700">
            <div className="text-xs flex">
              <span className="text-slate-400 mr-1">Risk Timeline:</span>
              <span className={
                category.riskTimeline === 'immediate' ? 'text-red-400' :
                category.riskTimeline === 'short-term' ? 'text-orange-400' :
                category.riskTimeline === 'long-term' ? 'text-yellow-400' :
                'text-slate-400'
              }>
                {category.riskTimeline.replace('-', ' ')}
              </span>
            </div>
          </div>
        )}
        
        {/* CrisPRO.ai: Show mitigation strategies */}
        {hasMitigation && showMitigationStrategies && (
          <div className="mt-2 pt-2 border-t border-slate-700">
            <div className="text-xs font-semibold text-green-400">Mitigation Strategies:</div>
            <ul className="text-xs mt-1 list-disc pl-4">
              {category.mitigationStrategies!.map((strategy, i) => (
                <li key={i}>{strategy}</li>
              ))}
            </ul>
            
            {category.mitigationDifficulty !== undefined && (
              <div className="text-xs mt-1 flex items-center">
                <span className="mr-2">Difficulty:</span>
                <div className="w-full bg-slate-700 h-1.5 rounded-full">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${category.mitigationDifficulty * 100}%`,
                      backgroundColor: getColorForRisk(category.mitigationDifficulty),
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* CrisPRO.ai: Action buttons */}
        <div className="mt-3 pt-2 border-t border-slate-700 flex gap-2">
          {onRequestExplanation && (
            <button
              className="text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
              onClick={() => onRequestExplanation(item, category)}
            >
              Explain
            </button>
          )}
          
          {onRequestMitigation && value > 0.5 && (
            <button
              className="text-xs bg-green-600 hover:bg-green-700 px-2 py-1 rounded"
              onClick={() => onRequestMitigation(item, category)}
            >
              Mitigate
            </button>
          )}
          
          {item.simulationResults && enableSimulation && (
            <button className="text-xs bg-purple-600 hover:bg-purple-700 px-2 py-1 rounded">
              Simulate
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <DataVisualizer
      data={items || data}
      isLoading={(items?.length === 0 || !items) && (!data || data.length === 0)}
      className={`risk-heatmap ${className}`}
    >
      <div className="relative bg-slate-900 rounded-xl p-4 overflow-hidden" style={{ height }}>
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          {subtitle && <p className="text-slate-300 text-sm mt-1">{subtitle}</p>}
        </div>
        
        {/* Heatmap table */}
        <div className="overflow-x-auto">
          {items && categories ? (
            // Original format with items and categories
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2 text-slate-300 font-semibold">Item</th>
                  {categories.map(category => (
                    <th 
                      key={category.id} 
                      className="text-center p-2 text-slate-300 font-semibold"
                      title={category.description}
                    >
                      {category.name}
                    </th>
                  ))}
                  {showSummaryScore && (
                    <th className="text-center p-2 text-slate-300 font-semibold">
                      Summary
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {items.map(item => {
                  const summaryScore = calculateSummaryScore(item);
                  
                  return (
                    <tr key={item.id} className="border-t border-slate-700">
                      <td className="p-2 text-white font-medium">{item.name}</td>
                      {categories.map(category => {
                        const value = item.categories[category.id] || 0;
                        const cellStyle = getCellStyle(value);
                        
                        return (
                          <td 
                            key={`${item.id}-${category.id}`}
                            className="p-2 text-center relative transition-colors duration-200"
                            style={cellStyle}
                            onMouseEnter={() => setHoveredCell({ itemId: item.id, categoryId: category.id })}
                            onMouseLeave={() => setHoveredCell(null)}
                            onClick={() => onCellClick && onCellClick(item, category, value)}
                          >
                            {showValues && (
                              <div className="text-xs font-semibold">
                                {value.toFixed(2)}
                              </div>
                            )}
                          </td>
                        );
                      })}
                      {showSummaryScore && (
                        <td className="p-2 text-center">
                          <Score value={summaryScore} threshold={0.7} />
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : data ? (
            // Alternative format with data array
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2 text-slate-300 font-semibold"></th>
                  {Array.from(new Set(data.map(d => d.x))).map(colHeader => (
                    <th 
                      key={colHeader} 
                      className="text-center p-2 text-slate-300 font-semibold"
                    >
                      {showLabels ? colHeader : ''}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from(new Set(data.map(d => d.y))).map(rowHeader => (
                  <tr key={rowHeader} className="border-t border-slate-700">
                    <td className="p-2 text-white font-medium">{showLabels ? rowHeader : ''}</td>
                    {Array.from(new Set(data.map(d => d.x))).map(colHeader => {
                      const cell = data.find(d => d.x === colHeader && d.y === rowHeader);
                      const value = cell ? cell.value : 0;
                      const cellStyle = getCellStyle(value);
                      
                      return (
                        <td 
                          key={`${rowHeader}-${colHeader}`}
                          className={`p-2 text-center relative transition-colors duration-200 ${enableSelection ? 'cursor-pointer' : ''}`}
                          style={cellStyle}
                          onClick={() => onCellClick && cell && onCellClick(cell)}
                        >
                          {showValues && (
                            <div className="text-xs font-semibold">
                              {value.toFixed(2)}
                            </div>
                          )}
                          {cell?.significance && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center p-8 text-slate-400">No data available</div>
          )}
        </div>
        
        {/* Legend */}
        {showLegend && (
          <div className="mt-4 flex justify-between items-center">
            <ColorLegend
              title="Risk Scale"
              items={[
                { color: colorRange.minColor, label: 'Low' },
                { color: getColorInRange(0.5, colorRange.min, colorRange.max, colorRange.minColor, colorRange.maxColor), label: 'Medium' },
                { color: colorRange.maxColor, label: 'High' },
              ]}
              className="bg-slate-800/50 p-2 rounded-md"
            />
            
            {summaryMethod === 'weighted' && (
              <div className="text-xs text-slate-400">
                Using weighted average for summary scores
              </div>
            )}
          </div>
        )}
        
        {/* Tooltip */}
        {hoveredCell && renderTooltip()}
      </div>
    </DataVisualizer>
  );
}

export default RiskHeatmap; 