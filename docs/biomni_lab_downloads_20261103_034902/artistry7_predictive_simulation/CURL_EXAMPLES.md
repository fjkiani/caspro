# CURL / invocation examples

## Integration boundary (read first)

This wiring lives at the **contract + resolver** layer
(`case_resolver.resolve(...)`), exactly like MarrowGuard, whose model card records it as
*"in orchestrator resolve_case(): NOT YET — standalone route only."* The ARTISTRY-7 row is
**not yet threaded** through `orchestrator.resolve_case()` or the `POST /api/v1/case/resolve`
route, because supplying the ARTISTRY-7 Lazarus row and toggling the flag is the **caller's**
(Doctor-Portal / orchestrator) responsibility, which is out of scope for this task.

Therefore this file gives:
1. **Python-level invocation** — fully wired **now**, runnable today.
2. **The one-line route/orchestrator change** a caller would add to expose it over HTTP.

The math, gates, schema, provenance, and disclaimers are all live and tested regardless of
which caller drives them.

---

## 1. Python-level invocation (works today)

```python
import os, json, pandas as pd
from layer0_contracts.case_resolution import GateResult
from layer3_orchestrator.case_resolver import resolve

# Load an ARTISTRY-7 Lazarus row (one row = one real patient).
d = pd.read_csv(".../artistry7_proxy/crispro_lazarus_output.csv")
row = d[d.SAMPLE_ID == "TCGA-04-1517-01"].iloc[0].to_dict()

common = dict(
    patient_summary="demo", gates={"g": GateResult(status="PASS")},
    engines={}, ranked_interventions=[], missing_data=[],
    next_best_test=None, confidence_level="L1",
)

# (A) FLAG OFF (default): simulation disabled, prognostic baseline still present.
r = resolve(**common, artistry7_row=row)
assert r.simulated_predictive_outcome == {"status": "disabled"}
assert r.prognostic_baseline["evidence_status"] == "prognostic_association"

# (B) FLAG ON via request kwarg, ELIGIBLE patient: full simulation.
r = resolve(**common, artistry7_row=row, include_predictive_simulation=True)
assert r.simulated_predictive_outcome["status"] == "simulated_predictive_reprogramming"
print(r.simulated_predictive_outcome["universe_transition"])  # -> "A->B"

# (C) FLAG ON via env (equivalent):
os.environ["PREDICTIVE_SIMULATION_MODE"] = "true"
r = resolve(**common, artistry7_row=row)
os.environ.pop("PREDICTIVE_SIMULATION_MODE", None)

# (D) FLAG ON, INELIGIBLE patient (TIER_3): ineligible + gate_failures.
row3 = d[d.SAMPLE_ID == "TCGA-04-1331-01"].iloc[0].to_dict()
r = resolve(**common, artistry7_row=row3, include_predictive_simulation=True)
assert r.simulated_predictive_outcome["status"] == "ineligible"
```

Canonical outputs for A–D are saved in `test_evidence/example_payloads.json`.

---

## 2. One-line route change to expose over HTTP (illustrative; NOT applied)

`POST /api/v1/case/resolve` currently builds the case from `patient_input` only. To expose the
simulation, the route/orchestrator would forward two optional request fields to `resolve(...)`:

```python
# in the request model (pydantic):
include_predictive_simulation: bool = False      # default OFF
artistry7_sample_id: Optional[str] = None        # which ARTISTRY-7 row to attach

# in the handler, after loading the ARTISTRY-7 row for artistry7_sample_id:
resolution = resolve(
    ...,                                   # existing args unchanged
    artistry7_row=artistry7_row,           # None -> prognostic_baseline stays None
    include_predictive_simulation=req.include_predictive_simulation,
)
```

Resulting HTTP calls once the caller adds the above:

```bash
# FLAG OFF (default) — simulated_predictive_outcome = {"status":"disabled"}
curl -s -X POST http://localhost:8000/api/v1/case/resolve \
  -H "Content-Type: application/json" \
  -d '{"patient_id":"TCGA-04-1517-01","disease":"HGSOC","artistry7_sample_id":"TCGA-04-1517-01"}'

# FLAG ON, ELIGIBLE — status = "simulated_predictive_reprogramming", universe_transition "A->B"
curl -s -X POST http://localhost:8000/api/v1/case/resolve \
  -H "Content-Type: application/json" \
  -d '{"patient_id":"TCGA-04-1517-01","disease":"HGSOC","artistry7_sample_id":"TCGA-04-1517-01","include_predictive_simulation":true}'

# FLAG ON, INELIGIBLE (TIER_3) — status = "ineligible", gate_failures populated
curl -s -X POST http://localhost:8000/api/v1/case/resolve \
  -H "Content-Type: application/json" \
  -d '{"patient_id":"TCGA-04-1331-01","disease":"HGSOC","artistry7_sample_id":"TCGA-04-1331-01","include_predictive_simulation":true}'

# Server-wide default via env (overridden per-request only by explicit include_predictive_simulation):
PREDICTIVE_SIMULATION_MODE=true uvicorn main:app
```

**Response shapes** for the three cases are documented in `SCHEMA_PATCH.md` (§2a disabled,
§2b ineligible, §2c full). The `ruo: true` / `disclaimer` envelope emitted by the existing
`/api/v1/case/resolve` handler is unchanged.
