# NLM UX Audit — blunt diagnosis (2026-11-27)

Live post: `nlm-python-datatypes-e2e`  
Previews: deploy-preview-7 / deploy-preview-6 `--crispro.netlify.app`

## Verdict

Yes — prior ship was incomplete. Book-tab chrome existed in code, but **Listen/See were empty in Hygraph** and **document scroll was still forced by layout stacking**. That reads as slop.

## Missing deck + audio

**Cause (confirmed via Content API):**

```
notebookBundle.audioUrl = null
notebookBundle.slidePdf = null
```

Quiz / flashcards / mindMap / CSV / FAQ / report were published earlier. Audio + slides were **skipped** because `publishNotebookToBlog` only accepted public `uploadUrl` / `audioUrl` strings — local `portal/public/artifacts/.../audio.mp3` (~16MB) and `slides.pdf` (~15MB) are not HTTPS, so createAsset never ran.

UI consequence: `BlogNotebookStudy` filters tabs by `hasAudio` / `hasPdf`, so **Listen and See never appeared**. Excerpt text mentioning “Listen → Explore…” made it look like the feature existed.

**Fix applied (Hygraph, live):**

| Field | Value |
|-------|--------|
| `audioUrl` | `https://us-west-2.graphassets.com/.../cmwzks15z2vz808n1mqoi3ky7` (HTTP 200, `audio/mpeg`, 16 145 575 B) |
| `slidePdf` | `https://us-west-2.graphassets.com/.../cmwzkqu362v6508n1zhb3q90c` (HTTP 200, `application/pdf`, 14 790 652 B) |

Uploaded via Hygraph `createAsset(fileName)` → S3 `requestPostData` POST → `publishAsset` → connect / set on NotebookBundle → `publishNotebookBundle`.

Publisher now also auto-uploads local `audio.mp3` / `slides.pdf` from `--artifacts` (`tools/publishNotebookToBlog.mjs`).

## Why the page still scrolled

Book shell used `h-[calc(100dvh-3.5rem)] overflow-hidden`, but the **document** still grew past the viewport:

1. `research/blog/layout.tsx`: `pt-14` + **`min-h-[100dvh]`**
2. **`ResearchBlogPostChrome`** sticky breadcrumb (`py-4 md:py-5`) on every post
3. Book page’s **own** back-link bar above the shell
4. Shell sized to nearly full `dvh` **on top of** (1)+(2)+(3)

Net height ≈ `100dvh + ResearchChrome + back bar` → browser page scroll. Pane-only scroll was real; **document scroll was also real**. That is the user’s complaint.

Preview HTML already contained `100dvh-3.5rem` — this was not “old build only.” Old build / DP6 may still look worse, but DP7 still scrolled for the stack reason above.

## Scroll fix (caspro)

- Book shell is **`fixed inset-x-0 top-14 bottom-0`** (under `ZetaNavbar`)
- `html.nlm-book-lock` → `overflow: hidden` on html/body; hide `[data-research-chrome]`
- Drop layout `min-h-[100dvh]`; remove duplicate page back bar (Blog link lives in study header)
- Only the study pane uses `overflow-y-auto`

## Remaining gaps

- Netlify preview must rebuild from pushed branch before UI lock is live; Hygraph media is already live for any build that reads Content API.
- Audio bytes are AAC/M4A container labeled `.mp3` (NotebookLM quirk) — most browsers play it; if not, remux/rename.
- Classic (non-bundle) posts still use ResearchChrome + normal page scroll — intentional.
- No zeta-tech PR required for this fix (artifacts already on e2e branch; CDN is graphassets).

## Proof checklist

- [x] GraphQL PUBLISHED: `audioUrl` + `slidePdf.url` non-null
- [x] HEAD/GET media URLs → HTTP 200
- [ ] After Netlify redeploy: tabs show Listen + See; document does not scroll; pane scrolls on Read/Study
