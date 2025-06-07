import { Metadata } from 'next';
import { coPilotDetailsData, CoPilotDetailContent } from '@/data/coPilotDetails';
import InteractiveContentAnalysis from '@/components/co-pilot-detail/InteractiveContentAnalysis';
import { notFound } from 'next/navigation';

// This function generates the static paths for each co-pilot page at build time.
export async function generateStaticParams() {
  return Object.keys(coPilotDetailsData).map((slug) => ({
    coPilotSlug: slug,
  }));
}

// This function generates the metadata for each co-pilot page.
export async function generateMetadata({ params }: { params: { coPilotSlug: string } }): Promise<Metadata> {
  const content = coPilotDetailsData[params.coPilotSlug];
  if (!content) {
    return {
      title: 'Co-Pilot Not Found',
    };
  }
  return {
    title: content.pageTitle,
    description: content.heroSubtitle || content.vision, 
  };
}

// This is the main page component (Server Component).
export default async function CoPilotDetailPage({ params }: { params: { coPilotSlug: string } }) {
  const { coPilotSlug } = params;
  const content: CoPilotDetailContent | undefined = coPilotDetailsData[coPilotSlug];

  if (!content) {
    notFound(); // Triggers the 404 page if content for the slug is not found
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white pt-20 pb-12 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section (Static or part of InteractiveContentAnalysis if dynamic) */}
        <section className="text-center mb-16 md:mb-24 pt-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-sky-400 to-indigo-400">
            {content.pageTitle}
          </h1>
          {content.heroSubtitle && (
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
              {content.heroSubtitle}
            </p>
          )}
        </section>
        
        {/* Delegate all interactive content rendering to the Client Component */}
        <div className="container mx-auto px-4 py-16">
          <InteractiveContentAnalysis content={content} />
        </div>
      </div>
    </main>
  );
}
