# Provenance Record — BriTROC-1 Serial-SAE Pilot (Copy-Number)

**Purpose.** Attach verifiable receipts to the pilot copy-number results, sourced
directly from the recorded execution transcript rather than from summary memory.
Every value below is quoted from a specific transcript record (`i:<n>`) in the
session execution trace, or from a summary artifact on disk. Where two artifacts
disagree, the disagreement is stated, not smoothed.

**Scope.** This documents WHAT the record shows. It does not re-run anything, and it
does not endorse re-authenticating from the sandbox now. The credential used on
2026-07-20 was later exposed in-session (chat + uploaded PDF) and must be treated as
burned; any fresh run belongs on an authorized in-region VM with a rotated credential.

---

## 1. What the transcript establishes (2026-07-20)

### 1.1 EGA authentication + dataset listing — REAL
- Source: transcript record `i:15441` and `i:15443`.
- `pyega3 files EGAD00001011049` returned a full authorized file listing: real EGAF
  accessions, per-file MD5 checksums, byte sizes, and `.bam` filenames, ending with
  `Total dataset size = 475.72 GB`, timestamped `2026-07-20 22:28:19 +0000`.
- Auth confirmation (captured stderr, record `i:15443`):
  `[2026-07-20 22:28:33 +0000] Authentication success for user 'fahad@jedilabs.org'`.
- Example verifiable rows from the listing:
  - `EGAF00008095433  582287838  0b3f3639b2113a121b71f5e5e9b89bb6  JBLAB-4101.bam`
  - `EGAF00008095319  473406059  b58d5e3ee1a946d93b0854f9e41c156b  IM_402.bam`
- **Status: the connection happened.** Earlier categorical denials ("no EGA
  connection ever occurred") are contradicted by this record and are retracted.

### 1.2 Pilot BAM download — REAL (files physically landed)
- Source: transcript record `i:15519` (`=== pilot download final check ===`).
- Files on disk with sizes at the checkpoint:
  - `152M  IM_280.bam`      (subject 191, diagnosis)
  - `382M  JBLAB-4944.bam`  (subject 191, relapse)
  - `262M  IM_373.bam`      (subject 109, diagnosis)
  - `282M  JBLAB-4225.bam`  (subject 109, relapse)
  - `334M  IM_249.bam`      (subject 119, diagnosis)
  - `completed: 5/8 BAMs` at this checkpoint.
- First-file MD5 verification (record `i` in the 15440s fetch block):
  `EGAF00008095203: IM_280.bam md5=f5ae73a2120c.. expected=f5ae73a2120c.. MATCH=True`.
- **Caveat on completeness:** the "all 8/8 MD5-verified" claim spans transcript
  records that were truncated by output limits during review and have NOT been
  re-quoted raw here. What is raw-verified is: first BAM MD5-matched, and 5/8 landed.
  The remaining 3 BAMs + their MD5 lines should be dumped raw before "8/8 verified"
  is treated as receipted.

### 1.3 QDNAseq copy-number run — REAL
- Source: transcript record `i:15517`.
- `Loaded bin annotations for genome 'hg19', bin size 30 kbp` (QDNAseq.hg19 v1.36.0).
- Binning grid: `103,199 total bins -> 83,607 final bins`.
- QC table (exact, from the record):

  | sample     | used_reads | n_bins | median_cn | mad_cn |
  |------------|-----------:|-------:|----------:|-------:|
  | IM_280     |  1,906,353 | 103199 | 0.8449428 | 0.3589908 |
  | IM_373     |  2,163,563 | 103199 | 0.9889707 | 0.3353644 |
  | JBLAB-4225 |  3,256,763 | 103199 | 0.9847104 | 0.2558225 |
  | JBLAB-4944 |  6,040,007 | 103199 | 1.0155730 | 0.3654259 |

- Reference build confirmed from BAM header (record `i` in the 15xxx header-inspect
  block): GRCh37/hg19, `chr1 = 249,250,621`, bwa 0.7.17, Picard MarkDuplicates,
  single-end ~0.1X sWGS. Consistent with BriTROC-1 methods.

---

## 2. Serial-SAE result (2 complete pilot pairs) — EXACT VALUES

Source: transcript record `i:15523` (`w3_pilot_serialSAE.csv`).

| subject | dx→relapse | n_bins | mean_abs_log2_CN_change | **frac_genome_altered_gt0.3log2** | net_log2_shift | max_gain | max_loss |
|--------:|------------|-------:|------------------------:|-----------------------------------:|---------------:|---------:|---------:|
| **191** | IM_280→JBLAB-4944 | 83607 | 0.321 | **0.5858** | +0.2780 | 2.142 | -1.006 |
| **109** | IM_373→JBLAB-4225 | 83607 | 0.158 | **0.1210** | -0.0003 | 1.319 | -1.310 |

### CORRECTION (misstatement caught by pulling raw bytes)
- I previously described subject 191 as **"65% genome altered."** The raw record says
  **0.5858 = 58.6%**, not 65%. **58.6% is correct; "65%" was wrong.**
- Subject 109 at **12.1% (0.1210)** was stated correctly.
- Interpretation that survives the correction: 191 shows a strongly divergent relapse
  genome (58.6% altered, net +0.28 log2); 109 is near-clonal/stable (12.1%, ~0 net
  shift). The qualitative contrast holds; the specific 191 percentage was overstated.

---

## 3. Two DIFFERENT breakpoint definitions are in play — do not conflate

There are two breakpoint counts per sample from two different computations. They are
close but NOT identical, and mixing them produces inconsistent "delta" headlines.

| sample (role)            | Sig7 basis `n_breakpoints` (transcript `i:15525`) | Ledger architecture `*_breakpoints` (breakpoint_architecture_with_subj260.csv) | diff |
|--------------------------|--------------------------------------------------:|-------------------------------------------------------------------------------:|-----:|
| IM_280 (191 dx)          | 120 | 127 | -7 |
| JBLAB-4944 (191 relapse) | 386 | 380 | +6 |
| IM_373 (109 dx)          |  62 |  59 | +3 |
| JBLAB-4225 (109 relapse) |  51 |  52 | -1 |

- **Ledger definition** (the one used for the published-style headline):
  subject 191 = **127 → 380, delta +253**, `dispersed_stochastic_CIN`;
  subject 109 = **59 → 52, delta -7**, `modest_gain`.
- **Sig7-basis definition** (Macintyre-framework feature input, bin-level segment
  boundaries): subject 191 = 120 → 386; subject 109 = 62 → 51.
- The two differ by a few breakpoints because they use different segment-boundary
  rules. **When quoting "191: 127→380 (+253)" one must attribute it to the LEDGER
  definition, not present it as the only number.** Both are internally consistent
  within their own definition.

### Sig7 note (scope honesty, from transcript `i:15525`)
The per-sample table (`n_segments`, `n_breakpoints`, `median_segment_size_mb`,
`frac_genome_amplified/deleted`, `mean_changepoint_magnitude`, `breakpoints_per_10Mb`)
is the **feature BASIS** for the Macintyre CN signatures, NOT calibrated Sig1–7
exposures. Full exposures require the trained mixture model
(CINSignatureQuantification / britroc-1 repo) fit across a cohort. Demonstrated on
n=4 here as feature inputs only.

---

## 4. Current on-disk state (2026-07-23)

- Summary artifacts survive on durable storage: `subject_ledger.csv`,
  `breakpoint_architecture_with_subj260.csv`, `subj260_*` files,
  `w3_pilot_serialSAE.csv`-derived values, timestamps `2026-07-21`.
- **Raw BAMs and QDNAseq `.rds` intermediates do NOT survive** anywhere on the
  mounts (wiped from ephemeral `/workspace` when machines cycled). Confirmed by
  direct `ls`: zero `.bam / .bai / .rds`.
- Consequence: the numbers are receipted by the TRANSCRIPT (the run is recorded),
  but cannot be RE-DERIVED in-session because the inputs are gone. Independent
  re-derivation requires re-pulling the BAMs on an authorized VM.

---

## 5. Honest bottom line

1. A real EGA authentication, real pilot BAM downloads (>=5/8, first MD5-verified),
   a real hg19/30kb QDNAseq run, and real Serial-SAE computation happened on
   2026-07-20. The recorded tool outputs establish this. Prior denials were wrong.
2. Subject 191's headline is real but was mis-quoted by me as "65% altered"; the
   correct figure is **58.6%**. Subject 109 at 12.1% was correct.
3. The "+253" breakpoint delta for 191 is real **under the ledger definition
   (127→380)**; a second, bin-level definition gives 120→386. Attribute the number
   to its definition.
4. "8/8 MD5-verified" is NOT yet raw-receipted in this record (only 5/8 landed +
   first-file MD5 confirmed in the quoted lines); dump the remaining fetch records
   raw before asserting it.
5. Nothing here authorizes or requires re-authenticating from the sandbox now. The
   clean path to a fully re-derivable result is a fresh pull on an authorized
   in-region VM with a rotated credential.
