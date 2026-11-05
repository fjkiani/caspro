# Resistance Prophet — CIN / Acquired-PTEN Integration SPEC (v1)

**Status:** Specification only. The Resistance Prophet **engine code lives in a backend repo that is not
accessible from this workspace** (`crispro-backend-v3` and the `-v2` search target both returned 404 unauthenticated
/ 401 with the only available token). This document is therefore written **against the documented contract** visible
in the public `crispro` clone (`publications/03-sae-resistance/mdc_files/SAE_TO_RESISTANCE_PROPHET_PIPELINE.mdc` and
the Resistance-Prophet design ledger), and is designed to be dropped in by whoever owns the backend engine. It makes
**no unverifiable claims**: the new signal extends an **already-validated PI3K pathway dimension**, not a new pathway.

**Consumes:** `cin_resistance_evidence_v1.json` (schema_version `1.0.0`) — the single source of truth. See
`EVIDENCE_CONTRACT.md`.

**Governance posture:** the new signal is tiered **`Consider`** (never `Supported`), is **hard-capped so it can
never alone drive a HIGH resistance call**, and is explicitly labelled hypothesis-generating (n=5 pilot; single-call
PTEN by ~0.1× sWGS). This mirrors the engine's own guardrail ("≥3 signals for HIGH when baseline missing").

---

## 1. What this adds, in one sentence

An **acquired-PTEN-loss / dispersed-CIN architecture** signal that raises the **existing PI3K dimension** of the
mechanism vector at tier `Consider`, with provenance pointing at the evidence artifact — nothing more.

## 2. Where it plugs into the documented contract

The documented pipeline assembles a **7-dimensional mechanism vector** and passes baseline + current states into
`resistance_prophet_service.predict_resistance()`:

```python
# documented contract (SAE_TO_RESISTANCE_PROPHET_PIPELINE.mdc):
mechanism_vector = [
    pathway_scores["ddr"],     # index 0
    pathway_scores["mapk"],    # index 1
    pathway_scores["pi3k"],    # index 2   <-- THIS integration touches only this dimension
    pathway_scores["vegf"],    # index 3
    pathway_scores["her2"],    # index 4
    pathway_scores["io"],      # index 5
    cross_resistance_risk,     # index 6
]
# prediction:
# resistance_prophet_service.predict_resistance(current_sae_features, baseline_sae_features)
#   -> { "risk_level", "probability", "signals_detected": [...], "recommended_actions": [...] }
```

**Design decision:** the SAE pipeline derives `pathway_scores["pi3k"]` from 32K Evo2 SAE features. That path is
untouched. This integration adds a **parallel, copy-number-derived contribution** to the *same* `pi3k` dimension,
sourced from relapse-vs-diagnosis relative CN at PTEN. The two are combined by a documented max/OR rule (below) so a
CN-based PI3K signal can surface even when SAE features are absent, but **cannot** inflate an existing SAE PI3K score
beyond the tier cap.

## 3. New signal module — behavior spec

Target module (per documented layout): `api/services/resistance_prophet/signals/ovarian.py` (the ovarian signal set
that already contains MAPK, NF1, **PI3K**). Add one function; do **not** add a new pathway.

### 3.1 Signature

```python
def cin_acquired_pten_signal(
    gene_cn: dict[str, GeneCN],            # relapse-vs-dx relative CN per gene (see 4.1)
    cin_architecture: CinArchitecture | None,  # breakpoint-architecture summary (see 4.2)
    *,
    evidence_ref: str = "cin_resistance_evidence_v1",
) -> ResistanceSignal | None:
    """
    Returns a PI3K-pathway ResistanceSignal at tier 'Consider' iff an ACQUIRED PTEN loss is
    observed at relapse (neutral->loss transition), optionally corroborated by a dispersed-CIN
    architecture. Returns None when no acquired PTEN loss is present.

    Deterministic, threshold-based. No model inference. No network calls.
    """
```

### 3.2 Trigger logic (exact)

Uses the same CN bands as the evidence pipeline (`loss ≤ 0.8`, `neutral` otherwise; `deep_loss ≤ 0.5`):

1. **Required — acquired PTEN loss.** Fire only if PTEN transitions **neutral → loss** from dx to relapse:
   `gene_cn["PTEN"].dx_band == "neutral"` **and** `gene_cn["PTEN"].relapse_band in {"loss","deep_loss"}`.
   (Subject 260: `0.9666 → 0.6915`, Δ −0.2751 → fires.) A PTEN already lost at diagnosis does **not** fire this
   *acquired* signal (it is a baseline feature, out of scope here).
2. **Modifier — dispersed-CIN architecture (optional, does not gate).** If `cin_architecture` is present and
   `architecture_signature == "dispersed_stochastic_CIN"`, attach it as corroborating context in the rationale and
   set `architecture_corroborated = True`. Focal/low-CIN architectures set it `False` but **do not suppress** the
   PTEN trigger.
3. **Never escalate tier.** Output tier is always `Consider`. There is no code path in this function that emits
   `Supported`.

### 3.3 Output object

```python
ResistanceSignal(
    pathway="pi3k",                       # existing dimension, not new
    tier="Consider",                      # hard-fixed
    direction="resistance",
    mechanism="Acquired PTEN copy-number loss at relapse activates PI3K/AKT/mTOR; "
              "nominates PI3K/mTOR-directed inhibitors as candidate second-line.",
    contribution=PI3K_CIN_CONTRIB,        # constant (see 3.4); bounded
    architecture_corroborated=bool,
    evidence_refs=[evidence_ref],         # -> cin_resistance_evidence_v1.json
    provenance={
        "cohort": "BriTROC-1 sWGS (EGAD00001011049)",
        "n": 5,
        "evidence_class": "hypothesis_generating",
        "assay_ceiling": "large-CNA breakpoints only (~0.1x sWGS); not a chromothripsis diagnosis",
    },
    caveats=[
        "n=5 pilot; selection-not-induction cohort framing",
        "single-call PTEN loss (one relapse sample), not orthogonally confirmed",
        "sWGS resolves large CNA only; SV-level architecture unverified",
    ],
)
```

### 3.4 How it modifies `pathway_scores["pi3k"]` (the cap)

```python
PI3K_CIN_CONTRIB = 0.15          # additive contribution ceiling for a CN-derived PI3K nudge
PI3K_CONSIDER_CAP = 0.60         # 'Consider'-tier signals may not push pi3k above this alone

def apply_cin_pi3k(pathway_scores: dict, signal: ResistanceSignal | None) -> dict:
    if signal is None:
        return pathway_scores
    base = pathway_scores.get("pi3k", 0.0)
    # OR-combine with SAE-derived pi3k, but never exceed the Consider cap via this path alone
    combined = max(base, min(base + PI3K_CIN_CONTRIB, PI3K_CONSIDER_CAP))
    pathway_scores["pi3k"] = combined
    return pathway_scores
```

Rationale for the cap: the engine's HIGH-risk threshold is **0.70** and its guardrail requires **≥3 corroborating
signals for HIGH when baseline is missing**. Capping the CN-derived PI3K contribution at `0.60` guarantees this
single hypothesis-generating signal can raise suspicion and surface a recommendation, but **cannot by itself** cross
the HIGH threshold — HIGH still requires independent corroboration (SAE PI3K activation, MAPK/NF1 co-signal, or
clinical kinetics). This is the code-level expression of the artifact's `hard_cap` field.

## 4. Request/response payload deltas for `/api/resistance/predict`

Both additions are **backward-compatible** (optional request block; additive response fields).

### 4.1 Request — new optional `gene_cn` block

```jsonc
{
  // ... existing request ...
  "gene_cn": {                       // OPTIONAL. relapse-vs-diagnosis relative CN
    "PTEN":    { "dx": 0.9666, "relapse": 0.6915 },
    "KEAP1":   { "dx": 0.9819, "relapse": 1.6451 },
    "CCNE1":   { "dx": 1.0361, "relapse": 0.8745 },
    "PALB2":   { "dx": 0.9501, "relapse": 0.9787 },
    "CUL3":    { "dx": 0.9989, "relapse": 0.9765 },
    "SLC31A1": { "dx": 0.7187, "relapse": 0.6989 }
  }
}
```

### 4.2 Request — new optional `cin_architecture` block

```jsonc
{
  "cin_architecture": {              // OPTIONAL. breakpoint-architecture summary
    "dx_breakpoints": 75,
    "relapse_breakpoints": 135,
    "breakpoint_delta": 60,
    "net_gained_breakpoints": 66,
    "n_chromosomes_gained": 16,
    "top_focus_chrom": "1",
    "top_focus_fraction": 0.212,
    "architecture_signature": "dispersed_stochastic_CIN"
  }
}
```

### 4.3 Response — additive `signals[]` entry + `evidence_refs`

```jsonc
{
  // ... existing response (risk_level, probability, signals_detected, recommended_actions) ...
  "signals": [
    {
      "pathway": "pi3k",
      "tier": "Consider",
      "direction": "resistance",
      "mechanism": "Acquired PTEN copy-number loss at relapse activates PI3K/AKT/mTOR ...",
      "architecture_corroborated": true,
      "evidence_refs": ["cin_resistance_evidence_v1"],
      "capped_below_high": true
    }
  ],
  "evidence_refs": {
    "cin_resistance_evidence_v1": {
      "schema_version": "1.0.0",
      "evidence_class": "hypothesis_generating",
      "source": "BriTROC-1 sWGS (EGAD00001011049)"
    }
  }
}
```

## 5. Worked example — Subject 260 (end-to-end)

**Input** (`gene_cn` + `cin_architecture` from §4.1/§4.2). **Trace:**

1. PTEN `dx=0.9666 (neutral) → relapse=0.6915 (loss)` → **acquired-loss trigger fires**.
2. `architecture_signature == "dispersed_stochastic_CIN"` → `architecture_corroborated = True`.
3. `pathway_scores["pi3k"]`: suppose SAE-derived base `= 0.15`. `apply_cin_pi3k` → `max(0.15, min(0.15+0.15, 0.60)) =
   0.30`. Still far below the 0.70 HIGH threshold.
4. Signal emitted at tier `Consider`, `capped_below_high = true`, `evidence_refs=["cin_resistance_evidence_v1"]`.
5. `recommended_actions` gains a **candidate second-line** entry: "Consider PI3K/mTOR-directed inhibitor evaluation;
   confirm PTEN loss orthogonally (IHC/targeted CN) before acting." No HIGH call is produced by this signal alone.

**Expected `risk_level`:** unchanged unless other signals independently push it up — exactly the intended behavior.

## 6. Test plan for the engine owner (fixtures)

Drop-in fixtures (deterministic; no data pull). All assert **tier and cap invariants**, not accuracy.

| Fixture | Input | Expected |
|---|---|---|
| `subj260_acquired_pten` | §4.1 + §4.2 (dispersed CIN) | one `pi3k`/`Consider` signal; `architecture_corroborated=true`; `capped_below_high=true`; pi3k ≤ 0.60 |
| `focal_lowcin_no_pten` | PTEN `dx=0.98→relapse=0.99` (no loss), focal architecture | **no** signal (returns `None`) |
| `pten_lost_at_baseline` | PTEN `dx=0.55 (loss)→relapse=0.50` | **no** *acquired* signal (baseline loss is out of scope) |
| `dispersed_cin_no_pten` | dispersed CIN but PTEN neutral→neutral | **no** signal (PTEN trigger is required; architecture alone never fires) |
| `cap_invariant` | PTEN acquired loss + SAE pi3k base = 0.65 | pi3k stays ≤ 0.65 via this path (never pushed to HIGH by the CN nudge alone) |
| `high_requires_corroboration` | acquired PTEN + only this signal | `risk_level != HIGH` |

**Acceptance:** all six pass; no fixture yields `Supported`; no fixture crosses HIGH on the CIN signal alone.

## 7. Explicit non-goals / honesty boundary

- **Not** a new pathway, **not** a new model, **not** an accuracy claim. It raises an existing dimension at
  `Consider`.
- **Not** validated for outcome prediction. Mirrors the engine doc's standing rule ("do not claim DDR for outcome
  prediction") — here the CN/PTEN signal is a *nomination*, not a predictor.
- **Not** runnable here (engine unreachable). Verified against the documented contract only. If the actual engine
  signatures differ, the trigger logic (§3.2), the tier/cap invariants (§3.4), and the payload deltas (§4) are the
  parts that must be preserved; names/paths adapt to the real module.
