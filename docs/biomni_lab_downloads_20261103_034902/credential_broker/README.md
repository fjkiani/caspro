# CrisPRO Credential Broker

A small FastAPI backend + single-page UI to paste tokens for **Synapse**, **SAS CAS/Viya**, and **EGA**,
open live connections, and expose a secret-free status. Built so credentials can be *used* without being
*exposed*.

## Security model (enforced, not aspirational)
- Tokens are held **only in the running process's RAM**, encrypted with a per-process key (`vault.py`).
- The encryption key is generated at startup and **never written anywhere**. Stop the server and all creds vanish.
- **Nothing writes secrets to disk**; **nothing logs secret values**. The access log is disabled and app logs
  record only `method / path / status` and `provider=... ok=true/false`.
- `/status` and `/providers` return metadata only (present? connected? non-secret detail).
- Server binds to **127.0.0.1** by default, so tokens are never accepted over the network.

## Providers
| Provider | Mode | Validation call | Notes |
|---|---|---|---|
| Synapse | direct use | `GET /userProfile` (Bearer PAT) | usable for analysis once connected |
| SAS CAS/Viya | direct use | `GET /identities/users/@currentUser` | token **or** username+password |
| EGA | **validate only** | EGA OIDC token endpoint | credential validated here; the controlled-access bulk download runs on your **approved in-region VM** under the Data Access Agreement |

Why EGA is validate-only: `EGAD00001011049` is controlled-access human genomic data. The Data Access Agreement
authorizes an approved operator on an approved environment — not an ephemeral agent sandbox. The broker confirms the
token works, then hands off the ready-to-run pipeline (`00_preflight.py` -> `run_all.sh`) for your VM.

## Run
```bash
pip install fastapi uvicorn cryptography requests
cd credential_broker
uvicorn app:app --host 127.0.0.1 --port 8077
# open http://127.0.0.1:8077/
```

## Endpoints
- `GET  /` — the UI
- `GET  /providers` — provider list + mode
- `POST /creds/{provider}` — store a credential (JSON body) and immediately connection-check it
- `POST /validate/{provider}` — re-run the read-only connection check
- `GET  /status` — secret-free status of all stored credentials
- `DELETE /creds/{provider}` / `DELETE /creds` — forget one / all
- `POST /ega/handoff` — after EGA validates, emit the VM run-steps (does **not** download here)

## Files
- `app.py` — FastAPI app + endpoints
- `vault.py` — in-memory encrypted credential store
- `connectors.py` — read-only per-provider validators
- `static/index.html` — single-page UI (Phylo palette)

## A note on rotation
Validating a token does **not** make an exposed token safe. Any credential pasted into a chat, email, or shared
file should be rotated. This tool reduces *future* exposure (RAM-only, no logging); it cannot un-expose a secret
that already leaked.
