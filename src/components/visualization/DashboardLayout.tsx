'use client';

import React, { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';

// Base interface for dashboard items
interface DashboardItem {
  id: string;
  title: string;
  content: ReactNode;
  className?: string;
}

// Original panel interface
export interface DashboardPanel extends DashboardItem {
  width?: 'full' | 'half' | 'third' | 'two-thirds' | 'quarter' | 'three-quarters';
  height?: 'auto' | 'small' | 'medium' | 'large';
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  refreshable?: boolean;
  onRefresh?: () => void;
  loading?: boolean;
}

// Widget interface (simplified for demo)
export interface DashboardWidget extends DashboardItem {
  width?: string; // CSS class for width
}

export interface DashboardLayoutProps {
  /** Panels to display in the dashboard */
  panels?: DashboardPanel[];
  /** Widgets to display in the dashboard (alternative to panels) */
  widgets?: DashboardWidget[];
  /** Title of the dashboard */
  title?: string;
  /** Subtitle of the dashboard */
  subtitle?: string;
  /** Background style (default, gradient, etc.) */
  backgroundStyle?: 'default' | 'gradient' | 'dark' | 'light';
  /** Whether to allow dragging panels */
  allowDragging?: boolean;
  /** Whether to allow resizing panels */
  allowResizing?: boolean;
  /** Gap between panels */
  gap?: 'none' | 'small' | 'medium' | 'large';
  /** Additional CSS classes */
  className?: string;
  /** Callback when panel layout changes */
  onLayoutChange?: (newLayout: DashboardPanel[] | DashboardWidget[]) => void;
}

/**
 * DashboardLayout arranges visualization components in a flexible grid layout,
 * with options for responsive sizing, collapsible panels, and drag-and-drop reordering.
 */
export function DashboardLayout({
  panels = [],
  widgets = [],
  title,
  subtitle,
  backgroundStyle = 'dark',
  allowDragging = false, // Not fully implemented in this version
  allowResizing = false, // Not fully implemented in this version
  gap = 'medium',
  className = '',
  onLayoutChange,
}: DashboardLayoutProps) {
  // Determine which items to use - prefer panels if both are provided
  const items = panels.length > 0 ? panels : widgets;
  const isPanelMode = panels.length > 0;

  // Track which panels are collapsed
  const [collapsedPanels, setCollapsedPanels] = useState<Set<string>>(
    new Set(items
      .filter(item => 'defaultCollapsed' in item && item.defaultCollapsed)
      .map(item => item.id)
    )
  );

  // Handle toggling panel collapse state
  const togglePanelCollapse = (panelId: string) => {
    setCollapsedPanels(prev => {
      const newSet = new Set(prev);
      if (newSet.has(panelId)) {
        newSet.delete(panelId);
      } else {
        newSet.add(panelId);
      }
      return newSet;
    });
  };

  // Handle panel refresh
  const handleRefresh = (panel: DashboardPanel) => {
    if (panel.onRefresh) {
      panel.onRefresh();
    }
  };

  // Map width prop to CSS class
  const getWidthClass = (item: DashboardItem): string => {
    // For widgets, we use the width directly if it's a string
    if (!isPanelMode && typeof (item as DashboardWidget).width === 'string') {
      return (item as DashboardWidget).width || 'col-span-12';
    }

    // For panels, we map the width enum to CSS classes
    const panelWidth = (item as DashboardPanel).width;
    switch (panelWidth) {
      case 'full': return 'col-span-12';
      case 'half': return 'col-span-12 lg:col-span-6';
      case 'third': return 'col-span-12 md:col-span-6 lg:col-span-4';
      case 'two-thirds': return 'col-span-12 lg:col-span-8';
      case 'quarter': return 'col-span-12 md:col-span-6 lg:col-span-3';
      case 'three-quarters': return 'col-span-12 lg:col-span-9';
      default: return 'col-span-12 md:col-span-6';
    }
  };

  // Map height prop to CSS class
  const getHeightClass = (item: DashboardItem): string => {
    if (!isPanelMode) return ''; // Auto height for widgets
    
    const panelHeight = (item as DashboardPanel).height;
    switch (panelHeight) {
      case 'small': return 'h-64';
      case 'medium': return 'h-96';
      case 'large': return 'h-[32rem]';
      default: return ''; // Auto height
    }
  };

  // Map gap prop to CSS class
  const getGapClass = (gap: string): string => {
    switch (gap) {
      case 'none': return 'gap-0';
      case 'small': return 'gap-2';
      case 'large': return 'gap-6';
      default: return 'gap-4'; // Medium gap
    }
  };

  // Get background style
  const getBackgroundClass = (style: string): string => {
    switch (style) {
      case 'gradient': return 'bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950';
      case 'light': return 'bg-slate-100';
      case 'dark': return 'bg-slate-900';
      default: return 'bg-slate-800';
    }
  };

  return (
    <div className={`dashboard-layout ${getBackgroundClass(backgroundStyle)} text-white p-4 rounded-xl ${className}`}>
      {/* Dashboard header */}
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h2 className="text-2xl font-bold">{title}</h2>}
          {subtitle && <p className="text-slate-300 mt-1">{subtitle}</p>}
        </div>
      )}

      {/* Panels grid */}
      <div className={`grid grid-cols-12 ${getGapClass(gap)}`}>
        {items.map((item) => {
          const isCollapsible = isPanelMode && (item as DashboardPanel).collapsible;
          const isCollapsed = isCollapsible && collapsedPanels.has(item.id);
          const widthClass = getWidthClass(item);
          const heightClass = !isCollapsed ? getHeightClass(item) : '';
          const isRefreshable = isPanelMode && (item as DashboardPanel).refreshable;
          const isLoading = isPanelMode && (item as DashboardPanel).loading;

          return (
            <motion.div
              key={item.id}
              className={`${widthClass} ${item.className || ''}`}
              layout
              transition={{ duration: 0.3 }}
            >
              <div className={`bg-slate-800 rounded-lg overflow-hidden shadow-md border border-slate-700 ${heightClass} flex flex-col`}>
                {/* Panel header */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-700/50 flex-shrink-0">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  {isPanelMode && (
                    <div className="flex items-center space-x-2">
                      {isRefreshable && (
                        <button 
                          className="text-slate-300 hover:text-white transition-colors p-1 rounded"
                          onClick={() => handleRefresh(item as DashboardPanel)}
                          disabled={isLoading}
                        >
                          <svg 
                            className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </button>
                      )}
                      {isCollapsible && (
                        <button 
                          className="text-slate-300 hover:text-white transition-colors p-1 rounded"
                          onClick={() => togglePanelCollapse(item.id)}
                        >
                          <svg 
                            className="w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d={isCollapsed 
                                ? "M19 9l-7 7-7-7" // Down arrow
                                : "M5 15l7-7 7 7" // Up arrow
                              } 
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Panel content */}
                {!isCollapsed && (
                  <div className="flex-grow p-4 min-h-0 overflow-hidden">
                    {isLoading ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      <div className="w-full h-full">
                        {item.content}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default DashboardLayout; 