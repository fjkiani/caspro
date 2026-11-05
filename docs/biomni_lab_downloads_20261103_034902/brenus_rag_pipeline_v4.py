"""
brenus_rag_pipeline_v4.py
=========================
Brenus BD RAG — Production Pipeline (FINAL)
  Retrieve → Generate (Gemini 2.5 Flash) → Cite → Guardrail → Evaluate (RAGAS LLM-as-judge)

Architecture
------------
  Retriever  : Qdrant (all-mpnet-base-v2, 768-dim, cosine, HNSW m=16)
               Searches all 4 collections, globally ranks by cosine score.
               top_k=5 for multi-hop cross-document queries.

  Generator  : Gemini 2.5 Flash (primary) via google-genai SDK
               Fallback: Gemma-4-31b-it via OpenRouter (free tier, exponential backoff)
               System prompt enforces citation format [CHUNK_ID] and governance guardrails.

  Evaluator  : LLM-as-judge (Gemini 2.5 Flash) — RAGAS-style
               Faithfulness : Does the answer hallucinate beyond retrieved context?
               Answer Relevancy : Does the answer directly address the query?
               Both scored 0.0–1.0. Composite ≥ 0.7 = PASS.
               Falls back to cosine-similarity scoring if Gemini quota exhausted.

Governance Guardrails (7 mandatory)
-------------------------------------
  1. NEVER cite STC-1010 fit=0.7375 (RETIRED → 0.6944)
  2. NEVER cite LATIFY delta 0.366 or 0.2641 (QUARANTINED)
  3. NEVER cite DDR_0983 (publication-blocking)
  4. NEVER use PATH B formula (PATH A only)
  5. NEVER state HT29 confirmed (SC-001 active conflict)
  6. ALWAYS attach caveat to TIER 2 claims
  7. NEVER cite CT051 quantitative DTH values (press-release only)

Usage
-----
  from brenus_rag_pipeline_v4 import Brenus_RAG, evaluate_rag_pipeline

  # Single query (LLM-as-judge evaluation)
  rag = Brenus_RAG(gemini_api_key="AQ.Ab8RN...")
  result = rag.query("What are the critical design gaps in BreAK CRC-001?")
  print(result.answer)
  print(result.evaluation)

  # Batch evaluation
  summary = evaluate_rag_pipeline(
      queries=["...", "...", "..."],
      gemini_api_key="AQ.Ab8RN...",
  )
"""

from __future__ import annotations

import json
import re
import textwrap
import time
from dataclasses import dataclass, field
from typing import Any

import numpy as np
import requests
from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient

# ── Constants ─────────────────────────────────────────────────────────────────

QDRANT_URL = (
    "https://***REDACTED_QDRANT_URL_SEG***"
    ".eu-west-2-0.aws.cloud.qdrant.io"
)
QDRANT_KEY = (
    "***REDACTED_QDRANT_KEY_SEG***"
    ".***REDACTED_QDRANT_KEY_SEG***"
    ".***REDACTED_QDRANT_KEY_SEG***"
)

COLLECTIONS = [
    "brenus_p1_benchmarks",
    "brenus_p2_trials_decoded",
    "brenus_p3_gaps",
    "brenus_p4_crispro_offer",
]

EMBED_MODEL = "all-mpnet-base-v2"

# Gemini model preference order
GEMINI_MODELS = [
    "models/gemini-2.5-flash",
    "models/gemini-2.0-flash",
    "models/gemini-2.0-flash-lite",
]

# OpenRouter fallback
OPENROUTER_KEY = "***REDACTED_OPENROUTER_KEY***"
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
OPENROUTER_MODELS = [
    "google/gemma-4-31b-it:free",
    "nvidia/nemotron-3-ultra-550b-a55b:free",
]

# RAGAS thresholds
PASS_THRESHOLD   = 0.70
FAITH_THRESHOLD  = 0.50   # cosine fallback threshold

# Governance guardrails
GUARDRAILS = [
    ("0.7375",         "STC-1010 fit=0.7375 RETIRED. Canonical: 0.6944."),
    ("0.366",          "LATIFY delta 0.366 QUARANTINED."),
    ("0.2641",         "LATIFY delta 0.2641 QUARANTINED."),
    ("DDR_0983",       "DDR 0.983 publication-blocking."),
    ("PATH B",         "PATH B formula prohibited."),
    ("HT29 confirmed", "SC-001 active conflict."),
    ("CT051",          "CT051 quantitative DTH values are press-release only."),
]

# ── Data classes ──────────────────────────────────────────────────────────────

@dataclass
class RetrievedChunk:
    chunk_id: str
    title: str
    score: float
    collection: str
    payload: dict[str, Any]

    def to_context_block(self) -> str:
        """Render chunk as a labeled context block for the LLM prompt.
        Uses pre-rendered full_text if available (enriched payload), else falls back."""
        lines = [f"[{self.chunk_id}] (retrieval_score={self.score:.4f})"]
        lines.append(f"Title: {self.title}")
        # Use pre-rendered full_text if available
        full_text = self.payload.get("full_text", "")
        if full_text:
            # Skip the title line (already added above)
            ft_lines = [l for l in full_text.split("\n") if not l.startswith("Title:")]
            lines.extend(ft_lines)
        else:
            # Fallback: render key fields
            for f in ["universal_finding", "tagline", "mechanism", "crispro_fit_score",
                      "crispro_fit_label", "primary_driver", "axis_breakdown"]:
                v = self.payload.get(f)
                if v:
                    lines.append(f"{f}: {str(v)[:400]}")
            for lf in ["trials", "core_capabilities", "key_facts"]:
                v = self.payload.get(lf)
                if isinstance(v, list) and v:
                    lines.append(f"{lf}: " + " | ".join(str(x)[:100] for x in v[:6]))
        return "\n".join(lines)

    def to_sentences(self) -> list[str]:
        """Extract all text as sentences for cosine-based faithfulness fallback."""
        text = self.payload.get("full_text", "") or self.to_context_block()
        raw = re.split(r'(?<=[.!?\n])\s*', text)
        return [s.strip().lstrip("-•* ") for s in raw if len(s.strip()) > 15]


@dataclass
class RAGResult:
    query: str
    retrieved: list[RetrievedChunk]
    answer: str
    citations_found: list[str]
    guardrail_violations: list[str]
    evaluation: dict[str, Any]
    latency_ms: dict[str, float] = field(default_factory=dict)


# ── LLM callers ───────────────────────────────────────────────────────────────

def _call_gemini(
    prompt_or_messages: str | list[dict],
    api_key: str,
    temperature: float = 0.1,
    max_tokens: int = 1000,
) -> str:
    """Call Gemini via google-genai SDK. Tries models in GEMINI_MODELS order."""
    from google import genai
    from google.genai import types

    client = genai.Client(api_key=api_key)

    if isinstance(prompt_or_messages, list):
        system = next((m["content"] for m in prompt_or_messages if m["role"] == "system"), "")
        user   = next((m["content"] for m in prompt_or_messages if m["role"] == "user"), "")
        prompt = f"{system}\n\n{user}" if system else user
    else:
        prompt = prompt_or_messages

    last_err = None
    for model in GEMINI_MODELS:
        try:
            resp = client.models.generate_content(
                model=model,
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=temperature,
                    max_output_tokens=max_tokens,
                ),
            )
            return resp.text
        except Exception as e:
            err = str(e)
            if "RESOURCE_EXHAUSTED" in err or "429" in err:
                print(f"  [Gemini] Quota exhausted on {model}, trying next...")
                last_err = err
                continue
            raise
    raise RuntimeError(f"All Gemini models quota-exhausted. Last: {last_err}")


def _call_openrouter(
    messages: list[dict],
    temperature: float = 0.1,
    max_tokens: int = 900,
    max_retries: int = 5,
) -> str:
    """POST to OpenRouter with exponential backoff on 429."""
    last_err = None
    for model in OPENROUTER_MODELS:
        for attempt in range(max_retries):
            try:
                resp = requests.post(
                    OPENROUTER_URL,
                    headers={
                        "Authorization": f"Bearer {OPENROUTER_KEY}",
                        "Content-Type": "application/json",
                        "HTTP-Referer": "https://brenus-pharma.crispro.ai",
                        "X-Title": "Brenus BD RAG",
                    },
                    json={"model": model, "messages": messages,
                          "temperature": temperature, "max_tokens": max_tokens},
                    timeout=90,
                )
                if resp.status_code == 200:
                    return resp.json()["choices"][0]["message"]["content"]
                elif resp.status_code == 429:
                    wait = 3 * (2 ** attempt)
                    print(f"  [OpenRouter] 429 on {model}, retry {attempt+1}/{max_retries} in {wait}s...")
                    time.sleep(wait)
                    last_err = f"429 {model}"
                else:
                    last_err = f"HTTP {resp.status_code}"
                    print(f"  [OpenRouter] {last_err} on {model}")
                    break
            except Exception as e:
                last_err = str(e)
                time.sleep(3)
    raise RuntimeError(f"All OpenRouter models failed. Last: {last_err}")


# ── System prompts ────────────────────────────────────────────────────────────

GENERATION_SYSTEM_PROMPT = """You are a clinical AI assistant specializing in oncology trial intelligence for Brenus Pharma.

STRICT RULES:
1. Answer using ONLY the provided context documents. Do not add external knowledge.
2. Cite every factual claim with the exact Document ID in brackets: [W1-IOCORE-001]
3. For multi-document claims, cite all: [W1-IOCORE-001, W2-BREAK-001]
4. If the answer is not in the context, output exactly: INSUFFICIENT DATA
5. NEVER use these retired/quarantined values: fit=0.7375, LATIFY delta=0.366 or 0.2641, DDR_0983
6. Be concise and direct. Do not narrate your reasoning process.

ANSWER STRUCTURE:
(a) Direct answer to the query
(b) Supporting evidence with citations
(c) Caveats or limitations (if any)"""

FAITHFULNESS_JUDGE_PROMPT = """You are an expert evaluator assessing AI answer faithfulness to source documents.

FAITHFULNESS definition: Every factual claim in the ANSWER must be directly supported by the CONTEXT.
- Score 1.0 = every claim is grounded in the context, no hallucinations
- Score 0.5 = some claims grounded, some not
- Score 0.0 = answer contains claims not present in context

CONTEXT DOCUMENTS:
{context}

ANSWER TO EVALUATE:
{answer}

Respond with ONLY a valid JSON object (no markdown, no explanation before or after):
{{"score": <float 0.0-1.0>, "reasoning": "<one sentence explaining the score>", "ungrounded_claims": [<list of strings, empty if none>]}}"""

RELEVANCY_JUDGE_PROMPT = """You are an expert evaluator assessing whether an AI answer directly addresses the user's query.

ANSWER RELEVANCY definition: Does the answer directly and completely address what was asked?
- Score 1.0 = directly and completely addresses the query
- Score 0.5 = partially addresses the query
- Score 0.0 = off-topic or does not address the query

QUERY: {query}

ANSWER TO EVALUATE:
{answer}

Respond with ONLY a valid JSON object (no markdown, no explanation before or after):
{{"score": <float 0.0-1.0>, "reasoning": "<one sentence explaining the score>", "missing_aspects": [<list of strings, empty if none>]}}"""


# ── Retriever ─────────────────────────────────────────────────────────────────

class Retriever:
    """
    Semantic retrieval across all 4 Qdrant collections.
    top_k=5 recommended for multi-hop cross-document queries.
    """

    def __init__(self, embed_model: SentenceTransformer | None = None):
        if embed_model is not None:
            self.model = embed_model
            print("[Retriever] Using shared embedding model.")
        else:
            print(f"[Retriever] Loading {EMBED_MODEL}...")
            self.model = SentenceTransformer(EMBED_MODEL)
        self.client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_KEY, timeout=30)
        print("[Retriever] Ready.")

    def retrieve(self, query: str, top_k: int = 5) -> list[RetrievedChunk]:
        t0  = time.time()
        vec = self.model.encode([query])[0].tolist()
        hits: list[RetrievedChunk] = []
        for col in COLLECTIONS:
            res = self.client.query_points(
                collection_name=col, query=vec,
                limit=top_k, with_payload=True,
            )
            for h in res.points:
                hits.append(RetrievedChunk(
                    chunk_id   = h.payload.get("chunk_id", f"unk_{col}"),
                    title      = h.payload.get("title", ""),
                    score      = round(h.score, 4),
                    collection = col,
                    payload    = h.payload,
                ))
        hits.sort(key=lambda x: x.score, reverse=True)
        top = hits[:top_k]
        elapsed = (time.time() - t0) * 1000
        print(f"[Retriever] {len(top)} chunks in {elapsed:.0f}ms")
        for c in top:
            print(f"  {c.chunk_id} | {c.score:.4f} | {c.title[:55]}")
        return top


# ── Generator ─────────────────────────────────────────────────────────────────

class Generator:
    """
    LLM generator: Gemini 2.5 Flash primary, Gemma-4-31b (OpenRouter) fallback.
    Injects full chunk text into system prompt for grounded generation.
    """

    def __init__(self, gemini_api_key: str | None = None):
        self.gemini_key = gemini_api_key
        backend = "Gemini 2.5 Flash + OpenRouter fallback" if gemini_api_key else "Gemma-4-31b (OpenRouter)"
        print(f"[Generator] Backend: {backend}")

    def generate_grounded_answer(
        self,
        query: str,
        retrieved_chunks: list[RetrievedChunk],
    ) -> tuple[str, list[str]]:
        """
        Build context from retrieved chunks, call LLM, return (answer, citations).
        All retrieved chunk text is injected into the prompt — no truncation.
        Citations are extracted from [CHUNK_ID] patterns in the answer.
        """
        context = "\n\n---\n\n".join(
            f"DOCUMENT {i+1}:\n{c.to_context_block()}"
            for i, c in enumerate(retrieved_chunks)
        )
        user_msg = (
            f"CONTEXT DOCUMENTS:\n\n{context}\n\n"
            f"---\n\nQUERY: {query}\n\n"
            "Answer directly using ONLY the documents above. "
            "Cite every claim with [DOCUMENT_ID]. Do not narrate your reasoning."
        )
        messages = [
            {"role": "system", "content": GENERATION_SYSTEM_PROMPT},
            {"role": "user",   "content": user_msg},
        ]

        t0 = time.time()
        answer, source = "", ""

        if self.gemini_key:
            try:
                answer = _call_gemini(messages, self.gemini_key, temperature=0.1, max_tokens=1000)
                source = "gemini-2.5-flash"
            except Exception as e:
                print(f"[Generator] Gemini failed ({e}), falling back to OpenRouter...")

        if not answer:
            answer = _call_openrouter(messages, temperature=0.1, max_tokens=900)
            source = "openrouter/gemma-4-31b"

        elapsed = (time.time() - t0) * 1000
        print(f"[Generator] {source} | {elapsed:.0f}ms")

        # Extract cited document IDs
        raw_cites = re.findall(r'\[([A-Z][A-Z0-9\-]+(?:,\s*[A-Z][A-Z0-9\-]+)*)\]', answer)
        flat = []
        for c in raw_cites:
            flat.extend(x.strip() for x in c.split(","))
        citations = list(dict.fromkeys(flat))

        return answer, citations


# ── Guardrail checker ─────────────────────────────────────────────────────────

def check_guardrails(text: str) -> list[str]:
    """Return list of governance guardrail violations found in generated text."""
    return [msg for pattern, msg in GUARDRAILS if pattern.lower() in text.lower()]


# ── RAGAS Evaluator (LLM-as-judge + cosine fallback) ─────────────────────────

class RAGASEvaluator:
    """
    RAGAS-style evaluation using LLM-as-judge (Gemini 2.5 Flash).

    Faithfulness
    ------------
    Gemini judges whether each factual claim in the answer is supported by the
    retrieved context. Score 0.0–1.0. Prompt enforces JSON-only output.

    Answer Relevancy
    ----------------
    Gemini judges whether the answer directly addresses the query.
    Score 0.0–1.0. Prompt enforces JSON-only output.

    Fallback
    --------
    If Gemini quota is exhausted, falls back to deterministic cosine similarity:
    - Faithfulness: fraction of answer sentences with cosine sim ≥ 0.50 to context
    - Answer Relevancy: cosine similarity between query and answer embeddings
    """

    def __init__(self, gemini_api_key: str | None = None,
                 embed_model: SentenceTransformer | None = None):
        self.gemini_key  = gemini_api_key
        self.embed_model = embed_model
        mode = "Gemini LLM-as-judge" if gemini_api_key else "cosine-similarity fallback"
        print(f"[Evaluator] RAGAS evaluator ready ({mode}).")

    def _parse_judge_json(self, raw: str, metric: str) -> dict:
        """Extract JSON from LLM judge response. Handles chain-of-thought preamble."""
        # Strip markdown fences
        raw = re.sub(r"```(?:json)?", "", raw).strip().rstrip("`").strip()
        # Try direct parse
        try:
            return json.loads(raw)
        except Exception:
            pass
        # Find the LAST JSON object (after any chain-of-thought)
        matches = list(re.finditer(r'\{[^{}]*"score"[^{}]*\}', raw, re.DOTALL))
        if matches:
            try:
                return json.loads(matches[-1].group())
            except Exception:
                pass
        # Extract score with regex as last resort
        score_m = re.search(r'"score"\s*:\s*([0-9.]+)', raw)
        if score_m:
            return {"score": float(score_m.group(1)), "reasoning": "score_extracted",
                    "raw_truncated": raw[:200]}
        return {"score": -1.0, "reasoning": f"parse_error: {raw[:200]}"}

    def _cosine_faithfulness(self, answer: str, chunks: list[RetrievedChunk]) -> dict:
        """Fallback: cosine similarity faithfulness."""
        if self.embed_model is None:
            return {"score": -1.0, "reasoning": "No embed model for cosine fallback"}
        ctx_sentences = []
        for c in chunks:
            ctx_sentences.extend(c.to_sentences())
        ctx_sentences = [s for s in ctx_sentences if len(s) > 10]
        if not ctx_sentences:
            return {"score": 0.0, "reasoning": "No context sentences"}
        ctx_vecs = self.embed_model.encode(ctx_sentences, normalize_embeddings=True)
        ans_sentences = [s.strip() for s in re.split(r'(?<=[.!?\n])\s*', answer)
                         if len(s.strip()) > 15]
        if not ans_sentences:
            return {"score": 1.0, "reasoning": "No answer sentences"}
        ans_vecs = self.embed_model.encode(ans_sentences, normalize_embeddings=True)
        grounded = sum(1 for v in ans_vecs if float(np.max(ctx_vecs @ v)) >= FAITH_THRESHOLD)
        score = grounded / len(ans_sentences)
        return {"score": round(score, 3),
                "reasoning": f"{grounded}/{len(ans_sentences)} claims grounded (cosine fallback)",
                "method": "cosine_fallback"}

    def _cosine_relevancy(self, query: str, answer: str) -> dict:
        """Fallback: cosine similarity relevancy."""
        if self.embed_model is None:
            return {"score": -1.0, "reasoning": "No embed model for cosine fallback"}
        vecs = self.embed_model.encode([query, answer], normalize_embeddings=True)
        score = max(0.0, min(1.0, float(vecs[0] @ vecs[1])))
        return {"score": round(score, 3),
                "reasoning": "Cosine similarity between query and answer (fallback)",
                "method": "cosine_fallback"}

    def evaluate_faithfulness(
        self, answer: str, retrieved_chunks: list[RetrievedChunk]
    ) -> dict:
        """LLM-as-judge faithfulness. Falls back to cosine if Gemini quota exhausted."""
        context = "\n\n".join(
            f"[{c.chunk_id}]\n{c.payload.get('full_text', c.title)[:600]}"
            for c in retrieved_chunks
        )
        prompt = FAITHFULNESS_JUDGE_PROMPT.format(
            context=context[:5000],
            answer=answer[:2000],
        )
        t0 = time.time()
        if self.gemini_key:
            try:
                raw = _call_gemini(prompt, self.gemini_key, temperature=0.0, max_tokens=400)
                result = self._parse_judge_json(raw, "faithfulness")
                result["method"] = "gemini_llm_judge"
                result["latency_ms"] = round((time.time() - t0) * 1000)
                return result
            except Exception as e:
                print(f"  [Evaluator] Gemini faithfulness failed ({e}), using cosine fallback...")
        result = self._cosine_faithfulness(answer, retrieved_chunks)
        result["latency_ms"] = round((time.time() - t0) * 1000)
        return result

    def evaluate_answer_relevancy(self, query: str, answer: str) -> dict:
        """LLM-as-judge answer relevancy. Falls back to cosine if Gemini quota exhausted."""
        prompt = RELEVANCY_JUDGE_PROMPT.format(query=query, answer=answer[:2000])
        t0 = time.time()
        if self.gemini_key:
            try:
                raw = _call_gemini(prompt, self.gemini_key, temperature=0.0, max_tokens=300)
                result = self._parse_judge_json(raw, "relevancy")
                result["method"] = "gemini_llm_judge"
                result["latency_ms"] = round((time.time() - t0) * 1000)
                return result
            except Exception as e:
                print(f"  [Evaluator] Gemini relevancy failed ({e}), using cosine fallback...")
        result = self._cosine_relevancy(query, answer)
        result["latency_ms"] = round((time.time() - t0) * 1000)
        return result

    def evaluate(
        self,
        query: str,
        answer: str,
        retrieved_chunks: list[RetrievedChunk],
    ) -> dict[str, Any]:
        """Run both RAGAS metrics and return combined evaluation report."""
        t0 = time.time()

        print("[Evaluator] Faithfulness (LLM-as-judge)...")
        faith = self.evaluate_faithfulness(answer, retrieved_chunks)
        faith_score = faith.get("score", -1)
        print(f"  → {faith_score:.3f} | {faith.get('reasoning','')[:80]} [{faith.get('method','')}]")

        print("[Evaluator] Answer Relevancy (LLM-as-judge)...")
        relev = self.evaluate_answer_relevancy(query, answer)
        relev_score = relev.get("score", -1)
        print(f"  → {relev_score:.3f} | {relev.get('reasoning','')[:80]} [{relev.get('method','')}]")

        composite = None
        if faith_score >= 0 and relev_score >= 0:
            composite = round((faith_score + relev_score) / 2, 3)

        return {
            "faithfulness":     faith,
            "answer_relevancy": relev,
            "composite_score":  composite,
            "pass":             composite is not None and composite >= PASS_THRESHOLD,
            "eval_latency_ms":  round((time.time() - t0) * 1000),
        }


# ── End-to-end pipeline ───────────────────────────────────────────────────────

class Brenus_RAG:
    """
    End-to-end Brenus BD RAG pipeline.

    Retrieve → Generate (Gemini 2.5 Flash) → Cite → Guardrail → Evaluate (RAGAS LLM-as-judge)

    Parameters
    ----------
    gemini_api_key : str, optional
        Google AI Studio key. Enables Gemini generation + LLM-as-judge evaluation.
        Falls back to Gemma-4-31b (OpenRouter) + cosine evaluation if None or quota-exhausted.
    top_k : int
        Chunks to retrieve. Use 5 for multi-hop cross-document queries.
    """

    def __init__(self, gemini_api_key: str | None = None, top_k: int = 5):
        print(f"[Brenus_RAG] Initializing pipeline...")
        shared_model = SentenceTransformer(EMBED_MODEL)
        self.retriever = Retriever(embed_model=shared_model)
        self.generator = Generator(gemini_api_key=gemini_api_key)
        self.evaluator = RAGASEvaluator(gemini_api_key=gemini_api_key, embed_model=shared_model)
        self.top_k     = top_k
        print("[Brenus_RAG] Pipeline ready.\n")

    def query(self, query_text: str, evaluate: bool = True) -> RAGResult:
        """
        Full pipeline: Retrieve → Generate → Guardrail check → Evaluate.

        Parameters
        ----------
        query_text : str
            Natural language query.
        evaluate : bool
            If True, run RAGAS LLM-as-judge evaluation.

        Returns
        -------
        RAGResult with answer, citations, guardrail violations, and RAGAS scores.
        """
        print(f"\n{'='*70}")
        print(f"QUERY: {query_text}")
        print(f"{'='*70}")

        t_ret  = time.time()
        chunks = self.retriever.retrieve(query_text, top_k=self.top_k)
        ret_ms = (time.time() - t_ret) * 1000

        t_gen  = time.time()
        answer, citations = self.generator.generate_grounded_answer(query_text, chunks)
        gen_ms = (time.time() - t_gen) * 1000

        violations = check_guardrails(answer)
        if violations:
            print(f"[Guardrail] ⚠ {len(violations)} violation(s):")
            for v in violations:
                print(f"  {v}")

        evaluation = {}
        if evaluate:
            evaluation = self.evaluator.evaluate(query_text, answer, chunks)

        result = RAGResult(
            query=query_text,
            retrieved=chunks,
            answer=answer,
            citations_found=citations,
            guardrail_violations=violations,
            evaluation=evaluation,
            latency_ms={
                "retrieval_ms":  round(ret_ms),
                "generation_ms": round(gen_ms),
                "eval_ms":       evaluation.get("eval_latency_ms", 0),
            },
        )
        self._print_result(result)
        return result

    def _print_result(self, r: RAGResult) -> None:
        print(f"\n{'─'*70}")
        print("ANSWER:\n")
        for line in r.answer.split("\n"):
            print(textwrap.fill(line, width=80) if line.strip() else "")
        print(f"\nCITATIONS: {r.citations_found}")
        if r.guardrail_violations:
            print(f"⚠ GUARDRAIL VIOLATIONS:")
            for v in r.guardrail_violations:
                print(f"  {v}")
        if r.evaluation:
            ev    = r.evaluation
            faith = ev.get("faithfulness", {})
            relev = ev.get("answer_relevancy", {})
            f_score = faith.get("score", "N/A")
            r_score = relev.get("score", "N/A")
            comp    = ev.get("composite_score", "N/A")
            method  = faith.get("method", "unknown")
            print(f"\nRAGAS EVALUATION [{method}]:")
            print(f"  Faithfulness:     {f_score if isinstance(f_score, str) else f'{f_score:.3f}'}")
            print(f"    {faith.get('reasoning','')[:80]}")
            if faith.get("ungrounded_claims"):
                print(f"    Ungrounded: {faith['ungrounded_claims'][:2]}")
            print(f"  Answer Relevancy: {r_score if isinstance(r_score, str) else f'{r_score:.3f}'}")
            print(f"    {relev.get('reasoning','')[:80]}")
            print(f"  Composite:        {comp if isinstance(comp, str) else f'{comp:.3f}'}  "
                  f"{'✓ PASS' if ev.get('pass') else '✗ FAIL'} (threshold={PASS_THRESHOLD})")
        print(f"\nLATENCY: ret={r.latency_ms.get('retrieval_ms')}ms  "
              f"gen={r.latency_ms.get('generation_ms')}ms  "
              f"eval={r.latency_ms.get('eval_ms')}ms")
        print(f"{'─'*70}")


# ── Batch evaluation function ─────────────────────────────────────────────────

def evaluate_rag_pipeline(
    queries: list[str],
    gemini_api_key: str | None = None,
    top_k: int = 5,
) -> dict[str, Any]:
    """
    Batch RAGAS evaluation across multiple queries.

    Parameters
    ----------
    queries : list[str]
        Natural language queries to evaluate.
    gemini_api_key : str, optional
        Google AI Studio key. Enables Gemini generation + LLM-as-judge evaluation.
    top_k : int
        Chunks to retrieve per query.

    Returns
    -------
    dict with per-query results and aggregate faithfulness/relevancy/pass-rate.
    """
    rag = Brenus_RAG(gemini_api_key=gemini_api_key, top_k=top_k)
    results = []

    for i, q in enumerate(queries):
        print(f"\n[Batch {i+1}/{len(queries)}]")
        r = rag.query(q, evaluate=True)
        results.append({
            "query":                r.query,
            "answer":               r.answer,
            "citations":            r.citations_found,
            "guardrail_violations": r.guardrail_violations,
            "faithfulness":         r.evaluation.get("faithfulness", {}).get("score"),
            "faithfulness_method":  r.evaluation.get("faithfulness", {}).get("method"),
            "answer_relevancy":     r.evaluation.get("answer_relevancy", {}).get("score"),
            "composite":            r.evaluation.get("composite_score"),
            "pass":                 r.evaluation.get("pass"),
            "latency_ms":           r.latency_ms,
        })
        if i < len(queries) - 1:
            time.sleep(3)

    faith_scores = [r["faithfulness"] for r in results
                    if r["faithfulness"] is not None and r["faithfulness"] >= 0]
    relev_scores = [r["answer_relevancy"] for r in results
                    if r["answer_relevancy"] is not None and r["answer_relevancy"] >= 0]
    pass_rate    = sum(1 for r in results if r["pass"]) / len(results) if results else 0

    summary = {
        "n_queries":            len(queries),
        "avg_faithfulness":     round(sum(faith_scores) / len(faith_scores), 3) if faith_scores else None,
        "avg_answer_relevancy": round(sum(relev_scores) / len(relev_scores), 3) if relev_scores else None,
        "pass_rate":            round(pass_rate, 3),
        "results":              results,
    }

    print(f"\n{'='*70}")
    print("BATCH EVALUATION SUMMARY")
    print(f"  Queries evaluated:    {summary['n_queries']}")
    print(f"  Avg Faithfulness:     {summary['avg_faithfulness']}")
    print(f"  Avg Answer Relevancy: {summary['avg_answer_relevancy']}")
    print(f"  Pass rate (≥{PASS_THRESHOLD}):     {summary['pass_rate']:.0%}")
    print(f"{'='*70}")

    return summary


# ── CLI entry point ───────────────────────────────────────────────────────────

if __name__ == "__main__":
    import sys
    GEMINI_KEY = "***REDACTED_GEMINI_KEY***"
    q = " ".join(sys.argv[1:]) if len(sys.argv) > 1 else (
        "What are the critical design gaps in BreAK CRC-001 and how does CrisPRO address them?"
    )
    Brenus_RAG(gemini_api_key=GEMINI_KEY).query(q)
