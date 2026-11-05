# Serial-SAE Cohort Scale-Up Pipeline (EGAD00001011049)

Turns the Serial-SAE lead from **n=5 pilot** into a **validated or falsified** claim on the
full 182-pair ovarian dx->relapse cohort. Runs the same honesty gates as the rest of the
biomarker subsystem: a null is reported as a null; nothing is rounded up to "trending".

## Where this runs

**A dedicated in-region VM** (AWS eu-west-1 or GCP europe-west2 — EGA servers are at EBI/UK),
with a **500 GB+ data volume**. The dataset is ~511 GB / 679 files. This does NOT run in the
agent sandbox (insufficient disk, 24h lifetime).

## Credentials — read this

- **Never** paste EGA/Synapse/SAS credentials into a chat/assistant session, a commit, or any
  file under a results/share mount. If a credential was ever pasted into a session or shared
  log, **treat it as compromised and rotate it immediately** (change the password; revoke the
  token).
- The download script reads credentials from a VM-local file **you** create:
  `~/.pyega3/credentials.json`, `chmod 600`. It never accepts a password on the command line.

## Steps

| Step | Script | What it does | Where |
|---|---|---|---|
| 1 | `01_download_ega.py` | Resumable pyega3 download of all EGAF file IDs in the ledger | VM |
| 2 | `02_qdnaseq_breakpoints.R` | QDNAseq CN + breakpoint counts, **hg19 / 30kb** (matches the 5 already-computed pairs) | VM |
| 3 | `03_resistance_association.py` | Breakpoint-delta vs platinum resistance, **honesty gates on** | VM |

```bash
# 1. download (after creating ~/.pyega3/credentials.json on the VM)
python3 01_download_ega.py --ledger subject_ledger.csv --outdir /data/ega \
    --credentials ~/.pyega3/credentials.json --dry-run    # check disk first
python3 01_download_ega.py --ledger subject_ledger.csv --outdir /data/ega \
    --credentials ~/.pyega3/credentials.json              # real, resumable

# 2. copy-number + breakpoints (per dx/relapse BAM)
Rscript 02_qdnaseq_breakpoints.R /data/ega /data/qdnaseq 30

# 3. fill delta + architecture_signature per subject into subject_ledger_FILLED.csv,
#    ADD a platinum_status column (resistant/sensitive) per subject, then:
python3 03_resistance_association.py --ledger subject_ledger_FILLED.csv --out sae_result.json
```

## Method (frozen to match the existing 5 computed pairs)

- Genome hg19, 30 kb bins, CBS segmentation, breakpoint = within-chromosome segment boundary.
- Do NOT change bin size/genome without re-computing the existing 5 pairs too, or deltas are
  not comparable.
- Existing pilot (5 pairs) is heterogeneous: deltas +101, +253, +60 (`dispersed_stochastic_CIN`),
  +18 (`intermediate_rearrangement`), and **-7** (`modest_gain`). This heterogeneity is exactly
  why the full-cohort test is needed and why no resistance claim is made from the pilot.

## Honesty gates in Step 3

1. **Power gate:** requires >=40 pairs with a computed delta AND a resistance label, and >=15
   per group. Below that -> `discovery_only`, no association claim.
2. **Effect gate:** reports median delta difference WITH bootstrap 95% CI and Mann-Whitney p.
   `Consider` only if CI excludes 0, p<0.05, AND direction matches the hypothesis (resistant =
   more breakpoint gain). Significant-but-inverse -> `discovery_only` (contradictory).
   Non-significant -> `discovery_only` (null, stated as null).
3. Single cohort / single dataset caps the ceiling at `Consider` — `Strong` needs independent
   replication.

## What a customer (Brenus) can be told, and when

- **Before Step 3 passes:** Serial-SAE is a *hypothesis-generating lead* from a pilot, under
  active validation. Not a validated resistance predictor.
- **If Step 3 returns `Consider`:** "structural CIN evolution associates with platinum resistance
  in one 182-pair cohort; independent replication pending." Honest and sellable.
- **If Step 3 returns a null:** the modality-triage narrative still holds (bulk-mRNA dead,
  structural DNA is the live *research* direction), but no clinical claim.
