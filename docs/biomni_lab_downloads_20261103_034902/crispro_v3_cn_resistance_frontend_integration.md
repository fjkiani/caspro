# CrisPRO v3 — CN Resistance Engine: Front-End Integration Guide

**Engine:** `cn_resistance` · **Router prefix:** `/api/cn-resistance` · **Backend:** `fjkiani/crispro-backend-v3` `main` (merge commit `f41300a`) · **Deploy:** Render auto-deploy on `main`.

**Status:** RESEARCH USE ONLY (RUO). Advisory only. Honest-null. Every response carries `ruo: true` + a disclaimer string — the UI **must** surface both and must never render a resistance call.

---

## 0. TL;DR for the front-end

- Three GET/POST endpoints under `/api/cn-resistance`. All JSON. All carry `ruo: true` + `disclaimer`.
- The **headline, defensible number is the pipeline concordance: Spearman rho = 0.830** (p = 5.77e-23, n = 86). Lead with it.
- The paired diagnosis→relapse delta is a **null** (Wilcoxon p = 0.641). Show it as "no significant change," not as a negative finding to hide.
- The cross-sectional resistance association is **exploratory, underpowered (EPV = 9), and in the OPPOSITE direction to the pre-specified hypothesis**. It is **discovery-only**. The `/score` endpoint deliberately returns **no classification** — only a context percentile. The UI must mirror that: no risk badge, no "resistant/sensitive" label.
- Use the existing `apiConfig.js` `VITE_API_VERSION` toggle (set `v3`) and an `ApiVersionBadge`-style chip. Add a companion **RUO / evidence chip** described in §5.

---

## 1. Endpoint contracts (ground-truth payloads)

Payloads below are captured verbatim from the running app (FastAPI TestClient against `main`).

### 1.1 `GET /api/cn-resistance/health`
Readiness probe + snapshot fingerprint.

**Response 200**
```json
{
  "ruo": true,
  "disclaimer": "Research Use Only. Not cleared for clinical decision-making.",
  "status": "ok",
  "engine": "cn_resistance",
  "maturity": "VALIDATED",
  "snapshot_utc": "2026-07-25T04:32:26Z"
}
```
> `maturity: "VALIDATED"` is **static registry metadata** (a published concordance comparator exists). It is NOT a per-sample clinical validation. Do not render it next to a patient result without the RUO caveat.

### 1.2 `GET /api/cn-resistance/validation`
The full frozen BriTROC-1 validation readout. This powers the "Validation" / methods panel.

**Response 200**
```json
{
  "ruo": true,
  "disclaimer": "Research Use Only. Not cleared for clinical decision-making.",
  "snapshot_utc": "2026-07-25T04:32:26Z",
  "cohort": "BriTROC-1 (EGAD00001011049), shallow-WGS HGSC, hg19/GRCh37",
  "n_profiles": 94,
  "n_labeled": 86,
  "n_resistant": 9,
  "n_sensitive": 77,
  "n_paired_patients": 8,
  "pipeline_concordance": {
    "metric": "Spearman rho vs published breakpoints",
    "rho": 0.83,
    "p": 5.77e-23,
    "n": 86
  },
  "paired_delta": {
    "test": "Wilcoxon signed-rank (relapse-diagnosis breakpoints)",
    "W": 14.0,
    "p": 0.641,
    "n_pairs": 8
  },
  "cross_sectional_association": {
    "features": {
      "breakpoints":    {"auroc": 0.2778, "boot_ci95": [0.1241, 0.4502], "mwu_p": 0.0303, "bh_fdr_q": 0.0455, "ci_excludes_0.5": true},
      "sd_seg":         {"auroc": 0.2338, "boot_ci95": [0.0837, 0.4156], "mwu_p": 0.0094, "bh_fdr_q": 0.0283, "ci_excludes_0.5": true},
      "frac_aberrant":  {"auroc": 0.3781, "boot_ci95": [0.1443, 0.6364], "mwu_p": 0.2360, "bh_fdr_q": 0.2360, "ci_excludes_0.5": false}
    },
    "EPV": 9,
    "EPV_flag": "LOW (<10) - underpowered",
    "prespecified_direction": "higher CN instability -> resistant",
    "direction_observed": "OPPOSITE (resistant ~ fewer breakpoints / lower instability)"
  },
  "prespecified_criterion_met": false,
  "verdict": "prespecified criterion NOT met; direction OPPOSITE; underpowered (EPV=9); discovery-only",
  "maturity": "VALIDATED",
  "references": ["Smith P, Bradley T, et al. Nat Commun 2023;14:4387. doi:10.1038/s41467-023-39867-7"]
}
```
> AUROC/p/q values are rounded above for readability; the live endpoint returns full precision. Render from the live payload, not from this snippet.

### 1.3 `POST /api/cn-resistance/score`
Scores a provided CN feature vector. Returns a **context percentile only** — **no classification**.

**Request body**
```json
{
  "sample_id": "IM_124",
  "features": { "breakpoints": 202.0, "sd_seg": 0.25, "frac_aberrant": 0.61 }
}
```
`breakpoints` is required (`>= 0`). `sd_seg` (`>= 0`) and `frac_aberrant` (`0..1`) are optional.

**Response 200**
```json
{
  "ruo": true,
  "disclaimer": "Research Use Only. Not cleared for clinical decision-making.",
  "sample_id": "IM_124",
  "features": { "breakpoints": 202.0, "sd_seg": 0.25, "frac_aberrant": 0.61 },
  "breakpoint_percentile_vs_britroc1": 62.5,
  "evidence_tier": "Mechanistic",
  "resistance_direction_note": "Pre-specified hypothesis 'higher instability -> resistant' was NOT met in BriTROC-1; observed direction OPPOSITE and underpowered (EPV=9). No resistance classification is emitted.",
  "caveats": [
    "Percentile is context vs the frozen BriTROC-1 cohort; it is NOT a resistance probability.",
    "Pre-specified 'higher instability -> resistant' hypothesis was NOT supported.",
    "Observed direction was OPPOSITE and underpowered (EPV=9, <10). Discovery-only.",
    "Single-cohort (BriTROC-1) only; >=2 independent cohorts required before any association is considered supported.",
    "Research Use Only. Not cleared for clinical decision-making."
  ]
}
```
> `breakpoint_percentile_vs_britroc1` is **context**, NOT a probability. `evidence_tier` is `"Mechanistic"` (the runtime tier gate clamps machine-assigned "Validated"). The UI must display `resistance_direction_note` and the `caveats` list; it must NOT convert the percentile into a risk score, color-coded gauge, or resistant/sensitive label.

---

## 2. `apiConfig.js` — version toggle

The repo already ships `src/lib/apiConfig.js` with a `VITE_API_VERSION` env toggle (v2 default) and 90+ hooks reading `API_ROOT`. To route CN-resistance calls at the hardened v3 backend:

```bash
# .env (front-end)
VITE_API_VERSION=v3
VITE_API_ROOT_V3=https://<your-v3-service>.onrender.com
```

```js
// src/lib/apiConfig.js  (pattern already present — shown for reference)
const VERSION = import.meta.env.VITE_API_VERSION || "v2";
const ROOTS = {
  v2: import.meta.env.VITE_API_ROOT_V2, // legacy
  v3: import.meta.env.VITE_API_ROOT_V3, // hardened
};
export const API_ROOT = ROOTS[VERSION];
export const API_VERSION = VERSION;

// CN-resistance endpoint helpers
export const CN_RESISTANCE = {
  health:     () => `${API_ROOT}/api/cn-resistance/health`,
  validation: () => `${API_ROOT}/api/cn-resistance/validation`,
  score:      () => `${API_ROOT}/api/cn-resistance/score`,
};
```

**CORS:** the v3 backend must allow the front-end origin (Render static site / localhost dev) via FastAPI `CORSMiddleware`. If CN-resistance calls 200 in curl but fail in-browser with a CORS error, add the origin to `allow_origins` in the backend before shipping — this is a backend config change, not a front-end one.

---

## 3. React fetch hook (copy-paste)

```jsx
// src/hooks/useCnResistanceValidation.js
import { useEffect, useState } from "react";
import { CN_RESISTANCE } from "../lib/apiConfig";

export function useCnResistanceValidation() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch(CN_RESISTANCE.validation())
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((j) => { if (alive) { setData(j); setLoading(false); } })
      .catch((e) => { if (alive) { setError(e); setLoading(false); } });
    return () => { alive = false; };
  }, []);

  return { data, error, loading };
}
```

```jsx
// score a vector on demand
export async function scoreCnVector({ sample_id, features }) {
  const res = await fetch(CN_RESISTANCE.score(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sample_id, features }),
  });
  if (!res.ok) throw new Error(`CN score failed: HTTP ${res.status}`);
  return res.json(); // includes ruo, disclaimer, percentile, caveats — render all
}
```

---

## 4. Tumor-Board CN card spec

Add a CN card to the Tumor Board (alongside the existing `BoardHeader`). The card has three stacked readouts, in this priority order:

1. **Pipeline concordance (headline, positive).**
   - Primary stat: `rho = 0.83` (from `pipeline_concordance.rho`).
   - Subtext: `vs published breakpoints · p = 5.8e-23 · n = 86`.
   - Visual: a green "reproduced" state is appropriate here — this is the validated claim.

2. **Diagnosis → relapse stability (null).**
   - Stat: `Wilcoxon p = 0.641 (n = 8 pairs)`.
   - Label: **"No significant CN change on relapse"** — neutral tone. Consistent with published BriTROC-1 CN stability. Do not color this as a failure.

3. **Resistance association (exploratory — caveat-forward).**
   - Show the breakpoints AUROC (`0.278`) with its CI, but **immediately** attach the caveat chip: **"Opposite direction · underpowered (EPV=9) · discovery-only."**
   - Render `verdict` verbatim: *"prespecified criterion NOT met; direction OPPOSITE; underpowered (EPV=9); discovery-only."*
   - **No risk gauge, no resistant/sensitive badge, no probability.** If a per-sample `/score` result is shown, display the percentile as context with `resistance_direction_note` and the full `caveats` list directly beneath.

**Footer of the card (always visible):** the `disclaimer` string + reference `Smith P, Bradley T, et al. Nat Commun 2023;14:4387`.

---

## 5. Evidence / RUO chip (VALIDATED-with-null-caveat)

Mirror the existing `ApiVersionBadge` pattern (amber "v2·Legacy" / green "v3·Hardened") with a companion evidence chip specific to this engine:

- **Chip label:** `VALIDATED (pipeline) · null (Δ) · discovery-only (assoc.)`
- **Color:** green base (concordance is real) with an amber caveat dot (association is discovery-only). Do **not** use a single flat green — that would overclaim.
- **Tooltip / expander contents:**
  - `ruo: true` → "Research Use Only — not for clinical decision-making."
  - `maturity: VALIDATED` → "Static: engine has a published concordance comparator. Not a per-patient clinical validation."
  - `evidence_tier: Mechanistic` (from `/score`) → "Runtime tier; machine cannot self-assign Validated."
  - The `verdict` string.

**Hard UI rules (guardrails):**
- Never render a resistance classification, risk score, or resistant/sensitive label from this engine.
- Never drop the `disclaimer` or `ruo` flag from any view that shows a CN readout.
- Never present the cross-sectional association without the "opposite-direction, underpowered, discovery-only" caveat adjacent to it.
- Lead with concordance (rho = 0.83); treat the association as exploratory context only.

---

## 6. Smoke test before shipping

```bash
BASE=https://<your-v3-service>.onrender.com
curl -s $BASE/api/cn-resistance/health | jq .
curl -s $BASE/api/cn-resistance/validation | jq '.verdict, .pipeline_concordance'
curl -s -X POST $BASE/api/cn-resistance/score \
  -H 'Content-Type: application/json' \
  -d '{"sample_id":"IM_124","features":{"breakpoints":202.0,"sd_seg":0.25,"frac_aberrant":0.61}}' | jq '.breakpoint_percentile_vs_britroc1, .evidence_tier, .ruo'
```
Confirm every response contains `ruo: true` and a non-empty `disclaimer`. If any does not, do not ship the card.

---

## 7. Provenance

- Backend engine card: `docs/CN_RESISTANCE_ENGINE.md` (in `crispro-backend-v3`).
- Manuscript: `crispro_britroc1_cn_validation_manuscript.md` (also in repo `docs/manuscripts/`).
- Frozen snapshot: `2026-07-25T04:32:26Z` — immutable, single cited source.
- Reference [1]: Smith P, Bradley T, et al. *Nat Commun* 2023;14:4387. doi:10.1038/s41467-023-39867-7.
