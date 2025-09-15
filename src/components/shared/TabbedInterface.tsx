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
}

const TabbedInterface: React.FC<TabbedInterfaceProps> = ({
  title,
  subtitle,
  tabs,
  defaultTab,
  className = '',
  sidebarTitle = 'Navigation',
  sidebarSubtitle = 'Navigate sections',
  footerContent
}) => {
  const [activeSection, setActiveSection] = useState(defaultTab || tabs[0]?.id || '');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Scroll spy functionality
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId && tabs.some(tab => tab.id === sectionId)) {
            setActiveSection(sectionId);
            window.history.replaceState(null, '', `#${sectionId}`);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    tabs.forEach(tab => {
      const element = document.getElementById(tab.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [tabs]);

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
      <div className="space-y-32">
        {/* Overview Section */}
        <section id="overview" data-section="overview" className="scroll-mt-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl font-extrabold text-slate-900 mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                {title}
              </h1>
              {subtitle && (
                <p className="text-2xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
                  {subtitle}
                </p>
              )}
            </motion.div>
          </div>
          
          {/* Tab Overview Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tabs.slice(1).map((tab, index) => {
              const Icon = tab.icon;
              return (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
                  onClick={() => handleNavClick(tab.id)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {tab.label}
                    </h3>
                  </div>
                  <div className="mt-4 text-sm text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore section →
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Individual Tab Sections */}
        {tabs.slice(1).map((tab) => (
          <section key={tab.id} id={tab.id} data-section={tab.id} className="scroll-mt-8">
            {tab.content}
          </section>
        ))}
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative ${className}`}>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-6 left-6 z-50 lg:hidden bg-white rounded-full p-3 shadow-lg border border-slate-200 hover:shadow-xl transition-all"
      >
        {sidebarOpen ? <X className="w-6 h-6 text-slate-700" /> : <Menu className="w-6 h-6 text-slate-700" />}
      </button>

      {/* Floating Sidebar Navigation */}
      <div className={`fixed left-6 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
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

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-24">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default TabbedInterface;
