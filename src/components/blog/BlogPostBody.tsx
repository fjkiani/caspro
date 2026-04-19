'use client';

import { RichText } from '@graphcms/rich-text-react-renderer';
import BlogMarkdown from '@/components/blog/BlogMarkdown';
import { isHygraphRichTextRaw, isTrivialRichText } from '@/lib/blog/rich-text-guards';
import { looksLikeMarkdown } from '@/lib/blog/markdown-heuristics';
import { normalizeBlogMarkdownSource } from '@/lib/blog/normalize-blog-markdown';
import { slateTrivialDocumentToPlainText } from '@/lib/blog/slate-trivial-plain';
import { blogRichTextRenderers } from '@/components/blog/blog-rich-text-renderers';

export interface BlogPostBodyContent {
  raw?: unknown;
  markdown?: string | null;
  text?: string | null;
}

interface BlogPostBodyProps {
  content: BlogPostBodyContent | null | undefined;
}

/**
 * Body renderer for blog posts.
 *
 * Decision order (so Markdown posts render styled and non-Markdown posts stay intact):
 *   1. If the CMS gave us a `markdown` string AND it actually looks like Markdown
 *      (or the Slate `raw` is just paragraphs of text — i.e. Slate is hiding the
 *      Markdown), render through ReactMarkdown.
 *   2. Else if `raw` is a real Slate document with structural nodes, render Slate.
 *   3. Else if `raw` is a string that looks like Markdown, render Markdown.
 *   4. Else if `text` looks like Markdown, render Markdown.
 *   5. Else render plain text with line breaks preserved (or Markdown if `json{…}` / heuristics match).
 */
export default function BlogPostBody({ content }: BlogPostBodyProps) {
  if (!content) return null;

  const raw = content.raw;
  const slateLooksRich = isHygraphRichTextRaw(raw) && !isTrivialRichText(raw);
  const markdownField =
    typeof content.markdown === 'string' && content.markdown.trim() ? content.markdown.trim() : '';
  const textField =
    typeof content.text === 'string' && content.text.trim() ? content.text.trim() : '';
  const rawString = typeof raw === 'string' && raw.trim() ? raw.trim() : '';

  if (markdownField && (looksLikeMarkdown(markdownField) || !slateLooksRich)) {
    return <BlogMarkdown source={markdownField} />;
  }

  /** Trivial Slate (paragraphs only) often hides Markdown / `json{…}` in `raw` — normalize and render as Markdown when needed. */
  if (isHygraphRichTextRaw(raw) && isTrivialRichText(raw)) {
    const trivialPlain = slateTrivialDocumentToPlainText(raw).trim();
    if (trivialPlain) {
      const normalizedTrivial = normalizeBlogMarkdownSource(trivialPlain);
      const routeMarkdown =
        looksLikeMarkdown(normalizedTrivial) ||
        looksLikeMarkdown(trivialPlain) ||
        /\bjson\s*\{/i.test(trivialPlain);
      if (routeMarkdown) {
        return <BlogMarkdown source={normalizedTrivial} />;
      }
    }
  }

  if (slateLooksRich) {
    return (
      <div className="prose-lg min-w-0 max-w-full">
        <RichText content={raw as any} renderers={blogRichTextRenderers} />
      </div>
    );
  }

  if (rawString) {
    const normRaw = normalizeBlogMarkdownSource(rawString);
    if (
      looksLikeMarkdown(normRaw) ||
      looksLikeMarkdown(rawString) ||
      /\bjson\s*\{/i.test(rawString)
    ) {
      return <BlogMarkdown source={normRaw} />;
    }
  }

  if (textField) {
    const normText = normalizeBlogMarkdownSource(textField);
    if (
      looksLikeMarkdown(normText) ||
      looksLikeMarkdown(textField) ||
      /\bjson\s*\{/i.test(textField)
    ) {
      return <BlogMarkdown source={normText} />;
    }
  }

  if (isHygraphRichTextRaw(raw)) {
    return (
      <div className="prose-lg min-w-0 max-w-full">
        <RichText content={raw as any} renderers={blogRichTextRenderers} />
      </div>
    );
  }

  const plain = rawString || textField || markdownField;
  if (!plain) return null;

  const normPlain = normalizeBlogMarkdownSource(plain);
  if (
    looksLikeMarkdown(normPlain) ||
    looksLikeMarkdown(plain) ||
    /\bjson\s*\{/i.test(plain)
  ) {
    return <BlogMarkdown source={normPlain} />;
  }

  return (
    <div className="max-w-none min-w-0 whitespace-pre-wrap break-words font-sans text-base leading-relaxed text-slate-700 dark:text-slate-300">
      {plain}
    </div>
  );
}
