'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import type { CmsUseCase } from '@/lib/docs/hygraph/use-case-types';
import UseCaseRichSection from './UseCaseRichSection';
import { useTheme } from '@/context/ThemeContext';

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
  const { isDarkMode } = useTheme();
  const hasVideo = !!useCase.demoVideoUrl?.trim();
  const hasPdf = !!useCase.pdfDeck?.url;
  const panelClass = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textSubtle = isDarkMode ? 'text-zinc-400' : 'text-slate-600';

  return (
    <div className={`min-h-screen font-mono ${isDarkMode ? 'bg-[#020408] text-zinc-100' : 'bg-gradient-to-br from-white via-slate-50 to-white text-slate-900'}`}>
      <div className={`absolute inset-0 pointer-events-none ${isDarkMode ? 'bg-[linear-gradient(to_right,#00E5FF06_1px,transparent_1px),linear-gradient(to_bottom,#00E5FF06_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,#6366f10a_1px,transparent_1px),linear-gradient(to_bottom,#6366f10a_1px,transparent_1px)]'} bg-[size:48px_48px]`} />
      <header className={`sticky top-0 z-40 shadow-sm border-b backdrop-blur-md ${panelClass}`}>
        <div className="flex items-center justify-between p-4 max-w-5xl mx-auto">
          <button
            type="button"
            onClick={() => router.back()}
            className={`flex items-center gap-2 transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-zinc-100' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <span className={`text-sm ${textSubtle}`}>Use case</span>
        </div>
      </header>

      <main className="relative max-w-4xl mx-auto px-4 py-8 pb-16">
        {/* Hero */}
        <div className="mb-10">
          {useCase.heroImage?.url && (
            <div className={`rounded-xl overflow-hidden border shadow-sm mb-6 ${panelClass}`}>
              <img
                src={useCase.heroImage.url}
                alt={useCase.title}
                className="w-full h-auto object-cover max-h-[420px]"
              />
            </div>
          )}
          <h1 className={`text-3xl md:text-4xl font-black tracking-tight mb-2 ${textMain}`}>
            {useCase.title}
          </h1>
          {(useCase.resultsHeadline || useCase.description) && (
            <p className={`text-lg ${textSubtle}`}>
              {useCase.resultsHeadline || useCase.description}
            </p>
          )}
        </div>

        {/* Single primary media: video or PDF (no tabs) */}
        {hasVideo && (
          <section className="mb-10">
            <h2 className={`text-xl font-semibold mb-3 ${textMain}`}>Demo</h2>
            <div className={`rounded-xl overflow-hidden border aspect-video ${isDarkMode ? 'border-zinc-700 bg-black' : 'border-slate-200 bg-slate-900'}`}>
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
            <h2 className={`text-xl font-semibold mb-3 ${textMain}`}>Deck / PDF</h2>
            <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'border-zinc-700 bg-zinc-950' : 'border-slate-200 bg-slate-50'}`}>
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
              className={`inline-flex items-center gap-2 mt-2 ${isDarkMode ? 'text-cyan-400 hover:underline' : 'text-indigo-600 hover:underline'}`}
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
          <section className={`mt-10 pt-8 border-t ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
            <a
              href={useCase.pdfDeck!.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 ${isDarkMode ? 'text-cyan-400 hover:underline' : 'text-indigo-600 hover:underline'}`}
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
