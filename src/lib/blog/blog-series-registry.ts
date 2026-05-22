import type { PostNode } from '@/types/blog';

/** Explicit blog series — avoids Hygraph sponsor/category tags breaking Part rails. */
export type BlogSeriesRule = {
  id: string;
  displayName: string;
  matchPost: (post: PostNode) => boolean;
};

export const BLOG_SERIES_RULES: BlogSeriesRule[] = [
  {
    id: 'platinum-window-hypothesis',
    displayName: 'Platinum Window Hypothesis',
    matchPost: (post) => /^platinum-window-hypothesis-part-\d+$/i.test(post.slug.trim()),
  },
  {
    id: 'trial-validation',
    displayName: 'Trial Validation',
    matchPost: (post) =>
      post.slug === 'adavosertib' ||
      post.slug === 'capri-ceralasertib-olaparib' ||
      /^part\s+[12]\s*[—:\-–]/i.test(post.title.trim()),
  },
];

/** Friendlier category chip labels on the blog index. */
export const BLOG_CATEGORY_LABELS: Record<string, string> = {
  'debunking-ivermectin': 'Platinum Window',
  'astrazeneca-adavosertib': 'Trial Validation',
  escapemap: 'Escape Map',
  'platinum-window': 'Platinum Window',
  roche: 'Roche Group',
  astrazeneca: 'AstraZeneca',
};

export function blogCategoryLabel(slug: string, fallbackName?: string): string {
  return BLOG_CATEGORY_LABELS[slug] ?? fallbackName ?? slug;
}
