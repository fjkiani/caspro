#!/usr/bin/env python3
"""
Serial-SAE pipeline - Step 0: PREFLIGHT. Run on the VM BEFORE the overnight siphon.
Fails fast (non-zero exit) if anything that would abort a multi-hour run is missing.
Checks: disk space, credentials file present + chmod 600, pyega3 installed, R + QDNAseq +
QDNAseq.hg19 installed, ledger readable and EGAF IDs parse. Performs NO download and NO auth.

USAGE:
    python3 00_preflight.py --ledger subject_ledger.csv --outdir /data/ega \
        --credentials ~/.pyega3/credentials.json
"""
import argparse, csv, os, shutil, subprocess, sys

MIN_FREE_GB = 640  # 511 GB source + QDNAseq intermediates + headroom. Recommend a 750 GB volume.

def ok(msg):   print(f"  [ OK ] {msg}")
def bad(msg):  print(f"  [FAIL] {msg}", file=sys.stderr)
def warn(msg): print(f"  [warn] {msg}", file=sys.stderr)

def check_disk(outdir):
    os.makedirs(outdir, exist_ok=True)
    free_gb = shutil.disk_usage(outdir).free / 1e9
    if free_gb >= MIN_FREE_GB:
        ok(f"disk: {free_gb:.0f} GB free at {outdir} (>= {MIN_FREE_GB} GB)")
        return True
    bad(f"disk: only {free_gb:.0f} GB free at {outdir}; need >= {MIN_FREE_GB} GB (recommend 750 GB volume)")
    return False

def check_credentials(path):
    p = os.path.expanduser(path)
    if not os.path.exists(p):
        bad(f"credentials: {p} not found. Create it ON THE VM (do NOT paste secrets into chat).")
        return False
    mode = oct(os.stat(p).st_mode)[-3:]
    if mode != "600":
        warn(f"credentials: {p} mode is {mode}; run `chmod 600 {p}`")
    else:
        ok(f"credentials: {p} present, mode 600")
    # sanity: parseable JSON with username/password keys, without printing values
    try:
        import json
        d = json.load(open(p))
        if "username" in d and "password" in d:
            ok("credentials: JSON has username + password keys")
        else:
            bad("credentials: JSON missing username/password keys")
            return False
    except Exception as e:
        bad(f"credentials: not valid JSON ({e})")
        return False
    return True

def check_pyega3():
    rc = subprocess.call(["python3", "-c", "import pyega3"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if rc == 0:
        ok("pyega3 importable")
        return True
    bad("pyega3 not installed: pip install pyega3")
    return False

def check_r_packages():
    script = 'ok<-TRUE; for(p in c("QDNAseq","QDNAseq.hg19","Biobase")){if(!requireNamespace(p,quietly=TRUE)){cat("MISSING:",p,"\\n");ok<-FALSE}}; if(!ok) quit(status=1)'
    rc = subprocess.call(["Rscript", "-e", script])
    if rc == 0:
        ok("R packages: QDNAseq, QDNAseq.hg19, Biobase present")
        return True
    bad('R packages missing. Install: Rscript -e \'BiocManager::install(c("QDNAseq","QDNAseq.hg19","Biobase"))\'')
    return False

def check_ledger(path):
    if not os.path.exists(path):
        bad(f"ledger: {path} not found")
        return False
    n_pairs, n_egaf = 0, 0
    with open(path) as fh:
        rdr = csv.DictReader(fh)
        need = {"subject", "dx_egaf", "relapse_egaf"}
        if not need.issubset(set(rdr.fieldnames or [])):
            bad(f"ledger: missing required columns {need - set(rdr.fieldnames or [])}")
            return False
        for r in rdr:
            n_pairs += 1
            for c in ("dx_egaf", "relapse_egaf"):
                v = (r.get(c) or "").strip()
                if v.upper().startswith("EGAF"):
                    n_egaf += 1
    ok(f"ledger: {n_pairs} subjects, {n_egaf} EGAF file IDs to fetch")
    return True

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--ledger", required=True)
    ap.add_argument("--outdir", required=True)
    ap.add_argument("--credentials", required=True)
    args = ap.parse_args()

    print("== Serial-SAE preflight ==")
    results = [
        check_disk(args.outdir),
        check_credentials(args.credentials),
        check_pyega3(),
        check_r_packages(),
        check_ledger(args.ledger),
    ]
    if all(results):
        print("\nPREFLIGHT PASSED — safe to start the download (01_download_ega.py).")
        sys.exit(0)
    print(f"\nPREFLIGHT FAILED — {results.count(False)} check(s) failed. Fix before starting the siphon.", file=sys.stderr)
    sys.exit(1)

if __name__ == "__main__":
    main()
