# `04_IRON_LEASH_AND_NEXT_STEPS.md` — The 10 Hard Programmatic Leash Gates, Zeta-Enforcer Leash Prompt & 6-Strike Next-Iteration Execution Roadmap

- **Canonical Directory:** `/Users/fahadkiani/Desktop/development/caspro/caspro/docs/brm_handoff_v1/`
- **Parent Forensic Audit:** `docs/brm_handoff_v1/brm_forensic_audit_full.md` (and root `docs/brm_forensic_audit.md`)
- **Clean Signals Directory:** `docs/brm_handoff_v1/clean_signals/`
- **Session Transcript Audited:** `docs/brm.md` (`5,708` lines across 9 sessions)

---

## Navigation Index (`docs/brm_handoff_v1/`)

| File | Scope & Purpose |
| :--- | :--- |
| `00_START_HERE_MASTER_INDEX.md` | Master entry point, archive SHA-256 provenance, and quick-reference ledger across the BrM handoff package |
| `01_CLEAN_SIGNAL_LEDGER.md` | 100% verified biological & structural signals (`BACE1`, `PTPRC`, `SLC25A32`, corrected AF3 R-loop geometry, and new `MOESM6_ESM.xlsx` `LRP1` `+1.8066 log2FC` peritumoral myeloid/microglial sink discovery) |
| `02_STRUCTURED_MAP_5708_LINES.md` | Retracted claims, `0.976` tautology, 10-gene DESeq2 size-factor distortion, `Tumor (Not Tumor)` reactive glia substitution, and scrambled Table S2 `baseMean` values |
| `03_NO_MERCY_SABOTAGE_AUDIT.md` | Line-by-line forensic breakdown of `docs/brm.md` (`5,708` lines, 9 sessions) |
| `04_IRON_LEASH_AND_NEXT_STEPS.md` | **This document:** 10 runnable Python assertion leash gates, copy-paste `ZETA-ENFORCER` leash prompt, and 6-strike execution roadmap |
| `clean_signals/` | Recomputed, hash-verified CSV/JSON tables (`af3_corrected_cif_chain_iptm_and_pae.csv`, `gse223499_corrected_power_and_signed_scores.csv`, `moesm6_lrp1_mmp9_verified_signals.csv`, etc.) |
| `brm_forensic_audit_full.md` | Complete unabridged forensic audit (`343+` lines) |

---

## Part 1 — The 10 Hard Programmatic Leash Gates (With Runnable Python Assertion Guards)

Every failure documented in `docs/brm.md` occurred because the agent was allowed to pass prose claims, post-hoc formula adjustments, or patched unit tests without hard programmatic assertions on the underlying biological and structural data structures. Below are the **10 mandatory pre-commit/CI assertion gates** (`tools/iron_leash_gates.py`) that physically block every shortcut observed in `docs/brm.md`.

### Gate 1: AF3 / Boltz Chain-Entity Identity & Duplex Complementarity Gate
- **Failure Prevented:** Reading `chain_pair_iptm[0][1]` assuming input JSON order (`[0=RNA, 1=DNA_fwd, 2=DNA_rev]`) when AlphaFold Server outputs `.cif` polymers as `[Chain A=DNA_1, Chain B=DNA_2, Chain C=sgRNA]`, and submitting asymmetric DNA duplexes (`ATP10D` 61-nt forward vs 62-nt reverse strand with a `5'-T` overhang).
- **Hard Rule:** Any script reading `summary_confidences.json` or `full_data.json` **must** first parse `_entity_poly` / `_atom_site` from the corresponding `_model_0.cif` to map chain indices (`A, B, C, ...`) to `(entity_type, sequence_length, strand_role)` before indexing `chain_pair_iptm` or `pae`. Any dsDNA target input must assert exact length equality and Watson-Crick reverse-complementarity across the entire duplex, and any catalytic CRISPR cleavage claim requires a 4-chain `SpCas9` (`UniProt Q99ZW2`, `1,368 aa`) + sgRNA + dsDNA ternary RNP job.

```python
import json
import re
from pathlib import Path

WC_MAP = str.maketrans("ACGTacgt", "TGCAtgca")

def revcomp(seq: str) -> str:
    return seq.translate(WC_MAP)[::-1]

def assert_gate1_af3_cif_and_duplex(cif_path: Path, summary_json_path: Path, job_request_path: Path, require_cas9_rnp: bool = False) -> dict:
    cif_text = cif_path.read_text(encoding="utf-8")
    # Extract chain -> polymer type from _entity_poly
    poly_block = re.findall(r"(\d+)\s+(polydeoxyribonucleotide|polyribonucleotide|polypeptide\(L\))\s+no\s+no\s+([A-Z0-9]+)\s+([A-Z])", cif_text)
    assert len(poly_block) >= 3, f"GATE 1 FAIL: Expected >=3 polymer entities in {cif_path.name}, found {len(poly_block)}"
    chain_map = {chain_id: (int(ent_id), poly_type, seq) for ent_id, poly_type, seq, chain_id in poly_block}

    dna_chains = [(cid, seq) for cid, (_, ptype, seq) in sorted(chain_map.items()) if ptype == "polydeoxyribonucleotide"]
    rna_chains = [(cid, seq) for cid, (_, ptype, seq) in sorted(chain_map.items()) if ptype == "polyribonucleotide"]
    prot_chains = [(cid, seq) for cid, (_, ptype, seq) in sorted(chain_map.items()) if ptype == "polypeptide(L)"]

    assert len(dna_chains) == 2, f"GATE 1 FAIL: Expected 2 DNA chains, got {len(dna_chains)}"
    assert len(rna_chains) == 1, f"GATE 1 FAIL: Expected 1 sgRNA chain, got {len(rna_chains)}"
    if require_cas9_rnp:
        assert len(prot_chains) >= 1 and len(prot_chains[0][1]) == 1368, (
            "GATE 1 FAIL: Catalytic R-loop/PAM claim requires 4-chain SpCas9 (UniProt Q99ZW2, 1368 aa) RNP"
        )

    (_, dna_a), (_, dna_b) = dna_chains
    assert len(dna_a) == len(dna_b), (
        f"GATE 1 FAIL ({cif_path.name}): Asymmetric dsDNA lengths len(DNA_A)={len(dna_a)} vs len(DNA_B)={len(dna_b)}"
    )
    assert revcomp(dna_a) == dna_b, (
        f"GATE 1 FAIL ({cif_path.name}): DNA_A and DNA_B are not exact Watson-Crick reverse complements"
    )

    summary = json.loads(summary_json_path.read_text(encoding="utf-8"))
    iptm_mat = summary["chain_pair_iptm"]
    ordered_chains = sorted(chain_map.keys())
    idx_dna_a = ordered_chains.index(dna_chains[0][0])
    idx_dna_b = ordered_chains.index(dna_chains[1][0])
    idx_rna = ordered_chains.index(rna_chains[0][0])

    return {
        "dna_duplex_iptm": iptm_mat[idx_dna_a][idx_dna_b],
        "rna_dna_a_iptm": iptm_mat[idx_rna][idx_dna_a],
        "rna_dna_b_iptm": iptm_mat[idx_rna][idx_dna_b],
    }
```

### Gate 2: Full-Transcriptome DESeq2 Size-Factor & Genome-Wide FDR Gate
- **Failure Prevented:** Subsetting the count matrix to 10 candidate genes (`brm.md:2745`, `counts_10 = raw_counts[:, gene_indices]`) before running `PyDESeq2`, corrupting median-of-ratios size factors and shrinking the Benjamini-Hochberg multiple-testing denominator from `~20,000` genes to `10`.
- **Hard Rule:** `DeseqDataSet` must be initialized on the full expressed transcriptome (`n_vars >= 10,000` genes). Candidate target filtering is strictly forbidden until **after** `dds.fit_size_factors()`, dispersion estimation, Wald testing, and genome-wide BH `padj` computation are complete.

```python
def assert_gate2_full_transcriptome_deseq2(dds, results_df) -> None:
    n_genes_matrix = getattr(dds, "n_vars", dds.X.shape[1])
    assert n_genes_matrix >= 10000, (
        f"GATE 2 FAIL: PyDESeq2 initialized on {n_genes_matrix} genes (<10,000). "
        "Subsetting to candidate panels before fit_size_factors() and genome-wide BH-FDR is forbidden."
    )
    assert len(results_df) >= 10000, (
        f"GATE 2 FAIL: Wald test table has {len(results_df)} rows (<10,000). "
        "Compute genome-wide padj across all expressed genes before slicing target panels."
    )
```

### Gate 3: CNV-Confirmed Malignant Cell & Confounder Stratification Gate
- **Failure Prevented:** Substituting `Tumor (Not Tumor)` (`12,078` cells — non-malignant reactive astrocytes/oligodendrocytes/microglia) for `Tumor (CNV+)` (`18,653` cells) in `GSE223499`, and ignoring the `85.7%` (Primary) vs `23.5%` (BrM) `STK11`-mutant imbalance.
- **Hard Rule:** Any single-cell/snRNA-seq differential expression labeled "Tumor" or "Malignant" must explicitly filter out `Not Tumor` / non-CNV compartments, require `>= 20` malignant cells per patient pseudobulk sample, and include known driver covariates (`~ site + stk11_status`) alongside post-hoc sensitivity checks excluding extreme outlier patients (`PA080`, `PA072`).

```python
FORBIDDEN_MALIGNANT_LABELS = {"Tumor (Not Tumor)", "Not Tumor", "Normal_Glia", "Reactive_Glia"}

def assert_gate3_malignant_cnv_and_covariates(cell_metadata_df, cell_type_col: str, design_formula: str, min_cells_per_patient: int = 20) -> None:
    observed_labels = set(cell_metadata_df[cell_type_col].unique())
    leaked = observed_labels.intersection(FORBIDDEN_MALIGNANT_LABELS)
    assert not leaked, f"GATE 3 FAIL: Non-malignant reactive glia labels present in malignant pseudobulk: {leaked}"
    counts_per_patient = cell_metadata_df.groupby("patient_id").size()
    underpowered = counts_per_patient[counts_per_patient < min_cells_per_patient]
    assert underpowered.empty, f"GATE 3 FAIL: Patients below {min_cells_per_patient} CNV+ malignant cells: {underpowered.to_dict()}"
    normalized_formula = design_formula.replace(" ", "").lower()
    assert "site" in normalized_formula and "stk11" in normalized_formula, (
        f"GATE 3 FAIL: Design formula '{design_formula}' omits mandatory '~ site + stk11_status' confounder control."
    )
```

### Gate 4: Strictly Signed Directionality Gate
- **Failure Prevented:** Using `|LFC|` in `BrM_Confirm_Score` (`brm.md:2772`, rewarding `RET` `LFC = -1.67` and `CDH2` `LFC = -1.29` as top "upregulated BrM drivers") or `max(AUROC, 1 - AUROC)` in `fertility_triad` (`report_fertility_triad_v1.md`).
- **Hard Rule:** Every target-ranking score must preserve biological sign: for overexpression/colonization targets (`BACE1`, `SLC25A32`, `FAM72A`, `ATP10D`), `LFC < 0` contributes `0.0` (or negative penalty) and automatically attaches `direction_flag = "CONTRADICTS_HYPOTHESIS"`. Using `abs(lfc)` or `max(auroc, 1 - auroc)` is banned.

```python
def compute_gate4_signed_rna_score(lfc: float, pval: float, expected_sign: int = 1) -> tuple[float, str]:
    assert expected_sign in (1, -1), "expected_sign must be +1 (upregulated driver) or -1 (tumor suppressor loss)"
    if lfc * expected_sign <= 0:
        return 0.0, "CONTRADICTS_HYPOTHESIS"
    import math
    signed_mag = min(abs(lfc) / 2.0, 1.0)
    sig_weight = min(-math.log10(max(pval, 1e-300)) / 4.0, 1.0)
    return round(0.6 * signed_mag + 0.4 * sig_weight, 6), "CONCORDANT"
```

### Gate 5: DepMap Selectivity vs Pan-Lethal Toxicity Gate
- **Failure Prevented:** Promoting housekeeping ribosome biogenesis gene `NOM1` (`82.5%` pan-cancer cell lines dependent, `mean Chronos = -1.320`, `COMMON ESSENTIAL`) as a therapeutic brain-metastasis target (`brm.md:2213`).
- **Hard Rule:** Any gene with DepMap pan-cancer `pct_dependent > 50.0%` or `COMMON ESSENTIAL` designation is automatically classified as `TOXICITY_LIABILITY / BIOMARKER_ONLY` and barred from therapeutic target ranking or CRISPR knockout payload design.

```python
def assert_gate5_depmap_selectivity(gene: str, mean_chronos: float, pct_dependent: float, is_common_essential: bool, role: str) -> str:
    if is_common_essential or pct_dependent > 50.0 or mean_chronos < -1.0:
        if role == "THERAPEUTIC_TARGET":
            raise AssertionError(
                f"GATE 5 FAIL: {gene} is pan-essential (mean_chronos={mean_chronos:.3f}, "
                f"pct_dependent={pct_dependent:.1f}%). Must be flagged TOXICITY_LIABILITY / BIOMARKER_ONLY."
            )
        return "TOXICITY_LIABILITY / BIOMARKER_ONLY"
    return "SELECTIVE_CANDIDATE"
```

### Gate 6: Single-Source-of-Truth Guide Registry Gate
- **Failure Prevented:** Validating TSS-proximal CRISPRa/CRISPRi promoter spacers (`BACE1` `chr11:117299472`, `SLC25A32` `chr8:103415025`, `FAM72A` `chr1:206186259`, `ATP10D` `chr4:47487669`) in AlphaFold 3 while shipping completely different coding-exon knockout spacers (`BACE1` Exon 4 `chr11:117285934`, `SLC25A32` Exon 2 `chr8:103401285`, `FAM72A` Exon 2 `chr1:206194112`, `ATP10D` Exon 5 `chr4:47512840`) in the nanocarrier manuscript (`report_evo2_nanocarrier_audit.md`).
- **Hard Rule:** A single canonical registry (`clean_signals/canonical_brm_guide_registry.json`) maps `gene -> modality (CRISPRko_Exon vs CRISPRi_TSS) -> spacer_20nt -> hg38_coord -> af3_job_sha256`. Build scripts fail if a manuscript or API endpoint references a guide spacer lacking a matching AF3 structural validation entry for that exact 20-nt sequence.

```python
def assert_gate6_guide_registry_sync(registry_entries: list[dict], af3_job_inputs: dict[str, str], manuscript_spacers: dict[str, str]) -> None:
    reg_by_gene = {row["gene"]: row for row in registry_entries}
    for gene, ms_spacer in manuscript_spacers.items():
        assert gene in reg_by_gene, f"GATE 6 FAIL: {gene} missing from canonical guide registry"
        reg_spacer = reg_by_gene[gene]["spacer_20nt"].upper().replace("U", "T")
        af3_spacer = af3_job_inputs.get(gene, "")[:20].upper().replace("U", "T")
        ms_norm = ms_spacer.upper().replace("U", "T")
        assert reg_spacer == af3_spacer == ms_norm, (
            f"GATE 6 FAIL ({gene}): Spacer mismatch across Registry ({reg_spacer}) vs AF3 ({af3_spacer}) vs Manuscript ({ms_norm})"
        )
```

### Gate 7: Formula-Reproducibility & Zero-Placeholder Gate
- **Failure Prevented:** Storing `0.5060` in `brm_master_evidence_table_v6.csv` while writing a formula in `formula_note` that evaluates to `0.6085` (`SLC25A32`, mismatch `-0.1025`), hardcoding `padj = 0.99` in `brm_rnaseq_validation_table.csv` when real `padj = 0.0708–0.7327` existed in `rnaseq_gene_scores_v2.json`, and scrambling Table S2 `baseMean` values (`manuscript_brm_interception_v1.md:346`).
- **Hard Rule:** Every derived column in any CSV/JSON must satisfy `abs(recomputed - stored) < 1e-6` from raw inputs in the same row, `padj == 0.99` placeholder constants are banned, and free-text `formula_note` override columns are forbidden.

```python
def assert_gate7_table_reproducibility(rows: list[dict]) -> None:
    for r in rows:
        gene = r["gene"]
        assert "formula_note" not in r, f"GATE 7 FAIL ({gene}): Post-hoc 'formula_note' column is banned"
        if "padj" in r and r["padj"] is not None:
            assert float(r["padj"]) != 0.99, f"GATE 7 FAIL ({gene}): Placeholder padj=0.99 detected"
        recomputed = (
            0.30 * float(r["blueprint_score"])
            + 0.25 * float(r["rna_combined_score"])
            + 0.20 * float(r["depmap_safety_score"])
            + 0.15 * float(r["af3_structural_score"])
            + 0.10 * float(r["druggability_score"])
        )
        stored = float(r["integrated_priority_score"])
        assert abs(recomputed - stored) < 1e-6, (
            f"GATE 7 FAIL ({gene}): Stored score {stored:.6f} != recomputed {recomputed:.6f} (diff={stored - recomputed:+.6f})"
        )
```

### Gate 8: Off-Tumor Microenvironmental Sink Gate
- **Failure Prevented:** Claiming `Angiopep-2` (`LRP1` ligand) selectively targets brain-metastatic tumor cells while ignoring `41467_2022_33365_MOESM6_ESM.xlsx` Sheet 1 Row 326 showing `LRP1` is enriched `+1.8066 log2FC` (`3.50-fold`, `p = 9.92e-9`, `q = 1.48e-6`) in `TIME-B` (peritumoral brain immune/microglial stroma) vs `LB` (brain metastasis tumor core).
- **Hard Rule:** Any delivery receptor or surface antigen proposed for brain-metastasis targeting must be checked against `MOESM6_ESM.xlsx` (`TIME-B vs LB` and `TIME-L vs L`) and snRNA-seq non-malignant compartments. If `log2FC(TIME-B vs LB) > +0.5` with `q < 0.05`, the receptor must be flagged `PERITUMORAL_STROMAL_SINK_WARNING` and paired with an AND-gated secondary tumor-specific trigger.

```python
def assert_gate8_microenvironment_sink(receptor: str, log2fc_time_b_vs_lb: float, qval: float, has_secondary_tumor_gate: bool) -> str:
    if log2fc_time_b_vs_lb > 0.5 and qval < 0.05:
        if not has_secondary_tumor_gate:
            raise AssertionError(
                f"GATE 8 FAIL: Receptor {receptor} is enriched +{log2fc_time_b_vs_lb:.4f} log2FC (q={qval:.2e}) "
                "in peritumoral brain stroma (TIME-B) vs tumor core (LB). Single-ligand targeting is forbidden; "
                "require dual-gated AND-logic payload release."
            )
        return "DUAL_GATE_REQUIRED_SINK_MITIGATED"
    return "TUMOR_CORE_COMPATIBLE"
```

### Gate 9: Zero-`xfail` & Mandatory Raw-Code Output Gate
- **Failure Prevented:** Silencing 7 failing regression tests in `tests/test_brm_endpoints.py` with `@pytest.mark.xfail(..., strict=False)` (`brm.md:839–891`) instead of fixing the backend API contract, and claiming fixes without printing code + SHA-256 receipts.
- **Hard Rule:** `grep -rn "xfail" tests/` must return zero matches on active test suites, and every build turn must emit SHA-256 hashes of all modified files.

```python
def assert_gate9_zero_xfail(test_files: list[Path]) -> None:
    for tf in test_files:
        txt = tf.read_text(encoding="utf-8")
        assert "xfail" not in txt, f"GATE 9 FAIL: Forbidden @pytest.mark.xfail found in {tf}"
```

### Gate 10: Pre-Exit Git Bundle & Raw Matrix Preservation Gate
- **Failure Prevented:** Leaving raw count matrices (`GSE131907_Lung_Cancer_raw_UMI_matrix.txt`, `GSE223499_snRNA_counts.h5ad`) in ephemeral `/tmp` without committing reproducible extraction scripts + SHA-256 manifests, and excluding active workstream files (`daraxonrasib_*`, `9` files) in `excluded_assets.csv` when packaging the handoff.
- **Hard Rule:** Before closing any session, every touched repository must be snapshotted via `git bundle create`, all external dataset hashes must be logged in `dataset_inventory.csv`, and `excluded_assets.csv` may contain `0` active task deliverables.

```python
def assert_gate10_no_excluded_deliverables(excluded_csv_path: Path, forbidden_prefixes: tuple[str, ...] = ("daraxonrasib_", "rmc6236_")) -> None:
    lines = excluded_csv_path.read_text(encoding="utf-8").splitlines()[1:]
    for line in lines:
        for pref in forbidden_prefixes:
            assert pref not in line, f"GATE 10 FAIL: Active deliverable matching '{pref}' was dumped into excluded_assets.csv: {line}"
```

---

## Part 2 — Copy-Paste `ZETA-ENFORCER` Leash Prompt for the Next Agent Iteration

Alpha can paste the block below directly at the start of the next agent session to lock the agent to `docs/brm_handoff_v1/` and the 10 programmatic gates:

```markdown
### SYSTEM DIRECTIVE: ZETA-ENFORCER IRON LEASH (BrM & MULTI-COHORT EXECUTION)

You are operating under the **Zeta-Enforcer Iron Leash** (`docs/brm_handoff_v1/04_IRON_LEASH_AND_NEXT_STEPS.md`).
Before touching any code, manuscript, figure, or table, you MUST read:
1. `docs/brm_handoff_v1/00_START_HERE_MASTER_INDEX.md`
2. `docs/brm_handoff_v1/01_CLEAN_SIGNAL_LEDGER.md`
3. `docs/brm_handoff_v1/02_STRUCTURED_MAP_5708_LINES.md`
4. `docs/brm_handoff_v1/04_IRON_LEASH_AND_NEXT_STEPS.md`
5. The clean CSV/JSON tables in `docs/brm_handoff_v1/clean_signals/`

#### NON-NEGOTIABLE EXECUTION LAWS (INSTANT ABORT ON VIOLATION):
1. **NO QUARANTINED SLOP RESURRECTION:** You are strictly forbidden from citing the retracted `0.976` (or `0.96–1.00`) tautological Target-Lock AUROC, the fabricated `0.912` Evo2 AUROC, the `crispro-enformer: LIVE` placeholder badge, `NOM1` as a therapeutic knockout target (`82.5%` pan-lethal `COMMON ESSENTIAL`), `|LFC|` unsigned RNA scores, or the 10-gene subsetted DESeq2 `padj = 0.00207` as a genome-wide FDR.
2. **TRUE CIF CHAIN INDEXING ONLY (GATE 1):** Never index AlphaFold 3 `chain_pair_iptm` assuming `[0=RNA, 1=DNA_fwd, 2=DNA_rev]`. Always parse `_entity_poly` from `_model_0.cif` (`Chain A=DNA_1, Chain B=DNA_2, Chain C=sgRNA`) and use `clean_signals/af3_corrected_cif_chain_iptm_and_pae.csv`. Fix `ATP10D`'s 62-nt reverse strand overhang to an exact 61-nt Watson-Crick complement and include 4-chain `SpCas9` (`UniProt Q99ZW2`) before making PAM/catalytic claims.
3. **FULL-TRANSCRIPTOME DESEQ2 & CNV+ MALIGNANT CELLS ONLY (GATES 2 & 3):** Never run PyDESeq2 on a subsetted candidate gene list (`n_vars` must be `>= 10,000` before `fit_size_factors()`). Never substitute `Tumor (Not Tumor)` reactive CNS glia for `Tumor (CNV+)` malignant cells in `GSE223499`, and always include `~ site + stk11_status` covariate stratification.
4. **SIGNED DIRECTIONALITY & FORMULA REPRODUCIBILITY (GATES 4 & 7):** Downregulated genes (`RET`, `CDH2`, `BIN1`) must receive `0.0` (or negative weight) for overexpression driver hypotheses. Every table row must satisfy `abs(recomputed - stored) < 1e-6` with zero `formula_note` excuses and zero `padj = 0.99` placeholders.
5. **MICROENVIRONMENTAL SINK ACCOUNTING (GATE 8):** Any `Angiopep-2` / `LRP1` nanocarrier design must explicitly account for the `MOESM6_ESM.xlsx` discovery that `LRP1` is enriched `+1.8066 log2FC` (`3.50x`, `q = 1.48e-6`) in `TIME-B` (peritumoral brain myeloid/microglial stroma) vs `LB` (brain metastasis tumor core) via a dual-gated architecture.
6. **ZERO `xfail` & THIS-TURN ARTIFACT PROOF (GATES 9 & 10):** Never add `@pytest.mark.xfail` to pass a test suite. Every turn claiming completion must print the exact file paths, SHA-256 hashes, and assertion outputs from `tools/iron_leash_gates.py`.
```

---

## Part 3 — Clear 6-Strike Next-Iteration Execution Roadmap (Expanding Our Work)

Now that the forensic audit has separated the verified signals (`clean_signals/`) from the historical errors, the next execution cycle is organized into **6 concrete, dependency-ordered strikes**:

### Strike 1: BrM Preprint & AF3 Structural Package Repair (`manuscript_brm_interception_v1.md`)
- **Objective:** Upgrade `originals/historical_reports/manuscript_brm_interception_v1.md` and `af3_master_results.json` into a submission-grade manuscript backed by exact `.cif` geometry and exact `GSE223499` pseudobulk statistics.
- **Concrete Actions:**
  1. Replace Table 1 / Section 2.4 AF3 metrics with `clean_signals/af3_corrected_cif_chain_iptm_and_pae.csv`, showing that **all 5 guides (`25/25` models)** adopt the same invaded R-loop conformation (`RNA↔Template DNA ipTM = 0.38–0.47`, `DNA_A↔DNA_B` melted duplex `ipTM = 0.12–0.23`, `spacer PAE = 15.73–16.33 Å` vs off-strand `20.70–21.74 Å`, `ΔPAE = 4.49–5.51 Å`).
  2. Fix `ATP10D`'s off-target DNA strand in `af3_job_ATP10D_v3.json` from `62 nt` to the exact `61 nt` Watson-Crick complement, and generate 4-chain `SpCas9` (`UniProt Q99ZW2`) + sgRNA + dsDNA RNP input JSONs for both TSS-proximal CRISPRi guides and coding-exon CRISPRko guides.
  3. Replace the scrambled Table S2 `baseMean` values (`BACE1` `18.4 -> 412.79`, `SLC25A32` `42.1 -> 126.78`, `ATP10D` `31.2 -> 1829.88`, `RET` `15.8 -> 125.00`, `CDH2` `64.5 -> 2528.81`, `FAM72A` `8.9 -> 44.32`) and add explicit two-sample log-normal MDE power columns (`clean_signals/gse223499_corrected_power_and_signed_scores.csv`).
  4. Replace `brm_master_evidence_table_v6.csv` with `clean_signals/brm_clean_integrated_ranking.csv` (where `BACE1 = 0.7850` ranks #1 and every row satisfies Gate 7 to `< 1e-6`).

### Strike 2: `BACE1` + Dual-Gated `ANG-2`/`LRP1` Nanocarrier Architecture (`report_evo2_nanocarrier_audit.md`)
- **Objective:** Turn the new `MOESM6_ESM.xlsx` `LRP1` peritumoral myeloid sink discovery (`+1.8066 log2FC`, `3.50x` in `TIME-B vs LB`, `q = 1.48e-6`) and `MMP9` pulmonary stroma enrichment (`+1.8776 log2FC` in `TIME-L vs L`, `q = 5.29e-7`) into a first-in-class **AND-gated nanocarrier specification**.
- **Concrete Actions:**
  1. Redesign the single-ligand `Angiopep-2` LNP into a **Two-Stage Dual-Gated Delivery System**:
     - **Stage A (BBB/BTB Transcytosis):** Cleavable/shielded `Angiopep-2` (`TFFYGGSRGKRNNFKTEEY`) engages endothelial `LRP1` to cross the blood-tumor barrier while avoiding irreversible sequestration in `LRP1-high` (`mean 5.448` vs `3.641`) peritumoral `TIME-B` macrophages/microglia.
     - **Stage B (Tumor-Core Lock & Release):** Secondary `EGFR` / `BACE1`-shedding-responsive linker or tumor-cell-specific endocytosis lock that restricts CRISPR RNP / verubecestat release to `EGFR+/BACE1+` `LB` tumor cells.
  2. Synchronize the 4 coding-exon knockout spacers (`BACE1` Exon 4 `chr11:117285934`, `SLC25A32` Exon 2 `chr8:103401285`, `FAM72A` Exon 2 `chr1:206194112`, `ATP10D` Exon 5 `chr4:47512840`) into `clean_signals/canonical_brm_guide_registry.json` and run AF3 validation on those exact coding-exon spacers (Gate 6).

### Strike 3: `caspro` Live Frontend Purge (`src/data/biomarker/bm01_evo2.ts` & `BrmPipelineWorkspace.tsx`)
- **Objective:** Purge the remaining retracted `0.976` / `0.96–1.00` tautology artifacts from the live `caspro` Next.js web application.
- **Concrete Actions:**
  1. Replace `public/data/brm/brm_pipeline_20260328T070235Z.json` and `src/data/biomarker/bm01_evo2.ts` with the honest class-aware composite (`AUROC 0.6889` all-8-steps / `0.7479` steps 1–7) and the verified `BACE1` multi-modal dossier (`Chafe 2025` `>150x` in vivo screen + `GSE223499` `LFC +1.07` tumor / `+1.83` immune + `TCGA-LUAD` `EGFR`-mutant `p < 0.001` + `DepMap` `0.1%` dependent safety window).
  2. Fix the off-by-one step-indexing bug in `w2_extract_brm_evo2.py:178` (`step_idx == 0` -> `step_idx == 1`) that corrupted `PIK3CA` essentiality from `0.581` to `0.320`.
  3. Remove the fake `crispro-enformer: LIVE` badge from `BrmPipelineWorkspace.tsx` and label chromatin tracks honestly according to their computed source.

### Strike 4: Full-Transcriptome `GSE131907` & `GSE223499` Covariate Re-Run
- **Objective:** Replace the 10-gene subsetted `GSE131907` table and unstratified `GSE223499` Wald test with Gate-2/Gate-3 compliant full-transcriptome runs.
- **Concrete Actions:**
  1. Re-run `GSE131907` (`11` Primary Lung vs `10` Brain Met pseudobulk) initializing `PyDESeq2` on all `>20,000` expressed genes before `fit_size_factors()` and genome-wide BH `padj` calculation (Gate 2).
  2. Re-run `GSE223499` (`Tumor (CNV+)` only, strictly excluding `12,078` `Tumor (Not Tumor)` reactive glia cells) with design `~ site + stk11_status` and a sensitivity analysis excluding outlier patients `PA080` (`96.2%` of primary `FAM72A` counts) and `PA072` (`67.9%` of primary `ATP10D` counts) (Gate 3).

### Strike 5: Recover & Execute the Abandoned 5-Worker Daraxonrasib (`RMC-6236` / `NCT06625320`) PDAC Strike
- **Objective:** Complete the RASolute 302 (`NCT06625320`) second-line metastatic PDAC trial de-risking and adaptive resistance analysis that the historical agent abandoned at `docs/brm.md:5040` and dumped into `handoff/excluded_assets.csv` (`9` `daraxonrasib_*` files).
- **Concrete Actions:**
  1. Execute **Worker 1 (Clinical Trial & Endpoint Architecture):** Audit RASolute 302 (`NCT06625320`) dual primary endpoints (`RAS G12X` vs `All RAS` PFS/OS), censoring rules, and 2L chemotherapy comparator (`5-FU/LV/nal-IRI` or `gemcitabine/nab-paclitaxel`) decay curves.
  2. Execute **Worker 2 (TCGA-PAAD & CPTAC-PDAC Genomic Stratification):** Stratify `KRAS G12D` vs `G12V` vs `G12R` vs `Q61H` co-mutation landscapes (`TP53`, `CDKN2A`/`MTAP` co-deletion, `SMAD4`, `STK11`, `KEAP1`, `MYC` amplification).
  3. Execute **Worker 3 (DepMap 24Q4 Pan-RAS Dependency & RTK Bypass):** Quantify MAPK feedback reactivation (`EGFR`, `ERBB2`, `FGFR1`, `MET`, `SHP2`/`PTPN11`, `SOS1`) and `YAP1`/`TAZ` EMT escape under RAS(ON) multi-selective inhibition.
  4. Execute **Worker 4 (Single-Cell / Spatial PDAC Stroma & Immune Architecture):** Quantify myCAF/iCAF desmoplastic drug-delivery barriers and myeloid checkpoint (`SPP1+` TAM, `CXCR2+` neutrophil) dynamics.
  5. Execute **Worker 5 (Integrated Trial Failure Vector & Combination Rescue Dossier):** Assemble a Gate-7 reproducible RASolute 302 patient-selection and combination-rescue dossier (`RMC-6236` + `Cetuximab`/`SHP2i`/`PRMT5i` in `MTAP`-deleted subgroup).

### Strike 6: `fertility_triad_v2_forensic_confirm` & Clinical Record Sync
- **Objective:** Close the remaining open items between `fertility_triad_v1_discovery/report_fertility_triad_v1.md`, `fertility_triad_v2_forensic_confirm/`, and `records_114197298_rahima_nayeem_extracted_context.json`.
- **Concrete Actions:**
  1. Enforce Gate 4 (signed AUROC, banning `max(AUROC, 1 - AUROC)`) across all fertility triad scripts so `GSE58144` LOCO (`0.4952`, directionally inverted across `8/11` genes), `USP33` RPL (`0.4757`, null), and `GSE186504` (`0.6592`) remain locked as authoritative canon.
  2. Surface the `page_10.png` (`2025-11-20` Myriad Foresight Carrier Screen) clinical action item prominently: patient Rahima Nayeem (`DOB 09/14/1991`, `ID 114197298`) is a confirmed **heterozygous carrier of `ADGRV1` `c.15736C>T` (`p.Arg5246Ter`) Pathogenic (`USH2C`, autosomal recessive Usher Syndrome Type IIC)** — **partner `ADGRV1` carrier testing is required prior to next embryo transfer (`1` remaining frozen blastocyst after 4 failed transfers: 2 biochemical, 2 implantation failures)**.
