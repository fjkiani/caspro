"""
In-memory encrypted credential vault.

Design constraints (hard):
  - Secrets live ONLY in this process's RAM, encrypted with a per-process Fernet key.
  - The Fernet key itself is generated at startup and never persisted.
  - Nothing here writes secrets to disk and nothing logs secret values.
  - On process exit, all credentials are gone (by design). Re-enter after restart.

This is a credential BROKER: it holds tokens so connectors can use them for the
current session. It is not a secret store of record. Rotate/store durably in your
own secret manager for anything long-lived.
"""
from __future__ import annotations
import time
from dataclasses import dataclass, field
from threading import RLock
from cryptography.fernet import Fernet


@dataclass
class VaultEntry:
    provider: str
    created_at: float
    last_status: str = "unknown"          # unknown | connected | failed
    last_checked: float | None = None
    detail: str = ""                       # non-secret status detail only
    # ciphertext of the secret payload (bytes) — never expose raw
    _cipher: bytes = field(default=b"", repr=False)


class CredentialVault:
    """Process-lifetime, encrypted, in-memory credential holder."""

    def __init__(self) -> None:
        # per-process key; never written anywhere
        self._key = Fernet.generate_key()
        self._f = Fernet(self._key)
        self._entries: dict[str, VaultEntry] = {}
        self._lock = RLock()

    def put(self, provider: str, payload: dict) -> None:
        """Store/replace a provider's credential payload (dict -> encrypted)."""
        import json
        blob = json.dumps(payload).encode("utf-8")
        with self._lock:
            self._entries[provider] = VaultEntry(
                provider=provider,
                created_at=time.time(),
                _cipher=self._f.encrypt(blob),
            )

    def get_payload(self, provider: str) -> dict | None:
        """Decrypt and return the payload for internal connector use ONLY.
        Callers must never return this to the client or log it."""
        import json
        with self._lock:
            e = self._entries.get(provider)
            if not e or not e._cipher:
                return None
            return json.loads(self._f.decrypt(e._cipher).decode("utf-8"))

    def set_status(self, provider: str, status: str, detail: str = "") -> None:
        with self._lock:
            e = self._entries.get(provider)
            if e:
                e.last_status = status
                e.last_checked = time.time()
                e.detail = detail  # caller guarantees this is non-secret

    def public_status(self) -> list[dict]:
        """Safe, secret-free view for the UI."""
        with self._lock:
            out = []
            for p, e in self._entries.items():
                out.append({
                    "provider": p,
                    "present": bool(e._cipher),
                    "status": e.last_status,
                    "last_checked": e.last_checked,
                    "detail": e.detail,
                })
            return out

    def forget(self, provider: str) -> bool:
        with self._lock:
            return self._entries.pop(provider, None) is not None

    def forget_all(self) -> None:
        with self._lock:
            self._entries.clear()
