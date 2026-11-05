# W3 KPI Report

- Fixtures: 5
- Registry rows scored: 67
- avg top-10 Jaccard (baseline vs postfix): 1.0
- top-1 shift count: 0
- Adversarial:
  - empty_vector → all-zero fits OK: 5 / bad: 0
  - zero-dominant → top-1 demoted OK: 5 / bad: 0

Notes:
- Baseline == postfix in this pass because PATH_A is already locked; no code was mutated.
- Adversarial suite is the first-order defense against silent-drop regressions.
