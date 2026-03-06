# Use Case Section Plan

## Goal
Transform the media-style page (e.g. `/media/glassbox-ai/`) into a **Use Case** section: remove tabs, support rich text and images from Hygraph, and present a compelling narrative for how we solved a problem (scientific/engineering focus).

## 1. Hygraph schema (existing UseCase model)

The MCP `get_project_info` shows an existing **UseCase** model with:

| Field | Type | Purpose |
|-------|------|--------|
| title | STRING | Use case title |
| description | STRING | Short description |
| slug | STRING | URL slug |
| clientChallenge | RICHTEXT | The problem / client challenge |
| beforeState | RICHTEXT | State before our solution |
| jediApproach | RICHTEXT | Our approach (JEDI = solution method) |
| outcomes | RICHTEXT | Key outcomes |
| resultsHeadline | STRING | Results headline |
| resultsNarrative | RICHTEXT | Results story |
| architectureNarrative | RICHTEXT | Architecture / system design |
| technologyNarrative | RICHTEXT | Tech stack / methods |
| capabilityNarrative | RICHTEXT | Capabilities used |
| prerequisites | RICHTEXT | Prerequisites |
| risksAndMitigations | RICHTEXT | Risks & mitigations |
| testScenarios | RICHTEXT | Test scenarios |
| heroImage | Asset | Hero image |
| thumbnail | Asset | Thumbnail |
| pdfDeck | Asset | PDF / deck attachment |
| demoVideoUrl | STRING | Demo video URL |

**Rich text**: Request `{ html }` for simple rendering, or `{ html, raw }` to use `@graphcms/rich-text-react-renderer` for embedded images and blocks.

## 2. Route and naming

- **Section name**: "Media" → **"Use cases"**
- **Listing**: `/use-case` (or `/use-cases` to match existing ROUTES.USE_CASES)
- **Detail**: `/use-case/[slug]` (e.g. `/use-case/glassbox-ai`)
- **Backward compatibility**: Optional redirect `/media/glassbox-ai` → `/use-case/glassbox-ai` when a UseCase with slug `glassbox-ai` exists.

## 3. Page layout (no tabs)

Single scrollable page:

1. **Hero**
   - Hero image (full-width or constrained)
   - Title
   - Results headline or description
   - Optional: CTA (e.g. "Request demo")

2. **Optional media block**
   - One prominent block: either **demo video** (embed from demoVideoUrl) or **PDF/deck** link
   - No tab bar; choose one primary asset (video preferred if both exist)

3. **Narrative sections** (only render if content exists)
   - Client Challenge
   - Before State
   - Our Approach (JEDI Approach)
   - Outcomes
   - Results (headline + narrative)
   - Architecture
   - Technology & methods
   - Capabilities
   - Prerequisites
   - Risks & mitigations
   - Test scenarios

4. **Attachments**
   - PDF/deck download link if not shown inline

Each section: heading + rich text (and embedded images if using raw + RichText renderer).

## 4. Rich text and formats

- **Option A**: Request `html` for each RICHTEXT field; render with `dangerouslySetInnerHTML` and shared prose classes. Simple, no embedded assets in body.
- **Option B**: Request `raw` for RICHTEXT; render with `@graphcms/rich-text-react-renderer` so embedded images and blocks render correctly. Requires querying assets inside rich text.

Recommendation: Start with **Option A** (html) for speed; add **Option B** (raw + renderer) when you need inline images in the body. Hygraph RICHTEXT often returns `html` with inline image URLs when assets are embedded.

## 5. Files to add/change

| Action | File |
|--------|------|
| Add | `src/lib/docs/hygraph/use-case-types.ts` – CMS UseCase type |
| Add | `src/lib/docs/hygraph/use-case-queries.ts` – getUseCaseBySlug, getAllUseCases |
| Add | `src/app/use-case/[slug]/page.tsx` – detail page |
| Add | `src/app/use-case/page.tsx` – listing page |
| Add | `src/components/use-case/UseCaseViewer.tsx` – single-page viewer (no tabs) |
| Add | `src/components/use-case/UseCaseRichSection.tsx` – section + rich text |
| Update | `src/constants/routes.ts` – ensure USE_CASE or use-cases route |
| Update | Navbar/Footer – "Media" → "Use cases", link to /use-case |
| Optional | `src/app/media/[slug]/page.tsx` – redirect to /use-case/[slug] when UseCase exists |

## 6. Making it compelling (scientific/engineering)

- **Structure**: Problem → Before state → Our approach → Outcomes → Results. Mirrors a case study.
- **Tone**: Clear, evidence-oriented (metrics, methods), avoid marketing fluff.
- **Sections**: Use headings that match the Hygraph fields (Client Challenge, JEDI Approach, etc.) so content authors can fill them in CMS.
- **Media**: One hero image, one primary video or PDF, and optional PDF download. No tab switching.
- **Future**: If Hygraph supports a "blocks" or "sections" model (e.g. repeatable sections with title + rich text + image), we can add a flexible section loop later.

## 7. MCP schema usage

- **Reading**: Use `list_entities` / `get_entities_by_id` or direct GraphQL via `execute_graphql` to fetch UseCase by slug. For app code, use the new `use-case-queries.ts` that calls the same Hygraph client as media.
- **Writing**: Use MCP `create_entry` / `update_entry` for UseCase when creating or editing use cases from Cursor. Use `get_entity_schema("UseCase")` to get exact field names and formats (when not rate-limited).
