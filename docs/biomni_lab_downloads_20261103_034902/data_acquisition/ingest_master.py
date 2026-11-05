#!/usr/bin/env python3
"""ingest_master.py - unified controlled-data ingestion driver for the HGSOC
true-resistance acquisition program (PDS / dbGaP / EGA / Synapse).

HONESTY / SAFETY CONTRACT
-------------------------
* This driver NEVER embeds a secret. All credentials come from environment
  variables you set locally (PDS_USER/PDS_PASSWORD, DBGAP_NGC/DBGAP_PHS,
  EGA_CREDENTIALS, SYNAPSE_AUTH_TOKEN).
* Controlled-access data can ONLY be pulled with YOUR signed-DUA / DAC-approved
  login. This script cannot bypass that and does not try to.
* `--dry-run` (default) touches NO controlled data: it only checks endpoint
  reachability and prints the exact request shape that WOULD run. Pass
  `--execute` to actually pull (requires the relevant creds to be set).

Usage:
  python3 ingest_master.py --source ega    --dataset EGAD00001011049 --dry-run
  python3 ingest_master.py --source dbgap  --phs phs000178.v11.p8      --dry-run
  python3 ingest_master.py --source pds    --trial GOG-0218            --dry-run
  python3 ingest_master.py --source synapse --syn syn25569736          --dry-run
  python3 ingest_master.py --all --dry-run          # reachability sweep of every source
"""
import argparse, json, os, sys, shutil, subprocess, urllib.request as R

def reach(url, timeout=15):
    try:
        req = R.Request(url, headers={"User-Agent": "ingest-master"})
        with R.urlopen(req, timeout=timeout) as r:
            return r.status
    except Exception as e:
        code = getattr(e, "code", None)
        return code if code else f"ERR {e}"

def need_env(*names):
    missing = [n for n in names if not os.environ.get(n)]
    return missing

def run(cmd, execute):
    print("    $", " ".join(cmd))
    if execute:
        subprocess.run(cmd, check=True)

# ---------------- EGA ----------------
def ega(dataset, execute):
    print(f"[EGA] dataset={dataset}")
    print("  reachability:", reach(f"https://metadata.ega-archive.org/datasets/{dataset}"))
    miss = need_env("EGA_CREDENTIALS")
    if miss:
        print("  PENDING_USER_AUTH: set", miss, "(EGA credentials JSON) + DAC approval for this dataset.")
    if not execute:
        print("  DRY-RUN would run:")
        print("    $ pyega3 -cf $EGA_CREDENTIALS files", dataset)
        print("    $ pyega3 -cf $EGA_CREDENTIALS fetch", dataset, "--output-dir /workspace/ega_pull")
        return
    if miss:
        sys.exit(2)
    if not shutil.which("pyega3"):
        run([sys.executable, "-m", "pip", "install", "pyega3"], True)
    run(["pyega3", "-cf", os.environ["EGA_CREDENTIALS"], "files", dataset], True)
    run(["pyega3", "-cf", os.environ["EGA_CREDENTIALS"], "fetch", dataset, "--output-dir", "/workspace/ega_pull"], True)

# ---------------- dbGaP ----------------
def dbgap(phs, execute):
    print(f"[dbGaP] phs={phs}")
    print("  reachability:", reach(f"https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id={phs}"))
    miss = need_env("DBGAP_NGC")
    if miss:
        print("  PENDING_USER_AUTH: set", miss, "(prj_XXXXX.ngc repo key from approved DAR).")
    if not execute:
        print("  DRY-RUN would run:")
        print("    $ vdb-config --import $DBGAP_NGC")
        print("    $ prefetch --ngc $DBGAP_NGC <cart.krt | run-accessions>   # study", phs)
        print("    NOTE: phenotype/PFI tables are in the study's dbGaP phenotype files (not SRA).")
        return
    if miss:
        sys.exit(2)
    if not shutil.which("prefetch"):
        print("  Install SRA Toolkit: https://github.com/ncbi/sra-tools"); sys.exit(2)
    run(["vdb-config", "--import", os.environ["DBGAP_NGC"]], True)
    runlist = os.environ.get("DBGAP_RUNLIST")
    if runlist and os.path.exists(runlist):
        for acc in open(runlist):
            acc = acc.strip()
            if acc:
                run(["prefetch", "--ngc", os.environ["DBGAP_NGC"], acc], True)
    else:
        print("  Set DBGAP_RUNLIST=/path/to/accessions.txt or a .krt cart to fetch specific files.")

# ---------------- PDS ----------------
def pds(trial, execute):
    print(f"[PDS] trial={trial}")
    print("  reachability:", reach("https://data.projectdatasphere.org/"))
    miss = need_env("PDS_USER", "PDS_PASSWORD")
    if miss:
        print("  PENDING_USER_AUTH: set", miss, "+ signed DUA + Research Access account.")
    print("  NOTE: PDS dataset IDs are portal-internal; locate the deposit for", trial,
          "in the PDS catalog after login, then download the CA-125 + outcome tables.")
    if not execute:
        print("  DRY-RUN would authenticate to the PDS portal and pull the deposit's longitudinal CA-125 + PFS tables.")
        return
    if miss:
        sys.exit(2)
    print("  (PDS has no public bulk API; download is via the authenticated portal session / provided client.)")

# ---------------- Synapse (open tier available now) ----------------
def synapse(syn, execute):
    print(f"[Synapse] entity={syn}")
    tok = os.environ.get("SYNAPSE_AUTH_TOKEN")
    print("  reachability:", reach(f"https://repo-prod.prod.sagebase.org/repo/v1/entity/{syn}") if tok else "set SYNAPSE_AUTH_TOKEN to check entity")
    if not execute:
        print("  DRY-RUN would run:")
        print("    $ synapse get -r", syn, "   # open tier is pullable now with a Synapse PAT")
        return
    if not tok:
        print("  Set SYNAPSE_AUTH_TOKEN (open tier still needs a free Synapse login)."); sys.exit(2)
    if not shutil.which("synapse"):
        run([sys.executable, "-m", "pip", "install", "synapseclient"], True)
    run(["synapse", "-p", tok, "get", "-r", syn], True)

SOURCES = {"ega": ega, "dbgap": dbgap, "pds": pds, "synapse": synapse}

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--source", choices=list(SOURCES))
    ap.add_argument("--dataset"); ap.add_argument("--phs"); ap.add_argument("--trial"); ap.add_argument("--syn")
    ap.add_argument("--all", action="store_true", help="reachability sweep of all sources (dry-run)")
    ap.add_argument("--execute", action="store_true", help="actually pull (requires creds). Default is --dry-run.")
    ap.add_argument("--dry-run", action="store_true", default=True)
    a = ap.parse_args()
    execute = a.execute
    print("=== ingest_master ===", "MODE:", "EXECUTE" if execute else "DRY-RUN (no controlled data touched)")
    if a.all:
        ega("EGAD00001011049", False); dbgap("phs000178.v11.p8", False)
        pds("GOG-0218", False); synapse("syn25569736", False)
        return
    if not a.source:
        ap.error("give --source (or --all)")
    fn = SOURCES[a.source]
    arg = {"ega": a.dataset, "dbgap": a.phs, "pds": a.trial, "synapse": a.syn}[a.source]
    if not arg:
        ap.error(f"--source {a.source} needs its target id")
    fn(arg, execute)

if __name__ == "__main__":
    main()
