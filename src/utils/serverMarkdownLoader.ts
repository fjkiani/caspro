import fs from 'fs';
import path from 'path';

// Utility function to load markdown content from a specific file
export function getMarkdownContent(filePath: string): string {
  try {
    // Path to the .cursor/rules directory
    const rulesDir = path.join(process.cwd(), '..', '.cursor', 'rules');
    const fullPath = path.join(rulesDir, filePath);
    
    // Read the file
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    return fileContent;
  } catch (error) {
    console.error(`Error loading markdown file: ${filePath}`, error);
    return `# Error Loading Content\n\nWe apologize, but we couldn't load the requested content. Please try again later.`;
  }
}

// Extract the effective date from the markdown content if available
export function extractEffectiveDate(content: string): string | null {
  // Look for "Effective Date: [date]" in the content
  const match = content.match(/Effective Date: \[(.*?)\]/);
  if (match && match[1]) {
    return match[1] !== "Insert Date" ? match[1] : null;
  }
  return null;
}

// Replace placeholder values in the markdown content
export function processMarkdownContent(content: string): string {
  const companyName = 'CasPro HealthTech AI';
  const contactEmail = 'contact@caspro.dev';
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Replace common placeholders
  let processedContent = content
    .replace(/\[Insert Date\]/g, currentDate)
    .replace(/\[Insert Company Name\]/g, companyName)
    .replace(/\[Insert Company Contact Email\]/g, contactEmail)
    .replace(/\[Insert Company Phone Number \(Optional\)\]/g, '')
    .replace(/\[Insert Company Address \(Optional\)\]/g, '')
    .replace(/\[Insert Company Security Contact Email - .*?\]/g, contactEmail);
  
  return processedContent;
} 