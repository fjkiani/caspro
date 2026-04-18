import React from 'react';
import { getPostDetails, getNextPostInSameCategory } from '@/services';
import { PostDetail, BlogAdjacentPost } from '@/types/blog';
import { RichText } from '@graphcms/rich-text-react-renderer';
import Link from 'next/link';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import BlogPostMedia from '@/components/blog/BlogPostMedia';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostDetailPage({ params }: PostPageProps) {
  const { slug } = params;
  const post: PostDetail | null = await getPostDetails(slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Post not found</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">Sorry, we couldn&apos;t find the post you were looking for.</p>
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

  const categorySlugs = (post.categories || []).map((c) => c.slug).filter(Boolean);
  const nextInCategory: BlogAdjacentPost | null = await getNextPostInSameCategory(
    slug,
    post.createdAt,
    categorySlugs
  );

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
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">{post.title}</h1>
          <div className="flex items-center mb-8 text-sm text-slate-600 dark:text-slate-400">
            {post.author?.photo?.url && (
              <img src={post.author.photo.url} alt={post.author.name || 'Author photo'} className="w-10 h-10 rounded-full mr-3" />
            )}
            <span>By {post.author?.name || 'Anonymous'}</span>
            <span className="mx-2">|</span>
            <span>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>

          {post.featuredImage?.url && (
            <div className="mb-8">
              <img
                src={post.featuredImage.url}
                alt={post.title}
                className="w-full h-auto rounded-lg shadow-md object-cover max-h-[500px]"
              />
            </div>
          )}

          <BlogPostMedia
            postTitle={post.title}
            pdfDeck={post.pdfDeck ?? null}
            slideDeckSlug={post.slideDeckSlug ?? null}
          />

          {post.content?.raw && (
            <div className="prose-lg">
              <RichText content={post.content.raw} />
            </div>
          )}

          {post.categories && post.categories.length > 0 && (
            <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-700 not-prose">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-200 mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/blog/?category=${encodeURIComponent(category.slug)}`}
                    className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-3 py-1 rounded-full text-sm hover:bg-cyan-500/10 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {nextInCategory && (
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 not-prose">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400 mb-3">Next in category</p>
              <Link
                href={`/blog/post/${nextInCategory.slug}/`}
                className="group flex flex-col sm:flex-row gap-6 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:border-cyan-500/40 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                {nextInCategory.featuredImage?.url ? (
                  <div className="sm:w-48 h-40 sm:h-28 shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={nextInCategory.featuredImage.url}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : null}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors line-clamp-2">
                    {nextInCategory.title}
                  </h3>
                  {nextInCategory.excerpt && (
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{nextInCategory.excerpt}</p>
                  )}
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
                    Continue reading
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            </div>
          )}
        </article>
      </div>
    </main>
  );
}
