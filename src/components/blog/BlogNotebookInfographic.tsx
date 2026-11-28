'use client';

/**
 * NotebookLM Studio infographic — render the uploaded PNG/SVG/PDF Asset only.
 * No client-side mind-map/FAQ collage. Empty when Hygraph has no artifact.
 */

import type { NotebookBundleData } from '@/lib/blog/notebooklm-adapters';

export interface BlogNotebookInfographicProps {
  bundle: NotebookBundleData;
}

function isPdf(url: string, mime?: string | null, fileName?: string | null): boolean {
  if (mime && /pdf/i.test(mime)) return true;
  if (fileName && /\.pdf$/i.test(fileName)) return true;
  return /\.pdf(\?|$)/i.test(url);
}

export default function BlogNotebookInfographic({ bundle }: BlogNotebookInfographicProps) {
  const asset = bundle.infographic;
  const url = asset?.url?.trim() || bundle.infographicUrl?.trim() || '';

  if (!url) {
    return (
      <p className="px-1 text-sm text-slate-500 dark:text-slate-400">
        Infographic not generated yet
      </p>
    );
  }

  if (isPdf(url, asset?.mimeType, asset?.fileName)) {
    return (
      <div className="nlm-infographic flex h-full min-h-0 w-full flex-1 flex-col">
        <iframe
          title={asset?.fileName || bundle.title || 'NotebookLM infographic'}
          src={url}
          className="h-full min-h-[60vh] w-full flex-1 border-0 bg-white"
        />
      </div>
    );
  }

  return (
    <div className="nlm-infographic flex h-full min-h-0 w-full flex-1 items-start justify-center overflow-auto">
      {/* eslint-disable-next-line @next/next/no-img-element -- Hygraph CDN absolute URL */}
      <img
        src={url}
        alt={asset?.fileName || bundle.title || 'NotebookLM infographic'}
        className="h-auto w-full max-w-none object-contain"
      />
    </div>
  );
}
