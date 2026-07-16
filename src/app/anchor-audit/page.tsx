import type { Metadata } from 'next';

import { CRC01_BRENUS_PANEL } from '@/data/tumor-board/anchor/crc01_brenus';
import { BM01_EVO2_PANEL } from '@/data/tumor-board/anchor/bm01_evo2';

export const metadata: Metadata = {
  title: 'Anchor-repo audit · CrisPRO',
  description:
    'How the tumor-board demo integrates the Brenus and evo2-e2e anchor repositories. Every panel field is traceable to a committed file.',
};

// Static field→source map. We keep this hand-authored (rather than reflecting
// the panel objects at build time) so a reader can see the intent alongside the
// path, without depending on TypeScript symbol chasing.
const CRC01_MAP: Array<{ field: string; path: string; role: string }> = [
  {
    field: 'trials[] · KEYNOTE-177 (NCT02563002)',
    path: 'engagements/brenus/trial_intelligence/trial_decode_registry_v2.json',
    role: '1L MSI-H/dMMR mCRC pivotal, Brenus data_status=VERIFIED',
  },
  {
    field: 'trials[] · CheckMate-142 (NCT02060188)',
    path: 'engagements/brenus/trial_intelligence/trial_decode_registry_v2.json',
    role: 'MSS-vs-MSI-H boundary condition for the primary MSS-CRC engagement',
  },
  {
    field: 'claims[] · IO_APPENDIX role',
    path: 'engagements/brenus/trial_intelligence/program_assets/program_asset_io_appendix.json',
    role: 'Brenus positioning artifact (value proposition headline)',
  },
  {
    field: 'plainSummary + patientRelevance',
    path: 'scripts/anchor_extract/w1_extract_crc_brenus.py',
    role: 'Persona-first narrative baked into the extraction script (snapshot-only)',
  },
];

const BM01_MAP: Array<{ field: string; path: string; role: string }> = [
  {
    field: 'patientVariants[]',
    path: 'data/brain_met/brm_clinical_variants.json',
    role: '13 clinical variants scored on Modal A100 with Evo2 conditional LL',
  },
  {
    field: 'topTargetLock[]',
    path: 'data/brain_met/pipeline_results_20260328T070235Z.json',
    role: 'Full BrM-cascade run: 7 steps × 29 genes, seed=42',
  },
  {
    field: 'validation[]',
    path: 'data/brain_met/pipeline_results_20260328T070235Z.json',
    role: 'Per-step AUROC / AUPRC / precision@3 from same run',
  },
  {
    field: 'modalDeployments[]',
    path: 'README.md (evo2-e2e)',
    role: 'crispro-evo2-v9 · crispro-enformer · brm-icl-v1 — all LIVE on Modal',
  },
  {
    field: 'plainSummary + patientRelevance',
    path: 'scripts/anchor_extract/w2_extract_brm_evo2.py',
    role: 'Persona-first narrative baked into the extraction script (snapshot-only)',
  },
];

export default function AnchorAuditPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-semibold text-gray-900">
        How CrisPRO uses two production repos to back the demo
      </h1>
      <p className="mt-3 text-lg leading-relaxed text-gray-700">
        The multi-patient tumor board isn&rsquo;t running hand-authored fiction. Two of the five
        patient bundles &mdash; CRC01 and BM01 &mdash; are backed by real production repositories
        that CrisPRO drives in other engagements. This page shows exactly which committed files
        produced which fields on which patient panels.
      </p>

      {/* Plain-English framing block */}
      <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
        <h2 className="text-lg font-semibold text-blue-900">Why this matters to you</h2>
        <p className="mt-2 text-sm leading-relaxed text-blue-900">
          <span className="font-medium">CRC01 (Lynch / MSI-H colon):</span> When your tumor board
          asks &ldquo;where&rsquo;s the evidence for pembrolizumab first-line?&rdquo;, CrisPRO
          answers with the same trial-decode library it built for the Brenus MSS-CRC engagement
          &mdash; 42 real trials, admissibility-tagged, verified. Instead of a curated PDF, you get
          the boundary conditions that Brenus itself flagged: KEYNOTE-177 is definitive for
          MSI-H, CheckMate-142 proves the MSS cohort is 0% ORR. Same evidence library, new patient.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-blue-900">
          <span className="font-medium">BM01 (HER2+ breast → brain metastases):</span> CrisPRO
          took BM01&rsquo;s TP53 R175H and ran it against a 7-step brain-metastasis cascade the
          evo2-e2e pipeline already ran on Modal A100 GPUs. The cascade separates real drivers from
          decoys at 0.96&ndash;1.00 AUROC. TP53 R175H comes back top-3 in two of the seven steps.
          No fresh compute, no live LLM &mdash; just serving a peer-reviewable pipeline result to the
          exact patient it applies to.
        </p>
      </section>

      {/* Snapshot policy honesty */}
      <section className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 p-6">
        <h2 className="text-lg font-semibold text-amber-900">What this does NOT do</h2>
        <ul className="mt-2 list-disc space-y-2 pl-6 text-sm leading-relaxed text-amber-900">
          <li>
            No live Modal or LLM calls at render time &mdash; every score comes from a committed
            JSON in the anchor repo, timestamped, seeded, and traceable.
          </li>
          <li>
            No per-patient synthetic-lethal matrix. The anchor repos don&rsquo;t produce those.
            CrisPRO surfaces what they actually output: population-level target scores and
            trial-level evidence.
          </li>
          <li>
            No GBM patient. Brenus&rsquo;s GLASS bulk-recurrence analysis for the GBM/ZEB1
            hypothesis closed as <span className="font-mono">NOT_SUPPORTED_YET</span> (bulk
            resolution; ZEB1 Wilcoxon p=0.000184 but direction DOWN, opposite the hypothesis;
            n=123 Stupp-standard pairs). The closed-negative note is persisted on the
            GBM_MGMT_UNMETH archetype in{' '}
            <code className="rounded bg-gray-100 px-1">
              /mnt/results/spe_audit/w4_pancancer_grid_v3.json
            </code>
            . Adding a GBM patient would mean fabricating evidence the repos don&rsquo;t back.
          </li>
        </ul>
      </section>

      {/* Field-by-field extraction map — CRC01 */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900">CRC01 &middot; Brenus panel extraction map</h2>
        <p className="mt-1 text-sm text-gray-600">
          Panel: <code className="rounded bg-gray-100 px-1">CRC01_BRENUS_PANEL</code> &middot;{' '}
          {CRC01_BRENUS_PANEL.trials.length} trials · {CRC01_BRENUS_PANEL.claims.length} claims
        </p>
        <div className="mt-4 overflow-x-auto rounded border border-gray-100">
          <table className="min-w-full divide-y divide-gray-100 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Panel field</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Brenus source path</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {CRC01_MAP.map((row) => (
                <tr key={row.field}>
                  <td className="px-4 py-2 font-mono text-xs">{row.field}</td>
                  <td className="px-4 py-2 font-mono text-xs text-blue-700">{row.path}</td>
                  <td className="px-4 py-2 text-xs text-gray-700">{row.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Field-by-field extraction map — BM01 */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900">BM01 &middot; evo2-e2e panel extraction map</h2>
        <p className="mt-1 text-sm text-gray-600">
          Panel: <code className="rounded bg-gray-100 px-1">BM01_EVO2_PANEL</code> &middot;{' '}
          {BM01_EVO2_PANEL.topTargetLock.length} target-lock rows · {BM01_EVO2_PANEL.validation.length} step-level metrics · seed{' '}
          {BM01_EVO2_PANEL.runInfo.seed}
        </p>
        <div className="mt-4 overflow-x-auto rounded border border-gray-100">
          <table className="min-w-full divide-y divide-gray-100 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Panel field</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">evo2-e2e source path</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {BM01_MAP.map((row) => (
                <tr key={row.field}>
                  <td className="px-4 py-2 font-mono text-xs">{row.field}</td>
                  <td className="px-4 py-2 font-mono text-xs text-purple-700">{row.path}</td>
                  <td className="px-4 py-2 text-xs text-gray-700">{row.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">The two anchor repos</h2>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <div className="rounded border border-gray-100 bg-gray-50 p-4">
            <div className="text-sm font-semibold text-blue-800">Brenus</div>
            <div className="mt-1 text-xs text-gray-600">fjkiani/Brenus &middot; 579 files · 37 MB</div>
            <p className="mt-2 text-sm text-gray-700">
              CrisPRO&rsquo;s 4-lane multi-agent BD flywheel (Plumber → PhD Matrix → Agent 8D →
              Outreach). Its reference implementation is the Brenus Pharma / STC-1010 / BreAK
              CRC-001 engagement &mdash; a haptenated whole-cell vaccine for MSS colon cancer.
              For CRC01 we use its trial-decode registry and IO_APPENDIX artifacts.
            </p>
          </div>
          <div className="rounded border border-gray-100 bg-gray-50 p-4">
            <div className="text-sm font-semibold text-purple-800">evo2-e2e</div>
            <div className="mt-1 text-xs text-gray-600">fjkiani/evo2-e2e &middot; 133 files · 53 MB</div>
            <p className="mt-2 text-sm text-gray-700">
              CrisPRO&rsquo;s brain-metastasis Target-Lock / Assassin production pipeline. Deploys
              on Modal (Evo2 A100, Enformer T4, BrM ICL adapter CPU). 19 positive BrM targets +
              9 hard negatives across 7 cascade steps. For BM01 we use its full pipeline-results
              JSON and 13-variant Evo2 conditional-LL scores.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
