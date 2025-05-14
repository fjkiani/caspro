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
  effectiveDate?: string;
}

export default function SecurityClientPage({ pageConfig, content, effectiveDate }: PageProps) {
  return (
    <LegalPageLayout 
      title={pageConfig.title}
      subtitle={pageConfig.subtitle}
      lastUpdated={effectiveDate}
      currentPageId="security"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </LegalPageLayout>
  );
} 