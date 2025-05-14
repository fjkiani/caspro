import { LEGAL_PAGES } from '@/constants/routes';
import * as serverMarkdown from '@/utils/serverMarkdownLoader';
import ClientPage from './client';

export default async function HipaaStatementPage() {
  // Find the page config for HIPAA Statement
  const pageConfig = LEGAL_PAGES.find(page => page.id === 'hipaa') || {
    title: 'HIPAA Statement',
    subtitle: 'Our commitment to protecting health information',
    filePath: 'hipaa.md'
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