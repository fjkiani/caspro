'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import type { CmsUseCase } from '@/lib/docs/hygraph/use-case-types';
import UseCaseRichSection from './UseCaseRichSection';
import { useTheme } from '@/context/ThemeContext';

const UseCasePdfFlipBook = dynamic(() => import('./UseCasePdfFlipBook'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[50vh] items-center justify-center text-sm text-slate-500 dark:text-zinc-400">
      Loading manuscript…
    </div>
  ),
});

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
  const manuscriptUrl = useCase.manuscriptPdf?.url?.trim();
  const deckUrl = useCase.pdfDeck?.url?.trim();
  const primaryFlipUrl = manuscriptUrl || deckUrl;
  const hasManuscript = !!manuscriptUrl;
  const alternateDeckOnly = hasManuscript && !!deckUrl && manuscriptUrl !== deckUrl;
  const panelClass = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textSubtle = isDarkMode ? 'text-zinc-400' : 'text-slate-600';

  /** PDF-only: immersive reader — no hero, title block, CMS narrative, or chrome beyond back + open link. */
  const manuscriptOnly = !hasVideo && !!primaryFlipUrl;

  if (manuscriptOnly) {
    return (
      <div
        className={`fixed inset-x-0 bottom-0 top-14 z-0 flex flex-col font-mono ${isDarkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-slate-200 text-slate-900'}`}
      >
        <div className="relative z-10 flex shrink-0 items-center justify-between gap-3 px-3 py-2 sm:px-4">
          <button
            type="button"
            onClick={() => router.back()}
            className={`pointer-events-auto inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium shadow-sm backdrop-blur-md transition-colors ${
              isDarkMode
                ? 'border-zinc-700 bg-zinc-900/80 text-zinc-200 hover:bg-zinc-800'
                : 'border-slate-300 bg-white/90 text-slate-800 hover:bg-white'
            }`}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back
          </button>
          <a
            href={primaryFlipUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`pointer-events-auto text-xs font-medium underline-offset-2 hover:underline sm:text-sm ${
              isDarkMode ? 'text-cyan-400' : 'text-indigo-700'
            }`}
          >
            Open PDF
          </a>
        </div>

        <div className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden overflow-y-auto overscroll-y-contain px-1 pb-2 pt-1 sm:px-2">
          <UseCasePdfFlipBook url={primaryFlipUrl} title={useCase.title} />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-mono ${isDarkMode ? 'bg-[#020408] text-zinc-100' : 'bg-gradient-to-br from-white via-slate-50 to-white text-slate-900'}`}>
      <div className={`absolute inset-0 pointer-events-none ${isDarkMode ? 'bg-[linear-gradient(to_right,#00E5FF06_1px,transparent_1px),linear-gradient(to_bottom,#00E5FF06_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,#6366f10a_1px,transparent_1px),linear-gradient(to_bottom,#6366f10a_1px,transparent_1px)]'} bg-[size:48px_48px]`} />
      <header className={`sticky top-14 z-40 shadow-sm border-b backdrop-blur-md ${panelClass}`}>
        <div className="flex items-center justify-between p-4 max-w-5xl mx-auto">
          <button
            type="button"
            onClick={() => router.back()}
            className={`flex items-center gap-2 transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-zinc-100' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <span className={`text-sm ${textSubtle}`}>Manuscript</span>
        </div>
      </header>

      <main className="relative max-w-4xl mx-auto px-4 py-8 pb-16">
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
          <h1 className={`text-3xl md:text-4xl font-black tracking-tight mb-2 ${textMain}`}>{useCase.title}</h1>
          {(useCase.resultsHeadline || useCase.description) && (
            <p className={`text-lg ${textSubtle}`}>{useCase.resultsHeadline || useCase.description}</p>
          )}
        </div>

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

        {primaryFlipUrl && (
          <section className="mb-12">
            <h2 className={`mb-4 text-xl font-semibold ${textMain}`}>Manuscript PDF</h2>
            <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
              <div className={`border-y shadow-sm ${isDarkMode ? 'border-zinc-800 bg-zinc-950/95' : 'border-slate-200 bg-slate-100/90'}`}>
                <div className="mx-auto max-w-[min(100vw,1920px)] px-2 py-6 sm:px-4 sm:py-8 md:px-10 md:py-10">
                  <UseCasePdfFlipBook url={primaryFlipUrl} title={`${useCase.title} — PDF`} />
                </div>
              </div>
            </div>
            <div className={`mt-4 flex flex-wrap gap-4 text-sm ${textSubtle}`}>
              <a
                href={primaryFlipUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 ${isDarkMode ? 'text-cyan-400 hover:underline' : 'text-indigo-600 hover:underline'}`}
              >
                <Download className="w-4 h-4" aria-hidden />
                Download {hasManuscript ? 'manuscript' : 'PDF'}
              </a>
              {alternateDeckOnly ? (
                <a
                  href={deckUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 ${isDarkMode ? 'text-cyan-400 hover:underline' : 'text-indigo-600 hover:underline'}`}
                >
                  <Download className="w-4 h-4" aria-hidden />
                  Download deck (PDF)
                </a>
              ) : null}
            </div>
          </section>
        )}

        <div className="space-y-10">
          <UseCaseRichSection title="Client challenge" content={useCase.clientChallenge} />
          <UseCaseRichSection title="Before state" content={useCase.beforeState} />
          <UseCaseRichSection title="Our approach" content={useCase.jediApproach} />
          <UseCaseRichSection title="Outcomes" content={useCase.outcomes} />
          {useCase.resultsNarrative && (
            <UseCaseRichSection
              title={useCase.resultsHeadline ? `Results: ${useCase.resultsHeadline}` : 'Results'}
              content={useCase.resultsNarrative}
            />
          )}
          <UseCaseRichSection title="Architecture" content={useCase.architectureNarrative} />
          <UseCaseRichSection title="Technology & methods" content={useCase.technologyNarrative} />
          <UseCaseRichSection title="Capabilities" content={useCase.capabilityNarrative} />
          <UseCaseRichSection title="Prerequisites" content={useCase.prerequisites} />
          <UseCaseRichSection title="Risks & mitigations" content={useCase.risksAndMitigations} />
          <UseCaseRichSection title="Test scenarios" content={useCase.testScenarios} />
        </div>

        {hasVideo && primaryFlipUrl && (
          <section className={`mt-10 pt-8 border-t ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
            <p className={`mb-3 text-sm ${textSubtle}`}>PDFs open in a new tab so the demo stays in view.</p>
            <div className="flex flex-wrap gap-4">
              <a
                href={primaryFlipUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 ${isDarkMode ? 'text-cyan-400 hover:underline' : 'text-indigo-600 hover:underline'}`}
              >
                <ExternalLink className="w-4 h-4" aria-hidden />
                {hasManuscript ? 'Open manuscript (PDF)' : 'View or download deck (PDF)'}
              </a>
              {alternateDeckOnly ? (
                <a
                  href={deckUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 ${isDarkMode ? 'text-cyan-400 hover:underline' : 'text-indigo-600 hover:underline'}`}
                >
                  <ExternalLink className="w-4 h-4" aria-hidden />
                  Open deck (PDF)
                </a>
              ) : null}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
