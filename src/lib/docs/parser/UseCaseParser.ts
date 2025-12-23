/**
 * Use Case Parser - Extract use cases from .mdc files
 */

import type { UseCase, UseCaseStep } from '../hygraph/types';

export class UseCaseParser {
  /**
   * Parse use case from MDC content
   */
  static parseUseCase(mdcContent: string, filePath: string): UseCase | null {
    // Extract title (first # heading)
    const titleMatch = mdcContent.match(/^#\s+(.+?)$/m);
    if (!titleMatch) return null;
    
    const title = titleMatch[1].trim();
    const slug = this.titleToSlug(title);

    // Extract overview section
    const overviewMatch = mdcContent.match(/##\s+Overview\s*\n\n([\s\S]*?)(?=\n##|$)/);
    const overview = overviewMatch?.[1]?.trim() || '';

    // Extract description (first paragraph after Overview)
    const description = overview.split('\n\n')[0] || overview;

    // Extract architecture/pipeline
    const pipelineMatch = mdcContent.match(/###\s+Pipeline\s*\n\n([\s\S]*?)(?=\n###|$)/);
    const pipelineSteps = pipelineMatch?.[1]
      ?.split(/\n\d+\.\s+/)
      .map(step => step.trim())
      .filter(Boolean)
      .slice(1) || [];

    // Extract API endpoints section
    const apiMatch = mdcContent.match(/##\s+API Endpoints\s*\n\n([\s\S]*?)(?=\n##|$)/);
    const apiContent = apiMatch?.[1] || '';

    // Extract input/output examples
    const inputMatch = apiContent.match(/\*\*Input:\*\*\s*```json\s*\n([\s\S]*?)\n```/);
    const outputMatch = apiContent.match(/\*\*Output:\*\*\s*```json\s*\n([\s\S]*?)\n```/);

    // Extract key features
    const featuresMatch = mdcContent.match(/##\s+Key Features\s*\n\n([\s\S]*?)(?=\n##|$)/);
    const features = featuresMatch?.[1]
      ?.split(/\n###\s+\d+\.\s+/)
      .map(feature => feature.trim())
      .filter(Boolean)
      .slice(1) || [];

    // Build use case steps from pipeline
    const steps: UseCaseStep[] = pipelineSteps.map((step, index) => ({
      order: index + 1,
      title: step.split('\n')[0] || `Step ${index + 1}`,
      description: {
        html: this.markdownToHtml(step),
        text: step,
        raw: { content: step },
      },
      tips: [],
    }));

    // Extract outcomes from key features
    const outcomes = features.map(feature => {
      const title = feature.split('\n')[0] || '';
      return title.replace(/^[^:]+:\s*/, '');
    });

    // Determine industry and difficulty
    const industry = this.determineIndustry(mdcContent);
    const difficulty = this.determineDifficulty(mdcContent);

    return {
      id: slug,
      title,
      slug,
      description: {
        html: this.markdownToHtml(description),
        text: description,
        raw: { content: description },
      },
      industry,
      difficulty,
      estimatedTime: '15-30 minutes',
      steps,
      outcomes: outcomes.length > 0 ? outcomes : ['Identify synthetic lethality relationships', 'Score gene essentiality', 'Recommend precision drugs'],
      prerequisites: ['Basic understanding of cancer biology', 'Familiarity with genetic variants'],
      relatedAPIs: [],
    };
  }

  /**
   * Convert title to slug
   */
  private static titleToSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /**
   * Determine industry from content
   */
  private static determineIndustry(content: string): 'BIOTECH' | 'CLINICAL' | 'RESEARCH' | 'PHARMA' {
    const lower = content.toLowerCase();
    if (lower.includes('clinical') || lower.includes('patient') || lower.includes('oncology')) {
      return 'CLINICAL';
    }
    if (lower.includes('drug') || lower.includes('therapeutic') || lower.includes('pharma')) {
      return 'PHARMA';
    }
    if (lower.includes('research') || lower.includes('academic')) {
      return 'RESEARCH';
    }
    return 'BIOTECH';
  }

  /**
   * Determine difficulty from content
   */
  private static determineDifficulty(content: string): 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' {
    const lower = content.toLowerCase();
    if (lower.includes('advanced') || lower.includes('complex') || lower.includes('expert')) {
      return 'ADVANCED';
    }
    if (lower.includes('intermediate') || lower.includes('moderate')) {
      return 'INTERMEDIATE';
    }
    return 'BEGINNER';
  }

  /**
   * Convert markdown to HTML
   */
  private static markdownToHtml(markdown: string): string {
    return markdown
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br/>');
  }
}






