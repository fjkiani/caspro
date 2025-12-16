/**
 * MDC Parser - Parse .mdc files into structured content
 * Handles markdown + frontmatter extraction
 */

import fs from 'fs';
import path from 'path';

export interface ParsedMDC {
  frontmatter: Record<string, any>;
  content: string;
  sections: Record<string, string>;
  raw: string;
}

export class MDCParser {
  /**
   * Parse an MDC file from the .cursor/rules/APIs directory
   */
  static async parse(filePath: string): Promise<ParsedMDC> {
    // Use process.cwd() for Next.js compatibility
    const fullPath = path.join(process.cwd(), filePath);
    
    let raw: string;
    
    // Check if file exists
    if (fs.existsSync(fullPath)) {
      raw = fs.readFileSync(fullPath, 'utf-8');
    } else {
      // Try alternative path
      const altPath = path.join(process.cwd(), '.cursor', 'rules', 'APIs', path.basename(filePath));
      if (fs.existsSync(altPath)) {
        raw = fs.readFileSync(altPath, 'utf-8');
      } else {
        throw new Error(`MDC file not found: ${fullPath} or ${altPath}`);
      }
    }

    return this.parseContent(raw);
  }

  /**
   * Parse content string into structured MDC
   */
  private static parseContent(raw: string): ParsedMDC {
    // Extract frontmatter (if present)
    const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---\n/);
    const frontmatter = frontmatterMatch 
      ? this.parseFrontmatter(frontmatterMatch[1])
      : {};

    // Extract content (everything after frontmatter or full content)
    const content = frontmatterMatch 
      ? raw.slice(frontmatterMatch[0].length)
      : raw;

    // Extract sections by headers
    const sections = this.extractSections(content);

    return {
      frontmatter,
      content,
      sections,
      raw,
    };
  }

  /**
   * Parse frontmatter YAML
   */
  private static parseFrontmatter(frontmatter: string): Record<string, any> {
    const result: Record<string, any> = {};
    const lines = frontmatter.split('\n');

    for (const line of lines) {
      const match = line.match(/^(\w+):\s*(.+)$/);
      if (match) {
        const [, key, value] = match;
        result[key] = value.trim();
      }
    }

    return result;
  }

  /**
   * Extract sections by markdown headers
   */
  private static extractSections(content: string): Record<string, string> {
    const sections: Record<string, string> = {};
    
    // Match headers (##, ###, ####)
    const headerRegex = /^(#{2,4})\s+(.+)$/gm;
    const matches = Array.from(content.matchAll(headerRegex));
    
    if (matches.length === 0) {
      sections['content'] = content;
      return sections;
    }

    // Extract content between headers
    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      const headerLevel = match[1].length;
      const headerText = match[2].trim();
      const startIndex = match.index! + match[0].length;
      const endIndex = i < matches.length - 1 
        ? matches[i + 1].index! 
        : content.length;

      const sectionContent = content.slice(startIndex, endIndex).trim();
      const sectionKey = this.sanitizeKey(headerText);

      // Only store top-level sections (##) or specific patterns
      if (headerLevel === 2 || headerText.includes('Endpoint') || headerText.includes('Use Case')) {
        sections[sectionKey] = sectionContent;
      }
    }

    return sections;
  }

  /**
   * Sanitize header text to create a valid key
   */
  private static sanitizeKey(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  /**
   * Parse multiple MDC files
   */
  static async parseMultiple(filePaths: string[]): Promise<ParsedMDC[]> {
    return Promise.all(filePaths.map(path => this.parse(path)));
  }
}

