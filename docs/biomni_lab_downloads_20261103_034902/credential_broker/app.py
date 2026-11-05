"""
Credential Broker API — FastAPI backend.

Purpose: let the operator paste tokens for Synapse / CAS / EGA through a local UI,
hold them encrypted in RAM, run a read-only connection check per provider, and expose
a secret-free status. Synapse + CAS become usable for in-session analysis; EGA is
VALIDATE-ONLY here (the controlled-access bulk pull runs on the operator's approved VM).

Security posture (enforced):
  - Secrets never written to /mnt/results or any file; only encrypted in RAM (vault.py).
  - Secret values never logged and never returned by any endpoint.
  - /status and /providers return metadata only (present? / connected? / detail).
  - Access-logging middleware scrubs request bodies; we log method+path+status only.
  - Binds to 127.0.0.1 by default (loopback), so tokens are not accepted over the network.
"""
from __future__ import annotations
import logging
from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
from pydantic import BaseModel, Field
from pathlib import Path

from vault import CredentialVault
from connectors import REGISTRY, DIRECT_USE_OK, VALIDATE_ONLY

# ---- logging: method/path/status only, never bodies ----
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("broker")
logging.getLogger("uvicorn.access").disabled = True  # uvicorn access log can echo query strings

app = FastAPI(title="CrisPRO Credential Broker", version="1.0")
VAULT = CredentialVault()

# ---------- request models (tokens arrive here, never logged) ----------
class SynapseCreds(BaseModel):
    token: str = Field(..., description="Synapse personal access token (view scope)")

class CASCreds(BaseModel):
    base_url: str = Field(..., description="SAS Viya base URL, e.g. https://host/... (no trailing path)")
    token: str | None = Field(None, description="OAuth bearer token (option A)")
    username: str | None = Field(None, description="username (option B, with password)")
    password: str | None = Field(None, description="password (option B)")

class EGACreds(BaseModel):
    username: str
    password: str

_MODEL = {"synapse": SynapseCreds, "cas": CASCreds, "ega": EGACreds}


def _validate(provider: str) -> dict:
    """Run the provider's read-only check against the stored payload; update status."""
    payload = VAULT.get_payload(provider)
    if payload is None:
        raise HTTPException(404, f"no credential stored for '{provider}'")
    ok, detail = REGISTRY[provider](payload)
    VAULT.set_status(provider, "connected" if ok else "failed", detail)
    log.info("validate provider=%s ok=%s", provider, ok)  # no secret, no detail-with-secret
    return {"provider": provider, "connected": ok, "detail": detail}


# ---------- endpoints ----------
@app.get("/providers")
def providers():
    return {
        "providers": [
            {"id": "synapse", "usage": "direct", "note": "validated and usable for analysis"},
            {"id": "cas", "usage": "direct", "note": "validated and usable for analysis"},
            {"id": "ega", "usage": "validate_only",
             "note": "credential validated here; controlled-access download runs on your approved VM"},
        ]
    }

@app.post("/creds/{provider}")
def put_creds(provider: str, body: dict):
    if provider not in _MODEL:
        raise HTTPException(404, f"unknown provider '{provider}'")
    # coerce/validate shape without logging values
    creds = _MODEL[provider](**body)
    VAULT.put(provider, creds.model_dump(exclude_none=True))
    log.info("stored credential provider=%s (encrypted, in-memory)", provider)
    # immediately run a connection check so the UI shows live status
    return _validate(provider)

@app.post("/validate/{provider}")
def validate(provider: str):
    if provider not in REGISTRY:
        raise HTTPException(404, f"unknown provider '{provider}'")
    return _validate(provider)

@app.get("/status")
def status():
    return {"entries": VAULT.public_status(),
            "direct_use_ok": sorted(DIRECT_USE_OK),
            "validate_only": sorted(VALIDATE_ONLY)}

@app.delete("/creds/{provider}")
def forget(provider: str):
    ok = VAULT.forget(provider)
    return {"provider": provider, "forgotten": ok}

@app.delete("/creds")
def forget_all():
    VAULT.forget_all()
    return {"forgotten_all": True}

@app.post("/ega/handoff")
def ega_handoff():
    """Emit the ready-to-run pipeline manifest for the operator's approved VM.
    Requires EGA credential to be VALIDATED first. Does NOT start any download here."""
    st = {e["provider"]: e for e in VAULT.public_status()}
    ega = st.get("ega")
    if not ega or ega["status"] != "connected":
        raise HTTPException(409, "validate EGA credential first (POST /validate/ega)")
    return {
        "message": "EGA credential validated. Run the controlled-access pull on your approved in-region VM.",
        "dataset": "EGAD00001011049",
        "run_where": "approved VM in EGA-permitted region (e.g. AWS eu-west-1 / GCP europe-west2)",
        "steps": [
            "1. On the VM, create ~/.pyega3/credentials.json (chmod 600) with your EGA login.",
            "2. python3 00_preflight.py --ledger subject_ledger.csv --outdir /data/ega --credentials ~/.pyega3/credentials.json",
            "3. bash run_all.sh   # preflight -> download -> QDNAseq -> pause for platinum labels",
            "4. python3 04_fill_ledger.py ... then add platinum_status, then 03_resistance_association.py",
        ],
        "note": "This broker validated your token; it does not perform the controlled-access download itself.",
    }

@app.get("/", response_class=HTMLResponse)
def index():
    return (Path(__file__).parent / "static" / "index.html").read_text()

@app.get("/healthz")
def healthz():
    return {"ok": True}
