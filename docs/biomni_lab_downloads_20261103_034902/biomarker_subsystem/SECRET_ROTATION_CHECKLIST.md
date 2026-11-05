# Secret Rotation Checklist + Push Gate

**Status: MANDATORY before any public/remote push of this repo or results tree.**

Redaction removed the secret literals from the working results tree, but redaction does **not**
un-expose a secret. Every item below has been in a chat session and/or committed to files; all
must be considered **compromised and rotated**. Rotation is a user action — it cannot be done
from this environment, and I will not transmit these credentials.

## 1. Rotate / revoke now (all compromised)

| # | Secret | Where exposed | Action |
|---|---|---|---|
| 1 | GitHub PAT `ghp_2Z60…Tm22` | Committed in `worker-0.ipynb`, `worker-1.ipynb`, `foghorn_plumber_instructions.md`; also in project memory | **Revoke** at GitHub → Settings → Developer settings → Personal access tokens. Issue a new fine-scoped token; store only in a local secret manager / env var. |
| 2 | GitHub PAT `ghp_6TqV…BVw` | Committed in `worker-0.ipynb` | **Revoke** (same path). This is a second, distinct token — revoke it too. |
| 3 | Groq API key `gsk_fIEy…a0ij` | Committed in `w1.ipynb`, `worker-0.ipynb`, `PLAN_V2.md` | **Revoke + regenerate** at console.groq.com → API Keys. |
| 4 | Qdrant api-key (JWT `eyJ…0ltI`) | Committed in `w1.ipynb`, `worker-0.ipynb`, `PLAN_V2.md`, `brenus_rag_pipeline_v4.py`, `v5.py` | **Rotate** in Qdrant Cloud → cluster → API keys. Note code comments reference rotating through 3 keys — rotate all of them. |
| 5 | EGA account password | **Pasted into chat this session** (not on disk) | **Change** the EGA/EBI account password. |
| 6 | Synapse personal access token | **Pasted into chat this session** (not on disk) | **Revoke** the token in Synapse → Account Settings → Personal Access Tokens (JWT `jti` 42276). |
| 7 | SAS CAS password | **Pasted into chat this session** (not on disk) | **Change** the SAS CAS account password. |

## 2. Purge from git history (redaction alone is insufficient)

If any of files listed above were ever committed to a git remote, the secrets remain in history
even after redaction. Before pushing:

- Use `git filter-repo` (or BFG Repo-Cleaner) to strip the literals from all history, OR
- If the repo is small/early, consider a fresh history.
- Add the secret patterns to a pre-commit secret scanner (e.g. `gitleaks`, `detect-secrets`) so
  this cannot recur.
- Ensure `.gitignore` excludes `*.env`, credential files, and `~/.pyega3/credentials.json`.

## 3. Push gate (governance — standing rule)

**No `git commit` / `git push` of this tree occurs until:**
1. All 7 secrets above are rotated/revoked (§1), AND
2. Git history is purged of the literals if previously pushed (§2), AND
3. The user gives **explicit** approval to push.

This matches the project governance rule: no commit/push without explicit approval, and no live
credentials in the results tree. The internal working files also flagged earlier (machine paths,
per-subject EGA file-ID manifest) should be excluded or scrubbed in the same pass.

## 4. What redaction already did (this session)

- Replaced all live literals for secrets #1–#4 in the 7 affected results-tree files with
  `***REDACTED_****` placeholders; verified 0 live literals remain on read-back; notebooks remain
  valid JSON.
- Moved the one secret-bearing pre-redaction backup out of the results tree (local workspace only).
- Secrets #5–#7 were never written to disk (chat-only); nothing to redact, rotation is the only
  remedy.
