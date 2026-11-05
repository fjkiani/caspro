#!/usr/bin/env python3
"""
Hex agent A2A over REST (personal token hxtp_* required for mutations).

Workspace tokens (hxtw_*) can read some resources but return FORBIDDEN for
Mutation:createHex on POST /v1/threads. Cursor should use plugin-hex-hex MCP
(create_thread / continue_thread / get_thread) with a pasted project draft URL.

Usage:
  export HEX_PERSONAL_TOKEN=hxtp_...   # Hex → Account → API keys
  python tools/hex_a2a.py create --project-id UUID --prompt "..."
  python tools/hex_a2a.py followup --thread-id UUID --prompt "..."
  python tools/hex_a2a.py get --thread-id UUID

Session (optional):
  python tools/hex_a2a.py bind-rsna   # writes RSNA URL + project id to ~/.cursor/hex-a2a-session.json
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.request

API = os.environ.get("HEX_API_URL", "https://app.hex.tech/api/v1").rstrip("/")
SESSION = os.path.expanduser("~/.cursor/hex-a2a-session.json")

RSNA_PROJECT_ID = "01a113e3-a02e-77cf-a0ff-4af55efcb72a"
RSNA_DRAFT_URL = (
    "https://app.hex.tech/019dfa99-dcc0-7000-910c-d763cfc8db38/"
    "hex/RSNA-MedSigLIP-embedding-sources-034bVlUgKjWyOTJYCAiP8M/draft/logic"
)


def _token() -> str:
    for key in ("HEX_PERSONAL_TOKEN", "HEX_API_TOKEN", "HEX_API_KEY", "HEX_CLI_LOGIN_TOKEN"):
        v = os.environ.get(key, "").strip()
        if v:
            if v.startswith("hxtw_"):
                print(
                    "warning: hxtw_ workspace token often lacks createHex; use hxtp_ personal token",
                    file=sys.stderr,
                )
            return v
    sys.exit("Set HEX_PERSONAL_TOKEN (hxtp_...) from Hex Account → API keys")


def _req(method: str, path: str, body: dict | None = None, timeout: int = 120) -> dict:
    url = f"{API}{path}"
    data = None if body is None else json.dumps(body).encode()
    req = urllib.request.Request(
        url,
        data=data,
        method=method,
        headers={
            "Authorization": f"Bearer {_token()}",
            "Content-Type": "application/json",
            "User-Agent": "caspro-hex-a2a/1.0",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            raw = resp.read().decode()
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        err = e.read().decode()
        sys.exit(f"HTTP {e.code} {path}: {err[:2000]}")


def cmd_bind_rsna(_args: argparse.Namespace) -> None:
    os.makedirs(os.path.dirname(SESSION), exist_ok=True)
    payload = {
        "project_id": RSNA_PROJECT_ID,
        "draft_url": RSNA_DRAFT_URL,
        "mcp_thread_id": "01a1246d-c805-7554-8984-a0395dcc8194",
        "note": "MCP A2A: paste draft_url in create_thread/continue_thread prompts",
    }
    with open(SESSION, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)
    print(SESSION)
    print(json.dumps(payload, indent=2))


def _prompt_with_project(prompt: str, project_id: str | None) -> str:
    if os.path.isfile(SESSION):
        sess = json.load(open(SESSION, encoding="utf-8"))
        url = sess.get("draft_url", RSNA_DRAFT_URL)
    else:
        url = RSNA_DRAFT_URL
    header = f"Open this exact Hex project URL as context:\n{url}\n\n"
    return header + prompt


def cmd_create(args: argparse.Namespace) -> None:
    body: dict = {"prompt": _prompt_with_project(args.prompt, args.project_id)}
    if args.project_id:
        body["projectId"] = args.project_id
    elif args.new_project:
        body["newProject"] = True
    out = _req("POST", "/threads", body)
    print(json.dumps(out, indent=2))


def cmd_followup(args: argparse.Namespace) -> None:
    body = {
        "prompt": _prompt_with_project(args.prompt, None),
        "attachments": {"projectIds": [args.project_id or RSNA_PROJECT_ID]},
    }
    out = _req("POST", f"/threads/{args.thread_id}/followup", body)
    print(json.dumps(out, indent=2))


def cmd_get(args: argparse.Namespace) -> None:
    out = _req("GET", f"/threads/{args.thread_id}")
    print(json.dumps(out, indent=2))


def cmd_poll(args: argparse.Namespace) -> None:
    for i in range(args.max_polls):
        out = _req("GET", f"/threads/{args.thread_id}")
        status = out.get("status") or out.get("threadStatus")
        print(f"poll {i + 1}: status={status}", file=sys.stderr)
        if status == "IDLE":
            print(json.dumps(out, indent=2))
            return
        time.sleep(args.interval)
    sys.exit("timeout waiting for IDLE")


def main() -> None:
    p = argparse.ArgumentParser(description="Hex Threads A2A (REST)")
    sub = p.add_subparsers(dest="cmd", required=True)

    b = sub.add_parser("bind-rsna", help="Write MCP/RSNA session JSON")
    b.set_defaults(func=cmd_bind_rsna)

    c = sub.add_parser("create", help="POST /v1/threads")
    c.add_argument("--prompt", required=True)
    c.add_argument("--project-id")
    c.add_argument("--new-project", action="store_true")
    c.set_defaults(func=cmd_create)

    f = sub.add_parser("followup", help="POST /v1/threads/{id}/followup")
    f.add_argument("--thread-id", required=True)
    f.add_argument("--prompt", required=True)
    f.add_argument("--project-id")
    f.set_defaults(func=cmd_followup)

    g = sub.add_parser("get", help="GET /v1/threads/{id}")
    g.add_argument("--thread-id", required=True)
    g.set_defaults(func=cmd_get)

    pl = sub.add_parser("poll", help="Poll until IDLE")
    pl.add_argument("--thread-id", required=True)
    pl.add_argument("--interval", type=float, default=15.0)
    pl.add_argument("--max-polls", type=int, default=40)
    pl.set_defaults(func=cmd_poll)

    args = p.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
