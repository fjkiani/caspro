/**
 * URLs that work reasonably inside an iframe as a “document” viewer.
 * NotebookLM, Google Docs landing pages, etc. require login / block frames — use a link CTA instead.
 */
export function isLikelyDirectPdfIframeUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== 'string') return false;
  const u = url.trim();
  if (!/^https?:\/\//i.test(u)) return false;
  const lower = u.toLowerCase();
  if (lower.includes('notebooklm.google.com')) return false;
  if (lower.includes('docs.google.com/document')) return false;
  if (lower.includes('docs.google.com/presentation') && !lower.includes('/embed')) return false;
  if (lower.includes('drive.google.com/file') && !lower.includes('export=download')) return false;
  if (/\.pdf(\?|#|$)/i.test(lower)) return true;
  if (lower.includes('hygraphusercontent') || lower.includes('graphassets') || lower.includes('media.graphassets'))
    return true;
  return false;
}
