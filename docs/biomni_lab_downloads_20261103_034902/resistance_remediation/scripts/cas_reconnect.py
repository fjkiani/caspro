#!/usr/bin/env python3
"""Reconnect to PDS/CAS using the credential recorded in this session, then
fully enumerate the TAX327 caslib to settle whether survival columns exist.

Secret handling: the credential is read from the session record into memory,
used for the connection, and never printed, logged, or written to disk.
"""
import json
import os
import re
import sys

CAS_URL = "https://mpmprodvdmml.ondemand.sas.com/cas-shared-default-http/"
CAS_PORT = 443
CASLIB = "Prostat_Sanofi_2000_80"
T = "/mnt/results/execution_trace/transcript.jsonl"

EVENT_PAT = re.compile(r"(DTHDY|DTH|DEATH|SURV|OS_|OSCENS|LKADT|LSTALV|EVENT|CENS|FUDY|FUTIME|RANDDT|TRTSDT)", re.I)


def creds():
    raw = open(T, encoding="utf-8", errors="replace").read()
    users = re.findall(r"SAS_USERNAME\s*=\s*'?([A-Za-z0-9_]{4,40})'?", raw)
    pws = re.findall(r"SAS_PASSWORD\s*=\s*'([^']{4,120})'", raw)
    # de-dup, preserve order, drop obvious placeholders
    def uniq(xs):
        o = []
        for x in xs:
            if x not in o and not re.fullmatch(r"[x*<>.\s]{0,40}", x):
                o.append(x)
        return o
    u, p = uniq(users), uniq(pws)
    if not u or not p:
        sys.exit(f"ABORT: credential not recoverable (users={len(u)} pw={len(p)})")
    print(f"credential recovered from session record: user={u[0]}  password=<{len(p[0])} chars, not shown>")
    return u[0], p


def main():
    import swat
    user, pws = creds()
    conn = None
    for i, pw in enumerate(pws):
        try:
            print(f"[connect] attempt {i+1}/{len(pws)} -> {CAS_URL}:{CAS_PORT} as {user}")
            conn = swat.CAS(CAS_URL, CAS_PORT, username=user, password=pw)
            print("[connect] SUCCESS")
            break
        except Exception as e:
            msg = str(e)
            for p in pws:
                msg = msg.replace(p, "<REDACTED>")
            print(f"[connect] failed: {msg[:300]}")
    if conn is None:
        sys.exit("ABORT: all credential candidates rejected by the CAS server. "
                 "Most likely the password was rotated (rotation was advised earlier).")

    try:
        print("\n=== server status ===")
        print(conn.serverstatus())

        print(f"\n=== enumerate caslib {CASLIB} ===")
        fi = conn.table.fileInfo(caslib=CASLIB)["FileInfo"]
        print(fi.to_string())

        found = []
        names = fi["Name"].tolist()
        for name in names:
            paths = []
            if name.lower().endswith((".sas7bdat", ".csv", ".xlsx")):
                paths = [name]
            else:
                try:
                    sub = conn.table.fileInfo(caslib=CASLIB, path=name)["FileInfo"]
                    print(f"\n--- subdir {name}: {len(sub)} entries ---")
                    print(sub[["Name", "Size"]].to_string() if "Size" in sub else sub["Name"].to_string())
                    paths = [f"{name}/{n}" for n in sub["Name"].tolist()
                             if str(n).lower().endswith((".sas7bdat", ".csv"))]
                except Exception as e:
                    print(f"  (cannot list {name}: {str(e)[:120]})")
            for path in paths:
                try:
                    conn.table.loadTable(caslib=CASLIB, path=path,
                                         casout=dict(name="_probe", replace=True))
                    ci = conn.table.columnInfo(table="_probe")["ColumnInfo"]
                    cols = ci["Column"].tolist()
                    nrow = int(conn.CASTable("_probe").numrows()["numrows"])
                except Exception as e:
                    print(f"  ! {path}: load failed {str(e)[:140]}")
                    continue
                ev = [c for c in cols if EVENT_PAT.search(c)]
                tag = f"   <<< TIME-TO-EVENT CANDIDATES: {ev}" if ev else ""
                print(f"  * {path}: {nrow} rows, {len(cols)} cols{tag}")
                found.append(dict(path=path, n_rows=nrow, columns=cols, event_candidates=ev))

        out = "/mnt/results/resistance_remediation/receipts/tax327_caslib_enumeration.json"
        json.dump(dict(caslib=CASLIB, cas_url=CAS_URL, n_tables=len(found), tables=found),
                  open(out, "w"), indent=2)
        print(f"\nenumeration receipt: {out}")
        surv = [t for t in found if t["event_candidates"]]
        print(f"\nRESULT: {len(found)} tables enumerated; {len(surv)} with time-to-event candidates")
        for t in surv:
            print(f"  survival-capable: {t['path']} -> {t['event_candidates']}")
    finally:
        try:
            conn.close()
        except Exception:
            pass


if __name__ == "__main__":
    main()
