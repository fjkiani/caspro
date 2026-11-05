# Doctor-Portal Payload Design — PLATINUM_WINDOW / IMMUNE_ACCESS / Stromal-Cage 1A·1B

**Date:** 2026-07-18 · **Status:** design spec — **pipeline now VERIFIED** (data-room cloned & re-executed; see `04_VAULT_VERIFICATION_REPORT.md`). Example payloads are populated from **real 427-cohort patients** and validate against the schema.
**Artifacts:** `doctor_portal_platinum_window.schema.json` (JSON Schema 2020-12, validated), `example_payload_tier1A_window_open.json`, `example_payload_tier1B_caged.json`

---

## 1. Design law (non-negotiable)

Because the underlying stratifier (`run_artistry7_proxy_pipeline.py`, 427-patient TCGA-OV) could **not** be ingested or verified, the payload is engineered so the portal is **structurally incapable of presenting an unverified number as a validated clinical result.** Three mechanisms enforce this:

1. **Per-field `verification_status`** — every clinically-actionable value carries one of `VERIFIED | UNVERIFIED_QUARANTINED | SPEC_ONLY_NOT_COMPUTED` plus a free-text `provenance` (pipeline + commit hash, or the reason it is spec-only).
2. **Weakest-link roll-up** — `global_verification` = the *weakest* status among all consumed fields. Executable rule verified in code: `3×VERIFIED + 1×UNVERIFIED → UNVERIFIED`. The portal keys its "research use only" state off this field, so one unverified input degrades the whole panel.
3. **`cohort_context` gate** — `TCGA_OV_PROXY` (the only cohort currently available) automatically forces `show_research_use_only = true`, because a TCGA proxy score is a research signal, not a per-patient clinical test.

**Post-verification (2026-07-18):** the pipeline was cloned and re-executed, so the two example payloads are now populated from **real 427-cohort patients** and carry `verification_status: VERIFIED` (`global_verification: VERIFIED`). They **still render "RESEARCH USE ONLY"** — not because they are unverified, but because `cohort_context=TCGA_OV_PROXY` forces it: these are real *research-proxy-cohort* patients, not a prospectively validated clinical test. The verification also surfaced statistical caveats that the payload now carries explicitly (the significant signal is a 3-tier *prognostic* log-rank, not the 1A/1B split; the IMMUNE_ACCESS 0.40 IO-gate is a design constant, not data-derived). Any future field that cannot be recomputed still degrades `global_verification` via the weakest-link rule.

---

## 2. The three consumed quantities

### 2.1 `PLATINUM_WINDOW` (top-line boolean gate)
- **Definition (locked from spec):** `status = OPEN` iff `tier_refined == TIER_1A_ACCESSIBLE` **AND** `platinum_status == sensitive`; else `CLOSED`; `INDETERMINATE` if either input is unknown.
- **Why a compound gate:** platinum-sensitivity alone is necessary but not sufficient for an *immune-access-dependent* regimen (like nemvaleukin+pembro). The window opens only when the tumor is BOTH platinum-favorable AND immunologically reachable (open cage).
- **UI:** single large badge. OPEN = green `#75A025`; CLOSED = orange `#FF9400`; INDETERMINATE = grey. Badge always paired with the verification chip.

### 2.2 `IMMUNE_ACCESS` (continuous score + drill-down)
- **Equation (from spec, unverified weights):** `IMMUNE_ACCESS = 0.40·TCELL_GPS − 0.35·MYELOID_FLOOD − 0.25·STROMAL_CAGE`.
- **Interpretation:** higher = more T-cell presence net of myeloid suppression and stromal exclusion. Two of three terms are *subtractive* (myeloid flood, stromal cage) — the score encodes that T cells must not only be present but able to reach tumor.
- **UI:** horizontal diverging gauge on [−1, +1] with a marker; expandable to a 3-bar breakdown (TCELL_GPS up-good; MYELOID_FLOOD, STROMAL_CAGE down-good). Each sub-bar carries its own verification chip.

### 2.3 `stromal_cage_tier` (1A vs 1B warning)
- **`TIER_1A_ACCESSIBLE`** (open cage) → `warning_level = INFO`: immune-access-dependent regimens are plausible.
- **`TIER_1B_CAGED`** (closed cage) → `warning_level = CONTRA_IO`: T-cell-engaging immunotherapy is unlikely to reach the tumor; expect underperformance. This is the actionable safety message.
- **UI:** colored callout card. `CONTRA_IO` = orange, bold, top of panel; `INFO` = neutral. Never suppressed.

---

## 3. Rendering matrix (what the clinician sees)

| tier_refined | platinum_status | PLATINUM_WINDOW badge | 1A/1B callout | RUO banner (this build) |
|---|---|---|---|---|
| TIER_1A_ACCESSIBLE | sensitive | **OPEN** (green) | INFO (open cage) | shown |
| TIER_1A_ACCESSIBLE | resistant | CLOSED (orange) | INFO (open cage) | shown |
| TIER_1B_CAGED | sensitive | CLOSED (orange) | **CONTRA_IO** (orange, bold) | shown |
| TIER_1B_CAGED | resistant | CLOSED (orange) | **CONTRA_IO** (orange, bold) | shown |
| UNKNOWN / unknown | any | INDETERMINATE (grey) | NONE | shown |

The RUO ("research use only") banner is shown in **every** row in the current build because no field is `VERIFIED`. Once the pipeline is verified and a value is computed for a real trial/clinical patient, `verification_status` flips to `VERIFIED`, `cohort_context` becomes `TRIAL_PATIENT`/`REAL_WORLD`, and the banner clears automatically.

---

## 4. Integration into the v3 validation pipeline

- The portal consumes **one payload per patient** conforming to the schema; it performs **no** scoring itself (thin client; all logic upstream).
- Producer contract: whatever emits the payload MUST (a) set `provenance` to the exact `run_artistry7_proxy_pipeline.py` commit, (b) set `verification_status=VERIFIED` only after the p-value/cutpoint logic has been independently reproduced, (c) never emit a numeric `value` with `verification_status=VERIFIED` unless it was actually computed for that patient.
- CI gate (recommended): a schema-validation test + an assertion that `global_verification==VERIFIED ⇒ all component statuses==VERIFIED`, so a regression can't silently promote unverified data.

---

## 4a. Reading the mockup (`doctor_portal_platinum_window_mockup.png`)
The mockup shows **both** the OPEN (green) and CLOSED (orange) badge states side-by-side as *example states* — a real panel renders exactly one, driven by `platinum_window.status`. Likewise both the Tier-1A INFO and Tier-1B CONTRA-IO callouts are shown for illustration; a real panel renders the one matching `stromal_cage_tier.tier`. The gauge value in the static image is cosmetic; the computed example (`example_payload_tier1A_window_open.json`) is now a **real patient** (TCGA-04-1517-01) with verified `IMMUNE_ACCESS = 0.089`. **Important honesty finding surfaced by using real data:** this window-OPEN, platinum-sensitive Tier-1A patient has IMMUNE_ACCESS = 0.089, which is **below** the 0.40 IO-eligibility gate — i.e. PLATINUM_WINDOW eligibility and IO-gate pass are **decoupled**. The payload now models this via a dedicated `io_eligibility_gate` block and a Tier-1A clinician message that explicitly says checkpoint regimens are *not* auto-endorsed when the gate fails. The production UI must show the window badge and the IO-gate state as **separate** signals, never conflated. **Production UI requirements** (from design review): (a) highlight the active badge and dim the inactive; (b) replace the red↔green diverging gauge with a **colorblind-safe blue↔orange** diverging scale and add non-color cues (icons / above-below-threshold text) to the three component bars.

## 5. What is NOT claimed
**Verification status (2026-07-18):** the equation weights (0.40/0.35/0.25) are now **verified in code**; the p=0.0038 statistic is **verified and reproduced to 10 dp** — but it is a **3-tier prognostic** log-rank, not the 1A/1B contrast, and the 1A/1B split itself is **not significant** (self-computed log-rank p=0.126). The IMMUNE_ACCESS 0.40 IO-gate is verified to be a **hardcoded design constant**, not a data-derived cutoff. The payload consumes and labels all of these honestly (per-field `verification_status`, the `io_eligibility_gate` provenance, and the `provenance_note` roll-up). See `04_VAULT_VERIFICATION_REPORT.md`.
