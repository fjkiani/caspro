# NotebookLM Infographic + Ask LLM

**PR:** https://github.com/fjkiani/caspro/pull/7  
**Branch:** `cursor/nlm-book-tabs-plan-1195`  
**Commits:** `b848159` (infographic + ask), `11424b8` (nested mind-map normalize)  
**Post:** `nlm-python-datatypes-e2e`  
**Preview:** https://deploy-preview-7--crispro.netlify.app/research/blog/nlm-python-datatypes-e2e/

## What was produced

### Infographic (derive-first)
- Pure synthesizer: `synthesizeNotebookInfographic(bundle)` → hierarchy + metrics + process + key facts
- Renderer: `BlogNotebookInfographic` — one composition (not 4 stacked widgets)
- Mind maps: supports flat `{root,nodes}` **and** nested `{name,children}` (live Hygraph)
- **No new Hygraph field** — reuse `mindMapJson` / `dataTableCsv` / `faqJson` / flashcards

### Ask (grounded LLM)
- Client: `BlogNotebookAsk` — chat + FAQ suggestion chips
- Context: `buildNotebookAskContext` (report + captions + FAQ + CSV + mind map + flashcards)
- API: `POST /api/notebook/ask/` — Gemini → OpenAI → Anthropic (same pattern as `/api/docs/chat`)
- Without keys: FAQ fuzzy match (`mode: faq`) or clear empty-state naming env vars
- No zeta-tech ask proxy (NLM `ask` stays publish-side FAQ)

## Local CDP proof (2026-11-27)

Against `http://127.0.0.1:3017/research/blog/nlm-python-datatypes-e2e/`:

| Check | Result |
|---|---|
| chapters Deck \| Infographic \| Ask | ✅ |
| sticky audio + htmlLock | ✅ |
| Infographic · derived + 6 themes + metrics + key facts | ✅ |
| Nested mind hierarchy (Core Workflow → Input/Process/Output, …) | ✅ |
| Ask chat input + send + suggestions | ✅ |
| FAQ-grounded answer (`mode: faq`) without LLM keys | ✅ |

Screenshots:
- `/opt/cursor/artifacts/nlm-ia-infographic.png`
- `/opt/cursor/artifacts/nlm-ia-ask.png`
- `/opt/cursor/artifacts/nlm-ia-proof.json`

## Env vars (preview / prod)

| Var | Role |
|---|---|
| `GEMINI_API_KEY` | Preferred |
| `OPENAI_API_KEY` | Fallback |
| `ANTHROPIC_API_KEY` | Fallback |

## Gaps

- NotebookLM Studio **infographic image** generate type not wired in portal
- No streaming Ask responses
- Flashcards in Hygraph sometimes store `{text}` objects — sideText hardened; full re-publish optional
- Netlify DP7 rebuild in progress after `11424b8`
