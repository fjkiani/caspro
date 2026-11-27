# NotebookLM Infographic + Ask LLM

**Branch:** `cursor/nlm-book-tabs-plan-1195` (PR #7)  
**Post:** `nlm-python-datatypes-e2e`

## Decisions

| Topic | Choice | Why |
|---|---|---|
| Infographic storage | **Derive client-side** from `mindMapJson` + `dataTableCsv` + `faqJson` + flashcards | DRY with existing Hygraph fields; no new `infographicJson` / Asset. NLM `generate infographic` (image) stays optional future upload. |
| Ask grounding | Caspro `/api/notebook/ask` RAG-lite | Same Gemini → OpenAI → Anthropic pattern as `/api/docs/chat`. Context built from report + FAQ + captions + table + mind map. |
| Portal NLM ask | **Not required for frontend** | `notebooklm ask` remains publish-side FAQ generation (`generateFaqJson`). Headless auth must not block the book UI. |

## Architecture

```
normalizeNotebookBundle
        │
        ├─► synthesizeNotebookInfographic ──► BlogNotebookInfographic (one-pager)
        │
        └─► buildNotebookAskContext ──► BlogNotebookAsk ──► POST /api/notebook/ask
```

Chapters remain **Deck | Infographic | Ask** only. Sticky audio + viewport lock unchanged.

### Infographic model

`src/lib/blog/synthesize-notebook-infographic.ts` → `NotebookInfographicModel`:

- **Hierarchy** — mind-map root + top-level branch columns (children listed under each)
- **Metrics** — CSV rows as label/value/detail strip
- **Process** — flashcards that look like workflow steps (else concept trail)
- **Key facts** — up to 4 FAQ items integrated into the one-pager

Not a vertical dump of `MindMap` + `DataTable` + `Flashcards` widgets.

### Ask

- Client: `BlogNotebookAsk` — chat input, suggestion chips from FAQ, request/response (no streaming).
- Server: stuffs notebook context into the system prompt; answers only from that context.
- **No LLM keys:** FAQ fuzzy match if possible; otherwise clear empty-state naming `GEMINI_API_KEY` / `OPENAI_API_KEY` / `ANTHROPIC_API_KEY`.

## Env vars

| Var | Role |
|---|---|
| `GEMINI_API_KEY` | Preferred (same as docs chat) |
| `OPENAI_API_KEY` | Fallback |
| `ANTHROPIC_API_KEY` | Fallback |

Configure on Netlify / Vercel for preview + production. Local `.env.local` optional.

## Files

- `src/lib/blog/synthesize-notebook-infographic.ts`
- `src/lib/blog/notebook-ask-context.ts`
- `src/components/blog/BlogNotebookInfographic.tsx` (rewritten)
- `src/components/blog/BlogNotebookAsk.tsx` (new)
- `src/app/api/notebook/ask/route.ts` (new)
- `src/components/blog/BlogNotebookStudy.tsx` (wires both)

## Gaps

- NotebookLM Studio **infographic image** generate type not wired in portal `TYPE_TO_CLI` — image Asset path deferred.
- No streaming responses yet.
- No zeta-tech `/api/nlm/ask` proxy (frontend does not need headless NotebookLM for chat).
