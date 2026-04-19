'use client';

import { forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

export interface UseCasePdfFlipBookProps {
  url: string;
  title: string;
}

type PageProps = { pageNumber: number; pageWidth: number; pageHeight: number };

const PdfFlipPage = forwardRef<HTMLDivElement, PageProps>(function PdfFlipPageInner(
  { pageNumber, pageWidth, pageHeight },
  ref
) {
  return (
    <div
      ref={ref}
      className="flex items-center justify-center overflow-hidden rounded-sm bg-white shadow-md ring-1 ring-black/[0.06] dark:bg-zinc-900 dark:shadow-black/40 dark:ring-white/[0.08]"
      style={{ width: pageWidth, height: pageHeight }}
    >
      <Page
        pageNumber={pageNumber}
        width={pageWidth}
        height={pageHeight}
        renderTextLayer
        renderAnnotationLayer
      />
    </div>
  );
});
PdfFlipPage.displayName = 'PdfFlipPage';

type FlipBookHandle = { pageFlip: () => { flipNext: () => void; flipPrev: () => void; turnToPage?: (n: number) => void } };

const PAGE_ASPECT = 1.41421356; // ≈ √2 (A-series); StPageFlip stays portrait when blockWidth < 2×pageWidth — lock shell to `w` so .stf__block cannot widen past the leaf.

/**
 * Book-style reader: [react-pageflip](https://github.com/Nodlik/react-pageflip) page-turn animation.
 * Uses the full width of the measuring area; a fixed-width shell around the flip root keeps StPageFlip in portrait (one page).
 */
export default function UseCasePdfFlipBook({ url, title }: UseCasePdfFlipBookProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bookAreaRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<FlipBookHandle | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [flipIndex, setFlipIndex] = useState(0);
  const [dims, setDims] = useState({ w: 420, h: 594 });
  const [err, setErr] = useState<string | null>(null);

  // bookAreaRef must wrap <Document> from the outside: react-pdf does not render children until the
  // PDF is loaded, so a ref inside Document is null on mount — ResizeObserver never attached and dims
  // stayed at the default (420×594 → tiny page).
  useLayoutEffect(() => {
    const el = bookAreaRef.current;
    if (!el) return;
    let t: ReturnType<typeof setTimeout> | undefined;
    const measure = () => {
      const { width: rw } = el.getBoundingClientRect();
      if (rw < 200) return;
      const w = Math.max(200, Math.floor(rw - 8));
      // Full page height at this width (no viewport cap) so the PDF isn't clipped; bookArea scrolls vertically.
      const h = Math.floor(w * PAGE_ASPECT);
      setDims({ w, h });
    };
    const debounced = () => {
      if (t) clearTimeout(t);
      t = setTimeout(measure, 80);
    };
    measure();
    const ro = new ResizeObserver(debounced);
    ro.observe(el);
    return () => {
      ro.disconnect();
      if (t) clearTimeout(t);
    };
  }, [numPages]);

  useEffect(() => {
    setNumPages(0);
    setFlipIndex(0);
    setErr(null);
  }, [url]);

  const flipNext = useCallback(() => {
    try {
      bookRef.current?.pageFlip()?.flipNext();
    } catch {
      /* noop */
    }
  }, []);
  const flipPrev = useCallback(() => {
    try {
      bookRef.current?.pageFlip()?.flipPrev();
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => {
    if (numPages <= 0) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el?.closest('input, textarea, select, [contenteditable="true"]')) return;
      const key = e.key;
      if ((key === 'ArrowRight' || key === 'ArrowDown' || key === 'PageDown') && !e.shiftKey) {
        e.preventDefault();
        flipNext();
        return;
      }
      if ((key === 'ArrowLeft' || key === 'ArrowUp' || key === 'PageUp') && !e.shiftKey) {
        e.preventDefault();
        flipPrev();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [numPages, flipNext, flipPrev]);

  if (err) {
    return (
      <div className="rounded-xl border border-amber-700/40 bg-amber-950/30 p-6 text-center text-sm text-amber-100 dark:text-amber-200">
        <p className="mb-3">{err}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-300 underline">
          Open PDF in new tab
        </a>
      </div>
    );
  }

  const currentPage = numPages ? Math.min(numPages, flipIndex + 1) : 0;

  return (
    <div
      ref={wrapRef}
      className="manuscript-pdf-viewer flex min-h-0 min-w-0 flex-1 flex-col"
      aria-label={title}
    >
      <style>{`
        .manuscript-pdf-viewer .react-pdf__Page__textContent,
        .manuscript-pdf-viewer .react-pdf__Page__annotations {
          user-select: text !important;
        }
        .manuscript-pdf-viewer .use-case-pdf-flipbook {
          margin-left: auto !important;
          margin-right: auto !important;
        }
      `}</style>

      <div
        ref={bookAreaRef}
        className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto [-webkit-overflow-scrolling:touch]"
      >
        <Document
          className="flex w-full min-w-0 shrink-0 flex-col"
          file={url}
          loading={
            <div className="flex min-h-[50vh] flex-1 items-center justify-center py-12 text-center text-sm text-black dark:text-white">
              Loading manuscript…
            </div>
          }
          onLoadSuccess={({ numPages: n }) => {
            setNumPages(n);
            setFlipIndex(0);
            setErr(null);
          }}
          onLoadError={(e) => setErr((e as Error)?.message || 'Failed to load PDF')}
        >
          {numPages > 0 ? (
            <div className="flex w-full shrink-0 items-start justify-center py-1">
              <div
                className="relative mx-auto box-border shrink-0 overflow-x-hidden"
                style={{ width: dims.w, maxWidth: '100%', height: dims.h }}
              >
                <HTMLFlipBook
                  key={url}
                  ref={bookRef}
                  className="use-case-pdf-flipbook"
                  style={{ width: dims.w, height: dims.h }}
                  width={dims.w}
                  height={dims.h}
                  minWidth={dims.w}
                  minHeight={dims.h}
                  maxWidth={dims.w}
                  maxHeight={dims.h}
                  size="fixed"
                  startPage={0}
                  startZIndex={0}
                  autoSize={false}
                  drawShadow
                  flippingTime={700}
                  maxShadowOpacity={1}
                  showCover={false}
                  usePortrait
                  mobileScrollSupport={false}
                  clickEventForward
                  useMouseEvents
                  swipeDistance={30}
                  showPageCorners
                  disableFlipByClick={false}
                  onFlip={(e) => {
                    const n = typeof e?.data === 'number' ? e.data : 0;
                    setFlipIndex(Math.max(0, n));
                  }}
                >
                  {Array.from({ length: numPages }, (_, i) => (
                    <PdfFlipPage
                      key={i + 1}
                      pageNumber={i + 1}
                      pageWidth={dims.w}
                      pageHeight={dims.h}
                    />
                  ))}
                </HTMLFlipBook>
              </div>
            </div>
          ) : null}
        </Document>
      </div>

      {numPages > 0 ? (
        <>
          <div className="flex shrink-0 flex-wrap items-center justify-center gap-3 bg-white pb-1 pt-1 dark:bg-zinc-950">
            <button
              type="button"
              onClick={flipPrev}
              disabled={flipIndex <= 0}
              className="inline-flex items-center gap-1 rounded-lg border-0 bg-white px-4 py-2.5 text-sm font-medium text-black shadow-none ring-1 ring-black/[0.06] hover:ring-black/10 disabled:pointer-events-none disabled:opacity-25 dark:bg-zinc-950 dark:text-white dark:ring-white/10 dark:hover:ring-white/20"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
              Previous
            </button>
            <span className="text-sm tabular-nums text-black dark:text-white">
              Page {currentPage} / {numPages}
            </span>
            <button
              type="button"
              onClick={flipNext}
              disabled={flipIndex >= numPages - 1}
              className="inline-flex items-center gap-1 rounded-lg border-0 bg-white px-4 py-2.5 text-sm font-medium text-black shadow-none ring-1 ring-black/[0.06] hover:ring-black/10 disabled:pointer-events-none disabled:opacity-25 dark:bg-zinc-950 dark:text-white dark:ring-white/10 dark:hover:ring-white/20"
              aria-label="Next page"
            >
              Next
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <p className="shrink-0 bg-white px-2 pb-2 text-center text-xs text-black dark:bg-zinc-950 dark:text-white">
            Drag page corners or edges to turn · Swipe on the book · Arrow keys / Page Up/Down ·{' '}
            <a href={url} target="_blank" rel="noopener noreferrer" className="underline decoration-black/30 text-black underline-offset-2 dark:decoration-white/30 dark:text-white">
              Open PDF
            </a>
          </p>
        </>
      ) : null}
    </div>
  );
}
