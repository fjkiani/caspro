'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, Clock, CheckCircle, BookOpen, Users, Target, TrendingUp, Zap } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  estimatedTime: number; // in minutes
}

interface InvestmentThesisLayoutProps {
  children: React.ReactNode;
}

const sections: Section[] = [
  { id: 'header', title: 'Executive Summary', subtitle: 'The paradigm shift', icon: <BookOpen className="h-4 w-4" />, estimatedTime: 2 },
  { id: 'opportunity', title: 'Market Opportunity', subtitle: 'The $2.4T problem', icon: <TrendingUp className="h-4 w-4" />, estimatedTime: 5 },
  { id: 'patient-journey', title: 'Patient Journey', subtitle: 'The broken system', icon: <Users className="h-4 w-4" />, estimatedTime: 4 },
  { id: 'pillars', title: 'Solution Pillars', subtitle: 'Our innovation framework', icon: <Target className="h-4 w-4" />, estimatedTime: 3 },
  { id: 'gtm', title: 'Go-to-Market', subtitle: 'Multi-front strategy', icon: <Zap className="h-4 w-4" />, estimatedTime: 3 },
  { id: 'desci', title: 'DeSci & Innovation', subtitle: 'New economic engine', icon: <BookOpen className="h-4 w-4" />, estimatedTime: 6 },
  { id: 'metastasis', title: 'Clinical Framework', subtitle: '8-step metastasis roadmap', icon: <Target className="h-4 w-4" />, estimatedTime: 7 },
  { id: 'business', title: 'Business Model', subtitle: 'Revenue & projections', icon: <TrendingUp className="h-4 w-4" />, estimatedTime: 4 },
  { id: 'team', title: 'Team & Execution', subtitle: 'Who we are', icon: <Users className="h-4 w-4" />, estimatedTime: 5 },
  { id: 'cta', title: 'Investment Opportunity', subtitle: 'Join the revolution', icon: <Zap className="h-4 w-4" />, estimatedTime: 2 }
];

const InvestmentThesisLayout: React.FC<InvestmentThesisLayoutProps> = ({ children }) => {
  const [activeSection, setActiveSection] = useState('header');
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setReadingProgress(scrollPercent);
      setShowScrollTop(scrollTop > 500);

      // Update active section based on scroll position
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      }));

      const currentSection = sectionElements.find(({ element }) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
        
        // Mark sections as completed when user scrolls past them
        const currentIndex = sections.findIndex(s => s.id === currentSection.id);
        const newCompleted = new Set(completedSections);
        sections.slice(0, currentIndex).forEach(section => {
          newCompleted.add(section.id);
        });
        setCompletedSections(newCompleted);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [completedSections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const totalEstimatedTime = sections.reduce((acc, section) => acc + section.estimatedTime, 0);
  const completedTime = sections
    .filter(section => completedSections.has(section.id))
    .reduce((acc, section) => acc + section.estimatedTime, 0);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Fixed Progress Bar */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="h-1 bg-gray-800">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
            style={{ width: `${readingProgress}%` }}
          />
        </div>
        <div className="px-4 py-2 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Investment Thesis • {completedSections.size}/{sections.length} sections
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {completedTime}/{totalEstimatedTime} min
            </span>
            <span>{Math.round(readingProgress)}% complete</span>
          </div>
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto pt-32">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:block w-80 bg-gray-900/50 backdrop-blur-sm border-r border-gray-800 h-screen sticky top-32 overflow-y-auto">
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-6">Investment Thesis</h3>
            
            <nav className="space-y-2">
              {sections.map((section, index) => {
                const isActive = activeSection === section.id;
                const isCompleted = completedSections.has(section.id);
                
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600/20 border border-blue-500/30 text-blue-400'
                        : 'hover:bg-gray-800/50 text-gray-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 mt-1 ${
                        isCompleted ? 'text-green-400' : isActive ? 'text-blue-400' : 'text-gray-500'
                      }`}>
                        {isCompleted ? <CheckCircle className="h-4 w-4" /> : section.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium text-sm ${
                            isActive ? 'text-blue-400' : 'text-white'
                          }`}>
                            {section.title}
                          </h4>
                          <span className="text-xs text-gray-500 ml-2">
                            {section.estimatedTime}m
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {section.subtitle}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </nav>

            {/* Progress Summary */}
            <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
              <h4 className="text-sm font-medium text-white mb-2">Reading Progress</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Completed</span>
                  <span>{completedSections.size}/{sections.length}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(completedSections.size / sections.length) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Time</span>
                  <span>{completedTime}/{totalEstimatedTime} min</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <div className="lg:pl-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Navigation Indicator */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
        <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-800 rounded-lg p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">
              Section {sections.findIndex(s => s.id === activeSection) + 1} of {sections.length}
            </span>
            <span className="text-blue-400 font-medium">
              {sections.find(s => s.id === activeSection)?.title}
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-700 rounded-full h-1">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${readingProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors duration-200"
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>
      )}
    </div>
  );
};

export default InvestmentThesisLayout; 