# NLM Real Infographic — blunt status

**Date:** 2026-11-28  
**Caspro PR:** https://github.com/fjkiani/caspro/pull/7 (`cursor/nlm-book-tabs-plan-1195`)  
**Zeta-tech branch:** `cursor/nlm-real-infographic-1195`  
**Notebook UUID:** `90150c19-4744-4439-a4f2-37503402afaa` (folder `python-datatypes-90150c`)

## What was sandbagged before

Prior “Infographic” chapter was a **React collage**:
- `synthesizeNotebookInfographic(bundle)` mashed `mindMapJson` + `dataTableCsv` + FAQ + flashcards
- `BlogNotebookInfographic` drew hierarchy / metrics / process / key-facts widgets
- Banner literally said **“Infographic · derived”**
- No NotebookLM Studio image, no Hygraph Asset, no PNG bytes

That path is **gutted** (file deleted; renderer rewritten).

## Exact NLM API / CLI (production path)

```bash
notebooklm -p agent-cloud use 90150c19-4744-4439-a4f2-37503402afaa
notebooklm -p agent-cloud generate infographic \
  "One-page visual infographic for Python Data Types…" \
  --orientation landscape --detail detailed --style professional \
  --wait --retry 2 --timeout 600
notebooklm -p agent-cloud download infographic --latest --force \
  portal/public/artifacts/python-datatypes-90150c/infographic.png
```

Portal wrappers:
- `portal/app/lib/notebooklm.js` — `TYPE_TO_CLI.infographic`, prompt, download → PNG
- `portal/scripts/generate-infographic.js` — one-shot generate+download
- `portal/app/api/nlm/blog-pack` — includes `infographic` → `infographic.png`

Publish:
- `tools/publishNotebookToBlog.mjs` uploads `infographic.png` → Asset connect + `infographicUrl`
- Hygraph fields (LIVE): `NotebookBundle.infographic` (Asset), `infographicUrl` (STRING)
  - migration via `tools/setup-hygraph-notebook-infographic.mjs`

UI:
- Infographic chapter renders Asset/URL full-bleed (`<img>` or PDF iframe)
- Empty only: **“Infographic not generated yet”**
- Sticky audio + Deck PDF+caption + Ask LLM unchanged

## Auth blocker on THIS VM (honest)

This pod is tree-root `bc-01a21503…` (pre–secret-inject).  
`NOTEBOOKLM_MASTER_TOKEN_JSON` length = **0**. Profiles `~/.notebooklm/profiles/agent-cloud/` empty.

Secrets live on Cloud Agent env `f7fc3006-e926-11f1-9535-02900022bdcd` but do **not** inject into this pre-existing pod.  
Proven generates were on fresh pods (`bc-d34e04a6`, `bc-2d8d695f`).

**Requested:** env setup action to add `NOTEBOOKLM_MASTER_TOKEN_JSON` (and optional account email).

**To finish generate+publish on a post-inject pod:**

```bash
./scripts/notebooklm-py/bootstrap-master-token.sh
cd portal && node scripts/generate-infographic.js \
  --notebook 90150c19-4744-4439-a4f2-37503402afaa \
  --out public/artifacts/python-datatypes-90150c
# then from caspro:
node tools/publishNotebookToBlog.mjs \
  --artifacts /workspace/portal/public/artifacts/python-datatypes-90150c \
  --slug nlm-python-datatypes-e2e \
  --title "NotebookLM: Python Data Types (E2E)"
curl -I "$INFOGRAPHIC_HTTPS_URL"   # expect 200
```

## Proof checklist

| Check | Status |
|---|---|
| Synthesize helper deleted | ✅ |
| Collage UI gone | ✅ |
| Hygraph `infographic` + `infographicUrl` fields | ✅ LIVE |
| Portal generate/download wired | ✅ |
| Publish uploads PNG | ✅ code |
| Artifact PNG non-trivial bytes | ⛔ blocked — no NLM auth on this pod |
| Hygraph public HTTPS 200 | ⛔ waiting on generate |
| Screenshot `/opt/cursor/artifacts/nlm-real-infographic.png` | ✅ empty state after gut (collage gone; “Infographic not generated yet”) |

## Code deleted / rewritten

**Deleted:** `src/lib/blog/synthesize-notebook-infographic.ts`  
**Rewritten:** `src/components/blog/BlogNotebookInfographic.tsx` (Asset only)  
**Updated:** `BlogNotebookStudy.tsx`, `notebooklm-adapters.ts`, `types/blog.ts`, `services/index.js`, `publishNotebookToBlog.mjs`
