/**
 * OpenAI API Client for GPT Comparison Benchmarks
 * 
 * Used to fetch real GPT responses for comparison with CrisPRO
 */

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY || 
  process.env.OPENAI_API_KEY || 
  "";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export interface GPTQueryParams {
  prompt: string;
  systemPrompt?: string;
  model?: 'gpt-4' | 'gpt-4-turbo' | 'gpt-3.5-turbo';
  maxTokens?: number;
  temperature?: number;
}

export interface GPTResponse {
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
 * Query OpenAI GPT API
 * 
 * Note: This should be called from a server-side API route in production
 * to keep the API key secure. This client-side version is for development/testing.
 */
export async function queryGPT(params: GPTQueryParams): Promise<GPTResponse> {
  const {
    prompt,
    systemPrompt = "You are a medical AI assistant helping with oncology treatment decisions. Provide clear, evidence-based responses.",
    model = 'gpt-4',
    maxTokens = 500,
    temperature = 0.7
  } = params;

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
          { role: 'user', content: prompt }
        ],
        max_tokens: maxTokens,
        temperature,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        content: '',
        model,
        error: errorData.error?.message || `API Error: ${response.status} ${response.statusText}`
      };
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';

    return {
      content,
      model: data.model || model,
      usage: data.usage,
    };
  } catch (error) {
    console.error('Error querying GPT:', error);
    return {
      content: '',
      model,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Query GPT for a comparison scenario question
 */
export async function queryGPTForComparison(
  question: string,
  context?: string,
  patientProfile?: {
    condition?: string;
    genotype?: string;
    mutations?: string[];
  }
): Promise<GPTResponse> {
  let prompt = question;
  
  if (context) {
    prompt = `${context}\n\n${question}`;
  }
  
  if (patientProfile) {
    const profileText = [
      patientProfile.condition && `Patient condition: ${patientProfile.condition}`,
      patientProfile.genotype && `Genotype: ${patientProfile.genotype}`,
      patientProfile.mutations && patientProfile.mutations.length > 0 && 
        `Mutations: ${patientProfile.mutations.join(', ')}`
    ].filter(Boolean).join('\n');
    
    if (profileText) {
      prompt = `${profileText}\n\n${prompt}`;
    }
  }

  return queryGPT({
    prompt,
    systemPrompt: "You are a medical AI assistant helping with oncology treatment decisions. Provide clear, evidence-based responses. Be specific and actionable.",
    model: 'gpt-4',
    maxTokens: 500,
    temperature: 0.7,
  });
}




