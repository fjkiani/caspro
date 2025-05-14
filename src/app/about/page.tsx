import { LEGAL_PAGES } from '@/constants/routes';
import * as serverMarkdown from '@/utils/serverMarkdownLoader';
import ClientPage from './client';

export default async function AboutPage() {
  // Find the page config for About Us
  const pageConfig = LEGAL_PAGES.find(page => page.id === 'about') || {
    title: 'About Us',
    subtitle: 'Our mission, vision, and values',
    filePath: 'company.md'
  };
  
  // Get and process the markdown content on the server
  const rawContent = serverMarkdown.getMarkdownContent(pageConfig.filePath);
  const processedContent = serverMarkdown.processMarkdownContent(rawContent);

  // Pass the processed content to the client component
  return (
    <ClientPage 
      pageConfig={pageConfig} 
      content={processedContent} 
    />
  );
} 