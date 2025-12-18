/**
 * Narrative Adapter
 * Extracts narrative structure from MOAT markdown documents
 * 
 * This adapter parses MOAT .md files to extract:
 * - Hero question and answers
 * - Problem narrative
 * - Solution narrative
 * - How it works steps
 * - Value proposition
 * - Examples
 * - Integration information
 */

import { MOATDocumentStructure } from '@/types/educational-capability';

/**
 * Parse MOAT markdown content to extract narrative structure
 * This is a simplified parser - in production, you might use a markdown parser library
 */
export function parseMOATDocument(markdownContent: string): MOATDocumentStructure {
  const structure: MOATDocumentStructure = {};

  // Extract hero question section
  const heroQuestionMatch = markdownContent.match(/## The Question Nobody Was Answering[\s\S]*?"(.*?)"[\s\S]*?The answer you get\? \*"(.*?)"\*[\s\S]*?\*\*(.*?)\*\*/);
  if (heroQuestionMatch) {
    structure.heroQuestion = {
      question: heroQuestionMatch[1] || '',
      genericAnswer: heroQuestionMatch[2] || '',
      ourAnswer: heroQuestionMatch[3] || '',
    };
  }

  // Extract problem section
  const problemMatch = markdownContent.match(/## The Problem: (.*?)\n\n([\s\S]*?)(?=##|$)/);
  if (problemMatch) {
    structure.problem = {
      title: `The Problem: ${problemMatch[1]}`,
      narrative: problemMatch[2].trim(),
    };
    
    // Extract visual metaphor if present
    const metaphorMatch = markdownContent.match(/\*\*Visual metaphor:\*\* (.*?)(?=\n|$)/);
    if (metaphorMatch) {
      structure.problem.visualMetaphor = metaphorMatch[1];
    }
  }

  // Extract solution section
  const solutionMatch = markdownContent.match(/## The Solution: (.*?)\n\n([\s\S]*?)(?=##|$)/);
  if (solutionMatch) {
    structure.solution = {
      title: `The Solution: ${solutionMatch[1]}`,
      narrative: solutionMatch[2].trim(),
    };
  }

  // Extract "How It Works" section
  const howItWorksMatch = markdownContent.match(/## How (.*?) Works \(([\s\S]*?)\)/);
  if (howItWorksMatch) {
    const stepsMatch = markdownContent.match(/Step (\d+): (.*?)\n\n([\s\S]*?)(?=Step \d+:|##|$)/g);
    if (stepsMatch) {
      structure.howItWorks = {
        title: `How ${howItWorksMatch[1]} Works`,
        steps: stepsMatch.map((step, idx) => {
          const stepMatch = step.match(/Step (\d+): (.*?)\n\n([\s\S]*?)(?=Step \d+:|##|$)/);
          return {
            number: parseInt(stepMatch?.[1] || `${idx + 1}`),
            title: stepMatch?.[2] || '',
            description: stepMatch?.[3]?.trim() || '',
          };
        }),
      };
    }
  }

  // Extract value proposition
  const valuePropMatch = markdownContent.match(/## (THE MOAT|The MOAT): (.*?)\n\n([\s\S]*?)(?=##|$)/);
  if (valuePropMatch) {
    const questionMatch = markdownContent.match(/> \*\*"(.*?)"\*\*/);
    const genericMatch = markdownContent.match(/Generic AI Response:\*\*\n```\n(.*?)\n```/);
    const ourMatch = markdownContent.match(/Our System's Response:\*\*\n```\n(.*?)\n```/);
    
    structure.valueProposition = {
      title: `${valuePropMatch[1]}: ${valuePropMatch[2]}`,
      question: questionMatch?.[1] || '',
      genericResponse: genericMatch?.[1] || '',
      ourResponse: ourMatch?.[1] || '',
    };
  }

  // Extract example/patient story
  const exampleMatch = markdownContent.match(/## 🎯 A REAL PATIENT STORY: (.*?)\n\n### \*\*Meet (.*?): (.*?)\*\*\n\n([\s\S]*?)(?=##|$)/);
  if (exampleMatch) {
    const profileMatch = exampleMatch[4].match(/\*\*(.*?):\*\* (.*?)(?=\n|$)/g);
    const questionMatch = exampleMatch[4].match(/\*\*Her Question:\*\* "(.*?)"/);
    
    structure.example = {
      patient: {
        name: exampleMatch[2],
        profile: profileMatch?.map(p => p.replace(/\*\*/g, '').trim()) || [],
        question: questionMatch?.[1] || '',
      },
      solution: [], // Would need more parsing
      outcome: [], // Would need more parsing
    };
  }

  // Extract integration information
  const integrationMatch = markdownContent.match(/## How (.*?) Fits Into Complete Care[\s\S]*?Care plan context \(step (\d+)\): (.*?)(?=\n|$)/);
  if (integrationMatch) {
    structure.integration = {
      connections: [],
      carePlanContext: [{
        step: parseInt(integrationMatch[2]),
        component: integrationMatch[1],
        howThisHelps: integrationMatch[3],
      }],
    };
  }

  return structure;
}

/**
 * Get MOAT document content (placeholder - would read from file system or CMS)
 */
export async function getMOATDocument(capabilitySlug: string): Promise<string> {
  // In production, this would read from the file system or CMS
  // For now, return empty string - will be implemented when we have the actual MOAT docs
  return '';
}

