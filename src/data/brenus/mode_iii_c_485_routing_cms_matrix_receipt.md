# Mode iii-C — 485 MSS CRC routing & CMS matrix (RUO)

**Source:** `src/data/pharma/crc-ranker-v1/crc_ranker_results_v2_gated.csv`  
**SHA256:** `05971fa34de76fecf48b685a825123483a0fb40b79f006b17eb4c8278c9c37e7`  
**Machine receipt:** `mode_iii_c_485_routing_cms_matrix_receipt.json`

## Column honesty
- Modes present: `top_1_trial_iiia` (iii-A), `top_1_trial_iiib` (iii-B), `top_1_trial_iiic` (iii-C) only.
- Trial aliases: MOSAIC→TRIBE2, HORIZON_III→CALGB80405, VELOUR→FIRE3.
- No `stress_tier`; `cms_label` heavily `UNLABELELED`.

## Verified strata (n=485)
| Stratum | n |
|---------|---|
| Gate-2 Hot non-POLE | 146 |
| Gate-2 Cold non-POLE | 327 |
| POLE / TMB≥10 | 12 |
| Hot Triple-WT | 84 |
| Hot KRAS/NRAS-mut | 56 |
| Hot BRAF-mut | 6 |
| Cold Triple-WT | 169 |
| Cold KRAS/NRAS-mut | 151 |
| Cold BRAF-mut | 7 |

## Rank-#1 highlights (cold only, n=327)
| Mode | STC_1010 rank-#1 | When STC off (top) |
|------|------------------|---------------------|
| iii-A | 303 | N0147 22, TRIBE2 2 |
| iii-B | 129 | PRIME 168, N0147 30 |
| iii-C | **0** | N0147 158, FIRE3 151, TRIBE2 18 |

## Mode iii-C STC capture (non-POLE, by CMS)
See JSON `mode_iii_c_stc_capture.by_cms_non_pole` for fractions (STC rank-#1 under iii-C routing).

## ATR_DDR secondary rescue (Gate-2 cold)
Proxy rule in receipt: FGA≥0.2671 OR BRCA OR p_ddr≥0.4 — see `all_42_trials_vector_audit_v2.json` for registry-aligned DDR/FGA counts on n=327.

**Research Use Only — not for clinical decisions.**