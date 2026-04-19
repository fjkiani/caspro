/**
 * Shared pipeline so BlogMarkdown and BlogPostBody (plain / trivial Slate) apply
 * the same CMS-specific fixes.
 */

/** Opening fence glued to `{` (no newline) — common in CMS — breaks fenced code detection. */
export function repairGluedCodeFences(source: string): string {
  return source.replace(/```\s*(json|javascript|typescript|ts)\s*\{/gi, '```$1\n{');
}

/**
 * Hygraph / editors sometimes store a JSON object as `json{ ... }` without fences.
 * Handles single-line blobs (optionally after a newline or colon).
 */
const JSONISH_LINE_BODY = '(\\{\\s*"(?:[^"\\\\]|\\\\.)*"\\s*:[^\\n]+\\})';

export function promoteBareJsonPreface(source: string): string {
  let s = source;
  const lineOnly = new RegExp(`^\\s*json\\s*${JSONISH_LINE_BODY}\\s*$`, 'gim');
  s = s.replace(lineOnly, '```json\n$1\n```');
  const afterBreak = new RegExp(`(^|[\\n:])\\s*json\\s*${JSONISH_LINE_BODY}`, 'gim');
  s = s.replace(afterBreak, (full, lead: string, obj: string) => {
    const extra = lead === '\n' ? '' : '\n\n';
    return `${lead}${extra}\`\`\`json\n${obj}\n\`\`\``;
  });
  const inline = new RegExp(`([^\\n\`])\\bjson\\s*${JSONISH_LINE_BODY}`, 'gi');
  s = s.replace(inline, (full, before: string, obj: string) => {
    if (before === '[') return full;
    return `${before}\n\n\`\`\`json\n${obj}\n\`\`\``;
  });
  return s;
}

/** Hygraph sometimes returns `content.text` with literal two-char `\\n` instead of newlines — breaks fenced blocks. */
export function unescapeLiteralCmsNewlines(source: string): string {
  const s = source.trim();
  const realNl = (s.match(/\n/g) || []).length;
  const literal = (s.match(/\\n/g) || []).length;
  if (literal >= 3 && literal > Math.max(2, realNl * 2)) {
    return s.replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n').replace(/\\t/g, '\t');
  }
  return s;
}

/** Pasted “divider” lines (box-drawing / em dashes) are one unbreakable token — allow soft wraps. */
export function breakLongDashRuns(source: string): string {
  return source.replace(/[\u2500-\u257F\u2014\u2013─━]{80,}/g, (run) => {
    const chunk = 48;
    let out = '';
    for (let i = 0; i < run.length; i += chunk) {
      out += run.slice(i, i + chunk);
      if (i + chunk < run.length) out += '\u200b';
    }
    return out;
  });
}

export function normalizeBlogMarkdownSource(source: string): string {
  let s = (source ?? '').trim();
  if (!s) return '';
  s = promoteBareJsonPreface(s);
  s = repairGluedCodeFences(s);
  s = unescapeLiteralCmsNewlines(s);
  s = breakLongDashRuns(s);
  return s;
}
