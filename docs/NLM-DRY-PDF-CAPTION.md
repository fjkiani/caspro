# NotebookLM DRY PDF + caption shell

See also `/opt/cursor/artifacts/NLM-DRY-PDF-CAPTION.md` on agent runs.

## Shell

```
sticky AUDIO (always visible when audioUrl set)
thin chapters: Deck | Infographic | Ask
MAIN Deck: PDF page N + caption underneath
```

## Caption pairing

`src/lib/blog/pair-slides-with-captions.ts` → `pairSlidesWithCaptions`

1. Report sections (headings / paragraphs)
2. Else FAQ
3. Else flashcards
4. Else mind-map labels

Then 1:1 if counts match; else pad or even-merge into `pageCount` buckets.

## Gutted from this surface

- Siloed Read / Listen / See tabs
- Quiz UI (`quizJson` remains in Hygraph / adapters)

## Preview

https://deploy-preview-7--crispro.netlify.app/research/blog/nlm-python-datatypes-e2e/
