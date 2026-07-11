# W10 — Persona-deck provenance audit

- Deck files scanned: **13**
- Total numeric-bearing string literals: **127**
- Classification totals: **TEMPLATE 73 · GOVERNED 84 · UNKNOWN 32**
- Cross-persona leaks: **0**

## Legend

- **TEMPLATE** — inside a `${...}` expression referencing an imported `_RECEIPT` const; well-governed, single-sourced.
- **GOVERNED** — hard-coded literal but also present in an audit / pgx-receipt source file.
- **UNKNOWN** — hard-coded literal not found in any audit / pgx-receipt source file. Drift risk.
- **CROSS_PERSONA_LEAK** — identical body/caveat text appearing in ≥ 2 persona blocks of the same deck field; persona toggle does nothing for that string.

## Per-file counts

`Strings` = deck-string literals scanned. `TEMPLATE / GOVERNED / UNKNOWN` = classification *events* (one string can contribute multiple template expressions and multiple hard-coded literals).

| File | Strings | TEMPLATE | GOVERNED | UNKNOWN |
|------|---------|----------|----------|---------|
| `src/context/persona-content.tsx` | 0 | 0 | 0 | 0 |
| `src/components/engine/MechanismAlignmentIntroPage.tsx` | 3 | 0 | 0 | 0 |
| `src/components/tumor-board/SyntheticLethalityTabSurface.tsx` | 9 | 0 | 0 | 0 |
| `src/components/engine/TargetLockIntroPage.tsx` | 3 | 0 | 0 | 1 |
| `src/components/ledger/BrenusDecodeWallPage.tsx` | 6 | 0 | 0 | 3 |
| `src/components/engine/SyntheticLethalityIntroPage.tsx` | 9 | 0 | 1 | 0 |
| `src/components/engine/SafetyDosingTabsSurface.tsx` | 39 | 19 | 14 | 8 |
| `src/components/tumor-board/SyntheticLethalityScrollSurface.tsx` | 9 | 0 | 15 | 0 |
| `src/components/ledger/BrenusVectorWallTab.tsx` | 3 | 0 | 0 | 3 |
| `src/components/engine/SafetyDosingScrollSurface.tsx` | 26 | 54 | 20 | 12 |
| `src/components/engine/SafetyDosingIntroPage.tsx` | 11 | 0 | 27 | 4 |
| `src/components/tumor-board/MechanismAlignmentScrollSurface.tsx` | 9 | 0 | 7 | 1 |

_Files not on this audit branch (they exist on other worker branches, e.g. W9's `agent/w9-pgx-doctrine-parity`):_
- `src/data/pgx-doctrine-decks.ts`

## UNKNOWN literals

These are literals that appear inline in a deck string but were not found in `/mnt/results/audits/` or `src/data/pgx-receipts/*.json`. Each is a candidate for either (a) being wired through a receipt import, or (b) being deleted / clarified.

### `src/components/engine/TargetLockIntroPage.tsx`

| Line | Field | Literal | Context |
|------|-------|---------|---------|
| 33 | title | `9/9` | Two-layer target ranker · 9/9 retro concordance |

### `src/components/ledger/BrenusDecodeWallPage.tsx`

| Line | Field | Literal | Context |
|------|-------|---------|---------|
| 50 | body | `0.138` | D domain · 3 numeric delta (Berzosertib 0.138 · Adavosertib 0.307 · CAPRI 0.108, |
| 50 | body | `0.307` | delta (Berzosertib 0.138 · Adavosertib 0.307 · CAPRI 0.108, all DOCUMENTED_NOT_R |
| 50 | body | `0.108` | ertib 0.138 · Adavosertib 0.307 · CAPRI 0.108, all DOCUMENTED_NOT_REPRODUCED) ·  |

### `src/components/engine/SafetyDosingTabsSurface.tsx`

| Line | Field | Literal | Context |
|------|-------|---------|---------|
| 92 | headline | `2023` | PREPARE (Lancet 2023) — outcome-linked, actionable-subgroup |
| 93 | body | `8/23` | l localises in n=  actionable carriers: 8/23 vs 1/17 → RRR  %. Non-actionable RR |
| 93 | body | `1/17` | ses in n=  actionable carriers: 8/23 vs 1/17 → RRR  %. Non-actionable RRR  % (p= |
| 105 | headline | `83%` | ents · testing cut serious side-effects 83% for carriers |
| 106 | body | `83%` | te dropped from 8-in-23 to 1-in-17 — an 83% reduction. When there was nothing fo |
| 144 | headline | `4×` | Blood-thinner example: 4× more strokes without genetic testing |
| 145 | body | `4×` | },       { label: 'Difference', value: '4× more repeat strokes' },       { label |
| 179 | caveat | `25 pp` | after harm), not matched controls. The 25 pp hospitalization delta is the cost o |

### `src/components/ledger/BrenusVectorWallTab.tsx`

| Line | Field | Literal | Context |
|------|-------|---------|---------|
| 43 | body | `0.138` | with numeric delta_approx (Berzosertib 0.138 · Adavosertib 0.307 · CAPRI 0.108), |
| 43 | body | `0.307` | approx (Berzosertib 0.138 · Adavosertib 0.307 · CAPRI 0.108), 1 QUARANTINED (LAT |
| 43 | body | `0.108` | ertib 0.138 · Adavosertib 0.307 · CAPRI 0.108), 1 QUARANTINED (LATIFY CT-03 vect |

### `src/components/engine/SafetyDosingScrollSurface.tsx`

| Line | Field | Literal | Context |
|------|-------|---------|---------|
| 49 | body | `54%` | 100% upfront dose reduction adherence, 54% mean RDI first cycle). This surface d |
| 49 | body | `2023` | details the 5 receipts: PREPARE (Lancet 2023, outcome-linked), CYP2C19-clopidogr |
| 56 | headline | `2023` | PREPARE (Lancet 2023) — the outcome linkage nobody else did |
| 57 | body | `8/23` | nable carriers:   patients, control arm 8/23 adverse events vs intervention arm  |
| 57 | body | `1/17` | 8/23 adverse events vs intervention arm 1/17 — RRR  % (p= ). Non-actionable RRR  |
| 57 | body | `83%` | 3-person trial: side-effect rate cut by 83% where testing changed the dose',     |
| 57 | body | `35%` | -side-effect rate dropped from 8-in-23 (35%) to 1-in-17 (6%). When the patient d |
| 57 | body | `2023` | e. The trial published in the Lancet in 2023.',     caveat:       'The effect is |
| 70 | body | `8/23` | on  ). Actionable carriers n= : control 8/23 (34.8%), intervention 1/17 (5.9%).  |
| 70 | body | `34.8` | Actionable carriers n= : control 8/23 (34.8%), intervention 1/17 (5.9%). RRR  %, |
| 70 | body | `1/17` | n= : control 8/23 (34.8%), intervention 1/17 (5.9%). RRR  %, ARR   pp, Fisher ex |
| 112 | caveat | `25 pp` | U) — pretreatment DPYD triage prevents ~25 pp hospitalization delta vs reactive  |

### `src/components/engine/SafetyDosingIntroPage.tsx`

| Line | Field | Literal | Context |
|------|-------|---------|---------|
| 41 | body | `83%` | s proving this catches dangerous doses: 83% fewer bad side-effects for patients  |
| 47 | body | `2023` | PREPARE (Lancet 2023, PMID 39641926) validates the outcome-l |
| 47 | body | `20×` | RR 83.1% (p=0.054), signal localisation 20× stronger than ITT. CYP2C19-clopidogr |
| 47 | body | `95%` | risk (p=6.7×10⁻⁴, multivariate HR 5.26, 95% CI 1.87-14.56). Nguyen 2024 (PMID 38 |

### `src/components/tumor-board/MechanismAlignmentScrollSurface.tsx`

| Line | Field | Literal | Context |
|------|-------|---------|---------|
| 84 | caveat | `01/02` | DIV-01/02/03 are illustrative vectors. One quaran |

## Cross-persona leaks

_None — no identical persona-deck body/caveat strings detected._
## Source files consulted

- `/mnt/results/audits/af3_15_guide_raw.json` (8580 bytes)
- `/mnt/results/audits/af3_28_protein_claim_audit.md` (10256 bytes)
- `/mnt/results/audits/af3_metastasis_15_guide_raw.md` (7467 bytes)
- `/mnt/results/audits/af3_rendering_doctrine.md` (11849 bytes)
- `/mnt/results/audits/afdb_28_protein_plddt.json` (11168 bytes)
- `/mnt/results/audits/w7a_evo2_v3_sl_audit.md` (30317 bytes)
- `/mnt/results/audits/w7a_numeric_ground_truth.json` (25301 bytes)
- `src/data/pgx-receipts/cpic_concordance_report.json` (20363 bytes)
- `src/data/pgx-receipts/cyp2c19_clopidogrel_efficacy_validation.json` (3703 bytes)
- `src/data/pgx-receipts/nguyen_dpyd_validation.json` (5246 bytes)
- `src/data/pgx-receipts/prepare_outcome_validation.json` (2980 bytes)
- `src/data/pgx-receipts/tier2_heuristic_validation_results.json` (19033 bytes)
