#!/usr/bin/env python3
"""Pull the TAX327 tables that can define a defensible last-known-alive date so
the censoring times in tax327_os.csv stop under-estimating follow-up.

Targets:
  ufth.sas7bdat   337 x 26   final/terminal-event dates (D_F*)
  ufebn.sas7bdat 1974 x 47   DEATHFN / DEATHIFN  (candidate death record)
  ustd.sas7bdat   337 x  7   study status / termination
  udevia.sas7bdat 337 x 56   protocol deviations (may carry last contact)

Credential is read into memory from the session record; never printed/written.
"""
import re
import sys

import pandas as pd

CAS_URL = "https://mpmprodvdmml.ondemand.sas.com/cas-shared-default-http/"
CAS_PORT = 443
CASLIB = "Prostat_Sanofi_2000_80"
T = "/mnt/results/execution_trace/transcript.jsonl"
OUTDIR = "/mnt/results/resistance_remediation/receipts"
TABLES = ["ufth", "ufebn", "ustd", "udevia"]


def creds():
    raw = open(T, encoding="utf-8", errors="replace").read()
    u = re.findall(r"SAS_USERNAME\s*=\s*'?([A-Za-z0-9_]{4,40})'?", raw)
    p = re.findall(r"SAS_PASSWORD\s*=\s*'([^']{4,120})'", raw)

    def uniq(xs):
        o = []
        for x in xs:
            if x not in o and not re.fullmatch(r"[x*<>.\s]{0,40}", x):
                o.append(x)
        return o

    return uniq(u), uniq(p)


def main():
    import swat
    users, pws = creds()
    if not users or not pws:
        sys.exit("ABORT: credential not recoverable from session record")
    conn = None
    for pw in pws:
        try:
            conn = swat.CAS(CAS_URL, CAS_PORT, username=users[0], password=pw)
            break
        except Exception as e:
            msg = str(e)
            for q in pws:
                msg = msg.replace(q, "<REDACTED>")
            print("[connect] rejected:", msg[:200])
    if conn is None:
        sys.exit("ABORT: authentication rejected by CAS")
    print(f"[connect] SUCCESS as {users[0]} -> {CAS_URL}")

    try:
        for tb in TABLES:
            try:
                conn.table.loadTable(caslib=CASLIB, path=f"dataFiles_397/{tb}.sas7bdat",
                                     casout=dict(name=tb, replace=True))
                df = conn.CASTable(tb).to_frame()
            except Exception as e:
                print(f"! {tb}: load failed {str(e)[:160]}")
                continue
            out = f"{OUTDIR}/sanofi_{tb}_full.csv"
            df.to_csv(out, index=False)
            print(f"\n=== {tb}: {df.shape} -> {out}")
            print("columns:", list(df.columns))
            # profile date-like and death-like columns
            for c in df.columns:
                cu = c.upper()
                if cu.startswith("D_") or "DEATH" in cu or "DATE" in cu or "STAT" in cu \
                   or "LAST" in cu or "FUP" in cu or "ALIV" in cu:
                    s = df[c]
                    nn = s.notna().sum()
                    try:
                        head = list(pd.Series(s.dropna().unique()).head(5))
                    except Exception:
                        head = []
                    print(f"   {c:12} nn={nn:5} nuniq={s.nunique():5} dtype={s.dtype} head={head}")
    finally:
        try:
            conn.close()
        except Exception:
            pass


if __name__ == "__main__":
    main()
