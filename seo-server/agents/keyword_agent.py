"""
agents/keyword_agent.py
Fetches keyword volume + difficulty from Semrush (volume) and Google KW (KD).
Uses asyncio.gather for concurrent keyword batches.
Semrush is sequential with 1.2s delay (rate limit constraint confirmed in live testing).
"""
import asyncio
import logging
from typing import List

import aiohttp

from core.config import Settings
from core.models import KeywordResult

logger = logging.getLogger(__name__)

SEMRUSH_DELAY = 1.2  # seconds between Semrush requests (rate limit)


async def _fetch_semrush_volume(
    session: aiohttp.ClientSession,
    keyword: str,
    settings: Settings,
) -> dict:
    """Fetch global search volume from Semrush for one keyword."""
    url = "https://semrush-online-marketing-tools.p.rapidapi.com/global-volume"
    headers = {
        "x-rapidapi-key": settings.rapidapi_key,
        "x-rapidapi-host": settings.semrush_host,
        "Accept-Encoding": "gzip, deflate",
    }
    params = {"keyword": keyword, "country": "us"}
    try:
        async with session.get(url, headers=headers, params=params, timeout=aiohttp.ClientTimeout(total=15)) as resp:
            if resp.status == 200:
                data = await resp.json(content_type=None)
                return {"keyword": keyword, "status": 200, "data": data}
            else:
                text = await resp.text()
                logger.warning(f"Semrush {resp.status} for '{keyword}': {text[:200]}")
                return {"keyword": keyword, "status": resp.status, "data": None}
    except Exception as e:
        logger.error(f"Semrush error for '{keyword}': {e}")
        return {"keyword": keyword, "status": 0, "data": None, "error": str(e)}


async def _fetch_google_kw(
    session: aiohttp.ClientSession,
    keyword: str,
    settings: Settings,
) -> dict:
    """Fetch keyword suggestions + competition index from Google KW Insight."""
    url = "https://google-keyword-insight1.p.rapidapi.com/keysuggest/"
    headers = {
        "x-rapidapi-key": settings.rapidapi_key,
        "x-rapidapi-host": settings.google_kw_host,
        "Accept-Encoding": "gzip, deflate",
    }
    params = {"keyword": keyword, "location": "us", "lang": "en"}
    try:
        async with session.get(url, headers=headers, params=params, timeout=aiohttp.ClientTimeout(total=15)) as resp:
            if resp.status == 200:
                data = await resp.json(content_type=None)
                return {"keyword": keyword, "status": 200, "data": data}
            else:
                text = await resp.text()
                logger.warning(f"Google KW {resp.status} for '{keyword}': {text[:200]}")
                return {"keyword": keyword, "status": resp.status, "data": None}
    except Exception as e:
        logger.error(f"Google KW error for '{keyword}': {e}")
        return {"keyword": keyword, "status": 0, "data": None, "error": str(e)}


def _parse_semrush_volume(raw: dict) -> int:
    """Extract volume from Semrush response. Returns 0 on failure."""
    data = raw.get("data")
    if not data:
        return 0
    if isinstance(data, list) and data:
        item = data[0]
        for key in ("searchVolume", "search_volume", "volume", "sv"):
            if key in item:
                try:
                    return int(item[key])
                except (ValueError, TypeError):
                    pass
    if isinstance(data, dict):
        for key in ("searchVolume", "search_volume", "volume", "sv"):
            if key in data:
                try:
                    return int(data[key])
                except (ValueError, TypeError):
                    pass
    return 0


def _parse_google_kd(raw: dict, target_keyword: str) -> tuple[int, float]:
    """
    Extract volume + competition_index from Google KW response.
    Returns (volume, competition_index). KD = competition_index * 100.
    """
    data = raw.get("data")
    if not data or not isinstance(data, list):
        return 0, 0.0
    # Find exact match first, then fall back to first result
    target_lower = target_keyword.lower()
    for item in data:
        kw = item.get("keyword", item.get("text", "")).lower()
        if kw == target_lower:
            vol = int(item.get("vol", item.get("volume", 0)) or 0)
            ci = float(item.get("competition_index", item.get("competition", 0)) or 0)
            return vol, ci
    # Fallback: first item
    item = data[0]
    vol = int(item.get("vol", item.get("volume", 0)) or 0)
    ci = float(item.get("competition_index", item.get("competition", 0)) or 0)
    return vol, ci


async def run(keywords: List[str], settings: Settings) -> List[KeywordResult]:
    """
    Main entry point for KeywordAgent.
    - Semrush: sequential with 1.2s delay (rate limit)
    - Google KW: concurrent via asyncio.gather
    Returns merged KeywordResult list with best available data.
    """
    results: List[KeywordResult] = []

    async with aiohttp.ClientSession() as session:
        # ── Tier 1a: Semrush sequential (rate limit constraint) ───────────────
        semrush_raw = {}
        for kw in keywords:
            r = await _fetch_semrush_volume(session, kw, settings)
            semrush_raw[kw] = r
            await asyncio.sleep(SEMRUSH_DELAY)

        # ── Tier 1b: Google KW concurrent ────────────────────────────────────
        google_tasks = [_fetch_google_kw(session, kw, settings) for kw in keywords]
        google_raw_list = await asyncio.gather(*google_tasks, return_exceptions=True)
        google_raw = {}
        for r in google_raw_list:
            if isinstance(r, Exception):
                logger.error(f"Google KW gather exception: {r}")
                continue
            google_raw[r["keyword"]] = r

    # ── Merge: prefer Google KW for KD, Semrush for volume ───────────────────
    data_quality_notes = []
    for kw in keywords:
        sr = semrush_raw.get(kw, {})
        gr = google_raw.get(kw, {})

        semrush_vol = _parse_semrush_volume(sr)
        google_vol, google_ci = _parse_google_kd(gr, kw)

        # Volume: prefer whichever is non-zero; prefer Google if both non-zero
        volume = google_vol if google_vol > 0 else semrush_vol

        # KD: Google competition_index * 100 is reliable; Semrush KD=0 is not
        kd = round(google_ci * 100, 1) if google_ci > 0 else 0.0
        if kd == 0.0 and volume > 0:
            data_quality_notes.append(
                f"KD=0 for '{kw}' — Semrush global-volume endpoint does not return KD. "
                "SCI will use KD=1 fallback to avoid division by zero."
            )

        source = "google_kw+semrush" if (google_vol > 0 and semrush_vol > 0) else (
            "google_kw" if google_vol > 0 else "semrush"
        )

        results.append(KeywordResult(
            keyword=kw,
            volume=volume,
            kd=kd,
            source=source,
            competition_index=google_ci,
        ))

    return results
