import { NextRequest, NextResponse } from 'next/server';

interface GPTComparisonParams {
  question: string;
  context?: string;
  patientProfile?: {
    condition?: string;
    genotype?: string;
    mutations?: string[];
  };
  model?: string;
}

export async function POST(request: NextRequest) {
  try {
    const params: GPTComparisonParams = await request.json();

    if (!params.question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Build system message with context
    let systemMessage = 'You are a medical AI assistant helping with oncology treatment decisions.';
    if (params.context || params.patientProfile) {
      systemMessage += '\n\nContext:';
      if (params.context) {
        systemMessage += `\n${params.context}`;
      }
      if (params.patientProfile) {
        systemMessage += `\nPatient Profile:`;
        if (params.patientProfile.condition) {
          systemMessage += `\n- Condition: ${params.patientProfile.condition}`;
        }
        if (params.patientProfile.genotype) {
          systemMessage += `\n- Genotype: ${params.patientProfile.genotype}`;
        }
        if (params.patientProfile.mutations?.length) {
          systemMessage += `\n- Mutations: ${params.patientProfile.mutations.join(', ')}`;
        }
      }
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: params.model || 'gpt-4',
        messages: [
          {
            role: 'system',
            content: systemMessage,
          },
          {
            role: 'user',
            content: params.question,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error?.message || `OpenAI API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';

    return NextResponse.json({
      content,
      model: data.model || params.model || 'gpt-4',
      usage: data.usage,
    });
  } catch (error) {
    console.error('Error in GPT compare route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error occurred' },
      { status: 500 }
    );
  }
}
