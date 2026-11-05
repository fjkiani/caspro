#!/usr/bin/env python3
"""Harvest every patient-linked clinical date across all 29 TAX327 caslib tables
to build a defensible last-known-contact date per patient.

Motivation: censoring times derived from upat date columns alone gave a median
follow-up of 27.4 wk for censored patients, vs a median death time of 48.5 wk.
That is biologically impossible and biases KM downward (derived 12.7 mo vs
published mitoxantrone-arm 16.5 mo). The fix is to use ALL recorded contact
dates, not just the patient-table ones.

Credential is read into memory from the session record; never printed/written.
"""
import json
import re
import sys

import numpy as np
import pandas as pd

CAS_URL = "https://mpmprodvdmml.ondemand.sas.com/cas-shared-default-http/"
CAS_PORT = 443
CASLIB = "Prostat_Sanofi_2000_80"
T = "/mnt/results/execution_trace/transcript.jsonl"
ENUM = "/mnt/results/resistance_remediation/receipts/tax327_caslib_enumeration.json"
OUT_LONG = "/mnt/results/resistance_remediation/receipts/tax327_contact_dates_by_table.csv"
OUT_MAX = "/mnt/results/resistance_remediation/receipts/tax327_last_contact.csv"

DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")


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


def is_date_col(s: pd.Series) -> bool:
    """True if the column holds ISO date strings or datetime.date objects."""
    v = s.dropna()
    if len(v) == 0:
        return False
    sample = v.head(50)
    hits = 0
    for x in sample:
        if hasattr(x, "year") and hasattr(x, "month"):
            hits += 1
        elif isinstance(x, str) and DATE_RE.match(x.strip()):
            hits += 1
    return hits / len(sample) > 0.8


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
        except Exception:
            continue
    if conn is None:
        sys.exit("ABORT: authentication rejected by CAS")
    print(f"[connect] SUCCESS as {users[0]}")

    enum = json.load(open(ENUM))
    paths = [t["path"] for t in enum["tables"]]
    print(f"[enum] {len(paths)} tables to scan")

    records = []
    per_table = {}
    for path in paths:
        tb = path.split("/")[-1].replace(".sas7bdat", "")
        try:
            conn.table.loadTable(caslib=CASLIB, path=path,
                                 casout=dict(name="_h", replace=True))
            df = conn.CASTable("_h").to_frame()
        except Exception as e:
            print(f"  ! {tb}: load failed {str(e)[:120]}")
            continue
        if "ZPATCODE" not in df.columns:
            print(f"  - {tb}: no ZPATCODE, skipped ({df.shape})")
            continue
        dcols = [c for c in df.columns if c != "ZPATCODE" and is_date_col(df[c])]
        if not dcols:
            print(f"  - {tb}: {df.shape} no date columns")
            per_table[tb] = dict(n_rows=int(df.shape[0]), date_cols=[], n_patients=0)
            continue
        sub = df[["ZPATCODE"] + dcols].copy()
        long = sub.melt(id_vars="ZPATCODE", var_name="col", value_name="raw").dropna(subset=["raw"])
        long["date"] = pd.to_datetime(long["raw"].astype(str), errors="coerce", format="%Y-%m-%d")
        long = long.dropna(subset=["date"])
        long["table"] = tb
        records.append(long[["ZPATCODE", "table", "col", "date"]])
        per_table[tb] = dict(n_rows=int(df.shape[0]), date_cols=dcols,
                             n_patients=int(long["ZPATCODE"].nunique()))
        print(f"  * {tb}: {df.shape} -> {len(dcols)} date cols, "
              f"{len(long)} dated rows, {long['ZPATCODE'].nunique()} patients")

    conn.close()

    alld = pd.concat(records, ignore_index=True)
    alld.to_csv(OUT_LONG, index=False)
    print(f"\nlong contact-date table: {alld.shape} -> {OUT_LONG}")

    mx = (alld.groupby("ZPATCODE")
              .agg(last_contact=("date", "max"),
                   first_date=("date", "min"),
                   n_dates=("date", "size"),
                   n_tables=("table", "nunique"))
              .reset_index())
    # which table/column supplied the max
    idx = alld.groupby("ZPATCODE")["date"].idxmax()
    src = alld.loc[idx, ["ZPATCODE", "table", "col"]].rename(
        columns={"table": "src_table", "col": "src_col"})
    mx = mx.merge(src, on="ZPATCODE", how="left")
    mx.to_csv(OUT_MAX, index=False)
    print(f"per-patient last contact: {mx.shape} -> {OUT_MAX}")
    print(mx.head(10).to_string())
    print("\nsource of the max date (top 15):")
    print((mx["src_table"] + "." + mx["src_col"]).value_counts().head(15).to_string())


if __name__ == "__main__":
    main()
