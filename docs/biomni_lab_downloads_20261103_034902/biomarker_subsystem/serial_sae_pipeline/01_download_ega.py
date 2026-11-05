#!/usr/bin/env python3
"""
Serial-SAE cohort — Step 1: EGA controlled-access download (EGAD00001011049)

RUN THIS ON A DEDICATED IN-REGION VM (AWS eu-west-1 / GCP europe-west2), NOT in the
agent sandbox. Dataset is ~511 GB / 679 files; the sandbox cannot hold it or survive
the runtime.

CREDENTIALS — two supported modes (NEVER hardcoded in source):

  (A) Environment variables (preferred for one-shot VM runs):
        export EGA_USERNAME="you@example.org"
        export EGA_PASSWORD="..."        # rotated; never paste into chat/logs
      The script writes a temp chmod-600 credentials.json from these env vars and
      deletes it on exit. Do NOT leave EGA_PASSWORD in a persistent shell history.

  (B) Pre-created credentials file on the VM:
        ~/.pyega3/credentials.json
        { "username": "you@example.org", "password": "..." }
        chmod 600 ~/.pyega3/credentials.json
        python3 01_download_ega.py ... --credentials ~/.pyega3/credentials.json

If any credential was ever pasted into an assistant session, a shared log, or an
uploaded file, ROTATE IT before use. A pasted credential is a burned credential.

INTEGRITY — MD5 is the source of truth, NOT byte size:
  EGA serves Crypt4GH-encrypted files. The encrypted byte size on the EGA metadata
  page is LARGER than the decrypted file you receive (Crypt4GH adds ~28 bytes per
  64 KiB block + a header — roughly +231 KB on a 552 MB file, NOT 16 bytes). So a
  byte-size comparison against the encrypted size will always "fail" and is WRONG.
  pyega3 decrypts on the fly and verifies the UNENCRYPTED MD5 internally. This
  script additionally recomputes md5sum of the landed file and compares it against
  the unencrypted checksum from the EGA metadata API (or a supplied manifest CSV).
  Match on MD5 = byte-perfect. Do not compare raw byte counts.

INSTALL (on the VM):
    python3 -m pip install pyega3

USAGE:
    # dry-run: list what would be downloaded, check disk, no transfer
    EGA_USERNAME=... EGA_PASSWORD=... python3 01_download_ega.py \
        --ledger subject_ledger.csv --outdir /data/ega --dry-run

    # real run (resumable; safe to re-invoke — pyega3 skips completed files)
    EGA_USERNAME=... EGA_PASSWORD=... python3 01_download_ega.py \
        --ledger subject_ledger.csv --outdir /data/ega

    # restrict to specific EGAF IDs (e.g. a pilot subset)
    EGA_USERNAME=... EGA_PASSWORD=... python3 01_download_ega.py \
        --ledger subject_ledger.csv --outdir /data/ega --only EGAF00008095344,EGAF00008095415
"""
import argparse, atexit, csv, hashlib, json, os, shutil, subprocess, sys, tempfile
from pathlib import Path

DATASET = "EGAD00001011049"
EST_TOTAL_GB = 511  # dataset page: 679 files, 511 GB


def collect_file_ids(ledger_path):
    ids = []
    with open(ledger_path) as fh:
        for row in csv.DictReader(fh):
            for col in ("dx_egaf", "relapse_egaf"):
                v = (row.get(col) or "").strip()
                if v and v.upper().startswith("EGAF"):
                    ids.append((row["subject"], col, v))
    seen, uniq = set(), []
    for subj, col, fid in ids:
        if fid not in seen:
            seen.add(fid); uniq.append((subj, col, fid))
    return uniq


def check_disk(outdir, need_gb):
    Path(outdir).mkdir(parents=True, exist_ok=True)
    free_gb = shutil.disk_usage(outdir).free / 1e9
    print(f"[disk] free at {outdir}: {free_gb:.1f} GB | estimated need: ~{need_gb} GB")
    if free_gb < need_gb * 1.15:
        print(f"[disk] ERROR: need ~{need_gb*1.15:.0f} GB (15% headroom). Provision a larger volume.", file=sys.stderr)
        return False
    return True


def resolve_credentials(args):
    """Return a path to a chmod-600 pyega3 credentials.json. Mode A: env vars
    (write temp file, register cleanup). Mode B: existing --credentials file."""
    user = os.environ.get("EGA_USERNAME")
    pw = os.environ.get("EGA_PASSWORD")
    if user and pw:
        fd, tmp = tempfile.mkstemp(suffix=".json", prefix="pyega3_cred_")
        with os.fdopen(fd, "w") as fh:
            json.dump({"username": user, "password": pw}, fh)
        os.chmod(tmp, 0o600)
        atexit.register(lambda p=tmp: (os.path.exists(p) and os.remove(p)))
        print(f"[cred] using EGA_USERNAME/EGA_PASSWORD env vars -> temp file {tmp} (chmod 600, auto-deleted on exit)")
        return Path(tmp)
    cred = Path(os.path.expanduser(args.credentials)) if args.credentials else None
    if cred and cred.exists():
        mode = oct(cred.stat().st_mode)[-3:]
        if mode != "600":
            print(f"[cred] WARNING: {cred} mode is {mode}; recommend `chmod 600 {cred}`.", file=sys.stderr)
        print(f"[cred] using credentials file {cred}")
        return cred
    sys.exit("[cred] ERROR: set EGA_USERNAME+EGA_PASSWORD env vars, or pass --credentials <path>. "
             "Do not paste secrets into chat.")


def md5_of_file(path, chunk=1 << 20):
    h = hashlib.md5()
    with open(path, "rb") as fh:
        for blk in iter(lambda: fh.read(chunk), b""):
            h.update(blk)
    return h.hexdigest()


def fetch_expected_md5(cred_path, egaf_id, connections):
    """Query the EGA metadata API for the unencrypted (decrypted) MD5 of a file.
    Returns the checksum string or None if unavailable. pyega3's `files` subcommand
    prints per-file metadata including the unencrypted checksum to stdout."""
    try:
        out = subprocess.run(
            ["pyega3", "-cf", str(cred_path), "-c", str(connections), "files", egaf_id],
            capture_output=True, text=True, timeout=120,
        )
        text = (out.stdout or "") + (out.stderr or "")
        # pyega3 prints a table; look for a 32-hex md5 token labelled unencrypted/checksum
        import re
        m = re.search(r"(?:unencryptedChecksum|unencrypted_checksum|checksum)\D{0,4}([0-9a-fA-F]{32})", text)
        if m:
            return m.group(1).lower()
    except Exception as e:
        print(f"  [md5-meta] could not fetch expected checksum for {egaf_id}: {e}", file=sys.stderr)
    return None


def find_downloaded_bam(outdir, egaf_id):
    """pyega3 lands files as <egaf_id>.<original_name>; locate the .bam."""
    cands = list(Path(outdir).glob(f"{egaf_id}*")) + list(Path(outdir).glob("*.bam"))
    # prefer a file whose name contains the egaf id
    for c in cands:
        if egaf_id in c.name and c.is_file() and c.stat().st_size > 0:
            return c
    return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--ledger", required=True)
    ap.add_argument("--outdir", required=True)
    ap.add_argument("--credentials", default=None, help="Path to pyega3 credentials.json (mode B). "
                    "If omitted, EGA_USERNAME/EGA_PASSWORD env vars are required (mode A).")
    ap.add_argument("--connections", type=int, default=4)
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--only", default=None, help="Comma-separated EGAF IDs to restrict to (e.g. pilot subset)")
    ap.add_argument("--skip-md5-verify", action="store_true", help="Skip post-download MD5 recheck "
                    "(pyega3 still verifies internally; use only if metadata API is unreachable)")
    args = ap.parse_args()

    cred = resolve_credentials(args)

    files = collect_file_ids(args.ledger)
    if args.only:
        want = {x.strip().upper() for x in args.only.split(",") if x.strip()}
        files = [f for f in files if f[2] in want]
    print(f"[plan] {len(files)} unique EGAF file IDs to fetch (dataset {DATASET}).")
    print(f"[plan] first 5: {[f[2] for f in files[:5]]}")
    if not check_disk(args.outdir, EST_TOTAL_GB if not args.only else max(1, len(files) * 2)):
        sys.exit(2)

    if args.dry_run:
        print("[dry-run] would download the above file IDs via pyega3. No transfer performed.")
        return

    failed, md5_mismatch = [], []
    for i, (subj, col, fid) in enumerate(files, 1):
        print(f"[{i}/{len(files)}] subject={subj} {col} {fid}")
        cmd = ["pyega3", "-cf", str(cred), "-c", str(args.connections),
               "fetch", fid, "--output-dir", args.outdir]
        rc = subprocess.call(cmd)
        if rc != 0:
            print(f"  [warn] pyega3 returned {rc} for {fid}; will report at end.", file=sys.stderr)
            failed.append(fid)
            continue

        if not args.skip_md5_verify:
            expected = fetch_expected_md5(cred, fid, args.connections)
            bam = find_downloaded_bam(args.outdir, fid)
            if expected and bam:
                actual = md5_of_file(bam)
                ok = (actual == expected.lower())
                tag = "MATCH" if ok else "MISMATCH"
                print(f"  [md5] {tag}: expected={expected} actual={actual} file={bam.name}")
                if not ok:
                    md5_mismatch.append((fid, expected, actual))
            elif bam:
                print(f"  [md5] could not retrieve expected checksum from metadata API for {fid}; "
                      f"relying on pyega3 internal verification (file landed: {bam.name}, "
                      f"{bam.stat().st_size/1e6:.1f} MB).")
            else:
                print(f"  [md5] no landed file found for {fid} in {args.outdir}", file=sys.stderr)
                failed.append(fid)

    print("\n[summary]")
    print(f"  failed downloads: {len(failed)}  {failed if failed else ''}")
    print(f"  md5 mismatches:   {len(md5_mismatch)}  {md5_mismatch if md5_mismatch else ''}")
    if failed:
        Path(args.outdir, "FAILED_downloads.txt").write_text("\n".join(failed))
        print(f"  failed ids written to FAILED_downloads.txt. Re-run to resume.")
    if md5_mismatch:
        Path(args.outdir, "MD5_MISMATCH.txt").write_text(
            "\n".join(f"{fid} expected={e} actual={a}" for fid, e, a in md5_mismatch))
        print(f"  mismatch details in MD5_MISMATCH.txt.")
    if not failed and not md5_mismatch:
        print("  all referenced files downloaded and MD5-verified.")


if __name__ == "__main__":
    main()
