"""
brenus_rag_pipeline_v5.py
=========================
Brenus BD RAG — Production Pipeline (OpenRouter Edition)
  Retrieve → Generate → Cite → Guardrail → Evaluate (RAGAS LLM-as-judge)

Generator  : google/gemma-4-31b-it:free (primary, free)
             meta-llama/llama-3.1-8b-instruct (fallback, $0.02/1M)
Judge      : meta-llama/llama-3.1-8b-instruct (clean JSON, $0.02/1M)
             openai/gpt-4o-mini (fallback judge, $0.15/1M)
Retriever  : Qdrant, all-mpnet-base-v2, 768-dim, 4 collections, 22 chunks
"""
from __future__ import annotations
import json, os, re, textwrap, time
from dataclasses import dataclass, field
from typing import Any
import numpy as np
import requests
from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient

# ── Credentials ───────────────────────────────────────────────────────────────
QDRANT_URL = os.environ.get("QDRANT_URL", "https://REDACTED.qdrant.io")
QDRANT_KEY = os.environ.get("QDRANT_API_KEY", "REDACTED_QDRANT_KEY")

# Rotate through 3 keys to distribute load
OR_KEYS = [
    os.environ["OPENROUTER_API_KEY"],
]
OR_URL = "https://openrouter.ai/api/v1/chat/completions"

# Model routing
GEN_MODELS   = ["google/gemma-4-31b-it:free", "meta-llama/llama-3.1-8b-instruct"]
JUDGE_MODELS = ["meta-llama/llama-3.1-8b-instruct", "openai/gpt-4o-mini"]

COLLECTIONS  = ["brenus_p1_benchmarks","brenus_p2_trials_decoded","brenus_p3_gaps","brenus_p4_crispro_offer"]
EMBED_MODEL  = "all-mpnet-base-v2"
PASS_THRESHOLD = 0.70

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
    chunk_id: str; title: str; score: float; collection: str; payload: dict[str,Any]

    def to_context_block(self) -> str:
        lines = [f"[{self.chunk_id}] (score={self.score:.4f})", f"Title: {self.title}"]
        ft = self.payload.get("full_text","")
        if ft:
            lines.extend(l for l in ft.split("\n") if not l.startswith("Title:"))
        else:
            for f in ["universal_finding","tagline","mechanism","crispro_fit_score","crispro_fit_label","primary_driver"]:
                v = self.payload.get(f)
                if v: lines.append(f"{f}: {str(v)[:350]}")
            for lf in ["trials","core_capabilities","key_facts"]:
                v = self.payload.get(lf)
                if isinstance(v,list) and v:
                    lines.append(f"{lf}: "+" | ".join(str(x)[:100] for x in v[:6]))
        return "\n".join(lines)

    def to_sentences(self) -> list[str]:
        text = self.payload.get("full_text","") or self.to_context_block()
        return [s.strip().lstrip("-•* ") for s in re.split(r'(?<=[.!?\n])\s*',text) if len(s.strip())>15]

@dataclass
class RAGResult:
    query: str; retrieved: list[RetrievedChunk]; answer: str
    citations_found: list[str]; guardrail_violations: list[str]
    evaluation: dict[str,Any]; latency_ms: dict[str,float] = field(default_factory=dict)

# ── OpenRouter caller ─────────────────────────────────────────────────────────
_key_idx = 0

def _call_or(messages:list[dict], models:list[str], temperature:float=0.1,
             max_tokens:int=900, max_retries:int=4) -> tuple[str,str]:
    """Call OpenRouter, rotating keys on 429. Returns (content, model_used)."""
    global _key_idx
    last_err = None
    for model in models:
        for attempt in range(max_retries):
            key = OR_KEYS[_key_idx % len(OR_KEYS)]
            try:
                resp = requests.post(OR_URL,
                    headers={"Authorization":f"Bearer {key}","Content-Type":"application/json",
                             "HTTP-Referer":"https://brenus-pharma.crispro.ai","X-Title":"Brenus BD RAG"},
                    json={"model":model,"messages":messages,"temperature":temperature,"max_tokens":max_tokens},
                    timeout=90)
                if resp.status_code == 200:
                    return resp.json()["choices"][0]["message"]["content"], model
                elif resp.status_code == 429:
                    _key_idx += 1  # rotate to next key
                    wait = 2**(attempt+1)
                    print(f"  [OR] 429 on {model} key={_key_idx%len(OR_KEYS)}, retry in {wait}s...")
                    time.sleep(wait)
                    last_err = f"429 {model}"
                else:
                    last_err = f"HTTP {resp.status_code}: {resp.text[:120]}"
                    print(f"  [OR] {last_err}")
                    break
            except Exception as e:
                last_err = str(e); time.sleep(2)
    raise RuntimeError(f"All models failed. Last: {last_err}")

# ── Prompts ───────────────────────────────────────────────────────────────────
GEN_SYS = """You are a clinical AI assistant for Brenus Pharma oncology trial intelligence.

RULES:
1. Answer using ONLY the provided context documents.
2. Cite every factual claim: [W1-IOCORE-001]
3. Multi-document claims: [W1-IOCORE-001, W2-BREAK-001]
4. If answer not in context: output exactly INSUFFICIENT DATA
5. NEVER use: fit=0.7375, LATIFY delta=0.366/0.2641, DDR_0983
6. Output the answer directly. Do NOT narrate your reasoning process.

FORMAT: (a) Direct answer  (b) Evidence with citations  (c) Caveats"""

FAITH_PROMPT = """Evaluate faithfulness of an AI answer against source documents.
Score 1.0 = all claims grounded. Score 0.0 = hallucinated. Score 0.5 = mixed.

CONTEXT:
{context}

ANSWER:
{answer}

Output ONLY this JSON (no other text, no markdown):
{{"score": <0.0-1.0>, "reasoning": "<one sentence>", "ungrounded_claims": [<strings>]}}"""

RELEV_PROMPT = """Evaluate whether an AI answer addresses the user query.
Score 1.0 = fully addresses. Score 0.5 = partially. Score 0.0 = off-topic.

QUERY: {query}
ANSWER: {answer}

Output ONLY this JSON (no other text, no markdown):
{{"score": <0.0-1.0>, "reasoning": "<one sentence>", "missing_aspects": [<strings>]}}"""

# ── Retriever ─────────────────────────────────────────────────────────────────
class Retriever:
    def __init__(self, embed_model=None):
        self.model  = embed_model or SentenceTransformer(EMBED_MODEL)
        self.client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_KEY, timeout=30)
        print("[Retriever] Ready.")

    def retrieve(self, query:str, top_k:int=5) -> list[RetrievedChunk]:
        t0  = time.time()
        vec = self.model.encode([query])[0].tolist()
        hits = []
        for col in COLLECTIONS:
            res = self.client.query_points(collection_name=col, query=vec, limit=top_k, with_payload=True)
            for h in res.points:
                hits.append(RetrievedChunk(
                    chunk_id=h.payload.get("chunk_id",f"unk_{col}"), title=h.payload.get("title",""),
                    score=round(h.score,4), collection=col, payload=h.payload))
        hits.sort(key=lambda x:x.score, reverse=True)
        top = hits[:top_k]
        print(f"[Retriever] {len(top)} chunks in {(time.time()-t0)*1000:.0f}ms")
        for c in top: print(f"  {c.chunk_id} | {c.score:.4f} | {c.title[:55]}")
        return top

# ── Generator ─────────────────────────────────────────────────────────────────
class Generator:
    def generate_grounded_answer(self, query:str, chunks:list[RetrievedChunk]) -> tuple[str,list[str]]:
        context = "\n\n---\n\n".join(f"DOCUMENT {i+1}:\n{c.to_context_block()}" for i,c in enumerate(chunks))
        user_msg = (f"CONTEXT DOCUMENTS:\n\n{context}\n\n---\n\nQUERY: {query}\n\n"
                    "Answer directly using ONLY the documents above. Cite every claim with [DOCUMENT_ID]. "
                    "Do NOT narrate your reasoning. Output the answer immediately.")
        messages = [{"role":"system","content":GEN_SYS},{"role":"user","content":user_msg}]
        t0 = time.time()
        answer, model_used = _call_or(messages, GEN_MODELS, temperature=0.1, max_tokens=1000)
        print(f"[Generator] {model_used} | {(time.time()-t0)*1000:.0f}ms")
        raw_cites = re.findall(r'\[([A-Z][A-Z0-9\-]+(?:,\s*[A-Z][A-Z0-9\-]+)*)\]', answer)
        flat = []
        for c in raw_cites: flat.extend(x.strip() for x in c.split(","))
        return answer, list(dict.fromkeys(flat))

# ── Guardrail checker ─────────────────────────────────────────────────────────
def check_guardrails(text:str) -> list[str]:
    return [msg for pattern,msg in GUARDRAILS if pattern.lower() in text.lower()]

# ── RAGAS Evaluator (LLM-as-judge) ───────────────────────────────────────────
class RAGASEvaluator:
    def __init__(self, embed_model=None):
        self.embed_model = embed_model
        print("[Evaluator] RAGAS LLM-as-judge (llama-3.1-8b) ready.")

    def _parse(self, raw:str) -> dict:
        raw = re.sub(r"```(?:json)?","",raw).strip().rstrip("`").strip()
        try: return json.loads(raw)
        except Exception: pass
        # Find last JSON object (handles chain-of-thought preamble)
        matches = list(re.finditer(r'\{[^{}]*"score"[^{}]*\}', raw, re.DOTALL))
        if matches:
            try: return json.loads(matches[-1].group())
            except Exception: pass
        # Score extraction fallback
        m = re.search(r'"score"\s*:\s*([0-9.]+)', raw)
        if m: return {"score":float(m.group(1)),"reasoning":"extracted","raw":raw[:150]}
        return {"score":-1.0,"reasoning":f"parse_error: {raw[:150]}"}

    def evaluate_faithfulness(self, answer:str, chunks:list[RetrievedChunk]) -> dict:
        context = "\n\n".join(f"[{c.chunk_id}]\n{c.payload.get('full_text',c.title)[:500]}" for c in chunks)
        prompt  = FAITH_PROMPT.format(context=context[:4500], answer=answer[:1800])
        t0 = time.time()
        raw, model_used = _call_or([{"role":"user","content":prompt}], JUDGE_MODELS, temperature=0.0, max_tokens=250)
        result = self._parse(raw)
        result["method"] = f"llm_judge/{model_used}"; result["latency_ms"] = round((time.time()-t0)*1000)
        return result

    def evaluate_answer_relevancy(self, query:str, answer:str) -> dict:
        prompt = RELEV_PROMPT.format(query=query, answer=answer[:1800])
        t0 = time.time()
        raw, model_used = _call_or([{"role":"user","content":prompt}], JUDGE_MODELS, temperature=0.0, max_tokens=200)
        result = self._parse(raw)
        result["method"] = f"llm_judge/{model_used}"; result["latency_ms"] = round((time.time()-t0)*1000)
        return result

    def evaluate(self, query:str, answer:str, chunks:list[RetrievedChunk]) -> dict:
        t0 = time.time()
        print("[Evaluator] Faithfulness (LLM-as-judge)...")
        faith = self.evaluate_faithfulness(answer, chunks)
        print(f"  → {faith.get('score','?')} | {faith.get('reasoning','')[:80]} [{faith.get('method','')}]")
        print("[Evaluator] Answer Relevancy (LLM-as-judge)...")
        relev = self.evaluate_answer_relevancy(query, answer)
        print(f"  → {relev.get('score','?')} | {relev.get('reasoning','')[:80]} [{relev.get('method','')}]")
        fs, rs = faith.get("score",-1), relev.get("score",-1)
        composite = round((fs+rs)/2,3) if fs>=0 and rs>=0 else None
        return {"faithfulness":faith,"answer_relevancy":relev,"composite_score":composite,
                "pass": composite is not None and composite>=PASS_THRESHOLD,
                "eval_latency_ms":round((time.time()-t0)*1000)}

# ── End-to-end pipeline ───────────────────────────────────────────────────────
class Brenus_RAG:
    """
    Brenus BD RAG — full pipeline.
    Retrieve → Generate (Gemma-4-31b free) → Cite → Guardrail → Evaluate (Llama-3.1-8b judge)
    """
    def __init__(self, top_k:int=5):
        print("[Brenus_RAG] Initializing...")
        shared = SentenceTransformer(EMBED_MODEL)
        self.retriever = Retriever(embed_model=shared)
        self.generator = Generator()
        self.evaluator = RAGASEvaluator(embed_model=shared)
        self.top_k = top_k
        print("[Brenus_RAG] Ready.\n")

    def query(self, query_text:str, evaluate:bool=True) -> RAGResult:
        print(f"\n{'='*70}\nQUERY: {query_text}\n{'='*70}")
        t_ret = time.time()
        chunks = self.retriever.retrieve(query_text, top_k=self.top_k)
        ret_ms = (time.time()-t_ret)*1000
        t_gen = time.time()
        answer, citations = self.generator.generate_grounded_answer(query_text, chunks)
        gen_ms = (time.time()-t_gen)*1000
        violations = check_guardrails(answer)
        if violations:
            print(f"[Guardrail] ⚠ {len(violations)} violation(s):")
            for v in violations: print(f"  {v}")
        evaluation = self.evaluator.evaluate(query_text, answer, chunks) if evaluate else {}
        result = RAGResult(query=query_text, retrieved=chunks, answer=answer,
                           citations_found=citations, guardrail_violations=violations,
                           evaluation=evaluation,
                           latency_ms={"retrieval_ms":round(ret_ms),"generation_ms":round(gen_ms),
                                       "eval_ms":evaluation.get("eval_latency_ms",0)})
        self._print_result(result)
        return result

    def _print_result(self, r:RAGResult):
        print(f"\n{'─'*70}\nANSWER:\n")
        for line in r.answer.split("\n"):
            print(textwrap.fill(line,width=80) if line.strip() else "")
        print(f"\nCITATIONS: {r.citations_found}")
        if r.guardrail_violations: print(f"⚠ GUARDRAIL VIOLATIONS: {r.guardrail_violations}")
        if r.evaluation:
            ev = r.evaluation
            faith = ev.get("faithfulness",{}); relev = ev.get("answer_relevancy",{})
            fs = faith.get("score","N/A"); rs = relev.get("score","N/A"); comp = ev.get("composite_score","N/A")
            print(f"\nRAGAS EVALUATION [LLM-as-judge]:")
            print(f"  Faithfulness:     {fs if isinstance(fs,str) else f'{fs:.3f}'}  — {faith.get('reasoning','')[:70]}")
            if faith.get("ungrounded_claims"): print(f"    Ungrounded: {faith['ungrounded_claims'][:2]}")
            print(f"  Answer Relevancy: {rs if isinstance(rs,str) else f'{rs:.3f}'}  — {relev.get('reasoning','')[:70]}")
            print(f"  Composite:        {comp if isinstance(comp,str) else f'{comp:.3f}'}  "
                  f"{'✓ PASS' if ev.get('pass') else '✗ FAIL'} (threshold={PASS_THRESHOLD})")
        print(f"\nLATENCY: ret={r.latency_ms.get('retrieval_ms')}ms  "
              f"gen={r.latency_ms.get('generation_ms')}ms  eval={r.latency_ms.get('eval_ms')}ms")
        print(f"{'─'*70}")

# ── Batch evaluation ──────────────────────────────────────────────────────────
def evaluate_rag_pipeline(queries:list[str], top_k:int=5) -> dict[str,Any]:
    """
    Batch RAGAS evaluation. Returns aggregate faithfulness, relevancy, pass-rate.
    Uses 3 OpenRouter keys with key rotation on 429.
    """
    rag = Brenus_RAG(top_k=top_k)
    results = []
    for i,q in enumerate(queries):
        print(f"\n[Batch {i+1}/{len(queries)}]")
        r = rag.query(q, evaluate=True)
        results.append({"query":r.query,"answer":r.answer,"citations":r.citations_found,
                         "guardrail_violations":r.guardrail_violations,
                         "faithfulness":r.evaluation.get("faithfulness",{}).get("score"),
                         "faithfulness_method":r.evaluation.get("faithfulness",{}).get("method"),
                         "answer_relevancy":r.evaluation.get("answer_relevancy",{}).get("score"),
                         "composite":r.evaluation.get("composite_score"),
                         "pass":r.evaluation.get("pass"),"latency_ms":r.latency_ms})
        if i < len(queries)-1: time.sleep(2)
    fs = [r["faithfulness"] for r in results if r["faithfulness"] is not None and r["faithfulness"]>=0]
    rs = [r["answer_relevancy"] for r in results if r["answer_relevancy"] is not None and r["answer_relevancy"]>=0]
    pass_rate = sum(1 for r in results if r["pass"])/len(results) if results else 0
    summary = {"n_queries":len(queries),
               "avg_faithfulness":round(sum(fs)/len(fs),3) if fs else None,
               "avg_answer_relevancy":round(sum(rs)/len(rs),3) if rs else None,
               "pass_rate":round(pass_rate,3),"results":results}
    print(f"\n{'='*70}\nBATCH EVALUATION SUMMARY")
    print(f"  Queries:              {summary['n_queries']}")
    print(f"  Avg Faithfulness:     {summary['avg_faithfulness']}")
    print(f"  Avg Answer Relevancy: {summary['avg_answer_relevancy']}")
    print(f"  Pass rate (≥{PASS_THRESHOLD}):     {summary['pass_rate']:.0%}")
    print(f"{'='*70}")
    return summary

if __name__ == "__main__":
    import sys
    q = " ".join(sys.argv[1:]) if len(sys.argv)>1 else \
        "What are the critical design gaps in BreAK CRC-001 and how does CrisPRO address them?"
    Brenus_RAG().query(q)
