'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Menu, X } from 'lucide-react';

export interface TabItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  content: React.ReactNode;
}

export interface TabbedInterfaceProps {
  title: string;
  subtitle?: string | React.ReactNode;
  tabs: TabItem[];
  defaultTab?: string;
  className?: string;
  sidebarTitle?: string;
  sidebarSubtitle?: string;
  footerContent?: React.ReactNode;
  hideSidebarOnMobile?: boolean;
  compactMode?: boolean;
  showSidebar?: boolean;
}

const TabbedInterface: React.FC<TabbedInterfaceProps> = ({
  title,
  subtitle,
  tabs,
  defaultTab,
  className = '',
  sidebarTitle = 'Navigation',
  sidebarSubtitle = 'Navigate sections',
  footerContent,
  hideSidebarOnMobile = false,
  compactMode = false,
  showSidebar = true
}) => {
  const [activeSection, setActiveSection] = useState(defaultTab || tabs[0]?.id || '');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Enhanced scroll spy functionality
  useEffect(() => {
    // Find the scrollable container - try multiple selectors
    const scrollContainer = document.querySelector('.dossier-content.overflow-y-auto') || 
                           document.querySelector('.overflow-y-auto') ||
                           document.querySelector('[data-scroll-container]');
    
    const observerOptions = {
      root: scrollContainer, // Use the actual scrollable container
      rootMargin: '-20% 0px -60% 0px', // Better detection zone
      threshold: [0, 0.1, 0.3, 0.5, 0.7, 1.0] // More thresholds for better tracking
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Find the section with the highest intersection ratio
      let maxRatio = 0;
      let activeId = activeSection;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId && tabs.some(tab => tab.id === sectionId)) {
            activeId = sectionId;
          }
        }
      });

      if (activeId !== activeSection && maxRatio > 0.1) {
        setActiveSection(activeId);
        window.history.replaceState(null, '', `#${activeId}`);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Wait for DOM to be ready, then observe sections
      const timeoutId = setTimeout(() => {
        const elements = tabs.map(tab => document.getElementById(tab.id)).filter(Boolean);
        elements.forEach(element => {
          if (element) {
            observer.observe(element);
          }
        });
      }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [tabs, activeSection]);

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash && tabs.some(tab => tab.id === hash)) {
        setActiveSection(hash);
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    handleHashChange(); // Set initial section based on URL
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [tabs]);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    window.history.pushState(null, '', `#${sectionId}`);
    setSidebarOpen(false); // Close mobile sidebar after navigation
  };

  const renderContent = () => {
    return (
      <div className="space-y-16 w-full">
        {tabs.map((tab) => (
          <section 
            key={tab.id}
            id={tab.id} 
            data-section={tab.id} 
            className="scroll-mt-8 w-full"
          >
            <div className="w-full">
              {tab.content}
            </div>
          </section>
        ))}
      </div>
    );
  };

  return (
    <div className={`bg-gradient-to-br from-slate-50 via-white to-blue-50 relative ${className}`}>
      {/* Mobile Menu Button - Only show if sidebar is enabled */}
      {showSidebar && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 z-50 lg:hidden bg-white rounded-full p-3 shadow-lg border border-slate-200 hover:shadow-xl transition-all"
        >
          {sidebarOpen ? <X className="w-6 h-6 text-slate-700" /> : <Menu className="w-6 h-6 text-slate-700" />}
        </button>
      )}

      {/* Floating Sidebar Navigation - Only show if enabled */}
      {showSidebar && (
        <div className={`fixed left-4 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${hideSidebarOnMobile ? 'hidden lg:block' : ''}`}>
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 p-4 max-w-xs">
          {/* Header */}
          <div className="text-center mb-6 pb-4 border-b border-slate-200">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                <BarChart className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-slate-800 text-sm">{sidebarTitle}</span>
            </div>
            <div className="text-xs text-slate-500">{sidebarSubtitle}</div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeSection === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => handleNavClick(tab.id)}
                  className={`w-full group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-full"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  
                  <div className={`p-1.5 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-white/20' 
                      : 'bg-slate-100 group-hover:bg-slate-200'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium text-sm truncate transition-all ${
                      isActive ? 'text-white' : 'text-slate-700 group-hover:text-slate-900'
                    }`}>
                      {tab.label}
                    </div>
                  </div>

                  {/* Progress indicator */}
                  <div className={`w-2 h-2 rounded-full transition-all ${
                    isActive ? 'bg-white' : 'bg-slate-300 group-hover:bg-slate-400'
                  }`} />
                </motion.button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            {footerContent || (
              <div className="text-center">
                <div className="text-xs text-slate-500 mb-1">CrisPRO.ai</div>
                <div className="text-xs text-slate-400">Research Use Only</div>
              </div>
            )}
          </div>
        </div>
      </div>
      )}

      {/* Mobile Overlay - Only show if sidebar is enabled */}
      {showSidebar && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="w-full">
        <div className={`w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-24 ${showSidebar ? 'lg:pl-80' : ''}`}>
          <div className="max-w-5xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabbedInterface;
