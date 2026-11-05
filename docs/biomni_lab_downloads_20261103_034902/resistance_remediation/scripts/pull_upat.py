#!/usr/bin/env python3
"""Pull TAX327 patient-level table (upat, 337 rows) once, then work offline.
Credential is read into memory from the session record and never printed."""
import re
import sys

CAS_URL = "https://mpmprodvdmml.ondemand.sas.com/cas-shared-default-http/"
CAS_PORT = 443
CASLIB = "Prostat_Sanofi_2000_80"
T = "/mnt/results/execution_trace/transcript.jsonl"
OUT = "/mnt/results/resistance_remediation/receipts/sanofi_upat_full.csv"


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
        sys.exit("ABORT: credential not recoverable")
    conn = None
    for pw in pws:
        try:
            conn = swat.CAS(CAS_URL, CAS_PORT, username=users[0], password=pw)
            break
        except Exception:
            continue
    if conn is None:
        sys.exit("ABORT: authentication rejected")
    print(f"connected as {users[0]}")
    try:
        conn.table.loadTable(caslib=CASLIB, path="dataFiles_397/upat.sas7bdat",
                             casout=dict(name="upat", replace=True))
        df = conn.CASTable("upat").to_frame()
        print("pulled upat:", df.shape)
        df.to_csv(OUT, index=False)
        print("wrote", OUT)

        # survival column semantics
        for c in ["DEATHWK", "DEATHWKF"]:
            s = df[c]
            print(f"\n{c}: dtype={s.dtype} non-null={s.notna().sum()}/{len(s)} "
                  f"min={s.min()} max={s.max()} nunique={s.nunique()}")
            print("  value head:", s.dropna().unique()[:12])
        print("\ncovariate availability:")
        for c in ["AGEC", "AGE65C", "AGE75C", "PSKAR0", "PSWHO0", "BPAIN", "BKPS",
                  "HGB0", "ALKP0", "TRTGRP", "TREATG", "ITT", "GLEASC"]:
            if c in df:
                s = df[c]
                print(f"  {c:9} non-null={s.notna().sum():4}  nunique={s.nunique():4}  "
                      f"sample={list(s.dropna().unique()[:6])}")
    finally:
        conn.close()


if __name__ == "__main__":
    main()
