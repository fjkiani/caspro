/**
 * GPT Comparison API Client
 * 
 * Client-side wrapper for GPT comparison queries
 * Uses server-side API route to keep API key secure
 */

export interface GPTComparisonParams {
  prompt: string;
  systemPrompt?: string;
  model?: 'gpt-4' | 'gpt-4-turbo' | 'gpt-3.5-turbo';
  maxTokens?: number;
  temperature?: number;
  context?: string;
  patientProfile?: {
    condition?: string;
    genotype?: string;
    mutations?: string[];
  };
}

export interface GPTComparisonResponse {
  content: string;
  model: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  error?: string;
}

/**
 * Query GPT via server-side API route
 */
export async function queryGPTComparison(
  params: GPTComparisonParams
): Promise<GPTComparisonResponse> {
  try {
    const response = await fetch('/api/gpt/compare', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        content: '',
        model: params.model || 'gpt-4',
        error: errorData.error || `HTTP Error: ${response.status}`
      };
    }

    const data = await response.json();
    return {
      content: data.content || '',
      model: data.model || params.model || 'gpt-4',
      usage: data.usage,
    };
  } catch (error) {
    console.error('Error querying GPT comparison:', error);
    return {
      content: '',
      model: params.model || 'gpt-4',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Query GPT for a scenario question
 */
export async function queryGPTForScenario(
  question: string,
  context?: string,
  patientProfile?: {
    condition?: string;
    genotype?: string;
    mutations?: string[];
  }
): Promise<GPTComparisonResponse> {
  return queryGPTComparison({
    prompt: question,
    context,
    patientProfile,
    systemPrompt: "You are a medical AI assistant helping with oncology treatment decisions. Provide clear, evidence-based responses. Be specific and actionable.",
    model: 'gpt-4',
    maxTokens: 500,
    temperature: 0.7,
  });
}




