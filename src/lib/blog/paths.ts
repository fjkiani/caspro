/** Blog URLs — canonical definitions live in `@/lib/research/paths`. */

export {
  RESEARCH_HUB,
  RESEARCH_BLOG_INDEX,
  RESEARCH_SECTIONS,
  researchBlogPostPath,
  researchHubPath,
  researchSectionPathFromTab,
} from '@/lib/research/paths';

/** @deprecated Use RESEARCH_SECTIONS.blog */
export const RESEARCH_BLOG_BASE = '/research/blog';

/** @deprecated Use researchBlogPostPath */
export function legacyBlogPostPath(slug: string): string {
  return `/blog/post/${String(slug || '').replace(/^\/+|\/+$/g, '')}/`;
}
