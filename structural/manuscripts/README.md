# Manuscript animations — narrated structural/mechanistic GIFs

Long-form, heavily-narrated animated GIFs for two manuscripts, in the visual language of
`AK_case/.../MBD4_catalytic_loss_morph.gif` but with deep chaptered on-frame narration and strict
per-claim evidence-status banners.

- **Manuscript 00** — MBD4 -> ATR therapeutic reframe
- **Manuscript 12** — BRM (brain-metastasis) CrisPRO interception

## Governing principle: 3D vs 2D is a scientific-integrity choice, not a style choice

A structural 3D morph is only honest when there is a **genuine structural event backed by a real fold**
(domain loss, point mutation in a folded domain, drug/DNA binding). Most claims in these two papers are
pharmacogenomic, evolutionary, or pathway-level — forcing them into fake 3D would imply structural
evidence the papers do not have. So:

- **Real AF2/Boltz 3D morphs** (PyMOL 3.1.0 headless, `ray_trace_mode=0`) only for real structural events.
- **Richly-annotated 2D mechanistic animations** (matplotlib) for everything else, at the same narration depth.
- **No AI-generated images anywhere.**
- All on-frame numbers are quoted **verbatim** from the source manuscripts and cited on-frame.
- RUO throughout; structural confidence (pLDDT) = modeling confidence only; illustrative morph between
  two predicted states, **not molecular dynamics**.

## Wave 0 (delivered)

| ID | File | Form | Frames | Evidence status |
|----|------|------|--------|-----------------|
| A1 | `M00_A1_MBD4_catalytic_loss_narrated.gif` | 3D morph (real AF2) | 124 | AF2 MODELING CONFIDENCE — RUO |
| A2 | `M00_A2_MBD4_dual_axis_mechanism.gif` | 2D chaptered | 220 | VALIDATED (Axis1) / STRONG (Axis2) |
| A3 | `M00_A3_PARP_hypothesis_falsified.gif` | 2D chaptered | 170 | FALSIFIED / HYPOTHESIS REMOVED |
| A4 | `M00_A4_ceralasertib_stress_tests.gif` | 2D animated | 200 | STRONG (confirmatory) |
| B1 | `M12_B1_mutation_blind_spot.gif` | 2D chaptered | 174 | FUNCTIONAL EVIDENCE (non-mutational) |
| B3 | `M12_B3_interception_cascade.gif` | 2D animated | 126 | FUNCTIONAL EVIDENCE |
| B4 | `M12_B4_Evo2_GOF_LOF_panel.gif` | 2D chaptered | 184 | EVOLUTIONARY PREDICTION (Evo2, zero-shot) |

Every still was run through a visual QA media-check and regenerated on any clip/overlap/unreadable text
before acceptance. Full paper-sourced numbers, citations, render params, and media-check results are in
`receipts/wave0_receipts.json`.

## Pending structural waves (GPU-gated, hard cap 3 concurrent)

- **A5** — ATR+ceralasertib, WEE1+adavosertib, PARP1+olaparib (apo -> bound)
- **B2** — BACE1 beta-secretase protease (apo -> inhibitor)
- **B5** — structural variant panel (KRAS, EGFR-kd, PIK3CA-kd, TP53 hotspots, CCND1 truncation),
  each annotated with its Evo2 delta-log-likelihood

In-flight folds (TP53_R175H, PDGFRA_WT, PDGFRA_S755P) feed both this set and the earlier AK-case reel.

## Layout

```
manuscripts/
  analysis/     # render scripts + shared grammar (anim_common.py)
  gifs/         # rendered GIFs (also mirrored to the results panel)
  receipts/     # per-animation receipts JSON (form, engine, numbers, citations, media-check)
  README.md
```

## Reproduce

- 2D animations: `/workspace/.venv/bin/python analysis/<script>.py`
- 3D (A1): render frames with `micromamba run -p /workspace/.conda/pymol pymol -cq analysis/a1_mbd4_morph_pymol.py`,
  then compose narration with `/workspace/.venv/bin/python analysis/a1_mbd4_compose.py`.
