/**
 * Hygraph Rich Text guards.
 *
 * Hygraph stores Rich Text as Slate JSON: a root object with a `children` array
 * (or sometimes wrapped, e.g. `{ children: [{ type: 'paragraph', children: [...] }] }`).
 * If `content.raw` is a string, it's just markdown/plain text — not Slate.
 */
export function isHygraphRichTextRaw(value: unknown): boolean {
  if (!value || typeof value !== 'object') return false;
  const children = (value as { children?: unknown }).children;
  if (!Array.isArray(children) || children.length === 0) return false;
  return true;
}

/**
 * True when a Slate document is "trivial" — i.e. only paragraphs with text nodes,
 * no headings/lists/code/etc. In that case markdown source is preferred so `##`,
 * lists, code fences from the CMS render correctly.
 */
export function isTrivialRichText(value: unknown): boolean {
  if (!isHygraphRichTextRaw(value)) return false;
  const children = (value as { children: any[] }).children;
  return children.every(
    (node) => !node || node.type === undefined || node.type === 'paragraph' || node.type === 'p'
  );
}
