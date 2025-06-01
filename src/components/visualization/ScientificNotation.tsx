'use client';

import React, { ReactNode } from 'react';

export interface ScientificNotationProps {
  /** The numeric value to display */
  value: number;
  /** The number of decimal places to show */
  precision?: number;
  /** Whether to use scientific notation (e.g., 1.23e-4) */
  scientific?: boolean;
  /** Whether to format as a percentage */
  percentage?: boolean;
  /** Units to display after the value */
  units?: string;
  /** Whether to display a +/- symbol for positive/negative values */
  showSign?: boolean;
  /** Symbol to use for infinity */
  infinitySymbol?: string;
  /** Additional CSS classes */
  className?: string;
  /** Tooltip or popover content */
  tooltip?: ReactNode;
  /** Whether value is significant (affects styling) */
  isSignificant?: boolean;
  /** Custom formatter function */
  formatter?: (value: number) => string;
}

/**
 * ScientificNotation renders numeric values in a consistent, scientifically
 * appropriate format with proper units and styling.
 */
export function ScientificNotation({
  value,
  precision = 2,
  scientific = false,
  percentage = false,
  units = '',
  showSign = false,
  infinitySymbol = '∞',
  className = '',
  tooltip,
  isSignificant = false,
  formatter,
}: ScientificNotationProps) {
  // Use custom formatter if provided
  if (formatter) {
    return (
      <span 
        className={`scientific-notation ${isSignificant ? 'font-semibold' : ''} ${className}`}
        title={tooltip ? String(tooltip) : undefined}
      >
        {formatter(value)}
        {units && <span className="text-gray-400 ml-1">{units}</span>}
      </span>
    );
  }

  // Handle special cases
  if (!Number.isFinite(value)) {
    return (
      <span 
        className={`scientific-notation ${isSignificant ? 'font-semibold' : ''} ${className}`}
        title={tooltip ? String(tooltip) : undefined}
      >
        {value > 0 ? infinitySymbol : `-${infinitySymbol}`}
        {units && <span className="text-gray-400 ml-1">{units}</span>}
      </span>
    );
  }

  // Format the value based on options
  let formattedValue: string;
  
  if (percentage) {
    formattedValue = `${(value * 100).toFixed(precision)}%`;
  } else if (scientific && (Math.abs(value) < 0.001 || Math.abs(value) > 10000)) {
    // Use scientific notation for very small or very large numbers
    formattedValue = value.toExponential(precision);
  } else {
    formattedValue = value.toFixed(precision);
    
    // Remove trailing zeros and decimal point if no decimal places
    if (formattedValue.includes('.')) {
      formattedValue = formattedValue.replace(/\.?0+$/, '');
    }
  }

  // Add sign if requested
  if (showSign && value > 0) {
    formattedValue = `+${formattedValue}`;
  }

  // Build className based on properties
  const colorClass = isSignificant 
    ? value < 0 
      ? 'text-red-400' 
      : 'text-green-400'
    : '';

  return (
    <span 
      className={`scientific-notation ${colorClass} ${isSignificant ? 'font-semibold' : ''} ${className}`}
      title={tooltip ? String(tooltip) : undefined}
    >
      {formattedValue}
      {units && <span className="text-gray-400 ml-1">{units}</span>}
    </span>
  );
}

/**
 * Formats a p-value with appropriate scientific notation
 */
export function PValue({ 
  value, 
  className = '',
  significant = 0.05
}: { 
  value: number; 
  className?: string;
  significant?: number;
}) {
  return (
    <span className={`p-value ${className}`}>
      p = <ScientificNotation 
        value={value} 
        scientific={true} 
        precision={3}
        isSignificant={value < significant}
      />
    </span>
  );
}

/**
 * Formats a score value (typically 0-1) with appropriate styling
 */
export function Score({
  value,
  className = '',
  threshold = 0.7,
}: {
  value: number;
  className?: string;
  threshold?: number;
}) {
  return (
    <ScientificNotation
      value={value}
      precision={2}
      isSignificant={value >= threshold}
      className={className}
    />
  );
}

export default ScientificNotation; 