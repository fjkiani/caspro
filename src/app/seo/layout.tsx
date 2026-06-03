import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO Intelligence | CrisPRO Internal',
  description: 'CrisPRO SEO Intelligence Platform — internal tool',
  robots: 'noindex, nofollow', // Internal tool — do not index
};

export default function SEOLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans antialiased">
      {children}
    </div>
  );
}
