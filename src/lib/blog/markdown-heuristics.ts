/**
 * True when the string likely uses Markdown.
 *
 * Conservative on purpose: we don't want to mangle plain prose that happens
 * to contain a stray `*` or `-`. We require something that is unambiguously
 * Markdown (heading, list line, blockquote, code fence, table separator,
 * fenced JSON block, link, inline code, or `**bold**`).
 */
export function looksLikeMarkdown(text: string | undefined | null): boolean {
  if (!text || typeof text !== 'string') return false;
  const s = text.trim();
  if (!s) return false;
  if (/^#{1,6}\s+\S/m.test(s)) return true;
  if (/^\s*[-*+]\s+\S/m.test(s)) return true;
  if (/^\s*\d+\.\s+\S/m.test(s)) return true;
  if (/\*\*[^*\n]+\*\*/.test(s)) return true;
  if (/^>\s+\S/m.test(s)) return true;
  if (/^```/m.test(s)) return true;
  if (/^---+\s*$/m.test(s)) return true;
  if (/\[[^\]\n]+\]\([^)\s]+\)/.test(s)) return true;
  if (/`[^`\n]+`/.test(s)) return true;
  // CMS-style JSON without markdown fences, e.g. `json{ "ddr": 0.7, ... }`
  if (/\bjson\s*\{/i.test(s)) return true;
  return false;
}
