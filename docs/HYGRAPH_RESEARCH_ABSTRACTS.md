# Hygraph: Conference Abstracts

Live at `/research/abstracts/` and the top-level **ABSTRACTS** navbar (dynamic dropdown via `/api/abstracts/nav`).

## Where they live in Hygraph

**Project:** main blog CMS (`HYGRAPH_ENDPOINT` / `GRAPHCMS_TOKEN`) — **not** the CrisPRO Program Hygraph project.

**Content model:** existing **`Post`** entries assigned to category **`conference-abstracts`** (“Conference Abstracts”).

**GraphQL:**

```graphql
posts(
  where: { categories_some: { slug: "conference-abstracts" } }
  orderBy: abstractOrder_ASC
) {
  slug title excerpt authorLine venueLine abstractYear abstractOrder externalLink
  content { html text }
  featuredImage { url }
}
```

Custom Post fields: `authorLine`, `venueLine`, `abstractYear`, `abstractOrder`, `externalLink`. If the Content API schema lags, the app retries a **bare** query (title/excerpt/content only) before falling back to local seed.

## App behavior

| Piece | Role |
|-------|------|
| `getResearchAbstracts()` | Hygraph posts → `ResearchAbstract[]`; `source: 'hygraph' \| 'local'` |
| `research-abstracts-fallback.ts` | Local seed when Hygraph is empty or errors |
| `isBlogArticlePost()` | Excludes `conference-abstracts` from blog listing |
| Navbar | `buildTopNavItems(feed.abstracts)` — grows as CMS adds posts |

**Verify source:** abstracts page shows a badge — **Hygraph CMS** vs **Local seed**.

## Legacy `ResearchAbstract` model

`tools/setup-hygraph-research-abstracts.ts` and `researchAbstracts` GraphQL are **not** used by the app. Prefer Post + category; seed scripts may still target the legacy model for one-off imports.

## Re-scrape / local seed

```bash
node tools/scrape-google-scholar-abstracts.mjs
# Updates src/data/research-abstracts-seed.json → fallback only
```

To publish in Hygraph: create/edit **Post** in Studio, category **Conference Abstracts**, fill custom fields and `externalLink`.

## Seed script (Posts + category)

```bash
node tools/seed-conference-abstract-posts.mjs
```

Creates category `conference-abstracts`, uploads AACR image asset, creates/publishes all rows from `src/data/research-abstracts-seed.json`. Trims trailing hyphens from slugs (Hygraph validation). Re-run is idempotent (skips slugs already in the category).

## Slide deck / PDF

Same **Post** fields as blog (`pdfDeckUrl`, `slideDeckSlug`, `pdfDeck` Asset). Optional **MediaItem** with the same slug can supply `pdfFile` / `deckSlug`.

```bash
node tools/attach-abstract-deck.mjs <abstract-slug> --pdf-url "https://..."
node tools/attach-abstract-deck.mjs <abstract-slug> --slide-deck-slug "crispro-101"
```

Fallback when Content API has not published deck fields yet: `src/data/abstract-deck-config.json`.

Front-end: `/research/abstracts/[slug]/` uses the same PDF pager and slide deck viewer as blog posts. Listing cards show **Slides** when a deck exists; **Published** links to the external citation.
