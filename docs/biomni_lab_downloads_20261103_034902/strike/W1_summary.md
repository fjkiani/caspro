# W1 — Score Path Repair — Summary

- Patient-input rows analyzed: 34
- SILENT_DROP count:            2
- P0 causality PASS:            3/7
- PATH A verdict:               PATH_A_LOCKED_IN_RUNTIME
- Trial JSON entries:           609
- Trial axes match expected:    True
- Regression tests emitted:     4
- Code modifications this pass: 0 (see rationale in W1_score_path_diff.patch)

Deliverables:
  W1_input_to_score_matrix.csv
  W1_runtime_trace.json
  W1_before_after_scores.json
  W1_score_path_diff.patch
  regression_tests/  (4 files)
  p0_checks.json
  path_a_verification.json
  vector_dimensions.json
