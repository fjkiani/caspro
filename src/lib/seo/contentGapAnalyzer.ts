/**
 * contentGapAnalyzer.ts
 *
 * Content gap analysis engine for CrisPRO SEO platform.
 * Prioritizes content creation by: traffic opportunity × AI visibility impact × difficulty.
 *
 * Integrates with:
 *   - content-gaps.ts (seed data)
 *   - keywordEngine.ts (live keyword data)
 *   - aiVisibilityAudit.ts (AI prompt coverage)
 */

import { CONTENT_GAPS, ContentGap, CONTENT_GAP_STATS, getHighAIImpactGaps, getQuickWinGaps } from '@/data/seo/content-gaps';
import { CRISPRO_KEYWORDS, getQuickWins } from '@/data/seo/crispro-keywords';
import { AI_VISIBILITY_PROMPTS } from '@/lib/seo/aiVisibilityAudit';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ContentPriorityScore {
  gap: ContentGap;
  score: number;                    // 0-100 composite priority score
  breakdown: {
    traffic_score: number;          // 0-40
    ai_visibility_score: number;    // 0-30
    difficulty_score: number;       // 0-20 (inverted — lower difficulty = higher score)
    intent_score: number;           // 0-10
  };
  rationale: string;
  estimated_roi: string;
  time_to_publish: string;
}

export interface ContentCalendar {
  week: number;
  items: ContentCalendarItem[];
}

export interface ContentCalendarItem {
  gap: ContentGap;
  score: number;
  assignee: string;
  deadline: string;
  status: 'planned' | 'in-progress' | 'review' | 'published';
}

export interface ContentBriefExpanded {
  gap: ContentGap;
  targetKeywords: string[];
  competitorUrls: string[];
  outline: string[];
  mustInclude: string[];
  internalLinks: string[];
  externalLinks: string[];
  schemaMarkup: string[];
  wordCount: number;
  estimatedReadTime: string;
  cta: string;
  seoTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
}

// ── Priority scoring ──────────────────────────────────────────────────────────

export function scoreContentGap(gap: ContentGap): ContentPriorityScore {
  // Traffic score (0-40): based on monthly traffic opportunity
  const maxTraffic = 5000;
  const traffic_score = Math.min(40, Math.round((gap.monthlyTrafficOpportunity / maxTraffic) * 40));

  // AI visibility score (0-30): high impact = 30, medium = 15, low = 5
  const ai_visibility_score = {
    high: 30,
    medium: 15,
    low: 5,
  }[gap.aiVisibilityImpact];

  // Difficulty score (0-20): inverted — lower difficulty = higher score
  const difficulty_score = Math.round((1 - gap.difficulty / 100) * 20);

  // Intent score (0-10): based on content type
  const intent_score = {
    'landing-page': 10,
    'comparison-page': 9,
    'pillar-page': 8,
    'case-study': 7,
    'whitepaper': 6,
    'blog-post': 5,
    'faq-page': 4,
    'tool-page': 3,
  }[gap.contentType];

  const score = traffic_score + ai_visibility_score + difficulty_score + intent_score;

  // Priority multiplier
  const priorityMultiplier = {
    critical: 1.0,
    high: 0.85,
    medium: 0.70,
    low: 0.55,
  }[gap.priority];

  const finalScore = Math.min(100, Math.round(score * priorityMultiplier));

  const rationale = buildRationale(gap, traffic_score, ai_visibility_score, difficulty_score);
  const estimated_roi = estimateROI(gap);
  const time_to_publish = estimatePublishTime(gap);

  return {
    gap,
    score: finalScore,
    breakdown: { traffic_score, ai_visibility_score, difficulty_score, intent_score },
    rationale,
    estimated_roi,
    time_to_publish,
  };
}

function buildRationale(
  gap: ContentGap,
  traffic: number,
  aiVis: number,
  difficulty: number
): string {
  const parts: string[] = [];

  if (traffic >= 30) parts.push(`High traffic opportunity (${gap.monthlyTrafficOpportunity.toLocaleString()} visits/mo)`);
  if (aiVis >= 25) parts.push('Critical for AI engine citation');
  if (difficulty >= 15) parts.push(`Low competition (difficulty: ${gap.difficulty})`);
  if (gap.competitorPages.length === 0) parts.push('No competitor pages — easy #1 ranking');
  if (gap.priority === 'critical') parts.push('Critical priority gap');

  return parts.join('. ') + '.';
}

function estimateROI(gap: ContentGap): string {
  const monthlyVisits = gap.monthlyTrafficOpportunity;
  const conversionRate = 0.02; // 2% for commercial intent, 0.5% for informational
  const adjustedRate = gap.contentType === 'landing-page' || gap.contentType === 'comparison-page'
    ? 0.03 : 0.008;
  const leads = Math.round(monthlyVisits * adjustedRate);
  return `~${leads} leads/month at ${(adjustedRate * 100).toFixed(1)}% conversion`;
}

function estimatePublishTime(gap: ContentGap): string {
  const wordCount = gap.contentBrief.wordCount;
  if (wordCount <= 1500) return '1-2 days';
  if (wordCount <= 2500) return '2-3 days';
  if (wordCount <= 3500) return '3-5 days';
  return '5-7 days';
}

// ── Ranked content plan ───────────────────────────────────────────────────────

export function generateRankedContentPlan(): ContentPriorityScore[] {
  return CONTENT_GAPS
    .filter(g => g.status === 'not-started')
    .map(scoreContentGap)
    .sort((a, b) => b.score - a.score);
}

// ── 90-day content calendar ───────────────────────────────────────────────────

export function generate90DayCalendar(): ContentCalendar[] {
  const ranked = generateRankedContentPlan();
  const calendar: ContentCalendar[] = [];

  // Distribute content across 13 weeks (90 days)
  // Week 1-4: Critical priority (1 piece/week)
  // Week 5-8: High priority (1 piece/week)
  // Week 9-13: Medium priority (1 piece/week)

  const critical = ranked.filter(r => r.gap.priority === 'critical').slice(0, 4);
  const high = ranked.filter(r => r.gap.priority === 'high').slice(0, 4);
  const medium = ranked.filter(r => r.gap.priority === 'medium').slice(0, 5);

  const allItems = [...critical, ...high, ...medium];

  allItems.forEach((item, index) => {
    const week = index + 1;
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + week * 7);

    if (!calendar[index]) {
      calendar.push({
        week,
        items: [],
      });
    }

    calendar[index].items.push({
      gap: item.gap,
      score: item.score,
      assignee: 'Content Team',
      deadline: deadline.toISOString().split('T')[0],
      status: 'planned',
    });
  });

  return calendar;
}

// ── Expanded content brief ────────────────────────────────────────────────────

export function expandContentBrief(gapId: string): ContentBriefExpanded | null {
  const gap = CONTENT_GAPS.find(g => g.id === gapId);
  if (!gap) return null;

  // Find related keywords from seed data
  const relatedKeywords = CRISPRO_KEYWORDS
    .filter(k => k.category === gap.contentBrief.sections[0] || gap.secondaryKeywords.includes(k.keyword))
    .map(k => k.keyword)
    .slice(0, 10);

  const targetKeywords = [gap.primaryKeyword, ...gap.secondaryKeywords, ...relatedKeywords];

  // Build SEO meta
  const seoTitle = buildSEOTitle(gap);
  const metaDescription = buildMetaDescription(gap);

  // External link suggestions
  const externalLinks = buildExternalLinks(gap);

  return {
    gap,
    targetKeywords: [...new Set(targetKeywords)],
    competitorUrls: gap.competitorPages,
    outline: gap.contentBrief.sections,
    mustInclude: gap.contentBrief.mustInclude,
    internalLinks: gap.contentBrief.internalLinks,
    externalLinks,
    schemaMarkup: gap.contentBrief.schemaMarkup,
    wordCount: gap.contentBrief.wordCount,
    estimatedReadTime: `${Math.ceil(gap.contentBrief.wordCount / 250)} min read`,
    cta: gap.contentBrief.cta,
    seoTitle,
    metaDescription,
    ogTitle: seoTitle,
    ogDescription: metaDescription,
  };
}

function buildSEOTitle(gap: ContentGap): string {
  const year = new Date().getFullYear();
  const titles: Record<string, string> = {
    'pillar-page': `${gap.title} | CrisPRO`,
    'comparison-page': `${gap.title} | CrisPRO`,
    'landing-page': `${gap.title} | CrisPRO Platform`,
    'blog-post': `${gap.title} | CrisPRO Blog`,
    'case-study': `${gap.title} | CrisPRO Case Study`,
    'whitepaper': `${gap.title} | CrisPRO Research`,
    'faq-page': `${gap.title} | CrisPRO FAQ`,
    'tool-page': `${gap.title} | CrisPRO Tools`,
  };
  return (titles[gap.contentType] || gap.title).replace('2025', String(year));
}

function buildMetaDescription(gap: ContentGap): string {
  const descriptions: Record<string, string> = {
    'pillar-page': `Comprehensive guide to ${gap.primaryKeyword}. Learn how CrisPRO's AI platform is transforming oncology drug discovery. ${gap.contentBrief.cta}.`,
    'comparison-page': `Compare ${gap.primaryKeyword} side-by-side. See why oncology teams choose CrisPRO for AI-powered drug discovery and clinical decision support.`,
    'landing-page': `CrisPRO's ${gap.primaryKeyword} platform. ${gap.contentBrief.mustInclude[0]}. ${gap.contentBrief.cta}.`,
    'blog-post': `${gap.title}. Expert analysis from CrisPRO's oncology AI team. Read the full guide.`,
    'case-study': `How CrisPRO solved ${gap.primaryKeyword}. Real results from our oncology AI platform.`,
  };
  const desc = descriptions[gap.contentType] || `${gap.title}. Learn more about CrisPRO's approach to ${gap.primaryKeyword}.`;
  return desc.slice(0, 160);
}

function buildExternalLinks(gap: ContentGap): string[] {
  const links: string[] = [];

  // Always link to key scientific references
  if (gap.contentBrief.mustInclude.some(m => m.includes('Alzeeb'))) {
    links.push('https://doi.org/10.3389/fonc.2024.1427428');
  }
  if (gap.primaryKeyword.includes('VUS') || gap.primaryKeyword.includes('variant')) {
    links.push('https://www.ncbi.nlm.nih.gov/clinvar/');
  }
  if (gap.primaryKeyword.includes('colorectal') || gap.primaryKeyword.includes('CRC')) {
    links.push('https://clinicaltrials.gov');
    links.push('https://www.cancer.org/cancer/types/colon-rectal-cancer.html');
  }
  if (gap.primaryKeyword.includes('CRISPR')) {
    links.push('https://www.broadinstitute.org/what-broad/areas-focus/project-spotlight/questions-and-answers-about-crispr');
  }

  return links;
}

// ── AI prompt coverage analysis ───────────────────────────────────────────────

export function analyzeAIPromptCoverage(): {
  covered: string[];
  uncovered: string[];
  coverage_rate: number;
  recommended_content: ContentGap[];
} {
  const coveredPromptIds: string[] = [];
  const uncoveredPromptIds: string[] = [];

  AI_VISIBILITY_PROMPTS.forEach(prompt => {
    // Check if any content gap addresses this prompt's keywords
    const covered = CONTENT_GAPS.some(gap =>
      gap.primaryKeyword.toLowerCase().includes(prompt.prompt.toLowerCase().split(' ').slice(0, 3).join(' ')) ||
      gap.secondaryKeywords.some(sk => prompt.prompt.toLowerCase().includes(sk.toLowerCase()))
    );

    if (covered) coveredPromptIds.push(prompt.id);
    else uncoveredPromptIds.push(prompt.id);
  });

  const coverage_rate = coveredPromptIds.length / AI_VISIBILITY_PROMPTS.length;

  // Find content gaps that would cover uncovered prompts
  const recommended_content = CONTENT_GAPS
    .filter(g => g.aiVisibilityImpact === 'high' && g.status === 'not-started')
    .slice(0, 5);

  return {
    covered: coveredPromptIds,
    uncovered: uncoveredPromptIds,
    coverage_rate,
    recommended_content,
  };
}

// ── Summary stats ─────────────────────────────────────────────────────────────

export function getContentGapSummary() {
  const ranked = generateRankedContentPlan();
  const calendar = generate90DayCalendar();
  const aiCoverage = analyzeAIPromptCoverage();

  return {
    ...CONTENT_GAP_STATS,
    ranked_plan: ranked.slice(0, 5),
    calendar_weeks: calendar.length,
    ai_prompt_coverage: aiCoverage.coverage_rate,
    quick_wins: getQuickWinGaps().slice(0, 3),
    high_ai_impact: getHighAIImpactGaps().slice(0, 3),
    keyword_quick_wins: getQuickWins().slice(0, 5),
  };
}
