import { NextRequest, NextResponse } from 'next/server';
import { 
  buildCrisPROKnowledgeBase, 
  searchCrisPROKnowledgeBase,
  buildContextString 
} from '@/lib/docs/ai/crisproKnowledgeBase';
import { buildSystemPrompt } from '@/lib/docs/ai/crisproSystemPrompt';

export async function POST(request: NextRequest) {
  try {
    const { query, pageContext, conversationHistory = [] } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Search CrisPRO knowledge base for relevant context
    const relevantChunks = await searchCrisPROKnowledgeBase(query, 8); // Get more chunks for better context
    
    // Build context string from relevant chunks
    const contextString = buildContextString(relevantChunks);
    
    // Build strict system prompt with context
    const systemPrompt = buildSystemPrompt(contextString, pageContext);

    // Call LLM API (OpenAI, Anthropic, or Gemini)
    const openaiKey = process.env.OPENAI_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;
    
    if (!openaiKey && !anthropicKey && !geminiKey) {
      // Fallback: Return a helpful response without LLM
      const kb = await buildCrisPROKnowledgeBase();
      const endpoints = kb.filter(c => c.type === 'endpoint');
      const useCases = kb.filter(c => c.type === 'use-case');
      const moats = kb.filter(c => c.type === 'moat');
      
      return NextResponse.json({
        answer: `I'd be happy to help! However, the LLM API key is not configured. 

Based on our CrisPRO documentation, here are some helpful resources:
- **API Endpoints**: ${endpoints.length} endpoints available
- **Use Cases**: ${useCases.length} use case${useCases.length !== 1 ? 's' : ''} available
- **MOAT Capabilities**: ${moats.length} competitive advantage${moats.length !== 1 ? 's' : ''} documented
- **Documentation**: Visit /docs/api/[endpoint] for detailed API documentation

To enable full AI assistance, please configure GEMINI_API_KEY, OPENAI_API_KEY, or ANTHROPIC_API_KEY in your environment variables.`,
        sources: relevantChunks.slice(0, 3).map(chunk => ({
          title: chunk.title,
          url: chunk.url || `#${chunk.id}`,
          excerpt: chunk.content.slice(0, 200),
        })),
        confidence: 0.8,
      });
    }

    // Use Gemini (Google) - Priority 1
    if (geminiKey) {
      try {
        // Build the full prompt with strict system context
        const fullPrompt = `${systemPrompt}\n\nUser question: ${query}`;
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: fullPrompt
              }]
            }],
            generationConfig: {
              temperature: 0.3, // Lower temperature for more focused, less creative responses
              maxOutputTokens: 1200,
              topP: 0.7,
              topK: 20,
            },
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: { message: response.statusText } }));
          console.error('Gemini API error:', response.status, JSON.stringify(errorData));
          
          // Provide user-friendly error messages
          if (response.status === 403) {
            throw new Error('API key is invalid or has been revoked. Please check your GEMINI_API_KEY in .env.local');
          } else if (response.status === 404) {
            throw new Error('Gemini model not found. Please check the model name.');
          } else if (response.status === 429) {
            throw new Error('Rate limit exceeded. Please try again later.');
          } else {
            throw new Error(`Gemini API error (${response.status}): ${errorData.error?.message || response.statusText}`);
          }
        }

        const data = await response.json();
        
        // Handle Gemini response format
        const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                      'I apologize, but I could not generate a response.';

        return NextResponse.json({
          answer,
          sources: relevantChunks.map(chunk => ({
            title: chunk.title,
            url: chunk.url,
            excerpt: chunk.content.slice(0, 200),
            relevance: 0.9,
          })),
          confidence: 0.85,
        });
      } catch (error: any) {
        console.error('Gemini API error:', error);
        // Fall through to try OpenAI or Anthropic if Gemini fails
        if (!openaiKey && !anthropicKey) {
          // Return a helpful error message instead of throwing
          return NextResponse.json({
            answer: `I encountered an error connecting to the AI service: ${error.message || 'Unknown error'}

Please check:
1. Your GEMINI_API_KEY is valid and not expired
2. The API key has proper permissions
3. Your network connection is working

You can also configure OPENAI_API_KEY or ANTHROPIC_API_KEY as alternatives.`,
            sources: [],
            confidence: 0,
            error: error.message,
          }, { status: 500 });
        }
      }
    }

    // Use OpenAI
    if (openaiKey) {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini', // Using mini for cost efficiency
          messages: [
            {
              role: 'system',
              content: systemPrompt,
            },
            ...conversationHistory,
            {
              role: 'user',
              content: query,
            },
          ],
          temperature: 0.3, // Lower temperature for more accurate, context-bound responses
          max_tokens: 1200,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      const answer = data.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';

      return NextResponse.json({
        answer,
        sources: relevantChunks.map(chunk => ({
          title: chunk.title,
          url: chunk.url || `#${chunk.id}`,
          excerpt: chunk.content.slice(0, 200),
          relevance: 0.9,
        })),
        confidence: 0.85,
      });
    }

    // Use Anthropic (if OpenAI/Gemini not available)
    if (anthropicKey) {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 1200,
          messages: conversationHistory.concat([{ role: 'user', content: query }]),
          system: systemPrompt,
          temperature: 0.3, // Lower temperature for more accurate responses
        }),
      });

      if (!response.ok) {
        throw new Error(`Anthropic API error: ${response.statusText}`);
      }

      const data = await response.json();
      const answer = data.content[0]?.text || 'I apologize, but I could not generate a response.';

      return NextResponse.json({
        answer,
        sources: relevantChunks.map(chunk => ({
          title: chunk.title,
          url: chunk.url || `#${chunk.id}`,
          excerpt: chunk.content.slice(0, 200),
          relevance: 0.9,
        })),
        confidence: 0.85,
      });
    }

    throw new Error('No LLM API key configured');
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate response',
        message: error.message,
        answer: 'I apologize, but I encountered an error. Please try again or contact support.',
      },
      { status: 500 }
    );
  }
}

