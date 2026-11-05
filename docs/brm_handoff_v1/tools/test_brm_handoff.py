from pathlib import Path
import io
import zipfile
import pytest

from build_brm_handoff import (
    assert_no_secrets, eligible_result, nested_checks, safe_name, digest, csv_bytes,
)


def test_normal_result_is_included(tmp_path):
    p = tmp_path / "gse131907_deseq2_results.csv"
    p.write_text("gene,lfc\nBACE1,0.35\n")
    assert eligible_result(p, tmp_path)


@pytest.mark.parametrize("name", [
    "execution_trace.ipynb", "daraxonrasib_crispro_proposal.md",
    "crispro_brm_full_handoff_v1.zip", ".env", "execution_trace/transcript.jsonl",
    ".git/config",
])
def test_unwanted_files_excluded(tmp_path, name):
    p = tmp_path / name
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text("nonempty")
    assert not eligible_result(p, tmp_path)


@pytest.mark.parametrize("name", ["../bad", "/absolute", "ok/../../bad", "a\\b"])
def test_unsafe_path(name):
    assert not safe_name(name)


def test_normal_path():
    assert safe_name("handoff/README.md")


def test_secret_detector():
    # Artificial test token, never a credential.
    with pytest.raises(ValueError, match="Credential-like"):
        assert_no_secrets("fixture", b"ghp_" + b"x" * 30)
    assert_no_secrets("normal", b"normal biological summary")


def test_nested_archive_scan():
    b = io.BytesIO()
    with zipfile.ZipFile(b, "w") as z:
        z.writestr("../escape.txt", b"unsafe")
    with pytest.raises(ValueError, match="Unsafe nested"):
        nested_checks("fixture.zip", b.getvalue())


def test_manifest_encoding():
    data = csv_bytes([{"path": "a", "size_bytes": 1, "sha256": digest(b"x")}])
    assert b"sha256" in data
