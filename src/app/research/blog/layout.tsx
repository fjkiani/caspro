import BlogShell from '@/app/blog/BlogShell';
import ResearchBlogPostChrome from './ResearchBlogPostChrome';

export default function ResearchBlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <BlogShell>
      <ResearchBlogPostChrome />
      {children}
    </BlogShell>
  );
}
