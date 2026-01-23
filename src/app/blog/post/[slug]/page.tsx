import React from 'react';
import { getPostDetails } from '@/services';
import { PostDetail } from '@/types/blog';
import { RichText } from '@graphcms/rich-text-react-renderer';
import Link from 'next/link'; // Import Link for the back button
import { ChevronLeft } from 'lucide-react'; // For a nice back icon

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
        <p className="mt-4 text-slate-600 dark:text-slate-400">Sorry, we couldn\\'t find the post you were looking for.</p>
        <div className="mt-8">
          <Link href="/blog" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <ChevronLeft className="mr-2 h-5 w-5" />
            Go Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-16 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center text-primary hover:text-primary/90 transition-colors duration-200 group">
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
          
          {post.content?.raw && (
            <div className="prose-lg"> 
              <RichText content={post.content.raw} />
            </div>
          )}

          {post.categories && post.categories.length > 0 && (
            <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-200 mb-3">Categories:</h3>
              <div className="flex flex-wrap gap-2">
                {post.categories.map(category => (
                  <span key={category.slug} className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-3 py-1 rounded-full text-sm">
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </main>
  );
} 
 