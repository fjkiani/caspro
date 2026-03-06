'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import type { CmsUseCase } from '@/lib/docs/hygraph/use-case-types';
import UseCaseRichSection from './UseCaseRichSection';

interface UseCaseViewerProps {
  useCase: CmsUseCase;
}

function embedUrl(url: string): string {
  if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
    const id = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }
  if (url.includes('vimeo.com/')) {
    const id = url.match(/vimeo.com\/(\d+)/)?.[1];
    return id ? `https://player.vimeo.com/video/${id}` : url;
  }
  return url;
}

export default function UseCaseViewer({ useCase }: UseCaseViewerProps) {
  const router = useRouter();
  const hasVideo = !!useCase.demoVideoUrl?.trim();
  const hasPdf = !!useCase.pdfDeck?.url;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between p-4 max-w-5xl mx-auto">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <span className="text-sm text-slate-500">Use case</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 pb-16">
        {/* Hero */}
        <div className="mb-10">
          {useCase.heroImage?.url && (
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm mb-6">
              <img
                src={useCase.heroImage.url}
                alt={useCase.title}
                className="w-full h-auto object-cover max-h-[420px]"
              />
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            {useCase.title}
          </h1>
          {(useCase.resultsHeadline || useCase.description) && (
            <p className="text-lg text-slate-600">
              {useCase.resultsHeadline || useCase.description}
            </p>
          )}
        </div>

        {/* Single primary media: video or PDF (no tabs) */}
        {hasVideo && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Demo</h2>
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-video">
              <iframe
                src={embedUrl(useCase.demoVideoUrl!)}
                title={`${useCase.title} demo`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        )}

        {!hasVideo && hasPdf && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Deck / PDF</h2>
            <div className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
              <iframe
                src={`${useCase.pdfDeck!.url}#toolbar=1&navpanes=1&scrollbar=1`}
                className="w-full h-[500px] border-0"
                title={`${useCase.title} deck`}
              />
            </div>
            <a
              href={useCase.pdfDeck!.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 text-blue-600 hover:underline"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
          </section>
        )}

        {/* Narrative sections */}
        <div className="space-y-10">
          <UseCaseRichSection
            title="Client challenge"
            content={useCase.clientChallenge}
          />
          <UseCaseRichSection
            title="Before state"
            content={useCase.beforeState}
          />
          <UseCaseRichSection
            title="Our approach"
            content={useCase.jediApproach}
          />
          <UseCaseRichSection
            title="Outcomes"
            content={useCase.outcomes}
          />
          {useCase.resultsNarrative && (
            <UseCaseRichSection
              title={useCase.resultsHeadline ? `Results: ${useCase.resultsHeadline}` : 'Results'}
              content={useCase.resultsNarrative}
            />
          )}
          <UseCaseRichSection
            title="Architecture"
            content={useCase.architectureNarrative}
          />
          <UseCaseRichSection
            title="Technology & methods"
            content={useCase.technologyNarrative}
          />
          <UseCaseRichSection
            title="Capabilities"
            content={useCase.capabilityNarrative}
          />
          <UseCaseRichSection
            title="Prerequisites"
            content={useCase.prerequisites}
          />
          <UseCaseRichSection
            title="Risks & mitigations"
            content={useCase.risksAndMitigations}
          />
          <UseCaseRichSection
            title="Test scenarios"
            content={useCase.testScenarios}
          />
        </div>

        {/* PDF link at bottom if we showed video above */}
        {hasVideo && hasPdf && (
          <section className="mt-10 pt-8 border-t border-slate-200">
            <a
              href={useCase.pdfDeck!.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              View or download deck (PDF)
            </a>
          </section>
        )}
      </main>
    </div>
  );
}
