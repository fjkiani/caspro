/**
 * Endpoint Parser - Extract API endpoints from endpoints.mdc
 * Parses the first 50 lines test case structure
 */

import { MDCParser, ParsedMDC } from './MDCParser';
import type { APIEndpoint, APIParameter, CodeExample } from '../hygraph/types';

export class EndpointParser {
  /**
   * Parse endpoints from endpoints.mdc content
   */
  static parseEndpoints(mdcContent: string): APIEndpoint[] {
    const endpoints: APIEndpoint[] = [];

    // Pattern to match endpoint sections: #### **/endpoint_name**
    const endpointRegex = /####\s+\*\*(\/[a-z_]+)\*\*\s*\(([^)]+)\)\s*\n\n([\s\S]*?)(?=\n####|\n###|$)/g;

    let match;
    while ((match = endpointRegex.exec(mdcContent)) !== null) {
      const [, path, title, content] = match;
      
      const endpoint = this.parseEndpointSection(path, title, content);
      if (endpoint) {
        endpoints.push(endpoint);
      }
    }

    return endpoints;
  }

  /**
   * Parse a single endpoint section
   */
  private static parseEndpointSection(
    path: string,
    title: string,
    content: string
  ): APIEndpoint | null {
    // Extract description (first bullet after * Description:)
    const descriptionMatch = content.match(/\*\s+\*\*Description:\*\*\s*([\s\S]+?)(?=\n\*|$)/);
    const description = descriptionMatch?.[1]?.trim() || '';

    // Extract inputs (for generative endpoints - after * Inputs:)
    const inputsMatch = content.match(/\*\s+\*\*Inputs:\*\*\s*([\s\S]+?)(?=\n\*|$)/);
    const inputs = inputsMatch?.[1]?.trim() || '';

    // Extract applications (list items after * Applications:)
    const applicationsMatch = content.match(/\*\s+\*\*Applications:\*\*\s*([\s\S]*?)(?=\n\*\s+\*\*|$)/);
    const applications = applicationsMatch?.[1]
      ?.split(/\n\s*\*/)
      .map(item => item.trim())
      .filter(Boolean)
      .slice(1) || [];

    // Extract outputs (after * Outputs:)
    const outputsMatch = content.match(/\*\s+\*\*Outputs:\*\*\s*([\s\S]+?)(?=\n\*|$)/);
    const outputs = outputsMatch?.[1]?.trim() || '';

    // Extract LLM Implementation Strategy
    const llmMatch = content.match(/\*\s+\*\*LLM Implementation Strategy:\*\*\s*([\s\S]*?)(?=\n\*\s+\*\*Applications in Key Use Cases:|\n\*\s+\*\*Example Prompt:|$)/);
    const llmStrategy = llmMatch?.[1]?.trim() || '';

    // Extract example prompt (handle both formats)
    const exampleMatch1 = content.match(/\*\s+\*\*Example Prompt:\*\*\s*`({[^`]+})`/);
    const exampleMatch2 = content.match(/\*\s+\*\*Example Prompt:\*\*\s*`([^`]+)`/);
    const examplePrompt = exampleMatch1?.[1] || exampleMatch2?.[1] || '';

    // Extract use cases
    const useCasesMatch = content.match(/\*\s+\*\*Applications in Key Use Cases:\*\*\s*([\s\S]*?)(?=\n---|$)/);
    const useCases = useCasesMatch?.[1]
      ?.split(/\n\s*\*/)
      .map(item => item.trim())
      .filter(Boolean)
      .slice(1) || [];

    // Determine category from path
    const category = this.determineCategory(path, title);

    // Build endpoint object
    const endpoint: APIEndpoint = {
      id: this.pathToId(path),
      name: this.pathToName(path, title),
      path: path,
      method: 'POST', // Default for AI endpoints
      description: {
        html: this.markdownToHtml(description),
        text: description,
        raw: { content: description },
      },
      category: category as any,
      parameters: this.extractParameters(examplePrompt, inputs, llmStrategy),
      requestBody: examplePrompt ? JSON.parse(examplePrompt) : undefined,
      responseSchema: this.parseOutputs(outputs),
      codeExamples: this.buildCodeExamples(examplePrompt, path),
      relatedEndpoints: [],
      useCases: [],
      performanceMetrics: undefined,
    };

    return endpoint;
  }

  /**
   * Determine API category from path and title
   */
  private static determineCategory(path: string, title: string): string {
    if (path.includes('predict_')) {
      return 'ORACLE_DISCRIMINATIVE';
    }
    if (path.includes('generate_')) {
      return 'FORGE_GENERATIVE';
    }
    return 'ORACLE_DISCRIMINATIVE'; // Default
  }

  /**
   * Convert path to ID
   */
  private static pathToId(path: string): string {
    return path.replace(/^\//, '').replace(/_/g, '-');
  }

  /**
   * Convert path to display name
   */
  private static pathToName(path: string, title: string): string {
    // Use title if available, otherwise format path
    if (title && title !== 'Core Predictive Endpoint') {
      return title;
    }
    return path
      .replace(/^\//, '')
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Extract parameters from example prompt, inputs field, and LLM strategy
   */
  private static extractParameters(examplePrompt: string, inputs: string, llmStrategy: string): APIParameter[] {
    const parameters: APIParameter[] = [];

    // First, try to extract from inputs field (for generative endpoints)
    if (inputs) {
      // Parse inputs like: `target_genomic_region`, `design_goal`, `organism`, `num_candidates`, `desired_properties`
      const inputFields = inputs.match(/`([a-z_]+)`/g) || [];
      inputFields.forEach(field => {
        const fieldName = field.replace(/`/g, '');
        if (!parameters.find(p => p.name === fieldName)) {
          parameters.push({
            name: fieldName,
            type: 'string', // Default, can be refined
            required: true,
            description: `Input parameter: ${fieldName}`,
            example: '',
          });
        }
      });
    }

    if (examplePrompt) {
      try {
        const promptObj = JSON.parse(examplePrompt);
        
        // Extract task parameter
        if (promptObj.task && !parameters.find(p => p.name === 'task')) {
          parameters.push({
            name: 'task',
            type: 'string',
            required: true,
            description: 'The API task identifier',
            example: promptObj.task,
          });
        }

        // Extract other parameters and update existing ones with examples
        Object.entries(promptObj).forEach(([key, value]) => {
          const existingParam = parameters.find(p => p.name === key);
          if (existingParam) {
            existingParam.example = typeof value === 'string' ? value : JSON.stringify(value);
            existingParam.type = this.inferType(value);
          } else if (key !== 'task') {
            parameters.push({
              name: key,
              type: this.inferType(value),
              required: true,
              description: `Parameter: ${key}`,
              example: typeof value === 'string' ? value : JSON.stringify(value),
            });
          }
        });
      } catch (e) {
        // If JSON parse fails and no inputs, create basic parameter
        if (parameters.length === 0) {
          parameters.push({
            name: 'input',
            type: 'object',
            required: true,
            description: 'Input parameters for the endpoint',
          });
        }
      }
    }

    return parameters;
  }

  /**
   * Infer parameter type from value
   */
  private static inferType(value: any): string {
    if (typeof value === 'string') return 'string';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    if (Array.isArray(value)) return 'array';
    if (typeof value === 'object') return 'object';
    return 'string';
  }

  /**
   * Parse outputs string into response schema
   */
  private static parseOutputs(outputs: string): Record<string, any> {
    const schema: Record<string, any> = {};
    
    // Extract output fields (comma-separated or backtick-wrapped)
    const fields = outputs.match(/`([a-z_]+)`/g) || [];
    fields.forEach(field => {
      const fieldName = field.replace(/`/g, '');
      schema[fieldName] = 'string'; // Default type
    });

    return schema;
  }

  /**
   * Build code examples from example prompt
   */
  private static buildCodeExamples(examplePrompt: string, path: string): CodeExample[] {
    const examples: CodeExample[] = [];

    if (examplePrompt) {
      // Python example
      examples.push({
        id: `${this.pathToId(path)}-python`,
        title: 'Python Example',
        language: 'PYTHON',
        code: this.generatePythonExample(examplePrompt, path),
        description: `Example request for ${path}`,
        runnable: false,
      });

      // cURL example
      examples.push({
        id: `${this.pathToId(path)}-curl`,
        title: 'cURL Example',
        language: 'CURL',
        code: this.generateCurlExample(examplePrompt, path),
        description: `cURL request for ${path}`,
        runnable: false,
      });
    }

    return examples;
  }

  /**
   * Generate Python code example
   */
  private static generatePythonExample(examplePrompt: string, path: string): string {
    try {
      const promptObj = JSON.parse(examplePrompt);
      return `import requests

response = requests.post(
    "https://api.crispro.ai${path}",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json=${JSON.stringify(promptObj, null, 4)}
)

result = response.json()
print(result)`;
    } catch {
      return `import requests

response = requests.post(
    "https://api.crispro.ai${path}",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={"task": "${path.replace('/', '')}"}
)

result = response.json()
print(result)`;
    }
  }

  /**
   * Generate cURL code example
   */
  private static generateCurlExample(examplePrompt: string, path: string): string {
    try {
      const promptObj = JSON.parse(examplePrompt);
      return `curl -X POST https://api.crispro.ai${path} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(promptObj)}'`;
    } catch {
      return `curl -X POST https://api.crispro.ai${path} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"task": "${path.replace('/', '')}"}'`;
    }
  }

  /**
   * Convert markdown to HTML (simple version)
   */
  private static markdownToHtml(markdown: string): string {
    return markdown
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br/>');
  }
}

