'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export interface BlogPdfPagerProps {
  url: string;
  title: string;
  className?: string;
}

export default function BlogPdfPager({ url, title, className = '' }: BlogPdfPagerProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const [pageHeight, setPageHeight] = useState(560);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [fatalError, setFatalError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const setExpanded = useCallback(async (next: boolean) => {
    if (next) {
      setIsExpanded(true);
      try {
        await shellRef.current?.requestFullscreen?.();
      } catch {
        /* overlay mode still works on mobile */
      }
      return;
    }
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch {
        /* ignore */
      }
    }
    setIsExpanded(false);
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      if (!document.fullscreenElement) setIsExpanded(false);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  useEffect(() => {
    if (!isExpanded) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isExpanded]);

  useEffect(() => {
    setPageNumber(1);
    setNumPages(0);
    setFatalError(null);
  }, [url]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const h = entries[0]?.contentRect.height;
      if (h && h > 80) setPageHeight(Math.max(200, Math.floor(h - 24)));
    });
    ro.observe(el);
    const h0 = el.getBoundingClientRect().height;
    if (h0 > 80) setPageHeight(Math.max(200, Math.floor(h0 - 24)));
    return () => ro.disconnect();
  }, []);

  const go = useCallback(
    (dir: -1 | 1) => {
      setPageNumber((p) => {
        if (!numPages) return p;
        return clamp(p + dir, 1, numPages);
      });
    },
    [numPages]
  );

  const onDocLoad = useCallback((pdf: { numPages: number }) => {
    setNumPages(pdf.numPages);
    setFatalError(null);
    setPageNumber(1);
  }, []);

  const onDocErr = useCallback((err: Error) => {
    setFatalError(err?.message || 'Could not load PDF');
  }, []);

  if (fatalError) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-4 bg-slate-50 p-8 text-center dark:bg-zinc-900 ${className}`.trim()}
      >
        <p className="max-w-md text-sm text-slate-600 dark:text-slate-400">{fatalError}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-500"
        >
          Open PDF
        </a>
      </div>
    );
  }

  return (
    <div
      ref={shellRef}
      className={`flex flex-col bg-white outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 focus-visible:ring-offset-2 dark:bg-zinc-950 dark:focus-visible:ring-offset-zinc-900 ${
        isExpanded ? 'fixed inset-0 z-[9999] h-[100dvh]' : ''
      } ${className}`.trim()}
      role="region"
      aria-label={title}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && isExpanded) {
          e.preventDefault();
          void setExpanded(false);
          return;
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          go(-1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          go(1);
        }
      }}
    >
      <div className="flex items-center justify-end gap-2 border-b border-slate-200 px-3 py-2 dark:border-zinc-700">
        <button
          type="button"
          onClick={() => void setExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-700 hover:bg-slate-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
          aria-label={isExpanded ? 'Exit fullscreen' : 'Expand PDF viewer'}
        >
          {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          <span className="hidden min-[420px]:inline">{isExpanded ? 'Exit' : 'Expand'}</span>
        </button>
      </div>
      <div
        ref={wrapRef}
        className={`flex w-full flex-1 items-center justify-center overflow-hidden p-3 ${
          isExpanded ? 'min-h-0 h-[calc(100dvh-7rem)]' : 'min-h-[420px] h-[min(72vh,640px)]'
        }`}
      >
        <Document
          file={url}
          loading={
            <div className="text-sm text-slate-500 dark:text-slate-400" aria-live="polite">
              Loading PDF…
            </div>
          }
          onLoadSuccess={onDocLoad}
          onLoadError={onDocErr}
        >
          <Page
            pageNumber={pageNumber}
            height={pageHeight}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="shadow-sm"
          />
        </Document>
      </div>

      {numPages > 1 ? (
        <div className="flex items-center justify-center gap-4 border-t border-slate-200 py-3 dark:border-zinc-700">
          <button
            type="button"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 disabled:opacity-40 dark:text-slate-400 dark:hover:bg-zinc-800"
            aria-label="Previous page"
            disabled={pageNumber <= 1}
            onClick={() => go(-1)}
          >
            <ChevronLeft className="h-6 w-6" aria-hidden />
          </button>
          <span className="min-w-[5rem] text-center text-sm tabular-nums text-slate-700 dark:text-slate-300">
            {pageNumber} / {numPages}
          </span>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 disabled:opacity-40 dark:text-slate-400 dark:hover:bg-zinc-800"
            aria-label="Next page"
            disabled={pageNumber >= numPages}
            onClick={() => go(1)}
          >
            <ChevronRight className="h-6 w-6" aria-hidden />
          </button>
        </div>
      ) : null}
    </div>
  );
}
