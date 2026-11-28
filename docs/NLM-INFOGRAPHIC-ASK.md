# NotebookLM Infographic + Ask LLM

**PR:** https://github.com/fjkiani/caspro/pull/7  
**Branch:** `cursor/nlm-book-tabs-plan-1195`  
**Post:** `nlm-python-datatypes-e2e`  
**Preview:** https://deploy-preview-7--crispro.netlify.app/research/blog/nlm-python-datatypes-e2e/

## Infographic — REAL NotebookLM Studio PNG

**Gutted (sandbag rejected):**
- Deleted `src/lib/blog/synthesize-notebook-infographic.ts`
- Collage UI that rebranded mind-map / FAQ / metrics as “Infographic · derived”

**Production path:**
1. `notebooklm generate infographic` → `notebooklm download infographic` → `infographic.png`
2. `publishNotebookToBlog.mjs` uploads PNG → Hygraph `NotebookBundle.infographic` (Asset) + `infographicUrl`
3. Infographic chapter renders that Asset full-bleed. Missing asset → “Infographic not generated yet” only.

```bash
# zeta-tech (requires NOTEBOOKLM_MASTER_TOKEN_JSON on a post-inject pod)
cd portal && node scripts/generate-infographic.js \
  --notebook 90150c19-4744-4439-a4f2-37503402afaa \
  --out public/artifacts/python-datatypes-90150c

# caspro
node tools/publishNotebookToBlog.mjs \
  --artifacts /path/to/python-datatypes-90150c \
  --slug nlm-python-datatypes-e2e \
  --title "NotebookLM: Python Data Types (E2E)"
```

Schema migration: `tools/setup-hygraph-notebook-infographic.mjs` (fields live).

## Ask + Deck + sticky audio — unchanged

- Ask: `BlogNotebookAsk` + `POST /api/notebook/ask/`
- Deck: PDF pager + captions
- Sticky audio outside chapters
