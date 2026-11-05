# CORE-06 — MEDITREME
**CrisPRO Trial Decode | Brenus Pharma Data Room**

---

## Header

| Field | Value |
|---|---|
| Trial name | MEDITREME |
| NCT identifier | NCT03202758 |
| Sponsor | Centre Léon Bérard / French cooperative group |
| Phase | Phase Ib/II |
| Setting | 1L RAS-mutant mCRC (MSS) |
| Tier | **TIER1** — peer-reviewed, verified |
| Admissibility | VERIFIED — PMID 37563240 (Thibaudin et al. Nat Med 2023) |
| Status | COMPLETED — IO contribution unattributable |

---

## Outcome

| Field | Value |
|---|---|
| Primary endpoint | Safety (Phase Ib); PFS (Phase II) |
| Phase II median PFS | 9.5 months |
| Historical control (mFOLFOX6 alone) | ~8–9 months |
| ORR | 64.5% |
| Historical ORR (mFOLFOX6 alone) | ~50–60% in 1L RAS-mutant mCRC |
| Control arm | **None** — single-arm design |
| Verdict | **IO contribution UNATTRIBUTABLE — single-arm; results consistent with mFOLFOX6 alone** |

**Evidence level:** [PHARMACODYNAMIC ACTIVITY] — Immune biomarker analysis showed patients with high baseline CD8+ T-cell infiltration and low TGF-β had better outcomes. No randomized comparison; IO contribution cannot be separated from mFOLFOX6 backbone activity.

**Failure domains:**
- **D3 Architecture** — Single-arm design; no randomized control; IO contribution unattributable
- **D5 Attribution** — mFOLFOX6 alone achieves ~50–60% ORR in 1L RAS-mutant mCRC; the 64.5% ORR is consistent with chemotherapy alone; no proof of IO contribution

---

## 7D Mechanism Vector

| Axis | Value | Rationale |
|---|---|---|
| ddr | 0.10 | Minor DDR stress from oxaliplatin in mFOLFOX6 |
| mapk | 0.10 | No direct MAPK targeting |
| pi3k | 0.05 | No PI3K targeting |
| vegf | 0.00 | No bevacizumab — mFOLFOX6 only (no bev) |
| her2 | 0.00 | No HER2 targeting |
| io | 0.80 | Durvalumab (PD-L1) + tremelimumab (CTLA-4) — dual CPI, high IO axis |
| efflux | 0.00 | 1L, treatment-naive |

**Vector norm ‖t‖₂:** 0.8124

**Backbone match note:** MEDITREME uses mFOLFOX6 **without bevacizumab** — an exact backbone match to the non-bev arm of BreAK CRC-001. This makes MEDITREME the most directly comparable trial for the mFOLFOX6-only arm of BreAK CRC-001.

---

## PATH A Scores

| Metric | Value |
|---|---|
| fit_A (liver-met NEG) | **0.5037** |
| fit_B (liver-met POS) | 0.2089 |
| Δ (fit_A − fit_B) | 0.2949 |
| Rank by fit_A | 5 of 7 |
| Rank by Δ | 3 of 7 |
| Ceiling check P_A (≤0.8902) | ✓ PASS |
| Ceiling check P_B (≤0.8016) | ✓ PASS |

**What the score means:** High IO weight (dual CPI=0.80) with no VEGF axis produces moderate fit_A. The patient's VEGF=0.30 (bev backbone) is unmatched, reducing fit_A relative to QUILT-2.004 and AtezoTRIBE. The high delta (0.2949) confirms IO-axis liver-met sensitivity — dual CPI without VEGF coverage is maximally sensitive to hepatic TME suppression.

**What the score does NOT mean:** The moderate fit_A does not imply MEDITREME demonstrated IO benefit. The single-arm design makes the ORR 64.5% uninterpretable as IO-driven.

---

## Decode Narrative

MEDITREME is the canonical D3/D5 failure: a single-arm trial that cannot distinguish IO benefit from chemotherapy activity.

mFOLFOX6 alone achieves approximately 50–60% ORR in 1L RAS-mutant mCRC. MEDITREME reported 64.5% ORR. The difference — if real — is within the range of trial-to-trial variability in single-arm studies. Without a control arm, there is no way to know whether durvalumab + tremelimumab added anything.

The immune biomarker analysis is the most valuable output from MEDITREME. Patients with high baseline CD8+ T-cell infiltration and low TGF-β had better outcomes — identifying a potential immune-inflamed subgroup (~25%) with separable biology. This is consistent with the AtezoTRIBE Immunoscore-IC signal and the broader field consensus that ~20-30% of pMMR/MSS CRC tumors are immune-inflamed and may benefit from IO.

The mFOLFOX6 backbone match to BreAK CRC-001 (no bev arm) makes MEDITREME the most directly comparable historical reference for the non-bev arm. The PFS of 9.5 months is the benchmark — but it cannot be attributed to IO.

**The single-arm design is the lesson, not the result.** MEDITREME's 64.5% ORR is not evidence that dual CPI + mFOLFOX6 works. It is evidence that mFOLFOX6 works, and that we cannot tell whether the CPI added anything without a control arm.

---

## BreAK CRC-001 Implication

**Single actionable lesson:** BreAK CRC-001 must include a randomized control arm (or a pre-specified historical control with tight eligibility matching) to avoid the MEDITREME attribution failure. The mFOLFOX6 backbone will produce responses regardless of STC-1010. Without a control arm, any observed ORR in BreAK CRC-001 is unattributable — exactly the problem that made MEDITREME uninterpretable. The 64.5% ORR from MEDITREME is the historical benchmark for the mFOLFOX6-only arm; BreAK CRC-001 must demonstrate improvement above this floor with a design that allows attribution.

---

## Admissibility Footer

| Field | Value |
|---|---|
| Tier | TIER1 |
| Primary source | Thibaudin et al. Nat Med 2023 (DOI 10.1038/s41591-023-02497-z); PMID 37563240 |
| Evidence level | PHARMACODYNAMIC ACTIVITY — immune biomarker signals; IO contribution unattributable |
| Backbone match | EXACT — mFOLFOX6 without bevacizumab |
| BLOCKED fields | None in this file |
| PATH B | Not used |
