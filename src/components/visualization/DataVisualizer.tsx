'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface DataVisualizerProps<T = any> {
  /** The data to visualize */
  data?: T;
  /** Whether data is currently loading */
  isLoading?: boolean;
  /** Error that occurred during data loading */
  error?: Error | null;
  /** Custom loading component */
  loadingComponent?: ReactNode;
  /** Custom error component */
  errorComponent?: ReactNode;
  /** Custom empty state component */
  emptyComponent?: ReactNode;
  /** Minimum loading time in ms to prevent flashes */
  minimumLoadingTime?: number;
  /** Whether to animate transitions */
  animate?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Children to render when data is available */
  children: ReactNode | ((data: T) => ReactNode);
}

/**
 * DataVisualizer is a container component that handles common data visualization states:
 * - Loading state with optional spinner
 * - Error state with message
 * - Empty state when data is available but empty
 * - Rendering children with data when available
 */
export function DataVisualizer<T = any>({
  data,
  isLoading = false,
  error = null,
  loadingComponent,
  errorComponent,
  emptyComponent,
  minimumLoadingTime = 500,
  animate = true,
  className = '',
  children,
}: DataVisualizerProps<T>) {
  // State to track whether we've met the minimum loading time
  const [isMinLoadingComplete, setIsMinLoadingComplete] = React.useState(!isLoading || !minimumLoadingTime);

  // Set up minimum loading time if needed
  React.useEffect(() => {
    if (isLoading && minimumLoadingTime > 0) {
      setIsMinLoadingComplete(false);
      const timer = setTimeout(() => {
        setIsMinLoadingComplete(true);
      }, minimumLoadingTime);
      return () => clearTimeout(timer);
    } else {
      setIsMinLoadingComplete(true);
    }
  }, [isLoading, minimumLoadingTime]);

  // Determine what to render
  const renderContent = () => {
    // Show loading state
    if (isLoading || !isMinLoadingComplete) {
      return loadingComponent || (
        <div className="flex items-center justify-center h-full w-full">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-blue-300 font-medium">Loading visualization...</p>
          </div>
        </div>
      );
    }

    // Show error state
    if (error) {
      return errorComponent || (
        <div className="flex items-center justify-center h-full w-full">
          <div className="bg-red-500/10 text-red-400 p-4 rounded-lg max-w-md text-center">
            <h3 className="font-bold text-lg mb-2">Visualization Error</h3>
            <p>{error.message || 'An error occurred while preparing the visualization'}</p>
          </div>
        </div>
      );
    }

    // Show empty state
    if (!data || (Array.isArray(data) && data.length === 0) || (typeof data === 'object' && Object.keys(data).length === 0)) {
      return emptyComponent || (
        <div className="flex items-center justify-center h-full w-full">
          <div className="bg-slate-700/50 text-slate-300 p-6 rounded-lg max-w-md text-center">
            <h3 className="font-semibold text-lg mb-2">No Data Available</h3>
            <p>There is no data available to visualize at this time.</p>
          </div>
        </div>
      );
    }

    // Render children with data
    return typeof children === 'function' ? children(data) : children;
  };

  // Wrap in motion.div if animations are enabled
  if (animate) {
    return (
      <motion.div
        className={`data-visualizer relative w-full h-full ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>
    );
  }

  // Otherwise render without animation wrapper
  return (
    <div className={`data-visualizer relative w-full h-full ${className}`}>
      {renderContent()}
    </div>
  );
}

export default DataVisualizer; 