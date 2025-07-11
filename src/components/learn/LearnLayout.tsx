'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { modules } from '@/data/learn/modules';
import { Clock, CheckCircle } from 'lucide-react';

interface LearnLayoutProps {
  children: React.ReactNode;
}

const LearnLayout: React.FC<LearnLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const moduleSlug = pathSegments[2];
  const topicSlug = pathSegments[3];
  
  const currentModule = modules.find(m => m.slug === moduleSlug);
  
  // Progress tracking state
  const [readingProgress, setReadingProgress] = useState(0);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [readingTime, setReadingTime] = useState(0);

  // Calculate estimated reading times (in minutes)
  const topicReadingTimes: { [key: string]: number } = {
    'biology-of-cancer': 8,
    'genetics-of-cancer': 10,
    'hallmarks-of-cancer': 12,
    'metastasis': 15,
    'staging-and-ecology': 10,
    'knowledge-check': 5
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setReadingProgress(scrollPercent);

      // Update reading time based on scroll progress
      const currentTopicTime = topicReadingTimes[topicSlug] || 8;
      const currentReadingTime = (scrollPercent / 100) * currentTopicTime;
      setReadingTime(currentReadingTime);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [topicSlug]);

  const totalEstimatedTime = currentModule?.topics.reduce((acc, topic) => {
    return acc + (topicReadingTimes[topic.slug] || 8);
  }, 0) || 0;

  const completedTime = Array.from(completedTopics).reduce((acc, topicId) => {
    return acc + (topicReadingTimes[topicId] || 8);
  }, 0) + readingTime;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar spacer */}
      <div className="h-20"></div>
      
      {/* Progress Bar */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="h-1 bg-slate-200">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-300"
            style={{ width: `${readingProgress}%` }}
          />
        </div>
        <div className="px-4 py-2 flex items-center justify-between">
          <div className="text-sm text-slate-600">
                         {currentModule?.title} • Topic {(currentModule?.topics.findIndex(t => t.slug === topicSlug) ?? -1) + 1} of {currentModule?.topics.length || 1}
          </div>
          <div className="flex items-center space-x-4 text-sm text-slate-600">
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {Math.round(completedTime)}/{totalEstimatedTime} min
            </span>
            <span>{Math.round(readingProgress)}% complete</span>
          </div>
        </div>
      </div>
      
             <div className="flex max-w-7xl mx-auto pt-16">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:block w-80 bg-white shadow-lg border-r border-slate-200 h-screen sticky top-32 overflow-y-auto">
          <div className="p-6 border-b border-slate-200">
            <Link 
              href="/learn" 
              className="text-sm text-blue-600 hover:text-blue-800 mb-2 block"
            >
              ← Back to Modules
            </Link>
            {currentModule && (
              <>
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  {currentModule.title}
                </h2>
                <p className="text-sm text-slate-600">
                  {currentModule.description}
                </p>
              </>
            )}
          </div>
          
          {currentModule && (
            <nav className="p-4">
              <h3 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                Topics
              </h3>
              <ul className="space-y-1">
                {currentModule.topics.map((topic, index) => {
                  const isActive = topic.slug === topicSlug;
                  return (
                    <li key={topic.slug}>
                      <Link
                        href={`/learn/${moduleSlug}/${topic.slug}`}
                        className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive
                            ? 'bg-blue-100 text-blue-800 font-medium'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="w-6 h-6 rounded-full bg-slate-200 text-xs flex items-center justify-center mr-3 font-medium">
                            {index + 1}
                          </span>
                          <div>
                            <div className="font-medium">{topic.title}</div>
                            <div className="text-xs text-slate-500 mt-1 line-clamp-2">
                              {topic.description}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-slate-50 min-h-screen">
          {/* Mobile Navigation */}
          <div className="lg:hidden bg-white border-b border-slate-200 p-4 mt-16">
            <Link 
              href="/learn" 
              className="text-sm text-blue-600 hover:text-blue-800 mb-2 block"
            >
              ← Back to Modules
            </Link>
            {currentModule && (
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">
                  {currentModule.title}
                </h2>
                <p className="text-sm text-slate-600">
                  {currentModule.description}
                </p>
              </div>
            )}
          </div>
          
          <div className="p-4 lg:p-8 max-w-none">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default LearnLayout; 