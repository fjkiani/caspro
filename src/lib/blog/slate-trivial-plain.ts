/**
 * Flatten Hygraph trivial Slate (paragraph-only) into plain text with blank lines
 * between blocks — good enough for Markdown detection / `json{…}` repair.
 */
export function slateTrivialDocumentToPlainText(raw: unknown): string {
  if (!raw || typeof raw !== 'object') return '';
  const children = (raw as { children?: unknown }).children;
  if (!Array.isArray(children)) return '';

  const blocks: string[] = [];
  for (const node of children) {
    if (!node || typeof node !== 'object') continue;
    const nc = (node as { children?: unknown }).children;
    if (!Array.isArray(nc)) continue;
    const line = nc
      .map((c) => {
        if (!c || typeof c !== 'object') return '';
        const t = (c as { text?: unknown }).text;
        return typeof t === 'string' ? t : '';
      })
      .join('');
    blocks.push(line);
  }
  return blocks.join('\n\n');
}
