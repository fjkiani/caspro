#!/usr/bin/env node
// ============================================================================
// w8d-validate — one-shot pre-push validator for the caspro repo.
// ----------------------------------------------------------------------------
// Runs every gate that has to be green before pushing an agent commit,
// in order, stopping on the first failure.  Prints a compact summary at
// the end.  Also writes a JSON report to /mnt/results/w8d-validate/latest.json
// so downstream tooling (CI dashboards, chat callbacks) can consume it.
//
// Order (bail on first fail):
//   1. caspro-lint            — governance file-scan (DL-07 + PATH B + slop)
//   2. next build             — production build must exit 0 (also runs tsc)
//   3. start prod server      — spawn `next start -p <PORT>` in background
//   4. wait-for-server        — poll until /tumor-board/ returns 200
//   5. w8c-governance-qa      — DL-07 runtime + ledger deep-dive links + policy
//   6. w8-tumor-board-content-qa  — full 22 assertions on the AK L1 bundle
//   7. shutdown server + cleanup
//
// NOTE: `next lint` is intentionally NOT run. The repo has no eslint config
// yet and `next lint` blocks on an interactive `Strict/Base/Cancel` prompt
// when invoked without a TTY. Real governance checks live in caspro-lint;
// syntax and type-checking are already handled by `next build`.
//
// Env:
//   PORT                       default 3100
//   VALIDATE_SKIP_BUILD        skip build step when set (dangerous — dev only)
//   VALIDATE_KEEP_SERVER       leave the server running after success
//   TRIAL_RECEIPT_PASSCODE     required for ledger QA gate unlock. w8d
//                              auto-uses .env.local if present.
//
// Usage:
//   node scripts/w8d-validate.mjs
//   node scripts/w8d-validate.mjs --json
//   PORT=3200 node scripts/w8d-validate.mjs
//
// Exit codes:
//   0   every gate passed
//   1   a gate failed (see stderr)
//   2   invocation / IO error
// ============================================================================

import { spawn, spawnSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import http from 'node:http';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const PORT = Number(process.env.PORT || 3100);
const BASE = `http://localhost:${PORT}`;
const OUT_DIR = '/mnt/results/w8d-validate';
const args = process.argv.slice(2);
const wantJson = args.includes('--json');

const RESULT = { gates: [], passed: 0, failed: 0, started_at: new Date().toISOString(), finished_at: null };

function tsPrefix() {
  return new Date().toISOString().slice(11, 19);
}
function log(msg) {
  process.stdout.write(`[w8d ${tsPrefix()}] ${msg}\n`);
}
function record(name, ok, detail, duration_ms) {
  const entry = { name, ok, detail, duration_ms };
  RESULT.gates.push(entry);
  if (ok) RESULT.passed++;
  else RESULT.failed++;
  const flag = ok ? 'PASS' : 'FAIL';
  log(`${flag} ${name.padEnd(28)} ${(duration_ms / 1000).toFixed(1).padStart(6)}s ${detail || ''}`);
}

async function runShell(cmd, argsList, opts = {}) {
  const start = Date.now();
  return new Promise((resolve) => {
    const p = spawn(cmd, argsList, { cwd: ROOT, env: { ...process.env, PATH: `/workspace/.node/v20/bin:${process.env.PATH || ''}` }, ...opts });
    let stdout = '';
    let stderr = '';
    p.stdout?.on('data', (b) => { stdout += b.toString(); });
    p.stderr?.on('data', (b) => { stderr += b.toString(); });
    p.on('close', (code) => resolve({ code, stdout, stderr, duration_ms: Date.now() - start }));
    p.on('error', (err) => resolve({ code: -1, stdout, stderr: String(err), duration_ms: Date.now() - start }));
  });
}

function httpGet(pathname, timeoutMs = 4000) {
  return new Promise((resolve) => {
    const req = http.request({ hostname: 'localhost', port: PORT, path: pathname, method: 'GET', timeout: timeoutMs }, (res) => {
      res.on('data', () => {});
      res.on('end', () => resolve({ status: res.statusCode }));
    });
    req.on('error', () => resolve({ status: null }));
    req.on('timeout', () => { req.destroy(); resolve({ status: null }); });
    req.end();
  });
}

async function waitForServer(maxSeconds = 40) {
  for (let i = 0; i < maxSeconds; i++) {
    const r = await httpGet('/tumor-board/');
    if (r.status === 200 || r.status === 308) return true;
    await new Promise((res) => setTimeout(res, 1000));
  }
  return false;
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  // ---------- 0. sanity: ensure port is free ----------
  {
    const pre = await httpGet('/', 1000);
    if (pre.status !== null) {
      log(`WARN: port ${PORT} already has a service replying (status=${pre.status}). ` +
          `Kill it first — validator will spawn its own next start.`);
      record('port-precheck', false, `port ${PORT} occupied — kill stale server first`, 0);
      return finish();
    }
  }

  // ---------- 1. caspro-lint ----------
  {
    const r = await runShell('node', ['scripts/caspro-lint.mjs']);
    const ok = r.code === 0;
    const lastLine = r.stdout.trim().split('\n').slice(-1)[0] || 'no output';
    record('caspro-lint', ok, lastLine, r.duration_ms);
    if (!ok) {
      process.stderr.write(r.stdout + r.stderr);
      return finish();
    }
  }

  // ---------- 2. next build (also runs tsc) ----------
  if (!process.env.VALIDATE_SKIP_BUILD) {
    const r = await runShell('npm', ['run', 'build']);
    const ok = r.code === 0;
    const tail = r.stdout.trim().split('\n').filter(Boolean).slice(-2).join(' | ').slice(0, 120);
    record('next-build', ok, ok ? tail : 'build failed', r.duration_ms);
    if (!ok) {
      process.stderr.write(r.stdout + r.stderr);
      return finish();
    }
  } else {
    record('next-build', true, 'skipped via VALIDATE_SKIP_BUILD', 0);
  }

  // ---------- 3-4. start server + wait ----------
  // Spawn `next start` in its own process group (detached: true) so we can
  // kill the whole group later.  next-server is forked as a grandchild and
  // gets orphaned if we kill only the parent — the whole-group SIGTERM in
  // shutdown() reaps both.
  const stopSignals = [];
  {
    const start = Date.now();
    log(`starting next start -p ${PORT} ...`);
    const child = spawn('npx', ['next', 'start', '-p', String(PORT)], {
      cwd: ROOT,
      env: { ...process.env, PATH: `/workspace/.node/v20/bin:${process.env.PATH || ''}` },
      detached: true,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let serverLog = '';
    child.stdout?.on('data', (b) => { serverLog += b.toString(); });
    child.stderr?.on('data', (b) => { serverLog += b.toString(); });

    const killGroup = (sig) => {
      try {
        // Negative pid = target the process group (works because detached=true).
        process.kill(-child.pid, sig);
      } catch {
        try { child.kill(sig); } catch {}
      }
    };

    const ready = await waitForServer(45);
    if (!ready) {
      record('server-boot', false, 'timeout waiting for /tumor-board/', Date.now() - start);
      killGroup('SIGKILL');
      process.stderr.write(serverLog);
      return finish();
    }
    record('server-boot', true, `ready in ${((Date.now() - start) / 1000).toFixed(1)}s`, Date.now() - start);
    stopSignals.push(() => {
      try {
        if (process.env.VALIDATE_KEEP_SERVER) {
          log(`leaving server running on port ${PORT} (VALIDATE_KEEP_SERVER — orphans will linger, kill manually)`);
          return;
        }
        killGroup('SIGTERM');
        setTimeout(() => killGroup('SIGKILL'), 3000);
      } catch {}
    });
  }

  // ---------- 5. w8c-governance-qa ----------
  {
    const r = await runShell('node', ['scripts/w8c-governance-qa.mjs']);
    const ok = r.code === 0;
    const summaryLine = r.stdout.trim().split('\n').slice(-1)[0] || '';
    record('w8c-governance-qa', ok, summaryLine, r.duration_ms);
    if (!ok) {
      process.stderr.write(r.stdout + r.stderr);
      stopSignals.forEach((f) => f());
      return finish();
    }
  }

  // ---------- 6. tumor-board content QA ----------
  {
    const r = await runShell('node', ['scripts/w8-tumor-board-content-qa.mjs']);
    const ok = r.code === 0;
    const summaryLine = r.stdout.trim().split('\n').slice(-1)[0] || '';
    record('tumor-board-content-qa', ok, summaryLine, r.duration_ms);
    if (!ok) {
      process.stderr.write(r.stdout + r.stderr);
      stopSignals.forEach((f) => f());
      return finish();
    }
  }

  stopSignals.forEach((f) => f());
  return finish();
}

async function finish() {
  RESULT.finished_at = new Date().toISOString();
  await fs.writeFile(path.join(OUT_DIR, 'latest.json'), JSON.stringify(RESULT, null, 2));

  if (wantJson) {
    process.stdout.write(JSON.stringify(RESULT, null, 2) + '\n');
  } else {
    log('');
    log(`SUMMARY  passed=${RESULT.passed}  failed=${RESULT.failed}  gates=${RESULT.gates.length}`);
    for (const g of RESULT.gates) {
      const flag = g.ok ? 'PASS' : 'FAIL';
      log(`  ${flag} ${g.name.padEnd(28)} ${(g.duration_ms / 1000).toFixed(1).padStart(6)}s`);
    }
  }
  process.exit(RESULT.failed === 0 ? 0 : 1);
}

main().catch(async (err) => {
  RESULT.finished_at = new Date().toISOString();
  RESULT.fatal = String(err?.stack || err);
  await fs.writeFile(path.join(OUT_DIR, 'latest.json'), JSON.stringify(RESULT, null, 2));
  console.error('[w8d] fatal:', err);
  process.exit(2);
});
