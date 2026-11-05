# Project Backtrack & Self-Audit — Strongest Signals vs. What Was Skipped

**Scope:** Full retrospective across all work streams visible in this project, audited in parallel
across 5 workers. Every load-bearing number below was re-read from the underlying data file or
receipt on disk — not from memory or from a prior summary. Research-use-only (RUO); none of this
is clinical decision support.

---

## 1. What we started with vs. what we ended with

| Stream | Started with | Ended with |
|---|---|---|
| **MBD4-LOF SL (this session's task)** | A rogue parallel 6-rung tier ladder invented for MBD4 | Deleted the rogue ladder; re-mapped onto canonical `ManagerEvidenceTier` (Tier 1-5) + `preclinical_strength` refinement + `evidence_status`. Shipped v2 `d5ed8c3`, v3 `b2b2df2`; PRs #13/#5 updated |
| **HGSOC / Serial-SAE manuscript** | Hypothesis: post-treatment molecular state predicts platinum resistance | Discovery (GSE165897, n=11) + external validation (BriTROC-1, n=47->40->3R). S7-at-relapse validated; delta-not-predictive thesis confirmed |
| **Pan-cancer 58-axis SL portfolio** | 58 driver->partner SL nominations from DepMap | 5-layer validation contract; 41/58 replicated cross-platform; 5 clinically-anchored+replicated axes (T1) |
| **Real-data CIN (EGA/BriTROC sWGS)** | Plan to compute Serial-SAE across 182 subject pairs | Only 5 pairs computed; signal effectively n=1 (Subject 260 PTEN loss). 177/182 never run (data-access dependency) |
| **Backend platform (v2/v3, governance)** | 8D mechanism-fit ranker + evidence-tier discipline | PATH A formula locked; quarantine ledger enforced; SL bridge wired |

---

## 2. Strongest signals we identified (ranked, live-verified)

1. **MBD4-LOF cytidine-analog synthetic lethality — CAUSAL, isogenic.** Gemcitabine ~10x
   sensitisation in isogenic MBD4-KO (IC50 2.3 nM KO vs 20.1 nM WT; P=2.82e-3), rescued on
   re-expression (Chabot et al. 2022). Strongest *preclinical* evidence class in the whole SL body
   of work. Canonical tier TIER_5 (preclinical), `preclinical_strength=CAUSAL_ISOGENIC`.

2. **MBD4-LOF ATR-checkpoint dependency — confound-hardened.** Ceralasertib LN_IC50
   Delta=-0.73, p=0.021, Cohen's d=-0.50 (n=14 vs 914, GDSC2/DepMap 24Q2). Survives four
   orthogonal confound stress tests (MSI-H purge, TP53 stratification, leave-one-out 14/14,
   non-Bowel lineage). This is the axis that behaves best under adversarial testing.

3. **BriTROC-1 CN Signature-7 at relapse — the external-validation headline (re-verified live).**
   AUROC = **0.874** (95% CI 0.750-0.974, MWU p=0.035), n=40, 3 resistant. Reproduced exactly
   from `w2_britroc_cohort.csv` this session. Diagnosis S7 = 0.694; improvement +0.180. This is the
   single cleanest quantitative match between manuscript, receipt, and live recomputation.

4. **Pan-cancer cross-platform replication.** 41/58 axes replicated at FDR<0.05 in Sanger Project
   Score CERES; effect-size Spearman rho=0.791 (p=5.1e-12), 47/51 sign-concordant. Higher-evidence
   tiers replicate best (all 6 E3, 8/10 E4). Five T1 axes are both clinically anchored and replicated:
   BRAF->MAPK1, BRAF->MAP2K1, PTEN->PIK3CB, STK11->HDAC4, BRCA1->PARP1.

5. **PARP1 expression as a pan-cancer PARPi-selection biomarker.** Spearman rho=-0.416,
   p=1.4e-21, n=481 — patient-derived association (canonical TIER_4). Genetically INDEPENDENT of
   MBD4; repositioned as a selection biomarker, not an MBD4-driven target.

6. **DDR-panel prognostic signal (HGSOC).** Earned an honest upgrade discovery_only -> CONSIDER:
   strict de-novo signal in GSE17260, C-index 0.611 (95% CI 0.521-0.702, p=0.016), HR 1.61
   (1.15-2.25, p=0.005), no feature-selection leakage.

---

## 3. Falsifications & nulls we correctly reported (not buried)

- **MBD4-LOF -> PARP1 transcriptional upregulation: FALSIFIED.** PARP1 not elevated in MBD4-LOF
  (median 6.77 vs 6.66; two-sided MWU p=0.605; n=19 vs 1498). RNF144A degradation bridge also
  null (p=0.476). Reported as a cautionary vignette, not hidden.
- **MBD4-LOF genome-wide CRISPR dependency scan: NULL.** 0/17,453 genes pass FDR<0.25; PARP1
  dependency Delta=0.031, p=0.675, FDR=1.0 (n=7 vs 1179). The vulnerability is a drug-response
  phenotype, not a genetic dependency.
- **Pathway DELTAS not predictive (HGSOC discovery).** Absolute post-treatment state predicts;
  change does not. This is the actual thesis and the null on deltas is load-bearing, not incidental.
- **Riester 3-gene score: held at discovery_only.** Its only strict validation cohort (GSE9891) sits
  inside the signature's own development compendium -> feature-selection leakage; no independent signal.

---

## 4. What we looked over, skipped, or under-powered (the honest gaps)

1. **BriTROC S7 headline is fragile at n=3 resistant.** Live leave-one-resistant-out: AUROC swings
   0.865-0.892 when any one of the 3 resistant patients is dropped. EPV=3. The 0.874 point estimate
   is real but unstable; it is a discovery-grade external signal, not clinical-utility evidence.

2. **All discovery models are far below EPV>=10.** Discovery 3-pathway EPV=1.0-1.33; single-feature
   EPV=4.0; BriTROC single-feature EPV=3.0. No cross-validation on discovery; KM median-split uses
   the same n=11 (leakage). All disclosed, but the headline framing must always carry "apparent, n=11".

3. **No multiple-testing correction in the HGSOC manuscript.** Under BH-FDR across the 7 discovery
   tests, 6 survive at FDR<0.05 — but the manuscript applied none. Should read as hypothesis-generating.

4. **Real-data Serial-SAE CIN is effectively n=1.** 177 of 182 EGA subject pairs were never computed
   (BAMs not downloaded; real data-access dependency). The "Serial-SAE predicts resistance" claim on
   real sWGS rests on Subject 260 (PTEN neutral->loss) plus at most 5 computed pairs. A prior "sell it
   now" pivot impulse was correctly caught and downgraded to n=1-overclaim in the pivot memo.

5. **CCNE1 statistics come from a tiny-n pilot, not the survival cohort.** The CCNE1 CN work
   (CCNE1 amplification calls, focality checks, SPE-scorer flow) was run on the 4-8 sample pilot CN
   pairs, not on a 98-patient survival cohort. Any CCNE1 odds-ratio / survival framing must be tied to
   that pilot provenance; the BriTROC master file on disk has no CCNE1 or S3 column at all.

6. **Pan-cancer L4 "replication" is cross-platform, not out-of-cohort.** The Sanger CERES Figshare
   version is pre-filtered to lines with Broad CN data (315/318 lines shared; 0 held-out lines testable).
   The manuscript correctly reports the weaker, honest rho=0.791 as headline rather than the
   within-platform rho=0.973 — but this is orthogonal-technology replication on shared lines, not
   independent-cohort replication. Do not overstate it.

7. **L1 known-SL recall is modest and modality-blind.** 10/22 = 0.455 CRISPR-visible recall;
   PARP-modality pairs recovered only 1/5 (knockout cannot model PARP trapping). 46/58 axes have no
   formal literature search yet.

8. **HGSOC manuscript internal inconsistencies (from its own W4 receipt).** Discovery labeled 8R/3S
   in text vs corrected 7R/4S source of truth (EOC227 reclassified sensitive, PFI 230d>=180d);
   monitoring/early-detection language overstated relative to a prognostic (chronic-risk) finding;
   intro/results contradiction on whether deltas predict.

---

## 5. Process drift caught across sessions (verbatim-anchored, from retro receipts)

- **Under-powered "sell it now" framing.** A systemic-pivot directive proposed marketing
  "Serial-SAE predicts platinum resistance" as ready-now; honest status is n=1. Caught in the pivot memo.
- **Impulse to bury a null biomarker paper.** The dead bulk-mRNA modality is itself a real, publishable
  null; reframing as "modality triage" is correct, hiding it would not have been.
- **consensusOV first declared "not re-executable," then actually run.** Later installed from bhklab
  source and executed on 536 TCGA samples — an under-sell that was corrected.
- **A prior backtrack was done with 1 worker after being told to use 5** ("your last effort of using 1
  worker was lazy - utilize all 5"), and reduced a cross-session drift synthesis to a numeric re-check of
  one table. This audit explicitly does the opposite: all 5 workers, drift synthesis included.

---

## 6. Bottom line

The **strongest, most defensible signal** in the entire body of work is the MBD4-LOF anchor
(cytidine-analog causal SL + confound-hardened ATR dependency), followed by the BriTROC S7-at-relapse
external validation (0.874, live-reproduced) and the 5 clinically-anchored + cross-platform-replicated
pan-cancer axes. The framework's willingness to report falsifications (PARP1 p=0.605) and nulls
(CRISPR scan) is a genuine strength.

The **biggest thing repeatedly skipped or under-powered** is honest sample size: the HGSOC external
validation rests on 3 resistant patients, the real-data CIN work on effectively 1, and the pan-cancer
"replication" shares nearly all its cell lines with discovery. None of these are fatal — but every
headline number must travel with its n and its evidence tier, which is exactly the discipline the
MBD4 re-map enforced this session.
