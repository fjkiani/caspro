/**
 * Example Adapter
 * Extracts real-world examples and patient stories from MOAT documents
 */

import { ExampleShowcaseData } from '@/types/educational-capability';
import { MOATDocumentStructure } from '@/types/educational-capability';

/**
 * Extract example/patient story from MOAT document
 */
export function extractExample(moatDoc: MOATDocumentStructure): ExampleShowcaseData | null {
  if (!moatDoc.example) {
    return null;
  }

  return {
    title: 'A Real Patient Story',
    patient: moatDoc.example.patient,
    solution: moatDoc.example.solution,
    outcome: moatDoc.example.outcome,
  };
}

/**
 * Extract infographic-ready data from MOAT document
 * Looks for sections marked with "INFOGRAPHIC-READY DATA"
 */
export function extractInfographicData(markdownContent: string): any {
  const infographicSections: any = {};

  // Extract tables
  const tableMatches = markdownContent.matchAll(/\|([\s\S]*?)\|/g);
  const tables: any[] = [];
  
  for (const match of tableMatches) {
    const rows = match[1].split('\n').filter(row => row.trim() && row.includes('|'));
    if (rows.length > 1) {
      const headers = rows[0].split('|').map(h => h.trim()).filter(h => h);
      const dataRows = rows.slice(1).map(row => {
        const cells = row.split('|').map(c => c.trim()).filter(c => c);
        const obj: any = {};
        headers.forEach((header, idx) => {
          obj[header] = cells[idx] || '';
        });
        return obj;
      });
      tables.push({ headers, rows: dataRows });
    }
  }

  if (tables.length > 0) {
    infographicSections.tables = tables;
  }

  // Extract comparison data
  const comparisonMatch = markdownContent.match(/## Comparison[\s\S]*?\| Feature \| Generic AI \| Our System \|[\s\S]*?\|([\s\S]*?)\|/);
  if (comparisonMatch) {
    // Parse comparison table
    infographicSections.comparison = comparisonMatch[1];
  }

  return infographicSections;
}

