# Product voice — human clinical English + UI word budgets

## Mission

Public copy must read like a founder talking to a CMO — short, progressive disclosure. Science lives in **View Clinical Evidence** drawers, not heroes.

## Scope

All public pages: `/`, `/products/**`, `/tumor-board/`, `/ledger/`. No “out of scope” escape.

## Mandatory surface formula

1. Clinical mistake (plain English)
2. What CrisPRO sees (human clock / count — not accession soup)
3. Drug action: **PRIORITIZE** vs **BLOCK** named therapies

## UI word budgets (hard)

| Slot | Max |
|------|-----|
| Hero headline | **8 words**, zero numbers, zero drugs |
| Hero subhead | **20 words** |
| Metric tile | **1 bold number + 3–5 word label** |
| Card body | **22 words** (problem + decision). No parenthetical math |
| Study IDs, p-values, long regimens | **Evidence drawer only** |

Use case switcher (Ovarian / Myeloma / Colorectal) instead of dumping five walls of text.

## Banned on main screen (hero, cards, headlines, body)

Lab nicknames: `Door 1`, `Door 2`, `Gate 0`, `Gate-2`, `SPE-high`, `on disk`, `UNCLEAR`, `frozen JSON`, `submission ledger`. Say **dividing** vs **dormant/sleeping** tumor.

Accession / journal / stats on surface: `GSE9782`, `GSE165897`, `TCGA-COADREAD`, `bioRxiv`, `p =`, `q =`, `AUROC`, `HR =` — drawer only.

Robotic templates: `hazard direction`, `put that split on the board`, `rank with that receipt`, `mechanism picture`, `ranked package`, em-dash `X vs Y — do Z`.

Developer jargon: `disk says`, `source file`, `product meters`, `pack validator`, `Engine · L1/L2/L5`, marketing footnotes with `src/data/...`.

## Honest numbers (drawer / tiles)

- Ovarian relapse: 50.5 d dividing vs 203.5 d dormant vs 490 d cleared — `src/data/ovarian/gse165897_two_door_pfi_separation_receipt.json`
- Myeloma: 138.5 vs 90.0 d (+48.5) — Tier3 GSE9782
- CRC Stage IV KRAS G12D/V immune-cold: **16 of 19** — `src/data/brenus/kras_two_door_stc1010_vs_daraxonrasib_receipt.json` (never invent 19/19)
- Tiles: 26/29 dormant, +48.5 days, 220/220 EGFR blocked, 12/12 Phase III

## Operating loop

1. `Grep` bans across `src/app`, `src/data`, `src/components`
2. Rewrite over-budget copy same turn — no permission ask
3. `curl` `/` and `/products/tumor-board/`

## Still bound

No commit unless asked · no invented meters · no fabricated FDA clearance.
