"""
Pytest bootstrap for the Resistance Prophet / S3 adversarial suites.

Two suites live here:

  test_adversarial_pipeline.py     runs anywhere: tests the reproduction pipeline
                                   (s3_pipeline) against the published cohort table.
  test_adversarial_s3_research.py  MIRROR of the backend suite. It imports
                                   api.services.resistance_prophet.* and therefore only
                                   collects when run from inside the crispro-backend-v2
                                   working tree. It is included here as the reviewable
                                   artifact for the S3 service integration; outside that
                                   repo it is skipped, not silently passed.
"""
from __future__ import annotations

import importlib.util
import sys
from pathlib import Path

_CODE_DIR = Path(__file__).resolve().parent.parent
if str(_CODE_DIR) not in sys.path:
    sys.path.insert(0, str(_CODE_DIR))

collect_ignore = []
if importlib.util.find_spec("api") is None:
    collect_ignore.append("test_adversarial_s3_research.py")
