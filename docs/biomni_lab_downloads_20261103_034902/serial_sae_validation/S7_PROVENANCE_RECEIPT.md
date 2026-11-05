# S7_PROVENANCE_RECEIPT.md

**Claim under provenance audit:**
> "CN signature 7 exposure at relapse discriminates platinum resistance with AUROC 0.874
> (95% CI 0.750–0.974, p=0.035) in BriTROC-1."

**Verdict: CASE (2) — INTERNAL CrisPRO computation on EXTERNAL published input data.**
The claim is *locatable* and *reproducible*, but it is **not** a number reported in any external
publication, and therefore **not** a correction of the external literature. It is CrisPRO's own
derived metric. Any manuscript sentence implying we "correct" or "rebut" a published S7-resistance
AUROC is factually wrong and must be rewritten as internal QA / novel internal derivation.

---

## 1. Exact decomposition: what is external vs. internal

| Element | Origin | Exact source |
|---|---|---|
| CN signature exposures s1–s7 (per sample, diagnosis/relapse) | **EXTERNAL (published)** | Brenton/BriTROC-1, *Nat Commun* 2023, DOI 10.1038/s41467-023-39867-7; Supplementary Source Data `MOESM10_ESM.zip` → `source_data/figure_4A.tsv` (column `signature` s1–s7, `value` exposure 0–1, `group` = arx/rlps) |
| Clinical response (`overall_response`) per patient/chemo line | **EXTERNAL (published)** | Same paper, `MOESM4_ESM.txt` (per-patient/chemo-line response) |
| Resistance label `rclass` (resistant/sensitive) | **INTERNAL (CrisPRO-derived)** | Computed by `scripts/w2_britroc.py::classify()` — maps published `overall_response` {progressive disease, stable disease} → "resistant", {complete/partial response} → "sensitive". This mapping is CrisPRO's, not the paper's endpoint. |
| Diagnosis/relapse pairing + patient join | **INTERNAL** | `w2_britroc.py` groups by `fk_britroc_number`, keeps patients with both `arx` and `rlps` samples → n=47 paired → n=40 with first-line labels → 3 resistant |
| **AUROC = 0.874, bootstrap 95% CI, Wilcoxon p** | **INTERNAL (CrisPRO-computed)** | `w2_britroc.py` line ~55 `roc_auc_score(y, s)`; 1000-iteration bootstrap CI (seed 42). Reproduced live 2026-07-27 = 0.874 (matches). |

**The Nature 2023 paper does not report an S7-at-relapse platinum-resistance AUROC.** It reports
signature exposures (Fig 4A) and a cohort-level compositional analysis of signature change. The
discrimination metric is entirely a CrisPRO construction layered on top of the published exposures.

## 2. Reproduction receipt (live, 2026-07-27)

- Feature source file (internal cache): `serial_sae_validation/w2_britroc_cohort.csv` (n=40, cols s1–s7 × {diag, rel, delta} + `rclass`).
- Live recomputation from that file: `s7_rel` AUROC = **0.874**, Wilcoxon p = **0.035**; `s7_diag` = 0.694; `s7_delta` = 0.829. Matches `w2_britroc.json` check W2-01 exactly.
- Internal generator: `serial_sae_validation/scripts/w2_britroc.py` (self-downloads MOESM10 + MOESM4, derives labels, computes AUROC).

## 3. Consequence for the manuscript (binding)

1. **Permitted framing:** "We computed, from the published BriTROC-1 CN signature exposures
   (Nat Commun 2023, Fig 4A source data), that signature-7 exposure measured at relapse
   discriminates our internally-defined platinum-resistance label with AUROC 0.874 (n=40, 3 events).
   This metric is not reported in the source study."
2. **Prohibited framing:** any sentence stating or implying CrisPRO "corrects", "refutes", or
   "overturns" a *published* S7-resistance AUROC. No such external number exists.
3. **The label-forensics story is INTERNAL QA**, not a literature correction: it audits CrisPRO's own
   `classify()`-derived label against an alternative label scheme (see LABEL_SWAP_AUDIT.csv). Every
   sentence implying external correction must be rewritten to "internal label-definition sensitivity."

## 4. Citation string for the manuscript

External input data:
> Smith, P., Bradley, T., Gavarró, L.M., et al. *Nat Commun* 14, 4387 (2023).
> DOI 10.1038/s41467-023-39867-7. CN signature exposures: Supplementary Source Data,
> `source_data/figure_4A.tsv`. Clinical response: `MOESM4_ESM.txt`.

Internal derivation:
> CrisPRO Serial-SAE analysis, `scripts/w2_britroc.py`; receipt `w2_britroc.json` (check W2-01);
> feature matrix `w2_britroc_cohort.csv`.

**Gate status: OBLIGATION #1 SATISFIED — manuscript work may proceed with case-(2) framing.**

---

## 5. Provenance deadline resolution (2026-07-27) — ITEM 2 CLOSED

The provenance question was put under a hard deadline: produce an exact external citation (DOI, table,
column, row count, outcome field) for the "s7 AUROC 0.874" claim, OR confirm it is an internal artifact
with file/commit reference, OR confirm the source cannot be located (→ delete the claim).

**Outcome: INTERNAL artifact, confirmed with file reference. No external citation exists.**

- **Searched external source in full:** BriTROC-1, *Nat Commun* 14, 4387 (2023), DOI
  10.1038/s41467-023-39867-7 — including Fig 4A source data (`figure_4A.tsv`, columns
  `signature`/`value`/`group`) and per-patient clinical response (`MOESM4_ESM.txt`). **No s7-at-relapse
  platinum-resistance AUROC of 0.874 (or any value) is reported** in any table, column, row, or outcome
  field. The paper reports signature *exposures* and a cohort-level compositional analysis, not this
  discrimination metric.
- **Internal file/commit reference:** the AUROC is produced by `scripts/w2_britroc.py`
  (`classify()` derives the `rclass` resistance label from the published `overall_response`;
  `roc_auc_score(y_rclass, s7_rel)` + 1000-iteration bootstrap, seed 42). Live reproduction on
  2026-07-27 gives **AUROC = 0.8739, boot 95% CI 0.7622–0.9717, Wilcoxon p = 0.035** — recorded in
  `w2_britroc.json` check `W2-01`.
- **Consequence:** CLAIM_LEDGER row 2 **does NOT flip** — it flips only on a real external citation,
  which does not exist. The claim is **retained** (locatable + reproducible) and framed as **internal
  QA / internal derivation on published input data**, never as an external correction. It is **not**
  deleted, because it is not "source cannot be located" — the source (internal computation) is
  precisely located.

**ITEM 2 status: RESOLVED — INTERNAL, no external source, claim retained with internal framing.**
