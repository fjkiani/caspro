# NotebookLM → Hygraph → Caspro blog

## Schema (applied on project `cm65g7pxd09kx07my82376f33`)

### Model `NotebookBundle` (`NotebookBundles`)

| apiId | Type | Notes |
|---|---|---|
| `title` | STRING | required, title field |
| `slug` | STRING | required, unique |
| `notebookId` | STRING | unique; NLM / artifact folder id |
| `audioUrl` | STRING | public HTTPS for Listen |
| `quizJson` | JSON | NotebookLM `quiz.json` |
| `flashcardsJson` | JSON | NotebookLM `flashcards.json` |
| `mindMapJson` | JSON | NotebookLM `mindMap.json` |
| `dataTableCsv` | STRING | NotebookLM `data.csv` text |
| `faqJson` | JSON | optional Ask section |
| `slidePdf` | Asset | optional See / PDF |
| `post` | Post | reverse of Post.notebookBundle |

### Post

| apiId | Type |
|---|---|
| `notebookBundle` | NotebookBundle (optional, one) |

### Category

- `notebooklm-learning` / **NotebookLM Learning**

Migration script: `node tools/setup-hygraph-notebook-bundle.mjs [--dry-run]`

## Publish

```bash
node tools/publishNotebookToBlog.mjs \
  --artifacts /path/to/artifacts/<notebookId> \
  --slug my-post-slug \
  --title "My study pack" \
  [--slides-upload-url https://.../slides.pdf] \
  [--audio-url https://.../audio.mp3] \
  [--draft] [--no-media]
```

Library export: `publishNotebookToBlog(opts)` in the same file.

## Frontend

- `getPostDetails` merges `Post.notebookBundle`
- `/blog/post/[slug]` and `/research/blog/[slug]` render `BlogNotebookStudy`
  (Listen → See → Explore → Study → Ask)

## Verify (live GraphQL)

```graphql
query {
  post(where: { slug: "nlm-test-python-types-bundle" }) {
    title
    categories { slug }
    notebookBundle {
      notebookId
      quizJson
      flashcardsJson
      mindMapJson
      dataTableCsv
    }
  }
}
```

Test slug (marked TEST): `nlm-test-python-types-bundle`
