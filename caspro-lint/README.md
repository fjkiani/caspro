# caspro-lint

Compliance and structural linters for the CrisPRO front-end.

## `forbidden_values.py`

Blocks retired / quarantined numeric values and prohibited terminology from
appearing in shipped code, content, or JSON. Sources:

- `ceacam5_sanofi_intelligence_v2.json` § `crispro_value` (vague framing)
- Brenus canon `data/synthesis/brenus_vector_master_v2.json` + governance
  changelog (retired / quarantined list)
- User directive (2026-07-07): STC-1010 / NCT06934538 stay gated

Run: `python3 caspro-lint/forbidden_values.py`
Staged only: `python3 caspro-lint/forbidden_values.py --staged`
JSON output for CI: `python3 caspro-lint/forbidden_values.py --json > report.json`

## `no_scroll_lint.py`

Structural check: primary route surfaces must use a tabbed / slider / stepper
container and must not stack multiple `min-h-screen` blocks.

Run: `python3 caspro-lint/no_scroll_lint.py`

## What is blocked

See `FORBIDDEN_VALUES.md` (docs) for the full catalog.
