#!/usr/bin/env python3
"""
provenance.py -- Gate A source acquisition and checksum enforcement.

Downloads the BriTROC-1 published Source Data (Nature Communications MOESM10),
verifies the archive checksum against a pinned value, extracts only the three
tables the S3 analysis consumes, and records a per-file SHA256 manifest.

Any checksum mismatch raises. There is no "warn and continue" path: an
unverified input must not be able to reach an analysis that will be presented
as reproducible.
"""
from __future__ import annotations

import hashlib
import json
import os
import subprocess
import zipfile
from dataclasses import dataclass, asdict
from pathlib import Path

# BriTROC-1: Smith P., Bradley T., Gavarro L.M. et al. Nat Commun 14, 4387 (2023)
# DOI 10.1038/s41467-023-39867-7 -- Source Data archive (MOESM10)
SOURCE_URL = (
    "https://static-content.springer.com/esm/"
    "art%3A10.1038%2Fs41467-023-39867-7/MediaObjects/"
    "41467_2023_39867_MOESM10_ESM.zip"
)
SOURCE_DOI = "10.1038/s41467-023-39867-7"
SOURCE_CITATION = (
    "Smith P, Bradley T, Gavarro LM, et al. The copy number and mutational "
    "landscape of recurrent ovarian high-grade serous carcinoma. "
    "Nat Commun 14, 4387 (2023). DOI 10.1038/s41467-023-39867-7"
)

# Pinned archive checksum, established 2026-08-19 from the publisher endpoint.
PINNED_ARCHIVE_SHA256 = (
    "2f7f15417e3a5076633dd75abbad75a26285d94ec1e26f8f22ebf10d337a0a3f"
)
PINNED_ARCHIVE_BYTES = 10_603_503

# The only three tables the S3 analysis is permitted to read.
REQUIRED_MEMBERS = (
    "source_data/figure_4A.tsv",         # CN signature exposures s1-s7, diagnosis (arx) + relapse (rlps)
    "source_data/figure_1B_layer_1.tsv",  # overall survival + pt_sensitivity_at_reg
    "source_data/figure_2.tsv",           # age, stage, histology, num_lines, BRCA/HR gene status
)


def sha256_file(path: str | os.PathLike, chunk: int = 1 << 20) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as fh:
        while True:
            block = fh.read(chunk)
            if not block:
                break
            h.update(block)
    return h.hexdigest()


@dataclass
class SourceManifest:
    url: str
    doi: str
    citation: str
    archive_sha256: str
    archive_bytes: int
    archive_sha256_matches_pin: bool
    member_sha256: dict
    extracted_to: str

    def to_json(self, path: str | os.PathLike) -> None:
        Path(path).parent.mkdir(parents=True, exist_ok=True)
        with open(path, "w") as fh:
            json.dump(asdict(self), fh, indent=2, sort_keys=True)


class ChecksumMismatch(RuntimeError):
    """Raised when a source artifact does not match its pinned checksum."""


def acquire(workdir: str | os.PathLike, archive_cache: str | None = None) -> SourceManifest:
    """Download (or reuse) the archive, verify it, extract the three required tables."""
    workdir = Path(workdir)
    workdir.mkdir(parents=True, exist_ok=True)
    archive = Path(archive_cache) if archive_cache else workdir / "MOESM10_ESM.zip"

    if not archive.exists():
        subprocess.run(
            ["curl", "-sS", "-L", "--fail", "-o", str(archive), SOURCE_URL],
            check=True,
            timeout=600,
        )

    digest = sha256_file(archive)
    nbytes = archive.stat().st_size
    matches = digest == PINNED_ARCHIVE_SHA256 and nbytes == PINNED_ARCHIVE_BYTES
    if not matches:
        raise ChecksumMismatch(
            f"archive checksum/size mismatch: got sha256={digest} bytes={nbytes}; "
            f"expected sha256={PINNED_ARCHIVE_SHA256} bytes={PINNED_ARCHIVE_BYTES}"
        )

    dest = workdir / "source_data_verified"
    dest.mkdir(parents=True, exist_ok=True)
    member_hashes: dict[str, str] = {}
    with zipfile.ZipFile(archive) as zf:
        names = set(zf.namelist())
        missing = [m for m in REQUIRED_MEMBERS if m not in names]
        if missing:
            raise ChecksumMismatch(f"archive is missing required members: {missing}")
        for member in REQUIRED_MEMBERS:
            target = dest / Path(member).name
            with zf.open(member) as src, open(target, "wb") as out:
                out.write(src.read())
            member_hashes[Path(member).name] = sha256_file(target)

    return SourceManifest(
        url=SOURCE_URL,
        doi=SOURCE_DOI,
        citation=SOURCE_CITATION,
        archive_sha256=digest,
        archive_bytes=nbytes,
        archive_sha256_matches_pin=matches,
        member_sha256=member_hashes,
        extracted_to=str(dest),
    )


def env_fingerprint() -> dict:
    """Record the exact numerical stack so a rerun can be judged comparable."""
    import platform
    import numpy
    import pandas
    import scipy
    import sklearn

    return {
        "python": platform.python_version(),
        "platform": platform.platform(),
        "numpy": numpy.__version__,
        "pandas": pandas.__version__,
        "scipy": scipy.__version__,
        "scikit_learn": sklearn.__version__,
    }
