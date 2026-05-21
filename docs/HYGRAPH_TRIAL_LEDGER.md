# Hygraph — Trial Ledger & Abstracts

Decoded clinical trials live under **`/ledger/[slug]/`** (receipt UI) and **`/proof/[slug]/`** (full 8D de-risking map). Platform engines stay under **`/engine/[slug]/`** (e.g. [Target-Lock](https://crispro.ai/engine/target-lock/)).

## Wrong routes (fixed)

| Legacy URL | Correct trial ledger |
|------------|----------------------|
| `/target-validation/` | `/ledger/ceacam5/` |
| `/resistance/` | `/ledger/capri/` |
| `/moa/` | `/ledger/latify/` |

## Model: `TrialLedger` (create in Hygraph Studio)

| Field | Type | Notes |
|-------|------|--------|
| `slug` | String, unique | e.g. `ceacam5`, `latify` |
| `title` | String | Display title |
| `receiptLabel` | String | e.g. `CEACAM5` |
| `sublabel` | String | `TARGET-LOCK`, `MOA-ALIGN`, `KILL-CHAIN` |
| `previewKind` | Enum | `target-lock`, `moa-align`, `kill-chain`, `vector-map` |
| `trialId` | String | NCT id |
| `phase` | String | |
| `cancer` | String | |
| `drugLine` | String | |
| `order` | Int | Nav sort |
| `vectorJson` | String (JSON) | 8D ITT vector `{ ddr, mapk, pi3k, io, vegf, her2, efflux, rss }` |
| `responderVectorJson` | String | |
| `nonResponderVectorJson` | String | |
| `summary` | Rich text | Receipt narrative |
| `legacyRoute` | String | e.g. `/target-validation` |

Until the model exists, the app uses `src/data/trial-case-files.ts` via `src/data/trial-ledger-registry.ts`.

## Abstracts

Add enum value **`ABSTRACT`** to existing **`MediaItem.type`** (same pattern as `PDF`, `DECK`, `VIDEO`).

Query (when live):

```graphql
query Abstracts {
  mediaItems(where: { type: ABSTRACT }, orderBy: publishedAt_DESC) {
    id slug title excerpt publishedAt
  }
}
```

Research hub tab: `/research/?tab=abstracts`.

## MCP

Use **Hygraph MCP Server** → `create_entry` / `publish_entry` on `TrialLedger` after `get_entity_schema`.

Local registry GraphQL probe:

```bash
# From caspro/ with .env.local
node -e "require('dotenv').config({path:'.env.local'}); ..."
```

## App files

- `src/data/trial-ledger-registry.ts` — local SSOT + legacy redirects
- `src/lib/docs/hygraph/ledger-queries.ts` — CMS fetch + fallback
- `src/app/ledger/[trialSlug]/page.tsx` — receipt pages
- `src/components/ui/zeta-navbar/nav-items.ts` — RESEARCH / LEDGER / ENGINES dropdowns
