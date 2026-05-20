import React from 'react';
import type { Metadata } from 'next';
import { getPostDetails, getNextPost } from '@/services';
import { PostDetail } from '@/types/blog';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BlogPostMedia from '@/components/blog/BlogPostMedia';
import BlogPostHero from '@/components/blog/BlogPostHero';
import BlogPostBody from '@/components/blog/BlogPostBody';
import BlogMarkdown from '@/components/blog/BlogMarkdown';
import { looksLikeMarkdown } from '@/lib/blog/markdown-heuristics';

interface PostPageProps {
  params: {
    slug: string;
  };
}

interface NextPost {
  title: string;
  slug: string;
  createdAt?: string;
  excerpt?: string;
  featuredImage?: { url: string } | null;
  categories?: { name: string; slug: string }[];
}

// ---------------------------------------------------------------------------
// generateMetadata — full Twitter card + LinkedIn (OpenGraph) with Hygraph image
// ---------------------------------------------------------------------------
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = params;
  const post: PostDetail | null = await getPostDetails(slug);

  if (!post) {
    return {
      title: 'Post not found | CrisPRO Blog',
      description: 'The requested blog post could not be found.',
    };
  }

  const title = `${post.title} | CrisPRO Blog`;
  const description =
    post.excerpt?.trim() ||
    'Insights on AI-powered oncology, CRISPR therapeutics, and precision medicine from the CrisPRO team.';

  const pageUrl = `https://crispro.ai/blog/post/${slug}/`;

  // Prefer the Hygraph featuredImage; fall back to the site-wide OG image
  const ogImageUrl = post.featuredImage?.url ?? 'https://crispro.ai/og-image.png';
  const ogImageWidth = (post.featuredImage as { url: string; width?: number } | null)?.width ?? 1200;
  const ogImageHeight = (post.featuredImage as { url: string; height?: number } | null)?.height ?? 630;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'CrisPRO',
      type: 'article',
      publishedTime: post.createdAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: [
        {
          url: ogImageUrl,
          width: ogImageWidth,
          height: ogImageHeight,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
      creator: '@crispro_ai',
      site: '@crispro_ai',
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default async function PostDetailPage({ params }: PostPageProps) {
  const { slug } = params;
  const post: PostDetail | null = await getPostDetails(slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Post not found</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Sorry, we couldn&apos;t find the post you were looking for.
        </p>
        <div className="mt-8">
          <Link
            href="/blog/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Go Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const deckSlug = post.slideDeckSlug?.trim();
  const pdfUrl = (post.pdfDeck?.url ?? post.pdfDeckUrl)?.trim();
  const heroShowsDeck = Boolean(deckSlug);
  const heroShowsPdf = !heroShowsDeck && Boolean(pdfUrl);

  const categorySlugs: string[] = (post.categories ?? [])
    .map((c) => c.slug)
    .filter((s): s is string => Boolean(s));
  const nextPost: NextPost | null = await getNextPost({
    slug: post.slug,
    createdAt: post.createdAt,
    categorySlugs,
  });

  const matchedCategory =
    nextPost?.categories?.find((c) => categorySlugs.includes(c.slug))?.name ?? null;

  return (
    <main className="pt-8 pb-16 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/blog/"
            className="inline-flex items-center text-primary hover:text-primary/90 transition-colors duration-200 group"
          >
            <ChevronLeft className="mr-2 h-5 w-5 transform group-hover:-translate-x-1 transition-transform duration-200" />
            Back to All Articles
          </Link>
        </div>
        <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-semibold prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:text-slate-700 dark:prose-li:text-slate-300 prose-ol:text-slate-700 dark:prose-ol:text-slate-300 prose-ul:text-slate-700 dark:prose-ul:text-slate-300 prose-headings:text-slate-900 dark:prose-headings:text-slate-100">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            {post.title}
          </h1>
          <div className="flex items-center mb-8 text-sm text-slate-600 dark:text-slate-400">
            {post.author?.photo?.url && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={post.author.photo.url}
                alt={post.author.name || 'Author photo'}
                className="w-10 h-10 rounded-full mr-3"
              />
            )}
            <span>By {post.author?.name || 'Anonymous'}</span>
            <span className="mx-2">|</span>
            <span>
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          <BlogPostHero
            postTitle={post.title}
            featuredImageUrl={post.featuredImage?.url}
            pdfDeck={post.pdfDeck ?? null}
            pdfDeckUrl={post.pdfDeckUrl ?? null}
            slideDeckSlug={post.slideDeckSlug ?? null}
          />

          {post.excerpt ? (
            <div className="not-prose mb-8 text-slate-600 dark:text-slate-300">
              {looksLikeMarkdown(post.excerpt) ? (
                <BlogMarkdown source={post.excerpt} />
              ) : (
                <p className="text-lg leading-relaxed">{post.excerpt}</p>
              )}
            </div>
          ) : null}

          <BlogPostMedia
            postTitle={post.title}
            pdfDeck={post.pdfDeck ?? null}
            pdfDeckUrl={post.pdfDeckUrl ?? null}
            slideDeckSlug={post.slideDeckSlug ?? null}
            suppressSlideDeck={heroShowsDeck}
            suppressPdf={heroShowsPdf}
          />

          <div className="not-prose">
            <BlogPostBody content={post.content} />
          </div>

          {post.categories && post.categories.length > 0 && (
            <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-200 mb-3">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <span
                    key={category.slug}
                    className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-3 py-1 rounded-full text-sm"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {nextPost ? (
          <section className="mt-16 border-t border-slate-200 pt-10 dark:border-slate-700">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {matchedCategory ? `Next in ${matchedCategory}` : 'Next article'}
              </p>
              <Link
                href="/blog/"
                className="text-sm font-medium text-primary hover:underline"
              >
                All articles
              </Link>
            </div>

            <Link
              href={`/blog/post/${nextPost.slug}/`}
              className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/60"
            >
              <div className="grid gap-0 sm:grid-cols-[200px_1fr]">
                {nextPost.featuredImage?.url ? (
                  <div className="relative aspect-[16/10] sm:aspect-auto sm:h-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={nextPost.featuredImage.url}
                      alt={nextPost.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                ) : (
                  <div className="hidden sm:block bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900" />
                )}
                <div className="flex flex-col justify-center gap-2 p-5 sm:p-6">
                  <h3 className="text-xl font-semibold text-slate-900 group-hover:text-primary dark:text-slate-100">
                    {nextPost.title}
                  </h3>
                  {nextPost.excerpt ? (
                    <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                      {nextPost.excerpt}
                    </p>
                  ) : null}
                  <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Read next
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </section>
        ) : null}
      </div>
    </main>
  );
}
