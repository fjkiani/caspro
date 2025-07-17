'use client';

import React from 'react';
import UniversalContentRenderer from '@/components/universal/UniversalContentRenderer';
import { metastasisIntroductionContent } from '@/data/learn/universal/metastasis-introduction';

const UniversalDemoPage: React.FC = () => {
  const handleSectionComplete = (sectionId: string) => {
    console.log(`Section completed: ${sectionId}`);
  };

  const handleContentComplete = () => {
    console.log('All content completed!');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Demo Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Universal Content System Demo
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            This page demonstrates the new universal content rendering system. The same content 
            structure can be used to create any educational topic without writing new components.
          </p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-2xl mx-auto">
            <p className="text-blue-800 text-sm">
              <strong>Zero Custom Code:</strong> This entire page is generated from a JSON data structure 
              using reusable components. Adding new content requires only data, no new components.
            </p>
          </div>
        </div>

        {/* Universal Content Renderer */}
        <UniversalContentRenderer
          content={metastasisIntroductionContent}
          showProgress={true}
          showMetadata={true}
          onSectionComplete={handleSectionComplete}
          onContentComplete={handleContentComplete}
        />

        {/* System Information */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            System Architecture Benefits
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Zero Code Required</h3>
              <p className="text-green-700 text-sm">
                New educational content requires only JSON data structure. No React components needed.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Consistent Design</h3>
              <p className="text-blue-700 text-sm">
                All content automatically follows the same design system and interaction patterns.
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">Scalable Architecture</h3>
              <p className="text-purple-700 text-sm">
                Atomic design system allows infinite content scaling with maintained performance.
              </p>
            </div>
            
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-2">Interactive Elements</h3>
              <p className="text-orange-700 text-sm">
                Built-in progress tracking, navigation, and interactive components work automatically.
              </p>
            </div>
            
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Type Safety</h3>
              <p className="text-red-700 text-sm">
                TypeScript interfaces prevent data structure mismatches and ensure reliability.
              </p>
            </div>
            
            <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
              <h3 className="font-semibold text-teal-800 mb-2">Easy Maintenance</h3>
              <p className="text-teal-700 text-sm">
                Single source of truth for all components. Updates propagate automatically.
              </p>
            </div>
          </div>
        </div>

        {/* Usage Example */}
        <div className="mt-8 bg-slate-900 rounded-lg p-6">
          <h3 className="text-white font-semibold mb-4">Adding New Content - Example</h3>
          <pre className="text-green-400 text-sm overflow-auto">
{`// 1. Create content data (no React knowledge needed)
const newTopicContent: UniversalContent = {
  meta: {
    id: 'new-topic',
    title: 'Your New Topic',
    color: 'blue'
  },
  sections: [
    {
      id: 'intro',
      type: 'introduction',
      data: { content: 'Your content here...' }
    },
    {
      id: 'concepts',
      type: 'cards',
      data: { cards: [...] }
    }
  ]
};

// 2. Render with universal system
<UniversalContentRenderer content={newTopicContent} />`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default UniversalDemoPage; 