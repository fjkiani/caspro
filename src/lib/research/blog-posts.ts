import type { PostNode } from '@/types/blog';
import { ABSTRACT_CATEGORY_SLUG } from '@/lib/docs/hygraph/research-abstract-queries';

/** Blog listing posts — excludes conference-abstract Hygraph category. */
export function isBlogArticlePost(post: PostNode): boolean {
  return !(post.categories || []).some((c) => c.slug === ABSTRACT_CATEGORY_SLUG);
}
