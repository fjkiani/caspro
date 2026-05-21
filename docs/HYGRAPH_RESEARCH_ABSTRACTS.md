# Hygraph: Research Abstracts

Conference abstracts on `/research/?tab=abstracts` — each entry has **image**, **body text**, and **external link**.

## Model: `ResearchAbstract`

| Field | Type | Notes |
|-------|------|--------|
| `title` | String | Title (display field) |
| `slug` | Slug | Unique, URL-safe |
| `body` | Rich text | Authors + venue (HTML ok) |
| `externalLink` | String | Scholar / journal URL |
| `image` | Asset | e.g. AACR logo |
| `authorLine` | String | e.g. `F Kiani` |
| `venue` | String | Journal + supplement |
| `year` | Int | Conference year |
| `order` | Int | Sort order (asc) |
| `publishedAt` | DateTime | Optional |

GraphQL plural: `researchAbstracts`.

## Setup

1. **Create schema** (Management API or Studio):
   ```bash
   npx tsx tools/setup-hygraph-research-abstracts.ts
   ```
   If Management API fails, create the model manually in Hygraph Studio using the table above.

2. **Scrape Google Scholar** (Fahad Kiani profile):
   ```bash
   node tools/scrape-google-scholar-abstracts.mjs
   ```
   Writes `src/data/research-abstracts-seed.json`.

3. **Seed Hygraph**:
   ```bash
   npx tsx tools/seed-research-abstracts.ts
   ```

4. **App**: `getResearchAbstracts()` queries Hygraph; falls back to `research-abstracts-seed.json` when empty or on error.

## Re-scrape

```bash
node tools/scrape-google-scholar-abstracts.mjs
# Re-run seed only for new slugs (existing slugs are skipped)
npx tsx tools/seed-research-abstracts.ts
```
