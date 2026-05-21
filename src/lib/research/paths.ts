/** Research knowledge-base routes (hub → section → item). */

export const RESEARCH_HUB = '/research';

export const RESEARCH_SECTIONS = {
  blog: `${RESEARCH_HUB}/blog`,
  manuscripts: `${RESEARCH_HUB}/manuscripts`,
  decks: `${RESEARCH_HUB}/decks`,
  abstracts: `${RESEARCH_HUB}/abstracts`,
} as const;

export type ResearchSectionId = keyof typeof RESEARCH_SECTIONS;

/** Hub tabs: overview shows all sections; others show one collection. */
export type ResearchHubTab = 'overview' | ResearchSectionId;

export const RESEARCH_SECTION_LABELS: Record<ResearchSectionId, string> = {
  blog: 'Blog',
  manuscripts: 'Manuscripts',
  decks: 'Decks',
  abstracts: 'Abstracts',
};

/** @deprecated Prefer RESEARCH_SECTIONS.blog */
export const RESEARCH_BLOG_INDEX = RESEARCH_SECTIONS.blog;

export function researchBlogPostPath(slug: string): string {
  const s = String(slug || '').replace(/^\/+|\/+$/g, '');
  return `${RESEARCH_SECTIONS.blog}/${s}/`;
}

export function researchManuscriptPath(slug: string): string {
  const s = String(slug || '').replace(/^\/+|\/+$/g, '');
  return `/manuscripts/${encodeURIComponent(s)}/`;
}

/** Active tab on `/research` hub (`?tab=`). Default: overview (all sections). */
export function researchHubTabFromQuery(tab: string | null | undefined): ResearchHubTab {
  switch (tab) {
    case 'articles':
    case 'blog':
      return 'blog';
    case 'manuscripts':
      return 'manuscripts';
    case 'decks':
      return 'decks';
    case 'abstracts':
      return 'abstracts';
    case 'overview':
      return 'overview';
    default:
      return 'overview';
  }
}

export function researchHubUrl(tab: ResearchHubTab = 'overview'): string {
  const base = `${RESEARCH_HUB}/`;
  if (tab === 'overview') return base;
  return `${base}?tab=${tab}`;
}

export const RESEARCH_HUB_TAB_LABELS: Record<ResearchHubTab, string> = {
  overview: 'Overview',
  ...RESEARCH_SECTION_LABELS,
};

/** Legacy: full section routes (e.g. old bookmarks). */
export function researchSectionPathFromTab(tab: string | null | undefined): string | null {
  switch (tab) {
    case 'articles':
    case 'blog':
      return RESEARCH_SECTIONS.blog;
    case 'manuscripts':
      return RESEARCH_SECTIONS.manuscripts;
    case 'decks':
      return RESEARCH_SECTIONS.decks;
    case 'abstracts':
      return RESEARCH_SECTIONS.abstracts;
    default:
      return null;
  }
}

export function researchHubPath(opts?: { category?: string }): string {
  if (opts?.category?.trim()) {
    return `${RESEARCH_SECTIONS.blog}?category=${encodeURIComponent(opts.category.trim())}`;
  }
  return RESEARCH_HUB;
}
