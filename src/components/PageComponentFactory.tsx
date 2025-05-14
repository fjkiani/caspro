'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LegalPageLayout from '@/components/layouts/LegalPageLayout';
import { LEGAL_PAGES } from '@/constants/routes';
import { getMarkdownContent, processMarkdownContent, extractEffectiveDate } from '@/utils/serverMarkdownLoader';

interface PageComponentProps {
  pageId: string;
}

/**
 * Factory function to create page components for legal/informational pages.
 * This reduces code duplication across similar page components.
 */
export function createLegalPage(pageId: string) {
  // Create the functional component
  const PageComponent: React.FC<PageComponentProps> = () => {
    // Find the page configuration by ID
    const pageConfig = LEGAL_PAGES.find(page => page.id === pageId) || {
      title: 'Information',
      subtitle: '',
      filePath: ''
    };
    
    try {
      // Get and process the markdown content
      const rawContent = getMarkdownContent(pageConfig.filePath);
      const processedContent = processMarkdownContent(rawContent);
      const effectiveDate = extractEffectiveDate(processedContent);

      return (
        <LegalPageLayout 
          title={pageConfig.title}
          subtitle={pageConfig.subtitle}
          lastUpdated={effectiveDate || undefined}
          currentPageId={pageId}
        >
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              // Custom styling for headings to match our design
              h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-slate-900 mt-8 mb-4" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3" {...props} />,
              // Make links consistent with our design
              a: ({node, ...props}) => <a className="text-primary hover:underline" {...props} />,
              // Better list styling
              ul: ({node, ...props}) => <ul className="list-disc pl-5 my-3" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-5 my-3" {...props} />
            }}
          >
            {processedContent}
          </ReactMarkdown>
        </LegalPageLayout>
      );
    } catch (error) {
      console.error(`Error creating page for ${pageId}:`, error);
      
      // Display error page
      return (
        <LegalPageLayout 
          title="Error Loading Content"
          subtitle="We encountered a problem loading this page"
          currentPageId={pageId}
        >
          <div className="py-8 text-center">
            <p className="text-red-600 mb-4">Sorry, we couldn't load the requested content.</p>
            <p>Please try again later or contact support if the problem persists.</p>
          </div>
        </LegalPageLayout>
      );
    }
  };
  
  return PageComponent;
} 