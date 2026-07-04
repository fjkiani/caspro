import RelatedLinks from '@/components/shared/RelatedLinks';
import { LEGAL_PAGES } from '@/constants/routes';
import * as serverMarkdown from '@/utils/serverMarkdownLoader';
import ClientPage from './client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for CrisPRO.ai — usage terms, data handling policies, and service level agreements for the oncology AI co-pilot platform.",
  alternates: { canonical: "/terms" },
};


export default async function TermsPage() {
  // Find the page config for Terms of Service
  const pageConfig = LEGAL_PAGES.find(page => page.id === 'terms') || {
    title: 'Terms of Service',
    subtitle: 'Rules and guidelines for using our platform',
    filePath: 'terms.md'
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
      <RelatedLinks route="/terms" />

} 