"""
Read-only connection validators for each provider.

Each connector takes a decrypted payload and performs the *lightest possible*
authenticated call to confirm the credential is live. It returns (ok, detail)
where `detail` is a SECRET-FREE human string (never echoes tokens/passwords).

Providers:
  - synapse : GET /userProfile with the PAT  -> usable directly for analysis
  - cas     : SAS Viya CAS/OAuth token or user+pass handshake -> usable directly
  - ega     : validate the EGA token/credential is accepted -> VALIDATE ONLY here;
              the controlled-access bulk download runs on the user's approved VM.
"""
from __future__ import annotations
import requests

TIMEOUT = 20


def check_synapse(payload: dict) -> tuple[bool, str]:
    """payload: {"token": "<synapse PAT>"}  -> GET /userProfile"""
    tok = payload.get("token", "")
    if not tok:
        return False, "no token provided"
    try:
        r = requests.get(
            "https://repo-prod.prod.sagebase.org/repo/v1/userProfile",
            headers={"Authorization": f"Bearer {tok}"},
            timeout=TIMEOUT,
        )
    except Exception as e:
        return False, f"network error: {type(e).__name__}"
    if r.status_code == 200:
        # userName is non-secret identity info; safe to surface
        try:
            uname = r.json().get("userName", "authenticated")
        except Exception:
            uname = "authenticated"
        return True, f"authenticated as {uname}"
    if r.status_code in (401, 403):
        return False, "token rejected (401/403) — expired or invalid"
    return False, f"unexpected status {r.status_code}"


def check_cas(payload: dict) -> tuple[bool, str]:
    """SAS Viya. Two accepted shapes:
      {"base_url": "...", "token": "<oauth bearer>"}  OR
      {"base_url": "...", "username": "...", "password": "..."}
    Validation hits a lightweight authenticated endpoint (folders service root).
    """
    base = (payload.get("base_url") or "").rstrip("/")
    if not base:
        return False, "no base_url provided"
    headers = {}
    auth = None
    if payload.get("token"):
        headers["Authorization"] = f"Bearer {payload['token']}"
    elif payload.get("username") and payload.get("password"):
        auth = (payload["username"], payload["password"])
    else:
        return False, "provide either token or username+password"
    try:
        # /identities/users/@currentUser is a small authenticated call on Viya
        r = requests.get(f"{base}/identities/users/@currentUser",
                         headers=headers, auth=auth, timeout=TIMEOUT)
    except Exception as e:
        return False, f"network error: {type(e).__name__}"
    if r.status_code == 200:
        try:
            uid = r.json().get("id", "authenticated")
        except Exception:
            uid = "authenticated"
        return True, f"authenticated as {uid}"
    if r.status_code in (401, 403):
        return False, "credentials rejected (401/403)"
    return False, f"unexpected status {r.status_code}"


def check_ega(payload: dict) -> tuple[bool, str]:
    """EGA credential validation ONLY.

    Confirms the EGA login is accepted by the EGA authentication service. It does
    NOT initiate any dataset/file download. Controlled-access bulk retrieval for
    EGAD00001011049 runs on the user's approved in-region VM under the Data Access
    Agreement — never from this broker.

    payload: {"username": "...", "password": "..."}
    """
    user = payload.get("username", "")
    pw = payload.get("password", "")
    if not (user and pw):
        return False, "provide username and password"
    # EGA OpenID token endpoint (auth check only; no dataset scope requested)
    try:
        r = requests.post(
            "https://idp.ega-archive.org/realms/EGA/protocol/openid-connect/token",
            data={
                "grant_type": "password",
                "client_id": "sp-api",
                "username": user,
                "password": pw,
                "scope": "openid",
            },
            timeout=TIMEOUT,
        )
    except Exception as e:
        return False, f"network error: {type(e).__name__}"
    if r.status_code == 200 and "access_token" in r.text:
        return True, "EGA login accepted (validate-only; download runs on your approved VM)"
    if r.status_code in (400, 401, 403):
        return False, "EGA login rejected — check credentials (or rotate if exposed)"
    return False, f"unexpected status {r.status_code}"


REGISTRY = {
    "synapse": check_synapse,
    "cas": check_cas,
    "ega": check_ega,
}

# providers the broker may use directly for in-session analysis work
DIRECT_USE_OK = {"synapse", "cas"}
# providers restricted to validate-only in this environment
VALIDATE_ONLY = {"ega"}
