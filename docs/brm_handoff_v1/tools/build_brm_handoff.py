"""Inventory and package existing BrM deliverables; never rerun biological analyses."""
from __future__ import annotations

import argparse
import csv
import hashlib
import io
import json
from pathlib import Path, PurePosixPath
import re
import shutil
import tempfile
import zipfile
import xml.etree.ElementTree as ET

ARCHIVE = "crispro_brm_full_handoff_v1.zip"
REPORT = "report_crispro_brm_handoff_v1.md"
TOP = "crispro_brm_full_handoff_v1"
TEXT_SUFFIXES = {".md", ".txt", ".csv", ".tsv", ".json", ".svg", ".cif", ".py"}
EXCLUDED_PREFIXES = ("daraxonrasib", "report_crispro_brm_handoff", "crispro_brm_full_handoff")
SECRETS = [
    re.compile(rb"gh[pousr]_[A-Za-z0-9_]{20,}"),
    re.compile(rb"github_pat_[A-Za-z0-9_]{20,}"),
    re.compile(rb"sk-or-v1-[A-Za-z0-9]{20,}"),
    re.compile(rb"\bAKIA[A-Z0-9]{16}\b"),
    re.compile(rb"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"),
    re.compile(rb"https?://[^/\s:@]+:[^/\s@]+@"),
]
FORBIDDEN_PARTS = {"execution_trace", ".git", ".venv", "__pycache__", ".pytest_cache"}


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def eligible_result(path: Path, root: Path) -> bool:
    rel = path.relative_to(root)
    return (
        path.is_file()
        and not path.is_symlink()
        and not any(p in FORBIDDEN_PARTS or p.startswith(".") for p in rel.parts)
        and "execution_trace" not in path.name
        and path.suffix.lower() not in {".ipynb", ".zip"}
        and not path.name.startswith(EXCLUDED_PREFIXES)
        and path.stat().st_size > 0
    )


def safe_name(name: str) -> bool:
    p = PurePosixPath(name)
    return not p.is_absolute() and ".." not in p.parts and "\\" not in name


def assert_no_secrets(name: str, data: bytes) -> None:
    if any(p.search(data) for p in SECRETS):
        # Deliberately never print or persist matched credential bytes.
        raise ValueError(f"Credential-like content detected in {name}; package blocked")


def workbook_summary(data: bytes) -> dict:
    ns = {"s": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
    relns = {"r": "http://schemas.openxmlformats.org/package/2006/relationships"}
    with zipfile.ZipFile(io.BytesIO(data)) as z:
        shared = []
        if "xl/sharedStrings.xml" in z.namelist():
            node = ET.fromstring(z.read("xl/sharedStrings.xml"))
            shared = ["".join(n.itertext()) for n in node.findall("s:si", ns)]
        wb = ET.fromstring(z.read("xl/workbook.xml"))
        relationships = ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))
        rels = {x.attrib["Id"]: x.attrib["Target"] for x in relationships.findall("r:Relationship", relns)}
        result = []
        for sheet in wb.findall("s:sheets/s:sheet", ns):
            rid = sheet.attrib["{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"]
            target = rels[rid]
            target = target.lstrip("/") if target.startswith("/") else "xl/" + target
            node = ET.fromstring(z.read(target))
            dimension = node.find("s:dimension", ns)
            rows = node.findall("s:sheetData/s:row", ns)
            preview = []
            for row in rows[:5]:
                values = []
                for cell in row.findall("s:c", ns)[:18]:
                    value = cell.find("s:v", ns)
                    text = value.text if value is not None else ""
                    if cell.attrib.get("t") == "s" and text:
                        text = shared[int(text)]
                    elif cell.attrib.get("t") == "inlineStr":
                        inline = cell.find("s:is", ns)
                        text = "".join(inline.itertext()) if inline is not None else ""
                    values.append(text)
                preview.append(values)
            result.append({
                "sheet": sheet.attrib["name"], "stored_rows": len(rows),
                "dimension": dimension.attrib.get("ref") if dimension is not None else None,
                "first_rows": preview,
            })
        return {"sheets": result}


def classify(rel: str) -> str:
    name = Path(rel).name
    if rel.startswith("af3_structural_validation/"):
        return "structural_predictions"
    if name.startswith(("report_", "blog_", "manuscript_")):
        return "historical_reports"
    if name.startswith("af3_job"):
        return "structural_inputs"
    if name.endswith((".png", ".svg")):
        return "figures"
    return "tables_and_summaries"


def collect(results: Path, uploads: Path) -> tuple[list[dict], list[dict]]:
    """Use explicit source categories, not a blanket archive of any directory."""
    entries, excluded = [], []
    candidates = [p for p in results.iterdir() if p.is_file()]
    structural = results / "af3_structural_validation"
    if structural.exists():
        candidates.extend(p for p in structural.rglob("*") if p.is_file())
    for p in sorted(candidates):
        if not p.is_file():
            continue
        if "execution_trace" in p.name or p.suffix.lower() == ".ipynb":
            # Internal records are never catalogued or exported.
            continue
        if eligible_result(p, results):
            rel = p.relative_to(results).as_posix()
            entries.append({
                "source": p, "member": f"originals/{classify(rel)}/{rel}",
                "origin": f"existing result: {rel}", "bytes": p.stat().st_size,
            })
        elif p.name != ".keep":
            excluded.append({
                "artifact": p.name,
                "reason": "Unrelated project, internal record, previous handoff, archive, or unsupported input",
            })
    for name in ["41467_2022_33365_MOESM6_ESM.xlsx", "a2f1293b8766f86ca8c59ad3babc3261.xlsx"]:
        p = uploads / name
        if p.exists():
            entries.append({
                "source": p, "member": f"originals/supplementary_workbooks/{name}",
                "origin": f"user-provided workbook: {name}", "bytes": p.stat().st_size,
            })
    known = {digest(e["source"].read_bytes()) for e in entries}
    seen_zip = set()
    for p in sorted(uploads.glob("fold_*.zip")):
        data = p.read_bytes()
        zhash = digest(data)
        if zhash in seen_zip:
            excluded.append({"artifact": p.name, "reason": "Byte-identical duplicate uploaded fold archive"})
            continue
        seen_zip.add(zhash)
        with zipfile.ZipFile(io.BytesIO(data)) as z:
            members = [n for n in z.namelist() if not n.endswith("/")]
            unique = [n for n in members if digest(z.read(n)) not in known]
        if unique:
            entries.append({
                "source": p, "member": f"originals/uploaded_fold_archives/{p.name}",
                "origin": f"user-provided fold archive; {len(unique)} member(s) not byte-identical to extracted results",
                "bytes": len(data),
            })
        else:
            excluded.append({"artifact": p.name, "reason": "All member bytes already preserved in extracted structural outputs"})
    # Explicitly note unrelated upload exclusions, without including their contents.
    chosen = {e["source"].name for e in entries}
    recorded = {e["artifact"] for e in excluded}
    for p in sorted(uploads.iterdir()):
        if p.is_file() and p.name != ".keep" and p.name not in chosen | recorded:
            excluded.append({"artifact": p.name, "reason": "Unrelated upload, screenshot, or unlinked roadmap; not part of BrM evidence package"})
    return entries, excluded


def inspect_entry(entry: dict) -> dict:
    p = entry["source"]
    data = p.read_bytes()
    assert_no_secrets(p.name, data)
    out = {
        "artifact": p.name, "archive_path": entry["member"],
        "source_kind": entry["origin"], "size_bytes": len(data), "sha256": digest(data),
    }
    if p.suffix == ".csv":
        rows = list(csv.DictReader(io.StringIO(data.decode("utf-8-sig"))))
        fields = list(rows[0]) if rows else []
        out.update({"rows": len(rows), "columns": fields})
        numeric = {}
        missing = {}
        for field in fields:
            values = [row[field] for row in rows]
            usable = [v for v in values if v not in ("", "N/A", "NA", "nan")]
            missing[field] = len(values) - len(usable)
            try:
                nums = [float(v) for v in usable]
                if nums:
                    numeric[field] = {"min": min(nums), "max": max(nums)}
            except (ValueError, TypeError):
                pass
        out["numeric_ranges"] = numeric
        out["missing_by_column"] = missing
        out["head"] = rows[:2]
        out["tail"] = rows[-1:]
    elif p.suffix == ".json":
        obj = json.loads(data)
        out["top_level_type"] = type(obj).__name__
        out["top_level_keys"] = list(obj)[:30] if isinstance(obj, dict) else None
    elif p.suffix == ".xlsx":
        out.update(workbook_summary(data))
    elif p.suffix == ".zip":
        with zipfile.ZipFile(io.BytesIO(data)) as z:
            out["members"] = [x.filename for x in z.infolist() if not x.is_dir()]
    return out


def audit(results: Path, uploads: Path) -> dict:
    entries, excluded = collect(results, uploads)
    inspection = [inspect_entry(e) for e in entries]
    reports = [e for e in entries if e["source"].suffix == ".md"]
    accessions: dict[str, list[str]] = {}
    for e in reports:
        text = e["source"].read_text()
        for acc in sorted(set(re.findall(r"\b(?:GSE|GSM|SRP|PRJNA)\d+\b", text))):
            accessions.setdefault(acc, []).append(e["source"].name)
    return {
        "files": inspection, "exclusions": excluded,
        "accessions_in_reports": accessions,
        "source_bytes": sum(e["bytes"] for e in entries),
    }


def csv_bytes(rows: list[dict]) -> bytes:
    fields = list(dict.fromkeys(k for row in rows for k in row))
    s = io.StringIO(newline="")
    w = csv.DictWriter(s, fieldnames=fields)
    w.writeheader()
    w.writerows(rows)
    return s.getvalue().encode()


def nested_checks(name: str, data: bytes) -> None:
    assert_no_secrets(name, data)
    if name.endswith((".zip", ".xlsx")):
        with zipfile.ZipFile(io.BytesIO(data)) as z:
            if z.testzip() is not None:
                raise ValueError(f"Corrupt container: {name}")
            for member in z.infolist():
                if not safe_name(member.filename):
                    raise ValueError(f"Unsafe nested path in {name}")
                if not member.is_dir():
                    assert_no_secrets(f"{name}:{member.filename}", z.read(member))


def build(results: Path, uploads: Path, documents: Path, output: Path) -> dict:
    entries, exclusions = collect(results, uploads)
    inspection = [inspect_entry(e) for e in entries]
    output.mkdir(parents=True, exist_ok=True)
    generated: dict[str, bytes] = {}
    for p in sorted(documents.iterdir()):
        if p.is_file():
            generated[f"handoff/{p.name}"] = p.read_bytes()
    required = {"README.md", REPORT, "dataset_inventory.csv", "analysis_status.csv", "findings_ledger.csv", "missing_assets.csv"}
    if not required <= {Path(n).name for n in generated}:
        raise ValueError("Required handoff document missing")
    generated["handoff/artifact_inventory.json"] = json.dumps(inspection, indent=2, ensure_ascii=False).encode()
    generated["handoff/excluded_assets.csv"] = csv_bytes(exclusions)
    # Ship only the new user-facing packaging code, not any execution records.
    for name in ["build_brm_handoff.py", "test_brm_handoff.py", "handoff_catalog.py", "write_handoff_docs.py"]:
        p = Path(__file__).parent / name
        if p.exists():
            generated[f"tools/{name}"] = p.read_bytes()
    rows = []
    with tempfile.TemporaryDirectory(prefix="brm_handoff_") as tmp:
        local = Path(tmp) / ARCHIVE
        with zipfile.ZipFile(local, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=6) as z:
            def add(member: str, data: bytes, origin: str) -> None:
                if not safe_name(member):
                    raise ValueError("Unsafe payload path")
                nested_checks(member, data)
                rows.append({
                    "path": member, "size_bytes": len(data),
                    "sha256": digest(data), "origin": origin,
                })
                z.writestr(f"{TOP}/{member}", data)
            for e in entries:
                add(e["member"], e["source"].read_bytes(), e["origin"])
            for member, data in generated.items():
                add(member, data, "New handoff documentation, inventory, or packaging utility")
            manifest = csv_bytes(rows)
            z.writestr(f"{TOP}/MANIFEST_SHA256.csv", manifest)
        dest = output / ARCHIVE
        shutil.copyfile(local, dest)
    shutil.copyfile(documents / REPORT, output / REPORT)
    verification = verify(output / ARCHIVE)
    verification["standalone_report_matches_archive"] = (output / REPORT).read_bytes() == (documents / REPORT).read_bytes()
    if not verification["standalone_report_matches_archive"]:
        raise ValueError("Standalone report mismatch")
    return verification


def verify(path: Path) -> dict:
    with zipfile.ZipFile(path) as z:
        names = z.namelist()
        if len(names) != len(set(names)) or not all(safe_name(n) for n in names):
            raise ValueError("Duplicate or unsafe archive paths")
        if z.testzip() is not None:
            raise ValueError("CRC validation failed")
        for n in names:
            if any(part in FORBIDDEN_PARTS for part in PurePosixPath(n).parts) or n.endswith(".ipynb"):
                raise ValueError("Internal artifact in archive")
        manifest = f"{TOP}/MANIFEST_SHA256.csv"
        rows = list(csv.DictReader(io.StringIO(z.read(manifest).decode())))
        expected = {f"{TOP}/{r['path']}" for r in rows} | {manifest}
        if expected != set(names):
            raise ValueError("Manifest member set mismatch")
        for row in rows:
            data = z.read(f"{TOP}/{row['path']}")
            if len(data) != int(row["size_bytes"]) or not data or digest(data) != row["sha256"]:
                raise ValueError(f"Manifest verification failed: {row['path']}")
            nested_checks(row["path"], data)
    return {
        "archive": path.name, "archive_bytes": path.stat().st_size,
        "archive_sha256": digest(path.read_bytes()),
        "members": len(names), "manifest_verified_files": len(rows),
        "crc_ok": True, "credential_scan_ok": True,
        "safe_paths_ok": True, "internal_artifacts_excluded": True,
    }


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--results", type=Path)
    p.add_argument("--uploads", type=Path)
    p.add_argument("--documents", type=Path)
    p.add_argument("--output", type=Path)
    p.add_argument("--audit", type=Path, help="Write detailed local inspection JSON")
    p.add_argument("--verify", type=Path)
    args = p.parse_args()
    if args.verify:
        print(json.dumps(verify(args.verify), indent=2))
    elif args.audit:
        obj = audit(args.results, args.uploads)
        args.audit.write_text(json.dumps(obj, indent=2, ensure_ascii=False))
        print(json.dumps({
            "files": len(obj["files"]), "source_bytes": obj["source_bytes"],
            "accessions_in_reports": obj["accessions_in_reports"],
            "workbooks": [x for x in obj["files"] if x["artifact"].endswith(".xlsx")],
            "uploaded_fold_archives": [x for x in obj["files"] if x["artifact"].endswith(".zip")],
        }, indent=2))
    else:
        print(json.dumps(build(args.results, args.uploads, args.documents, args.output), indent=2))


if __name__ == "__main__":
    main()
