# CrisPRO / BrM full available-artifact handoff

## Start here

Read `handoff/report_crispro_brm_handoff_v1.md` first. It outlines findings, datasets, analyzed work, unperformed work, missing source/data, and corrections to overstatements in earlier deliverables.

**Included:** 162 original artifacts (25.71 MiB uncompressed), including saved RNA/evidence tables, reports, 19 PNG/19 SVG figures, two workbooks and 25 structural models with supporting outputs. New CSV inventories cover 28 source records, 26 workstreams, 26 grouped findings and 26 missing assets/validation items.

**Not included:** unavailable application repositories, primary biological assay matrices, TCGA sample-level exports, GTEx response/cache, original generated candidates or live deployment evidence. Repository commit identifiers in the report are recovery pointers, not code snapshots. `tools/` contains only the new handoff utilities and their tests.

## Evidence cautions

- The CRISPRa screen's cancer origin is contradictory across documents.
- Guide spacers in the later payload report differ from preserved AF3 inputs.
- RNA support is mixed; old invalid GSE186344 contrasts remain retired.
- AF3 outputs are predictions without Cas9, not validated binding/editing.
- GTEx tissue medians are not donor-level raw TPM.
- TCGA quartile subsets are exploratory, not validated trial eligibility.
- Prior local tests do not demonstrate live Postgres, Redis/Celery or Modal production execution.

## Navigation

- `handoff/dataset_inventory.csv`: all identified source families and availability.
- `handoff/analysis_status.csv`: what was analyzed, reported, or not performed.
- `handoff/findings_ledger.csv`: results and caveats with supporting filenames.
- `handoff/missing_assets.csv`: missing data/source/validation.
- `handoff/artifact_inventory.json`: exact original file metadata and archive paths.
- `handoff/excluded_assets.csv`: omitted duplicate containers/unrelated assets.
- `originals/`: unchanged original deliverables and workbooks.
- `MANIFEST_SHA256.csv`: per-file integrity verification.

Run `python tools/build_brm_handoff.py --verify <archive.zip>` to verify the delivered ZIP. Preserve the structural prediction terms files on redistribution.

This is a research handoff, not a complete production release or clinically validated intervention.
