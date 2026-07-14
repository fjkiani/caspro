#!/usr/bin/env python3
"""
export-content.py — Generate /mnt/results/content/{ _manifest.json, <slug>.json ×N, README.md }
from the TypeScript source of truth without a JS runtime.

Sources parsed:
  - src/data/ledger-programs.ts           → 6 programs, 38 trial rows
  - src/data/capability-registry.ts       → 5 CrisPRO capabilities
  - src/data/audience-registry.ts         → 3 audiences (pharma-bd / oncologists / investors)
  - src/data/trial-case-files/trials/*.ts → 5 hand-authored TrialCaseFile records
  - factory logic ported from stub-factory.ts → 27 auto-generated stubs

Governance policy preserved verbatim:
  - VectorAxes = sentinel zeros
  - cosineResponder / cosineITT / engineRun.responderScore / engineRun.delta = -1 (gated)
  - deltaImpact = 'gated'
  - moaGlyphs derived from LedgerProgram.preview class
"""
import re, json, os, sys
from pathlib import Path
from datetime import datetime, timezone
import subprocess

REPO = Path(__file__).resolve().parents[1]
OUT_DIR = Path('/mnt/results/content')
OUT_DIR.mkdir(parents=True, exist_ok=True)

# ─── generic TS-literal → JSON conversion ─────────────────────────────────────

def ts_object_or_array_after(src, start_idx):
    open_c = src[start_idx]
    close_c = '}' if open_c == '{' else ']'
    depth = 0
    i = start_idx
    n = len(src)
    while i < n:
        c = src[i]
        if c == '"':
            j = i+1
            while j < n:
                if src[j] == '\\': j += 2; continue
                if src[j] == '"': break
                j += 1
            i = j+1; continue
        if c == "'":
            j = i+1
            while j < n:
                if src[j] == '\\': j += 2; continue
                if src[j] == "'": break
                j += 1
            i = j+1; continue
        if c == '`':
            j = i+1
            while j < n:
                if src[j] == '\\': j += 2; continue
                if src[j] == '`': break
                j += 1
            i = j+1; continue
        if c == '/' and i+1 < n:
            if src[i+1] == '/':
                j = src.find('\n', i); i = n if j == -1 else j; continue
            if src[i+1] == '*':
                j = src.find('*/', i+2); i = n if j == -1 else j+2; continue
        if c == open_c: depth += 1
        elif c == close_c:
            depth -= 1
            if depth == 0: return src[start_idx:i+1]
        i += 1
    raise ValueError(f'unbalanced starting at {start_idx}')

def find_decl_body(src, name):
    m = re.search(r'(?:export\s+)?const\s+' + re.escape(name) + r'\s*(?::[^=]+)?=\s*([\{\[])', src)
    if not m: return None
    return ts_object_or_array_after(src, m.end() - 1)

def resolve_refs(text, resolutions):
    for name, body in resolutions.items():
        out = []
        i = 0; n = len(text)
        while i < n:
            c = text[i]
            if c == '"':
                j = i+1
                while j < n:
                    if text[j] == '\\': j += 2; continue
                    if text[j] == '"': break
                    j += 1
                out.append(text[i:j+1]); i = j+1; continue
            if c == "'":
                j = i+1
                while j < n:
                    if text[j] == '\\': j += 2; continue
                    if text[j] == "'": break
                    j += 1
                out.append(text[i:j+1]); i = j+1; continue
            if c == '`':
                j = i+1
                while j < n:
                    if text[j] == '\\': j += 2; continue
                    if text[j] == '`': break
                    j += 1
                out.append(text[i:j+1]); i = j+1; continue
            if text[i:i+len(name)] == name and (i == 0 or not (text[i-1].isalnum() or text[i-1] in '_$.')):
                after = i + len(name)
                if after >= n or not (text[after].isalnum() or text[after] in '_$'):
                    out.append(body); i = after; continue
            out.append(c); i += 1
        text = ''.join(out)
    return text

def ts_to_json(ts):
    out = []
    i = 0; n = len(ts)
    while i < n:
        c = ts[i]
        if c == '/' and i+1 < n:
            if ts[i+1] == '/':
                j = ts.find('\n', i); i = n if j == -1 else j; continue
            if ts[i+1] == '*':
                j = ts.find('*/', i+2); i = n if j == -1 else j+2; continue
        if c == '"':
            j = i+1
            while j < n:
                if ts[j] == '\\': j += 2; continue
                if ts[j] == '"': break
                j += 1
            out.append(ts[i:j+1]); i = j+1; continue
        if c == "'":
            j = i+1
            while j < n:
                if ts[j] == '\\': j += 2; continue
                if ts[j] == "'": break
                j += 1
            inner = ts[i+1:j].replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
            out.append('"' + inner + '"'); i = j+1; continue
        if c == '`':
            j = i+1
            while j < n:
                if ts[j] == '\\': j += 2; continue
                if ts[j] == '`': break
                j += 1
            inner = ts[i+1:j].replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
            out.append('"' + inner + '"'); i = j+1; continue
        out.append(c); i += 1
    stripped = ''.join(out)
    stripped = re.sub(r',(\s*[}\]])', r'\1', stripped)
    result = []
    i = 0; n = len(stripped)
    while i < n:
        c = stripped[i]
        if c == '"':
            j = i+1
            while j < n:
                if stripped[j] == '\\': j += 2; continue
                if stripped[j] == '"': break
                j += 1
            result.append(stripped[i:j+1]); i = j+1; continue
        if c.isalpha() or c == '_' or c == '$':
            j = i
            while j < n and (stripped[j].isalnum() or stripped[j] in '_$'):
                j += 1
            ident = stripped[i:j]
            k = j
            while k < n and stripped[k] in ' \t':
                k += 1
            if k < n and stripped[k] == ':':
                prev_char = None
                for b in range(len(result)-1, -1, -1):
                    tok = result[b]
                    if tok == '' or tok.isspace(): continue
                    prev_char = tok[-1] if tok else None
                    break
                if prev_char in ('{', ',', '[', None):
                    result.append('"' + ident + '"'); i = j; continue
            result.append(ident); i = j; continue
        result.append(c); i += 1
    return ''.join(result)

def parse_ts_declaration(file_path, decl_name, helpers=None):
    src = open(file_path).read()
    if helpers:
        helper_bodies = {}
        for h in helpers:
            b = find_decl_body(src, h)
            if b: helper_bodies[h] = b
        main = find_decl_body(src, decl_name)
        resolved = resolve_refs(main, helper_bodies)
    else:
        resolved = find_decl_body(src, decl_name)
    return json.loads(ts_to_json(resolved))

# ─── ported stub-factory logic ────────────────────────────────────────────────

ZEROS = { 'ddr': 0, 'mapk': 0, 'pi3k': 0, 'io': 0, 'vegf': 0, 'her2': 0, 'efflux': 0, 'rss': 0 }

def slugify_trial(trial):
    src = trial.get('nctId') or trial.get('trialName') or 'trial'
    return re.sub(r'(^-|-$)', '', re.sub(r'[^a-z0-9]+', '-', src.lower()))

def derive_tone(primary_met, status):
    m = (primary_met or '').upper()
    s = (status or '').upper()
    if 'QUARANTINE' in s or 'MISSING' in s or 'HOLD' in s or 'QUARANTINED' in m or 'MISSING' in m: return 'gated'
    if m == 'NO' or m.startswith('NO ') or 'FAILED' in s or 'TERMINATED' in s: return 'negative'
    if m == 'YES' or 'POSITIVE' in m: return 'positive'
    if any(k in m for k in ('SUBGROUP','PARTIAL','MARGINAL','INTERIM','UNCONTROLLED')): return 'mixed'
    return 'gated'

def derive_verdict_label(tone, primary_met):
    m = (primary_met or '').upper()
    if tone == 'gated': return 'UNDER_CANON_REVIEW'
    if tone == 'positive': return 'POSITIVE_CONTROL'
    if tone == 'negative': return 'TRIAL_TERMINATED' if 'TERMINATED' in m else 'PRIMARY_ENDPOINT_MISSED'
    if tone == 'mixed':
        if 'SUBGROUP' in m: return 'RESPONDER_SUBGROUP_IDENTIFIED'
        if 'UNCONTROLLED' in m: return 'UNCONTROLLED_SIGNAL'
        if 'INTERIM' in m: return 'INTERIM_INCONCLUSIVE'
        return 'MIXED_READOUT'
    return 'ANALYSIS_PENDING'

def glyphs_for_preview(preview):
    if preview == 'io':
        return [
            {'axis':'io','direction':'responder','magnitude':'strong','note':'IO axis is the intended lever for this program class.'},
            {'axis':'ddr','direction':'non-responder','magnitude':'minimal'},
            {'axis':'vegf','direction':'responder','magnitude':'moderate','note':'VEGF axis engaged for IO-permissive TME conversion (bev / regorafenib combos).'},
            {'axis':'mapk','direction':'non-responder','magnitude':'minimal'},
            {'axis':'rss','direction':'non-responder','magnitude':'trace'},
        ]
    if preview == 'ddr':
        return [
            {'axis':'ddr','direction':'responder','magnitude':'strongest','note':'DDR axis is the intended lever for this program class.'},
            {'axis':'rss','direction':'responder','magnitude':'strong','note':'Replication-stress axis governs sensitivity to DDR blockade.'},
            {'axis':'io','direction':'non-responder','magnitude':'minimal'},
            {'axis':'her2','direction':'non-responder','magnitude':'trace'},
            {'axis':'efflux','direction':'non-responder','magnitude':'trace'},
        ]
    if preview == 'target':
        return [
            {'axis':'her2','direction':'responder','magnitude':'strongest','note':'Target-expression axis is the intended lever for this ADC / bispecific class.'},
            {'axis':'io','direction':'responder','magnitude':'moderate','note':'IO-permissive TME needed for bispecific T-cell engagement.'},
            {'axis':'efflux','direction':'non-responder','magnitude':'moderate','note':'Payload efflux resistance is the primary class-level failure axis.'},
            {'axis':'vegf','direction':'non-responder','magnitude':'minimal'},
            {'axis':'rss','direction':'non-responder','magnitude':'trace'},
        ]
    if preview == 'benchmark':
        return [
            {'axis':'ddr','direction':'responder','magnitude':'moderate','note':'Cytotoxic backbone engages the DDR axis broadly.'},
            {'axis':'vegf','direction':'responder','magnitude':'moderate','note':'Anti-angiogenic component contributes when bev is on-board.'},
            {'axis':'io','direction':'non-responder','magnitude':'trace'},
            {'axis':'her2','direction':'non-responder','magnitude':'trace'},
            {'axis':'rss','direction':'non-responder','magnitude':'trace'},
        ]
    # active / default
    return [
        {'axis':'io','direction':'responder','magnitude':'moderate','note':'Axis relevance surfaced through canon; specifics gated.'},
        {'axis':'ddr','direction':'responder','magnitude':'minimal'},
        {'axis':'her2','direction':'non-responder','magnitude':'trace'},
        {'axis':'vegf','direction':'non-responder','magnitude':'trace'},
        {'axis':'rss','direction':'non-responder','magnitude':'trace'},
    ]

def make_trial_case_stub(trial, program, case_number, slug=None):
    slug = slug or slugify_trial(trial)
    tone = derive_tone(trial.get('primaryMet',''), trial.get('status',''))
    verdict_label = derive_verdict_label(tone, trial.get('primaryMet',''))

    def _s(x, default='—'):
        v = trial.get(x)
        return v if v is not None else default
    def _slc(field, n):
        v = trial.get(field, '') or ''
        return v[:n]

    published_readout = {
        'headlineLabel': 'The Positive Control:' if tone == 'positive'
            else 'The Published Readout:' if tone == 'negative'
            else 'The Split Readout:' if tone == 'mixed'
            else 'Under Canon Review:',
        'headlineValue': _slc('primaryResult',120) or 'Result gated pending canon reconciliation',
        'tone': tone,
        'endpointLabel': 'Primary Endpoint',
        'endpointValue': _slc('primaryMet',60) or 'gated',
    }
    verdict = {
        'label': verdict_label,
        'tone': tone,
        'caption': 'Delta magnitude / responder archetype under continued canon review.'
            if tone == 'gated'
            else f'{program["name"]}: transfer lessons applied to Brenus BREAK-CRC-001 comparator context.',
    }
    artifacts = [
        {
            'doc': 'Ledger Program Reference',
            'path': f'{program["programId"]} · {program["slug"]}',
            'type': 'md',
            'status': 'VERIFIED',
            'summary': f'Trial catalogued under {program["name"]}. See program record for full transfer lessons.',
        },
    ]
    if trial.get('nctId'):
        artifacts.append({
            'doc': 'Trial Registry',
            'path': f'{trial["nctId"]} · {trial.get("trialName") or "—"}',
            'type': 'md',
            'status': 'VERIFIED',
            'summary': f'Sponsor: {trial.get("sponsor") or "—"}. Phase: {trial.get("phase") or "—"}. Indication: {trial.get("indication") or "—"}.',
        })
    root_cause_summary = (trial.get('primaryResult','') or '').strip() or 'Primary result under canon review.'
    stub = {
        'id': slug,
        'caseNumber': case_number,
        'trialId': trial.get('nctId') or slug.upper(),
        'sponsor': _s('sponsor'),
        'phase': _s('phase'),
        'cancer': _s('indication'),
        'drug': _s('drug'),
        'comparator': '—',
        'enrolled': 0,
        'primaryEndpoint': root_cause_summary,
        'title': f'{trial.get("trialName") or trial.get("nctId") or "Trial"} — {program["name"]}',
        'drugLine': f'{trial.get("drug") or "—"} // {trial.get("sponsor") or "—"} {trial.get("phase") or ""}'.strip(),
        'sources': [
            f'{trial.get("nctId") or "—"} — {trial.get("trialName") or "—"}',
            f'Ledger program: {program["name"]}',
        ],
        'rootCause': {
            'summary': root_cause_summary,
            'failureKeyword': verdict_label,
            'statusQuo': program['indicationFocus'],
            'statusQuoLabel': 'Program Context',
            'intercept': program['transferLessons'][0] if program['transferLessons'] else 'Transfer lesson under canon review',
            'interceptLabel': 'Transfer Lesson',
        },
        'responderLabel': 'Responder archetype — see program transfer lessons',
        'nonResponderLabel': 'Non-responder archetype — see program transfer lessons',
        'responderVector': ZEROS,
        'nonResponderVector': ZEROS,
        'trialVector': ZEROS,
        'cosineResponder': -1,
        'cosineITT': -1,
        'deltaImpact': 'gated',
        'vectorFlags': [],
        'scores': [
            {'label':'Alignment score','value':'gated','subtext':'Under canon review','color':'cyan'},
            {'label':'Published readout','value':_slc('primaryResult',40) or 'gated','subtext':'Public source','color':'rose'},
            {'label':'Framework tier','value':'Ledger corpus','subtext':program['programId'],'color':'cyan'},
            {'label':'Program','value':program['name'][:40],'subtext':program['slug'],'color':'cyan'},
        ],
        'engineRun': {
            'trialsScored': 0,
            'responderScore': -1,
            'responderRank': 0,
            'nonResponderScore': -1,
            'nonResponderRank': 0,
            'delta': -1,
            'receiptFile': 'Under continued canon review',
            'receiptDate': 'gated',
        },
        'gates': [
            {'id':1,'label':'Gate 1','condition':'Under continued canon review','result':'gated','pass':False},
            {'id':2,'label':'Gate 2','condition':'Under continued canon review','result':'gated','pass':False},
            {'id':3,'label':'Gate 3','condition':'Under continued canon review','result':'gated','pass':False},
        ],
        'gatesSummary': 'Gates gated under canon review',
        'biologySummary': f'Trial catalogued under {program["name"]}. See program transfer lessons for class-level biology and Brenus BREAK-CRC-001 comparator implications.',
        'biologyCascade': [f'→ {t}' for t in program['transferLessons'][:6]] if program['transferLessons'] else ['Transfer lessons under canon review'],
        'playbook': [
            {'title':'Program context','desc':program['headline'][:200]},
            {'title':'Transfer lesson','desc':program['transferLessons'][0] if program['transferLessons'] else 'Under canon review'},
            {'title':'Comparator context','desc':'See BREAK-CRC-001 comparator matrix for trial-vs-active program analysis.'},
            {'title':'Governance','desc':'Delta magnitude / responder cosine gated pending canon reconciliation.'},
        ],
        'artifacts': artifacts,
        'commercial': {
            'targetPopulation': '—',
            'populationUnit': 'Program context',
            'annualSavings': '—',
            'savingsUnit': 'Under canon review',
            'closingStatement': f'See {program["name"]} program page for commercial framing.',
        },
        'diagnosticLog': [
            {'time':'','message':f'Stub generated from LEDGER_PROGRAMS · {program["programId"]}. Numeric fits gated.','level':'info'},
        ],
        'oneLiner': _slc('primaryResult',200) or f'{trial.get("trialName") or trial.get("nctId") or "Trial"} catalogued under {program["name"]}.',
        'validationTier': 'Ledger corpus stub',
        'validationStrength': 'Narrative-only — numeric fits gated',
        'publishedReadout': published_readout,
        'verdict': verdict,
        'moaGlyphs': glyphs_for_preview(program['preview']),
    }
    return stub

# ─── main export ─────────────────────────────────────────────────────────────

def main():
    print('reading LEDGER_PROGRAMS…')
    programs = parse_ts_declaration(REPO/'src/data/ledger-programs.ts', 'LEDGER_PROGRAMS')
    print(f'  → {len(programs)} programs')

    print('reading CAPABILITY_REGISTRY…')
    capabilities = parse_ts_declaration(REPO/'src/data/capability-registry.ts', 'CAPABILITY_REGISTRY')
    print(f'  → {len(capabilities)} capabilities')

    print('reading AUDIENCE_REGISTRY…')
    audiences = parse_ts_declaration(
        REPO/'src/data/audience-registry.ts',
        'AUDIENCE_REGISTRY',
        helpers=['audiencePharma','audienceOncologists','audienceInvestors'],
    )
    print(f'  → {len(audiences)} audiences')

    HAND = {
        'latify':      ('LATIFY',      'NCT05450692'),
        'berzosertib': ('BERZOSERTIB', 'NCT02595892'),
        'capri':       ('CAPRI',       'NCT03462342'),
        'ceacam5':     ('CEACAM5',     'NCT04154956'),
        'adavosertib': ('ADAVOSERTIB', 'NCT03579316'),
    }
    HELPERS = ['RESPONDER_VECTOR','NON_RESPONDER_VECTOR','TRIAL_VECTOR','ARTIFACTS']
    nct_to_hand_slug = {v[1]: k for k, v in HAND.items()}

    print('parsing hand-authored trial case files…')
    hand_trials = {}
    for slug, (export_name, nct) in HAND.items():
        obj = parse_ts_declaration(REPO/f'src/data/trial-case-files/trials/{slug}.ts', export_name, helpers=HELPERS)
        hand_trials[slug] = obj
        print(f'  ✓ {slug:14s} trialId={obj["trialId"]:14s} phase={obj.get("phase","—")}')

    print('generating auto-stubs…')
    auto_stubs = {}
    case_number = 6  # 01..05 taken by hand-authored (case numbers may not match; approximate)
    for program in programs:
        if program['preview'] == 'benchmark':
            print(f'  skip benchmark: {program["programId"]} ({len(program["trials"])} trials)')
            continue
        for trial in program['trials']:
            if not trial.get('nctId') and not trial.get('trialName'):
                continue
            if trial.get('nctId') in nct_to_hand_slug:
                continue
            slug = slugify_trial(trial)
            if slug in auto_stubs: continue
            stub = make_trial_case_stub(trial, program, str(case_number).zfill(2))
            auto_stubs[slug] = stub
            case_number += 1
    print(f'  → {len(auto_stubs)} auto-stubs')

    all_trials = {**auto_stubs, **hand_trials}  # hand-authored wins
    print(f'  merged registry: {len(all_trials)} total slugs')

    # ─── build reverse indices ────────────────────────────────────────────

    program_slug_for_trial = {}
    for program in programs:
        for trial in program['trials']:
            if trial.get('nctId'):
                slug = nct_to_hand_slug.get(trial['nctId']) or slugify_trial(trial)
                program_slug_for_trial[slug] = program['programId']

    # capability → proofCaseSlug
    capability_by_proof = {}
    for cap in capabilities:
        capability_by_proof.setdefault(cap['proofCaseSlug'], []).append(cap['id'])

    audiences_by_slug = {}
    for aud in audiences:
        for cs in aud.get('caseStudies', []):
            audiences_by_slug.setdefault(cs['slug'], []).append(aud['id'])

    # ─── git sha ──────────────────────────────────────────────────────────

    try:
        git_sha = subprocess.check_output(['git','-C',str(REPO),'rev-parse','HEAD'], text=True).strip()
    except Exception:
        git_sha = 'unknown'

    generated_at = datetime.now(timezone.utc).isoformat()

    # ─── manifest ─────────────────────────────────────────────────────────

    manifest_trials = []
    for slug in sorted(all_trials):
        t = all_trials[slug]
        manifest_trials.append({
            'slug': slug,
            'route': f'/proof/{slug}/',
            'caseRoute': f'/proof/{slug}/case/',
            'ledgerRoute': f'/ledger/{slug}/',
            'trialId': t.get('trialId','—'),
            'caseNumber': t.get('caseNumber','—'),
            'sponsor': t.get('sponsor','—'),
            'phase': t.get('phase','—'),
            'cancer': t.get('cancer','—'),
            'drug': t.get('drug','—'),
            'programId': program_slug_for_trial.get(slug, 'UNKNOWN'),
            'tone': t.get('verdict', {}).get('tone', 'gated'),
            'verdictLabel': t.get('verdict', {}).get('label', 'UNDER_CANON_REVIEW'),
            'authoring': 'hand' if slug in hand_trials else 'auto',
            'capabilitiesEvidenced': capability_by_proof.get(slug, []),
            'audiencesFeatured': audiences_by_slug.get(slug, []),
        })

    manifest_programs = [{
        'programId': p['programId'],
        'slug': p['slug'],
        'name': p['name'],
        'preview': p['preview'],
        'indicationFocus': p['indicationFocus'],
        'gated': p['gated'],
        'trialCount': len(p['trials']),
        'headline': p['headline'],
        'transferLessons': p['transferLessons'],
    } for p in programs]

    manifest_capabilities = [{
        'id': c['id'],
        'slug': c['slug'],
        'name': c['name'],
        'oneLiner': c['oneLiner'],
        'primarySurface': c['primarySurface'],
        'proofCaseSlug': c['proofCaseSlug'],
        'proofCaseRoute': f'/proof/{c["proofCaseSlug"]}/case/',
    } for c in capabilities]

    manifest_audiences = [{
        'id': a['id'],
        'slug': a['slug'],
        'name': a['name'],
        'question': a['question'],
        'journey': a['journey'],
        'caseStudySlugs': [cs['slug'] for cs in a.get('caseStudies', [])],
    } for a in audiences]

    schema = {
        'TrialCaseFile': {
            'source': 'src/data/trial-case-files/types.ts',
            'identifierField': 'id',
            'gatedFields': {
                'cosineResponder': -1,
                'cosineITT': -1,
                'engineRun.responderScore': -1,
                'engineRun.delta': -1,
                'deltaImpact': 'gated',
            },
            'sentinelVectorAxes': 'All 8 axes set to 0 for vague-safe canon',
        },
        'LedgerProgram': { 'source': 'src/data/ledger-programs.ts' },
        'CapabilityEntry': { 'source': 'src/data/capability-registry.ts', 'ids': ['CAP-1','CAP-2','CAP-3','CAP-4','CAP-5'] },
        'AudienceEntry':   { 'source': 'src/data/audience-registry.ts', 'ids': ['AUD-1','AUD-2','AUD-3'] },
        'GovernancePolicy': {
            'ruleSet': 'caspro-lint/forbidden_values.py + capability_depth_lint.py + no_scroll_lint.py',
            'vagueSafeCanonAdopted': '2026-07-07',
            'renderPolicy': 'When cosineResponder <= -1, render <MoaGlyphStrip/> in place of numeric readouts.',
        },
    }

    manifest = {
        'generatedAt': generated_at,
        'gitSha': git_sha,
        'counts': {
            'trials': len(all_trials),
            'handAuthored': len(hand_trials),
            'autoStubs': len(auto_stubs),
            'programs': len(programs),
            'capabilities': len(capabilities),
            'audiences': len(audiences),
        },
        'trials': manifest_trials,
        'programs': manifest_programs,
        'capabilities': manifest_capabilities,
        'audiences': manifest_audiences,
        'schema': schema,
    }

    # ─── write outputs ────────────────────────────────────────────────────

    (OUT_DIR / '_manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2))
    print(f'wrote {OUT_DIR}/_manifest.json ({(OUT_DIR/"_manifest.json").stat().st_size} bytes)')

    slugs_dir = OUT_DIR / 'trials'
    slugs_dir.mkdir(exist_ok=True)
    for slug, trial in sorted(all_trials.items()):
        record = {
            'slug': slug,
            'authoring': 'hand' if slug in hand_trials else 'auto',
            'programId': program_slug_for_trial.get(slug),
            'capabilitiesEvidenced': capability_by_proof.get(slug, []),
            'audiencesFeatured': audiences_by_slug.get(slug, []),
            'trialCaseFile': trial,
        }
        (slugs_dir / f'{slug}.json').write_text(json.dumps(record, ensure_ascii=False, indent=2))
    print(f'wrote {len(all_trials)} per-slug JSONs to {slugs_dir}/')

    programs_dir = OUT_DIR / 'programs'
    programs_dir.mkdir(exist_ok=True)
    for p in programs:
        (programs_dir / f'{p["slug"]}.json').write_text(json.dumps(p, ensure_ascii=False, indent=2))
    print(f'wrote {len(programs)} program JSONs to {programs_dir}/')

    (OUT_DIR / 'capabilities.json').write_text(json.dumps(capabilities, ensure_ascii=False, indent=2))
    (OUT_DIR / 'audiences.json').write_text(json.dumps(audiences, ensure_ascii=False, indent=2))

    readme = f"""# CrisPRO content export

Generated {generated_at} from git {git_sha[:12] if git_sha != "unknown" else "(unknown)"}.

## Layout

- `_manifest.json` — top-level index. Lists {len(all_trials)} trials, {len(programs)} programs, {len(capabilities)} capabilities, {len(audiences)} audiences plus schema references.
- `trials/<slug>.json` — one file per trial slug. Contains the full `TrialCaseFile` record plus reverse links (`programId`, `capabilitiesEvidenced`, `audiencesFeatured`).
- `programs/<slug>.json` — one file per `LedgerProgram` (6 total).
- `capabilities.json` — the 5-item CrisPRO capability spine.
- `audiences.json` — the 3-item audience router.

## Slug conventions

- **Hand-authored slugs** (5): stable keyword slugs — `latify`, `berzosertib`, `capri`, `ceacam5`, `adavosertib`.
- **Auto-stubs** (27): kebab-case NCT ids or program identifiers.

Routes:
- `/proof/<slug>/` — landing proof page
- `/proof/<slug>/case/` — full case file with MoA glyph strip, verdict, playbook
- `/ledger/<slug>/` — trial ledger receipt view

## Gated-value semantics

Under the vague-safe canon adopted 2026-07-07, the following are gated sentinels:

- `cosineResponder = -1` / `cosineITT = -1` — numeric fit magnitudes suppressed.
- `engineRun.responderScore = -1`, `engineRun.nonResponderScore = -1`, `engineRun.delta = -1`.
- `deltaImpact = "gated"`.
- All `responderVector` / `nonResponderVector` / `trialVector` axes set to 0.

Consumer components must detect these sentinels via `isCosineGated(value)` (`src/components/sections/mars/gated-values.ts`) and render `<MoaGlyphStrip rows={{trial.moaGlyphs}} />` in place of numeric readouts. Where `moaGlyphs` is present, treat it as authoritative for MoA display; the `trialVector` axes are kept only for type-contract compatibility with downstream visual components (radar bases render zeros = a center dot).

## Governance references

- `caspro-lint/forbidden_values.py` — value blocklist enforced on every commit.
- `caspro-lint/capability_depth_lint.py` — capability-depth linter.
- `caspro-lint/no_scroll_lint.py` — no-scroll surface linter.

## Programmatic consumption

TypeScript (in-repo):
```ts
import {{ TRIAL_CASE_FILES, HAND_AUTHORED_TRIAL_IDS }} from '@/data/trial-case-files';
import {{ LEDGER_PROGRAMS }} from '@/data/ledger-programs';
import {{ CAPABILITY_REGISTRY }} from '@/data/capability-registry';
import {{ AUDIENCE_REGISTRY }} from '@/data/audience-registry';
```

JSON (this export):
```py
import json
manifest = json.load(open('_manifest.json'))
latify = json.load(open('trials/latify.json'))
```

## Regenerating this export

```sh
python3 scripts/export-content.py
```

The exporter parses TypeScript sources without a JS runtime (via a state-machine TS-literal→JSON converter) and re-executes the same stub-factory logic used by the app.
"""
    (OUT_DIR / 'README.md').write_text(readme)
    print(f'wrote {OUT_DIR}/README.md ({(OUT_DIR/"README.md").stat().st_size} bytes)')

    # summary
    total_bytes = sum(f.stat().st_size for f in OUT_DIR.rglob('*') if f.is_file())
    print(f'\nTotal export: {sum(1 for _ in OUT_DIR.rglob("*") if _.is_file())} files, {total_bytes} bytes')

if __name__ == '__main__':
    main()
