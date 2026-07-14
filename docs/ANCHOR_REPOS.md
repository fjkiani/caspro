# Anchor repos in the tumor-board demo

The multi-patient tumor board isn't running hand-authored fiction for CRC01 and BM01.
Two of the five patient bundles are backed by real production repositories that
CrisPRO drives in other engagements:

| Patient | Anchor repo | What it produces |
|---------|-------------|------------------|
| CRC01 | `fjkiani/Brenus` | 4-lane multi-agent BD/positioning flywheel. Reference implementation: STC-1010 / BreAK CRC-001 engagement for MSS colon cancer. Panels: trial-decode registry + IO_APPENDIX. |
| BM01 | `fjkiani/evo2-e2e` | Brain-metastasis Target-Lock / Assassin pipeline. Deployed on Modal (Evo2 A100, Enformer T4, ICL CPU). Panels: 7-step BrM cascade pipeline results + Evo2 conditional-LL variant scores. |

## What "snapshot-only" means

The tumor board **does not call these repos at render time**. Every value on the
CRC01 and BM01 anchor panels is extracted at build time from committed files in
the anchor repos, then re-emitted as static TypeScript modules under
`src/data/tumor-board/anchor/`. No live Modal calls. No live LLM calls.
No fresh compute per patient page view.

The extraction scripts under `scripts/anchor_extract/` are idempotent and
deterministic; re-run them against a newer anchor-repo snapshot to refresh the
panels.

## What the anchor panels claim and don't claim

**They claim:**
- CRC01's panel shows real trials that Brenus's `trial_decode_registry_v2.json`
  already codified with `data_status: VERIFIED`, admissibility tags, and
  primary-result quotes. KEYNOTE-177 (NCT02563002) and CheckMate-142
  (NCT02060188) are the two directly relevant to MSI-H.
- BM01's panel shows real Target-Lock and Evo2 conditional-LL scores from a
  reproducible pipeline run (`pipeline_results_20260328T070235Z.json`, seed 42).
  Every score is provenance-stamped back to the pipeline artifact.

**They don't claim:**
- No per-patient synthetic-lethal matrix from the anchor repos. Neither Brenus
  nor evo2-e2e emits those; both work at the population level. The hand-authored
  `slMatrix` in `src/data/patients/CRC01.ts` and `BM01.ts` remains what it was.
- No GBM patient. Brenus's `escape_map/gbm/glass_bulk_recurrence_closure.md`
  closed the GBM/ZEB1 hypothesis as `NOT_SUPPORTED_YET` (ZEB1 Wilcoxon p=0.000184
  but direction=DOWN, opposite the hypothesis; n=123 Stupp-standard pairs).
  The closed-negative note is persisted on the `GBM_MGMT_UNMETH` archetype in
  `/mnt/results/spe_audit/w4_pancancer_grid_v3.json` (`extension_meta.v1_source`
  points at v1).
  closed the ZEB1/EMT recurrence hypothesis as `NOT_SUPPORTED_YET` at bulk
  resolution. evo2-e2e explicitly excludes IDH1/IDH2 as glioma hard-negatives.
  Adding a GBM patient would mean fabricating evidence neither repo backs.

## UI convention: value before jargon

Every anchor-panel component MUST render:

1. **`plainSummary`** — one sentence in plain English: what CrisPRO does for
   this patient.
2. **`patientRelevance`** — one more sentence: what it means for the specific
   patient in front of you.
3. **Above-fold visual highlight** — the patient's own mutation (BM01) or the
   directly-applicable trials (CRC01).
4. **Audit drawer** — collapsed by default. Contains the score table,
   validation metrics, provenance list, and admissibility tags.

Jargon (Target-Lock formula weights, PATH-A signing, admissibility taxonomy)
stays in the audit drawer, not above the fold. The user amendment is explicit
about this: "explain what value it brings from CrisPRO — without overwhelming
the user persona."

## Audit page

`/anchor-audit` renders a field-by-field extraction map so anyone can trace
which panel field came from which committed file. This is a required deliverable
of the integration, not optional documentation.
