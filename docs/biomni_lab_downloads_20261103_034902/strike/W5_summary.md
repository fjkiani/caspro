# W5 — Strike Team Summary

Generated: 2026-07-16T03:42:58.625069+00:00
Formula: `PATH_A: fit = clip((p·t) / ||t||_2, 0, 1)`
Unified registry sha256: `ac96437f9bb0fe28ec205f3b714b6dca2e864f1520707c39653fefb39bcdf034`

## Release-gate: **NO_GO**  (5/7)

- **[PASS] R1_path_a_locked**
    - formula line [42, 'PATH_A_FORMULA = "fit = clip((p·t) / ‖t‖₂, 0, 1)"']
    - dot line [335, 'dot_product = sum(p * t for p, t in zip(patient_vector, trial_vector))']
    - magnitude line [341, 'return max(0.0, min(1.0, dot_product / trial_magnitude))']
    - path_b_detected=False
- **[PASS] R2_registry_unified**
    - moa_vectors_rows=283
    - clinical_trials_rows=2979
    - unified_db_sha=ac96437f9bb0fe28
    - axes=['ddr', 'mapk', 'pi3k', 'vegf', 'her2', 'io', 'efflux', 'rss']
- **[FAIL] R3_p0_causality_no_drops**
    - P0 PASS: 3/7
    - FAIL PD-L1_IO — PD-L1/CPS must reach IO pathway
    - FAIL MSI_TMB_IO — MSI/TMB must feed IO boost
    - FAIL KRAS_BRAF_MAPK — KRAS/BRAF must reach MAPK pathway
    - FAIL PTEN_PI3K — PTEN must reach PI3K pathway
- **[FAIL] R4_redteam_static_fail_zero**
    - A4_pdl1_silent_drop_io_boost — Populate PD-L1 CPS=50; verify it reaches IO score (P0 causality)
- **[PASS] R5_adversarial_defenses**
    - empty_vector→0 OK: 5/5
    - zero_dominant demoted: 5/5
- **[PASS] R6_blocked_claim_leaks_reference_only**
    - total leak scan results: 14
    - REFERENCE_ONLY: 14
    - true LEAK: 0
- **[PASS] R7_confidence_cap_and_stubbed_disclosure**
    - confidence_cap.py present=True
    - STUBBED marker in therapy_fit/scoring.py verified=True

## Deliverables shipped

- `W5_release_gate.json` — machine-readable gate
- `W5_open_items.md` — honest list of remaining work
- `W5_receipts_bundle.zip` — all worker outputs

## Substrate summary
- Trial JSON entries scanned: 609
- SQLite metadata rows: 2979
- Rows accepted into `moa_vectors`: 283
- Rows dropped (non-oncology + silent-zero): 326
- Scoreable via PATH A (inner join + oncology_flag=1): 67

## Adversarial receipts
- fixture `A_HGSOC_HRDlow` top-1 = `NCT05450692` fit=`0.634675`
- fixture `B_MSS_CRC_STC1010` top-1 = `NCT03579316` fit=`0.679815`
- fixture `C_HER2plus_gastric` top-1 = `NCT06732336` fit=`0.9`
- fixture `D_TNBC_BRCA1_germline` top-1 = `NCT05457595` fit=`0.836748`
- fixture `E_MSI_H_CRC` top-1 = `NCT01174121` fit=`0.85`
