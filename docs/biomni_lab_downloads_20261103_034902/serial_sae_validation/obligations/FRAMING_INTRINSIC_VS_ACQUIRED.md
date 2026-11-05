# OBL#5 — Intrinsic-vs-Acquired Framing Reconciliation

**Status: RESOLVED (writing/interpretation obligation; no new computation required).**
**Governing rule: CrisPRO does NOT "refute" Nature's DNA-stability conclusion. We agree at the DNA layer. The novel contribution is confined to the RNA-interpretation layer.**

---

## 1. What Nature (BriTROC-1, Smith et al., *Nat Commun* 14:4387, 2023) actually concludes at the DNA layer

Two source-paper conclusions are directly relevant, and both are the authors' own (not CrisPRO-derived):

1. **Genome stability diagnosis → relapse.** The HGSOC copy-number landscape is largely stable between diagnosis and relapse.
2. **No selection for common CN drivers.** Acquired platinum resistance does **not** select for common copy-number driver events.

Source for these being Nature's own conclusions (not ours): documented in `w5_references.json` (topic: "BriTROC 'genome-stable' headline vs serial-SAE s7-at-relapse use") and in the manuscript's own reference-8 validation note.

**Important honesty correction to the prior internal framing:** an earlier internal summary described a CrisPRO "bottleneck-selection test [that] found no enrichment of the resistance-associated amplifications in survivors." **No such independent enrichment test exists on disk** (searched `/mnt/shared-workspace/shared/serial_sae_validation/` — only Nature's own reported conclusion is present). Therefore the correct statement is: *Nature reports no selection for common CN drivers; CrisPRO did not run and does not claim an independent bottleneck-selection test.* We agree with Nature's conclusion; we do not manufacture a separate test to "set against" it.

---

## 2. Why stability is COMPATIBLE with (not contradicted by) an intrinsic / pre-existing resistance model

The logical error to avoid: treating "DNA barely changes" as evidence *against* resistance being real or as evidence *for* an acquired-resistance narrative.

- If DNA-level structure barely changes from diagnosis to relapse, **and** a diagnosis-stage DNA feature nonetheless carries outcome information, that pattern is **consistent with an intrinsic (pre-existing) resistance state** — the informative structure is already present at diagnosis and persists.
- A stable genome is therefore *evidence for* the plausibility of an intrinsic-state model, not evidence for active, selection-driven acquisition of resistance.
- Nature's "no selection for common CN drivers" removes the affirmative evidence one would need to claim *active DNA-level selection during treatment*. CrisPRO has **no** independent evidence of active selection to set against this, so CrisPRO must not imply one.

**Net DNA-layer position: CrisPRO agrees with Nature.** DNA structure is stable; there is no demonstrated active copy-number selection; the diagnosis-stage signal is compatible with a pre-existing intrinsic state.

---

## 3. Where the genuinely novel CrisPRO contribution lives: the RNA-interpretation layer

The novel contribution is **not** a competing DNA-layer claim. It is a statement about how **bulk / mean-expression post-treatment RNA** should be interpreted:

- In paired single-cell HGSOC NACT data (GSE165897, n=11), the apparent post-treatment collapse of HR / cell-cycle pathway *mean-expression scores* is **substantially explained by proliferative arrest**, not by a change in DNA-repair status (quantified in OBL#4).
- This is an **RNA-interpretation** finding: it explains why a post-treatment bulk-RNA pathway score can move for reasons unrelated to the underlying repair genotype, and it is a mechanism the source study did not test.

This layer separation is the whole reconciliation:

| Layer | Nature's finding | CrisPRO's position | Relationship |
|---|---|---|---|
| **DNA (copy-number)** | Stable diagnosis→relapse; no selection for common CN drivers | Agree; no independent selection test claimed; stable genome is compatible with intrinsic pre-existing state | **Agreement** |
| **RNA (mean-expression pathway scores)** | Not tested in source study | Post-treatment HR/cell-cycle score shifts are proliferation-confounded (OBL#4) | **Novel extension, no conflict** |

---

## 4. Language rules enforced downstream (feed into CLAIM_LEDGER)

**PROHIBITED language (category errors / overreach):**
- "CrisPRO refutes Nature's genome-stability conclusion."
- "CrisPRO's bottleneck-selection test found no enrichment in survivors" — we did not run one.
- Any framing that positions the RNA finding as a *contradiction* of the DNA finding.
- "acquired resistance is an illusion"; "resistance is not real."

**PERMITTED language:**
- "At the DNA copy-number layer, our reading is concordant with Nature: structure is largely stable diagnosis→relapse and there is no reported selection for common copy-number drivers, a pattern compatible with substantially pre-existing (intrinsic) resistance."
- "Our novel contribution is at the RNA-interpretation layer: in paired single-cell NACT data, apparent post-treatment collapse of HR/cell-cycle mean-expression scores is substantially explained by proliferative arrest rather than a change in DNA-repair status."

---

## 5. Consequence for the s7-at-relapse discrimination claim

The s7-at-relapse result (AUROC 0.874, +0.18 vs diagnosis) must **not** be read as evidence of resistance-driven genomic remodeling — that would contradict Nature's stability conclusion. It is a modest discrimination shift resting on **3 resistant patients** (LORO-unstable per `w3_rigor.json`), and, per OBL#2, it is label-definition-dependent (RECIST label 0.874 → registration label 0.314 on the same feature matrix). It is therefore an **internal exposure/dosage discrimination metric**, not evidence of active driver selection, and is treated as such in the ledger.
