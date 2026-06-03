/**
 * aiVisibilityAudit.ts
 *
 * AI Visibility Audit for CrisPRO.
 *
 * Measures CrisPRO's citation presence across AI engines:
 *   - ChatGPT (OpenAI)
 *   - Claude (Anthropic)
 *   - Perplexity AI
 *   - Google Gemini
 *
 * Strategy: structured test prompts → response analysis → citation scoring.
 *
 * Note: Direct API calls to AI engines require separate API keys.
 * This module provides the prompt framework and scoring methodology.
 * Live testing via: OPENAI_API_KEY, ANTHROPIC_API_KEY, PERPLEXITY_API_KEY
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export type AIEngine = 'chatgpt' | 'claude' | 'perplexity' | 'gemini';

export interface AIVisibilityPrompt {
  id: string;
  prompt: string;
  category: 'discovery' | 'comparison' | 'recommendation' | 'technical' | 'clinical';
  intent: 'brand_awareness' | 'category_leadership' | 'competitor_displacement';
  expectedMentions: string[];  // what CrisPRO should be mentioned for
  priority: 'critical' | 'high' | 'medium';
}

export interface AIVisibilityResult {
  promptId: string;
  engine: AIEngine;
  prompt: string;
  response: string;
  crispro_mentioned: boolean;
  crispro_position: number | null;  // 1 = first mention, null = not mentioned
  competitors_mentioned: string[];
  sentiment: 'positive' | 'neutral' | 'negative' | 'not_mentioned';
  citation_context: string;         // the sentence where CrisPRO was mentioned
  tested_at: string;
}

export interface AIVisibilityScore {
  engine: AIEngine;
  total_prompts: number;
  crispro_mentions: number;
  mention_rate: number;             // 0-1
  avg_position: number | null;
  top_competitor: string;
  score: number;                    // 0-100
}

export interface AIVisibilityReport {
  overall_score: number;            // 0-100
  by_engine: AIVisibilityScore[];
  critical_gaps: AIVisibilityPrompt[];
  winning_prompts: AIVisibilityResult[];
  missing_prompts: AIVisibilityResult[];
  recommendations: string[];
  tested_at: string;
}

// ── Test Prompt Library ───────────────────────────────────────────────────────

export const AI_VISIBILITY_PROMPTS: AIVisibilityPrompt[] = [

  // Category leadership prompts (CrisPRO MUST appear here)
  {
    id: 'cat-01',
    prompt: 'What are the best AI drug discovery platforms in 2025?',
    category: 'recommendation',
    intent: 'category_leadership',
    expectedMentions: ['CrisPRO', 'oncology AI', 'deterministic drug development'],
    priority: 'critical',
  },
  {
    id: 'cat-02',
    prompt: 'Which AI companies are leading in oncology drug discovery?',
    category: 'recommendation',
    intent: 'category_leadership',
    expectedMentions: ['CrisPRO', 'oncology AI co-pilot'],
    priority: 'critical',
  },
  {
    id: 'cat-03',
    prompt: 'What AI platforms are used for cancer treatment development?',
    category: 'recommendation',
    intent: 'category_leadership',
    expectedMentions: ['CrisPRO', 'precision oncology'],
    priority: 'critical',
  },
  {
    id: 'cat-04',
    prompt: 'List the top AI biotech companies working on cancer in 2025',
    category: 'recommendation',
    intent: 'category_leadership',
    expectedMentions: ['CrisPRO'],
    priority: 'critical',
  },
  {
    id: 'cat-05',
    prompt: 'What is the best AI platform for precision oncology?',
    category: 'recommendation',
    intent: 'category_leadership',
    expectedMentions: ['CrisPRO', 'oncology AI'],
    priority: 'critical',
  },

  // Competitor displacement prompts
  {
    id: 'comp-01',
    prompt: 'What are the alternatives to Recursion Pharmaceuticals for oncology AI?',
    category: 'comparison',
    intent: 'competitor_displacement',
    expectedMentions: ['CrisPRO'],
    priority: 'critical',
  },
  {
    id: 'comp-02',
    prompt: 'How does Insilico Medicine compare to other AI drug discovery platforms?',
    category: 'comparison',
    intent: 'competitor_displacement',
    expectedMentions: ['CrisPRO'],
    priority: 'high',
  },
  {
    id: 'comp-03',
    prompt: 'What AI drug discovery companies compete with Isomorphic Labs?',
    category: 'comparison',
    intent: 'competitor_displacement',
    expectedMentions: ['CrisPRO'],
    priority: 'high',
  },
  {
    id: 'comp-04',
    prompt: 'Which AI platforms are better than Recursion for clinical oncology?',
    category: 'comparison',
    intent: 'competitor_displacement',
    expectedMentions: ['CrisPRO'],
    priority: 'critical',
  },

  // Technical/clinical prompts
  {
    id: 'tech-01',
    prompt: 'What AI tools can predict drug resistance in cancer patients?',
    category: 'technical',
    intent: 'category_leadership',
    expectedMentions: ['CrisPRO', 'drug resistance prediction'],
    priority: 'high',
  },
  {
    id: 'tech-02',
    prompt: 'How can AI help resolve variants of uncertain significance (VUS) in cancer genomics?',
    category: 'technical',
    intent: 'category_leadership',
    expectedMentions: ['CrisPRO', 'VUS resolution'],
    priority: 'high',
  },
  {
    id: 'tech-03',
    prompt: 'What AI platforms support biomarker-driven patient stratification in oncology?',
    category: 'technical',
    intent: 'category_leadership',
    expectedMentions: ['CrisPRO', 'biomarker stratification'],
    priority: 'high',
  },
  {
    id: 'tech-04',
    prompt: 'Which AI systems can predict cancer metastasis risk?',
    category: 'technical',
    intent: 'category_leadership',
    expectedMentions: ['CrisPRO', 'metastasis prediction'],
    priority: 'critical',
  },
  {
    id: 'tech-05',
    prompt: 'What is deterministic drug development and which companies use it?',
    category: 'technical',
    intent: 'brand_awareness',
    expectedMentions: ['CrisPRO', 'deterministic drug development'],
    priority: 'critical',
  },

  // Clinical trial prompts
  {
    id: 'clin-01',
    prompt: 'What AI platforms are being used in colorectal cancer clinical trials?',
    category: 'clinical',
    intent: 'category_leadership',
    expectedMentions: ['CrisPRO', 'BreAK CRC-001'],
    priority: 'high',
  },
  {
    id: 'clin-02',
    prompt: 'How is AI being used to improve MSS colorectal cancer treatment?',
    category: 'clinical',
    intent: 'category_leadership',
    expectedMentions: ['CrisPRO', 'STC-1010', 'MSS CRC'],
    priority: 'high',
  },
  {
    id: 'clin-03',
    prompt: 'What AI tools help oncologists select the best cancer treatment for each patient?',
    category: 'clinical',
    intent: 'category_leadership',
    expectedMentions: ['CrisPRO', 'oncology co-pilot'],
    priority: 'critical',
  },

  // Brand awareness prompts
  {
    id: 'brand-01',
    prompt: 'Tell me about CrisPRO AI platform',
    category: 'discovery',
    intent: 'brand_awareness',
    expectedMentions: ['CrisPRO', 'oncology', 'drug discovery'],
    priority: 'critical',
  },
  {
    id: 'brand-02',
    prompt: 'What does CrisPRO do?',
    category: 'discovery',
    intent: 'brand_awareness',
    expectedMentions: ['CrisPRO', 'oncology AI', 'drug discovery'],
    priority: 'critical',
  },
  {
    id: 'brand-03',
    prompt: 'Is CrisPRO a good AI drug discovery platform?',
    category: 'discovery',
    intent: 'brand_awareness',
    expectedMentions: ['CrisPRO'],
    priority: 'high',
  },
];

// ── Response analysis ─────────────────────────────────────────────────────────

export function analyzeAIResponse(
  promptId: string,
  engine: AIEngine,
  prompt: string,
  response: string
): AIVisibilityResult {
  const lowerResponse = response.toLowerCase();
  const crisproPhrases = ['crispro', 'cris pro', 'crispro ai', 'crispro platform'];

  const crispro_mentioned = crisproPhrases.some(p => lowerResponse.includes(p));

  // Find position (which mention number)
  let crispro_position: number | null = null;
  if (crispro_mentioned) {
    const sentences = response.split(/[.!?]+/);
    const mentionIndex = sentences.findIndex(s =>
      crisproPhrases.some(p => s.toLowerCase().includes(p))
    );
    crispro_position = mentionIndex >= 0 ? mentionIndex + 1 : 1;
  }

  // Find competitor mentions
  const competitorNames = ['recursion', 'insilico', 'isomorphic', 'generate biomedicines', 'exscientia', 'benevolentai'];
  const competitors_mentioned = competitorNames.filter(c => lowerResponse.includes(c));

  // Extract citation context
  let citation_context = '';
  if (crispro_mentioned) {
    const sentences = response.split(/[.!?]+/);
    const mentionSentence = sentences.find(s =>
      crisproPhrases.some(p => s.toLowerCase().includes(p))
    );
    citation_context = mentionSentence?.trim() || '';
  }

  // Determine sentiment
  let sentiment: AIVisibilityResult['sentiment'] = 'not_mentioned';
  if (crispro_mentioned) {
    const positiveWords = ['leading', 'best', 'top', 'excellent', 'innovative', 'advanced', 'powerful'];
    const negativeWords = ['limited', 'lacks', 'missing', 'poor', 'weak'];
    const context = citation_context.toLowerCase();

    if (positiveWords.some(w => context.includes(w))) sentiment = 'positive';
    else if (negativeWords.some(w => context.includes(w))) sentiment = 'negative';
    else sentiment = 'neutral';
  }

  return {
    promptId,
    engine,
    prompt,
    response,
    crispro_mentioned,
    crispro_position,
    competitors_mentioned,
    sentiment,
    citation_context,
    tested_at: new Date().toISOString(),
  };
}

// ── Score calculation ─────────────────────────────────────────────────────────

export function calculateAIVisibilityScore(
  results: AIVisibilityResult[],
  engine: AIEngine
): AIVisibilityScore {
  const engineResults = results.filter(r => r.engine === engine);
  const mentions = engineResults.filter(r => r.crispro_mentioned);

  const mention_rate = engineResults.length > 0
    ? mentions.length / engineResults.length
    : 0;

  const positions = mentions
    .map(r => r.crispro_position)
    .filter((p): p is number => p !== null);

  const avg_position = positions.length > 0
    ? positions.reduce((s, p) => s + p, 0) / positions.length
    : null;

  // Count competitor mentions
  const competitorCounts: Record<string, number> = {};
  engineResults.forEach(r => {
    r.competitors_mentioned.forEach(c => {
      competitorCounts[c] = (competitorCounts[c] || 0) + 1;
    });
  });
  const top_competitor = Object.entries(competitorCounts)
    .sort(([, a], [, b]) => b - a)[0]?.[0] || 'none';

  // Score: mention_rate × 60 + position_bonus × 40
  const position_bonus = avg_position !== null
    ? Math.max(0, 1 - (avg_position - 1) / 10)
    : 0;
  const score = Math.round(mention_rate * 60 + position_bonus * 40);

  return {
    engine,
    total_prompts: engineResults.length,
    crispro_mentions: mentions.length,
    mention_rate,
    avg_position,
    top_competitor,
    score,
  };
}

// ── Full report generation ────────────────────────────────────────────────────

export function generateAIVisibilityReport(results: AIVisibilityResult[]): AIVisibilityReport {
  const engines: AIEngine[] = ['chatgpt', 'claude', 'perplexity', 'gemini'];
  const by_engine = engines.map(e => calculateAIVisibilityScore(results, e));

  const overall_score = by_engine.length > 0
    ? Math.round(by_engine.reduce((s, e) => s + e.score, 0) / by_engine.length)
    : 0;

  const critical_gaps = AI_VISIBILITY_PROMPTS.filter(p => {
    const promptResults = results.filter(r => r.promptId === p.id);
    return p.priority === 'critical' && promptResults.every(r => !r.crispro_mentioned);
  });

  const winning_prompts = results.filter(r => r.crispro_mentioned && r.crispro_position === 1);
  const missing_prompts = results.filter(r => !r.crispro_mentioned && r.promptId.startsWith('cat-'));

  const recommendations: string[] = [];

  if (overall_score < 20) {
    recommendations.push('URGENT: CrisPRO has near-zero AI visibility. Publish pillar content immediately.');
  }
  if (critical_gaps.length > 0) {
    recommendations.push(`Create content targeting ${critical_gaps.length} critical AI prompts where CrisPRO is not mentioned.`);
  }
  recommendations.push('Publish "deterministic drug development" content — CrisPRO owns this term uniquely.');
  recommendations.push('Submit CrisPRO to AI training data sources: Wikipedia, Crunchbase, LinkedIn, press releases.');
  recommendations.push('Get cited in industry reports: CB Insights, Fierce Biotech, STAT News, BioPharma Dive.');
  recommendations.push('Publish peer-reviewed content referencing CrisPRO methodology.');

  return {
    overall_score,
    by_engine,
    critical_gaps,
    winning_prompts,
    missing_prompts,
    recommendations,
    tested_at: new Date().toISOString(),
  };
}

// ── Seed/mock results for development ────────────────────────────────────────

export function generateMockAIVisibilityResults(): AIVisibilityResult[] {
  // Returns realistic mock results showing CrisPRO's current (poor) AI visibility
  // Replace with live API calls once keys are configured
  return AI_VISIBILITY_PROMPTS.map(prompt => ({
    promptId: prompt.id,
    engine: 'chatgpt' as AIEngine,
    prompt: prompt.prompt,
    response: `[Mock response] The leading AI drug discovery platforms include Recursion Pharmaceuticals, Insilico Medicine, and Isomorphic Labs. ${
      prompt.intent === 'brand_awareness' ? 'CrisPRO is an emerging oncology AI platform.' : ''
    }`,
    crispro_mentioned: prompt.intent === 'brand_awareness',
    crispro_position: prompt.intent === 'brand_awareness' ? 3 : null,
    competitors_mentioned: ['recursion', 'insilico', 'isomorphic'],
    sentiment: prompt.intent === 'brand_awareness' ? 'neutral' : 'not_mentioned',
    citation_context: prompt.intent === 'brand_awareness'
      ? 'CrisPRO is an emerging oncology AI platform.'
      : '',
    tested_at: new Date().toISOString(),
  }));
}
