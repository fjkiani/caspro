import { LEGAL_PAGES } from '@/constants/routes';
import * as serverMarkdown from '@/utils/serverMarkdownLoader';
import ClientPage from './client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Security Overview",
  description: "How CrisPRO.ai safeguards your data: access controls, encryption, audit logging, and compliance posture.",
  alternates: { canonical: "/security-overview" },
};


export default async function SecurityOverviewPage() {
  // Find the page config for Security Overview
  const pageConfig = LEGAL_PAGES.find(page => page.id === 'security') || {
    title: 'Security Overview',
    subtitle: 'How we safeguard your data',
    filePath: 'security.md'
  };
  
  // Get and process the markdown content on the server
  const rawContent = serverMarkdown.getMarkdownContent(pageConfig.filePath);
  const processedContent = serverMarkdown.processMarkdownContent(rawContent);
  const effectiveDate = serverMarkdown.extractEffectiveDate(processedContent);

  // Pass the processed content to the client component
  return (
    <ClientPage 
      pageConfig={pageConfig} 
      content={processedContent} 
      effectiveDate={effectiveDate || undefined} 
    />
  );
} 