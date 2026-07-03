import BlogShell from './BlogShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blog | CrisPRO.ai",
  description: "Evidence notes, platform releases, and CrisPRO.ai research write-ups on metastasis prevention, VUS resolution, and in silico therapeutic design.",
};


export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <BlogShell>{children}</BlogShell>;
}
