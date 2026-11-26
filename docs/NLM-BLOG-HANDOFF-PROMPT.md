# Handoff: NotebookLM → Hygraph → Caspro blog

Give the next agent this prompt:

---

Continue NotebookLM blog shipping for CrisPRO (caspro `fjkiani/caspro`, Hygraph `cm65g7pxd09kx07my82376f33` us-west-2).

## Already done
- Schema applied: model **NotebookBundle** + **Post.notebookBundle** relation.
- Category **`notebooklm-learning`** / NotebookLM Learning.
- Caspro renders `BlogNotebookStudy` on `/blog/post/[slug]` and `/research/blog/[slug]` when bundle fields present.
- Publisher: `node tools/publishNotebookToBlog.mjs` (also `publishNotebookToBlog()` export).
- Docs: `docs/notebooklm-blog-bundle.md`
- Live TEST post (keep marked TEST or unpublish when done): slug **`nlm-test-python-types-bundle`**
  - Sourced from `/workspace/portal/public/artifacts/cml7i2dbssm7707lrx9g6m66q/{quiz,flashcards,mindMap,data}.json/csv`

## NotebookBundle field apiIds
`title`, `slug`, `notebookId`, `audioUrl`, `quizJson`, `flashcardsJson`, `mindMapJson`, `dataTableCsv`, `faqJson`, `slidePdf` (Asset), reverse `post`.

## How to publish
```bash
# Auth: caspro/.env.local or /tmp/hygraph-crispro.token
node tools/publishNotebookToBlog.mjs \
  --artifacts /path/to/artifacts/<notebookId> \
  --slug my-learning-post \
  --title "Title" \
  --slides-upload-url https://public/slides.pdf \
  --audio-url https://public/audio.mp3
```
Schema migrate (idempotent only if model absent): `node tools/setup-hygraph-notebook-bundle.mjs [--dry-run]`

## Verify with real Hygraph (not unit tests)
```graphql
query {
  post(where: { slug: "nlm-test-python-types-bundle" }) {
    title stage
    categories { slug }
    notebookBundle {
      notebookId quizJson flashcardsJson mindMapJson dataTableCsv audioUrl
      slidePdf { url }
    }
  }
}
```
Then curl/open `/research/blog/nlm-test-python-types-bundle/` and confirm Study quiz + flashcards + mind map sections.

## Out of scope unless asked
Arcade LinkedIn org posting / video company-page flow. Prefer public `*.graphassets.com` Asset URLs for media (NotebookLM googleusercontent is not public).

## Next useful work
1. Wire zeta `portal/app/lib/notebooklm.js` generate → upload assets to Hygraph → call `publishNotebookToBlog`.
2. Host audio/PDF via `createAsset(uploadUrl:)` then set `audioUrl` / `slidePdf`.
3. Unpublish or delete `nlm-test-python-types-bundle` after QA.
4. Optional: FAQ `faqJson` authoring + Ask section content.

---
