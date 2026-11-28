import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface FaqItem {
  question?: string;
  answer?: string;
}

interface AskBody {
  query?: string;
  context?: string;
  title?: string;
  faq?: FaqItem[];
  conversationHistory?: { role: string; content: string }[];
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Lightweight FAQ match when LLM keys are missing. */
function matchFaq(query: string, faq: FaqItem[] | undefined): string | null {
  if (!faq?.length) return null;
  const q = normalize(query);
  if (!q) return null;

  let best: { score: number; answer: string; question: string } | null = null;
  for (const item of faq) {
    if (!item?.question || !item?.answer) continue;
    const nq = normalize(item.question);
    const tokens = q.split(' ').filter((t) => t.length > 2);
    let score = 0;
    for (const t of tokens) {
      if (nq.includes(t)) score += 1;
    }
    if (nq.includes(q) || q.includes(nq)) score += 3;
    if (!best || score > best.score) {
      best = { score, answer: item.answer, question: item.question };
    }
  }
  if (!best || best.score < 2) return null;
  return `**${best.question}**\n\n${best.answer}`;
}

function buildSystemPrompt(context: string, title?: string): string {
  return `You are a study assistant for a NotebookLM-powered lesson${
    title ? ` titled "${title}"` : ''
  }.

Answer ONLY using the notebook context below. If the answer is not in the context, say you don't see it in this notebook and suggest what part of the pack might help (report, FAQ, metrics, mind map). Keep answers concise (under ~200 words). Prefer concrete facts, definitions, and examples from the context. Do not invent citations.

--- NOTEBOOK CONTEXT ---
${context || '(No context provided)'}
--- END CONTEXT ---`;
}

async function callGemini(
  key: string,
  systemPrompt: string,
  query: string,
): Promise<string> {
  const fullPrompt = `${systemPrompt}\n\nUser question: ${query}`;
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 900,
          topP: 0.7,
          topK: 20,
        },
      }),
    },
  );
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(
      `Gemini error (${response.status}): ${err?.error?.message || response.statusText}`,
    );
  }
  const data = await response.json();
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    'I could not generate a response.'
  );
}

async function callOpenAI(
  key: string,
  systemPrompt: string,
  query: string,
  history: { role: string; content: string }[],
): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...history.filter((m) => m.role === 'user' || m.role === 'assistant'),
        { role: 'user', content: query },
      ],
      temperature: 0.3,
      max_tokens: 900,
    }),
  });
  if (!response.ok) {
    throw new Error(`OpenAI error: ${response.statusText}`);
  }
  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'I could not generate a response.';
}

async function callAnthropic(
  key: string,
  systemPrompt: string,
  query: string,
  history: { role: string; content: string }[],
): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 900,
      temperature: 0.3,
      system: systemPrompt,
      messages: history
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .concat([{ role: 'user', content: query }]),
    }),
  });
  if (!response.ok) {
    throw new Error(`Anthropic error: ${response.statusText}`);
  }
  const data = await response.json();
  return data.content?.[0]?.text || 'I could not generate a response.';
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AskBody;
    const query = (body.query || '').trim();
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const context = typeof body.context === 'string' ? body.context : '';
    const history = Array.isArray(body.conversationHistory)
      ? body.conversationHistory.slice(-8)
      : [];

    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;

    if (!geminiKey && !openaiKey && !anthropicKey) {
      const faqHit = matchFaq(query, body.faq);
      if (faqHit) {
        return NextResponse.json({
          answer: faqHit,
          mode: 'faq',
          note: 'LLM keys not configured — answered from notebook FAQ.',
        });
      }
      return NextResponse.json({
        answer: `LLM is not configured on this preview (set GEMINI_API_KEY, OPENAI_API_KEY, or ANTHROPIC_API_KEY).

You can still browse the FAQ suggestions above, or ask a question that matches a prepared FAQ item.`,
        mode: 'empty',
      });
    }

    const systemPrompt = buildSystemPrompt(context, body.title);
    let answer = '';

    if (geminiKey) {
      try {
        answer = await callGemini(geminiKey, systemPrompt, query);
      } catch (err) {
        console.error('notebook/ask Gemini failed', err);
        if (!openaiKey && !anthropicKey) throw err;
      }
    }
    if (!answer && openaiKey) {
      answer = await callOpenAI(openaiKey, systemPrompt, query, history);
    }
    if (!answer && anthropicKey) {
      answer = await callAnthropic(anthropicKey, systemPrompt, query, history);
    }

    return NextResponse.json({
      answer: answer || 'I could not generate a response.',
      mode: 'llm',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('notebook/ask error', error);
    return NextResponse.json(
      {
        error: 'Failed to generate response',
        message,
        answer: `Ask failed: ${message}`,
        mode: 'error',
      },
      { status: 500 },
    );
  }
}
