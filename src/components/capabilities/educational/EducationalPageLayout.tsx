'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Clock, ChevronRight } from 'lucide-react';
import { EducationalPageLayoutData } from '@/types/educational-capability';

interface EducationalPageLayoutProps {
  data: EducationalPageLayoutData;
  children: React.ReactNode;
  productSlug?: string;
  capabilitySlug?: string;
}

export default function EducationalPageLayout({ 
  data, 
  children,
  productSlug,
  capabilitySlug 
}: EducationalPageLayoutProps) {
  const pathname = usePathname();
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
      setReadingProgress(scrollPercent);

      // Update active section based on scroll position
      const sections = data.sidebar.sections;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && scrollTop >= section.offsetTop - 100) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data.sidebar.sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar spacer */}
      <div className="h-20"></div>
      
      {/* Progress Bar */}
      {data.progress && (
        <div className="fixed top-20 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
          <div className="h-1 bg-slate-200">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-300"
              style={{ width: `${readingProgress}%` }}
            />
          </div>
          <div className="px-4 py-2 flex items-center justify-between max-w-7xl mx-auto">
            <div className="text-sm text-slate-600">
              {capabilitySlug ? capabilitySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Capability'} • {data.progress.current} of {data.progress.total} sections
            </div>
            {data.progress.readingTime && (
              <div className="flex items-center space-x-4 text-sm text-slate-600">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  ~{data.progress.readingTime} min read
                </span>
                <span>{Math.round(readingProgress)}% complete</span>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="flex max-w-7xl mx-auto pt-16">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:block w-80 bg-white shadow-lg border-r border-slate-200 h-screen sticky top-32 overflow-y-auto">
          <div className="p-6 border-b border-slate-200">
            {productSlug && capabilitySlug && (
              <Link 
                href={`/products/${productSlug}`} 
                className="text-sm text-blue-600 hover:text-blue-800 mb-2 block"
              >
                ← Back to {productSlug === 'oncology' ? 'Oncology' : productSlug === 'r-d' ? 'R&D' : 'Research'}
              </Link>
            )}
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              {capabilitySlug ? capabilitySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Capability'}
            </h2>
            <p className="text-sm text-slate-600">
              Learn how this capability works and why it matters
            </p>
          </div>
          
          <nav className="p-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
              Sections
            </h3>
            <ul className="space-y-1">
              {data.sidebar.sections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full block px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                        isActive
                          ? 'bg-blue-100 text-blue-800 font-medium'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{section.title}</span>
                        {isActive && (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </div>
                      {section.subsections && section.subsections.length > 0 && (
                        <ul className="mt-2 ml-4 space-y-1">
                          {section.subsections.map((subsection, idx) => (
                            <li key={idx}>
                              <span className="text-xs text-slate-500">{subsection}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-slate-50 min-h-screen">
          {/* Mobile Navigation */}
          <div className="lg:hidden bg-white border-b border-slate-200 p-4 mt-16">
            {productSlug && capabilitySlug && (
              <Link 
                href={`/products/${productSlug}`} 
                className="text-sm text-blue-600 hover:text-blue-800 mb-2 block"
              >
                ← Back to {productSlug === 'oncology' ? 'Oncology' : productSlug === 'r-d' ? 'R&D' : 'Research'}
              </Link>
            )}
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              {capabilitySlug ? capabilitySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Capability'}
            </h2>
            <p className="text-sm text-slate-600">
              Learn how this capability works and why it matters
            </p>
          </div>
          
          <div className="p-4 lg:p-8 max-w-none">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

