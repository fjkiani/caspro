# Secret Exposure Inventory — Results Tree

**Generated during Serial-SAE deployment prep. All listed secrets are treated as COMPROMISED.**
Values are NOT reproduced here (only key type, prefix/suffix, and locations). Redaction replaces
each literal in-tree; rotation is the user's responsibility and is the only remedy for anything
already pasted into a chat/log.

## A. Live secrets committed to the results tree (machine-redactable)

| # | Secret type | Identifier (masked) | Occurrences | Files |
|---|---|---|---|---|
| 1 | GitHub PAT | `ghp_2Z60…Tm22` | 26 | `execution_trace/worker-0.ipynb` (22), `execution_trace/worker-1.ipynb` (3), `foghorn_plumber_instructions.md` (1) |
| 2 | GitHub PAT | `ghp_6TqV…BVw` | 3 | `execution_trace/worker-0.ipynb` (3) |
| 3 | Groq API key | `gsk_fIEy…a0ij` | 4 | `execution_trace/PLAN_V2.md` (2), `execution_trace/w1.ipynb` (1), `execution_trace/worker-0.ipynb` (1) |
| 4 | Qdrant JWT api-key | `eyJhbGci…0ltI` | 4 (single-line) + split-string form | `execution_trace/PLAN_V2.md`, `execution_trace/worker-0.ipynb`, and split across lines in `brenus_rag_pipeline_v4.py`, `brenus_rag_pipeline_v5.py`, `execution_trace/w1.ipynb` |
| 5 | Qdrant cloud endpoint URL | `e255b8ee-…qdrant.io` | 9 | `brenus_rag_pipeline_v5.py`, `execution_trace/PLAN_V2.md`, `execution_trace/w1.ipynb`, `execution_trace/worker-0.ipynb` |

Notes:
- Secrets #3 and #4 appear inside `PLAN_V2.md` — a plan file — meaning they were carried into
  documentation, not just code. The Qdrant key exists in BOTH single-line (notebooks/plan) and
  three-segment split-string (`v4.py`, `v5.py`) forms; the redactor handles both.
- The Qdrant URL is not a secret by itself but is paired with the key and reveals the cluster; it
  is redacted alongside the key.

## B. Pasted into chat this session — NOT on disk (rotation-only)

| Secret type | Status |
|---|---|
| EGA account password | 0 occurrences on disk. Lives only in the session transcript. **Rotate.** |
| Synapse personal access token | 0 occurrences on disk. Transcript only. **Revoke the token.** |
| SAS CAS password | 0 occurrences on disk. Transcript only. **Rotate.** |

Redaction cannot reach the transcript. These must be rotated regardless of any in-tree cleanup.

## C. PII (lower severity, not machine-redacted by default)

| Item | Occurrences | Note |
|---|---|---|
| `fahad@jedilabs.org` | 5 | User email in configs/instructions. Flagged; redact on request. |

## Redaction method

A Python redactor replaces each literal in #1–#5 (single-line and split-string forms) with
`***REDACTED_<TYPE>***`, preserving notebook JSON validity (hits are in readable source/text
lines, not base64 output blobs — verified). Post-redaction re-scan for the prefixes
`gsk_`, `ghp_`, the JWT segment, and the Qdrant host must return **zero** live literals.
