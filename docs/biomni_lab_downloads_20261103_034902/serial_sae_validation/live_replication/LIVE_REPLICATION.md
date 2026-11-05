# Serial SAE — Live Replication Test (frozen serial_sae_v1)

Generated 2026-07-24T05:35:55.755135+00:00 · all files re-pulled live this session, SHA-verified.

**Success criterion:** predicted direction (higher post-treatment pathway score -> resistant, AUROC>0.5) in >=2 independent cohorts BEYOND BriTROC-1

**Cohorts beyond BriTROC-1 supporting predicted direction: 1 → criterion MET = False**

| Cohort | Tests prediction? | Key metric | AUROC | Detail | Resistant n | Direction | Verdict |
|---|---|---|---|---|---|---|---|
| GSE165897 (discovery, live re-derived) | Yes | post-DDR AUROC / post-DDR rho | 0.571 | rho=-0.2091 p=0.5372 | 7 | uninformative / headline NOT reproduced (pub rho -0.711) | FAIL to reproduce headline |
| BriTROC-1 (open CN, carried) | Yes | CN sig7 relapse AUROC | 0.874 | p=0.035 CI0.7622-0.9717 | 3 | >0.5 (pred) | POSITIVE but fragile (EPV=3; CN not expression) |
| GSE160626 (DDR, live) | post-state analogue | DDR AUROC R-vs-S | 0.375 | p=0.4082 CI0.1169-0.6769 | 8 | OPPOSITE(<0.5) | OPPOSITE direction |
| GSE160626 (PI3K, live) | post-state analogue | PI3K AUROC R-vs-S | 0.212 | p=0.0434 CI0.025-0.475 | 8 | OPPOSITE(<0.5) | OPPOSITE direction |
| GSE160626 (VEGF, live) | post-state analogue | VEGF AUROC R-vs-S | 0.350 | p=0.3154 CI0.0863-0.6111 | 8 | OPPOSITE(<0.5) | OPPOSITE direction |
| GSE109934 (live) | No labels | paired dynamics only (NO resistance labels) |  | paired pre/post NanoString; no resistance labels -> tests DY | 0 | n/a | Cannot test prediction (no resistance labels) |
| GSE241908 (live) | No labels | secondary paired delta-null check only (cannot test prediction) |  | in-vitro before/after chemo primary cultures; NO resistance  | 0 | n/a | Cannot test prediction (no resistance labels) |

## Bottom line

Re-pulled live and re-scored under the frozen pipeline: the discovery headline does NOT reproduce (post-DDR rho -0.209 vs published -0.711); the only positive external cohort remains BriTROC-1 (CN sig7, 3 resistant, EPV=3); the independent expression cohort GSE160626 is OPPOSITE direction (PI3K p=0.043); paired cohorts lack resistance labels and cannot test prediction. The resistance-PREDICTION claim does not replicate in openly obtainable data. A paired serial cohort WITH platinum-response outcomes (the HERCULES/MSK-SPECTRUM design) is required to test it, and is behind controlled access.