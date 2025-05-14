import { LEGAL_PAGES } from '@/constants/routes';
import * as serverMarkdown from '@/utils/serverMarkdownLoader';
import PrivacyClientPage from './client';

export default async function PrivacyPage() {
  // Find the page config for Privacy Policy
  const pageConfig = LEGAL_PAGES.find(page => page.id === 'privacy') || {
    title: 'Privacy Policy',
    subtitle: 'How we collect, use, and protect your information',
    filePath: 'privacyPolicy.md'
  };
  
  // Get and process the markdown content on the server
  const rawContent = serverMarkdown.getMarkdownContent(pageConfig.filePath);
  const processedContent = serverMarkdown.processMarkdownContent(rawContent);
  const effectiveDate = serverMarkdown.extractEffectiveDate(processedContent);

  // Pass the processed content to the client component
  return (
    <PrivacyClientPage 
      pageConfig={pageConfig} 
      content={processedContent} 
      effectiveDate={effectiveDate || undefined}
    />
  );
} 