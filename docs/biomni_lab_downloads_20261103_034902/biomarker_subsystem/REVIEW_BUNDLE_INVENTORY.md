# Review Bundle Inventory — Dispersed-CIN / Resistance-Prophet Integration

Prepared for review. **Nothing has been committed or pushed.** All changes are staged locally in working clones and mirrored to results/handoff folders.

---

## A. Manuscript hardened to submission-ready

Results folder (`biomarker_subsystem/`):
- `manuscript_dispersed_CIN_HGSOC.md` — hardened manuscript (submission-ready)
- `SUBMISSION_CHECKLIST.md` — pre-submission checklist

Integrity re-verified on final disk state:
- "chromothripsis" appears only as negated / caveated framing (never asserted as a diagnosis)
- PTEN consistently labeled "Consider" / hypothesis-generating / candidate (never validated/proven)
- No external AUROC values presented as a result of this study
- Explicit Darwinian selection-vs-induction framing (favors selection on parsimony; cannot exclude induction)
- Subject 260 framed as third independent replication of Subjects 191 and 6

## B. Publication package created — `publications/13-hgsoc-dispersed-cin/`

(in the `crispro` working clone; untracked, not committed)

```
README.md
SUBMISSION_CHECKLIST.md
manuscript/MANUSCRIPT.md
figures/fig_ranked_signals_and_breakpoints.png
figures/fig_ranked_signals_and_breakpoints.svg
receipts/EVIDENCE_CONTRACT.md
receipts/cin_resistance_evidence_v1.json
receipts/resistance_prophet_CIN_integration_SPEC.md
receipts/breakpoint_architecture_with_subj260.csv
receipts/subj260_analysis_meta.json
receipts/subj260_cn_qc.csv
receipts/subj260_breakpoint_delta_by_chrom.csv
receipts/subj260_gene_cn_dx_vs_relapse.csv
```

## C. De-slop of `publications/03-sae-resistance/` (COMPLETE)

Root reduced 17 → 5 canonical files. **Kept at root:**
- `README.md` (rewritten)
- `ERRATA.md`
- `VALIDATION_RESULTS_FINAL.md` (DDR_bin prognostic result)
- `VALIDATION_SUMMARY_FINAL.md` (MFAP4 / EMT external validation)
- `SLOP_CLEANUP_MANIFEST.md` (new — records every move)

Git-level changes (history preserved):
- **12 files moved to `archive/`** — 11 tracked as git RENAMES + `VALIDATION_SUMMARY.md` → `archive/VALIDATION_SUMMARY_oldindex.md`
- **1 DELETE**: `Scrap.mdc` (byte-identical duplicate of `MANAGER_ROOT_CAUSE_ANALYSIS.mdc`, md5 `3dd237f60bfdc79491aa5c6b9c6ea3d2`)
- Subdirs preserved intact: `figures/`, `manuscript/`, `mdc_files/`, `receipts/`, `rxiv/`, `scripts/`, `validation_audit/`

Reframing decision: 03-sae-resistance is a **different, leakage-troubled study** (SAE/Evo2 + DDR + MFAP4/EMT). It is **NOT merged** with the clean dispersed-CIN paper — merging would contaminate the clean cohort result. Cross-referenced honestly instead.

## D. Product evidence layer

Results folder (`biomarker_subsystem/product_integration/`), mirrored to shared handoff (`cin_product/`):
- `cin_resistance_evidence_v1.json` — canonical versioned evidence artifact (schema 1.0.0, evidence_class `hypothesis_generating`, tier `Consider`)
- `EVIDENCE_CONTRACT.md` — data contract governing the artifact
- `resistance_prophet_CIN_integration_SPEC.md` — backend integration spec

## E. Backend Resistance-Prophet integration — SPEC ONLY

`crispro-backend-v3` and `crispro-backend-v2` were **unreachable** (404 unauthenticated; 401 with the Brenus PAT, which is scoped only to `fjkiani/Brenus`). Backend work is therefore a specification, grounded in the documented Prophet contract found in the repo (`mdc_files/SAE_TO_RESISTANCE_PROPHET_PIPELINE.mdc`), not in memory.

Key spec properties:
- Mechanism vector is 7D; **PI3K is index 2**
- PTEN neutral→loss finding **extends the existing validated PI3K OV signal** (RR 1.39, p=0.02) at tier "Consider"
- Hard-capped so PTEN/CIN can **never alone drive a HIGH call** (`PI3K_CIN_CONTRIB=0.15`, `PI3K_CONSIDER_CAP=0.60`, below the 0.70 HIGH threshold)
- Trigger fires only on PTEN neutral→loss acquired transition; dispersed-CIN is a modifier, not a gate
- Includes 6 engine-owner test fixtures

## F. Frontend feature — build-ready (`crispro-front-end` working clone, branch `feature/biomarker-subsystem`)

**Vite build PASSED (exit 0); module confirmed present in built bundle.**

- Modified: `src/routes/researchRoutes.jsx` — added guarded route `/research/resistance-cin` (`PersonaRoute allowedPersonas={['researcher']}`, dev/research only, NOT in production nav)
- New:
  - `src/schemas/cinResistance_v1.js` (zod; tier hard-constrained to "Consider", evidence_class to "hypothesis_generating")
  - `src/data/demos/cinResistanceDemoData.js` (embeds verified receipt values)
  - `src/features/resistance-cin/api.js` (static read + documented live swap-point to `/api/resistance/predict`)
  - `src/features/resistance-cin/types.js`, `useResistanceCin.js`
  - `src/features/resistance-cin/components/{CinArchitectureCard,PtenNominationCard,RationaleDrawer,ResistanceCinPanel}.jsx`
  - `src/pages/ResistanceCinResearch.jsx`

## Safety scans (final disk state — ALL PASS)

- Credential scan (`ghp_…`, EGA password, private keys, `password[:=]`, `secret[:=]`) across all shipped repo + product files: **zero hits**
- Absolute-path leak scan (`/mnt/`, `/workspace/`) across all shipped files: **zero hits**

## Git status (surgical, verified)

- `crispro`: only `publications/13-hgsoc-dispersed-cin/` (untracked) + 03-sae reorg (12 renames, 1 delete, README modified, manifest untracked). No other files touched.
- `crispro-front-end`: 1 modified (`researchRoutes.jsx`) + 10 untracked new files. No other files touched.

**NOTHING PUSHED.** Requires explicit approval + working credentials for the `crispro` / `crispro-front-end` repos (the Brenus PAT does not cover them).
