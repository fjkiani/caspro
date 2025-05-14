'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LegalPageLayout from '@/components/layouts/LegalPageLayout';

interface PageProps {
  pageConfig: {
    title: string;
    subtitle: string;
    filePath: string;
  };
  content: string;
}

export default function AboutClientPage({ pageConfig, content }: PageProps) {
  return (
    <LegalPageLayout 
      title={pageConfig.title}
      subtitle={pageConfig.subtitle}
      currentPageId="about"
    >
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom rendering for headings to match our styling
          h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-slate-900 mt-8 mb-4" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3" {...props} />,
          // Add some styling to lists
          ul: ({node, ...props}) => <ul className="list-disc pl-5 my-4" {...props} />,
          // Enhance blockquotes
          blockquote: ({node, ...props}) => (
            <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-slate-700" {...props} />
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </LegalPageLayout>
  );
} 