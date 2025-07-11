'use client';

import React from 'react';
import Link from 'next/link';
import { modules } from '@/data/learn/modules';

const LearnPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar spacer */}
      <div className="h-20"></div>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">Learning Modules</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive educational content covering the fundamentals of oncology, 
            cancer biology, and cutting-edge treatment approaches.
          </p>
        </div>
        
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {modules.map(module => (
            <Link 
              key={module.slug} 
              href={`/learn/${module.slug}`} 
              className="block group"
            >
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 group-hover:border-blue-300 group-hover:-translate-y-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {module.title}
                </h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {module.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {module.topics.length} topic{module.topics.length !== 1 ? 's' : ''}
                  </span>
                  <span className="text-blue-600 font-medium group-hover:text-blue-700 flex items-center">
                    Start Learning 
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearnPage; 