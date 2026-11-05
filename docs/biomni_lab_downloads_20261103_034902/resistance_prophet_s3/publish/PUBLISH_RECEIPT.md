# PUBLISH RECEIPT — Resistance Prophet S3 program (2026-08-19)

## Outcome: PUBLISHED — branch pushed + draft PR opened (updated 2026-08-19, second attempt)

**Draft PR #22: https://github.com/fjkiani/Brenus/pull/22** — `review/resistance-prophet-s3-candidate`
(tip `def6460`, verified identical remote/local) → base `feature/zeta-core-v4-universal-kinetics`;
draft = true; 51 files, 9,820 additions.

Credential history: the originally stored Brenus PAT failed (401, revoked/expired); the session GitHub
connector cannot see the private repo (404); the first replacement token supplied in chat also failed
(401 "Bad credentials" — consistent with GitHub auto-revocation of exposed tokens). A newly supplied PAT
was verified (200 on `/user` and `/repos/fjkiani/Brenus`), stored at `/workspace/.env`
(`GITHUB_PAT_BRENUS`, mode 600, value never echoed), and used for the push and PR creation. The dead PAT
was scrubbed from `origin` (remote URL is now the clean `https://github.com/fjkiani/Brenus.git`).
**This new token has also been transmitted in chat and should be rotated after use.** The backend
repository remains patch-series-only per the approved plan (not pushed).

The sections below retain the full artifact record (bundles + patches remain valid fallback vehicles).

## What exists locally (all verified)

### 1. Brenus — review branch `review/resistance-prophet-s3-candidate`

- Local repo: `/workspace/Brenus`, branch tip commit `def6460` on base `971b0a9`
  (`feature/zeta-core-v4-universal-kinetics`).
- Contents: 51 files under `clinical_validation/trackA/resistance_prophet_s3/` — the complete deliverable
  set including `SHA256SUMS` (50 deliverables, `sha256sum -c` rc=0).
- Artifacts:
  - `brenus_s3_review_branch.bundle` — **full-history bundle** (self-contained; clones from empty).
    `git bundle verify`: "The bundle records a complete history."
  - `brenus_s3_review_def6460.patch` — single-commit binary patch. **Functionally verified:** applied with
    `git am` onto a scratch worktree at `971b0a9`; resulting tree is byte-identical to the branch tip
    (0 diff lines).

### 2. crispro-backend-v2 — review branch `review/resistance-prophet-s3-research`

- Local worktree: `/workspace/s3work/backend_wt`, three commits on base `80531e7f`:
  1. `a39fb9c9` — fail-closed guard on the Sig7 prognosis branch (D2 remediation).
  2. `710c109d` — S3 research candidate v0.2.0 shadow scorer + 85-test adversarial suite.
  3. `0c0dde62` — `PROPOSED_PATCH_C02_C03.md` (documented, deliberately **not** applied).
- `.cache/` deliberately excluded from all commits.
- Artifacts:
  - `crispro_backend_v2_s3_review_series.patch` — 3-patch `format-patch --binary` series.
    **Functionally verified:** applied with `git am` onto a scratch worktree at `80531e7f`; resulting tree
    is byte-identical to the branch tip (0 diff lines).
  - `crispro_backend_v2_s3_review.bundle` — incremental bundle; **requires** the recipient to have
    `80531e7f` (the repo HEAD at branch point). `git bundle verify` passed.
- Per the approved plan, the backend repo is delivered as patch series + bundle **only** — it is not pushed
  anywhere. The previously exposed backend PAT remains compromised and unused; rotation is still open
  (Gate F §6.4).

## Checksums

`SHA256SUMS.publish` (this directory) pins all four artifacts.

## To complete the publish after PAT rotation

```bash
# Brenus (from the machine holding /workspace/Brenus, or fresh clone + bundle fetch)
cd /workspace/Brenus
git remote set-url origin https://<NEW_PAT>@github.com/fjkiani/Brenus.git
git push -u origin review/resistance-prophet-s3-candidate
# then open a DRAFT PR: base feature/zeta-core-v4-universal-kinetics (or main),
# head review/resistance-prophet-s3-candidate

# Backend (maintainer applies inside crispro-backend-v2)
cd crispro-backend-v2
git am /path/to/crispro_backend_v2_s3_review_series.patch   # lands 3 commits on 80531e7f
```

## Draft PR body (ready to paste)

**Title:** Resistance Prophet S3: audit, evidence reconstruction, clinical-proof program, candidate v0.2.0

**Body:**
From-source audit and reconstruction of the S3 (Macintyre 2018 signature 3, diagnosis timepoint)
platinum-resistance signal in BriTROC-1, plus the versioned research candidate behind
`ZETA_S3_RESEARCH_ENABLED` shadow scoring.

- Architecture map + contradiction register (17 rows, C01–C17) across branches.
- From-source reproduction: n=98 primary, protective AUROC 0.7285 [0.5942, 0.8468]; the receipted 0.8807
  shown algebraically identical to 1 − AUROC(raw) to 1.11e-16.
- `ENDPOINT_CONTRACT` v1.0.0 (binary `pt_sensitivity_at_reg`; never `s3_diag < 0.10`).
- Candidate spec **v0.2.0**: threshold LOCKED at **0.075** (Youden-grid optimum on n=98; inside the 100-fold
  envelope [0.0502, 0.0798] and bootstrap CI [0.0467, 0.2084]); **0.10 permanently REJECTED_AS_LOCK**.
- Gate E designated decision hardcoded: *prioritize s3_diag ≤ 0.075 patients for non-platinum
  clinical-trial screening* (research hypothesis only).
- Gates A–F clinical-proof program + prospective silent-validation protocol skeleton (v0.2.0).
- **NFE-1 (executed):** s3↔CX framework crosswalk on TCGA-OV (n=529): ρ = 0.305 [0.227, 0.382] — criterion
  NOT MET; CX-cohort validation route CLOSED; Gate C route is direct Macintyre s1–s7 quantification.
- **NFE-3 (executed):** within-fold MICE on n=98: ΔAUROC 0.1836 [0.1563, 0.2109] excludes zero; Gate B5 →
  PASS_WITH_CAVEATS; complete-case 0.3525 was inflated by outcome-selective exclusion.
- Adversarial suites green: 85 + 116 + 43; backend baseline independently RED (231 failing/erroring nodes),
  zero regressions attributable to this work.

**Status: RESEARCH USE ONLY.** No calibrated-probability claim (Brier skill −0.2762). No external
validation (Gate C BLOCKED). No clinical threshold. Draft — do not merge without clinical, quality, and
regulatory review (Gate F §6.4).
