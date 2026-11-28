# NotebookLM → Hygraph → Book-Tabs Blog UX

**Status:** Plan (research complete; UI shell not built yet)  
**Repos:** caspro (`/agent/repos/caspro`), zeta-tech portal (`/workspace`)  
**Proven E2E:** `python-datatypes-90150c` → Hygraph `nlm-python-datatypes-e2e`  
**Preview:** https://deploy-preview-6--crispro.netlify.app/research/blog/nlm-python-datatypes-e2e/

---

## 1. Content matrix

NotebookLM CLI generate surface (`notebooklm-py` 0.8.6, `generate_cmd.py`):  
`audio | video | slide-deck | quiz | flashcards | infographic | data-table | mind-map | report`  
Plus non-generate chat: `notebooklm ask … --json` → FAQ pack.

| Generate / source | CLI | Download format | Portal wired? | Hygraph target | UI tab | BlogNotebookStudy today |
|---|---|---|---|---|---|---|
| Audio overview | `generate audio` | `audio.mp3` (m4a also) | ✅ | `NotebookBundle.audioUrl` (STRING, public HTTPS) | **Listen** | ✅ `<audio>` |
| Slide deck | `generate slide-deck` | `slides.pdf` | ✅ | `NotebookBundle.slidePdf` (Asset) | **See** | ⚠️ raw `<iframe>` (should use `BlogPdfPager`) |
| Mind map | `generate mind-map` | `mindMap.json` | ✅ | `NotebookBundle.mindMapJson` | **Explore** | ✅ `BlogNotebookMindMap` |
| Data table | `generate data-table` | `data.csv` | ✅ (fragile) | `NotebookBundle.dataTableCsv` | **Explore** | ✅ `BlogNotebookDataTable` |
| Quiz | `generate quiz` | `quiz.json` | ✅ | `NotebookBundle.quizJson` | **Study** | ✅ `BlogNotebookQuiz` |
| Flashcards | `generate flashcards` | `flashcards.json` | ✅ | `NotebookBundle.flashcardsJson` | **Study** | ✅ `BlogNotebookFlashcards` |
| Ask → FAQ | `ask --json` (batched) | `faq.json` | ⚠️ E2E scripts, not portal TYPE_TO_CLI | `NotebookBundle.faqJson` | **Ask** | ✅ FAQ `<dl>` |
| Report blog-post | `generate report --format blog-post` | `report.md` | ⚠️ publish path only | `Post.content` (Slate via `markdownToSlate`) | **Read** | ❌ lives in page body *above* study pack (scroll) |
| Report study-guide / briefing-doc | `generate report --format study-guide\|briefing-doc` | `.md` | ❌ | Optional `Post.content` or new field | **Read** (alt) | ❌ |
| Video overview | `generate video` | video file | ❌ | *gap* — need Asset / URL field | **See** (Watch) | ❌ |
| Infographic | `generate infographic` | image | ❌ | *gap* — Asset on bundle or Post | **See** | ❌ |

### Gaps vs consumption

- **Read is not a study tab** — report markdown becomes `Post.content` and the page still scrolls: hero → excerpt → body → `BlogNotebookStudy` stacked sections.
- **See uses iframe**, not `BlogPdfPager` (page-turn / keyboard / fullscreen already exist).
- **Study flashcards are a grid**, not one-card-per-page book UX.
- **Portal `TYPE_TO_CLI`** in `portal/app/lib/notebooklm.js` only: `slideDeck, quiz, flashcards, audio, mindMap, dataTable` — missing `report`, `video`, `infographic`; FAQ via `ask` not a generate type.
- **data-table** often `INVALID_ARGUMENT` on 0.8.6; ask-derived CSV/table fallback works (known lesson).
- **Local `audio.mp3` / `slides.pdf` are not public** — Hygraph needs `audioUrl` / `createAsset(uploadUrl:)` pointing at HTTPS (graphassets / Netlify / CDN). googleusercontent URLs are not usable for readers.

### Artifact filenames (publisher contract)

Under `--artifacts <dir>` (`tools/publishNotebookToBlog.mjs`):

```
quiz.json  flashcards.json  mindMap.json  data.csv
slides.pdf  audio.mp3  report.md  faq.json
```

---

## 2. Existing UI reuse map

| Component | Path | Why reuse | Fit for no-scroll book |
|---|---|---|---|
| **BlogNotebookStudy** | `src/components/blog/BlogNotebookStudy.tsx` | Already maps Listen/See/Explore/Study/Ask; filters empty sections | **Refactor target** — today anchor + vertical stack (`my-12 space-y-10`) forces page scroll |
| **BlogPdfPager** | `src/components/blog/BlogPdfPager.tsx` | PDF page turn, ←/→, fullscreen, `100dvh` expand | **Primary See pane** (replace iframe) |
| **DynamicDeckViewer** | `src/components/media/DynamicDeckViewer.tsx` | Keyboard/fullscreen slide chrome; `embedded` mode | Only for **registry React decks**, not NLM PDF |
| **DeckViewerPage (src2)** | `src/src2/pages/DeckViewerPage.tsx` | Touch swipe, cinematic `h-screen`, click thirds | **Pattern source** for tab/page swipe gestures |
| **CustomDeckViewer** | `src/src2/components/deck/CustomDeckViewer.tsx` | `fixed inset-0` fullscreen shell | Overlay / immersive mode |
| **TabbedContent** | `src/components/ui/TabbedContent.tsx` | Button tabs + `AnimatePresence` pane swap | Lightweight tab chrome for study shell |
| **TabbedInterface** | `src/components/shared/TabbedInterface.tsx` | Sidebar section nav | **Avoid as-is** — scroll-spy into long page (opposite of book) |
| **DeckViewer (decks)** | `src/components/decks/DeckViewer.tsx` | Fullscreen + arrow keys | Inspiration for Study card pager |
| **ManuscriptDetailChrome** | `src/app/manuscripts/ManuscriptDetailChrome.tsx` | Research chrome only | Not a reader — skip for book UX |
| **Blog post page** | `src/app/blog/post/[slug]/page.tsx` (+ research re-export) | Mounts body + `BlogNotebookStudy` | Must become **single viewport shell** when bundle present |
| **Adapters** | `src/lib/blog/notebooklm-adapters.ts` | Normalize JSON → quiz/flashcards/mindmap/FAQ | Keep; extend if video/infographic |
| **Publisher** | `tools/publishNotebookToBlog.mjs` | Chunked Hygraph upserts (payload limit) | Keep; call from portal after generate |
| **Schema setup** | `tools/setup-hygraph-notebook-bundle.mjs` | NotebookBundle fields | Extend for video/infographic (P2) |

**Verdict:** Do **not** invent a new BookReader. Refactor `BlogNotebookStudy` into a **viewport book shell** using `TabbedContent`-style tabs + `BlogPdfPager` + swipe pattern from `DeckViewerPage`.

---

## 3. Target UX (one viewport / book tabs)

### Layout contract

When `Post.notebookBundle` has study content:

```
┌─────────────────────────────────────────────────────────┐
│  Title (compact) · back to blog                         │  ~56px
├─────────────────────────────────────────────────────────┤
│  [Read] [Listen] [See] [Explore] [Study] [Ask]  (± gen) │  tabs
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ACTIVE TAB PANE — fills remaining viewport            │
│   (internal overflow-y-auto ONLY inside pane if needed) │
│                                                         │
│   ← swipe / →  optional between tabs                    │
└─────────────────────────────────────────────────────────┘
```

Rules:

1. **No forced document scroll** for the NLM experience — `h-[100dvh]` (minus site nav) + `overflow-hidden` on shell.
2. **Tabs hide when empty**; optional “Generate” affordance on empty tabs (on-demand).
3. **Read** = `Post.content` / report (markdown→Slate already published).
4. **Listen** = audio player (full width, no stacked sections).
5. **See** = `BlogPdfPager` for `slidePdf`; later video/infographic sub-tabs.
6. **Explore** = mind map and/or table (sub-toggle if both).
7. **Study** = quiz **or** flashcards as **one item per “page”** (not grids); arrows + swipe.
8. **Ask** = FAQ list (pane-internal scroll OK) + future live ask.

URL: `#read|#listen|#see|…` or `?tab=` for shareable chapter without scrolling.

Classic long-form posts **without** a bundle keep today’s scroll article layout.

### Tab ← → artifact mapping (product language)

| Tab | Artifacts |
|---|---|
| Read | `report.md` → `Post.content` |
| Listen | `audio.mp3` → `audioUrl` |
| See | `slides.pdf` → `slidePdf`; later video / infographic |
| Explore | `mindMap.json`, `data.csv` |
| Study | `quiz.json`, `flashcards.json` |
| Ask | `faq.json`; later live `ask` |

---

## 4. End-to-end on-demand workflow

```
┌──────────────┐   sources / notebookId    ┌─────────────────────────────┐
│  Operator /  │ ─────────────────────────▶│  zeta-tech portal            │
│  Caspro CTA  │   POST generate types     │  /api/lessons/[id]/generate │
└──────────────┘                           │  + new /api/nlm/blog-pack    │
                                           └──────────────┬──────────────┘
                                                          │
                    NOTEBOOKLM_MASTER_TOKEN_JSON          │
                    NOTEBOOKLM_ACCOUNT_EMAIL              ▼
                    profile: agent-cloud         ┌─────────────────┐
                    (skip AUTH_JSON >4096)      │ notebooklm.sh    │
                                                │ generate+download│
                                                └────────┬────────┘
                                                         │ artifacts/<id>/
                                                         ▼
                                           ┌─────────────────────────────┐
                                           │ Host binaries (mp3/pdf)     │
                                           │ → public HTTPS              │
                                           │ Hygraph Asset uploadUrl OR  │
                                           │ portal/public + CDN         │
                                           └──────────────┬──────────────┘
                                                          │
                                                          ▼
                                           ┌─────────────────────────────┐
                                           │ caspro                       │
                                           │ publishNotebookToBlog.mjs    │
                                           │ chunked NotebookBundle+Post  │
                                           └──────────────┬──────────────┘
                                                          │
                                                          ▼
                                           ┌─────────────────────────────┐
                                           │ Caspro /research/blog/[slug] │
                                           │ BlogNotebookBookShell (tabs) │
                                           │ revalidate / ISR             │
                                           └─────────────────────────────┘
```

### Steps (concrete)

1. **Auth (fresh Cloud Agent / Runtime secrets only)**  
   - Secrets: `NOTEBOOKLM_MASTER_TOKEN_JSON`, `NOTEBOOKLM_ACCOUNT_EMAIL`  
   - Profile: `agent-cloud` via `portal/app/lib/notebooklm.js` + `scripts/notebooklm-py/bootstrap-master-token.sh`  
   - Existing agents started pre-inject cannot generate — spawn fresh.

2. **Generate on demand**  
   - Extend portal generate to accept pack: `{ types: ['report','quiz',…], format overrides }`  
   - Wire missing CLI: `report` (`--format blog-post`), optionally `video` / `infographic`  
   - FAQ: N questions via `notebooklm ask … --json` → assemble `faq.json`  
   - Cache: skip regenerate if artifact exists & `bytes >= MIN_ARTIFACT_BYTES`  
   - data-table: try generate; on `INVALID_ARGUMENT`, ask-fallback to CSV text

3. **Upload public assets**  
   - `slides.pdf` / `audio.mp3` must leave local disk  
   - Preferred: upload to host that yields HTTPS → `createAsset(data: { uploadUrl })` in publisher  
   - Store Asset URL on `slidePdf`; string URL on `audioUrl`  
   - Reject googleusercontent / stub audio (&lt;1KB)

4. **Hygraph write**  
   - `node tools/publishNotebookToBlog.mjs --artifacts … --slug … --title … --audio-url … --slides-upload-url …`  
   - Already: shell create → patch JSON fields one-by-one (payload size)  
   - `report.md` → `Post.content`; `faq.json` → `faqJson`; connect `notebookBundle`

5. **Frontend render**  
   - `getPostDetails` already merges `notebookBundle` (`src/services/index.js`)  
   - Book shell reads normalized bundle + post content  
   - Optional: `POST /api/revalidate?slug=` after publish

### API / route sketch

```
# zeta-tech (new)
POST /api/nlm/blog-pack
  body: {
    notebookId?: string,
    sources?: string[],      # create notebook if needed
    slug: string,
    title: string,
    types: ('report'|'audio'|'slideDeck'|'quiz'|'flashcards'|'mindMap'|'dataTable'|'faq')[],
    publish?: boolean
  }
  → { slug, notebookId, artifactsDir, published: { postId, bundleId }, urls }

# caspro (optional thin proxy)
POST /api/research/nlm/ensure-tab
  body: { slug, tab: 'listen'|'see'|… }
  → triggers portal pack for missing artifact only; returns updated field presence
```

Auth constraints: server-only; never expose master token to browser. Public readers only hit Hygraph PUBLISHED content + CDN asset URLs.

---

## 5. Implementation phases

### P0 — Book shell (frontend only, real content)

**Goal:** NLM posts open as tabs/book; no stacked scroll of Listen→Ask.

| Touch | Change |
|---|---|
| `src/components/blog/BlogNotebookStudy.tsx` | Convert to controlled tabs; one pane; `h` fills viewport; swipe optional |
| New thin helper (optional) `src/components/blog/BlogNotebookBookShell.tsx` | Shell + tab state + hash sync; keep study children |
| `src/app/blog/post/[slug]/page.tsx` | If bundle: compact chrome + shell owning Read+study tabs; suppress duplicate long scroll stack |
| See pane | Swap iframe → `BlogPdfPager` |
| Study pane | Prefer single-card flashcard pager (reuse flip from `BlogNotebookFlashcards`) |

**Out of P0:** generate API, video/infographic schema.

### P1 — On-demand generate → Hygraph → live tabs

| Touch | Change |
|---|---|
| `portal/app/lib/notebooklm.js` | Add `report` (+ ask FAQ helper) to `TYPE_TO_CLI` / download; prompts for report |
| `portal/app/api/lessons/[id]/generate/route.js` or new `portal/app/api/nlm/blog-pack/route.js` | Pack orchestration + cache |
| Asset hosting | Script or route: put mp3/pdf on public HTTPS before publish |
| `tools/publishNotebookToBlog.mjs` | Call from portal after pack; keep chunking |
| Empty-tab CTA | “Generate Listen” → P1 API → revalidate |

### P2 — Rich media + polish

| Touch | Change |
|---|---|
| Hygraph | `videoUrl` / `infographic` Asset fields via `setup-hygraph-notebook-bundle.mjs` |
| Portal | wire `video`, `infographic` generate+download |
| UI | See submodes; Study quiz one-question pages; live Ask |
| CDN | Durable public storage (not only ephemeral portal disk) |

**No fake unit tests** — verify with Hygraph GraphQL + deploy preview / local page like E2E pack.

---

## 6. Open risks

| Risk | Detail | Mitigation |
|---|---|---|
| **Hygraph payload size** | Full-pack JSON mutations hit “technical request size limit” | Keep chunked field patches in `publishNotebookToBlog.mjs` |
| **data-table INVALID_ARGUMENT** | notebooklm-py 0.8.6 flaky without strong instructions | Always pass prompt; ask→CSV fallback |
| **Public CDN for mp3/pdf** | Local artifacts + NLM googleusercontent are not browser-safe | Hygraph Asset `uploadUrl` or Netlify/public CDN before publish |
| **Auth only on fresh agents** | Runtime secrets inject at boot | Document: generate jobs need new agent; `agent-cloud` profile |
| **AUTH_JSON 4096 limit** | Cursor secret max | `NOTEBOOKLM_MASTER_TOKEN_JSON` only |
| **Audio stubs** | &lt;1KB “success” | `MIN_ARTIFACT_BYTES.audio = 1024` already rejects |
| **Long report in Read tab** | Still needs pane scroll | Pane-local `overflow-y-auto`; not document scroll |
| **DynamicDeckViewer ≠ NLM PDF** | Registry decks only | Never route NLM slides through deck registry |
| **Quota / Pro** | Audio/video long-running | Timeouts (audio 1200s); usage check before pack |

---

## 7. File checklist (quick)

**Caspro**

- `src/components/blog/BlogNotebookStudy.tsx` ← primary UX change  
- `src/components/blog/BlogPdfPager.tsx` ← See  
- `src/components/blog/BlogNotebook{Quiz,Flashcards,MindMap,DataTable}.tsx`  
- `src/lib/blog/notebooklm-adapters.ts`  
- `src/app/blog/post/[slug]/page.tsx`  
- `src/services/index.js` (bundle query — already OK)  
- `tools/publishNotebookToBlog.mjs`  
- `tools/setup-hygraph-notebook-bundle.mjs`  
- `docs/notebooklm-blog-bundle.md`

**zeta-tech**

- `portal/app/lib/notebooklm.js`  
- `portal/app/api/lessons/[id]/generate/route.js`  
- `portal/scripts/generate-all.js`  
- `scripts/notebooklm-py/notebooklm.sh`  
- `scripts/notebooklm-py/bootstrap-master-token.sh`

---

## 8. Recommended next commit sequence

1. **P0 PR (caspro):** Book-tab shell + `BlogPdfPager` on See; feature-flag or detect `notebookBundle`.  
2. **P1 PR (zeta-tech + caspro):** `blog-pack` API + asset upload + publish hook.  
3. **P2:** video/infographic schema + CDN hardening.

Do not block P0 on generate — proven pack `nlm-python-datatypes-e2e` is enough to ship tab UX against real Hygraph content.
